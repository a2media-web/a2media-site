"use client";

/* Mockup: /mockups/fit-success-branches
   What the visitor sees AFTER they submit the /apply form.
   Three branches based on ARR + budget:

   A · High-fit  -> inline Cal embed on the success screen
   B · Mid-fit   -> "we respond within 24 hours" + what-to-expect
   C · Wrong fit -> DIY playbook + nurture email capture (helped, not rejected)
*/

import React, { useState } from "react";

const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";

export default function FitSuccessBranchesMockup() {
  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header style={S.frameHeader}>
        <span style={S.frameTag}>
          /apply success states · conditional routing
        </span>
        <h2 style={S.frameTitle}>
          Three different success screens based on fit
        </h2>
        <p style={S.frameNotes}>
          When the visitor submits the /apply form, the server reads their
          ARR + budget answers and routes them to one of three success
          screens. High-fit goes straight to a Cal embed (book the call in
          the same page-load they applied in). Mid-fit gets a polite
          24-hour holding pattern. Wrong-fit leaves with a DIY playbook so
          they feel helped instead of rejected.
        </p>
      </header>

      <Demo
        tag="Branch A · High-fit"
        title="Cal embed inline. They book in the same page-load."
        notes="Triggered when ARR is $5M+ AND monthly content budget is $10K+. We've already decided this is a fit — so the success screen acts like a fit acceptance and shows the calendar immediately. No waiting, no email round-trip. Captures peak intent."
      >
        <HighFit />
      </Demo>

      <Demo
        tag="Branch B · Mid-fit"
        title="Polite holding pattern. Triages manually."
        notes="Triggered when fit is unclear (ARR $1M-$5M, mixed signals on budget or scope). Says we respond within 24 hours, shows what to expect on the call, surfaces a teaser of the playbook they'd leave with. Preserves the 'we vet' positioning without rejecting them outright."
      >
        <MidFit />
      </Demo>

      <Demo
        tag="Branch C · Wrong-fit"
        title="Helped, not rejected. DIY playbook + nurture capture."
        notes="Triggered when ARR is under $1M or no budget set. We're honest about the mismatch (saves both sides a call), but they leave with the playbook we'd send to a paying client. They go away grateful — and stay on the email list for when they grow into it."
      >
        <WrongFit />
      </Demo>

      <p style={S.footnote}>
        All three branches land the same submission in your Notion DB with
        a &ldquo;fit tier&rdquo; property pre-filled. Your Notion view sorts
        High → Mid → Wrong, and you only ever look at the High section.
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
/*  Branch A · High-fit (inline Cal embed)                      */
/* ============================================================ */

function HighFit() {
  return (
    <div style={S.successShell}>
      <div style={S.successInner}>
        <div style={S.successHeaderRow}>
          <span style={S.checkBig}>✓</span>
          <div>
            <span style={S.successEyebrow}>
              <span style={S.dotPulse} className="pj-led" /> APPLICATION ACCEPTED
            </span>
            <h3 style={S.successH}>
              Slot held. <em style={S.successHItalic}>Pick a time.</em>
            </h3>
          </div>
        </div>

        <p style={S.successSub}>
          Sam, we read your application. You&apos;re in our top tier for the
          quarter. Pick any 30-minute window below. No prep needed.
        </p>

        <CalEmbedMock />

        <div style={S.afterCallRow}>
          <span style={S.afterCallIcon}>✉</span>
          <p style={S.afterCallText}>
            You&apos;ll get a confirmation with the Zoom link and a 2-page
            prep doc within 30 seconds of booking.
          </p>
        </div>
      </div>
    </div>
  );
}

function CalEmbedMock() {
  return (
    <div style={S.calBox}>
      <div style={S.calHeader}>
        <div>
          <p style={S.calHeaderTop}>30-min Video Strategy Call</p>
          <p style={S.calHeaderSub}>Ademola Adelakun · Founder, A2 Media</p>
        </div>
        <span style={S.calBadge}>This week ▾</span>
      </div>

      <div style={S.calGrid}>
        {[
          { day: "Tue", date: "16", slots: ["10:00", "11:30", "14:00"] },
          { day: "Wed", date: "17", slots: ["09:00", "13:30", "16:00"] },
          { day: "Thu", date: "18", slots: ["10:30", "15:00"] },
          { day: "Fri", date: "19", slots: ["09:30", "11:00", "14:30"] },
          { day: "Mon", date: "22", slots: ["10:00", "13:00", "16:30"] },
        ].map((d, di) => (
          <div key={d.day} style={S.calCol}>
            <div style={S.calColHead}>
              <span style={S.calColDay}>{d.day}</span>
              <span style={S.calColDate}>{d.date}</span>
            </div>
            <div style={S.calSlots}>
              {d.slots.map((s, si) => (
                <button
                  key={s}
                  className="cal-slot"
                  style={{
                    ...S.calSlot,
                    ...(di === 1 && si === 1 ? S.calSlotHi : {}),
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={S.calFooter}>
        <span style={S.calFooterDot} /> Times in your timezone · 30 minutes
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Branch B · Mid-fit                                          */
/* ============================================================ */

function MidFit() {
  return (
    <div style={S.successShell}>
      <div style={S.successInner}>
        <span style={S.checkMed}>✓</span>
        <h3 style={S.successH}>
          Your application is in. <em style={S.successHItalic}>We&apos;ll be in touch.</em>
        </h3>
        <p style={S.successSub}>
          Sam, we read every application within 24 hours. If we&apos;re a
          fit, you&apos;ll get a Cal link to a 30-minute strategy call. If
          we&apos;re not, you&apos;ll get a one-paragraph reason why.
        </p>

        <div style={S.timeline}>
          <p style={S.timelineLabel}>What happens next</p>
          {[
            {
              when: "Now",
              what: "We review your application and pull up your site",
            },
            {
              when: "Within 24h",
              what: "You hear from us either way",
            },
            {
              when: "If fit",
              what: "Cal link to a 30-min strategy session with Ademola",
            },
          ].map((t, i) => (
            <div key={i} style={S.timelineRow}>
              <span style={S.timelineDot} />
              <div>
                <span style={S.timelineWhen}>{t.when}</span>
                <span style={S.timelineWhat}>{t.what}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={S.bonusCard}>
          <span style={S.bonusLabel}>While you wait</span>
          <p style={S.bonusBody}>
            Read the playbook we&apos;d run for you in the first 30 days.
          </p>
          <a href="#" style={S.bonusLink}>
            Read the 30-day playbook <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Branch C · Wrong-fit                                        */
/* ============================================================ */

function WrongFit() {
  const [signed, setSigned] = useState(false);
  return (
    <div style={S.successShell}>
      <div style={S.successInner}>
        <span style={S.checkSoft}>✓</span>
        <h3 style={S.successH}>
          Honest read: <em style={S.successHItalic}>not a fit yet.</em>
        </h3>
        <p style={S.successSub}>
          We typically work with teams past $5M ARR and $10K/month video
          budgets. We could pretend otherwise, but we&apos;d be wasting
          your call. Here&apos;s what we&apos;d send a paying client
          instead, while you scale into us.
        </p>

        <div style={S.playbookCard}>
          <span style={S.playbookEyebrow}>The playbook we&apos;d run</span>
          <h4 style={S.playbookH}>
            The first 30 days of video, for teams under $5M
          </h4>
          <ul style={S.playbookList}>
            {[
              "The 3 video formats that work without a strategy team",
              "How to film on a phone and still look expensive",
              "Where to spend your first $2K so it pays back",
              "The 'lone marketer' template (steal it)",
            ].map((p) => (
              <li key={p} style={S.playbookItem}>
                <span style={S.playbookBullet}>→</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          {!signed ? (
            <form
              style={S.nurtureForm}
              onSubmit={(e) => {
                e.preventDefault();
                setSigned(true);
              }}
            >
              <input
                type="email"
                placeholder="you@company.com"
                required
                style={S.nurtureInput}
              />
              <button type="submit" style={S.nurtureBtn} className="pj-cta">
                Send me the playbook <span aria-hidden>→</span>
              </button>
            </form>
          ) : (
            <p style={S.nurtureSent}>
              ✓ Sent. Check your inbox in the next minute. No spam, we
              promise.
            </p>
          )}
        </div>

        <p style={S.checkBackNote}>
          When you cross $5M ARR, come back. We&apos;ll remember you.
        </p>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Keyframes                                                   */
/* ============================================================ */

const css = `
  @keyframes pjLed {
    0%, 100% { box-shadow: 0 0 8px rgba(102,247,142,0.9); opacity: 1; }
    50%      { box-shadow: 0 0 14px rgba(102,247,142,1); opacity: 0.7; }
  }
  .pj-led { animation: pjLed 1.1s ease-in-out infinite; }

  @keyframes pjCtaPulse {
    0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 10px 28px rgba(90,51,255,0.45); }
    50%      { box-shadow: 0 0 0 1px rgba(255,255,255,0.14), 0 14px 40px rgba(143,69,238,0.6); }
  }
  .pj-cta { animation: pjCtaPulse 2.6s ease-in-out infinite; transition: transform 220ms ease; }
  .pj-cta:hover { transform: translateY(-1px); }

  .cal-slot { transition: background 180ms ease, border-color 180ms ease, transform 180ms ease; }
  .cal-slot:hover { background: rgba(90,51,255,0.18); border-color: rgba(90,51,255,0.55); transform: translateY(-1px); }
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
  } as React.CSSProperties,
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
  } as React.CSSProperties,
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
  } as React.CSSProperties,
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
    background: "#0D0536",
    margin: 20,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties,

  /* shared success surfaces */
  successShell: {
    maxWidth: 720,
    margin: "0 auto",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(90,51,255,0.35)",
    borderRadius: 22,
    boxShadow:
      "0 30px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
  } as React.CSSProperties,
  successInner: { padding: "30px 32px 28px" } as React.CSSProperties,
  successHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  } as React.CSSProperties,
  successEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.2em",
    color: NEON,
    marginBottom: 4,
  } as React.CSSProperties,
  dotPulse: {
    display: "inline-block",
    width: 7,
    height: 7,
    borderRadius: 999,
    background: NEON,
  } as React.CSSProperties,
  successH: {
    fontSize: 26,
    fontWeight: 800,
    color: "#fff",
    margin: 0,
    lineHeight: 1.15,
    letterSpacing: "-0.015em",
  } as React.CSSProperties,
  successHItalic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    fontWeight: 500,
    color: LILAC,
  } as React.CSSProperties,
  successSub: {
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.72)",
    margin: "0 0 24px",
  } as React.CSSProperties,

  /* check marks (different per branch) */
  checkBig: {
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
    flexShrink: 0,
  } as React.CSSProperties,
  checkMed: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 999,
    background: `${PURPLE}30`,
    border: `2px solid ${PURPLE}`,
    color: "#fff",
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 16,
  } as React.CSSProperties,
  checkSoft: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "rgba(255,255,255,0.78)",
    fontSize: 22,
    marginBottom: 16,
  } as React.CSSProperties,

  /* Cal embed */
  calBox: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: "18px 18px 14px",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  } as React.CSSProperties,
  calHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  } as React.CSSProperties,
  calHeaderTop: {
    fontSize: 14,
    fontWeight: 800,
    color: "#fff",
    margin: 0,
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  calHeaderSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    margin: "2px 0 0",
  } as React.CSSProperties,
  calBadge: {
    display: "inline-block",
    fontSize: 11.5,
    fontWeight: 700,
    color: "rgba(255,255,255,0.75)",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 999,
    padding: "5px 11px",
  } as React.CSSProperties,
  calGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 8,
  } as React.CSSProperties,
  calCol: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "10px 8px 10px",
  } as React.CSSProperties,
  calColHead: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    marginBottom: 10,
  } as React.CSSProperties,
  calColDay: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase" as const,
  } as React.CSSProperties,
  calColDate: {
    fontSize: 17,
    fontWeight: 800,
    color: "#fff",
    marginTop: 2,
    letterSpacing: "-0.02em",
  } as React.CSSProperties,
  calSlots: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,
  calSlot: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "#fff",
    fontFamily: "var(--a2-sans)",
    fontSize: 12.5,
    fontWeight: 700,
    padding: "8px 4px",
    borderRadius: 8,
    cursor: "pointer",
  } as React.CSSProperties,
  calSlotHi: {
    background: PURPLE,
    border: `1px solid ${LILAC}`,
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(90,51,255,0.45)",
  } as React.CSSProperties,
  calFooter: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11.5,
    color: "rgba(255,255,255,0.5)",
    marginTop: 14,
    paddingTop: 12,
    borderTop: "1px dashed rgba(255,255,255,0.12)",
  } as React.CSSProperties,
  calFooterDot: {
    display: "inline-block",
    width: 6,
    height: 6,
    borderRadius: 999,
    background: NEON,
  } as React.CSSProperties,

  afterCallRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    marginTop: 18,
    padding: "10px 14px",
    background: "rgba(102,247,142,0.05)",
    border: "1px solid rgba(102,247,142,0.18)",
    borderRadius: 10,
  } as React.CSSProperties,
  afterCallIcon: {
    fontSize: 16,
    color: NEON,
  } as React.CSSProperties,
  afterCallText: {
    fontSize: 12.5,
    color: "rgba(255,255,255,0.7)",
    margin: 0,
    lineHeight: 1.45,
  } as React.CSSProperties,

  /* mid-fit timeline */
  timeline: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: "16px 18px",
    margin: "6px 0 18px",
  } as React.CSSProperties,
  timelineLabel: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.5)",
    margin: "0 0 12px",
  } as React.CSSProperties,
  timelineRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "8px 0",
  } as React.CSSProperties,
  timelineDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
    background: LILAC,
    boxShadow: `0 0 12px ${LILAC}80`,
    marginTop: 5,
    flexShrink: 0,
  } as React.CSSProperties,
  timelineWhen: {
    display: "block",
    fontSize: 11.5,
    fontWeight: 800,
    letterSpacing: "0.12em",
    color: "#28DFE8",
    textTransform: "uppercase" as const,
    marginBottom: 3,
  } as React.CSSProperties,
  timelineWhat: {
    display: "block",
    fontSize: 13.5,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.45,
  } as React.CSSProperties,
  bonusCard: {
    background: "rgba(90,51,255,0.08)",
    border: "1px solid rgba(90,51,255,0.35)",
    borderRadius: 12,
    padding: "14px 16px",
  } as React.CSSProperties,
  bonusLabel: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.18em",
    color: NEON,
    textTransform: "uppercase" as const,
    marginBottom: 6,
    display: "inline-block",
  } as React.CSSProperties,
  bonusBody: {
    fontSize: 13.5,
    color: "rgba(255,255,255,0.85)",
    margin: "0 0 8px",
    lineHeight: 1.45,
  } as React.CSSProperties,
  bonusLink: {
    fontSize: 13.5,
    fontWeight: 700,
    color: LILAC,
    textDecoration: "none",
  } as React.CSSProperties,

  /* wrong-fit playbook card */
  playbookCard: {
    background: "rgba(255,255,255,0.035)",
    border: "1px dashed rgba(255,255,255,0.16)",
    borderRadius: 16,
    padding: "20px 22px",
    marginBottom: 18,
  } as React.CSSProperties,
  playbookEyebrow: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: NEON,
    marginBottom: 8,
  } as React.CSSProperties,
  playbookH: {
    fontSize: 18,
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 14px",
    lineHeight: 1.25,
  } as React.CSSProperties,
  playbookList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 18px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  } as React.CSSProperties,
  playbookItem: {
    display: "flex",
    gap: 10,
    fontSize: 13.5,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.5,
  } as React.CSSProperties,
  playbookBullet: {
    color: LILAC,
    fontWeight: 800,
    flexShrink: 0,
  } as React.CSSProperties,
  nurtureForm: {
    display: "flex",
    gap: 8,
  } as React.CSSProperties,
  nurtureInput: {
    flex: 1,
    padding: "12px 14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 14,
    fontFamily: "var(--a2-sans)",
    outline: "none",
  } as React.CSSProperties,
  nurtureBtn: {
    padding: "12px 18px",
    background: PURPLE,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  nurtureSent: {
    fontSize: 13.5,
    color: NEON,
    margin: 0,
  } as React.CSSProperties,
  checkBackNote: {
    fontSize: 12.5,
    color: "rgba(255,255,255,0.45)",
    margin: 0,
    fontStyle: "italic" as const,
    fontFamily: "var(--a2-display)",
    textAlign: "center" as const,
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
