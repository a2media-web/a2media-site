"use client";

/* Clip-Cut as a sticky scroll section. Scroll drives the tile cut; content
   enters, pins, cuts, then falls away. Respects prefers-reduced-motion. */

import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./stickyClip.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeInQuad = (p: number) => p * p;

function useProgress(ref: RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setP(0.5); return; }
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

const KEPT = 7;
function tumbleStyle(j: number, t: number): React.CSSProperties {
  const dir = j % 2 === 0 ? 1 : -1;
  const start = 0.12 + j * 0.06;
  const gray = win(t, start - 0.1, start);
  const fly = win(t, start, start + 0.58);
  const e = easeInQuad(fly);
  return {
    transform: `translate(${lerp(0, 26 + j * 16, e)}px, ${lerp(0, 240, e)}px) rotate(${lerp(0, 24 * dir, fly)}deg)`,
    filter: `grayscale(${gray}) brightness(${lerp(1, 0.7, gray)})`,
    opacity: clamp01((1 - 0.5 * gray) * (1 - fly)),
  };
}

export default function StickyClipCut() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref);
  const enter = win(p, 0.04, 0.22);
  const a = win(p, 0.24, 0.56); // scroll drives the cut; finishes before the handoff
  // As the next section scrolls up to cover from the bottom, the clip-cut
  // lifts off the top and fades, so they cross cleanly (no lingering headline,
  // no empty gap).
  const exit = win(p, 0.56, 0.78);
  const opacity = Math.min(1, enter * 1.3) * (1 - exit);
  const ty = lerp(30, 0, enter) - lerp(0, 150, exit);

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.sticky}>
        <div className={styles.inner} style={{ opacity, transform: `translateY(${ty}px)` }}>
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
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.frame} style={i < KEPT ? undefined : tumbleStyle(i - KEPT, a)} />
            ))}
          </div>
          <p className={styles.sub}>because their prospects trust them before the first call.</p>
        </div>
      </div>
    </div>
  );
}
