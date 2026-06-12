"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process39RenderQueue.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Video concept: Adobe Media Encoder / Premiere render queue.
 *
 * The render-queue panel every editor stares at. Three jobs stacked,
 * one per step. Each job fills its progress bar 0 → 100% in sequence
 * (Step 1 finishes, then Step 2 starts, then Step 3). Status chips
 * cycle Queued → Encoding → Done. ETA + bitrate columns. Bottom
 * status bar shows overall progress + "Output: Pipeline.mp4". Authentic
 * Adobe DNA, completely legible as a process visualization.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const PRESET = ["H.264 · 4K", "H.264 · 4K", "H.264 · 4K"];
const SIZE   = ["4.2 GB", "8.1 GB", "12.4 GB"];

export default function Process39RenderQueue() {
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
              const dur = 2200;
              const tick = (t: number) => {
                const p = Math.min(1, (t - start) / dur);
                setProgress((prev) => {
                  const next = [...prev];
                  next[idx] = p * 100;
                  return next;
                });
                if (p < 1) requestAnimationFrame(tick);
                else {
                  if (idx < 2) setTimeout(() => runJob(idx + 1), 320);
                  else setRunning(3);
                }
              };
              requestAnimationFrame(tick);
            };
            setTimeout(() => runJob(0), 600);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const statusOf = (i: number) => {
    if (progress[i] >= 100) return "done";
    if (running === i) return "encoding";
    return "queued";
  };

  const totalProgress = progress.reduce((a, b) => a + b, 0) / 3;
  const overallEta = running >= 3 ? "Complete" : `${Math.ceil((3 - totalProgress / 33.3) * 1.2)}m remaining`;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Adobe Media Encoder · Queue</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          <div className={styles.topbar}>
            <span className={styles.dot} style={{ background: "#ff5f56" }} />
            <span className={styles.dot} style={{ background: "#ffbd2e" }} />
            <span className={styles.dot} style={{ background: "#27c93f" }} />
            <span className={styles.appName}>Media Encoder · A2_Pipeline.aep</span>
            <span className={styles.queueChip}>Queue: 3 jobs</span>
            <button type="button" className={styles.startBtn}>{running >= 3 ? "✓ Complete" : "⏸ Pause Queue"}</button>
          </div>

          <div className={styles.tableHead}>
            <span style={{ width: 30 }}></span>
            <span style={{ flex: 1 }}>Source name</span>
            <span style={{ width: 110 }}>Preset</span>
            <span style={{ width: 80 }}>Format</span>
            <span style={{ width: 80, textAlign: "right" }}>Size</span>
            <span style={{ width: 200 }}>Progress</span>
            <span style={{ width: 90, textAlign: "right" }}>Status</span>
          </div>

          {PROCESS_STEPS.map((s, i) => {
            const status = statusOf(i);
            return (
              <div key={s.title} className={`${styles.row} ${status === "encoding" ? styles.rowActive : status === "done" ? styles.rowDone : ""}`}>
                <span className={styles.thumb} style={{ background: COLORS[i] }}>
                  <span className={styles.thumbPlay}>▶</span>
                </span>
                <div className={styles.nameCol}>
                  <div className={styles.fileName}>0{i + 1}_{s.title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}.mp4</div>
                  <div className={styles.fileSub}>{s.eyebrow.replace(":", "")} · {s.title}</div>
                </div>
                <span className={styles.cell}>{PRESET[i]}</span>
                <span className={styles.cell}>MP4</span>
                <span className={styles.cell} style={{ textAlign: "right", fontFamily: "SF Mono, monospace" }}>{SIZE[i]}</span>
                <div className={styles.progressCol}>
                  <div className={styles.bar}>
                    <div className={styles.fill} style={{ width: `${progress[i]}%`, background: COLORS[i] }} />
                    {status === "encoding" && <div className={styles.shimmer} />}
                  </div>
                  <span className={styles.progressText}>{Math.floor(progress[i])}%</span>
                </div>
                <span className={styles.statusCol}>
                  {status === "queued" && <span className={`${styles.statusChip} ${styles.statusQueued}`}>Queued</span>}
                  {status === "encoding" && <span className={`${styles.statusChip} ${styles.statusEncoding}`}>● Encoding</span>}
                  {status === "done" && <span className={`${styles.statusChip} ${styles.statusDone}`}>✓ Done</span>}
                </span>
              </div>
            );
          })}

          <div className={styles.statusbar}>
            <div className={styles.overallBar}>
              <div className={styles.overallFill} style={{ width: `${totalProgress}%` }} />
            </div>
            <span className={styles.statusText}>
              Output: <b>~/A2/Pipeline.mp4</b> · {overallEta}
            </span>
            <span className={styles.bitrate}>16.4 MB/s · GPU encoding</span>
          </div>
        </div>

        <div className={styles.cards}>
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.title} className={`${styles.card} ${progress[i] > 0 ? styles.cardOn : ""}`}>
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
