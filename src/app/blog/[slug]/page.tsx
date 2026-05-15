import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  articleSchema,
  blogPostFaqSchema,
  blogPostBreadcrumbSchema,
} from "@/components/seo/blogSchemas";
import {
  ALL_POSTS,
  getPostBySlug,
  getSisterPosts,
  type BlogPostBlock,
} from "@/content/blog/posts";
import styles from "./BlogPost.module.css";

export async function generateStaticParams() {
  return ALL_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found — A2 Media" };
  return {
    title: `${post.question} — A2 Media`,
    description: post.answer,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.question,
      description: post.answer,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const sisters = getSisterPosts(post.slug, post.cluster);
  const faq = blogPostFaqSchema(post);
  const schemas = [articleSchema(post), blogPostBreadcrumbSchema(post)];
  if (faq) schemas.push(faq);

  const formattedPublished = new Date(post.publishedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.crumbs}>
              <Link href="/blog" className={styles.crumbLink}>
                Blog
              </Link>
              <span className={styles.crumbDot} aria-hidden>
                ·
              </span>
              <span className={styles.cluster}>{post.clusterLabel}</span>
            </p>
            <h1 className={styles.h1}>{post.question}</h1>
            <p className={styles.lead}>{post.answer}</p>
            <p className={styles.byline}>
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.publishedAt}>{formattedPublished}</time>
              <span aria-hidden>·</span>
              <span>{readMinutes(post)} min read</span>
            </p>
          </div>
        </header>

        <article className={styles.body}>
          <div className={styles.bodyInner}>
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </article>

        <section
          className={`${styles.closing} ${
            post.ctaMode === "helpful" ? styles.closingHelpful : ""
          }`}
        >
          <div className={styles.closingInner}>
            <p className={styles.closingText}>{post.closing.text}</p>
            <CtaLink
              url={post.closing.cta.url}
              anchor={post.closing.cta.anchor}
              mode={post.ctaMode}
            />
          </div>
        </section>

        {sisters.length > 0 && (
          <section className={styles.sisters}>
            <div className={styles.sistersInner}>
              <p className={styles.sistersHeading}>
                More in {post.clusterLabel}
              </p>
              <div className={styles.sistersGrid}>
                {sisters.map((s) => (
                  <Link
                    href={`/blog/${s.slug}`}
                    key={s.slug}
                    className={styles.sisterCard}
                  >
                    <p className={styles.sisterCluster}>{s.clusterLabel}</p>
                    <h3 className={styles.sisterTitle}>{s.question}</h3>
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

function CtaLink({
  url,
  anchor,
  mode,
}: {
  url: string;
  anchor: string;
  mode: "sell" | "helpful";
}) {
  const isExternal = /^https?:\/\//.test(url);
  const className = mode === "sell" ? styles.cta : styles.ctaHelpful;
  if (isExternal) {
    return (
      <a
        href={url}
        className={className}
        target="_blank"
        rel="noreferrer"
      >
        {anchor}
      </a>
    );
  }
  return (
    <Link href={url} className={className}>
      {anchor}
    </Link>
  );
}

function Block({ block }: { block: BlogPostBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className={styles.h2}>{block.text}</h2>;
    case "p":
      return <p className={styles.p}>{block.text}</p>;
    case "ol":
      return (
        <ol className={styles.ol}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "proprietary":
      return (
        <aside className={styles.proprietary}>
          <p className={styles.proprietaryLabel}>{block.label}</p>
          <p className={styles.proprietaryBody}>{block.body}</p>
          <p className={styles.proprietarySource}>{block.source}</p>
        </aside>
      );
  }
}

function readMinutes(post: { body: BlogPostBlock[]; answer: string }): number {
  const wordCount = post.body
    .flatMap((b) => {
      if (b.type === "p" || b.type === "h2") return [b.text];
      if (b.type === "ol") return b.items;
      if (b.type === "table")
        return [...b.headers, ...b.rows.flatMap((r) => r)];
      if (b.type === "proprietary") return [b.label, b.body, b.source];
      return [];
    })
    .join(" ")
    .split(/\s+/).length;
  const total = wordCount + post.answer.split(/\s+/).length;
  return Math.max(1, Math.round(total / 220));
}
