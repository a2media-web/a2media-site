/**
 * Playbook-specific JSON-LD schema helpers.
 *
 * Article + BreadcrumbList for guides, CollectionPage for the hub. FAQPage
 * reuses `blogPostFaqSchema` from blogSchemas.ts.
 */

import {
  CATEGORY_LABELS,
  type PlaybookGuide,
} from "@/content/playbook/guides";
import type { JsonLdSchema } from "./JsonLd";

const SITE_URL = "https://a2media.ca";
const ORG_ID = `${SITE_URL}#organization`;

export function guideArticleSchema(guide: PlaybookGuide): JsonLdSchema {
  const url = `${SITE_URL}/playbook/${guide.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: guide.title,
    description: guide.answer,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: {
      "@type": "Person",
      name: guide.author,
      url: "https://www.linkedin.com/in/ademola-adelakun/",
    },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: CATEGORY_LABELS[guide.category],
    inLanguage: "en",
  };
}

export function guideBreadcrumbSchema(guide: PlaybookGuide): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Playbook",
        item: `${SITE_URL}/playbook`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `${SITE_URL}/playbook/${guide.slug}`,
      },
    ],
  };
}

export function playbookHubSchemas(guides: PlaybookGuide[]): JsonLdSchema[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/playbook#collection`,
      name: "The A2 Media Video Playbook",
      url: `${SITE_URL}/playbook`,
      publisher: { "@id": ORG_ID },
      hasPart: guides.map((g) => ({
        "@type": "Article",
        headline: g.title,
        url: `${SITE_URL}/playbook/${g.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Playbook",
          item: `${SITE_URL}/playbook`,
        },
      ],
    },
  ];
}
