"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts3StoryScroll.module.css";

/**
 * Option 3: Big-type vertical stack.
 *
 * Six stats stacked vertically full-width. Each row: massive number on
 * the left, label and description on the right. Editorial / magazine
 * feel — readers can ladder down them. Numbers are bigger than they've
 * ever been because each one gets its own band.
 */

const STATS = [
  { target: 25, suffix: "+", label: "B2B Brands Served", decimals: 0 },
  { target: 18, suffix: "mo", label: "Avg. Client Tenure", decimals: 0 },
  { target: 35, suffix: "%", label: "Faster Close Rates", decimals: 0 },
  { target: 72, suffix: "hr", label: "Avg. Turnaround Times", decimals: 0 },
  { target: 550, suffix: "+", label: "Videos Delivered", decimals: 0 },
  { target: 4.9, suffix: "/5", label: "Client Rating", decimals: 1 },
];

function Count({ to, decimals, suffix, on }: { to: number; decimals: number; suffix: string; on: boolean }) {
  const [v, setV] = useState(on ? to : 0);
  useEffect(() => {
    if (!on) return;
    const start = performance.now();
    const duration = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) requestAnimationFrame(tick);
      else setV(to);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, to]);
  return (
    <>
      {v.toFixed(decimals)}
      <span className={styles.suffix}>{suffix}</span>
    </>
  );
}

export default function Receipts3StoryScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setOn(true);
      },
      { threshold: 0.1 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
        <div ref={ref} className={styles.stack}>
          {STATS.map((s, i) => (
            <div key={s.label} className={styles.row}>
              <span className={styles.rowIndex}>{String(i + 1).padStart(2, "0")}</span>
              <div className={styles.rowNumber}>
                <Count to={s.target} decimals={s.decimals} suffix={s.suffix} on={on} />
              </div>
              <div className={styles.rowLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
