"use client";

/* Full pricing section with Option 1 ("STARTING AT" prefix stack) applied
   to the Video Growth Engine card. Renders alongside the existing One-off
   and Jumpstart cards + the Direction Call banner so the change can be
   evaluated in context. */

import React, { useState } from "react";

const NIGHT = "#0D0536";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";
const PURPLE = "#5A33FF";

type Plan = {
  key: string;
  name: string;
  price: string;
  unit: string;
  desc: string;
  lead?: string;
  get: string[];
  cta: string;
  accent: string;
  badge: string;
  featured?: boolean;
  ctaFilled?: boolean;
  startingAt?: boolean;
};

const PLANS: Plan[] = [
  {
    key: "oneoff",
    name: "One-off Video",
    price: "$5K",
    unit: "starting price",
    desc: "You tell us the idea or give us raw footage. We make it look expensive.",
    get: [
      "We design and build your videos the A2 way.",
      "One completely edited video, yours to own and post.",
    ],
    cta: "Get Started",
    accent: NEON,
    badge: "ONE-TIME",
  },
  {
    key: "jumpstart",
    name: "2-Week Jumpstart",
    price: "$10K",
    unit: "one-time",
    desc: "We research your buyer, map out 6 months of video, and give you 3 videos to test.",
    get: [
      "A clear content strategy built around your exact ICP",
      "3 high-impact videos you can use immediately",
      "Repeatable series concepts based on what your buyers search for",
      "A roadmap that shows how video will move pipeline",
    ],
    cta: "Get Started",
    accent: NEON,
    badge: "ONE-TIME",
  },
  {
    key: "engine",
    name: "Video Growth Engine",
    price: "$15K",           // ← was "$15-40K"
    unit: "/ month",
    desc: "We run your whole video department. Script to screen.",
    lead: "Everything in the 2-Week Jumpstart, plus:",
    get: [
      "10 to 12 done-for-you videos per month",
      "72-hour turnaround",
      "AEO video ranking",
      "Full-funnel scripts",
      "Videos mapped to every stage of the buyer journey",
      "A dedicated team that learns your voice",
      "Monthly strategy reviews + competitor audits",
      "1:1 executive video coaching for leadership",
    ],
    cta: "See if We're a Fit",
    accent: PURPLE,
    badge: "MONTHLY",
    featured: true,
    ctaFilled: true,
    startingAt: true,       // ← activates prefix stack
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        ...S.card,
        borderTop: `3px solid ${plan.accent}`,
        ...(plan.featured ? S.featured : {}),
      }}
    >
      <span
        style={{
          ...S.badge,
          color: plan.accent,
          border: `1px solid ${plan.accent}66`,
        }}
      >
        {plan.badge}
      </span>
      <h3 style={S.planName}>{plan.name}</h3>

      {/* Pricing cluster — Option 1 applied when plan.startingAt */}
      <div style={S.priceCluster}>
        {plan.startingAt && <div style={S.tinyEyebrow}>Starting at</div>}
        <div style={S.priceRow}>
          <span style={S.priceBig}>{plan.price}</span>
          <span style={S.priceUnit}>{plan.unit}</span>
        </div>
      </div>

      <p style={S.desc}>{plan.desc}</p>

      <div style={S.collapse}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={{
            ...S.collapseHdr,
            borderColor: open ? plan.accent + "55" : "rgba(255,255,255,0.1)",
          }}
        >
          <span style={S.collapseHdrText}>What&apos;s included</span>
          <span style={S.toggle}>{open ? "−" : "+"}</span>
        </button>
        {open && (
          <div style={S.collapseBody}>
            {plan.lead && <div style={S.featLead}>{plan.lead}</div>}
            {plan.get.map((g) => (
              <div key={g} style={S.feat}>
                <span style={{ ...S.chk, color: plan.accent }}>✓</span>
                <span>{g}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />

      <button
        type="button"
        style={{
          ...S.cta,
          ...(plan.ctaFilled
            ? { background: PURPLE, color: "#fff" }
            : { background: "transparent", color: "#fff", border: `1px solid ${plan.accent}` }),
        }}
      >
        {plan.cta}
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <main style={S.page}>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview · full pricing in context</p>
        <h1 style={S.pageTitle}>
          Pricing with <em style={{ color: TEAL, fontStyle: "italic" }}>Starting At</em> on Engine
        </h1>
        <p style={S.pageLede}>
          One-off + Jumpstart unchanged. Engine card uses Option 1 (tiny{" "}
          <span style={{ color: TEAL, fontWeight: 700 }}>STARTING AT</span>{" "}
          eyebrow above the big $15K, drops the -40K max from the display).
        </p>
      </header>

      <section id="mockup-wrap" style={S.section}>
        <div style={S.inner}>
          <h2 style={S.sectionHeading}>
            3 Ways to Work{" "}
            <em style={{ color: TEAL, fontFamily: "var(--a2-display, Georgia, serif)", fontStyle: "italic" }}>
              With Us
            </em>
          </h2>
          <p style={S.sectionIntro}>Our one-time projects credit toward your monthly plan.</p>

          {/* Direction Call banner */}
          <div style={S.directionCall}>
            <div style={{ flex: "1 1 460px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={S.freeBadge}>FREE</span>
                <h3 style={{ ...S.planName, margin: 0, fontSize: 22 }}>The Video Strategy Call</h3>
              </div>
              <p style={{ ...S.desc, margin: "8px 0 0", fontSize: 14.5 }}>
                Even if you don&apos;t work with us, we&apos;ll point you in the right direction.
              </p>
            </div>
            <button
              type="button"
              style={{ ...S.cta, width: "auto", margin: 0, padding: "13px 26px", border: `1px solid ${NEON}`, background: "transparent", color: "#fff" }}
            >
              Book the Call
            </button>
          </div>

          {/* 3 plan cards */}
          <div style={S.grid}>
            {PLANS.map((p) => (
              <PlanCard key={p.key} plan={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- styles ---------- */

const S = {
  page: {
    background: "#07021F",
    minHeight: "100vh",
    fontFamily: "var(--a2-sans, system-ui)",
    color: "#fff",
  } as React.CSSProperties,
  pageHead: {
    padding: "40px 32px 24px",
    textAlign: "center" as const,
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
    fontSize: 28,
    fontWeight: 800,
    margin: "10px 0 10px",
    letterSpacing: "-0.02em",
  } as React.CSSProperties,
  pageLede: {
    fontSize: 13.5,
    color: "rgba(255,255,255,0.72)",
    margin: "0 auto",
    maxWidth: 720,
    lineHeight: 1.55,
  } as React.CSSProperties,

  section: {
    background: NIGHT,
    padding: "72px 32px 96px",
  } as React.CSSProperties,
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    textAlign: "center" as const,
  } as React.CSSProperties,
  sectionHeading: {
    fontSize: "clamp(28px, 3.6vw, 44px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    margin: "0 0 8px",
    color: "#fff",
  } as React.CSSProperties,
  sectionIntro: {
    fontSize: 15.5,
    color: "rgba(255,255,255,0.72)",
    margin: "0 auto 32px",
    maxWidth: 560,
  } as React.CSSProperties,

  directionCall: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap" as const,
    background: "rgba(102,247,142,0.05)",
    border: "1px solid rgba(102,247,142,0.4)",
    borderLeft: `4px solid ${NEON}`,
    borderRadius: 16,
    padding: "20px 26px",
    marginBottom: 20,
    textAlign: "left" as const,
  } as React.CSSProperties,
  freeBadge: {
    display: "inline-block",
    background: NEON,
    color: NIGHT,
    fontWeight: 800,
    letterSpacing: "0.12em",
    borderRadius: 999,
    padding: "3px 10px",
    fontSize: 11,
  } as React.CSSProperties,

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginTop: 20,
    textAlign: "left" as const,
  } as React.CSSProperties,
  card: {
    background: `linear-gradient(180deg, rgba(13,5,54,0.9), #07021F)`,
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 28,
    display: "flex",
    flexDirection: "column" as const,
    minHeight: 460,
  } as React.CSSProperties,
  featured: {
    border: "1px solid rgba(90,51,255,0.55)",
    boxShadow: `0 0 0 1px rgba(90,51,255,0.15), 0 20px 60px rgba(90,51,255,0.15)`,
  } as React.CSSProperties,
  badge: {
    alignSelf: "flex-start" as const,
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.14em",
    borderRadius: 999,
    padding: "4px 10px",
    marginBottom: 14,
  } as React.CSSProperties,
  planName: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: "-0.01em",
    margin: "0 0 12px",
    color: "#fff",
  } as React.CSSProperties,

  priceCluster: {
    display: "flex",
    flexDirection: "column" as const,
    marginBottom: 14,
  } as React.CSSProperties,
  tinyEyebrow: {
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: TEAL,
    marginBottom: 2,
    lineHeight: 1,
  } as React.CSSProperties,
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
  } as React.CSSProperties,
  priceBig: {
    fontSize: 34,
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    color: "#fff",
    fontVariantNumeric: "tabular-nums" as const,
  } as React.CSSProperties,
  priceUnit: {
    fontSize: 12.5,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: "0.02em",
  } as React.CSSProperties,

  desc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.72)",
    lineHeight: 1.5,
    margin: "0 0 18px",
  } as React.CSSProperties,

  collapse: {
    marginBottom: 14,
  } as React.CSSProperties,
  collapseHdr: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    cursor: "pointer",
    color: "#fff",
    fontFamily: "inherit",
  } as React.CSSProperties,
  collapseHdrText: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.06em",
  } as React.CSSProperties,
  toggle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.6)",
  } as React.CSSProperties,
  collapseBody: {
    padding: "14px 6px 6px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  } as React.CSSProperties,
  featLead: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: "rgba(255,255,255,0.55)",
    marginBottom: 4,
  } as React.CSSProperties,
  feat: {
    display: "flex",
    gap: 8,
    fontSize: 13,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.5,
  } as React.CSSProperties,
  chk: {
    fontWeight: 900,
    fontSize: 13,
  } as React.CSSProperties,

  cta: {
    padding: "12px 20px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.02em",
    cursor: "pointer",
    marginTop: 8,
    fontFamily: "inherit",
    border: "none",
  } as React.CSSProperties,
};
