"use client";

/* Mockup: /mockups/cal-inline-options
   Three takes on the same simple pattern:
     Click "See if We're a Fit" -> blur the page -> open Cal inline.

   No flip. No qualification chips. Just the visitor and the calendar.

   A · Pure Modal     · Naked Cal embed + close. Cleanest.
   B · Personal Pitch · Ademola's photo + reassurance on the left, Cal on the right.
   C · Hero Card      · A short promise on top, wide Cal embed below.
*/

import React, { useState } from "react";

const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const CAL_EMBED_URL = "https://cal.com/a2media/meeting?embed=true&layout=month_view";

type Tier = "oneoff" | "jumpstart" | "engine";
const TIERS: Record<Tier, { badge: string; name: string; price: string; sub: string; desc: string; cta: string; style: "outline" | "primary" }> = {
  oneoff: { badge: "ONE-TIME", name: "One-off Video", price: "$2K", sub: "starting price", desc: "You give us the raw footage. We make it look expensive.", cta: "Get Started", style: "outline" },
  jumpstart: { badge: "ONE-TIME", name: "2-Week Jumpstart", price: "$8K", sub: "one-time", desc: "We research your buyer, map 6 months of video, give you 3 to test.", cta: "Get Started", style: "outline" },
  engine: { badge: "MONTHLY", name: "Video Growth Engine", price: "$15K — $25K", sub: "/ month", desc: "We run your whole video department. Script to screen.", cta: "See if We're a Fit", style: "primary" },
};

export default function CalInlineOptionsMockup() {
  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header style={S.frameHeader}>
        <span style={S.frameTag}>Click → blur → Cal inline · 3 options</span>
        <h2 style={S.frameTitle}>
          Same simple pattern. Three different amounts of wrapping.
        </h2>
        <p style={S.frameNotes}>
          Click any &ldquo;See if We&apos;re a Fit&rdquo; button below. The
          page blurs, a modal opens, your real Cal widget loads inline.
          Backdrop click or &times; closes it. The three options differ
          only in how much context wraps the embed.
        </p>
      </header>

      <Demo
        tag="Option A · Pure Modal"
        title="Just the embed. Nothing else."
        notes="Naked Cal widget inside a centered modal with a close button. Smallest, fastest to read, zero distraction. Best when the embed itself carries the brand (your event description already does most of the work)."
      >
        <Stage layout="pure" />
      </Demo>

      <Demo
        tag="Option B · Personal Pitch"
        title="Photo + promise on the left, Cal on the right."
        notes="Your photo, a one-sentence promise, and a few quick reassurance bullets next to the embed. Adds warmth and pre-frames the call. Best at the $15K+ price point where buyers want to feel like a person, not a funnel step."
      >
        <Stage layout="pitch" />
      </Demo>

      <Demo
        tag="Option C · Hero Card"
        title="Promise on top, wide embed below."
        notes="A short headline + 3 reassurance chips above the embed. The Cal widget renders full-width underneath. Maximum room for the calendar, minimum scrolling on mobile. Best if you ever want to add a video preview or testimonial above the calendar."
      >
        <Stage layout="hero" />
      </Demo>

      <p style={S.footnote}>
        All three load the same Cal event (cal.com/a2media/meeting) inside
        an iframe. Production will swap to @calcom/embed-react so we can
        capture the booking event the moment it fires.
      </p>
    </main>
  );
}

/* ============================================================ */
/*  Demo wrapper                                                */
/* ============================================================ */

function Demo({ tag, title, notes, children }: { tag: string; title: string; notes: string; children: React.ReactNode }) {
  return (
    <section style={S.demoCard}>
      <div style={S.demoHead}>
        <span style={S.demoTag}>{tag}</span>
        <h3 style={S.demoTitle}>{title}</h3>
        <p style={S.demoNotes}>{notes}</p>
      </div>
      <div style={S.demoStage}>{children}</div>
    </section>
  );
}

/* ============================================================ */
/*  Stage                                                       */
/* ============================================================ */

function Stage({ layout }: { layout: "pure" | "pitch" | "hero" }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={S.stageWrap}>
      {/* Pricing row (blurs when open) */}
      <div
        style={{
          ...S.row,
          filter: open ? "blur(8px) brightness(0.5)" : "none",
          transform: open ? "scale(0.97)" : "scale(1)",
          opacity: open ? 0.55 : 1,
          pointerEvents: open ? "none" : "auto",
          transition: "filter 420ms ease, transform 420ms ease, opacity 420ms ease",
        }}
      >
        {(Object.keys(TIERS) as Tier[]).map((t) => (
          <PriceCard key={t} tier={t} onClick={() => setOpen(true)} />
        ))}
      </div>

      {/* Backdrop */}
      <div
        style={{
          ...S.backdrop,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={() => setOpen(false)}
      />

      {/* Modal panel */}
      {open && (
        <Modal layout={layout} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

function PriceCard({ tier, onClick }: { tier: Tier; onClick: () => void }) {
  const t = TIERS[tier];
  const isEngine = tier === "engine";
  return (
    <div style={isEngine ? S.engineCard : S.sideCard}>
      <span style={isEngine ? S.badgePop : S.badgeMute}>{t.badge}</span>
      <h4 style={S.cardName}>{t.name}</h4>
      <div style={S.cardPrice}>
        {t.price} <small style={S.cardPriceSub}>{t.sub}</small>
      </div>
      <p style={S.cardDesc}>{t.desc}</p>
      <button
        type="button"
        style={t.style === "primary" ? S.ctaPrimary : S.ctaOutline}
        onClick={onClick}
      >
        {t.cta}{" "}
        <span aria-hidden style={{ marginLeft: 4 }}>
          →
        </span>
      </button>
    </div>
  );
}

/* ============================================================ */
/*  Modal · three layouts                                       */
/* ============================================================ */

function Modal({ layout, onClose }: { layout: "pure" | "pitch" | "hero"; onClose: () => void }) {
  return (
    <div
      style={{
        ...S.modalWrap,
        width: layout === "pitch" ? "min(940px, calc(100% - 32px))" : layout === "hero" ? "min(820px, calc(100% - 32px))" : "min(720px, calc(100% - 32px))",
      }}
      className="pj-pop"
    >
      <button
        type="button"
        style={S.closeBtn}
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>

      {layout === "pure" && <PureLayout />}
      {layout === "pitch" && <PitchLayout />}
      {layout === "hero" && <HeroLayout />}
    </div>
  );
}

function CalIframe({ height = 600 }: { height?: number }) {
  return (
    <iframe
      src={CAL_EMBED_URL}
      style={{ width: "100%", height, border: "none", display: "block", borderRadius: 12, background: "#fff" }}
      title="Book a call · A2 Media"
      allow="camera; microphone; payment"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

/* ---- A · Pure ---- */
function PureLayout() {
  return (
    <div style={S.pureInner}>
      <span style={S.eyebrow}>
        <span style={S.dotLive} className="pj-led" /> Engine · See if We&apos;re a Fit
      </span>
      <h4 style={S.modalH}>
        Pick a time. <em style={S.modalHItalic}>We&apos;ll lock it.</em>
      </h4>
      <CalIframe height={580} />
    </div>
  );
}

/* ---- B · Pitch (split panel) ---- */
function PitchLayout() {
  return (
    <div style={S.pitchGrid}>
      <aside style={S.pitchLeft}>
        <div style={S.pitchAvatarWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ademola.png" alt="Ademola" style={S.pitchAvatar} />
        </div>
        <p style={S.pitchAuthor}>Ademola Adelakun</p>
        <p style={S.pitchRole}>Founder, A2 Media</p>
        <h4 style={S.pitchH}>
          Free 30 minute call. We give you actionable next steps.
        </h4>
        <ul style={S.pitchList}>
          <li style={S.pitchItem}>
            <span style={S.pitchBullet}>→</span>
            We stalk you online to see where you&apos;re at.
          </li>
          <li style={S.pitchItem}>
            <span style={S.pitchBullet}>→</span>
            You tell us your goals with video.
          </li>
          <li style={S.pitchItem}>
            <span style={S.pitchBullet}>→</span>
            We tell you what to do next.
          </li>
        </ul>
        <div style={S.scarcityCard}>
          <span style={S.scarcityEyebrow}>
            <span style={S.scarcityPulse} className="pj-led" /> Either way
          </span>
          <p style={S.scarcityLine}>
            <strong style={S.scarcityNum}>Even if you don&apos;t sign with us.</strong>{" "}
            <span style={S.scarcityFinish}>
              We&apos;ll tell you how to choose the right partner.
            </span>
          </p>
        </div>
      </aside>
      <div style={S.pitchRight}>
        <CalIframe height={500} />
      </div>
    </div>
  );
}

/* ---- C · Hero card ---- */
function HeroLayout() {
  return (
    <div style={S.heroInner}>
      <span style={S.eyebrow}>
        <span style={S.dotLive} className="pj-led" /> Engine · See if We&apos;re a Fit
      </span>
      <h4 style={S.modalH}>
        Pick a time.{" "}
        <em style={S.modalHItalic}>You&apos;ll leave with a direction either way.</em>
      </h4>
      <div style={S.heroChips}>
        <span style={S.heroChip}>30 minutes</span>
        <span style={S.heroChip}>No pitch</span>
        <span style={S.heroChip}>You keep the direction</span>
      </div>
      <CalIframe height={580} />
    </div>
  );
}

/* ============================================================ */
/*  Styles                                                      */
/* ============================================================ */

const css = `
  @keyframes pjLed {
    0%, 100% { box-shadow: 0 0 8px rgba(102,247,142,0.9); opacity: 1; }
    50%      { box-shadow: 0 0 14px rgba(102,247,142,1); opacity: 0.7; }
  }
  .pj-led { animation: pjLed 1.1s ease-in-out infinite; }

  @keyframes pjPop {
    from { transform: translate(-50%, -50%) scale(0.92); opacity: 0; }
    to   { transform: translate(-50%, -50%) scale(1);    opacity: 1; }
  }
  .pj-pop { animation: pjPop 320ms cubic-bezier(.2,.7,.2,1.1); }
`;

const S = {
  page: { background: "#07021f", paddingBottom: 80 } as React.CSSProperties,
  frameHeader: { background: "#000", borderTop: "2px solid #5A33FF", padding: "40px 24px 28px", textAlign: "center" as const, fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  frameTag: { display: "inline-block", fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, padding: "5px 14px", borderRadius: 999, marginBottom: 12, color: LILAC, border: `1px solid ${LILAC}80` } as React.CSSProperties,
  frameTitle: { fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.015em" } as React.CSSProperties,
  frameNotes: { fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: 760 } as React.CSSProperties,

  demoCard: { maxWidth: 1200, margin: "32px auto 0", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, overflow: "hidden", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  demoHead: { padding: "22px 28px 6px" } as React.CSSProperties,
  demoTag: { display: "inline-block", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#28DFE8", border: "1px solid rgba(40,223,232,0.4)", padding: "4px 11px", borderRadius: 999, marginBottom: 10 } as React.CSSProperties,
  demoTitle: { fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.01em" } as React.CSSProperties,
  demoNotes: { fontSize: 13.5, lineHeight: 1.5, color: "rgba(255,255,255,0.62)", margin: 0, maxWidth: 880 } as React.CSSProperties,
  demoStage: { position: "relative" as const, padding: "44px 28px 60px", background: "#0D0536", margin: 20, borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", minHeight: 820, overflow: "hidden" as const } as React.CSSProperties,

  stageWrap: { position: "relative" as const, minHeight: 720 } as React.CSSProperties,
  row: { display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", gap: 14, alignItems: "start", transformOrigin: "center center" } as React.CSSProperties,
  sideCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px 16px 14px", color: "#fff" } as React.CSSProperties,
  engineCard: { background: "linear-gradient(160deg, rgba(90,51,255,0.22), rgba(143,69,238,0.08))", border: `1px solid ${PURPLE}80`, borderRadius: 14, padding: "18px 18px 16px", color: "#fff", boxShadow: "0 0 50px rgba(90,51,255,0.22)" } as React.CSSProperties,
  badgeMute: { display: "inline-block", fontSize: 9.5, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: NEON, marginBottom: 8 } as React.CSSProperties,
  badgePop: { display: "inline-block", fontSize: 9.5, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: LILAC, marginBottom: 8 } as React.CSSProperties,
  cardName: { fontSize: 15.5, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.01em" } as React.CSSProperties,
  cardPrice: { fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 8px" } as React.CSSProperties,
  cardPriceSub: { fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 600, marginLeft: 4 } as React.CSSProperties,
  cardDesc: { fontSize: 12, lineHeight: 1.45, color: "rgba(255,255,255,0.62)", margin: "0 0 12px", minHeight: 34 } as React.CSSProperties,
  ctaOutline: { width: "100%", padding: "10px 12px", background: "transparent", color: "#fff", border: "1px solid rgba(102,247,142,0.55)", borderRadius: 999, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  ctaPrimary: { width: "100%", padding: "11px 14px", background: PURPLE, color: "#fff", border: "none", borderRadius: 999, fontWeight: 800, fontSize: 13.5, cursor: "pointer", fontFamily: "var(--a2-sans)", boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 14px 36px rgba(90,51,255,0.5)" } as React.CSSProperties,

  backdrop: { position: "absolute" as const, inset: 0, background: "rgba(7,2,31,0.72)", backdropFilter: "blur(8px)", transition: "opacity 380ms ease", borderRadius: 16, zIndex: 5 } as React.CSSProperties,

  modalWrap: { position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10, background: "linear-gradient(180deg, #1A0F4D, #0D0536)", border: `1px solid ${PURPLE}80`, borderRadius: 18, boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(90,51,255,0.32)" } as React.CSSProperties,
  closeBtn: { position: "absolute" as const, top: 14, right: 14, width: 40, height: 40, borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.9)", fontSize: 22, cursor: "pointer", fontFamily: "var(--a2-sans)", zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, touchAction: "manipulation" } as React.CSSProperties,

  eyebrow: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: NEON, marginBottom: 8 } as React.CSSProperties,
  dotLive: { display: "inline-block", width: 7, height: 7, borderRadius: 999, background: NEON } as React.CSSProperties,
  modalH: { fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 18px", letterSpacing: "-0.015em", lineHeight: 1.2 } as React.CSSProperties,
  modalHItalic: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: LILAC } as React.CSSProperties,

  /* A · Pure */
  pureInner: { padding: "26px 28px 28px" } as React.CSSProperties,

  /* B · Pitch */
  pitchGrid: { display: "grid", gridTemplateColumns: "minmax(220px, 280px) 1fr", padding: 14, gap: 14 } as React.CSSProperties,
  pitchLeft: { padding: "20px 22px", background: "rgba(255,255,255,0.04)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column" as const, gap: 8 } as React.CSSProperties,
  pitchAvatarWrap: { width: 60, height: 60, borderRadius: 999, overflow: "hidden", border: `2px solid ${PURPLE}`, marginBottom: 8 } as React.CSSProperties,
  pitchAvatar: { width: "100%", height: "100%", objectFit: "cover" as const, display: "block" } as React.CSSProperties,
  pitchAuthor: { fontSize: 13, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "0.02em" } as React.CSSProperties,
  pitchRole: { fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.55)", margin: 0, letterSpacing: "0.04em" } as React.CSSProperties,
  pitchH: { fontSize: 18, fontWeight: 800, color: "#fff", margin: "12px 0 14px", letterSpacing: "-0.01em", lineHeight: 1.3 } as React.CSSProperties,
  pitchList: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 9 } as React.CSSProperties,
  pitchItem: { display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.45 } as React.CSSProperties,
  pitchBullet: { color: LILAC, fontWeight: 800, flexShrink: 0 } as React.CSSProperties,
  pitchFooter: { marginTop: "auto", paddingTop: 14, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: NEON, display: "inline-flex", alignItems: "center", gap: 8 } as React.CSSProperties,
  pitchFooterDot: { display: "inline-block", width: 7, height: 7, borderRadius: 999, background: NEON, boxShadow: `0 0 10px ${NEON}` } as React.CSSProperties,
  scarcityCard: { marginTop: "auto", padding: "12px 14px", background: "rgba(143,69,238,0.12)", border: `1px solid ${LILAC}66`, borderRadius: 12, display: "flex", flexDirection: "column" as const, gap: 6 } as React.CSSProperties,
  scarcityEyebrow: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: LILAC } as React.CSSProperties,
  scarcityPulse: { display: "inline-block", width: 7, height: 7, borderRadius: 999, background: LILAC } as React.CSSProperties,
  scarcityLine: { fontSize: 13, lineHeight: 1.45, color: "rgba(255,255,255,0.88)", margin: 0 } as React.CSSProperties,
  scarcityNum: { color: "#fff", fontWeight: 800 } as React.CSSProperties,
  scarcityFinish: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: NEON } as React.CSSProperties,
  pitchRight: { borderRadius: 14, overflow: "hidden" as const } as React.CSSProperties,

  /* C · Hero */
  heroInner: { padding: "26px 28px 28px" } as React.CSSProperties,
  heroChips: { display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 18 } as React.CSSProperties,
  heroChip: { display: "inline-block", padding: "6px 12px", background: "rgba(90,51,255,0.16)", border: `1px solid ${PURPLE}80`, borderRadius: 999, fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" } as React.CSSProperties,

  footnote: { maxWidth: 1100, margin: "30px auto 0", padding: "0 28px", fontSize: 12.5, color: "rgba(255,255,255,0.42)", fontFamily: "var(--a2-sans)", textAlign: "center" as const } as React.CSSProperties,
};
