"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./KineticBridge.module.css";

const PHRASES = [
  "Here's",
  "what that",
  "looks like in",
  "real client work.",
];

export default function KineticBridge() {
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

  // Active phrase index based on progress
  const activeIdx = Math.min(
    PHRASES.length - 1,
    Math.floor(progress * PHRASES.length),
  );
  const arrowOpacity = Math.max(0, (progress - 0.85) * 6);

  return (
    <section ref={wrapRef} className={styles.wrap}>
      <div className={styles.sticky}>
        <div className={styles.stack}>
          {PHRASES.map((phrase, i) => {
            const state =
              i < activeIdx ? "past" : i === activeIdx ? "active" : "future";
            const cls = `${styles.phrase} ${styles[state]}`;
            return (
              <span key={i} className={cls}>
                {phrase}
              </span>
            );
          })}
        </div>
        <div
          className={styles.arrow}
          style={{ opacity: arrowOpacity, transform: `translateY(${(1 - arrowOpacity) * 12}px)` }}
          aria-hidden
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="28" height="28">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
