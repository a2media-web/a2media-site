"use client";

/* Mockup: /mockups/promise-glow
   Five subtle "rainbow / glow" treatments for the no-pressure promise.
   Same copy in every variant. Only the visual effect changes. All
   animations are slow and quiet so they draw the eye without distracting
   from the pricing cards below.

   A · Gradient text       — the text itself flows green → teal → purple
   B · Animated underline  — green text, gradient underline that loops
   C · Aurora glow         — soft multi-hue glow drifts behind the line
   D · Rotating conic      — thin rotating gradient border around the line
   E · Breathing pulse     — line subtly pulses brightness, no color shift */

import React from "react";

const LINE =
  "Whether we work together or not, you'll leave the call with a direction for your video content.";

const VARIANTS: { tag: string; note: string; render: () => React.ReactNode }[] = [
  {
    tag: "Variant A · Gradient text",
    note: "The line text itself flows through green, teal, and Flex Lilac. Slow 8-second loop. Most subtle of the bunch — the eye sees motion before it sees color.",
    render: () => <GradientText />,
  },
  {
    tag: "Variant B · Animated underline",
    note: "Green text stays the same, but a thin gradient underline writes itself left-to-right on a loop. Adds motion without changing the text color. Cleanest 'something is happening here' signal.",
    render: () => <AnimatedUnderline />,
  },
  {
    tag: "Variant C · Aurora glow",
    note: "Soft multi-hue glow drifts behind the line at very low opacity. Premium / atmospheric. Strongest 'rainbow' read of the five, but the line text stays plain.",
    render: () => <AuroraGlow />,
  },
  {
    tag: "Variant D · Rotating conic border",
    note: "Thin conic-gradient border around the line slowly rotates. The line sits in a subtle rounded container. Reads as a 'special offer' badge without being loud.",
    render: () => <ConicBorder />,
  },
  {
    tag: "Variant E · Breathing pulse",
    note: "Line stays green and still, but gently breathes brightness (95% to 100%) on a 4-second loop. Quietest treatment. Draws the eye through micro-motion, no color noise.",
    render: () => <BreathingPulse />,
  },
];

export default function PromiseGlowMockups() {
  return (
    <main style={{ background: "#07021f" }}>
      <style>{KEYFRAMES}</style>
      {VARIANTS.map((v) => (
        <Frame key={v.tag} tag={v.tag} note={v.note}>
          <PricingPair treatment={v.render()} />
        </Frame>
      ))}
    </main>
  );
}

/* ---- treatments ---------------------------------------------------------- */

function GradientText() {
  return (
    <span style={S.gradientText} className="pg-gradient">
      {LINE}
    </span>
  );
}

function AnimatedUnderline() {
  return (
    <span style={S.uWrap}>
      <span style={S.uText}>{LINE}</span>
      <span style={S.uLine} className="pg-underline" />
    </span>
  );
}

function AuroraGlow() {
  return (
    <span style={S.aWrap}>
      <span style={S.aGlow} className="pg-aurora" />
      <span style={S.aText}>{LINE}</span>
    </span>
  );
}

function ConicBorder() {
  return (
    <span style={S.cBox} className="pg-conic">
      <span style={S.cInner}>{LINE}</span>
    </span>
  );
}

function BreathingPulse() {
  return (
    <span style={S.bText} className="pg-breath">
      {LINE}
    </span>
  );
}

/* ---- keyframes ---------------------------------------------------------- */

const KEYFRAMES = `
@keyframes pg-gradient-flow {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
.pg-gradient {
  animation: pg-gradient-flow 8s ease-in-out infinite;
}

@keyframes pg-underline-flow {
  0%   { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}
.pg-underline {
  animation: pg-underline-flow 5s linear infinite;
}

@keyframes pg-aurora-drift {
  0%, 100% { transform: translateX(-10%) translateY(0) scale(1); opacity: 0.6; }
  50%      { transform: translateX(10%)  translateY(-4px) scale(1.05); opacity: 0.9; }
}
.pg-aurora {
  animation: pg-aurora-drift 9s ease-in-out infinite;
}

@keyframes pg-border-flow {
  0%   { background-position: 0 0, -100% 0; }
  100% { background-position: 0 0,  100% 0; }
}
.pg-conic {
  border: 2px solid transparent;
  border-radius: 16px;
  background:
    linear-gradient(#0d0536, #0d0536) padding-box,
    linear-gradient(90deg, #66f78e, #28dfe8, #8f7bff, #66f78e) border-box;
  background-size: 100% 100%, 200% 100%;
  background-repeat: no-repeat;
  animation: pg-border-flow 6s linear infinite;
}

@keyframes pg-breath {
  0%, 100% { opacity: 0.92; filter: brightness(0.95); }
  50%      { opacity: 1;    filter: brightness(1.1); }
}
.pg-breath {
  animation: pg-breath 4s ease-in-out infinite;
}
`;

/* ---- pricing pair ------------------------------------------------------- */

function PricingPair({ treatment }: { treatment: React.ReactNode }) {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <h2 style={S.h2}>
          One Path. <em style={S.italic}>Two Steps.</em>
        </h2>
        <p style={S.intro}>
          Every engagement starts with the <strong>2-Week Jumpstart</strong>.
        </p>

        <div style={S.treatmentWrap}>{treatment}</div>

        <div style={S.grid}>
          <div style={S.cardWhite}>
            <span style={S.badgeBright}>Start Here</span>
            <h3 style={S.planName}>The 2-Week Jumpstart</h3>
            <div style={S.price}>
              $8K<small style={S.priceSmall}>one-time</small>
            </div>
            <p style={S.desc}>6-month video strategy + 3 videos. Required to start.</p>
            <a href="#" style={S.ctaOutline}>Book a Discovery Call</a>
          </div>
          <div style={S.cardFeatured}>
            <span style={S.badgePurple}>Then</span>
            <h3 style={S.planName}>The Video Growth Engine</h3>
            <div style={S.price}>
              $15K — $25K<small style={S.priceSmall}>/ month</small>
            </div>
            <p style={S.desc}>Pick 3 or 6 months. Longer = Lower monthly rate.</p>
            <a href="#" style={S.ctaFilled}>See if We&apos;re a Fit</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Frame({ tag, note, children }: { tag: string; note: string; children: React.ReactNode }) {
  return (
    <>
      <header style={S.frameHeader}>
        <span style={S.frameTag}>{tag}</span>
        <p style={S.frameNote}>{note}</p>
      </header>
      {children}
    </>
  );
}

/* ---- styles ------------------------------------------------------------- */

const S = {
  frameHeader: { background: "#000", borderTop: "2px solid #5A33FF", padding: "32px 24px 20px", textAlign: "center" } as React.CSSProperties,
  frameTag: { display: "inline-block", padding: "5px 14px", border: "1px solid rgba(40,223,232,0.45)", color: "#28dfe8", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 } as React.CSSProperties,
  frameNote: { fontSize: 13.5, lineHeight: 1.55, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: 660 } as React.CSSProperties,

  section: { background: "#0d0536", color: "#fff", padding: "clamp(56px,7vw,90px) 24px", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  inner: { maxWidth: 1180, margin: "0 auto", textAlign: "center" } as React.CSSProperties,
  h2: { fontSize: "clamp(34px,4.6vw,54px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px" } as React.CSSProperties,
  italic: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#8f7bff" } as React.CSSProperties,
  intro: { fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.78)", maxWidth: 620, margin: "0 auto 18px" } as React.CSSProperties,

  treatmentWrap: { margin: "0 auto 44px", display: "flex", justifyContent: "center", maxWidth: 980 } as React.CSSProperties,

  // ---- A gradient text
  gradientText: {
    display: "inline-block",
    maxWidth: 920,
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 600,
    backgroundImage: "linear-gradient(90deg,#66f78e 0%,#28dfe8 30%,#8f7bff 60%,#66f78e 100%)",
    backgroundSize: "200% 100%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  } as React.CSSProperties,

  // ---- B animated underline
  uWrap: { position: "relative", display: "inline-block", maxWidth: 920, paddingBottom: 6 } as React.CSSProperties,
  uText: { color: "#66f78e", fontWeight: 600, fontSize: 16, lineHeight: 1.5 } as React.CSSProperties,
  uLine: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    backgroundImage: "linear-gradient(90deg, transparent 0%, #66f78e 20%, #28dfe8 50%, #8f7bff 80%, transparent 100%)",
    backgroundSize: "200% 100%",
    backgroundRepeat: "no-repeat",
    borderRadius: 2,
  } as React.CSSProperties,

  // ---- C aurora glow
  aWrap: { position: "relative", display: "inline-block", padding: "10px 20px", maxWidth: 940 } as React.CSSProperties,
  aGlow: {
    position: "absolute",
    inset: -6,
    background: "radial-gradient(60% 80% at 30% 50%, rgba(102,247,142,0.35), transparent 70%), radial-gradient(50% 80% at 70% 50%, rgba(143,123,255,0.35), transparent 70%), radial-gradient(40% 70% at 50% 50%, rgba(40,223,232,0.3), transparent 70%)",
    filter: "blur(14px)",
    borderRadius: 999,
    zIndex: 0,
  } as React.CSSProperties,
  aText: { position: "relative", zIndex: 1, color: "#fff", fontWeight: 600, fontSize: 16, lineHeight: 1.5 } as React.CSSProperties,

  // ---- D gradient border (rebuilt)
  cBox: {
    display: "inline-block",
    maxWidth: 940,
  } as React.CSSProperties,
  cInner: {
    display: "block",
    padding: "14px 22px",
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 1.5,
  } as React.CSSProperties,

  // ---- E breathing pulse
  bText: { display: "inline-block", maxWidth: 920, color: "#66f78e", fontWeight: 600, fontSize: 16, lineHeight: 1.5, textShadow: "0 0 18px rgba(102,247,142,0.25)" } as React.CSSProperties,

  // pricing pair
  grid: { display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 20, textAlign: "left" } as React.CSSProperties,
  cardWhite: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 22, padding: "32px 30px", display: "flex", flexDirection: "column", gap: 14 } as React.CSSProperties,
  cardFeatured: { background: "linear-gradient(160deg,rgba(90,51,255,0.22),rgba(90,51,255,0.05))", border: "1px solid rgba(90,51,255,0.5)", borderRadius: 22, padding: "32px 30px", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 0 60px rgba(90,51,255,0.25)" } as React.CSSProperties,
  badgeBright: { display: "inline-block", alignSelf: "flex-start", padding: "5px 12px", background: "rgba(102,247,142,0.18)", border: "1px solid rgba(102,247,142,0.55)", color: "#66f78e", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" } as React.CSSProperties,
  badgePurple: { display: "inline-block", alignSelf: "flex-start", padding: "5px 12px", background: "#5a33ff", color: "#fff", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" } as React.CSSProperties,
  planName: { fontSize: 22, fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.015em" } as React.CSSProperties,
  price: { fontSize: 44, fontWeight: 700, color: "#fff", lineHeight: 1, display: "flex", alignItems: "baseline", gap: 8, letterSpacing: "-0.02em" } as React.CSSProperties,
  priceSmall: { fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.55)" } as React.CSSProperties,
  desc: { fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.55, margin: 0 } as React.CSSProperties,
  ctaOutline: { display: "block", textAlign: "center", padding: "14px 20px", border: "1.5px solid #66f78e", color: "#fff", borderRadius: 999, textDecoration: "none", fontSize: 15, fontWeight: 600, marginTop: 4 } as React.CSSProperties,
  ctaFilled: { display: "block", textAlign: "center", padding: "14px 20px", background: "#5a33ff", color: "#fff", borderRadius: 999, textDecoration: "none", fontSize: 15, fontWeight: 600, marginTop: 4, boxShadow: "0 12px 30px rgba(90,51,255,0.4)" } as React.CSSProperties,
};
