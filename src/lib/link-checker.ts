/**
 * Link extractor + accessibility checker for the A2 Video Request form.
 *
 * Form fields contain free-text URLs in messy shapes observed in production:
 *   - Markdown-wrapped (Notion auto-link): `[https://...](https://...)`
 *   - HTML break tags from rich paste: `https://...<br><br>more text`
 *   - URL with descriptive text after it: `Brief is here: https://...`
 *   - Numbered list with descriptions and trailing P.S. text
 *   - Multiple URLs in one field, trailing punctuation
 *
 * The extractor was validated end-to-end against Desiree Echevarria and
 * Abby Rodrigues submissions on 2026-05-21. See plan file for trace.
 */

const USER_AGENT = "Mozilla/5.0 (compatible; A2-LinkCheck/1.0)";
const REQUEST_TIMEOUT_MS = 8000;
const MAX_URLS_PER_RUN = 30;

const AUTH_WALL_MARKERS = [
  /sign in to (view|continue|access)/i,
  /request access/i,
  /you need (access|permission)/i,
  /access denied/i,
  /couldn.t find this (file|folder|document)/i,
  // Google Drive / Docs / Sheets / Slides / Forms lock pattern: returns 200
  // with a sign-in page whose <title> is e.g. "Google Drive: Sign-in".
  /<title>[^<]*google[^<]*sign[- ]?in[^<]*<\/title>/i,
  /<title>[^<]*sign[- ]?in[^<]*google[^<]*<\/title>/i,
];

// A response is also a locked-page if redirect chain landed us on a Google
// auth-flow URL (accounts.google.com), even with HTTP 200. Google uses
// various paths: /ServiceLogin, /signin, /v3/signin/identifier, etc.
const GOOGLE_AUTH_REDIRECT_RE = /^https?:\/\/accounts\.google\.com\//i;

export type LinkCheckResult = {
  url: string;
  field: string;
  ok: boolean;
  reason: "ok" | "http-error" | "auth-wall" | "timeout" | "network-error";
  httpCode: number | null;
  marker: string | null;
};

/**
 * Pull URLs out of one free-text field. Returns deduped URLs.
 */
export function extractUrls(text: string | null | undefined): string[] {
  if (!text) return [];

  // Strip HTML tags, unwrap markdown links to bare URL.
  const cleaned = text
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$2");

  // Grep URLs, stopping at whitespace, ), ], >, ".
  const matches = cleaned.match(/https?:\/\/[^\])\s>"]+/g) ?? [];

  // Trim trailing sentence punctuation.
  const trimmed = matches.map((u) => u.replace(/[.,;:!?]+$/, ""));

  return Array.from(new Set(trimmed));
}

/**
 * Check whether a single URL is accessible by the editor.
 *
 * Two-pass:
 *   1. HTTP code check (non-2xx/3xx = locked)
 *   2. For 2xx responses, scan the body for Google-style auth-wall phrases
 *      because Drive returns 200 even on locked files.
 */
async function checkOne(url: string, field: string): Promise<LinkCheckResult> {
  let httpCode: number | null = null;
  let bodyForMarker: string | null = null;
  let finalUrl: string | null = null;

  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);

    const res = await fetch(url, {
      method: "GET",
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
      signal: ctrl.signal,
    });
    clearTimeout(timeout);
    httpCode = res.status;
    finalUrl = res.url;

    if (res.status >= 200 && res.status < 300) {
      // Only read body on 2xx — saves bandwidth on hard errors.
      try {
        const text = await res.text();
        bodyForMarker = text.slice(0, 50_000);
      } catch {
        bodyForMarker = null;
      }
    }
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    return {
      url,
      field,
      ok: false,
      reason: aborted ? "timeout" : "network-error",
      httpCode,
      marker: null,
    };
  }

  // Even with HTTP 200, if we got redirected to Google's sign-in flow the
  // link is locked. Catches the common Drive/Docs pattern where the target
  // is private and the user lands on accounts.google.com/ServiceLogin.
  if (finalUrl && GOOGLE_AUTH_REDIRECT_RE.test(finalUrl)) {
    return {
      url,
      field,
      ok: false,
      reason: "auth-wall",
      httpCode,
      marker: "redirected to Google sign-in",
    };
  }

  if (httpCode === null || httpCode < 200 || httpCode >= 400) {
    return {
      url,
      field,
      ok: false,
      reason: "http-error",
      httpCode,
      marker: null,
    };
  }

  if (bodyForMarker) {
    for (const pattern of AUTH_WALL_MARKERS) {
      const match = bodyForMarker.match(pattern);
      if (match) {
        return {
          url,
          field,
          ok: false,
          reason: "auth-wall",
          httpCode,
          marker: match[0],
        };
      }
    }
  }

  return { url, field, ok: true, reason: "ok", httpCode, marker: null };
}

/**
 * Extract + check across many fields. Dedupes URLs across all fields so we
 * don't double-check the same Drive folder pasted in two places. Caps at
 * MAX_URLS_PER_RUN to stay inside the 10-second webhook budget.
 */
export async function checkAllFields(
  fields: { name: string; text: string | null | undefined }[]
): Promise<LinkCheckResult[]> {
  const seen = new Set<string>();
  const queue: { url: string; field: string }[] = [];

  for (const { name, text } of fields) {
    for (const url of extractUrls(text)) {
      if (seen.has(url)) continue;
      seen.add(url);
      queue.push({ url, field: name });
      if (queue.length >= MAX_URLS_PER_RUN) break;
    }
    if (queue.length >= MAX_URLS_PER_RUN) break;
  }

  return Promise.all(queue.map(({ url, field }) => checkOne(url, field)));
}

export function getLockedLinks(results: LinkCheckResult[]): LinkCheckResult[] {
  return results.filter((r) => !r.ok);
}
