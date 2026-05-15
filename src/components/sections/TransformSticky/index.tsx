"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TransformSticky.module.css";

const TICKER = [
  "deals stalling in the pipeline",
  "leads who've never heard your name",
  "$30K brand video sitting on a homepage",
  "content that gets likes but not pipeline",
  "demo no-shows",
  "prospects don't understand what you do",
  "buyers ghosting after the first call",
  "reps re-explaining the product on every call",
  "zero inbound from organic",
  "prospects can't differentiate you from competitors",
  "sales sending decks nobody opens",
  "warm leads going cold between touches",
];

const STATS = [
  { num: "35%", label: "faster time to close" },
  { num: "50%", label: "fewer touchpoints needed to close" },
  { num: "3/5", label: "prospects mention your content on calls" },
];

export default function TransformSticky() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = wrapperRef.current;
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

  // Success layer rises up from below to cover fail. At progress=0 it's fully
  // clipped (top inset 100%, success invisible, fail fully visible). At
  // progress=1 it's fully revealed (top inset 0%, success covers fail).
  const successClip = `inset(${(1 - progress) * 100}% 0 0 0)`;
  const hintOpacity = Math.max(0, 0.4 - progress * 3);

  return (
    <div ref={wrapperRef} id="a2TransformWrap" className={styles.wrapper}>
      <div className={styles.sticky}>
        <div className={`${styles.layer} ${styles.fail}`}>
          <p className={styles.eyebrowFail}>Without Video Content</p>
          <h2 className={styles.headingFail}>
            You&apos;re spending more and closing less, because each one of your
            video attempts dies before it compounds.
          </h2>
          <div className={styles.tickerWrap}>
            <div className={styles.ticker}>
              {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i} className={styles.tickerItem}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <p className={styles.bottomFail}>There&apos;s a better way.</p>
          <div className={styles.hint} style={{ opacity: hintOpacity }}>
            <span>Keep scrolling</span>
            <div className={styles.hintDots}>
              <div className={styles.hintDot} />
              <div className={styles.hintDot} />
              <div className={styles.hintDot} />
            </div>
          </div>
        </div>

        <div
          className={`${styles.layer} ${styles.success}`}
          style={{ clipPath: successClip }}
        >
          <p className={styles.eyebrowSuccess}>With Video Content</p>
          <h2 className={styles.headingSuccess}>
            Deals move faster because your prospects already trust you.
          </h2>
          <div className={styles.statsGrid}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
          <p className={styles.bottomSuccess}>
            This is what our clients experience in 2 sales cycles or less.
          </p>
        </div>
      </div>
    </div>
  );
}
