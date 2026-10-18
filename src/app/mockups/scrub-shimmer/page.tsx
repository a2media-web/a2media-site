"use client";

/* "See even more work" with the Guarantee section's sheen/shimmer effect.
   The exact gSheenSweep animation + sheen gradient, lifted from Guarantee,
   applied to the pill. Plus a teal-tinted variant and a faster-loop variant. */

import React from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";

const WISTIA = "https://fast.wistia.com/embed/channel/fj6gynv9qi";

function Btn({ sheenClass, sheenStyle }: { sheenClass: string; sheenStyle: React.CSSProperties }) {
  return (
    <a href={WISTIA} target="_blank" rel="noreferrer" className="more-btn">
      <span className={sheenClass} style={sheenStyle} aria-hidden />
      <span className="more-play" aria-hidden>
        <svg viewBox="0 0 12 12" width="9" height="9" fill="currentColor"><path d="M2 1v10l9-5z" /></svg>
      </span>
      See even more work
    </a>
  );
}

function Shell({ label, variant, children }: { label: string; variant: string; children: React.ReactNode }) {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <div style={S.headRow}>
          <span style={S.mockLabel}>{label}</span>
          <span style={S.variantChip}>{variant}</span>
        </div>
        <div style={S.bottomArea}>
          <div style={S.progressTrack}><div style={S.progressBar} /></div>
          <div style={S.footer}>
            <span style={S.scrollHint}>Scroll to explore →</span>
            <a href="#" style={S.portfolioBtn}>See pricing <span aria-hidden>→</span></a>
          </div>
          <div style={{ textAlign: "center", marginTop: 26 }}>{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const baseSheen: React.CSSProperties = {
    position: "absolute", top: 0, bottom: 0, left: 0, width: "34%", pointerEvents: "none",
  };
  return (
    <main style={{ background: "#07021F" }}>
      <style>{CSS}</style>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview · Guarantee shimmer</p>
        <h1 style={S.pageTitle}>
          Guarantee <em style={{ color: TEAL, fontStyle: "italic" }}>shimmer</em> on the button · 3 variants
        </h1>
        <p style={S.pageLede}>
          The exact sheen sweep from your Guarantee section, applied to the
          button. View live — one diagonal light sweep per loop, idle between.
        </p>
      </header>

      <Shell label="OPTION 1" variant="Exact Guarantee sheen (white, 7s loop)">
        <Btn sheenClass="sheen sheen-7" sheenStyle={{ ...baseSheen, background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
      </Shell>
      <Shell label="OPTION 2" variant="Teal-tinted sheen (matches CTA accent, 7s)">
        <Btn sheenClass="sheen sheen-7" sheenStyle={{ ...baseSheen, background: "linear-gradient(100deg, transparent, rgba(40,223,232,0.22), transparent)" }} />
      </Shell>
      <Shell label="OPTION 3" variant="Brighter white sheen, faster loop (4.5s)">
        <Btn sheenClass="sheen sheen-fast" sheenStyle={{ ...baseSheen, background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
      </Shell>
    </main>
  );
}

const CSS = `
  .more-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 11px 24px;
    font-size: 14px;
    font-weight: 600;
    color: rgba(255,255,255,0.92);
    letter-spacing: 0.02em;
    text-decoration: none;
    font-family: var(--a2-sans, system-ui);
    border: 1px solid rgba(255,255,255,0.28);
    border-radius: 999px;
    overflow: hidden;           /* clip the sheen to the pill */
    transition: color 200ms, border-color 200ms;
  }
  .more-btn:hover { color: ${TEAL}; border-color: ${TEAL}; }
  .more-play {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px; height: 22px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.4);
    color: rgba(255,255,255,0.92);
    padding-left: 2px;
  }
  .more-btn > :not(.sheen) { position: relative; z-index: 1; }

  /* Guarantee gSheenSweep — verbatim timing */
  @keyframes gSheenSweep {
    0%, 52%   { transform: translateX(-130%) skewX(-18deg); opacity: 0; }
    56%       { opacity: 1; }
    78%       { transform: translateX(330%) skewX(-18deg); opacity: 1; }
    79%, 100% { transform: translateX(330%) skewX(-18deg); opacity: 0; }
  }
  .sheen-7 { animation: gSheenSweep 7s ease-in-out infinite; }
  .sheen-fast { animation: gSheenSweep 4.5s ease-in-out infinite; }

  @media (prefers-reduced-motion: reduce) {
    .sheen-7, .sheen-fast { animation: none; opacity: 0; }
  }
`;

const S = {
  pageHead: { padding: "48px 32px 40px", textAlign: "center" as const, background: NIGHT, color: "#fff", fontFamily: "var(--a2-sans, system-ui)", borderBottom: "1px solid rgba(255,255,255,0.08)" } as React.CSSProperties,
  pageEyebrow: { fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: LILAC, fontWeight: 800, margin: 0 } as React.CSSProperties,
  pageTitle: { fontSize: 30, fontWeight: 800, margin: "10px 0 12px", letterSpacing: "-0.02em" } as React.CSSProperties,
  pageLede: { fontSize: 14, color: "rgba(255,255,255,0.72)", margin: "0 auto", maxWidth: 680, lineHeight: 1.55 } as React.CSSProperties,
  section: { background: NIGHT, color: "#fff", padding: "48px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--a2-sans, system-ui)" } as React.CSSProperties,
  inner: { maxWidth: 1080, margin: "0 auto" } as React.CSSProperties,
  headRow: { display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" as const } as React.CSSProperties,
  mockLabel: { display: "inline-block", padding: "5px 12px", background: "rgba(102,247,142,0.12)", border: `1px solid ${NEON}55`, borderRadius: 999, fontSize: 10.5, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: NEON } as React.CSSProperties,
  variantChip: { display: "inline-block", padding: "5px 12px", background: "rgba(40,223,232,0.14)", border: `1px solid ${TEAL}55`, borderRadius: 999, fontSize: 11.5, fontWeight: 700, color: "#fff" } as React.CSSProperties,
  bottomArea: { background: "rgba(0,0,0,0.22)", borderRadius: 14, padding: "26px 40px 40px", border: "1px dashed rgba(255,255,255,0.08)" } as React.CSSProperties,
  progressTrack: { height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" as const, margin: "0 0 22px" } as React.CSSProperties,
  progressBar: { height: "100%", width: "78%", background: `linear-gradient(90deg, ${PURPLE}, ${LILAC})`, borderRadius: 999 } as React.CSSProperties,
  footer: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" as const } as React.CSSProperties,
  scrollHint: { fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)" } as React.CSSProperties,
  portfolioBtn: { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", background: PURPLE, color: "#fff", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: `0 8px 24px rgba(90,51,255,0.4)` } as React.CSSProperties,
};
