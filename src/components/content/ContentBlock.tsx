/**
 * Renders one body block for long-form content (blog posts, playbook guides).
 * Shares the blog post stylesheet so both sections read the same.
 */

import Link from "next/link";
import type { BlogPostBlock } from "@/content/blog/posts";
import { parseInline, plainText } from "@/lib/inlineText";
import styles from "@/app/blog/[slug]/BlogPost.module.css";

/** Renders a content string, turning `[anchor](url)` into links. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((part, i) => {
        if (part.kind === "text") return part.text;
        if (/^https?:\/\//.test(part.url)) {
          return (
            <a
              key={i}
              href={part.url}
              className={styles.inlineLink}
              target="_blank"
              rel="noopener"
            >
              {part.text}
            </a>
          );
        }
        return (
          <Link key={i} href={part.url} className={styles.inlineLink}>
            {part.text}
          </Link>
        );
      })}
    </>
  );
}

/** Turns a share/watch URL into an embeddable one where the host needs it. */
function embedUrl(url: string): string {
  const yt = url.match(/youtube\.com\/watch\?v=([\w-]+)/) ?? url.match(/youtu\.be\/([\w-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo && !url.includes("player.vimeo.com")) {
    return `https://player.vimeo.com/video/${vimeo[1]}`;
  }
  return url;
}

export function ContentBlock({ block }: { block: BlogPostBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className={styles.h2}>{block.text}</h2>;
    case "h3":
      return <h3 className={styles.h3}>{block.text}</h3>;
    case "p":
      return (
        <p className={styles.p}>
          <Inline text={block.text} />
        </p>
      );
    case "ol":
      return (
        <ol className={styles.ol}>
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </ol>
      );
    case "ul":
      return (
        <ul className={styles.ul}>
          {block.items.map((item, i) => (
            <li key={i}>
              <strong>{item.label}:</strong> <Inline text={item.text} />
            </li>
          ))}
        </ul>
      );
    case "video":
      return (
        <figure className={styles.video}>
          <div className={styles.videoFrame}>
            <iframe
              src={embedUrl(block.url)}
              title={block.title}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
            />
          </div>
          {block.caption && (
            <figcaption className={styles.videoCaption}>
              <Inline text={block.caption} />
            </figcaption>
          )}
        </figure>
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
                    <td key={ci}>
                      <Inline text={cell} />
                    </td>
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
          <p className={styles.proprietaryBody}>
            <Inline text={block.body} />
          </p>
          <p className={styles.proprietarySource}>{block.source}</p>
        </aside>
      );
  }
}

/** Estimated read time from the lead + body blocks. */
export function readMinutes(content: {
  body: BlogPostBlock[];
  answer: string;
}): number {
  const wordCount = content.body
    .flatMap((b) => {
      if (b.type === "p" || b.type === "h2" || b.type === "h3") return [b.text];
      if (b.type === "video") return [];
      if (b.type === "ol") return b.items;
      if (b.type === "ul") return b.items.flatMap((it) => [it.label, it.text]);
      if (b.type === "table")
        return [...b.headers, ...b.rows.flatMap((r) => r)];
      if (b.type === "proprietary") return [b.label, b.body, b.source];
      return [];
    })
    .map(plainText)
    .join(" ")
    .split(/\s+/).length;
  const total = wordCount + content.answer.split(/\s+/).length;
  return Math.max(1, Math.round(total / 220));
}
