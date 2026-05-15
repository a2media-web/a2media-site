"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RevealCurtain.module.css";

export default function RevealCurtain() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = wrapRef.current;
      if (!w) return;
      const r = w.getBoundingClientRect();
      const total = w.offsetHeight - window.innerHeight;
      const scrolled = -r.top;
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Curtain comes in 0 → 0.5, sits 0.5 → 0.7, exits 0.7 → 1.0
  let curtainX = 0;
  if (progress < 0.5) curtainX = -100 + progress * 200; // -100 → 0
  else if (progress < 0.7) curtainX = 0;
  else curtainX = (progress - 0.7) * (100 / 0.3); // 0 → 100

  const textOpacity =
    progress < 0.45
      ? 0
      : progress < 0.55
        ? (progress - 0.45) * 10
        : progress < 0.65
          ? 1
          : Math.max(0, 1 - (progress - 0.65) * 8);

  return (
    <section ref={wrapRef} className={styles.wrap}>
      <div className={styles.sticky}>
        <div className={styles.scene}>
          <div
            className={styles.curtain}
            style={{ transform: `translate3d(${curtainX}%, 0, 0) skewX(-12deg)` }}
            aria-hidden
          />
          <div
            className={styles.text}
            style={{
              opacity: textOpacity,
              transform: `translateY(${(1 - textOpacity) * 12}px)`,
            }}
          >
            <p className={styles.eyebrow}>Now the receipts</p>
            <h2 className={styles.heading}>
              Here&apos;s where the <span>money came from.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
