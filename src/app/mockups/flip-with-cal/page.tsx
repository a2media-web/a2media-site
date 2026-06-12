"use client";

/* Mockup: /mockups/flip-with-cal
   Click any pricing card -> that card lifts to center of the viewport,
   the rest of the page blurs out, the card grows wider and flips on its
   Y-axis to reveal a Cal-style slot picker on the back.

   Three takes on what lives on the back side:

   A · Pure Cal · No qualification, just the slot picker.
   B · Filter + Cal · Two quick chip questions, then the slot picker.
   C · Cal + Email Capture · Slot picker first, email field after pick.

   Works on any pricing card -- clicking the One-off or Jumpstart CTAs
   triggers the same center-flip with that tier's branded back panel.
*/

import React, { useState } from "react";

const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const CAL_BASE = "https://cal.com/a2media/30-min";

const SLOTS = [
  { day: "Tue", date: "16", times: ["10:00", "11:30", "14:00"] },
  { day: "Wed", date: "17", times: ["09:00", "13:30", "16:00"] },
  { day: "Thu", date: "18", times: ["10:30", "15:00"] },
  { day: "Fri", date: "19", times: ["09:30", "11:00", "14:30"] },
  { day: "Mon", date: "22", times: ["10:00", "13:00", "16:30"] },
];

type Tier = "oneoff" | "jumpstart" | "engine";
const TIERS: Record<Tier, { badge: string; name: string; price: string; sub: string; desc: string; cta: string; ctaStyle: "outline" | "primary" }> = {
  oneoff: {
    badge: "ONE-TIME",
    name: "One-off Video",
    price: "$2K",
    sub: "starting price",
    desc: "You give us the raw footage. We make it look expensive.",
    cta: "Get Started",
    ctaStyle: "outline",
  },
  jumpstart: {
    badge: "ONE-TIME",
    name: "2-Week Jumpstart",
    price: "$8K",
    sub: "one-time",
    desc: "We research your buyer, map 6 months of video, give you 3 to test.",
    cta: "Get Started",
    ctaStyle: "outline",
  },
  engine: {
    badge: "MONTHLY",
    name: "Video Growth Engine",
    price: "$15K — $25K",
    sub: "/ month",
    desc: "We run your whole video department. Script to screen.",
    cta: "See if We're a Fit",
    ctaStyle: "primary",
  },
};

export default function FlipWithCalMockup() {
  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header style={S.frameHeader}>
        <span style={S.frameTag}>Card-to-center flip · Cal on the back</span>
        <h2 style={S.frameTitle}>
          The card lifts to center, blurs the rest, flips to Cal.
        </h2>
        <p style={S.frameNotes}>
          Click any pricing card&apos;s button on the demos below. That card
          flies to the center of the stage, the other cards blur, the card
          grows wider, and flips on its Y-axis to reveal a Cal-style slot
          picker on the back. Click the backdrop or the close button to
          reverse the motion. Three takes on what lives on the back.
        </p>
      </header>

      <Demo
        tag="Option 1 · Pure Cal · No qualification"
        title="Click any card → straight to a slot picker."
        notes="The fastest possible click-to-book. The visitor sees the card lift, flip, and present a calendar. They pick a time and Cal opens with that slot pre-selected. Best when your Cal event already has a pre-screen form attached. Zero friction, lowest filter."
      >
        <Stage kind="pure" />
      </Demo>

      <Demo
        tag="Option 2 · Filter + Cal"
        title="Two chip questions, then the calendar reveals."
        notes="The back shows two chip rows (ARR + budget). Click your buckets, the slot picker slides in below. Hormozi-correct minimum filter without ever feeling like a form. My pick of the three."
      >
        <Stage kind="filter" />
      </Demo>

      <Demo
        tag="Option 3 · Cal + Email Capture"
        title="Pick a time, then drop your email."
        notes="Slot picker is first. When they pick a time, an email field slides in below. Submit and the Cal invite is sent to their inbox with the time pre-filled. Email is the only form they fill out. Captures the email even if they bail before booking."
      >
        <Stage kind="email" />
      </Demo>

      <p style={S.footnote}>
        All three variants work on free Cal via deep-link URL params. Same
        center-flip motion works for any pricing tier; each tier&apos;s back
        side can carry its own headline.
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
/*  Stage (the demo viewport)                                   */
/* ============================================================ */

function Stage({ kind }: { kind: "pure" | "filter" | "email" }) {
  const [openTier, setOpenTier] = useState<Tier | null>(null);

  return (
    <div style={S.stageWrap}>
      {/* Pricing row (blurs when something is open) */}
      <div
        style={{
          ...S.row,
          filter: openTier ? "blur(6px) brightness(0.55)" : "none",
          transform: openTier ? "scale(0.96)" : "scale(1)",
          opacity: openTier ? 0.6 : 1,
          pointerEvents: openTier ? "none" : "auto",
          transition:
            "filter 420ms ease, transform 420ms ease, opacity 420ms ease",
        }}
      >
        {(Object.keys(TIERS) as Tier[]).map((t) => (
          <PriceCard
            key={t}
            tier={t}
            onClick={() => setOpenTier(t)}
            active={openTier === t}
          />
        ))}
      </div>

      {/* Backdrop */}
      <div
        style={{
          ...S.backdrop,
          opacity: openTier ? 1 : 0,
          pointerEvents: openTier ? "auto" : "none",
        }}
        onClick={() => setOpenTier(null)}
      />

      {/* Centered, flipped card */}
      <FlippedPanel
        kind={kind}
        tier={openTier}
        onClose={() => setOpenTier(null)}
      />
    </div>
  );
}

/* ============================================================ */
/*  Pricing card (closed state)                                 */
/* ============================================================ */

function PriceCard({
  tier,
  onClick,
  active,
}: {
  tier: Tier;
  onClick: () => void;
  active: boolean;
}) {
  const t = TIERS[tier];
  const isEngine = tier === "engine";
  return (
    <div
      style={{
        ...(isEngine ? S.engineCard : S.sideCard),
        opacity: active ? 0 : 1,
        transition: "opacity 280ms ease",
      }}
    >
      <span style={isEngine ? S.badgePop : S.badgeMute}>{t.badge}</span>
      <h4 style={S.cardName}>{t.name}</h4>
      <div style={S.cardPrice}>
        {t.price} <small style={S.cardPriceSub}>{t.sub}</small>
      </div>
      <p style={S.cardDesc}>{t.desc}</p>
      <button
        type="button"
        style={t.ctaStyle === "primary" ? S.ctaPrimary : S.ctaOutline}
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
/*  Centered, flipped, expanded panel                           */
/* ============================================================ */

function FlippedPanel({
  kind,
  tier,
  onClose,
}: {
  kind: "pure" | "filter" | "email";
  tier: Tier | null;
  onClose: () => void;
}) {
  const open = tier !== null;
  const [filterDone, setFilterDone] = useState(false);
  const [picked, setPicked] = useState<{ date: string; time: string } | null>(
    null,
  );
  const [sent, setSent] = useState(false);

  // reset when closed
  React.useEffect(() => {
    if (!open) {
      // small timeout so the close animation completes before resetting
      const id = setTimeout(() => {
        setFilterDone(false);
        setPicked(null);
        setSent(false);
      }, 380);
      return () => clearTimeout(id);
    }
  }, [open]);

  const showSlots =
    kind === "pure" || kind === "email" || (kind === "filter" && filterDone);

  const tierHead = !tier
    ? null
    : tier === "engine"
    ? "Engine · See if We're a Fit"
    : tier === "jumpstart"
    ? "2-Week Jumpstart"
    : "One-off Video";

  return (
    <div
      style={{
        ...S.scenePos,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 320ms ease",
      }}
    >
      <div
        style={{
          ...S.flipCard,
          transform: open
            ? "translate(-50%, -50%) scale(1) rotateY(180deg)"
            : "translate(-50%, -50%) scale(0.7) rotateY(0deg)",
        }}
      >
        {/* Front (animates from origin) */}
        <div style={S.flipFront}>
          <span style={S.badgePop}>MONTHLY</span>
          <h4 style={S.cardName}>Video Growth Engine</h4>
          <div style={S.cardPrice}>
            $15K — $25K <small style={S.cardPriceSub}>/ month</small>
          </div>
          <p style={S.cardDesc}>
            We run your whole video department. Script to screen.
          </p>
        </div>

        {/* Back */}
        <div style={S.flipBack}>
          <button
            type="button"
            style={S.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

          {!sent ? (
            <>
              <span style={S.backEyebrow}>
                <span style={S.dotLive} className="pj-led" /> {tierHead}
              </span>
              <h4 style={S.backH}>
                {kind === "pure"
                  ? "Pick a time. Let's go."
                  : kind === "filter" && !filterDone
                  ? "Two quick ones, then pick a time."
                  : kind === "email" && picked
                  ? "Where do we send the Cal invite?"
                  : "Pick a time. We'll lock it."}
              </h4>

              {kind === "filter" && !filterDone && (
                <FilterChips onDone={() => setFilterDone(true)} />
              )}

              {showSlots && (
                <SlotPicker
                  onPick={(d, t) => setPicked({ date: d, time: t })}
                  picked={picked}
                />
              )}

              {kind === "email" && picked && (
                <EmailCapture onSubmit={() => setSent(true)} />
              )}

              {kind !== "email" && picked && (
                <a
                  href={`${CAL_BASE}?date=2026-06-${picked.date}&time=${picked.time}`}
                  target="_blank"
                  rel="noreferrer"
                  style={S.confirmBtn}
                >
                  Lock {picked.time} on the {picked.date}th{" "}
                  <span aria-hidden style={{ marginLeft: 6 }}>
                    →
                  </span>
                </a>
              )}
            </>
          ) : (
            <SuccessState picked={picked!} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Filter chips                                                */
/* ============================================================ */

function FilterChips({ onDone }: { onDone: () => void }) {
  const [arr, setArr] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const ready = arr && budget;
  return (
    <div style={S.filterWrap}>
      <div style={S.filterRow}>
        <span style={S.filterLabel}>ARR</span>
        <div style={S.chipsRow}>
          {["Under $1M", "$1M-$5M", "$5M-$20M", "$20M+"].map((o) => (
            <button
              key={o}
              type="button"
              style={arr === o ? { ...S.chip, ...S.chipOn } : S.chip}
              onClick={() => setArr(o)}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
      <div style={S.filterRow}>
        <span style={S.filterLabel}>Monthly budget</span>
        <div style={S.chipsRow}>
          {["< $5K", "$5K-$10K", "$10K-$20K", "$20K+"].map((o) => (
            <button
              key={o}
              type="button"
              style={budget === o ? { ...S.chip, ...S.chipOn } : S.chip}
              onClick={() => setBudget(o)}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        style={{
          ...S.filterDone,
          opacity: ready ? 1 : 0.45,
          cursor: ready ? "pointer" : "default",
        }}
        disabled={!ready}
        onClick={onDone}
      >
        Show me times <span aria-hidden>→</span>
      </button>
    </div>
  );
}

/* ============================================================ */
/*  Slot picker                                                 */
/* ============================================================ */

function SlotPicker({
  onPick,
  picked,
}: {
  onPick: (date: string, time: string) => void;
  picked: { date: string; time: string } | null;
}) {
  /* Cal.com-style inline embed mock.
     Two-column layout matching the real free-plan Cal embed:
       Left:  event metadata (avatar, title, duration, location, desc)
       Right: month calendar + time slots for the selected date */
  const [selectedDate, setSelectedDate] = React.useState("17");

  // Month grid: June 2026 starts on a Monday. Show 5 weeks.
  const month = [
    ["1", "2", "3", "4", "5", "6", "7"],
    ["8", "9", "10", "11", "12", "13", "14"],
    ["15", "16", "17", "18", "19", "20", "21"],
    ["22", "23", "24", "25", "26", "27", "28"],
    ["29", "30", "", "", "", "", ""],
  ];
  const availableDates = SLOTS.map((s) => s.date);
  const timesForDay =
    SLOTS.find((s) => s.date === selectedDate)?.times ?? [];

  return (
    <div style={S.embedShell}>
      {/* Left column · event metadata */}
      <div style={S.embedLeft}>
        <div style={S.embedAvatarWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ademola.png" alt="Ademola" style={S.embedAvatar} />
        </div>
        <p style={S.embedAuthor}>Ademola Adelakun</p>
        <p style={S.embedRole}>Founder, A2 Media</p>
        <h5 style={S.embedTitle}>30-min Strategy Call</h5>
        <div style={S.embedMetaRow}>
          <span style={S.embedMetaIcon}>⏱</span>
          <span>30 minutes</span>
        </div>
        <div style={S.embedMetaRow}>
          <span style={S.embedMetaIcon}>📹</span>
          <span>Zoom · sent on confirm</span>
        </div>
        <div style={S.embedMetaRow}>
          <span style={S.embedMetaIcon}>🌐</span>
          <span>America/Toronto</span>
        </div>
        <p style={S.embedDesc}>
          We look at how you sell, tell you where video fits, and show you
          the first thing we&apos;d cut for you. No pitch. You leave with a
          direction either way.
        </p>
        <div style={S.embedFooterBadge}>
          <span style={S.embedFooterDot} /> Cal.com
        </div>
      </div>

      {/* Right column · calendar + times */}
      <div style={S.embedRight}>
        <div style={S.embedMonthHead}>
          <button type="button" style={S.embedMonthNav}>
            ‹
          </button>
          <span style={S.embedMonthLabel}>June 2026</span>
          <button type="button" style={S.embedMonthNav}>
            ›
          </button>
        </div>
        <div style={S.embedDow}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} style={S.embedDowCell}>
              {d}
            </span>
          ))}
        </div>
        <div style={S.embedMonthGrid}>
          {month.flat().map((d, i) => {
            if (!d) return <span key={i} style={S.embedDayEmpty} />;
            const isAvail = availableDates.includes(d);
            const isSel = d === selectedDate;
            return (
              <button
                key={i}
                type="button"
                disabled={!isAvail}
                onClick={() => setSelectedDate(d)}
                style={{
                  ...S.embedDay,
                  ...(isAvail ? S.embedDayAvail : S.embedDayDim),
                  ...(isSel ? S.embedDaySel : {}),
                }}
              >
                {d}
              </button>
            );
          })}
        </div>

        <div style={S.embedSlotHead}>
          <span style={S.embedSlotHeadLabel}>
            {selectedDate
              ? `${dayName(selectedDate)} Jun ${selectedDate}`
              : "Pick a date"}
          </span>
          <span style={S.embedSlotHeadCount}>
            {timesForDay.length} slots
          </span>
        </div>
        <div style={S.embedSlotList}>
          {timesForDay.map((t) => {
            const isOn =
              picked?.date === selectedDate && picked?.time === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => onPick(selectedDate, t)}
                style={isOn ? { ...S.embedSlot, ...S.embedSlotOn } : S.embedSlot}
              >
                {t}
                {isOn && (
                  <span style={S.embedSlotConfirm}>
                    Confirm <span aria-hidden>→</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function dayName(d: string) {
  const map: Record<string, string> = {
    "16": "Tue",
    "17": "Wed",
    "18": "Thu",
    "19": "Fri",
    "22": "Mon",
  };
  return map[d] ?? "";
}

function EmailCapture({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form
      style={S.emailRow}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="email"
        required
        placeholder="sam@acme.com"
        style={S.emailInput}
      />
      <button type="submit" style={S.emailBtn}>
        Send my invite <span aria-hidden>→</span>
      </button>
    </form>
  );
}

function SuccessState({ picked }: { picked: { date: string; time: string } }) {
  return (
    <div style={S.successBlock}>
      <span style={S.successCheck}>✓</span>
      <h4 style={S.successH}>
        Locked in for{" "}
        <em style={S.successHItalic}>
          {picked.time}, the {picked.date}th.
        </em>
      </h4>
      <p style={S.successSub}>
        Cal invite is on its way to your inbox. Talk soon.
      </p>
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
`;

const S = {
  page: { background: "#07021f", paddingBottom: 80 } as React.CSSProperties,
  frameHeader: {
    background: "#000",
    borderTop: "2px solid #5A33FF",
    padding: "40px 24px 28px",
    textAlign: "center" as const,
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
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
    padding: "44px 28px 60px",
    background: "#0D0536",
    margin: 20,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.08)",
    minHeight: 700,
    overflow: "hidden" as const,
  } as React.CSSProperties,

  stageWrap: { position: "relative" as const, minHeight: 600 } as React.CSSProperties,

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1.2fr",
    gap: 14,
    alignItems: "start",
    transformOrigin: "center center",
  } as React.CSSProperties,

  sideCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: "16px 16px 14px",
    color: "#fff",
  } as React.CSSProperties,
  engineCard: {
    background:
      "linear-gradient(160deg, rgba(90,51,255,0.22), rgba(143,69,238,0.08))",
    border: `1px solid ${PURPLE}80`,
    borderRadius: 14,
    padding: "18px 18px 16px",
    color: "#fff",
    boxShadow: "0 0 50px rgba(90,51,255,0.22)",
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
  ctaOutline: {
    width: "100%",
    padding: "10px 12px",
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(102,247,142,0.55)",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
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
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.08), 0 14px 36px rgba(90,51,255,0.5)",
  } as React.CSSProperties,

  /* backdrop + centered card */
  backdrop: {
    position: "absolute" as const,
    inset: 0,
    background: "rgba(7,2,31,0.72)",
    backdropFilter: "blur(6px)",
    transition: "opacity 380ms ease",
    borderRadius: 16,
    zIndex: 5,
  } as React.CSSProperties,
  scenePos: {
    position: "absolute" as const,
    inset: 0,
    zIndex: 10,
    perspective: 2000,
    pointerEvents: "none" as const,
  } as React.CSSProperties,
  flipCard: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    width: "min(720px, calc(100% - 48px))",
    minHeight: 540,
    transformStyle: "preserve-3d" as const,
    transition:
      "transform 780ms cubic-bezier(.4,.2,.2,1)",
    pointerEvents: "auto" as const,
  } as React.CSSProperties,
  flipFront: {
    position: "absolute" as const,
    inset: 0,
    background:
      "linear-gradient(160deg, rgba(90,51,255,0.22), rgba(143,69,238,0.08))",
    border: `1px solid ${PURPLE}80`,
    borderRadius: 18,
    padding: "24px 26px",
    backfaceVisibility: "hidden" as const,
    color: "#fff",
    boxShadow: "0 30px 80px rgba(0,0,0,0.4), 0 0 60px rgba(90,51,255,0.22)",
  } as React.CSSProperties,
  flipBack: {
    position: "absolute" as const,
    inset: 0,
    background: "linear-gradient(180deg, #1A0F4D, #0D0536)",
    border: `1px solid ${PURPLE}80`,
    borderRadius: 18,
    padding: "26px 28px 28px",
    backfaceVisibility: "hidden" as const,
    transform: "rotateY(180deg)",
    color: "#fff",
    overflow: "auto" as const,
    boxShadow: "0 30px 80px rgba(0,0,0,0.4), 0 0 60px rgba(90,51,255,0.32)",
  } as React.CSSProperties,
  closeBtn: {
    position: "absolute" as const,
    top: 14,
    right: 14,
    width: 40,
    height: 40,
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "rgba(255,255,255,0.9)",
    fontSize: 22,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    touchAction: "manipulation",
  } as React.CSSProperties,
  backEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.2em",
    color: NEON,
    marginBottom: 8,
  } as React.CSSProperties,
  dotLive: {
    display: "inline-block",
    width: 7,
    height: 7,
    borderRadius: 999,
    background: NEON,
  } as React.CSSProperties,
  backH: {
    fontSize: 22,
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 18px",
    letterSpacing: "-0.015em",
  } as React.CSSProperties,

  /* filter chips */
  filterWrap: { marginBottom: 14 } as React.CSSProperties,
  filterRow: { marginBottom: 14 } as React.CSSProperties,
  filterLabel: {
    display: "block",
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.16em",
    color: "rgba(255,255,255,0.55)",
    textTransform: "uppercase" as const,
    marginBottom: 8,
  } as React.CSSProperties,
  chipsRow: { display: "flex", flexWrap: "wrap" as const, gap: 6 } as React.CSSProperties,
  chip: {
    padding: "8px 13px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 999,
    color: "#fff",
    fontSize: 12.5,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  chipOn: {
    background: PURPLE,
    border: `1px solid ${LILAC}`,
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.1), 0 6px 18px rgba(90,51,255,0.4)",
  } as React.CSSProperties,
  filterDone: {
    marginTop: 4,
    padding: "11px 18px",
    background: PURPLE,
    color: "#fff",
    border: "none",
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 13.5,
    fontFamily: "var(--a2-sans)",
    cursor: "pointer",
  } as React.CSSProperties,

  /* calendar (bigger now we have room) */
  calBox: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: "16px 16px 14px",
    marginBottom: 14,
  } as React.CSSProperties,
  calHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  } as React.CSSProperties,
  calHeaderTop: {
    fontSize: 13.5,
    fontWeight: 800,
    color: "#fff",
    margin: 0,
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  calHeaderSub: {
    fontSize: 11.5,
    color: "rgba(255,255,255,0.55)",
    margin: "2px 0 0",
  } as React.CSSProperties,
  calBadge: {
    fontSize: 11.5,
    fontWeight: 700,
    color: "rgba(255,255,255,0.75)",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 999,
    padding: "5px 11px",
  } as React.CSSProperties,
  calGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 8,
  } as React.CSSProperties,
  calCol: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "10px 8px 10px",
  } as React.CSSProperties,
  calColHead: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    marginBottom: 10,
  } as React.CSSProperties,
  calColDay: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase" as const,
  } as React.CSSProperties,
  calColDate: {
    fontSize: 17,
    fontWeight: 800,
    color: "#fff",
    marginTop: 2,
    letterSpacing: "-0.02em",
  } as React.CSSProperties,
  calSlots: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,
  calSlot: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "#fff",
    fontFamily: "var(--a2-sans)",
    fontSize: 12.5,
    fontWeight: 700,
    padding: "8px 4px",
    borderRadius: 8,
    cursor: "pointer",
  } as React.CSSProperties,
  calSlotHi: {
    background: PURPLE,
    border: `1px solid ${LILAC}`,
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(90,51,255,0.5)",
  } as React.CSSProperties,

  /* Cal embed mock */
  embedShell: {
    display: "grid",
    gridTemplateColumns: "minmax(180px, 220px) 1fr",
    gap: 0,
    marginBottom: 14,
    background: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 40px rgba(0,0,0,0.35)",
    fontFamily: "var(--a2-sans)",
    color: "#0D0536",
  } as React.CSSProperties,
  embedLeft: {
    background: "#F8F7FB",
    padding: "20px 18px",
    borderRight: "1px solid rgba(13,5,54,0.08)",
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,
  embedAvatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 999,
    overflow: "hidden",
    border: `2px solid ${PURPLE}`,
    marginBottom: 8,
  } as React.CSSProperties,
  embedAvatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    display: "block",
  } as React.CSSProperties,
  embedAuthor: {
    fontSize: 12,
    fontWeight: 700,
    color: "rgba(13,5,54,0.55)",
    margin: 0,
    letterSpacing: "0.02em",
  } as React.CSSProperties,
  embedRole: {
    fontSize: 10.5,
    fontWeight: 600,
    color: "rgba(13,5,54,0.45)",
    margin: 0,
    letterSpacing: "0.03em",
  } as React.CSSProperties,
  embedTitle: {
    fontSize: 17,
    fontWeight: 800,
    color: "#0D0536",
    margin: "8px 0 8px",
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  } as React.CSSProperties,
  embedMetaRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "rgba(13,5,54,0.75)",
    margin: "2px 0",
  } as React.CSSProperties,
  embedMetaIcon: {
    fontSize: 13,
    width: 16,
    display: "inline-flex",
    justifyContent: "center",
  } as React.CSSProperties,
  embedDesc: {
    fontSize: 11.5,
    lineHeight: 1.5,
    color: "rgba(13,5,54,0.62)",
    margin: "10px 0 0",
  } as React.CSSProperties,
  embedFooterBadge: {
    marginTop: "auto",
    paddingTop: 12,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 9.5,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "rgba(13,5,54,0.4)",
  } as React.CSSProperties,
  embedFooterDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: PURPLE,
  } as React.CSSProperties,

  embedRight: {
    padding: "18px 18px 16px",
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,
  embedMonthHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  } as React.CSSProperties,
  embedMonthLabel: {
    fontSize: 13.5,
    fontWeight: 800,
    color: "#0D0536",
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  embedMonthNav: {
    width: 28,
    height: 28,
    borderRadius: 8,
    background: "rgba(13,5,54,0.05)",
    border: "1px solid rgba(13,5,54,0.08)",
    color: "#0D0536",
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  embedDow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 2,
    marginBottom: 4,
  } as React.CSSProperties,
  embedDowCell: {
    textAlign: "center" as const,
    fontSize: 10,
    fontWeight: 800,
    color: "rgba(13,5,54,0.4)",
    padding: "4px 0",
    letterSpacing: "0.06em",
  } as React.CSSProperties,
  embedMonthGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4,
    marginBottom: 12,
  } as React.CSSProperties,
  embedDay: {
    aspectRatio: "1 / 1",
    border: "none",
    background: "transparent",
    fontFamily: "var(--a2-sans)",
    fontSize: 12.5,
    fontWeight: 600,
    borderRadius: 8,
    cursor: "default",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  embedDayEmpty: {
    aspectRatio: "1 / 1",
  } as React.CSSProperties,
  embedDayAvail: {
    background: "rgba(90,51,255,0.10)",
    color: PURPLE,
    cursor: "pointer",
    fontWeight: 800,
  } as React.CSSProperties,
  embedDayDim: {
    color: "rgba(13,5,54,0.3)",
  } as React.CSSProperties,
  embedDaySel: {
    background: PURPLE,
    color: "#fff",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 6px 16px rgba(90,51,255,0.5)",
  } as React.CSSProperties,

  embedSlotHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 4,
    marginBottom: 6,
    paddingTop: 10,
    borderTop: "1px dashed rgba(13,5,54,0.1)",
  } as React.CSSProperties,
  embedSlotHeadLabel: {
    fontSize: 12.5,
    fontWeight: 800,
    color: "#0D0536",
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  embedSlotHeadCount: {
    fontSize: 10.5,
    fontWeight: 700,
    color: "rgba(13,5,54,0.45)",
    letterSpacing: "0.04em",
  } as React.CSSProperties,
  embedSlotList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
    maxHeight: 170,
    overflowY: "auto" as const,
  } as React.CSSProperties,
  embedSlot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "11px 14px",
    background: "#FFFFFF",
    border: `1.5px solid ${PURPLE}`,
    borderRadius: 10,
    color: PURPLE,
    fontFamily: "var(--a2-sans)",
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
    letterSpacing: "0.01em",
  } as React.CSSProperties,
  embedSlotOn: {
    background: PURPLE,
    color: "#FFFFFF",
    border: `1.5px solid ${PURPLE}`,
    boxShadow: "0 8px 20px rgba(90,51,255,0.4)",
  } as React.CSSProperties,
  embedSlotConfirm: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.02em",
  } as React.CSSProperties,

  /* email + confirm */
  emailRow: { display: "flex", gap: 8, marginTop: 6 } as React.CSSProperties,
  emailInput: {
    flex: 1,
    padding: "11px 13px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 14,
    fontFamily: "var(--a2-sans)",
    outline: "none",
  } as React.CSSProperties,
  emailBtn: {
    padding: "11px 18px",
    background: PURPLE,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: 800,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  confirmBtn: {
    display: "block",
    textAlign: "center" as const,
    padding: "13px 16px",
    background: PURPLE,
    color: "#fff",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 800,
    fontSize: 14,
    fontFamily: "var(--a2-sans)",
    marginTop: 6,
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.08), 0 14px 36px rgba(90,51,255,0.55)",
  } as React.CSSProperties,

  /* success */
  successBlock: {
    textAlign: "center" as const,
    padding: "40px 16px",
  } as React.CSSProperties,
  successCheck: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 52,
    borderRadius: 999,
    background: `${NEON}30`,
    border: `2px solid ${NEON}`,
    color: NEON,
    fontSize: 26,
    fontWeight: 800,
    marginBottom: 16,
  } as React.CSSProperties,
  successH: {
    fontSize: 22,
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 10px",
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  successHItalic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    fontWeight: 500,
    color: LILAC,
  } as React.CSSProperties,
  successSub: {
    fontSize: 14,
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
