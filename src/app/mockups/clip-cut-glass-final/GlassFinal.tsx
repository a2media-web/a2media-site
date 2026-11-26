"use client";

/* Final Close-Faster section: Glass Panel, Blur-In entrance (once, on scroll
   into view), then the Tumble & Drift tile loop. Content vertically centered.
   Loop pauses off-screen; respects prefers-reduced-motion. */

import { useEffect, useRef, useState } from "react";
import styles from "./glassFinal.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const linear = (p: number) => p;
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
const easeInQuad = (p: number) => p * p;

const FRAMES = 12;
const KEPT = 7;

function tumbleStyle(j: number, t: number): React.CSSProperties {
  const dir = j % 2 === 0 ? 1 : -1;
  const start = 0.12 + j * 0.06;
  const gray = win(t, start - 0.1, start);
  const fly = win(t, start, start + 0.58);
  const e = easeInQuad(fly);
  return {
    transform: `translate(${lerp(0, 26 + j * 16, e)}px, ${lerp(0, 220, e)}px) rotate(${lerp(0, 24 * dir, fly)}deg)`,
    filter: `grayscale(${gray}) brightness(${lerp(1, 0.7, gray)})`,
    opacity: clamp01((1 - 0.5 * gray) * (1 - fly)),
  };
}

export default function GlassFinal() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [inview, setInview] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let mounted = true;
    let raf = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    let entranceDelay: ReturnType<typeof setTimeout> | undefined;
    let visible = false;
    let started = false;
    const period = 10000;
    const cutMs = 3500;
    const assembleMs = 900;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = (from: number, to: number, dur: number, ease: (p: number) => number) =>
      new Promise<void>((res) => {
        let start = 0;
        const tick = (now: number) => {
          if (!mounted) return res();
          if (!start) start = now;
          const p = clamp01((now - start) / dur);
          setT(lerp(from, to, ease(p)));
          if (p < 1) raf = requestAnimationFrame(tick);
          else res();
        };
        raf = requestAnimationFrame(tick);
      });

    const loop = async () => {
      if (!visible) return;
      await animate(1, 0, assembleMs, easeInOut);
      if (!mounted || !visible) return;
      await animate(0, 1, cutMs, linear);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible) setInview(true); // blur-in, one-way
        if (visible && !started) {
          started = true;
          if (reduce) {
            setT(1);
            return;
          }
          // let the entrance settle, then run the first cut and loop
          entranceDelay = setTimeout(async () => {
            if (!mounted) return;
            await animate(0, 1, cutMs, linear);
            if (!mounted) return;
            timer = setInterval(loop, period);
          }, 950);
        }
      },
      { threshold: [0, 0.35] }
    );
    io.observe(el);
    return () => {
      mounted = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      if (timer) clearInterval(timer);
      if (entranceDelay) clearTimeout(entranceDelay);
    };
  }, []);

  return (
    <section className={styles.wrap}>
      <div ref={ref} className={`${styles.card} ${inview ? styles.inview : ""}`}>
        <div className={styles.inner}>
          <h2 className={styles.heading}>
            Our clients close deals <span className={styles.teal}>40% faster.</span>
          </h2>
          <div className={styles.stat} aria-label="60 days down to 35 days to close">
            <span className={styles.from}>60</span>
            <span className={styles.arrow}>→</span>
            <span className={styles.to}>35</span>
          </div>
          <div className={styles.statUnit}>days to close</div>
          <div className={styles.strip} aria-hidden>
            {Array.from({ length: FRAMES }).map((_, i) => (
              <div key={i} className={styles.frame} style={i < KEPT ? undefined : tumbleStyle(i - KEPT, t)} />
            ))}
          </div>
          <p className={styles.sub}>because their prospects trust them before the first call.</p>
        </div>
      </div>
    </section>
  );
}
