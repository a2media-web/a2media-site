"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CompressedConnector.module.css";

export default function CompressedConnector() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = wrapRef.current;
      if (!w) return;
      const r = w.getBoundingClientRect();
      const total = w.offsetHeight;
      const scrolled = window.innerHeight - r.top;
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={wrapRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Here&apos;s the proof</p>
        <div className={styles.lineWrap}>
          <div
            className={styles.line}
            style={{ height: `${progress * 100}%` }}
          />
          <div
            className={styles.dot}
            style={{
              top: `${progress * 100}%`,
              opacity: progress > 0.05 ? 1 : 0,
            }}
          />
        </div>
        <div
          className={styles.chevron}
          style={{
            opacity: progress > 0.85 ? 1 : 0,
            transform: `translateY(${progress > 0.85 ? 0 : -8}px)`,
          }}
          aria-hidden
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" width="22" height="22">
            <path d="M5 8L10 13L15 8" />
          </svg>
        </div>
      </div>
    </section>
  );
}
