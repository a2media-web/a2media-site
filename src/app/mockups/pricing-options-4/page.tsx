"use client";

/* Mockup: /mockups/pricing-options-4
   LOCKED structure per Ademola:
   - Title "Ways to work with us." + "3 plans, choose what's right for you."
   - Direction Call as a full-width box spanning the top
   - 3 plans below: One-off Video · 2-Week Jumpstart · Video Growth Engine
   - "it all credits up" line worked in somewhere
   - KEEP existing dark site styling (reuse Pricing.module.css look)
   5 different treatments to start tweaking. No live files touched. Bands v23–v27. */

import React from "react";
import styles from "../../../components/sections/Pricing/Pricing.module.css";

const NIGHT = "var(--a2-night-core)";
const PURPLE = "var(--a2-electric-purple)";
const NEON = "var(--a2-electric-neon)";
const LILAC = "var(--a2-flex-lilac)";
const TEAL = "var(--a2-aqua-teal)";
const POINT = "Even if it's not us, we'll point you in the right direction.";
const CREDIT = "By the way: it doesn't matter which one you pick. It all gets credited up if you go further.";

const PLANS = [
  {
    key: "oneoff", name: "One-off Video", price: "$2,500", unit: "one-time", timeline: "~1 week",
    desc: "One produced video, start to finish.",
    get: ["One fully produced video for your founder", "Our editing, hooks, and pacing", "Yours to own and post right away"],
    cta: "Get Started",
  },
  {
    key: "jumpstart", name: "2-Week Jumpstart", price: "$8,000", unit: "one-time", timeline: "2 weeks",
    desc: "We decode your buyer and map 6 months.",
    get: ["We mine your sales calls for your buyer's language", "Competitor + comment teardown", "Your buyer's decision decoded", "A 6-month video roadmap", "Your first 3 videos"],
    cta: "Apply",
  },
  {
    key: "engine", name: "Video Growth Engine", price: "$15–25K", unit: "/ month", timeline: "Ongoing",
    desc: "We run your whole content engine.",
    get: ["10 to 12 videos a month", "72-hour turnaround", "A dedicated team that knows your buyer", "Monthly strategy reviews", "Work-free guarantee until the goal is hit"],
    cta: "See if We're a Fit",
  },
];

function Title({ subCredit }: { subCredit?: boolean }) {
  return (
    <>
      <h2 className={styles.heading} style={{ marginBottom: 10 }}>
        Ways to work <em>with us.</em>
      </h2>
      <p className={styles.intro} style={{ marginBottom: subCredit ? 14 : 30 }}>
        3 plans, choose what&apos;s right for you.
      </p>
    </>
  );
}

function DirectionBanner({ withCredit }: { withCredit?: boolean }) {
  return (
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
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: NEON }}>FREE · 30 MINUTES · THE DIRECTION CALL</span>
        <p style={{ color: "#fff", fontSize: 17, fontWeight: 600, margin: "6px 0 0" }}>{POINT}</p>
        {withCredit && <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13.5, margin: "6px 0 0" }}>{CREDIT}</p>}
      </div>
      <a href="#" className={`${styles.cta} ${styles.ctaOutline}`} style={{ width: "auto", margin: 0, padding: "13px 26px" }}>Book the Call</a>
    </div>
  );
}

function creditNote() {
  return (
    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13.5, marginTop: 18, fontStyle: "italic", textAlign: "center" }}>{CREDIT}</p>
  );
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

export default function PricingOptions4() {
  return (
    <main style={{ background: NIGHT, minHeight: "100vh", paddingBottom: 80 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 28px 8px" }}>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: 0 }}>Pricing block — your locked structure, 5 treatments</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginTop: 8 }}>Direction Call banner on top, 3 plans below, existing dark site styling. Five ways to tweak from.</p>
      </div>

      {/* ===== V23 — EQUAL & CLEAN (site-native, engine featured) ===== */}
      <Band id="v23" label="Option 23 · Equal & Clean (site-native)" blurb="Closest to your current Pricing section. Three equal dark cards, the Engine carrying the purple featured glow. Each shows price, what you get, and a CTA. Credit line as a centered footnote.">
        <div style={{ textAlign: "center" }}><Title /></div>
        <DirectionBanner />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, alignItems: "start" }}>
          {PLANS.map((p) => (
            <div key={p.key} className={`${styles.card} ${p.key === "engine" ? styles.featured : ""}`} style={{ padding: 28 }}>
              <h3 className={styles.planName} style={{ fontSize: 22 }}>{p.name}</h3>
              <div className={styles.price} style={{ fontSize: 36 }}>{p.price}<small>{p.unit}</small></div>
              <p className={styles.desc} style={{ margin: "10px 0 18px" }}>{p.desc}</p>
              <div>
                {p.get.map((g) => (
                  <div key={g} className={`${styles.feat} ${p.key === "engine" ? styles.featPurple : ""}`} style={{ fontSize: 13.5 }}>
                    <span className={styles.chk}>✓</span> <span>{g}</span>
                  </div>
                ))}
              </div>
              <a href="#" className={`${styles.cta} ${p.key === "engine" ? styles.ctaFilled : styles.ctaOutline}`} style={{ marginTop: 22, marginBottom: 0 }}>{p.cta}</a>
            </div>
          ))}
        </div>
        {creditNote()}
      </Band>

      {/* ===== V24 — RECOMMENDED MIDDLE (Jumpstart hero) ===== */}
      <Band id="v24" label="Option 24 · Recommended Middle (Jumpstart hero)" blurb="The 2-Week Jumpstart sits center, raised and glowing with a START HERE badge, because the decode is the heart of what you do. The other two flank it. Credit line lives inside the banner.">
        <div style={{ textAlign: "center" }}><Title /></div>
        <DirectionBanner withCredit />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr 1fr", gap: 16, alignItems: "center" }}>
          {PLANS.map((p) => {
            const hero = p.key === "jumpstart";
            return (
              <div key={p.key} className={`${styles.card} ${hero ? styles.featured : ""}`} style={{ padding: hero ? 32 : 26, transform: hero ? "translateY(-8px)" : "none" }}>
                {hero && <span className={`${styles.badge} ${styles.badgePurpleSolid}`}>Start Here</span>}
                <h3 className={styles.planName} style={{ fontSize: hero ? 23 : 20 }}>{p.name}</h3>
                <div className={styles.price} style={{ fontSize: hero ? 38 : 32 }}>{p.price}<small>{p.unit}</small></div>
                <p className={styles.desc} style={{ margin: "10px 0 16px" }}>{p.desc}</p>
                <div>
                  {(hero ? p.get : p.get.slice(0, 3)).map((g) => (
                    <div key={g} className={`${styles.feat} ${hero ? styles.featPurple : ""}`} style={{ fontSize: 13 }}>
                      <span className={styles.chk}>✓</span> <span>{g}</span>
                    </div>
                  ))}
                </div>
                <a href="#" className={`${styles.cta} ${hero ? styles.ctaFilled : styles.ctaOutline}`} style={{ marginTop: 20, marginBottom: 0 }}>{p.cta}</a>
              </div>
            );
          })}
        </div>
      </Band>

      {/* ===== V25 — ENGINE HERO (asymmetric, retainer dominant) ===== */}
      <Band id="v25" label="Option 25 · Engine Hero (asymmetric)" blurb="Weights the layout toward the Video Growth Engine, the offer you actually want most people in. The two one-time plans sit as a compact stack on the left, the Engine dominates on the right. Credit line footnote.">
        <div style={{ textAlign: "center" }}><Title /></div>
        <DirectionBanner />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 18, alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PLANS.slice(0, 2).map((p) => (
              <div key={p.key} className={styles.card} style={{ padding: 24, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 className={styles.planName} style={{ fontSize: 19, margin: 0 }}>{p.name}</h3>
                  <span className={styles.price} style={{ fontSize: 26, marginBottom: 0 }}>{p.price}</span>
                </div>
                <p className={styles.desc} style={{ margin: "8px 0 14px" }}>{p.desc}</p>
                <a href="#" className={`${styles.cta} ${styles.ctaOutline}`} style={{ margin: 0, padding: 12 }}>{p.cta}</a>
              </div>
            ))}
          </div>
          <div className={`${styles.card} ${styles.featured}`} style={{ padding: 34 }}>
            <span className={`${styles.badge} ${styles.badgePurpleSolid}`}>Most teams choose this</span>
            <h3 className={styles.planName} style={{ fontSize: 26 }}>{PLANS[2].name}</h3>
            <div className={styles.price} style={{ fontSize: 44 }}>{PLANS[2].price}<small>{PLANS[2].unit}</small></div>
            <p className={styles.desc} style={{ margin: "10px 0 18px" }}>{PLANS[2].desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>
              {PLANS[2].get.map((g) => (
                <div key={g} className={`${styles.feat} ${styles.featPurple}`} style={{ fontSize: 13.5 }}>
                  <span className={styles.chk}>✓</span> <span>{g}</span>
                </div>
              ))}
            </div>
            <a href="#" className={`${styles.cta} ${styles.ctaFilled}`} style={{ marginTop: 22, marginBottom: 0 }}>{PLANS[2].cta}</a>
          </div>
        </div>
        {creditNote()}
      </Band>

      {/* ===== V26 — CREDIT-CHAIN CHIPS (serves the "credits up" line visually) ===== */}
      <Band id="v26" label="Option 26 · Credit-Chain Chips" blurb="Makes the 'it all credits up' idea visible without turning it into a path. Each one-time plan carries a small 'credits up' chip; the Engine is the destination. Three separate cards, just a quiet signal that nothing you spend is wasted.">
        <div style={{ textAlign: "center" }}><Title /></div>
        <DirectionBanner />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, alignItems: "start" }}>
          {PLANS.map((p) => (
            <div key={p.key} className={`${styles.card} ${p.key === "engine" ? styles.featured : ""}`} style={{ padding: 28, position: "relative" }}>
              <span style={{ position: "absolute", top: 18, right: 18, fontSize: 10.5, fontWeight: 800, letterSpacing: "0.08em", color: p.key === "engine" ? "rgba(255,255,255,0.55)" : NEON, border: `1px solid ${p.key === "engine" ? "rgba(255,255,255,0.25)" : "rgba(102,247,142,0.4)"}`, borderRadius: 999, padding: "4px 10px", background: p.key === "engine" ? "transparent" : "rgba(102,247,142,0.07)" }}>
                {p.key === "engine" ? "the destination" : "credits up ↗"}
              </span>
              <h3 className={styles.planName} style={{ fontSize: 21, marginTop: 8 }}>{p.name}</h3>
              <div className={styles.price} style={{ fontSize: 34 }}>{p.price}<small>{p.unit}</small></div>
              <p className={styles.desc} style={{ margin: "10px 0 16px" }}>{p.desc}</p>
              <div>
                {p.get.slice(0, 4).map((g) => (
                  <div key={g} className={`${styles.feat} ${p.key === "engine" ? styles.featPurple : ""}`} style={{ fontSize: 13.5 }}>
                    <span className={styles.chk}>✓</span> <span>{g}</span>
                  </div>
                ))}
              </div>
              <a href="#" className={`${styles.cta} ${p.key === "engine" ? styles.ctaFilled : styles.ctaOutline}`} style={{ marginTop: 20, marginBottom: 0 }}>{p.cta}</a>
            </div>
          ))}
        </div>
      </Band>

      {/* ===== V27 — SPEC ROWS (structured, mono, scope/timeline/outcome) ===== */}
      <Band id="v27" label="Option 27 · Spec Rows (structured)" blurb="The Scroll Lab clarity in your dark brand. The Direction Call banner on top, then the three plans as structured spec rows: scope, timeline, what you get, price. Scannable and engineered. Credit line as the closing note.">
        <div style={{ textAlign: "center" }}><Title /></div>
        <DirectionBanner />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PLANS.map((p) => (
            <div key={p.key} style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr 1.9fr 0.9fr", gap: 22, alignItems: "center", background: p.key === "engine" ? "linear-gradient(90deg, rgba(90,51,255,0.12), rgba(90,51,255,0.03))" : "rgba(255,255,255,0.02)", border: `1px solid ${p.key === "engine" ? PURPLE : "rgba(255,255,255,0.08)"}`, borderRadius: 14, padding: "22px 26px" }}>
              <div>
                <h3 style={{ color: "#fff", fontSize: 19, fontWeight: 700, margin: "0 0 3px" }}>{p.name}</h3>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>{p.desc}</div>
              </div>
              <div>
                <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", marginBottom: 5 }}>TIMELINE</div>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{p.timeline}</div>
              </div>
              <div>
                <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", marginBottom: 5 }}>WHAT YOU GET</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px" }}>
                  {p.get.slice(0, 3).map((g) => (
                    <span key={g} style={{ color: "rgba(255,255,255,0.82)", fontSize: 12.5 }}>• {g}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{p.price}<span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 400 }}> {p.unit}</span></div>
                <a href="#" className={`${styles.cta} ${p.key === "engine" ? styles.ctaFilled : styles.ctaOutline}`} style={{ margin: 0, padding: "9px 18px", fontSize: 13, display: "inline-block", width: "auto" }}>{p.cta}</a>
              </div>
            </div>
          ))}
        </div>
        {creditNote()}
      </Band>
    </main>
  );
}
