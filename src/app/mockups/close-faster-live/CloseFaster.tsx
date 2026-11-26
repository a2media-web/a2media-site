"use client";

/* Close-Faster — Timeline Trim section (Option A), in-context mockup.
   Animates once when it scrolls into view: the clip trims 60 -> 35 days
   and the count rolls down. Respects prefers-reduced-motion. */

import { useEffect, useRef, useState } from "react";
import styles from "./CloseFaster.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

export default function CloseFaster() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setT(1);
      return;
    }
    let raf = 0;
    let start = 0;
    const DURATION = 1700;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          const tick = (now: number) => {
            if (!start) start = now;
            const p = clamp01((now - start) / DURATION);
            setT(easeOut(p));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const trim = win(t, 0.3, 1);
  const days = Math.round(lerp(60, 35, trim));
  const clipPct = lerp(94, 55, trim); // 35/60 of the track, with headroom
  const rise = win(t, 0, 0.35);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The part your CFO actually cares about</p>
        <h2 className={styles.heading}>
          Our clients close deals <span className={styles.teal}>40% faster.</span>
        </h2>

        <div
          style={{
            opacity: rise,
            transform: `translateY(${lerp(18, 0, rise)}px)`,
          }}
        >
          <div className={styles.stat} aria-label="60 to 35 days to close">
            <span className={styles.from}>60</span>
            <span className={styles.arrow}>→</span>
            <span className={styles.to}>{days}</span>
          </div>
          <div className={styles.statUnit}>days to close</div>

          <div className={styles.tl} aria-hidden>
            <div className={styles.ticks}>
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
            <div className={styles.ghost} style={{ left: `${clipPct}%` }} />
            <div className={styles.clip} style={{ width: `calc(${clipPct}% - 8px)` }}>
              {days} days
            </div>
            <div className={styles.playhead} style={{ left: `${clipPct}%` }} />
          </div>

          <div className={styles.labels} aria-hidden>
            <span className={styles.was}>60-day deals</span>
            <span className={styles.now}>35 and closing</span>
          </div>
        </div>

        <p className={styles.sub}>We trim your sales cycle like a bad take.</p>
      </div>
    </section>
  );
}
