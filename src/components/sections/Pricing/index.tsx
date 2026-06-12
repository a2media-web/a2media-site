"use client";

import React, { useState } from "react";
import styles from "./Pricing.module.css";
import { useBookingModal } from "@/components/booking/BookingProvider";

const NEON = "var(--a2-electric-neon)";
const PURPLE = "var(--a2-electric-purple)";

// All three plan CTAs now open the in-page BookingModal via useBookingModal —
// Engine routes to the "engine" Cal event, the other two route to "meeting".

const POINT = "Even if you don't work with us, we'll point you in the right direction.";
const CREDIT =
  "Our one-time projects credit toward your monthly plan.";

type Plan = {
  key: string;
  name: string;
  price: string;
  unit: string;
  desc: string;
  clarifier?: string;
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
    desc: "You give us the raw footage. We make it look expensive.",
    get: [
      "We design and build your videos the A2 way.",
      "One completely edited video, yours to own and post.",
    ],
    cta: "Get Started",
    href: "",
    accent: NEON,
    badge: "ONE-TIME",
  },
  {
    key: "jumpstart",
    name: "2-Week Jumpstart",
    price: "$8K",
    unit: "one-time",
    desc: "We research your buyer, map out 6 months of video, and give you 3 videos to test.",
    get: [
      "A clear content strategy built around your exact ICP",
      "3 high-impact videos you can use immediately",
      "Repeatable series concepts based on what your buyers search for",
      "A roadmap that shows how video will move pipeline",
    ],
    cta: "Get Started",
    href: "",
    accent: NEON,
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
    href: "",
    accent: PURPLE,
    badge: "MONTHLY",
    featured: true,
    ctaFilled: true,
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const [open, setOpen] = useState(false);
  const { open: openBooking } = useBookingModal();
  const usesBookingModal =
    plan.key === "engine" ||
    plan.key === "jumpstart" ||
    plan.key === "oneoff";
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
      <p className={styles.desc} style={{ margin: plan.clarifier ? "10px 0 6px" : "10px 0 18px" }}>
        {plan.desc}
      </p>
      {plan.clarifier && (
        <p
          style={{
            margin: "0 0 18px",
            fontSize: 13.5,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.5,
          }}
        >
          {plan.clarifier}
        </p>
      )}

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

      {usesBookingModal ? (
        <button
          type="button"
          onClick={() => openBooking(plan.key === "engine" ? "engine" : "meeting")}
          className={`${styles.cta} ${plan.ctaFilled ? styles.ctaFilled : styles.ctaOutline}`}
          style={{ marginTop: 14, marginBottom: 0, border: plan.ctaFilled ? "none" : undefined, cursor: "pointer", fontFamily: "inherit" }}
        >
          {plan.cta}
        </button>
      ) : (
        <a
          href={plan.href}
          target="_blank"
          rel="noreferrer"
          className={`${styles.cta} ${plan.ctaFilled ? styles.ctaFilled : styles.ctaOutline}`}
          style={{ marginTop: 14, marginBottom: 0 }}
        >
          {plan.cta}
        </a>
      )}
    </div>
  );
}

export default function Pricing() {
  const { open: openBooking } = useBookingModal();
  return (
    <section id="Pricing" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          3 Ways to Work <em>With Us</em>
        </h2>
        <p className={styles.intro} style={{ marginBottom: 28 }}>
          <span className={styles.introAccent}>{CREDIT}</span>
        </p>

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
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  display: "inline-block",
                  background: NEON,
                  color: "var(--a2-night-core)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  borderRadius: 999,
                  padding: "3px 10px",
                  fontSize: 11,
                }}
              >
                FREE
              </span>
              <h3 className={styles.planName} style={{ fontSize: 22, margin: 0 }}>
                The Video Strategy Call
              </h3>
            </div>
            <p className={styles.desc} style={{ margin: "8px 0 0", fontSize: 14.5 }}>
              {POINT}
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBooking("meeting")}
            className={`${styles.cta} ${styles.ctaOutline}`}
            style={{ width: "auto", margin: 0, padding: "13px 26px", cursor: "pointer", fontFamily: "inherit" }}
          >
            Book the Call
          </button>
        </div>

        <div className={styles.grid}>
          {PLANS.map((p) => (
            <PlanCard key={p.key} plan={p} />
          ))}
        </div>

      </div>
    </section>
  );
}
