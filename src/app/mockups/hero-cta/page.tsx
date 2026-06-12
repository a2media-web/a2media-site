"use client";

/* Mockup: /mockups/hero-cta
   Fixing hero CTA findings #1 (primary button goes to Pricing, not booking)
   and #2 (two equal-weight CTAs split the click).

   Reference = what's live now. Then two recommended treatments. The hero
   visual is approximated with a Night Core gradient (live hero uses a video
   bg) so attention stays on the CTA block, which is the point. */

import React from "react";

const TRUST = ["Okta", "Shopify", "Chili Piper", "Crossbeam", "Slate"];

/* ---- shared hero shell ---------------------------------------------------- */

function HeroShell({
  children,
  proofLine,
}: {
  children: React.ReactNode;
  proofLine?: React.ReactNode;
}) {
  return (
    <div style={S.hero}>
      <div style={S.veil} aria-hidden />
      <div style={S.body}>
        <p style={S.eyebrow}>
          <span style={S.dot} aria-hidden />
          600+ Sales-Driven Videos for B2B SaaS Teams
        </p>
        <h1 style={S.title}>
          Your videos should be{" "}
          <em style={S.italic}>closing deals</em> for you.
        </h1>
        <p style={S.sub}>
          We go deep on your buyer psychology, map out 6 months of video, then
          hand your team content that looks as good as it performs.
        </p>

        <div style={S.ctaWrap}>{children}</div>

        {proofLine && <p style={S.proofLine}>{proofLine}</p>}

        <div style={S.trust}>
          <p style={S.trustLabel}>Trusted by</p>
          <div style={S.trustRow}>
            {TRUST.map((t) => (
              <span key={t} style={S.trustLogo}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- page ----------------------------------------------------------------- */

export default function HeroCtaMockups() {
  return (
    <main style={{ background: "#07021f" }}>
      {/* REFERENCE */}
      <Frame
        tag="Reference · Live now"
        title="Primary CTA points to Pricing"
        notes="What's on a2media.ca today. The big purple button — the most-clicked element — says 'Pricing'. The actual conversion action ('See if We're a Fit') is only in the nav. And the two buttons carry near-equal weight, so the click splits."
        flag="problem"
      >
        <HeroShell>
          <a href="#" style={S.btnPrimary}>Pricing <span aria-hidden>→</span></a>
          <a href="#" style={S.btnGhostEqual}>See the videos</a>
        </HeroShell>
      </Frame>

      {/* RECOMMENDED A */}
      <Frame
        tag="Recommended · Booking-led"
        title="Booking is the primary. Pricing leaves the hero."
        notes="The solid button now drives the conversion action. 'See the work' is demoted to a quiet ghost so there's one clear hierarchy, not two competing buttons. Pricing stays reachable in the nav (and the page scrolls to it anyway). A one-line proof sits under the buttons at the exact moment of decision."
        flag="rec"
      >
        <HeroShell
          proofLine={
            <>
              <strong style={S.proofStrong}>$600K</strong> closed-won at Reveal
              {"  ·  "}
              <strong style={S.proofStrong}>18-month</strong> average client
            </>
          }
        >
          <a href="#" style={S.btnPrimary}>See if we&apos;re a fit <span aria-hidden>→</span></a>
          <a href="#" style={S.btnGhostQuiet}>See the work</a>
        </HeroShell>
      </Frame>

      {/* RECOMMENDED B */}
      <Frame
        tag="Alternative · Single CTA"
        title="One button. Maximum focus."
        notes="Kills CTA competition entirely. One dominant action, with 'watch the work' demoted to a plain text link below it. The most focused version — highest click-through on the primary action, at the cost of making the portfolio one extra step. Best if booking is unambiguously the goal."
        flag="rec"
      >
        <HeroShell
          proofLine={
            <>
              <strong style={S.proofStrong}>$600K</strong> closed-won at Reveal
              {"  ·  "}
              <strong style={S.proofStrong}>18-month</strong> average client
            </>
          }
        >
          <div style={S.singleWrap}>
            <a href="#" style={S.btnPrimaryBig}>See if we&apos;re a fit <span aria-hidden>→</span></a>
            <a href="#" style={S.textLink}>or watch the work ↓</a>
          </div>
        </HeroShell>
      </Frame>
    </main>
  );
}

/* ---- frame ---------------------------------------------------------------- */

function Frame({
  tag, title, notes, flag, children,
}: {
  tag: string; title: string; notes: string; flag: "problem" | "rec"; children: React.ReactNode;
}) {
  return (
    <>
      <header style={S.frameHeader}>
        <span style={{ ...S.frameTag, ...(flag === "problem" ? S.tagProblem : S.tagRec) }}>{tag}</span>
        <h2 style={S.frameTitle}>{title}</h2>
        <p style={S.frameNotes}>{notes}</p>
      </header>
      {children}
    </>
  );
}

/* ---- styles --------------------------------------------------------------- */

const S = {
  frameHeader: { background: "#000", borderTop: "2px solid #5A33FF", padding: "40px 24px 28px", textAlign: "center" } as React.CSSProperties,
  frameTag: { display: "inline-block", fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 999, marginBottom: 12 } as React.CSSProperties,
  tagProblem: { color: "#ff5e7a", border: "1px solid rgba(255,94,122,0.45)" } as React.CSSProperties,
  tagRec: { color: "#66f78e", border: "1px solid rgba(102,247,142,0.45)" } as React.CSSProperties,
  frameTitle: { fontFamily: "var(--a2-sans)", fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.015em" } as React.CSSProperties,
  frameNotes: { fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: 700 } as React.CSSProperties,

  hero: { position: "relative", minHeight: 620, display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(120% 90% at 50% 0%, #1a1148 0%, #0d0536 55%, #08031f 100%)", fontFamily: "var(--a2-sans)", padding: "80px 24px", overflow: "hidden" } as React.CSSProperties,
  veil: { position: "absolute", inset: 0, background: "radial-gradient(60% 50% at 50% 40%, rgba(90,51,255,0.18), transparent)", pointerEvents: "none" } as React.CSSProperties,
  body: { position: "relative", maxWidth: 760, textAlign: "center", color: "#fff" } as React.CSSProperties,
  eyebrow: { display: "inline-flex", alignItems: "center", gap: 9, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: 22 } as React.CSSProperties,
  dot: { width: 8, height: 8, borderRadius: 999, background: "#66f78e", boxShadow: "0 0 12px rgba(102,247,142,0.8)" } as React.CSSProperties,
  title: { fontSize: "clamp(40px,6vw,68px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.025em", margin: "0 0 22px" } as React.CSSProperties,
  italic: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#8f7bff" } as React.CSSProperties,
  sub: { fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.72)", maxWidth: 560, margin: "0 auto 36px" } as React.CSSProperties,

  ctaWrap: { display: "flex", gap: 14, justifyContent: "center", alignItems: "center", flexWrap: "wrap" } as React.CSSProperties,
  singleWrap: { display: "flex", flexDirection: "column", gap: 16, alignItems: "center" } as React.CSSProperties,

  btnPrimary: { display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", background: "#5a33ff", color: "#fff", fontSize: 16, fontWeight: 600, borderRadius: 999, textDecoration: "none", boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(90,51,255,0.5)" } as React.CSSProperties,
  btnPrimaryBig: { display: "inline-flex", alignItems: "center", gap: 10, padding: "20px 44px", background: "#5a33ff", color: "#fff", fontSize: 18, fontWeight: 700, borderRadius: 999, textDecoration: "none", boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 14px 50px rgba(90,51,255,0.6), 0 0 70px rgba(90,51,255,0.3)" } as React.CSSProperties,
  // equal-weight ghost = the problem (competes with primary)
  btnGhostEqual: { display: "inline-flex", alignItems: "center", padding: "16px 30px", background: "rgba(255,255,255,0.10)", color: "#fff", fontSize: 16, fontWeight: 600, borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" } as React.CSSProperties,
  // quiet ghost = demoted (clear hierarchy)
  btnGhostQuiet: { display: "inline-flex", alignItems: "center", padding: "16px 24px", background: "transparent", color: "rgba(255,255,255,0.7)", fontSize: 15, fontWeight: 500, borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,255,255,0.16)" } as React.CSSProperties,
  textLink: { color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500, textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 2 } as React.CSSProperties,

  proofLine: { fontSize: 13.5, color: "rgba(255,255,255,0.6)", marginTop: 20, letterSpacing: "0.02em" } as React.CSSProperties,
  proofStrong: { color: "#66f78e", fontWeight: 700 } as React.CSSProperties,

  trust: { marginTop: 48 } as React.CSSProperties,
  trustLabel: { fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 } as React.CSSProperties,
  trustRow: { display: "flex", gap: 28, justifyContent: "center", alignItems: "center", flexWrap: "wrap" } as React.CSSProperties,
  trustLogo: { fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" } as React.CSSProperties,
};
