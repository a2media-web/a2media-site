/**
 * AEO topic queue. The daily cron pulls 2 topics from here each weekday.
 *
 * Status meanings:
 *   queued    — ready to generate next time the cron picks
 *   generating— currently being drafted, do not double-pick
 *   drafted   — Doc exists in 01 Drafts, waiting for approval
 *   published — Doc moved to 02 Published, MDX written, deployed
 *   rejected  — Doc moved to 03 Rejected, needs revision
 *   archived  — old, no longer relevant
 *
 * State is persisted by editing this file (the cron writes to it after
 * each generation cycle). When the topic-engine pipeline ships later,
 * this gets swapped for a Notion DB pulling from PAA + Reddit + LLM gap
 * probe outputs.
 */

import type { Cluster, CtaMode, Intent } from "./posts";

export type TopicStatus =
  | "queued"
  | "generating"
  | "drafted"
  | "published"
  | "rejected"
  | "archived";

export type Topic = {
  id: string; // stable, slug-like
  question: string;
  cluster: Cluster;
  intent: Intent;
  suggestedCtaMode: CtaMode;
  status: TopicStatus;
  notes?: string;
};

export const TOPIC_QUEUE: Topic[] = [
  // Strategy cluster
  {
    id: "when-start-youtube-b2b-saas",
    question: "When should a B2B SaaS company start a YouTube channel?",
    cluster: "strategy",
    intent: "TOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },
  {
    id: "how-many-videos-per-month-b2b-saas",
    question: "How many videos per month should a B2B SaaS company produce?",
    cluster: "strategy",
    intent: "MOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },
  {
    id: "why-b2b-saas-video-fails",
    question: "Why does most B2B SaaS video content fail to drive pipeline?",
    cluster: "strategy",
    intent: "TOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },
  {
    id: "founder-led-video-vs-brand",
    question: "Founder-led video vs. brand-led video for B2B SaaS — which works better?",
    cluster: "strategy",
    intent: "MOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },

  // Pricing cluster
  {
    id: "monthly-video-budget-saas",
    question: "What should a $20M ARR B2B SaaS company budget for video each month?",
    cluster: "pricing",
    intent: "BOFU",
    suggestedCtaMode: "sell",
    status: "queued",
  },
  {
    id: "cost-of-customer-story-video",
    question: "How much does a single customer story video cost?",
    cluster: "pricing",
    intent: "BOFU",
    suggestedCtaMode: "sell",
    status: "queued",
  },
  {
    id: "retainer-vs-project-pricing-video",
    question: "Retainer vs. project-based pricing for B2B SaaS video — which is better for the buyer?",
    cluster: "pricing",
    intent: "MOFU",
    suggestedCtaMode: "sell",
    status: "queued",
  },

  // Team / hiring cluster
  {
    id: "video-editor-job-description",
    question: "What should a B2B SaaS video editor's job description include?",
    cluster: "team",
    intent: "BOFU",
    suggestedCtaMode: "sell",
    status: "queued",
  },
  {
    id: "vet-video-editor-portfolio",
    question: "How do you vet a B2B SaaS video editor's portfolio?",
    cluster: "team",
    intent: "MOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },
  {
    id: "video-team-org-chart-saas",
    question: "What does a B2B SaaS video team org chart actually look like?",
    cluster: "team",
    intent: "MOFU",
    suggestedCtaMode: "sell",
    status: "queued",
  },

  // Format playbooks cluster
  {
    id: "ideal-customer-story-video-length",
    question: "How long should a B2B SaaS customer story video be?",
    cluster: "formats",
    intent: "MOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },
  {
    id: "talking-head-video-script-structure",
    question: "How do you structure a talking-head video script for a B2B SaaS founder?",
    cluster: "formats",
    intent: "MOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },
  {
    id: "animated-explainer-vs-live-action",
    question: "Animated explainer vs. live-action for SaaS — when do you pick each?",
    cluster: "formats",
    intent: "MOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },
  {
    id: "saas-product-launch-video-checklist",
    question: "What goes into a B2B SaaS product launch video?",
    cluster: "formats",
    intent: "MOFU",
    suggestedCtaMode: "sell",
    status: "queued",
  },
  {
    id: "saas-shorts-strategy",
    question: "How should a B2B SaaS company use vertical short-form video?",
    cluster: "formats",
    intent: "MOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },

  // Distribution cluster
  {
    id: "repurpose-video-for-linkedin",
    question: "How do you repurpose long-form video for LinkedIn distribution?",
    cluster: "distribution",
    intent: "MOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },
  {
    id: "sales-enablement-video-playbook",
    question: "How should sales teams use video in deal cycles?",
    cluster: "distribution",
    intent: "MOFU",
    suggestedCtaMode: "sell",
    status: "queued",
  },
  {
    id: "youtube-thumbnail-strategy-b2b",
    question: "What makes a good YouTube thumbnail for B2B SaaS content?",
    cluster: "distribution",
    intent: "TOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },
  {
    id: "paid-social-video-ad-saas",
    question: "How should B2B SaaS companies structure paid social video ads?",
    cluster: "distribution",
    intent: "MOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },

  // Measurement cluster
  {
    id: "video-roi-attribution-saas",
    question: "How do you attribute pipeline to video in a B2B SaaS sales cycle?",
    cluster: "measurement",
    intent: "BOFU",
    suggestedCtaMode: "sell",
    status: "queued",
  },
  {
    id: "leading-indicators-video-performance",
    question: "What are the leading indicators that B2B SaaS video is working?",
    cluster: "measurement",
    intent: "MOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },
  {
    id: "report-video-roi-to-cmo",
    question: "How do you report video ROI to a CMO?",
    cluster: "measurement",
    intent: "BOFU",
    suggestedCtaMode: "sell",
    status: "queued",
  },
  {
    id: "video-vanity-vs-pipeline-metrics",
    question: "Which video metrics actually correlate with pipeline?",
    cluster: "measurement",
    intent: "TOFU",
    suggestedCtaMode: "helpful",
    status: "queued",
  },
];

export function getNextQueuedTopics(n: number): Topic[] {
  return TOPIC_QUEUE.filter((t) => t.status === "queued").slice(0, n);
}

export function setTopicStatus(id: string, status: TopicStatus): void {
  const topic = TOPIC_QUEUE.find((t) => t.id === id);
  if (topic) topic.status = status;
}
