"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process13Bottling.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Bottling plant.
 *
 * Empty bottles travel along a conveyor and pass under 3 stations: a
 * filler nozzle (research / strategy), a capper (build), and a labeler
 * (deploy). At the end the finished bottle stands tall in an output rack.
 * Most satisfying-progression-toy on the list.
 */

const STATIONS_OVERLAY = ["FILLER", "CAPPER", "LABELER"];

export default function Process13Bottling() {
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
            const dwells = [1100, 2700, 4300];
            dwells.forEach((t, i) => setTimeout(() => setActiveIdx(i), t));
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const bottleFilled = activeIdx >= 0;
  const bottleCapped = activeIdx >= 1;
  const bottleLabeled = activeIdx >= 2;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A2 Bottling Plant · 3 stations</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.machine}>
          <div className={styles.belt}>
            <div className={styles.beltTexture} />

            {STATIONS_OVERLAY.map((label, i) => (
              <div
                key={label}
                className={`${styles.overhead} ${styles[`overhead${i}`]} ${activeIdx >= i ? styles.overheadOn : ""}`}
                aria-hidden
              >
                <span className={styles.overheadArm} />
                <span className={styles.overheadHead}>
                  <span className={styles.overheadIcon}>
                    {i === 0 ? "▼" : i === 1 ? "○" : "□"}
                  </span>
                </span>
                <span className={styles.overheadLabel}>{label}</span>
              </div>
            ))}

            <div className={`${styles.bottle} ${run ? styles.bottleRun : ""}`}>
              <span className={`${styles.bottleCap} ${bottleCapped ? styles.bottleCapOn : ""}`} aria-hidden />
              <span className={styles.bottleNeck} aria-hidden />
              <span className={styles.bottleBody}>
                <span
                  className={`${styles.bottleFill} ${bottleFilled ? styles.bottleFillOn : ""}`}
                  aria-hidden
                />
                <span className={`${styles.bottleLabel} ${bottleLabeled ? styles.bottleLabelOn : ""}`}>
                  A2 · PIPELINE
                </span>
              </span>
            </div>
          </div>

          <div className={styles.stations}>
            {PROCESS_STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`${styles.station} ${i <= activeIdx ? styles.stationOn : ""}`}
              >
                <div className={styles.stationHead}>
                  <span className={styles.statusLight} />
                  <span className={styles.stationCode}>{STATIONS_OVERLAY[i]}</span>
                </div>
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
