"use client";

/* Mockup — ScrubReel with the new "Sponsored Videos" entry (Christina Le)
   inserted at position 5, right after Customer Stories.

   Renders the real ScrubReel component with a modified formats array so
   what you see is exactly what the live section would look like if we
   shipped this change. */

import ScrubReel, {
  DEFAULT_FORMATS,
  type ScrubFormat,
} from "@/components/mockups/ScrubReel";

const SPONSORED: ScrubFormat = {
  label: "Sponsored Videos",
  sub: "Create videos your partners can't wait to show off.",
  videoId: "2y63fijosj",
  aspect: "16 / 9",
  client: "Christina Le",
};

// Insert after "Customer Stories" (index 3 → new entry at index 4)
const INSERT_AFTER = "Customer Stories";
const idx = DEFAULT_FORMATS.findIndex((f) => f.label === INSERT_AFTER);
const NEW_FORMATS: ScrubFormat[] =
  idx >= 0
    ? [
        ...DEFAULT_FORMATS.slice(0, idx + 1),
        SPONSORED,
        ...DEFAULT_FORMATS.slice(idx + 1),
      ]
    : [...DEFAULT_FORMATS, SPONSORED];

export default function ScrubSponsoredMockup() {
  return (
    <main style={{ background: "#07021F", color: "#fff" }}>
      <header style={hdr}>
        <span style={chip}>Mockup preview</span>
        <h1 style={title}>
          New: <em style={italic}>Sponsored Videos</em> · Christina Le
        </h1>
        <p style={sub}>
          Inserted at position 5 (after Customer Stories, before
          Storytelling). Nothing else moves except the entries below it
          shifting down by one. Scroll the section below to see the new
          card in context with its neighbours.
        </p>
        <p style={sub}>
          <strong style={{ color: "#66F78E" }}>The card:</strong> title
          &ldquo;Sponsored Videos&rdquo; · sub &ldquo;Create videos your
          partners can&apos;t wait to show off.&rdquo; · top-right tag
          &ldquo;Christina Le&rdquo;. Video ID{" "}
          <code style={code}>2y63fijosj</code>.
        </p>
        <div style={legendRow}>
          {NEW_FORMATS.map((f, i) => (
            <span
              key={f.videoId}
              style={{
                ...pos,
                background: f.videoId === SPONSORED.videoId
                  ? "rgba(102,247,142,0.14)"
                  : "rgba(255,255,255,0.04)",
                borderColor: f.videoId === SPONSORED.videoId
                  ? "rgba(102,247,142,0.55)"
                  : "rgba(255,255,255,0.12)",
                color: f.videoId === SPONSORED.videoId
                  ? "#66F78E"
                  : "rgba(255,255,255,0.65)",
              }}
            >
              <strong style={{ marginRight: 6 }}>
                {String(i + 1).padStart(2, "0")}
              </strong>
              {f.label}
              <span style={{ opacity: 0.6, marginLeft: 6 }}>
                · {f.client}
              </span>
            </span>
          ))}
        </div>
      </header>

      <ScrubReel formats={NEW_FORMATS} />

      {/* Give the sticky ScrubReel room to scroll through */}
      <div style={{ height: "60vh", background: "#07021F" }} />
    </main>
  );
}

const hdr: React.CSSProperties = {
  padding: "40px 24px 32px",
  textAlign: "center",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  background: "#0D0536",
  maxWidth: 980,
  margin: "0 auto",
};
const chip: React.CSSProperties = {
  display: "inline-block",
  padding: "5px 13px",
  background: "rgba(90,51,255,0.18)",
  border: "1px solid rgba(90,51,255,0.5)",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#8F45EE",
  marginBottom: 14,
};
const title: React.CSSProperties = {
  fontSize: 30,
  fontWeight: 800,
  letterSpacing: "-0.02em",
  margin: 0,
};
const italic: React.CSSProperties = {
  fontFamily: "var(--a2-display)",
  fontStyle: "italic",
  fontWeight: 500,
  color: "#66F78E",
};
const sub: React.CSSProperties = {
  fontSize: 14,
  color: "rgba(255,255,255,0.72)",
  margin: "12px auto 0",
  maxWidth: 720,
  lineHeight: 1.6,
};
const code: React.CSSProperties = {
  background: "rgba(90,51,255,0.16)",
  border: "1px solid rgba(90,51,255,0.4)",
  padding: "2px 8px",
  borderRadius: 6,
  fontFamily: "ui-monospace, Menlo, Consolas, monospace",
  fontSize: 12,
  color: "#fff",
};
const legendRow: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  justifyContent: "center",
  marginTop: 24,
};
const pos: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  fontSize: 11.5,
  letterSpacing: "0.02em",
  padding: "6px 12px",
  borderRadius: 999,
  border: "1px solid",
};
