"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process41YTUpload.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Easy-to-follow concept #1: YouTube Studio multi-upload.
 *
 * Same skeleton as the render queue (3 stacked rows filling in sequence),
 * but the surface everyone knows: YouTube Studio's upload panel. Each row
 * is one video being uploaded → processed → published. Status chips cycle
 * Uploading → Processing → Published. Real YT chrome (red logo, channel
 * avatar, "0 of 3 uploaded" counter at the top).
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const SIZE = ["428 MB", "1.2 GB", "884 MB"];
const RES  = ["1080p", "4K", "1080p"];

export default function Process41YTUpload() {
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

  const statusOf = (i: number) => {
    if (progress[i] >= 100) return "published";
    if (progress[i] >= 70)  return "processing";
    if (running === i)      return "uploading";
    return "queued";
  };

  const doneCount = progress.filter((p) => p >= 100).length;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>YouTube Studio · Upload manager</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          <div className={styles.topbar}>
            <span className={styles.ytLogo}>
              <span className={styles.ytPlay}>▶</span>
              <span>Studio</span>
            </span>
            <span className={styles.crumb}>A2 Media · Upload manager</span>
            <span className={styles.counter}>{doneCount} of 3 uploaded</span>
            <span className={styles.avatar}>A2</span>
          </div>

          <div className={styles.tableHead}>
            <span style={{ width: 56 }}>Video</span>
            <span style={{ flex: 1 }}>Title &amp; visibility</span>
            <span style={{ width: 70 }}>Quality</span>
            <span style={{ width: 220 }}>Upload progress</span>
            <span style={{ width: 110, textAlign: "right" }}>Status</span>
          </div>

          {PROCESS_STEPS.map((s, i) => {
            const status = statusOf(i);
            return (
              <div key={s.title} className={`${styles.row} ${status === "uploading" ? styles.rowActive : ""} ${status === "published" ? styles.rowDone : ""}`}>
                <div className={styles.thumb} style={{ background: `linear-gradient(135deg, ${COLORS[i]}, var(--a2-night-core))` }}>
                  <span className={styles.thumbPlay}>▶</span>
                  <span className={styles.thumbDur}>{i === 0 ? "3:00" : i === 1 ? "5:42" : "4:18"}</span>
                </div>
                <div className={styles.nameCol}>
                  <div className={styles.title}>{s.title}</div>
                  <div className={styles.sub}>{s.eyebrow.replace(":", "")} · {SIZE[i]} · Public</div>
                </div>
                <span className={styles.cell}>{RES[i]}</span>
                <div className={styles.progressCol}>
                  <div className={styles.bar}>
                    <div className={styles.fill} style={{ width: `${progress[i]}%`, background: COLORS[i] }} />
                    {status === "uploading" && <div className={styles.shimmer} />}
                  </div>
                  <span className={styles.progressText}>
                    {status === "queued" ? "Waiting…" : status === "published" ? "Live" : `${Math.floor(progress[i])}%`}
                  </span>
                </div>
                <span className={styles.statusCol}>
                  {status === "queued" && <span className={`${styles.chip} ${styles.chipQueued}`}>○ Queued</span>}
                  {status === "uploading" && <span className={`${styles.chip} ${styles.chipUploading}`}>↑ Uploading</span>}
                  {status === "processing" && <span className={`${styles.chip} ${styles.chipProcessing}`}>⚙ Processing</span>}
                  {status === "published" && <span className={`${styles.chip} ${styles.chipPublished}`}>✓ Published</span>}
                </span>
              </div>
            );
          })}

          <div className={styles.statusbar}>
            <span className={styles.statusDot} style={{ background: doneCount === 3 ? "#1f9a4a" : "#ff4d4d" }} />
            {doneCount === 3
              ? <span>All 3 videos published · ready for distribution</span>
              : <span>Uploading to youtube.com/@a2media · do not close this tab</span>}
            <span style={{ marginLeft: "auto" }} className={styles.upSpeed}>12.4 MB/s ↑</span>
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
