import BentoReel from "@/components/mockups/BentoReel";
import ScrubReel from "@/components/mockups/ScrubReel";
import KineticReel from "@/components/mockups/KineticReel";
import MarqueeWall from "@/components/mockups/MarqueeWall";
import PhoneStack from "@/components/mockups/PhoneStack";
import TabSwitcher from "@/components/mockups/TabSwitcher";
import Filmstrip from "@/components/mockups/Filmstrip";

const OPTIONS = [
  { tag: "Option A", title: "Bento Reel", sub: "Parallel — all formats visible at once with ken-burns motion. Apple / Notion vibe." },
  { tag: "Option B", title: "Sticky Scrub Reel", sub: "Sequential — horizontal cards translate as the user scrolls vertically. Stripe / Linear vibe." },
  { tag: "Option C", title: "Kinetic Reel", sub: "Focused — rotating italic word with synchronized device-frame crossfade. Reuses the Hero italic pattern." },
  { tag: "Option D", title: "Marquee Wall", sub: "Abundant — two rows of tiles auto-scrolling in opposite directions. Hover to pause. Energetic, dense." },
  { tag: "Option E", title: "Phone Stack 3D", sub: "Tactile — three tilted phone frames showcasing short-form. Built for the social-feed positioning." },
  { tag: "Option F", title: "Tab Switcher", sub: "Controlled — user picks a format pill, featured viewer swaps below. Portfolio-style exploration." },
  { tag: "Option G", title: "Reel Filmstrip", sub: "Cinematic — sprocket-edged filmstrip with a centered playhead. Old-school cinema reel feel." },
];

function Label({ idx }: { idx: number }) {
  const o = OPTIONS[idx];
  return (
    <header style={labelHeader}>
      <span style={labelTag}>{o.tag}</span>
      <h1 style={labelTitle}>{o.title}</h1>
      <p style={labelSub}>{o.sub}</p>
    </header>
  );
}

export default function MockupsPage() {
  return (
    <>
      <Label idx={0} />
      <BentoReel />
      <Label idx={1} />
      <ScrubReel />
      <Label idx={2} />
      <KineticReel />
      <Label idx={3} />
      <MarqueeWall />
      <Label idx={4} />
      <PhoneStack />
      <Label idx={5} />
      <TabSwitcher />
      <Label idx={6} />
      <Filmstrip />

      <section style={ctaSection}>
        <p style={ctaEyebrow}>Want to see the actual work?</p>
        <h2 style={ctaTitle}>
          Browse our{" "}
          <span style={ctaTitleAccent}>full portfolio.</span>
        </h2>
        <p style={ctaSub}>
          Every video we&apos;ve shipped, organized by format, client, and
          outcome.
        </p>
        <a
          href="https://fast.wistia.com/embed/channel/fj6gynv9qi"
          target="_blank"
          rel="noreferrer"
          style={ctaBtn}
        >
          See our full portfolio <span aria-hidden>→</span>
        </a>
      </section>
    </>
  );
}

const labelHeader: React.CSSProperties = {
  background: "#000",
  color: "#fff",
  padding: "48px 24px 28px",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  textAlign: "center",
};

const labelTag: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 12px",
  background: "rgba(90, 51, 255, 0.15)",
  border: "1px solid rgba(90, 51, 255, 0.45)",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#5a33ff",
  marginBottom: "12px",
};

const labelTitle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: 0,
};

const labelSub: React.CSSProperties = {
  fontSize: "14px",
  color: "rgba(255,255,255,0.65)",
  margin: "8px auto 0",
  maxWidth: "560px",
  lineHeight: 1.5,
};

const ctaSection: React.CSSProperties = {
  background: "#0d0536",
  color: "#fff",
  padding: "96px 24px 120px",
  textAlign: "center",
  borderTop: "1px solid rgba(255,255,255,0.08)",
};

const ctaEyebrow: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#5a33ff",
  marginBottom: "14px",
};

const ctaTitle: React.CSSProperties = {
  fontSize: "clamp(36px, 5vw, 56px)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  margin: "0 0 14px",
};

const ctaTitleAccent: React.CSSProperties = {
  fontFamily: "var(--a2-display)",
  fontStyle: "italic",
  fontWeight: 500,
  color: "#5a33ff",
};

const ctaSub: React.CSSProperties = {
  fontSize: "16px",
  color: "rgba(255,255,255,0.7)",
  maxWidth: "540px",
  margin: "0 auto 36px",
  lineHeight: 1.55,
};

const ctaBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "18px 36px",
  background: "#5a33ff",
  color: "#fff",
  fontSize: "16px",
  fontWeight: 600,
  borderRadius: "999px",
  textDecoration: "none",
  boxShadow:
    "0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(90, 51, 255, 0.45), 0 0 60px rgba(90, 51, 255, 0.25)",
};
