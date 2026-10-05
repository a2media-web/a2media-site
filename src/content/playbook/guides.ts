/**
 * Playbook guide data — typed, hand-authored.
 *
 * Long-form guides migrated from the Notion "A2 Media Video Playbook" and
 * rewritten to the editorial standard in `src/content/blog/_TEMPLATE.md`
 * (question-shaped title, answer in the lead, question-shaped H2s).
 *
 * Guides with status "draft" render on the local dev server only. They are
 * excluded from production builds, the sitemap and the hub, so a draft can sit
 * on `main` without going live. While no guide is published, /playbook 404s.
 *
 * When a guide is published here, unpublish its Notion page (or replace it
 * with a link to the new URL) so the two copies don't compete in search.
 */

import type { BlogPostBlock } from "@/content/blog/posts";

export type PlaybookCategory =
  | "foundation"
  | "formats"
  | "look-good"
  | "steal";

export const CATEGORY_LABELS: Record<PlaybookCategory, string> = {
  foundation: "The Foundation",
  formats: "Formats That Just Work",
  "look-good": "How To Make It Look Good",
  steal: "Steal From The Best",
};

export const CATEGORY_ORDER: PlaybookCategory[] = [
  "foundation",
  "formats",
  "look-good",
  "steal",
];

export type PlaybookGuide = {
  title: string; // the H1, worded as people search it
  slug: string; // /playbook/[slug]
  answer: string; // 40-80 word lead that answers the title on its own
  status: "draft" | "published";
  category: PlaybookCategory;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
  author: string;
  targetKeyword?: string; // editorial tracking only, not rendered
  notionSource?: string; // the Notion page this replaces, to unpublish on launch
  faqSchema: boolean; // emit FAQPage schema from question-shaped H2s
  body: BlogPostBlock[];
  closing: {
    text: string;
    cta: { url: string; anchor: string };
  };
};

export const GUIDES: PlaybookGuide[] = [
  {
    title: "Template preview: how a playbook guide renders",
    slug: "template-preview",
    answer:
      "This is a placeholder guide that only exists on the local dev server. It shows how a migrated Notion guide will look on a2media.ca: the title as the question people search, this lead paragraph as the direct answer, then question-shaped sections below. Replace it with the first real guide.",
    status: "draft",
    category: "foundation",
    publishedAt: "2026-10-05",
    updatedAt: "2026-10-05",
    author: "Ademola Adelakun",
    faqSchema: true,
    body: [
      { type: "h2", text: "What goes in each section?" },
      {
        type: "p",
        text: "Each H2 is a follow-on question, and the paragraph directly under it answers that question on its own. That paragraph is what feeds the FAQ schema, so it should read correctly without the rest of the page.",
      },
      {
        type: "ul",
        items: [
          { label: "Paragraphs", text: "One idea per section, two to four paragraphs." },
          { label: "Lists", text: "Labelled lists like this one render as bullets with a bold label." },
          { label: "Proof", text: "Real A2 client numbers go in a proprietary block, never invented." },
        ],
      },
      { type: "h2", text: "What happens when it's published?" },
      {
        type: "p",
        text: "Set status to published and the guide appears on the /playbook hub, in the sitemap, and in production builds. Then unpublish the Notion copy so the two pages don't compete in search.",
      },
    ],
    closing: {
      text: "Every guide ends with the offer its question implies.",
      cta: { url: "/#Pricing", anchor: "See pricing →" },
    },
  },
];

/** Guides visible in this environment: published only in production. */
export const VISIBLE_GUIDES: PlaybookGuide[] =
  process.env.NODE_ENV === "production"
    ? GUIDES.filter((g) => g.status === "published")
    : GUIDES;

export function getGuideBySlug(slug: string): PlaybookGuide | undefined {
  return VISIBLE_GUIDES.find((g) => g.slug === slug);
}

export function getSisterGuides(
  slug: string,
  category: PlaybookCategory,
  limit = 2,
): PlaybookGuide[] {
  return VISIBLE_GUIDES.filter(
    (g) => g.slug !== slug && g.category === category,
  ).slice(0, limit);
}
