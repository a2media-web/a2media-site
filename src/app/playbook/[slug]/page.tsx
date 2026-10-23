import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPostFaqSchema } from "@/components/seo/blogSchemas";
import {
  guideArticleSchema,
  guideBreadcrumbSchema,
} from "@/components/seo/playbookSchemas";
import { ContentBlock, readMinutes } from "@/components/content/ContentBlock";
import {
  CATEGORY_LABELS,
  VISIBLE_GUIDES,
  getGuideBySlug,
  getSisterGuides,
} from "@/content/playbook/guides";
import styles from "../../blog/[slug]/BlogPost.module.css";

export const dynamicParams = false;

export async function generateStaticParams() {
  return VISIBLE_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Not found" };
  return {
    title: guide.title,
    description: guide.answer,
    authors: [{ name: guide.author }],
    alternates: {
      canonical: `/playbook/${guide.slug}`,
    },
    robots: guide.status === "draft" ? { index: false } : undefined,
    openGraph: {
      title: guide.title,
      description: guide.answer,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      authors: [guide.author],
    },
  };
}

export default async function PlaybookGuidePage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const categoryLabel = CATEGORY_LABELS[guide.category];
  const sisters = getSisterGuides(guide.slug, guide.category);
  const faq = blogPostFaqSchema(guide);
  const schemas = [guideArticleSchema(guide), guideBreadcrumbSchema(guide)];
  if (faq) schemas.push(faq);

  const formattedUpdated = new Date(
    `${guide.updatedAt}T12:00:00`,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.crumbs}>
              <Link href="/playbook" className={styles.crumbLink}>
                Playbook
              </Link>
              <span className={styles.crumbDot} aria-hidden>
                ·
              </span>
              <span className={styles.cluster}>{categoryLabel}</span>
            </p>
            <h1 className={styles.h1}>{guide.title}</h1>
            <p className={styles.lead}>{guide.answer}</p>
            <p className={styles.byline}>
              <span>{guide.author}</span>
              <span aria-hidden>·</span>
              <span>
                Updated{" "}
                <time dateTime={guide.updatedAt}>{formattedUpdated}</time>
              </span>
              <span aria-hidden>·</span>
              <span>{readMinutes(guide)} min read</span>
            </p>
          </div>
        </header>

        <article className={styles.body}>
          <div className={styles.bodyInner}>
            {guide.body.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </div>
        </article>

        <section className={styles.closing}>
          <div className={styles.closingInner}>
            <p className={styles.closingText}>{guide.closing.text}</p>
            <Link href={guide.closing.cta.url} className={styles.cta}>
              {guide.closing.cta.anchor}
            </Link>
          </div>
        </section>

        {sisters.length > 0 && (
          <section className={styles.sisters}>
            <div className={styles.sistersInner}>
              <p className={styles.sistersHeading}>More in {categoryLabel}</p>
              <div className={styles.sistersGrid}>
                {sisters.map((s) => (
                  <Link
                    href={`/playbook/${s.slug}`}
                    key={s.slug}
                    className={styles.sisterCard}
                  >
                    <p className={styles.sisterCluster}>{categoryLabel}</p>
                    <h3 className={styles.sisterTitle}>{s.title}</h3>
                    <p className={styles.sisterAnswer}>{s.answer}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <JsonLd data={schemas} />
    </>
  );
}
