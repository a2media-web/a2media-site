"use client";

/* Pricing letterboard — 5 variants of the "the more you touch it, the more
   it costs" joke, styled to look like the reference photo (physical letterboard
   sign behind glass: near-black background, bold uppercase sans, wide letter-
   spacing, two-column tier/price layout, subtle glass reflection).

   Placement: sits under the actual pricing plan cards on a2media.ca. */

import React from "react";

const NIGHT = "#0D0536";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";

type Row = { tier: string; price: string; kicker?: boolean };

function Letterboard({
  title,
  rows,
  footer,
}: {
  title: string;
  rows: Row[];
  footer?: string;
}) {
  return (
    <div style={S.boardShell}>
      <div style={S.boardGlare} aria-hidden />
      <div style={S.board}>
        <div style={S.boardTitle}>{title}</div>
        <div style={S.divider} aria-hidden />
        <div style={S.rows}>
          {rows.map((r, i) => (
            <div
              key={i}
              style={{
                ...S.row,
                ...(r.kicker
                  ? {
                      borderTop: "1px dashed rgba(255,255,255,0.22)",
                      paddingTop: 12,
                      marginTop: 8,
                    }
                  : {}),
              }}
            >
              <span style={S.tier}>{r.tier}</span>
              <span style={S.dotSpacer} aria-hidden />
              <span style={{ ...S.price, ...(r.kicker ? S.priceKicker : {}) }}>
                {r.price}
              </span>
            </div>
          ))}
        </div>
        {footer && <div style={S.boardFooter}>{footer}</div>}
      </div>
    </div>
  );
}

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
          <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5 variants ---------- */

function V1DirectRiff() {
  return (
    <Letterboard
      title="Secret Price List"
      rows={[
        { tier: "We do everything", price: "as advertised" },
        { tier: "We do most, you weigh in", price: "+$1K" },
        { tier: "50/50", price: "+$3K" },
        { tier: "You do most, we help", price: "+$6K" },
        { tier: "You do it yourself", price: "hire us next quarter", kicker: true },
      ]}
      footer="* Joking. (Mostly.)"
    />
  );
}

function V2InvolvementTax() {
  return (
    <Letterboard
      title="The Involvement Tax"
      rows={[
        { tier: "You let us cook", price: "as advertised" },
        { tier: "You want daily updates", price: "+$1K/mo" },
        { tier: "You want to approve every frame", price: "+$3K/mo" },
        { tier: "Your CMO has 'just a few notes'", price: "2x", kicker: true },
      ]}
    />
  );
}

function V3MeetingMenu() {
  return (
    <Letterboard
      title="Meeting Price List"
      rows={[
        { tier: "Kickoff + delivery", price: "as advertised" },
        { tier: "Weekly syncs", price: "+$1K / mo" },
        { tier: "Daily standups", price: "+$3K / mo" },
        { tier: "'Just one more call'", price: "priceless", kicker: true },
      ]}
      footer="* Yes we're serious about the last one."
    />
  );
}

function V4Punchline() {
  return (
    <Letterboard
      title="The Real Pricing"
      rows={[
        { tier: "Trust", price: "1x" },
        { tier: "Committee", price: "2x" },
        { tier: "DIY", price: "hire us next quarter", kicker: true },
      ]}
    />
  );
}

function V5FinePrint() {
  return (
    <Letterboard
      title="Fine Print"
      rows={[
        { tier: "Standard scope", price: "as posted" },
        { tier: "+ Weekly opinions", price: "+10%" },
        { tier: "+ Founder is 'hands-on'", price: "+25%" },
        { tier: "+ Rewriting our drafts", price: "+50%" },
        { tier: "+ 'Can we try...?' (each)", price: "+$500" },
      ]}
    />
  );
}

/* V6 — the exact "right energy" line rendered on a letterboard. Two-part:
   quiet assumption on top, specific consequence on the bottom. */
function V6TheEnergy() {
  return (
    <div style={S.boardShell}>
      <div style={S.boardGlare} aria-hidden />
      <div style={S.board}>
        <div style={S.boardTitle}>House Rules</div>
        <div style={S.divider} aria-hidden />
        <p style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: 13.5,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          color: "#F4F1EA",
          textAlign: "center" as const,
          lineHeight: 1.6,
          margin: "0 0 22px",
          textShadow: "0 1px 0 rgba(0,0,0,0.5)",
        }}>
          Base prices assume you&apos;ll let us do our jobs.
        </p>
        <div style={S.divider} aria-hidden />
        <div style={{ ...S.row, marginTop: 18, padding: 0 }}>
          <span style={S.tier}>Micromanagement</span>
          <span style={S.dotSpacer} aria-hidden />
          <span style={{ ...S.price, color: TEAL }}>$500 / hr</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function Page() {
  return (
    <main style={{ background: "#07021F" }}>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview · letterboard pricing</p>
        <h1 style={S.pageTitle}>
          Secret <em style={{ color: TEAL }}>price list</em> · 5 letterboard versions
        </h1>
        <p style={S.pageLede}>
          All five styled to feel like the reference photo — physical
          letterboard sign, wide-spaced caps, two-column tier/price layout,
          subtle glass reflection. Only the copy + tier count differ.
        </p>
      </header>

      <Shell label="OPTION 1" variant="Direct riff (5 tiers, closest to source)">
        <V1DirectRiff />
      </Shell>

      <Shell label="OPTION 2" variant="The Involvement Tax (CMO-targeted)">
        <V2InvolvementTax />
      </Shell>

      <Shell label="OPTION 3" variant="Meeting Menu (calls out call-heavy clients)">
        <V3MeetingMenu />
      </Shell>

      <Shell label="OPTION 4" variant="Punchline (3 lines, shortest)">
        <V4Punchline />
      </Shell>

      <Shell label="OPTION 5" variant="Fine Print (line-item ledger)">
        <V5FinePrint />
      </Shell>

      <Shell label="OPTION 6" variant="THE ENERGY — 'assume + consequence' on letterboard">
        <V6TheEnergy />
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

  // Letterboard sign
  boardShell: {
    position: "relative" as const,
    width: "100%",
    maxWidth: 620,
    borderRadius: 12,
    background: "#141414",
    border: "8px solid #0a0a0a",
    boxShadow:
      "0 24px 60px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)",
    overflow: "hidden" as const,
  } as React.CSSProperties,
  boardGlare: {
    position: "absolute" as const,
    inset: 0,
    background:
      "linear-gradient(115deg, rgba(255,255,255,0.05) 0%, transparent 30%, transparent 55%, rgba(255,255,255,0.04) 70%, transparent 100%)",
    pointerEvents: "none" as const,
    zIndex: 2,
  } as React.CSSProperties,
  board: {
    position: "relative" as const,
    zIndex: 1,
    padding: "32px 34px 30px",
    // Subtle horizontal ridging like a letterboard's grooves
    backgroundImage:
      "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px)",
  } as React.CSSProperties,
  boardTitle: {
    fontFamily: "Impact, 'Arial Black', 'Helvetica Neue', sans-serif",
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "#F4F1EA",
    textAlign: "center" as const,
    marginBottom: 6,
    textShadow: "0 1px 0 rgba(0,0,0,0.6)",
  } as React.CSSProperties,
  divider: {
    height: 1,
    background:
      "linear-gradient(90deg, transparent, rgba(244,241,234,0.28), transparent)",
    margin: "10px 0 18px",
  } as React.CSSProperties,
  rows: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 2,
  } as React.CSSProperties,
  row: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    padding: "7px 0",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  } as React.CSSProperties,
  tier: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#F4F1EA",
    whiteSpace: "nowrap" as const,
    textShadow: "0 1px 0 rgba(0,0,0,0.5)",
  } as React.CSSProperties,
  dotSpacer: {
    flex: 1,
    borderBottom: "1px dotted rgba(244,241,234,0.22)",
    transform: "translateY(-3px)",
  } as React.CSSProperties,
  price: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "#F4F1EA",
    whiteSpace: "nowrap" as const,
    textShadow: "0 1px 0 rgba(0,0,0,0.5)",
    fontVariantNumeric: "tabular-nums" as const,
  } as React.CSSProperties,
  priceKicker: {
    color: TEAL,
  } as React.CSSProperties,
  boardFooter: {
    marginTop: 18,
    fontSize: 10.5,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "rgba(244,241,234,0.5)",
    fontStyle: "italic" as const,
    textAlign: "center" as const,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  } as React.CSSProperties,
};
