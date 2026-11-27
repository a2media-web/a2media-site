"use client";

/* CloseFaster — Calendar Tear-Off.
   Desktop: a sticky scroll push (pins, scroll drives 60 -> 35, holds, then
   fades + lifts while the real Guide crossfades in).
   Mobile: a normal section that plays the count + glow on scroll-into-view
   (no scroll-jacking, so it stays smooth). */

import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./CloseFaster.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
const days = (a: number) => Math.round(lerp(60, 35, a));

function Inner({ a, landed, style }: { a: number; landed: boolean; style?: React.CSSProperties }) {
  return (
    <div className={styles.inner} style={style}>
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
  );
}

/* ---------- Desktop: sticky scroll push ---------- */
function useProgress(ref: RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    // desktop version is display:none on mobile — don't run its scroll math there
    if (window.matchMedia("(max-width: 767px)").matches) { return; }
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

function Desktop() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref);
  const enterIn = win(p, 0.03, 0.15);
  const a = win(p, 0.17, 0.42);
  const exit = easeInOut(win(p, 0.68, 1));
  const panelFade = win(p, 0.68, 0.9);
  const panelY = -exit * 88;
  const landed = a >= 0.985 && panelFade < 0.4;
  return (
    <section className={styles.wrap} ref={ref} id="close-faster">
      <div className={styles.sticky}>
        <div className={styles.panel} style={{ transform: `translateY(${panelY}vh)`, opacity: 1 - panelFade }}>
          <Inner a={a} landed={landed} style={{ opacity: Math.min(1, enterIn * 1.3), transform: `translateY(${lerp(26, 0, enterIn)}px)` }} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Mobile: normal section, count plays on scroll-in ---------- */
function Mobile() {
  const ref = useRef<HTMLDivElement>(null);
  const [a, setA] = useState(0);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setA(1); setShown(true); return; }
    let raf = 0, started = false;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting && !started) {
        started = true;
        setShown(true);
        let start = 0;
        const tick = (now: number) => {
          if (!start) start = now;
          const pr = clamp01((now - start) / 2200);
          setA(easeOut(pr));
          if (pr < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  const landed = a >= 0.985;
  return (
    <section className={`${styles.mobileSec} ${shown ? styles.shown : ""}`} ref={ref}>
      <Inner a={a} landed={landed} />
    </section>
  );
}

/* Render both; CSS media queries decide which is visible (no JS swap, so the
   desktop sticky can never leak onto mobile). */
export default function CloseFaster() {
  return (
    <>
      <Desktop />
      <Mobile />
    </>
  );
}
