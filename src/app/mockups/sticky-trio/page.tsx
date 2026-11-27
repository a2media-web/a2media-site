"use client";

/* MOCKUP · /mockups/sticky-trio
   Three concepts as sticky scroll sections (scroll drives each animation):
   Kinetic Headline, The Race, and the original clip-cut. Framed by a Pain
   tail and Guide head. Not wired into the homepage. */

import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./trio.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeInQuad = (p: number) => p * p;

function useProgress(ref: RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
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

function envelope(p: number) {
  const enter = win(p, 0.04, 0.24);
  const exit = win(p, 0.78, 0.96);
  return {
    opacity: Math.min(1, enter * 1.3) * (1 - exit),
    ty: lerp(30, 0, enter) - lerp(0, 90, exit),
    a: win(p, 0.26, 0.74), // action progress during the hold
  };
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

type Variant = "kinetic" | "race" | "original";

function StickySection({ option, tag, variant }: { option: string; tag: string; variant: Variant }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref);
  const { opacity, ty, a } = envelope(p);

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.sticky}>
        <span className={styles.tag}>Option {option} · <b>{tag}</b></span>
        <div className={styles.inner} style={{ opacity, transform: `translateY(${ty}px)` }}>
          {variant === "kinetic" && (
            <>
              <p className={styles.kEyebrow}>The only metric your CFO remembers</p>
              <div className={styles.kBig}>{Math.round(lerp(0, 40, a))}%</div>
              <div className={styles.kMid}>faster to close.</div>
              <p className={styles.kSub}><b>60 → 35 days.</b> Because their prospects trust them before the first call.</p>
            </>
          )}

          {variant === "race" && (
            <>
              <h3 className={styles.raceHead}>Same pipeline. <span className={styles.teal}>Our clients just finish first.</span></h3>
              <div className={styles.raceRow}>
                <div className={styles.raceLabel}><span className={styles.muted}>Industry average</span><span className={styles.muted}>60 days</span></div>
                <div className={styles.raceTrack}><div className={`${styles.raceFill} ${styles.slow}`} style={{ width: `${lerp(0, 100, a)}%` }} /></div>
              </div>
              <div className={styles.raceRow}>
                <div className={styles.raceLabel}><span className={styles.win}>A2 Media clients</span><span className={styles.win}>35 days</span></div>
                <div className={styles.raceTrack}>
                  <div className={`${styles.raceFill} ${styles.fast}`} style={{ width: `${lerp(0, 58.3, clamp01(a / 0.62))}%` }} />
                  <div className={styles.raceFlag} style={{ left: "58.3%", transform: "translate(10px,-50%)", opacity: win(a, 0.62, 0.74) }}>✓ Closed · 40% faster</div>
                </div>
              </div>
              <div className={styles.raceAxis}><span>0</span><span>15</span><span>30</span><span>45</span><span>60 days</span></div>
            </>
          )}

          {variant === "original" && (
            <>
              <h2 className={styles.heading}>Our clients close deals <span className={styles.teal}>40% faster.</span></h2>
              <div className={styles.stat} aria-hidden>
                <span className={styles.from}>60</span><span className={styles.arrow}>→</span><span className={styles.to}>35</span>
              </div>
              <div className={styles.statUnit}>days to close</div>
              <div className={styles.strip} aria-hidden>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className={styles.frame} style={i < KEPT ? undefined : tumbleStyle(i - KEPT, a)} />
                ))}
              </div>
              <p className={styles.sub}>because their prospects trust them before the first call.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PainTail() {
  return <div className={styles.painTail}><h3><span>You tried video.</span><span>It sucked.</span></h3></div>;
}
function GuideHead() {
  return (
    <div className={styles.guideHead}>
      <h3>We know what it&apos;s like to spend $30K <em>on a video that makes $0.</em></h3>
      <p>So we built A2 Media differently.</p>
    </div>
  );
}

export default function Page() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.introKicker}>Close-faster · sticky scroll, between sections</p>
        <p className={styles.introBody}>
          Three concepts you scroll through. Each pins full-bleed and the scroll drives the animation
          (number counts, race runs, tiles cut), then falls away into Guide. Scroll slowly.
        </p>
      </header>

      {([
        ["1", "Kinetic Headline", "kinetic"],
        ["2", "The Race", "race"],
        ["3", "Original · Clip-Cut", "original"],
      ] as const).map(([opt, tag, v]) => (
        <section key={opt}>
          <PainTail />
          <StickySection option={opt} tag={tag} variant={v} />
          <GuideHead />
        </section>
      ))}

      <footer style={{ textAlign: "center", padding: "40px 24px 90px", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
        Mockup only · pick one and I&apos;ll build it as the live transition.
      </footer>
    </main>
  );
}
