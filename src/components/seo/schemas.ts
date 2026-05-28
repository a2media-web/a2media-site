/**
 * Schema.org JSON-LD definitions for a2media.ca.
 *
 * These are stable across the site — Organization, WebSite,
 * ProfessionalService, BreadcrumbList. Page-specific schemas (FAQPage,
 * VideoObject) are built from typed source data inside the component
 * that owns them so the LD stays in sync with rendered content.
 */

import { STUDIES } from "../sections/StoryScroll/_shared";
import type { JsonLdSchema } from "./JsonLd";

const SITE_URL = "https://a2media.ca";
const ORG_ID = `${SITE_URL}#organization`;
const SITE_ID = `${SITE_URL}#website`;
const SERVICE_ID = `${SITE_URL}#service`;

export const organizationSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "A2 Media",
  alternateName: "a2media",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/a2-logo-mark.png`,
    width: 8225,
    height: 8534,
  },
  description:
    "B2B SaaS video content strategy and editing. A2 Media builds the video engine that turns viewers into pipeline — strategy, scripting, and editing included.",
  founder: {
    "@type": "Person",
    name: "Ademola Adelakun",
  },
  email: "ademola@a2media.ca",
  sameAs: [
    "https://www.linkedin.com/company/a2media",
  ],
  areaServed: { "@type": "Place", name: "Worldwide" },
  knowsAbout: [
    "B2B SaaS video marketing",
    "Video content strategy",
    "Video editing",
    "Founder-led video",
    "LinkedIn video",
    "YouTube strategy",
    "Sales enablement video",
    "Customer story video",
    "Product launch video",
  ],
};

export const websiteSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: "A2 Media",
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

export const serviceSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": SERVICE_ID,
  name: "A2 Media — B2B SaaS Video Content Engine",
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Place", name: "Worldwide" },
  serviceType: "Video content strategy and editing",
  description:
    "Full-funnel video for B2B SaaS teams. Strategy mapped to your buyer journey, scripts engineered to move buyers, editing that ships in 72 hours, and a measurable pipeline impact.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "A2 Media Engagements",
    itemListElement: [
      {
        "@type": "Offer",
        name: "The 2-Week Jumpstart",
        description:
          "6-month video strategy plus 3 sales-ready videos in 2 weeks. Required first step before the monthly engagement.",
        price: "8000",
        priceCurrency: "USD",
        eligibleDuration: { "@type": "QuantitativeValue", value: 2, unitCode: "WEE" },
      },
      {
        "@type": "Offer",
        name: "The Video Growth Engine",
        description:
          "Dedicated video team on a 3 to 6-month engagement. 10 to 12 done-for-you videos per month, 72-hour turnaround, and ongoing strategy. Rates from $15K to $25K per month based on engagement length.",
        price: "90000",
        priceCurrency: "USD",
        eligibleDuration: { "@type": "QuantitativeValue", value: 6, unitCode: "MON" },
      },
    ],
  },
};

export const breadcrumbSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ],
};

/** FAQPage schema from a {q, a}[] array. The answer is plain text only —
 *  we pass through anything stringifiable. */
export function faqSchema(qa: { q: string; a: string }[]): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Build VideoObject schema for each Wistia video used in ScrubReel. */
export type VideoEntry = {
  label: string;
  description: string;
  videoId: string;
};

export function videoObjectSchemas(videos: VideoEntry[]): JsonLdSchema[] {
  return videos.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${v.label} — A2 Media`,
    description: v.description,
    thumbnailUrl: `https://embed-ssl.wistia.com/deliveries/${v.videoId}/file.jpg`,
    embedUrl: `https://fast.wistia.net/embed/iframe/${v.videoId}`,
    contentUrl: `https://fast.wistia.com/medias/${v.videoId}`,
    uploadDate: "2025-01-01",
    publisher: { "@id": ORG_ID },
  }));
}

/** Item-listed case studies — used by AI engines as a structured digest of
 *  outcomes. Driven from the same STUDIES module that renders the visible
 *  content, so they can never drift. */
export const caseStudiesItemListSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "A2 Media — case studies",
  itemListElement: STUDIES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: `${s.name} — ${s.tabOutcome}`,
      description: s.after,
      headline: s.bigStat,
      about: s.bigLabel,
      isPartOf: { "@id": SITE_ID },
      author: { "@id": ORG_ID },
    },
  })),
};
