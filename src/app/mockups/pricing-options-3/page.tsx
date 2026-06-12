"use client";

/* Mockup: /mockups/pricing-options-3
   5 options inspired by thescrolllab.com/#plans — separate, scope-named offers
   with Timeline + "What you get" checklist + "You'll walk away with" closer.
   Corrected A2 model: free = direction, paid = the 2-week decode, engine = run.
   Ademola's line baked into the free call: "Even if it's not us, we'll point
   you in the right direction." No live files touched. Bands keyed v18–v22. */

import React from "react";

const NIGHT = "var(--a2-night-core)";
const PURPLE = "var(--a2-electric-purple)";
const LILAC = "var(--a2-flex-lilac)";
const NEON = "var(--a2-electric-neon)";
const TEAL = "var(--a2-aqua-teal)";
const GRAY = "#EFEFEF";
const POINT = "Even if it's not us, we'll point you in the right direction.";

function Italic({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span style={{ fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 400, color: dark ? PURPLE : "#C9B6FF" }}>
      {children}
    </span>
  );
}

function Band({ id, label, blurb, light, children }: { id: string; label: string; blurb: string; light?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: light ? GRAY : NIGHT, paddingBottom: 56 }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "40px 28px 0" }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: light ? PURPLE : NEON, border: `1px solid ${light ? "rgba(90,51,255,0.35)" : "rgba(102,247,142,0.35)"}`, borderRadius: 999, padding: "6px 14px", marginBottom: 12 }}>{label}</div>
        <p style={{ color: light ? "rgba(13,5,54,0.6)" : "rgba(255,255,255,0.6)", fontSize: 14, maxWidth: 820, margin: "0 0 28px", lineHeight: 1.5 }}>{blurb}</p>
        {children}
      </div>
    </section>
  );
}

function Check({ children, c }: { children: React.ReactNode; c: string }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 11, fontSize: 13.5, lineHeight: 1.45 }}>
      <span style={{ flexShrink: 0, width: 17, height: 17, borderRadius: "50%", background: c, color: "#fff", fontSize: 11, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>✓</span>
      <span>{children}</span>
    </div>
  );
}

const OFFERS = [
  {
    key: "call", c: NEON, name: "The Direction Call", scope: "A free strategy call", timeline: "30 minutes",
    price: "Free", cta: "Book the Call",
    get: ["A read on where your content is losing the buyer", "The approach we'd take if it were us", "One clear next move you can run yourself"],
    away: POINT,
  },
  {
    key: "pilot", c: TEAL, name: "The Pilot Video", scope: "One produced hero video", timeline: "~1 week",
    price: "$2,500", cta: "Apply",
    get: ["One fully produced video for your founder", "Our editing, pacing, and hooks", "A deliverable you own outright"],
    away: "One hero video you can post the day you get it.",
  },
  {
    key: "decode", c: LILAC, name: "The 2-Week Jumpstart", scope: "We decode your buyer", timeline: "2 weeks",
    price: "$8,000", cta: "Apply",
    get: ["We mine your sales calls for your buyer's real language", "Competitor + comment teardown", "Your buyer's decision decoded: risk, status, entry stage", "A 6-month video roadmap", "Your first 3 videos"],
    away: "Your buyer decoded and a 6-month plan, yours to keep.",
  },
  {
    key: "engine", c: PURPLE, name: "The Video Growth Engine", scope: "We run it for you", timeline: "Ongoing",
    price: "$15–25K/mo", cta: "See if We're a Fit", note: "Begins with a Jumpstart",
    get: ["10 to 12 videos a month, long and short", "72-hour turnaround", "A dedicated team that knows your buyer", "Monthly strategy reviews", "Work-free guarantee until the goal is hit"],
    away: "A content engine that runs every month without you.",
  },
];

export default function PricingOptions3() {
  return (
    <main style={{ background: NIGHT, minHeight: "100vh", paddingBottom: 80 }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 28px 8px" }}>
        <h1 style={{ color: "#fff", fontSize: 30, fontWeight: 700, margin: 0 }}>Pricing block — 5 options (Scroll Lab inspired)</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginTop: 8 }}>
          Separate, scope-named offers. Timeline + what you get + a standalone walk-away line on each. Free = direction, paid = the decode.
        </p>
      </div>

      {/* ============ V18 — SCROLL LAB ADAPTATION (LIGHT) ============ */}
      <Band id="v18" light label="Option 18 · Scroll Lab Adaptation (light)" blurb="The faithful adaptation, in your light palette. Free call as a banner, then three separate paid offers as columns. Each has a Timeline, a 'What you get' checklist, and a 'You'll walk away with' closer. Reads as a menu of distinct offers, not a path.">
        <h2 style={{ color: NIGHT, fontSize: "clamp(30px,4vw,48px)", fontWeight: 700, textAlign: "center", margin: "0 0 10px" }}>Ways to work <Italic dark>with us.</Italic></h2>
        <p style={{ color: "rgba(13,5,54,0.6)", fontSize: 15.5, textAlign: "center", maxWidth: 640, margin: "0 auto 26px", lineHeight: 1.5 }}>Each one is its own offer. Start wherever makes sense for you.</p>

        {/* free banner */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", background: "#fff", border: `1px solid rgba(13,5,54,0.1)`, borderLeft: `4px solid ${NEON}`, borderRadius: 14, padding: "18px 24px", marginBottom: 20 }}>
          <div style={{ flex: "1 1 420px" }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: "#1a8f43" }}>FREE · 30 MINUTES</span>
            <h3 style={{ color: NIGHT, fontSize: 20, fontWeight: 700, margin: "3px 0 4px" }}>The Direction Call</h3>
            <p style={{ color: "rgba(13,5,54,0.65)", fontSize: 14, margin: 0 }}>{POINT}</p>
          </div>
          <a href="#" style={{ padding: "12px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none", color: "#fff", background: PURPLE }}>Book the Call</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {OFFERS.slice(1).map((o) => (
            <div key={o.key} style={{ display: "flex", flexDirection: "column", background: "#fff", border: `1px solid rgba(13,5,54,0.1)`, borderTop: `3px solid ${o.c}`, borderRadius: 16, padding: "26px 24px" }}>
              <h3 style={{ color: NIGHT, fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>{o.name}</h3>
              <p style={{ color: "rgba(13,5,54,0.6)", fontSize: 14, margin: "0 0 14px" }}>{o.scope}</p>
              <div style={{ fontSize: 13, fontWeight: 700, color: PURPLE, marginBottom: 16 }}>Timeline: {o.timeline}</div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", color: NIGHT, marginBottom: 12 }}>WHAT YOU GET</div>
              <div style={{ color: "rgba(13,5,54,0.82)", flexGrow: 1 }}>
                {o.get.map((g) => <Check key={g} c={o.c === NEON ? "#1a8f43" : o.c}>{g}</Check>)}
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: NIGHT, margin: "18px 0 4px" }}>{o.price}</div>
              <p style={{ color: "rgba(13,5,54,0.55)", fontSize: 13, fontStyle: "italic", margin: "0 0 16px" }}>You&apos;ll walk away with {o.away.charAt(0).toLowerCase() + o.away.slice(1)}</p>
              <a href="#" style={{ textAlign: "center", padding: "13px", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none", color: "#fff", background: PURPLE }}>{o.cta}</a>
            </div>
          ))}
        </div>
      </Band>

      {/* ============ V19 — BUYER-LED INTENT (DARK) ============ */}
      <Band id="v19" label="Option 19 · Buyer-Led (what do you actually need?)" blurb="Same separate offers, but each opens in the buyer's own voice. Organizes by intent instead of scope, so a visitor self-selects. Distinct, plain-spoken, zero sequence cues.">
        <h2 style={{ color: "#fff", fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 600, margin: "0 0 26px" }}>What do you <Italic>actually need?</Italic></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
          {[
            { o: OFFERS[0], want: "“Just point me in the right direction.”" },
            { o: OFFERS[1], want: "“Show me one video first.”" },
            { o: OFFERS[2], want: "“I want the strategy nailed.”" },
            { o: OFFERS[3], want: "“Just run the whole thing for me.”" },
          ].map(({ o, want }) => (
            <div key={o.key} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${o.c}55`, borderRadius: 16, padding: "26px 26px" }}>
              <div style={{ fontFamily: "var(--a2-display)", fontStyle: "italic", fontSize: 19, color: o.c, marginBottom: 14 }}>{want}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0 }}>{o.name}</h3>
                <span style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>{o.price}</span>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>Timeline: {o.timeline}{o.note ? ` · ${o.note}` : ""}</div>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.5, margin: "0 0 16px" }}>You&apos;ll walk away with {o.away.charAt(0).toLowerCase() + o.away.slice(1)}</p>
              <a href="#" style={{ display: "inline-block", padding: "11px 22px", borderRadius: 11, fontWeight: 700, fontSize: 13.5, textDecoration: "none", color: "#fff", background: "transparent", border: `2px solid ${o.c}` }}>{o.cta}</a>
            </div>
          ))}
        </div>
      </Band>

      {/* ============ V20 — TIMELINE-FORWARD (DARK) ============ */}
      <Band id="v20" label="Option 20 · Timeline-Forward" blurb="Leans on the Scroll Lab 'Timeline:' cue as the hero of each offer. Big timeline badge up top, then what you get. Sells the speed and the depth of work, which is what justifies the premium on the decode.">
        <h2 style={{ color: "#fff", fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 600, margin: "0 0 26px" }}>Four offers. <Italic>Four timelines.</Italic></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {OFFERS.map((o) => (
            <div key={o.key} style={{ display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.02)", border: `1px solid ${o.c}44`, borderRadius: 16, padding: "22px 20px" }}>
              <div style={{ textAlign: "center", padding: "16px 8px", borderRadius: 12, background: `${o.c}14`, border: `1px solid ${o.c}55`, marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", color: o.c, marginBottom: 4 }}>TIMELINE</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{o.timeline}</div>
              </div>
              <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 700, margin: "0 0 4px", lineHeight: 1.25 }}>{o.name}</h3>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 14 }}>{o.price}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", flexGrow: 1 }}>
                {o.get.slice(0, 3).map((g) => <Check key={g} c={o.c}>{g}</Check>)}
              </div>
              <a href="#" style={{ marginTop: 14, textAlign: "center", padding: "11px", borderRadius: 11, fontWeight: 700, fontSize: 13, textDecoration: "none", color: "#fff", background: "transparent", border: `2px solid ${o.c}` }}>{o.cta}</a>
            </div>
          ))}
        </div>
      </Band>

      {/* ============ V21 — SPEC SHEET (DARK, mono) ============ */}
      <Band id="v21" label="Option 21 · Spec Sheet (lab aesthetic)" blurb="Borrows Scroll Lab's clarity but pushes it toward a structured spec-sheet feel, using your existing receipt/mono brand language. Each offer is a spec row: scope, timeline, deliverables, outcome, price. Engineered and confident.">
        <h2 style={{ color: "#fff", fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 600, margin: "0 0 26px" }}>The <Italic>spec sheet.</Italic></h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {OFFERS.map((o) => (
            <div key={o.key} style={{ display: "grid", gridTemplateColumns: "1.4fr 0.7fr 1.6fr 0.8fr", gap: 20, alignItems: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderLeft: `4px solid ${o.c}`, borderRadius: 12, padding: "20px 24px" }}>
              <div>
                <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10.5, letterSpacing: "0.14em", color: o.c, marginBottom: 6 }}>OFFER</div>
                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 2px" }}>{o.name}</h3>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.5 }}>{o.scope}</div>
              </div>
              <div>
                <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10.5, letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>TIMELINE</div>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{o.timeline}</div>
              </div>
              <div>
                <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10.5, letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>OUTCOME</div>
                <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 13.5, lineHeight: 1.45 }}>{o.away}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{o.price}</div>
                <a href="#" style={{ display: "inline-block", padding: "9px 18px", borderRadius: 10, fontWeight: 700, fontSize: 12.5, textDecoration: "none", color: "#fff", background: o.key === "engine" ? PURPLE : "transparent", border: o.key === "engine" ? "0" : `1.5px solid ${o.c}` }}>{o.cta}</a>
              </div>
            </div>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12.5, marginTop: 16, fontStyle: "italic" }}>Buy any one on its own. Pilot and Jumpstart credit toward the Engine.</p>
      </Band>

      {/* ============ V22 — HERO + OFFERS (Scroll Lab landing composition) ============ */}
      <Band id="v22" label="Option 22 · Hero + Offers (landing composition)" blurb="Mirrors Scroll Lab's homepage: a bold claim on the left, the separate offers stacked compactly on the right. Good if the pricing block doubles as a section opener. Each offer stays a distinct row with its own CTA.">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 40, alignItems: "center" }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: "clamp(32px,3.8vw,52px)", fontWeight: 600, lineHeight: 1.08, margin: 0 }}>
              Your videos should be <Italic>closing deals.</Italic>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.6, marginTop: 18, maxWidth: 440 }}>
              Pick how much you want us to carry. Each one stands on its own, and the first call is always free.
            </p>
            <p style={{ color: NEON, fontSize: 14.5, fontWeight: 600, marginTop: 16, fontStyle: "italic" }}>{POINT}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {OFFERS.map((o) => (
              <div key={o.key} style={{ display: "flex", alignItems: "center", gap: 16, background: o.key === "engine" ? `linear-gradient(90deg, rgba(90,51,255,0.14), rgba(90,51,255,0.04))` : "rgba(255,255,255,0.02)", border: `1px solid ${o.c}44`, borderRadius: 14, padding: "16px 20px" }}>
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ color: "#fff", fontSize: 16.5, fontWeight: 700, margin: "0 0 2px" }}>{o.name}</h3>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{o.scope} · {o.timeline}</div>
                </div>
                <div style={{ color: "#fff", fontSize: 17, fontWeight: 800, whiteSpace: "nowrap" }}>{o.price}</div>
                <a href="#" style={{ padding: "9px 16px", borderRadius: 10, fontWeight: 700, fontSize: 12.5, textDecoration: "none", color: "#fff", background: o.key === "engine" ? PURPLE : "transparent", border: o.key === "engine" ? "0" : `1.5px solid ${o.c}`, whiteSpace: "nowrap" }}>{o.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </Band>
    </main>
  );
}
