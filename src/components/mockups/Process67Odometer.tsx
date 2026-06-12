"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process67Odometer.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simpler new #5: Big odometer.
 *
 * One gigantic number on screen — "01 / 03" — that flips through 01,
 * 02, 03 with a digital-counter feel. Title + one-line description
 * below. Maximum single-focal-point simplicity. Eye has nowhere else
 * to go.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process67Odometer() {
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
              setActive(i);
              i = (i + 1) % 3;
              setTimeout(tick, 3400);
            };
            tick();
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

        <div className={styles.stage}>
          <div className={styles.odometer}>
            <div className={styles.digitWrap}>
              <div className={styles.digitInner} style={{ transform: `translateY(-${active * 100}%)`, color: COLORS[active] }}>
                <span className={styles.digit}>01</span>
                <span className={styles.digit}>02</span>
                <span className={styles.digit}>03</span>
              </div>
            </div>
            <div className={styles.slash}>/</div>
            <div className={styles.totalDigit}>03</div>
          </div>

          <div className={styles.copy} key={active}>
            <p className={styles.copyEyebrow} style={{ color: COLORS[active] }}>{s.eyebrow}</p>
            <h3 className={styles.copyTitle}>{s.title}</h3>
            <p className={styles.copyDesc}>{s.desc.split(".")[0]}.</p>
          </div>

          <div className={styles.bar}>
            <div className={styles.barFill} style={{ width: `${((active + 1) / 3) * 100}%`, background: COLORS[active] }} />
          </div>
        </div>
      </div>
    </section>
  );
}
