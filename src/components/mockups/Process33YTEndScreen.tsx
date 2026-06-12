"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process33YTEndScreen.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * YouTube concept #4: End-screen card sequence.
 *
 * The "video just ended" overlay YouTube shows. A faux thumbnail of the
 * "ended" video sits behind. Three end-screen video cards appear one at
 * a time over it (zoom + fade in animation), each with its own
 * thumbnail + title + duration. Plays the agency's medium back at them.
 */

const CARD_META = [
  { dur: "3:00", count: "Up next in 5", views: "12K views" },
  { dur: "5:42", count: "Then this",    views: "28K views" },
  { dur: "4:18", count: "And finally",  views: "47K views" },
];

export default function Process33YTEndScreen() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [appeared, setAppeared] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            [1, 2, 3].forEach((n) => setTimeout(() => setAppeared(n), 600 + n * 700));
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The video just ended. Up next…</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.player}>
          {/* The "video that just ended" sits as the backdrop */}
          <div className={styles.endedVideo} aria-hidden>
            <span className={styles.endedTitle}>How A2 Media Builds Pipeline</span>
            <span className={styles.endedThanks}>Thanks for watching.</span>
          </div>

          {/* End-screen card overlay */}
          <div className={styles.overlay}>
            {PROCESS_STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`${styles.card} ${i < appeared ? styles.cardIn : ""}`}
              >
                <div className={styles.cardThumb}>
                  <span className={styles.cardThumbStep}>0{i + 1}</span>
                  <span className={styles.cardThumbBrand}>A2 · {s.title.split(" ")[0]}</span>
                  <span className={styles.cardThumbPlay}>▶</span>
                  <span className={styles.cardThumbDur}>{CARD_META[i].dur}</span>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardUpNext}>{CARD_META[i].count}</p>
                  <p className={styles.stepEyebrow}>{s.eyebrow}</p>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                  <p className={styles.cardStats}>{CARD_META[i].views} · A2 Media</p>
                </div>
              </div>
            ))}

            {/* Subscribe button in the corner like YouTube's end-screen */}
            <div className={`${styles.subscribeOverlay} ${appeared >= 3 ? styles.subscribeOverlayIn : ""}`}>
              <div className={styles.subscribeAvatar}>A2</div>
              <button type="button" className={styles.subscribeBtn}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
