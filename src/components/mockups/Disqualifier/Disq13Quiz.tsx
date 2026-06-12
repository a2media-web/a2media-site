"use client";

/* Disqualifier · Variant 13 — The Quiz Gate
   3 yes/no questions. Any no ends the flow. All yes unlocks the CTA.
   Psych hook: gamified self-qualification + earned CTA. */

import React, { useState } from "react";

const QUESTIONS = [
  {
    q: "Are you above $2M ARR?",
    no: "We work with companies past the early-stage chaos. Come back when you cross $2M.",
  },
  {
    q: "Do you have a marketing team that can act on strategy?",
    no: "We hand off strategy. Without a team to run it, the work stalls. Come back when you have one.",
  },
  {
    q: "Are you done with one-off videos, ready for a system?",
    no: "We do not do one-offs. We build the engine. If you only need one cut, hire a freelancer.",
  },
];

export default function Disq13Quiz() {
  const [step, setStep] = useState(0);
  const [failed, setFailed] = useState<number | null>(null);
  const [passed, setPassed] = useState(false);

  function reset() {
    setStep(0);
    setFailed(null);
    setPassed(false);
  }
  function answer(yes: boolean) {
    if (!yes) { setFailed(step); return; }
    if (step + 1 === QUESTIONS.length) { setPassed(true); return; }
    setStep(step + 1);
  }

  const inFlow = failed === null && !passed;

  return (
    <section style={S.shell}>
      <div style={S.inner}>
        <span style={S.eyebrow}>3 questions</span>
        <h2 style={S.h2}>
          Should you <span style={S.accent}>even book?</span>
        </h2>
        <p style={S.lede}>
          Three yes-or-no questions. Any no, the flow ends. Three yes, the
          booking page reveals.
        </p>

        <div style={S.card}>
          {inFlow && (
            <>
              <div style={S.progressRow}>
                {QUESTIONS.map((_, i) => (
                  <span key={i} style={i <= step ? S.dotOn : S.dotOff} />
                ))}
              </div>
              <p style={S.qLabel}>Question {step + 1} of {QUESTIONS.length}</p>
              <h3 style={S.qText}>{QUESTIONS[step].q}</h3>
              <div style={S.btnRow}>
                <button type="button" onClick={() => answer(true)} style={S.btnYes}>Yes</button>
                <button type="button" onClick={() => answer(false)} style={S.btnNo}>No</button>
              </div>
            </>
          )}

          {failed !== null && (
            <>
              <div style={S.failTag}>NOT A FIT YET</div>
              <p style={S.failText}>{QUESTIONS[failed].no}</p>
              <a href="#" style={S.softLink}>
                Take the 6-month video roadmap PDF instead →
              </a>
              <button type="button" onClick={reset} style={S.resetBtn}>Start over</button>
            </>
          )}

          {passed && (
            <>
              <div style={S.passTag}>YOU QUALIFY</div>
              <h3 style={S.passTitle}>OK. You are our fit.</h3>
              <p style={S.passSub}>
                Three yes answers. The call will be fast and specific.
              </p>
              <a href="#" style={S.cta}>
                Book the discovery call <span aria-hidden>→</span>
              </a>
              <button type="button" onClick={reset} style={S.resetBtn}>Start over</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

const S = {
  shell: { background: "#0d0536", color: "#fff", padding: "clamp(72px,9vw,128px) 24px", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  inner: { maxWidth: 720, margin: "0 auto", textAlign: "center" } as React.CSSProperties,
  eyebrow: { display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a33ff", marginBottom: 18 } as React.CSSProperties,
  h2: { fontSize: "clamp(34px,4.6vw,54px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 18px" } as React.CSSProperties,
  accent: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#5a33ff" } as React.CSSProperties,
  lede: { fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 540, margin: "0 auto 40px", lineHeight: 1.6 } as React.CSSProperties,
  card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 22, padding: "36px 32px", minHeight: 320, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" } as React.CSSProperties,
  progressRow: { display: "flex", gap: 8, marginBottom: 18 } as React.CSSProperties,
  dotOn: { width: 22, height: 6, borderRadius: 999, background: "#5a33ff" } as React.CSSProperties,
  dotOff: { width: 22, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.12)" } as React.CSSProperties,
  qLabel: { fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 14 } as React.CSSProperties,
  qText: { fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "#fff", lineHeight: 1.3, margin: "0 0 32px", maxWidth: 520 } as React.CSSProperties,
  btnRow: { display: "flex", gap: 14 } as React.CSSProperties,
  btnYes: { padding: "14px 38px", background: "#5a33ff", color: "#fff", border: "none", borderRadius: 999, fontSize: 16, fontWeight: 700, cursor: "pointer", minWidth: 130, boxShadow: "0 8px 24px rgba(90,51,255,0.4)" } as React.CSSProperties,
  btnNo: { padding: "14px 38px", background: "transparent", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 999, fontSize: 16, fontWeight: 700, cursor: "pointer", minWidth: 130 } as React.CSSProperties,
  failTag: { fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", color: "#ff5e7a", padding: "5px 14px", border: "1px solid rgba(255,94,122,0.4)", borderRadius: 999, marginBottom: 20 } as React.CSSProperties,
  failText: { fontSize: 17, color: "#fff", lineHeight: 1.55, maxWidth: 540, margin: "0 0 24px" } as React.CSSProperties,
  softLink: { fontSize: 14, color: "#66f78e", textDecoration: "none", fontWeight: 600, marginBottom: 22 } as React.CSSProperties,
  passTag: { fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", color: "#66f78e", padding: "5px 14px", border: "1px solid rgba(102,247,142,0.45)", borderRadius: 999, marginBottom: 18 } as React.CSSProperties,
  passTitle: { fontSize: "clamp(26px,3.4vw,36px)", fontWeight: 700, color: "#fff", margin: "0 0 12px" } as React.CSSProperties,
  passSub: { fontSize: 15, color: "rgba(255,255,255,0.75)", marginBottom: 26, maxWidth: 460 } as React.CSSProperties,
  cta: { display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 34px", background: "#5a33ff", color: "#fff", fontSize: 16, fontWeight: 600, borderRadius: 999, textDecoration: "none", boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(90,51,255,0.45)" } as React.CSSProperties,
  resetBtn: { marginTop: 18, padding: "8px 14px", background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
};
