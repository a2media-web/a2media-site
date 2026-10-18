"use client";

/* "See even more work" — 5 prominence treatments.
   Each shown in the real ScrubReel footer context (progress bar + scroll
   hint + "See pricing" purple button) so the balance against the primary
   CTA is visible. The scroll-fade behavior we already shipped is unchanged;
   only the link's visual weight differs. */

import React from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";

const WISTIA = "https://fast.wistia.com/embed/channel/fj6gynv9qi";

function FooterBar() {
  return (
    <>
      <div style={S.progressTrack}>
        <div style={S.progressBar} />
      </div>
      <div style={S.footer}>
        <span style={S.scrollHint}>Scroll to explore →</span>
        <a href="#" style={S.portfolioBtn}>
          See pricing <span aria-hidden>→</span>
        </a>
      </div>
    </>
  );
}

function Shell({
  label,
  variant,
  footerRow,
  children,
}: {
  label: string;
  variant: string;
  footerRow?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <div style={S.headRow}>
          <span style={S.mockLabel}>{label}</span>
          <span style={S.variantChip}>{variant}</span>
        </div>
        <div style={S.bottomArea}>
          <div style={S.progressTrack}>
            <div style={S.progressBar} />
          </div>
          {footerRow ?? (
            <div style={S.footer}>
              <span style={S.scrollHint}>Scroll to explore →</span>
              <a href="#" style={S.portfolioBtn}>
                See pricing <span aria-hidden>→</span>
              </a>
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

/* ---- 1. Teal ghost pill ---- */
function V1GhostPill() {
  return (
    <div style={S.centerWrap}>
      <a href={WISTIA} target="_blank" rel="noreferrer" className="v1" style={S.ghostPill}>
        See even more work <span aria-hidden>→</span>
      </a>
      <style>{`.v1:hover{background:rgba(40,223,232,0.12);border-color:${TEAL};color:${TEAL}}`}</style>
    </div>
  );
}

/* ---- 2. Bright text + standing underline ---- */
function V2BrightUnderline() {
  return (
    <div style={S.centerWrap}>
      <a href={WISTIA} target="_blank" rel="noreferrer" className="v2" style={S.brightLink}>
        See even more work <span aria-hidden>→</span>
      </a>
      <style>{`.v2{border-bottom:2px solid ${TEAL};padding-bottom:3px}.v2:hover{color:${TEAL}}`}</style>
    </div>
  );
}

/* ---- 3. Soft teal-filled secondary button ---- */
function V3TealFilled() {
  return (
    <div style={S.centerWrap}>
      <a href={WISTIA} target="_blank" rel="noreferrer" className="v3" style={S.tealFilled}>
        See even more work <span aria-hidden>→</span>
      </a>
      <style>{`.v3:hover{background:rgba(40,223,232,0.22);box-shadow:0 0 24px rgba(40,223,232,0.25)}`}</style>
    </div>
  );
}

/* ---- 4. Play icon + outlined button ---- */
function V4PlayIcon() {
  return (
    <div style={S.centerWrap}>
      <a href={WISTIA} target="_blank" rel="noreferrer" className="v4" style={S.playBtn}>
        <span style={S.playCircle} aria-hidden>
          <svg viewBox="0 0 12 12" width="9" height="9" fill="currentColor"><path d="M2 1v10l9-5z" /></svg>
        </span>
        See even more work
      </a>
      <style>{`.v4:hover{border-color:${TEAL};color:${TEAL}}.v4:hover span:first-child{border-color:${TEAL};color:${TEAL}}`}</style>
    </div>
  );
}

/* ---- 5. Promoted into the footer row (peer of See pricing) ---- */
function V5FooterRow() {
  return (
    <div style={S.footerPeerRow}>
      <span style={S.scrollHint}>Scroll to explore →</span>
      <div style={S.peerButtons}>
        <a href={WISTIA} target="_blank" rel="noreferrer" className="v5" style={S.peerGhost}>
          See even more work <span aria-hidden>→</span>
        </a>
        <a href="#" style={S.portfolioBtn}>
          See pricing <span aria-hidden>→</span>
        </a>
      </div>
      <style>{`.v5:hover{background:rgba(40,223,232,0.12);border-color:${TEAL};color:${TEAL}}`}</style>
    </div>
  );
}

export default function Page() {
  return (
    <main style={{ background: "#07021F" }}>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview · ScrubReel CTA</p>
        <h1 style={S.pageTitle}>
          &ldquo;See even more work&rdquo; · <em style={{ color: TEAL, fontStyle: "italic" }}>5 prominence levels</em>
        </h1>
        <p style={S.pageLede}>
          Current = muted white text below the footer. These push it up a notch
          without overpowering the primary &ldquo;See pricing&rdquo; CTA. Ordered
          from subtle-bump to co-equal.
        </p>
      </header>

      <Shell label="OPTION 1" variant="Teal ghost pill (bordered, reads as a button)">
        <V1GhostPill />
      </Shell>
      <Shell label="OPTION 2" variant="Bright white + standing teal underline">
        <V2BrightUnderline />
      </Shell>
      <Shell label="OPTION 3" variant="Soft teal-filled secondary button">
        <V3TealFilled />
      </Shell>
      <Shell label="OPTION 4" variant="Play icon + outlined button (video-native)">
        <V4PlayIcon />
      </Shell>
      <Shell label="OPTION 5" variant="Promoted into footer row (peer of See pricing)" footerRow={<V5FooterRow />} />
    </main>
  );
}

const S = {
  pageHead: { padding: "48px 32px 40px", textAlign: "center" as const, background: NIGHT, color: "#fff", fontFamily: "var(--a2-sans, system-ui)", borderBottom: "1px solid rgba(255,255,255,0.08)" } as React.CSSProperties,
  pageEyebrow: { fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: LILAC, fontWeight: 800, margin: 0 } as React.CSSProperties,
  pageTitle: { fontSize: 30, fontWeight: 800, margin: "10px 0 12px", letterSpacing: "-0.02em" } as React.CSSProperties,
  pageLede: { fontSize: 14, color: "rgba(255,255,255,0.72)", margin: "0 auto", maxWidth: 680, lineHeight: 1.55 } as React.CSSProperties,

  section: { background: NIGHT, color: "#fff", padding: "48px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--a2-sans, system-ui)" } as React.CSSProperties,
  inner: { maxWidth: 1080, margin: "0 auto" } as React.CSSProperties,
  headRow: { display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" as const } as React.CSSProperties,
  mockLabel: { display: "inline-block", padding: "5px 12px", background: "rgba(102,247,142,0.12)", border: `1px solid ${NEON}55`, borderRadius: 999, fontSize: 10.5, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: NEON } as React.CSSProperties,
  variantChip: { display: "inline-block", padding: "5px 12px", background: "rgba(40,223,232,0.14)", border: `1px solid ${TEAL}55`, borderRadius: 999, fontSize: 11.5, fontWeight: 700, color: "#fff" } as React.CSSProperties,
  bottomArea: { background: "rgba(0,0,0,0.22)", borderRadius: 14, padding: "26px 40px 34px", border: "1px dashed rgba(255,255,255,0.08)" } as React.CSSProperties,

  progressTrack: { height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" as const, margin: "0 0 22px" } as React.CSSProperties,
  progressBar: { height: "100%", width: "78%", background: `linear-gradient(90deg, ${PURPLE}, ${LILAC})`, borderRadius: 999 } as React.CSSProperties,

  footer: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" as const } as React.CSSProperties,
  scrollHint: { fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)" } as React.CSSProperties,
  portfolioBtn: { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", background: PURPLE, color: "#fff", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: `0 8px 24px rgba(90,51,255,0.4)` } as React.CSSProperties,

  centerWrap: { textAlign: "center" as const, marginTop: 26 } as React.CSSProperties,

  ghostPill: { display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 24px", fontSize: 13.5, fontWeight: 600, letterSpacing: "0.02em", color: "rgba(255,255,255,0.9)", border: `1px solid rgba(40,223,232,0.45)`, borderRadius: 999, textDecoration: "none", background: "transparent", transition: "all 200ms" } as React.CSSProperties,
  brightLink: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 700, letterSpacing: "0.01em", color: "#fff", textDecoration: "none", transition: "color 200ms" } as React.CSSProperties,
  tealFilled: { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", fontSize: 14, fontWeight: 700, color: TEAL, background: "rgba(40,223,232,0.12)", border: `1px solid ${TEAL}66`, borderRadius: 999, textDecoration: "none", transition: "all 200ms" } as React.CSSProperties,
  playBtn: { display: "inline-flex", alignItems: "center", gap: 10, padding: "11px 24px", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: 999, textDecoration: "none", transition: "all 200ms" } as React.CSSProperties,
  playCircle: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 999, border: "1px solid rgba(255,255,255,0.4)", color: "rgba(255,255,255,0.92)", paddingLeft: 2, transition: "all 200ms" } as React.CSSProperties,

  footerPeerRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" as const } as React.CSSProperties,
  peerButtons: { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" as const } as React.CSSProperties,
  peerGhost: { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.9)", border: `1px solid rgba(40,223,232,0.45)`, borderRadius: 999, textDecoration: "none", background: "transparent", transition: "all 200ms" } as React.CSSProperties,
};
