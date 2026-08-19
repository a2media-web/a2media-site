"use client";

/* Partners section mockups — 5 different intensities/placements for showing
   A2 Media's tool/platform partnerships. Ranges from "small footer strip"
   (least intrusive) to "full homepage section" (most prominent).

   Placeholder partner names — Ademola should confirm which are actual formal
   partnerships (certified, referral, co-marketing) vs. just tools A2 uses. */

import React from "react";

const NIGHT = "#0D0536";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";
const PURPLE = "#5A33FF";

// Placeholder — Ademola to confirm which are real partnerships
const PARTNERS = [
  { name: "Wistia",       kind: "Video hosting" },
  { name: "HubSpot",      kind: "CRM / marketing" },
  { name: "ConvertKit",   kind: "Email" },
  { name: "Notion",       kind: "Docs / PM" },
  { name: "Frame.io",     kind: "Video review" },
  { name: "Slack",        kind: "Comms" },
];

// Simple text-logo placeholder — replace with real SVG/PNG logos when shipping
function TextLogo({ name, size = 16 }: { name: string; size?: number }) {
  return (
    <span
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 700,
        letterSpacing: "-0.01em",
        fontSize: size,
        color: "rgba(255,255,255,0.85)",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
  );
}

function Shell({
  label,
  variant,
  note,
  children,
}: {
  label: string;
  variant: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <div style={S.headRow}>
          <span style={S.mockLabel}>{label}</span>
          <span style={S.variantChip}>{variant}</span>
        </div>
        {note && <p style={S.note}>{note}</p>}
        <div style={S.contextFrame}>{children}</div>
      </div>
    </section>
  );
}

/* ---------- V1: Compact footer strip ---------- */

function V1FooterStrip() {
  return (
    <div style={S.footerContext}>
      <p style={S.footerContextLabel}>↓ imagine the footer here</p>
      <div style={S.footerStrip}>
        <span style={S.stripLabel}>Certified partners</span>
        <div style={S.stripLogos}>
          {PARTNERS.slice(0, 5).map((p) => (
            <TextLogo key={p.name} name={p.name} size={14} />
          ))}
        </div>
      </div>
      <div style={S.footerBottom}>
        <span style={S.copyText}>© 2026 A2 Media · All rights reserved</span>
      </div>
    </div>
  );
}

/* ---------- V2: Homepage section (traditional) ---------- */

function V2HomepageSection() {
  return (
    <div style={S.homeSection}>
      <p style={S.homeEyebrow}>Where we live</p>
      <h2 style={S.homeHeading}>
        The stack <em style={{ color: TEAL, fontFamily: "var(--a2-display, Georgia, serif)" }}>we speak fluently.</em>
      </h2>
      <p style={S.homeSub}>
        Formal partnerships with the tools your buyers already use.
      </p>
      <div style={S.homeGrid}>
        {PARTNERS.map((p) => (
          <div key={p.name} style={S.homeCell}>
            <TextLogo name={p.name} size={17} />
            <span style={S.homeCellKind}>{p.kind}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- V3: Chip strip below testimonials ---------- */

function V3ChipStrip() {
  return (
    <div style={S.chipContext}>
      <p style={S.chipContextLabel}>↓ testimonials would end here, then this appears</p>
      <div style={S.chipRow}>
        <span style={S.chipLabel}>Deep integrations with</span>
        <div style={S.chipLogos}>
          {PARTNERS.map((p) => (
            <span key={p.name} style={S.chip}>
              <TextLogo name={p.name} size={13} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- V4: Bento constellation ---------- */

function V4Bento() {
  return (
    <div style={S.bentoSection}>
      <p style={S.homeEyebrow}>Our native habitat</p>
      <h2 style={S.homeHeading}>
        We already <em style={{ color: TEAL, fontFamily: "var(--a2-display, Georgia, serif)" }}>speak your stack.</em>
      </h2>
      <div style={S.bentoGrid}>
        {PARTNERS.map((p, i) => (
          <div
            key={p.name}
            style={{
              ...S.bentoCell,
              gridColumn: i === 0 ? "span 2" : "span 1",
              gridRow: i === 0 ? "span 2" : "span 1",
              minHeight: i === 0 ? 180 : 88,
            }}
          >
            <TextLogo name={p.name} size={i === 0 ? 26 : 16} />
            <span style={S.bentoKind}>{p.kind}</span>
            {i === 0 && (
              <span style={S.bentoPartnerTag}>Certified partner</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- V5: Vertical rail (right edge of ScrubReel) ---------- */

function V5VerticalRail() {
  return (
    <div style={S.railContext}>
      <div style={S.railBody}>
        <span style={S.railBodyLabel}>ScrubReel content here</span>
      </div>
      <div style={S.rail}>
        <span style={S.railTitle}>Partners</span>
        <div style={S.railStack}>
          {PARTNERS.slice(0, 4).map((p) => (
            <div key={p.name} style={S.railCell}>
              <TextLogo name={p.name} size={12} />
            </div>
          ))}
          <span style={S.railMore}>+2 more</span>
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
        <p style={S.pageEyebrow}>Mockup preview · partners</p>
        <h1 style={S.pageTitle}>
          Partners · <em style={{ color: TEAL }}>5 intensities</em>
        </h1>
        <p style={S.pageLede}>
          Ranked from least intrusive (small footer strip) to most prominent
          (full homepage section). Only include if you have{" "}
          <strong style={{ color: NEON }}>real formal partnerships</strong> —
          otherwise it reads as filler.
        </p>
      </header>

      <Shell
        label="OPTION 1"
        variant="Footer strip (my pick — see notes)"
        note='Sits in the footer above the copyright line. "Certified partners" label + 5 logos. Least intrusive. Only signals credibility to people who scroll all the way down.'
      >
        <V1FooterStrip />
      </Shell>

      <Shell
        label="OPTION 2"
        variant="Full homepage section (most prominent)"
        note="Its own section between existing homepage sections. Full title + subhead + logo grid with role labels. Highest visibility, biggest scroll tax. Only worth it if partnerships are genuinely a differentiator."
      >
        <V2HomepageSection />
      </Shell>

      <Shell
        label="OPTION 3"
        variant="Chip strip under Testimonials"
        note="Single-line inline chip row. Small label + 6 partner chips. Sits at the end of a related section (Testimonials, ClientTestimonials, or Guarantee). Adds signal without adding a new section."
      >
        <V3ChipStrip />
      </Shell>

      <Shell
        label="OPTION 4"
        variant="Bento constellation (most designed)"
        note="One partner (the marquee cert — Wistia?) gets a hero 2×2 cell with 'Certified partner' badge. Others in smaller cells. Most visually distinctive. Best for a dedicated /partners page rather than the homepage."
      >
        <V4Bento />
      </Shell>

      <Shell
        label="OPTION 5"
        variant="Vertical rail (right edge of ScrubReel)"
        note="Subtle vertical strip pinned to the right edge of an existing section (ScrubReel or Receipts). Reads as an ambient badge, not a section. Might get missed but doesn't compete for attention."
      >
        <V5VerticalRail />
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
    marginBottom: 12,
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
  note: {
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.55,
    margin: "0 0 20px",
    fontStyle: "italic" as const,
    maxWidth: 720,
  } as React.CSSProperties,
  contextFrame: {
    padding: 0,
    border: "1px dashed rgba(255,255,255,0.1)",
    borderRadius: 16,
    background: "rgba(0,0,0,0.2)",
    overflow: "hidden" as const,
  } as React.CSSProperties,

  // V1 — footer strip
  footerContext: {
    padding: "24px 28px 20px",
  } as React.CSSProperties,
  footerContextLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    fontStyle: "italic" as const,
    margin: "0 0 32px",
  } as React.CSSProperties,
  footerStrip: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    padding: "16px 0",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  stripLabel: {
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.5)",
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,
  stripLogos: {
    display: "flex",
    gap: 28,
    flexWrap: "wrap" as const,
    alignItems: "center",
  } as React.CSSProperties,
  footerBottom: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as React.CSSProperties,
  copyText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  } as React.CSSProperties,

  // V2 — full homepage section
  homeSection: {
    padding: "56px 40px",
    textAlign: "center" as const,
  } as React.CSSProperties,
  homeEyebrow: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: TEAL,
    margin: "0 0 14px",
  } as React.CSSProperties,
  homeHeading: {
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "#fff",
    margin: 0,
    textWrap: "balance" as const,
  } as React.CSSProperties,
  homeSub: {
    fontSize: 15,
    color: "rgba(255,255,255,0.65)",
    margin: "14px auto 36px",
    maxWidth: 500,
  } as React.CSSProperties,
  homeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 12,
    marginTop: 8,
  } as React.CSSProperties,
  homeCell: {
    padding: "20px 16px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 6,
    transition: "border-color 200ms",
  } as React.CSSProperties,
  homeCellKind: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: "0.04em",
  } as React.CSSProperties,

  // V3 — chip strip
  chipContext: {
    padding: "24px 28px",
  } as React.CSSProperties,
  chipContextLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    fontStyle: "italic" as const,
    margin: "0 0 22px",
    textAlign: "center" as const,
  } as React.CSSProperties,
  chipRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap" as const,
    justifyContent: "center",
    padding: "18px 0",
  } as React.CSSProperties,
  chipLabel: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.5)",
  } as React.CSSProperties,
  chipLogos: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap" as const,
    justifyContent: "center",
  } as React.CSSProperties,
  chip: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 12px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 999,
  } as React.CSSProperties,

  // V4 — bento
  bentoSection: {
    padding: "48px 40px",
    textAlign: "center" as const,
  } as React.CSSProperties,
  bentoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginTop: 28,
  } as React.CSSProperties,
  bentoCell: {
    padding: "22px 18px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
    position: "relative" as const,
  } as React.CSSProperties,
  bentoKind: {
    fontSize: 11,
    color: "rgba(255,255,255,0.45)",
    letterSpacing: "0.04em",
  } as React.CSSProperties,
  bentoPartnerTag: {
    fontSize: 9.5,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: TEAL,
    background: "rgba(40,223,232,0.14)",
    border: `1px solid ${TEAL}55`,
    borderRadius: 999,
    padding: "3px 8px",
    alignSelf: "flex-start" as const,
    marginTop: 4,
  } as React.CSSProperties,

  // V5 — vertical rail
  railContext: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    minHeight: 220,
  } as React.CSSProperties,
  railBody: {
    padding: "32px 32px 32px 40px",
    display: "flex",
    alignItems: "center",
    background: "rgba(90,51,255,0.04)",
  } as React.CSSProperties,
  railBodyLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
    fontStyle: "italic" as const,
  } as React.CSSProperties,
  rail: {
    borderLeft: "1px solid rgba(255,255,255,0.1)",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 14,
    background: "rgba(0,0,0,0.15)",
    minWidth: 130,
  } as React.CSSProperties,
  railTitle: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: TEAL,
    writingMode: "horizontal-tb" as const,
  } as React.CSSProperties,
  railStack: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  } as React.CSSProperties,
  railCell: {
    padding: "7px 10px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 6,
  } as React.CSSProperties,
  railMore: {
    fontSize: 10,
    color: "rgba(255,255,255,0.4)",
    marginTop: 4,
  } as React.CSSProperties,
};
