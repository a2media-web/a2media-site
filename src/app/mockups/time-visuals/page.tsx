"use client";

/* MOCKUP · /mockups/time-visuals
   Five alternative visuals for "60 -> 35 days" (to drop into the sticky push).
   Each loops while in view. Not wired into the homepage. */

import { useEffect, useRef, useState } from "react";
import styles from "./time.module.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

function useLoop(playMs = 2100, holdMs = 1500, resetMs = 450) {
  const ref = useRef<HTMLDivElement>(null);
  const [a, setA] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setA(1); return; }
    let mounted = true, raf = 0, visible = false, running = false;
    const animate = (from: number, to: number, dur: number) =>
      new Promise<void>((res) => {
        let start = 0;
        const tick = (now: number) => {
          if (!mounted) return res();
          if (!start) start = now;
          const p = clamp01((now - start) / dur);
          setA(lerp(from, to, easeInOut(p)));
          if (p < 1) raf = requestAnimationFrame(tick);
          else res();
        };
        raf = requestAnimationFrame(tick);
      });
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const run = async () => {
      running = true;
      while (mounted && visible) {
        await animate(0, 1, playMs);
        if (!mounted || !visible) break;
        await wait(holdMs);
        if (!mounted || !visible) break;
        await animate(1, 0, resetMs);
        await wait(250);
      }
      running = false;
    };
    const io = new IntersectionObserver((e) => {
      visible = e[0].isIntersecting && e[0].intersectionRatio > 0.35;
      if (visible && !running) run();
    }, { threshold: [0, 0.35] });
    io.observe(el);
    return () => { mounted = false; io.disconnect(); cancelAnimationFrame(raf); };
  }, [playMs, holdMs, resetMs]);
  return { ref, a };
}

const days = (a: number) => Math.round(lerp(60, 35, a));

function Readout({ a }: { a: number }) {
  return (
    <>
      <div className={styles.readout}><span className={styles.to}>{days(a)}</span> <span className={styles.u}>days to close</span></div>
      <div className={styles.was}><s>was 60 days</s></div>
    </>
  );
}

/* 1 · Hourglass */
function Hourglass({ a }: { a: number }) {
  const topLevel = 22 + a * 78; // sand top drops as it drains
  const botTop = 178 - a * 78;
  const stream = a > 0.04 && a < 0.97;
  return (
    <svg className={styles.glass} width="150" height="210" viewBox="0 0 140 200" aria-hidden>
      <defs>
        <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8f45ee" /><stop offset="1" stopColor="#28dfe8" /></linearGradient>
        <clipPath id="topTri"><path d="M22 22 H118 L70 100 Z" /></clipPath>
        <clipPath id="botTri"><path d="M70 100 L118 178 H22 Z" /></clipPath>
      </defs>
      <rect x="16" y="12" width="108" height="9" rx="4" fill="rgba(255,255,255,0.3)" />
      <rect x="16" y="179" width="108" height="9" rx="4" fill="rgba(255,255,255,0.3)" />
      <path d="M22 22 H118 L70 100 L22 22 Z" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
      <path d="M70 100 L118 178 H22 L70 100 Z" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
      <g clipPath="url(#topTri)"><rect x="20" y={topLevel} width="100" height="90" fill="url(#sand)" /></g>
      <g clipPath="url(#botTri)"><rect x="20" y={botTop} width="100" height="90" fill="url(#sand)" /></g>
      {stream && <rect x="68.5" y="100" width="3" height="78" fill="#28dfe8" opacity="0.9" />}
    </svg>
  );
}

/* 2 · Fast-forward clock */
function Clock({ a }: { a: number }) {
  const min = a * 720; // 2 fast spins
  const hr = a * 130;
  const blur = win(a, 0.02, 0.98);
  return (
    <svg className={styles.clock} width="170" height="170" viewBox="0 0 160 160" aria-hidden>
      <circle cx="80" cy="80" r="70" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.28)" strokeWidth="3" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="80" y1="16" x2="80" y2="24" stroke="rgba(255,255,255,0.4)" strokeWidth="2" transform={`rotate(${i * 30} 80 80)`} />
      ))}
      {[18, 36, 54].map((off, i) => (
        <line key={i} x1="80" y1="80" x2="80" y2="32" stroke="#28dfe8" strokeWidth="3" strokeLinecap="round" opacity={blur * (0.28 - i * 0.08)} transform={`rotate(${min - off} 80 80)`} />
      ))}
      <line x1="80" y1="88" x2="80" y2="44" stroke="var(--a2-electric-purple-soft)" strokeWidth="5" strokeLinecap="round" transform={`rotate(${hr} 80 80)`} />
      <line x1="80" y1="92" x2="80" y2="30" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" transform={`rotate(${min} 80 80)`} />
      <circle cx="80" cy="80" r="6" fill="#28dfe8" />
    </svg>
  );
}

/* 3 · Calendar tear-off */
function Calendar({ a }: { a: number }) {
  return (
    <div className={styles.cal} aria-hidden>
      <div className={styles.calBase}>
        <div className={styles.calNum}>{days(a)}</div>
        <div className={styles.calUnit}>days to close</div>
      </div>
      <div className={styles.calHdr}>Sales cycle</div>
      {Array.from({ length: 6 }).map((_, i) => {
        const t = i / 6;
        const fly = win(a, t, t + 0.34);
        return (
          <div key={i} className={styles.calPage} style={{ transform: `perspective(600px) rotateX(${-fly * 115}deg) translateY(${-fly * 46}px)`, opacity: 1 - fly, zIndex: 10 - i }} />
        );
      })}
    </div>
  );
}

/* 4 · Measuring tape */
function Tape({ a }: { a: number }) {
  const pos = (days(a) / 60) * 100;
  return (
    <div className={styles.tape} aria-hidden>
      <div className={styles.tapeTrack}>
        <div className={styles.tapeFill} style={{ width: `${pos}%` }} />
        <div className={styles.tapeSaved} style={{ left: `${pos}%` }} />
        <div className={styles.tapeTab} style={{ left: `${pos}%` }}><span>{days(a)} days</span></div>
      </div>
      <div className={styles.tapeAxis}><span>0</span><span>15</span><span>30</span><span>45</span><span>60 days</span></div>
    </div>
  );
}

/* 5 · Express line */
const STOPS = [["Discovery", 8], ["Demo", 28], ["Proposal", 44], ["Closed Won", 60]] as const;
function Metro({ a }: { a: number }) {
  const trainPos = lerp(2, 60, easeOut(a));
  const ghostPos = lerp(2, 92, a * 0.72);
  return (
    <div className={styles.metro} aria-hidden>
      <div className={styles.metroLine}>
        <div className={styles.rail} />
        <div className={styles.railExpress} style={{ width: `${trainPos}%` }} />
        {STOPS.map(([lbl, x]) => (
          <div key={lbl}>
            <div className={`${styles.station} ${trainPos >= x - 1 ? styles.done : ""}`} style={{ left: `${x}%` }} />
            <div className={styles.stationLbl} style={{ left: `${x}%` }}>{lbl}</div>
          </div>
        ))}
        <div className={styles.station} style={{ left: "92%" }} />
        <div className={styles.stationLbl} style={{ left: "92%", color: "rgba(255,255,255,0.35)" }}>60d</div>
        <div className={styles.ghostTrain} style={{ left: `${ghostPos}%` }} />
        <div className={styles.train} style={{ left: `${trainPos}%` }}>🚆</div>
      </div>
    </div>
  );
}

function Section({ opt, tag, note, children }: { opt: string; tag: string; note: string; children: (a: number) => React.ReactNode }) {
  const { ref, a } = useLoop();
  return (
    <section className={styles.sec} ref={ref}>
      <span className={styles.tag}>Idea {opt} · <b>{tag}</b></span>
      <h2 className={styles.head}>Our clients close deals <span className={styles.teal}>40% faster.</span></h2>
      <div className={styles.stage}>
        {children(a)}
        <Readout a={a} />
      </div>
      <p className={styles.note}>{note}</p>
    </section>
  );
}

export default function Page() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.introKicker}>Time visuals · for the sticky push</p>
        <p className={styles.introBody}>
          Five ways to show 60 → 35 instead of the blocks. Each loops here; in the real build the scroll
          drives it inside the sticky push. Two literally look like time being saved.
        </p>
      </header>
      <Section opt="1" tag="Hourglass Drain" note="We drain your sales cycle. Same pipeline, weeks poured out.">{(a) => <Hourglass a={a} />}</Section>
      <Section opt="2" tag="Fast-Forward Clock" note="We hit fast-forward on the time between hello and signed.">{(a) => <Clock a={a} />}</Section>
      <Section opt="3" tag="Calendar Tear-Off" note="Twenty-five days, torn off the calendar.">{(a) => <Calendar a={a} />}</Section>
      <Section opt="4" tag="Measuring Tape" note="We shorten the timeline. 60 days, pulled back to 35.">{(a) => <Tape a={a} />}</Section>
      <Section opt="5" tag="Express Line" note="Your deal takes the express. The industry takes the local.">{(a) => <Metro a={a} />}</Section>
      <footer style={{ textAlign: "center", padding: "50px 24px 90px", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
        Mockup only · pick a visual and I&apos;ll wire it into the sticky push.
      </footer>
    </main>
  );
}
