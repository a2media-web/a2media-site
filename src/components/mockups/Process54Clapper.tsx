"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process54Clapper.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Hypnotic concept #5: Film slate / clapper-board.
 *
 * A director's clapper sits center-stage. The stick on top snaps closed
 * with a tactile clack — and each snap reveals the next step on the
 * board face. Three takes, three reveals. Big "ACTION!" energy.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process54Clapper() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [take, setTake] = useState(0);
  const [snapping, setSnapping] = useState(false);

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
              setSnapping(true);
              setTimeout(() => {
                setTake(i);
                setSnapping(false);
                i = (i + 1) % 3;
                setTimeout(loop, 3200);
              }, 320);
            };
            setTimeout(loop, 600);
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
        <p className={styles.eyebrow}>Quiet on set</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.stage}>
          <div className={styles.clapper}>
            <div className={`${styles.stick} ${snapping ? styles.stickSnap : ""}`}>
              <div className={styles.stickStripes}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} style={{ background: i % 2 ? "#fff" : "#0a0a0a" }} />
                ))}
              </div>
            </div>

            <div className={styles.board}>
              <div className={styles.boardTopRow}>
                <span className={styles.field}>
                  <span className={styles.fieldLabel}>PROD</span>
                  <span className={styles.fieldValue}>A2 Media</span>
                </span>
                <span className={styles.field}>
                  <span className={styles.fieldLabel}>SCENE</span>
                  <span className={styles.fieldValue}>{take + 1}</span>
                </span>
                <span className={styles.field}>
                  <span className={styles.fieldLabel}>TAKE</span>
                  <span className={styles.fieldValue}>0{take + 1}</span>
                </span>
              </div>

              <div className={styles.boardMiddle}>
                <p className={styles.boardEyebrow} style={{ color: COLORS[take] }}>
                  {PROCESS_STEPS[take].eyebrow}
                </p>
                <h3 className={styles.boardTitle}>{PROCESS_STEPS[take].title}</h3>
              </div>

              <div className={styles.boardFooter}>
                <span>DIR: A. ADELAKUN</span>
                <span>DATE: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}</span>
                <span style={{ color: COLORS[take] }}>● ROLLING</span>
              </div>
            </div>
          </div>

          <div className={styles.dotsCol}>
            {PROCESS_STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className={`${styles.takeBtn} ${take === i ? styles.takeBtnOn : ""}`}
                onClick={() => setTake(i)}
              >
                <span className={styles.takeNum} style={take === i ? { background: COLORS[i] } : {}}>{i + 1}</span>
                <span className={styles.takeLabel}>Take {i + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <p className={styles.bigDesc}>{PROCESS_STEPS[take].desc}</p>
      </div>
    </section>
  );
}
