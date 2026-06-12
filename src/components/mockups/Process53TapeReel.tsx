"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process53TapeReel.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Hypnotic concept #4: Reel-to-reel tape player.
 *
 * Two big spools turning, tape stretches between them. Three labels on
 * the tape (Step 1 / 2 / 3). A small "playhead" indicator stays
 * stationary while the tape moves through it, highlighting each marker
 * in turn. The spools never stop spinning — pure motion lock-in.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process53TapeReel() {
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
        <p className={styles.eyebrow}>The reel is rolling</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.deck}>
          <div className={styles.reel}>
            <Spool color={COLORS[active]} />
            <Spool color={COLORS[active]} />

            <div className={styles.tapeStretch} />

            <div className={styles.playhead}>
              <span className={styles.playheadDot} style={{ background: COLORS[active] }} />
            </div>

            <div className={styles.markers}>
              {PROCESS_STEPS.map((s, i) => (
                <div
                  key={s.title}
                  className={`${styles.marker} ${active === i ? styles.markerOn : ""}`}
                  style={{ left: `${20 + i * 30}%`, color: COLORS[i] }}
                >
                  <span className={styles.markerLine} style={{ background: COLORS[i] }} />
                  <span className={styles.markerLabel}>STEP {i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.transport}>
            <span>⏮</span><span className={styles.playBtn}>▶</span><span>⏭</span>
            <span className={styles.tc}>TAKE {active + 1} OF 3</span>
            <span style={{ marginLeft: "auto" }} className={styles.brand}>A2 MEDIA · MASTER</span>
          </div>
        </div>

        <div className={styles.copyBlock}>
          <p className={styles.copyEyebrow} style={{ color: COLORS[active] }}>{PROCESS_STEPS[active].eyebrow}</p>
          <h3 className={styles.copyTitle}>{PROCESS_STEPS[active].title}</h3>
          <p className={styles.copyDesc}>{PROCESS_STEPS[active].desc}</p>
        </div>
      </div>
    </section>
  );
}

function Spool({ color }: { color: string }) {
  return (
    <div className={styles.spool}>
      <div className={styles.spoolBody}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={styles.spoke} style={{ transform: `rotate(${i * 60}deg)` }} />
        ))}
        <div className={styles.hub} style={{ background: color }} />
      </div>
    </div>
  );
}
