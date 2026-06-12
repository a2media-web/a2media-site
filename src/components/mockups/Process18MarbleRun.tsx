"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process18MarbleRun.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Marble run / Rube Goldberg.
 *
 * Diagonal ramps descending across the section. The marble rolls down
 * ramp 1, hits ramp 2 going the opposite direction, hits ramp 3, and
 * lands in the "PIPELINE" basket. Each ramp has its step card pinned
 * to it. More elaborate mechanical-contraption feel than pinball.
 */

export default function Process18MarbleRun() {
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
            const dwells = [1300, 2900, 4500];
            dwells.forEach((t, i) => setTimeout(() => setActiveIdx(i), t));
            setTimeout(() => setActiveIdx(3), 5800);
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
        <p className={styles.eyebrow}>A2 Run · 3 ramps</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.contraption}>
          {/* The marble */}
          <div className={`${styles.marble} ${run ? styles.marbleRun : ""}`} aria-hidden />

          {/* Three angled ramps, alternating direction */}
          {PROCESS_STEPS.map((s, i) => (
            <div
              key={s.title}
              className={`${styles.rampRow} ${styles[`rampRow${i}`]} ${i <= activeIdx ? styles.rampOn : ""}`}
            >
              <div className={styles.ramp}>
                <span className={styles.rampLabel}>RAMP 0{i + 1}</span>
                <span className={styles.gear} aria-hidden>
                  <span className={styles.gearTooth} />
                  <span className={styles.gearTooth} />
                  <span className={styles.gearTooth} />
                  <span className={styles.gearTooth} />
                </span>
              </div>
              <div className={styles.card}>
                <p className={styles.stepEyebrow}>{s.eyebrow}</p>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </div>
          ))}

          {/* Basket at the bottom */}
          <div className={`${styles.basket} ${activeIdx >= 3 ? styles.basketWin : ""}`}>
            <span className={styles.basketLabel}>PIPELINE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
