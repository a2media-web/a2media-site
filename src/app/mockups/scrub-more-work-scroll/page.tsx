"use client";

/* Scroll-triggered "See even more work" CTA — 5 variants that appear only
   after the reel's bottom footer enters the viewport, and fade back out
   when you scroll away from it.

   Each section has enough vertical space above + below the reveal zone
   so you can actually scroll toward it and away to test the animation. */

import React, { useEffect, useRef, useState } from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";

const WISTIA_URL = "https://fast.wistia.com/embed/channel/fj6gynv9qi";

// Hook: track whether an element is intersecting the viewport
function useInView<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

// Fake footer that mirrors the real ScrubReel's bottom edge
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

/* ---------- Reveal wrapper: uses IntersectionObserver on the trigger zone ---------- */

function RevealZone({
  children,
}: {
  children: (visible: boolean) => React.ReactNode;
}) {
  const [ref, visible] = useInView<HTMLDivElement>(0.6);
  return <div ref={ref}>{children(visible)}</div>;
}

/* ---------- 5 variants (each returns the CTA styled + animated differently) ---------- */

function V1FadeUnder({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        marginTop: 24,
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 500ms ease",
      }}
    >
      <a href={WISTIA_URL} target="_blank" rel="noreferrer" style={S.textCta}>
        See even more work →
      </a>
    </div>
  );
}

function V2SlideUp({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        marginTop: 20,
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 500ms ease, transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1)",
      }}
    >
      <a href={WISTIA_URL} target="_blank" rel="noreferrer" style={S.textCta}>
        See even more work →
      </a>
    </div>
  );
}

function V3GhostPillReveal({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        marginTop: 22,
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)",
        transition:
          "opacity 550ms ease, transform 550ms cubic-bezier(0.2, 0.7, 0.2, 1.05)",
      }}
    >
      <a href={WISTIA_URL} target="_blank" rel="noreferrer" style={S.ghostPill}>
        See even more work
      </a>
    </div>
  );
}

function V4DividerReveal({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        marginTop: 30,
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity: visible ? 1 : 0,
        transition: "opacity 600ms ease",
      }}
    >
      <span
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.14))`,
          transformOrigin: "right",
          transform: visible ? "scaleX(1)" : "scaleX(0.3)",
          transition: "transform 700ms ease 100ms",
        }}
      />
      <a href={WISTIA_URL} target="_blank" rel="noreferrer" style={S.dividerText}>
        See even more work →
      </a>
      <span
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, rgba(255,255,255,0.14), transparent)`,
          transformOrigin: "left",
          transform: visible ? "scaleX(1)" : "scaleX(0.3)",
          transition: "transform 700ms ease 100ms",
        }}
      />
    </div>
  );
}

function V5StickyBottom({ visible }: { visible: boolean }) {
  /* Sticky floating banner. Appears fixed at bottom-right of viewport
     when the reel is in view. Disappears when it scrolls out. */
  return (
    <div
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 40,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 400ms ease, transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <a
        href={WISTIA_URL}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 18px",
          background: NIGHT,
          border: `1px solid ${TEAL}`,
          borderRadius: 999,
          color: TEAL,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.04em",
          textDecoration: "none",
          boxShadow: `0 12px 30px rgba(0,0,0,0.4), 0 0 24px rgba(40,223,232,0.25)`,
          fontFamily: "var(--a2-sans, system-ui)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 1v10l9-5z" /></svg>
        See even more work
      </a>
    </div>
  );
}

/* ---------- Shell that gives each variant scroll room ---------- */

function ScrollShell({
  label,
  variant,
  render,
}: {
  label: string;
  variant: string;
  render: (visible: boolean) => React.ReactNode;
}) {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <div style={S.headRow}>
          <span style={S.mockLabel}>{label}</span>
          <span style={S.variantChip}>{variant}</span>
        </div>
        <p style={S.contextNote}>
          ↓ Scroll DOWN to reach the reveal zone. Then scroll UP and away — watch it disappear.
        </p>
        <div style={S.spacerTall}>
          <p style={S.spacerText}>(imagine the video reel content here)</p>
        </div>

        <RevealZone>
          {(visible) => (
            <div style={S.bottomArea}>
              <FakeFooter />
              {render(visible)}
            </div>
          )}
        </RevealZone>

        <div style={S.spacerShort}>
          <p style={S.spacerText}>(next section would begin here)</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default function Page() {
  return (
    <main style={{ background: "#07021F" }}>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview · scroll-triggered</p>
        <h1 style={S.pageTitle}>
          &ldquo;See even more work&rdquo; · <em style={{ color: TEAL }}>5 scroll-reveal variants</em>
        </h1>
        <p style={S.pageLede}>
          Each variant only appears once you scroll the reveal zone into view.
          Scroll back up and away to see it disappear. All link to Wistia.
        </p>
      </header>

      <ScrollShell label="OPTION 1" variant="Simple fade under See pricing" render={(v) => <V1FadeUnder visible={v} />} />
      <ScrollShell label="OPTION 2" variant="Slide-up + fade" render={(v) => <V2SlideUp visible={v} />} />
      <ScrollShell label="OPTION 3" variant="Ghost pill with scale + fade" render={(v) => <V3GhostPillReveal visible={v} />} />
      <ScrollShell label="OPTION 4" variant="Divider draws in from both sides" render={(v) => <V4DividerReveal visible={v} />} />
      <ScrollShell label="OPTION 5" variant="Sticky bottom-right banner (fires while reel in view)" render={(v) => <V5StickyBottom visible={v} />} />

      <footer style={{ ...S.section, borderBottom: "none", padding: "80px 32px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
        End of mockups. Scroll back up to compare.
      </footer>
    </main>
  );
}

/* ---------- styles ---------- */

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
    padding: "48px 32px",
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
    marginBottom: 12,
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
    color: "rgba(255,255,255,0.5)",
    fontStyle: "italic" as const,
    margin: "0 0 24px",
  } as React.CSSProperties,

  spacerTall: {
    height: 400,
    background: "linear-gradient(180deg, rgba(90,51,255,0.1), rgba(0,0,0,0))",
    border: "1px dashed rgba(255,255,255,0.08)",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  } as React.CSSProperties,
  spacerShort: {
    height: 320,
    marginTop: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "1px dashed rgba(255,255,255,0.06)",
  } as React.CSSProperties,
  spacerText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
    fontStyle: "italic" as const,
  } as React.CSSProperties,

  bottomArea: {
    background: "rgba(0,0,0,0.25)",
    borderRadius: 14,
    padding: "22px 28px 28px",
    border: "1px solid rgba(40,223,232,0.28)",
    boxShadow: "0 0 0 3px rgba(40,223,232,0.05)",
  } as React.CSSProperties,

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

  textCta: {
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    letterSpacing: "0.04em",
    textDecoration: "none",
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,
  ghostPill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "9px 20px",
    fontSize: 12.5,
    fontWeight: 600,
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(40,223,232,0.35)",
    borderRadius: 999,
    textDecoration: "none",
    background: "transparent",
    fontFamily: "var(--a2-sans, system-ui)",
  } as React.CSSProperties,
  dividerText: {
    fontSize: 12,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    fontFamily: "var(--a2-sans, system-ui)",
    fontWeight: 700,
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,
};
