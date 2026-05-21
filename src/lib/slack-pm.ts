/**
 * Slack posting for the A2 PM real-time link checker.
 *
 * One transport: chat.postMessage with the A2 PM Agent bot token. Posts to
 * any channel the bot has been `/invite`d to (or any public channel if the
 * `chat:write.public` scope is granted).
 *
 * The legacy incoming-webhook URL is intentionally NOT used here. That
 * webhook is bound to #a2-intel and is reserved for the PM Brief agent.
 * Everything else (this link checker + the daily Notion digest) posts via
 * the bot token to its own channels.
 */

import type { LinkCheckResult } from "./link-checker";
import type { FormRow } from "./notion-form";

const BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
// #a2media-internal — the dedicated channel for project-tracker activity.
// Override via env if the workspace ever renumbers channels.
const INTERNAL_CHANNEL_ID =
  process.env.A2_INTERNAL_CHANNEL_ID ?? "C09Q8U67S31";

const BUSINESS_HOURS_TZ = process.env.BUSINESS_HOURS_TZ ?? "America/New_York";
const BUSINESS_HOURS_START = Number(process.env.BUSINESS_HOURS_START ?? "8");
const BUSINESS_HOURS_END = Number(process.env.BUSINESS_HOURS_END ?? "19");

const NOTION_PROJECT_TRACKER_URL =
  "https://www.notion.so/a2-media/Project-Tracker-35f7a0163fa480c5aafacb279fc8b1ca";

// Substring-on-Company → Slack channel ID. Hardcoded; sourced from the PM
// Brief agent prompt. Companies without a match get no client auto-post.
const COMPANY_TO_CHANNEL: { keyword: string; channelId: string; name: string }[] = [
  { keyword: "close", channelId: "C07A0FFKPA8", name: "#video-a2media" },
  { keyword: "saastorm", channelId: "C0AGS8RPU3Y", name: "#saastorm-a2" },
  { keyword: "brainlabs", channelId: "C0AN33EJGTT", name: "#a2-brainlabs" },
  { keyword: "blueconic", channelId: "C0AKFBH320G", name: "#a2-blueconic" },
  { keyword: "goldcast", channelId: "C0AJZPJBVKQ", name: "#ext-a2media_goldcast" },
  { keyword: "spiralyze", channelId: "C0APB3NMAF4", name: "#a2media-spiralyze" },
  { keyword: "runway", channelId: "C0975B135A9", name: "#runway-a2media" },
];

export function resolveClientChannel(
  company: string
): { channelId: string; name: string } | null {
  const lower = company.toLowerCase();
  const hit = COMPANY_TO_CHANNEL.find((c) => lower.includes(c.keyword));
  return hit ? { channelId: hit.channelId, name: hit.name } : null;
}

/**
 * Are we currently inside A2 business hours? Outside = client auto-post fires.
 * Weekends count as outside business hours.
 */
export function isAfterHours(now: Date = new Date()): boolean {
  // Intl reliably handles DST + IANA tz; no extra deps.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_HOURS_TZ,
    weekday: "short",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hourStr = parts.find((p) => p.type === "hour")?.value ?? "0";
  const hour = Number(hourStr);

  if (weekday === "Sat" || weekday === "Sun") return true;
  return hour < BUSINESS_HOURS_START || hour >= BUSINESS_HOURS_END;
}

export function formatHourInTz(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_HOURS_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);
}

function truncate(s: string, n = 80): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

/**
 * Renders the message Ademola (or the bot) sends to the client's channel.
 * Voice-guide clean: no em dashes, casual register.
 */
export function clientFacingBlurb(row: FormRow, locked: LinkCheckResult[]): string {
  const name = row.firstName || "there";
  const project = row.videoProjectName || "your video";
  const lines = [
    `Hey ${name}, got your submission for *${project}*. Looks like a couple of the file links you sent are locked behind sign-in so our editor can't open them:`,
  ];
  for (const r of locked) {
    lines.push(`• ${truncate(r.url, 80)}`);
  }
  lines.push(
    `Once you've flipped those (right-click → Share → "Anyone with the link" → Viewer), no need to resubmit. Just shoot us a :+1: here and we'll let the editor know.`
  );
  lines.push("Cheers");
  return lines.join("\n");
}

/**
 * Renders the internal #a2media-internal message: @here ping + structured
 * details + the copy-paste blurb so whoever sees it first can forward.
 */
export function internalFlagText(
  row: FormRow,
  locked: LinkCheckResult[],
  autoPostedTo: { name: string; at: string } | null
): string {
  const editor = row.editors.length > 0 ? row.editors.join(", ") : "Unassigned";
  const lines = [
    `<!here> *Locked links on new form submission*`,
    `*Project:* ${row.videoProjectName || "(no name)"}`,
    `*Client:* ${row.company || "(no company)"}`,
    `*Editor:* ${editor}`,
    `*Submitter:* ${row.submitterName}${row.email ? ` (${row.email})` : ""}`,
    "",
    "*Locked URLs:*",
    ...locked.map(
      (r) =>
        `• [${r.field}] ${truncate(r.url, 70)} . ${r.reason}${r.httpCode ? ` (${r.httpCode})` : ""}${r.marker ? ` . "${r.marker}"` : ""}`
    ),
  ];
  if (autoPostedTo) {
    lines.push("");
    lines.push(
      `:robot_face: Auto-posted to ${autoPostedTo.name} at ${autoPostedTo.at} (after-hours).`
    );
  } else {
    lines.push("");
    lines.push(`*Copy-paste blurb for the client channel:*`);
    lines.push("```");
    lines.push(clientFacingBlurb(row, locked));
    lines.push("```");
  }
  lines.push("");
  lines.push(`<${NOTION_PROJECT_TRACKER_URL}|Open in Notion>`);
  return lines.join("\n");
}

export async function postToChannel(
  channelId: string,
  text: string
): Promise<{ ok: boolean; error?: string }> {
  if (!BOT_TOKEN) {
    return { ok: false, error: "SLACK_BOT_TOKEN not set" };
  }
  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${BOT_TOKEN}`,
    },
    body: JSON.stringify({ channel: channelId, text }),
  });
  const json = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
  };
  if (!res.ok || !json.ok) {
    return { ok: false, error: json.error ?? `http ${res.status}` };
  }
  return { ok: true };
}

export async function postInternal(text: string): Promise<void> {
  const result = await postToChannel(INTERNAL_CHANNEL_ID, text);
  if (!result.ok) {
    throw new Error(
      `Failed to post to #a2media-internal (${INTERNAL_CHANNEL_ID}): ${result.error}`
    );
  }
}
