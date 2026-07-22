"use client";

/* Hero copy v2 mockups — 4 variations of the new hero to compare visually.
   Same H1 across all four. Two sub copy versions × two visual treatments.

   Treatment A (Understated): H1 plain sans, sub plain white.
   Treatment B (Editorial accent): "cooler" in italic serif, key sub phrases
     picked out in italic serif Neon.

   Sub 1: shorter, punch closer ("before they even notice")
   Sub 2: longer, adds the objections/fears/2am Google searches triplet
*/

import React from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";

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
        Okta · Shopify · Chili Piper · Crossbeam · <em style={{ fontStyle: "italic", color: NEON }}>Slate</em> · Wishly Group
      </p>
    </div>
  );
}

// -------- H1 renderers --------

function H1Understated() {
  return (
    <h1 style={S.title}>
      <span style={S.titleLine}>Going viral is cool.</span>
      <span style={S.titleLine}>Making money is cooler.</span>
    </h1>
  );
}

function H1Editorial() {
  return (
    <h1 style={S.title}>
      <span style={S.titleLine}>Going viral is cool.</span>
      <span style={S.titleLine}>
        Making money is <span style={S.teal}>cooler.</span>
      </span>
    </h1>
  );
}

// -------- Sub renderers --------

function SubFinal() {
  return (
    <p style={S.sub}>
      We study the shit out of your buyers. Then ideate and edit videos that sell them before they even notice.
    </p>
  );
}

// -------- Hero shell --------

function HeroShell({
  label,
  variant,
  h1,
  sub,
}: {
  label: string;
  variant: string;
  h1: React.ReactNode;
  sub: React.ReactNode;
}) {
  return (
    <section style={S.section}>
      <div style={S.aurora} aria-hidden />
      <div style={S.veil} aria-hidden />
      <div style={S.body}>
        <div style={S.headRow}>
          <span style={S.mockLabel}>{label}</span>
          <span style={S.variantChip}>{variant}</span>
        </div>
        <p style={S.eyebrow}>
          <span style={S.dot} aria-hidden />
          600+ Sales-Driven Videos for B2B SaaS Teams
        </p>
        {h1}
        {sub}
        <Ctas />
        <TrustRow />
      </div>
    </section>
  );
}

// -------- Page --------

export default function Page() {
  return (
    <main style={{ background: "#07021F" }}>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview</p>
        <h1 style={S.pageTitle}>
          Hero copy v2 · <em style={S.italicAccent}>4 mockups</em>
        </h1>
        <p style={S.pageLede}>
          Same headline across all four. <strong>Sub 1</strong> is your shorter
          version ("before they even notice"). <strong>Sub 2</strong> is the
          longer version with the objections/fears/2am Google searches triplet.
          Each shown in two visual treatments so you can see how emphasis lands.
        </p>
      </header>

      <HeroShell
        label="TREATMENT A"
        variant="Understated"
        h1={<H1Understated />}
        sub={<SubFinal />}
      />

      <HeroShell
        label="TREATMENT B"
        variant='"cooler" in teal'
        h1={<H1Editorial />}
        sub={<SubFinal />}
      />
    </main>
  );
}

// -------- Styles --------

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
    background: `radial-gradient(ellipse at 40% 20%, #1A0F4D 0%, ${NIGHT} 55%, #07021F 100%)`,
    color: "#fff",
    padding: "clamp(80px, 8vw, 140px) clamp(20px, 5vw, 64px) clamp(70px, 6vw, 100px)",
    overflow: "hidden" as const,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    fontFamily: "var(--a2-sans, system-ui)",
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,
  aurora: {
    position: "absolute" as const,
    inset: "-10%",
    zIndex: 0,
    pointerEvents: "none" as const,
    background:
      `radial-gradient(700px 320px at 22% 25%, rgba(90,51,255,0.28) 0%, transparent 65%),` +
      `radial-gradient(600px 280px at 78% 75%, rgba(143,69,238,0.2) 0%, transparent 70%)`,
    filter: "blur(10px)",
  } as React.CSSProperties,
  veil: {
    position: "absolute" as const,
    inset: 0,
    background: "linear-gradient(180deg, rgba(7,2,31,0.2), rgba(7,2,31,0.55))",
    pointerEvents: "none" as const,
  } as React.CSSProperties,

  body: {
    position: "relative" as const,
    zIndex: 1,
    width: "100%",
    maxWidth: 1080,
    margin: "0 auto",
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
    background: "rgba(143,69,238,0.14)",
    border: `1px solid ${LILAC}55`,
    borderRadius: 999,
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: "#fff",
    fontStyle: "italic" as const,
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
    fontSize: "clamp(38px, 6vw, 72px)",
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
  italicAccent: {
    fontFamily: "var(--a2-display, Georgia, serif)",
    fontStyle: "italic" as const,
    fontWeight: 500,
    color: LILAC,
  } as React.CSSProperties,
  teal: {
    color: TEAL,
  } as React.CSSProperties,

  sub: {
    fontSize: "clamp(17px, 1.5vw, 20px)",
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.82)",
    margin: "0 0 30px",
    maxWidth: 720,
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,
  subAccent: {
    fontFamily: "var(--a2-display, Georgia, serif)",
    fontStyle: "italic" as const,
    fontWeight: 500,
    color: NEON,
    fontSize: "1.02em",
  } as React.CSSProperties,

  ctas: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap" as const,
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
    fontFamily: "var(--a2-sans, system-ui)",
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
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,

  trust: {
    marginTop: 8,
  } as React.CSSProperties,
  trustLabel: {
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.55)",
    margin: "0 0 8px",
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,
  trustList: {
    fontSize: 14,
    color: "rgba(255,255,255,0.65)",
    margin: 0,
    letterSpacing: "0.02em",
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,
};
