"use client";

/* CloseFaster — Calendar Tear-Off sticky push. Pins centered, scroll drives
   the count 60 -> 35 (A2 glow on landing), holds, then fades + lifts while the
   real Guide (pulled up behind via .guideLift in page.tsx) crossfades in. */

import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./CloseFaster.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

function useProgress(ref: RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setP(0.5); return; }
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setP(total > 0 ? clamp01(-rect.top / total) : 0);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [ref]);
  return p;
}

const days = (a: number) => Math.round(lerp(60, 35, a));

export default function CloseFaster() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref);

  const enterIn = win(p, 0.03, 0.15);
  const a = win(p, 0.17, 0.42);           // count finishes early
  // hold on 35 from ~0.42 to ~0.68, then the push
  const exit = easeInOut(win(p, 0.68, 1));
  const panelFade = win(p, 0.68, 0.9);    // calendar + panel crossfade out

  const contentTy = lerp(26, 0, enterIn);
  const panelY = -exit * 88;
  const panelOpacity = 1 - panelFade;
  const innerOpacity = Math.min(1, enterIn * 1.3);
  const landed = a >= 0.985 && panelFade < 0.4;

  return (
    <section className={styles.wrap} ref={ref} id="close-faster">
      <div className={styles.sticky}>
        <div className={styles.panel} style={{ transform: `translateY(${panelY}vh)`, opacity: panelOpacity }}>
          <div className={styles.inner} style={{ opacity: innerOpacity, transform: `translateY(${contentTy}px)` }}>
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
                const fly = win(a, t, t + 0.34);
                return (
                  <div key={i} className={styles.calPage} aria-hidden style={{ transform: `perspective(640px) rotateX(${-fly * 118}deg) translateY(${-fly * 48}px)`, opacity: 1 - fly, zIndex: 10 - i }} />
                );
              })}
            </div>
            <p className={styles.sub}>because their prospects trust them before the first call.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
