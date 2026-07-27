"use client";

/* Guide testimonials — 3-vs-4 layout comparison.

   Same 3 base quotes across all versions (Tobi, Madeleine, Chelsea).
   Jim's quote appears in V2 and V3 only, trimmed from ~340 chars to 173
   using ONLY his own words (no paraphrasing).

   V1 — Current: 3 quotes in a row (baseline for comparison)
   V2 — 4 quotes across: single row, cards get narrower
   V3 — 4 quotes 2x2: stacked pairs, each card gets max width */

import React from "react";

const NIGHT = "#0D0536";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const TEAL = "#28DFE8";

const BASE_TESTIMONIALS = [
  {
    quote:
      "Very few people understand video and marketing as much as A2 Media. They are one of the best agencies out there, they don't just produce, they think strategically about every piece of content.",
    name: "Tobi Oluwole",
    role: "CEO, Magnate · 300K+ LinkedIn Followers",
    avatar:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/68a31f15cb721ef5a93c8741_zobi1kSGMj5s0f0ZI8vLyfW2jw.jpeg",
  },
  {
    quote:
      "A2 Media is one of the best video agencies we've ever worked with. They understood our product, our audience, and delivered content that actually moved the needle for our marketing.",
    name: "Madeleine Work",
    role: "Sr. Product Marketing Manager, Chili Piper",
    avatar:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/68ffe07880d0ae5c085ec9e1_1758139797919.png",
  },
  {
    quote:
      "I've worked with the A2 Media team at two different companies now and they're just great people to work with. They rolled with my shifting priorities and got video content out the door super fast.",
    name: "Chelsea Lassen",
    role: "Director of Content, Comms & Storytelling, Cority",
    avatar: "/cority-chelsea-lassen.webp",
  },
];

// Trimmed from Jim's full quote — only his own words, three sentences kept.
const JIM = {
  quote:
    "Working WITH the A2Media team is exactly how I'd describe it. They helped us frame our message and tell our story the right way. Vendors take orders. Partners make you better.",
  name: "Jim [add last name]",
  role: "[Add title · Add company]",
  avatar: "/jim.jpeg",
};

type Testimonial = (typeof BASE_TESTIMONIALS)[number];

function Card({ t }: { t: Testimonial }) {
  return (
    <div style={S.card}>
      <p style={S.quote}>&ldquo;{t.quote}&rdquo;</p>
      <div style={S.author}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img style={S.avatar} src={t.avatar} alt={t.name} />
        <div>
          <div style={S.name}>{t.name}</div>
          <div style={S.role}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function GuideShell({
  label,
  variant,
  columns,
  items,
}: {
  label: string;
  variant: string;
  columns: string;
  items: Testimonial[];
}) {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <div style={S.headRow}>
          <span style={S.mockLabel}>{label}</span>
          <span style={S.variantChip}>{variant}</span>
        </div>
        <h2 style={S.heading}>
          We know what it&apos;s like to spend $30K{" "}
          <span style={{ color: TEAL }}>on a video that makes $0.</span>
        </h2>
        <p style={S.body}>
          So we built A2 Media differently. Every video we make starts with one
          question:
          <br />
          <span style={S.bodyEmphasis}>
            &ldquo;will this actually move someone closer to buying?&rdquo;
          </span>
        </p>
        <div style={{ ...S.grid, gridTemplateColumns: columns }}>
          {items.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main style={{ background: "#07021F" }}>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview</p>
        <h1 style={S.pageTitle}>
          Guide testimonials · <em style={{ color: TEAL }}>3 vs 4 layouts</em>
        </h1>
        <p style={S.pageLede}>
          Same 3 base quotes across all versions. Jim added in V2 &amp; V3
          (trimmed to 173 chars using only his own words). Placeholder text for
          his role — swap in the real one when you decide to ship.
        </p>
      </header>

      <GuideShell
        label="VERSION 1"
        variant="Current — 3 quotes"
        columns="repeat(3, 1fr)"
        items={BASE_TESTIMONIALS}
      />

      <GuideShell
        label="VERSION 2"
        variant="4 across — cards get narrower"
        columns="repeat(4, 1fr)"
        items={[...BASE_TESTIMONIALS, JIM]}
      />

      <GuideShell
        label="VERSION 3"
        variant="2x2 grid — stacked pairs, wider cards"
        columns="repeat(2, 1fr)"
        items={[...BASE_TESTIMONIALS, JIM]}
      />
    </main>
  );
}

// ---------- styles ----------

const S = {
  pageHead: {
    padding: "48px 32px 40px",
    textAlign: "center" as const,
    background: NIGHT,
    color: "#fff",
    fontFamily: "var(--a2-sans, system-ui)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties,
  pageEyebrow: {
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: LILAC,
    fontWeight: 800,
    margin: 0,
  } as React.CSSProperties,
  pageTitle: {
    fontSize: 32,
    fontWeight: 800,
    margin: "10px 0 12px",
    letterSpacing: "-0.02em",
  } as React.CSSProperties,
  pageLede: {
    fontSize: 14.5,
    color: "rgba(255,255,255,0.72)",
    margin: "0 auto",
    maxWidth: 700,
    lineHeight: 1.55,
  } as React.CSSProperties,

  section: {
    background: NIGHT,
    color: "#fff",
    padding: "clamp(60px, 6vw, 100px) clamp(20px, 5vw, 48px)",
    fontFamily: "var(--a2-sans, system-ui)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties,
  inner: {
    maxWidth: 1240,
    margin: "0 auto",
    textAlign: "center" as const,
  } as React.CSSProperties,
  headRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  mockLabel: {
    display: "inline-block",
    padding: "5px 12px",
    background: "rgba(102,247,142,0.12)",
    border: `1px solid ${NEON}55`,
    borderRadius: 999,
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: NEON,
  } as React.CSSProperties,
  variantChip: {
    display: "inline-block",
    padding: "5px 12px",
    background: "rgba(40,223,232,0.14)",
    border: `1px solid ${TEAL}55`,
    borderRadius: 999,
    fontSize: 11.5,
    fontWeight: 700,
    color: "#fff",
  } as React.CSSProperties,
  heading: {
    fontSize: "clamp(28px, 4vw, 46px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.12,
    margin: 0,
    textWrap: "balance" as const,
  } as React.CSSProperties,
  body: {
    fontSize: 17,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.78)",
    margin: "24px auto 0",
    maxWidth: 640,
  } as React.CSSProperties,
  bodyEmphasis: {
    fontFamily: "var(--a2-display, Georgia, serif)",
    fontStyle: "italic" as const,
    color: TEAL,
    fontSize: "1.05em",
  } as React.CSSProperties,

  grid: {
    display: "grid",
    gap: 20,
    marginTop: 56,
    textAlign: "left" as const,
  } as React.CSSProperties,
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,
  quote: {
    fontFamily: "var(--a2-display, Georgia, serif)",
    fontStyle: "italic" as const,
    fontSize: 17,
    lineHeight: 1.55,
    color: "#fff",
    marginBottom: 24,
    flex: 1,
  } as React.CSSProperties,
  author: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    paddingTop: 18,
    borderTop: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties,
  avatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    objectFit: "cover" as const,
    flexShrink: 0,
  } as React.CSSProperties,
  name: {
    fontSize: 14.5,
    fontWeight: 600,
    color: "#fff",
  } as React.CSSProperties,
  role: {
    fontSize: 12.5,
    color: "rgba(255,255,255,0.72)",
    marginTop: 2,
    lineHeight: 1.3,
  } as React.CSSProperties,
};
