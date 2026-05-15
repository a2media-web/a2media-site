import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import SpotlightTestimonials from "@/components/mockups/Testimonials/Spotlight";
import TheaterTestimonials from "@/components/mockups/Testimonials/Theater";
import EditorialTestimonials from "@/components/mockups/Testimonials/Editorial";
import SenjaWallTestimonials from "@/components/mockups/Testimonials/SenjaWall";
import VideoPlusSenjaTestimonials from "@/components/mockups/Testimonials/VideoPlusSenja";
import {
  CurtainHero,
  SenjaLed,
  StickyDiptych,
  TabbedToggle,
  EditorialPullQuote,
  StatBannerOpen,
  BackgroundVideo,
  SandwichedSenja,
  SideQuoteVideo,
  MagazineCover,
} from "@/components/mockups/Testimonials/MoreVariants";

export default function TestimonialsMockup() {
  return (
    <main>
      <Block tag="A" name="Cinematic Spotlight" desc="Big single video, cast row of names below. Senja-free." Component={SpotlightTestimonials} />
      <Block tag="B" name="Theater Stage" desc="Video center, glassmorphic quote cards either side. Senja-free." Component={TheaterTestimonials} />
      <Block tag="C" name="Editorial Spread" desc="Magazine layout: video left, quote stack right. Senja-free." Component={EditorialTestimonials} />
      <Block tag="D" name="Senja Wall" desc="Pure Senja embed in an A2 frame. No video." Component={SenjaWallTestimonials} />
      <Block tag="E" name="Video + Senja" desc="Video on top, Senja wall below as 'and there's more.'" Component={VideoPlusSenjaTestimonials} />
      <Block tag="F" name="Curtain Hero" desc="Wide cinematic video banner up top, Senja wall below. Big-screen feel." Component={CurtainHero} />
      <Block tag="G" name="Senja-Led Reveal" desc="Senja wall first as warm-up, video reveal as the closer. Inverts the usual order." Component={SenjaLed} />
      <Block tag="H" name="Sticky Diptych" desc="Video pins on the left while the Senja wall scrolls on the right. Both visible at all times." Component={StickyDiptych} />
      <Block tag="I" name="Tabbed Toggle" desc="Watch / Read tabs. Lets the visitor pick their format. Saves vertical space." Component={TabbedToggle} />
      <Block tag="J" name="Editorial Pull-Quote" desc="Massive italic line of brag copy with video tucked into the layout. Senja wall under." Component={EditorialPullQuote} />
      <Block tag="K" name="Stat Banner Open" desc="Receipts banner first, then video, then Senja wall. Sequential proof." Component={StatBannerOpen} />
      <Block tag="L" name="Background Video" desc="Video plays as muted ambient backdrop. Senja embed sits in a glass card on top. Most theatrical." Component={BackgroundVideo} />
      <Block tag="M" name="Sandwiched Senja" desc="Small video CTA at top, big Senja in the middle, second small video CTA at bottom." Component={SandwichedSenja} />
      <Block tag="N" name="Side Quote + Video" desc="A floating italic quote left, video right. Senja under the duo." Component={SideQuoteVideo} />
      <Block tag="O" name="Magazine Cover" desc="Video-as-cover with massive overlaid headline. Senja wall under. Most fashion-magazine." Component={MagazineCover} />
    </main>
  );
}

function Block({
  tag,
  name,
  desc,
  Component,
}: {
  tag: string;
  name: string;
  desc: string;
  Component: React.ComponentType;
}) {
  return (
    <>
      <header style={hdr}>
        <span style={tagSx}>Testimonials · Variant {tag}</span>
        <h1 style={titleSx}>{name}</h1>
        <p style={subSx}>{desc}</p>
      </header>
      <Pricing />
      <Component />
      <FAQ />
    </>
  );
}

const hdr: React.CSSProperties = {
  background: "#000",
  color: "#fff",
  padding: "32px 24px",
  textAlign: "center",
  borderTop: "1px solid rgba(255,255,255,0.08)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};
const tagSx: React.CSSProperties = {
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
const titleSx: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: 0,
};
const subSx: React.CSSProperties = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.6)",
  margin: "8px auto 0",
  maxWidth: "640px",
  lineHeight: 1.5,
};
