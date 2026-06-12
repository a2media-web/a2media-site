"use client";

/* Mockup: /mockups/promise-oneline
   Baseline accent style, but the new line fits on one line instead of
   wrapping to two. Three ways to get there:

   A · Wider container, same 16px font — most faithful to the existing look
   B · Same width, smaller 14.5px font — preserves the current paragraph block
   C · Wider container + slightly larger 17px font — emphasis without losing legibility */

import React from "react";

const LINE =
  "Whether we work together or not, you'll leave the call with a direction for your video content.";

const VARIANTS: { tag: string; note: string; lineStyle: React.CSSProperties; introMaxWidth: number }[] = [
  {
    tag: "Variant A · Wider container, 16px",
    note: "Most faithful to the existing baseline. Same font size, just lets the line span wider so it fits on one row. Minimum change.",
    lineStyle: { color: "#66f78e", fontWeight: 600, fontSize: 16, lineHeight: 1.5 },
    introMaxWidth: 980,
  },
  {
    tag: "Variant B · Same width, 14.5px",
    note: "Keeps the original 620px paragraph width so the section above the cards stays the same shape. The line gets slightly smaller to fit. Most conservative on layout.",
    lineStyle: { color: "#66f78e", fontWeight: 600, fontSize: 14.5, lineHeight: 1.5 },
    introMaxWidth: 620,
  },
  {
    tag: "Variant C · Wider + 17px",
    note: "Wider container and a slight bump to 17px. The accent line carries a little more visual weight than the line above it. Best if you want the promise to feel like the headline of the intro block, not a footnote.",
    lineStyle: { color: "#66f78e", fontWeight: 600, fontSize: 17, lineHeight: 1.5 },
    introMaxWidth: 980,
  },
];

export default function PromiseOneLineMockups() {
  return (
    <main style={{ background: "#07021f" }}>
      {VARIANTS.map((v) => (
        <Frame key={v.tag} tag={v.tag} note={v.note}>
          <PricingPair lineStyle={v.lineStyle} introMaxWidth={v.introMaxWidth} />
        </Frame>
      ))}
    </main>
  );
}

function PricingPair({
  lineStyle,
  introMaxWidth,
}: {
  lineStyle: React.CSSProperties;
  introMaxWidth: number;
}) {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <h2 style={S.h2}>
          One Path. <em style={S.italic}>Two Steps.</em>
        </h2>
        <p style={{ ...S.intro, maxWidth: introMaxWidth }}>
          Every engagement starts with the <strong>2-Week Jumpstart</strong>.
          <br />
          <span style={{ ...lineStyle, whiteSpace: "nowrap" } as React.CSSProperties}>
            {LINE}
          </span>
        </p>

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

const S = {
  frameHeader: { background: "#000", borderTop: "2px solid #5A33FF", padding: "32px 24px 20px", textAlign: "center" } as React.CSSProperties,
  frameTag: { display: "inline-block", padding: "5px 14px", border: "1px solid rgba(40,223,232,0.45)", color: "#28dfe8", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 } as React.CSSProperties,
  frameNote: { fontSize: 13.5, lineHeight: 1.55, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: 660 } as React.CSSProperties,

  section: { background: "#0d0536", color: "#fff", padding: "clamp(56px,7vw,90px) 24px", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  inner: { maxWidth: 1180, margin: "0 auto", textAlign: "center" } as React.CSSProperties,
  h2: { fontSize: "clamp(34px,4.6vw,54px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px" } as React.CSSProperties,
  italic: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#8f7bff" } as React.CSSProperties,
  intro: { fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.78)", margin: "0 auto 44px" } as React.CSSProperties,

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
