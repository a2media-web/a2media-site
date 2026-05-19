"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process1SubwayMap.module.css";

/**
 * Option 1: Subway / transit map.
 *
 * Horizontal "A2 Line" with three stations. A train car (Electric Purple
 * dot with a tail) animates along the line as the section scrolls into
 * view, stopping at each station. Each station has a card below with
 * its step content. Plays into "the journey from cold prospect → built
 * pipeline" as a literal transit line.
 */

const STATIONS = [
  {
    code: "01",
    arrive: "Week 1",
    title: "The 3-Week Jumpstart",
    desc:
      "We study your buyer psychology. Sales calls, competitor content, comments, anywhere your buyers show up online. Then we build your custom video roadmap, write your scripts, and map out exactly what to create and how to distribute it.",
    line: "ICP RESEARCH · ROADMAP · SCRIPTS",
  },
  {
    code: "02",
    arrive: "Week 4",
    title: "Build Your Video Engine",
    desc:
      "We design the video system that works for your team, then script, edit, and ship world-class videos in 48 to 72 hours. New videos every week, all tailored to your buyers.",
    line: "EDIT · SHIP · DISTRIBUTE",
  },
  {
    code: "03",
    arrive: "Month 6",
    title: "Videos Build Pipeline",
    desc:
      "Within a month, your sales team has videos they're proud to send out. Prospects show up to calls already educated. By month 6, video becomes one of your main drivers of buyer trust.",
    line: "PIPELINE · TRUST · COMPOUND",
  },
];

export default function Process1SubwayMap() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0..1 train position

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Drive the train when the section is well-positioned in viewport.
      const start = vh * 0.85;
      const end = vh * 0.15;
      const raw = (start - r.top) / (start - end);
      const p = Math.max(0, Math.min(1, raw));
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // The train hits each station at 0.1, 0.5, 0.9 of progress (small dwells).
  const stops = [0.12, 0.5, 0.88];
  const activeIdx =
    progress < stops[0]
      ? -1
      : progress < (stops[0] + stops[1]) / 2
        ? 0
        : progress < (stops[1] + stops[2]) / 2
          ? 1
          : 2;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The A2 Line · 3 stops</p>
        <h2 className={styles.heading}>
          From cold prospects to <span className={styles.italic}>built pipeline</span>.
        </h2>

        <div className={styles.map}>
          <div className={styles.line} aria-hidden>
            <div
              className={styles.lineFill}
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <div className={styles.train} style={{ left: `calc(${progress * 100}% - 18px)` }} aria-hidden>
            <span className={styles.trainDot} />
            <span className={styles.trainTail} />
          </div>

          <div className={styles.stations}>
            {STATIONS.map((s, i) => (
              <div
                key={s.code}
                className={`${styles.station} ${i <= activeIdx ? styles.stationActive : ""}`}
              >
                <span className={styles.stationDot} />
                <span className={styles.stationCode}>{s.code}</span>
                <span className={styles.stationArrive}>{s.arrive}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cards}>
          {STATIONS.map((s, i) => (
            <div
              key={s.code}
              className={`${styles.card} ${i === activeIdx ? styles.cardActive : ""}`}
            >
              <p className={styles.cardLine}>{s.line}</p>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
