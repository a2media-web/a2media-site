"use client";

/* Mockup: /mockups/booking-promise
   Five ways to communicate "you get something out of the call whether you
   sign or not." Each variant takes a different psychological angle and
   places the promise in its best spot relative to the pricing CTAs.

   Variants:
   01 — Takeaway List      (below both CTAs, spans the section)
   02 — Single Promise     (between the cards, owns the gap)
   03 — Outcome Receipt    (standalone card under the pair)
   04 — Note from Ademola  (signed personal block under the CTAs)
   05 — Worst / Best case  (two-column reframe under the CTAs)            */

import React from "react";

/* ---- page ---------------------------------------------------------------- */

export default function BookingPromiseMockups() {
  return (
    <main style={{ background: "#07021f" }}>
      <Frame
        tag="Variant 01 · Takeaway List"
        title="What you leave with, even if we don't sign"
        notes="Three specific deliverables in a checked list, placed below both CTAs. Spans the full section so it feels like a guarantee on the whole engagement, not on one tier. Highest specificity. Easiest to scan."
      >
        <PricingPair placement="below" promise={<TakeawayList />} />
      </Frame>

      <Frame
        tag="Variant 02 · Single Promise"
        title="One sentence in the gap between the cards"
        notes="Single bold line owns the space between the two pricing cards, where the eye lingers on the comparison. Lower commitment than a list, higher voltage because it's one move, not three."
      >
        <PricingPair placement="between" promise={<SinglePromise />} />
      </Frame>

      <Frame
        tag="Variant 03 · Outcome Receipt"
        title="A standalone receipt card under the pair"
        notes="Styled like a printed receipt. Two columns: what you leave with, what you don't pay. Distinctive object on the page. Doubles as a social-proof artifact because the format reads as 'we keep records.'"
      >
        <PricingPair placement="below" promise={<OutcomeReceipt />} />
      </Frame>

      <Frame
        tag="Variant 04 · Note from Ademola"
        title="Signed, first-person, low-pressure"
        notes="Drops the agency voice. First-person commitment from Ademola, signed. The format borrows from the existing Personal Letter disqualifier variant. Strongest trust move. Best if Ademola is comfortable being the face of the call."
      >
        <PricingPair placement="below" promise={<NoteFromAdemola />} />
      </Frame>

      <Frame
        tag="Variant 05 · Worst case · Best case"
        title="Reframe the call as a no-loss bet"
        notes="Two micro-columns under the CTAs. Worst case still ships them real value. Best case is the engagement. Removes the 'what if I waste 30 minutes' fear by naming the worst case as a positive outcome."
      >
        <PricingPair placement="below" promise={<WorstBest />} />
      </Frame>
    </main>
  );
}

/* ---- shared pricing pair (compact, faithful to live) --------------------- */

function PricingPair({
  promise,
  placement,
}: {
  promise: React.ReactNode;
  placement: "between" | "below";
}) {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <h2 style={S.h2}>
          One Path. <em style={S.italic}>Two Steps.</em>
        </h2>
        <p style={S.intro}>
          Every engagement starts with the <strong>2-Week Jumpstart</strong>.
          <br />
          <span style={S.introAccent}>
            We&apos;ll walk you through your exact monthly total on your discovery call.
          </span>
        </p>

        <div style={placement === "between" ? S.gridWithGap : S.grid}>
          <div style={S.cardWhite}>
            <span style={S.badgeBright}>Start Here</span>
            <h3 style={S.planName}>The 2-Week Jumpstart</h3>
            <div style={S.price}>
              $8K<small style={S.priceSmall}>one-time</small>
            </div>
            <p style={S.desc}>6-month video strategy + 3 videos. Required to start.</p>
            <a href="#" style={S.ctaOutline}>Book a Discovery Call</a>
          </div>

          {placement === "between" && <div style={S.betweenSlot}>{promise}</div>}

          <div style={S.cardFeatured}>
            <span style={S.badgePurple}>Then</span>
            <h3 style={S.planName}>The Video Growth Engine</h3>
            <div style={S.price}>
              $15K — $25K<small style={S.priceSmall}>/ month</small>
            </div>
            <p style={S.desc}>Pick 3 or 6 months. Longer = Lower monthly rate.</p>
            <a href="#" style={S.ctaFilled}>See if We&apos;re a Fit</a>
          </div>
        </div>

        {placement === "below" && <div style={S.belowSlot}>{promise}</div>}
      </div>
    </section>
  );
}

/* ---- VARIANT 01 — Takeaway List ----------------------------------------- */

function TakeawayList() {
  const items = [
    "A 6-month video roadmap mapped to your funnel",
    "Three specific videos you can ship in the next 30 days",
    "The competitor video audit we run for clients",
  ];
  return (
    <div style={S.takeawayBox}>
      <p style={S.takeawayLabel}>Whether we sign or not, you leave the call with:</p>
      <ul style={S.takeawayList}>
        {items.map((t) => (
          <li key={t} style={S.takeawayItem}>
            <span style={S.check}>✓</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- VARIANT 02 — Single Promise ---------------------------------------- */

function SinglePromise() {
  return (
    <div style={S.singleBox}>
      <span style={S.singleEyebrow}>30 MIN · NO PITCH</span>
      <p style={S.singleLine}>
        It&apos;s not a sales call. It&apos;s a strategy session,{" "}
        <em style={S.italicInline}>and you keep the doc.</em>
      </p>
    </div>
  );
}

/* ---- VARIANT 03 — Outcome Receipt --------------------------------------- */

function OutcomeReceipt() {
  return (
    <div style={S.receiptBox}>
      <div style={S.receiptHeader}>
        <span style={S.receiptTag}>DISCOVERY CALL · RECEIPT</span>
        <span style={S.receiptMeta}>30 minutes . Zoom . Ademola</span>
      </div>
      <div style={S.receiptGrid}>
        <div>
          <p style={S.receiptColLabel}>What you leave with</p>
          <ul style={S.receiptList}>
            <li>6-month video roadmap</li>
            <li>3 videos to ship next</li>
            <li>Competitor video audit</li>
          </ul>
        </div>
        <div>
          <p style={S.receiptColLabel}>What it doesn&apos;t cost you</p>
          <ul style={S.receiptList}>
            <li>A sales pitch</li>
            <li>A follow-up sequence</li>
            <li>An NDA, a deck, a deposit</li>
          </ul>
        </div>
      </div>
      <div style={S.receiptFooter}>· · · we keep the receipts so you don&apos;t have to · · ·</div>
    </div>
  );
}

/* ---- VARIANT 04 — Note from Ademola ------------------------------------- */

function NoteFromAdemola() {
  return (
    <div style={S.noteBox}>
      <p style={S.noteLabel}>A note from Ademola</p>
      <p style={S.noteBody}>
        I&apos;ll personally walk through your buyer psychology and map the roadmap
        on the call. You keep it whether we work together or not. If we&apos;re a
        fit, we keep talking. If not, the work is still yours.
      </p>
      <p style={S.noteSign}>
        <em style={S.noteSignName}>Ademola</em>
        <span style={S.noteSignRole}>Founder, A2 Media</span>
      </p>
    </div>
  );
}

/* ---- VARIANT 05 — Worst / Best Case ------------------------------------- */

function WorstBest() {
  return (
    <div style={S.wbBox}>
      <div style={S.wbCol}>
        <span style={S.wbTagWorst}>Worst case</span>
        <p style={S.wbText}>
          You walk away with 6 months of video strategy mapped to your funnel.
          Yours to keep.
        </p>
      </div>
      <div style={S.wbDivider} />
      <div style={S.wbCol}>
        <span style={S.wbTagBest}>Best case</span>
        <p style={S.wbText}>
          We&apos;re a fit, and we build the engine for you. Either way you leave
          with the roadmap.
        </p>
      </div>
    </div>
  );
}

/* ---- frame --------------------------------------------------------------- */

function Frame({
  tag,
  title,
  notes,
  children,
}: {
  tag: string;
  title: string;
  notes: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header style={S.frameHeader}>
        <span style={S.frameTag}>{tag}</span>
        <h2 style={S.frameTitle}>{title}</h2>
        <p style={S.frameNotes}>{notes}</p>
      </header>
      {children}
    </>
  );
}

/* ---- styles -------------------------------------------------------------- */

const S = {
  frameHeader: { background: "#000", borderTop: "2px solid #5A33FF", padding: "44px 24px 28px", textAlign: "center" } as React.CSSProperties,
  frameTag: { display: "inline-block", padding: "5px 14px", border: "1px solid rgba(40,223,232,0.45)", color: "#28dfe8", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 } as React.CSSProperties,
  frameTitle: { fontFamily: "var(--a2-sans)", fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.015em" } as React.CSSProperties,
  frameNotes: { fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: 720 } as React.CSSProperties,

  section: { background: "#0d0536", color: "#fff", padding: "clamp(64px,8vw,110px) 24px", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  inner: { maxWidth: 1180, margin: "0 auto", textAlign: "center" } as React.CSSProperties,
  h2: { fontSize: "clamp(34px,4.6vw,54px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px" } as React.CSSProperties,
  italic: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#8f7bff" } as React.CSSProperties,
  intro: { fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.78)", maxWidth: 620, margin: "0 auto 48px" } as React.CSSProperties,
  introAccent: { color: "#66f78e", fontWeight: 600 } as React.CSSProperties,

  grid: { display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 20, textAlign: "left" } as React.CSSProperties,
  gridWithGap: { display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 20, alignItems: "stretch", textAlign: "left" } as React.CSSProperties,
  betweenSlot: { display: "flex", alignItems: "center", justifyContent: "center" } as React.CSSProperties,
  belowSlot: { marginTop: 36 } as React.CSSProperties,

  // pricing cards (compact)
  cardWhite: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 22, padding: "32px 30px", display: "flex", flexDirection: "column", gap: 14 } as React.CSSProperties,
  cardFeatured: { background: "linear-gradient(160deg,rgba(90,51,255,0.22),rgba(90,51,255,0.05))", border: "1px solid rgba(90,51,255,0.5)", borderRadius: 22, padding: "32px 30px", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 0 60px rgba(90,51,255,0.25)" } as React.CSSProperties,
  badgeBright: { display: "inline-block", alignSelf: "flex-start", padding: "5px 12px", background: "rgba(102,247,142,0.18)", border: "1px solid rgba(102,247,142,0.55)", color: "#66f78e", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" } as React.CSSProperties,
  badgePurple: { display: "inline-block", alignSelf: "flex-start", padding: "5px 12px", background: "#5a33ff", color: "#fff", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" } as React.CSSProperties,
  planName: { fontSize: 22, fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.015em" } as React.CSSProperties,
  price: { fontSize: 44, fontWeight: 700, color: "#fff", lineHeight: 1, display: "flex", alignItems: "baseline", gap: 8, letterSpacing: "-0.02em" } as React.CSSProperties,
  priceSmall: { fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.55)" } as React.CSSProperties,
  desc: { fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.55, margin: 0 } as React.CSSProperties,
  ctaOutline: { display: "block", textAlign: "center", padding: "14px 20px", border: "1.5px solid #66f78e", color: "#fff", borderRadius: 999, textDecoration: "none", fontSize: 15, fontWeight: 600, marginTop: 4 } as React.CSSProperties,
  ctaFilled: { display: "block", textAlign: "center", padding: "14px 20px", background: "#5a33ff", color: "#fff", borderRadius: 999, textDecoration: "none", fontSize: 15, fontWeight: 600, marginTop: 4, boxShadow: "0 12px 30px rgba(90,51,255,0.4)" } as React.CSSProperties,

  // ---- V1 takeaway list
  takeawayBox: { maxWidth: 720, margin: "0 auto", padding: "26px 30px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(102,247,142,0.3)", borderRadius: 18, textAlign: "left" } as React.CSSProperties,
  takeawayLabel: { fontSize: 13, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#66f78e", marginBottom: 16 } as React.CSSProperties,
  takeawayList: { listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 } as React.CSSProperties,
  takeawayItem: { display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "rgba(255,255,255,0.92)", lineHeight: 1.45 } as React.CSSProperties,
  check: { color: "#66f78e", fontWeight: 800, fontSize: 16, flexShrink: 0, marginTop: 1 } as React.CSSProperties,

  // ---- V2 single promise (between)
  singleBox: { background: "rgba(90,51,255,0.08)", border: "1px solid rgba(90,51,255,0.35)", borderRadius: 16, padding: "20px 22px", maxWidth: 240, textAlign: "center" } as React.CSSProperties,
  singleEyebrow: { display: "inline-block", fontSize: 10, fontWeight: 800, letterSpacing: "0.22em", color: "#66f78e", marginBottom: 12 } as React.CSSProperties,
  singleLine: { fontSize: 16, color: "#fff", lineHeight: 1.45, margin: 0, fontWeight: 600 } as React.CSSProperties,
  italicInline: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#8f7bff" } as React.CSSProperties,

  // ---- V3 receipt
  receiptBox: { maxWidth: 720, margin: "0 auto", background: "#0a0428", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "26px 30px 22px", textAlign: "left", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" } as React.CSSProperties,
  receiptHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed rgba(255,255,255,0.18)", paddingBottom: 14, marginBottom: 18 } as React.CSSProperties,
  receiptTag: { fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#5a33ff" } as React.CSSProperties,
  receiptMeta: { fontSize: 11, color: "rgba(255,255,255,0.5)" } as React.CSSProperties,
  receiptGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 28 } as React.CSSProperties,
  receiptColLabel: { fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 } as React.CSSProperties,
  receiptList: { listStyle: "none", margin: 0, padding: 0, fontSize: 14, color: "#fff", lineHeight: 1.7 } as React.CSSProperties,
  receiptFooter: { marginTop: 18, paddingTop: 14, borderTop: "1px dashed rgba(255,255,255,0.18)", textAlign: "center", fontSize: 11, letterSpacing: "0.06em", color: "rgba(255,255,255,0.45)" } as React.CSSProperties,

  // ---- V4 note from Ademola
  noteBox: { maxWidth: 620, margin: "0 auto", padding: "30px 34px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, textAlign: "left", position: "relative" } as React.CSSProperties,
  noteLabel: { fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5a33ff", margin: "0 0 14px" } as React.CSSProperties,
  noteBody: { fontSize: 16, color: "#fff", lineHeight: 1.65, margin: "0 0 18px" } as React.CSSProperties,
  noteSign: { display: "flex", flexDirection: "column", gap: 2, margin: 0 } as React.CSSProperties,
  noteSignName: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, fontSize: 24, color: "#8f7bff" } as React.CSSProperties,
  noteSignRole: { fontSize: 12, color: "rgba(255,255,255,0.55)" } as React.CSSProperties,

  // ---- V5 worst / best
  wbBox: { maxWidth: 760, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0, padding: "26px 0", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, alignItems: "center" } as React.CSSProperties,
  wbCol: { padding: "0 30px", textAlign: "left" } as React.CSSProperties,
  wbDivider: { width: 1, alignSelf: "stretch", background: "rgba(255,255,255,0.14)" } as React.CSSProperties,
  wbTagWorst: { display: "inline-block", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)", marginBottom: 10, padding: "3px 10px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999 } as React.CSSProperties,
  wbTagBest: { display: "inline-block", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#66f78e", marginBottom: 10, padding: "3px 10px", border: "1px solid rgba(102,247,142,0.45)", borderRadius: 999 } as React.CSSProperties,
  wbText: { fontSize: 15, color: "rgba(255,255,255,0.9)", lineHeight: 1.55, margin: 0 } as React.CSSProperties,
};
