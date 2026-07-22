"use client";

/* Hero design v1 mockups — 3 dynamic treatments of the same locked hero.
   Copy + placement identical across all three. Only the motion + interactive
   elements differ.

   Direction 1: Kinetic Load-In — staggered entrance animation on page load,
     "cooler" arrives last with a teal glow burst. One-time, no ongoing motion.

   Direction 2: Neon Signature — static entrance, but "cooler" has an ongoing
     "neon sign" pulse (brightness + glow breath). Feels like a marquee that's
     always alive.

   Direction 3: Live Stage — cursor casts a soft teal spotlight across the
     background as you move. Subtle ambient particles drift behind the copy.
     Interactive + atmospheric.
*/

import React, { useEffect, useRef, useState } from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";

// ---------- Shared pieces (locked copy + placement) ----------

function LockedH1({ children }: { children?: React.ReactNode }) {
  return (
    <h1 style={S.title}>
      <span style={S.titleLine}>Going viral is cool.</span>
      <span style={S.titleLine}>
        Making money is {children}
      </span>
    </h1>
  );
}

function LockedSub() {
  return (
    <p style={S.sub}>
      We study the shit out of your buyers. Then ideate, build, and edit the videos that convert without them ever feeling sold to.
    </p>
  );
}

function Ctas() {
  return (
    <div style={S.ctas}>
      <a href="#" style={S.btnPrimary}>
        See if we&apos;re a fit <span aria-hidden>→</span>
      </a>
      <a href="#" style={S.btnGhost}>See the work</a>
    </div>
  );
}

function TrustRow() {
  return (
    <div style={S.trust}>
      <p style={S.trustLabel}>Trusted by</p>
      <p style={S.trustList}>
        Okta · Shopify · Chili Piper · Crossbeam · <span style={{ color: TEAL }}>Slate</span> · Wishly Group
      </p>
    </div>
  );
}

function VideoBg() {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video style={S.video} autoPlay muted loop playsInline preload="auto" src="/videos/hero-bg.mp4" aria-hidden />
      <div style={S.veil} aria-hidden />
    </>
  );
}

// ---------- Direction 1: Kinetic Load-In ----------

function KineticLoadIn() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: kineticCss }} />
      <section style={S.section}>
        <VideoBg />
        <div style={S.body}>
          <div style={S.headRow}>
            <span style={S.mockLabel}>DIRECTION 1</span>
            <span style={S.variantChip}>Kinetic Load-In</span>
          </div>
          <p style={{ ...S.eyebrow, ...S.kEyebrow }}>
            <span style={S.dot} aria-hidden />
            600+ Sales-Driven Videos for B2B SaaS Teams
          </p>

          <h1 style={S.title}>
            <span style={{ ...S.titleLine, ...S.kLine1 }}>Going viral is cool.</span>
            <span style={{ ...S.titleLine, ...S.kLine2 }}>
              Making money is <span style={{ ...S.tealAccent, ...S.kCooler }}>cooler.</span>
            </span>
          </h1>

          <div style={S.kSub}>
            <LockedSub />
          </div>
          <div style={S.kCtas}><Ctas /></div>
          <div style={S.kTrust}><TrustRow /></div>
        </div>
      </section>
    </>
  );
}

// ---------- Direction 2: Neon Signature ----------

function NeonSignature() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: neonCss }} />
      <section style={S.section}>
        <VideoBg />
        <div style={S.body}>
          <div style={S.headRow}>
            <span style={S.mockLabel}>DIRECTION 2</span>
            <span style={S.variantChip}>Neon Signature</span>
          </div>
          <p style={S.eyebrow}>
            <span style={S.dot} aria-hidden />
            600+ Sales-Driven Videos for B2B SaaS Teams
          </p>

          <LockedH1>
            <span style={S.tealAccent} className="hd-neon">
              cooler.
              <span className="hd-neon-underline" aria-hidden />
            </span>
          </LockedH1>

          <LockedSub />
          <Ctas />
          <TrustRow />
        </div>
      </section>
    </>
  );
}

// ---------- Direction 3: Live Stage ----------

function LiveStage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const spotlightStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    pointerEvents: "none",
    background: `radial-gradient(400px 400px at ${pos.x}% ${pos.y}%, rgba(40,223,232,0.14) 0%, transparent 60%)`,
    transition: "background 120ms",
    mixBlendMode: "screen" as const,
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: liveStageCss }} />
      <section ref={wrapRef} style={S.section}>
        <VideoBg />
        <div style={spotlightStyle} aria-hidden />
        {/* Ambient drifting motes */}
        <div style={S.motes} aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="hd-mote"
              style={{
                left: `${(i * 7.3) % 100}%`,
                animationDelay: `${i * 0.85}s`,
                animationDuration: `${14 + (i % 5) * 3}s`,
              }}
            />
          ))}
        </div>

        <div style={S.body}>
          <div style={S.headRow}>
            <span style={S.mockLabel}>DIRECTION 3</span>
            <span style={S.variantChip}>Live Stage (move your cursor)</span>
          </div>
          <p style={S.eyebrow}>
            <span style={S.dot} aria-hidden />
            600+ Sales-Driven Videos for B2B SaaS Teams
          </p>

          <LockedH1>
            <span style={S.tealAccent}>cooler.</span>
          </LockedH1>

          <LockedSub />
          <Ctas />
          <TrustRow />
        </div>
      </section>
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
          Hero design v1 · <em style={{ color: TEAL }}>3 dynamic treatments</em>
        </h1>
        <p style={S.pageLede}>
          Same copy across all three (your locked headline + sub). Only the
          motion and interactive elements differ, so you can see how much life
          each adds without touching the words. Reload the page to see the
          load-in animation on Direction 1 again.
        </p>
      </header>

      <KineticLoadIn />
      <NeonSignature />
      <LiveStage />
    </main>
  );
}

// ---------- Styles ----------

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
    minHeight: "80vh",
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
    filter: "saturate(0.9) brightness(0.78) contrast(1.05)",
  } as React.CSSProperties,
  veil: {
    position: "absolute" as const,
    inset: 0,
    zIndex: 1,
    pointerEvents: "none" as const,
    background:
      "radial-gradient(720px 420px at 50% 32%, rgba(7, 2, 31, 0.78) 0%, rgba(13, 5, 54, 0.55) 38%, transparent 75%), linear-gradient(180deg, rgba(13, 5, 54, 0.55) 0%, rgba(26, 15, 77, 0.40) 35%, rgba(13, 5, 54, 0.85) 100%)",
  } as React.CSSProperties,
  motes: {
    position: "absolute" as const,
    inset: 0,
    zIndex: 1,
    pointerEvents: "none" as const,
    overflow: "hidden" as const,
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
    textWrap: "balance" as const,
    color: "#fff",
  } as React.CSSProperties,
  titleLine: {
    display: "block",
  } as React.CSSProperties,
  tealAccent: {
    color: TEAL,
    position: "relative" as const,
    display: "inline-block",
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

  ctas: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap" as const,
    justifyContent: "center",
    marginBottom: 32,
  } as React.CSSProperties,
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "16px 26px",
    background: `linear-gradient(135deg, ${PURPLE}, ${LILAC})`,
    color: "#fff",
    borderRadius: 999,
    fontSize: 15.5,
    fontWeight: 700,
    letterSpacing: "0.02em",
    textDecoration: "none",
    boxShadow: `0 14px 40px rgba(90,51,255,0.4)`,
  } as React.CSSProperties,
  btnGhost: {
    display: "inline-flex",
    alignItems: "center",
    padding: "16px 26px",
    color: "#fff",
    borderRadius: 999,
    fontSize: 15.5,
    fontWeight: 600,
    letterSpacing: "0.02em",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.24)",
    background: "rgba(255,255,255,0.04)",
  } as React.CSSProperties,

  trust: { marginTop: 8 } as React.CSSProperties,
  trustLabel: {
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.55)",
    margin: "0 0 8px",
  } as React.CSSProperties,
  trustList: {
    fontSize: 14,
    color: "rgba(255,255,255,0.65)",
    margin: 0,
    letterSpacing: "0.02em",
  } as React.CSSProperties,

  // Direction 1: Kinetic Load-In animation targets
  kEyebrow: {
    opacity: 0,
    animation: "hdFadeInDelay 700ms ease 200ms forwards",
  } as React.CSSProperties,
  kLine1: {
    opacity: 0,
    transform: "translateY(24px)",
    animation: "hdRiseIn 700ms cubic-bezier(0.2,0.7,0.2,1) 400ms forwards",
  } as React.CSSProperties,
  kLine2: {
    opacity: 0,
    transform: "translateY(24px)",
    animation: "hdRiseIn 700ms cubic-bezier(0.2,0.7,0.2,1) 700ms forwards",
  } as React.CSSProperties,
  kCooler: {
    animation: "hdCoolerPop 900ms cubic-bezier(0.2,0.7,0.2,1) 1100ms both",
  } as React.CSSProperties,
  kSub: {
    opacity: 0,
    animation: "hdFadeInDelay 700ms ease 1300ms forwards",
    width: "100%",
  } as React.CSSProperties,
  kCtas: {
    opacity: 0,
    animation: "hdFadeInDelay 700ms ease 1500ms forwards",
    width: "100%",
  } as React.CSSProperties,
  kTrust: {
    opacity: 0,
    animation: "hdFadeInDelay 700ms ease 1700ms forwards",
    width: "100%",
  } as React.CSSProperties,
};

// ---------- Keyframe / animation CSS blocks ----------

const kineticCss = `
  @keyframes hdRiseIn {
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes hdFadeInDelay {
    to { opacity: 1; }
  }
  @keyframes hdCoolerPop {
    0%   { transform: scale(0.86); text-shadow: 0 0 0 rgba(40,223,232,0); }
    55%  { transform: scale(1.08); text-shadow: 0 0 40px rgba(40,223,232,0.85), 0 0 80px rgba(40,223,232,0.55); }
    100% { transform: scale(1);    text-shadow: 0 2px 24px rgba(40,223,232,0.4), 0 0 36px rgba(40,223,232,0.25); }
  }
`;

const neonCss = `
  .hd-neon {
    text-shadow: 0 2px 24px rgba(40,223,232,0.4), 0 0 36px rgba(40,223,232,0.25);
    animation: hdNeonPulse 3.2s ease-in-out infinite;
  }
  @keyframes hdNeonPulse {
    0%, 100% { text-shadow: 0 2px 24px rgba(40,223,232,0.35), 0 0 30px rgba(40,223,232,0.2); filter: brightness(1); }
    50%      { text-shadow: 0 2px 32px rgba(40,223,232,0.7), 0 0 60px rgba(40,223,232,0.5); filter: brightness(1.15); }
  }
  .hd-neon-underline {
    position: absolute;
    left: 4%;
    right: 4%;
    bottom: -0.1em;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(90deg, transparent, ${TEAL}, transparent);
    box-shadow: 0 0 12px ${TEAL}, 0 0 24px rgba(40,223,232,0.6);
    animation: hdUnderlineShimmer 3.2s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes hdUnderlineShimmer {
    0%, 100% { opacity: 0.55; transform: scaleX(0.85); }
    50%      { opacity: 1;    transform: scaleX(1); }
  }
`;

const liveStageCss = `
  .hd-mote {
    position: absolute;
    bottom: -10px;
    width: 4px;
    height: 4px;
    border-radius: 999px;
    background: rgba(40, 223, 232, 0.55);
    box-shadow: 0 0 6px rgba(40, 223, 232, 0.7);
    animation-name: hdMoteRise;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    opacity: 0;
  }
  @keyframes hdMoteRise {
    0%   { transform: translateY(0) scale(0.5);   opacity: 0; }
    12%  { opacity: 0.7; }
    88%  { opacity: 0.7; }
    100% { transform: translateY(-90vh) scale(1); opacity: 0; }
  }
`;
