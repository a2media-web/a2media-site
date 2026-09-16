"use client";

/* Video Growth Engine — "starting at" price display, 4 variants.
   Each shown inside a fake Engine card so you can see how the price
   cluster reads at real scale.  Copy locked, only the price treatment
   differs. */

import React from "react";

const NIGHT = "#0D0536";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";
const PURPLE = "#5A33FF";

function EngineCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={S.card}>
      <span style={S.badge}>MONTHLY</span>
      <h3 style={S.planName}>Video Growth Engine</h3>
      <div style={S.pricingArea}>{children}</div>
      <p style={S.desc}>
        We run your whole video department. Script to screen.
      </p>
      <div style={S.chipRow}>
        <div style={S.mockLabel}>{label}</div>
      </div>
    </div>
  );
}

/* ---------- 4 variants ---------- */

function V1PrefixStack() {
  return (
    <>
      <div style={S.tinyEyebrow}>Starting at</div>
      <div style={S.priceBig}>$15K</div>
      <div style={S.priceUnit}>/ month</div>
    </>
  );
}

function V2PlusInline() {
  return (
    <>
      <div style={S.priceBig}>
        $15K
        <span style={{ color: TEAL, fontWeight: 800, fontSize: "0.7em", verticalAlign: "0.15em", marginLeft: 2 }}>
          +
        </span>
      </div>
      <div style={S.priceUnit}>/ month · scales with scope</div>
    </>
  );
}

function V3TealPrefixInline() {
  return (
    <>
      <div style={S.priceRow}>
        <span style={S.priceInlinePrefix}>from</span>
        <span style={S.priceBig}>$15K</span>
      </div>
      <div style={S.priceUnit}>/ month · up to $40K for full engagements</div>
    </>
  );
}

function V4RangeReframed() {
  return (
    <>
      <div style={S.priceBig}>
        $15K
        <span style={S.priceSmallRange}>&nbsp;to $40K</span>
      </div>
      <div style={S.priceUnit}>
        / month · <span style={{ color: TEAL, fontWeight: 700 }}>starts at $15K</span>
      </div>
    </>
  );
}

/* ---------- Page ---------- */

export default function Page() {
  return (
    <main style={S.page}>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview · pricing display</p>
        <h1 style={S.pageTitle}>
          Video Growth Engine · <em style={{ color: TEAL, fontStyle: "italic" }}>&ldquo;starting at&rdquo;</em> · 4 options
        </h1>
        <p style={S.pageLede}>
          Same plan, same features, four ways to make the entry price more
          obvious than the current &ldquo;$15-40K&rdquo; range display.
        </p>
      </header>

      <section style={S.grid}>
        <EngineCard label="OPTION 1 — Prefix stack (STARTING AT above price)">
          <V1PrefixStack />
        </EngineCard>

        <EngineCard label="OPTION 2 — $15K+ (teal plus inline)">
          <V2PlusInline />
        </EngineCard>

        <EngineCard label='OPTION 3 — "from" prefix inline'>
          <V3TealPrefixInline />
        </EngineCard>

        <EngineCard label="OPTION 4 — Range kept, reframed with teal callout">
          <V4RangeReframed />
        </EngineCard>
      </section>

      <div style={S.notes}>
        <p>
          <strong style={{ color: NEON }}>My pick:</strong> Option 1 (prefix stack).
          The tiny &ldquo;STARTING AT&rdquo; label above the big $15K makes the
          entry price unmistakable, and dropping the &ldquo;-40K&rdquo; from the price
          removes sticker shock in the ~2 seconds Christina scans the card.
          Ceiling info can live in the &ldquo;What&apos;s included&rdquo; drawer or
          a &ldquo;scales to $40K for full engagements&rdquo; sub-line beneath.
        </p>
      </div>
    </main>
  );
}

/* ---------- styles ---------- */

const S = {
  page: {
    background: "#07021F",
    minHeight: "100vh",
    padding: "48px 32px 100px",
    fontFamily: "var(--a2-sans, system-ui)",
    color: "#fff",
  } as React.CSSProperties,
  pageHead: {
    textAlign: "center" as const,
    marginBottom: 44,
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

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 20,
    maxWidth: 1300,
    margin: "0 auto",
  } as React.CSSProperties,

  card: {
    background: `linear-gradient(180deg, ${NIGHT}, #07021F)`,
    borderTop: `3px solid ${PURPLE}`,
    border: "1px solid rgba(90,51,255,0.35)",
    borderRadius: 18,
    padding: 28,
    display: "flex",
    flexDirection: "column" as const,
    minHeight: 340,
  } as React.CSSProperties,
  badge: {
    alignSelf: "flex-start" as const,
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.14em",
    color: PURPLE,
    border: `1px solid ${PURPLE}66`,
    borderRadius: 999,
    padding: "4px 10px",
    marginBottom: 14,
  } as React.CSSProperties,
  planName: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: "-0.01em",
    margin: "0 0 14px",
    color: "#fff",
  } as React.CSSProperties,

  pricingArea: {
    marginBottom: 18,
    minHeight: 84,
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,
  tinyEyebrow: {
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: TEAL,
    marginBottom: 2,
  } as React.CSSProperties,
  priceBig: {
    fontSize: 44,
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    color: "#fff",
    fontVariantNumeric: "tabular-nums" as const,
  } as React.CSSProperties,
  priceUnit: {
    marginTop: 6,
    fontSize: 12.5,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: "0.02em",
  } as React.CSSProperties,
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
  } as React.CSSProperties,
  priceInlinePrefix: {
    fontSize: 14,
    fontWeight: 800,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: TEAL,
  } as React.CSSProperties,
  priceSmallRange: {
    fontSize: 20,
    fontWeight: 500,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: "-0.01em",
  } as React.CSSProperties,

  desc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.72)",
    lineHeight: 1.5,
    margin: "0 0 18px",
    flex: 1,
  } as React.CSSProperties,
  chipRow: {
    marginTop: "auto",
  } as React.CSSProperties,
  mockLabel: {
    display: "inline-block",
    padding: "5px 11px",
    background: "rgba(102,247,142,0.12)",
    border: `1px solid ${NEON}55`,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: NEON,
  } as React.CSSProperties,

  notes: {
    marginTop: 60,
    maxWidth: 820,
    marginInline: "auto",
    padding: "22px 26px",
    background: "rgba(102,247,142,0.06)",
    border: `1px dashed ${NEON}44`,
    borderRadius: 14,
    fontSize: 13.5,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.78)",
  } as React.CSSProperties,
};
