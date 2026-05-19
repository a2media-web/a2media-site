"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts5Literal.module.css";

/**
 * Option 5: Spotlight rotator.
 *
 * One stat at a time, full-bleed, massive type. Auto-rotates every 4
 * seconds with a crossfade. Progress pips beneath show which stat you're
 * on and double as click targets so the viewer can jump around. Cinematic
 * + focused — gives each stat its own moment instead of competing in a
 * grid.
 */

const STATS = [
  { value: "25", suffix: "+", label: "B2B Brands Served", caption: "From early-stage startups to public SaaS leaders." },
  { value: "18", suffix: "mo", label: "Avg. Client Tenure", caption: "Real partnerships, not project-and-leave." },
  { value: "35", suffix: "%", label: "Faster Close Rates", caption: "Across measured client engagements." },
  { value: "72", suffix: "hr", label: "Avg. Turnaround Times", caption: "Brief on Monday, delivered by Thursday." },
  { value: "550", suffix: "+", label: "Videos Delivered", caption: "Shorts, customer stories, episodic series, ads." },
  { value: "4.9", suffix: "/5", label: "Client Rating", caption: "Across structured post-engagement reviews." },
];

const INTERVAL_MS = 4000;

export default function Receipts5Literal() {
  const [idx, setIdx] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % STATS.length);
    }, INTERVAL_MS);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const reset = (next: number) => {
    setIdx(next);
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % STATS.length);
    }, INTERVAL_MS);
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>

        <div className={styles.stage}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`${styles.slide} ${i === idx ? styles.slideActive : ""}`}
              aria-hidden={i !== idx}
            >
              <div className={styles.bigNumber}>
                {s.value}
                <span className={styles.suffix}>{s.suffix}</span>
              </div>
              <p className={styles.bigLabel}>{s.label}</p>
              <p className={styles.bigCaption}>{s.caption}</p>
            </div>
          ))}
        </div>

        <div className={styles.pips} role="tablist">
          {STATS.map((s, i) => (
            <button
              key={s.label}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Show ${s.label}`}
              onClick={() => reset(i)}
              className={`${styles.pip} ${i === idx ? styles.pipActive : ""}`}
            >
              <span className={styles.pipFill} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
