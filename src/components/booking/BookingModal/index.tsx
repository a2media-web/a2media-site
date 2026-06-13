"use client";

/* BookingModal
   Opens when a visitor clicks "See if We're a Fit" on the Engine card.
   Left panel: Ademola's pitch + EITHER WAY closer.
   Right panel: Cal.com inline embed loading the discovery call event.

   To swap to a dedicated Engine-tier Cal event later, change CAL_URL
   to the new event slug (e.g. "https://cal.com/a2media/engine"). */

import React, { useEffect } from "react";

const DEFAULT_CAL_SLUG = "engine";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Cal event slug after cal.com/a2media/, e.g. "engine" or "meeting". Defaults to "engine". */
  calSlug?: string;
};

export default function BookingModal({ open, onClose, calSlug = DEFAULT_CAL_SLUG }: Props) {
  const CAL_URL = `https://cal.com/a2media/${calSlug}?embed=true&layout=month_view`;
  // Body scroll lock + Escape-to-close while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div style={S.root} role="dialog" aria-modal="true" aria-label="Book your discovery call">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div style={S.backdrop} onClick={onClose} className="bm-fade-in" />
      <div style={S.modal} className="bm-pop">
        <button
          type="button"
          style={S.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="bm-grid" style={S.grid}>
          <aside style={S.left}>
            <div style={S.avatarWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ademola.png" alt="Ademola" style={S.avatar} />
            </div>
            <p style={S.author}>Ademola Adelakun</p>
            <p style={S.role}>Founder, A2 Media</p>
            <h3 style={S.headline}>
              Free 30 minute call. We give you actionable next steps.
            </h3>
            <ul style={S.list}>
              <li style={S.item}>
                <span style={S.bullet}>→</span>
                We stalk you online to see where you&apos;re at.
              </li>
              <li style={S.item}>
                <span style={S.bullet}>→</span>
                You tell us your goals with video.
              </li>
              <li style={S.item}>
                <span style={S.bullet}>→</span>
                We tell you what to do next.
              </li>
            </ul>
            <div style={S.closer}>
              <span style={S.closerEyebrow}>
                <span style={S.closerPulse} className="bm-led" /> Either way
              </span>
              <p style={S.closerLine}>
                <strong style={S.closerStrong}>
                  Even if you don&apos;t sign with us.
                </strong>{" "}
                <span style={S.closerFinish}>
                  We&apos;ll tell you how to choose the right partner.
                </span>
              </p>
            </div>
          </aside>

          <div style={S.right}>
            <iframe
              src={CAL_URL}
              style={S.iframe}
              title="Book a 30-minute discovery call with A2 Media"
              allow="camera; microphone; payment; clipboard-write"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const css = `
  @keyframes bmFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .bm-fade-in { animation: bmFadeIn 220ms ease both; }

  /* The pop-in only fades the content. The size + position transition is
     owned by the BookingProvider's MorphLayer, so we don't want a competing
     scale animation here. */
  @keyframes bmPop {
    from { transform: translate(-50%, -50%); opacity: 0; }
    to   { transform: translate(-50%, -50%); opacity: 1; }
  }
  .bm-pop { animation: bmPop 240ms ease both; }

  @keyframes bmLed {
    0%, 100% { box-shadow: 0 0 8px rgba(143,69,238,0.9); opacity: 1; }
    50%      { box-shadow: 0 0 14px rgba(143,69,238,1); opacity: 0.7; }
  }
  .bm-led { animation: bmLed 1.4s ease-in-out infinite; }

  @media (max-width: 820px) {
    .bm-grid { grid-template-columns: 1fr !important; }
  }
`;

const S = {
  root: {
    position: "fixed" as const,
    inset: 0,
    zIndex: 100,
    fontFamily: "var(--a2-sans)",
  },
  backdrop: {
    position: "absolute" as const,
    inset: 0,
    background: "rgba(7,2,31,0.78)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  } as React.CSSProperties,
  modal: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(880px, calc(100% - 24px))",
    maxHeight: "calc(100vh - 24px)",
    overflow: "auto" as const,
    background: "linear-gradient(180deg, #1A0F4D, #0D0536)",
    border: "1px solid rgba(90,51,255,0.55)",
    borderRadius: 18,
    boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(90,51,255,0.32)",
    color: "#fff",
  } as React.CSSProperties,
  closeBtn: {
    position: "absolute" as const,
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "rgba(255,255,255,0.92)",
    fontSize: 22,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
    zIndex: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    touchAction: "manipulation" as const,
  } as React.CSSProperties,
  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 280px) 1fr",
    gap: 14,
    padding: 14,
  } as React.CSSProperties,

  left: {
    padding: "20px 22px",
    background: "rgba(255,255,255,0.04)",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,
  avatarWrap: {
    width: 60,
    height: 60,
    borderRadius: 999,
    overflow: "hidden",
    border: "2px solid #5A33FF",
    marginBottom: 8,
  } as React.CSSProperties,
  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    display: "block",
  } as React.CSSProperties,
  author: {
    fontSize: 13,
    fontWeight: 800,
    color: "#fff",
    margin: 0,
    letterSpacing: "0.02em",
  } as React.CSSProperties,
  role: {
    fontSize: 11.5,
    fontWeight: 600,
    color: "rgba(255,255,255,0.55)",
    margin: 0,
    letterSpacing: "0.04em",
  } as React.CSSProperties,
  headline: {
    fontSize: 18,
    fontWeight: 800,
    color: "#fff",
    margin: "12px 0 14px",
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  } as React.CSSProperties,
  headlineItalic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    fontWeight: 500,
    color: "#8F45EE",
  } as React.CSSProperties,
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: 9,
  } as React.CSSProperties,
  item: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    fontSize: 12.5,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.45,
  } as React.CSSProperties,
  bullet: {
    color: "#8F45EE",
    fontWeight: 800,
    flexShrink: 0,
  } as React.CSSProperties,

  closer: {
    marginTop: "auto",
    padding: "12px 14px",
    background: "rgba(143,69,238,0.12)",
    border: "1px solid rgba(143,69,238,0.4)",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,
  closerEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#8F45EE",
  } as React.CSSProperties,
  closerPulse: {
    display: "inline-block",
    width: 7,
    height: 7,
    borderRadius: 999,
    background: "#8F45EE",
  } as React.CSSProperties,
  closerLine: {
    fontSize: 13,
    lineHeight: 1.45,
    color: "rgba(255,255,255,0.88)",
    margin: 0,
  } as React.CSSProperties,
  closerStrong: {
    color: "#fff",
    fontWeight: 800,
  } as React.CSSProperties,
  closerFinish: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    fontWeight: 500,
    color: "#66F78E",
  } as React.CSSProperties,

  right: {
    borderRadius: 14,
    overflow: "hidden" as const,
    background: "#fff",
    minHeight: 460,
  } as React.CSSProperties,
  iframe: {
    width: "100%",
    height: 460,
    minHeight: 460,
    border: "none",
    display: "block",
  } as React.CSSProperties,
};
