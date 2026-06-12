"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process51RackFocus.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Concept 2 — Rack focus depth shift.
 *
 * Three depth planes stacked across one cinematic frame. The "focus"
 * racks slowly from plane 1 → 2 → 3 every ~3.5s. Inactive planes blur.
 * Hover (or click) any plane to manually rack focus there. Mimics the
 * camera move every video editor lives by. Hypnotic because your eye
 * follows the focus.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process51RackFocus() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            loopRef.current = setInterval(() => {
              if (!paused) setActive((a) => (a + 1) % 3);
            }, 3600);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, [paused]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The plan · 4-6 months</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div
          className={styles.stage}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={styles.tc}>● REC · 00:0{active + 1}:24:18</div>
          <div className={styles.iris}>F/1.4</div>

          {PROCESS_STEPS.map((s, i) => (
            <button
              type="button"
              key={s.title}
              className={`${styles.plane} ${styles[`plane_${i}`]} ${active === i ? styles.planeActive : ""}`}
              onMouseEnter={() => { setActive(i); setPaused(true); }}
              onClick={() => { setActive(i); setPaused(true); }}
              aria-label={`Rack focus to ${s.title}`}
            >
              <div className={styles.planeContent}>
                <span className={styles.planeNum} style={{ background: COLORS[i] }}>{i + 1}</span>
                <p className={styles.planeEyebrow}>{s.eyebrow}</p>
                <h3 className={styles.planeTitle}>{s.title}</h3>
                <p className={styles.planeDesc}>{s.desc}</p>
              </div>
              <div className={styles.planeGlow} style={{ background: COLORS[i] }} />
            </button>
          ))}

          <div className={styles.crosshair}>
            <span className={styles.crossH} />
            <span className={styles.crossV} />
            <span className={styles.crossLabel}>FOCUS · STEP {active + 1}</span>
          </div>

          <div className={styles.depthBar}>
            <span className={styles.depthLabel}>FOREGROUND</span>
            <div className={styles.depthTrack}>
              <span className={styles.depthHead} style={{ left: `${active * 50}%` }} />
            </div>
            <span className={styles.depthLabel}>BACKGROUND</span>
          </div>
        </div>
      </div>
    </section>
  );
}
