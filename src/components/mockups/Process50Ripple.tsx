"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process50Ripple.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Concept 1 — Slow-mo droplet ripple.
 *
 * Pitch-black canvas. A droplet falls from the top, hits a still water
 * surface, and three concentric rings ripple outward. Each ring carries
 * one step label as it expands. The loop repeats every ~5s. Click
 * anywhere to drop a new droplet manually. Looks like the opening of an
 * Apple ad — impossible to look away from.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process50Ripple() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [tick, setTick] = useState(0);
  const [active, setActive] = useState(-1);
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const drop = () => {
    setTick((t) => t + 1);
    setActive(-1);
    if (stepRef.current) clearTimeout(stepRef.current);
    const stepTimers = [800, 1700, 2600];
    stepTimers.forEach((ms, i) => {
      setTimeout(() => setActive(i), ms);
    });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            drop();
            const interval = setInterval(drop, 5200);
            loopRef.current = interval as unknown as ReturnType<typeof setTimeout>;
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (loopRef.current) clearInterval(loopRef.current as unknown as number);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The plan · 4-6 months</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.stage} onClick={drop} role="button" tabIndex={0}>
          <div className={styles.droplet} key={`d-${tick}`} />
          <div className={styles.surface}>
            {[0, 1, 2].map((i) => (
              <div
                key={`r-${tick}-${i}`}
                className={styles.ring}
                style={{
                  borderColor: COLORS[i],
                  animationDelay: `${0.8 + i * 0.9}s`,
                }}
              >
                <span className={styles.ringLabel} style={{ color: COLORS[i] }}>
                  Step {i + 1}
                </span>
              </div>
            ))}
          </div>
          <span className={styles.hint}>tap anywhere to drop another</span>
        </div>

        <div className={styles.cards}>
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.title} className={`${styles.card} ${active >= i ? styles.cardOn : ""}`}>
              <span className={styles.cardChip} style={{ background: COLORS[i] }}>{i + 1}</span>
              <p className={styles.cardEyebrow} style={{ color: COLORS[i] }}>{s.eyebrow}</p>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
