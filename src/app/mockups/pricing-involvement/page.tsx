"use client";

/* Pricing "involvement scale" — 3 ways to add the classic "the more you touch
   it, the more it costs" agency joke under the existing pricing section.

   Each variant is shown inside a dashed "context" frame that also displays a
   fake "3 pricing cards row" above so you can see how the joke sits BELOW
   the actual pricing plans, not competing with them. */

import React from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";

function FakePricingRow() {
  return (
    <div style={S.pricingRow}>
      {["One-off Video · $3K", "2-Week Jumpstart · $8K", "Video Growth Engine · $15-35K/mo"].map((label) => (
        <div key={label} style={S.fakeCard}>
          <span style={S.fakeCardText}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function Shell({
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
      <div style={S.inner}>
        <div style={S.headRow}>
          <span style={S.mockLabel}>{label}</span>
          <span style={S.variantChip}>{variant}</span>
        </div>
        <div style={S.contextFrame}>
          <FakePricingRow />
          <div style={{ marginTop: 36 }}>{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3 variants ---------- */

function V1MiniPriceList() {
  return (
    <div style={S.listWrap}>
      <div style={S.listEyebrow}>The involvement scale</div>
      <ul style={S.list}>
        <li style={S.listItem}>
          <span style={S.listTier}>You let us cook</span>
          <span style={S.listPrice}>base price</span>
        </li>
        <li style={S.listItem}>
          <span style={S.listTier}>You want to co-write scripts</span>
          <span style={{ ...S.listPrice, color: TEAL }}>+$2K</span>
        </li>
        <li style={S.listItem}>
          <span style={S.listTier}>You want to approve every frame</span>
          <span style={{ ...S.listPrice, color: TEAL }}>+$5K</span>
        </li>
        <li style={S.listItem}>
          <span style={S.listTier}>Your CMO has &ldquo;just a few notes&rdquo;</span>
          <span style={{ ...S.listPrice, color: TEAL }}>2x</span>
        </li>
      </ul>
      <p style={S.listFoot}>* Joking (mostly).</p>
    </div>
  );
}

function V2FinePrint() {
  return (
    <div style={S.finePrintWrap}>
      <span style={S.finePrintIcon} aria-hidden>⚠︎</span>
      <p style={S.finePrintText}>
        Base prices assume you&apos;ll let us do our jobs. Micromanagement is billed at{" "}
        <span style={{ color: TEAL, fontWeight: 700 }}>$500/hr</span>.
      </p>
    </div>
  );
}

function V3EscalationLadder() {
  const rungs = [
    { tier: "Hands off", price: "base price", accent: false },
    { tier: "Weekly check-ins", price: "+10%", accent: true },
    { tier: "Approve every script", price: "+30%", accent: true },
    { tier: "Rewrite every draft", price: "2x", accent: true },
    {
      tier: "Do it yourself",
      price: "we'll be here when you hire us back",
      accent: false,
      kicker: true,
    },
  ];
  return (
    <div style={S.ladderWrap}>
      <div style={S.ladderTitle}>How involved do you want to be?</div>
      <div style={S.ladderRows}>
        {rungs.map((r, i) => (
          <div key={i} style={{
            ...S.ladderRow,
            ...(r.kicker ? { borderTop: `1px solid ${TEAL}55`, marginTop: 8, paddingTop: 14 } : {}),
          }}>
            <span style={S.ladderTier}>
              <span style={{ opacity: 0.5, marginRight: 8, fontVariantNumeric: "tabular-nums" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {r.tier}
            </span>
            <span
              style={{
                ...S.ladderPrice,
                color: r.accent ? TEAL : (r.kicker ? NEON : "rgba(255,255,255,0.65)"),
                fontStyle: r.kicker ? "italic" : "normal",
                fontFamily: r.kicker ? "var(--a2-display, Georgia, serif)" : "var(--a2-sans, system-ui)",
              }}
            >
              {r.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function Page() {
  return (
    <main style={{ background: "#07021F" }}>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview · pricing footnote</p>
        <h1 style={S.pageTitle}>
          The <em style={{ color: TEAL }}>involvement scale</em> · 3 versions
        </h1>
        <p style={S.pageLede}>
          Riffing on the classic &ldquo;We design everything: $500 / You design everything: $8,000&rdquo;
          agency joke. Placed BELOW the pricing cards so it&apos;s discoverable
          but doesn&apos;t compete with the actual plans.
        </p>
      </header>

      <Shell label="OPTION 1" variant="Mini price list (direct riff on source photo)">
        <V1MiniPriceList />
      </Shell>

      <Shell label="OPTION 2" variant="Fine-print warning (easter-egg style)">
        <V2FinePrint />
      </Shell>

      <Shell label="OPTION 3" variant="Escalation ladder with kicker">
        <V3EscalationLadder />
      </Shell>
    </main>
  );
}

/* ---------- styles ---------- */

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
    maxWidth: 720,
    lineHeight: 1.55,
  } as React.CSSProperties,

  section: {
    background: NIGHT,
    color: "#fff",
    padding: "48px 32px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,
  inner: { maxWidth: 1080, margin: "0 auto" } as React.CSSProperties,
  headRow: {
    display: "flex",
    gap: 12,
    marginBottom: 20,
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
    color: "#fff",
  } as React.CSSProperties,

  contextFrame: {
    padding: 28,
    border: "1px dashed rgba(255,255,255,0.1)",
    borderRadius: 16,
    background: "rgba(0,0,0,0.2)",
  } as React.CSSProperties,

  // Fake pricing row (for context)
  pricingRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  } as React.CSSProperties,
  fakeCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "18px 16px",
    textAlign: "center" as const,
    minHeight: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  fakeCardText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "0.04em",
  } as React.CSSProperties,

  // Option 1 — mini price list
  listWrap: {
    maxWidth: 640,
    margin: "0 auto",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: "24px 28px",
  } as React.CSSProperties,
  listEyebrow: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: TEAL,
    marginBottom: 16,
    textAlign: "center" as const,
  } as React.CSSProperties,
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
  } as React.CSSProperties,
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "12px 4px",
    borderBottom: "1px dotted rgba(255,255,255,0.08)",
    gap: 20,
  } as React.CSSProperties,
  listTier: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,
  listPrice: {
    fontSize: 13.5,
    fontWeight: 700,
    color: "rgba(255,255,255,0.65)",
    fontFamily: "var(--a2-sans, system-ui)",
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums" as const,
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,
  listFoot: {
    marginTop: 14,
    fontSize: 11.5,
    color: "rgba(255,255,255,0.4)",
    fontStyle: "italic" as const,
    textAlign: "center" as const,
  } as React.CSSProperties,

  // Option 2 — fine print
  finePrintWrap: {
    maxWidth: 620,
    margin: "0 auto",
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "14px 18px",
    background: "rgba(40,223,232,0.05)",
    border: "1px dashed rgba(40,223,232,0.35)",
    borderRadius: 10,
  } as React.CSSProperties,
  finePrintIcon: {
    fontSize: 16,
    color: TEAL,
    lineHeight: 1.4,
    flexShrink: 0,
  } as React.CSSProperties,
  finePrintText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.72)",
    lineHeight: 1.5,
    margin: 0,
    fontStyle: "italic" as const,
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,

  // Option 3 — escalation ladder
  ladderWrap: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "20px 24px 22px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
  } as React.CSSProperties,
  ladderTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 14,
    textAlign: "center" as const,
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,
  ladderRows: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,
  ladderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "8px 4px",
    gap: 20,
  } as React.CSSProperties,
  ladderTier: {
    fontSize: 13.5,
    color: "rgba(255,255,255,0.88)",
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,
  ladderPrice: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums" as const,
  } as React.CSSProperties,
};
