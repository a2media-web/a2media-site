"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts.module.css";

const STATS = [
  { target: 25, suffix: "+", label: "B2B Brands Served", decimals: 0 },
  { target: 18, suffix: "mo", label: "Avg. Client Tenure", decimals: 0 },
  { target: 35, suffix: "%", label: "Faster Close Rates", decimals: 0 },
  { target: 72, suffix: "hr", label: "Avg. Turnaround Times", decimals: 0 },
  { target: 550, suffix: "+", label: "Videos Delivered", decimals: 0 },
  { target: 4.9, suffix: "/5", label: "Client Rating", decimals: 1 },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Counter({ target, suffix, decimals, animate }: { target: number; suffix: string; decimals: number; animate: boolean }) {
  const [value, setValue] = useState(animate ? 0 : target);
  useEffect(() => {
    if (!animate) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (t: number) => {
      const elapsed = Math.min(1, (t - start) / duration);
      const eased = easeOutCubic(elapsed);
      setValue(target * eased);
      if (elapsed < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, target]);
  return (
    <>
      {value.toFixed(decimals)}
      <span className={styles.suffix}>{suffix}</span>
    </>
  );
}

export default function Receipts() {
  const ref = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setAnimate(true);
      },
      { threshold: 0.25 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} id="before-and-after" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What We&apos;ve Already Done</p>
        <h2 className={styles.heading}>The Receipts</h2>
        <div className={styles.grid}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.card}>
              <div className={styles.number}>
                <Counter
                  target={s.target}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  animate={animate}
                />
              </div>
              <div className={styles.label}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
