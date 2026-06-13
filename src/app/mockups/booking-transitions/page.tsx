"use client";

/* 4 booking-modal transition mockups for desktop.
   Each variant: idle button → mid-animation → fake modal.
   Click any "Book the Call" button to see its transition fire. */

import React, { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const NIGHT = "#0D0536";

const VARIANTS = [
  {
    key: "spotlight",
    name: "The Spotlight Beam",
    sub: "Vertical purple beam shoots up from the button, expands to fill the screen, modal materializes from the light.",
    note: "Most cinematic. Feels like 'main character moment.'",
  },
  {
    key: "iris",
    name: "The Iris Aperture",
    sub: "A circular purple iris expands outward from the click point, sweeps the whole viewport, then opens to reveal the modal.",
    note: "Most premium. Borrows from old film transitions.",
  },
  {
    key: "curtain",
    name: "The Theater Curtain",
    sub: "Two purple panels slide in from the sides, meet in the middle, pause, then part to reveal the modal behind them.",
    note: "Most dramatic. Adds anticipation.",
  },
  {
    key: "morph",
    name: "The Button Morph",
    sub: "The button itself scales, grows, and morphs into the modal shape. The click target becomes the destination.",
    note: "Most spatial. Feels physically connected.",
  },
];

export default function Page() {
  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <header style={S.header}>
        <p style={S.eyebrow}>Mockup · Booking modal transitions</p>
        <h1 style={S.title}>Pick a Vibe</h1>
        <p style={S.lede}>
          Click any &quot;Book the Call&quot; button to fire its desktop transition. Each
          ends in the same placeholder modal so you can compare just the
          motion. Click the backdrop or hit Esc to close and try the next one.
        </p>
      </header>

      <section style={S.grid}>
        {VARIANTS.map((v) => (
          <VariantCard key={v.key} variant={v} />
        ))}
      </section>
    </main>
  );
}

function VariantCard({ variant }: { variant: typeof VARIANTS[number] }) {
  const [phase, setPhase] = useState<"idle" | "running" | "modal">("idle");
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const trigger = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setPhase("running");
    const total =
      variant.key === "spotlight" ? 850 :
      variant.key === "iris"      ? 750 :
      variant.key === "curtain"   ? 1100 :
                                    900;
    setTimeout(() => setPhase("modal"), total);
  }, [variant.key]);

  const close = useCallback(() => setPhase("idle"), []);

  return (
    <article style={S.card}>
      <span style={S.cardChip}>{variant.key.toUpperCase()}</span>
      <h2 style={S.cardName}>{variant.name}</h2>
      <p style={S.cardSub}>{variant.sub}</p>
      <p style={S.cardNote}>{variant.note}</p>

      <div style={S.cardBtnRow}>
        <button type="button" onClick={trigger} style={S.bookBtn}>
          Book the Call <span aria-hidden>→</span>
        </button>
      </div>

      {phase !== "idle" && (
        <TransitionLayer
          variant={variant.key}
          phase={phase}
          origin={origin}
          onClose={close}
        />
      )}
    </article>
  );
}

function TransitionLayer({
  variant, phase, origin, onClose,
}: {
  variant: string;
  phase: "running" | "modal";
  origin: { x: number; y: number };
  onClose: () => void;
}) {
  // Portal escapes the card's backdrop-filter stacking context so the
  // animation actually covers the viewport instead of being clipped to the card.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div style={S.layer} role="dialog" aria-modal="true">
      {/* Phase 1 — the transition itself */}
      {phase === "running" && (
        <>
          {variant === "spotlight" && <SpotlightAnim origin={origin} />}
          {variant === "iris"      && <IrisAnim      origin={origin} />}
          {variant === "curtain"   && <CurtainAnim />}
          {variant === "morph"     && <MorphAnim     origin={origin} />}
        </>
      )}

      {/* Phase 2 — settled modal */}
      {phase === "modal" && <FakeModal onClose={onClose} />}
    </div>,
    document.body
  );
}

/* -------- Variant 1: Spotlight Beam -------- */
function SpotlightAnim({ origin }: { origin: { x: number; y: number } }) {
  return (
    <>
      <div
        className="bt-beam"
        style={{
          ...S.beam,
          left: origin.x,
          top: origin.y,
        }}
      />
      <div className="bt-spot-flash" style={S.spotFlash} />
    </>
  );
}

/* -------- Variant 2: Iris Aperture -------- */
function IrisAnim({ origin }: { origin: { x: number; y: number } }) {
  return (
    <div
      className="bt-iris"
      style={{
        ...S.iris,
        left: origin.x,
        top: origin.y,
      }}
    />
  );
}

/* -------- Variant 3: Theater Curtain -------- */
function CurtainAnim() {
  return (
    <>
      <div className="bt-curtain-l" style={{ ...S.curtain, left: 0 }} />
      <div className="bt-curtain-r" style={{ ...S.curtain, right: 0 }} />
      <div className="bt-curtain-spark" style={S.curtainSpark}>
        <span style={S.dotPulse} /> opening your call
      </div>
    </>
  );
}

/* -------- Variant 4: Button Morph -------- */
function MorphAnim({ origin }: { origin: { x: number; y: number } }) {
  return (
    <div
      className="bt-morph"
      style={{
        ...S.morph,
        left: origin.x,
        top: origin.y,
      }}
    />
  );
}

/* -------- Shared fake modal that all 4 land on -------- */
function FakeModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div style={S.modalBackdrop} onClick={onClose} className="bt-fade-in" />
      <div style={S.modal} className="bt-pop-in">
        <button onClick={onClose} aria-label="Close" style={S.modalX}>×</button>
        <div style={S.modalGrid}>
          <aside style={S.modalLeft}>
            <div style={S.modalAvatar}>A</div>
            <p style={S.modalAuthor}>Ademola Adelakun</p>
            <p style={S.modalRole}>Founder, A2 Media</p>
            <h3 style={S.modalHead}>
              Free 30 minute call. We give you actionable next steps.
            </h3>
            <ul style={S.modalList}>
              <li>→ We stalk you online to see where you&apos;re at.</li>
              <li>→ You tell us your goals with video.</li>
              <li>→ We tell you what to do next.</li>
            </ul>
            <div style={S.modalCloser}>
              <span style={S.modalEyebrow}>
                <span style={S.modalPulse} /> Either way
              </span>
              <p style={S.modalCloserLine}>
                <strong>Even if you don&apos;t sign with us.</strong>{" "}
                <span style={S.modalCloserFinish}>
                  We&apos;ll tell you how to choose the right partner.
                </span>
              </p>
            </div>
          </aside>
          <div style={S.modalRight}>
            <div style={S.fakeCalHeader}>
              <span>June 2026</span>
              <span style={{ opacity: 0.5 }}>‹ ›</span>
            </div>
            <div style={S.fakeCalGrid}>
              {Array.from({ length: 35 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    ...S.fakeCalCell,
                    background:
                      [9, 12, 17, 23, 26].includes(i)
                        ? "rgba(90,51,255,0.18)"
                        : "rgba(0,0,0,0.04)",
                    color:
                      [9, 12, 17, 23, 26].includes(i) ? PURPLE : "#666",
                    fontWeight: [9, 12, 17, 23, 26].includes(i) ? 700 : 500,
                  }}
                >
                  {i > 5 && i < 36 ? i - 5 : ""}
                </span>
              ))}
            </div>
            <p style={S.fakeCalNote}>
              Mock calendar — the real version embeds cal.com/a2media/&lt;slug&gt;
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------- styles ------------------- */

const S = {
  page: {
    minHeight: "100vh",
    padding: "clamp(40px, 6vw, 80px) clamp(20px, 4vw, 60px) 100px",
    background: `radial-gradient(ellipse at top, #1A0F4D 0%, ${NIGHT} 55%, #07021F 100%)`,
    color: "#fff",
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,
  header: { maxWidth: 980, margin: "0 auto 40px" } as React.CSSProperties,
  eyebrow: {
    fontSize: 11.5,
    letterSpacing: "0.22em",
    color: LILAC,
    fontWeight: 800,
    textTransform: "uppercase" as const,
    margin: 0,
  } as React.CSSProperties,
  title: {
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: 900,
    letterSpacing: "-0.03em",
    margin: "10px 0 14px",
  } as React.CSSProperties,
  lede: {
    fontSize: 16,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.7)",
    maxWidth: 700,
    margin: 0,
  } as React.CSSProperties,

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
    gap: 24,
    maxWidth: 1280,
    margin: "0 auto",
  } as React.CSSProperties,

  card: {
    position: "relative" as const,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 18,
    padding: "26px 26px 22px",
    backdropFilter: "blur(10px)",
    minHeight: 280,
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,
  cardChip: {
    alignSelf: "flex-start",
    fontSize: 10.5,
    letterSpacing: "0.18em",
    fontWeight: 800,
    color: PURPLE,
    border: `1px solid ${PURPLE}55`,
    borderRadius: 999,
    padding: "4px 11px",
    marginBottom: 14,
  } as React.CSSProperties,
  cardName: {
    fontSize: 22,
    fontWeight: 800,
    margin: "0 0 8px",
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  cardSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.72)",
    lineHeight: 1.55,
    margin: "0 0 10px",
  } as React.CSSProperties,
  cardNote: {
    fontSize: 12.5,
    color: NEON,
    fontStyle: "italic" as const,
    margin: "0 0 18px",
  } as React.CSSProperties,
  cardBtnRow: { marginTop: "auto" } as React.CSSProperties,
  bookBtn: {
    appearance: "none" as const,
    background: `linear-gradient(135deg, ${PURPLE}, ${LILAC})`,
    color: "#fff",
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: "0.02em",
    padding: "14px 24px",
    border: "none",
    borderRadius: 999,
    cursor: "pointer",
    width: "100%",
    boxShadow: "0 12px 30px rgba(90,51,255,0.35)",
  } as React.CSSProperties,

  layer: {
    position: "fixed" as const,
    inset: 0,
    zIndex: 50,
    pointerEvents: "auto" as const,
  } as React.CSSProperties,

  // --- Beam ---
  beam: {
    position: "absolute" as const,
    width: 6,
    height: 0,
    transform: "translate(-50%, -100%)",
    background: `linear-gradient(180deg, transparent, ${PURPLE}, ${LILAC}, #fff)`,
    boxShadow: `0 0 60px ${PURPLE}, 0 0 120px ${PURPLE}`,
    borderRadius: 999,
    pointerEvents: "none" as const,
  } as React.CSSProperties,
  spotFlash: {
    position: "absolute" as const,
    inset: 0,
    background: `radial-gradient(circle at center, rgba(90,51,255,0.6), rgba(13,5,54,0.95))`,
    opacity: 0,
    pointerEvents: "none" as const,
  } as React.CSSProperties,

  // --- Iris ---
  iris: {
    position: "absolute" as const,
    width: 12,
    height: 12,
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${LILAC} 0%, ${PURPLE} 60%, rgba(7,2,31,0.95) 100%)`,
    boxShadow: `0 0 80px ${PURPLE}`,
    pointerEvents: "none" as const,
  } as React.CSSProperties,

  // --- Curtain ---
  curtain: {
    position: "absolute" as const,
    top: 0,
    width: "50vw",
    height: "100vh",
    background: `linear-gradient(180deg, #1A0F4D, ${NIGHT})`,
    borderRight: `1px solid ${PURPLE}55`,
    boxShadow: `inset 0 0 80px rgba(90,51,255,0.25)`,
    pointerEvents: "none" as const,
  } as React.CSSProperties,
  curtainSpark: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 12,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#fff",
    fontWeight: 800,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    opacity: 0,
  } as React.CSSProperties,
  dotPulse: {
    display: "inline-block",
    width: 7,
    height: 7,
    borderRadius: 999,
    background: NEON,
    boxShadow: `0 0 10px ${NEON}`,
  } as React.CSSProperties,

  // --- Morph ---
  morph: {
    position: "absolute" as const,
    width: 220,
    height: 52,
    transform: "translate(-50%, -50%)",
    background: `linear-gradient(135deg, ${PURPLE}, ${LILAC})`,
    borderRadius: 999,
    boxShadow: `0 20px 60px rgba(90,51,255,0.5)`,
    pointerEvents: "none" as const,
  } as React.CSSProperties,

  // --- Settled modal ---
  modalBackdrop: {
    position: "absolute" as const,
    inset: 0,
    background: "rgba(7,2,31,0.78)",
    backdropFilter: "blur(8px)",
  } as React.CSSProperties,
  modal: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(880px, calc(100% - 24px))",
    maxHeight: "calc(100vh - 24px)",
    overflow: "auto" as const,
    background: `linear-gradient(180deg, #1A0F4D, ${NIGHT})`,
    border: `1px solid ${PURPLE}88`,
    borderRadius: 18,
    boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(90,51,255,0.32)",
    color: "#fff",
  } as React.CSSProperties,
  modalX: {
    position: "absolute" as const,
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    fontSize: 20,
    cursor: "pointer",
    zIndex: 4,
  } as React.CSSProperties,
  modalGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 280px) 1fr",
    gap: 14,
    padding: 14,
  } as React.CSSProperties,
  modalLeft: {
    padding: 22,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
  } as React.CSSProperties,
  modalAvatar: {
    width: 56,
    height: 56,
    borderRadius: 999,
    background: `linear-gradient(135deg, ${PURPLE}, ${LILAC})`,
    color: "#fff",
    fontWeight: 900,
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px solid ${PURPLE}`,
    marginBottom: 10,
  } as React.CSSProperties,
  modalAuthor: { fontSize: 13, fontWeight: 800, margin: 0 } as React.CSSProperties,
  modalRole: {
    fontSize: 11.5,
    fontWeight: 600,
    color: "rgba(255,255,255,0.55)",
    margin: 0,
    letterSpacing: "0.04em",
  } as React.CSSProperties,
  modalHead: {
    fontSize: 18,
    fontWeight: 800,
    margin: "14px 0",
    lineHeight: 1.3,
  } as React.CSSProperties,
  modalList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    fontSize: 12.5,
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.82)",
    display: "grid",
    gap: 8,
  } as React.CSSProperties,
  modalCloser: {
    marginTop: 16,
    padding: 12,
    background: "rgba(143,69,238,0.12)",
    border: `1px solid ${LILAC}66`,
    borderRadius: 10,
  } as React.CSSProperties,
  modalEyebrow: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.22em",
    color: LILAC,
    textTransform: "uppercase" as const,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  } as React.CSSProperties,
  modalPulse: {
    width: 7,
    height: 7,
    borderRadius: 999,
    background: LILAC,
    boxShadow: `0 0 8px ${LILAC}`,
  } as React.CSSProperties,
  modalCloserLine: {
    fontSize: 12.5,
    lineHeight: 1.5,
    margin: "6px 0 0",
  } as React.CSSProperties,
  modalCloserFinish: {
    color: NEON,
    fontStyle: "italic" as const,
  } as React.CSSProperties,
  modalRight: {
    borderRadius: 14,
    background: "#fff",
    color: "#0D0536",
    padding: 18,
    minHeight: 380,
  } as React.CSSProperties,
  fakeCalHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 800,
    fontSize: 14,
    marginBottom: 12,
  } as React.CSSProperties,
  fakeCalGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4,
  } as React.CSSProperties,
  fakeCalCell: {
    aspectRatio: "1 / 1",
    borderRadius: 6,
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  fakeCalNote: {
    fontSize: 11,
    color: "rgba(13,5,54,0.5)",
    marginTop: 14,
    fontStyle: "italic" as const,
  } as React.CSSProperties,
};

const css = `
  /* Spotlight beam — beam climbs from button, screen flashes purple */
  @keyframes btBeamRise {
    0%   { height: 0;     opacity: 1; }
    60%  { height: 110vh; opacity: 1; }
    100% { height: 110vh; opacity: 0; }
  }
  .bt-beam { animation: btBeamRise 600ms cubic-bezier(.2,.7,.2,1.2) forwards; }
  @keyframes btSpotFlash {
    0%   { opacity: 0; transform: scale(0.6); }
    35%  { opacity: 1; transform: scale(1.0); }
    100% { opacity: 0; transform: scale(1.0); }
  }
  .bt-spot-flash { animation: btSpotFlash 800ms ease-out forwards; animation-delay: 200ms; }

  /* Iris — circle expands to fill viewport, then implodes to reveal */
  @keyframes btIrisExpand {
    0%   { width: 12px;    height: 12px;   opacity: 1; }
    55%  { width: 250vmax; height: 250vmax; opacity: 1; }
    100% { width: 250vmax; height: 250vmax; opacity: 0; }
  }
  .bt-iris { animation: btIrisExpand 720ms cubic-bezier(.55,.05,.25,1) forwards; }

  /* Curtain — two panels meet center, pause, then part */
  @keyframes btCurtainL {
    0%   { transform: translateX(-100%); }
    35%  { transform: translateX(0); }
    65%  { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  @keyframes btCurtainR {
    0%   { transform: translateX(100%); }
    35%  { transform: translateX(0); }
    65%  { transform: translateX(0); }
    100% { transform: translateX(100%); }
  }
  .bt-curtain-l { animation: btCurtainL 1050ms cubic-bezier(.7,.0,.3,1) forwards; }
  .bt-curtain-r { animation: btCurtainR 1050ms cubic-bezier(.7,.0,.3,1) forwards; }
  @keyframes btCurtainSpark {
    0%, 25%   { opacity: 0; transform: translate(-50%, -50%) scale(0.92); }
    40%, 60%  { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    75%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
  }
  .bt-curtain-spark { animation: btCurtainSpark 1050ms ease both; }

  /* Morph — pill button stretches and grows into modal silhouette */
  @keyframes btMorph {
    0%   { width: 220px;  height: 52px;  border-radius: 999px; opacity: 1; }
    50%  { width: 60vw;   height: 60vh;  border-radius: 60px;  opacity: 0.9; }
    100% { width: 880px;  height: 540px; border-radius: 18px;  opacity: 0; }
  }
  .bt-morph { animation: btMorph 850ms cubic-bezier(.2,.7,.2,1.05) forwards; }

  /* Modal landing */
  @keyframes btFadeIn { from { opacity: 0; } to { opacity: 1; } }
  .bt-fade-in { animation: btFadeIn 200ms ease both; }
  @keyframes btPopIn {
    from { transform: translate(-50%, -50%) scale(0.96); opacity: 0; }
    to   { transform: translate(-50%, -50%) scale(1);    opacity: 1; }
  }
  .bt-pop-in { animation: btPopIn 280ms cubic-bezier(.2,.7,.2,1.1) both; }
`;
