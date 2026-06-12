"use client";

/* Mockup: /mockups/pricing-options-2
   5 NEW treatments across 3 chosen strategic directions:
   - Diagnose cheap, execute premium (v5 ladder, v6 redacted report)
   - Pilot video entry, strategy gated (v7)
   - Reposition as buyer-intelligence firm (v8 dossier, v9 category-of-one)
   Heavy visual-architecture play per Ademola's note. Brand tokens only.
   No live files touched. Each band screenshotted by id. */

import React from "react";

const NIGHT = "var(--a2-night-core)";
const PURPLE = "var(--a2-electric-purple)";
const LILAC = "var(--a2-flex-lilac)";
const NEON = "var(--a2-electric-neon)";
const TEAL = "var(--a2-aqua-teal)";
const APPLY = "https://9yqatx.short.gy/vQTine";

function Italic({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 400, color: "#C9B6FF" }}>
      {children}
    </span>
  );
}

function Band({ id, label, blurb, children }: { id: string; label: string; blurb: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: NIGHT, paddingBottom: 56 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 28px 0" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: NEON,
            border: `1px solid rgba(102,247,142,0.35)`,
            borderRadius: 999,
            padding: "6px 14px",
            marginBottom: 12,
          }}
        >
          {label}
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, maxWidth: 800, margin: "0 0 28px", lineHeight: 1.5 }}>
          {blurb}
        </p>
        {children}
      </div>
    </section>
  );
}

function CTA({ children, filled }: { children: React.ReactNode; filled?: boolean }) {
  return (
    <a
      href={APPLY}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-block",
        padding: "15px 30px",
        borderRadius: 14,
        fontSize: 15,
        fontWeight: 700,
        textDecoration: "none",
        background: filled ? PURPLE : "transparent",
        color: "#fff",
        border: filled ? "0" : `2px solid ${NEON}`,
        boxShadow: filled ? `0 8px 24px rgba(90,51,255,0.45)` : `0 0 0 3px rgba(102,247,142,0.15)`,
      }}
    >
      {children}
    </a>
  );
}

export default function PricingOptions2() {
  return (
    <main style={{ background: NIGHT, minHeight: "100vh", paddingBottom: 80 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 28px 8px" }}>
        <h1 style={{ color: "#fff", fontSize: 30, fontWeight: 700, margin: 0 }}>Pricing block — 5 more options</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginTop: 8 }}>
          Built around buyer psychology as the moat. Diagnose cheap, execute premium. Same premium prices.
        </p>
      </div>

      {/* ============ V5 — THE DIAGNOSIS LADDER (vertical altitude spine) ============ */}
      <Band
        id="v5"
        label="Option 5 · The Diagnosis Ladder"
        blurb="The path as a vertical climb. Free directional insight at the bottom, an optional pilot video, then the Jumpstart where we actually decode your buyer, then the Engine. No strategy sold cheap. Credit flows up the spine."
      >
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", paddingLeft: 40 }}>
          {/* spine */}
          <div
            style={{
              position: "absolute",
              left: 13,
              top: 18,
              bottom: 18,
              width: 3,
              background: `linear-gradient(180deg, ${NEON} 0%, ${TEAL} 40%, ${PURPLE} 100%)`,
              borderRadius: 3,
            }}
          />
          {[
            { dot: NEON, alt: "FREE", title: "The Direction Call", price: "Free", desc: "We look at where you are and tell you how to approach your strategy. You leave pointed the right way, work together or not.", muted: true },
            { dot: TEAL, alt: "PILOT", title: "The Pilot Video (optional)", price: "$2.5K", desc: "One produced hero video so you feel our quality. A deliverable, not strategy. Credited 100% upward.", tag: "✓ 100% credited up" },
            { dot: LILAC, alt: "COMMIT", title: "The 2-Week Jumpstart", price: "$8K", desc: "The full research, the 6-month roadmap, your first 3 videos. The prescription lives here.", tag: "✓ Credits toward the Engine" },
            { dot: PURPLE, alt: "SCALE", title: "The Video Growth Engine", price: "$15–25K/mo", desc: "10 to 12 videos a month, 72-hour turnaround, dedicated team. Execution at full speed.", featured: true },
          ].map((r) => (
            <div key={r.alt} style={{ position: "relative", marginBottom: 22 }}>
              <div
                style={{
                  position: "absolute",
                  left: -33,
                  top: 22,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: r.dot,
                  boxShadow: `0 0 0 5px ${NIGHT}, 0 0 16px ${r.dot}`,
                }}
              />
              <div
                style={{
                  background: r.featured
                    ? `linear-gradient(180deg, rgba(90,51,255,0.12), rgba(90,51,255,0.03)), ${NIGHT}`
                    : "rgba(255,255,255,0.02)",
                  border: r.featured ? `1px solid ${PURPLE}` : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 18,
                  padding: "20px 24px",
                  boxShadow: r.featured ? `0 18px 50px rgba(90,51,255,0.25)` : "none",
                  opacity: r.muted ? 0.78 : 1,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: r.dot }}>{r.alt}</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{r.price}</span>
                </div>
                <h3 style={{ color: "#fff", fontSize: 19, fontWeight: 700, margin: "6px 0 6px" }}>{r.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.5, margin: 0 }}>{r.desc}</p>
                {r.tag && (
                  <span style={{ display: "inline-block", marginTop: 12, fontSize: 11.5, fontWeight: 700, color: NEON, border: `1px solid rgba(102,247,142,0.3)`, borderRadius: 999, padding: "4px 10px", background: "rgba(102,247,142,0.07)" }}>
                    {r.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
          <div style={{ paddingLeft: 4, marginTop: 6 }}>
            <CTA filled>Apply to Work With Us</CTA>
          </div>
        </div>
      </Band>

      {/* ============ V6 — THE REDACTED DIAGNOSIS (document, locked roadmap) ============ */}
      <Band
        id="v6"
        label="Option 6 · The Redacted Diagnosis"
        blurb="Direction is free, the decode is paid. The readable part is the strategic direction we'd give you on the call. Your actual buyer-psychology decode and roadmap stay locked in the 2-week Jumpstart, because that's the real work."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 28, alignItems: "start" }}>
          {/* The document */}
          <div style={{ background: "#0A0430", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: "28px 30px", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed rgba(255,255,255,0.18)", paddingBottom: 12, marginBottom: 18 }}>
              <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.55)" }}>STRATEGY DIRECTION</span>
              <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: "0.18em", color: NEON }}>A2 MEDIA</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", color: TEAL, marginBottom: 12 }}>HOW TO APPROACH YOUR STRATEGY</div>
            {[
              "Map content to the decisions your buyer makes, not funnel stages.",
              "Lead with the risk the economic buyer fears, not your feature list.",
              "Put your founder where the real decision-maker is actually watching.",
            ].map((t) => (
              <div key={t} style={{ display: "flex", gap: 10, marginBottom: 12, color: "rgba(255,255,255,0.88)", fontSize: 14.5, lineHeight: 1.5 }}>
                <span style={{ color: NEON, fontWeight: 800 }}>✓</span>
                <span>{t}</span>
              </div>
            ))}

            {/* locked section */}
            <div style={{ position: "relative", marginTop: 20, borderTop: "1px dashed rgba(255,255,255,0.18)", paddingTop: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", color: LILAC, marginBottom: 12 }}>YOUR BUYER DECODED + THE 6-MONTH ROADMAP</div>
              <div style={{ filter: "blur(5px)", userSelect: "none", pointerEvents: "none" }}>
                {["Phase 1 — reposition the founder around the risk the CFO actually fears", "Phase 2 — the 4-part series that moves your true entry-stage buyer", "Phase 3 — the proof engine that compresses your sales cycle 40%"].map((t) => (
                  <div key={t} style={{ color: "rgba(255,255,255,0.8)", fontSize: 14.5, marginBottom: 10 }}>{t}</div>
                ))}
              </div>
              <div style={{ position: "absolute", inset: "18px 0 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <div style={{ fontSize: 26 }}>🔒</div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Decoded in the 2-week Jumpstart</div>
              </div>
            </div>
          </div>

          {/* the two prices */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ border: `1px solid rgba(40,223,232,0.5)`, borderRadius: 16, padding: "22px 24px", background: "rgba(40,223,232,0.05)" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: TEAL, marginBottom: 8 }}>THE DIRECTION</div>
              <div style={{ fontSize: 38, fontWeight: 800, color: "#fff" }}>Free</div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.5, marginTop: 8 }}>On the call. How to approach your strategy, whether we work together or not.</p>
            </div>
            <div style={{ border: `1px solid ${PURPLE}`, borderRadius: 16, padding: "22px 24px", background: `linear-gradient(180deg, rgba(90,51,255,0.12), rgba(90,51,255,0.03)), ${NIGHT}`, boxShadow: `0 18px 50px rgba(90,51,255,0.25)` }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: "#fff", marginBottom: 8 }}>THE DECODE · 2-WEEK JUMPSTART</div>
              <div style={{ fontSize: 38, fontWeight: 800, color: "#fff" }}>$8K</div>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, lineHeight: 1.5, marginTop: 8 }}>Where we actually decode your buyer and build the roadmap. A real two-week process. Credits toward the Engine.</p>
              <div style={{ marginTop: 14 }}><CTA filled>Apply</CTA></div>
            </div>
          </div>
        </div>
      </Band>

      {/* ============ V7 — THE PILOT VIDEO (tangible entry, strategy gated) ============ */}
      <Band
        id="v7"
        label="Option 7 · The Pilot Video"
        blurb="Lower the cliff with a deliverable, not strategy. They feel your quality and process on one produced hero video. The buyer-psychology research stays fully locked in the Jumpstart, so nothing of the moat is given away cheap."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "center" }}>
          {/* video frame */}
          <div>
            <div
              style={{
                position: "relative",
                aspectRatio: "16/9",
                borderRadius: 18,
                background: `linear-gradient(135deg, ${PURPLE} 0%, ${LILAC} 55%, ${TEAL} 130%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 24px 60px rgba(90,51,255,0.35)`,
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 40%, rgba(13,5,54,0.55) 100%)" }} />
              <div style={{ position: "relative", width: 76, height: 76, borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }}>
                <div style={{ width: 0, height: 0, borderTop: "15px solid transparent", borderBottom: "15px solid transparent", borderLeft: `24px solid ${PURPLE}`, marginLeft: 6 }} />
              </div>
              <div style={{ position: "absolute", bottom: 16, left: 18, color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: "0.02em" }}>Your Pilot Video · 0:48</div>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Fast turnaround", "Your founder, your message", "Feel the quality first"].map((t) => (
                <span key={t} style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999, padding: "5px 12px" }}>{t}</span>
              ))}
            </div>
          </div>

          {/* offer copy */}
          <div>
            <h2 style={{ color: "#fff", fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 600, lineHeight: 1.12, margin: 0 }}>
              See one video <Italic>before you commit.</Italic>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 15.5, lineHeight: 1.6, marginTop: 16 }}>
              We produce one hero video for your founder, fast. You feel exactly how we work and what your buyers respond to. Then we build the engine behind it.
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 22 }}>
              <span style={{ fontSize: 44, fontWeight: 800, color: "#fff" }}>$2,500</span>
              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 16 }}>one-time</span>
            </div>
            <span style={{ display: "inline-block", marginTop: 12, fontSize: 12, fontWeight: 700, color: NEON, border: `1px solid rgba(102,247,142,0.3)`, borderRadius: 999, padding: "5px 12px", background: "rgba(102,247,142,0.07)" }}>
              ✓ Credited toward your Jumpstart · strategy stays in the Engine
            </span>
            <div style={{ marginTop: 22 }}><CTA filled>Apply to Work With Us</CTA></div>
          </div>
        </div>
      </Band>

      {/* ============ V8 — BUYER INTELLIGENCE DOSSIER (reposition) ============ */}
      <Band
        id="v8"
        label="Option 8 · Buyer-Intelligence Dossier (reposition)"
        blurb="The big swing. You're not a video agency, you're a buyer-intelligence firm and video is the output. Reads like a research product: three phases, a brief aesthetic, monospace data language. Your competitive set becomes consultancies, not editors."
      >
        <h2 style={{ color: "#fff", fontSize: "clamp(28px,3.6vw,46px)", fontWeight: 600, lineHeight: 1.12, margin: "0 0 8px", maxWidth: 820 }}>
          We decode how your buyers <Italic>decide.</Italic> Then we ship it as video.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15.5, maxWidth: 720, marginBottom: 30 }}>
          The research is the product. The video is the delivery vehicle.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
          {[
            { n: "01", k: "INTELLIGENCE", c: TEAL, t: "Buyer Decision Map", d: "We reverse-engineer how your market actually buys: the risks, the status games, the real entry stage. This is the moat.", f: "Deliverable: the dossier" },
            { n: "02", k: "ROADMAP", c: LILAC, t: "6-Month Content Plan", d: "Every asset mapped to a decision your buyer has to make, in the order they make them.", f: "Deliverable: the plan + first 3" },
            { n: "03", k: "ENGINE", c: PURPLE, t: "Video Growth Engine", d: "10 to 12 videos a month, 72-hour turnaround, engineered to move buyers stage to stage.", f: "$15–25K / month" },
          ].map((p) => (
            <div key={p.n} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${p.c}55`, borderRadius: 16, padding: "24px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 13, color: p.c, letterSpacing: "0.1em" }}>PHASE {p.n}</span>
                <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.16em", color: p.c, border: `1px solid ${p.c}66`, borderRadius: 999, padding: "4px 9px" }}>{p.k}</span>
              </div>
              <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>{p.t}</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.55, margin: "0 0 16px" }}>{p.d}</p>
              <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12, color: "rgba(255,255,255,0.55)", borderTop: "1px dashed rgba(255,255,255,0.15)", paddingTop: 12 }}>{p.f}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 26, flexWrap: "wrap" }}>
          <CTA filled>Request Access</CTA>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13.5, fontStyle: "italic" }}>We take a limited number of accounts each quarter.</span>
        </div>
      </Band>

      {/* ============ V9 — CATEGORY OF ONE (reposition, manifesto) ============ */}
      <Band
        id="v9"
        label="Option 9 · Category of One (reposition, manifesto)"
        blurb="The most confident version. A manifesto hero that rejects the category outright, a named methodology as the spine, and pricing demoted to a quiet footnote. The price confidence IS the positioning. Highest risk, highest status."
      >
        <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)", textDecoration: "line-through", marginBottom: 10 }}>
            A VIDEO AGENCY
          </div>
          <h2 style={{ color: "#fff", fontSize: "clamp(34px,5vw,62px)", fontWeight: 600, lineHeight: 1.08, margin: 0 }}>
            We&apos;re a <Italic>buyer-intelligence</Italic> firm. The video is just how it ships.
          </h2>

          {/* named method badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 28, padding: "12px 22px", borderRadius: 999, border: `1px solid ${LILAC}`, background: "rgba(143,69,238,0.08)", boxShadow: `0 0 30px rgba(143,69,238,0.25)` }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: NEON, boxShadow: `0 0 10px ${NEON}` }} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "0.02em" }}>The Buyer-Decision Method™</span>
          </div>

          {/* horizontal mini-path */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
            {["Decode the buyer", "Map 6 months", "Ship the engine"].map((s, i) => (
              <React.Fragment key={s}>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, fontWeight: 600 }}>{s}</span>
                {i < 2 && <span style={{ color: PURPLE, fontSize: 18, fontWeight: 900 }}>→</span>}
              </React.Fragment>
            ))}
          </div>

          <div style={{ marginTop: 36 }}>
            <CTA filled>Apply to Work With Us</CTA>
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 22, fontStyle: "italic" }}>
            Engagements start at $8K. Most partners run $15–25K/month. We take a few each quarter.
          </p>
        </div>
      </Band>

      {/* ============ V10 — TIER 0: THE FREE DIAGNOSIS CALL (4-tier strip) ============ */}
      <Band
        id="v10"
        label="Option 10 · Tier 0 is the Call (made explicit)"
        blurb="Your free tier IS the call, named and given a real card. We point you in the right direction, you leave knowing the path whether we work together or not. The actual buyer decode stays in the paid Jumpstart."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.15fr", gap: 16, alignItems: "stretch" }}>
          {[
            { badge: "FREE", bc: NEON, name: "The Direction Call", price: "$0", desc: "We look at where you are and point you the right way. You leave with a direction, work together or not.", cta: "Book the Call", filled: false, b: "rgba(102,247,142,0.5)" },
            { badge: "Step 1", bc: TEAL, name: "The Pilot Video (optional)", price: "$2.5K", desc: "One produced hero video. Feel our quality. A deliverable, not strategy. Credited up.", cta: "Apply", filled: false, b: "rgba(40,223,232,0.45)" },
            { badge: "Step 2", bc: LILAC, name: "The 2-Week Jumpstart", price: "$8K", desc: "Full research, 6-month roadmap, your first 3 videos. Credits to the Engine.", cta: "Apply", filled: false, b: "rgba(143,69,238,0.45)" },
            { badge: "Step 3", bc: PURPLE, name: "The Video Growth Engine", price: "$15–25K/mo", desc: "10–12 videos a month, 72-hour turnaround, dedicated team.", cta: "See if We're a Fit", filled: true, b: PURPLE },
          ].map((c) => (
            <div
              key={c.name}
              style={{
                display: "flex",
                flexDirection: "column",
                background: c.filled ? `linear-gradient(180deg, rgba(90,51,255,0.12), rgba(90,51,255,0.03)), ${NIGHT}` : "rgba(255,255,255,0.02)",
                border: `1px solid ${c.b}`,
                borderRadius: 16,
                padding: "22px 20px",
                boxShadow: c.filled ? `0 18px 50px rgba(90,51,255,0.25)` : "none",
              }}
            >
              <span style={{ alignSelf: "flex-start", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", color: c.badge === "FREE" ? NIGHT : "#fff", background: c.badge === "FREE" ? NEON : `${c.bc}33`, border: c.badge === "FREE" ? "0" : `1px solid ${c.bc}66`, borderRadius: 999, padding: "5px 11px", marginBottom: 14 }}>{c.badge}</span>
              <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.25 }}>{c.name}</h3>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{c.price}</div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13.5, lineHeight: 1.5, margin: "0 0 18px", flexGrow: 1 }}>{c.desc}</p>
              <a href={APPLY} target="_blank" rel="noreferrer" style={{ textAlign: "center", padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", color: "#fff", background: c.filled ? PURPLE : "transparent", border: c.filled ? "0" : `2px solid ${c.bc}` }}>{c.cta}</a>
            </div>
          ))}
        </div>
      </Band>

      {/* ============ V11 — THE BUYER DECISION MAP (diagram-led) ============ */}
      <Band
        id="v11"
        label="Option 11 · The Buyer Decision Map (diagram-led)"
        blurb="Architecture is a map, not a price table. On the call we show the framework and point you the right way. The actual decode of your buyer is the paid 2-week work, not a free reveal."
      >
        <h2 style={{ color: "#fff", fontSize: "clamp(26px,3.4vw,42px)", fontWeight: 600, lineHeight: 1.12, margin: "0 0 8px", maxWidth: 800 }}>
          We point you in the <Italic>right direction.</Italic>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, maxWidth: 720, marginBottom: 28 }}>
          Free on the call. The actual decode of your buyer is the 2-week work.
        </p>

        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
          {/* connecting line */}
          <div style={{ position: "absolute", top: 26, left: "10%", right: "10%", height: 2, background: `linear-gradient(90deg, ${TEAL}, ${LILAC}, ${PURPLE})`, zIndex: 0 }} />
          {[
            { s: "Unaware", g: false },
            { s: "Risk-aware", g: true },
            { s: "Comparing", g: true },
            { s: "Selling internally", g: true },
            { s: "Closing", g: false },
          ].map((st, i) => (
            <div key={st.s} style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", margin: "20px auto 14px", background: st.g ? NEON : "rgba(255,255,255,0.3)", boxShadow: st.g ? `0 0 14px ${NEON}` : "none", border: "3px solid " + NIGHT }} />
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{st.s}</div>
              <div
                style={{
                  minHeight: 78,
                  borderRadius: 12,
                  padding: "12px 10px",
                  fontSize: 11.5,
                  lineHeight: 1.4,
                  color: st.g ? "#fff" : "rgba(255,255,255,0.45)",
                  background: st.g ? "rgba(102,247,142,0.08)" : "rgba(255,255,255,0.02)",
                  border: st.g ? `1px solid rgba(102,247,142,0.4)` : "1px dashed rgba(255,255,255,0.15)",
                }}
              >
                {st.g ? "Stages we'd focus your content" : "Already covered"}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 28, marginTop: 30, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: NEON }}>THE DIRECTION</span>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>Free on the call</span>
          </div>
          <div style={{ width: 1, height: 34, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: PURPLE }}>THE BUILD</span>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>$8K → $15–25K/mo</span>
          </div>
          <div style={{ marginLeft: "auto" }}><CTA filled>Book the Call</CTA></div>
        </div>
      </Band>

      {/* ============ V12 — TWO DOORS (free path vs premium, prize frame) ============ */}
      <Band
        id="v12"
        label="Option 12 · Two Doors (prize frame + free path)"
        blurb="A clean fork. One door is free and open to anyone: the diagnosis call. The other is the premium engine, and you qualify to walk through it. Makes the free tier generous and the paid tier selective at the same time."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* free door */}
          <div style={{ border: `1px solid rgba(102,247,142,0.45)`, borderRadius: 20, padding: "34px 32px", background: "rgba(102,247,142,0.04)", display: "flex", flexDirection: "column" }}>
            <span style={{ alignSelf: "flex-start", fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: NIGHT, background: NEON, borderRadius: 999, padding: "5px 12px", marginBottom: 18 }}>START FREE</span>
            <h3 style={{ color: "#fff", fontSize: 26, fontWeight: 700, margin: "0 0 6px" }}>The Direction Call</h3>
            <div style={{ fontSize: 44, fontWeight: 800, color: "#fff", marginBottom: 14 }}>$0</div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.6, margin: "0 0 20px", flexGrow: 1 }}>
              Bring your current content. We tell you how to approach your video strategy and point you the right way. You leave knowing the path, whether we work together or not.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px" }}>
              {["No pitch deck", "A clear strategic direction", "Yours to keep"].map((t) => (
                <li key={t} style={{ display: "flex", gap: 10, color: "rgba(255,255,255,0.85)", fontSize: 14, marginBottom: 10 }}><span style={{ color: NEON, fontWeight: 800 }}>✓</span>{t}</li>
              ))}
            </ul>
            <a href={APPLY} target="_blank" rel="noreferrer" style={{ textAlign: "center", padding: "15px", borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: "none", color: "#fff", background: "transparent", border: `2px solid ${NEON}` }}>Book the Call</a>
          </div>

          {/* premium door */}
          <div style={{ border: `1px solid ${PURPLE}`, borderRadius: 20, padding: "34px 32px", background: `linear-gradient(180deg, rgba(90,51,255,0.14), rgba(90,51,255,0.03)), ${NIGHT}`, boxShadow: `0 24px 60px rgba(90,51,255,0.3)`, display: "flex", flexDirection: "column" }}>
            <span style={{ alignSelf: "flex-start", fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: "#fff", background: PURPLE, borderRadius: 999, padding: "5px 12px", marginBottom: 18 }}>BY APPLICATION</span>
            <h3 style={{ color: "#fff", fontSize: 26, fontWeight: 700, margin: "0 0 6px" }}>The Video Growth Engine</h3>
            <div style={{ fontSize: 44, fontWeight: 800, color: "#fff", marginBottom: 14 }}>$15–25K<span style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", fontWeight: 400 }}> /mo</span></div>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 15, lineHeight: 1.6, margin: "0 0 20px", flexGrow: 1 }}>
              The full research, the 6-month roadmap, and 10 to 12 videos a month engineered to close. Starts with the $8K Jumpstart, credited toward your retainer. We take a few partners each quarter.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px" }}>
              {["72-hour turnaround", "Dedicated team that knows your buyer", "Work-free guarantee until the goal is hit"].map((t) => (
                <li key={t} style={{ display: "flex", gap: 10, color: "rgba(255,255,255,0.9)", fontSize: 14, marginBottom: 10 }}><span style={{ color: LILAC, fontWeight: 800 }}>✓</span>{t}</li>
              ))}
            </ul>
            <a href={APPLY} target="_blank" rel="noreferrer" style={{ textAlign: "center", padding: "15px", borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: "none", color: "#fff", background: PURPLE, border: "0", boxShadow: `0 8px 24px rgba(90,51,255,0.45)` }}>Apply to Work With Us</a>
          </div>
        </div>
      </Band>

      {/* ============ V13 — DIRECTION FREE, THE DECODE IS THE WORK ============ */}
      <Band
        id="v13"
        label="Option 13 · Direction Free, the Decode is the Work"
        blurb="The cleanest answer to your constraint. The call gives direction, free. The $8K Jumpstart is shown as what it actually is: a real two-week decode process. Showing the work is what justifies the premium and explains why it can't be given away."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 28, alignItems: "stretch" }}>
          {/* free direction */}
          <div style={{ border: `1px solid rgba(102,247,142,0.45)`, borderRadius: 20, padding: "30px 28px", background: "rgba(102,247,142,0.04)", display: "flex", flexDirection: "column" }}>
            <span style={{ alignSelf: "flex-start", fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: NIGHT, background: NEON, borderRadius: 999, padding: "5px 12px", marginBottom: 18 }}>FREE</span>
            <h3 style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>The Direction Call</h3>
            <div style={{ fontSize: 44, fontWeight: 800, color: "#fff", marginBottom: 14 }}>$0</div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.6, margin: "0 0 18px", flexGrow: 1 }}>
              We look at where you are and tell you how to approach your video strategy. You leave pointed the right way, whether we work together or not.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
              {["No pitch", "A real strategic direction", "Yours to keep"].map((t) => (
                <li key={t} style={{ display: "flex", gap: 10, color: "rgba(255,255,255,0.85)", fontSize: 14, marginBottom: 10 }}><span style={{ color: NEON, fontWeight: 800 }}>✓</span>{t}</li>
              ))}
            </ul>
            <a href={APPLY} target="_blank" rel="noreferrer" style={{ textAlign: "center", padding: "14px", borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: "none", color: "#fff", background: "transparent", border: `2px solid ${NEON}` }}>Book the Call</a>
          </div>

          {/* paid decode — process timeline */}
          <div style={{ border: `1px solid ${PURPLE}`, borderRadius: 20, padding: "30px 32px", background: `linear-gradient(180deg, rgba(90,51,255,0.12), rgba(90,51,255,0.03)), ${NIGHT}`, boxShadow: `0 24px 60px rgba(90,51,255,0.28)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: "#fff" }}>THE 2-WEEK DECODE</span>
              <span style={{ fontSize: 30, fontWeight: 800, color: "#fff" }}>$8K</span>
            </div>
            <h3 style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: "0 0 20px" }}>The 2-Week Jumpstart</h3>
            <div style={{ position: "relative", paddingLeft: 26 }}>
              <div style={{ position: "absolute", left: 5, top: 6, bottom: 30, width: 2, background: `linear-gradient(180deg, ${TEAL}, ${PURPLE})` }} />
              {[
                { d: "Days 1–3", t: "We sit in your sales calls and mine your buyer's actual language" },
                { d: "Days 4–7", t: "We tear down competitor content and the comments your buyers leave" },
                { d: "Days 8–11", t: "We decode the decision: the risk, the status game, the real entry stage" },
                { d: "Days 12–14", t: "6-month roadmap + your first 3 videos" },
              ].map((s) => (
                <div key={s.d} style={{ position: "relative", marginBottom: 16 }}>
                  <div style={{ position: "absolute", left: -25, top: 4, width: 12, height: 12, borderRadius: "50%", background: PURPLE, boxShadow: `0 0 0 4px ${NIGHT}` }} />
                  <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: "0.1em", color: TEAL }}>{s.d}</div>
                  <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 14.5, lineHeight: 1.45 }}>{s.t}</div>
                </div>
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontStyle: "italic", fontSize: 13.5, margin: "8px 0 18px" }}>
              This is why it&apos;s premium. Two weeks of real work, not a download. Credits toward the Engine.
            </p>
            <CTA filled>Apply to Work With Us</CTA>
          </div>
        </div>
      </Band>

      {/* ============ V14 — FREE CALL + PILOT RUNG (honest cheap entry) ============ */}
      <Band
        id="v14"
        label="Option 14 · Free Call + Pilot Rung (the honest cheap entry)"
        blurb="The only honest low-cliff rung is a deliverable, not strategy. Free direction on the call, an optional $2.5K pilot video to feel your quality, then the paid decode and the engine. No strategy is ever sold cheap."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.15fr", gap: 16, alignItems: "stretch" }}>
          {[
            { badge: "FREE", bc: NEON, name: "The Direction Call", price: "$0", desc: "We point you the right way. You leave knowing the path. Yours to keep.", cta: "Book the Call", filled: false },
            { badge: "Optional", bc: TEAL, name: "The Pilot Video", price: "$2.5K", desc: "One produced hero video. Feel our quality. A deliverable, not strategy. Credited up.", cta: "Apply", filled: false },
            { badge: "The Decode", bc: LILAC, name: "The 2-Week Jumpstart", price: "$8K", desc: "We decode your buyer and build the 6-month roadmap. The real work. Credits to the Engine.", cta: "Apply", filled: false },
            { badge: "The Engine", bc: PURPLE, name: "Video Growth Engine", price: "$15–25K/mo", desc: "Execution. 10 to 12 videos a month, 72-hour turnaround, dedicated team.", cta: "See if We're a Fit", filled: true },
          ].map((c) => (
            <div
              key={c.name}
              style={{
                display: "flex",
                flexDirection: "column",
                background: c.filled ? `linear-gradient(180deg, rgba(90,51,255,0.12), rgba(90,51,255,0.03)), ${NIGHT}` : "rgba(255,255,255,0.02)",
                border: `1px solid ${c.filled ? PURPLE : c.bc + "55"}`,
                borderRadius: 16,
                padding: "22px 20px",
                boxShadow: c.filled ? `0 18px 50px rgba(90,51,255,0.25)` : "none",
              }}
            >
              <span style={{ alignSelf: "flex-start", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", color: c.badge === "FREE" ? NIGHT : "#fff", background: c.badge === "FREE" ? NEON : `${c.bc}33`, border: c.badge === "FREE" ? "0" : `1px solid ${c.bc}66`, borderRadius: 999, padding: "5px 11px", marginBottom: 14 }}>{c.badge}</span>
              <h3 style={{ color: "#fff", fontSize: 16.5, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.25 }}>{c.name}</h3>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{c.price}</div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.5, margin: "0 0 18px", flexGrow: 1 }}>{c.desc}</p>
              <a href={APPLY} target="_blank" rel="noreferrer" style={{ textAlign: "center", padding: "12px", borderRadius: 12, fontSize: 13.5, fontWeight: 700, textDecoration: "none", color: "#fff", background: c.filled ? PURPLE : "transparent", border: c.filled ? "0" : `2px solid ${c.bc}` }}>{c.cta}</a>
            </div>
          ))}
        </div>
      </Band>

      {/* ============ V15 — THE HONEST PREMIUM (constraint as flex) ============ */}
      <Band
        id="v15"
        label="Option 15 · The Honest Premium (constraint as a flex)"
        blurb="Turns your line into positioning. You don't give the decode away, and saying so out loud is a status move. Free direction, paid decode, premium tone. Klaff would call this the prize frame."
      >
        <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(30px,4.4vw,54px)", fontWeight: 600, lineHeight: 1.1, margin: 0 }}>
            We won&apos;t hand you your buyer&apos;s psychology <Italic>for free.</Italic>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 16.5, lineHeight: 1.6, marginTop: 18, maxWidth: 720, marginInline: "auto" }}>
            We&apos;ll point you in the right direction on a call. Then, if we&apos;re a fit, we spend two weeks actually decoding how your buyer decides and build the engine around it.
          </p>

          <div style={{ display: "flex", alignItems: "stretch", justifyContent: "center", gap: 0, marginTop: 40, flexWrap: "wrap" }}>
            {[
              { k: "FREE", c: NEON, t: "The Direction", d: "A call. How to approach it." },
              { k: "$8K", c: LILAC, t: "The 2-Week Decode", d: "We decode your buyer + roadmap." },
              { k: "$15–25K/mo", c: PURPLE, t: "The Engine", d: "We execute it as video." },
            ].map((s, i) => (
              <React.Fragment key={s.t}>
                <div style={{ flex: "1 1 200px", maxWidth: 240, padding: "0 18px" }}>
                  <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", color: s.c, marginBottom: 8 }}>{s.k}</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{s.t}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13.5, lineHeight: 1.5 }}>{s.d}</div>
                </div>
                {i < 2 && <div style={{ display: "flex", alignItems: "center", color: PURPLE, fontSize: 22, fontWeight: 900 }}>→</div>}
              </React.Fragment>
            ))}
          </div>

          <div style={{ marginTop: 40 }}><CTA filled>Book the Call</CTA></div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 20, fontStyle: "italic" }}>
            The decode is the work. That&apos;s why it&apos;s premium.
          </p>
        </div>
      </Band>

      {/* ============ V16 — THE MENU (separate offers, peers not steps) ============ */}
      <Band
        id="v16"
        label="Option 16 · The Menu (separate offers, not a path)"
        blurb="Fixes the ladder. No spine, no arrows, no Step 1/2/3. Four distinct offers as visual peers, each with its own accent, its own outcome, its own CTA. Reads like a product lineup you pick from, not a staircase you climb. The relationship lives in one quiet footnote."
      >
        <h2 style={{ color: "#fff", fontSize: "clamp(26px,3.2vw,40px)", fontWeight: 600, lineHeight: 1.12, margin: "0 0 6px" }}>
          Four ways to <Italic>work with us.</Italic>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginBottom: 28 }}>
          Each one is its own offer. Start wherever makes sense for you.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, alignItems: "stretch" }}>
          {[
            { c: NEON, nature: "FREE", name: "The Direction Call", price: "$0", out: "A clear direction for your video strategy.", cta: "Book the Call" },
            { c: TEAL, nature: "ONE-TIME", name: "The Pilot Video", price: "$2.5K", out: "One produced hero video to feel our quality.", cta: "Apply" },
            { c: LILAC, nature: "ONE-TIME", name: "The 2-Week Jumpstart", price: "$8K", out: "Your buyer decoded + a 6-month roadmap.", cta: "Apply" },
            { c: PURPLE, nature: "MONTHLY", name: "The Video Growth Engine", price: "$15–25K", out: "We run your whole content engine.", cta: "See if We're a Fit", note: "Begins with a Jumpstart" },
          ].map((o) => (
            <div
              key={o.name}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${o.c}55`,
                borderTop: `3px solid ${o.c}`,
                borderRadius: 16,
                padding: "22px 20px",
              }}
            >
              <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.16em", color: o.c, marginBottom: 14 }}>{o.nature}</span>
              <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.25 }}>{o.name}</h3>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{o.price}</div>
              {o.note && <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>{o.note}</div>}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", margin: "12px 0", paddingTop: 12 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>YOU WALK AWAY WITH</div>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13.5, lineHeight: 1.5, margin: 0, flexGrow: 1 }}>{o.out}</p>
              </div>
              <a href={APPLY} target="_blank" rel="noreferrer" style={{ marginTop: "auto", textAlign: "center", padding: "12px", borderRadius: 12, fontSize: 13.5, fontWeight: 700, textDecoration: "none", color: "#fff", background: "transparent", border: `2px solid ${o.c}` }}>{o.cta}</a>
            </div>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 18, fontStyle: "italic" }}>
          Each is its own offer. If you buy the Pilot or the Jumpstart first, it credits toward the Engine.
        </p>
      </Band>

      {/* ============ V17 — EACH STANDS ALONE (stacked separate blocks) ============ */}
      <Band
        id="v17"
        label="Option 17 · Each Stands Alone (separate, full-width blocks)"
        blurb="The most explicit 'these are separate' treatment. Full-width self-contained blocks with real whitespace between them, each tagged STANDALONE, each with its own outcome and CTA. No numbers, no connectors. The one dependency and the credit note sit at the very bottom as a separate line."
      >
        <h2 style={{ color: "#fff", fontSize: "clamp(26px,3.2vw,40px)", fontWeight: 600, lineHeight: 1.12, margin: "0 0 6px" }}>
          Every offer <Italic>stands on its own.</Italic>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginBottom: 26 }}>
          Buy one. Buy none. Come back for the next when you&apos;re ready.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { c: NEON, name: "The Direction Call", nature: "FREE · STANDALONE", price: "$0", out: "We tell you how to approach your strategy. You leave pointed the right way.", cta: "Book the Call" },
            { c: TEAL, name: "The Pilot Video", nature: "ONE-TIME · STANDALONE", price: "$2.5K", out: "One produced hero video, fast. A deliverable you own, not a commitment.", cta: "Apply" },
            { c: LILAC, name: "The 2-Week Jumpstart", nature: "ONE-TIME · STANDALONE", price: "$8K", out: "We decode your buyer and hand you a 6-month roadmap plus your first 3 videos.", cta: "Apply" },
            { c: PURPLE, name: "The Video Growth Engine", nature: "MONTHLY · BEGINS WITH A JUMPSTART", price: "$15–25K/mo", out: "We run your content engine: 10 to 12 videos a month, 72-hour turnaround, dedicated team.", cta: "See if We're a Fit" },
          ].map((o) => (
            <div
              key={o.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                flexWrap: "wrap",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderLeft: `4px solid ${o.c}`,
                borderRadius: 14,
                padding: "22px 26px",
              }}
            >
              <div style={{ flex: "1 1 380px", minWidth: 280 }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", color: o.c }}>{o.nature}</span>
                <h3 style={{ color: "#fff", fontSize: 21, fontWeight: 700, margin: "4px 0 6px" }}>{o.name}</h3>
                <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 14.5, lineHeight: 1.5, margin: 0 }}>{o.out}</p>
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", whiteSpace: "nowrap" }}>{o.price}</div>
              <a href={APPLY} target="_blank" rel="noreferrer" style={{ textAlign: "center", padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", color: "#fff", background: "transparent", border: `2px solid ${o.c}`, whiteSpace: "nowrap" }}>{o.cta}</a>
            </div>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 18, fontStyle: "italic" }}>
          The only link between them: buy the Pilot or Jumpstart first and it credits toward the Engine. Otherwise, every one stands alone.
        </p>
      </Band>
    </main>
  );
}
