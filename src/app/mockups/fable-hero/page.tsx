"use client";

/* Mockup: /mockups/fable-hero
   "The Timeline Hero" — a full hero redesign concept.

   A2 Media edits video; it doesn't film it. So instead of a video background
   (which says "we shoot things"), the hero IS an edit: the buyer journey laid
   out as clips on a timeline, playhead parked mid-cut on the CTA. The visual
   does the positioning work so the headline can do the selling. */

import React from "react";

/* Deterministic waveform so SSR and client render identical bars. */
const WAVE = Array.from({ length: 110 }, (_, i) => {
  const v =
    Math.abs(Math.sin(i * 0.55)) * 0.55 +
    Math.abs(Math.sin(i * 0.21 + 1.3)) * 0.35 +
    0.1;
  return Math.round(v * 100) / 100;
});

const CLIPS: { label: string; grow: number; kind: "bright" | "mid" | "dim" | "neon" }[] = [
  { label: "Hook", grow: 11, kind: "bright" },
  { label: "Problem", grow: 19, kind: "mid" },
  { label: "Proof", grow: 26, kind: "mid" },
  { label: "Objection", grow: 16, kind: "dim" },
  { label: "CTA", grow: 14, kind: "neon" },
];

const CAPTION_DASHES = [9, 14, 6, 18, 10, 7, 15, 8, 12, 6, 16, 9, 11, 7];

const CLIENTS = ["Okta", "Shopify", "Chili Piper", "Crossbeam", "Slate"];

export default function FableHeroMockup() {
  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ---- Frame ---------------------------------------------------- */}
      <header style={S.frameHeader}>
        <span style={S.frameTag}>Fable · Hero redesign concept</span>
        <h2 style={S.frameTitle}>The Timeline Hero</h2>
        <p style={S.frameNotes}>
          The current hero tells; this one shows. The whole composition is an
          edit in progress: the buyer journey laid out as clips on a timeline,
          playhead parked on the cut that closes. It positions A2 as the
          editing and strategy team without a single line of explanation, and
          it gives the headline a literal backdrop: we cut video into pipeline.
        </p>
      </header>

      {/* ---- Hero ------------------------------------------------------ */}
      <section style={S.hero}>
        <div style={S.glowA} aria-hidden />
        <div style={S.glowB} aria-hidden />
        <div style={S.rulerField} aria-hidden />

        <div style={S.inner}>
          {/* top bar */}
          <div style={S.topbar}>
            <span style={S.wordmark}>
              A2<span style={{ color: "#5A33FF" }}>&nbsp;Media</span>
            </span>
            <span style={S.tagline}>Content That Converts</span>
          </div>

          {/* eyebrow */}
          <p style={S.eyebrow}>
            <span className="fhDot" style={S.dot} aria-hidden />
            600+ sales-driven videos cut for B2B SaaS teams
          </p>

          {/* headline */}
          <h1 style={S.title}>
            <span style={S.titleLine}>We cut video</span>
            <span style={S.titleItalic}>into pipeline.</span>
          </h1>

          {/* sub + ctas */}
          <div style={S.deck}>
            <p style={S.sub}>
              We go deep on your buyer psychology, map out 6 months of video,
              then hand your team content that looks as good as it performs.
            </p>
            <div style={S.ctaCol}>
              <div style={S.ctaRow}>
                <a href="#" className="fhBtnPrimary">
                  See if we&apos;re a fit <span aria-hidden>→</span>
                </a>
                <a href="#" className="fhBtnGhost">
                  See the work
                </a>
              </div>
              <p style={S.promise}>
                Whether we work together or not, you&apos;ll leave the call
                with a direction for your video content.
              </p>
            </div>
          </div>

          {/* ---- timeline panel ---------------------------------------- */}
          <div style={S.panel}>
            <div style={S.panelHead}>
              <span style={S.projName}>
                <span style={S.projDot} aria-hidden />
                a2_pipeline_cut.proj
              </span>
              <span style={S.cutFor}>
                Cut for{" "}
                {CLIENTS.map((c, i) => (
                  <React.Fragment key={c}>
                    <strong style={S.cutForName}>{c}</strong>
                    {i < CLIENTS.length - 1 && (
                      <span style={S.cutForSep}> · </span>
                    )}
                  </React.Fragment>
                ))}
              </span>
            </div>

            {/* ruler */}
            <div style={S.ruler}>
              {["0:00", "0:15", "0:30", "0:45", "1:00"].map((t) => (
                <span key={t} style={S.tick}>
                  {t}
                </span>
              ))}
            </div>

            {/* tracks */}
            <div style={S.tracks}>
              {/* V1 — clips */}
              <div style={S.track}>
                <span style={S.trackLabel}>V1</span>
                <div style={S.trackLane}>
                  {CLIPS.map((c) => (
                    <div
                      key={c.label}
                      style={{ ...S.clip, ...CLIP_KIND[c.kind], flexGrow: c.grow }}
                    >
                      <span style={c.kind === "neon" ? S.clipTextNeon : S.clipText}>
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* A1 — waveform */}
              <div style={S.track}>
                <span style={S.trackLabel}>A1</span>
                <div style={{ ...S.trackLane, ...S.waveLane }}>
                  {WAVE.map((h, i) => (
                    <span
                      key={i}
                      style={{ ...S.waveBar, height: `${Math.round(h * 100)}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* T1 — captions */}
              <div style={S.track}>
                <span style={S.trackLabel}>T1</span>
                <div style={{ ...S.trackLane, ...S.capLane }}>
                  {CAPTION_DASHES.map((w, i) => (
                    <span key={i} style={{ ...S.capDash, flexGrow: w }} />
                  ))}
                </div>
              </div>

              {/* playhead */}
              <div style={S.playhead} aria-hidden>
                <span style={S.playChip}>
                  <span className="fhDot" style={S.playChipDot} />
                  00:47
                </span>
                <span style={S.playLine} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---- clip color treatments ------------------------------------------ */

const CLIP_KIND: Record<string, React.CSSProperties> = {
  bright: {
    background: "linear-gradient(135deg, #8F45EE 0%, #5A33FF 100%)",
    border: "1px solid rgba(255,255,255,0.22)",
  },
  mid: {
    background: "linear-gradient(135deg, rgba(90,51,255,0.85) 0%, rgba(90,51,255,0.55) 100%)",
    border: "1px solid rgba(143,69,238,0.45)",
  },
  dim: {
    background: "rgba(90,51,255,0.22)",
    border: "1px solid rgba(143,69,238,0.35)",
  },
  neon: {
    background: "rgba(102,247,142,0.10)",
    border: "1px solid rgba(102,247,142,0.65)",
  },
};

/* ---- styles ----------------------------------------------------------- */

const S = {
  page: {
    background: "#0D0536",
    minHeight: "100vh",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,

  /* frame */
  frameHeader: {
    background: "#07021f",
    borderTop: "2px solid #5A33FF",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "40px 24px 30px",
    textAlign: "center",
  } as React.CSSProperties,
  frameTag: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    padding: "5px 14px",
    borderRadius: 999,
    marginBottom: 12,
    color: "#66F78E",
    border: "1px solid rgba(102,247,142,0.45)",
  } as React.CSSProperties,
  frameTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: "#FFFFFF",
    margin: "0 0 8px",
    letterSpacing: "-0.015em",
  } as React.CSSProperties,
  frameNotes: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.65)",
    margin: "0 auto",
    maxWidth: 720,
  } as React.CSSProperties,

  /* hero shell */
  hero: {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    background:
      "radial-gradient(130% 100% at 50% 0%, #160a4a 0%, #0D0536 52%, #07021f 100%)",
    padding: "0 0 64px",
  } as React.CSSProperties,
  glowA: {
    position: "absolute",
    width: 720,
    height: 720,
    left: "-12%",
    top: "-22%",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(90,51,255,0.38) 0%, rgba(90,51,255,0) 68%)",
    filter: "blur(30px)",
    zIndex: 0,
    pointerEvents: "none",
  } as React.CSSProperties,
  glowB: {
    position: "absolute",
    width: 560,
    height: 560,
    right: "-10%",
    top: "18%",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(143,69,238,0.26) 0%, rgba(143,69,238,0) 70%)",
    filter: "blur(36px)",
    zIndex: 0,
    pointerEvents: "none",
  } as React.CSSProperties,
  rulerField: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    background:
      "repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 96px)",
    maskImage: "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.25))",
    WebkitMaskImage:
      "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.25))",
  } as React.CSSProperties,

  inner: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1240,
    margin: "0 auto",
    padding: "36px clamp(24px, 5vw, 72px) 0",
  } as React.CSSProperties,

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 64,
  } as React.CSSProperties,
  wordmark: {
    fontSize: 20,
    fontWeight: 900,
    letterSpacing: "-0.02em",
    color: "#FFFFFF",
  } as React.CSSProperties,
  tagline: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.45)",
  } as React.CSSProperties,

  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.82)",
    margin: "0 0 28px",
  } as React.CSSProperties,
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#66F78E",
    boxShadow: "0 0 10px rgba(102,247,142,0.8)",
  } as React.CSSProperties,

  title: {
    margin: "0 0 36px",
    display: "flex",
    flexDirection: "column",
    lineHeight: 0.98,
    letterSpacing: "-0.035em",
  } as React.CSSProperties,
  titleLine: {
    fontSize: "clamp(56px, 8.6vw, 122px)",
    fontWeight: 900,
    color: "#FFFFFF",
  } as React.CSSProperties,
  titleItalic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    fontWeight: 500,
    fontSize: "clamp(58px, 9vw, 128px)",
    letterSpacing: "-0.015em",
    paddingRight: "0.08em",
    background: "linear-gradient(92deg, #8F45EE 0%, #5A33FF 55%, #8F45EE 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    textShadow: "0 0 80px rgba(90,51,255,0.45)",
    filter: "drop-shadow(0 6px 40px rgba(90,51,255,0.35))",
  } as React.CSSProperties,

  deck: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 40,
    flexWrap: "wrap",
    marginBottom: 56,
  } as React.CSSProperties,
  sub: {
    fontSize: 17,
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.72)",
    maxWidth: 480,
    margin: 0,
  } as React.CSSProperties,
  ctaCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
  } as React.CSSProperties,
  ctaRow: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    flexWrap: "wrap",
  } as React.CSSProperties,
  promise: {
    fontSize: 12.5,
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.48)",
    maxWidth: 380,
    margin: 0,
  } as React.CSSProperties,

  /* timeline panel */
  panel: {
    position: "relative",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 20,
    backdropFilter: "blur(18px) saturate(140%)",
    WebkitBackdropFilter: "blur(18px) saturate(140%)",
    boxShadow:
      "0 30px 80px rgba(7,2,31,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
    padding: "18px 22px 24px",
  } as React.CSSProperties,
  panelHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 14,
  } as React.CSSProperties,
  projName: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: "rgba(255,255,255,0.55)",
  } as React.CSSProperties,
  projDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    background: "#5A33FF",
    boxShadow: "0 0 8px rgba(90,51,255,0.8)",
  } as React.CSSProperties,
  cutFor: {
    fontSize: 12,
    letterSpacing: "0.04em",
    color: "rgba(255,255,255,0.42)",
  } as React.CSSProperties,
  cutForName: {
    color: "rgba(255,255,255,0.78)",
    fontWeight: 700,
  } as React.CSSProperties,
  cutForSep: {
    color: "rgba(255,255,255,0.30)",
  } as React.CSSProperties,

  ruler: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 2px 8px 46px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background:
      "repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0 1px, transparent 1px 24px)",
    backgroundPosition: "46px 0",
    marginBottom: 12,
  } as React.CSSProperties,
  tick: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: "rgba(255,255,255,0.38)",
  } as React.CSSProperties,

  tracks: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  } as React.CSSProperties,
  track: {
    display: "flex",
    alignItems: "stretch",
    gap: 10,
  } as React.CSSProperties,
  trackLabel: {
    width: 36,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "rgba(255,255,255,0.45)",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
  } as React.CSSProperties,
  trackLane: {
    flex: 1,
    display: "flex",
    gap: 6,
    height: 52,
  } as React.CSSProperties,
  clip: {
    flexBasis: 0,
    display: "flex",
    alignItems: "center",
    paddingLeft: 12,
    borderRadius: 10,
    minWidth: 0,
    overflow: "hidden",
  } as React.CSSProperties,
  clipText: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.92)",
    whiteSpace: "nowrap",
  } as React.CSSProperties,
  clipTextNeon: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    color: "#66F78E",
    whiteSpace: "nowrap",
  } as React.CSSProperties,

  waveLane: {
    height: 40,
    alignItems: "center",
    gap: 0,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10,
    padding: "0 10px",
    display: "flex",
    justifyContent: "space-between",
    overflow: "hidden",
  } as React.CSSProperties,
  waveBar: {
    width: 3,
    flexShrink: 0,
    borderRadius: 2,
    background: "rgba(143,69,238,0.75)",
  } as React.CSSProperties,

  capLane: {
    height: 22,
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10,
    padding: "0 10px",
  } as React.CSSProperties,
  capDash: {
    flexBasis: 0,
    height: 6,
    borderRadius: 3,
    background: "rgba(255,255,255,0.22)",
  } as React.CSSProperties,

  playhead: {
    position: "absolute",
    left: "61%",
    top: -54,
    bottom: -6,
    width: 0,
    zIndex: 2,
    pointerEvents: "none",
  } as React.CSSProperties,
  playChip: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 11px",
    borderRadius: 999,
    background: "rgba(13,5,54,0.92)",
    border: "1px solid rgba(102,247,142,0.6)",
    boxShadow: "0 0 24px rgba(102,247,142,0.35)",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "#66F78E",
    whiteSpace: "nowrap",
  } as React.CSSProperties,
  playChipDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#66F78E",
  } as React.CSSProperties,
  playLine: {
    position: "absolute",
    top: 30,
    bottom: 0,
    left: -1,
    width: 2,
    background:
      "linear-gradient(180deg, #66F78E 0%, rgba(102,247,142,0.55) 70%, rgba(102,247,142,0.1) 100%)",
    boxShadow: "0 0 14px rgba(102,247,142,0.6)",
  } as React.CSSProperties,
};

/* ---- css: hover states, pulse, responsive ----------------------------- */

const css = `
  .fhBtnPrimary {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 16px 30px;
    background: #5A33FF;
    color: #FFFFFF;
    font-family: var(--a2-sans);
    font-size: 15.5px;
    font-weight: 600;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.10), 0 12px 44px rgba(90,51,255,0.5);
    transition: background 220ms ease, transform 220ms ease, box-shadow 220ms ease;
  }
  .fhBtnPrimary:hover {
    background: #8F45EE;
    transform: translateY(-1px);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 16px 52px rgba(143,69,238,0.55);
  }
  .fhBtnGhost {
    display: inline-flex;
    align-items: center;
    padding: 16px 24px;
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.85);
    font-family: var(--a2-sans);
    font-size: 15px;
    font-weight: 500;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.16);
    text-decoration: none;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: background 220ms ease, border-color 220ms ease;
  }
  .fhBtnGhost:hover {
    background: rgba(255,255,255,0.10);
    border-color: rgba(255,255,255,0.32);
  }
  .fhDot { animation: fhPulse 2.1s ease-in-out infinite; }
  @keyframes fhPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }
  @media (max-width: 820px) {
    .fhBtnPrimary, .fhBtnGhost { padding: 13px 20px; font-size: 14px; }
  }
`;
