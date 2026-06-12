"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process43OrderTracker.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Easy-to-follow concept #3: DoorDash/Domino's-style order tracker.
 *
 * The most universally understood "progress" UI on the internet. Three
 * orders stacked, each tracking through Order placed → In the kitchen →
 * Delivered. Big timeline at top, three rows below with order numbers,
 * driver photo, ETA. Replace "kitchen" with "in production" and "driver"
 * with the editor handle. Friendly, low-jargon, no software literacy
 * required.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const ETA = ["3 weeks", "6 weeks", "12 weeks"];

export default function Process43OrderTracker() {
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
                else if (idx < 2) setTimeout(() => runJob(idx + 1), 360);
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

  const stageOf = (i: number) => {
    if (progress[i] >= 100) return 3; // delivered
    if (progress[i] >= 66)  return 2; // out for delivery
    if (progress[i] >= 33)  return 1; // in production
    if (running === i)      return 0; // placed
    return -1; // queued
  };

  const STAGES = ["Order placed", "In production", "Quality check", "Delivered"];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A2 Tracker · Your video orders</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          <div className={styles.topbar}>
            <span className={styles.brand}>
              <span className={styles.brandIcon}>📦</span>
              <span>A2 Tracker</span>
            </span>
            <span className={styles.crumb}>3 orders in progress · ETA delivered weekly</span>
            <span className={styles.supportBtn}>Need help?</span>
          </div>

          {PROCESS_STEPS.map((s, i) => {
            const stage = stageOf(i);
            const isQueued = stage === -1;
            return (
              <div key={s.title} className={`${styles.order} ${stage >= 0 ? styles.orderLive : ""} ${stage === 3 ? styles.orderDone : ""}`}>
                <div className={styles.orderHead}>
                  <div className={styles.orderTitle}>
                    <span className={styles.orderNum}>#A2-00{i + 1}</span>
                    <h3 className={styles.dishName}>{s.title}</h3>
                  </div>
                  <div className={styles.orderEta}>
                    {stage === 3 ? (
                      <span className={styles.delivered}>✓ Delivered</span>
                    ) : isQueued ? (
                      <span className={styles.scheduled}>Scheduled</span>
                    ) : (
                      <>
                        <span className={styles.etaLabel}>ETA</span>
                        <span className={styles.etaVal} style={{ color: COLORS[i] }}>{ETA[i]}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className={styles.timeline}>
                  <div className={styles.line}>
                    <div className={styles.lineFill} style={{ width: `${progress[i]}%`, background: COLORS[i] }} />
                  </div>
                  {STAGES.map((label, sIdx) => {
                    const done = stage >= sIdx;
                    const active = stage === sIdx && stage < 3;
                    return (
                      <div
                        key={label}
                        className={`${styles.node} ${done ? styles.nodeDone : ""} ${active ? styles.nodeActive : ""}`}
                        style={{ left: `${(sIdx / (STAGES.length - 1)) * 100}%` }}
                      >
                        <span className={styles.nodeDot} style={done ? { background: COLORS[i], borderColor: COLORS[i] } : {}}>
                          {done ? "✓" : sIdx === 0 ? "🛒" : sIdx === 1 ? "🎬" : sIdx === 2 ? "👁" : "📬"}
                        </span>
                        <span className={styles.nodeLabel}>{label}</span>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.orderFooter}>
                  <div className={styles.editor}>
                    <span className={styles.avatar} style={{ background: COLORS[i] }}>
                      {i === 0 ? "K" : i === 1 ? "M" : "J"}
                    </span>
                    <div className={styles.editorMeta}>
                      <span className={styles.editorName}>
                        {i === 0 ? "Kim · Strategy lead" : i === 1 ? "Mats · Editor" : "Jess · Distribution"}
                      </span>
                      <span className={styles.editorSub}>{s.eyebrow.replace(":", "")}</span>
                    </div>
                  </div>
                  <p className={styles.orderDesc}>{s.desc}</p>
                </div>
              </div>
            );
          })}

          <div className={styles.statusbar}>
            <span className={styles.statusDot} />
            All 3 orders on track · No delays
          </div>
        </div>
      </div>
    </section>
  );
}
