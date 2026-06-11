"use client";

import React from "react";
import styles from "./Guarantee.module.css";

const PURPLE = "#5A33FF";
const NEON = "#66F78E";

export default function Guarantee() {
  return (
    <section id="Guarantee" className={styles.section}>
      <style dangerouslySetInnerHTML={{ __html: shieldCss }} />
      <div className={styles.inner} style={{ textAlign: "center" }}>
        <div style={S.banner}>
          <span className="g-ring" style={S.ring} aria-hidden />
          <svg
            viewBox="0 0 64 72"
            width="58"
            height="66"
            style={S.svg}
            aria-hidden
          >
            <path
              className="g-shield-fill"
              d="M32 4 L58 13 V36 C58 53 46 64 32 69 C18 64 6 53 6 36 V13 Z"
              fill="rgba(90,51,255,0.28)"
              stroke="none"
            />
            <path
              className="g-shield-stroke"
              d="M32 4 L58 13 V36 C58 53 46 64 32 69 C18 64 6 53 6 36 V13 Z"
              fill="none"
              stroke={PURPLE}
              strokeWidth="3"
              strokeLinejoin="round"
              pathLength={1}
            />
            <path
              className="g-check-stroke"
              d="M21 36 L29 45 L44 26"
              fill="none"
              stroke={NEON}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
            />
          </svg>

          <span style={S.text}>
            <strong style={S.textStrong}>The A2 Guarantee.</strong>{" "}
            If we don&apos;t hit our agreed goal by contract end, we keep
            working with you <span style={S.free}>for free</span> until we do.
          </span>

          <span className="g-sheen" style={S.sheen} aria-hidden />
        </div>
      </div>
    </section>
  );
}

const shieldCss = `
  .g-shield-stroke {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: gShieldDraw 7s ease-in-out infinite;
  }
  @keyframes gShieldDraw {
    0%        { stroke-dashoffset: 1; }
    6%        { stroke-dashoffset: 1; }
    34%       { stroke-dashoffset: 0; }
    88%       { stroke-dashoffset: 0; }
    96%, 100% { stroke-dashoffset: 1; }
  }
  .g-check-stroke {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: gCheckDraw 7s cubic-bezier(.5,0,.3,1) infinite;
  }
  @keyframes gCheckDraw {
    0%, 32%   { stroke-dashoffset: 1; }
    46%       { stroke-dashoffset: 0; }
    88%       { stroke-dashoffset: 0; }
    96%, 100% { stroke-dashoffset: 1; }
  }
  .g-shield-fill { animation: gShieldFill 7s ease-in-out infinite; }
  @keyframes gShieldFill {
    0%, 40%   { opacity: 0; }
    52%       { opacity: 1; }
    70%       { opacity: .55; }
    82%       { opacity: 1; }
    92%, 100% { opacity: 0; }
  }
  .g-ring { animation: gRingPulse 7s ease-out infinite; }
  @keyframes gRingPulse {
    0%, 44%   { opacity: 0; transform: scale(.6); }
    50%       { opacity: .8; transform: scale(.8); }
    72%       { opacity: 0; transform: scale(1.9); }
    100%      { opacity: 0; transform: scale(1.9); }
  }
  .g-sheen { animation: gSheenSweep 7s ease-in-out infinite; }
  @keyframes gSheenSweep {
    0%, 52%   { transform: translateX(-130%) skewX(-18deg); opacity: 0; }
    56%       { opacity: 1; }
    78%       { transform: translateX(330%) skewX(-18deg); opacity: 1; }
    79%, 100% { transform: translateX(330%) skewX(-18deg); opacity: 0; }
  }
  @media (max-width: 720px) {
    .g-banner-inline { flex-direction: column; gap: 12px; padding: 22px 22px; }
  }
`;

const S = {
  banner: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: 22,
    maxWidth: 760,
    textAlign: "left",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(90,51,255,0.45)",
    borderRadius: 20,
    padding: "26px 32px",
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(90,51,255,0.22)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  } as React.CSSProperties,
  ring: {
    position: "absolute",
    left: 34,
    top: "50%",
    width: 58,
    height: 58,
    marginTop: -29,
    borderRadius: 999,
    border: `2px solid ${PURPLE}`,
    pointerEvents: "none",
  } as React.CSSProperties,
  svg: {
    flexShrink: 0,
    filter: "drop-shadow(0 0 18px rgba(90,51,255,0.55))",
  } as React.CSSProperties,
  text: {
    fontSize: 16.5,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.85)",
  } as React.CSSProperties,
  textStrong: {
    color: "#FFFFFF",
    fontWeight: 800,
  } as React.CSSProperties,
  free: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    color: NEON,
  } as React.CSSProperties,
  sheen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "34%",
    background:
      "linear-gradient(100deg, transparent, rgba(255,255,255,0.1), transparent)",
    pointerEvents: "none",
  } as React.CSSProperties,
};
