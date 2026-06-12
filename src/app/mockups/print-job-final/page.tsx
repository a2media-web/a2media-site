"use client";

/* Mockup: /mockups/print-job-final
   Three takes on the two-stage Print Job popup.

   Stage 1: at 40% scroll, a small floating "The A2 Secret Printer" button
   appears in the bottom-right corner. Low-pressure, the visitor can ignore
   it or close it without ever seeing the popup.

   Stage 2: when the visitor clicks the button, the printer + receipt
   animate in (slide up, paper unrolls) and prints a teaser of the offer.
   Inside the receipt there's a CTA that opens the Notion form in a new tab.

   Will be wired to a Kit sequence later. For now CTA links to the Notion
   page provided.
*/

import React, { useState } from "react";

const OFFER_URL =
  "https://a2-media.notion.site/2ee7a0163fa48117bd65e276d9284b66?pvs=105";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

/* ============================================================ */
/*  Page                                                        */
/* ============================================================ */

export default function PrintJobFinalMockup() {
  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header style={S.frameHeader}>
        <span style={S.frameTag}>The Print Job · Two-stage · 3 variants</span>
        <h2 style={S.frameTitle}>Pick a receipt the visitor *asks* to read</h2>
        <p style={S.frameNotes}>
          At 40% scroll, a small &ldquo;The A2 Secret Printer&rdquo; button
          appears in the bottom-right corner. The visitor can ignore or close
          it. If they click, the printer spawns and prints a teaser of the
          offer. Inside the receipt the &ldquo;View the playbook&rdquo;
          button opens the Notion form in a new tab. The three variants
          below have different printed-receipt framings. Click each
          variant&apos;s button to see the print job play out, then close to
          reset.
        </p>
      </header>

      <Demo
        tag="Variant 01 · Pain Relief"
        title="Stop chasing. Start closing."
        notes="Bullets lead with the visceral pain of the B2B SaaS marketer — the exhausting chase — then reframe the offer as the way out. Best for visitors who arrived from a problem-aware ad or article."
        body={<QuickBrief copy={COPY[0]} />}
      />

      <Demo
        tag="Variant 02 · Insider Status"
        title="The format your competitor doesn't know yet"
        notes="Bullets lean into FOMO and craft-secret framing. Best for the marketer who wants to be the one who saw it first. Pairs well with the no-pressure positioning across the rest of the site."
        body={<QuickBrief copy={COPY[1]} />}
      />

      <Demo
        tag="Variant 03 · Confidence + Concrete"
        title="Walk into your QBR with this"
        notes="Bullets stack a confidence-boosting outcome with concrete numbers from the actual playbook. Best for the marketer who needs to defend video spend at the next quarterly review."
        body={<QuickBrief copy={COPY[2]} />}
      />

      <p style={S.footnote}>
        Live wiring: mounts once at 40% scroll, click-to-spawn, dismiss
        persists in localStorage for the session. The receipt CTA opens
        the Notion form in a new tab.
      </p>
    </main>
  );
}

/* ============================================================ */
/*  Demo wrapper (faded mock page + the two-stage popup)        */
/* ============================================================ */

function Demo({
  tag,
  title,
  notes,
  body,
}: {
  tag: string;
  title: string;
  notes: string;
  body: React.ReactNode;
}) {
  return (
    <section style={S.demoCard}>
      <div style={S.demoHead}>
        <span style={S.demoTag}>{tag}</span>
        <h3 style={S.demoTitle}>{title}</h3>
        <p style={S.demoNotes}>{notes}</p>
      </div>
      <div style={S.demoStage}>
        <FakePageBG />
        {body}
      </div>
    </section>
  );
}

function FakePageBG() {
  return (
    <>
      <div style={S.bgBlobA} />
      <div style={S.bgBlobB} />
      <div style={S.bgRows}>
        {[
          { w: "40%" },
          { w: "62%" },
          { w: "48%" },
          { w: "70%" },
          { w: "32%" },
          { w: "55%" },
          { w: "44%" },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              ...S.bgRow,
              width: r.w,
              opacity: 0.35 - i * 0.025,
            }}
          />
        ))}
      </div>
    </>
  );
}

/* ============================================================ */
/*  Floating trigger button (stage 1)                           */
/* ============================================================ */

function TriggerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="pj-trigger"
      style={S.triggerBtn}
    >
      <span style={S.triggerIcon} aria-hidden>
        <span style={S.triggerLed} className="pj-led" />
      </span>
      <span style={S.triggerLabel}>
        <span style={S.triggerLabelTop}>psst. Click to see</span>
        <span style={S.triggerLabelMain}>
          Our Best Kept Video Secret{" "}
          <span aria-hidden style={{ marginLeft: 2 }}>
            →
          </span>
        </span>
      </span>
    </button>
  );
}

/* ============================================================ */
/*  Two-stage variant container                                 */
/* ============================================================ */

function Stage({ children }: { children: (open: boolean, toggle: () => void) => React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  return <>{children(open, toggle)}</>;
}

/* ============================================================ */
/*  Variant 01 · Quick Brief                                    */
/* ============================================================ */

const COPY = [
  // Variant 01 — Pain Relief
  [
    "Stop chasing. Buyers chase you.",
    "8 to 10x more demos booked.",
    "Deals close 35% faster.",
  ],
  // Variant 02 — Insider Status (locked, this is the shipping copy)
  [
    "The video format your competitors are missing out on.",
    "8 to 10x more demos booked.",
    "Deals close 35% faster.",
  ],
  // Variant 03 — Confidence + Concrete
  [
    "Walk into your QBR with this.",
    "Buyers watch 90% to the end.",
    "Ship one in 72 hours.",
  ],
];

function QuickBrief({ copy }: { copy: string[] }) {
  return (
    <Stage>
      {(open, toggle) =>
        open ? (
          <PopupShell onClose={toggle}>
            <Receipt>
              <div style={S.receiptMonoHead}>
                *** THE A2 SECRET ***
                <br />
                RECEIPT #2026-0006
              </div>
              <div style={S.receiptRule} />
              <h3 style={S.receiptH}>
                Get the video format that closes deals{" "}
                <em style={S.receiptHItalic}>35% faster.</em>
              </h3>
              <div style={S.receiptMonoLabel}>WHAT&apos;S INSIDE</div>
              <ul style={S.receiptList}>
                {copy.map((line, i) => (
                  <li key={i} style={S.receiptListItem}>
                    <span style={S.receiptBullet} aria-hidden>
                      →
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div style={S.receiptRule} />
              <p style={S.receiptTear}>Answer 3 questions and it&apos;s yours.</p>
            </Receipt>
            <ReceiptCta />
          </PopupShell>
        ) : (
          <TriggerButton onClick={toggle} />
        )
      }
    </Stage>
  );
}

/* ============================================================ */
/*  Legacy variants (kept for reference, no longer rendered)    */
/* ============================================================ */

function TradeReceipt_unused() {
  return (
    <Stage>
      {(open, toggle) =>
        open ? (
          <PopupShell onClose={toggle}>
            <Receipt>
              <div style={S.receiptMonoHead}>
                A2 MEDIA · INTERNAL
                <br />
                RECEIPT #2026-0006
              </div>
              <div style={S.receiptRule} />
              <h3 style={S.receiptH}>
                One of our best kept secrets.{" "}
                <em style={S.receiptHItalic}>Yours for 3 questions.</em>
              </h3>
              <div style={S.tradeGrid}>
                <div>
                  <div style={S.tradeLabel}>YOU GIVE</div>
                  <div style={S.tradeBody}>
                    3 quick questions about your buyer + funnel
                  </div>
                </div>
                <div style={S.tradeDivider} />
                <div>
                  <div style={S.tradeLabel}>YOU GET</div>
                  <div style={S.tradeBody}>
                    The format we use to close deals 35% faster
                  </div>
                </div>
              </div>
              <div style={S.receiptRule} />
            </Receipt>
            <ReceiptCta />
          </PopupShell>
        ) : (
          <TriggerButton onClick={toggle} />
        )
      }
    </Stage>
  );
}

/* ============================================================ */
/*  Variant 03 · QC Stamp                                       */
/* ============================================================ */

function QCStamp_unused() {
  return (
    <Stage>
      {(open, toggle) =>
        open ? (
          <PopupShell onClose={toggle}>
            <Receipt>
              <div style={S.receiptMonoHead}>
                A2 MEDIA · QC LOG
                <br />
                FROM THE EDITING FLOOR
              </div>
              <div style={S.receiptRule} />
              <div style={S.stampRow}>
                <div style={S.stamp}>
                  <span style={S.stampInner}>APPROVED</span>
                  <span style={S.stampDate}>FOR RELEASE</span>
                </div>
                <div style={S.stampSide}>
                  <div style={S.stampSideTitle}>The video format</div>
                  <div style={S.stampSideSub}>
                    that closes deals 35% faster
                  </div>
                </div>
              </div>
              <div style={S.receiptRule} />
              <div style={S.receiptMonoLabel}>SHIPS IN 72 HOURS</div>
              <p style={S.receiptTearLight}>
                Internal playbook. We&apos;re letting you read it.
              </p>
            </Receipt>
            <ReceiptCta />
          </PopupShell>
        ) : (
          <TriggerButton onClick={toggle} />
        )
      }
    </Stage>
  );
}

/* ============================================================ */
/*  Shared popup shell, receipt body, CTA                       */
/* ============================================================ */

function PopupShell({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="pj-shell" style={S.printerWrap}>
      <button
        type="button"
        aria-label="Close"
        style={S.closeBtn}
        onClick={onClose}
      >
        ×
      </button>
      <div style={S.paperArea}>
        <div className="pj-paper" style={S.paperInner}>
          <div style={S.zigzagTop} />
          {children}
          <div style={S.zigzag} />
        </div>
      </div>
      <PrinterBody />
    </div>
  );
}

function Receipt({ children }: { children: React.ReactNode }) {
  return <div style={S.receipt}>{children}</div>;
}

function ReceiptCta() {
  return (
    <a
      href={OFFER_URL}
      target="_blank"
      rel="noreferrer"
      style={S.ctaBtn}
      className="pj-cta"
    >
      View the playbook{" "}
      <span aria-hidden style={S.ctaArrow}>
        →
      </span>
    </a>
  );
}

function PrinterBody() {
  return (
    <div style={S.printerBody}>
      <div style={S.printerSlot} />
      <div style={S.printerFace}>
        <span style={S.printerLed} className="pj-led" />
        <span style={S.printerLabel}>A2-THERMAL · PRINTING</span>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Keyframes + responsive                                      */
/* ============================================================ */

const css = `
  @keyframes pjLed {
    0%, 100% { box-shadow: 0 0 8px rgba(102,247,142,0.9); opacity: 1; }
    50%      { box-shadow: 0 0 14px rgba(102,247,142,1); opacity: 0.78; }
  }
  .pj-led { animation: pjLed 1.1s ease-in-out infinite; }

  @keyframes pjShellIn {
    from { transform: translateY(28px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  .pj-shell { animation: pjShellIn 320ms cubic-bezier(.2,.7,.2,1.05) both; }

  /* dot-matrix line-by-line feed (steps() gives the classic printer stutter) */
  @keyframes pjPaperUnroll {
    from { max-height: 0; }
    to   { max-height: 520px; }
  }
  .pj-paper { animation: pjPaperUnroll 2600ms steps(22, end) 280ms both; overflow: hidden; }

  @keyframes pjTriggerNudge {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }
  .pj-trigger {
    animation: pjTriggerNudge 4.5s ease-in-out infinite;
    transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
  }
  .pj-trigger:hover {
    transform: translateY(-2px);
    background: #8F45EE;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.14), 0 18px 50px rgba(143,69,238,0.6), 0 0 80px rgba(90,51,255,0.4);
  }

  @keyframes pjCtaPulse {
    0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 10px 28px rgba(90,51,255,0.45); }
    50%      { box-shadow: 0 0 0 1px rgba(255,255,255,0.14), 0 14px 40px rgba(143,69,238,0.6); }
  }
  .pj-cta { animation: pjCtaPulse 2.6s ease-in-out infinite; transition: transform 220ms ease; }
  .pj-cta:hover { transform: translateY(-1px); }
`;

/* ============================================================ */
/*  Styles                                                      */
/* ============================================================ */

const S = {
  page: { background: "#07021f", paddingBottom: 80 } as React.CSSProperties,
  frameHeader: {
    background: "#000",
    borderTop: "2px solid #5A33FF",
    padding: "40px 24px 28px",
    textAlign: "center" as const,
    fontFamily: "var(--a2-sans)",
  },
  frameTag: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    padding: "5px 14px",
    borderRadius: 999,
    marginBottom: 12,
    color: "#8F45EE",
    border: "1px solid rgba(143,69,238,0.5)",
  },
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
    maxWidth: 1100,
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
  },
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
    maxWidth: 760,
  } as React.CSSProperties,
  demoStage: {
    position: "relative" as const,
    height: 560,
    margin: 20,
    background: "#0D0536",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    overflow: "hidden",
  },

  bgBlobA: {
    position: "absolute" as const,
    inset: 0,
    background:
      "radial-gradient(60% 50% at 30% 30%, rgba(90,51,255,0.22), transparent 70%)",
    pointerEvents: "none" as const,
  },
  bgBlobB: {
    position: "absolute" as const,
    inset: 0,
    background:
      "radial-gradient(50% 40% at 80% 80%, rgba(143,69,238,0.12), transparent 70%)",
    pointerEvents: "none" as const,
  },
  bgRows: {
    position: "absolute" as const,
    inset: "30px 40px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 22,
    pointerEvents: "none" as const,
  },
  bgRow: {
    height: 14,
    borderRadius: 4,
    background: "rgba(255,255,255,0.05)",
  } as React.CSSProperties,

  /* --- stage 1 trigger button --- */
  triggerBtn: {
    position: "absolute" as const,
    right: 22,
    bottom: 22,
    zIndex: 20,
    background: "#5A33FF",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: "11px 18px 11px 12px",
    borderRadius: 999,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    fontFamily: "var(--a2-sans)",
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.06), 0 14px 38px rgba(90,51,255,0.55), 0 0 60px rgba(90,51,255,0.32)",
  } as React.CSSProperties,
  triggerIcon: {
    width: 26,
    height: 26,
    borderRadius: 999,
    background:
      "linear-gradient(180deg, #1A0F4D, #0D0536)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255,255,255,0.18)",
    flexShrink: 0,
  } as React.CSSProperties,
  triggerLed: {
    width: 7,
    height: 7,
    borderRadius: 999,
    background: "#66F78E",
  } as React.CSSProperties,
  triggerLabel: {
    display: "inline-flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    lineHeight: 1.05,
    textAlign: "left" as const,
  },
  triggerLabelTop: {
    fontFamily: MONO,
    fontSize: 8.5,
    fontWeight: 800,
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.7)",
    marginBottom: 3,
  } as React.CSSProperties,
  triggerLabelMain: {
    fontSize: 13.5,
    fontWeight: 700,
    letterSpacing: "0.01em",
  } as React.CSSProperties,

  /* --- printer / receipt --- */
  printerWrap: {
    position: "absolute" as const,
    right: 24,
    bottom: 20,
    width: 296,
    zIndex: 20,
    display: "flex",
    flexDirection: "column" as const,
    filter: "drop-shadow(0 22px 60px rgba(0,0,0,0.6))",
  } as React.CSSProperties,
  closeBtn: {
    position: "absolute" as const,
    top: -6,
    right: -6,
    width: 26,
    height: 26,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(13,5,54,0.92)",
    color: "rgba(255,255,255,0.85)",
    fontSize: 17,
    lineHeight: 1,
    cursor: "pointer",
    zIndex: 5,
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  paperArea: {
    margin: "0 11px",
    position: "relative" as const,
  } as React.CSSProperties,
  paperInner: {
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,
  zigzagTop: {
    height: 9,
    backgroundImage:
      "linear-gradient(135deg, transparent 50%, #EFEFEF 50%), linear-gradient(225deg, transparent 50%, #EFEFEF 50%)",
    backgroundSize: "12px 9px",
    backgroundRepeat: "repeat-x",
  } as React.CSSProperties,
  zigzag: {
    height: 9,
    backgroundImage:
      "linear-gradient(135deg, #EFEFEF 50%, transparent 50%), linear-gradient(225deg, #EFEFEF 50%, transparent 50%)",
    backgroundSize: "12px 9px",
    backgroundRepeat: "repeat-x",
  } as React.CSSProperties,
  receipt: {
    background: "#EFEFEF",
    color: "#0D0536",
    padding: "13px 18px 12px",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
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
    borderTop: "1.5px dashed rgba(13,5,54,0.32)",
    margin: "9px 0",
  } as React.CSSProperties,
  receiptMonoLabel: {
    fontFamily: MONO,
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: "rgba(13,5,54,0.78)",
    lineHeight: 1.7,
  } as React.CSSProperties,
  receiptH: {
    fontSize: 17,
    fontWeight: 800,
    lineHeight: 1.18,
    margin: "4px 0 9px",
    color: "#0D0536",
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  receiptHAccent: { color: "#5A33FF" } as React.CSSProperties,
  receiptHItalic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    color: "#5A33FF",
    fontWeight: 500,
  } as React.CSSProperties,
  receiptList: {
    listStyle: "none",
    margin: "4px 0 4px",
    padding: 0,
    fontSize: 13,
    lineHeight: 1.45,
    color: "rgba(13,5,54,0.88)",
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,
  receiptListItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    fontWeight: 600,
  } as React.CSSProperties,
  receiptBullet: {
    color: "#5A33FF",
    fontWeight: 800,
    flexShrink: 0,
    marginTop: 1,
  } as React.CSSProperties,
  receiptTear: {
    fontFamily: MONO,
    fontSize: 9.5,
    color: "rgba(13,5,54,0.5)",
    textAlign: "center" as const,
    margin: "0 0 2px",
    letterSpacing: "0.04em",
  } as React.CSSProperties,
  receiptTearLight: {
    fontSize: 11,
    color: "rgba(13,5,54,0.6)",
    textAlign: "center" as const,
    margin: "8px 0 0",
    fontStyle: "italic" as const,
    fontFamily: "var(--a2-display)",
  } as React.CSSProperties,

  tradeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr",
    gap: 10,
    margin: "2px 0 6px",
    alignItems: "start",
  } as React.CSSProperties,
  tradeDivider: {
    alignSelf: "stretch",
    background: "rgba(13,5,54,0.18)",
  } as React.CSSProperties,
  tradeLabel: {
    fontFamily: MONO,
    fontSize: 9.5,
    fontWeight: 800,
    letterSpacing: "0.1em",
    color: "#5A33FF",
    marginBottom: 4,
  } as React.CSSProperties,
  tradeBody: {
    fontSize: 11.5,
    lineHeight: 1.4,
    color: "rgba(13,5,54,0.82)",
  } as React.CSSProperties,

  stampRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: "4px 0",
  } as React.CSSProperties,
  stamp: {
    border: "2px solid #5A33FF",
    color: "#5A33FF",
    padding: "8px 10px",
    borderRadius: 6,
    fontFamily: MONO,
    textAlign: "center" as const,
    transform: "rotate(-4deg)",
    flexShrink: 0,
  } as React.CSSProperties,
  stampInner: {
    display: "block",
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.12em",
    lineHeight: 1,
  } as React.CSSProperties,
  stampDate: {
    display: "block",
    fontSize: 8,
    letterSpacing: "0.1em",
    marginTop: 3,
    color: "rgba(90,51,255,0.7)",
  } as React.CSSProperties,
  stampSide: { flex: 1 } as React.CSSProperties,
  stampSideTitle: {
    fontSize: 14.5,
    fontWeight: 800,
    color: "#0D0536",
    lineHeight: 1.2,
  } as React.CSSProperties,
  stampSideSub: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    fontSize: 13,
    color: "#5A33FF",
    marginTop: 2,
    lineHeight: 1.25,
  } as React.CSSProperties,

  ctaBtn: {
    display: "block",
    background: "#5A33FF",
    color: "#fff",
    textAlign: "center" as const,
    padding: "13px 14px",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.01em",
    textDecoration: "none",
    margin: "8px 11px 0",
    borderRadius: 8,
  } as React.CSSProperties,
  ctaArrow: {
    display: "inline-block",
    transform: "translateY(-1px)",
    marginLeft: 4,
  } as React.CSSProperties,

  printerBody: {
    position: "relative" as const,
    background: "linear-gradient(180deg, #1A0F4D, #0D0536)",
    border: "1px solid rgba(90,51,255,0.6)",
    borderRadius: 12,
    height: 54,
    marginTop: 8,
    zIndex: 2,
  } as React.CSSProperties,
  printerSlot: {
    position: "absolute" as const,
    top: -1,
    left: 10,
    right: 10,
    height: 5,
    borderRadius: 3,
    background: "#050214",
    boxShadow: "inset 0 1px 4px rgba(0,0,0,0.9), 0 0 12px rgba(90,51,255,0.45)",
  } as React.CSSProperties,
  printerFace: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: "100%",
    padding: "0 12px 0 14px",
  } as React.CSSProperties,
  printerLed: {
    width: 7,
    height: 7,
    borderRadius: 99,
    background: "#66F78E",
    flexShrink: 0,
  } as React.CSSProperties,
  printerLabel: {
    flex: 1,
    fontFamily: MONO,
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "rgba(255,255,255,0.6)",
  } as React.CSSProperties,

  footnote: {
    maxWidth: 1100,
    margin: "30px auto 0",
    padding: "0 28px",
    fontSize: 12.5,
    color: "rgba(255,255,255,0.42)",
    fontFamily: "var(--a2-sans)",
    textAlign: "center" as const,
  },
};
