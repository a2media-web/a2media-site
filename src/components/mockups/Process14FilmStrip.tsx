"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process14FilmStrip.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * 35mm film strip.
 *
 * Horizontal strip of three film frames with sprocket holes top + bottom.
 * A director's slate on the left snaps shut to "ACTION!" and the strip
 * slides left as the next frame moves into the spotlight. Behaves like
 * an actual film reel being played. Most cinematic of the video set.
 */

const FRAME_LABELS = ["FRAME 01", "FRAME 02", "FRAME 03"];

export default function Process14FilmStrip() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [clapper, setClapper] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            setClapper(true);
            setTimeout(() => setClapper(false), 600);
            [1, 2].forEach((n) => setTimeout(() => setActiveIdx(n), 1600 + (n - 1) * 1800));
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
        <p className={styles.eyebrow}>A2 Studios · 35mm reel</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.studio}>
          <div className={`${styles.clapperboard} ${clapper ? styles.clapperShut : ""}`}>
            <div className={styles.clapperTop}>
              <span className={styles.clapperStripe} />
              <span className={styles.clapperStripe} />
              <span className={styles.clapperStripe} />
              <span className={styles.clapperStripe} />
            </div>
            <div className={styles.clapperBody}>
              <div className={styles.clapperRow}>
                <span className={styles.clapperLabel}>PROD</span>
                <span className={styles.clapperValue}>A2.MEDIA</span>
              </div>
              <div className={styles.clapperRow}>
                <span className={styles.clapperLabel}>SCENE</span>
                <span className={styles.clapperValue}>0{activeIdx + 1}</span>
              </div>
              <div className={styles.clapperRow}>
                <span className={styles.clapperLabel}>TAKE</span>
                <span className={styles.clapperValue}>01</span>
              </div>
              <div className={styles.clapperRow}>
                <span className={styles.clapperLabel}>DIR</span>
                <span className={styles.clapperValue}>A.ADELAKUN</span>
              </div>
              <div className={styles.clapperAction}>ACTION!</div>
            </div>
          </div>

          <div className={styles.reelWindow}>
            <div className={styles.sprocketsTop} aria-hidden>
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className={styles.sprocketHole} />
              ))}
            </div>
            <div
              className={styles.strip}
              style={{ transform: `translateX(${-activeIdx * 100}%)` }}
            >
              {PROCESS_STEPS.map((s, i) => (
                <div
                  key={s.title}
                  className={`${styles.frame} ${i === activeIdx ? styles.frameActive : ""}`}
                >
                  <div className={styles.frameLabel}>{FRAME_LABELS[i]}</div>
                  <p className={styles.stepEyebrow}>{s.eyebrow}</p>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                  <div className={styles.frameTimecode}>
                    00:0{i + 1}:00:00
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.sprocketsBottom} aria-hidden>
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className={styles.sprocketHole} />
              ))}
            </div>
          </div>

          <div className={styles.scrubber}>
            {PROCESS_STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.scrubBtn} ${i === activeIdx ? styles.scrubBtnActive : ""}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`Frame ${i + 1}`}
              >
                <span className={styles.scrubDot} />
                <span className={styles.scrubLabel}>FRAME 0{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
