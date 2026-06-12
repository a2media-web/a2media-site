"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process61TileGrid.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simpler #4: 3-tile grid with progress rings.
 *
 * Three large square tiles side by side. Each tile = video thumbnail
 * with a circular progress ring overlaying the bottom-right corner +
 * step title underneath. No table, no metadata, no chrome. Reads like
 * a YouTube channel page or app library.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process61TileGrid() {
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

  const r = 22;
  const c = 2 * Math.PI * r;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>YouTube · channel uploads</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.grid}>
          {PROCESS_STEPS.map((s, i) => {
            const status = statusOf(i);
            const dashOffset = c - (c * progress[i]) / 100;
            return (
              <div key={s.title} className={`${styles.tile} ${status !== "wait" ? styles.tileOn : ""}`}>
                <div className={styles.thumb} style={{ background: `linear-gradient(135deg, ${COLORS[i]}, var(--a2-night-core))` }}>
                  <span className={styles.thumbStep}>STEP {i + 1}</span>
                  <span className={styles.thumbDur}>{i === 0 ? "3:00" : i === 1 ? "5:42" : "4:18"}</span>
                  <div className={styles.ringWrap}>
                    <svg viewBox="0 0 60 60" className={styles.ring}>
                      <circle cx="30" cy="30" r={r} className={styles.ringTrack} />
                      <circle
                        cx="30" cy="30" r={r}
                        className={styles.ringFill}
                        style={{ stroke: COLORS[i] }}
                        strokeDasharray={c}
                        strokeDashoffset={dashOffset}
                      />
                    </svg>
                    <span className={styles.ringInner}>
                      {status === "live" ? "✓" : status === "up" ? `${Math.floor(progress[i])}` : "○"}
                    </span>
                  </div>
                </div>
                <div className={styles.tileBody}>
                  <h3 className={styles.tileTitle}>{s.title}</h3>
                  <p className={styles.tileStatus} style={status === "up" ? { color: COLORS[i] } : {}}>
                    {status === "wait" && "Up next"}
                    {status === "up"   && "Uploading…"}
                    {status === "live" && "✓ Live on channel"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
