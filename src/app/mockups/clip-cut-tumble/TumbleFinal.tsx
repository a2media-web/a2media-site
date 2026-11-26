"use client";

/* Tumble & Drift — final. Cut frames turn gray + translucent right before
   they fall, then tumble/drift off and fade out. No eyebrow, no scissors.
   Slow loop: plays once on scroll-into-view, re-cuts every 10s, pauses
   off-screen. Respects prefers-reduced-motion. */

import { useEffect, useRef, useState } from "react";
import styles from "../clip-cut-drop/dropcut.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const linear = (p: number) => p;
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
const easeInQuad = (p: number) => p * p;

function useDropLoop(period = 10000, cutMs = 3500, assembleMs = 900) {
  const ref = useRef<HTMLElement>(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let mounted = true;
    let raf = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    let visible = false;
    let primed = false;
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
      async (entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !primed) {
          primed = true;
          if (reduce) {
            setT(1);
            return;
          }
          await animate(0, 1, cutMs, linear);
          if (!mounted) return;
          timer = setInterval(loop, period);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      mounted = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      if (timer) clearInterval(timer);
    };
  }, [period, cutMs, assembleMs]);
  return { ref, t };
}

const FRAMES = 12;
const KEPT = 7;
const STAGGER = 0.06;
const DUR = 0.58;
const BASE_DELAY = 0.12; // room for the first frame's gray transition
const PRE_LEAD = 0.1; // how long it turns gray/translucent before falling

function tumbleStyle(j: number, t: number): React.CSSProperties {
  const dir = j % 2 === 0 ? 1 : -1;
  const start = BASE_DELAY + j * STAGGER;
  const gray = win(t, start - PRE_LEAD, start); // purple -> gray + translucent, in place
  const fly = win(t, start, start + DUR); // the tumble/drift fall
  const e = easeInQuad(fly);
  const driftX = 26 + j * 16; // further frames get tossed further
  return {
    transform: `translate(${lerp(0, driftX, e)}px, ${lerp(0, 230, e)}px) rotate(${lerp(0, 24 * dir, fly)}deg)`,
    filter: `grayscale(${gray}) brightness(${lerp(1, 0.7, gray)})`,
    opacity: clamp01((1 - 0.5 * gray) * (1 - fly)),
  };
}

export default function TumbleFinal() {
  const { ref, t } = useDropLoop();
  return (
    <section className={styles.sec} ref={ref}>
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
            <div
              key={i}
              className={styles.frame}
              style={i < KEPT ? undefined : tumbleStyle(i - KEPT, t)}
            />
          ))}
        </div>

        <p className={styles.sub}>because their prospects trusted them before the first call.</p>
      </div>
    </section>
  );
}
