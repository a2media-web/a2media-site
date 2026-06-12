"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process11Stamping.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Stamping press conveyor.
 *
 * Package moves left to right. Three hydraulic stamps drop down (CHUNK)
 * and emboss a label onto the package at each station. Stamp ink-marks
 * accumulate on the box as it passes — by the end it has 3 ink stamps,
 * one per step. Most "official document" feeling progression.
 */

const STAMP_LABELS = ["RESEARCHED", "ENGINEERED", "DELIVERED"];

export default function Process11Stamping() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [run, setRun] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [stampPressed, setStampPressed] = useState([false, false, false]);

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
            dwells.forEach((t, i) => {
              setTimeout(() => {
                setActiveIdx(i);
                setStampPressed((prev) => prev.map((v, j) => (j === i ? true : v)));
                setTimeout(() => {
                  setStampPressed((prev) => prev.map((v, j) => (j === i ? false : v)));
                }, 320);
              }, t);
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
        <p className={styles.eyebrow}>The A2 Press · 3 stamps</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.machine}>
          <div className={styles.belt}>
            <div className={styles.beltTexture} />
            <div className={`${styles.package} ${run ? styles.packageRun : ""}`}>
              <span className={styles.packageBox}>BRIEF</span>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`${styles.inkStamp} ${activeIdx >= i ? styles.inkStampOn : ""}`}
                  style={{ ["--ink-i" as string]: i }}
                >
                  {STAMP_LABELS[i]}
                </span>
              ))}
            </div>

            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${styles.press} ${styles[`press${i}`]} ${stampPressed[i] ? styles.pressDown : ""}`}
                aria-hidden
              >
                <span className={styles.pressArm} />
                <span className={styles.pressHead}>
                  <span className={styles.pressIcon}>{i + 1}</span>
                </span>
              </div>
            ))}
          </div>

          <div className={styles.stations}>
            {PROCESS_STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`${styles.station} ${i <= activeIdx ? styles.stationOn : ""}`}
              >
                <div className={styles.stationHead}>
                  <span className={styles.stationCode}>STAMP {i + 1}</span>
                  <span className={styles.stationStamp}>{STAMP_LABELS[i]}</span>
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
