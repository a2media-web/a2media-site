"use client";

/* Clip Cut — 3 treatments. Same copy. Each plays once on scroll-into-view,
   then re-cuts every 10s. Numbers are static (60 grayed -> 35 teal); the
   filmstrip is what animates. Respects prefers-reduced-motion. */

import { useEffect, useRef, useState } from "react";
import styles from "./clipcut.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

/* plays cut once in view, then loops (reassemble -> cut) every `period` ms */
function useClipCut(period = 10000, cutMs = 1700, assembleMs = 550) {
  const ref = useRef<HTMLElement>(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let mounted = true;
    let raf = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
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
      await animate(1, 0, assembleMs, easeInOut); // frames snap back
      if (!mounted) return;
      await animate(0, 1, cutMs, easeOut); // cut again
    };
    const io = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          if (reduce) {
            setT(1);
            return;
          }
          await animate(0, 1, cutMs, easeOut);
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
const keptPct = (KEPT / FRAMES) * 100;

function Stat({ kind }: { kind: "arrow" | "strike" }) {
  return (
    <>
      <div className={styles.stat} aria-label="60 days down to 35 days to close">
        {kind === "arrow" ? (
          <>
            <span className={styles.from}>60</span>
            <span className={styles.arrow}>→</span>
            <span className={styles.to}>35</span>
          </>
        ) : (
          <>
            <span className={`${styles.from} ${styles.strike}`}>60</span>
            <span className={styles.to}>35</span>
          </>
        )}
      </div>
      <div className={styles.statUnit}>days to close</div>
    </>
  );
}

type Motion = "up" | "right" | "down";

function ClipCut({
  option,
  tag,
  stat,
  motion,
}: {
  option: string;
  tag: string;
  stat: "arrow" | "strike";
  motion: Motion;
}) {
  const { ref, t } = useClipCut();

  const frameStyle = (i: number): React.CSSProperties | undefined => {
    if (i < KEPT) return undefined;
    const fly = win(t, (i - KEPT) * 0.1, (i - KEPT) * 0.1 + 0.55);
    const dir = i % 2 === 0 ? 1 : -1;
    if (motion === "up")
      return { transform: `translateY(${lerp(0, -130, fly)}px) rotate(${lerp(0, 12 * dir, fly)}deg)`, opacity: 1 - fly };
    if (motion === "down")
      return { transform: `translateY(${lerp(0, 150, fly)}px) rotate(${lerp(0, 16 * dir, fly)}deg)`, opacity: 1 - fly };
    // right
    return { transform: `translateX(${lerp(0, 90, fly)}px)`, opacity: 1 - fly };
  };

  return (
    <section className={styles.sec} ref={ref}>
      <div className={styles.inner}>
        <span className={styles.tag}>
          Mockup {option} · <b>{tag}</b>
        </span>
        <h2 className={styles.heading}>
          Our clients close deals <span className={styles.teal}>40% faster.</span>
        </h2>

        <Stat kind={stat} />

        <div className={styles.strip} aria-hidden>
          {Array.from({ length: FRAMES }).map((_, i) => (
            <div key={i} className={styles.frame} style={frameStyle(i)} />
          ))}

          {motion === "right" ? (
            <>
              <div className={styles.ghostEnd} style={{ left: "100%", opacity: 1 - win(t, 0.1, 0.5) }} />
              <div className={styles.endCap} style={{ left: `${keptPct}%`, opacity: win(t, 0.15, 0.55) }} />
            </>
          ) : (
            <div className={styles.cutMark} style={{ left: `${keptPct}%`, opacity: win(t, 0.05, 0.3) }}>
              <span>✂</span>
            </div>
          )}
        </div>

        <p className={styles.sub}>because their buyers already trust them.</p>
      </div>
    </section>
  );
}

export default function ClipCuts() {
  return (
    <>
      <ClipCut option="1" tag="Fly Up" stat="arrow" motion="up" />
      <ClipCut option="2" tag="Snip & Close" stat="strike" motion="right" />
      <ClipCut option="3" tag="Drop to the Floor" stat="arrow" motion="down" />
    </>
  );
}
