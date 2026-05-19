"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts1Bento.module.css";

/**
 * Option 1: Horizontal strip.
 *
 * Single row, all 6 stats side-by-side with thin vertical dividers between
 * them. Compact, dashboard-feel. Reads like a financial summary band —
 * stats glance-able as one unit instead of competing for attention.
 */

const STATS = [
  { target: 25, suffix: "+", label: "B2B Brands Served", decimals: 0 },
  { target: 18, suffix: "mo", label: "Avg. Client Tenure", decimals: 0 },
  { target: 35, suffix: "%", label: "Faster Close Rates", decimals: 0 },
  { target: 72, suffix: "hr", label: "Avg. Turnaround Times", decimals: 0 },
  { target: 550, suffix: "+", label: "Videos Delivered", decimals: 0 },
  { target: 4.9, suffix: "/5", label: "Client Rating", decimals: 1 },
];

function useAnimateOnScroll() {
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
  return { ref, on };
}

function Count({ to, decimals = 0, suffix = "", on, duration = 1400 }: { to: number; decimals?: number; suffix?: string; on: boolean; duration?: number }) {
  const [v, setV] = useState(on ? to : 0);
  useEffect(() => {
    if (!on) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) requestAnimationFrame(tick);
      else setV(to);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, to, duration]);
  return (
    <>
      {v.toFixed(decimals)}
      <span className={styles.suffix}>{suffix}</span>
    </>
  );
}

export default function Receipts1Bento() {
  const { ref, on } = useAnimateOnScroll();
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>

        <div ref={ref} className={styles.strip}>
          {STATS.map((s, i) => (
            <div key={s.label} className={styles.cell}>
              <div className={styles.number}>
                <Count to={s.target} decimals={s.decimals} suffix={s.suffix} on={on} />
              </div>
              <div className={styles.label}>{s.label}</div>
              {i < STATS.length - 1 && <span className={styles.divider} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
