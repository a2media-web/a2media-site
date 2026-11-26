"use client";

/* MOCKUP · /mockups/section-dividers
   Options for the dark-to-dark seam between Close-Faster and Guide.
   TOP: 3 "the fallen tiles become the transition" ideas (looping).
   BELOW: 5 simpler divider treatments.
   Not wired into the homepage. */

import { useEffect, useRef, useState } from "react";
import styles from "./dividers.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const linear = (p: number) => p;
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
const easeInQuad = (p: number) => p * p;

function useLoop(period = 6500, cutMs = 3200, assembleMs = 520) {
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
      { threshold: 0.3 }
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
type TVariant = "rain" | "vortex" | "ledge";

function GuideEcho() {
  return (
    <div className={styles.tGuide}>
      <h2 className={styles.tGuideH}>
        We know what it&apos;s like to spend $30K <em>on a video that makes $0.</em>
      </h2>
      <p className={styles.tGuideSub}>So we built A2 Media differently.</p>
    </div>
  );
}

function tileStyle(variant: TVariant, j: number, t: number): React.CSSProperties {
  const dir = j % 2 === 0 ? 1 : -1;
  const start = 0.12 + j * 0.06;
  const gray = win(t, start - 0.1, start);
  const fly = win(t, start, start + 0.6);
  const e = easeInQuad(fly);
  if (variant === "rain") {
    return {
      transform: `translate(${lerp(0, 14 * dir, e)}px, ${lerp(0, 320, e)}px) rotate(${lerp(0, 22 * dir, fly)}deg)`,
      filter: `grayscale(${gray}) brightness(${lerp(1, 0.7, gray)})`,
      opacity: clamp01((1 - 0.5 * gray) * (1 - fly)),
    };
  }
  if (variant === "vortex") {
    // pulled in toward lower-centre, spun and shrunk into the well
    return {
      transform: `translate(${lerp(0, -(90 + j * 34), e)}px, ${lerp(0, 150, e)}px) rotate(${lerp(0, 220 * dir, fly)}deg) scale(${lerp(1, 0.12, fly)})`,
      filter: `grayscale(${gray})`,
      opacity: clamp01((1 - 0.4 * gray) * (1 - fly * fly)),
    };
  }
  // ledge: fall a short way and dissolve as the filmstrip ledge assembles
  return {
    transform: `translate(0px, ${lerp(0, 120, e)}px) rotate(${lerp(0, 10 * dir, fly)}deg)`,
    filter: `grayscale(${gray})`,
    opacity: clamp01((1 - 0.5 * gray) * (1 - win(fly, 0.2, 0.9))),
  };
}

function TileDemo({ option, tag, variant }: { option: string; tag: string; variant: TVariant }) {
  const { ref, t } = useLoop();
  const grow = win(t, 0.4, 0.95);
  return (
    <section className={styles.tDemo} ref={ref}>
      <span className={styles.tagChip}>
        Tile {option} · <b>{tag}</b>
      </span>
      <div className={styles.tCf}>
        <div className={styles.tStatRow}>
          <span className={styles.from}>60</span>
          <span className={styles.arrow}>→</span>
          <span className={styles.to}>35</span>
        </div>
        <div className={styles.tStrip} aria-hidden>
          {Array.from({ length: FRAMES }).map((_, i) => (
            <div key={i} className={styles.tFrame} style={i < KEPT ? undefined : tileStyle(variant, i - KEPT, t)} />
          ))}
        </div>
      </div>

      <div style={{ position: "relative", height: 0 }} aria-hidden>
        {variant === "vortex" && (
          <div className={styles.wellGlow} style={{ opacity: 0.25 + grow * 0.6, transform: `translate(-50%,-50%) scale(${0.5 + grow * 0.7})` }} />
        )}
        {variant === "ledge" && (
          <div className={styles.ledgeBar} style={{ opacity: grow, transform: `translate(-50%,-50%) scaleX(${0.3 + grow * 0.7})` }} />
        )}
      </div>

      <GuideEcho />
    </section>
  );
}

/* ---- the 5 simpler dividers ---- */
function TailEcho({ deep }: { deep?: boolean }) {
  return (
    <div className={`${styles.tail} ${deep ? styles.tailDeep : ""}`}>
      <p className={styles.tailUnit}>days to close</p>
      <p className={styles.tailSub}>because their prospects trust them before the first call.</p>
    </div>
  );
}
function HeadEcho() {
  return (
    <div className={styles.head}>
      <h2 className={styles.headH}>
        We know what it&apos;s like to spend $30K <em>on a video that makes $0.</em>
      </h2>
      <p className={styles.headSub}>So we built A2 Media differently.</p>
    </div>
  );
}

export default function Page() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.introKicker}>Section seam · Close-Faster → Guide</p>
        <p className={styles.introBody}>
          Two dark sections were blending into dead space. Top three use the fallen tiles themselves as
          the bridge into the next section (looping). Below, five simpler dividers. None of them touch the
          rest of the site.
        </p>
      </header>

      {/* weird ones first */}
      <TileDemo option="A" tag="Rain Into Guide" variant="rain" />
      <TileDemo option="B" tag="Gravity Well" variant="vortex" />
      <TileDemo option="C" tag="Settle Into Filmstrip Ledge" variant="ledge" />

      {/* 1 · shimmer line */}
      <div className={styles.demo}>
        <span className={styles.tagChip}>Divider 1 · <b>Gradient Shimmer Line</b></span>
        <TailEcho />
        <div className={styles.dShimmer}>
          <div className={styles.shimmerTrack} />
          <div className={styles.shimmerGlow} />
        </div>
        <HeadEcho />
      </div>

      {/* 2 · diagonal tonal cut */}
      <div className={styles.demo}>
        <span className={styles.tagChip}>Divider 2 · <b>Diagonal Tonal Cut</b></span>
        <TailEcho deep />
        <div className={styles.dDiagonal} />
        <HeadEcho />
      </div>

      {/* 3 · tagline marquee */}
      <div className={styles.demo}>
        <span className={styles.tagChip}>Divider 3 · <b>Tagline Marquee</b></span>
        <TailEcho />
        <div className={styles.dMarquee}>
          <div className={styles.marqueeRow}>
            {Array.from({ length: 2 }).map((_, r) => (
              <span key={r}>
                {Array.from({ length: 6 }).map((__, k) => (
                  <span key={k}>Content That Converts <i>✦</i></span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <HeadEcho />
      </div>

      {/* 4 · ambient aurora */}
      <div className={styles.demo}>
        <span className={styles.tagChip}>Divider 4 · <b>Ambient Aurora Glow</b></span>
        <TailEcho />
        <div className={styles.dAurora}>
          <div className={styles.auroraBlob} />
        </div>
        <HeadEcho />
      </div>

      {/* 5 · scroll-cue connector */}
      <div className={styles.demo}>
        <span className={styles.tagChip}>Divider 5 · <b>Scroll-Cue Connector</b></span>
        <TailEcho />
        <div className={styles.dCue}>
          <div className={styles.cueLine} />
          <div className={styles.cueDot} />
          <div className={styles.cueChevron} aria-hidden>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 8l7 7 7-7" />
            </svg>
          </div>
        </div>
        <HeadEcho />
      </div>

      <footer style={{ textAlign: "center", padding: "56px 24px 90px", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
        Mockup only · pick a seam treatment and I&apos;ll wire it into the live section.
      </footer>
    </main>
  );
}
