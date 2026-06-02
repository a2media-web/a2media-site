"use client";

import { useState } from "react";
import styles from "./Pricing.module.css";

const NEON = "var(--a2-electric-neon)";
const LILAC = "var(--a2-flex-lilac)";
const PURPLE = "var(--a2-electric-purple)";

// Real booking links (carried over from the prior pricing + custom-projects blocks)
const DISCOVERY = "https://9yqatx.short.gy/vQTine";
const CUSTOM = "https://9yqatx.short.gy/qeI5KF";
const ENGINE_LINK = "https://9yqatx.short.gy/ZJGUin";

const POINT = "Even if you don't work with us, we'll point you in the right direction.";
const CREDIT =
  "It doesn't matter which one you pick; each plan gets credited to the one above it.";

type Plan = {
  key: string;
  name: string;
  price: string;
  unit: string;
  desc: string;
  lead?: string;
  get: string[];
  cta: string;
  href: string;
  accent: string;
  badge: string;
  featured?: boolean;
  ctaFilled?: boolean;
};

const PLANS: Plan[] = [
  {
    key: "oneoff",
    name: "One-off Video",
    price: "$2K",
    unit: "starting price",
    desc: "One storyboarded and edited video, start to finish.",
    get: [
      "We design and build your videos the A2 way.",
      "One completely edited video, yours to own and post.",
    ],
    cta: "Get Started",
    href: CUSTOM,
    accent: NEON,
    badge: "ONE-TIME",
  },
  {
    key: "jumpstart",
    name: "2-Week Jumpstart",
    price: "$8K",
    unit: "one-time",
    desc: "We do deep research on your buyer, map out six months of content + three videos.",
    get: [
      "A clear content strategy built around your exact ICP",
      "3 high-impact videos you can use immediately",
      "Repeatable series concepts based on what your buyers search for",
      "A roadmap that shows how video will move pipeline",
    ],
    cta: "Get Started",
    href: DISCOVERY,
    accent: LILAC,
    badge: "ONE-TIME",
  },
  {
    key: "engine",
    name: "Video Growth Engine",
    price: "$15–25K",
    unit: "/ month",
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
    href: ENGINE_LINK,
    accent: PURPLE,
    badge: "MONTHLY",
    featured: true,
    ctaFilled: true,
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${styles.card} ${plan.featured ? styles.featured : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 28,
        borderTop: `3px solid ${plan.accent}`,
      }}
    >
      <span
        style={{
          alignSelf: "flex-start",
          fontSize: 10.5,
          fontWeight: 800,
          letterSpacing: "0.14em",
          color: plan.accent,
          border: `1px solid ${plan.accent}66`,
          borderRadius: 999,
          padding: "4px 10px",
          marginBottom: 14,
        }}
      >
        {plan.badge}
      </span>

      <h3 className={styles.planName} style={{ fontSize: 22 }}>
        {plan.name}
      </h3>
      <div className={styles.price} style={{ fontSize: 34 }}>
        {plan.price}
        <small>{plan.unit}</small>
      </div>
      <p className={styles.desc} style={{ margin: "10px 0 18px" }}>
        {plan.desc}
      </p>

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
        <div className={`${styles.collapseBody} ${open ? styles.open : ""}`}>
          <div className={styles.collapseInner}>
            {plan.lead && <div className={styles.featLead}>{plan.lead}</div>}
            {plan.get.map((g) => (
              <div
                key={g}
                className={`${styles.feat} ${plan.featured ? styles.featPurple : ""}`}
                style={{ fontSize: 13.5 }}
              >
                <span className={styles.chk}>✓</span> <span>{g}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flexGrow: 1, minHeight: 20 }} />

      <a
        href={plan.href}
        target="_blank"
        rel="noreferrer"
        className={`${styles.cta} ${plan.ctaFilled ? styles.ctaFilled : styles.ctaOutline}`}
        style={{ marginTop: 14, marginBottom: 0 }}
      >
        {plan.cta}
      </a>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="Pricing" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Ways to work <em>with us.</em>
        </h2>
        <p className={styles.intro}>3 plans, all the correct choices.</p>

        {/* Direction Call — free, spans the top */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap",
            background: "rgba(102,247,142,0.05)",
            border: "1px solid rgba(102,247,142,0.4)",
            borderLeft: `4px solid ${NEON}`,
            borderRadius: 16,
            padding: "20px 26px",
            marginBottom: 20,
          }}
        >
          <div style={{ flex: "1 1 460px" }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.16em",
                color: NEON,
              }}
            >
              FREE · 30 MINUTES · THE DIRECTION CALL
            </span>
            <p
              style={{
                color: "#fff",
                fontSize: 17,
                fontWeight: 600,
                margin: "6px 0 0",
              }}
            >
              {POINT}
            </p>
          </div>
          <a
            href={DISCOVERY}
            target="_blank"
            rel="noreferrer"
            className={`${styles.cta} ${styles.ctaOutline}`}
            style={{ width: "auto", margin: 0, padding: "13px 26px" }}
          >
            Book the Call
          </a>
        </div>

        <div className={styles.grid}>
          {PLANS.map((p) => (
            <PlanCard key={p.key} plan={p} />
          ))}
        </div>

        <p
          style={{
            color: NEON,
            fontSize: 14,
            fontWeight: 600,
            marginTop: 18,
            textAlign: "center",
          }}
        >
          {CREDIT}
        </p>
      </div>
    </section>
  );
}
