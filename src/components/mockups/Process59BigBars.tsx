"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process59BigBars.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simpler #2: Just-the-bars.
 *
 * The most minimal version. Three large horizontal progress bars
 * stacked vertically with the step title above each and a status pill
 * to the right. No app chrome, no thumbnails, no metadata. The bar IS
 * the visual. One descriptor line below the heading anchors it.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process59BigBars() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [progress, setProgress] = useState([0, 0, 0]);
  const [running, setRunning] = useState(-1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            const runJob = (idx: number) => {
              setRunning(idx);
              const start = performance.now();
              const dur = 2400;
              const tick = (t: number) => {
                const p = Math.min(1, (t - start) / dur);
                setProgress((prev) => { const n = [...prev]; n[idx] = p * 100; return n; });
                if (p < 1) requestAnimationFrame(tick);
                else if (idx < 2) setTimeout(() => runJob(idx + 1), 320);
                else setRunning(3);
              };
              requestAnimationFrame(tick);
            };
            setTimeout(() => runJob(0), 500);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const statusOf = (i: number) => (progress[i] >= 100 ? "live" : running === i ? "up" : "wait");

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The plan · 4-6 months</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.bars}>
          {PROCESS_STEPS.map((s, i) => {
            const status = statusOf(i);
            return (
              <div key={s.title} className={styles.barRow}>
                <div className={styles.barHead}>
                  <div className={styles.barTitle}>
                    <span className={styles.barNum}>0{i + 1}</span>
                    <h3 className={styles.barText}>{s.title}</h3>
                  </div>
                  <span className={`${styles.chip} ${styles[`chip_${status}`]}`}>
                    {status === "wait" ? "Up next" : status === "up" ? "In progress" : "✓ Done"}
                  </span>
                </div>
                <div className={styles.bar}>
                  <div className={styles.fill} style={{ width: `${progress[i]}%`, background: COLORS[i] }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
