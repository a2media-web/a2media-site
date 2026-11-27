"use client";

/* MOCKUP · /mockups/sticky-close-faster
   Close-Faster as a sticky scroll transition, 4 motions. Each pins full-bleed
   and is driven by scroll (enter -> hold/cut -> exit), framed by a Pain tail
   above and a Guide head below. Not wired into the homepage. */

import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./stickyCf.module.css";

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
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return p;
}

const FRAMES = 12;
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

type Variant = "rise" | "scrub" | "scale" | "parallax";

function compute(variant: Variant, p: number) {
  let container: React.CSSProperties = {};
  let h = 0, st = 0, strip = 0, sub = 0; // per-element translateY (parallax)
  let tumbleT = 0;
  if (variant === "rise") {
    const enter = win(p, 0.02, 0.3);
    const exit = win(p, 0.64, 0.98);
    const ty = lerp(80, 0, enter) - lerp(0, 120, exit);
    container = { transform: `translateY(${ty}px)`, opacity: Math.min(1, enter * 1.25) * (1 - exit) };
    tumbleT = win(p, 0.32, 0.64);
  } else if (variant === "scrub") {
    const enter = win(p, 0.02, 0.2);
    const exit = win(p, 0.82, 0.98);
    container = { opacity: Math.min(1, enter * 1.3) * (1 - exit) };
    tumbleT = win(p, 0.24, 0.8); // scroll performs the cut
  } else if (variant === "scale") {
    const enter = win(p, 0.02, 0.3);
    const exit = win(p, 0.62, 0.98);
    const scale = lerp(0.82, 1, enter) * lerp(1, 1.3, exit);
    container = { transform: `scale(${scale})`, opacity: Math.min(1, enter * 1.3) * (1 - exit) };
    tumbleT = win(p, 0.32, 0.6);
  } else {
    const enter = win(p, 0.02, 0.2);
    const exit = win(p, 0.82, 0.98);
    container = { opacity: Math.min(1, enter * 1.3) * (1 - exit) };
    const c = p - 0.45;
    h = c * -170; st = c * -90; strip = c * -40; sub = c * -220;
    tumbleT = win(p, 0.3, 0.68);
  }
  return { container, h, st, strip, sub, tumbleT };
}

function StickyCF({ option, tag, variant }: { option: string; tag: string; variant: Variant }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref);
  const m = compute(variant, p);
  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.sticky}>
        <span className={styles.tag}>
          Option {option} · <b>{tag}</b>
        </span>
        <div className={styles.inner} style={m.container}>
          <h2 className={styles.heading} style={{ transform: `translateY(${m.h}px)` }}>
            Our clients close deals <span className={styles.teal}>40% faster.</span>
          </h2>
          <div style={{ transform: `translateY(${m.st}px)` }}>
            <div className={styles.stat} aria-hidden>
              <span className={styles.from}>60</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.to}>35</span>
            </div>
            <div className={styles.statUnit}>days to close</div>
          </div>
          <div className={styles.strip} style={{ transform: `translateY(${m.strip}px)` }} aria-hidden>
            {Array.from({ length: FRAMES }).map((_, i) => (
              <div key={i} className={styles.frame} style={i < KEPT ? undefined : tumbleStyle(i - KEPT, m.tumbleT)} />
            ))}
          </div>
          <p className={styles.sub} style={{ transform: `translateY(${m.sub}px)` }}>
            because their prospects trust them before the first call.
          </p>
        </div>
      </div>
    </div>
  );
}

function PainTail() {
  return (
    <div className={styles.painTail}>
      <h3><span>You tried video.</span><span>It sucked.</span></h3>
    </div>
  );
}
function GuideHead() {
  return (
    <div className={styles.guideHead}>
      <h3>
        We know what it&apos;s like to spend $30K <em>on a video that makes $0.</em>
      </h3>
      <p>So we built A2 Media differently.</p>
    </div>
  );
}

export default function Page() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.introKicker}>Close-Faster · sticky scroll transition</p>
        <p className={styles.introBody}>
          Instead of its own card, the beat pins while you scroll and animates through, then falls
          away into Guide. Four motions below, each framed by a Pain tail and Guide head. Scroll slowly.
        </p>
      </header>

      {( [
        ["1", "Rise & Fall", "rise"],
        ["2", "Scroll-Scrubbed Cut", "scrub"],
        ["3", "Scale-Through", "scale"],
        ["4", "Parallax Layers", "parallax"],
      ] as const).map(([opt, tag, v]) => (
        <section key={opt}>
          <PainTail />
          <StickyCF option={opt} tag={tag} variant={v} />
          <GuideHead />
        </section>
      ))}

      <footer style={{ textAlign: "center", padding: "40px 24px 90px", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
        Mockup only · pick a motion and I&apos;ll build it as the live transition.
      </footer>
    </main>
  );
}
