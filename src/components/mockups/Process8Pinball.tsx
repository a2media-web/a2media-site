"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process8Pinball.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Pinball / Goldberg machine.
 *
 * A ball drops from the launch chute at the top of a vertical playfield.
 * It bounces through 3 bumpers (the 3 steps), each lighting up when hit,
 * and lands in the PIPELINE pocket at the bottom. The step content lives
 * in cards next to each bumper, lit when the ball reaches that station.
 */

export default function Process8Pinball() {
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
            const dwells = [1200, 2600, 4000];
            dwells.forEach((t, i) => setTimeout(() => setActiveIdx(i), t));
            setTimeout(() => setActiveIdx(3), 5200); // pocket lights up
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
        <p className={styles.eyebrow}>The A2 Machine · 3 bumpers</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.cabinet}>
          <div className={styles.playfield}>
            <div className={styles.chute}>
              <span className={styles.chuteLabel}>LAUNCH</span>
            </div>
            <div className={`${styles.ball} ${run ? styles.ballRun : ""}`} aria-hidden />

            <div className={`${styles.bumper} ${styles.bumper0} ${activeIdx >= 0 ? styles.bumperHit : ""}`}>
              <span className={styles.bumperNum}>01</span>
            </div>
            <div className={`${styles.bumper} ${styles.bumper1} ${activeIdx >= 1 ? styles.bumperHit : ""}`}>
              <span className={styles.bumperNum}>02</span>
            </div>
            <div className={`${styles.bumper} ${styles.bumper2} ${activeIdx >= 2 ? styles.bumperHit : ""}`}>
              <span className={styles.bumperNum}>03</span>
            </div>

            <div className={`${styles.pocket} ${activeIdx >= 3 ? styles.pocketWin : ""}`}>
              <span className={styles.pocketLabel}>PIPELINE</span>
            </div>

            <div className={styles.scoreboard}>
              <span className={styles.scoreLabel}>SCORE</span>
              <span className={styles.scoreValue}>
                {String((activeIdx + 1) * 1000).padStart(5, "0")}
              </span>
            </div>
          </div>

          <div className={styles.cards}>
            {PROCESS_STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`${styles.card} ${i <= activeIdx ? styles.cardLit : ""}`}
              >
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
