"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StatMorph.module.css";

const STATS = [
  { num: "35%", label: "faster time to close", to: "Reveal" },
  { num: "50%", label: "fewer touchpoints needed", to: "Okta" },
  { num: "3/5", label: "prospects mention content", to: "PartnerHacker" },
];

export default function StatMorph() {
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

  // Phase: 0 → 0.5 = stats fade out + shrink. 0.5 → 1.0 = tabs fade in.
  const statsOpacity = Math.max(0, 1 - progress * 2);
  const statsScale = 1 - progress * 0.18;
  const statsTranslate = -progress * 30;

  const tabsOpacity = Math.max(0, (progress - 0.45) * 2);
  const tabsTranslate = (1 - tabsOpacity) * 40;

  const titleOpacity = 1 - Math.abs(progress - 0.5) * 1.4;

  return (
    <section ref={wrapRef} className={styles.wrap}>
      <div className={styles.sticky}>
        <p
          className={styles.title}
          style={{ opacity: Math.max(0, titleOpacity) }}
        >
          From numbers <span>to receipts.</span>
        </p>

        <div
          className={styles.row}
          style={{
            opacity: statsOpacity,
            transform: `translateY(${statsTranslate}px) scale(${statsScale})`,
            pointerEvents: statsOpacity > 0.2 ? "auto" : "none",
          }}
        >
          {STATS.map((s) => (
            <div key={s.num} className={styles.stat}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statHint}>↓ {s.to}</div>
            </div>
          ))}
        </div>

        <div
          className={styles.row}
          style={{
            opacity: tabsOpacity,
            transform: `translateY(${tabsTranslate}px)`,
            pointerEvents: tabsOpacity > 0.2 ? "auto" : "none",
            position: "absolute",
          }}
        >
          {STATS.map((s) => (
            <div key={s.to} className={styles.tab}>
              <div className={styles.tabName}>{s.to}</div>
              <div className={styles.tabSub}>{s.num} · {s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
