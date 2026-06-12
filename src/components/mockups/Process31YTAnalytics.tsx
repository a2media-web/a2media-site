"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process31YTAnalytics.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * YouTube concept #2: YouTube Studio analytics.
 *
 * Creator-side dashboard. Three stat cards at the top (Watch hours,
 * Subscribers, Views) animating up. Large SVG line graph below with
 * three labeled milestones along the curve — one per step. The line
 * draws in left-to-right on scroll. Reads as "look at how this grows."
 */

const POINTS = [
  { x: 4,  y: 88, label: "Step One",   value: "0 → 4K",   step: 0 },
  { x: 48, y: 50, label: "Step Two",   value: "4K → 22K", step: 1 },
  { x: 96, y: 14, label: "Step Three", value: "22K → 95K", step: 2 },
];

const STATS = [
  { label: "Watch hours",   from: "0",  to: "184K",  unit: "hr", delta: "+184K" },
  { label: "Subscribers",   from: "0",  to: "22.5K", unit: "",   delta: "+22.5K" },
  { label: "Pipeline views", from: "0",  to: "5.2M",  unit: "",   delta: "+5.2M" },
];

export default function Process31YTAnalytics() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [progress, setProgress] = useState(0); // 0..1 line draw
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            // Animate the line drawing over 3 seconds with milestones at 33%/66%/100%
            const start = performance.now();
            const duration = 3200;
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              setProgress(p);
              setActiveStep(p < 0.4 ? 0 : p < 0.75 ? 1 : 2);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Build the SVG path from start to current progress
  const buildPath = (p: number) => {
    if (p === 0) return "M 4 88";
    // Smooth curve through the 3 milestones — start at (4,88), pass through (48,50), end at (96,14)
    const allPoints: [number, number][] = [
      [4, 88],
      [22, 80],
      [38, 64],
      [48, 50],
      [62, 42],
      [78, 28],
      [96, 14],
    ];
    let path = `M ${allPoints[0][0]} ${allPoints[0][1]}`;
    for (let i = 1; i < allPoints.length; i++) {
      const segP = i / (allPoints.length - 1);
      if (segP <= p) {
        path += ` L ${allPoints[i][0]} ${allPoints[i][1]}`;
      } else if (segP - 1 / (allPoints.length - 1) <= p) {
        // partial interpolation to current progress
        const prev = allPoints[i - 1];
        const cur = allPoints[i];
        const localT =
          (p - (i - 1) / (allPoints.length - 1)) * (allPoints.length - 1);
        const x = prev[0] + (cur[0] - prev[0]) * localT;
        const y = prev[1] + (cur[1] - prev[1]) * localT;
        path += ` L ${x} ${y}`;
        break;
      }
    }
    return path;
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>YouTube Studio · Analytics · last 6 months</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.dashboard}>
          <div className={styles.statRow}>
            {STATS.map((s, i) => (
              <div key={s.label} className={`${styles.statCard} ${activeStep >= i ? styles.statCardOn : ""}`}>
                <p className={styles.statLabel}>{s.label}</p>
                <p className={styles.statValue}>
                  {activeStep >= i ? s.to : s.from}{s.unit && <span className={styles.statUnit}>{s.unit}</span>}
                </p>
                <p className={styles.statDelta}>{activeStep >= i ? `▲ ${s.delta}` : "—"}</p>
              </div>
            ))}
          </div>

          <div className={styles.chart}>
            <div className={styles.chartHead}>
              <p className={styles.chartTitle}>Channel growth · pipeline-attributed views</p>
              <span className={styles.chartRange}>Last 6 months</span>
            </div>

            <div className={styles.chartBody}>
              <div className={styles.yAxis}>
                <span>100K</span><span>75K</span><span>50K</span><span>25K</span><span>0</span>
              </div>

              <div className={styles.plot}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.svg}>
                  {/* gridlines */}
                  <line x1="0" y1="22" x2="100" y2="22" className={styles.gridLine} />
                  <line x1="0" y1="44" x2="100" y2="44" className={styles.gridLine} />
                  <line x1="0" y1="66" x2="100" y2="66" className={styles.gridLine} />
                  <line x1="0" y1="88" x2="100" y2="88" className={styles.gridLine} />

                  {/* area fill under curve */}
                  <path
                    d={`${buildPath(progress)} L ${progress * 96 + 4} 100 L 4 100 Z`}
                    className={styles.area}
                  />

                  {/* the line */}
                  <path d={buildPath(progress)} className={styles.line} />

                  {/* milestone dots */}
                  {POINTS.map((pt, i) => {
                    const reached = progress > (i + 0.5) / POINTS.length;
                    return (
                      <g key={i}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="1.6"
                          className={`${styles.dot} ${reached ? styles.dotOn : ""}`}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* milestone labels positioned absolutely */}
                {POINTS.map((pt, i) => (
                  <div
                    key={i}
                    className={`${styles.milestone} ${activeStep >= i ? styles.milestoneOn : ""}`}
                    style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                  >
                    <span className={styles.milestoneStep}>STEP {i + 1}</span>
                    <span className={styles.milestoneValue}>{pt.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.xAxis}>
              <span>M1</span><span>M2</span><span>M3</span><span>M4</span><span>M5</span><span>M6</span>
            </div>
          </div>

          <div className={styles.cards}>
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.title} className={`${styles.card} ${activeStep >= i ? styles.cardOn : ""}`}>
                <p className={styles.stepEyebrow}>{s.eyebrow}</p>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
