"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process62Stepper.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simpler #5: Horizontal stepper / workflow diagram.
 *
 * Three nodes connected by a single line. Each node = circle with the
 * step number + icon. Line fills L→R as progress advances. Title +
 * one-line description below each node. Cleanest possible "3 steps"
 * visual — almost a flowchart.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process62Stepper() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            const start = performance.now();
            const dur = 6000;
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / dur);
              setProgress(p * 100);
              const idx = p < 0.4 ? 0 : p < 0.75 ? 1 : 2;
              setActive(idx);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reached = (i: number) => {
    const thresholds = [16, 50, 96];
    return progress >= thresholds[i];
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The plan</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.stepper}>
          <div className={styles.track}>
            <div className={styles.trackFill} style={{ width: `${progress}%`, background: COLORS[Math.max(0, active)] }} />
          </div>

          {PROCESS_STEPS.map((s, i) => {
            const at = i === 0 ? 16 : i === 1 ? 50 : 96;
            const done = reached(i);
            const isActive = active === i && !done;
            return (
              <div
                key={s.title}
                className={`${styles.node} ${done ? styles.nodeDone : ""} ${isActive ? styles.nodeActive : ""}`}
                style={{ left: `${at}%` }}
              >
                <span
                  className={styles.dot}
                  style={done ? { background: COLORS[i], borderColor: COLORS[i] } : {}}
                >
                  {done ? "✓" : i + 1}
                </span>
              </div>
            );
          })}
        </div>

        <div className={styles.captions}>
          {PROCESS_STEPS.map((s, i) => {
            const done = reached(i);
            return (
              <div key={s.title} className={`${styles.caption} ${done ? styles.captionOn : ""}`}>
                <span className={styles.capLabel} style={done ? { color: COLORS[i] } : {}}>
                  Step {i + 1}
                </span>
                <h3 className={styles.capTitle}>{s.title}</h3>
                <p className={styles.capDesc}>{s.desc.split(".")[0]}.</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
