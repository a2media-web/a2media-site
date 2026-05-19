/**
 * Service-account Google Drive client for the blog pipeline.
 *
 * Used by:
 *   - the daily generation cron (create Docs in 01 Drafts)
 *   - the publish-check cron (list Docs in 02 Published, read content, rename)
 *
 * The service account JSON is stored in GOOGLE_SERVICE_ACCOUNT_JSON env var
 * as a single-line JSON string. The three target folders are shared with
 * the service account's email (with Editor permission) so it can create,
 * read, rename, and move files.
 *
 * Folder IDs are documented in src/content/blog/_TEMPLATE.md and in the
 * project_a2_blog memory entry.
 */

import { google, drive_v3 } from "googleapis";

export const DRAFT_FOLDER_ID = "1QFnq2PabG0LqD4Q7Jb0SQ5cnmKw4aKxV";
export const PUBLISHED_FOLDER_ID = "1jb4lk46sGNGQywn-2hSyNGf_HAGygATP";
export const REJECTED_FOLDER_ID = "1aLEvFxbLLR7xgBVujpcIyaWAHSCKYn31";

let cachedClient: drive_v3.Drive | null = null;

function getClient(): drive_v3.Drive {
  if (cachedClient) return cachedClient;

  // Prefer service account if present (cleaner — no token refresh window).
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    let credentials: Record<string, unknown>;
    try {
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    } catch (err) {
      throw new Error(
        `Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON: ${(err as Error).message}`,
      );
    }
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    cachedClient = google.drive({ version: "v3", auth });
    return cachedClient;
  }

  // Fallback: OAuth refresh token flow (when org policy blocks SA keys).
  // Requires GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN.
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  if (clientId && clientSecret && refreshToken) {
    const oauth2 = new google.auth.OAuth2(clientId, clientSecret);
    oauth2.setCredentials({ refresh_token: refreshToken });
    cachedClient = google.drive({ version: "v3", auth: oauth2 });
    return cachedClient;
  }

  throw new Error(
    "No Google Drive auth configured. Set GOOGLE_SERVICE_ACCOUNT_JSON, or " +
      "the OAuth trio (GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN).",
  );
}

export async function createDraftDoc(
  title: string,
  plainTextContent: string,
): Promise<{ id: string; url: string }> {
  const drive = getClient();
  const res = await drive.files.create({
    requestBody: {
      name: title,
      mimeType: "application/vnd.google-apps.document",
      parents: [DRAFT_FOLDER_ID],
    },
    media: {
      mimeType: "text/plain",
      body: plainTextContent,
    },
    fields: "id",
  });
  const id = res.data.id;
  if (!id) throw new Error("Drive returned no file ID for new draft");
  return { id, url: `https://docs.google.com/document/d/${id}/edit` };
}

export type DriveDocSummary = {
  id: string;
  name: string;
  url: string;
  parents: string[];
  modifiedTime: string;
};

export async function listFolder(folderId: string): Promise<DriveDocSummary[]> {
  const drive = getClient();
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id, name, parents, modifiedTime)",
    pageSize: 100,
  });
  const files = res.data.files ?? [];
  return files
    .filter((f) => f.id && f.name)
    .map((f) => ({
      id: f.id!,
      name: f.name!,
      url: `https://docs.google.com/document/d/${f.id}/edit`,
      parents: f.parents ?? [],
      modifiedTime: f.modifiedTime ?? new Date().toISOString(),
    }));
}

export async function readDocText(fileId: string): Promise<string> {
  const drive = getClient();
  const res = await drive.files.export(
    { fileId, mimeType: "text/plain" },
    { responseType: "text" },
  );
  return res.data as string;
}

export async function renameFile(fileId: string, newName: string): Promise<void> {
  const drive = getClient();
  await drive.files.update({
    fileId,
    requestBody: { name: newName },
  });
}

/**
 * Find any Docs in the Published folder whose title still starts with
 * "[DRAFT]" — those are unprocessed. Once processed they'll be renamed
 * with a "[PUBLISHED yyyy-mm-dd]" prefix so we never re-process.
 */
export async function findUnprocessedPublishedDocs(): Promise<DriveDocSummary[]> {
  const all = await listFolder(PUBLISHED_FOLDER_ID);
  return all.filter((f) => f.name.startsWith("[DRAFT]"));
}

export async function findUnprocessedRejectedDocs(): Promise<DriveDocSummary[]> {
  const all = await listFolder(REJECTED_FOLDER_ID);
  return all.filter((f) => f.name.startsWith("[DRAFT]"));
}

/**
 * List the names of every Doc across all three blog folders. Used by the
 * generate cron as the single source of truth for "what topics have already
 * been drafted/published/rejected" — TOPIC_QUEUE's in-memory status resets
 * on every cold start, so we can't trust it.
 */
export async function listAllDocNames(): Promise<string[]> {
  const drive = getClient();
  const folders = [DRAFT_FOLDER_ID, PUBLISHED_FOLDER_ID, REJECTED_FOLDER_ID];
  const q =
    folders.map((id) => `'${id}' in parents`).join(" or ") +
    ` and trashed = false`;
  const res = await drive.files.list({
    q: `(${q})`,
    fields: "files(name)",
    pageSize: 200,
  });
  return (res.data.files ?? [])
    .map((f) => f.name ?? "")
    .filter((n) => n.length > 0);
}

/**
 * Count Drive Docs created in the last `days` days across all three blog
 * folders (drafts + published + rejected). Used by the usage guard to
 * enforce a weekly draft cap and prevent runaway generation.
 */
export async function countDocsCreatedInLastDays(days: number): Promise<number> {
  const drive = getClient();
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString();
  const folders = [DRAFT_FOLDER_ID, PUBLISHED_FOLDER_ID, REJECTED_FOLDER_ID];
  const q =
    folders.map((id) => `'${id}' in parents`).join(" or ") +
    ` and createdTime >= '${cutoff}'` +
    ` and trashed = false`;
  const res = await drive.files.list({
    q: `(${q})`,
    fields: "files(id)",
    pageSize: 100,
  });
  return (res.data.files ?? []).length;
}

export async function markPublished(
  fileId: string,
  originalName: string,
  publishDate: string,
): Promise<void> {
  const cleaned = originalName.replace(/^\[DRAFT\]\s*/, "").trim();
  await renameFile(fileId, `[PUBLISHED ${publishDate}] ${cleaned}`);
}

export async function markRejected(
  fileId: string,
  originalName: string,
  rejectDate: string,
): Promise<void> {
  const cleaned = originalName.replace(/^\[DRAFT\]\s*/, "").trim();
  await renameFile(fileId, `[REJECTED ${rejectDate}] ${cleaned}`);
}
