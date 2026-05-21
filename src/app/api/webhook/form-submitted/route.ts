/**
 * Real-time webhook for A2 Video Request Form submissions.
 *
 * Triggered by Notion automation on the form-DB
 * (data source `0c2242d6-739a-476d-b85c-5b3392f0a8d2`) when a new row is
 * created. Notion sends the page ID in the payload. We pull the row,
 * extract URLs from the four link-bearing fields, accessibility-check
 * each, and:
 *
 *   - Always post an internal @here flag to #a2media-internal if any link
 *     is locked, with a copy-paste blurb ready for the client channel.
 *   - During A2 after-hours (outside 8am-7pm America/New_York Mon-Fri),
 *     also auto-post the same blurb directly to the client's mapped Slack
 *     channel, so they can fix sharing before A2 wakes up.
 *   - Always write `Link Check Status` back to the Notion row.
 *
 * Auth: Bearer token via FORM_WEBHOOK_SECRET. Notion's automation step
 * sets the header on its outgoing call.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { fetchFormRow, setLinkCheckStatus } from "@/lib/notion-form";
import { checkAllFields, getLockedLinks } from "@/lib/link-checker";
import {
  clientFacingBlurb,
  formatHourInTz,
  internalFlagText,
  isAfterHours,
  postInternal,
  postToChannel,
  resolveClientChannel,
} from "@/lib/slack-pm";

export const runtime = "nodejs";
export const maxDuration = 30;

/* eslint-disable @typescript-eslint/no-explicit-any */

function extractPageId(payload: any): string | null {
  if (!payload) return null;
  // Notion's "Send webhook" automation payload shape varies a bit. Look in
  // the common spots before giving up.
  return (
    payload.data?.id ??
    payload.page?.id ??
    payload.id ??
    payload.source?.id ??
    null
  );
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const secret = process.env.FORM_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "FORM_WEBHOOK_SECRET not set" },
      { status: 500 }
    );
  }
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const pageId = extractPageId(payload);
  if (!pageId) {
    return NextResponse.json(
      { ok: false, error: "Could not find page id in webhook payload" },
      { status: 400 }
    );
  }

  try {
    const row = await fetchFormRow(pageId);

    const results = await checkAllFields([
      { name: "Video Files & Assets", text: row.fields.videoFiles },
      { name: "Project Brief", text: row.fields.projectBrief },
      { name: "Reference Videos", text: row.fields.referenceVideos },
      { name: "Project Files Folder", text: row.fields.projectFilesFolder },
    ]);

    const locked = getLockedLinks(results);

    if (results.length === 0) {
      // No URLs found in any field.
      await setLinkCheckStatus(pageId, "No Links");
      return NextResponse.json({
        ok: true,
        pageId,
        outcome: "no-links",
      });
    }

    if (locked.length === 0) {
      await setLinkCheckStatus(pageId, "All Clear");
      return NextResponse.json({
        ok: true,
        pageId,
        outcome: "all-clear",
        checked: results.length,
      });
    }

    // Locked links found. Decide routing.
    const afterHours = isAfterHours();
    const clientChannel = resolveClientChannel(row.company);

    let autoPosted: { name: string; at: string } | null = null;
    let autoPostError: string | null = null;

    if (afterHours && clientChannel) {
      const blurb = clientFacingBlurb(row, locked);
      const result = await postToChannel(clientChannel.channelId, blurb);
      if (result.ok) {
        autoPosted = { name: clientChannel.name, at: formatHourInTz() };
      } else {
        autoPostError = result.error ?? "unknown";
      }
    }

    await postInternal(internalFlagText(row, locked, autoPosted));
    await setLinkCheckStatus(pageId, "Issues Found");

    return NextResponse.json({
      ok: true,
      pageId,
      outcome: "issues-found",
      locked: locked.length,
      checked: results.length,
      afterHours,
      autoPosted,
      autoPostError,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("form-submitted webhook failed:", err);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
