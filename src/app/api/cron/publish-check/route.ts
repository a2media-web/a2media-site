/**
 * Drive folder watcher — runs every 15 minutes.
 *
 * Polls the 02 Published and 03 Rejected folders for Docs that still have
 * the "[DRAFT]" prefix (meaning we haven't processed them yet).
 *
 * For each unprocessed Doc in 02 Published:
 *   1. Read the current Doc body (includes any edits Ademola made)
 *   2. Parse it back into BlogPost shape (using doc-serialize.parseDocToPost)
 *   3. Commit the JSON to src/content/blog/auto-posts/[slug].json
 *   4. Rename the Doc with "[PUBLISHED yyyy-mm-dd]" prefix
 *   5. Post a Slack note
 *
 * For each unprocessed Doc in 03 Rejected:
 *   1. Rename the Doc with "[REJECTED yyyy-mm-dd]" prefix
 *   2. Mark topic status = "rejected" in the queue (for revision later)
 *   3. Post a Slack note
 *
 * The commit triggers a Vercel auto-deploy that pulls the new post in.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  findUnprocessedPublishedDocs,
  findUnprocessedRejectedDocs,
  markPublished,
  markRejected,
  readDocText,
} from "@/lib/drive";
import { parseDocToPost } from "@/lib/doc-serialize";
import { commitBlogPost } from "@/lib/github";
import { postSystemMessage } from "@/lib/slack";
import { setTopicStatus, TOPIC_QUEUE } from "@/content/blog/_queue";
import { ALL_POSTS } from "@/content/blog/posts";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET not set" }, { status: 500 });
  }
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const results = { published: 0, rejected: 0, errors: [] as string[] };

  // === Process Published ===
  let toPublish;
  try {
    toPublish = await findUnprocessedPublishedDocs();
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: `drive list failed: ${(err as Error).message}` },
      { status: 500 },
    );
  }

  for (const doc of toPublish) {
    try {
      // Find which topic this doc came from by matching slug in title.
      // We use the topic queue's "drafted" topics as the candidate pool.
      const text = await readDocText(doc.id);
      // Match topic by question text. Don't filter on t.status === "drafted" —
      // TOPIC_QUEUE lives in-memory and resets on each cold-start, so by the
      // time publish-check runs the generate cron's status writes are gone.
      const draftedTopic = TOPIC_QUEUE.find((t) =>
        doc.name.toLowerCase().includes(t.question.toLowerCase().slice(0, 40)),
      );

      // We need an "original" post structure to use as a fallback. If we
      // don't have one yet (because it was generated fresh today), build a
      // minimal one from the topic + parse the doc.
      const fallbackPost = draftedTopic
        ? minimalPostFromTopic(draftedTopic)
        : minimalFromExisting(doc.name);

      if (!fallbackPost) {
        results.errors.push(
          `Could not identify topic for "${doc.name}" — manual intervention needed`,
        );
        continue;
      }

      const parsed = parseDocToPost(text, fallbackPost);
      if (!parsed.ok) {
        results.errors.push(
          `Parse failed for "${doc.name}": ${parsed.reason}`,
        );
        continue;
      }

      // Commit to GitHub → Vercel auto-deploys
      const commit = await commitBlogPost(parsed.post);
      await markPublished(doc.id, doc.name, today);
      if (draftedTopic) setTopicStatus(draftedTopic.id, "published");

      results.published++;
      await postSystemMessage(
        `:rocket: Published *${parsed.post.question}* — <${commit.url}|view commit>. ` +
          `Vercel deploy starting; live at https://a2media.ca/blog/${parsed.post.slug} in ~90 seconds.`,
      ).catch(() => undefined);
    } catch (err) {
      results.errors.push(
        `Publish failed for "${doc.name}": ${(err as Error).message}`,
      );
    }
  }

  // === Process Rejected ===
  let toReject: Awaited<ReturnType<typeof findUnprocessedRejectedDocs>> = [];
  try {
    toReject = await findUnprocessedRejectedDocs();
  } catch (err) {
    results.errors.push(`rejected list failed: ${(err as Error).message}`);
  }

  for (const doc of toReject) {
    try {
      // Match topic by question text. Don't filter on t.status === "drafted" —
      // TOPIC_QUEUE lives in-memory and resets on each cold-start, so by the
      // time publish-check runs the generate cron's status writes are gone.
      const draftedTopic = TOPIC_QUEUE.find((t) =>
        doc.name.toLowerCase().includes(t.question.toLowerCase().slice(0, 40)),
      );
      await markRejected(doc.id, doc.name, today);
      if (draftedTopic) setTopicStatus(draftedTopic.id, "rejected");
      results.rejected++;
      const noteLink = draftedTopic
        ? `\`${draftedTopic.id}\` flagged for revision`
        : "(topic not identified)";
      await postSystemMessage(
        `:wastebasket: Rejected *${doc.name.replace(/^\[DRAFT\]\s*/, "")}* — ${noteLink}`,
      ).catch(() => undefined);
    } catch (err) {
      results.errors.push(
        `Reject failed for "${doc.name}": ${(err as Error).message}`,
      );
    }
  }

  if (results.errors.length > 0) {
    await postSystemMessage(
      `:warning: Publish-check errors:\n${results.errors.map((e) => `• ${e}`).join("\n")}`,
    ).catch(() => undefined);
  }

  return NextResponse.json({ ok: true, ...results });
}

function minimalPostFromTopic(topic: (typeof TOPIC_QUEUE)[number]) {
  return {
    question: topic.question,
    slug: topic.id,
    answer: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
    author: "Ademola Adelakun",
    cluster: topic.cluster,
    clusterLabel: "",
    intent: topic.intent,
    ctaMode: topic.suggestedCtaMode,
    proprietaryInput: {
      type: "client-stat" as const,
      source: "",
      detail: "",
    },
    outboundCitations: [] as { url: string; anchor: string }[],
    internalLinks: [] as { url: string; anchor: string }[],
    faqSchema: true,
    body: [] as never[],
    closing: { text: "", cta: { url: "/#Pricing", anchor: "→" } },
  };
}

function minimalFromExisting(docName: string) {
  const cleaned = docName.replace(/^\[DRAFT\]\s*/, "").trim();
  const match = ALL_POSTS.find(
    (p) => p.question.toLowerCase() === cleaned.toLowerCase(),
  );
  return match ?? null;
}
