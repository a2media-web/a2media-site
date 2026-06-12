"use client";

/* Mockup: /mockups/fit-form
   Three takes on the "See if We're a Fit" application form.

   Hormozi $100M Leads: high-ticket sales should be applications, not
   raw calendar links. The form should pre-qualify (saves call time +
   reinforces "we're choosy" positioning) without being so long it
   kills completion. His sweet spot is 5-7 questions.

   Variant 01 - The Quick Fit (5 questions, single page)
   Variant 02 - The Step-by-Step (5 questions, one per screen)
   Variant 03 - The Application (7 questions, premium framing)
*/

import React, { useState } from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";

export default function FitFormMockups() {
  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header style={S.frameHeader}>
        <span style={S.frameTag}>See if We&apos;re a Fit · Form options</span>
        <h2 style={S.frameTitle}>Pick the form that pre-qualifies without scaring them off</h2>
        <p style={S.frameNotes}>
          Three takes on the application form behind the &ldquo;See if
          We&apos;re a Fit&rdquo; button. Same 5-question core, three
          different friction levels and visual treatments. Short single-
          page, step-by-step (one question per screen), and a longer
          premium application. Each shows the form in its real surface
          treatment, including what happens after submit.
        </p>
      </header>

      <Demo
        tag="Variant 01 · The Quick Fit"
        title="Single page. 5 questions. Lowest friction."
        notes="One screen, five inputs, big button. Hormozi minimum. Highest completion rate. Best when you want to keep the funnel open and let the discovery call do the qualifying. Reveals the Cal link inline on submit."
      >
        <QuickFit />
      </Demo>

      <Demo
        tag="Variant 02 · The Step-by-Step"
        title="One question per screen. Feels easy."
        notes="Same 5 questions, but one at a time with a progress bar and a single big input per screen. Feels less daunting than a single-page form even though it's the same content. Premium consultation feel. Best for pushing higher-intent applicants to finish."
      >
        <StepByStep />
      </Demo>

      <Demo
        tag="Variant 03 · The Application"
        title="7 questions. Premium framing. Highest filter."
        notes="Reframed as 'Apply to work with A2.' Two extra questions tighten the filter and the framing itself raises the perceived bar. Best when you want the highest lead quality, not the highest count. Hormozi-style 'application' move."
      >
        <Application />
      </Demo>

      <p style={S.footnote}>
        Live wiring: the form lives at /apply. On submit it posts to your
        Kit/Notion/Tally endpoint and reveals the Cal link inline. No
        calendar link is exposed anywhere on the site outside this flow.
      </p>
    </main>
  );
}

/* ============================================================ */
/*  Demo card                                                   */
/* ============================================================ */

function Demo({
  tag,
  title,
  notes,
  children,
}: {
  tag: string;
  title: string;
  notes: string;
  children: React.ReactNode;
}) {
  return (
    <section style={S.demoCard}>
      <div style={S.demoHead}>
        <span style={S.demoTag}>{tag}</span>
        <h3 style={S.demoTitle}>{title}</h3>
        <p style={S.demoNotes}>{notes}</p>
      </div>
      <div style={S.demoStage}>{children}</div>
    </section>
  );
}

/* ============================================================ */
/*  Shared form atoms                                           */
/* ============================================================ */

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <label style={S.label}>
      <span style={S.labelMain}>{children}</span>
      {hint && <span style={S.labelHint}>{hint}</span>}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ ...S.input, ...(props.style || {}) }} />;
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) {
  const { options, ...rest } = props;
  return (
    <select {...rest} style={{ ...S.select, ...(props.style || {}) }} defaultValue="">
      <option value="" disabled>
        Pick one...
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ ...S.textarea, ...(props.style || {}) }} />;
}

function PrimaryBtn({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={`pj-cta ${rest.className || ""}`} style={S.primaryBtn}>
      {children}
    </button>
  );
}

/* ============================================================ */
/*  Variant 01 · Quick Fit                                      */
/* ============================================================ */

function QuickFit() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={S.formShell}>
      <div style={S.formInner}>
        {!submitted ? (
          <>
            <span style={S.formEyebrow}>5 questions · 90 seconds</span>
            <h3 style={S.formH}>
              See if we&apos;re a fit. <em style={S.formHItalic}>You first.</em>
            </h3>
            <p style={S.formSub}>
              We work with 8 clients at a time. These five answers tell us
              whether to send you the Cal link or politely pass.
            </p>

            <form
              style={S.formGrid}
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <Label>Your name + company</Label>
              <Input placeholder="Sam at Acme" required />

              <Label>Work email</Label>
              <Input type="email" placeholder="sam@acme.com" required />

              <Label>Approximate ARR</Label>
              <Select
                required
                options={[
                  "Under $1M",
                  "$1M to $5M",
                  "$5M to $20M",
                  "$20M to $50M",
                  "$50M+",
                ]}
              />

              <Label>How are you doing video today?</Label>
              <Select
                required
                options={[
                  "Nothing yet",
                  "Freelancers / contractors",
                  "Small in-house team",
                  "Full in-house team",
                  "Other agency",
                ]}
              />

              <Label>Your 6-month goal</Label>
              <Textarea
                rows={3}
                placeholder="One or two sentences. Pipeline, awareness, close-rate, etc."
                required
              />

              <PrimaryBtn type="submit">
                See if we&apos;re a fit <span aria-hidden>→</span>
              </PrimaryBtn>
              <p style={S.microNote}>
                We read every application within 24 hours. If we&apos;re a
                fit we send a Cal link. If not, we tell you why.
              </p>
            </form>
          </>
        ) : (
          <SuccessState />
        )}
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Variant 02 · Step-by-step                                   */
/* ============================================================ */

const STEPS = [
  {
    label: "Your name + company",
    hint: "How should we say hi?",
    input: <Input placeholder="Sam at Acme" autoFocus />,
  },
  {
    label: "Approximate ARR",
    hint: "Helps us scope the right plan",
    input: (
      <Select
        options={[
          "Under $1M",
          "$1M to $5M",
          "$5M to $20M",
          "$20M to $50M",
          "$50M+",
        ]}
      />
    ),
  },
  {
    label: "How are you doing video today?",
    hint: "We need to know what we're replacing",
    input: (
      <Select
        options={[
          "Nothing yet",
          "Freelancers / contractors",
          "Small in-house team",
          "Full in-house team",
          "Other agency",
        ]}
      />
    ),
  },
  {
    label: "Your 6-month goal",
    hint: "One or two sentences",
    input: <Textarea rows={3} placeholder="Pipeline, close-rate, awareness, etc." />,
  },
  {
    label: "Work email",
    hint: "We'll respond within 24 hours",
    input: <Input type="email" placeholder="sam@acme.com" />,
  },
];

function StepByStep() {
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const total = STEPS.length;
  const pct = ((idx + 1) / total) * 100;

  if (done) {
    return (
      <div style={S.formShell}>
        <div style={S.formInner}>
          <SuccessState />
        </div>
      </div>
    );
  }

  const step = STEPS[idx];
  return (
    <div style={S.formShell}>
      <div style={{ ...S.formInner, paddingTop: 28 }}>
        <div style={S.progressTrack}>
          <div style={{ ...S.progressFill, width: `${pct}%` }} />
        </div>
        <p style={S.stepCount}>
          Question {idx + 1} of {total}
        </p>

        <h3 style={S.formH}>{step.label}</h3>
        <p style={S.formSub}>{step.hint}</p>

        <div style={S.stepInputWrap}>{step.input}</div>

        <div style={S.stepNav}>
          <button
            type="button"
            style={S.ghostBtn}
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
          >
            Back
          </button>
          <PrimaryBtn
            type="button"
            onClick={() => (idx + 1 === total ? setDone(true) : setIdx(idx + 1))}
          >
            {idx + 1 === total ? "Submit" : "Next"}{" "}
            <span aria-hidden>→</span>
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Variant 03 · Application                                    */
/* ============================================================ */

function Application() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={S.formShell}>
      <div style={S.formInner}>
        {!submitted ? (
          <>
            <span style={{ ...S.formEyebrow, color: NEON }}>Apply</span>
            <h3 style={S.formH}>
              Apply to work with A2.{" "}
              <em style={S.formHItalic}>7 questions, 3 minutes.</em>
            </h3>
            <p style={S.formSub}>
              We pick 6 clients per quarter. The application below is how we
              decide who we send a Cal link to.
            </p>

            <form
              style={S.formGrid}
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <Label>Your name + company</Label>
              <Input placeholder="Sam at Acme" required />

              <Label>Work email</Label>
              <Input type="email" placeholder="sam@acme.com" required />

              <Label>Approximate ARR</Label>
              <Select
                required
                options={[
                  "Under $1M",
                  "$1M to $5M",
                  "$5M to $20M",
                  "$20M to $50M",
                  "$50M+",
                ]}
              />

              <Label>How are you doing video today?</Label>
              <Select
                required
                options={[
                  "Nothing yet",
                  "Freelancers / contractors",
                  "Small in-house team",
                  "Full in-house team",
                  "Other agency",
                ]}
              />

              <Label>Your 6-month goal</Label>
              <Textarea
                rows={2}
                placeholder="Pipeline, close-rate, awareness, etc."
                required
              />

              <Label>Monthly content budget</Label>
              <Select
                required
                options={[
                  "Under $5K",
                  "$5K to $10K",
                  "$10K to $20K",
                  "$20K to $50K",
                  "$50K+",
                ]}
              />

              <Label hint="Helps us prepare for the call">Anything we should know before we look at your application?</Label>
              <Textarea rows={2} placeholder="Optional. Free-form." />

              <PrimaryBtn type="submit">
                Submit application <span aria-hidden>→</span>
              </PrimaryBtn>
              <p style={S.microNote}>
                We read every application within 24 hours. Applicants we
                accept get a Cal link to a 30-minute strategy call.
                Applicants we don&apos;t still get a one-paragraph reason.
              </p>
            </form>
          </>
        ) : (
          <SuccessState mode="application" />
        )}
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Success / Cal-link reveal                                   */
/* ============================================================ */

function SuccessState({ mode = "form" }: { mode?: "form" | "application" }) {
  return (
    <div style={S.successWrap}>
      <span style={S.successCheck}>✓</span>
      <h3 style={S.successH}>
        {mode === "application" ? "Application in." : "We got it."}
      </h3>
      <p style={S.successSub}>
        {mode === "application"
          ? "We read every application within 24 hours. If you're a fit, the Cal link below is your next step."
          : "Quick yes from us. Pick a time below."}
      </p>
      <a href="#" style={S.calLink} className="pj-cta">
        Book your 30-minute call <span aria-hidden>→</span>
      </a>
      <p style={S.microNote}>
        Free 30-minute strategy call. No pitch. You leave with a direction
        for your video either way.
      </p>
    </div>
  );
}

/* ============================================================ */
/*  Styles + keyframes                                          */
/* ============================================================ */

const css = `
  @keyframes pjCtaPulse {
    0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 10px 28px rgba(90,51,255,0.45); }
    50%      { box-shadow: 0 0 0 1px rgba(255,255,255,0.14), 0 14px 40px rgba(143,69,238,0.6); }
  }
  .pj-cta { animation: pjCtaPulse 2.6s ease-in-out infinite; transition: transform 220ms ease; }
  .pj-cta:hover { transform: translateY(-1px); }
`;

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
    color: LILAC,
    border: `1px solid ${LILAC}80`,
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
    maxWidth: 740,
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
    maxWidth: 820,
  } as React.CSSProperties,
  demoStage: {
    padding: "32px 28px 36px",
    background: NIGHT,
    margin: 20,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties,

  /* form */
  formShell: {
    maxWidth: 560,
    margin: "0 auto",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(90,51,255,0.32)",
    borderRadius: 20,
    boxShadow: "0 30px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
  } as React.CSSProperties,
  formInner: { padding: "34px 34px 30px" } as React.CSSProperties,
  formEyebrow: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: PURPLE,
    marginBottom: 12,
  } as React.CSSProperties,
  formH: {
    fontSize: 26,
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 10px",
    lineHeight: 1.15,
    letterSpacing: "-0.015em",
  } as React.CSSProperties,
  formHItalic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    fontWeight: 500,
    color: LILAC,
  } as React.CSSProperties,
  formSub: {
    fontSize: 14,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.7)",
    margin: "0 0 24px",
  } as React.CSSProperties,
  formGrid: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  } as React.CSSProperties,
  label: { display: "flex", flexDirection: "column" as const, gap: 4, marginTop: 6 } as React.CSSProperties,
  labelMain: {
    fontSize: 13.5,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "0.01em",
  } as React.CSSProperties,
  labelHint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 14.5,
    fontFamily: "var(--a2-sans)",
    outline: "none",
  } as React.CSSProperties,
  select: {
    width: "100%",
    padding: "12px 14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 14.5,
    fontFamily: "var(--a2-sans)",
    appearance: "none" as const,
  } as React.CSSProperties,
  textarea: {
    width: "100%",
    padding: "12px 14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 14.5,
    fontFamily: "var(--a2-sans)",
    resize: "vertical" as const,
    outline: "none",
  } as React.CSSProperties,
  primaryBtn: {
    marginTop: 14,
    padding: "14px 20px",
    background: PURPLE,
    color: "#fff",
    border: "none",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 15,
    fontFamily: "var(--a2-sans)",
    cursor: "pointer",
  } as React.CSSProperties,
  ghostBtn: {
    padding: "12px 22px",
    background: "transparent",
    color: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  microNote: {
    fontSize: 11.5,
    color: "rgba(255,255,255,0.42)",
    margin: "10px 0 0",
    lineHeight: 1.5,
  } as React.CSSProperties,

  /* step-by-step */
  progressTrack: {
    height: 4,
    width: "100%",
    background: "rgba(255,255,255,0.08)",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 14,
  } as React.CSSProperties,
  progressFill: {
    height: "100%",
    background: `linear-gradient(90deg, ${PURPLE}, ${LILAC})`,
    transition: "width 280ms ease",
  } as React.CSSProperties,
  stepCount: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.5)",
    margin: "0 0 16px",
  } as React.CSSProperties,
  stepInputWrap: { margin: "20px 0 24px" } as React.CSSProperties,
  stepNav: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
  } as React.CSSProperties,

  /* success */
  successWrap: {
    textAlign: "center" as const,
    padding: "12px 6px",
  } as React.CSSProperties,
  successCheck: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 52,
    borderRadius: 999,
    background: `${NEON}30`,
    border: `2px solid ${NEON}`,
    color: NEON,
    fontSize: 26,
    fontWeight: 800,
    marginBottom: 18,
  } as React.CSSProperties,
  successH: {
    fontSize: 24,
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 10px",
  } as React.CSSProperties,
  successSub: {
    fontSize: 14,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.7)",
    margin: "0 0 22px",
    maxWidth: 380,
    marginInline: "auto",
  } as React.CSSProperties,
  calLink: {
    display: "inline-block",
    padding: "14px 24px",
    background: PURPLE,
    color: "#fff",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 15,
    textDecoration: "none",
  } as React.CSSProperties,

  footnote: {
    maxWidth: 1100,
    margin: "30px auto 0",
    padding: "0 28px",
    fontSize: 12.5,
    color: "rgba(255,255,255,0.42)",
    fontFamily: "var(--a2-sans)",
    textAlign: "center" as const,
  } as React.CSSProperties,
};
