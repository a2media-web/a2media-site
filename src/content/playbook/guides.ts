/**
 * Playbook guide data. One JSON file per guide in ./guides/.
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

// One JSON file per guide in src/content/playbook/guides/, read at build time
// (server-side only: every consumer is a server component or route), the same
// way blog auto-posts are loaded.
function loadGuides(): PlaybookGuide[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require("fs") as typeof import("fs");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require("path") as typeof import("path");
  const dir = path.join(process.cwd(), "src/content/playbook/guides");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map(
      (f) =>
        JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as PlaybookGuide,
    );
}

export const GUIDES: PlaybookGuide[] = loadGuides();

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
