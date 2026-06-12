"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process19Dominos.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Domino chain reaction.
 *
 * A horizontal line of dominos. First one tips, the wave cascades left
 * to right. Three large "milestone" dominos along the chain match the
 * three steps — each lights up its card as it falls. Bonus: a satisfying
 * thud animation on the milestone dominos. Final domino topples into a
 * "PIPELINE" plate.
 */

const TICK_DOMINOS_PER_GAP = 6;

export default function Process19Dominos() {
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
            const dwells = [1100, 2400, 3700];
            dwells.forEach((t, i) => setTimeout(() => setActiveIdx(i), t));
            setTimeout(() => setActiveIdx(3), 4900);
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
        <p className={styles.eyebrow}>A2 Chain Reaction · 3 dominos</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.run}>
          <div className={`${styles.flickHand} ${run ? styles.flickHandGo : ""}`} aria-hidden>
            <span className={styles.flickFinger} />
            <span className={styles.flickArrow}>→</span>
          </div>

          <div className={styles.track}>
            {/* segments: gap → milestone → gap → milestone → gap → milestone → finish */}
            {[0, 1, 2].map((seg) => (
              <div key={seg} className={styles.segment}>
                {Array.from({ length: TICK_DOMINOS_PER_GAP }).map((_, j) => {
                  const order = seg * TICK_DOMINOS_PER_GAP + j;
                  return (
                    <span
                      key={j}
                      className={`${styles.tick} ${run ? styles.tickFall : ""}`}
                      style={{ animationDelay: `${0.6 + order * 0.13}s` }}
                    />
                  );
                })}
                <div
                  className={`${styles.milestone} ${activeIdx >= seg ? styles.milestoneFall : ""}`}
                >
                  <span className={styles.milestoneNum}>0{seg + 1}</span>
                </div>
              </div>
            ))}
            <div className={`${styles.finishPlate} ${activeIdx >= 3 ? styles.finishPlateWin : ""}`}>
              <span className={styles.finishLabel}>PIPELINE</span>
            </div>
          </div>

          <div className={styles.cards}>
            {PROCESS_STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`${styles.card} ${i <= activeIdx ? styles.cardLit : ""}`}
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardChip}>0{i + 1}</span>
                  <span className={styles.cardStatus}>
                    {i <= activeIdx ? "TIPPED" : "STANDING"}
                  </span>
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
