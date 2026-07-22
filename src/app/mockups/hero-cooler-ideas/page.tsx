"use client";

/* Hero "cooler" ideas — 5 off-the-wall treatments of the accent word.
   Full hero shell around each so you can see the whole context, not just
   the word in isolation.

   1. Deal With It — pixel sunglasses drop onto "cooler" on load.
   2. Client Logo Roulette — "cooler" swaps for client logos periodically.
   3. Slot Machine — each letter of "cooler" spins on load like a slot reel.
   4. Cash Burst — hover "cooler" to trigger a burst of gold coins.
   5. Literal Cooler — a small animated cooler/icebox SVG next to the word.
*/

import React, { useEffect, useRef, useState } from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";
const GOLD = "#F4C842";

// ---------- shared ----------

function VideoBg() {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video style={S.video} autoPlay muted loop playsInline preload="auto" src="/videos/hero-bg.mp4" aria-hidden />
      <div style={S.veil} aria-hidden />
    </>
  );
}

function HeroShell({
  label,
  variant,
  children,
}: {
  label: string;
  variant: string;
  children: React.ReactNode;
}) {
  return (
    <section style={S.section}>
      <VideoBg />
      <div style={S.body}>
        <div style={S.headRow}>
          <span style={S.mockLabel}>{label}</span>
          <span style={S.variantChip}>{variant}</span>
        </div>
        <p style={S.eyebrow}>
          <span style={S.dot} aria-hidden />
          600+ Sales-Driven Videos for B2B SaaS Teams
        </p>
        {children}
        <p style={S.sub}>
          We study the shit out of your buyers. Then ideate, build, and edit the videos that convert without them ever feeling sold to.
        </p>
      </div>
    </section>
  );
}

// ---------- 1. Deal With It ----------

function DealWithIt() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sunglassesCss }} />
      <HeroShell label="IDEA 1" variant="Deal With It (pixel sunglasses drop)">
        <h1 style={S.title}>
          <span style={S.titleLine}>Going viral is cool.</span>
          <span style={S.titleLine}>
            Making money is <span style={{ ...S.tealAccent, position: "relative" }}>
              cooler.
              <svg
                className="sg-glasses"
                viewBox="0 0 100 40"
                aria-hidden
              >
                <rect x="4"  y="4" width="34" height="26" fill="#000" />
                <rect x="62" y="4" width="34" height="26" fill="#000" />
                <rect x="38" y="14" width="24" height="6" fill="#000" />
                <rect x="8"  y="8" width="26" height="4" fill="rgba(40,223,232,0.85)" />
                <rect x="66" y="8" width="26" height="4" fill="rgba(40,223,232,0.85)" />
              </svg>
            </span>
          </span>
        </h1>
      </HeroShell>
    </>
  );
}

// ---------- 2. Client Logo Roulette ----------

const ROULETTE_LOGOS = [
  { name: "cooler", src: null as string | null },
  { name: "Okta", src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/65e9e913df3011054a62442e_Okta_Logo_White_Medium.png" },
  { name: "cooler", src: null },
  { name: "Slate", src: "/logos/Slate.png" },
  { name: "cooler", src: null },
  { name: "Chili Piper", src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/67f1d717fe36ab2b51b4d2a4_chili%20piper.png" },
  { name: "cooler", src: null },
];

function ClientRoulette() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ROULETTE_LOGOS.length), 2600);
    return () => clearInterval(id);
  }, []);
  const current = ROULETTE_LOGOS[idx];
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: rouletteCss }} />
      <HeroShell label="IDEA 2" variant="Client Logo Roulette">
        <h1 style={S.title}>
          <span style={S.titleLine}>Going viral is cool.</span>
          <span style={S.titleLine}>
            Making money is{" "}
            <span style={{ ...S.tealAccent, minWidth: "5.5ch", display: "inline-block", verticalAlign: "middle" }}>
              {current.src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={idx}
                  src={current.src}
                  alt={current.name}
                  className="rl-logo"
                />
              ) : (
                <span key={idx} className="rl-word">cooler.</span>
              )}
            </span>
          </span>
        </h1>
      </HeroShell>
    </>
  );
}

// ---------- 3. Slot Machine ----------

const SLOT_SYMBOLS = ["$", "★", "◆", "▲", "◉", "C", "O", "O", "L", "E", "R"];
const FINAL_LETTERS = ["c", "o", "o", "l", "e", "r"];

function SlotMachine() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: slotCss }} />
      <HeroShell label="IDEA 3" variant="Slot Machine (spins on load)">
        <h1 style={S.title}>
          <span style={S.titleLine}>Going viral is cool.</span>
          <span style={S.titleLine}>
            Making money is{" "}
            <span style={S.tealAccent}>
              <span className="slot-word">
                {FINAL_LETTERS.map((letter, i) => (
                  <span key={i} className="slot-reel" style={{ animationDelay: `${0.7 + i * 0.18}s` }}>
                    <span className="slot-tape">
                      {SLOT_SYMBOLS.map((s, j) => (
                        <span key={j} className="slot-cell">{s}</span>
                      ))}
                      <span className="slot-cell slot-final">{letter}</span>
                    </span>
                  </span>
                ))}
                <span style={{ marginLeft: 2 }}>.</span>
              </span>
            </span>
          </span>
        </h1>
      </HeroShell>
    </>
  );
}

// ---------- 4. Cash Burst on Hover ----------

function CashBurst() {
  const [bursts, setBursts] = useState<number[]>([]);
  const fire = () => {
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1600);
  };
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cashCss }} />
      <HeroShell label="IDEA 4" variant="Cash Burst (hover 'cooler')">
        <h1 style={S.title}>
          <span style={S.titleLine}>Going viral is cool.</span>
          <span style={S.titleLine}>
            Making money is{" "}
            <span
              style={{ ...S.tealAccent, position: "relative", cursor: "pointer" }}
              onMouseEnter={fire}
              onClick={fire}
            >
              cooler.
              {bursts.map((id) => (
                <span key={id} className="cb-burst" aria-hidden>
                  {Array.from({ length: 14 }).map((_, i) => {
                    const angle = (Math.PI * (i / 14)) - Math.PI / 2;
                    const dx = Math.cos(angle) * (60 + (i % 4) * 20);
                    const dy = Math.sin(angle) * (60 + (i % 4) * 20);
                    return (
                      <span
                        key={i}
                        className="cb-coin"
                        style={{
                          ["--dx" as string]: `${dx}px`,
                          ["--dy" as string]: `${dy}px`,
                          animationDelay: `${i * 20}ms`,
                        } as React.CSSProperties}
                      >
                        $
                      </span>
                    );
                  })}
                </span>
              ))}
            </span>
          </span>
        </h1>
      </HeroShell>
    </>
  );
}

// ---------- 5. Literal Cooler ----------

function LiteralCooler() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: literalCss }} />
      <HeroShell label="IDEA 5" variant="Literal Cooler (icebox with cash)">
        <h1 style={S.title}>
          <span style={S.titleLine}>Going viral is cool.</span>
          <span style={S.titleLine}>
            Making money is <span style={S.tealAccent}>cooler.</span>
            <span className="lc-icon" aria-hidden>
              <svg viewBox="0 0 60 50" width="52" height="44">
                {/* body */}
                <rect x="4" y="14" width="52" height="30" rx="4" fill={TEAL} stroke="#fff" strokeWidth="1.5" />
                {/* lid */}
                <g className="lc-lid">
                  <rect x="2" y="8" width="56" height="10" rx="3" fill={TEAL} stroke="#fff" strokeWidth="1.5" />
                  <rect x="26" y="5" width="8" height="4" rx="1" fill="#fff" />
                </g>
                {/* cash pop */}
                <g className="lc-cash" transform="translate(30 26)">
                  <rect x="-10" y="-6" width="20" height="12" rx="1" fill={GOLD} />
                  <text x="0" y="4" fontSize="9" fontWeight="900" textAnchor="middle" fill={NIGHT}>$</text>
                </g>
                {/* front hinge/handle */}
                <rect x="26" y="26" width="8" height="3" rx="1" fill="rgba(255,255,255,0.6)" />
              </svg>
            </span>
          </span>
        </h1>
      </HeroShell>
    </>
  );
}

// ---------- Page ----------

export default function Page() {
  return (
    <main style={{ background: "#07021F" }}>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview</p>
        <h1 style={S.pageTitle}>
          Hero &ldquo;cooler&rdquo; ideas · <em style={{ color: TEAL }}>5 off-the-wall</em>
        </h1>
        <p style={S.pageLede}>
          Same locked headline + sub across all five. Only the treatment on the
          word &ldquo;cooler&rdquo; changes. Reload the page for load-in animations.
          Hover Idea 4 to see the burst.
        </p>
      </header>

      <DealWithIt />
      <ClientRoulette />
      <SlotMachine />
      <CashBurst />
      <LiteralCooler />
    </main>
  );
}

// ---------- styles ----------

const S = {
  pageHead: {
    padding: "48px 32px 40px",
    textAlign: "center" as const,
    background: NIGHT,
    color: "#fff",
    fontFamily: "var(--a2-sans, system-ui)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties,
  pageEyebrow: {
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: LILAC,
    fontWeight: 800,
    margin: 0,
  } as React.CSSProperties,
  pageTitle: {
    fontSize: 32,
    fontWeight: 800,
    margin: "10px 0 12px",
    letterSpacing: "-0.02em",
  } as React.CSSProperties,
  pageLede: {
    fontSize: 14.5,
    color: "rgba(255,255,255,0.72)",
    margin: "0 auto",
    maxWidth: 700,
    lineHeight: 1.55,
  } as React.CSSProperties,

  section: {
    position: "relative" as const,
    color: "#fff",
    padding: "clamp(80px, 8vw, 140px) clamp(20px, 5vw, 64px) clamp(70px, 6vw, 100px)",
    overflow: "hidden" as const,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    fontFamily: "var(--a2-sans, system-ui)",
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    background: NIGHT,
  } as React.CSSProperties,
  video: {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    zIndex: 0,
    filter: "saturate(0.9) brightness(0.75) contrast(1.05)",
  } as React.CSSProperties,
  veil: {
    position: "absolute" as const,
    inset: 0,
    zIndex: 1,
    pointerEvents: "none" as const,
    background:
      "radial-gradient(720px 420px at 50% 32%, rgba(7, 2, 31, 0.78) 0%, rgba(13, 5, 54, 0.55) 38%, transparent 75%), linear-gradient(180deg, rgba(13, 5, 54, 0.55) 0%, rgba(26, 15, 77, 0.40) 35%, rgba(13, 5, 54, 0.85) 100%)",
  } as React.CSSProperties,

  body: {
    position: "relative" as const,
    zIndex: 10,
    width: "100%",
    maxWidth: 1080,
    margin: "0 auto",
    textAlign: "center" as const,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  } as React.CSSProperties,

  headRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 28,
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  mockLabel: {
    display: "inline-block",
    padding: "5px 12px",
    background: "rgba(102,247,142,0.12)",
    border: `1px solid ${NEON}55`,
    borderRadius: 999,
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: NEON,
  } as React.CSSProperties,
  variantChip: {
    display: "inline-block",
    padding: "5px 12px",
    background: "rgba(40,223,232,0.14)",
    border: `1px solid ${TEAL}55`,
    borderRadius: 999,
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: "#fff",
  } as React.CSSProperties,

  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 12px 6px 8px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 999,
    fontSize: 12,
    letterSpacing: "0.02em",
    color: "rgba(255,255,255,0.85)",
    fontWeight: 600,
    margin: "0 0 24px",
  } as React.CSSProperties,
  dot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: 999,
    background: NEON,
    boxShadow: `0 0 10px ${NEON}`,
  } as React.CSSProperties,

  title: {
    fontFamily: "var(--a2-sans, system-ui)",
    fontSize: "clamp(38px, 6vw, 68px)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
    margin: "0 0 24px",
    color: "#fff",
    textWrap: "balance" as const,
  } as React.CSSProperties,
  titleLine: { display: "block" } as React.CSSProperties,
  tealAccent: {
    color: TEAL,
    textShadow: "0 2px 24px rgba(40,223,232,0.4), 0 0 36px rgba(40,223,232,0.25)",
  } as React.CSSProperties,

  sub: {
    fontSize: "clamp(17px, 1.4vw, 19px)",
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.82)",
    margin: "0 auto 30px",
    maxWidth: 720,
    fontFamily: "var(--a2-sans, system-ui)",
    textWrap: "balance" as const,
  } as React.CSSProperties,
};

// ---------- keyframes ----------

const sunglassesCss = `
  .sg-glasses {
    position: absolute;
    left: 46%;
    transform: translateX(-50%);
    top: -60px;
    width: 80px;
    height: 30px;
    animation: sgDrop 1.1s cubic-bezier(.65,.05,.36,1.6) 0.9s forwards;
    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
    pointer-events: none;
  }
  @keyframes sgDrop {
    0%   { top: -80px; opacity: 0; }
    12%  { opacity: 1; }
    70%  { top: 12px; transform: translateX(-50%) rotate(0deg); }
    85%  { top: 6px;  transform: translateX(-50%) rotate(-3deg); }
    100% { top: 10px; transform: translateX(-50%) rotate(0deg); }
  }
`;

const rouletteCss = `
  .rl-word, .rl-logo {
    display: inline-block;
    animation: rlIn 500ms cubic-bezier(0.2,0.7,0.2,1);
    vertical-align: middle;
  }
  .rl-logo {
    height: 0.9em;
    max-height: 56px;
    width: auto;
    filter: brightness(0) invert(1);
  }
  @keyframes rlIn {
    0%   { opacity: 0; transform: translateY(12px) scale(0.85); filter: blur(4px); }
    100% { opacity: 1; transform: translateY(0)   scale(1);    filter: blur(0); }
  }
`;

const slotCss = `
  .slot-word {
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }
  .slot-reel {
    display: inline-block;
    overflow: hidden;
    height: 1em;
    width: 0.62em;
    vertical-align: baseline;
    position: relative;
  }
  .slot-tape {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation-name: slotSpin;
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.1, 1);
    animation-duration: 1.4s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    transform: translateY(0);
  }
  .slot-cell {
    height: 1em;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    width: 100%;
  }
  .slot-final { color: ${TEAL}; }
  @keyframes slotSpin {
    0%   { transform: translateY(0); }
    100% { transform: translateY(-11em); }
  }
`;

const cashCss = `
  .cb-burst {
    position: absolute;
    left: 50%;
    top: 50%;
    pointer-events: none;
    width: 0;
    height: 0;
  }
  .cb-coin {
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background: radial-gradient(circle at 30% 30%, #FFE58A, ${GOLD} 60%, #B7860B);
    color: ${NIGHT};
    font-weight: 900;
    font-size: 14px;
    border-radius: 999px;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
    animation: cbCoin 1.5s cubic-bezier(0.35,0.1,0.7,1.05) forwards;
    opacity: 0;
  }
  @keyframes cbCoin {
    0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 0; }
    18%  { opacity: 1; }
    70%  { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1); opacity: 1; }
    100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy) + 60px)) scale(0.9); opacity: 0; }
  }
`;

const literalCss = `
  .lc-icon {
    display: inline-block;
    margin-left: 12px;
    vertical-align: middle;
    filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));
  }
  .lc-lid {
    transform-origin: 4px 8px;
    animation: lcLid 3.6s ease-in-out infinite;
  }
  .lc-cash {
    opacity: 0;
    transform-origin: center;
    animation: lcCash 3.6s ease-in-out infinite;
  }
  @keyframes lcLid {
    0%, 40%, 100% { transform: rotate(0deg); }
    50%, 80%      { transform: rotate(-42deg); }
  }
  @keyframes lcCash {
    0%, 45%       { opacity: 0; transform: translate(30px, 26px) scale(0.4); }
    55%, 78%      { opacity: 1; transform: translate(30px, 20px) scale(1); }
    88%, 100%     { opacity: 0; transform: translate(30px, 26px) scale(0.4); }
  }
`;
