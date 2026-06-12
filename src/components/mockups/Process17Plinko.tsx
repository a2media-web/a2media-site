"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process17Plinko.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Plinko drop board.
 *
 * Vertical pegboard with a ball that drops from the top, bounces through
 * pegs left/right/left, and lands in the center "PIPELINE" slot at the
 * bottom. Side cards light up as the ball passes their row. Inevitable
 * gravity progression — feels less random than pinball, more "engineered."
 */

const PEG_ROWS = 7;

export default function Process17Plinko() {
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
            const dwells = [1200, 2700, 4200];
            dwells.forEach((t, i) => setTimeout(() => setActiveIdx(i), t));
            setTimeout(() => setActiveIdx(3), 5500);
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
        <p className={styles.eyebrow}>A2 Plinko · gravity-fed</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.layout}>
          <div className={styles.board}>
            <div className={styles.dropChute}>
              <span>DROP</span>
            </div>
            <div className={`${styles.ball} ${run ? styles.ballRun : ""}`} aria-hidden />

            <div className={styles.pegs}>
              {Array.from({ length: PEG_ROWS }).map((_, row) => {
                const cols = 4 + (row % 2 ? 1 : 0);
                return (
                  <div key={row} className={styles.pegRow}>
                    {Array.from({ length: cols }).map((__, col) => (
                      <span key={col} className={styles.peg} />
                    ))}
                  </div>
                );
              })}
            </div>

            <div className={styles.slots}>
              {["", "", "PIPELINE", "", ""].map((label, i) => (
                <div
                  key={i}
                  className={`${styles.slot} ${label === "PIPELINE" ? styles.slotWin : ""} ${activeIdx >= 3 && label === "PIPELINE" ? styles.slotLit : ""}`}
                >
                  {label && <span className={styles.slotLabel}>{label}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.cards}>
            {PROCESS_STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`${styles.card} ${i <= activeIdx ? styles.cardLit : ""}`}
              >
                <span className={styles.pegRing} aria-hidden />
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
