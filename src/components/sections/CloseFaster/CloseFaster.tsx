"use client";

/* CloseFaster — Calendar Tear-Off, sticky (same technique as StickyCurtain so
   it stays smooth on mobile): a 100vh sticky inside a tall section, the count
   60 -> 35 is driven by scroll progress (A2 glow on landing), it holds, then
   fades out via opacity. No vh-transforms, no negative margins. */

import { useEffect, useRef, useState } from "react";
import styles from "./CloseFaster.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const days = (a: number) => Math.round(lerp(60, 35, a));

export default function CloseFaster() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = ref.current;
      if (!w) return;
      const r = w.getBoundingClientRect();
      const total = w.offsetHeight - window.innerHeight;
      setP(total > 0 ? clamp01(-r.top / total) : 0);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const a = range(p, 0.12, 0.44);   // scroll drives the count
  const fade = range(p, 0.8, 0.98); // then it fades out
  const opacity = 1 - fade;
  const landed = a >= 0.985 && fade < 0.25;

  return (
    <section className={styles.section} ref={ref} id="close-faster">
      <div className={styles.sticky}>
        <div className={styles.stage} style={{ opacity }}>
          <h2 className={styles.heading}>
            Our clients close deals <span className={styles.teal}>40% faster.</span>
          </h2>
          <div className={`${styles.cal} ${landed ? styles.landed : ""}`} aria-label={`${days(a)} days to close, down from 60`}>
            <div className={styles.calBase}>
              <div className={styles.calNum}>{days(a)}</div>
              <div className={styles.calUnit}>days to close</div>
            </div>
            <div className={styles.calHdr}>Average sales cycle</div>
            {Array.from({ length: 6 }).map((_, i) => {
              const t = i / 6;
              const fly = range(a, t, t + 0.34);
              return (
                <div key={i} className={styles.calPage} aria-hidden style={{ transform: `perspective(640px) rotateX(${-fly * 118}deg) translateY(${-fly * 48}px)`, opacity: 1 - fly, zIndex: 10 - i }} />
              );
            })}
          </div>
          <p className={styles.sub}>because their prospects trust them before the first call.</p>
        </div>
      </div>
    </section>
  );
}
