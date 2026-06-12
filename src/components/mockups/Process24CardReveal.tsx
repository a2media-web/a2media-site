"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process24CardReveal.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * SURPRISE #2: Card reveal (poker / tarot).
 *
 * Three large face-down cards arranged center stage with a dealer-style
 * felt backdrop. As the user scrolls in, each card flips face-up one at
 * a time with a flick animation, revealing the step. Pip pattern + suit
 * styling. Click any card to flip it again. Mysterious + ceremonial.
 */

const SUITS = ["♠", "♣", "♥"];
const SUIT_COLORS = ["#fff", "#fff", "#ff5e5e"];

export default function Process24CardReveal() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            [0, 1, 2].forEach((i) =>
              setTimeout(() => {
                setFlipped((prev) => prev.map((v, j) => (j === i ? true : v)));
              }, 900 + i * 900),
            );
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = (i: number) => {
    setFlipped((prev) => prev.map((v, j) => (j === i ? !v : v)));
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A2 Card Room · 3 hands</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.felt}>
          <span className={styles.feltStitch} aria-hidden />
          <div className={styles.hand}>
            {PROCESS_STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className={styles.cardWrap}
                onClick={() => toggle(i)}
                aria-label={`Card ${i + 1}: ${s.title}`}
              >
                <div className={`${styles.card} ${flipped[i] ? styles.cardFlipped : ""}`}>
                  {/* Back */}
                  <div className={styles.cardBack}>
                    <div className={styles.backPattern}>
                      <span /><span /><span />
                      <span /><span /><span />
                      <span /><span /><span />
                    </div>
                    <span className={styles.backMark}>A2</span>
                  </div>
                  {/* Front */}
                  <div className={styles.cardFront}>
                    <div className={styles.cornerTop}>
                      <span className={styles.cornerNum}>0{i + 1}</span>
                      <span className={styles.cornerSuit} style={{ color: SUIT_COLORS[i] }}>{SUITS[i]}</span>
                    </div>
                    <div className={styles.cornerBottom}>
                      <span className={styles.cornerNum}>0{i + 1}</span>
                      <span className={styles.cornerSuit} style={{ color: SUIT_COLORS[i] }}>{SUITS[i]}</span>
                    </div>
                    <div className={styles.frontContent}>
                      <p className={styles.stepEyebrow}>{s.eyebrow}</p>
                      <h3 className={styles.stepTitle}>{s.title}</h3>
                      <p className={styles.stepDesc}>{s.desc}</p>
                    </div>
                    <span className={styles.frontWatermark} style={{ color: SUIT_COLORS[i] }}>
                      {SUITS[i]}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className={styles.dealerNote}>
            Click any card to flip · House always pays the pipeline
          </p>
        </div>
      </div>
    </section>
  );
}
