"use client";

/* Clip-Cut handoff as a vertical push. Clip-cut pins centered and the scroll
   drives the cut. On exit the clip-cut panel lifts up and off the top while
   the next section (behind) rises up into center -- both move up together. */

import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./push.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeInQuad = (p: number) => p * p;
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

function useProgress(ref: RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setP(0.45); return; }
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

export default function ClipCutPush() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref);

  const enterIn = win(p, 0.04, 0.2);
  const a = win(p, 0.22, 0.56); // scroll drives the cut
  const exit = easeOut(win(p, 0.6, 1)); // the push

  const contentTy = lerp(26, 0, enterIn); // settle in from Pain
  const panelY = -exit * 100; // clip-cut lifts up and off the top (vh)
  const guideY = lerp(42, 0, exit); // next section rises up into center (vh)

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.sticky}>
        {/* next section (its headline), behind, rises up into center */}
        <div className={styles.guideBehind} style={{ transform: `translateY(${guideY}vh)` }} aria-hidden={exit < 0.5}>
          <div className={styles.guidePreview}>
            <h2 className={styles.guideH}>
              We know what it&apos;s like to spend $30K <em>on a video that makes $0.</em>
            </h2>
            <p className={styles.guideSub}>So we built A2 Media differently. Every video we make starts with one question:</p>
            <p className={styles.guideQ}>&ldquo;will this actually move someone closer to buying?&rdquo;</p>
          </div>
        </div>

        {/* clip-cut panel, in front, lifts up */}
        <div className={styles.panel} style={{ transform: `translateY(${panelY}vh)` }}>
          <div className={styles.inner} style={{ opacity: Math.min(1, enterIn * 1.3), transform: `translateY(${contentTy}px)` }}>
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
    </div>
  );
}
