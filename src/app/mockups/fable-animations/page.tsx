"use client";

/* Mockup: /mockups/fable-animations
   Five animation concepts for the live a2media.ca frames, each rendered in
   context as a mini version of the section it belongs to.

   01 · Hero          · "The Razor Cut" kinetic word swap
   02 · Receipts      · "Playhead Drag" filmstrip scrub
   03 · Comparison    · "Strike and Save" pen strikes + odometer count-up
   04 · Pricing       · "The Magnet Card" aurora border + cursor tilt
   05 · Guarantee     · "The Shield That Draws Itself" SVG stroke draw

   Every loop is self-running (4 to 8 seconds) so a static screenshot lands
   mid-animation. CSS keyframes + light React state only. No libraries. */

import React, { useEffect, useRef, useState } from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const WHITE = "#FFFFFF";

/* ================================================================== */
/* Demo 01 · Hero · The Razor Cut                                      */
/* ================================================================== */

const SWAP_WORDS = ["closing deals", "driving pipeline", "converting buyers", "building trust"];

function useEditorTimecode(loopMs: number) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) % loopMs;
      const s = Math.floor(t / 1000);
      const f = Math.floor(((t % 1000) / 1000) * 24);
      if (ref.current) {
        ref.current.textContent = `00:00:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loopMs]);
  return ref;
}

function HeroRazorCut() {
  const [wordIndex, setWordIndex] = useState(0);
  const tcRef = useEditorTimecode(3600 * SWAP_WORDS.length);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % SWAP_WORDS.length), 3600);
    return () => clearInterval(id);
  }, []);

  const word = SWAP_WORDS[wordIndex];

  return (
    <div style={D1.stage}>
      <div style={D1.blob} aria-hidden />
      <div style={D1.grain} aria-hidden />

      <div style={D1.inner}>
        <p style={D1.eyebrow}>
          <span className="fa-dot" style={D1.dot} aria-hidden />
          600+ Sales-Driven Videos for B2B SaaS Teams
        </p>

        <h2 style={D1.title}>
          <span style={D1.lineA}>Your videos should be</span>
          <span style={D1.lineB}>
            {/* key remount restarts the razor + char print every swap */}
            <span key={wordIndex} style={D1.wordWrap}>
              <span className="fa-razor" style={D1.razor} aria-hidden>
                <span style={D1.razorHandle} />
              </span>
              {word.split("").map((ch, i) => (
                <span
                  key={i}
                  className="fa-char"
                  style={{ ...D1.char, animationDelay: `${0.06 + i * 0.045}s` }}
                >
                  {ch === " " ? " " : ch}
                </span>
              ))}
            </span>{" "}
            <span style={D1.forYou}>for you.</span>
          </span>
        </h2>

        <div style={D1.ctas}>
          <span style={D1.btnPrimary}>See if we&apos;re a fit</span>
          <span style={D1.btnGhost}>See the work</span>
        </div>

        <div style={D1.tcRow}>
          <span style={D1.tcLabel}>SRC · HERO_HEADLINE_V4</span>
          <span ref={tcRef} style={D1.tc}>00:00:00:00</span>
          <span style={D1.tcCut}>CUT {String(wordIndex + 1).padStart(2, "0")}/04</span>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Demo 02 · Receipts · Playhead Drag                                  */
/* ================================================================== */

const REEL_FRAMES = [
  { label: "OKTA", stat: "Demo recap", hue: "rgba(90,51,255,0.55)" },
  { label: "SHOPIFY", stat: "Launch cut", hue: "rgba(143,69,238,0.5)" },
  { label: "CHILI PIPER", stat: "Series ep. 4", hue: "rgba(90,51,255,0.4)" },
  { label: "CROSSBEAM", stat: "Founder POV", hue: "rgba(143,69,238,0.6)" },
  { label: "SLATE", stat: "Case study", hue: "rgba(90,51,255,0.62)" },
  { label: "BLUECONIC", stat: "Ad cut 02", hue: "rgba(143,69,238,0.45)" },
  { label: "A2 ORIGINAL", stat: "Process film", hue: "rgba(90,51,255,0.5)" },
  { label: "600+ MORE", stat: "On the reel", hue: "rgba(143,69,238,0.55)" },
];

const REEL_LOOP = 6.4; // seconds

function ReelTimecode() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = ((now - start) / 1000) % REEL_LOOP;
      const s = Math.floor(t);
      const f = Math.floor((t % 1) * 24);
      if (ref.current) {
        ref.current.textContent = `00:0${s}:${String(f).padStart(2, "0")}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <span ref={ref} style={D2.tc}>00:00:00</span>;
}

function ReceiptsPlayheadDrag() {
  return (
    <div style={D2.stage}>
      <p style={D2.eyebrow}>What we&apos;ve already done</p>
      <h2 style={D2.heading}>
        The <em style={D2.headingItalic}>receipts</em>.
      </h2>

      <div style={D2.deck}>
        <div style={D2.deckTop}>
          <span style={D2.deckLabel}>
            <span className="fa-rec" style={D2.recDot} aria-hidden />
            A2_PORTFOLIO_2026.prproj
          </span>
          <ReelTimecode />
        </div>

        <div style={D2.strip}>
          <div style={D2.sprockets} aria-hidden />
          <div style={D2.frameRow}>
            {REEL_FRAMES.map((f, i) => (
              <div
                key={f.label}
                className="fa-frame"
                style={{
                  ...D2.frame,
                  background: `linear-gradient(160deg, ${f.hue}, rgba(13,5,54,0.92))`,
                  animationDelay: `${i * (REEL_LOOP / REEL_FRAMES.length) - REEL_LOOP}s`,
                }}
              >
                <span style={D2.frameLabel}>{f.label}</span>
                <span style={D2.frameStat}>{f.stat}</span>
                <span style={D2.framePlay} aria-hidden>▶</span>
              </div>
            ))}
          </div>
          <div style={{ ...D2.sprockets, top: "auto", bottom: 0 }} aria-hidden />

          <div className="fa-trail" style={D2.trail} aria-hidden />
          <div className="fa-playhead" style={D2.playhead} aria-hidden>
            <span style={D2.playheadHandle} />
          </div>
        </div>

        <div style={D2.deckBottom}>
          <span>IN 00:00</span>
          <span style={D2.deckHint}>the playhead never stops · neither do we</span>
          <span>OUT 06:10</span>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Demo 03 · Comparison Table · Strike and Save                        */
/* ================================================================== */

const STRIKE_ROWS = [
  { role: "5 Senior Video Editors", cost: "$240,000", delay: 0.7 },
  { role: "1 Content Strategist", cost: "$48,000", delay: 1.25 },
  { role: "1 Copywriter", cost: "$42,000", delay: 1.8 },
  { role: "Equipment, Software & AI", cost: "$30,000", delay: 2.35 },
];

const SAVE_LOOP_MS = 8000;

function SavingsOdometer() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const delay = 4300;
    const duration = 1900;
    const target = 346000;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const p = Math.min(Math.max((now - start) / duration, 0), 1);
      // easeOutBack: overshoots past the target, then settles
      const c1 = 1.70158;
      const c3 = c1 + 1;
      const eased = p === 0 ? 0 : 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
      const v = Math.max(0, Math.round(target * eased));
      if (ref.current) ref.current.textContent = `$${v.toLocaleString("en-US")}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <span ref={ref} style={D3.saveNumber}>$0</span>;
}

function StrikeAndSave() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), SAVE_LOOP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={D3.stage}>
      <h2 style={D3.heading}>
        Hire 9 People &amp; Tools. <em style={D3.headingItalic}>Or Just Us.</em>
      </h2>

      {/* key remount restarts the full strike sequence every 8s */}
      <div key={cycle} style={D3.card}>
        <div style={D3.cardLabel}>Building It In-House (6 Months)</div>

        {STRIKE_ROWS.map((r) => (
          <div key={r.role} style={D3.line}>
            <span style={D3.role}>{r.role}</span>
            <span style={D3.cost}>
              {r.cost}
              <span
                className="fa-strike"
                style={{ ...D3.strike, animationDelay: `${r.delay}s` }}
                aria-hidden
              />
            </span>
          </div>
        ))}

        <div style={D3.totalRow}>
          <span style={D3.totalLabel}>6-month cost</span>
          <span style={D3.totalPair}>
            <span style={D3.totalOld}>
              $436K+
              <span
                className="fa-strike"
                style={{ ...D3.strike, background: "rgba(255,99,99,0.95)", boxShadow: "0 0 12px rgba(255,99,99,0.6)", animationDelay: "3.1s" }}
                aria-hidden
              />
            </span>
            <span className="fa-stamp" style={D3.totalNew}>$90K</span>
          </span>
        </div>

        <div className="fa-savereveal" style={D3.saveRow}>
          <span style={D3.saveLabel}>You keep</span>
          <SavingsOdometer />
          <span style={D3.saveTail}>and start in 48 hours, not 6 months.</span>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Demo 04 · Pricing · The Magnet Card                                 */
/* ================================================================== */

const ENGINE_FEATURES = [
  "10 to 12 done-for-you videos per month",
  "72-hour turnaround, most agencies take 1 to 2 weeks",
  "AEO video ranking: be the first brand AI suggests",
];

function MagnetCard() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 60, gy: 30, hover: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      rx: (px - 0.5) * 14,
      ry: (0.5 - py) * 11,
      gx: px * 100,
      gy: py * 100,
      hover: true,
    });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0, gx: 60, gy: 30, hover: false });

  return (
    <div style={D4.stage}>
      <h2 style={D4.heading}>
        3 Ways to Work <em style={D4.headingItalic}>With Us</em>
      </h2>

      <div style={D4.cardRow}>
        <div style={D4.sideCard} aria-hidden>
          <span style={D4.sideName}>One-off Video</span>
          <span style={D4.sidePrice}>$2K</span>
        </div>

        <div style={D4.magnetZone} onMouseMove={onMove} onMouseLeave={onLeave}>
          <div
            style={{
              ...D4.tiltLayer,
              transform: `perspective(950px) rotateY(${tilt.rx}deg) rotateX(${tilt.ry}deg) ${tilt.hover ? "translateZ(14px)" : ""}`,
            }}
          >
            <div className="fa-float" style={D4.floatLayer}>
              <div style={D4.beamShell}>
                <div className="fa-beam" style={D4.beam} aria-hidden />
                <div style={D4.cardBody}>
                  <div
                    style={{
                      ...D4.glare,
                      background: `radial-gradient(220px circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.14), transparent 70%)`,
                      opacity: tilt.hover ? 1 : 0,
                    }}
                    aria-hidden
                  />
                  <span className="fa-badge" style={D4.badge}>MOST POPULAR · MONTHLY</span>
                  <h3 style={D4.planName}>Video Growth Engine</h3>
                  <div style={D4.price}>
                    $15–25K<small style={D4.priceUnit}> / month</small>
                  </div>
                  <p style={D4.desc}>
                    We run your whole video department. Script to screen.
                  </p>
                  <div style={D4.feats}>
                    {ENGINE_FEATURES.map((f) => (
                      <div key={f} style={D4.feat}>
                        <span style={D4.chk}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                  <span className="fa-engine-cta" style={D4.cta}>See if We&apos;re a Fit</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={D4.sideCard} aria-hidden>
          <span style={D4.sideName}>2-Week Jumpstart</span>
          <span style={D4.sidePrice}>$8K</span>
        </div>
      </div>

      <p style={D4.hint}>Move your cursor over the center card. It leans toward you.</p>
    </div>
  );
}

/* ================================================================== */
/* Demo 05 · Guarantee · The Shield That Draws Itself                  */
/* ================================================================== */

function ShieldDraw() {
  return (
    <div style={D5.stage}>
      <div style={D5.banner}>
        <span className="fa-ring" style={D5.ring} aria-hidden />
        <svg viewBox="0 0 64 72" width="58" height="66" style={D5.svg} aria-hidden>
          {/* soft fill that fades in after the stroke completes */}
          <path
            className="fa-shield-fill"
            d="M32 4 L58 13 V36 C58 53 46 64 32 69 C18 64 6 53 6 36 V13 Z"
            fill="rgba(90,51,255,0.28)"
            stroke="none"
          />
          <path
            className="fa-shield-stroke"
            d="M32 4 L58 13 V36 C58 53 46 64 32 69 C18 64 6 53 6 36 V13 Z"
            fill="none"
            stroke={PURPLE}
            strokeWidth="3"
            strokeLinejoin="round"
            pathLength={1}
          />
          <path
            className="fa-check-stroke"
            d="M21 36 L29 45 L44 26"
            fill="none"
            stroke={NEON}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
          />
        </svg>

        <span style={D5.text}>
          <strong style={D5.textStrong}>The A2 Guarantee.</strong>{" "}
          If we don&apos;t hit our agreed goal by contract end, we keep working
          with you <span style={D5.free}>for free</span> until we do.
        </span>

        <span className="fa-sheen" style={D5.sheen} aria-hidden />
      </div>
      <p style={D5.caption}>Stroke draws · check lands · fill breathes · sheen passes. 7-second loop.</p>
    </div>
  );
}

/* ================================================================== */
/* Page                                                                */
/* ================================================================== */

type Demo = {
  tag: string;
  title: string;
  notes: string;
  node: React.ReactNode;
};

export default function FableAnimationsMockup() {
  const demos: Demo[] = [
    {
      tag: "Animation 01 · For the Hero",
      title: "The Razor Cut",
      notes:
        "The rotating headline word stops cross-fading and starts getting cut like a clip on a timeline: a neon razor playhead sweeps through the word and prints the next one character by character behind it, while a live 24fps timecode runs underneath. It turns the hero's one moving element into proof of craft, the edit is literally happening in the headline.",
      node: <HeroRazorCut />,
    },
    {
      tag: "Animation 02 · For Receipts / ScrubReel",
      title: "Playhead Drag",
      notes:
        "A filmstrip of client work with a glowing playhead that drags itself across the reel on a loop, lighting up each frame as it passes and leaving a purple light trail behind it. The portfolio reads as one continuous edit being scrubbed in real time, which is exactly the muscle A2 is selling.",
      node: <ReceiptsPlayheadDrag />,
    },
    {
      tag: "Animation 03 · For the Comparison Table",
      title: "Strike and Save",
      notes:
        "Pen strikes draw themselves through each in-house salary one by one, the $436K total gets struck in red, the $90K stamps in, then an odometer counts up to $346,000 with an overshoot bounce, it shoots past the number and settles, the way money should feel. The whole sequence loops every 8 seconds so nobody has to scroll-trigger it.",
      node: <StrikeAndSave />,
    },
    {
      tag: "Animation 04 · For the Pricing Engine Card",
      title: "The Magnet Card",
      notes:
        "The featured Video Growth Engine card gets an aurora border, a thin beam of Electric Purple, Flex Lilac, and Electric Neon orbiting the card edge forever, plus a magnetic cursor tilt with a glare spot that follows your mouse. The flagship plan physically leans toward the buyer while the other two tiers sit flat.",
      node: <MagnetCard />,
    },
    {
      tag: "Animation 05 · For the Guarantee Banner",
      title: "The Shield That Draws Itself",
      notes:
        "The static shield emoji becomes an SVG that draws its own outline stroke by stroke, lands the neon checkmark, breathes a purple fill, then sends a sheen across the banner text. A guarantee is a promise being made, so the mark of that promise should be made in front of you, not pre-printed.",
      node: <ShieldDraw />,
    },
  ];

  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header style={S.pageHeader}>
        <span style={S.pageTag}>Fable · Motion concepts for the live frames</span>
        <h1 style={S.pageTitle}>Five animations that earn their pixels</h1>
        <p style={S.pageNotes}>
          A2 Media sells editing, so the site&apos;s motion language should feel
          like an edit: razors, playheads, timecodes, strikes, and stamps
          instead of generic fades. Each concept below is a discrete add-on to
          one existing section, shown in context as a mini version of that
          frame. Every loop runs on its own in 4 to 8 seconds, no scroll
          triggers, so the page is always mid-performance. Everything is CSS
          keyframes plus a few requestAnimationFrame counters, nothing heavier.
          The palette holds the line: Night Core base, Electric Purple leads,
          Electric Neon only where the eye should land.
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
  .fa-dot { animation: faDotPulse 2.2s ease-in-out infinite; }
  @keyframes faDotPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(102,247,142,0.55); }
    50% { box-shadow: 0 0 0 7px rgba(102,247,142,0); }
  }

  /* ---------- 01 razor cut ---------- */
  .fa-razor { animation: faRazorSweep 1.05s cubic-bezier(.7,0,.3,1) both; }
  @keyframes faRazorSweep {
    0%   { left: -2%; opacity: 0; }
    8%   { opacity: 1; }
    78%  { left: 101%; opacity: 1; }
    100% { left: 101%; opacity: 0; }
  }
  .fa-char { animation: faCharPrint .55s cubic-bezier(.2,.9,.3,1.2) both; }
  @keyframes faCharPrint {
    0%   { opacity: 0; transform: translateY(.55em) skewX(-10deg) scaleY(1.25); filter: blur(7px); }
    60%  { opacity: 1; filter: blur(0); }
    100% { opacity: 1; transform: translateY(0) skewX(0) scaleY(1); filter: blur(0); }
  }
  @keyframes faBlobDrift {
    0%, 100% { transform: translate(-12%, -8%) scale(1); }
    50% { transform: translate(10%, 6%) scale(1.18); }
  }

  /* ---------- 02 playhead drag ---------- */
  .fa-playhead { animation: faSweep ${REEL_LOOP}s linear infinite; }
  .fa-trail { animation: faSweep ${REEL_LOOP}s linear infinite; }
  @keyframes faSweep {
    0% { left: 0%; }
    100% { left: 100%; }
  }
  .fa-frame { animation: faFramePop ${REEL_LOOP}s linear infinite; }
  @keyframes faFramePop {
    0%    { filter: brightness(.5) saturate(.75); transform: scale(1); }
    3%    { filter: brightness(1.25) saturate(1.15); transform: scale(1.06); }
    11%   { filter: brightness(1.1) saturate(1.05); transform: scale(1.03); }
    17%   { filter: brightness(.5) saturate(.75); transform: scale(1); }
    100%  { filter: brightness(.5) saturate(.75); transform: scale(1); }
  }
  .fa-rec { animation: faRecBlink 1.1s steps(1) infinite; }
  @keyframes faRecBlink {
    0%, 60% { opacity: 1; }
    61%, 100% { opacity: .25; }
  }

  /* ---------- 03 strike and save ---------- */
  .fa-strike {
    transform: scaleX(0) rotate(-1.6deg);
    animation: faStrikeDraw .42s cubic-bezier(.65,0,.35,1) forwards;
  }
  @keyframes faStrikeDraw {
    0%   { transform: scaleX(0) rotate(-1.6deg); }
    100% { transform: scaleX(1) rotate(-1.6deg); }
  }
  .fa-stamp { animation: faStampIn .55s cubic-bezier(.18,1.4,.4,1) 3.55s both; }
  @keyframes faStampIn {
    0%   { opacity: 0; transform: scale(2) rotate(5deg); filter: blur(4px); }
    55%  { opacity: 1; transform: scale(.94) rotate(-1deg); filter: blur(0); }
    100% { opacity: 1; transform: scale(1) rotate(0); }
  }
  .fa-savereveal { animation: faSaveReveal .6s ease 4.2s both; }
  @keyframes faSaveReveal {
    0%   { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* ---------- 04 magnet card ---------- */
  .fa-beam { animation: faBeamSpin 4.5s linear infinite; }
  @keyframes faBeamSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .fa-float { animation: faFloatBob 6s ease-in-out infinite; }
  @keyframes faFloatBob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  .fa-badge {
    background: linear-gradient(100deg, ${LILAC} 0%, ${WHITE} 48%, ${LILAC} 60%);
    background-size: 240% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: faBadgeShimmer 3.4s ease-in-out infinite;
  }
  @keyframes faBadgeShimmer {
    0%, 25% { background-position: 120% 0; }
    70%, 100% { background-position: -60% 0; }
  }
  .fa-engine-cta { animation: faCtaPulse 3s ease-in-out infinite; }
  @keyframes faCtaPulse {
    0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,.1), 0 12px 40px rgba(90,51,255,.45); }
    50% { box-shadow: 0 0 0 1px rgba(255,255,255,.16), 0 16px 60px rgba(90,51,255,.75), 0 0 70px rgba(143,69,238,.4); }
  }

  /* ---------- 05 shield ---------- */
  .fa-shield-stroke {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: faShieldDraw 7s ease-in-out infinite;
  }
  @keyframes faShieldDraw {
    0%        { stroke-dashoffset: 1; }
    6%        { stroke-dashoffset: 1; }
    34%       { stroke-dashoffset: 0; }
    88%       { stroke-dashoffset: 0; }
    96%, 100% { stroke-dashoffset: 1; }
  }
  .fa-check-stroke {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: faCheckDraw 7s cubic-bezier(.5,0,.3,1) infinite;
  }
  @keyframes faCheckDraw {
    0%, 32%   { stroke-dashoffset: 1; }
    46%       { stroke-dashoffset: 0; }
    88%       { stroke-dashoffset: 0; }
    96%, 100% { stroke-dashoffset: 1; }
  }
  .fa-shield-fill { animation: faShieldFill 7s ease-in-out infinite; }
  @keyframes faShieldFill {
    0%, 40%   { opacity: 0; }
    52%       { opacity: 1; }
    70%       { opacity: .55; }
    82%       { opacity: 1; }
    92%, 100% { opacity: 0; }
  }
  .fa-ring { animation: faRingPulse 7s ease-out infinite; }
  @keyframes faRingPulse {
    0%, 44%   { opacity: 0; transform: scale(.6); }
    50%       { opacity: .8; transform: scale(.8); }
    72%       { opacity: 0; transform: scale(1.9); }
    100%      { opacity: 0; transform: scale(1.9); }
  }
  .fa-sheen { animation: faSheenSweep 7s ease-in-out infinite; }
  @keyframes faSheenSweep {
    0%, 52%   { transform: translateX(-130%) skewX(-18deg); opacity: 0; }
    56%       { opacity: 1; }
    78%       { transform: translateX(330%) skewX(-18deg); opacity: 1; }
    79%, 100% { transform: translateX(330%) skewX(-18deg); opacity: 0; }
  }

  /* ---------- responsive ---------- */
  @media (max-width: 860px) {
    .fa-frame:nth-child(n+6) { display: none; }
  }
`;

/* ================================================================== */
/* Styles                                                              */
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

/* ---------- Demo 01 ---------- */

const D1 = {
  stage: {
    position: "relative",
    overflow: "hidden",
    padding: "74px 32px 58px",
    textAlign: "center",
  } as React.CSSProperties,
  blob: {
    position: "absolute",
    width: "60%",
    height: "70%",
    left: "20%",
    top: "5%",
    background: "radial-gradient(closest-side, rgba(90,51,255,0.32), transparent 70%)",
    filter: "blur(30px)",
    animation: "faBlobDrift 9s ease-in-out infinite",
    pointerEvents: "none",
  } as React.CSSProperties,
  grain: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(80% 60% at 50% 0%, rgba(143,69,238,0.12), transparent 70%)",
    pointerEvents: "none",
  } as React.CSSProperties,
  inner: { position: "relative" } as React.CSSProperties,
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.72)",
    margin: "0 0 26px",
  } as React.CSSProperties,
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: NEON,
    display: "inline-block",
  } as React.CSSProperties,
  title: {
    fontSize: "clamp(30px, 4.6vw, 54px)",
    fontWeight: 800,
    lineHeight: 1.12,
    letterSpacing: "-0.025em",
    margin: "0 0 34px",
  } as React.CSSProperties,
  lineA: { display: "block" } as React.CSSProperties,
  lineB: {
    display: "block",
    whiteSpace: "nowrap",
  } as React.CSSProperties,
  wordWrap: {
    position: "relative",
    display: "inline-block",
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    color: LILAC,
    paddingRight: "0.08em",
  } as React.CSSProperties,
  razor: {
    position: "absolute",
    top: "-12%",
    bottom: "-12%",
    width: 2.5,
    background: NEON,
    boxShadow: "0 0 16px rgba(102,247,142,0.9), 0 0 40px rgba(102,247,142,0.45)",
    zIndex: 2,
  } as React.CSSProperties,
  razorHandle: {
    position: "absolute",
    top: -7,
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderTop: `8px solid ${NEON}`,
  } as React.CSSProperties,
  char: { display: "inline-block" } as React.CSSProperties,
  forYou: { color: WHITE } as React.CSSProperties,
  ctas: {
    display: "flex",
    justifyContent: "center",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 38,
  } as React.CSSProperties,
  btnPrimary: {
    padding: "13px 28px",
    background: PURPLE,
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 14.5,
    boxShadow: "0 12px 44px rgba(90,51,255,0.5)",
  } as React.CSSProperties,
  btnGhost: {
    padding: "13px 28px",
    border: "1px solid rgba(255,255,255,0.22)",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 14.5,
    color: "rgba(255,255,255,0.85)",
  } as React.CSSProperties,
  tcRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 18,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.16em",
    color: "rgba(255,255,255,0.4)",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 999,
    padding: "8px 18px",
    background: "rgba(255,255,255,0.03)",
  } as React.CSSProperties,
  tcLabel: { color: "rgba(255,255,255,0.4)" } as React.CSSProperties,
  tc: { color: NEON, minWidth: 96, textAlign: "left" } as React.CSSProperties,
  tcCut: { color: LILAC } as React.CSSProperties,
};

/* ---------- Demo 02 ---------- */

const D2 = {
  stage: {
    padding: "58px 32px 54px",
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
    margin: "0 0 34px",
  } as React.CSSProperties,
  headingItalic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    color: LILAC,
  } as React.CSSProperties,
  deck: {
    maxWidth: 900,
    margin: "0 auto",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 18,
    padding: "16px 18px 14px",
  } as React.CSSProperties,
  deckTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: "0.14em",
    color: "rgba(255,255,255,0.45)",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    marginBottom: 12,
  } as React.CSSProperties,
  deckLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  } as React.CSSProperties,
  recDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    background: "#FF5C5C",
    display: "inline-block",
    boxShadow: "0 0 10px rgba(255,92,92,0.8)",
  } as React.CSSProperties,
  tc: { color: NEON } as React.CSSProperties,
  strip: {
    position: "relative",
    borderRadius: 12,
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "16px 10px",
    overflow: "hidden",
  } as React.CSSProperties,
  sprockets: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 10,
    background:
      "repeating-linear-gradient(90deg, transparent 0 14px, rgba(255,255,255,0.16) 14px 20px, transparent 20px 34px)",
    opacity: 0.7,
  } as React.CSSProperties,
  frameRow: {
    display: "flex",
    gap: 8,
    position: "relative",
    zIndex: 1,
    padding: "4px 2px",
  } as React.CSSProperties,
  frame: {
    flex: 1,
    minWidth: 0,
    height: 92,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.14)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "8px 9px",
    position: "relative",
    overflow: "hidden",
  } as React.CSSProperties,
  frameLabel: {
    fontSize: 9.5,
    fontWeight: 800,
    letterSpacing: "0.1em",
    color: WHITE,
  } as React.CSSProperties,
  frameStat: {
    fontSize: 9,
    color: "rgba(255,255,255,0.6)",
  } as React.CSSProperties,
  framePlay: {
    position: "absolute",
    top: 7,
    right: 8,
    fontSize: 8,
    color: "rgba(255,255,255,0.55)",
  } as React.CSSProperties,
  trail: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 90,
    marginLeft: -90,
    background: "linear-gradient(90deg, transparent, rgba(90,51,255,0.32))",
    filter: "blur(4px)",
    zIndex: 2,
    pointerEvents: "none",
  } as React.CSSProperties,
  playhead: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 2,
    background: NEON,
    boxShadow: "0 0 14px rgba(102,247,142,0.9), 0 0 44px rgba(102,247,142,0.4)",
    zIndex: 3,
    pointerEvents: "none",
  } as React.CSSProperties,
  playheadHandle: {
    position: "absolute",
    top: -1,
    left: "50%",
    transform: "translateX(-50%)",
    width: 9,
    height: 9,
    borderRadius: 999,
    background: NEON,
    boxShadow: "0 0 12px rgba(102,247,142,0.9)",
  } as React.CSSProperties,
  deckBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.14em",
    color: "rgba(255,255,255,0.35)",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    marginTop: 12,
  } as React.CSSProperties,
  deckHint: {
    color: "rgba(143,69,238,0.85)",
    textTransform: "uppercase",
  } as React.CSSProperties,
};

/* ---------- Demo 03 ---------- */

const D3 = {
  stage: {
    padding: "58px 32px 60px",
    textAlign: "center",
  } as React.CSSProperties,
  heading: {
    fontSize: "clamp(24px, 3.4vw, 38px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    margin: "0 0 30px",
  } as React.CSSProperties,
  headingItalic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    color: LILAC,
  } as React.CSSProperties,
  card: {
    maxWidth: 560,
    margin: "0 auto",
    textAlign: "left",
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.11)",
    borderRadius: 18,
    padding: "26px 28px 24px",
  } as React.CSSProperties,
  cardLabel: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.45)",
    marginBottom: 16,
  } as React.CSSProperties,
  line: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "9px 0",
    borderBottom: "1px dashed rgba(255,255,255,0.08)",
  } as React.CSSProperties,
  role: {
    fontSize: 14,
    color: "rgba(255,255,255,0.78)",
  } as React.CSSProperties,
  cost: {
    position: "relative",
    fontSize: 14.5,
    fontWeight: 700,
    color: "rgba(255,255,255,0.85)",
    fontVariantNumeric: "tabular-nums",
  } as React.CSSProperties,
  strike: {
    position: "absolute",
    left: -4,
    right: -4,
    top: "52%",
    height: 2.5,
    borderRadius: 999,
    background: NEON,
    boxShadow: "0 0 10px rgba(102,247,142,0.65)",
    transformOrigin: "left center",
  } as React.CSSProperties,
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 0 4px",
  } as React.CSSProperties,
  totalLabel: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.5)",
  } as React.CSSProperties,
  totalPair: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 14,
  } as React.CSSProperties,
  totalOld: {
    position: "relative",
    fontSize: 20,
    fontWeight: 800,
    color: "rgba(255,99,99,0.9)",
    fontVariantNumeric: "tabular-nums",
  } as React.CSSProperties,
  totalNew: {
    display: "inline-block",
    fontSize: 26,
    fontWeight: 900,
    color: NEON,
    textShadow: "0 0 26px rgba(102,247,142,0.5)",
    fontVariantNumeric: "tabular-nums",
  } as React.CSSProperties,
  saveRow: {
    marginTop: 18,
    paddingTop: 18,
    borderTop: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    flexWrap: "wrap",
  } as React.CSSProperties,
  saveLabel: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.55)",
  } as React.CSSProperties,
  saveNumber: {
    fontSize: "clamp(28px, 3.6vw, 40px)",
    fontWeight: 900,
    letterSpacing: "-0.02em",
    color: PURPLE,
    textShadow: "0 0 36px rgba(90,51,255,0.65)",
    fontVariantNumeric: "tabular-nums",
    minWidth: 188,
  } as React.CSSProperties,
  saveTail: {
    fontSize: 13.5,
    color: "rgba(255,255,255,0.6)",
  } as React.CSSProperties,
};

/* ---------- Demo 04 ---------- */

const D4 = {
  stage: {
    padding: "58px 32px 50px",
    textAlign: "center",
  } as React.CSSProperties,
  heading: {
    fontSize: "clamp(24px, 3.4vw, 38px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    margin: "0 0 34px",
  } as React.CSSProperties,
  headingItalic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    color: LILAC,
  } as React.CSSProperties,
  cardRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
    flexWrap: "wrap",
  } as React.CSSProperties,
  sideCard: {
    width: 170,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 16,
    padding: "26px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    opacity: 0.55,
  } as React.CSSProperties,
  sideName: {
    fontSize: 13,
    fontWeight: 700,
    color: "rgba(255,255,255,0.8)",
  } as React.CSSProperties,
  sidePrice: {
    fontSize: 24,
    fontWeight: 900,
    color: "rgba(255,255,255,0.65)",
  } as React.CSSProperties,
  magnetZone: {
    padding: 10,
  } as React.CSSProperties,
  tiltLayer: {
    transition: "transform .18s ease-out",
    willChange: "transform",
  } as React.CSSProperties,
  floatLayer: {} as React.CSSProperties,
  beamShell: {
    position: "relative",
    width: 330,
    borderRadius: 22,
    padding: 1.6,
    overflow: "hidden",
    boxShadow: "0 30px 90px rgba(90,51,255,0.35)",
  } as React.CSSProperties,
  beam: {
    position: "absolute",
    inset: "-120%",
    background: `conic-gradient(from 0deg, transparent 0 62%, ${PURPLE} 74%, ${LILAC} 84%, ${NEON} 92%, transparent 100%)`,
  } as React.CSSProperties,
  cardBody: {
    position: "relative",
    borderRadius: 21,
    background: "linear-gradient(170deg, #160b4a 0%, #0D0536 60%)",
    padding: "26px 26px 26px",
    textAlign: "left",
    overflow: "hidden",
  } as React.CSSProperties,
  glare: {
    position: "absolute",
    inset: 0,
    transition: "opacity .3s ease",
    pointerEvents: "none",
  } as React.CSSProperties,
  badge: {
    display: "inline-block",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.16em",
    marginBottom: 14,
  } as React.CSSProperties,
  planName: {
    fontSize: 21,
    fontWeight: 800,
    margin: "0 0 6px",
  } as React.CSSProperties,
  price: {
    fontSize: 32,
    fontWeight: 900,
    letterSpacing: "-0.02em",
    color: WHITE,
    marginBottom: 8,
  } as React.CSSProperties,
  priceUnit: {
    fontSize: 13,
    fontWeight: 600,
    color: "rgba(255,255,255,0.55)",
  } as React.CSSProperties,
  desc: {
    fontSize: 13.5,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.66)",
    margin: "0 0 16px",
  } as React.CSSProperties,
  feats: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 20,
  } as React.CSSProperties,
  feat: {
    display: "flex",
    gap: 8,
    fontSize: 12.5,
    lineHeight: 1.45,
    color: "rgba(255,255,255,0.75)",
  } as React.CSSProperties,
  chk: { color: LILAC, fontWeight: 800 } as React.CSSProperties,
  cta: {
    display: "block",
    textAlign: "center",
    padding: "13px 0",
    background: PURPLE,
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 14.5,
  } as React.CSSProperties,
  hint: {
    marginTop: 26,
    fontSize: 12,
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.4)",
  } as React.CSSProperties,
};

/* ---------- Demo 05 ---------- */

const D5 = {
  stage: {
    padding: "66px 32px 58px",
    textAlign: "center",
  } as React.CSSProperties,
  banner: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: 22,
    maxWidth: 760,
    textAlign: "left",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(90,51,255,0.45)",
    borderRadius: 20,
    padding: "26px 32px",
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(90,51,255,0.22)",
    backdropFilter: "blur(8px)",
  } as React.CSSProperties,
  ring: {
    position: "absolute",
    left: 34,
    top: "50%",
    width: 58,
    height: 58,
    marginTop: -29,
    borderRadius: 999,
    border: `2px solid ${PURPLE}`,
    pointerEvents: "none",
  } as React.CSSProperties,
  svg: {
    flexShrink: 0,
    filter: "drop-shadow(0 0 18px rgba(90,51,255,0.55))",
  } as React.CSSProperties,
  text: {
    fontSize: 16.5,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.85)",
  } as React.CSSProperties,
  textStrong: {
    color: WHITE,
    fontWeight: 800,
  } as React.CSSProperties,
  free: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    color: NEON,
  } as React.CSSProperties,
  sheen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "34%",
    background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.1), transparent)",
    pointerEvents: "none",
  } as React.CSSProperties,
  caption: {
    marginTop: 22,
    fontSize: 12,
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.4)",
  } as React.CSSProperties,
};
