"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process66Tabs.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simpler new #4: Tabs.
 *
 * Three tabs at the top, single content panel below. The active tab
 * cycles automatically (and is clickable). Only one step is on screen
 * at a time. Universal browser/app tab metaphor — zero learning curve.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process66Tabs() {
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

        <div className={styles.tabset}>
          <div className={styles.tabBar}>
            {PROCESS_STEPS.map((step, i) => (
              <button
                key={step.title}
                type="button"
                className={`${styles.tab} ${active === i ? styles.tabOn : ""}`}
                onClick={() => setActive(i)}
                style={active === i ? { color: COLORS[i] } : {}}
              >
                <span className={styles.tabNum}>0{i + 1}</span>
                <span className={styles.tabLabel}>Step {i + 1}</span>
                {active === i && (
                  <span className={styles.tabUnderline} style={{ background: COLORS[i] }} />
                )}
              </button>
            ))}
          </div>

          <div className={styles.panel} key={active}>
            <div className={styles.panelLeft} style={{ background: `linear-gradient(135deg, ${COLORS[active]}, var(--a2-night-core))` }}>
              <span className={styles.panelStep}>0{active + 1}</span>
            </div>
            <div className={styles.panelRight}>
              <p className={styles.panelEyebrow} style={{ color: COLORS[active] }}>{s.eyebrow}</p>
              <h3 className={styles.panelTitle}>{s.title}</h3>
              <p className={styles.panelDesc}>{s.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
