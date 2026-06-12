"use client";

/* Mockup: /mockups/pricing-intro
   Three replacements for the green accent line under "One Path. Two Steps."
   Same structure as live (Pricing/index.tsx) — just the second sentence
   changes. No new visual element, no card edits, drop-in swap. */

import React from "react";

const VARIANTS: { tag: string; line: React.ReactNode; note: string }[] = [
  {
    tag: "Variant A · Tightest",
    line: (
      <>
        Whether we work together or not, the video roadmap is{" "}
        <em>yours to keep.</em>
      </>
    ),
    note: "One sentence. Lowest word count, highest impact on the 'yours to keep' kicker. Closest cadence to the existing accent line.",
  },
  {
    tag: "Variant B · Concrete",
    line: (
      <>
        Whether we work together or not, you leave the call with a 6-month
        video roadmap.
      </>
    ),
    note: "Specifies what they leave with. Slightly longer. Trades the 'yours to keep' emotional kicker for a concrete deliverable.",
  },
  {
    tag: "Variant C · Anti-sales reframe",
    line: (
      <>
        It&apos;s not a sales call. Whether we work together or not, the
        roadmap is yours.
      </>
    ),
    note: "Names the fear ('sales call') and dismantles it before the offer. Strongest signal to the most-skeptical visitor. Two sentences fits the existing two-line structure.",
  },
  {
    tag: "Variant D · Personal voice",
    line: (
      <>
        Whether we work together or not, I&apos;ll personally map your video
        roadmap on the call.
      </>
    ),
    note: "First-person Ademola voice in the accent line. Carries the founder-led trust without needing a separate signed block. Pairs nicely with the new hero button copy ('See if we're a fit').",
  },
  {
    tag: "Variant E · Three deliverables",
    line: (
      <>
        Whether we work together or not, you leave with a 6-month roadmap,
        three videos to ship, and the competitor audit.
      </>
    ),
    note: "Maximum concreteness packed into one line. Reads as a guarantee. Slightly longer than the existing accent line, but every word is a deliverable. Best for the skeptical buyer who needs to know exactly what they get.",
  },
];

export default function PricingIntroMockups() {
  return (
    <main style={{ background: "#07021f" }}>
      {VARIANTS.map((v) => (
        <Frame key={v.tag} tag={v.tag} note={v.note}>
          <PricingPair accentLine={v.line} />
        </Frame>
      ))}
    </main>
  );
}

function PricingPair({ accentLine }: { accentLine: React.ReactNode }) {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <h2 style={S.h2}>
          One Path. <em style={S.italic}>Two Steps.</em>
        </h2>
        <p style={S.intro}>
          Every engagement starts with the <strong>2-Week Jumpstart</strong>.
          <br />
          <span style={S.introAccent}>{accentLine}</span>
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
  intro: { fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.78)", maxWidth: 700, margin: "0 auto 44px" } as React.CSSProperties,
  introAccent: { color: "#66f78e", fontWeight: 600 } as React.CSSProperties,

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
