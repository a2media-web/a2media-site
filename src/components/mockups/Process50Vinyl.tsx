"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process50Vinyl.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Hypnotic concept #1: Vinyl record.
 *
 * A spinning A2 Media record. Three concentric grooves are visible —
 * each one is a step. The tonearm slowly sweeps from outer to inner
 * groove, landing on each step. Loops smoothly. Almost no UI text in
 * the visual itself; the body copy lives in a small panel beside the
 * record that updates with the active step.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process50Vinyl() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            let i = 0;
            const loop = () => {
              setActive(i);
              i = (i + 1) % 3;
              setTimeout(loop, 3600);
            };
            loop();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const armAngle = -20 + active * 14;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>How it sounds</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.stage}>
          <div className={styles.player}>
            <div className={styles.platter}>
              <div className={styles.record}>
                {[0, 1, 2].map((g) => (
                  <div
                    key={g}
                    className={`${styles.groove} ${active === g ? styles.grooveOn : ""}`}
                    style={{
                      width: `${64 - g * 16}%`,
                      height: `${64 - g * 16}%`,
                      borderColor: active === g ? COLORS[g] : "rgba(255,255,255,0.06)",
                    }}
                  />
                ))}
                <div className={styles.label}>
                  <span className={styles.labelHole} />
                  <span className={styles.labelTop}>A2 MEDIA</span>
                  <span className={styles.labelBottom}>Content That Converts</span>
                </div>
              </div>
            </div>
            <div className={styles.arm} style={{ transform: `rotate(${armAngle}deg)` }}>
              <span className={styles.armBase} />
              <span className={styles.armShaft} />
              <span className={styles.armHead} style={{ background: COLORS[active] }} />
            </div>
          </div>

          <div className={styles.copyPanel}>
            <span className={styles.trackTag}>Track {active + 1} of 3</span>
            <p className={styles.trackEyebrow} style={{ color: COLORS[active] }}>
              {PROCESS_STEPS[active].eyebrow}
            </p>
            <h3 className={styles.trackTitle}>{PROCESS_STEPS[active].title}</h3>
            <p className={styles.trackDesc}>{PROCESS_STEPS[active].desc}</p>
            <div className={styles.dots}>
              {PROCESS_STEPS.map((_, i) => (
                <span key={i} className={`${styles.dot} ${active === i ? styles.dotOn : ""}`} style={active === i ? { background: COLORS[i] } : {}} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
