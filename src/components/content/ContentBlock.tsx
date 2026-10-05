/**
 * Renders one body block for long-form content (blog posts, playbook guides).
 * Shares the blog post stylesheet so both sections read the same.
 */

import type { BlogPostBlock } from "@/content/blog/posts";
import styles from "@/app/blog/[slug]/BlogPost.module.css";

export function ContentBlock({ block }: { block: BlogPostBlock }) {
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
    case "ul":
      return (
        <ul className={styles.ul}>
          {block.items.map((item, i) => (
            <li key={i}>
              <strong>{item.label}:</strong> {item.text}
            </li>
          ))}
        </ul>
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

/** Estimated read time from the lead + body blocks. */
export function readMinutes(content: {
  body: BlogPostBlock[];
  answer: string;
}): number {
  const wordCount = content.body
    .flatMap((b) => {
      if (b.type === "p" || b.type === "h2") return [b.text];
      if (b.type === "ol") return b.items;
      if (b.type === "ul") return b.items.flatMap((it) => [it.label, it.text]);
      if (b.type === "table")
        return [...b.headers, ...b.rows.flatMap((r) => r)];
      if (b.type === "proprietary") return [b.label, b.body, b.source];
      return [];
    })
    .join(" ")
    .split(/\s+/).length;
  const total = wordCount + content.answer.split(/\s+/).length;
  return Math.max(1, Math.round(total / 220));
}
