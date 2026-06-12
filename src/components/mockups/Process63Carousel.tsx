"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process63Carousel.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simpler new #1: Carousel — one card at a time.
 *
 * Single large content card auto-cycles between the 3 steps. Only one
 * step is ever on screen. Three dot indicators at the bottom show
 * progress. Maximum focus, zero competing elements.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process63Carousel() {
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
            const tick = () => {
              i = (i + 1) % 3;
              setActive(i);
              setTimeout(tick, 3600);
            };
            setTimeout(tick, 3600);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const s = PROCESS_STEPS[active];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The plan</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.card} style={{ borderColor: `${COLORS[active]}40` }}>
          <div className={styles.cardLeft} style={{ background: `linear-gradient(135deg, ${COLORS[active]}, var(--a2-night-core))` }}>
            <span className={styles.stepNum}>0{active + 1}</span>
            <span className={styles.stepOf}>of 03</span>
          </div>
          <div className={styles.cardRight} key={active}>
            <p className={styles.cardEyebrow} style={{ color: COLORS[active] }}>{s.eyebrow}</p>
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
          </div>
        </div>

        <div className={styles.dots}>
          {PROCESS_STEPS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${active === i ? styles.dotOn : ""}`}
              onClick={() => setActive(i)}
              style={active === i ? { background: COLORS[i] } : {}}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
