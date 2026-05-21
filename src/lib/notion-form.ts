/**
 * Notion form-DB reader for the A2 Video Request Form
 * (data source `0c2242d6-739a-476d-b85c-5b3392f0a8d2`).
 *
 * Uses raw fetch instead of @notionhq/client to keep the project dep-free,
 * matching the convention in `slack.ts`. Only the two endpoints we need:
 *   - GET  /v1/pages/{id}                   (fetch a row)
 *   - PATCH /v1/pages/{id}                  (write Link Check Status back)
 */

const NOTION_VERSION = "2025-09-03";
const API_BASE = "https://api.notion.com/v1";

/* eslint-disable @typescript-eslint/no-explicit-any */

function authHeaders() {
  const key = process.env.NOTION_API_KEY;
  if (!key) throw new Error("NOTION_API_KEY not set");
  return {
    Authorization: `Bearer ${key}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

function getText(prop: any): string {
  if (!prop) return "";
  if (prop.title) return prop.title?.[0]?.plain_text ?? "";
  if (prop.rich_text) return prop.rich_text?.[0]?.plain_text ?? "";
  if (prop.email) return prop.email ?? "";
  return "";
}

function getMultiSelect(prop: any): string[] {
  return prop?.multi_select?.map((s: any) => s.name) ?? [];
}

function getDate(prop: any): string | null {
  return prop?.date?.start ?? null;
}

function getStatusName(prop: any): string {
  return prop?.status?.name ?? "";
}

export type FormRow = {
  id: string;
  submitterName: string;
  firstName: string;
  email: string;
  company: string;
  videoProjectName: string;
  status: string;
  editors: string[];
  deadline: string | null;
  fields: {
    videoFiles: string;
    projectBrief: string;
    referenceVideos: string;
    projectFilesFolder: string;
  };
};

export async function fetchFormRow(pageId: string): Promise<FormRow> {
  const res = await fetch(`${API_BASE}/pages/${pageId}`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion fetch failed (${res.status}): ${body}`);
  }
  const page = await res.json();
  const p = page.properties ?? {};

  const submitterName = getText(p["Name"]) || getText(p["Your Name"]);
  const firstName = submitterName.split(/\s+/)[0] ?? "";

  return {
    id: page.id,
    submitterName,
    firstName,
    email: getText(p["Email"]),
    company: getText(p["Company"]),
    videoProjectName: getText(p["Video Project Name"]),
    status: getStatusName(p["Status"]),
    editors: getMultiSelect(p["Editor"]),
    deadline:
      getDate(p["Expected Deadline"]) ??
      getDate(p["What is the expected deadline for this project?"]),
    fields: {
      videoFiles: getText(p["Video Files & Assets"]),
      projectBrief: getText(
        p[
          "Do you you have a link to a project brief/overview of this series?(Project brief)"
        ]
      ),
      referenceVideos: getText(p["Please link two reference videos below"]),
      // Note the trailing space — that is the literal property name in Notion.
      projectFilesFolder: getText(p["Project files folder "]),
    },
  };
}

export type LinkCheckStatusValue = "All Clear" | "Issues Found" | "No Links";

export async function setLinkCheckStatus(
  pageId: string,
  status: LinkCheckStatusValue
): Promise<void> {
  const res = await fetch(`${API_BASE}/pages/${pageId}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({
      properties: {
        "Link Check Status": { select: { name: status } },
      },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    // Soft-fail: the Slack ping is the load-bearing signal. Don't block
    // the webhook response on a Notion write error (e.g. property not
    // created yet). Log and move on.
    console.error(
      `Notion setLinkCheckStatus failed (${res.status}) for ${pageId}: ${body}`
    );
  }
}
