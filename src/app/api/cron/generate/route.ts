/**
 * Daily blog generation cron.
 *
 * Scheduled in vercel.json to run weekdays at 13:00 UTC = 9 AM EDT (8 AM
 * EST during winter — we accept the DST drift to keep the cron simple).
 *
 * On each run:
 *   1. Pull the next 2 queued topics
 *   2. Generate each via Claude (claude-opus-4-7, adaptive thinking)
 *   3. Score each against the 30-question rubric
 *   4. For drafts that score >= 26: create a Google Doc in 01 Drafts
 *   5. Mark topic status = "drafted"
 *   6. Post one Slack message to #blog-drafts with both drafts
 *
 * Drafts that score < 26 get skipped and the topic stays "queued" for the
 * next run. We post a system message to Slack noting the skip.
 *
 * Auth: Bearer token via CRON_SECRET env var. Vercel cron sets the
 * Authorization header automatically when configured in vercel.json.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/anthropic";
import {
  countDocsCreatedInLastDays,
  createDraftDoc,
  listAllDocNames,
} from "@/lib/drive";
import { scoreDraft } from "@/lib/rubric";
import {
  postDailyDigest,
  postSystemMessage,
  rubricTierFor,
  type DraftSummary,
} from "@/lib/slack";
import { serializeBlogPost } from "@/lib/doc-serialize";
import {
  TOPIC_QUEUE,
  getNextQueuedTopics,
  setTopicStatus,
  type Topic,
} from "@/content/blog/_queue";
import { ALL_POSTS } from "@/content/blog/posts";

export const runtime = "nodejs";
export const maxDuration = 60;

const DRAFTS_PER_DAY = 2;
const RUBRIC_FLOOR = 26;

// One-time launch guard. Auto-expires — delete this constant + the early
// return below any time after the first successful Monday run.
const LAUNCH_DATE_UTC = "2026-05-18";

// Weekly usage cap. Never generate more than this many drafts in a rolling
// 7-day window — prevents runaway generation and keeps Vercel + Anthropic
// usage predictable. The 90% threshold below pauses generation BEFORE we
// hit the hard cap, so we stop one cycle short instead of partway through.
const WEEKLY_DRAFT_CAP = 10;
const WEEKLY_DRAFT_THROTTLE = Math.floor(WEEKLY_DRAFT_CAP * 0.9); // 9

// Cluster label map mirrors what's in posts.ts.
const CLUSTER_LABELS: Record<Topic["cluster"], string> = {
  strategy: "B2B SaaS Video Strategy",
  pricing: "Pricing & Budgeting",
  team: "Hiring & Team",
  formats: "Format Playbooks",
  distribution: "Distribution & Repurposing",
  measurement: "Measurement & ROI",
};

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET not set" }, { status: 500 });
  }
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // Launch guard: skip silently until LAUNCH_DATE_UTC.
  const todayUtc = new Date().toISOString().slice(0, 10);
  const isManual = req.headers.get("x-manual-run") === "1";
  if (todayUtc < LAUNCH_DATE_UTC && !isManual) {
    return NextResponse.json({
      ok: true,
      skipped: "pre-launch",
      launchDate: LAUNCH_DATE_UTC,
    });
  }

  // Weekly usage guard: count all Drive Docs created in the last 7 days
  // across drafts/published/rejected. If we're at the 90% throttle, skip
  // this run to avoid hitting the hard cap. Surfaces to Slack so Ademola
  // can clear the backlog or raise the cap.
  let recentCount: number | null = null;
  try {
    recentCount = await countDocsCreatedInLastDays(7);
  } catch (err) {
    // Don't block generation on a Drive count failure — just log it.
    await postSystemMessage(
      `:warning: Blog cron usage check failed (continuing anyway): ${(err as Error).message}`,
    ).catch(() => undefined);
  }
  if (recentCount !== null && recentCount >= WEEKLY_DRAFT_THROTTLE) {
    await postSystemMessage(
      `:pause_button: *Blog cron paused.* ${recentCount}/${WEEKLY_DRAFT_CAP} drafts already created this week (90% threshold hit). ` +
        `Approve or reject existing drafts to clear the queue, or raise \`WEEKLY_DRAFT_CAP\` in \`src/app/api/cron/generate/route.ts\` if you want more headroom. ` +
        `Resumes automatically as the rolling window clears.`,
    ).catch(() => undefined);
    return NextResponse.json({
      ok: true,
      skipped: "weekly-cap-throttle",
      recentCount,
      cap: WEEKLY_DRAFT_CAP,
      threshold: WEEKLY_DRAFT_THROTTLE,
    });
  }

  // Build the "already touched" set from Drive — the only source of truth
  // that survives cold starts. Match by 40-char question prefix, same shape
  // the publish-check uses.
  let touchedQuestionPrefixes = new Set<string>();
  try {
    const allDocNames = await listAllDocNames();
    touchedQuestionPrefixes = new Set(
      allDocNames.map((n) =>
        n
          .replace(/^\[(DRAFT|PUBLISHED [^\]]+|REJECTED [^\]]+)\]\s*/, "")
          .toLowerCase()
          .slice(0, 40),
      ),
    );
  } catch (err) {
    await postSystemMessage(
      `:warning: Blog cron: could not read Drive folder state (continuing with in-memory queue only): ${(err as Error).message}`,
    ).catch(() => undefined);
  }

  // Skip topics whose question already appears in Drive (drafted/published/rejected).
  const availableTopics = TOPIC_QUEUE.filter(
    (t) =>
      t.status === "queued" &&
      !touchedQuestionPrefixes.has(t.question.toLowerCase().slice(0, 40)),
  );

  const topics = availableTopics.slice(0, DRAFTS_PER_DAY);
  if (topics.length === 0) {
    await postSystemMessage(
      "*Blog cron:* no new topics to draft. Either the queue is empty or every queued topic already has a Doc in Drive. " +
        "Add topics to `src/content/blog/_queue.ts` to resume daily drafts.",
    ).catch(() => undefined);
    return NextResponse.json({ ok: true, generated: 0, reason: "no eligible topics" });
  }

  const summaries: DraftSummary[] = [];
  const skipped: { topic: Topic; reason: string; score?: number }[] = [];

  // Generate all topics in parallel — sequential Opus calls add up past
  // Vercel's 60s function cap. Parallel costs a small extra cache write
  // (second call may not hit the first call's cache) but cuts wall time
  // roughly in half. Each draft is independent so a single failure doesn't
  // block the rest.
  topics.forEach((t) => setTopicStatus(t.id, "generating"));

  const draftResults = await Promise.all(
    topics.map(async (topic) => {
      const sisters = ALL_POSTS.filter((p) => p.cluster === topic.cluster)
        .map((p) => p.slug)
        .slice(0, 5);

      const result = await generateBlogPost({
        question: topic.question,
        slug: topic.id,
        cluster: topic.cluster,
        clusterLabel: CLUSTER_LABELS[topic.cluster],
        intent: topic.intent,
        ctaMode: topic.suggestedCtaMode,
        sisterSlugs: sisters,
        topicId: topic.id,
      });
      return { topic, result };
    }),
  );

  // After all generations finish, create Drive Docs sequentially (Drive's
  // API is fast and serial keeps quota usage predictable).
  for (const { topic, result } of draftResults) {
    if (!result.ok) {
      setTopicStatus(topic.id, "queued");
      skipped.push({ topic, reason: `generation failed: ${result.reason}` });
      continue;
    }

    const rubric = scoreDraft(result.post);

    if (!rubric.shouldShip) {
      setTopicStatus(topic.id, "queued");
      skipped.push({
        topic,
        reason: `rubric ${rubric.score}/30 (${rubric.tier})`,
        score: rubric.score,
      });
      continue;
    }

    const rubricNotes = rubric.failures.map(
      (f) => `Q${f.questionId}: ${f.description}`,
    );
    const docText = serializeBlogPost(result.post, rubric.score, rubricNotes);
    let docInfo: { id: string; url: string };
    try {
      docInfo = await createDraftDoc(
        `[DRAFT] ${result.post.question}`,
        docText,
      );
    } catch (err) {
      setTopicStatus(topic.id, "queued");
      skipped.push({
        topic,
        reason: `drive error: ${(err as Error).message}`,
        score: rubric.score,
      });
      continue;
    }

    setTopicStatus(topic.id, "drafted");
    summaries.push({
      post: result.post,
      docUrl: docInfo.url,
      rubricScore: rubric.score,
      rubricTier: rubricTierFor(rubric.score),
    });
  }

  if (summaries.length > 0) {
    try {
      await postDailyDigest(summaries);
    } catch (err) {
      await postSystemMessage(
        `Blog cron: ${summaries.length} drafts created but Slack digest failed: ${(err as Error).message}`,
      ).catch(() => undefined);
    }
  }

  if (skipped.length > 0) {
    const lines = skipped.map(
      (s) => `• \`${s.topic.id}\` — ${s.reason}`,
    );
    await postSystemMessage(
      `Blog cron: skipped ${skipped.length} topic(s):\n${lines.join("\n")}`,
    ).catch(() => undefined);
  }

  return NextResponse.json({
    ok: true,
    generated: summaries.length,
    skipped: skipped.length,
    queueRemaining: TOPIC_QUEUE.filter((t) => t.status === "queued").length,
  });
}
