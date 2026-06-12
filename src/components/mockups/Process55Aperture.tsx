"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process55Aperture.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Hypnotic concept #6: Camera aperture iris.
 *
 * A camera iris dilates through 3 openings. Each opening reveals the
 * next step (in the center "image plane"). The blades rotate softly as
 * they open. Cinematic, sensory, premium.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const APERTURES = ["f/8", "f/4", "f/1.4"];
const OPENINGS = [38, 60, 85]; // % opening per step

export default function Process55Aperture() {
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

  const openPct = OPENINGS[active];
  const bladeRotate = -10 + active * 24;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Open the lens</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.stage}>
          <div className={styles.lensWrap}>
            <div className={styles.lensRing}>
              <span className={styles.lensTopLabel}>{APERTURES[active]} · 50mm</span>
              <span className={styles.lensBottomLabel}>A2 PRO</span>
              <div className={styles.lensBody}>
                <div className={styles.imagePlane} style={{ background: `radial-gradient(circle at 40% 30%, ${COLORS[active]}, var(--a2-night-core) 80%)` }}>
                  <div className={styles.planeContent}>
                    <span className={styles.planeStep}>STEP {active + 1}</span>
                    <h3 className={styles.planeTitle}>{PROCESS_STEPS[active].title}</h3>
                  </div>
                </div>

                <div className={styles.iris} style={{ transform: `rotate(${bladeRotate}deg)` }}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span
                      key={i}
                      className={styles.blade}
                      style={{
                        transform: `rotate(${i * 45}deg) translateY(${-openPct * 0.9}%)`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <span className={styles.lensSerial}>· · · · · ·</span>
            </div>
          </div>

          <div className={styles.copyCol}>
            {PROCESS_STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className={`${styles.copyRow} ${active === i ? styles.copyRowOn : ""}`}
                onClick={() => setActive(i)}
              >
                <span className={styles.copyAperture} style={active === i ? { color: COLORS[i] } : {}}>{APERTURES[i]}</span>
                <div className={styles.copyText}>
                  <span className={styles.copyEyebrow} style={{ color: COLORS[i] }}>{s.eyebrow}</span>
                  <span className={styles.copyTitle}>{s.title}</span>
                  <span className={styles.copyDesc}>{s.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
