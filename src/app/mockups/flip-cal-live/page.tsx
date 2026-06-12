"use client";

/* Mockup: /mockups/flip-cal-live
   Same center-flip pattern, but the back of the card now loads your
   actual Cal.com event in a real iframe so you can see what the
   production embed will look like.

   Using: https://cal.com/a2media/meeting (your live booking URL
   from src/components/sections/FinalCTA/index.tsx)

   Filter chips fire first (ARR + Budget), then the embed loads.
   For production we'll swap the iframe for @calcom/embed-react which
   is slightly more polished and supports event listeners (we can
   capture the "booking_successful" event and write to Notion right
   when the call is booked). But functionally this is identical. */

import React, { useState } from "react";

const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const CAL_EMBED_URL = "https://cal.com/a2media/meeting?embed=true&layout=month_view";

type Tier = "oneoff" | "jumpstart" | "engine";
const TIERS: Record<
  Tier,
  {
    badge: string;
    name: string;
    price: string;
    sub: string;
    desc: string;
    cta: string;
    style: "outline" | "primary";
  }
> = {
  oneoff: {
    badge: "ONE-TIME",
    name: "One-off Video",
    price: "$2K",
    sub: "starting price",
    desc: "You give us the raw footage. We make it look expensive.",
    cta: "Get Started",
    style: "outline",
  },
  jumpstart: {
    badge: "ONE-TIME",
    name: "2-Week Jumpstart",
    price: "$8K",
    sub: "one-time",
    desc: "We research your buyer, map 6 months of video, give you 3 to test.",
    cta: "Get Started",
    style: "outline",
  },
  engine: {
    badge: "MONTHLY",
    name: "Video Growth Engine",
    price: "$15K — $25K",
    sub: "/ month",
    desc: "We run your whole video department. Script to screen.",
    cta: "See if We're a Fit",
    style: "primary",
  },
};

export default function FlipCalLiveMockup() {
  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header style={S.frameHeader}>
        <span style={S.frameTag}>Real Cal embed · live preview</span>
        <h2 style={S.frameTitle}>
          Your actual Cal link, embedded after the chip filter.
        </h2>
        <p style={S.frameNotes}>
          This is the same center-flip pattern from the last mockup, but
          the calendar on the back is your <strong>real</strong> cal.com/
          a2media/meeting widget loaded in an iframe. Click &ldquo;See if
          We&apos;re a Fit&rdquo;, answer the two chip questions, and Cal
          renders inline so you can pick a real time and book.
        </p>
      </header>

      <Demo
        tag="Live embed · cal.com/a2media/meeting"
        title="Click → flip → chips → real Cal widget."
        notes="The iframe pulls in your actual booking page. The 'Powered by Cal.com' line at the bottom is the free-plan watermark — paid removes it. Everything else looks identical to what visitors will see in production."
      >
        <Stage />
      </Demo>

      <p style={S.footnote}>
        Production version will use the @calcom/embed-react package
        instead of a raw iframe. Same UI, plus we can listen for the
        &ldquo;booking_successful&rdquo; event and write the application
        to Notion at the exact moment the call is booked.
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
/*  Stage                                                       */
/* ============================================================ */

function Stage() {
  const [openTier, setOpenTier] = useState<Tier | null>(null);

  return (
    <div style={S.stageWrap}>
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

      <div
        style={{
          ...S.backdrop,
          opacity: openTier ? 1 : 0,
          pointerEvents: openTier ? "auto" : "none",
        }}
        onClick={() => setOpenTier(null)}
      />

      <FlippedPanel tier={openTier} onClose={() => setOpenTier(null)} />
    </div>
  );
}

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
/*  Flipped panel with chips + real Cal iframe                  */
/* ============================================================ */

function FlippedPanel({
  tier,
  onClose,
}: {
  tier: Tier | null;
  onClose: () => void;
}) {
  const open = tier !== null;
  const [filterDone, setFilterDone] = useState(false);

  React.useEffect(() => {
    if (!open) {
      const id = setTimeout(() => setFilterDone(false), 380);
      return () => clearTimeout(id);
    }
  }, [open]);

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
        {/* Front */}
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

          <span style={S.backEyebrow}>
            <span style={S.dotLive} className="pj-led" /> Engine · See if
            We&apos;re a Fit
          </span>
          <h4 style={S.backH}>
            {filterDone
              ? "Pick a time. We'll lock it."
              : "Two quick ones, then pick a time."}
          </h4>

          {!filterDone && <FilterChips onDone={() => setFilterDone(true)} />}

          {filterDone && (
            <div style={S.iframeWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <iframe
                src={CAL_EMBED_URL}
                style={S.iframe}
                title="Book a call · A2 Media"
                allow="camera; microphone; payment"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p style={S.iframeNote}>
                ↑ Live Cal.com widget pulled from your event. Pick any
                time and you can actually book this call right now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
    minHeight: 900,
    overflow: "hidden" as const,
  } as React.CSSProperties,

  stageWrap: { position: "relative" as const, minHeight: 820 } as React.CSSProperties,
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
    perspective: 2200,
    pointerEvents: "none" as const,
  } as React.CSSProperties,
  flipCard: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    width: "min(840px, calc(100% - 48px))",
    minHeight: 720,
    transformStyle: "preserve-3d" as const,
    transition: "transform 780ms cubic-bezier(.4,.2,.2,1)",
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

  /* iframe wrap */
  iframeWrap: {
    background: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 40px rgba(0,0,0,0.35)",
  } as React.CSSProperties,
  iframe: {
    width: "100%",
    height: 620,
    border: "none",
    display: "block",
  } as React.CSSProperties,
  iframeNote: {
    margin: 0,
    padding: "10px 14px",
    fontSize: 11.5,
    color: "rgba(13,5,54,0.55)",
    background: "#F8F7FB",
    borderTop: "1px solid rgba(13,5,54,0.08)",
    textAlign: "center" as const,
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
