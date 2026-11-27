"use client";

/* Calendar Tear-Off in the sticky push. Clip-cut (calendar) pins centered and
   the scroll drives the count 60 -> 35 with pages tearing off. On exit the
   panel lifts up and off the top while the next section rises up into center. */

import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./push.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

function useProgress(ref: RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setP(0.45); return; }
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

export default function CalendarPush() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref);

  const enterIn = win(p, 0.04, 0.2);
  const a = win(p, 0.22, 0.56); // scroll drives the tear-off / count
  const exit = easeOut(win(p, 0.6, 1)); // the push

  const contentTy = lerp(26, 0, enterIn);
  const panelY = -exit * 100;
  const guideY = lerp(42, 0, exit);

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.sticky}>
        {/* next section rises up */}
        <div className={styles.guideBehind} style={{ transform: `translateY(${guideY}vh)` }} aria-hidden={exit < 0.5}>
          <div className={styles.guidePreview}>
            <h2 className={styles.guideH}>
              We know what it&apos;s like to spend $30K <em>on a video that makes $0.</em>
            </h2>
            <p className={styles.guideSub}>So we built A2 Media differently. Every video we make starts with one question:</p>
            <p className={styles.guideQ}>&ldquo;will this actually move someone closer to buying?&rdquo;</p>
          </div>
        </div>

        {/* calendar panel lifts up */}
        <div className={styles.panel} style={{ transform: `translateY(${panelY}vh)` }}>
          <div className={styles.inner} style={{ opacity: Math.min(1, enterIn * 1.3), transform: `translateY(${contentTy}px)` }}>
            <h2 className={styles.heading}>
              Our clients close deals <span className={styles.teal}>40% faster.</span>
            </h2>

            <div className={styles.cal} aria-label={`${days(a)} days to close, down from 60`}>
              <div className={styles.calBase}>
                <div className={styles.calNum} style={{ fontVariantNumeric: "tabular-nums" }}>{days(a)}</div>
                <div className={styles.calUnit}>days to close</div>
              </div>
              <div className={styles.calHdr}>Sales cycle</div>
              {Array.from({ length: 6 }).map((_, i) => {
                const t = i / 6;
                const fly = win(a, t, t + 0.34);
                return (
                  <div
                    key={i}
                    className={styles.calPage}
                    style={{ transform: `perspective(640px) rotateX(${-fly * 118}deg) translateY(${-fly * 48}px)`, opacity: 1 - fly, zIndex: 10 - i }}
                    aria-hidden
                  />
                );
              })}
            </div>

            <p className={styles.sub}>because their prospects trust them before the first call.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
