"use client";

/* Mockup: /mockups/fable-animations-hero-receipts
   Round 2 of motion concepts for the live a2media.ca frames.
   Round 1 shipped "The Razor Cut" (Hero) and "Playhead Drag" (Receipts).
   These six are categorically different ideas, not variations:

   01 · Alt Hero      · "Rack Focus"          · lens pull, AF reticle, focus lock
   02 · Alt Hero      · "Tracking Error"      · VHS chroma split + scanline roll
   03 · Alt Hero      · "Burned-In Captions"  · karaoke word pills + waveform
   04 · Alt Receipts  · "The Grade"           · log-to-graded LUT wipe across frames
   05 · Alt Receipts  · "The Dealer's Fan"    · thumbnail deck fans, holds, restacks
   06 · Alt Receipts  · "The Satellite Reel"  · featured frame with orbiting work

   Every loop is self-running (4 to 9 seconds), so a static screenshot lands
   mid-animation. CSS keyframes + light React state only. No libraries. */

import React, { useEffect, useRef, useState } from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const TEAL = "#28DFE8";
const NEON = "#66F78E";
const WHITE = "#FFFFFF";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

/* ================================================================== */
/* Shared mini-hero furniture                                          */
/* ================================================================== */

const SWAP_WORDS = ["closing deals", "driving pipeline", "converting buyers", "building trust"];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={SH.eyebrow}>
      <span className="fb-dot" style={SH.dot} aria-hidden />
      {children}
    </p>
  );
}

function HeroCtas() {
  return (
    <div style={SH.ctas}>
      <span style={SH.btnPrimary}>See if we&apos;re a fit</span>
      <span style={SH.btnGhost}>See the work</span>
    </div>
  );
}

const SH = {
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.72)",
    margin: "0 0 24px",
  } as React.CSSProperties,
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: NEON,
    display: "inline-block",
  } as React.CSSProperties,
  ctas: {
    display: "flex",
    justifyContent: "center",
    gap: 14,
    flexWrap: "wrap",
  } as React.CSSProperties,
  btnPrimary: {
    padding: "12px 26px",
    background: PURPLE,
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 14,
    boxShadow: "0 12px 44px rgba(90,51,255,0.5)",
  } as React.CSSProperties,
  btnGhost: {
    padding: "12px 26px",
    border: "1px solid rgba(255,255,255,0.22)",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
  } as React.CSSProperties,
};

/* ================================================================== */
/* Demo 01 · Alt Hero · Rack Focus                                     */
/* ================================================================== */

const RF_CYCLE = 4.2; // seconds per word

function HeroRackFocus() {
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % SWAP_WORDS.length), RF_CYCLE * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={D1.stage}>
      <div style={D1.glow} aria-hidden />
      <div style={D1.vignette} aria-hidden />

      <div style={{ position: "relative" }}>
        <Eyebrow>600+ Sales-Driven Videos for B2B SaaS Teams</Eyebrow>

        <h2 style={D1.title}>
          <span style={{ display: "block" }}>Your videos should be</span>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>
            <span key={wordIndex} style={D1.wordWrap}>
              {/* AF reticle corners */}
              <span style={{ ...D1.corner, top: -8, left: -12, borderWidth: "2px 0 0 2px" }} aria-hidden />
              <span style={{ ...D1.corner, top: -8, right: -12, borderWidth: "2px 2px 0 0" }} aria-hidden />
              <span style={{ ...D1.corner, bottom: -8, left: -12, borderWidth: "0 0 2px 2px" }} aria-hidden />
              <span style={{ ...D1.corner, bottom: -8, right: -12, borderWidth: "0 2px 2px 0" }} aria-hidden />
              <em className="fb-rfword" style={D1.word}>
                {SWAP_WORDS[wordIndex]}
              </em>
              <span className="fb-aflock" style={D1.afLock}>
                AF LOCK
              </span>
            </span>{" "}
            <span>for you.</span>
          </span>
        </h2>

        <HeroCtas />

        <div style={D1.hud}>
          <span>50MM</span>
          <span style={{ color: LILAC }}>f/1.8</span>
          <span style={D1.focusTrack}>
            <span className="fb-rfslider" style={D1.focusThumb} aria-hidden />
          </span>
          <span style={{ color: "rgba(255,255,255,0.45)" }}>MF</span>
          <span style={{ color: NEON }}>AF</span>
          <span>ISO 800</span>
        </div>
      </div>
    </div>
  );
}

const D1 = {
  stage: {
    position: "relative",
    overflow: "hidden",
    padding: "66px 32px 54px",
    textAlign: "center",
  } as React.CSSProperties,
  glow: {
    position: "absolute",
    width: "58%",
    height: "64%",
    left: "21%",
    top: "8%",
    background: "radial-gradient(closest-side, rgba(90,51,255,0.3), transparent 70%)",
    filter: "blur(28px)",
    pointerEvents: "none",
  } as React.CSSProperties,
  vignette: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(120% 90% at 50% 50%, transparent 58%, rgba(0,0,0,0.45) 100%)",
    pointerEvents: "none",
  } as React.CSSProperties,
  title: {
    fontSize: "clamp(30px, 4.4vw, 52px)",
    fontWeight: 800,
    lineHeight: 1.14,
    letterSpacing: "-0.025em",
    margin: "0 0 32px",
  } as React.CSSProperties,
  wordWrap: {
    position: "relative",
    display: "inline-block",
    padding: "0 0.12em",
  } as React.CSSProperties,
  corner: {
    position: "absolute",
    width: 13,
    height: 13,
    borderStyle: "solid",
    borderColor: LILAC,
    opacity: 0.9,
  } as React.CSSProperties,
  word: {
    display: "inline-block",
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    color: LILAC,
    willChange: "filter, transform",
  } as React.CSSProperties,
  afLock: {
    position: "absolute",
    top: -26,
    right: -14,
    fontFamily: MONO,
    fontSize: 9.5,
    fontWeight: 800,
    letterSpacing: "0.18em",
    color: NEON,
    border: "1px solid rgba(102,247,142,0.5)",
    borderRadius: 4,
    padding: "2px 6px",
    background: "rgba(13,5,54,0.7)",
  } as React.CSSProperties,
  hud: {
    display: "inline-flex",
    alignItems: "center",
    gap: 16,
    marginTop: 36,
    fontFamily: MONO,
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: "0.16em",
    color: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 999,
    padding: "9px 20px",
    background: "rgba(255,255,255,0.03)",
  } as React.CSSProperties,
  focusTrack: {
    position: "relative",
    width: 110,
    height: 3,
    borderRadius: 999,
    background: "rgba(255,255,255,0.14)",
    display: "inline-block",
  } as React.CSSProperties,
  focusThumb: {
    position: "absolute",
    top: -3.5,
    left: 0,
    width: 10,
    height: 10,
    borderRadius: 999,
    background: PURPLE,
    boxShadow: "0 0 12px rgba(90,51,255,0.9)",
  } as React.CSSProperties,
};

/* ================================================================== */
/* Demo 02 · Alt Hero · Tracking Error (VHS)                           */
/* ================================================================== */

const VHS_CYCLE = 3.8;

function VhsCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.floor((now - start) / 1000) + 754; // arbitrary tape position
      const m = Math.floor(t / 60);
      const s = t % 60;
      if (ref.current) ref.current.textContent = `SP 0:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <span ref={ref}>SP 0:12:34</span>;
}

function HeroTrackingError() {
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % SWAP_WORDS.length), VHS_CYCLE * 1000);
    return () => clearInterval(id);
  }, []);

  const word = SWAP_WORDS[wordIndex];

  return (
    <div style={D2.stage}>
      <div style={D2.glow} aria-hidden />
      <div className="fb-rollband" style={D2.rollBand} aria-hidden />
      <div style={D2.scanlines} aria-hidden />

      <span style={D2.osdPlay}>PLAY <span aria-hidden>▶</span></span>
      <span style={D2.osdCounter}><VhsCounter /></span>

      <div style={{ position: "relative" }}>
        <Eyebrow>600+ Sales-Driven Videos for B2B SaaS Teams</Eyebrow>

        <h2 style={D2.title}>
          <span style={{ display: "block" }}>Your videos should be</span>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>
            <span key={wordIndex} className="fb-vhsjitter" style={D2.wordWrap}>
              <em className="fb-vhs-teal" style={{ ...D2.ghost, color: TEAL }} aria-hidden>
                {word}
              </em>
              <em className="fb-vhs-lilac" style={{ ...D2.ghost, color: LILAC }} aria-hidden>
                {word}
              </em>
              <em className="fb-vhs-main" style={D2.word}>
                {word}
              </em>
            </span>{" "}
            <span>for you.</span>
          </span>
        </h2>

        <HeroCtas />

        <div style={D2.trackingRow}>
          <span>TRACKING</span>
          <span style={D2.trackingBars} aria-hidden>
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="fb-trackbar"
                style={{ ...D2.trackBar, animationDelay: `${i * 0.13}s` }}
              />
            ))}
          </span>
          <span style={{ color: TEAL }}>HI-FI STEREO</span>
        </div>
      </div>
    </div>
  );
}

const D2 = {
  stage: {
    position: "relative",
    overflow: "hidden",
    padding: "66px 32px 54px",
    textAlign: "center",
  } as React.CSSProperties,
  glow: {
    position: "absolute",
    width: "58%",
    height: "64%",
    left: "21%",
    top: "8%",
    background: "radial-gradient(closest-side, rgba(90,51,255,0.28), transparent 70%)",
    filter: "blur(28px)",
    pointerEvents: "none",
  } as React.CSSProperties,
  rollBand: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 64,
    background: "linear-gradient(180deg, transparent, rgba(40,223,232,0.06) 40%, rgba(255,255,255,0.05) 50%, transparent)",
    pointerEvents: "none",
    zIndex: 3,
  } as React.CSSProperties,
  scanlines: {
    position: "absolute",
    inset: 0,
    background: "repeating-linear-gradient(180deg, rgba(0,0,0,0.22) 0 1px, transparent 1px 3px)",
    pointerEvents: "none",
    zIndex: 2,
    opacity: 0.7,
  } as React.CSSProperties,
  osdPlay: {
    position: "absolute",
    top: 18,
    left: 22,
    fontFamily: MONO,
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.22em",
    color: "rgba(255,255,255,0.85)",
    textShadow: "1.5px 0 rgba(40,223,232,0.7), -1.5px 0 rgba(143,69,238,0.7)",
    zIndex: 4,
  } as React.CSSProperties,
  osdCounter: {
    position: "absolute",
    top: 18,
    right: 22,
    fontFamily: MONO,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.16em",
    color: "rgba(255,255,255,0.7)",
    textShadow: "1px 0 rgba(40,223,232,0.6), -1px 0 rgba(143,69,238,0.6)",
    zIndex: 4,
  } as React.CSSProperties,
  title: {
    fontSize: "clamp(30px, 4.4vw, 52px)",
    fontWeight: 800,
    lineHeight: 1.14,
    letterSpacing: "-0.025em",
    margin: "0 0 32px",
  } as React.CSSProperties,
  wordWrap: {
    position: "relative",
    display: "inline-block",
  } as React.CSSProperties,
  ghost: {
    position: "absolute",
    inset: 0,
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    mixBlendMode: "screen",
    opacity: 0.85,
    pointerEvents: "none",
  } as React.CSSProperties,
  word: {
    position: "relative",
    display: "inline-block",
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    color: WHITE,
  } as React.CSSProperties,
  trackingRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 16,
    marginTop: 36,
    fontFamily: MONO,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.2em",
    color: "rgba(255,255,255,0.5)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 999,
    padding: "9px 20px",
    background: "rgba(255,255,255,0.03)",
  } as React.CSSProperties,
  trackingBars: {
    display: "inline-flex",
    gap: 3,
    alignItems: "flex-end",
    height: 12,
  } as React.CSSProperties,
  trackBar: {
    width: 4,
    height: 12,
    background: LILAC,
    borderRadius: 1,
    display: "inline-block",
    transformOrigin: "bottom",
  } as React.CSSProperties,
};

/* ================================================================== */
/* Demo 03 · Alt Hero · Burned-In Captions                             */
/* ================================================================== */

type CaptionStep = { phrase: number; word: number };

const CAPTION_STEPS: CaptionStep[] = (() => {
  const steps: CaptionStep[] = [];
  SWAP_WORDS.forEach((p, pi) => {
    const words = [...p.split(" "), "for", "you."];
    words.forEach((_, wi) => steps.push({ phrase: pi, word: wi }));
    // hold on the finished line for two beats before the next phrase
    steps.push({ phrase: pi, word: words.length - 1 });
    steps.push({ phrase: pi, word: words.length - 1 });
  });
  return steps;
})();

function HeroBurnedInCaptions() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % CAPTION_STEPS.length), 540);
    return () => clearInterval(id);
  }, []);

  const step = CAPTION_STEPS[tick];
  const words = [...SWAP_WORDS[step.phrase].split(" "), "for", "you."];

  return (
    <div style={D3.stage}>
      <div style={D3.glow} aria-hidden />

      <div style={{ position: "relative" }}>
        <Eyebrow>600+ Sales-Driven Videos for B2B SaaS Teams</Eyebrow>

        <h2 style={D3.title}>Your videos should be</h2>

        <div style={D3.captionRow}>
          <span style={D3.ccChip}>
            <span className="fb-dot" style={{ ...SH.dot, width: 6, height: 6 }} aria-hidden />
            CC
          </span>
          <span key={step.phrase} style={D3.captionLine}>
            {words.map((w, i) => {
              const isCurrent = i === step.word;
              const isSpoken = i < step.word;
              const isSwapWord = i < words.length - 2;
              return (
                <span
                  key={`${step.phrase}-${i}`}
                  className={isCurrent ? "fb-capword" : undefined}
                  style={{
                    ...D3.capWord,
                    fontFamily: isSwapWord ? "var(--a2-display)" : "var(--a2-sans)",
                    fontStyle: isSwapWord ? "italic" : "normal",
                    background: isCurrent ? PURPLE : "transparent",
                    boxShadow: isCurrent ? "0 8px 32px rgba(90,51,255,0.65)" : "none",
                    color: isCurrent || isSpoken ? WHITE : "rgba(255,255,255,0.32)",
                  }}
                >
                  {w}
                </span>
              );
            })}
          </span>
        </div>

        <div style={D3.waveRow} aria-hidden>
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="fb-wave"
              style={{
                ...D3.waveBar,
                height: 6 + ((i * 7) % 17),
                animationDelay: `${(i % 9) * 0.12}s`,
                background: i % 7 === 3 ? LILAC : "rgba(90,51,255,0.85)",
              }}
            />
          ))}
        </div>

        <HeroCtas />

        <p style={D3.capNote}>AUTO-CAPTIONS · ON · EVERY DELIVERY</p>
      </div>
    </div>
  );
}

const D3 = {
  stage: {
    position: "relative",
    overflow: "hidden",
    padding: "66px 32px 54px",
    textAlign: "center",
  } as React.CSSProperties,
  glow: {
    position: "absolute",
    width: "58%",
    height: "64%",
    left: "21%",
    top: "8%",
    background: "radial-gradient(closest-side, rgba(90,51,255,0.3), transparent 70%)",
    filter: "blur(28px)",
    pointerEvents: "none",
  } as React.CSSProperties,
  title: {
    fontSize: "clamp(28px, 4vw, 48px)",
    fontWeight: 800,
    lineHeight: 1.12,
    letterSpacing: "-0.025em",
    margin: "0 0 18px",
  } as React.CSSProperties,
  captionRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    marginBottom: 22,
    minHeight: 64,
  } as React.CSSProperties,
  ccChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontFamily: MONO,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.14em",
    color: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 6,
    padding: "5px 9px",
    background: "rgba(0,0,0,0.35)",
  } as React.CSSProperties,
  captionLine: {
    display: "inline-flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "6px 10px",
    fontSize: "clamp(26px, 3.8vw, 44px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
  } as React.CSSProperties,
  capWord: {
    display: "inline-block",
    padding: "2px 12px",
    borderRadius: 12,
    transition: "color .18s ease",
    lineHeight: 1.25,
  } as React.CSSProperties,
  waveRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    height: 30,
    marginBottom: 30,
  } as React.CSSProperties,
  waveBar: {
    width: 4,
    borderRadius: 999,
    display: "inline-block",
  } as React.CSSProperties,
  capNote: {
    marginTop: 32,
    fontFamily: MONO,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.22em",
    color: "rgba(255,255,255,0.38)",
  } as React.CSSProperties,
};

/* ================================================================== */
/* Demo 04 · Alt Receipts · The Grade                                  */
/* ================================================================== */

const GRADE_FRAMES = [
  { label: "OKTA", stat: "Demo recap" },
  { label: "SHOPIFY", stat: "Launch cut" },
  { label: "CHILI PIPER", stat: "Series ep. 4" },
  { label: "SLATE", stat: "Case study" },
  { label: "BLUECONIC", stat: "Ad cut 02" },
];

const GRADE_LOOP = 8; // seconds

function ReceiptsGrade() {
  return (
    <div style={D4.stage}>
      <p style={D4.eyebrow}>What we&apos;ve already done</p>
      <h2 style={D4.heading}>
        The <em style={D4.headingItalic}>receipts</em>.
      </h2>

      <div style={D4.deck}>
        <div style={D4.deckTop}>
          <span style={{ color: "rgba(255,255,255,0.45)" }}>SOURCE · LOG FLAT</span>
          <span style={{ color: NEON }}>LUT · A2_NIGHT_01.cube</span>
        </div>

        <div style={D4.row}>
          {GRADE_FRAMES.map((f, i) => (
            <div key={f.label} style={D4.frame}>
              {/* ungraded log base */}
              <div style={D4.logLayer}>
                <span style={D4.logChip}>LOG</span>
                <span style={D4.frameLabel}>{f.label}</span>
                <span style={D4.frameStat}>{f.stat}</span>
              </div>
              {/* graded overlay, wiped in then out on a stagger */}
              <div
                className="fb-grade"
                style={{
                  ...D4.gradeLayer,
                  background: `linear-gradient(155deg, rgba(90,51,255,${0.55 + (i % 3) * 0.12}), rgba(13,5,54,0.95) 80%)`,
                  animationDelay: `${i * 1.05}s`,
                }}
              >
                <span style={D4.gradeChip}>GRADED</span>
                <span style={D4.frameLabel}>{f.label}</span>
                <span style={{ ...D4.frameStat, color: "rgba(255,255,255,0.75)" }}>{f.stat}</span>
              </div>
            </div>
          ))}

          <div className="fb-gradehandle" style={D4.handle} aria-hidden>
            <span style={D4.handleKnob} />
          </div>
        </div>

        <div style={D4.deckBottom}>
          <span style={D4.scopes} aria-hidden>
            {["R", "G", "B"].map((c, i) => (
              <span key={c} style={D4.scope}>
                <span
                  className="fb-scopebar"
                  style={{
                    ...D4.scopeBar,
                    animationDelay: `${i * 0.5}s`,
                    background: i === 0 ? LILAC : i === 1 ? NEON : PURPLE,
                  }}
                />
                <span style={D4.scopeLabel}>{c}</span>
              </span>
            ))}
          </span>
          <span style={D4.deckHint}>same footage · different league</span>
          <span style={{ color: "rgba(255,255,255,0.45)" }}>REC.709 OUT</span>
        </div>
      </div>
    </div>
  );
}

const D4 = {
  stage: {
    padding: "56px 32px 52px",
    textAlign: "center",
  } as React.CSSProperties,
  eyebrow: {
    fontSize: 11.5,
    fontWeight: 800,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: LILAC,
    margin: "0 0 10px",
  } as React.CSSProperties,
  heading: {
    fontSize: "clamp(26px, 3.6vw, 42px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    margin: "0 0 32px",
  } as React.CSSProperties,
  headingItalic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    color: LILAC,
  } as React.CSSProperties,
  deck: {
    maxWidth: 880,
    margin: "0 auto",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 18,
    padding: "16px 18px 14px",
  } as React.CSSProperties,
  deckTop: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: MONO,
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: "0.14em",
    marginBottom: 12,
  } as React.CSSProperties,
  row: {
    position: "relative",
    display: "flex",
    gap: 8,
    borderRadius: 12,
    padding: "10px",
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.08)",
    overflow: "hidden",
  } as React.CSSProperties,
  frame: {
    position: "relative",
    flex: 1,
    minWidth: 0,
    height: 104,
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.12)",
  } as React.CSSProperties,
  logLayer: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(155deg, #4a4a55, #2b2b33 80%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "8px 9px",
    filter: "saturate(0.25) contrast(0.82)",
  } as React.CSSProperties,
  gradeLayer: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "8px 9px",
  } as React.CSSProperties,
  logChip: {
    position: "absolute",
    top: 7,
    right: 8,
    fontFamily: MONO,
    fontSize: 8,
    fontWeight: 800,
    letterSpacing: "0.12em",
    color: "rgba(255,255,255,0.55)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: 3,
    padding: "1px 4px",
  } as React.CSSProperties,
  gradeChip: {
    position: "absolute",
    top: 7,
    right: 8,
    fontFamily: MONO,
    fontSize: 8,
    fontWeight: 800,
    letterSpacing: "0.12em",
    color: NEON,
    border: "1px solid rgba(102,247,142,0.5)",
    borderRadius: 3,
    padding: "1px 4px",
  } as React.CSSProperties,
  frameLabel: {
    fontSize: 9.5,
    fontWeight: 800,
    letterSpacing: "0.1em",
    color: WHITE,
  } as React.CSSProperties,
  frameStat: {
    fontSize: 9,
    color: "rgba(255,255,255,0.55)",
  } as React.CSSProperties,
  handle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 2,
    background: NEON,
    boxShadow: "0 0 14px rgba(102,247,142,0.85), 0 0 40px rgba(102,247,142,0.35)",
    zIndex: 3,
    pointerEvents: "none",
  } as React.CSSProperties,
  handleKnob: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 14,
    height: 14,
    borderRadius: 999,
    border: `2px solid ${NEON}`,
    background: NIGHT,
  } as React.CSSProperties,
  deckBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: MONO,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.14em",
    marginTop: 12,
  } as React.CSSProperties,
  scopes: {
    display: "inline-flex",
    gap: 10,
    alignItems: "flex-end",
  } as React.CSSProperties,
  scope: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
  } as React.CSSProperties,
  scopeBar: {
    width: 5,
    height: 16,
    borderRadius: 2,
    display: "inline-block",
    transformOrigin: "bottom",
  } as React.CSSProperties,
  scopeLabel: {
    fontSize: 7.5,
    color: "rgba(255,255,255,0.4)",
  } as React.CSSProperties,
  deckHint: {
    color: "rgba(143,69,238,0.85)",
    textTransform: "uppercase",
  } as React.CSSProperties,
};

/* ================================================================== */
/* Demo 05 · Alt Receipts · The Dealer's Fan                           */
/* ================================================================== */

const FAN_CARDS = [
  { label: "OKTA", stat: "Demo recap", r: -27, x: -190, y: 26 },
  { label: "SHOPIFY", stat: "Launch cut", r: -18, x: -126, y: 8 },
  { label: "CROSSBEAM", stat: "Founder POV", r: -9, x: -63, y: -2 },
  { label: "CHILI PIPER", stat: "Series ep. 4", r: 0, x: 0, y: -6 },
  { label: "SLATE", stat: "Case study", r: 9, x: 63, y: -2 },
  { label: "BLUECONIC", stat: "Ad cut 02", r: 18, x: 126, y: 8 },
  { label: "600+ MORE", stat: "Still dealing", r: 27, x: 190, y: 26 },
];

function ReceiptsDealersFan() {
  return (
    <div style={D5.stage}>
      <p style={D4.eyebrow}>What we&apos;ve already done</p>
      <h2 style={D4.heading}>
        The <em style={D4.headingItalic}>receipts</em>.
      </h2>

      <div style={D5.table}>
        <div style={D5.felt} aria-hidden />
        {FAN_CARDS.map((c, i) => (
          <div
            key={c.label}
            className="fb-fancard"
            style={
              {
                ...D5.card,
                zIndex: i + 1,
                background: `linear-gradient(160deg, rgba(${i % 2 ? "143,69,238" : "90,51,255"},${0.5 + (i % 3) * 0.1}), rgba(13,5,54,0.95) 82%)`,
                "--fr": `${c.r}deg`,
                "--fx": `${c.x}px`,
                "--fy": `${c.y}px`,
              } as React.CSSProperties
            }
          >
            <span style={D5.cardIdx}>{String(i + 1).padStart(2, "0")}</span>
            <span style={D5.cardPlay} aria-hidden>▶</span>
            <span style={D5.cardLabel}>{c.label}</span>
            <span style={D5.cardStat}>{c.stat}</span>
          </div>
        ))}

        <span className="fb-fancount" style={D5.countChip}>
          600+ in the deck
        </span>
      </div>

      <p style={D5.caption}>Fan · hold · restack · deal again. 7-second loop.</p>
    </div>
  );
}

const D5 = {
  stage: {
    padding: "56px 32px 50px",
    textAlign: "center",
  } as React.CSSProperties,
  table: {
    position: "relative",
    height: 250,
    maxWidth: 760,
    margin: "0 auto",
  } as React.CSSProperties,
  felt: {
    position: "absolute",
    left: "12%",
    right: "12%",
    top: "22%",
    bottom: "6%",
    background: "radial-gradient(closest-side, rgba(90,51,255,0.18), transparent 75%)",
    filter: "blur(18px)",
    pointerEvents: "none",
  } as React.CSSProperties,
  card: {
    position: "absolute",
    left: "50%",
    top: 46,
    width: 138,
    height: 170,
    marginLeft: -69,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.16)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "10px 11px",
    transformOrigin: "50% 130%",
    willChange: "transform",
  } as React.CSSProperties,
  cardIdx: {
    position: "absolute",
    top: 8,
    left: 10,
    fontFamily: MONO,
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.1em",
    color: NEON,
  } as React.CSSProperties,
  cardPlay: {
    position: "absolute",
    top: 8,
    right: 10,
    fontSize: 9,
    color: "rgba(255,255,255,0.55)",
  } as React.CSSProperties,
  cardLabel: {
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.1em",
    color: WHITE,
  } as React.CSSProperties,
  cardStat: {
    fontSize: 9.5,
    color: "rgba(255,255,255,0.6)",
  } as React.CSSProperties,
  countChip: {
    position: "absolute",
    bottom: -4,
    left: "50%",
    transform: "translateX(-50%)",
    fontFamily: MONO,
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: LILAC,
    border: "1px solid rgba(143,69,238,0.45)",
    borderRadius: 999,
    padding: "6px 14px",
    background: "rgba(13,5,54,0.8)",
    zIndex: 20,
  } as React.CSSProperties,
  caption: {
    marginTop: 26,
    fontSize: 12,
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.4)",
  } as React.CSSProperties,
};

/* ================================================================== */
/* Demo 06 · Alt Receipts · The Satellite Reel                         */
/* ================================================================== */

const ORBIT_SATELLITES = [
  { label: "OKTA", hue: "rgba(90,51,255,0.6)" },
  { label: "SHOPIFY", hue: "rgba(143,69,238,0.55)" },
  { label: "SLATE", hue: "rgba(90,51,255,0.45)" },
  { label: "CROSSBEAM", hue: "rgba(143,69,238,0.65)" },
  { label: "BLUECONIC", hue: "rgba(90,51,255,0.55)" },
  { label: "600+ MORE", hue: "rgba(143,69,238,0.5)" },
];

const FEATURED = [
  { client: "Chili Piper", piece: "Customer Story" },
  { client: "BlueConic", piece: "Ad Cut 02" },
  { client: "Slate", piece: "Case Study" },
  { client: "Okta", piece: "Demo Recap" },
];

const ORBIT_SPIN = 26; // seconds per revolution

function ReceiptsSatelliteReel() {
  const [featIndex, setFeatIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFeatIndex((i) => (i + 1) % FEATURED.length), 4500);
    return () => clearInterval(id);
  }, []);

  const feat = FEATURED[featIndex];

  return (
    <div style={D6.stage}>
      <p style={D4.eyebrow}>What we&apos;ve already done</p>
      <h2 style={D4.heading}>
        The <em style={D4.headingItalic}>receipts</em>.
      </h2>

      <div style={D6.space}>
        <div className="fb-orbitring" style={D6.ring} aria-hidden />

        {ORBIT_SATELLITES.map((s, i) => (
          <div
            key={s.label}
            className="fb-orbiter"
            style={{ ...D6.orbiter, animationDelay: `${-(ORBIT_SPIN / ORBIT_SATELLITES.length) * i}s` }}
            aria-hidden
          >
            <div
              className="fb-orbiter-counter"
              style={{
                ...D6.satellite,
                background: `linear-gradient(160deg, ${s.hue}, rgba(13,5,54,0.95) 85%)`,
                animationDelay: `${-(ORBIT_SPIN / ORBIT_SATELLITES.length) * i}s`,
              }}
            >
              <span style={D6.satLabel}>{s.label}</span>
            </div>
          </div>
        ))}

        <div style={D6.centerWrap}>
          <div key={featIndex} className="fb-featswap" style={D6.center}>
            <div style={D6.centerGlow} aria-hidden />
            <span style={D6.nowPlaying}>NOW PLAYING</span>
            <span style={D6.playBtn} aria-hidden>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span style={D6.centerClient}>{feat.client}</span>
            <span style={D6.centerPiece}>{feat.piece}</span>
          </div>
        </div>
      </div>

      <p style={D5.caption}>One frame featured. The rest of the catalog never stops moving around it.</p>
    </div>
  );
}

const D6 = {
  stage: {
    padding: "56px 32px 46px",
    textAlign: "center",
    overflow: "hidden",
  } as React.CSSProperties,
  space: {
    position: "relative",
    height: 340,
    maxWidth: 760,
    margin: "0 auto",
  } as React.CSSProperties,
  ring: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 300,
    height: 300,
    marginLeft: -150,
    marginTop: -150,
    borderRadius: 999,
    border: "1.5px dashed rgba(40,223,232,0.4)",
  } as React.CSSProperties,
  orbiter: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 300,
    height: 300,
    marginLeft: -150,
    marginTop: -150,
    pointerEvents: "none",
  } as React.CSSProperties,
  satellite: {
    position: "absolute",
    left: "50%",
    top: 0,
    width: 88,
    height: 52,
    marginLeft: -44,
    marginTop: -26,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.16)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "flex-end",
    padding: "6px 7px",
  } as React.CSSProperties,
  satLabel: {
    fontSize: 7.5,
    fontWeight: 800,
    letterSpacing: "0.1em",
    color: WHITE,
  } as React.CSSProperties,
  centerWrap: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 5,
  } as React.CSSProperties,
  center: {
    position: "relative",
    width: 250,
    height: 144,
    borderRadius: 14,
    border: "1px solid rgba(90,51,255,0.55)",
    background: "linear-gradient(160deg, rgba(90,51,255,0.5), rgba(13,5,54,0.96) 80%)",
    boxShadow: "0 24px 80px rgba(90,51,255,0.45)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "12px 14px",
    overflow: "hidden",
  } as React.CSSProperties,
  centerGlow: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(80% 60% at 50% 0%, rgba(143,69,238,0.3), transparent 70%)",
    pointerEvents: "none",
  } as React.CSSProperties,
  nowPlaying: {
    position: "absolute",
    top: 10,
    left: 12,
    fontFamily: MONO,
    fontSize: 8.5,
    fontWeight: 800,
    letterSpacing: "0.2em",
    color: TEAL,
  } as React.CSSProperties,
  playBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -60%)",
    width: 40,
    height: 40,
    borderRadius: 999,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: WHITE,
    backdropFilter: "blur(4px)",
  } as React.CSSProperties,
  centerClient: {
    fontSize: 14,
    fontWeight: 800,
    letterSpacing: "0.02em",
    color: WHITE,
    position: "relative",
  } as React.CSSProperties,
  centerPiece: {
    fontSize: 10.5,
    color: "rgba(255,255,255,0.65)",
    position: "relative",
  } as React.CSSProperties,
};

/* ================================================================== */
/* Page                                                                */
/* ================================================================== */

type Demo = {
  tag: string;
  title: string;
  notes: string;
  node: React.ReactNode;
};

export default function FableAnimationsHeroReceiptsMockup() {
  const demos: Demo[] = [
    {
      tag: "Animation 01 · Alt Hero",
      title: "Rack Focus",
      notes:
        "The rotating word behaves like a lens pull: each new word arrives soft and out of focus, snaps sharp inside an autofocus reticle, holds, then defocuses as the next one racks in. A neon AF LOCK chip confirms the moment of sharpness and a focus-distance slider tracks the pull in the HUD below. Round 1 framed the hero as an edit; this frames it as a shot being composed.",
      node: <HeroRackFocus />,
    },
    {
      tag: "Animation 02 · Alt Hero",
      title: "Tracking Error",
      notes:
        "Word swaps land like a worn VHS tape catching up: a burst of sliced chroma-split glitch, teal and lilac ghosts pulling apart, then the word locks in clean under permanent scanlines while a tracking band rolls down the frame. PLAY and a running tape counter sit in the corners like a camcorder OSD. It is retro video-format nostalgia, the opposite end of the craft spectrum from the surgical razor.",
      node: <HeroTrackingError />,
    },
    {
      tag: "Animation 03 · Alt Hero",
      title: "Burned-In Captions",
      notes:
        "The second headline line renders as platform-native burned-in captions: an Electric Purple pill jumps word to word like karaoke subtitles while a live waveform pulses underneath, as if the headline is being spoken right now. Every B2B SaaS buyer has watched a thousand captioned shorts, so the hero instantly reads as the product itself. No cutting, no camera, pure social-video language.",
      node: <HeroBurnedInCaptions />,
    },
    {
      tag: "Animation 04 · Alt Receipts",
      title: "The Grade",
      notes:
        "Every client frame starts as flat, desaturated log footage, then a neon grading handle sweeps the strip and each frame flips to its full purple-graded look in sequence, holds, and resets. LUT name up top, RGB scopes pulsing below. Where Playhead Drag said we scrub footage, this says we transform it, the before-and-after is the proof and it never stops re-proving itself.",
      node: <ReceiptsGrade />,
    },
    {
      tag: "Animation 05 · Alt Receipts",
      title: "The Dealer's Fan",
      notes:
        "The portfolio behaves like a deck in a dealer's hand: seven client cards fan out in an arc, hold the spread, snap back into a stack, and fan again. A chip below the table counts 600+ in the deck. It is tactile and confident instead of mechanical, the house has so much work it can shuffle it for fun, and a mid-fan screenshot always looks composed.",
      node: <ReceiptsDealersFan />,
    },
    {
      tag: "Animation 06 · Alt Receipts",
      title: "The Satellite Reel",
      notes:
        "One featured piece sits center stage with a NOW PLAYING badge and swaps every few seconds, while the rest of the catalog orbits it on a dashed teal ring, thumbnails staying upright as they circle. The metaphor is gravity: one hero video pulling the whole body of work around it. Completely different physics from a linear filmstrip, and the orbit guarantees motion in any static capture.",
      node: <ReceiptsSatelliteReel />,
    },
  ];

  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header style={S.pageHeader}>
        <span style={S.pageTag}>Fable · Round 2 · 3 Hero alts + 3 Receipts alts</span>
        <h1 style={S.pageTitle}>Six more ways these frames can move</h1>
        <p style={S.pageNotes}>
          Round 1 locked the Guarantee shield and put a razor in the hero and a
          playhead in the receipts. This round explores categorically different
          motion languages for those same two frames: camera optics, tape-era
          glitch, and social captions for the Hero; color grading, card
          handling, and orbital gravity for the Receipts. Each demo runs on its
          own 4 to 9 second loop with no scroll triggers, built from CSS
          keyframes and a little React state, so any screenshot catches it
          mid-performance. Night Core base, Electric Purple leading, neon and
          teal never sharing an asset.
        </p>
      </header>

      {demos.map((d) => (
        <section key={d.tag} style={S.demoCard}>
          <div style={S.demoHead}>
            <span style={S.demoTag}>{d.tag}</span>
            <h2 style={S.demoTitle}>{d.title}</h2>
            <p style={S.demoNotes}>{d.notes}</p>
          </div>
          <div style={S.demoStage}>{d.node}</div>
        </section>
      ))}

      <footer style={S.footer}>
        <p style={S.footerLine}>
          Built against the live components in src/components/sections. Each
          concept ships as a small patch to one file, no layout changes.
        </p>
      </footer>
    </main>
  );
}

/* ================================================================== */
/* Keyframes + responsive                                              */
/* ================================================================== */

const css = `
  /* ---------- shared ---------- */
  .fb-dot { animation: fbDotPulse 2.2s ease-in-out infinite; }
  @keyframes fbDotPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(102,247,142,0.55); }
    50% { box-shadow: 0 0 0 7px rgba(102,247,142,0); }
  }

  /* ---------- 01 rack focus ---------- */
  .fb-rfword { animation: fbRackFocus ${RF_CYCLE}s cubic-bezier(.4,0,.3,1) both; }
  @keyframes fbRackFocus {
    0%   { filter: blur(11px); opacity: .6; transform: scale(1.05); }
    20%  { filter: blur(0); opacity: 1; transform: scale(1); }
    80%  { filter: blur(0); opacity: 1; transform: scale(1); }
    100% { filter: blur(10px); opacity: .55; transform: scale(.98); }
  }
  .fb-aflock { animation: fbAfLock ${RF_CYCLE}s steps(1) both; }
  @keyframes fbAfLock {
    0%   { opacity: 0; }
    20%  { opacity: 1; }
    78%  { opacity: 0; }
    100% { opacity: 0; }
  }
  .fb-rfslider { animation: fbRfSlide ${RF_CYCLE}s cubic-bezier(.4,0,.3,1) infinite; }
  @keyframes fbRfSlide {
    0%   { left: 4%; }
    20%  { left: 72%; }
    78%  { left: 72%; }
    100% { left: 4%; }
  }

  /* ---------- 02 tracking error ---------- */
  .fb-vhsjitter { animation: fbVhsSettle .9s steps(8) both; }
  @keyframes fbVhsSettle {
    0%   { transform: translateX(-6px) skewX(-4deg); clip-path: inset(8% 0 32% 0); }
    14%  { transform: translateX(7px) skewX(3deg);   clip-path: inset(48% 0 12% 0); }
    28%  { transform: translateX(-5px) skewX(-2deg); clip-path: inset(0 0 62% 0); }
    42%  { transform: translateX(4px) skewX(2deg);   clip-path: inset(30% 0 28% 0); }
    56%  { transform: translateX(-2px) skewX(-1deg); clip-path: inset(0 0 0 0); }
    100% { transform: translateX(0) skewX(0);        clip-path: inset(0 0 0 0); }
  }
  .fb-vhs-teal { animation: fbGhostTeal ${VHS_CYCLE}s ease-out both; }
  @keyframes fbGhostTeal {
    0%   { transform: translateX(-9px); opacity: .9; }
    24%  { transform: translateX(-2.5px); opacity: .7; }
    100% { transform: translateX(-2.5px); opacity: .7; }
  }
  .fb-vhs-lilac { animation: fbGhostLilac ${VHS_CYCLE}s ease-out both; }
  @keyframes fbGhostLilac {
    0%   { transform: translateX(9px); opacity: .9; }
    24%  { transform: translateX(2.5px); opacity: .7; }
    100% { transform: translateX(2.5px); opacity: .7; }
  }
  .fb-rollband { animation: fbRollBand 5s linear infinite; }
  @keyframes fbRollBand {
    0%   { top: -70px; }
    100% { top: 110%; }
  }
  .fb-trackbar { animation: fbTrackBar 1.6s ease-in-out infinite; }
  @keyframes fbTrackBar {
    0%, 100% { transform: scaleY(.25); opacity: .5; }
    50%      { transform: scaleY(1); opacity: 1; }
  }

  /* ---------- 03 burned-in captions ---------- */
  .fb-capword { animation: fbCapPop .26s cubic-bezier(.2,1.4,.4,1) both; }
  @keyframes fbCapPop {
    0%   { transform: scale(.82); }
    100% { transform: scale(1); }
  }
  .fb-wave { animation: fbWavePulse 1.1s ease-in-out infinite; transform-origin: center; }
  @keyframes fbWavePulse {
    0%, 100% { transform: scaleY(.3); opacity: .55; }
    50%      { transform: scaleY(1); opacity: 1; }
  }

  /* ---------- 04 the grade ---------- */
  .fb-grade {
    clip-path: inset(0 100% 0 0);
    animation: fbGradeWipe ${GRADE_LOOP}s cubic-bezier(.6,0,.3,1) infinite;
  }
  @keyframes fbGradeWipe {
    0%        { clip-path: inset(0 100% 0 0); }
    10%       { clip-path: inset(0 0 0 0); }
    44%       { clip-path: inset(0 0 0 0); }
    54%       { clip-path: inset(0 0 0 100%); }
    100%      { clip-path: inset(0 0 0 100%); }
  }
  .fb-gradehandle { animation: fbGradeHandle ${GRADE_LOOP}s cubic-bezier(.6,0,.3,1) infinite; }
  @keyframes fbGradeHandle {
    0%   { left: 1%; opacity: 1; }
    44%  { left: 99%; opacity: 1; }
    50%  { left: 99%; opacity: 0; }
    62%  { left: 1%; opacity: 0; }
    66%  { left: 1%; opacity: 1; }
    100% { left: 1%; opacity: 1; }
  }
  .fb-scopebar { animation: fbScope 2.4s ease-in-out infinite; }
  @keyframes fbScope {
    0%, 100% { transform: scaleY(.35); }
    50%      { transform: scaleY(1); }
  }

  /* ---------- 05 dealer's fan ---------- */
  .fb-fancard { animation: fbFan 7s cubic-bezier(.5,0,.3,1) infinite; }
  @keyframes fbFan {
    0%, 7%    { transform: translate(0, 0) rotate(0deg); }
    20%       { transform: translate(var(--fx), var(--fy)) rotate(var(--fr)); }
    68%       { transform: translate(var(--fx), var(--fy)) rotate(var(--fr)); }
    82%, 100% { transform: translate(0, 0) rotate(0deg); }
  }
  .fb-fancount { animation: fbFanCount 7s ease infinite; }
  @keyframes fbFanCount {
    0%, 16%   { opacity: 0; transform: translateX(-50%) translateY(8px); }
    24%       { opacity: 1; transform: translateX(-50%) translateY(0); }
    64%       { opacity: 1; transform: translateX(-50%) translateY(0); }
    74%, 100% { opacity: 0; transform: translateX(-50%) translateY(8px); }
  }

  /* ---------- 06 satellite reel ---------- */
  .fb-orbitring { animation: fbRingSpin 60s linear infinite; }
  @keyframes fbRingSpin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .fb-orbiter { animation: fbOrbit ${ORBIT_SPIN}s linear infinite; }
  @keyframes fbOrbit {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .fb-orbiter-counter { animation: fbOrbitCounter ${ORBIT_SPIN}s linear infinite; }
  @keyframes fbOrbitCounter {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }
  .fb-featswap { animation: fbFeatSwap .6s cubic-bezier(.2,1.2,.4,1) both; }
  @keyframes fbFeatSwap {
    0%   { transform: scale(.92); opacity: 0; filter: blur(6px); }
    100% { transform: scale(1); opacity: 1; filter: blur(0); }
  }

  /* ---------- responsive ---------- */
  @media (max-width: 860px) {
    .fb-grade { animation-duration: ${GRADE_LOOP}s; }
  }
`;

/* ================================================================== */
/* Page chrome styles                                                  */
/* ================================================================== */

const S = {
  page: {
    minHeight: "100vh",
    background: "#070322",
    color: WHITE,
    fontFamily: "var(--a2-sans)",
    padding: "72px 24px 120px",
  } as React.CSSProperties,
  pageHeader: {
    maxWidth: 920,
    margin: "0 auto 64px",
  } as React.CSSProperties,
  pageTag: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: NEON,
    border: "1px solid rgba(102,247,142,0.35)",
    borderRadius: 999,
    padding: "6px 14px",
    marginBottom: 20,
  } as React.CSSProperties,
  pageTitle: {
    fontSize: "clamp(30px, 4.4vw, 50px)",
    fontWeight: 800,
    letterSpacing: "-0.025em",
    lineHeight: 1.08,
    margin: "0 0 18px",
  } as React.CSSProperties,
  pageNotes: {
    fontSize: 15.5,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.66)",
    maxWidth: 820,
    margin: 0,
  } as React.CSSProperties,
  demoCard: {
    maxWidth: 1060,
    margin: "0 auto 56px",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 24,
    overflow: "hidden",
  } as React.CSSProperties,
  demoHead: {
    padding: "30px 36px 26px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  } as React.CSSProperties,
  demoTag: {
    display: "inline-block",
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: LILAC,
    border: "1px solid rgba(143,69,238,0.4)",
    borderRadius: 999,
    padding: "5px 12px",
    marginBottom: 14,
  } as React.CSSProperties,
  demoTitle: {
    fontSize: 27,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    margin: "0 0 10px",
  } as React.CSSProperties,
  demoNotes: {
    fontSize: 14.5,
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.6)",
    maxWidth: 780,
    margin: 0,
  } as React.CSSProperties,
  demoStage: {
    background: NIGHT,
  } as React.CSSProperties,
  footer: {
    maxWidth: 1060,
    margin: "0 auto",
    textAlign: "center",
  } as React.CSSProperties,
  footerLine: {
    fontSize: 12.5,
    letterSpacing: "0.04em",
    color: "rgba(255,255,255,0.38)",
  } as React.CSSProperties,
};
