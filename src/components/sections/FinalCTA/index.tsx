"use client";

import React from "react";
import { useBookingModal } from "@/components/booking/BookingProvider";

const AVATARS = [
  "https://cdn.prod.website-files.com/64bfb907363259218e796320/69921f28dfc62947225c4c99_1770923418055.png",
  "https://cdn.prod.website-files.com/64bfb907363259218e796320/69921f286dce40d7485b4d3a_1767315543111.jpeg",
  "https://cdn.prod.website-files.com/64bfb907363259218e796320/69921f287ead7017925ff94f_1735224274497.jpeg",
  "https://cdn.prod.website-files.com/64bfb907363259218e796320/69921f28c84070bd03569d5d_1747749050965.jpeg",
  "https://cdn.prod.website-files.com/64bfb907363259218e796320/67f4361b24f74f27e5a2a996_1719406706007-p-130x130q80.jpeg",
];

const STEPS = [
  {
    label: "Before the call",
    body: "We watch what you've already published and look at how you sell. You prep nothing.",
  },
  {
    label: "On the call",
    body: "We spend 30 minutes figuring out what you've tried, and what you should do next.",
  },
  {
    label: "After the call",
    body: "You leave with a clear direction. Run it with us or run it in-house.",
  },
];

export default function FinalCTA() {
  const { open } = useBookingModal();
  return (
    <section style={S.section}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div style={S.glowA} aria-hidden />
      <div style={S.glowB} aria-hidden />

      <div style={S.inner}>
        <div style={S.proofRow}>
          <div style={S.avatars}>
            {AVATARS.map((src, i) => (
              <span key={i} style={S.avatar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" style={S.avatarImg} />
              </span>
            ))}
          </div>
          <p style={S.proof}>
            <strong style={S.proofStrong}>25+ B2B teams</strong> already building
            trust through video.
          </p>
        </div>

        <div style={S.scrubWrap} aria-hidden>
          <div style={S.scrubLabels}>
            <span>a2media.ca · 100% watched</span>
            <span style={S.scrubRight}>00:00 left</span>
          </div>
          <div style={S.scrubTrack}>
            <div style={S.scrubFill} />
            <div style={S.playhead}>
              <span style={S.playheadHandle} />
            </div>
          </div>
        </div>

        <h2 style={S.title}>You&apos;re just one conversation away.</h2>

        <p style={S.sub}>
          It starts with one call. We look at how you sell, tell you where
          video fits, and show you the first thing we&apos;d cut for you.
        </p>

        <div style={S.ctaBlock}>
          <button
            type="button"
            className="fcta-btn"
            style={{ ...S.btn, cursor: "pointer", fontFamily: "inherit", border: "none" }}
            onClick={() => open("meeting")}
          >
            Book the call{" "}
            <span className="fcta-arrow" aria-hidden>
              →
            </span>
          </button>
          <p style={S.micro}>Free · 30 minutes</p>
        </div>

        <div style={S.stepsWrap}>
          <p style={S.stepsLabel}>What happens when you book</p>
          <div className="fcta-steps">
            {STEPS.map((s, i) => (
              <div key={s.label} className="fcta-step" style={S.step}>
                <span style={S.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                <p style={S.stepLabel}>{s.label}</p>
                <p style={S.stepBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={S.signoff}>
          <span style={S.signPhoto}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ademola.png"
              alt="Ademola, Founder of A2 Media"
              style={S.signPhotoImg}
            />
          </span>
          <p style={S.signLine}>
            <em>
              Worst case, you leave with a free plan and a good conversation.
            </em>
          </p>
          <p style={S.signName}>Ademola · Founder, A2 Media</p>
        </div>
      </div>
    </section>
  );
}

const css = `
  .fcta-btn { transition: transform .25s ease, background .25s ease, box-shadow .25s ease; }
  .fcta-btn:hover {
    transform: translateY(-2px);
    background: #8F45EE;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.14), 0 22px 70px rgba(143,69,238,0.6), 0 0 110px rgba(90,51,255,0.35);
  }
  .fcta-arrow { display: inline-block; transition: transform .25s ease; }
  .fcta-btn:hover .fcta-arrow { transform: translateX(4px); }
  .fcta-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; text-align: left; }
  .fcta-step { transition: border-color .25s ease, background .25s ease; }
  .fcta-step:hover { border-color: rgba(90,51,255,0.55); background: rgba(90,51,255,0.09); }
  @media (max-width: 760px) {
    .fcta-steps { grid-template-columns: 1fr; }
  }
`;

const S = {
  section: {
    position: "relative",
    background: "#0D0536",
    color: "#FFFFFF",
    fontFamily: "var(--a2-sans)",
    padding: "104px 24px 96px",
    overflow: "hidden",
  } as React.CSSProperties,
  glowA: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(70% 55% at 50% 18%, rgba(90,51,255,0.26), transparent 70%)",
    pointerEvents: "none",
  } as React.CSSProperties,
  glowB: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(55% 40% at 18% 100%, rgba(143,69,238,0.14), transparent 70%)",
    pointerEvents: "none",
  } as React.CSSProperties,

  inner: {
    position: "relative",
    maxWidth: 880,
    margin: "0 auto",
    textAlign: "center",
  } as React.CSSProperties,

  proofRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 14,
    padding: "8px 18px 8px 10px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 999,
    margin: "0 auto 36px",
    backdropFilter: "blur(8px)",
  } as React.CSSProperties,
  avatars: { display: "inline-flex", paddingLeft: 8 } as React.CSSProperties,
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 999,
    overflow: "hidden",
    border: "2px solid #0D0536",
    marginLeft: -8,
    background: "#1a1148",
    display: "inline-block",
  } as React.CSSProperties,
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  } as React.CSSProperties,
  proof: {
    fontSize: 13.5,
    color: "rgba(255,255,255,0.78)",
    margin: 0,
    lineHeight: 1.4,
  } as React.CSSProperties,
  proofStrong: { color: "#FFFFFF", fontWeight: 700 } as React.CSSProperties,

  scrubWrap: { maxWidth: 620, margin: "0 auto 60px" } as React.CSSProperties,
  scrubLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.42)",
    marginBottom: 10,
  } as React.CSSProperties,
  scrubRight: { color: "rgba(102,247,142,0.85)" } as React.CSSProperties,
  scrubTrack: {
    position: "relative",
    height: 4,
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
  } as React.CSSProperties,
  scrubFill: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
    background:
      "linear-gradient(90deg, rgba(90,51,255,0.35) 0%, #5A33FF 65%, #8F45EE 100%)",
  } as React.CSSProperties,
  playhead: {
    position: "absolute",
    right: -1,
    top: "50%",
    transform: "translateY(-50%)",
    width: 2,
    height: 20,
    background: "#66F78E",
    boxShadow: "0 0 14px rgba(102,247,142,0.8)",
  } as React.CSSProperties,
  playheadHandle: {
    position: "absolute",
    top: -8,
    left: "50%",
    transform: "translateX(-50%)",
    width: 9,
    height: 9,
    borderRadius: 999,
    background: "#66F78E",
    boxShadow: "0 0 12px rgba(102,247,142,0.9)",
    display: "block",
  } as React.CSSProperties,

  title: {
    fontSize: "clamp(28px, 4.4vw, 54px)",
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "-0.025em",
    margin: "0 auto 22px",
    color: "#FFFFFF",
    maxWidth: 760,
    textWrap: "balance",
  } as React.CSSProperties,

  sub: {
    fontSize: 17.5,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.72)",
    maxWidth: 540,
    margin: "0 auto 46px",
  } as React.CSSProperties,

  ctaBlock: { marginBottom: 76 } as React.CSSProperties,
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    padding: "22px 52px",
    background: "#5A33FF",
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: 700,
    borderRadius: 999,
    textDecoration: "none",
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.1), 0 18px 60px rgba(90,51,255,0.55), 0 0 90px rgba(90,51,255,0.3)",
  } as React.CSSProperties,
  micro: {
    marginTop: 18,
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "0.02em",
  } as React.CSSProperties,

  stepsWrap: { maxWidth: 820, margin: "0 auto" } as React.CSSProperties,
  stepsLabel: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#FFFFFF",
    marginBottom: 18,
  } as React.CSSProperties,
  step: {
    background: "rgba(255,255,255,0.045)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderLeft: "3px solid #5A33FF",
    borderRadius: 16,
    padding: "20px 22px 22px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  } as React.CSSProperties,
  stepNum: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.14em",
    color: "#8F45EE",
  } as React.CSSProperties,
  stepLabel: {
    fontSize: 15,
    fontWeight: 700,
    color: "#FFFFFF",
    margin: "8px 0 6px",
  } as React.CSSProperties,
  stepBody: {
    fontSize: 13.5,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.62)",
    margin: 0,
  } as React.CSSProperties,

  signoff: {
    marginTop: 76,
    paddingTop: 44,
    borderTop: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties,
  signPhoto: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    borderRadius: 999,
    overflow: "hidden",
    border: "2px solid rgba(255,255,255,0.18)",
    background: "linear-gradient(135deg, #5A33FF 0%, #8F45EE 100%)",
    boxShadow: "0 8px 30px rgba(90,51,255,0.45)",
  } as React.CSSProperties,
  signPhotoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  } as React.CSSProperties,
  signLine: {
    fontFamily: "var(--a2-display)",
    fontSize: "clamp(15px, 1.8vw, 22px)",
    lineHeight: 1.45,
    color: "rgba(255,255,255,0.9)",
    margin: "18px auto 12px",
    maxWidth: 620,
    textWrap: "balance",
    padding: "0 12px",
  } as React.CSSProperties,
  signName: {
    fontSize: 12.5,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#FFFFFF",
    margin: 0,
  } as React.CSSProperties,
};
