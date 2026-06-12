"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process60PhoneUpload.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simpler #3: Phone-shaped mobile upload screen.
 *
 * Simulates the YouTube mobile app uploading. Three video rows stack
 * inside a phone bezel — each just thumbnail + title + thin progress
 * bar + tiny status text. Familiar mobile-app convention, low cognitive
 * load. The phone framing alone makes it instantly recognizable.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process60PhoneUpload() {
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
        <p className={styles.eyebrow}>YouTube · uploads</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.stage}>
          <div className={styles.phone}>
            <div className={styles.notch} />
            <div className={styles.screen}>
              <div className={styles.appHeader}>
                <span className={styles.appLogo}>
                  <span className={styles.appPlay}>▶</span> Studio
                </span>
                <span className={styles.appMenu}>···</span>
              </div>
              <div className={styles.appTitle}>Your uploads</div>

              <div className={styles.rows}>
                {PROCESS_STEPS.map((s, i) => {
                  const status = statusOf(i);
                  return (
                    <div key={s.title} className={`${styles.row} ${status !== "wait" ? styles.rowOn : ""}`}>
                      <div className={styles.thumb} style={{ background: `linear-gradient(135deg, ${COLORS[i]}, var(--a2-night-core))` }}>
                        <span className={styles.dur}>{i === 0 ? "3:00" : i === 1 ? "5:42" : "4:18"}</span>
                      </div>
                      <div className={styles.rowBody}>
                        <div className={styles.rowTitle}>{s.title}</div>
                        <div className={styles.bar}>
                          <div className={styles.fill} style={{ width: `${progress[i]}%`, background: COLORS[i] }} />
                        </div>
                        <div className={styles.statusLine}>
                          {status === "wait" && "Waiting…"}
                          {status === "up"   && `Uploading · ${Math.floor(progress[i])}%`}
                          {status === "live" && "Published"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.appFoot}>
                <span className={styles.footDot} />
                {progress.filter((p) => p >= 100).length} of 3 published
              </div>
            </div>
            <div className={styles.homebar} />
          </div>
        </div>
      </div>
    </section>
  );
}
