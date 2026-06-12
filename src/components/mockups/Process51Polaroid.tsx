"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process51Polaroid.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Hypnotic concept #2: Polaroids developing.
 *
 * Three polaroids fanned at slight angles on a desk. Each starts pure
 * dark blank, then "develops" — fade-in gradient + step text appears
 * on the white border. One develops at a time, in sequence, then it
 * loops. Calm, classic, ASMR-quality reveal.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const ANGLES = ["-6deg", "0deg", "5deg"];
const OFFSETS = ["8px", "0px", "12px"];

export default function Process51Polaroid() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [developed, setDeveloped] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            const loop = () => {
              [1, 2, 3].forEach((n, i) => setTimeout(() => setDeveloped(n), 700 + i * 1400));
              setTimeout(() => {
                setDeveloped(0);
                setTimeout(loop, 600);
              }, 700 + 3 * 1400 + 2200);
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
        <p className={styles.eyebrow}>The development</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.scene}>
          {PROCESS_STEPS.map((s, i) => {
            const isDev = developed > i;
            return (
              <div
                key={s.title}
                className={`${styles.polaroid} ${isDev ? styles.polaroidOn : ""}`}
                style={{
                  transform: `rotate(${ANGLES[i]}) translateY(${OFFSETS[i]})`,
                }}
              >
                <div className={styles.image} style={{ background: isDev ? `linear-gradient(135deg, ${COLORS[i]}, var(--a2-night-core))` : "#0a0a0a" }}>
                  <div className={styles.imageOverlay} style={isDev ? { background: COLORS[i] } : {}} />
                  <span className={styles.frameNum}>0{i + 1}</span>
                  <span className={styles.brand}>A2</span>
                  <div className={styles.imageContent}>
                    <p className={styles.imgEyebrow}>{s.eyebrow.replace(":", "")}</p>
                    <p className={styles.imgTitle}>{s.title}</p>
                  </div>
                </div>
                <div className={styles.caption}>
                  <span className={styles.captionHandwriting}>
                    {isDev ? `Step ${i + 1} — ${s.title}` : "      "}
                  </span>
                  <span className={styles.captionDate}>
                    {isDev ? `${i === 0 ? "Wk 1-2" : i === 1 ? "Wk 3-12" : "Wk 13-26"}` : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.descRow}>
          {PROCESS_STEPS.map((s, i) => (
            <p key={s.title} className={`${styles.desc} ${developed > i ? styles.descOn : ""}`}>
              {s.desc}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
