"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process56RackFocus.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Hypnotic concept #7: Rack focus.
 *
 * Three cards staged at different "depths" in z-space. Focus rotates
 * between them — only the active one is sharp; the others are gently
 * blurred. Camera rack-focus, but for content. Premium and unhurried.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process56RackFocus() {
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
              setTimeout(loop, 3400);
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

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Pull focus</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.stage}>
          {PROCESS_STEPS.map((s, i) => {
            const isFocus = active === i;
            const distance = Math.abs(active - i);
            return (
              <button
                type="button"
                key={s.title}
                className={`${styles.card} ${isFocus ? styles.cardFocus : ""}`}
                onClick={() => setActive(i)}
                style={{
                  filter: isFocus ? "blur(0)" : `blur(${4 + distance * 2}px)`,
                  transform: isFocus ? "scale(1.04) translateY(-4px)" : "scale(1) translateY(0)",
                  zIndex: 5 - distance,
                }}
              >
                <div className={styles.cardImage} style={{ background: `linear-gradient(135deg, ${COLORS[i]}, var(--a2-night-core))` }}>
                  <span className={styles.imageBrand}>A2</span>
                  <span className={styles.imageStep}>0{i + 1}</span>
                  {isFocus && <span className={styles.focusMark}>⌖ FOCUS</span>}
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardEyebrow} style={{ color: COLORS[i] }}>{s.eyebrow}</p>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardDesc}>{s.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className={styles.focusRing}>
          <span className={styles.focusLabel}>Focus distance</span>
          <div className={styles.focusBar}>
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                className={`${styles.focusDot} ${active === i ? styles.focusDotOn : ""}`}
                onClick={() => setActive(i)}
              >
                <span className={styles.focusDotInner} style={active === i ? { background: COLORS[i] } : {}} />
                <span className={styles.focusDotLabel}>{i === 0 ? "Near" : i === 1 ? "Mid" : "Far"}</span>
              </button>
            ))}
            <div className={styles.focusLine}>
              <div className={styles.focusLineFill} style={{ width: `${(active / 2) * 100}%`, background: COLORS[active] }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
