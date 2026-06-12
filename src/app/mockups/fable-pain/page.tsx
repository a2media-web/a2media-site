"use client";

/* Mockup: /mockups/fable-pain
   Pain section redesign — "The 9:47 PM Problem."

   Instead of three abstract pain cards, this plays back specific moments
   from the buyer's actual week (timestamped, like evidence) so the read
   feels like "they were in the room," not "they listed my problems."
   Sticky oversized headline on the left holds the emotional anchor while
   the ledger scrolls past on the right; a quiet manifesto band lands the
   reframe: video isn't broken, the job landed on the wrong desk. */

import React from "react";

/* ---- content --------------------------------------------------------------- */

const LEDGER = [
  {
    stamp: "Tuesday · 9:47 PM",
    title: "The cut came back “fine.”",
    body: "The freelancer’s edit was technically fine. It just didn’t sound like your brand, and you couldn’t explain the fix faster than making it. So you opened the timeline yourself. Again.",
  },
  {
    stamp: "QBR · Slide 14",
    title: "The video line item.",
    body: "Finance asks what last quarter’s videos returned. You say “engagement was strong” and feel the words turn to dust on the way out. You know views aren’t the answer. You just don’t have a better one yet.",
  },
  {
    stamp: "Slack · 2:14 PM",
    title: "Sales needs “a quick clip.”",
    body: "Thirty seconds, for a live deal, by Thursday. Quick is never quick. The deal moves on without it, and after the second time, sales quietly stops asking.",
  },
  {
    stamp: "The shortlist · Round 4",
    title: "Freelancer number four.",
    body: "Great reel. Mid delivery. And somewhere in week two you became their project manager. The math broke the moment briefing them took longer than the video saved you.",
  },
  {
    stamp: "Incognito tab · 11:03 PM",
    title: "Checking what competitors post.",
    body: "Their videos look like everyone’s videos. Same stock b-roll, same kinetic captions. You don’t want to look like them. You’re just not sure how to look like you at this volume.",
  },
];

/* ---- page ------------------------------------------------------------------ */

export default function FablePainMockup() {
  return (
    <main style={S.page}>
      <Frame
        tag="Fable · Pain redesign"
        title="The 9:47 PM Problem"
        notes="Emotional move: stop describing the pain and replay it. Each entry is a timestamped moment from the buyer's actual week (the 9:47 PM self-edit, the QBR slide, the Slack ask sales stops sending), so recognition does the persuading instead of claims. Structurally, a sticky display-italic headline holds the emotional anchor while a glowing ledger rail scrolls past like evidence; the section closes on a short manifesto band that reframes the blame: video isn't broken, the job landed on the wrong desk."
      />

      <section style={S.section}>
        {/* ambient glows */}
        <div style={S.glowA} aria-hidden />
        <div style={S.glowB} aria-hidden />

        <div style={S.inner}>
          {/* left: sticky anchor */}
          <div style={S.left}>
            <div style={S.sticky}>
              <p style={S.eyebrow}>
                <span style={S.eyebrowRule} aria-hidden />
                The part nobody puts in the job description
              </p>
              <h2 style={S.heading}>
                It&apos;s 9:47 on a Tuesday.
                <br />
                <em style={S.headingItalic}>Why are you the one editing this video?</em>
              </h2>
              <p style={S.lede}>
                Nobody hired you to cut webinar clips. But here you are. We
                wrote down the moments our clients told us about before they
                came to us. If any of these feel a little too specific,
                that&apos;s the point.
              </p>
              <p style={S.tally}>
                <span style={S.tallyNum}>5</span> moments. Count how many are
                yours.
              </p>
            </div>
          </div>

          {/* right: the ledger */}
          <div style={S.right}>
            <div style={S.rail} aria-hidden />
            {LEDGER.map((item, i) => (
              <article key={item.stamp} style={S.entry}>
                <div style={S.node} aria-hidden>
                  <span style={S.nodeDot} />
                </div>
                <div style={{ ...S.card, ...(i === 0 ? S.cardFirst : null) }}>
                  <p style={S.stamp}>{item.stamp}</p>
                  <h3 style={S.entryTitle}>{item.title}</h3>
                  <p style={S.entryBody}>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* pivot manifesto band */}
        <div style={S.manifesto}>
          <div style={S.manifestoInner}>
            <p style={S.manifestoKicker}>Here&apos;s the thing</p>
            <p style={S.manifestoLine}>
              None of this means video doesn&apos;t work in B2B.{" "}
              <em style={S.manifestoItalic}>
                It means you&apos;re carrying a function that was never
                supposed to be yours.
              </em>{" "}
              You don&apos;t need a fourth freelancer to manage. You need a
              team that already thinks the way you do.
            </p>
            <p style={S.manifestoCue}>
              If you nodded at any of these, keep scrolling{" "}
              <span aria-hidden>↓</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---- frame ------------------------------------------------------------------ */

function Frame({ tag, title, notes }: { tag: string; title: string; notes: string }) {
  return (
    <header style={S.frameHeader}>
      <span style={S.frameTag}>{tag}</span>
      <h1 style={S.frameTitle}>{title}</h1>
      <p style={S.frameNotes}>{notes}</p>
    </header>
  );
}

/* ---- styles ------------------------------------------------------------------ */

const S = {
  page: { background: "#07021f", fontFamily: "var(--a2-sans)" } as React.CSSProperties,

  /* frame */
  frameHeader: { background: "#000", borderTop: "2px solid #5A33FF", padding: "40px 24px 30px", textAlign: "center" } as React.CSSProperties,
  frameTag: { display: "inline-block", fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 999, marginBottom: 12, color: "#66F78E", border: "1px solid rgba(102,247,142,0.45)" } as React.CSSProperties,
  frameTitle: { fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.015em" } as React.CSSProperties,
  frameNotes: { fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: 760 } as React.CSSProperties,

  /* section shell */
  section: { position: "relative", background: "#0D0536", overflow: "hidden", padding: "110px 0 0" } as React.CSSProperties,
  glowA: { position: "absolute", top: -180, left: "-12%", width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,51,255,0.28), transparent 65%)", filter: "blur(40px)", pointerEvents: "none" } as React.CSSProperties,
  glowB: { position: "absolute", bottom: 80, right: "-10%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(143,69,238,0.18), transparent 65%)", filter: "blur(40px)", pointerEvents: "none" } as React.CSSProperties,

  inner: { position: "relative", maxWidth: 1180, margin: "0 auto", padding: "0 32px 110px", display: "grid", gridTemplateColumns: "minmax(360px, 1fr) minmax(420px, 1.05fr)", gap: 72, alignItems: "start" } as React.CSSProperties,

  /* left anchor */
  left: { minWidth: 0 } as React.CSSProperties,
  sticky: { position: "sticky", top: 90 } as React.CSSProperties,
  eyebrow: { display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8F45EE", margin: "0 0 26px" } as React.CSSProperties,
  eyebrowRule: { display: "inline-block", width: 34, height: 2, background: "#5A33FF", borderRadius: 2 } as React.CSSProperties,
  heading: { fontSize: "clamp(38px, 4.6vw, 60px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.028em", color: "#FFFFFF", margin: "0 0 26px" } as React.CSSProperties,
  headingItalic: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#5A33FF", textShadow: "0 0 50px rgba(90,51,255,0.45)", letterSpacing: "-0.01em" } as React.CSSProperties,
  lede: { fontSize: 17, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", maxWidth: 440, margin: "0 0 30px" } as React.CSSProperties,
  tally: { display: "flex", alignItems: "baseline", gap: 10, fontSize: 14, fontWeight: 600, letterSpacing: "0.04em", color: "rgba(255,255,255,0.55)", margin: 0 } as React.CSSProperties,
  tallyNum: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontSize: 34, fontWeight: 500, color: "#66F78E", lineHeight: 1 } as React.CSSProperties,

  /* right ledger */
  right: { position: "relative", minWidth: 0, paddingLeft: 36, display: "flex", flexDirection: "column", gap: 22 } as React.CSSProperties,
  rail: { position: "absolute", left: 7, top: 14, bottom: 14, width: 2, background: "linear-gradient(180deg, #5A33FF 0%, rgba(90,51,255,0.45) 55%, rgba(90,51,255,0.05) 100%)", borderRadius: 2 } as React.CSSProperties,
  entry: { position: "relative" } as React.CSSProperties,
  node: { position: "absolute", left: -36, top: 26, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" } as React.CSSProperties,
  nodeDot: { width: 10, height: 10, borderRadius: 999, background: "#5A33FF", boxShadow: "0 0 0 4px rgba(90,51,255,0.22), 0 0 16px rgba(90,51,255,0.8)" } as React.CSSProperties,

  card: { background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "26px 28px", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", boxShadow: "0 18px 50px rgba(0,0,0,0.35)" } as React.CSSProperties,
  cardFirst: { border: "1px solid rgba(90,51,255,0.55)", background: "linear-gradient(140deg, rgba(90,51,255,0.16), rgba(255,255,255,0.04) 55%)", boxShadow: "0 18px 60px rgba(90,51,255,0.25)" } as React.CSSProperties,
  stamp: { display: "inline-block", fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#66F78E", border: "1px solid rgba(102,247,142,0.35)", borderRadius: 999, padding: "4px 11px", margin: "0 0 14px" } as React.CSSProperties,
  entryTitle: { fontSize: 20, fontWeight: 700, letterSpacing: "-0.015em", color: "#FFFFFF", margin: "0 0 9px" } as React.CSSProperties,
  entryBody: { fontSize: 15, lineHeight: 1.62, color: "rgba(255,255,255,0.68)", margin: 0 } as React.CSSProperties,

  /* manifesto band */
  manifesto: { position: "relative", borderTop: "1px solid rgba(90,51,255,0.35)", background: "linear-gradient(180deg, rgba(90,51,255,0.12), rgba(13,5,54,0) 80%)", padding: "84px 32px 96px", textAlign: "center" } as React.CSSProperties,
  manifestoInner: { maxWidth: 820, margin: "0 auto" } as React.CSSProperties,
  manifestoKicker: { fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8F45EE", margin: "0 0 22px" } as React.CSSProperties,
  manifestoLine: { fontSize: "clamp(24px, 2.8vw, 34px)", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.015em", color: "rgba(255,255,255,0.92)", margin: "0 0 34px" } as React.CSSProperties,
  manifestoItalic: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#5A33FF", textShadow: "0 0 40px rgba(90,51,255,0.4)" } as React.CSSProperties,
  manifestoCue: { fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", color: "#66F78E", margin: 0 } as React.CSSProperties,
};
