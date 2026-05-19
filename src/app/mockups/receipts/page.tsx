import Receipts1Bento from "@/components/mockups/Receipts1Bento";
import Receipts2Marquee from "@/components/mockups/Receipts2Marquee";
import Receipts3StoryScroll from "@/components/mockups/Receipts3StoryScroll";
import Receipts4ClientCards from "@/components/mockups/Receipts4ClientCards";
import Receipts5Literal from "@/components/mockups/Receipts5Literal";
import Receipts6Paper from "@/components/mockups/Receipts6Paper";
import Receipts7Wallet from "@/components/mockups/Receipts7Wallet";
import Receipts8Slot from "@/components/mockups/Receipts8Slot";
import Receipts9Bloomberg from "@/components/mockups/Receipts9Bloomberg";
import Receipts10SplitFlap from "@/components/mockups/Receipts10SplitFlap";
import Receipts11AiChat from "@/components/mockups/Receipts11AiChat";
import Receipts12Dashboard from "@/components/mockups/Receipts12Dashboard";
import Receipts13Printer from "@/components/mockups/Receipts13Printer";
import Receipts14HoloCard from "@/components/mockups/Receipts14HoloCard";
import Receipts15Neon from "@/components/mockups/Receipts15Neon";
import {
  ReceiptsDecoA,
  ReceiptsDecoB,
  ReceiptsDecoC,
  ReceiptsDecoD,
  ReceiptsDecoE,
} from "@/components/mockups/ReceiptsPrinterDeco";
import CurrentReceipts from "@/components/sections/Receipts";

const OPTIONS = [
  { tag: "Current", title: "Live on a2media.ca", sub: "Six aggregate stats, equal-weight 3×2 grid, count-up animation. The baseline." },
  { tag: "Option 1", title: "Horizontal Strip", sub: "Single row, all 6 stats side-by-side with thin vertical dividers between them. Dashboard / fintech feel. Compact." },
  { tag: "Option 2", title: "Single Marquee", sub: "Infinite horizontal ticker of all 6 stats. Pauses on hover. Energetic + dense without needing more vertical space." },
  { tag: "Option 3", title: "Big-Type Vertical Stack", sub: "Six stacked rows, full-width. Index number → giant stat → label. Editorial / magazine. Each stat gets its own band." },
  { tag: "Option 4", title: "Staggered 2×3 Mosaic", sub: "Two rows of three cards, middle card in each row slightly bigger + offset. Subtle chromatic variety (purple / lilac / neon backdrops). Playful but on-brand." },
  { tag: "Option 5", title: "Spotlight Rotator", sub: "One stat at a time, full-bleed, massive type. Auto-rotates every 4s with crossfade. Progress pips double as jump-to controls. Cinematic." },
  { tag: "Option 6", title: "The Paper Receipt", sub: "Section is a printed thermal receipt — monospace, dashed dividers, line items, total band, barcode footer. Distinct stop-scroll moment." },
  { tag: "Option 7", title: "Pinned Mini-Receipts", sub: "Six small individual receipt slips, one per stat, scattered at slight rotations like printed slips pinned to a board. Tactile + plural — leans hard into 'receipts'." },
  { tag: "Option 8 — wild", title: "Slot Machine", sub: "Six spinning drum reels that cha-cha-CHA into place, JACKPOT overlay flashes. Casino metaphor + the 'house always pays out' wordplay. Pull lever to respin." },
  { tag: "Option 9 — wild", title: "Bloomberg Terminal", sub: "Black background, monospace amber/green text, blinking cursor. Types a command, prints the stats as a terminal table. Hyper-distinctive for B2B. Confidence by raw output." },
  { tag: "Option 10 — wild", title: "Split-Flap Departure Board", sub: "Airport-style mechanical board with characters that clack into place. Each row = one stat. Retro tactility. Reads as 'official' without being stuffy." },
  { tag: "Option 11 — wild", title: "AI Chat Receipt", sub: "Fake ChatGPT thread — user asks 'show me your receipts,' A2 replies one bubble at a time. Plays directly into the AEO/LLM thesis the blog is built around. Meta + on-strategy." },
  { tag: "Option 12 — wilder", title: "Dashboard Cluster", sub: "Six analog gauges with sweeping needles, redline zones, automotive instrument-cluster aesthetic. Reads as 'performance' and 'precision' without saying it." },
  { tag: "Option 13 — wilder", title: "Live Thermal Printer", sub: "A printer head at the top, paper unspooling in real time, lines feeding out one at a time with a subtle whir. Mechanical satisfaction. Different from the static paper receipt." },
  { tag: "Option 14 — wilder", title: "Holographic Trading Card", sub: "Single premium card. Front: A2 wordmark with holographic foil shimmer that follows your cursor. Click to flip. Back: 6 stats laid out like a Pokémon card stat block. Collectible." },
  { tag: "Option 15 — wilder", title: "Vintage Neon Sign", sub: "Neon-tube text glowing against a brick wall. Chasing bulb perimeter, one tile flickers like a broken light. 'OPEN' sign on top. Las Vegas / diner storefront. Maximum personality." },
  { tag: "Deco A", title: "Stamp + Receipt-No Watermark", sub: "Live printer + a vertical 'RECEIPT NO. 0042 / ISSUED · A2 MEDIA' watermark on the left, red 'APPROVED FOR PIPELINE' rubber stamp on the right. Fills negative space with intentional receipt-clerk decoration. Side elements hide below 1100px." },
  { tag: "Deco B", title: "Brand-Mark Side Column", sub: "Two-column layout: massive 'A2' wordmark + italic positioning line + 3-item bullet list on the left, printer on the right. Reads as a confident editorial layout. Collapses to single column at 880px." },
  { tag: "Deco C", title: "Ghost Receipts Stack", sub: "Two cream-colored 'ghost' receipts at opposite rotations sit behind the live printer at low opacity. Implies a stack — 'there are more where this one came from.' Quiet, classy. Ghosts hide below 880px." },
  { tag: "Deco D", title: "Sticky-Note Callouts", sub: "Three yellow Post-it notes scattered around the printer with handwriting-font client wins (Reveal $600K, Auth0 22K, PartnerHacker 8mo). Most playful. Hides notes below 1100px." },
  { tag: "Deco E", title: "Vertical Side Rails", sub: "Two thin monospace text rails running vertically on the left and right of the printer ('A2 MEDIA · RECEIPT NO. 0042 · 2023 – PRESENT' / 'CONTENT THAT CONVERTS · VERIFIED OUTCOMES · a2media.ca'). Cleanest, most restrained. Rails hide below 1100px." },
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

export default function ReceiptsMockups() {
  return (
    <>
      <Label idx={0} />
      <CurrentReceipts />
      <Label idx={1} />
      <Receipts1Bento />
      <Label idx={2} />
      <Receipts2Marquee />
      <Label idx={3} />
      <Receipts3StoryScroll />
      <Label idx={4} />
      <Receipts4ClientCards />
      <Label idx={5} />
      <Receipts5Literal />
      <Label idx={6} />
      <Receipts6Paper />
      <Label idx={7} />
      <Receipts7Wallet />
      <Label idx={8} />
      <Receipts8Slot />
      <Label idx={9} />
      <Receipts9Bloomberg />
      <Label idx={10} />
      <Receipts10SplitFlap />
      <Label idx={11} />
      <Receipts11AiChat />
      <Label idx={12} />
      <Receipts12Dashboard />
      <Label idx={13} />
      <Receipts13Printer />
      <Label idx={14} />
      <Receipts14HoloCard />
      <Label idx={15} />
      <Receipts15Neon />
      <Label idx={16} />
      <ReceiptsDecoA />
      <Label idx={17} />
      <ReceiptsDecoB />
      <Label idx={18} />
      <ReceiptsDecoC />
      <Label idx={19} />
      <ReceiptsDecoD />
      <Label idx={20} />
      <ReceiptsDecoE />
    </>
  );
}

const labelHeader: React.CSSProperties = {
  background: "#000",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  padding: "32px 24px",
  textAlign: "center",
};
const labelTag: React.CSSProperties = {
  display: "inline-block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#8f45ee",
  border: "1px solid rgba(143,69,238,0.4)",
  padding: "4px 12px",
  borderRadius: 999,
  marginBottom: 12,
};
const labelTitle: React.CSSProperties = {
  fontFamily: "var(--a2-sans)",
  fontSize: 28,
  fontWeight: 600,
  color: "#fff",
  margin: "0 0 6px",
  letterSpacing: "-0.01em",
};
const labelSub: React.CSSProperties = {
  fontSize: 14,
  color: "rgba(255,255,255,0.6)",
  margin: "0 auto",
  maxWidth: 720,
  lineHeight: 1.55,
};
