"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process52Hourglass.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Hypnotic concept #3: Cascading hourglasses.
 *
 * Three hourglasses on a shelf. Sand pours through them in sequence —
 * first one finishes, then the next starts, then the last. Each
 * completed hourglass keeps its step text visible. Almost meditative.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process52Hourglass() {
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
            const runOne = (idx: number) => {
              setRunning(idx);
              const start = performance.now();
              const dur = 2600;
              const tick = (t: number) => {
                const p = Math.min(1, (t - start) / dur);
                setProgress((prev) => { const n = [...prev]; n[idx] = p; return n; });
                if (p < 1) requestAnimationFrame(tick);
                else if (idx < 2) setTimeout(() => runOne(idx + 1), 500);
                else setRunning(3);
              };
              requestAnimationFrame(tick);
            };
            setTimeout(() => runOne(0), 600);
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
        <p className={styles.eyebrow}>The flow</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.shelf}>
          {PROCESS_STEPS.map((s, i) => {
            const p = progress[i];
            const isLive = running === i || p > 0;
            return (
              <div key={s.title} className={`${styles.unit} ${isLive ? styles.unitOn : ""}`}>
                <span className={styles.stepTag}>Step {i + 1}</span>
                <div className={styles.glass}>
                  <div className={styles.frameTop}>
                    <div
                      className={styles.sandTop}
                      style={{ height: `${(1 - p) * 100}%`, background: COLORS[i] }}
                    />
                  </div>
                  <div className={styles.neck} />
                  <div className={styles.stream}>
                    {running === i && p < 1 && (
                      <div className={styles.streamLine} style={{ background: COLORS[i] }} />
                    )}
                  </div>
                  <div className={styles.frameBottom}>
                    <div
                      className={styles.sandBottom}
                      style={{ height: `${p * 100}%`, background: COLORS[i] }}
                    />
                  </div>
                  <div className={styles.glassOutline} />
                </div>
                <div className={styles.copy}>
                  <p className={styles.copyEyebrow} style={{ color: COLORS[i] }}>{s.eyebrow}</p>
                  <h3 className={styles.copyTitle}>{s.title}</h3>
                  <p className={styles.copyDesc}>{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
