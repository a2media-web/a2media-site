"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process47AppInstall.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simple concept #3: iOS app install on the home screen.
 *
 * Three app icons in a row, each gets its install progress ring fill
 * around it. Status under each: "Waiting" → "Installing" (ring fills)
 * → "Open" (icon fully colored). Simplest UI on earth — every phone
 * owner has watched apps install. Friendly, low cognitive load.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const APPS = [
  { name: "Research",  letter: "R", size: "428 MB" },
  { name: "Engine",    letter: "E", size: "1.2 GB" },
  { name: "Pipeline",  letter: "P", size: "884 MB" },
];

export default function Process47AppInstall() {
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

  const statusOf = (i: number) => {
    if (progress[i] >= 100) return "open";
    if (running === i)      return "installing";
    return "waiting";
  };

  const installed = progress.filter((p) => p >= 100).length;
  const r = 38;
  const c = 2 * Math.PI * r;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>App Store · Installing</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          <div className={styles.topbar}>
            <span className={styles.signal}>●●●●</span>
            <span className={styles.carrier}>A2 Media</span>
            <span className={styles.time}>9:41</span>
            <span style={{ marginLeft: "auto" }} className={styles.icons}>📶 🔋</span>
          </div>

          <div className={styles.header}>
            <h3 className={styles.headerTitle}>Updates</h3>
            <p className={styles.headerSub}>{installed === 3 ? "All apps updated · ready to use" : "3 apps installing · don't close"}</p>
          </div>

          <div className={styles.iconRow}>
            {PROCESS_STEPS.map((s, i) => {
              const status = statusOf(i);
              const dashOffset = c - (c * progress[i]) / 100;
              return (
                <div key={s.title} className={styles.iconCol}>
                  <div className={styles.iconWrap}>
                    <svg viewBox="0 0 100 100" className={styles.ring}>
                      <circle cx="50" cy="50" r={r} className={styles.ringTrack} />
                      <circle
                        cx="50" cy="50" r={r}
                        className={styles.ringFill}
                        style={{ stroke: COLORS[i] }}
                        strokeDasharray={c}
                        strokeDashoffset={dashOffset}
                      />
                    </svg>
                    <div
                      className={`${styles.iconTile} ${status === "open" ? styles.iconTileOpen : ""}`}
                      style={{
                        background: status === "open"
                          ? `linear-gradient(135deg, ${COLORS[i]}, var(--a2-night-core))`
                          : "rgba(13,5,54,0.06)",
                        color: status === "open" ? "#fff" : "rgba(13,5,54,0.35)",
                      }}
                    >
                      <span className={styles.iconLetter}>{APPS[i].letter}</span>
                      {status === "installing" && (
                        <div className={styles.iconOverlay}>
                          <span className={styles.tinyDot} />
                          <span className={styles.tinyDot} />
                          <span className={styles.tinyDot} />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className={styles.appName}>{APPS[i].name}</p>
                  <span className={`${styles.statusBtn} ${styles[`status_${status}`]}`}>
                    {status === "waiting"    && "Waiting…"}
                    {status === "installing" && `${Math.floor(progress[i])}%`}
                    {status === "open"       && "Open"}
                  </span>
                  <span className={styles.size}>{APPS[i].size}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.detailHead}>What&apos;s in this update</div>
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.title} className={`${styles.detail} ${progress[i] > 0 ? styles.detailOn : ""}`}>
              <span className={styles.detailDot} style={{ background: progress[i] >= 100 ? COLORS[i] : "rgba(13,5,54,0.15)" }}>
                {progress[i] >= 100 ? "✓" : i + 1}
              </span>
              <div className={styles.detailText}>
                <div className={styles.detailEyebrow} style={{ color: COLORS[i] }}>{s.eyebrow}</div>
                <div className={styles.detailTitle}>{s.title}</div>
                <p className={styles.detailDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
