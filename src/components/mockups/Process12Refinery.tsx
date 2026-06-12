"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process12Refinery.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Pipeline / refinery.
 *
 * Liquid flows left-to-right through a literal pipe with 3 inline valve
 * stations. Particles travel inside the pipe (CSS animation). Each
 * valve "opens" when the flow reaches it — pressure gauges spin, the
 * station card lights up. Bonus: the name plays directly off "pipeline."
 */

const VALVES = ["INTAKE", "REFINE", "OUTPUT"];

export default function Process12Refinery() {
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
            const dwells = [1200, 2900, 4600];
            dwells.forEach((t, i) => setTimeout(() => setActiveIdx(i), t));
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
        <p className={styles.eyebrow}>A2 Pipeline · 3 valves</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.rig}>
          <div className={styles.pipe}>
            <span className={styles.tagIn}>CRUDE BRIEF →</span>
            <div className={`${styles.flow} ${run ? styles.flowOn : ""}`} aria-hidden>
              {Array.from({ length: 32 }).map((_, i) => (
                <span key={i} className={styles.particle} style={{ ["--p-i" as string]: i }} />
              ))}
            </div>
            <span className={styles.tagOut}>→ PIPELINE</span>

            {VALVES.map((label, i) => (
              <div
                key={label}
                className={`${styles.valveAssembly} ${styles[`valve${i}`]} ${i <= activeIdx ? styles.valveOn : ""}`}
              >
                <div className={styles.valveBody}>
                  <span className={styles.valveLight} />
                  <span className={styles.valveLabel}>{label}</span>
                  <div className={styles.valveWheel} aria-hidden>
                    <span /><span /><span /><span />
                  </div>
                </div>
                <div className={styles.gauge}>
                  <div className={styles.gaugeFace}>
                    <span
                      className={styles.gaugeNeedle}
                      style={{ transform: `rotate(${i <= activeIdx ? 64 : -68}deg)` }}
                    />
                    <span className={styles.gaugeMark0} />
                    <span className={styles.gaugeMark1} />
                  </div>
                  <span className={styles.gaugeLabel}>PSI</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.stations}>
            {PROCESS_STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`${styles.station} ${i <= activeIdx ? styles.stationOn : ""}`}
              >
                <div className={styles.stationHead}>
                  <span className={styles.statusLight} />
                  <span className={styles.stationCode}>VLV-0{i + 1}</span>
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
