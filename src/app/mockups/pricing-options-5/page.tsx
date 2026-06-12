"use client";

/* Mockup: /mockups/pricing-options-5
   Based on Option 23, per Ademola's spec:
   - Title "Ways to work with us." + "3 plans, choose what's right for you."
   - Direction Call banner spanning the top
   - 3 equal-size plan cards: one-line desc → glowing "What's included" collapse
     (same glow as the live site) → CTA button underneath
   - Buttons: Get Started · Get Started · See if We're a Fit
   - "it all credits up" line worked in
   3 treatments (v28/v29/v30). Reuses Pricing.module.css for the exact collapse
   glow + card look. No live files touched. */

import React, { useState } from "react";
import styles from "../../../components/sections/Pricing/Pricing.module.css";
import anim from "./anim.module.css";

const NIGHT = "var(--a2-night-core)";
const PURPLE = "var(--a2-electric-purple)";
const NEON = "var(--a2-electric-neon)";
const LILAC = "var(--a2-flex-lilac)";
const POINT = "Even if it's not us, we'll point you in the right direction.";
const CREDIT = "It doesn't matter which one you pick; each plan gets credited to the one above it.";

const PLANS = [
  {
    key: "oneoff", name: "One-off Video", price: "$2,000+", unit: "one-time",
    desc: "One storyboarded and edited video, start to finish.",
    get: ["We design and build your videos the A2 way.", "A storyboard built around your buyer.", "One completely edited video, yours to own and post."],
    cta: "Get Started",
  },
  {
    key: "jumpstart", name: "2-Week Jumpstart", price: "$8,000", unit: "one-time",
    desc: "We do deep research on your buyer, map out six months of content + three videos.",
    get: [
      "A clear content strategy built around your exact ICP",
      "3 high-impact videos you can use immediately",
      "Repeatable series concepts based on what your buyers search for",
      "A roadmap that shows how video will move pipeline",
    ],
    cta: "Get Started",
  },
  {
    key: "engine", name: "Video Growth Engine", price: "$15–25K", unit: "/ month",
    desc: "We run your whole video department. Script to screen.",
    lead: "Everything in the 2-Week Jumpstart, plus:",
    // FULL 12 (original, in case we revert):
    //   "10 to 12 done-for-you videos per month (long-form + short-form cuts)",
    //   "AI-forward special effects for visuals you can't shoot with a camera",
    //   "AEO video ranking: be the first brand AI suggests to your buyers",
    //   "72-hour turnaround (most agencies take 1 to 2 weeks)",
    //   "Monthly strategy reviews where we look at what's actually converting, and double down on what's working",
    //   "A dedicated team that learns your voice and what your buyers want to hear",
    //   "Scripts engineered to move buyers from aware to ready to close",
    //   "Videos for every stage of the buyer journey, from discovery to close",
    //   "Steal what's working: we break down your competitors' best-performing videos",
    //   "1:1 executive video coaching for your leadership team",
    //   "Talent sourcing: we help you source creators for special high-stakes campaigns",
    //   "Monthly competitor video audits so you always know what's working in your space",
    get: [
      "10 to 12 done-for-you videos per month (long-form + short-form cuts)",
      "72-hour turnaround (most agencies take 1 to 2 weeks)",
      "AEO video ranking: be the first brand AI suggests to your buyers",
      "Full-funnel scripts that move buyers from aware to ready to close",
      "Videos mapped to every stage of the buyer journey, from discovery to close",
      "A dedicated team that learns your voice and what your buyers want to hear",
      "Monthly strategy reviews + competitor audits, so you double down on what's converting",
      "1:1 executive video coaching for your leadership team",
    ],
    cta: "See if We're a Fit",
  },
];

function PlanCard({ plan, featured, ctaFilled, accentTop, badge }: { plan: typeof PLANS[number]; featured?: boolean; ctaFilled?: boolean; accentTop?: string; badge?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${styles.card} ${featured ? styles.featured : ""}`}
      style={{ display: "flex", flexDirection: "column", height: "100%", padding: 28, borderTop: accentTop ? `3px solid ${accentTop}` : undefined }}
    >
      {badge && (
        <span style={{ alignSelf: "flex-start", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", color: accentTop || NEON, border: `1px solid ${(accentTop || NEON)}66`, borderRadius: 999, padding: "4px 10px", marginBottom: 14 }}>{badge}</span>
      )}
      <h3 className={styles.planName} style={{ fontSize: 22 }}>{plan.name}</h3>
      <div className={styles.price} style={{ fontSize: 34 }}>{plan.price}<small>{plan.unit}</small></div>
      <p className={styles.desc} style={{ margin: "10px 0 18px" }}>{plan.desc}</p>

      <div className={styles.collapse}>
        <button
          type="button"
          className={`${styles.collapseHdr} ${!open ? styles.pulse : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <h4>What&apos;s included</h4>
          <span className={`${styles.toggle} ${open ? styles.open : ""}`}>+</span>
        </button>
        <div className={`${anim.body} ${open ? anim.open : ""}`}>
          <div className={anim.bodyInner}>
            {"lead" in plan && plan.lead && (
              <div className={styles.featLead}>{plan.lead}</div>
            )}
            {plan.get.map((g) => (
              <div key={g} className={`${styles.feat} ${featured ? styles.featPurple : ""}`} style={{ fontSize: 13.5 }}>
                <span className={styles.chk}>✓</span> <span>{g}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flexGrow: 1, minHeight: 20 }} />

      <a href="#" className={`${styles.cta} ${ctaFilled ? styles.ctaFilled : styles.ctaOutline}`} style={{ marginTop: 14, marginBottom: 0 }}>{plan.cta}</a>
    </div>
  );
}

function Title() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 className={styles.heading} style={{ marginBottom: 10 }}>Ways to work <em>with us.</em></h2>
      <p className={styles.intro} style={{ marginBottom: 24 }}>3 plans, all the correct choices.</p>
    </div>
  );
}

function DirectionBanner() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", background: "rgba(102,247,142,0.05)", border: "1px solid rgba(102,247,142,0.4)", borderLeft: `4px solid ${NEON}`, borderRadius: 16, padding: "20px 26px", marginBottom: 20 }}>
      <div style={{ flex: "1 1 460px" }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: NEON }}>FREE · 30 MINUTES · THE DIRECTION CALL</span>
        <p style={{ color: "#fff", fontSize: 17, fontWeight: 600, margin: "6px 0 0" }}>{POINT}</p>
      </div>
      <a href="#" className={`${styles.cta} ${styles.ctaOutline}`} style={{ width: "auto", margin: 0, padding: "13px 26px" }}>Book the Call</a>
    </div>
  );
}

function CreditNote() {
  return <p style={{ color: NEON, fontSize: 14, fontWeight: 600, marginTop: 18, textAlign: "center" }}>{CREDIT}</p>;
}

function Band({ id, label, blurb, children }: { id: string; label: string; blurb: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: NIGHT, paddingBottom: 56 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 28px 0" }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: NEON, border: "1px solid rgba(102,247,142,0.35)", borderRadius: 999, padding: "6px 14px", marginBottom: 18 }}>{label}</div>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13.5, maxWidth: 820, margin: "0 0 26px", lineHeight: 1.5 }}>{blurb}</p>
        {children}
      </div>
    </section>
  );
}

export default function PricingOptions5() {
  return (
    <main style={{ background: NIGHT, minHeight: "100vh", paddingBottom: 80 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 28px 8px" }}>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: 0 }}>Pricing block — Option 23 refined, 3 treatments</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginTop: 8 }}>Equal cards · one-line desc · glowing &ldquo;What&apos;s included&rdquo; collapse · CTA underneath. Click any &ldquo;What&apos;s included&rdquo; to expand.</p>
      </div>

      {/* ===== V28 — SITE-NATIVE (Engine featured) ===== */}
      <Band id="v28" label="Option A · Site-Native (Engine featured)" blurb="Closest to your current section. Three equal cards, the Engine carrying the purple glow and the filled CTA. One-line desc, glowing What's included, button underneath.">
        <Title />
        <DirectionBanner />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, alignItems: "stretch" }}>
          <PlanCard plan={PLANS[0]} />
          <PlanCard plan={PLANS[1]} />
          <PlanCard plan={PLANS[2]} featured ctaFilled />
        </div>
        <CreditNote />
      </Band>

      {/* ===== V29 — ALL EQUAL (uniform, no featured emphasis) ===== */}
      <Band id="v29" label="Option B · All Equal (uniform)" blurb="Truly egalitarian, matching the '3 plans, choose what's right' line. No card is emphasized over another. All three identical, all filled CTAs, equal weight.">
        <Title />
        <DirectionBanner />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, alignItems: "stretch" }}>
          {PLANS.map((p) => (
            <PlanCard key={p.key} plan={p} ctaFilled />
          ))}
        </div>
        <CreditNote />
      </Band>

      {/* ===== V30 — ACCENT-TOP (per-plan identity) ===== */}
      <Band id="v30" label="Option C · Accent-Top (per-plan identity)" blurb="Each card gets a colored top accent and a small nature badge (one-time / one-time / monthly) so the three read as distinct offers at a glance. Engine still anchors with the filled CTA.">
        <Title />
        <DirectionBanner />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, alignItems: "stretch" }}>
          <PlanCard plan={PLANS[0]} accentTop={NEON} badge="ONE-TIME" />
          <PlanCard plan={PLANS[1]} accentTop={LILAC} badge="ONE-TIME" />
          <PlanCard plan={PLANS[2]} accentTop={PURPLE} badge="MONTHLY" featured ctaFilled />
        </div>
        <CreditNote />
      </Band>
    </main>
  );
}
