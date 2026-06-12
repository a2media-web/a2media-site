"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process32YTComments.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * YouTube concept #3: Comment thread.
 *
 * Familiar YouTube comments section. The three steps are rendered as
 * "Pinned by A2 Media" top comments with avatars, like counts, hearts,
 * and "Reply" buttons. Each comment fades in as you scroll. Below
 * each is a teaser "View 12 replies" affordance. Most "social-proof"
 * feeling of any YouTube surface.
 */

const COMMENT_META = [
  { author: "A2 Media",   handle: "@a2media",        when: "3 weeks ago",  likes: "1.2K", replies: 28 },
  { author: "A2 Media",   handle: "@a2media",        when: "1 month ago",  likes: "847",  replies: 14 },
  { author: "A2 Media",   handle: "@a2media",        when: "6 months ago", likes: "2.4K", replies: 41 },
];

export default function Process32YTComments() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [revealed, setRevealed] = useState(0);
  const [hearted, setHearted] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            [1, 2, 3].forEach((n) => setTimeout(() => setRevealed(n), 600 + n * 700));
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleHeart = (i: number) => {
    setHearted((prev) => prev.map((v, j) => (j === i ? !v : v)));
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>278 Comments · Sort by Top</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.thread}>
          <div className={styles.composer}>
            <div className={styles.composerAvatar} aria-hidden>U</div>
            <span className={styles.composerInput}>Add a comment…</span>
          </div>

          <div className={styles.comments}>
            {PROCESS_STEPS.map((s, i) => (
              <article
                key={s.title}
                className={`${styles.comment} ${i < revealed ? styles.commentIn : ""}`}
              >
                <div className={styles.commentAvatar}>
                  <span>A2</span>
                </div>
                <div className={styles.commentBody}>
                  <div className={styles.commentMeta}>
                    <span className={styles.pinned}>
                      <span className={styles.pinIcon}>📌</span> Pinned by A2 Media
                    </span>
                  </div>
                  <div className={styles.commentHead}>
                    <span className={styles.author}>{COMMENT_META[i].author}</span>
                    <span className={styles.verifiedDot} aria-label="verified">✓</span>
                    <span className={styles.creator}>Creator</span>
                    <span className={styles.timestamp}>{COMMENT_META[i].when}</span>
                  </div>
                  <p className={styles.stepEyebrow}>{s.eyebrow}</p>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={`${styles.actionBtn} ${hearted[i] ? styles.actionBtnHearted : ""}`}
                      onClick={() => toggleHeart(i)}
                      aria-label="Like"
                    >
                      <span className={styles.thumbUp}>👍</span>
                      <span className={styles.likeCount}>{COMMENT_META[i].likes}</span>
                    </button>
                    <button type="button" className={styles.actionBtn} aria-label="Dislike">
                      <span className={styles.thumbDown}>👎</span>
                    </button>
                    <button type="button" className={styles.replyBtn}>Reply</button>
                    {hearted[i] && (
                      <span className={styles.creatorHeart} aria-hidden>
                        <span className={styles.creatorHeartAvatar}>A2</span>
                        <span className={styles.heartIcon}>♥</span>
                      </span>
                    )}
                  </div>
                  <button type="button" className={styles.viewReplies}>
                    <span className={styles.repliesArrow}>▼</span> {COMMENT_META[i].replies} replies
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
