"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts4ClientCards.module.css";

/**
 * Option 4: Staggered 2x3 mosaic.
 *
 * Two rows of three cards. Middle card in each row is slightly bigger and
 * offset vertically, breaking the strict grid for visual character. Each
 * card has a subtle gradient backdrop tied to one of the brand accents
 * (purple / lilac / aqua / neon) — gives the section more chromatic
 * variety while staying within brand.
 */

const STATS = [
  { target: 30, suffix: "+", label: "B2B Brands Served", decimals: 0, accent: "purple" },
  { target: 18, suffix: "mo", label: "Avg. Client Tenure", decimals: 0, accent: "lilac" },
  { target: 35, suffix: "%", label: "Faster Close Rates", decimals: 0, accent: "neon" },
  { target: 72, suffix: "hr", label: "Avg. Turnaround Times", decimals: 0, accent: "lilac" },
  { target: 600, suffix: "+", label: "Videos Delivered", decimals: 0, accent: "purple" },
  { target: 4.9, suffix: "/5", label: "Client Rating", decimals: 1, accent: "neon" },
] as const;

function Count({ to, decimals, suffix, on }: { to: number; decimals: number; suffix: string; on: boolean }) {
  const [v, setV] = useState(on ? to : 0);
  useEffect(() => {
    if (!on) return;
    const start = performance.now();
    const duration = 1300;
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

export default function Receipts4ClientCards() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setOn(true);
      },
      { threshold: 0.2 },
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
        <div ref={ref} className={styles.mosaic}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`${styles.card} ${styles[s.accent]} ${i === 1 || i === 4 ? styles.featured : ""}`}
            >
              <div className={styles.number}>
                <Count to={s.target} decimals={s.decimals} suffix={s.suffix} on={on} />
              </div>
              <div className={styles.label}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
