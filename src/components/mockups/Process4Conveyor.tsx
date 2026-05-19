"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process4Conveyor.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Production line conveyor belt.
 *
 * Brief travels left-to-right along a belt, stopping at 3 machine
 * stations (one per step in the live copy), then drops into a green
 * PIPELINE output bin. Status lights blink as the package arrives.
 *
 * Stations carry the LIVE process copy verbatim — title + full description.
 */

const STATION_CODES = ["ST-01", "ST-02", "ST-03"];

export default function Process4Conveyor() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [run, setRun] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            setRun(true);
            const dwells = [1100, 2900, 4700];
            dwells.forEach((t, i) => setTimeout(() => setActiveIdx(i), t));
            setTimeout(() => setActiveIdx(3), 6500);
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
        <p className={styles.eyebrow}>A2 Production Line · 3 stations</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.machine}>
          <div className={styles.belt}>
            <div className={styles.beltTexture} />
            <div className={`${styles.package} ${run ? styles.packageRun : ""}`}>
              <span className={styles.packageBox}>BRIEF</span>
            </div>
          </div>

          <div className={styles.stations}>
            {PROCESS_STEPS.map((s, i) => (
              <div
                key={STATION_CODES[i]}
                className={`${styles.station} ${i <= activeIdx ? styles.stationOn : ""}`}
              >
                <div className={styles.stationHead}>
                  <span className={styles.statusLight} />
                  <span className={styles.stationCode}>{STATION_CODES[i]}</span>
                </div>
                <p className={styles.stationEyebrow}>{s.eyebrow}</p>
                <h3 className={styles.stationTitle}>{s.title}</h3>
                <p className={styles.stationDesc}>{s.desc}</p>
              </div>
            ))}
            <div className={`${styles.station} ${styles.outputBin} ${activeIdx >= 3 ? styles.stationOn : ""}`}>
              <div className={styles.stationHead}>
                <span className={styles.statusLight} />
                <span className={styles.stationCode}>OUT</span>
              </div>
              <div className={styles.outputLabel}>PIPELINE</div>
              <p className={styles.stationDesc}>Sales-ready. Compounding. Yours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
