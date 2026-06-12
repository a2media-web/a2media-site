"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process57Heartbeat.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Hypnotic concept #8: Heartbeat / ECG pulse line.
 *
 * A pulse line sweeps left-to-right across a dark monitor. Three peaks
 * are embedded in the line — one per step. As the sweep passes each
 * peak, the peak glows and the matching step lights up. Loops forever
 * like a hospital monitor — calm, steady, addictive to watch.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

// SVG path for the ECG line — three peaks at x=20, x=50, x=80
const PATH = "M 0 50 L 12 50 L 14 50 L 16 45 L 18 55 L 20 30 L 22 70 L 24 50 L 28 50 L 42 50 L 44 45 L 46 55 L 48 25 L 50 75 L 52 50 L 56 50 L 72 50 L 74 50 L 76 45 L 78 55 L 80 20 L 82 80 L 84 50 L 88 50 L 100 50";

export default function Process57Heartbeat() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [active, setActive] = useState(0);
  const [sweep, setSweep] = useState(0);

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
            const loop = (t: number) => {
              const elapsed = (t - start) % 6000;
              const p = elapsed / 6000;
              setSweep(p * 100);
              const peakX = [20, 50, 80];
              const nearest = peakX.findIndex((x) => Math.abs(p * 100 - x) < 5);
              if (nearest >= 0) setActive(nearest);
              requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
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
        <p className={styles.eyebrow}>The signal</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.monitor}>
          <div className={styles.monitorHead}>
            <span className={styles.recDot} style={{ background: COLORS[active] }} />
            <span className={styles.monitorLabel}>A2 ENGINE · LIVE FEED</span>
            <span className={styles.bpm}>BPM <b style={{ color: COLORS[active] }}>72</b></span>
            <span className={styles.spo2}>O₂ <b>98%</b></span>
            <span style={{ marginLeft: "auto" }} className={styles.tc}>00:0{active + 1}:{Math.floor(sweep).toString().padStart(2, "0")}</span>
          </div>

          <div className={styles.scope}>
            <div className={styles.gridLines}>
              {Array.from({ length: 9 }).map((_, i) => <span key={`h${i}`} className={styles.gridH} style={{ top: `${(i + 1) * 10}%` }} />)}
              {Array.from({ length: 19 }).map((_, i) => <span key={`v${i}`} className={styles.gridV} style={{ left: `${(i + 1) * 5}%` }} />)}
            </div>

            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.svg}>
              <path d={PATH} className={styles.pathBase} stroke={COLORS[active]} />
              <defs>
                <linearGradient id="ecgFade" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={COLORS[active]} stopOpacity="0" />
                  <stop offset="80%" stopColor={COLORS[active]} stopOpacity="1" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="1" />
                </linearGradient>
                <clipPath id="ecgReveal">
                  <rect x="0" y="0" width={sweep} height="100" />
                </clipPath>
              </defs>
              <path d={PATH} stroke="url(#ecgFade)" strokeWidth="0.8" fill="none" clipPath="url(#ecgReveal)" />
            </svg>

            <div className={styles.sweepLine} style={{ left: `${sweep}%`, background: COLORS[active] }}>
              <span className={styles.sweepDot} style={{ background: COLORS[active], boxShadow: `0 0 16px ${COLORS[active]}` }} />
            </div>

            {[20, 50, 80].map((x, i) => (
              <div
                key={i}
                className={`${styles.peakLabel} ${active === i ? styles.peakLabelOn : ""}`}
                style={{ left: `${x}%`, color: COLORS[i] }}
              >
                <span className={styles.peakNum}>STEP {i + 1}</span>
                <span className={styles.peakTitle}>{PROCESS_STEPS[i].title}</span>
              </div>
            ))}
          </div>

          <div className={styles.monitorFoot}>
            <span>LEAD II</span>
            <span>GAIN x2</span>
            <span>FILTER 0.5–40 Hz</span>
            <span style={{ marginLeft: "auto" }}>A2 MEDIA · {new Date().getFullYear()}</span>
          </div>
        </div>

        <div className={styles.cards}>
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.title} className={`${styles.card} ${active === i ? styles.cardOn : ""}`}>
              <p className={styles.cardEyebrow} style={{ color: COLORS[i] }}>{s.eyebrow}</p>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
