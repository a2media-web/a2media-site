/**
 * Blog-specific JSON-LD schema helpers.
 *
 * Article + FAQPage + BreadcrumbList for individual posts.
 * Builds on the base helpers in `schemas.ts` (organizationSchema id, etc.).
 */

import type { BlogPost } from "@/content/blog/posts";
import type { JsonLdSchema } from "./JsonLd";

const SITE_URL = "https://a2media.ca";
const ORG_ID = `${SITE_URL}#organization`;

export function articleSchema(post: BlogPost): JsonLdSchema {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.question,
    description: post.answer,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://www.linkedin.com/in/ademola-adelakun/",
    },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.clusterLabel,
    inLanguage: "en",
  };
}

export function blogPostFaqSchema(post: BlogPost): JsonLdSchema | null {
  if (!post.faqSchema) return null;
  // Pair each H2 with the next paragraph (the answer to that H2).
  const pairs: { q: string; a: string }[] = [];
  for (let i = 0; i < post.body.length; i++) {
    const block = post.body[i];
    if (block.type !== "h2") continue;
    const next = post.body[i + 1];
    if (next && next.type === "p") {
      pairs.push({ q: block.text, a: next.text });
    }
  }
  if (pairs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function blogPostBreadcrumbSchema(post: BlogPost): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.question,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };
}

export function blogIndexBreadcrumbSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };
}
