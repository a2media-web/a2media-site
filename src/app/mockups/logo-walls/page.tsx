import MarqueeWall from "@/components/mockups/LogoWalls/Marquee";
import Belt3DWall from "@/components/mockups/LogoWalls/Belt3D";
import ParallaxWall from "@/components/mockups/LogoWalls/Parallax";
import EditorialWall from "@/components/mockups/LogoWalls/Editorial";

export default function LogoWallsMockup() {
  return (
    <main>
      <header style={hdr}>
        <span style={tag}>Logo Wall · Variant B</span>
        <h1 style={title}>3D Belt</h1>
        <p style={sub}>
          Single perspective-tilted row scrolls infinitely on a glassmorphic
          stage. Top + bottom feathered into the night-core background. Mobile
          flattens the tilt slightly but keeps the depth feel.
        </p>
      </header>
      <Belt3DWall />

      <header style={hdr}>
        <span style={tag}>Logo Wall · Variant C</span>
        <h1 style={title}>Parallax Strips</h1>
        <p style={sub}>
          Four layered rows scroll at different speeds with depth-of-field
          blur and scale. Outer rows feel further away. Drifting aurora behind.
        </p>
      </header>
      <ParallaxWall />

      <header style={hdr}>
        <span style={tag}>Logo Wall · Variant D</span>
        <h1 style={title}>Editorial Wordmarks</h1>
        <p style={sub}>
          Pure typography. No logos — client names rendered in Galano Black at
          varying sizes with italic Awesome Serif accents. Confident, magazine
          feel. Hover lights each name in Electric Purple.
        </p>
      </header>
      <EditorialWall />

      <header style={hdr}>
        <span style={tag}>Logo Wall · Variant A (baseline)</span>
        <h1 style={title}>Cinematic Marquee</h1>
        <p style={sub}>
          The one you liked. Two rows scroll opposite directions with edge fade
          + ambient purple glow. Pause on hover.
        </p>
      </header>
      <MarqueeWall />
    </main>
  );
}

const hdr: React.CSSProperties = {
  background: "#000",
  color: "#fff",
  padding: "28px 24px",
  textAlign: "center",
  borderTop: "1px solid rgba(255,255,255,0.08)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};
const tag: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 12px",
  background: "rgba(90, 51, 255, 0.18)",
  border: "1px solid rgba(90, 51, 255, 0.45)",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#5a33ff",
  marginBottom: "10px",
};
const title: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: 0,
};
const sub: React.CSSProperties = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.6)",
  margin: "8px auto 0",
  maxWidth: "560px",
  lineHeight: 1.5,
};
