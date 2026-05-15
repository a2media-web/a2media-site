import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogIndexBreadcrumbSchema } from "@/components/seo/blogSchemas";
import { ALL_POSTS } from "@/content/blog/posts";
import styles from "./BlogIndex.module.css";

export const metadata: Metadata = {
  title: "Blog — A2 Media",
  description:
    "Direct answers to the questions B2B SaaS marketing leaders ask about video strategy, pricing, hiring, formats, distribution, and measurement.",
};

export default function BlogIndexPage() {
  const posts = [...ALL_POSTS].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>The A2 Media blog</p>
            <h1 className={styles.title}>
              Direct answers to the questions{" "}
              <span className={styles.italic}>B2B SaaS marketers</span> are
              actually asking.
            </h1>
            <p className={styles.subtitle}>
              One question per post. The answer in the first paragraph. No
              fluff, no listicles, no "in today&apos;s fast-paced world."
            </p>
          </div>
        </header>

        <section className={styles.list}>
          <div className={styles.listInner}>
            {posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className={styles.card}
              >
                <p className={styles.cluster}>{post.clusterLabel}</p>
                <h2 className={styles.cardTitle}>{post.question}</h2>
                <p className={styles.cardAnswer}>{post.answer}</p>
                <p className={styles.cardMeta}>
                  <span>{post.author}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span className={styles.readMore}>Read →</span>
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd data={blogIndexBreadcrumbSchema()} />
    </>
  );
}
