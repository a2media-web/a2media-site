"use client";

/* Mockup: /mockups/fable-popups
   "Five ways the popup can show up" — Kit email-capture popup patterns.

   Five categorically different popup patterns for the 30%-scroll Kit
   opt-in on the homepage. Each demo runs inside its own scrollable
   region with an IntersectionObserver on a sentinel parked at the 30%
   mark, so every variant fires independently as you scroll its fake
   page. Forms are visual mockups only — no Kit wiring. */

import React, { useEffect, useRef, useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Shared demo plumbing                                               */
/* ------------------------------------------------------------------ */

function usePopupDemo(autoRunDelay: number) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const dismissedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  /* IntersectionObserver scoped to this demo's scroll container. */
  useEffect(() => {
    const scroller = scrollerRef.current;
    const sentinel = sentinelRef.current;
    if (!scroller || !sentinel) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (!dismissedRef.current) setOpen(true);
          } else {
            /* Scrolled away from the 30% mark — re-arm the trigger. */
            dismissedRef.current = false;
          }
        }
      },
      { root: scroller, threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  /* Self-running: after a short stagger, scroll the demo to its 30%
     sentinel so the observer fires naturally — screenshot-ready. */
  useEffect(() => {
    const t1 = setTimeout(() => {
      const scroller = scrollerRef.current;
      const sentinel = sentinelRef.current;
      if (scroller && sentinel) {
        scroller.scrollTo({
          top: sentinel.offsetTop - scroller.clientHeight * 0.55,
          behavior: "smooth",
        });
      }
    }, autoRunDelay);
    /* Safety net so the popup is open for static capture regardless. */
    const t2 = setTimeout(() => {
      if (!dismissedRef.current) setOpen(true);
    }, autoRunDelay + 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [autoRunDelay]);

  const close = useCallback(() => {
    dismissedRef.current = true;
    setOpen(false);
  }, []);

  const retrigger = useCallback(() => {
    dismissedRef.current = false;
    setSent(false);
    setOpen(true);
  }, []);

  const submit = useCallback((ev: React.FormEvent) => {
    ev.preventDefault();
    setSent(true);
  }, []);

  return { scrollerRef, sentinelRef, open, sent, close, retrigger, submit };
}

/* Deterministic fake-homepage content scrolling behind each popup. */
const BAR_WIDTHS = [72, 48, 88, 64, 80, 56, 92, 44, 76, 60, 84, 52];

function FakeContent({ seed }: { seed: number }) {
  return (
    <div style={S.fakeWrap} aria-hidden>
      {/* fake nav */}
      <div style={S.fakeNav}>
        <div style={{ ...S.fakeLogo }} />
        <div style={{ display: "flex", gap: 14 }}>
          <div style={{ ...S.fakeNavLink, width: 42 }} />
          <div style={{ ...S.fakeNavLink, width: 56 }} />
          <div style={{ ...S.fakeNavLink, width: 48 }} />
        </div>
      </div>
      {/* fake hero */}
      <div style={{ padding: "34px 26px 10px" }}>
        <div style={{ ...S.fakeH1, width: "78%" }} />
        <div style={{ ...S.fakeH1, width: "52%", marginTop: 12 }} />
        <div style={{ ...S.fakeP, width: "64%", marginTop: 20 }} />
        <div style={{ ...S.fakeBtn, marginTop: 24 }} />
      </div>
      {/* fake sections */}
      {[0, 1, 2].map((s) => (
        <div key={s} style={{ padding: "30px 26px 6px" }}>
          <div style={{ ...S.fakeH2, width: `${44 + ((seed + s) % 3) * 12}%` }} />
          {[0, 1, 2, 3].map((r) => (
            <div
              key={r}
              style={{
                ...S.fakeP,
                width: `${BAR_WIDTHS[(seed * 3 + s * 4 + r) % BAR_WIDTHS.length]}%`,
                marginTop: 12,
              }}
            />
          ))}
          <div style={S.fakeCardRow}>
            <div style={S.fakeCard} />
            <div style={S.fakeCard} />
            <div style={S.fakeCard} />
          </div>
        </div>
      ))}
      <div style={{ height: 80 }} />
    </div>
  );
}

/* Shared email form. */
function EmailForm({
  cta,
  sent,
  onSubmit,
  row,
  neon,
}: {
  cta: string;
  sent: boolean;
  onSubmit: (ev: React.FormEvent) => void;
  row?: boolean;
  neon?: boolean;
}) {
  if (sent) {
    return (
      <div style={S.sentNote}>
        <span style={S.sentDot} />
        Thanks, check your inbox.
      </div>
    );
  }
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: row ? "row" : "column",
        gap: 10,
        width: "100%",
      }}
    >
      <input
        type="email"
        required
        placeholder="you@company.com"
        className="fp-input"
        style={row ? { flex: 1, minWidth: 0 } : undefined}
        aria-label="Email address"
      />
      <button type="submit" className={neon ? "fp-btn fp-btn-neon" : "fp-btn"}>
        {cta}
      </button>
    </form>
  );
}

function CloseX({ onClick, light }: { onClick: () => void; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fp-close"
      aria-label="Close"
      style={light ? { color: "rgba(255,255,255,0.85)" } : undefined}
    >
      ✕
    </button>
  );
}

/* Demo shell: tall viewport + scroller + fake page + 30% sentinel. */
function DemoShell({
  demo,
  seed,
  children,
}: {
  demo: ReturnType<typeof usePopupDemo>;
  seed: number;
  children: React.ReactNode;
}) {
  return (
    <div style={S.viewport}>
      <div ref={demo.scrollerRef} className="fp-scroller" style={S.scroller}>
        <div style={{ position: "relative", height: 1620 }}>
          <FakeContent seed={seed} />
          {/* sentinel parked at the 30% mark of the fake page */}
          <div
            ref={demo.sentinelRef}
            style={{ position: "absolute", top: "30%", left: 0, width: 1, height: 1 }}
          />
        </div>
      </div>
      {children}
      <div style={S.viewportLabel}>scroll me — fires at 30%</div>
    </div>
  );
}

function Retrigger({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="fp-retrigger">
      ↻ Re-trigger demo
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Variant 01 · The Full Stop — center modal, dimmed overlay          */
/* ------------------------------------------------------------------ */

function ModalDemo() {
  const demo = usePopupDemo(700);
  return (
    <>
      <DemoShell demo={demo} seed={1}>
        {demo.open && (
          <div className="fp-overlay" style={S.overlay}>
            <div className="fp-modal" style={S.modal}>
              <div style={S.modalGlow} aria-hidden />
              <CloseX onClick={demo.close} light />
              <span style={S.eyebrow}>Free template</span>
              <h3 style={S.popH}>
                The 6-month video roadmap{" "}
                <em style={S.italic}>we send our clients.</em>
              </h3>
              <p style={S.popP}>
                Quarter by quarter, video by video, mapped to pipeline. Steal
                the exact doc. No call required.
              </p>
              <EmailForm cta="Send me the roadmap" sent={demo.sent} onSubmit={demo.submit} />
              <button type="button" className="fp-nolink" onClick={demo.close}>
                No thanks, I&rsquo;ll plan it myself
              </button>
            </div>
          </div>
        )}
      </DemoShell>
      <Retrigger onClick={demo.retrigger} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Variant 02 · The Cinema Curtain — slides up from the bottom edge   */
/* ------------------------------------------------------------------ */

function CurtainDemo() {
  const demo = usePopupDemo(950);
  return (
    <>
      <DemoShell demo={demo} seed={2}>
        {demo.open && (
          <div className="fp-curtain" style={S.curtain}>
            <div style={S.curtainEdge} aria-hidden />
            <CloseX onClick={demo.close} light />
            <div style={S.curtainInner}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={S.eyebrow}>Video walk-through</span>
                <h3 style={{ ...S.popH, fontSize: 24 }}>
                  Watch the first 90 seconds{" "}
                  <em style={S.italic}>we cut for our $20M ARR clients.</em>
                </h3>
                <p style={S.popP}>
                  The opening minute decides whether anyone stays. We&rsquo;ll
                  show you the cut, beat by beat.
                </p>
                <EmailForm cta="Send me the cut" sent={demo.sent} onSubmit={demo.submit} row neon />
              </div>
              <div style={S.curtainStill} aria-hidden>
                <div style={S.playBtn}>
                  <div style={S.playTri} />
                </div>
                <div style={S.timecode}>00:00:00 → 00:01:30</div>
              </div>
            </div>
          </div>
        )}
      </DemoShell>
      <Retrigger onClick={demo.retrigger} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Variant 03 · The Side Door — full-height drawer from the right     */
/* ------------------------------------------------------------------ */

function DrawerDemo() {
  const demo = usePopupDemo(1200);
  return (
    <>
      <DemoShell demo={demo} seed={3}>
        {demo.open && (
          <div className="fp-drawer" style={S.drawer}>
            <CloseX onClick={demo.close} light />
            <span style={S.eyebrow}>Case study</span>
            <h3 style={{ ...S.popH, fontSize: 23 }}>
              How Reveal closed <span style={S.neonText}>$600K</span>{" "}
              <em style={S.italic}>with one video series.</em>
            </h3>
            <p style={S.popP}>
              The full breakdown: the series structure, the distribution
              plan, and the numbers behind every video.
            </p>
            <ul style={S.drawerList}>
              <li className="fp-li" style={S.drawerLi}>The 5-video series map</li>
              <li className="fp-li" style={S.drawerLi}>Where each video went, and why</li>
              <li className="fp-li" style={S.drawerLi}>Pipeline attribution, video by video</li>
            </ul>
            <EmailForm cta="Send the breakdown" sent={demo.sent} onSubmit={demo.submit} />
            <button type="button" className="fp-nolink" onClick={demo.close}>
              Maybe later
            </button>
          </div>
        )}
      </DemoShell>
      <Retrigger onClick={demo.retrigger} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Variant 04 · The Headline Bar — sticky banner slides down          */
/* ------------------------------------------------------------------ */

function BannerDemo() {
  const demo = usePopupDemo(1450);
  return (
    <>
      <DemoShell demo={demo} seed={4}>
        {demo.open && (
          <div className="fp-banner" style={S.banner}>
            <div style={S.bannerAccent} aria-hidden />
            <div style={S.bannerText}>
              <strong style={{ color: "#FFFFFF", fontWeight: 700 }}>
                The 30-question rubric we score every script against.
              </strong>{" "}
              <span style={{ color: "rgba(255,255,255,0.62)" }}>
                Free checklist. Run it on your next video.
              </span>
            </div>
            <div style={{ flexShrink: 0, width: 320 }}>
              <EmailForm cta="Get the rubric" sent={demo.sent} onSubmit={demo.submit} row />
            </div>
            <CloseX onClick={demo.close} light />
          </div>
        )}
      </DemoShell>
      <Retrigger onClick={demo.retrigger} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Variant 05 · The Quiet Knock — toast bubble expands on click       */
/* ------------------------------------------------------------------ */

function KnockDemo() {
  const demo = usePopupDemo(1700);
  const [expanded, setExpanded] = useState(false);

  /* Auto-expand once open so the mid-state is screenshot-ready. */
  useEffect(() => {
    if (!demo.open) {
      setExpanded(false);
      return;
    }
    const t = setTimeout(() => setExpanded(true), 900);
    return () => clearTimeout(t);
  }, [demo.open]);

  return (
    <>
      <DemoShell demo={demo} seed={5}>
        {demo.open && !expanded && (
          <button
            type="button"
            className="fp-knock"
            style={S.knockBubble}
            onClick={() => setExpanded(true)}
          >
            <span style={S.knockDot} aria-hidden />
            Got 60 seconds?
          </button>
        )}
        {demo.open && expanded && (
          <div className="fp-knock-card" style={S.knockCard}>
            <CloseX onClick={demo.close} light />
            <span style={S.eyebrow}>Swipe file</span>
            <h3 style={{ ...S.popH, fontSize: 20 }}>
              The hook teardown{" "}
              <em style={S.italic}>we run on our clients&rsquo; top videos.</em>
            </h3>
            <p style={{ ...S.popP, marginBottom: 14 }}>
              12 hooks, line by line. What earned the click, what kept the
              watch.
            </p>
            <EmailForm cta="Send the teardown" sent={demo.sent} onSubmit={demo.submit} />
          </div>
        )}
      </DemoShell>
      <Retrigger onClick={demo.retrigger} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Variant metadata                                                   */
/* ------------------------------------------------------------------ */

const VARIANTS: {
  tag: string;
  title: string;
  blurb: string;
  Demo: React.ComponentType;
}[] = [
  {
    tag: "Variant 01 · Center Modal",
    title: "The Full Stop",
    blurb:
      "Dimmed overlay, one card, one decision. Highest capture rate of the five and the most interruption. Earns its keep when the offer is heavy enough to justify stopping someone mid-read, and the 6-month roadmap is exactly that weight.",
    Demo: ModalDemo,
  },
  {
    tag: "Variant 02 · Bottom Curtain",
    title: "The Cinema Curtain",
    blurb:
      "A letterbox panel rises from the bottom edge like a credits roll. It reads as video, which is the whole brand, and it leaves the top half of the page visible so it never feels like a hijack. Trade-off: it eats the lower viewport on small screens.",
    Demo: CurtainDemo,
  },
  {
    tag: "Variant 03 · Side Drawer",
    title: "The Side Door",
    blurb:
      "A full-height panel slides in from the right with room for real proof: the Reveal case study with a bullet list of what is inside. Best when the magnet needs selling, not just naming. The page stays readable, so intent stays warm.",
    Demo: DrawerDemo,
  },
  {
    tag: "Variant 04 · Sticky Top Banner",
    title: "The Headline Bar",
    blurb:
      "One line, one field, always in view once it fires. Zero content blocked, so it matches the no-pressure positioning best of any persistent pattern. The trade-off is attention: it converts on repeat exposure, not on impact.",
    Demo: BannerDemo,
  },
  {
    tag: "Variant 05 · Two-Stage Toast",
    title: "The Quiet Knock",
    blurb:
      "A small chat bubble asks for sixty seconds, then expands into a card on click. Two-stage consent: the visitor opts in to even seeing the form. Lowest volume, highest quality of the five, and the most on-brand for a team that hates being sold to.",
    Demo: KnockDemo,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FablePopupsMockup() {
  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ---- Frame header -------------------------------------------- */}
      <header style={S.frameHeader}>
        <span style={S.frameTag}>Fable · Kit email-capture popup concepts</span>
        <h1 style={S.frameTitle}>Five ways the popup can show up</h1>
        <p style={S.frameNotes}>
          Same trigger, five different manners. Every pattern below fires when
          the visitor scrolls 30% down the page, but each one asks for
          attention at a different volume. They run loudest to quietest: the
          Full Stop interrupts, the Cinema Curtain performs, the Side Door
          sells, the Headline Bar persists, and the Quiet Knock just raises a
          hand. Each demo is a live miniature: scroll the fake homepage inside
          the frame and the popup fires on its own observer, close it, scroll
          away and back, and it fires again.
        </p>
      </header>

      {/* ---- Variant cards ------------------------------------------- */}
      <div style={S.cardStack}>
        {VARIANTS.map((v, i) => (
          <section key={v.tag} style={S.card}>
            <div style={S.cardHead}>
              <span style={S.cardTag}>{v.tag}</span>
              <span style={S.intrusion}>
                {"●".repeat(5 - i)}
                {"○".repeat(i)}
                <span style={S.intrusionLabel}> intrusion</span>
              </span>
            </div>
            <h2 style={S.cardTitle}>{v.title}</h2>
            <p style={S.cardBlurb}>{v.blurb}</p>
            <v.Demo />
          </section>
        ))}
      </div>

      <footer style={S.footer}>
        Forms are visual mockups only. Kit wiring comes after a pattern is
        picked.
      </footer>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0D0536",
    fontFamily: "var(--a2-sans)",
    color: "#FFFFFF",
    padding: "64px 24px 80px",
  },

  /* frame */
  frameHeader: { maxWidth: 880, margin: "0 auto 56px" },
  frameTag: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "#28DFE8",
    border: "1px solid rgba(40,223,232,0.35)",
    borderRadius: 999,
    padding: "6px 14px",
    marginBottom: 18,
  },
  frameTitle: {
    fontSize: 44,
    fontWeight: 900,
    lineHeight: 1.08,
    margin: "0 0 16px",
    color: "#FFFFFF",
  },
  frameNotes: {
    fontSize: 16,
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.72)",
    margin: 0,
    maxWidth: 760,
  },

  /* card stack */
  cardStack: {
    maxWidth: 880,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    gap: 56,
  },
  card: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(90,51,255,0.25)",
    borderRadius: 22,
    padding: "30px 30px 26px",
    boxShadow: "0 0 80px rgba(90,51,255,0.10)",
  },
  cardHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    flexWrap: "wrap" as const,
    gap: 10,
  },
  cardTag: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.13em",
    textTransform: "uppercase" as const,
    color: "#8F45EE",
  },
  intrusion: {
    fontSize: 12,
    color: "#5A33FF",
    letterSpacing: 3,
  },
  intrusionLabel: {
    color: "rgba(255,255,255,0.45)",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    fontSize: 10,
    fontWeight: 600,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 700,
    margin: "0 0 10px",
    color: "#FFFFFF",
  },
  cardBlurb: {
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.66)",
    margin: "0 0 22px",
    maxWidth: 700,
  },

  /* demo viewport */
  viewport: {
    position: "relative" as const,
    height: 520,
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "#0D0536",
    boxShadow: "inset 0 0 60px rgba(13,5,54,0.8)",
  },
  scroller: {
    position: "absolute" as const,
    inset: 0,
    overflowY: "auto" as const,
    overflowX: "hidden" as const,
  },
  viewportLabel: {
    position: "absolute" as const,
    top: 10,
    right: 12,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.35)",
    background: "rgba(13,5,54,0.7)",
    padding: "4px 8px",
    borderRadius: 6,
    pointerEvents: "none" as const,
    zIndex: 30,
  },

  /* fake content */
  fakeWrap: { position: "absolute" as const, inset: 0 },
  fakeNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 26px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  fakeLogo: {
    width: 84,
    height: 18,
    borderRadius: 5,
    background: "linear-gradient(90deg, #5A33FF, #8F45EE)",
    opacity: 0.85,
  },
  fakeNavLink: { height: 9, borderRadius: 4, background: "rgba(255,255,255,0.16)" },
  fakeH1: { height: 26, borderRadius: 7, background: "rgba(90,51,255,0.55)" },
  fakeH2: { height: 16, borderRadius: 5, background: "rgba(143,69,238,0.45)" },
  fakeP: { height: 9, borderRadius: 4, background: "rgba(255,255,255,0.10)" },
  fakeBtn: {
    width: 132,
    height: 34,
    borderRadius: 10,
    background: "#5A33FF",
    opacity: 0.9,
  },
  fakeCardRow: { display: "flex", gap: 14, marginTop: 22 },
  fakeCard: {
    flex: 1,
    height: 92,
    borderRadius: 12,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.07)",
  },

  /* shared popup text */
  eyebrow: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: "#28DFE8",
    marginBottom: 10,
  },
  popH: {
    fontSize: 26,
    fontWeight: 700,
    lineHeight: 1.18,
    margin: "0 0 10px",
    color: "#FFFFFF",
  },
  italic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic" as const,
    fontWeight: 500,
    color: "#8F45EE",
  },
  popP: {
    fontSize: 14,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.70)",
    margin: "0 0 18px",
  },
  neonText: { color: "#66F78E" },
  sentNote: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    fontSize: 14,
    fontWeight: 600,
    color: "#66F78E",
    padding: "12px 0",
  },
  sentDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    background: "#66F78E",
    boxShadow: "0 0 10px rgba(102,247,142,0.8)",
  },

  /* variant 01 — modal */
  overlay: {
    position: "absolute" as const,
    inset: 0,
    background: "rgba(13,5,54,0.78)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    padding: 24,
  },
  modal: {
    position: "relative" as const,
    width: 420,
    maxWidth: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(90,51,255,0.5)",
    borderRadius: 20,
    padding: "30px 30px 24px",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(90,51,255,0.30)",
    overflow: "hidden",
  },
  modalGlow: {
    position: "absolute" as const,
    top: -70,
    right: -70,
    width: 200,
    height: 200,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(90,51,255,0.45), transparent 70%)",
    pointerEvents: "none" as const,
  },

  /* variant 02 — curtain */
  curtain: {
    position: "absolute" as const,
    left: 0,
    right: 0,
    bottom: 0,
    height: "58%",
    background: "rgba(13,5,54,0.92)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    zIndex: 20,
    boxShadow: "0 -24px 70px rgba(0,0,0,0.55)",
  },
  curtainEdge: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: "linear-gradient(90deg, #5A33FF, #8F45EE 55%, #66F78E)",
  },
  curtainInner: {
    display: "flex",
    gap: 26,
    alignItems: "center",
    height: "100%",
    padding: "26px 34px",
  },
  curtainStill: {
    flexShrink: 0,
    width: 190,
    height: 122,
    borderRadius: 14,
    background:
      "linear-gradient(135deg, rgba(90,51,255,0.35), rgba(13,5,54,0.9) 70%)",
    border: "1px solid rgba(143,69,238,0.5)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  playBtn: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#5A33FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 24px rgba(90,51,255,0.7)",
  },
  playTri: {
    width: 0,
    height: 0,
    borderTop: "8px solid transparent",
    borderBottom: "8px solid transparent",
    borderLeft: "13px solid #FFFFFF",
    marginLeft: 3,
  },
  timecode: {
    fontSize: 10,
    letterSpacing: "0.12em",
    color: "rgba(255,255,255,0.55)",
    fontWeight: 600,
  },

  /* variant 03 — drawer */
  drawer: {
    position: "absolute" as const,
    top: 0,
    right: 0,
    bottom: 0,
    width: 340,
    maxWidth: "82%",
    background: "rgba(13,5,54,0.94)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderLeft: "1px solid rgba(90,51,255,0.55)",
    boxShadow: "-30px 0 70px rgba(0,0,0,0.5)",
    zIndex: 20,
    padding: "34px 28px",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
  },
  drawerList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  },
  drawerLi: {
    fontSize: 13,
    color: "rgba(255,255,255,0.78)",
    paddingLeft: 18,
    position: "relative" as const,
    lineHeight: 1.45,
  },

  /* variant 04 — banner */
  banner: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    gap: 18,
    padding: "14px 44px 14px 22px",
    background: "rgba(13,5,54,0.95)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(90,51,255,0.5)",
    boxShadow: "0 14px 44px rgba(0,0,0,0.45)",
  },
  bannerAccent: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: "linear-gradient(90deg, #5A33FF, #8F45EE)",
  },
  bannerText: { flex: 1, fontSize: 13.5, lineHeight: 1.45, minWidth: 0 },

  /* variant 05 — quiet knock */
  knockBubble: {
    position: "absolute" as const,
    right: 18,
    bottom: 18,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    gap: 10,
    border: "1px solid rgba(90,51,255,0.6)",
    background: "rgba(13,5,54,0.92)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "#FFFFFF",
    fontFamily: "var(--a2-sans)",
    fontSize: 13.5,
    fontWeight: 600,
    borderRadius: 999,
    padding: "12px 20px",
    cursor: "pointer",
    boxShadow: "0 10px 36px rgba(0,0,0,0.5), 0 0 28px rgba(90,51,255,0.35)",
  },
  knockDot: {
    width: 9,
    height: 9,
    borderRadius: 99,
    background: "#66F78E",
    boxShadow: "0 0 10px rgba(102,247,142,0.9)",
    animation: "fpPulse 1.6s ease-in-out infinite",
  },
  knockCard: {
    position: "absolute" as const,
    right: 18,
    bottom: 18,
    zIndex: 20,
    width: 320,
    maxWidth: "86%",
    background: "rgba(13,5,54,0.94)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(90,51,255,0.55)",
    borderRadius: 18,
    padding: "24px 22px 20px",
    boxShadow: "0 18px 60px rgba(0,0,0,0.55), 0 0 40px rgba(90,51,255,0.30)",
  },

  footer: {
    maxWidth: 880,
    margin: "60px auto 0",
    fontSize: 12.5,
    color: "rgba(255,255,255,0.40)",
    textAlign: "center" as const,
  },
};

const css = `
  /* scrollbars inside the demo frames */
  .fp-scroller::-webkit-scrollbar { width: 8px; }
  .fp-scroller::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); }
  .fp-scroller::-webkit-scrollbar-thumb { background: rgba(90,51,255,0.5); border-radius: 99px; }

  /* form atoms */
  .fp-input {
    font-family: var(--a2-sans);
    font-size: 14px;
    color: #FFFFFF;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 12px;
    padding: 12px 16px;
    outline: none;
    width: 100%;
    transition: border-color .2s ease, box-shadow .2s ease;
  }
  .fp-input::placeholder { color: rgba(255,255,255,0.40); }
  .fp-input:focus {
    border-color: #5A33FF;
    box-shadow: 0 0 0 3px rgba(90,51,255,0.25);
  }
  .fp-btn {
    font-family: var(--a2-sans);
    font-size: 14px;
    font-weight: 600;
    color: #FFFFFF;
    background: #5A33FF;
    border: none;
    border-radius: 12px;
    padding: 12px 20px;
    cursor: pointer;
    white-space: nowrap;
    transition: background .2s ease, transform .15s ease, box-shadow .2s ease;
    box-shadow: 0 8px 26px rgba(90,51,255,0.40);
  }
  .fp-btn:hover { background: #8F45EE; transform: translateY(-1px); }
  .fp-btn-neon {
    background: #66F78E;
    color: #0D0536;
    box-shadow: 0 8px 26px rgba(102,247,142,0.35);
  }
  .fp-btn-neon:hover { background: #28DFE8; }
  .fp-close {
    position: absolute;
    top: 12px;
    right: 14px;
    z-index: 5;
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.6);
    font-size: 15px;
    line-height: 1;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    transition: color .15s ease, background .15s ease;
    font-family: var(--a2-sans);
  }
  .fp-close:hover { color: #FFFFFF; background: rgba(255,255,255,0.10); }
  .fp-nolink {
    display: block;
    margin: 14px auto 0;
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.50);
    font-family: var(--a2-sans);
    font-size: 12.5px;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color .15s ease;
  }
  .fp-nolink:hover { color: rgba(255,255,255,0.85); }
  .fp-retrigger {
    margin-top: 14px;
    background: transparent;
    border: 1px solid rgba(90,51,255,0.45);
    color: #8F45EE;
    font-family: var(--a2-sans);
    font-size: 12.5px;
    font-weight: 600;
    border-radius: 999px;
    padding: 8px 16px;
    cursor: pointer;
    transition: border-color .15s ease, color .15s ease, background .15s ease;
  }
  .fp-retrigger:hover {
    border-color: #5A33FF;
    color: #FFFFFF;
    background: rgba(90,51,255,0.18);
  }

  /* drawer bullets */
  .fp-li::before {
    content: "";
    position: absolute;
    left: 2px;
    top: 7px;
    width: 6px;
    height: 6px;
    border-radius: 99px;
    background: #5A33FF;
    box-shadow: 0 0 8px rgba(90,51,255,0.7);
  }

  /* entrance animations */
  .fp-overlay { animation: fpFade .35s ease both; }
  .fp-modal { animation: fpPop .5s cubic-bezier(.2,1.1,.3,1) both; }
  .fp-curtain { animation: fpCurtain .55s cubic-bezier(.22,1,.36,1) both; }
  .fp-drawer { animation: fpDrawer .5s cubic-bezier(.22,1,.36,1) both; }
  .fp-banner { animation: fpBanner .45s cubic-bezier(.22,1,.36,1) both; }
  .fp-knock { animation: fpPop .4s cubic-bezier(.2,1.1,.3,1) both; }
  .fp-knock-card { animation: fpPop .45s cubic-bezier(.2,1.1,.3,1) both; transform-origin: bottom right; }

  @keyframes fpFade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fpPop {
    from { opacity: 0; transform: scale(.88) translateY(14px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes fpCurtain {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes fpDrawer {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes fpBanner {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
  @keyframes fpPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: .5; transform: scale(.78); }
  }
`;
