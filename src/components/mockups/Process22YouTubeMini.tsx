"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process22YouTubeMini.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * YouTube concept, compact edition.
 *
 * Smaller, denser version of the full YouTube chapters mockup. No
 * full-video frame. Just a horizontal player strip with a thumbnail
 * preview tile + chapter scrub bar on the right, and 3 step cards
 * stacked below in a compact grid.
 */

const CHAPTER_STARTS = [0, 38, 76];
const CHAPTER_LENGTHS = [38, 38, 24];

export default function Process22YouTubeMini() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [progress, setProgress] = useState(8);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            const targets = [38, 76, 92];
            targets.forEach((p, i) => {
              setTimeout(() => {
                setProgress(p);
                setActiveIdx(Math.min(i + 1, 2));
              }, 1300 + i * 1600);
            });
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const jumpTo = (i: number) => {
    setProgress(CHAPTER_STARTS[i] + 4);
    setActiveIdx(i);
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A2 Media · 3 chapters · 6:00</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.player}>
          <div className={styles.thumb}>
            <span className={styles.thumbBadge}>
              <span className={styles.thumbDot} />
              LIVE
            </span>
            <span className={styles.thumbBrand}>A2 · MEDIA</span>
            <span className={styles.thumbChapter}>0{activeIdx + 1} / 3</span>
            <span className={styles.thumbPlay}>▶</span>
          </div>

          <div className={styles.scrub}>
            <div className={styles.scrubBody}>
              <p className={styles.nowPlaying}>NOW PLAYING</p>
              <p className={styles.scrubTitle}>{PROCESS_STEPS[activeIdx].title}</p>
            </div>
            <div className={styles.scrubBar}>
              <div className={styles.scrubTrack}>
                {CHAPTER_LENGTHS.map((len, i) => (
                  <div
                    key={i}
                    className={`${styles.segment} ${i <= activeIdx ? styles.segmentOn : ""}`}
                    style={{ width: `calc(${len}% - 2px)` }}
                  />
                ))}
                <div className={styles.playhead} style={{ left: `${progress}%` }} aria-hidden>
                  <span className={styles.playheadDot} />
                </div>
              </div>
              <div className={styles.tcRow}>
                <span>{toTC(progress)}</span>
                <span>6:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          {PROCESS_STEPS.map((s, i) => (
            <button
              type="button"
              key={s.title}
              onClick={() => jumpTo(i)}
              className={`${styles.card} ${i === activeIdx ? styles.cardActive : ""}`}
            >
              <div className={styles.cardChapter}>
                CHAPTER 0{i + 1} <span className={styles.cardChapterTime}>{toTC(CHAPTER_STARTS[i])}</span>
              </div>
              <p className={styles.stepEyebrow}>{s.eyebrow}</p>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function toTC(pct: number): string {
  const secs = Math.floor((pct / 100) * 360);
  const m = Math.floor(secs / 60);
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}
