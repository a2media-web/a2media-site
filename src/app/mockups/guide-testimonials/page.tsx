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

function GuideHead({ label, variant }: { label: string; variant: string }) {
  return (
    <>
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
    </>
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
        <GuideHead label={label} variant={variant} />
        <div style={{ ...S.grid, gridTemplateColumns: columns }}>
          {items.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* V4: Featured Jim on top (full width), 3 supporting below. */
function FeaturedTop() {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <GuideHead label="VERSION 4" variant="Featured Jim on top + 3 below" />
        <div style={{ ...S.grid, gridTemplateColumns: "1fr", marginBottom: 0 }}>
          <FeaturedCard t={JIM} />
        </div>
        <div style={{ ...S.grid, gridTemplateColumns: "repeat(3, 1fr)", marginTop: 20 }}>
          {BASE_TESTIMONIALS.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* V5: 3 cards + Jim as editorial pull-quote below (no card frame). */
function EditorialPullQuote() {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <GuideHead label="VERSION 5" variant="3 cards + Jim as editorial pull-quote" />
        <div style={{ ...S.grid, gridTemplateColumns: "repeat(3, 1fr)" }}>
          {BASE_TESTIMONIALS.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>
        <div style={S.pullWrap}>
          <div style={S.pullMark} aria-hidden>&ldquo;</div>
          <p style={S.pullQuote}>{JIM.quote}</p>
          <div style={S.pullAuthor}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img style={S.pullAvatar} src={JIM.avatar} alt={JIM.name} />
            <div>
              <div style={S.name}>{JIM.name}</div>
              <div style={S.role}>{JIM.role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* V6: 4 across with tighter padding + smaller avatar so cards don't feel cramped. */
function TightFourAcross() {
  return (
    <section style={S.section}>
      <div style={S.inner}>
        <GuideHead label="VERSION 6" variant="4 across — tighter density" />
        <div style={{ ...S.grid, gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[...BASE_TESTIMONIALS, JIM].map((t) => (
            <div key={t.name} style={{ ...S.card, padding: "22px 18px" }}>
              <p style={{ ...S.quote, fontSize: 15, marginBottom: 18 }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ ...S.author, paddingTop: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img style={{ ...S.avatar, width: 36, height: 36 }} src={t.avatar} alt={t.name} />
                <div>
                  <div style={{ ...S.name, fontSize: 13.5 }}>{t.name}</div>
                  <div style={{ ...S.role, fontSize: 11.5 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* V7: All 4 stacked vertically in a single centered column. */
function StackedVertical() {
  return (
    <section style={S.section}>
      <div style={{ ...S.inner, maxWidth: 760 }}>
        <GuideHead label="VERSION 7" variant="All 4 stacked vertical (single column)" />
        <div style={{ ...S.grid, gridTemplateColumns: "1fr", gap: 18 }}>
          {[...BASE_TESTIMONIALS, JIM].map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ t }: { t: Testimonial }) {
  return (
    <div style={S.featuredCard}>
      <div style={S.featuredBadge}>Featured</div>
      <p style={S.featuredQuote}>&ldquo;{t.quote}&rdquo;</p>
      <div style={S.author}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img style={{ ...S.avatar, width: 56, height: 56 }} src={t.avatar} alt={t.name} />
        <div>
          <div style={{ ...S.name, fontSize: 16 }}>{t.name}</div>
          <div style={{ ...S.role, fontSize: 13 }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main style={{ background: "#07021F" }}>
      <header style={S.pageHead}>
        <p style={S.pageEyebrow}>Mockup preview</p>
        <h1 style={S.pageTitle}>
          Guide testimonials · <em style={{ color: TEAL }}>7 layouts</em>
        </h1>
        <p style={S.pageLede}>
          Same 3 base quotes across all versions. Jim added from V2 onward
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

      <FeaturedTop />
      <EditorialPullQuote />
      <TightFourAcross />
      <StackedVertical />
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

  // Featured card (V4)
  featuredCard: {
    background: "linear-gradient(135deg, rgba(40,223,232,0.12), rgba(90,51,255,0.10))",
    border: `1px solid ${TEAL}55`,
    borderRadius: 22,
    padding: "36px 40px",
    display: "flex",
    flexDirection: "column" as const,
    position: "relative" as const,
    overflow: "hidden" as const,
    boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 0 40px rgba(40,223,232,0.15)",
  } as React.CSSProperties,
  featuredBadge: {
    position: "absolute" as const,
    top: 16,
    right: 20,
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    fontWeight: 800,
    color: TEAL,
    background: "rgba(40,223,232,0.16)",
    padding: "4px 10px",
    borderRadius: 999,
    border: `1px solid ${TEAL}55`,
  } as React.CSSProperties,
  featuredQuote: {
    fontFamily: "var(--a2-display, Georgia, serif)",
    fontStyle: "italic" as const,
    fontSize: 22,
    lineHeight: 1.45,
    color: "#fff",
    marginBottom: 28,
    maxWidth: "88%",
  } as React.CSSProperties,

  // Pull-quote (V5)
  pullWrap: {
    marginTop: 56,
    padding: "40px 32px",
    borderTop: `1px solid rgba(40,223,232,0.35)`,
    borderBottom: `1px solid rgba(40,223,232,0.35)`,
    textAlign: "center" as const,
    position: "relative" as const,
  } as React.CSSProperties,
  pullMark: {
    fontFamily: "var(--a2-display, Georgia, serif)",
    fontSize: 84,
    lineHeight: 0.6,
    color: TEAL,
    opacity: 0.55,
    marginBottom: 8,
  } as React.CSSProperties,
  pullQuote: {
    fontFamily: "var(--a2-display, Georgia, serif)",
    fontStyle: "italic" as const,
    fontSize: "clamp(20px, 2.2vw, 28px)",
    lineHeight: 1.4,
    color: "#fff",
    margin: "0 auto 24px",
    maxWidth: 780,
    textWrap: "balance" as const,
  } as React.CSSProperties,
  pullAuthor: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
  } as React.CSSProperties,
  pullAvatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    objectFit: "cover" as const,
  } as React.CSSProperties,
};
