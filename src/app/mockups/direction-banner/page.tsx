"use client";

/* Mockup: /mockups/direction-banner
   "The Video Strategy Call" styled to match the plan-card titles
   (planName) instead of the tiny all-caps eyebrow. No live files. */

import React from "react";
import styles from "../../../components/sections/Pricing/Pricing.module.css";

const NIGHT = "var(--a2-night-core)";
const NEON = "var(--a2-electric-neon)";
const POINT = "Even if you don't work with us, we'll point you in the right direction.";

function FreePill() {
  return (
    <span style={{ display: "inline-block", background: NEON, color: NIGHT, fontWeight: 800, letterSpacing: "0.12em", borderRadius: 999, padding: "3px 10px", fontSize: 11 }}>
      FREE
    </span>
  );
}

function Shell({ children, btn = "Book the Call" }: { children: React.ReactNode; btn?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", background: "rgba(102,247,142,0.05)", border: "1px solid rgba(102,247,142,0.4)", borderLeft: `4px solid ${NEON}`, borderRadius: 16, padding: "22px 26px" }}>
      <div style={{ flex: "1 1 460px" }}>{children}</div>
      <a href="#" className={`${styles.cta} ${styles.ctaOutline}`} style={{ width: "auto", margin: 0, padding: "13px 26px" }}>{btn}</a>
    </div>
  );
}

function Row({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{n} — {label}</div>
      {children}
    </div>
  );
}

export default function DirectionBannerMock() {
  return (
    <main style={{ background: NIGHT, minHeight: "100vh", padding: "48px 28px 80px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Call name styled like the card titles</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 34 }}>Card titles are bold mixed-case sans (e.g. &ldquo;2-Week Jumpstart&rdquo;). Here&apos;s the call name matched to them.</p>

        {/* A — CURRENT */}
        <Row n="A" label="Current (tiny all-caps eyebrow)">
          <Shell>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <FreePill />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: NEON }}>THE VIDEO STRATEGY CALL</span>
            </span>
            <p style={{ color: "#fff", fontSize: 17, fontWeight: 600, margin: "8px 0 0" }}>{POINT}</p>
          </Shell>
        </Row>

        {/* B — TITLE LIKE THE CARDS, FREE PILL ABOVE, SENTENCE AS DESC */}
        <Row n="B" label="Title matched to cards (pill above, sentence as desc)">
          <Shell>
            <div style={{ marginBottom: 8 }}><FreePill /></div>
            <h3 className={styles.planName} style={{ fontSize: 22, margin: 0 }}>The Video Strategy Call</h3>
            <p className={styles.desc} style={{ margin: "8px 0 0", fontSize: 14.5 }}>{POINT}</p>
          </Shell>
        </Row>

        {/* C — PILL INLINE WITH THE TITLE */}
        <Row n="C" label="Title matched, FREE pill inline beside it">
          <Shell>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h3 className={styles.planName} style={{ fontSize: 22, margin: 0 }}>The Video Strategy Call</h3>
              <FreePill />
            </div>
            <p className={styles.desc} style={{ margin: "8px 0 0", fontSize: 14.5 }}>{POINT}</p>
          </Shell>
        </Row>

        {/* C2 — FREE PILL FIRST, THEN TITLE */}
        <div id="c2">
        <Row n="C2" label="FREE pill first, then title">
          <Shell>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <FreePill />
              <h3 className={styles.planName} style={{ fontSize: 22, margin: 0 }}>The Video Strategy Call</h3>
            </div>
            <p className={styles.desc} style={{ margin: "8px 0 0", fontSize: 14.5 }}>{POINT}</p>
          </Shell>
        </Row>
        </div>

        {/* D — TITLE + "FREE" AS A SMALL WORD AFTER IT (no pill) */}
        <Row n="D" label="Title + 'Free' as a light word (no pill)">
          <Shell>
            <h3 className={styles.planName} style={{ fontSize: 22, margin: 0 }}>
              The Video Strategy Call <span style={{ color: NEON, fontWeight: 700 }}>· Free</span>
            </h3>
            <p className={styles.desc} style={{ margin: "8px 0 0", fontSize: 14.5 }}>{POINT}</p>
          </Shell>
        </Row>
      </div>
    </main>
  );
}
