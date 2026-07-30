"use client";

/* ScrubReel "See even more work" CTA — 5 understated style options.
   Each rendered below the existing footer (Scroll hint + See pricing button)
   so you can see how it sits alongside without competing.

   Target: /mockups/scrub-more-work
   Links to: https://fast.wistia.com/embed/channel/fj6gynv9qi */

import React from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";

const WISTIA_URL = "https://fast.wistia.com/embed/channel/fj6gynv9qi";

// Fake footer that mirrors ScrubReel's real bottom area for context
function FakeFooter() {
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
  children,
}: {
  label: string;
  variant: string;
  children: React.ReactNode;
}) {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <div style={S.headRow}>
          <span style={S.mockLabel}>{label}</span>
          <span style={S.variantChip}>{variant}</span>
        </div>
        <p style={S.contextNote}>
          ↓ imagine the video reel scrolled through, and here&apos;s the
          section&apos;s bottom edge:
        </p>
        <div style={S.bottomArea}>
          <FakeFooter />
          {children}
        </div>
      </div>
    </section>
  );
}

// ---------- 5 CTA variants ----------

function V1TextLink() {
  return (
    <div style={{ textAlign: "center", marginTop: 32 }}>
      <a href={WISTIA_URL} target="_blank" rel="noreferrer" className="cta-textlink" style={S.textLink}>
        See even more work <span style={{ marginLeft: 4 }}>→</span>
      </a>
      <style dangerouslySetInnerHTML={{ __html: `
        .cta-textlink { transition: color 200ms, opacity 200ms; }
        .cta-textlink:hover { color: ${TEAL}; opacity: 1; text-decoration: underline; text-underline-offset: 4px; }
      ` }} />
    </div>
  );
}

function V2GhostPill() {
  return (
    <div style={{ textAlign: "center", marginTop: 28 }}>
      <a href={WISTIA_URL} target="_blank" rel="noreferrer" className="cta-ghost" style={S.ghostPill}>
        See even more work
      </a>
      <style dangerouslySetInnerHTML={{ __html: `
        .cta-ghost { transition: background 200ms, border-color 200ms, color 200ms; }
        .cta-ghost:hover { background: rgba(40,223,232,0.1); border-color: ${TEAL}; color: ${TEAL}; }
      ` }} />
    </div>
  );
}

function V3DividerText() {
  return (
    <div style={S.dividerWrap}>
      <span style={S.dividerLine} />
      <a href={WISTIA_URL} target="_blank" rel="noreferrer" className="cta-divider" style={S.dividerText}>
        See even more work →
      </a>
      <span style={S.dividerLine} />
      <style dangerouslySetInnerHTML={{ __html: `
        .cta-divider { transition: color 200ms; }
        .cta-divider:hover { color: ${TEAL}; }
      ` }} />
    </div>
  );
}

function V4PlayIcon() {
  return (
    <div style={{ textAlign: "center", marginTop: 32 }}>
      <a href={WISTIA_URL} target="_blank" rel="noreferrer" className="cta-play" style={S.playLink}>
        <span style={S.playIcon} aria-hidden>
          <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor">
            <path d="M2 1v10l9-5z" />
          </svg>
        </span>
        See even more work
      </a>
      <style dangerouslySetInnerHTML={{ __html: `
        .cta-play { transition: color 200ms; }
        .cta-play:hover { color: ${TEAL}; }
        .cta-play:hover span:first-child { border-color: ${TEAL}; color: ${TEAL}; }
      ` }} />
    </div>
  );
}

function V5ExternalIcon() {
  return (
    <div style={{ textAlign: "center", marginTop: 32 }}>
      <a href={WISTIA_URL} target="_blank" rel="noreferrer" className="cta-ext" style={S.extLink}>
        See even more work on Wistia
        <svg viewBox="0 0 12 12" width="11" height="11" style={{ marginLeft: 6, verticalAlign: "-1px" }} fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 2h6v6M10 2L3 9" strokeLinecap="round" />
        </svg>
      </a>
      <style dangerouslySetInnerHTML={{ __html: `
        .cta-ext { transition: color 200ms, opacity 200ms; }
        .cta-ext:hover { color: ${TEAL}; opacity: 1; }
      ` }} />
    </div>
  );
}

// ---------- Page ----------

export default function Page() {
  return (
    <main style={{ background: "#07021F" }}>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview</p>
        <h1 style={S.pageTitle}>
          ScrubReel bottom CTA · <em style={{ color: TEAL }}>5 understated options</em>
        </h1>
        <p style={S.pageLede}>
          Each variant sits below the existing progress bar + &quot;See pricing&quot; button.
          All link to your Wistia channel. Sorted from most-hidden to most-visible.
        </p>
      </header>

      <Shell label="OPTION 1" variant="Text link, muted (most hidden)">
        <V1TextLink />
      </Shell>

      <Shell label="OPTION 2" variant="Ghost pill, thin border">
        <V2GhostPill />
      </Shell>

      <Shell label="OPTION 3" variant="Divider with inline text">
        <V3DividerText />
      </Shell>

      <Shell label="OPTION 4" variant="Play icon + text (video-native)">
        <V4PlayIcon />
      </Shell>

      <Shell label="OPTION 5" variant="External-link icon + specific ('on Wistia')">
        <V5ExternalIcon />
      </Shell>
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
    background: NIGHT,
    color: "#fff",
    padding: "60px 32px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,
  inner: {
    maxWidth: 1080,
    margin: "0 auto",
  } as React.CSSProperties,
  headRow: {
    display: "flex",
    gap: 12,
    marginBottom: 20,
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
    color: "#fff",
  } as React.CSSProperties,
  contextNote: {
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
    fontStyle: "italic" as const,
    margin: "0 0 12px",
  } as React.CSSProperties,
  bottomArea: {
    background: "rgba(0,0,0,0.2)",
    borderRadius: 14,
    padding: "22px 28px 32px",
    border: "1px dashed rgba(255,255,255,0.08)",
  } as React.CSSProperties,

  // fake progress bar
  progressTrack: {
    height: 3,
    background: "rgba(255,255,255,0.08)",
    borderRadius: 999,
    overflow: "hidden" as const,
    margin: "0 0 22px",
  } as React.CSSProperties,
  progressBar: {
    height: "100%",
    width: "72%",
    background: `linear-gradient(90deg, ${PURPLE}, ${LILAC})`,
    borderRadius: 999,
  } as React.CSSProperties,

  // fake existing footer
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  scrollHint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "0.04em",
  } as React.CSSProperties,
  portfolioBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 20px",
    background: `linear-gradient(135deg, ${PURPLE}, ${LILAC})`,
    color: "#fff",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.02em",
    textDecoration: "none",
  } as React.CSSProperties,

  // Variant 1 — text link
  textLink: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    letterSpacing: "0.04em",
    textDecoration: "none",
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,

  // Variant 2 — ghost pill
  ghostPill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "9px 20px",
    fontSize: 12.5,
    fontWeight: 600,
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 999,
    textDecoration: "none",
    background: "transparent",
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,

  // Variant 3 — divider text
  dividerWrap: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginTop: 36,
  } as React.CSSProperties,
  dividerLine: {
    flex: 1,
    height: 1,
    background: "rgba(255,255,255,0.12)",
  } as React.CSSProperties,
  dividerText: {
    fontSize: 12,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.55)",
    textDecoration: "none",
    fontFamily: "var(--a2-sans, system-ui)",
    fontWeight: 700,
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,

  // Variant 4 — play icon
  playLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    fontFamily: "var(--a2-sans, system-ui)",
    fontWeight: 500,
    letterSpacing: "0.02em",
  } as React.CSSProperties,
  playIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.3)",
    color: "rgba(255,255,255,0.7)",
    paddingLeft: 2,
    transition: "border-color 200ms, color 200ms",
  } as React.CSSProperties,

  // Variant 5 — external link icon
  extLink: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    fontFamily: "var(--a2-sans, system-ui)",
    fontWeight: 500,
    letterSpacing: "0.02em",
  } as React.CSSProperties,
};
