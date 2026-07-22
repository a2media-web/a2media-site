"use client";

/* Hero "cooler" pulse mockups — 3 intensities of a subtle ongoing pulse.
   No load-in animation, no underline, no particles. Just breathe.
   Copy locked. Only the pulse dial differs. */

import React from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";

function VideoBg() {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video style={S.video} autoPlay muted loop playsInline preload="auto" src="/videos/hero-bg.mp4" aria-hidden />
      <div style={S.veil} aria-hidden />
    </>
  );
}

function HeroShell({
  label,
  variant,
  pulseClass,
}: {
  label: string;
  variant: string;
  pulseClass: string;
}) {
  return (
    <section style={S.section}>
      <VideoBg />
      <div style={S.body}>
        <div style={S.headRow}>
          <span style={S.mockLabel}>{label}</span>
          <span style={S.variantChip}>{variant}</span>
        </div>
        <p style={S.eyebrow}>
          <span style={S.dot} aria-hidden />
          600+ Sales-Driven Videos for B2B SaaS Teams
        </p>
        <h1 style={S.title}>
          <span style={S.titleLine}>Going viral is cool.</span>
          <span style={S.titleLine}>
            Making money is <span className={pulseClass} style={{ color: TEAL }}>cooler.</span>
          </span>
        </h1>
        <p style={S.sub}>
          We study the shit out of your buyers. Then ideate, build, and edit the videos that convert without them ever feeling sold to.
        </p>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main style={{ background: "#07021F" }}>
      <style dangerouslySetInnerHTML={{ __html: pulseCss }} />
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview</p>
        <h1 style={S.pageTitle}>
          &ldquo;Cooler&rdquo; pulse · <em style={{ color: TEAL }}>3 intensities</em>
        </h1>
        <p style={S.pageLede}>
          Same copy across all three. Only the pulse dial differs. No load-in
          animation. Watch each one for a few seconds to feel the difference.
        </p>
      </header>

      <HeroShell label="INTENSITY 1" variant="Whisper (5s breath, barely there)"    pulseClass="pulse-whisper" />
      <HeroShell label="INTENSITY 2" variant="Gentle (3.6s breath, present but calm)" pulseClass="pulse-gentle"  />
      <HeroShell label="INTENSITY 3" variant="Strong (2.8s breath, unmissable)"     pulseClass="pulse-strong"  />
    </main>
  );
}

// ---------- styles ----------

const S = {
  pageHead: {
    padding: "48px 32px 40px",
    textAlign: "center" as const,
    background: NIGHT,
    color: "#fff",
    fontFamily: "var(--a2-sans, system-ui)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties,
  pageEyebrow: {
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: LILAC,
    fontWeight: 800,
    margin: 0,
  } as React.CSSProperties,
  pageTitle: {
    fontSize: 32,
    fontWeight: 800,
    margin: "10px 0 12px",
    letterSpacing: "-0.02em",
  } as React.CSSProperties,
  pageLede: {
    fontSize: 14.5,
    color: "rgba(255,255,255,0.72)",
    margin: "0 auto",
    maxWidth: 700,
    lineHeight: 1.55,
  } as React.CSSProperties,

  section: {
    position: "relative" as const,
    color: "#fff",
    padding: "clamp(80px, 8vw, 140px) clamp(20px, 5vw, 64px) clamp(70px, 6vw, 100px)",
    overflow: "hidden" as const,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    fontFamily: "var(--a2-sans, system-ui)",
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    background: NIGHT,
  } as React.CSSProperties,
  video: {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    zIndex: 0,
    filter: "saturate(0.9) brightness(0.75) contrast(1.05)",
  } as React.CSSProperties,
  veil: {
    position: "absolute" as const,
    inset: 0,
    zIndex: 1,
    pointerEvents: "none" as const,
    background:
      "radial-gradient(720px 420px at 50% 32%, rgba(7, 2, 31, 0.78) 0%, rgba(13, 5, 54, 0.55) 38%, transparent 75%), linear-gradient(180deg, rgba(13, 5, 54, 0.55) 0%, rgba(26, 15, 77, 0.40) 35%, rgba(13, 5, 54, 0.85) 100%)",
  } as React.CSSProperties,

  body: {
    position: "relative" as const,
    zIndex: 10,
    width: "100%",
    maxWidth: 1080,
    margin: "0 auto",
    textAlign: "center" as const,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  } as React.CSSProperties,

  headRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 28,
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  mockLabel: {
    display: "inline-block",
    padding: "5px 12px",
    background: "rgba(102,247,142,0.12)",
    border: `1px solid ${NEON}55`,
    borderRadius: 999,
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: NEON,
  } as React.CSSProperties,
  variantChip: {
    display: "inline-block",
    padding: "5px 12px",
    background: "rgba(40,223,232,0.14)",
    border: `1px solid ${TEAL}55`,
    borderRadius: 999,
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: "#fff",
  } as React.CSSProperties,

  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 12px 6px 8px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 999,
    fontSize: 12,
    letterSpacing: "0.02em",
    color: "rgba(255,255,255,0.85)",
    fontWeight: 600,
    margin: "0 0 24px",
  } as React.CSSProperties,
  dot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: 999,
    background: NEON,
    boxShadow: `0 0 10px ${NEON}`,
  } as React.CSSProperties,

  title: {
    fontFamily: "var(--a2-sans, system-ui)",
    fontSize: "clamp(38px, 6vw, 68px)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
    margin: "0 0 24px",
    color: "#fff",
    textWrap: "balance" as const,
  } as React.CSSProperties,
  titleLine: { display: "block" } as React.CSSProperties,

  sub: {
    fontSize: "clamp(17px, 1.4vw, 19px)",
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.82)",
    margin: "0 auto 30px",
    maxWidth: 720,
    fontFamily: "var(--a2-sans, system-ui)",
    textWrap: "balance" as const,
  } as React.CSSProperties,
};

const pulseCss = `
  /* --- Whisper: barely-there breath, 5s cycle --- */
  .pulse-whisper {
    display: inline-block;
    text-shadow: 0 2px 24px rgba(40,223,232,0.4), 0 0 36px rgba(40,223,232,0.25);
    animation: pulseWhisper 5s ease-in-out infinite;
  }
  @keyframes pulseWhisper {
    0%, 100% { text-shadow: 0 2px 20px rgba(40,223,232,0.32), 0 0 28px rgba(40,223,232,0.18); filter: brightness(1); }
    50%      { text-shadow: 0 2px 26px rgba(40,223,232,0.48), 0 0 42px rgba(40,223,232,0.3);  filter: brightness(1.06); }
  }

  /* --- Gentle: present but not distracting, 3.6s cycle --- */
  .pulse-gentle {
    display: inline-block;
    text-shadow: 0 2px 24px rgba(40,223,232,0.4), 0 0 36px rgba(40,223,232,0.25);
    animation: pulseGentle 3.6s ease-in-out infinite;
  }
  @keyframes pulseGentle {
    0%, 100% { text-shadow: 0 2px 22px rgba(40,223,232,0.38), 0 0 32px rgba(40,223,232,0.22); filter: brightness(1); }
    50%      { text-shadow: 0 2px 32px rgba(40,223,232,0.7),  0 0 55px rgba(40,223,232,0.42); filter: brightness(1.12); }
  }

  /* --- Strong: unmissable neon-sign pulse, 2.8s cycle --- */
  .pulse-strong {
    display: inline-block;
    text-shadow: 0 2px 24px rgba(40,223,232,0.5), 0 0 40px rgba(40,223,232,0.32);
    animation: pulseStrong 2.8s ease-in-out infinite;
  }
  @keyframes pulseStrong {
    0%, 100% { text-shadow: 0 2px 24px rgba(40,223,232,0.45), 0 0 40px rgba(40,223,232,0.28); filter: brightness(1); }
    50%      { text-shadow: 0 2px 40px rgba(40,223,232,0.9),  0 0 80px rgba(40,223,232,0.6);  filter: brightness(1.22); }
  }
`;
