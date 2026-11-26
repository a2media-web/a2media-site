"use client";

/* Four Timeline Trim variations, each animating once on scroll-into-view.
   Same claim across all four (40% faster, 60 -> 35 days) so the comparison
   is about the visual treatment. Respects prefers-reduced-motion. */

import { useEffect, useRef, useState } from "react";
import styles from "./variants.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

function useInViewTween(duration = 1700) {
  const ref = useRef<HTMLElement>(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(1);
      return;
    }
    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          const tick = (now: number) => {
            if (!start) start = now;
            const p = clamp01((now - start) / duration);
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
  }, [duration]);
  return { ref, t };
}

function Shell({
  tag,
  option,
  sub,
  children,
  refEl,
}: {
  tag: string;
  option: string;
  sub: string;
  children: React.ReactNode;
  refEl: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section className={styles.sec} ref={refEl as React.RefObject<HTMLElement>}>
      <div className={styles.inner}>
        <span className={styles.tag}>
          Option {option} · <b>{tag}</b>
        </span>
        <p className={styles.eyebrow}>The part your CFO actually cares about</p>
        <h2 className={styles.heading}>
          Our clients close deals <span className={styles.teal}>40% faster.</span>
        </h2>
        {children}
        <p className={styles.sub}>{sub}</p>
      </div>
    </section>
  );
}

/* ===== Option 1 — Dual-Lane Filmstrip ===== */
function V1() {
  const { ref, t } = useInViewTween();
  const trim = win(t, 0.3, 1);
  const clipPct = lerp(92, 55, trim);
  const days = Math.round(lerp(60, 35, trim));
  const cut = win(t, 0.75, 1);
  return (
    <Shell refEl={ref} option="1" tag="Dual-Lane Filmstrip" sub="Same pipeline. We just cut 25 days of dead air.">
      <div className={styles.lanes}>
        <div>
          <div className={styles.laneHead}>
            <span className={styles.name}>Without a system</span>
            <span className={styles.dim}>60 days</span>
          </div>
          <div className={styles.lane} aria-hidden>
            <div className={styles.ticks}>{Array.from({ length: 24 }).map((_, i) => <span key={i} />)}</div>
            <div className={`${styles.laneClip} ${styles.gray}`} style={{ right: 8 }}>stuck in the cycle</div>
          </div>
        </div>
        <div>
          <div className={styles.laneHead}>
            <span className={styles.tealTxt}>With a Video Engine</span>
            <span className={styles.tealTxt}>{days} days</span>
          </div>
          <div className={styles.lane} aria-hidden>
            <div className={styles.ticks}>{Array.from({ length: 24 }).map((_, i) => <span key={i} />)}</div>
            <div className={styles.laneGhost} style={{ left: `${clipPct}%` }} />
            <div className={`${styles.laneClip} ${styles.purple}`} style={{ width: `calc(${clipPct}% - 8px)` }}>{days} days to close</div>
            <div className={styles.playhead} style={{ left: `${clipPct}%` }} />
          </div>
        </div>
      </div>
      <div className={styles.cutCallout} style={{ opacity: cut }}>✂ 25 days cut</div>
    </Shell>
  );
}

/* ===== Option 2 — Stage Gantt ===== */
const STAGES = [
  { name: "Discovery", before: 18, after: 10 },
  { name: "Demo", before: 14, after: 8 },
  { name: "Proposal", before: 16, after: 9 },
  { name: "Negotiation", before: 12, after: 8 },
];
function V2() {
  const { ref, t } = useInViewTween();
  const trim = win(t, 0.3, 1);
  const total = Math.round(STAGES.reduce((s, st) => s + lerp(st.before, st.after, trim), 0));
  return (
    <Shell refEl={ref} option="2" tag="Stage Gantt" sub="Every stage moves faster when buyers already trust you.">
      <div className={styles.gantt}>
        {STAGES.map((st) => {
          const d = lerp(st.before, st.after, trim);
          return (
            <div className={styles.gRow} key={st.name}>
              <div className={styles.gName}>{st.name}</div>
              <div className={styles.gTrack}>
                <div className={styles.gBar} style={{ width: `${(d / 60) * 100}%` }}>
                  {Math.round(d)}d
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.gTotal}>
        <span className={styles.to}>{total}</span> <span className={styles.u}>days to close</span>
      </div>
      <div className={styles.gWas}>was 60 days</div>
    </Shell>
  );
}

/* ===== Option 3 — Minimal Scrubber ===== */
function V3() {
  const { ref, t } = useInViewTween();
  const trim = win(t, 0.3, 1);
  const dayPct = lerp(96, 58, trim); // 35/60 ~ 58%
  const days = Math.round(lerp(60, 35, trim));
  return (
    <Shell refEl={ref} option="3" tag="Minimal Scrubber" sub="60 days is the industry average. Our clients run 35.">
      <div className={styles.scrub}>
        <div className={styles.scrubTrack} aria-hidden>
          <div className={styles.scrubFill} style={{ width: `${dayPct}%` }} />
          <div className={styles.scrubGhost} style={{ left: "96%" }}>
            <span className={styles.scrubGhostLbl}>Industry avg · 60d</span>
          </div>
          <div className={styles.scrubMarker} style={{ left: `${dayPct}%` }}>
            <span className={styles.scrubFlag}>Day {days} · closed</span>
          </div>
        </div>
        <div className={styles.axis} aria-hidden>
          {[0, 15, 30, 45, 60].map((d) => (
            <span key={d} className={styles.axisTick} style={{ left: `${(d / 62.5) * 100}%` }}>
              {d}
            </span>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ===== Option 4 — Clip Cut ===== */
const FRAMES = 12; // 12 frames x 5 days = 60; keep 7 (35 days), cut 5
const KEPT = 7;
function V4() {
  const { ref, t } = useInViewTween();
  const trim = win(t, 0.3, 1);
  const days = Math.round(lerp(60, 35, trim));
  return (
    <Shell refEl={ref} option="4" tag="Clip Cut" sub="We cut the dead weight out of your sales cycle.">
      <div className={styles.strip} aria-hidden>
        {Array.from({ length: FRAMES }).map((_, i) => {
          const isCut = i >= KEPT;
          const fly = isCut ? win(trim, (i - KEPT) * 0.12, (i - KEPT) * 0.12 + 0.5) : 0;
          return (
            <div
              key={i}
              className={`${styles.frame} ${isCut ? styles.cut : ""}`}
              style={
                isCut
                  ? {
                      transform: `translateY(${lerp(0, -120, fly)}px) rotate(${lerp(0, 14, fly)}deg)`,
                      opacity: 1 - fly,
                    }
                  : undefined
              }
            />
          );
        })}
        <div className={styles.cutMark} style={{ left: `${(KEPT / FRAMES) * 100}%`, opacity: win(trim, 0.05, 0.3) }}>
          <span>✂</span>
        </div>
      </div>
      <div className={styles.stripTotal}>
        <span className={styles.to}>{days}</span> <span className={styles.u}>days to close</span>
      </div>
    </Shell>
  );
}

export default function Variants() {
  return (
    <>
      <V1 />
      <V2 />
      <V3 />
      <V4 />
    </>
  );
}
