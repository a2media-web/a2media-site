"use client";

/* Drop to the Floor — 3 drop styles. No eyebrow, no scissors. Cut frames
   fade to transparent as they fall. Slow loop: plays once on scroll-into-view,
   then re-cuts every 10s (pauses while off-screen). Respects reduced-motion. */

import { useEffect, useRef, useState } from "react";
import styles from "./dropcut.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const linear = (p: number) => p;
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

/* Slow drop. First play on view, then loop every `period`. Pauses off-screen. */
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
      if (!visible) return; // don't animate for no one
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
const KEPT = 7; // 7/12 ~ 35/60

type Variant = "clean" | "cascade" | "tumble";

const easeInQuad = (p: number) => p * p; // gravity: slow start, accelerate

function dropStyle(variant: Variant, j: number, t: number): React.CSSProperties {
  const dir = j % 2 === 0 ? 1 : -1;
  let stagger: number, dur: number, fall: number, rot: number, driftX: number;
  if (variant === "clean") {
    // fall together as a group, slow and graceful
    stagger = 0; dur = 0.92; fall = 210; rot = 5 * dir; driftX = 0;
  } else if (variant === "cascade") {
    stagger = 0.12; dur = 0.46; fall = 210; rot = 9 * dir; driftX = 6 * dir;
  } else {
    // tumble: spin, tossed off the end, further ones fly further
    stagger = 0.06; dur = 0.62; fall = 230; rot = 24 * dir; driftX = 26 + j * 16;
  }
  const fly = win(t, j * stagger, j * stagger + dur);
  const e = easeInQuad(fly);
  return {
    transform: `translate(${lerp(0, driftX, e)}px, ${lerp(0, fall, e)}px) rotate(${lerp(0, rot, fly)}deg)`,
    opacity: clamp01(1 - fly), // stay translucent the whole way down, gone at the floor
  };
}

function DropClip({ option, tag, variant }: { option: string; tag: string; variant: Variant }) {
  const { ref, t } = useDropLoop();
  return (
    <section className={styles.sec} ref={ref}>
      <div className={styles.inner}>
        <span className={styles.tag}>
          Version {option} · <b>{tag}</b>
        </span>
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
              style={i < KEPT ? undefined : dropStyle(variant, i - KEPT, t)}
            />
          ))}
        </div>

        <p className={styles.sub}>because their video content has built trust.</p>
      </div>
    </section>
  );
}

export default function DropClips() {
  return (
    <>
      <DropClip option="1" tag="Clean Drop" variant="clean" />
      <DropClip option="2" tag="Cascade" variant="cascade" />
      <DropClip option="3" tag="Tumble & Drift" variant="tumble" />
    </>
  );
}
