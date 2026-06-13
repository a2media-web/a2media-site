"use client";

/* Hub page — links out to 4 dedicated single-variant preview pages so each
   animation fires across the full viewport without card stacking issues. */

import React from "react";
import { VARIANT_META } from "./_shared";

const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const NIGHT = "#0D0536";

export default function Page() {
  const variants = Object.values(VARIANT_META);
  return (
    <main style={S.page}>
      <header style={S.header}>
        <p style={S.eyebrow}>Mockup · Booking modal transitions</p>
        <h1 style={S.title}>Pick a Vibe</h1>
        <p style={S.lede}>
          Each variant lives on its own page so the animation gets the full
          viewport. Click into one, hit &quot;Book the Call&quot;, watch the
          transition fire, then come back and compare.
        </p>
      </header>

      <section style={S.grid}>
        {variants.map((v) => (
          <a key={v.key} href={`/mockups/booking-transitions/${v.key}`} style={S.card}>
            <span style={S.chip}>{v.key.toUpperCase()}</span>
            <h2 style={S.cardName}>{v.name}</h2>
            <p style={S.cardSub}>{v.sub}</p>
            <p style={S.cardNote}>{v.note}</p>
            <span style={S.cta}>Preview this transition →</span>
          </a>
        ))}
      </section>
    </main>
  );
}

const S = {
  page: {
    minHeight: "100vh",
    padding: "clamp(40px, 6vw, 80px) clamp(20px, 4vw, 60px) 100px",
    background: `radial-gradient(ellipse at top, #1A0F4D 0%, ${NIGHT} 55%, #07021F 100%)`,
    color: "#fff",
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,
  header: { maxWidth: 980, margin: "0 auto 40px" } as React.CSSProperties,
  eyebrow: {
    fontSize: 11.5,
    letterSpacing: "0.22em",
    color: LILAC,
    fontWeight: 800,
    textTransform: "uppercase" as const,
    margin: 0,
  } as React.CSSProperties,
  title: {
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: 900,
    letterSpacing: "-0.03em",
    margin: "10px 0 14px",
  } as React.CSSProperties,
  lede: {
    fontSize: 16,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.72)",
    maxWidth: 700,
    margin: 0,
  } as React.CSSProperties,
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 20,
    maxWidth: 1180,
    margin: "0 auto",
  } as React.CSSProperties,
  card: {
    display: "flex",
    flexDirection: "column" as const,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 18,
    padding: 26,
    color: "#fff",
    textDecoration: "none",
    transition: "border-color 200ms, transform 200ms",
  } as React.CSSProperties,
  chip: {
    alignSelf: "flex-start",
    fontSize: 10.5,
    letterSpacing: "0.18em",
    fontWeight: 800,
    color: PURPLE,
    border: `1px solid ${PURPLE}55`,
    borderRadius: 999,
    padding: "4px 11px",
    marginBottom: 14,
  } as React.CSSProperties,
  cardName: {
    fontSize: 22,
    fontWeight: 800,
    margin: "0 0 8px",
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  cardSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.72)",
    lineHeight: 1.55,
    margin: "0 0 8px",
  } as React.CSSProperties,
  cardNote: {
    fontSize: 12.5,
    color: NEON,
    fontStyle: "italic" as const,
    margin: "0 0 18px",
  } as React.CSSProperties,
  cta: {
    marginTop: "auto",
    fontSize: 13,
    color: LILAC,
    fontWeight: 700,
    letterSpacing: "0.04em",
  } as React.CSSProperties,
};
