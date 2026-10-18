"use client";

/* "See even more work" — 5 orbiting-glow variants.
   A glow element travels slowly around either the small play circle or the
   whole pill. Shown in the real footer context. View live to see motion. */

import React from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";

const WISTIA = "https://fast.wistia.com/embed/channel/fj6gynv9qi";

function Btn({
  playClass = "",
  pillClass = "",
  extraInsidePlay,
}: {
  playClass?: string;
  pillClass?: string;
  extraInsidePlay?: React.ReactNode;
}) {
  return (
    <a href={WISTIA} target="_blank" rel="noreferrer" className={`more-btn ${pillClass}`}>
      <span className={`more-play ${playClass}`} aria-hidden>
        {extraInsidePlay}
        <svg viewBox="0 0 12 12" width="9" height="9" fill="currentColor" style={{ position: "relative", zIndex: 2 }}>
          <path d="M2 1v10l9-5z" />
        </svg>
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
  return (
    <main style={{ background: "#07021F" }}>
      <style>{CSS}</style>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview · orbiting glow</p>
        <h1 style={S.pageTitle}>
          Orbiting glow · <em style={{ color: TEAL, fontStyle: "italic" }}>5 variants</em>
        </h1>
        <p style={S.pageLede}>
          A glow that slowly circles the button. Variants 1-3 orbit the small
          play icon; 4-5 orbit the whole pill. All run on a slow loop (~4s).
        </p>
      </header>

      <Shell label="OPTION 1" variant="Dot orbits the play circle">
        <Btn playClass="glow-orbit-dot" />
      </Shell>
      <Shell label="OPTION 2" variant="Comet (dot + fading tail) orbits play circle">
        <Btn playClass="glow-comet" extraInsidePlay={<span className="comet-ring" aria-hidden />} />
      </Shell>
      <Shell label="OPTION 3" variant="Rotating arc ring around play circle">
        <Btn playClass="glow-arc" extraInsidePlay={<span className="arc-ring" aria-hidden />} />
      </Shell>
      <Shell label="OPTION 4" variant="Dot orbits the whole pill">
        <Btn pillClass="glow-pill-dot" />
      </Shell>
      <Shell label="OPTION 5" variant="Soft glow halo rotates behind the pill">
        <Btn pillClass="glow-pill-halo" />
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
    transition: color 200ms, border-color 200ms;
    isolation: isolate;
  }
  .more-btn:hover { color: ${TEAL}; border-color: ${TEAL}; }
  .more-play {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.4);
    color: rgba(255,255,255,0.92);
    padding-left: 2px;
  }

  @keyframes glowspin { to { transform: rotate(360deg); } }

  /* 1. Dot orbits the play circle */
  .glow-orbit-dot::before {
    content: "";
    position: absolute;
    inset: -5px;
    border-radius: 999px;
    animation: glowspin 4s linear infinite;
  }
  .glow-orbit-dot::after {
    content: "";
    position: absolute;
    top: -5px; left: 50%;
    width: 6px; height: 6px;
    margin-left: -3px;
    border-radius: 999px;
    background: ${TEAL};
    box-shadow: 0 0 8px ${TEAL}, 0 0 14px rgba(40,223,232,0.6);
    transform-origin: 3px 21px;
    animation: glowspin 4s linear infinite;
  }

  /* 2. Comet with fading tail (conic arc) around play circle */
  .comet-ring {
    position: absolute;
    inset: -4px;
    border-radius: 999px;
    background: conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(40,223,232,0.9) 358deg, ${TEAL} 360deg);
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
    animation: glowspin 4s linear infinite;
    filter: drop-shadow(0 0 4px ${TEAL});
    z-index: 1;
  }

  /* 3. Rotating bright arc ring around play circle */
  .arc-ring {
    position: absolute;
    inset: -3px;
    border-radius: 999px;
    background: conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgba(40,223,232,0.7) 320deg, ${TEAL} 360deg);
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px));
    animation: glowspin 4s linear infinite;
    z-index: 1;
  }

  /* 4. Dot orbits the whole pill (offset-path around rounded rect) */
  .glow-pill-dot::after {
    content: "";
    position: absolute;
    width: 7px; height: 7px;
    border-radius: 999px;
    background: ${TEAL};
    box-shadow: 0 0 8px ${TEAL}, 0 0 16px rgba(40,223,232,0.6);
    offset-path: rect(-4px auto auto -4px round 999px);
    offset-path: inset(-4px round 999px);
    offset-distance: 0%;
    animation: pilltravel 6s linear infinite;
    z-index: 1;
  }
  @keyframes pilltravel { to { offset-distance: 100%; } }

  /* 5. Soft rotating glow halo behind the pill */
  .glow-pill-halo::before {
    content: "";
    position: absolute;
    inset: -8px;
    border-radius: 999px;
    background: conic-gradient(from 0deg, transparent 0deg, rgba(40,223,232,0.55) 60deg, transparent 150deg, transparent 360deg);
    filter: blur(6px);
    animation: glowspin 5s linear infinite;
    z-index: -1;
  }

  @media (prefers-reduced-motion: reduce) {
    .glow-orbit-dot::before, .glow-orbit-dot::after,
    .comet-ring, .arc-ring, .glow-pill-dot::after, .glow-pill-halo::before {
      animation: none;
    }
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
