"use client";

/* Mockup: /mockups/inline-fit-flow
   Four UX patterns for the "See if We're a Fit" interaction on the
   $15K-$25K Engine card. All keep the experience ON the pricing card.
   Compared to bouncing to a Notion form, every option below feels
   native to the site and removes the cross-domain context-switch
   that loses 20-30% of high-intent applicants.

   A · Card Expansion       — card grows in-place, form appears inside
   B · Card Flip            — Y-axis 3D flip to reveal the form on the back
   C · Side Drawer          — full-height panel slides from the right
   D · Mini Modal           — small centered modal, one question per screen */

import React, { useState } from "react";

const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";

const Q = [
  {
    label: "Your name + company",
    type: "text" as const,
    placeholder: "Sam at Acme",
  },
  {
    label: "Approximate ARR",
    type: "select" as const,
    options: ["Under $1M", "$1M to $5M", "$5M to $20M", "$20M to $50M", "$50M+"],
  },
  {
    label: "How are you doing video today?",
    type: "select" as const,
    options: [
      "Nothing yet",
      "Freelancers / contractors",
      "Small in-house team",
      "Full in-house team",
      "Other agency",
    ],
  },
  {
    label: "Your 6-month goal",
    type: "textarea" as const,
    placeholder: "Pipeline, close-rate, awareness. One sentence is fine.",
  },
  {
    label: "Monthly content budget",
    type: "select" as const,
    options: ["Under $5K", "$5K to $10K", "$10K to $20K", "$20K to $50K", "$50K+"],
  },
];

export default function InlineFitFlowMockup() {
  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header style={S.frameHeader}>
        <span style={S.frameTag}>
          See if We&apos;re a Fit · Inline UX options
        </span>
        <h2 style={S.frameTitle}>
          Four ways the form can show up. None of them leave the site.
        </h2>
        <p style={S.frameNotes}>
          Each demo card below shows your three pricing tiers. Click
          &ldquo;See if We&apos;re a Fit&rdquo; on the Engine card to see
          how each pattern behaves. Same 5 questions in every variant,
          different UX framing. All feed the same Notion DB on submit.
        </p>
      </header>

      <Demo
        tag="Option A · Card Expansion"
        title="The card grows in-place. Most contextual."
        notes="Engine card expands vertically to reveal the form inside. The other two cards stay put. The visitor never leaves the pricing context. Feels like the card is the form. Cheapest cognitive cost — they came to look at pricing, now they're picking a fit on the same card."
      >
        <CardExpansion />
      </Demo>

      <Demo
        tag="Option B · Card Flip"
        title="3D flip to a form on the back. Most distinctive."
        notes="Engine card flips on its Y-axis. Front: price. Back: form. Memorable, brand-coded, looks like a thing the agency built. Trade-off: 3D rotation is theatrical, which lands as either premium-craft or gimmicky depending on the audience. Best when the brand is fun-energetic-confident (which yours is)."
      >
        <CardFlip />
      </Demo>

      <Demo
        tag="Option C · Side Drawer"
        title="Right-edge panel slides in. Premium SaaS feel."
        notes="Full-height drawer slides in from the right with room for a longer form or step-by-step pacing. Linear, Notion, Intercom all use this pattern. Maximum form real estate without losing the page below. Best when you want the form to feel like a serious conversation."
      >
        <SideDrawer />
      </Demo>

      <Demo
        tag="Option D · Mini Modal · Step-by-Step"
        title="Small centered modal. One question per screen."
        notes="Smallest visual footprint. Lightbox dims the page, modal asks one question at a time with progress dots. Feels respectful of time — the visitor is never staring at a long list. Lowest perceived friction of the four. Best when you want highest completion rate."
      >
        <StepModal />
      </Demo>

      <p style={S.footnote}>
        All four behaviors are equivalent on the back-end: 5 answers
        POSTed to /api/apply → Notion page created → fit tier calculated
        → success state shown inline. Switching between them later is one
        component swap.
      </p>
    </main>
  );
}

/* ============================================================ */
/*  Demo wrapper                                                */
/* ============================================================ */

function Demo({
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
/*  Pricing row (shared)                                        */
/* ============================================================ */

function PricingRow({
  engineState,
  onEngineClick,
  engineExpanded,
  engineFlipped,
}: {
  engineState?: "default" | "active";
  onEngineClick?: () => void;
  engineExpanded?: React.ReactNode;
  engineFlipped?: React.ReactNode;
}) {
  return (
    <div style={S.row}>
      <SideCard name="One-off Video" price="$2K" sub="starting price" cta="Get Started" outline />
      <SideCard name="2-Week Jumpstart" price="$8K" sub="one-time" cta="Get Started" outline />
      <EngineCard
        state={engineState ?? "default"}
        onClick={onEngineClick}
        expanded={engineExpanded}
        flipped={engineFlipped}
      />
    </div>
  );
}

function SideCard({
  name,
  price,
  sub,
  cta,
  outline,
}: {
  name: string;
  price: string;
  sub: string;
  cta: string;
  outline?: boolean;
}) {
  return (
    <div style={S.sideCard}>
      <span style={S.badgeMute}>ONE-TIME</span>
      <h4 style={S.cardName}>{name}</h4>
      <div style={S.cardPrice}>
        {price} <small style={S.cardPriceSub}>{sub}</small>
      </div>
      <p style={S.cardDesc}>
        {name === "One-off Video"
          ? "You give us the raw footage. We make it look expensive."
          : "We research your buyer, map out 6 months of video, and give you 3 videos to test."}
      </p>
      <button
        type="button"
        style={outline ? S.ctaOutlineMute : S.ctaFillMute}
      >
        {cta}
      </button>
    </div>
  );
}

function EngineCard({
  state,
  onClick,
  expanded,
  flipped,
}: {
  state: "default" | "active";
  onClick?: () => void;
  expanded?: React.ReactNode;
  flipped?: React.ReactNode;
}) {
  if (flipped) {
    // Card-flip variant: rotate Y, show back
    return (
      <div style={S.flipScene}>
        <div style={{ ...S.flipCard, transform: state === "active" ? "rotateY(180deg)" : "rotateY(0)" }}>
          <div style={S.flipFront}>
            <EngineFront onClick={onClick} />
          </div>
          <div style={S.flipBack}>{flipped}</div>
        </div>
      </div>
    );
  }
  return (
    <div style={S.engineCard}>
      <EngineFront onClick={onClick} />
      {expanded}
    </div>
  );
}

function EngineFront({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <span style={S.badgePop}>MONTHLY</span>
      <h4 style={S.cardName}>Video Growth Engine</h4>
      <div style={S.cardPrice}>
        $15K — $25K <small style={S.cardPriceSub}>/ month</small>
      </div>
      <p style={S.cardDesc}>
        We run your whole video department. Script to screen.
      </p>
      <button type="button" style={S.ctaPrimary} onClick={onClick}>
        See if We&apos;re a Fit{" "}
        <span aria-hidden style={{ marginLeft: 4 }}>
          →
        </span>
      </button>
    </>
  );
}

/* ============================================================ */
/*  Shared step-by-step form body                               */
/* ============================================================ */

function StepBody({
  idx,
  setIdx,
  total,
  onDone,
  compact,
}: {
  idx: number;
  setIdx: (n: number) => void;
  total: number;
  onDone: () => void;
  compact?: boolean;
}) {
  if (idx >= total) return <SuccessBlock compact={compact} />;
  const q = Q[idx];
  const pct = ((idx + 1) / total) * 100;
  return (
    <>
      <div style={S.progressTrack}>
        <div style={{ ...S.progressFill, width: `${pct}%` }} />
      </div>
      <p style={S.stepCount}>
        Question {idx + 1} of {total}
      </p>
      <h5 style={S.qLabel}>{q.label}</h5>
      <div style={S.qInputWrap}>
        {q.type === "text" && (
          <input type="text" placeholder={q.placeholder} style={S.qInput} />
        )}
        {q.type === "textarea" && (
          <textarea rows={2} placeholder={q.placeholder} style={S.qTextarea} />
        )}
        {q.type === "select" && (
          <div style={S.qSelectGrid}>
            {q.options!.map((o) => (
              <button key={o} type="button" style={S.qChip}>
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
      <div style={S.qNav}>
        <button
          type="button"
          style={S.qBack}
          onClick={() => setIdx(Math.max(0, idx - 1))}
          disabled={idx === 0}
        >
          Back
        </button>
        <button
          type="button"
          style={S.qNext}
          onClick={() => {
            if (idx + 1 === total) onDone();
            else setIdx(idx + 1);
          }}
        >
          {idx + 1 === total ? "Submit" : "Next"}
          <span aria-hidden style={{ marginLeft: 6 }}>
            →
          </span>
        </button>
      </div>
    </>
  );
}

function SuccessBlock({ compact }: { compact?: boolean }) {
  return (
    <div style={S.successBlock}>
      <span style={S.successCheck}>✓</span>
      <h5 style={S.successH}>
        {compact ? "Slot held." : "You're in. Slot held."}
      </h5>
      <p style={S.successSub}>
        We just sent the Cal link to your inbox. Talk soon.
      </p>
    </div>
  );
}

/* ============================================================ */
/*  Option A · Card Expansion                                   */
/* ============================================================ */

function CardExpansion() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  return (
    <PricingRow
      onEngineClick={() => setOpen(true)}
      engineExpanded={
        open ? (
          <div style={S.expandPanel}>
            {!done ? (
              <StepBody
                idx={idx}
                setIdx={setIdx}
                total={Q.length}
                onDone={() => setDone(true)}
                compact
              />
            ) : (
              <SuccessBlock compact />
            )}
          </div>
        ) : undefined
      }
    />
  );
}

/* ============================================================ */
/*  Option B · Card Flip                                        */
/* ============================================================ */

function CardFlip() {
  const [flipped, setFlipped] = useState(false);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  return (
    <PricingRow
      engineState={flipped ? "active" : "default"}
      onEngineClick={() => setFlipped(true)}
      engineFlipped={
        <div style={S.flipBackInner}>
          {!done ? (
            <StepBody
              idx={idx}
              setIdx={setIdx}
              total={Q.length}
              onDone={() => setDone(true)}
              compact
            />
          ) : (
            <SuccessBlock compact />
          )}
        </div>
      }
    />
  );
}

/* ============================================================ */
/*  Option C · Side Drawer                                      */
/* ============================================================ */

function SideDrawer() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  return (
    <div style={S.drawerWrap}>
      <PricingRow onEngineClick={() => setOpen(true)} />
      <div
        style={{
          ...S.drawerOverlay,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={() => setOpen(false)}
      />
      <aside
        style={{
          ...S.drawer,
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div style={S.drawerHead}>
          <div>
            <span style={S.drawerEyebrow}>The Engine · See if we&apos;re a fit</span>
            <h4 style={S.drawerH}>5 questions. 90 seconds.</h4>
          </div>
          <button type="button" style={S.drawerClose} onClick={() => setOpen(false)}>
            ×
          </button>
        </div>
        <div style={S.drawerBody}>
          {!done ? (
            <StepBody
              idx={idx}
              setIdx={setIdx}
              total={Q.length}
              onDone={() => setDone(true)}
            />
          ) : (
            <SuccessBlock />
          )}
        </div>
      </aside>
    </div>
  );
}

/* ============================================================ */
/*  Option D · Mini Modal                                       */
/* ============================================================ */

function StepModal() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  return (
    <div style={S.modalWrap}>
      <PricingRow onEngineClick={() => setOpen(true)} />
      {open && (
        <>
          <div style={S.modalOverlay} onClick={() => setOpen(false)} />
          <div style={S.modalCard}>
            <button type="button" style={S.modalClose} onClick={() => setOpen(false)}>
              ×
            </button>
            {!done ? (
              <StepBody
                idx={idx}
                setIdx={setIdx}
                total={Q.length}
                onDone={() => setDone(true)}
              />
            ) : (
              <SuccessBlock />
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================ */
/*  Styles                                                      */
/* ============================================================ */

const css = `
  @keyframes pjGlow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 14px 36px rgba(90,51,255,0.45); }
    50%      { box-shadow: 0 0 0 1px rgba(255,255,255,0.14), 0 20px 50px rgba(143,69,238,0.6); }
  }
  button[style*="${PURPLE}"]:not([disabled]) { transition: transform 220ms ease, background 220ms ease; }
  button[style*="${PURPLE}"]:hover { transform: translateY(-1px); background: #8F45EE; }
`;

const S = {
  page: { background: "#07021f", paddingBottom: 80 } as React.CSSProperties,
  frameHeader: {
    background: "#000",
    borderTop: "2px solid #5A33FF",
    padding: "40px 24px 28px",
    textAlign: "center" as const,
    fontFamily: "var(--a2-sans)",
  },
  frameTag: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    padding: "5px 14px",
    borderRadius: 999,
    marginBottom: 12,
    color: LILAC,
    border: `1px solid ${LILAC}80`,
  } as React.CSSProperties,
  frameTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 8px",
    letterSpacing: "-0.015em",
  } as React.CSSProperties,
  frameNotes: {
    fontSize: 14,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.65)",
    margin: "0 auto",
    maxWidth: 760,
  } as React.CSSProperties,

  demoCard: {
    maxWidth: 1200,
    margin: "32px auto 0",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    overflow: "hidden",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  demoHead: { padding: "22px 28px 6px" } as React.CSSProperties,
  demoTag: {
    display: "inline-block",
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "#28DFE8",
    border: "1px solid rgba(40,223,232,0.4)",
    padding: "4px 11px",
    borderRadius: 999,
    marginBottom: 10,
  } as React.CSSProperties,
  demoTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 6px",
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  demoNotes: {
    fontSize: 13.5,
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.62)",
    margin: 0,
    maxWidth: 880,
  } as React.CSSProperties,
  demoStage: {
    position: "relative" as const,
    padding: "36px 28px 36px",
    background: "#0D0536",
    margin: 20,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.08)",
    overflow: "hidden",
  } as React.CSSProperties,

  /* pricing row */
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1.2fr",
    gap: 14,
    alignItems: "start",
  } as React.CSSProperties,
  sideCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: "16px 16px 14px",
    color: "#fff",
    opacity: 0.66,
  } as React.CSSProperties,
  engineCard: {
    background:
      "linear-gradient(160deg, rgba(90,51,255,0.22), rgba(143,69,238,0.08))",
    border: `1px solid ${PURPLE}80`,
    borderRadius: 14,
    padding: "18px 18px 16px",
    color: "#fff",
    boxShadow: "0 0 50px rgba(90,51,255,0.22)",
    position: "relative" as const,
  } as React.CSSProperties,
  badgeMute: {
    display: "inline-block",
    fontSize: 9.5,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: NEON,
    marginBottom: 8,
  } as React.CSSProperties,
  badgePop: {
    display: "inline-block",
    fontSize: 9.5,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: LILAC,
    marginBottom: 8,
  } as React.CSSProperties,
  cardName: {
    fontSize: 15.5,
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 6px",
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  cardPrice: {
    fontSize: 22,
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "-0.02em",
    margin: "0 0 8px",
  } as React.CSSProperties,
  cardPriceSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.55)",
    fontWeight: 600,
    marginLeft: 4,
  } as React.CSSProperties,
  cardDesc: {
    fontSize: 12,
    lineHeight: 1.45,
    color: "rgba(255,255,255,0.62)",
    margin: "0 0 12px",
    minHeight: 34,
  } as React.CSSProperties,
  ctaOutlineMute: {
    width: "100%",
    padding: "10px 12px",
    background: "transparent",
    color: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(102,247,142,0.55)",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 13,
    cursor: "default",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  ctaFillMute: {
    width: "100%",
    padding: "10px 12px",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 13,
    cursor: "default",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  ctaPrimary: {
    width: "100%",
    padding: "11px 14px",
    background: PURPLE,
    color: "#fff",
    border: "none",
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 13.5,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 14px 36px rgba(90,51,255,0.5)",
  } as React.CSSProperties,

  /* Option A: expansion */
  expandPanel: {
    marginTop: 14,
    padding: "14px 4px 6px",
    borderTop: "1px dashed rgba(255,255,255,0.18)",
    animation: "expandIn 380ms cubic-bezier(.2,.7,.2,1.05)",
  } as React.CSSProperties,

  /* Option B: card flip */
  flipScene: {
    perspective: 1400,
    minHeight: 260,
  } as React.CSSProperties,
  flipCard: {
    position: "relative" as const,
    width: "100%",
    minHeight: 260,
    transition: "transform 700ms cubic-bezier(.4,.2,.2,1)",
    transformStyle: "preserve-3d" as const,
  } as React.CSSProperties,
  flipFront: {
    position: "absolute" as const,
    inset: 0,
    background:
      "linear-gradient(160deg, rgba(90,51,255,0.22), rgba(143,69,238,0.08))",
    border: `1px solid ${PURPLE}80`,
    borderRadius: 14,
    padding: "18px 18px 16px",
    backfaceVisibility: "hidden" as const,
    color: "#fff",
  } as React.CSSProperties,
  flipBack: {
    position: "absolute" as const,
    inset: 0,
    background:
      "linear-gradient(160deg, #1A0F4D, #0D0536)",
    border: `1px solid ${PURPLE}80`,
    borderRadius: 14,
    padding: "18px 18px 16px",
    backfaceVisibility: "hidden" as const,
    transform: "rotateY(180deg)",
    color: "#fff",
  } as React.CSSProperties,
  flipBackInner: { paddingTop: 4 } as React.CSSProperties,

  /* Option C: side drawer */
  drawerWrap: { position: "relative" as const, minHeight: 320 } as React.CSSProperties,
  drawerOverlay: {
    position: "absolute" as const,
    inset: 0,
    background: "rgba(7,2,31,0.65)",
    backdropFilter: "blur(4px)",
    transition: "opacity 260ms ease",
    borderRadius: 16,
  } as React.CSSProperties,
  drawer: {
    position: "absolute" as const,
    top: 0,
    right: 0,
    bottom: 0,
    width: 440,
    maxWidth: "calc(100% - 28px)",
    background: "linear-gradient(180deg, #1A0F4D, #0D0536)",
    borderLeft: `1px solid ${PURPLE}80`,
    boxShadow: "-20px 0 60px rgba(0,0,0,0.45)",
    transition: "transform 340ms cubic-bezier(.4,.2,.2,1)",
    display: "flex",
    flexDirection: "column" as const,
    borderRadius: "16px 0 0 16px",
  } as React.CSSProperties,
  drawerHead: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "20px 22px 14px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties,
  drawerEyebrow: {
    display: "block",
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: NEON,
    marginBottom: 4,
  } as React.CSSProperties,
  drawerH: {
    fontSize: 18,
    fontWeight: 800,
    color: "#fff",
    margin: 0,
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  drawerClose: {
    width: 30,
    height: 30,
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.16)",
    color: "rgba(255,255,255,0.85)",
    fontSize: 18,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  drawerBody: { padding: "22px 22px 24px" } as React.CSSProperties,

  /* Option D: mini modal */
  modalWrap: { position: "relative" as const, minHeight: 320 } as React.CSSProperties,
  modalOverlay: {
    position: "absolute" as const,
    inset: 0,
    background: "rgba(7,2,31,0.72)",
    backdropFilter: "blur(4px)",
    borderRadius: 16,
  } as React.CSSProperties,
  modalCard: {
    position: "absolute" as const,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 460,
    maxWidth: "calc(100% - 32px)",
    background: "linear-gradient(180deg, #1A0F4D, #0D0536)",
    border: `1px solid ${PURPLE}80`,
    borderRadius: 18,
    padding: "24px 26px 24px",
    boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
  } as React.CSSProperties,
  modalClose: {
    position: "absolute" as const,
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.16)",
    color: "rgba(255,255,255,0.85)",
    fontSize: 16,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,

  /* step body shared */
  progressTrack: {
    height: 4,
    background: "rgba(255,255,255,0.08)",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 10,
  } as React.CSSProperties,
  progressFill: {
    height: "100%",
    background: `linear-gradient(90deg, ${PURPLE}, ${LILAC})`,
    transition: "width 260ms ease",
  } as React.CSSProperties,
  stepCount: {
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.16em",
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase" as const,
    margin: "0 0 14px",
  } as React.CSSProperties,
  qLabel: {
    fontSize: 16,
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 12px",
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  qInputWrap: { marginBottom: 14 } as React.CSSProperties,
  qInput: {
    width: "100%",
    padding: "11px 13px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 14,
    fontFamily: "var(--a2-sans)",
    outline: "none",
  } as React.CSSProperties,
  qTextarea: {
    width: "100%",
    padding: "11px 13px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 14,
    fontFamily: "var(--a2-sans)",
    outline: "none",
    resize: "vertical" as const,
  } as React.CSSProperties,
  qSelectGrid: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 6,
  } as React.CSSProperties,
  qChip: {
    padding: "8px 12px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 999,
    color: "#fff",
    fontSize: 12.5,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  qNav: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 6,
  } as React.CSSProperties,
  qBack: {
    padding: "9px 18px",
    background: "transparent",
    color: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 999,
    fontSize: 12.5,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  qNext: {
    padding: "9px 22px",
    background: PURPLE,
    color: "#fff",
    border: "none",
    borderRadius: 999,
    fontSize: 12.5,
    fontWeight: 800,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.08), 0 10px 24px rgba(90,51,255,0.5)",
  } as React.CSSProperties,

  successBlock: {
    textAlign: "center" as const,
    padding: "10px 8px 6px",
  } as React.CSSProperties,
  successCheck: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 999,
    background: `${NEON}30`,
    border: `2px solid ${NEON}`,
    color: NEON,
    fontSize: 20,
    fontWeight: 800,
    marginBottom: 12,
  } as React.CSSProperties,
  successH: {
    fontSize: 17,
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 6px",
  } as React.CSSProperties,
  successSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    margin: 0,
  } as React.CSSProperties,

  footnote: {
    maxWidth: 1100,
    margin: "30px auto 0",
    padding: "0 28px",
    fontSize: 12.5,
    color: "rgba(255,255,255,0.42)",
    fontFamily: "var(--a2-sans)",
    textAlign: "center" as const,
  } as React.CSSProperties,
};
