"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process40ThumbnailAB.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Video concept: YouTube thumbnail A/B test panel.
 *
 * The "Test & Compare" surface creators use to ship thumbnail variants.
 * Three thumbnails stacked vertically — Variant A / B / C, each labeled
 * as one step. Mini analytics bars on the right show CTR climbing across
 * variants (2.1% → 4.4% → 8.7%). Each variant "lights up" in sequence
 * with a "WINNER" crown landing on the third. Plays back the agency's
 * actual optimization loop.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const CTR = ["2.1%", "4.4%", "8.7%"];
const IMP = ["48K", "112K", "284K"];
const CLICKS = ["1,008", "4,928", "24,708"];
const CTR_NUM = [21, 44, 87]; // out of 100 for bar width %

export default function Process40ThumbnailAB() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            [0, 1, 2, 3].forEach((i) => {
              setTimeout(() => setRevealed(i), 600 + i * 1100);
            });
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
        <p className={styles.eyebrow}>YouTube Studio · Test &amp; Compare</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          <div className={styles.topbar}>
            <span className={styles.appName}>YouTube Studio · Thumbnail A/B Test</span>
            <span className={styles.duration}>Day 14 of 14 · 444K impressions</span>
            <span className={styles.statusChip}>Test concluded · Winner declared</span>
          </div>

          <div className={styles.testHead}>
            <h3 className={styles.testTitle}>How A2 Media built a 95K-view video machine</h3>
            <p className={styles.testSub}>3 thumbnail variants tested against same title · 14-day window</p>
          </div>

          <div className={styles.rows}>
            {PROCESS_STEPS.map((s, i) => {
              const isLive = revealed > i;
              const isWinner = revealed > 2 && i === 2;
              return (
                <div key={s.title} className={`${styles.row} ${isLive ? styles.rowLive : ""} ${isWinner ? styles.rowWinner : ""}`}>
                  <div className={styles.variantTag}>VARIANT {String.fromCharCode(65 + i)}</div>

                  <div className={styles.thumbWrap}>
                    <div className={styles.thumb} style={{ background: `linear-gradient(135deg, ${COLORS[i]}55, var(--a2-night-core))` }}>
                      <div className={styles.thumbBlur} style={{ background: COLORS[i] }} />
                      <div className={styles.thumbContent}>
                        <span className={styles.thumbEyebrow}>{s.eyebrow.replace(":", "").toUpperCase()}</span>
                        <span className={styles.thumbTitle}>{s.title}</span>
                      </div>
                      <span className={styles.thumbDur}>{i === 0 ? "3:00" : i === 1 ? "5:42" : "4:18"}</span>
                      <span className={styles.thumbBrand}>A2</span>
                    </div>
                    {isWinner && (
                      <span className={styles.crown}>
                        <span className={styles.crownIcon}>👑</span>
                        <span className={styles.crownLabel}>WINNER</span>
                      </span>
                    )}
                  </div>

                  <div className={styles.stats}>
                    <div className={styles.statBlock}>
                      <p className={styles.statLabel}>Click-through rate</p>
                      <div className={styles.ctrRow}>
                        <span className={styles.ctrNum} style={{ color: isLive ? COLORS[i] : "rgba(13,5,54,0.3)" }}>
                          {isLive ? CTR[i] : "—"}
                        </span>
                        <div className={styles.ctrBar}>
                          <div
                            className={styles.ctrFill}
                            style={{ width: isLive ? `${CTR_NUM[i]}%` : "0%", background: COLORS[i] }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.statBlock}>
                      <p className={styles.statLabel}>Impressions</p>
                      <p className={styles.statNum}>{isLive ? IMP[i] : "—"}</p>
                    </div>
                    <div className={styles.statBlock}>
                      <p className={styles.statLabel}>Clicks</p>
                      <p className={styles.statNum}>{isLive ? CLICKS[i] : "—"}</p>
                    </div>
                  </div>

                  <div className={styles.stepBlock}>
                    <p className={styles.stepEyebrow} style={{ color: COLORS[i] }}>{s.eyebrow}</p>
                    <h4 className={styles.stepTitle}>{s.title}</h4>
                    <p className={styles.stepDesc}>{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.footer}>
            <span className={styles.footerLabel}>Total uplift vs. baseline:</span>
            <span className={styles.footerNum}>+314% CTR</span>
            <span className={styles.footerNum}>+24.5x clicks</span>
            <button type="button" className={styles.footerBtn}>Publish winner →</button>
          </div>
        </div>
      </div>
    </section>
  );
}
