"use client";

/* Mockup: /mockups/fable-popups-unorthodox
   "Five popups that don't know they're popups" — Kit email-capture,
   round two. Every pattern here borrows from the edit bay instead of
   the popup industry: a thermal printer, a review comment, a broadcast
   chyron, a razor cut through the page, a caption track. Each demo
   runs inside its own scrollable region with an IntersectionObserver
   on a sentinel parked at the 30% mark, so every variant fires
   independently. Forms are visual mockups only — no Kit wiring. */

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
  const [run, setRun] = useState(0); // bumps to remount popup + restart CSS anims

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

  /* Self-running: after a stagger, scroll the demo to its 30% sentinel
     so the observer fires naturally — screenshot-ready. */
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
    setRun((r) => r + 1);
  }, []);

  const submit = useCallback((ev: React.FormEvent) => {
    ev.preventDefault();
    setSent(true);
  }, []);

  return { scrollerRef, sentinelRef, open, sent, run, close, retrigger, submit };
}

/* Deterministic fake-homepage content scrolling behind each popup. */
const BAR_WIDTHS = [72, 48, 88, 64, 80, 56, 92, 44, 76, 60, 84, 52];

function FakeContent({ seed }: { seed: number }) {
  return (
    <div style={S.fakeWrap} aria-hidden>
      <div style={S.fakeNav}>
        <div style={{ ...S.fakeLogo }} />
        <div style={{ display: "flex", gap: 14 }}>
          <div style={{ ...S.fakeNavLink, width: 42 }} />
          <div style={{ ...S.fakeNavLink, width: 56 }} />
          <div style={{ ...S.fakeNavLink, width: 48 }} />
        </div>
      </div>
      <div style={{ padding: "34px 26px 10px" }}>
        <div style={{ ...S.fakeH1, width: "78%" }} />
        <div style={{ ...S.fakeH1, width: "52%", marginTop: 12 }} />
        <div style={{ ...S.fakeP, width: "64%", marginTop: 20 }} />
        <div style={{ ...S.fakeBtn, marginTop: 24 }} />
      </div>
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

/* Shared email form. `light` flips it for printing on receipt paper. */
function EmailForm({
  cta,
  sent,
  onSubmit,
  row,
  light,
  neon,
}: {
  cta: string;
  sent: boolean;
  onSubmit: (ev: React.FormEvent) => void;
  row?: boolean;
  light?: boolean;
  neon?: boolean;
}) {
  if (sent) {
    return (
      <div style={{ ...S.sentNote, ...(light ? { color: "#5A33FF" } : null) }}>
        <span style={light ? { ...S.sentDot, background: "#5A33FF", boxShadow: "0 0 10px rgba(90,51,255,0.6)" } : S.sentDot} />
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
        className={light ? "fpu-input fpu-input-light" : "fpu-input"}
        style={row ? { flex: 1, minWidth: 0 } : undefined}
        aria-label="Email address"
      />
      <button type="submit" className={neon ? "fpu-btn fpu-btn-neon" : "fpu-btn"}>
        {cta}
      </button>
    </form>
  );
}

function CloseX({ onClick, style }: { onClick: () => void; style?: React.CSSProperties }) {
  return (
    <button type="button" onClick={onClick} className="fpu-close" aria-label="Close" style={style}>
      ✕
    </button>
  );
}

/* Demo shell: viewport + scroller + fake page + 30% sentinel. */
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
      <div ref={demo.scrollerRef} className="fpu-scroller" style={S.scroller}>
        <div style={{ position: "relative", height: 1620 }}>
          <FakeContent seed={seed} />
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
    <button type="button" onClick={onClick} className="fpu-retrigger">
      ↻ Re-trigger demo
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Variant 01 · The Print Job — thermal printer feeds out a receipt   */
/* ------------------------------------------------------------------ */

function PrintJobDemo() {
  const demo = usePopupDemo(700);
  return (
    <>
      <DemoShell demo={demo} seed={11}>
        {demo.open && (
          <div key={demo.run} style={S.printerWrap}>
            {/* paper feeds upward out of the slot, top of receipt first */}
            <div className="fpu-paper-area" style={S.paperArea}>
              <div style={S.receipt}>
                <div style={S.receiptMonoHead}>
                  A2 MEDIA · EDIT BAY 02
                  <br />
                  PRINT JOB #0047 · {`{visitor}`}
                </div>
                <div style={S.receiptRule} />
                <div style={S.receiptMono}>HOOK ........... PASS</div>
                <div style={S.receiptMono}>PACING .......... PASS</div>
                <div style={S.receiptMono}>PAYOFF .......... PASS</div>
                <div style={S.receiptMono}>CTA ............. PASS</div>
                <div style={S.receiptRule} />
                <h3 style={S.receiptH}>
                  The cheat sheet we print and tape to our editors&rsquo; monitors.
                </h3>
                <p style={S.receiptP}>
                  Twelve checks on one page. Every video we ship gets graded
                  against it before you ever see a cut.
                </p>
                <div style={S.receiptTear}>✂&ensp;- - - - - tear here - - - - -</div>
                <EmailForm cta="Print mine" sent={demo.sent} onSubmit={demo.submit} light />
              </div>
              <div style={S.receiptZigzag} aria-hidden />
            </div>
            {/* printer body */}
            <div style={S.printerBody}>
              <div style={S.printerSlot} aria-hidden />
              <div style={S.printerFace}>
                <span style={S.printerLed} aria-hidden />
                <span style={S.printerLabel}>A2-THERMAL · RECEIVING</span>
                <CloseX onClick={demo.close} style={{ position: "static", padding: 4 }} />
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
/*  Variant 02 · The Review Note — Frame.io comment on your session    */
/* ------------------------------------------------------------------ */

function ReviewNoteDemo() {
  const demo = usePopupDemo(1150);
  return (
    <>
      <DemoShell demo={demo} seed={12}>
        {demo.open && (
          <div key={demo.run} style={S.noteWrap}>
            {/* playhead pinned to the visitor's scroll position */}
            <div className="fpu-playhead" style={S.notePlayhead} aria-hidden>
              <div style={S.notePlayheadCap} />
            </div>
            <div className="fpu-note-card" style={S.noteCard}>
              <div style={S.noteNotch} aria-hidden />
              <div style={S.noteHead}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/ademola.png" alt="Ademola Adelakun" style={S.noteAvatar} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={S.noteName}>Ademola Adelakun</div>
                  <div style={S.noteSub}>left a comment on your session · just now</div>
                </div>
                <span style={S.noteTimecode}>00:23 / 02:14</span>
              </div>
              <p style={S.noteBody}>
                You held this frame for 23 seconds. Most viewers are gone by 8.
                Want the hook teardown we run on our clients&rsquo; top videos?
              </p>
              <EmailForm cta="Reply" sent={demo.sent} onSubmit={demo.submit} row />
              <div style={S.noteFoot}>
                <div style={S.noteTimeline} aria-hidden>
                  <div style={S.noteTimelineFill} />
                  <div style={S.noteTimelineMarker} />
                </div>
                <button type="button" className="fpu-resolve" onClick={demo.close}>
                  Resolve
                </button>
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
/*  Variant 03 · The Lower Third — broadcast chyron wipes in           */
/* ------------------------------------------------------------------ */

function LowerThirdDemo() {
  const demo = usePopupDemo(1600);
  return (
    <>
      <DemoShell demo={demo} seed={13}>
        {demo.open && (
          <div key={demo.run}>
            <div className="fpu-l3-bug" style={S.l3Bug}>
              <span style={S.l3BugDot} aria-hidden />
              LIVE · A2-1
            </div>
            <div style={S.l3Wrap}>
              <div className="fpu-l3-plate" style={S.l3Plate}>
                <div style={S.l3PlateAccent} aria-hidden />
                <div>
                  <div style={S.l3Name}>ADEMOLA ADELAKUN</div>
                  <div style={S.l3Role}>FOUNDER · A2 MEDIA</div>
                </div>
              </div>
              <div className="fpu-l3-deck" style={S.l3Deck}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={S.l3Headline}>
                    Reveal closed <span style={S.neonText}>$600K</span> with one
                    video series.
                  </div>
                  <div style={S.l3Subline}>We send the full breakdown free.</div>
                </div>
                <div style={{ flexShrink: 0, width: 300 }}>
                  <EmailForm cta="Send it" sent={demo.sent} onSubmit={demo.submit} row />
                </div>
                <CloseX onClick={demo.close} style={{ position: "static", padding: 4 }} />
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
/*  Variant 04 · The Razor Cut — the page is sliced on a diagonal      */
/* ------------------------------------------------------------------ */

function RazorCutDemo() {
  const demo = usePopupDemo(2050);
  const [snap, setSnap] = useState(0);

  /* Freeze-frame: capture scroll position the instant the cut fires so
     the sliced halves match what the visitor was looking at. */
  useEffect(() => {
    if (demo.open) setSnap(demo.scrollerRef.current?.scrollTop ?? 0);
  }, [demo.open, demo.scrollerRef]);

  return (
    <>
      <DemoShell demo={demo} seed={14}>
        {demo.open && (
          <div key={demo.run} style={S.razorOverlay}>
            {/* what's behind the page: the gap with the offer in it */}
            <div style={S.razorUnder} aria-hidden />
            <div className="fpu-gapband" style={S.razorBand}>
              <div style={{ minWidth: 0 }}>
                <div style={S.razorH}>
                  We cut things <em style={S.italic}>for a living.</em>
                </div>
                <div style={S.razorSub}>
                  Watch the first 90 seconds we cut for our $20M ARR clients.
                </div>
              </div>
              <div style={{ flexShrink: 0, width: 286 }}>
                <EmailForm cta="Roll the cut" sent={demo.sent} onSubmit={demo.submit} row neon />
              </div>
            </div>
            {/* the two halves of the frozen page */}
            <div className="fpu-slice-top" style={S.sliceTop} aria-hidden>
              <div style={{ position: "relative", height: 1620, top: -snap }}>
                <FakeContent seed={14} />
              </div>
            </div>
            <div className="fpu-slice-bottom" style={S.sliceBottom} aria-hidden>
              <div style={{ position: "relative", height: 1620, top: -snap }}>
                <FakeContent seed={14} />
              </div>
            </div>
            {/* the razor playhead that makes the cut */}
            <div style={S.razorLineWrap} aria-hidden>
              <div className="fpu-razorline" style={S.razorLine} />
            </div>
            <CloseX onClick={demo.close} style={{ zIndex: 6 }} />
          </div>
        )}
      </DemoShell>
      <Retrigger onClick={demo.retrigger} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Variant 05 · The Caption Track — the page becomes a video w/ CC    */
/* ------------------------------------------------------------------ */

const CC_LINES = [
  "Real talk for a second.",
  "You're still reading. Most people skim and bounce.",
  "Want the 30-question rubric we score every script against?",
];

function CaptionTrackDemo() {
  const demo = usePopupDemo(2500);
  const [typed, setTyped] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!demo.open) {
      setTyped("");
      setShowForm(false);
      return;
    }
    let li = 0;
    let ci = 0;
    let cancelled = false;
    let t: ReturnType<typeof setTimeout>;
    setTyped("");
    setShowForm(false);
    const tick = () => {
      if (cancelled) return;
      const line = CC_LINES[li];
      if (ci <= line.length) {
        setTyped(line.slice(0, ci));
        ci += 1;
        t = setTimeout(tick, 32);
      } else if (li < CC_LINES.length - 1) {
        li += 1;
        ci = 0;
        t = setTimeout(tick, 850);
      } else {
        t = setTimeout(() => setShowForm(true), 450);
      }
    };
    t = setTimeout(tick, 350);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [demo.open, demo.run]);

  return (
    <>
      <DemoShell demo={demo} seed={15}>
        {demo.open && (
          <div key={demo.run} style={S.ccWrap}>
            {showForm && (
              <div className="fpu-cc-panel" style={S.ccPanel}>
                <CloseX onClick={demo.close} />
                <EmailForm cta="Send the rubric" sent={demo.sent} onSubmit={demo.submit} row />
              </div>
            )}
            <div style={S.ccBarRow}>
              <span style={S.ccBadge}>CC</span>
              <div style={S.ccBar}>
                <span>{typed}</span>
                {!showForm && <span className="fpu-cc-caret" style={S.ccCaret} aria-hidden />}
              </div>
            </div>
            <div style={S.ccProgress} aria-hidden>
              <div className="fpu-cc-fill" style={S.ccProgressFill}>
                <div style={S.ccScrubber} />
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
/*  Variant metadata                                                   */
/* ------------------------------------------------------------------ */

const VARIANTS: {
  tag: string;
  title: string;
  intrusion: number;
  blurb: string;
  Demo: React.ComponentType;
}[] = [
  {
    tag: "Variant 06 · Thermal Printer",
    title: "The Print Job",
    intrusion: 2,
    blurb:
      "A thermal printer mounts itself in the corner and feeds out a receipt, line by line, with the offer printed on the paper. The email field is part of the receipt, under the tear line. It is the site's receipt-printer motif walking off the pricing page and into the popup slot, and nobody closes a popup that is still printing.",
    Demo: PrintJobDemo,
  },
  {
    tag: "Variant 07 · Review Comment",
    title: "The Review Note",
    intrusion: 3,
    blurb:
      "A frame-accurate review comment, the kind editors leave each other a hundred times a day. Ademola's avatar, a timecode, a playhead pinned to the visitor's scroll position, and a reply box that happens to take an email. Closing it is labeled Resolve, because of course it is.",
    Demo: ReviewNoteDemo,
  },
  {
    tag: "Variant 08 · Broadcast Chyron",
    title: "The Lower Third",
    intrusion: 2,
    blurb:
      "The page becomes a broadcast. A chyron wipes in across the bottom with a name plate, a headline, and a live bug in the corner, and the email field sits inside the graphic like a station promo. Zero content blocked. The visitor just got upgraded to live television.",
    Demo: LowerThirdDemo,
  },
  {
    tag: "Variant 09 · Diagonal Slice",
    title: "The Razor Cut",
    intrusion: 5,
    blurb:
      "This is the loud one. A razor playhead slashes the page on a diagonal, the layout freezes and physically parts along the cut, and the offer is sitting in the gap between the two halves. It is an edit, performed on the visitor's own session. The most A2 thing on this page.",
    Demo: RazorCutDemo,
  },
  {
    tag: "Variant 10 · Caption Track",
    title: "The Caption Track",
    intrusion: 2,
    blurb:
      "The page pretends it is a video the visitor is watching. A CC track types out three captions above a progress bar, then the form fades in over the subtitle. It never blocks a single word of content. It just talks quietly underneath it, the way captions do.",
    Demo: CaptionTrackDemo,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FablePopupsUnorthodoxMockup() {
  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header style={S.frameHeader}>
        <span style={S.frameTag}>Fable · Kit popup concepts · round two</span>
        <h1 style={S.frameTitle}>Five popups that don&rsquo;t know they&rsquo;re popups</h1>
        <p style={S.frameNotes}>
          Round one covered the orthodox patterns. This round throws them out.
          Every concept below borrows from the edit bay instead of the popup
          industry: a thermal printer feeds the offer out on paper, an editor
          leaves a review note on your session, a chyron puts you on live TV, a
          razor cut slices the page in half, and a caption track talks under
          the content like you are watching a video. Same trigger as round
          one: each demo fires at 30% scroll inside its own frame, closes,
          re-arms, and fires again.
        </p>
      </header>

      <div style={S.cardStack}>
        {VARIANTS.map((v) => (
          <section key={v.tag} style={S.card}>
            <div style={S.cardHead}>
              <span style={S.cardTag}>{v.tag}</span>
              <span style={S.intrusion}>
                {"●".repeat(v.intrusion)}
                {"○".repeat(5 - v.intrusion)}
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

const MONO = "'SF Mono', 'Menlo', 'Consolas', monospace";

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
  intrusion: { fontSize: 12, color: "#5A33FF", letterSpacing: 3 },
  intrusionLabel: {
    color: "rgba(255,255,255,0.45)",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    fontSize: 10,
    fontWeight: 600,
  },
  cardTitle: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", color: "#FFFFFF" },
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
  fakeBtn: { width: 132, height: 34, borderRadius: 10, background: "#5A33FF", opacity: 0.9 },
  fakeCardRow: { display: "flex", gap: 14, marginTop: 22 },
  fakeCard: {
    flex: 1,
    height: 92,
    borderRadius: 12,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.07)",
  },

  /* shared popup text */
  italic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic" as const,
    fontWeight: 500,
    color: "#8F45EE",
  },
  neonText: { color: "#66F78E" },
  sentNote: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    fontSize: 14,
    fontWeight: 600,
    color: "#66F78E",
    padding: "10px 0",
  },
  sentDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    background: "#66F78E",
    boxShadow: "0 0 10px rgba(102,247,142,0.8)",
  },

  /* variant 06 — print job */
  printerWrap: {
    position: "absolute" as const,
    right: 22,
    bottom: 16,
    width: 252,
    zIndex: 20,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "stretch",
    filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.55))",
  },
  paperArea: {
    overflow: "hidden",
    margin: "0 13px",
    position: "relative" as const,
    display: "flex",
    flexDirection: "column" as const,
  },
  receipt: {
    background: "#EFEFEF",
    color: "#0D0536",
    padding: "14px 16px 10px",
    fontFamily: "var(--a2-sans)",
  },
  receiptMonoHead: {
    fontFamily: MONO,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: "#0D0536",
    lineHeight: 1.7,
    textAlign: "center" as const,
  },
  receiptRule: {
    borderTop: "1.5px dashed rgba(13,5,54,0.35)",
    margin: "9px 0",
  },
  receiptMono: {
    fontFamily: MONO,
    fontSize: 10.5,
    color: "rgba(13,5,54,0.8)",
    lineHeight: 1.85,
  },
  receiptH: {
    fontSize: 15,
    fontWeight: 700,
    lineHeight: 1.25,
    margin: "2px 0 7px",
    color: "#0D0536",
  },
  receiptP: {
    fontSize: 11.5,
    lineHeight: 1.5,
    color: "rgba(13,5,54,0.72)",
    margin: "0 0 10px",
  },
  receiptTear: {
    fontFamily: MONO,
    fontSize: 9.5,
    color: "rgba(13,5,54,0.45)",
    textAlign: "center" as const,
    margin: "2px 0 10px",
    letterSpacing: "0.04em",
  },
  receiptZigzag: {
    height: 9,
    flexShrink: 0,
    backgroundImage:
      "linear-gradient(135deg, #EFEFEF 50%, transparent 50%), linear-gradient(225deg, #EFEFEF 50%, transparent 50%)",
    backgroundSize: "12px 9px",
    backgroundRepeat: "repeat-x",
  },
  printerBody: {
    position: "relative" as const,
    background: "linear-gradient(180deg, #1A0F4D, #0D0536)",
    border: "1px solid rgba(90,51,255,0.6)",
    borderRadius: 12,
    height: 58,
    zIndex: 2,
  },
  printerSlot: {
    position: "absolute" as const,
    top: -1,
    left: 10,
    right: 10,
    height: 5,
    borderRadius: 3,
    background: "#050214",
    boxShadow: "inset 0 1px 4px rgba(0,0,0,0.9), 0 0 12px rgba(90,51,255,0.45)",
  },
  printerFace: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: "100%",
    padding: "0 12px 0 14px",
  },
  printerLed: {
    width: 7,
    height: 7,
    borderRadius: 99,
    background: "#66F78E",
    boxShadow: "0 0 9px rgba(102,247,142,0.9)",
    animation: "fpuPulse 1.1s ease-in-out infinite",
    flexShrink: 0,
  },
  printerLabel: {
    flex: 1,
    fontFamily: MONO,
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "rgba(255,255,255,0.6)",
  },

  /* variant 07 — review note */
  noteWrap: { position: "absolute" as const, inset: 0, zIndex: 20, pointerEvents: "none" as const },
  notePlayhead: {
    position: "absolute" as const,
    left: "16%",
    top: 0,
    width: 2,
    height: 118,
    background: "linear-gradient(180deg, #5A33FF, #8F45EE)",
    boxShadow: "0 0 12px rgba(90,51,255,0.8)",
    transformOrigin: "top center",
  },
  notePlayheadCap: {
    position: "absolute" as const,
    top: 0,
    left: -5,
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderTop: "8px solid #5A33FF",
  },
  noteCard: {
    position: "absolute" as const,
    left: "calc(16% - 16px)",
    top: 118,
    width: 348,
    maxWidth: "80%",
    background: "rgba(13,5,54,0.95)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(90,51,255,0.55)",
    borderRadius: 16,
    padding: "16px 18px 14px",
    boxShadow: "0 18px 60px rgba(0,0,0,0.55), 0 0 40px rgba(90,51,255,0.25)",
    pointerEvents: "auto" as const,
  },
  noteNotch: {
    position: "absolute" as const,
    top: -7,
    left: 9,
    width: 14,
    height: 14,
    background: "rgba(13,5,54,0.95)",
    borderLeft: "1px solid rgba(90,51,255,0.55)",
    borderTop: "1px solid rgba(90,51,255,0.55)",
    transform: "rotate(45deg)",
  },
  noteHead: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 },
  noteAvatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    objectFit: "cover" as const,
    border: "2px solid #5A33FF",
    flexShrink: 0,
  },
  noteName: { fontSize: 13.5, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2 },
  noteSub: { fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 },
  noteTimecode: {
    fontFamily: MONO,
    fontSize: 10,
    fontWeight: 700,
    color: "#28DFE8",
    border: "1px solid rgba(40,223,232,0.4)",
    borderRadius: 6,
    padding: "3px 7px",
    flexShrink: 0,
  },
  noteBody: {
    fontSize: 13.5,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.82)",
    margin: "0 0 12px",
  },
  noteFoot: { display: "flex", alignItems: "center", gap: 12, marginTop: 12 },
  noteTimeline: {
    flex: 1,
    height: 4,
    borderRadius: 99,
    background: "rgba(255,255,255,0.12)",
    position: "relative" as const,
  },
  noteTimelineFill: {
    position: "absolute" as const,
    left: 0,
    top: 0,
    bottom: 0,
    width: "17%",
    borderRadius: 99,
    background: "#5A33FF",
  },
  noteTimelineMarker: {
    position: "absolute" as const,
    left: "17%",
    top: -3,
    width: 10,
    height: 10,
    borderRadius: 99,
    background: "#8F45EE",
    boxShadow: "0 0 8px rgba(143,69,238,0.9)",
  },

  /* variant 08 — lower third */
  l3Bug: {
    position: "absolute" as const,
    top: 36,
    right: 14,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    gap: 7,
    fontFamily: MONO,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#FFFFFF",
    background: "rgba(13,5,54,0.85)",
    border: "1px solid rgba(102,247,142,0.5)",
    borderRadius: 7,
    padding: "5px 9px",
  },
  l3BugDot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    background: "#66F78E",
    boxShadow: "0 0 8px rgba(102,247,142,0.9)",
    animation: "fpuPulse 1.4s ease-in-out infinite",
  },
  l3Wrap: {
    position: "absolute" as const,
    left: 16,
    right: 16,
    bottom: 16,
    zIndex: 20,
  },
  l3Plate: {
    position: "relative" as const,
    display: "inline-flex",
    alignItems: "center",
    background: "#5A33FF",
    clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)",
    padding: "8px 30px 8px 14px",
    boxShadow: "0 10px 34px rgba(90,51,255,0.5)",
  },
  l3PlateAccent: {
    width: 4,
    alignSelf: "stretch",
    background: "#66F78E",
    marginRight: 12,
    flexShrink: 0,
  },
  l3Name: { fontSize: 15, fontWeight: 900, letterSpacing: "0.04em", color: "#FFFFFF", lineHeight: 1.15 },
  l3Role: { fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.75)", marginTop: 2 },
  l3Deck: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    background: "rgba(13,5,54,0.95)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(90,51,255,0.55)",
    borderTop: "3px solid #5A33FF",
    borderRadius: "0 12px 12px 12px",
    padding: "13px 14px 13px 18px",
    boxShadow: "0 16px 50px rgba(0,0,0,0.5)",
  },
  l3Headline: { fontSize: 16.5, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.25 },
  l3Subline: { fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 3 },

  /* variant 09 — razor cut */
  razorOverlay: { position: "absolute" as const, inset: 0, zIndex: 20, overflow: "hidden" },
  razorUnder: {
    position: "absolute" as const,
    inset: 0,
    background:
      "radial-gradient(ellipse at 50% 46%, rgba(90,51,255,0.35), transparent 65%), #06021A",
  },
  razorBand: {
    position: "absolute" as const,
    left: "50%",
    top: "46%",
    width: "104%",
    transform: "translate(-50%, -50%) rotate(-11.5deg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    padding: "0 32px",
    zIndex: 4,
  },
  razorH: { fontSize: 21, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.2, whiteSpace: "nowrap" as const },
  razorSub: { fontSize: 12.5, color: "rgba(255,255,255,0.68)", marginTop: 4, whiteSpace: "nowrap" as const },
  sliceTop: {
    position: "absolute" as const,
    inset: 0,
    background: "#0D0536",
    clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 62%)",
    overflow: "hidden",
    zIndex: 2,
  },
  sliceBottom: {
    position: "absolute" as const,
    inset: 0,
    background: "#0D0536",
    clipPath: "polygon(0 62%, 100% 30%, 100% 100%, 0 100%)",
    overflow: "hidden",
    zIndex: 2,
  },
  razorLineWrap: {
    position: "absolute" as const,
    left: "50%",
    top: "46%",
    width: "115%",
    height: 2,
    transform: "translate(-50%, -50%) rotate(-11.5deg)",
    zIndex: 3,
  },
  razorLine: {
    width: "100%",
    height: "100%",
    background: "#66F78E",
    boxShadow: "0 0 14px rgba(102,247,142,0.9), 0 0 40px rgba(102,247,142,0.5)",
    transformOrigin: "left center",
  },

  /* variant 10 — caption track */
  ccWrap: {
    position: "absolute" as const,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 12,
    paddingBottom: 0,
  },
  ccPanel: {
    position: "relative" as const,
    width: 420,
    maxWidth: "86%",
    background: "rgba(13,5,54,0.95)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(90,51,255,0.55)",
    borderRadius: 14,
    padding: "16px 44px 16px 16px",
    boxShadow: "0 18px 60px rgba(0,0,0,0.55), 0 0 40px rgba(90,51,255,0.25)",
  },
  ccBarRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: 10,
    maxWidth: "88%",
    marginBottom: 16,
  },
  ccBadge: {
    fontFamily: MONO,
    fontSize: 10,
    fontWeight: 700,
    color: "#28DFE8",
    border: "1.5px solid #28DFE8",
    borderRadius: 4,
    padding: "2px 5px",
    flexShrink: 0,
    marginBottom: 4,
  },
  ccBar: {
    background: "rgba(2,0,16,0.85)",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.4,
    padding: "8px 14px",
    borderRadius: 6,
    minHeight: 38,
    display: "flex",
    alignItems: "center",
  },
  ccCaret: {
    display: "inline-block",
    width: 2,
    height: 18,
    marginLeft: 3,
    background: "#28DFE8",
    animation: "fpuBlink 0.85s steps(1) infinite",
  },
  ccProgress: {
    width: "100%",
    height: 4,
    background: "rgba(255,255,255,0.12)",
  },
  ccProgressFill: {
    position: "relative" as const,
    height: "100%",
    background: "linear-gradient(90deg, #5A33FF, #8F45EE)",
    width: "18%",
    animation: "fpuProgress 26s linear forwards",
  },
  ccScrubber: {
    position: "absolute" as const,
    right: -5,
    top: -3,
    width: 10,
    height: 10,
    borderRadius: 99,
    background: "#8F45EE",
    boxShadow: "0 0 10px rgba(143,69,238,0.9)",
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
  .fpu-scroller::-webkit-scrollbar { width: 8px; }
  .fpu-scroller::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); }
  .fpu-scroller::-webkit-scrollbar-thumb { background: rgba(90,51,255,0.5); border-radius: 99px; }

  /* form atoms */
  .fpu-input {
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
  .fpu-input::placeholder { color: rgba(255,255,255,0.40); }
  .fpu-input:focus {
    border-color: #5A33FF;
    box-shadow: 0 0 0 3px rgba(90,51,255,0.25);
  }
  .fpu-input-light {
    color: #0D0536;
    background: #FFFFFF;
    border: 1.5px dashed rgba(13,5,54,0.4);
    border-radius: 8px;
    padding: 9px 12px;
    font-size: 12.5px;
  }
  .fpu-input-light::placeholder { color: rgba(13,5,54,0.4); }
  .fpu-btn {
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
  .fpu-btn:hover { background: #8F45EE; transform: translateY(-1px); }
  .fpu-btn-neon {
    background: #66F78E;
    color: #0D0536;
    box-shadow: 0 8px 26px rgba(102,247,142,0.35);
  }
  .fpu-btn-neon:hover { background: #FFFFFF; }
  .fpu-close {
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
  .fpu-close:hover { color: #FFFFFF; background: rgba(255,255,255,0.10); }
  .fpu-retrigger {
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
  .fpu-retrigger:hover {
    border-color: #5A33FF;
    color: #FFFFFF;
    background: rgba(90,51,255,0.18);
  }
  .fpu-resolve {
    background: transparent;
    border: 1px solid rgba(102,247,142,0.45);
    color: #66F78E;
    font-family: var(--a2-sans);
    font-size: 11.5px;
    font-weight: 600;
    border-radius: 999px;
    padding: 5px 13px;
    cursor: pointer;
    flex-shrink: 0;
    transition: background .15s ease, color .15s ease;
  }
  .fpu-resolve:hover { background: rgba(102,247,142,0.15); }

  /* variant 06 — printer feed: steps() = dot-matrix line advance */
  .fpu-paper-area { animation: fpuFeed 2.6s steps(20, end) .25s both; }
  @keyframes fpuFeed { from { height: 0; } to { height: 428px; } }

  /* variant 07 — playhead drops, then the card */
  .fpu-playhead { animation: fpuPlayhead .4s cubic-bezier(.22,1,.36,1) both; }
  @keyframes fpuPlayhead { from { transform: scaleY(0); } to { transform: scaleY(1); } }
  .fpu-note-card { animation: fpuNoteDrop .45s cubic-bezier(.2,1.1,.3,1) .3s both; transform-origin: top left; }
  @keyframes fpuNoteDrop {
    from { opacity: 0; transform: translateY(-10px) scale(.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* variant 08 — chyron wipe + deck rise + bug fade */
  .fpu-l3-plate { animation: fpuWipe .45s cubic-bezier(.22,1,.36,1) both; }
  @keyframes fpuWipe {
    from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); opacity: .4; }
    to { clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%); opacity: 1; }
  }
  .fpu-l3-deck { animation: fpuDeck .4s cubic-bezier(.22,1,.36,1) .28s both; }
  @keyframes fpuDeck {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fpu-l3-bug { animation: fpuFade .3s ease .55s both; }

  /* variant 09 — slash, then the page parts along the cut */
  .fpu-razorline { animation: fpuSlash .5s ease-in .05s both, fpuDimLine .5s ease .95s both; }
  @keyframes fpuSlash { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes fpuDimLine { from { opacity: 1; } to { opacity: .3; } }
  .fpu-slice-top { animation: fpuSliceTop .65s cubic-bezier(.22,1,.36,1) .6s both; }
  @keyframes fpuSliceTop {
    from { transform: translate(0, 0); filter: brightness(1); }
    to { transform: translate(-14px, -66px); filter: brightness(.45); }
  }
  .fpu-slice-bottom { animation: fpuSliceBottom .65s cubic-bezier(.22,1,.36,1) .6s both; }
  @keyframes fpuSliceBottom {
    from { transform: translate(0, 0); filter: brightness(1); }
    to { transform: translate(14px, 66px); filter: brightness(.45); }
  }
  .fpu-gapband { animation: fpuFade .4s ease .95s both; }

  /* variant 10 — caption panel fade-up */
  .fpu-cc-panel { animation: fpuRise .4s cubic-bezier(.2,1.1,.3,1) both; }
  @keyframes fpuRise {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fpuProgress { from { width: 18%; } to { width: 92%; } }
  @keyframes fpuBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  @keyframes fpuFade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fpuPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: .45; transform: scale(.78); }
  }
`;
