"use client";

/* Mockup: /mockups/apply-success-free-cal
   Three takes on the high-fit success state that all work on the FREE
   Cal.com plan (no paid embed required).

   Option 1 - The Slot Picker. Custom-designed time-slot grid that deep-
     links to Cal with a date+time pre-selected. Looks like an embed but
     is just a styled hand-off. Closest to the paid-embed feel.
   Option 2 - The Confidence Button. One big primary CTA that opens
     cal.com/a2media in a new tab. Cleanest, fastest to build.
   Option 3 - The "Sent to Your Inbox" handoff. No calendar visible on
     the page at all. Confirms the slot is held, says the Cal link is
     in their inbox. Quietest, most premium feel. */

import React, { useState } from "react";

const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const CAL_URL = "https://cal.com/a2media/30-min";

export default function FreeCalSuccessMockup() {
  return (
    <main style={S.page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header style={S.frameHeader}>
        <span style={S.frameTag}>
          High-fit success · 3 ways that work on free Cal
        </span>
        <h2 style={S.frameTitle}>
          The hand-off, three ways. All free-Cal compatible.
        </h2>
        <p style={S.frameNotes}>
          The paid Cal embed (Branch A from the previous mockup) needs
          Cal&apos;s Teams plan. These three options all work on the free
          tier. Same success-screen positioning, three different ways to
          get the visitor from &ldquo;application accepted&rdquo; to
          &ldquo;call booked.&rdquo; Pick the one that matches the energy
          you want at the moment of decision.
        </p>
      </header>

      <Demo
        tag="Option 1 · The Slot Picker"
        title="Visual time-slot grid. Deep-links to Cal."
        notes="Looks closest to the paid embed. We render a styled grid of available time slots inside the page. Clicking a slot opens cal.com with the date+time pre-selected in the URL hash. The visitor still completes booking on Cal, but the in-page experience is rich. Best when you want the embed feel without the cost."
      >
        <SlotPicker />
      </Demo>

      <Demo
        tag="Option 2 · The Confidence Button"
        title="One big CTA. Opens Cal in a new tab."
        notes="Simplest, fastest, zero risk. Big purple button, pulsing glow, clear copy. Opens cal.com/a2media in a new tab. The visitor lands on Cal and books normally. Best when speed-to-ship matters more than UX polish."
      >
        <ConfidenceButton />
      </Demo>

      <Demo
        tag="Option 3 · Sent to Your Inbox"
        title="No calendar on the page. Quiet and premium."
        notes="No live calendar visible. We confirm the slot is held, say the Cal link is in their inbox (we send it via the form handler). Counter-intuitive but matches premium positioning — feels less like a SaaS funnel, more like a personal hand-off. Best when you want maximum brand polish."
      >
        <InboxHandoff />
      </Demo>

      <p style={S.footnote}>
        All three drop the same submission into your Notion DB, with the
        fit tier pre-filled. The only difference is what the visitor sees
        on the success page.
      </p>
    </main>
  );
}

/* ============================================================ */
/*  Demo wrapper                                                */
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
/*  Shared header / eyebrow                                     */
/* ============================================================ */

function AcceptedHeader({ size = "big" }: { size?: "big" | "med" }) {
  return (
    <div style={S.headerRow}>
      <span style={size === "big" ? S.checkBig : S.checkMed}>✓</span>
      <div>
        <span style={S.eyebrow}>
          <span style={S.dotPulse} className="pj-led" /> APPLICATION ACCEPTED
        </span>
        <h3 style={S.heading}>
          Slot held. <em style={S.headingItalic}>You&apos;re in.</em>
        </h3>
      </div>
    </div>
  );
}

function Sub() {
  return (
    <p style={S.sub}>
      Sam, we read your application. You&apos;re in our top tier for the
      quarter — Ademola will run the call himself.
    </p>
  );
}

/* ============================================================ */
/*  Option 1 · Slot Picker (deep-link)                          */
/* ============================================================ */

const SLOTS = [
  { day: "Tue", date: "16", times: ["10:00", "11:30", "14:00"] },
  { day: "Wed", date: "17", times: ["09:00", "13:30", "16:00"] },
  { day: "Thu", date: "18", times: ["10:30", "15:00"] },
  { day: "Fri", date: "19", times: ["09:30", "11:00", "14:30"] },
  { day: "Mon", date: "22", times: ["10:00", "13:00", "16:30"] },
];

function SlotPicker() {
  return (
    <div style={S.successShell}>
      <div style={S.successInner}>
        <AcceptedHeader />
        <Sub />

        <div style={S.calBox}>
          <div style={S.calHeader}>
            <div>
              <p style={S.calHeaderTop}>Pick a time</p>
              <p style={S.calHeaderSub}>
                30 minutes · Zoom · times in your timezone
              </p>
            </div>
            <span style={S.calBadge}>This week ▾</span>
          </div>

          <div style={S.calGrid}>
            {SLOTS.map((d, di) => (
              <div key={d.day} style={S.calCol}>
                <div style={S.calColHead}>
                  <span style={S.calColDay}>{d.day}</span>
                  <span style={S.calColDate}>{d.date}</span>
                </div>
                <div style={S.calSlots}>
                  {d.times.map((t, ti) => (
                    <a
                      key={t}
                      href={`${CAL_URL}?date=2026-06-${d.date}&time=${t}`}
                      target="_blank"
                      rel="noreferrer"
                      className="cal-slot"
                      style={{
                        ...S.calSlot,
                        ...(di === 1 && ti === 1 ? S.calSlotHi : {}),
                      }}
                    >
                      {t}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={S.calFooter}>
            <span style={S.calFooterDot} /> Pick a slot · we&apos;ll confirm
            in 30 seconds
          </div>
        </div>

        <p style={S.microNote}>
          Slots load from your live availability. The slot you pick takes
          you to a confirmation screen on Cal where you finish booking.
        </p>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Option 2 · Confidence Button                                */
/* ============================================================ */

function ConfidenceButton() {
  return (
    <div style={S.successShell}>
      <div style={S.successInner}>
        <AcceptedHeader />
        <Sub />

        <div style={S.bigCtaWrap}>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            style={S.bigCta}
            className="pj-cta"
          >
            Book your 30-minute call{" "}
            <span aria-hidden style={S.bigCtaArrow}>
              →
            </span>
          </a>
          <p style={S.bigCtaMicro}>
            Opens Cal in a new tab · Pick any time that works
          </p>
        </div>

        <div style={S.proofRow}>
          {[
            { n: "30", l: "MINUTES" },
            { n: "0", l: "PREP NEEDED" },
            { n: "<24H", l: "RESPONSE" },
          ].map((p) => (
            <div key={p.l} style={S.proofCell}>
              <span style={S.proofN}>{p.n}</span>
              <span style={S.proofL}>{p.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Option 3 · Inbox Handoff                                    */
/* ============================================================ */

function InboxHandoff() {
  const [resent, setResent] = useState(false);
  return (
    <div style={S.successShell}>
      <div style={S.successInner}>
        <AcceptedHeader />
        <Sub />

        <div style={S.inboxCard}>
          <div style={S.inboxIconWrap}>
            <span style={S.inboxIcon}>✉</span>
            <span style={S.inboxDot} className="pj-led" />
          </div>
          <div style={S.inboxBody}>
            <p style={S.inboxLine}>
              <strong style={S.inboxStrong}>Check your inbox.</strong>{" "}
              We just sent your Cal link to{" "}
              <span style={S.inboxEmail}>sam@acme.com</span>.
            </p>
            <p style={S.inboxSub}>
              From <em>ademola@a2media.ca</em>. Subject:{" "}
              <em>&ldquo;Your A2 Media call, Sam.&rdquo;</em>
            </p>
          </div>
        </div>

        <div style={S.inboxActions}>
          <button
            type="button"
            style={S.linkBtn}
            onClick={() => setResent(true)}
            disabled={resent}
          >
            {resent ? "✓ Resent" : "Didn't get it? Resend"}
          </button>
          <span style={S.linkBtnSep}>·</span>
          <a href={`mailto:ademola@a2media.ca`} style={S.linkBtn}>
            Wrong email? Tell us
          </a>
        </div>

        <p style={S.microNote}>
          Inbox delivery feels more personal than a calendar widget at the
          $15K+ price point. The Cal link in the email opens the regular
          booking flow.
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
    0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 14px 36px rgba(90,51,255,0.5); }
    50%      { box-shadow: 0 0 0 1px rgba(255,255,255,0.14), 0 20px 50px rgba(143,69,238,0.62), 0 0 70px rgba(90,51,255,0.35); }
  }
  .pj-cta { animation: pjCtaPulse 2.6s ease-in-out infinite; transition: transform 220ms ease, background 220ms ease; }
  .pj-cta:hover { transform: translateY(-2px); background: #8F45EE; }

  .cal-slot { transition: background 180ms ease, border-color 180ms ease, transform 180ms ease; text-decoration: none; text-align: center; }
  .cal-slot:hover { background: rgba(90,51,255,0.22); border-color: rgba(90,51,255,0.6); transform: translateY(-1px); }
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

  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  } as React.CSSProperties,
  eyebrow: {
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
  heading: {
    fontSize: 26,
    fontWeight: 800,
    color: "#fff",
    margin: 0,
    lineHeight: 1.15,
    letterSpacing: "-0.015em",
  } as React.CSSProperties,
  headingItalic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    fontWeight: 500,
    color: LILAC,
  } as React.CSSProperties,
  sub: {
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.72)",
    margin: "0 0 22px",
  } as React.CSSProperties,
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
    flexShrink: 0,
  } as React.CSSProperties,

  /* Option 1: slot picker */
  calBox: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: "18px 18px 14px",
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
    display: "block",
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

  microNote: {
    fontSize: 12,
    color: "rgba(255,255,255,0.42)",
    margin: "14px 0 0",
    lineHeight: 1.5,
  } as React.CSSProperties,

  /* Option 2: big button */
  bigCtaWrap: {
    textAlign: "center" as const,
    padding: "10px 0 6px",
  } as React.CSSProperties,
  bigCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 14,
    padding: "22px 44px",
    background: PURPLE,
    color: "#fff",
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: "0.01em",
    borderRadius: 999,
    textDecoration: "none",
    fontFamily: "var(--a2-sans)",
  } as React.CSSProperties,
  bigCtaArrow: { fontSize: 18 } as React.CSSProperties,
  bigCtaMicro: {
    marginTop: 14,
    fontSize: 12.5,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: "0.02em",
  } as React.CSSProperties,
  proofRow: {
    display: "flex",
    gap: 8,
    marginTop: 28,
    justifyContent: "center",
  } as React.CSSProperties,
  proofCell: {
    flex: 1,
    maxWidth: 180,
    padding: "16px 12px",
    textAlign: "center" as const,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
  } as React.CSSProperties,
  proofN: {
    display: "block",
    fontSize: 22,
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "-0.02em",
  } as React.CSSProperties,
  proofL: {
    display: "block",
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.16em",
    color: "rgba(255,255,255,0.5)",
    marginTop: 4,
  } as React.CSSProperties,

  /* Option 3: inbox handoff */
  inboxCard: {
    display: "flex",
    gap: 16,
    padding: "20px 22px",
    background: "rgba(102,247,142,0.06)",
    border: "1px solid rgba(102,247,142,0.32)",
    borderRadius: 14,
    alignItems: "center",
  } as React.CSSProperties,
  inboxIconWrap: {
    position: "relative" as const,
    width: 46,
    height: 46,
    borderRadius: 12,
    background: `${NEON}25`,
    border: `1px solid ${NEON}66`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } as React.CSSProperties,
  inboxIcon: {
    fontSize: 22,
    color: NEON,
  } as React.CSSProperties,
  inboxDot: {
    position: "absolute" as const,
    top: -3,
    right: -3,
    width: 12,
    height: 12,
    borderRadius: 999,
    background: NEON,
    border: "2px solid #0D0536",
  } as React.CSSProperties,
  inboxBody: { flex: 1 } as React.CSSProperties,
  inboxLine: {
    fontSize: 15,
    color: "#fff",
    margin: 0,
    lineHeight: 1.45,
  } as React.CSSProperties,
  inboxStrong: { color: NEON, fontWeight: 800 } as React.CSSProperties,
  inboxEmail: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    background: "rgba(255,255,255,0.06)",
    padding: "2px 6px",
    borderRadius: 4,
    fontSize: 13,
  } as React.CSSProperties,
  inboxSub: {
    fontSize: 12.5,
    color: "rgba(255,255,255,0.55)",
    margin: "6px 0 0",
  } as React.CSSProperties,
  inboxActions: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    marginTop: 16,
    justifyContent: "center",
  } as React.CSSProperties,
  linkBtn: {
    fontFamily: "var(--a2-sans)",
    fontSize: 13,
    fontWeight: 700,
    color: LILAC,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    padding: 0,
  } as React.CSSProperties,
  linkBtnSep: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 12,
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
