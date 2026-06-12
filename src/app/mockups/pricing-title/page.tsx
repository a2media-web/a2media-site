"use client";

/* Mockup: /mockups/pricing-title
   Section-title treatments, compared against the plan-card title style
   (planName). Goal: see the title matched to "One-off Video / 2-Week
   Jumpstart" instead of the serif-italic accent. No live files touched. */

import React from "react";
import styles from "../../../components/sections/Pricing/Pricing.module.css";

const NIGHT = "var(--a2-night-core)";
const PURPLE = "var(--a2-electric-purple)";

function CardTitleRow() {
  return (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginTop: 18 }}>
      {["One-off Video", "2-Week Jumpstart", "Video Growth Engine"].map((n) => (
        <h3 key={n} className={styles.planName} style={{ fontSize: 22, margin: 0 }}>
          {n}
        </h3>
      ))}
    </div>
  );
}

function Block({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "34px 0" }}>
      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18 }}>
        {n} — {label}
      </div>
      <div style={{ textAlign: "center" }}>{children}</div>
      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 26 }}>
        card titles for reference ↓
      </div>
      <CardTitleRow />
    </div>
  );
}

export default function PricingTitleMock() {
  return (
    <main style={{ background: NIGHT, minHeight: "100vh", padding: "48px 28px 80px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
          Section title — match to the card titles?
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 10 }}>
          The card titles are plain sans (Galano). Here&apos;s the section title in a few treatments against them.
        </p>

        {/* A — CURRENT */}
        <Block n="A" label="Current (serif-italic accent)">
          <h2 className={styles.heading} style={{ margin: 0 }}>
            Ways to work <em>with us.</em>
          </h2>
        </Block>

        {/* B — ALL SANS, SOLID WHITE (matches card titles' font) */}
        <Block n="B" label="All sans, solid white (same font as cards)">
          <h2 className={styles.heading} style={{ margin: 0, fontFamily: "var(--a2-sans)" }}>
            Ways to work with us.
          </h2>
        </Block>

        {/* C — ALL SANS, PURPLE ACCENT (no italic/serif) */}
        <Block n="C" label="All sans, purple accent on 'with us.'">
          <h2 className={styles.heading} style={{ margin: 0, fontFamily: "var(--a2-sans)" }}>
            Ways to work <span style={{ color: PURPLE }}>with us.</span>
          </h2>
        </Block>

        {/* D — CARD-TITLE WEIGHT/SIZE, just bigger (truest "match") */}
        <Block n="D" label="Literally the card-title style, scaled up">
          <h2 className={styles.planName} style={{ margin: 0, fontSize: 40, lineHeight: 1.15, textAlign: "center" }}>
            Ways to work with us.
          </h2>
        </Block>
      </div>
    </main>
  );
}
