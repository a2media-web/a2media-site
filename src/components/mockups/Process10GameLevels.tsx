"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process10GameLevels.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Game level progression.
 *
 * Three "worlds" stacked like a video-game level select screen. Each
 * starts LOCKED. As the user scrolls in, levels unlock one at a time
 * with a green ✓ stamp and a "CLEARED" badge. Final card celebrates
 * the pipeline outcome. Pixel-styled framing borders and 8-bit dotted
 * connectors between worlds.
 */

export default function Process10GameLevels() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [unlocked, setUnlocked] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            [1, 2, 3].forEach((n) => setTimeout(() => setUnlocked(n), n * 900));
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
        <p className={styles.eyebrow}>A2 · PIPELINE QUEST · 1980</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.levels}>
          {PROCESS_STEPS.map((s, i) => {
            const isUnlocked = i < unlocked;
            return (
              <div
                key={s.title}
                className={`${styles.level} ${isUnlocked ? styles.levelUnlocked : ""}`}
              >
                <div className={styles.worldBadge}>
                  <span className={styles.worldNum}>1-{i + 1}</span>
                  <span className={styles.worldWord}>WORLD</span>
                </div>

                <div className={styles.tile}>
                  <div className={styles.tileHead}>
                    <span className={styles.statusChip}>
                      {isUnlocked ? "CLEARED" : "LOCKED"}
                    </span>
                    <span className={styles.coins}>
                      {Array.from({ length: 3 }).map((_, j) => (
                        <span
                          key={j}
                          className={`${styles.coin} ${isUnlocked ? styles.coinOn : ""}`}
                        />
                      ))}
                    </span>
                  </div>

                  <p className={styles.stepEyebrow}>{s.eyebrow}</p>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>

                  {isUnlocked && (
                    <div className={styles.clearStamp} aria-hidden>
                      ✓
                    </div>
                  )}
                </div>

                {i < PROCESS_STEPS.length - 1 && (
                  <div
                    className={`${styles.connector} ${i < unlocked - 1 ? styles.connectorOn : ""}`}
                    aria-hidden
                  >
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={`${styles.endgame} ${unlocked >= 3 ? styles.endgameWin : ""}`}>
          <span className={styles.endgameLabel}>PIPELINE BUILT</span>
        </div>
      </div>
    </section>
  );
}
