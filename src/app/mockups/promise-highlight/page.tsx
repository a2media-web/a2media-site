"use client";

/* Mockup: /mockups/promise-highlight
   Five visual treatments for the no-pressure promise line, so visitors
   notice it. Same copy in every variant. Only the treatment changes.

   Variants:
   01 · Baseline           (current style — just inline green text)
   02 · Pill wrapper       (rounded box + "OUR PROMISE" eyebrow tag)
   03 · Icon prefix        (green check-circle anchors the line)
   04 · Highlighter marker (translucent green marker swipe under key phrase)
   05 · Glow card          (dedicated card with ambient green glow)  */

import React from "react";

const LINE_PLAIN =
  "Whether we work together or not, you'll leave the call with a direction for your video content.";
const KEY_PHRASE = "direction for your video content";

const VARIANTS: { tag: string; note: string; render: () => React.ReactNode }[] = [
  {
    tag: "Variant 01 · Baseline",
    note: "Current accent style: same green color, same size, inline with the paragraph. No visual treatment. Reference point — this is what a plain copy swap looks like.",
    render: () => <Baseline />,
  },
  {
    tag: "Variant 02 · Pill wrapper",
    note: "Wraps the line in its own rounded container with a soft green border and a small 'OUR PROMISE' eyebrow tag. Reads as a callout, not a footnote. Highest standalone weight.",
    render: () => <Pill />,
  },
  {
    tag: "Variant 03 · Icon prefix",
    note: "A green check-circle anchors the line. Subtle but unmissable. Doesn't change the typography — just adds a visual lock-point. Easiest to drop in with the smallest code change.",
    render: () => <IconPrefix />,
  },
  {
    tag: "Variant 04 · Highlighter marker",
    note: "Translucent green marker swipe under the key phrase. Editorial / hand-touched feel. Tells the eye exactly which words to grab. Strong on desktop, may look softer on dense mobile lines.",
    render: () => <Highlighter />,
  },
  {
    tag: "Variant 05 · Glow card",
    note: "A dedicated micro-card below the headline with an ambient green glow. Maximum visual weight. Trade-off: an extra element on a section that already has two pricing cards.",
    render: () => <GlowCard />,
  },
];

/* ---- page ---------------------------------------------------------------- */

export default function PromiseHighlightMockups() {
  return (
    <main style={{ background: "#07021f" }}>
      {VARIANTS.map((v) => (
        <Frame key={v.tag} tag={v.tag} note={v.note}>
          <PricingPair treatment={v.render()} />
        </Frame>
      ))}
    </main>
  );
}

/* ---- treatments ---------------------------------------------------------- */

function Baseline() {
  return <span style={S.accentInline}>{LINE_PLAIN}</span>;
}

function Pill() {
  return (
    <div style={S.pillBox}>
      <span style={S.pillEyebrow}>
        <span style={S.pillDot} /> OUR PROMISE
      </span>
      <span style={S.pillLine}>{LINE_PLAIN}</span>
    </div>
  );
}

function IconPrefix() {
  return (
    <span style={S.iconWrap}>
      <span style={S.iconCircle}>✓</span>
      <span style={S.iconLine}>{LINE_PLAIN}</span>
    </span>
  );
}

function Highlighter() {
  const before = LINE_PLAIN.split(KEY_PHRASE)[0];
  const after = LINE_PLAIN.split(KEY_PHRASE)[1] ?? "";
  return (
    <span style={S.markerLine}>
      {before}
      <span style={S.markerHL}>{KEY_PHRASE}</span>
      {after}
    </span>
  );
}

function GlowCard() {
  return (
    <div style={S.glowBox}>
      <span style={S.glowEyebrow}>
        <span style={S.glowDot} /> Every discovery call
      </span>
      <p style={S.glowLine}>{LINE_PLAIN}</p>
    </div>
  );
}

/* ---- pricing pair (compact, faithful to live) --------------------------- */

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

/* ---- styles -------------------------------------------------------------- */

const S = {
  frameHeader: { background: "#000", borderTop: "2px solid #5A33FF", padding: "32px 24px 20px", textAlign: "center" } as React.CSSProperties,
  frameTag: { display: "inline-block", padding: "5px 14px", border: "1px solid rgba(40,223,232,0.45)", color: "#28dfe8", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 } as React.CSSProperties,
  frameNote: { fontSize: 13.5, lineHeight: 1.55, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: 660 } as React.CSSProperties,

  section: { background: "#0d0536", color: "#fff", padding: "clamp(56px,7vw,90px) 24px", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  inner: { maxWidth: 1180, margin: "0 auto", textAlign: "center" } as React.CSSProperties,
  h2: { fontSize: "clamp(34px,4.6vw,54px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px" } as React.CSSProperties,
  italic: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#8f7bff" } as React.CSSProperties,
  intro: { fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.78)", maxWidth: 620, margin: "0 auto 14px" } as React.CSSProperties,

  treatmentWrap: { margin: "0 auto 44px", display: "flex", justifyContent: "center", maxWidth: 760 } as React.CSSProperties,

  // ---- V01 baseline
  accentInline: { color: "#66f78e", fontWeight: 600, fontSize: 16, lineHeight: 1.6, display: "inline-block", maxWidth: 620 } as React.CSSProperties,

  // ---- V02 pill
  pillBox: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "16px 24px", background: "rgba(102,247,142,0.06)", border: "1px solid rgba(102,247,142,0.4)", borderRadius: 16, maxWidth: 660 } as React.CSSProperties,
  pillEyebrow: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", color: "#66f78e" } as React.CSSProperties,
  pillDot: { width: 7, height: 7, borderRadius: 999, background: "#66f78e", boxShadow: "0 0 10px rgba(102,247,142,0.7)" } as React.CSSProperties,
  pillLine: { fontSize: 16, color: "#fff", fontWeight: 600, lineHeight: 1.5 } as React.CSSProperties,

  // ---- V03 icon prefix
  iconWrap: { display: "inline-flex", alignItems: "center", gap: 14, maxWidth: 720 } as React.CSSProperties,
  iconCircle: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 999, background: "rgba(102,247,142,0.16)", border: "1.5px solid #66f78e", color: "#66f78e", fontSize: 14, fontWeight: 800, flexShrink: 0 } as React.CSSProperties,
  iconLine: { fontSize: 16.5, color: "#fff", fontWeight: 600, lineHeight: 1.55, textAlign: "left" } as React.CSSProperties,

  // ---- V04 highlighter
  markerLine: { display: "inline-block", maxWidth: 720, fontSize: 17, lineHeight: 1.7, color: "#fff", fontWeight: 500 } as React.CSSProperties,
  markerHL: { backgroundImage: "linear-gradient(transparent 55%, rgba(102,247,142,0.45) 55%, rgba(102,247,142,0.45) 92%, transparent 92%)", padding: "0 2px", color: "#fff", fontWeight: 700 } as React.CSSProperties,

  // ---- V05 glow card
  glowBox: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "22px 30px", background: "linear-gradient(160deg,rgba(102,247,142,0.12),rgba(102,247,142,0.03))", border: "1px solid rgba(102,247,142,0.5)", borderRadius: 18, maxWidth: 660, boxShadow: "0 0 50px rgba(102,247,142,0.18), 0 0 100px rgba(102,247,142,0.08)" } as React.CSSProperties,
  glowEyebrow: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#66f78e" } as React.CSSProperties,
  glowDot: { width: 8, height: 8, borderRadius: 999, background: "#66f78e", boxShadow: "0 0 12px rgba(102,247,142,0.8)" } as React.CSSProperties,
  glowLine: { fontSize: 17, color: "#fff", fontWeight: 600, lineHeight: 1.5, margin: 0 } as React.CSSProperties,

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
