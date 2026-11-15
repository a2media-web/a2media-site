import type { MetadataRoute } from "next";
import { ALL_POSTS } from "@/content/blog/posts";
import { VISIBLE_GUIDES } from "@/content/playbook/guides";

const SITE_URL = "https://a2media.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...ALL_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...(VISIBLE_GUIDES.length > 0
      ? [
          {
            url: `${SITE_URL}/playbook`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : []),
    ...VISIBLE_GUIDES.map((guide) => ({
      url: `${SITE_URL}/playbook/${guide.slug}`,
      lastModified: new Date(guide.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
