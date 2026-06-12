"use client";

/* PrintJobPopup
   Two-stage Kit signup popup mounted globally on the homepage.

   Stage 1: at 40% scroll, a small floating "Click to find out a secret"
   pill appears in the bottom-right corner.
   Stage 2: visitor clicks the pill, the printer + receipt animate in
   (slower dot-matrix line-by-line feed), reveal a teaser of the offer,
   and a "View the playbook" CTA opens the Notion form in a new tab.

   Dismissal persists in sessionStorage so the visitor only sees it once
   per browser. Swap OFFER_URL for a Kit form/sequence when ready.
*/

import React, { useEffect, useRef, useState } from "react";

const OFFER_URL =
  "https://a2-media.notion.site/2ee7a0163fa48117bd65e276d9284b66?pvs=105";

const DISMISS_KEY = "a2-secret-printer-dismissed-v1";
const SCROLL_TRIGGER_PCT = 0.3;

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

export default function PrintJobPopup() {
  const [phase, setPhase] = useState<"hidden" | "button" | "open">("hidden");
  const armed = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // respect a prior dismissal
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        armed.current = false;
        return;
      }
    } catch {
      // ignore storage errors
    }
    const onScroll = () => {
      if (!armed.current) return;
      const total =
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
        window.innerHeight;
      if (total <= 0) return;
      const pct = window.scrollY / total;
      if (pct >= SCROLL_TRIGGER_PCT) {
        armed.current = false;
        setPhase("button");
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // one initial check in case the page is already past the threshold
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    setPhase("hidden");
  };

  if (phase === "hidden") return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {phase === "button" ? (
        <button
          type="button"
          onClick={() => setPhase("open")}
          className="pj-trigger"
          style={S.triggerBtn}
          aria-label="Our best kept video secret"
        >
          <span style={S.triggerIcon} aria-hidden>
            <span style={S.triggerLed} className="pj-led" />
          </span>
          <span style={S.triggerLabel}>
            <span style={S.triggerLabelTop}>psst! Click here to see</span>
            <span style={S.triggerLabelMain}>
              Our Best Kept Video Secret{" "}
              <span aria-hidden style={{ marginLeft: 2 }}>
                →
              </span>
            </span>
          </span>
        </button>
      ) : (
        <div className="pj-shell" style={S.printerWrap}>
          <button
            type="button"
            aria-label="Close"
            style={S.closeBtn}
            onClick={dismiss}
          >
            ×
          </button>
          <div style={S.paperArea}>
            <div className="pj-paper" style={S.paperInner}>
              <div style={S.zigzagTop} />
              <div style={S.receipt}>
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
                  <li style={S.receiptListItem}>
                    <span style={S.receiptBullet} aria-hidden>
                      →
                    </span>
                    <span>Learn the format your competitors are missing.</span>
                  </li>
                  <li style={S.receiptListItem}>
                    <span style={S.receiptBullet} aria-hidden>
                      →
                    </span>
                    <span>Book 8 to 10x more demos.</span>
                  </li>
                  <li style={S.receiptListItem}>
                    <span style={S.receiptBullet} aria-hidden>
                      →
                    </span>
                    <span>Watch buyers sell themselves.</span>
                  </li>
                </ul>
                <div style={S.receiptRule} />
                <p style={S.receiptTear}>
                  Answer 3 questions and it&apos;s yours.
                </p>
              </div>
              <div style={S.zigzag} />
            </div>
          </div>
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
          <div style={S.printerBody}>
            <div style={S.printerSlot} />
            <div style={S.printerFace}>
              <span style={S.printerLed} className="pj-led" />
              <span style={S.printerLabel}>A2-THERMAL · PRINTING</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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

  /* dot-matrix line-by-line feed */
  @keyframes pjPaperUnroll {
    from { max-height: 0; }
    to   { max-height: 520px; }
  }
  .pj-paper { animation: pjPaperUnroll 2600ms steps(22, end) 280ms both; overflow: hidden; }

  @keyframes pjTriggerIn {
    from { transform: translateY(28px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes pjTriggerNudge {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }
  .pj-trigger {
    animation:
      pjTriggerIn 380ms cubic-bezier(.2,.7,.2,1.05) both,
      pjTriggerNudge 4.5s ease-in-out 600ms infinite;
    transition: background 220ms ease, box-shadow 220ms ease;
  }
  .pj-trigger:hover {
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

const S = {
  triggerBtn: {
    position: "fixed" as const,
    right: 22,
    bottom: 22,
    zIndex: 60,
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
    background: "linear-gradient(180deg, #1A0F4D, #0D0536)",
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
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 3,
  } as React.CSSProperties,
  triggerLabelMain: {
    fontSize: 13.5,
    fontWeight: 700,
    letterSpacing: "0.01em",
  } as React.CSSProperties,

  printerWrap: {
    position: "fixed" as const,
    right: 24,
    bottom: 20,
    width: 296,
    zIndex: 60,
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
  } as React.CSSProperties,
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
    color: "rgba(13,5,54,0.55)",
    textAlign: "center" as const,
    margin: "0 0 2px",
    letterSpacing: "0.04em",
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
};
