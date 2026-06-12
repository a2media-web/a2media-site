"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process58CardStack.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simpler #1: 3 stacked video cards.
 *
 * One large horizontal card per step. Big thumbnail on the left, title +
 * description + thin progress bar on the right. Status pill in the
 * corner. No table chrome, no metadata, no separate description cards
 * below. Everything per step lives in one card.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process58CardStack() {
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
        <p className={styles.eyebrow}>YouTube Studio</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.cards}>
          {PROCESS_STEPS.map((s, i) => {
            const status = statusOf(i);
            return (
              <div key={s.title} className={`${styles.card} ${status === "up" ? styles.cardOn : ""}`}>
                <div className={styles.thumb} style={{ background: `linear-gradient(135deg, ${COLORS[i]}, var(--a2-night-core))` }}>
                  <span className={styles.thumbDur}>{i === 0 ? "3:00" : i === 1 ? "5:42" : "4:18"}</span>
                </div>
                <div className={styles.body}>
                  <span className={styles.stepLabel}>Step {i + 1}</span>
                  <h3 className={styles.title}>{s.title}</h3>
                  <p className={styles.desc}>{s.desc.split(".")[0]}.</p>
                  <div className={styles.bar}>
                    <div className={styles.fill} style={{ width: `${progress[i]}%`, background: COLORS[i] }} />
                  </div>
                </div>
                <span className={`${styles.chip} ${styles[`chip_${status}`]}`}>
                  {status === "wait" ? "Up next" : status === "up" ? "Uploading" : "✓ Live"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
