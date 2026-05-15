/**
 * Slack incoming-webhook poster for the blog pipeline.
 *
 * Reuses the same pattern as the PM Bot tracker — POST a JSON payload to
 * the webhook URL stored in BLOG_SLACK_WEBHOOK_URL. We use Block Kit
 * formatting so each draft renders as a clean card with a button.
 *
 * No SDK dependency — this is a single fetch call.
 */

import type { BlogPost } from "@/content/blog/posts";

const WEBHOOK = process.env.BLOG_SLACK_WEBHOOK_URL;

export type DraftSummary = {
  post: BlogPost;
  docUrl: string;
  rubricScore: number; // 0..30
  rubricTier: "Hero" | "Strong" | "Acceptable" | "Revise" | "Scrap";
};

export async function postDailyDigest(drafts: DraftSummary[]): Promise<void> {
  if (!WEBHOOK) {
    throw new Error("BLOG_SLACK_WEBHOOK_URL not set");
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const blocks: unknown[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `Review drafts — ${today}`,
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text:
            drafts.length === 1
              ? "1 draft ready. Approve by dragging the Doc to *02 Published*. Reject by dragging to *03 Rejected*."
              : `${drafts.length} drafts ready. Approve by dragging each Doc to *02 Published*. Reject by dragging to *03 Rejected*.`,
        },
      ],
    },
    { type: "divider" },
  ];

  drafts.forEach((draft, i) => {
    const { post, docUrl, rubricScore, rubricTier } = draft;
    const ctaLabel = post.ctaMode === "sell" ? "Sell" : "Helpful";
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          `*${i + 1} of ${drafts.length} · ${post.clusterLabel} · ${post.intent} · CTA: ${ctaLabel}*\n` +
          `*<${docUrl}|${post.question}>*\n\n` +
          `${post.answer}`,
      },
    });
    blocks.push({
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Rubric: *${rubricScore}/30* — ${rubricTier}  ·  Proprietary input: ${post.proprietaryInput.source}  ·  CTA pulls to: ${post.closing.cta.anchor}`,
        },
      ],
    });
    blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "Open Doc to edit", emoji: true },
          url: docUrl,
          style: "primary",
        },
      ],
    });
    if (i < drafts.length - 1) blocks.push({ type: "divider" });
  });

  blocks.push({ type: "divider" });
  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text:
          "Drafts auto-archive to *03 Rejected* in 7 days if you don't action them. " +
          "Watcher checks Drive every 15 min.",
      },
    ],
  });

  const res = await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blocks, text: `Review drafts — ${today}` }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Slack webhook failed: ${res.status} ${body}`);
  }
}

export async function postSystemMessage(text: string): Promise<void> {
  if (!WEBHOOK) throw new Error("BLOG_SLACK_WEBHOOK_URL not set");
  await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

export function rubricTierFor(score: number): DraftSummary["rubricTier"] {
  if (score >= 30) return "Hero";
  if (score >= 28) return "Strong";
  if (score >= 26) return "Acceptable";
  if (score >= 22) return "Revise";
  return "Scrap";
}
