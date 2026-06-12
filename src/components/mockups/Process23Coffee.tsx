"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process23Coffee.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * SURPRISE #1: Coffee brewing sequence.
 *
 * Three machines arranged left to right — grinder → brewer → mug. As
 * the section enters viewport, beans drop into the grinder (rumbles),
 * grounds slide into the brewer (steam puffs), and coffee fills the
 * mug (liquid level rises). Warm, sensory, daily-ritual feel. Plays
 * against all the industrial metaphors with something inviting.
 */

const STAGE_LABELS = ["GRIND", "BREW", "POUR"];

export default function Process23Coffee() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            [0, 1, 2].forEach((i) => setTimeout(() => setStage(i), 1000 + i * 1500));
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
        <p className={styles.eyebrow}>A2 Cafe · daily blend</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.counter}>
          {/* Grinder */}
          <div className={`${styles.appliance} ${styles.grinder} ${stage >= 0 ? styles.applianceOn : ""}`}>
            <div className={styles.applianceTop}>
              <div className={styles.hopper}>
                <span className={`${styles.bean} ${styles.bean1}`} aria-hidden />
                <span className={`${styles.bean} ${styles.bean2}`} aria-hidden />
                <span className={`${styles.bean} ${styles.bean3}`} aria-hidden />
                <span className={`${styles.bean} ${styles.bean4}`} aria-hidden />
              </div>
            </div>
            <div className={styles.applianceBody}>
              <span className={styles.statusLight} />
              <span className={styles.applianceLabel}>GRINDER</span>
            </div>
            <div className={styles.applianceChute}>
              <div className={`${styles.groundStream} ${stage >= 0 ? styles.groundStreamOn : ""}`} aria-hidden />
            </div>
          </div>

          {/* Brewer */}
          <div className={`${styles.appliance} ${styles.brewer} ${stage >= 1 ? styles.applianceOn : ""}`}>
            <div className={styles.brewerHead}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`${styles.steam} ${stage >= 1 ? styles.steamOn : ""}`}
                  style={{ ["--s-i" as string]: i }}
                  aria-hidden
                />
              ))}
            </div>
            <div className={styles.applianceTop}>
              <div className={styles.basket}>
                <div className={`${styles.grounds} ${stage >= 1 ? styles.groundsOn : ""}`} />
              </div>
            </div>
            <div className={styles.applianceBody}>
              <span className={styles.statusLight} />
              <span className={styles.applianceLabel}>BREWER</span>
            </div>
            <div className={styles.applianceChute}>
              <div className={`${styles.coffeeStream} ${stage >= 1 ? styles.coffeeStreamOn : ""}`} aria-hidden />
            </div>
          </div>

          {/* Mug */}
          <div className={`${styles.appliance} ${styles.mugStation} ${stage >= 2 ? styles.applianceOn : ""}`}>
            <div className={styles.mugSpace}>
              <div className={styles.mug}>
                <div className={styles.mugInside}>
                  <div className={`${styles.coffee} ${stage >= 2 ? styles.coffeeOn : ""}`}>
                    <span className={styles.coffeeSurface} />
                  </div>
                </div>
                <span className={styles.handle} />
                <span className={styles.mugBrand}>A2</span>
              </div>
            </div>
            <div className={styles.applianceBody}>
              <span className={styles.statusLight} />
              <span className={styles.applianceLabel}>PIPELINE</span>
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          {PROCESS_STEPS.map((s, i) => (
            <div
              key={s.title}
              className={`${styles.card} ${stage >= i ? styles.cardOn : ""}`}
            >
              <div className={styles.cardHead}>
                <span className={styles.cardStage}>{STAGE_LABELS[i]}</span>
                <span className={styles.cardStatus}>
                  {stage >= i ? "✓ Done" : "Brewing…"}
                </span>
              </div>
              <p className={styles.stepEyebrow}>{s.eyebrow}</p>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
