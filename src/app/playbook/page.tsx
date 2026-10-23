import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { playbookHubSchemas } from "@/components/seo/playbookSchemas";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  VISIBLE_GUIDES,
} from "@/content/playbook/guides";
import blogStyles from "../blog/BlogIndex.module.css";
import styles from "./Playbook.module.css";

export const metadata: Metadata = {
  title: "The B2B SaaS Video Playbook",
  description:
    "Free guides from real A2 Media campaigns for B2B SaaS teams: getting buy-in for video, founder-led content, scripts, hooks, formats and what to steal from the best.",
  alternates: {
    canonical: "/playbook",
  },
};

export default function PlaybookHubPage() {
  // Nothing published yet: keep the hub out of production entirely.
  if (VISIBLE_GUIDES.length === 0) notFound();

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    guides: VISIBLE_GUIDES.filter((g) => g.category === category),
  })).filter((g) => g.guides.length > 0);

  return (
    <>
      <Nav />
      <main className={blogStyles.main}>
        <header className={blogStyles.hero}>
          <div className={blogStyles.heroInner}>
            <p className={blogStyles.eyebrow}>The A2 Media Video Playbook</p>
            <h1 className={blogStyles.title}>
              Everything we&apos;ve learned shipping video for{" "}
              <span className={blogStyles.italic}>B2B SaaS teams</span>.
            </h1>
            <p className={blogStyles.subtitle}>
              Free guides from real campaigns. Browse by category, steal
              what&apos;s useful.
            </p>
          </div>
        </header>

        <section className={blogStyles.list}>
          {groups.map(({ category, guides }) => (
            <div key={category} className={styles.group}>
              <h2 className={styles.groupHeading}>
                {CATEGORY_LABELS[category]}
              </h2>
              <div className={blogStyles.listInner}>
                {guides.map((guide) => (
                  <Link
                    href={`/playbook/${guide.slug}`}
                    key={guide.slug}
                    className={blogStyles.card}
                  >
                    {guide.status === "draft" && (
                      <p className={styles.draft}>Draft · dev only</p>
                    )}
                    <h3 className={blogStyles.cardTitle}>{guide.title}</h3>
                    <p className={blogStyles.cardAnswer}>{guide.answer}</p>
                    <p className={blogStyles.cardMeta}>
                      <span>{guide.author}</span>
                      <span className={blogStyles.readMore}>Read →</span>
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
      <JsonLd data={playbookHubSchemas(VISIBLE_GUIDES)} />
    </>
  );
}
