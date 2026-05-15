import CardCarousel from "@/components/sections/CardCarousel";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <header style={hdr}>
        <Link href="/transitions/c-2-2" style={navLink}>→ C-2-2</Link>
        <Link href="/transitions/c-2-3" style={navLink}>→ C-2-3</Link>
        <div style={{ marginTop: 12 }}>
          <span style={tag}>Idea 1</span>
        </div>
        <h1 style={title}>Single Card Carousel</h1>
        <p style={sub}>
          One big card visible at a time, with arrows + pill dots for nav.
          Active study&apos;s panel renders below. No 3-card row anywhere.
        </p>
      </header>
      <CardCarousel />
    </>
  );
}

const hdr: React.CSSProperties = { background: "#000", color: "#fff", padding: "32px 24px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)" };
const tag: React.CSSProperties = { display: "inline-block", padding: "4px 12px", background: "rgba(90, 51, 255, 0.18)", border: "1px solid rgba(90, 51, 255, 0.45)", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5a33ff", marginBottom: "10px" };
const title: React.CSSProperties = { fontSize: "26px", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 };
const sub: React.CSSProperties = { fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: "8px auto 0", maxWidth: "640px", lineHeight: 1.5 };
const navLink: React.CSSProperties = { display: "inline-block", margin: "0 4px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5a33ff", border: "1px solid rgba(90, 51, 255, 0.4)", borderRadius: "999px" };
