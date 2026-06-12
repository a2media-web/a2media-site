import ClientTestimonials from "@/components/sections/ClientTestimonials";
import Pricing from "@/components/sections/Pricing";
import Disq1SaidNoTo from "@/components/mockups/Disqualifier/Disq1SaidNoTo";
import Disq2HonestList from "@/components/mockups/Disqualifier/Disq2HonestList";
import Disq3SkipTheCall from "@/components/mockups/Disqualifier/Disq3SkipTheCall";
import Disq4Letter from "@/components/mockups/Disqualifier/Disq4Letter";
import Disq5Application from "@/components/mockups/Disqualifier/Disq5Application";
import Disq6Roster from "@/components/mockups/Disqualifier/Disq6Roster";
import Disq7Waitlist from "@/components/mockups/Disqualifier/Disq7Waitlist";
import Disq8Ticker from "@/components/mockups/Disqualifier/Disq8Ticker";
import Disq9Math from "@/components/mockups/Disqualifier/Disq9Math";
import Disq10AntiCTA from "@/components/mockups/Disqualifier/Disq10AntiCTA";
import Disq11Tape from "@/components/mockups/Disqualifier/Disq11Tape";
import Disq12Funnel from "@/components/mockups/Disqualifier/Disq12Funnel";
import Disq13Quiz from "@/components/mockups/Disqualifier/Disq13Quiz";

const VARIANTS: { tag: string; title: string; sub: string; psych: string; Render: () => React.ReactElement }[] = [
  {
    tag: "Variant 01 · Stat-led",
    title: '"We\'ve said no to 47 companies this year."',
    sub: "Big number anchors the page. Reasons we passed listed alongside. Anti-sales positioning — Christina trusts honesty over polish. Inverse social proof: scarcity by selection.",
    psych: "Hits her authority distrust (no awards, no credentials — just a stat). Triggers reverse psychology: people want what's exclusive.",
    Render: Disq1SaidNoTo,
  },
  {
    tag: "Variant 02 · Two-column",
    title: "The honest list (right fit / not right fit)",
    sub: "Green vs red columns. Direct, peer-to-peer, no design tricks. Plain practitioner voice over agency polish.",
    psych: "Easiest to scan. Lets Christina self-sort in under 10 seconds. Matches her vetting behavior (she's already doing this filter in her head).",
    Render: Disq2HonestList,
  },
  {
    tag: "Variant 03 · Skip the call if",
    title: '"Skip the call if any of these are true."',
    sub: "Single-column, conversational, headline-driven. Asks her to self-disqualify before booking. Then flips to what the call actually looks like.",
    psych: "Respects her time (her #1 hidden value). The flip at the bottom reframes the call away from 'discovery' into something concrete — 1-page note for her CMO even if no deal.",
    Render: Disq3SkipTheCall,
  },
  {
    tag: "Variant 04 · Personal letter",
    title: "A note from Ademola",
    sub: "Drops the agency mask. First-person letter, paper-ish background. Names the invisible work explicitly (9pm editing, accidental video department).",
    psych: "STRONGEST trust-builder. Names her invisible burden by name — that's the exact move the avatar research says drops her defenses. Personal > corporate every time.",
    Render: Disq4Letter,
  },
  {
    tag: "Variant 05 · Interactive form",
    title: "Pre-call qualification form (5 checkboxes)",
    sub: "She ticks the boxes herself. Score updates live: '3 of 5 — looks like a fit.' Implies real selectivity and gives her agency.",
    psych: "Engagement time on page goes up 3-5x. Active participation > passive reading. The score makes the qualification tangible — she leaves knowing where she stands.",
    Render: Disq5Application,
  },
  {
    tag: "Variant 06 · The Roster",
    title: "We work with 8 clients. We have 1 spot.",
    sub: "Eight slots visualized. Seven booked, one pulsing open. Hard capacity cap rendered as a visual scarcity object.",
    psych: "Scarcity made literal. The cap is something you can see, not a claim. Triggers loss aversion: the 1 spot might be gone next week.",
    Render: Disq6Roster,
  },
  {
    tag: "Variant 07 · The Waitlist",
    title: "We open intake when a client cycles out.",
    sub: "Six-month calendar booked out. Email signup for the next opening. Reframes the booking flow as queue, not calendar.",
    psych: "Time scarcity. Premium agencies have wait times. Joining a waitlist also creates a low-commitment first action that builds psychological investment.",
    Render: Disq7Waitlist,
  },
  {
    tag: "Variant 08 · Live Rejection Ticker",
    title: "47 rejected this year. Receipts auto-scroll.",
    sub: "Big number + animated vertical ticker of recent rejections with dates and verbatim reasons. Subtle 'live' pulse.",
    psych: "Motion + dated specifics read as credible, not curated. The number could be marketing. The dated entries cannot.",
    Render: Disq8Ticker,
  },
  {
    tag: "Variant 09 · The Capacity Math",
    title: "It is not selectivity. It is math.",
    sub: "Visual equation: 10 editors × 30 hrs ÷ 35 hrs per client ≈ 8 active clients. Reveals the cap as honest constraint.",
    psych: "Reframes scarcity from gatekeeping into operations. Math reads as honest. Removes the 'we are too good for you' arrogance risk that pure scarcity carries.",
    Render: Disq9Math,
  },
  {
    tag: "Variant 10 · The Anti-CTA",
    title: "Most readers should not click this button.",
    sub: "Disabled booking button + 4-checkbox self-disqualifier. The CTA only unlocks when all 4 are checked.",
    psych: "Reverse psychology (forbidden = wanted) + behavioral commitment (checking the boxes is a private 'yes' before the public one). The unlocked CTA feels earned.",
    Render: Disq10AntiCTA,
  },
  {
    tag: "Variant 11 · The Interview Tape",
    title: "We turned these down in the last 30 days.",
    sub: "Three anonymized rejection 'transcript' cards. Specific dates, real verbatim reasons.",
    psych: "Receipts > claims. Specificity (Apr 28, Series A fintech) destroys the 'is this just marketing copy' defense. Three distinct rejection patterns prime the buyer to self-check against each one.",
    Render: Disq11Tape,
  },
  {
    tag: "Variant 12 · The Funnel",
    title: "213 → 84 → 17 → 6. What the funnel actually looks like.",
    sub: "Horizontal bars shrinking from inbound to signed. Final bar is Electric Purple. The drop-off is felt visually, not read.",
    psych: "Visual drop-off hits harder than the same numbers in prose. The 3% conversion frames a YES from A2 as a rare outcome they have to earn.",
    Render: Disq12Funnel,
  },
  {
    tag: "Variant 13 · The Quiz Gate",
    title: "Should you even book? 3 yes-or-no.",
    sub: "Interactive 3-question quiz. Any 'no' shows a fail state with a soft offer. All 'yes' unlocks the booking CTA.",
    psych: "Gamification holds attention 4-6x longer. Earned CTAs feel valuable. The fail state with a free resource preserves goodwill from non-fits without giving them the booking link.",
    Render: Disq13Quiz,
  },
];

function VariantHeader({ idx }: { idx: number }) {
  const v = VARIANTS[idx];
  return (
    <header style={hdrShell}>
      <div style={hdrInner}>
        <span style={hdrTag}>{v.tag}</span>
        <h1 style={hdrTitle}>{v.title}</h1>
        <p style={hdrSub}>{v.sub}</p>
        <p style={hdrPsych}>
          <span style={hdrPsychLabel}>Why Christina:</span> {v.psych}
        </p>
      </div>
    </header>
  );
}

function ContextBand({ where, label }: { where: "above" | "below"; label: string }) {
  return (
    <div style={{ ...bandShell, background: where === "above" ? "#1a1430" : "#1a1430" }}>
      <span style={bandArrow}>{where === "above" ? "↑ above this:" : "↓ below this:"}</span>
      <span style={bandText}>{label}</span>
    </div>
  );
}

export default function DisqualifierMockups() {
  return (
    <>
      {VARIANTS.map((v, i) => (
        <div key={v.tag}>
          <VariantHeader idx={i} />
          <ContextBand where="above" label="Client Testimonials (rendered below)" />
          <ClientTestimonials />
          <ContextBand where="above" label="↑ End of Client Testimonials  ·  ↓ New Disqualifier section" />
          <v.Render />
          <ContextBand where="below" label="↑ End of Disqualifier  ·  ↓ Pricing section begins" />
          <Pricing />
          <ContextBand where="below" label="End of Pricing — next variant below" />
        </div>
      ))}
    </>
  );
}

const hdrShell: React.CSSProperties = {
  background: "#000",
  borderTop: "2px solid #5A33FF",
  padding: "44px 24px 36px",
};
const hdrInner: React.CSSProperties = {
  maxWidth: 920,
  margin: "0 auto",
  textAlign: "center",
};
const hdrTag: React.CSSProperties = {
  display: "inline-block",
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#28DFE8",
  border: "1px solid rgba(40, 223, 232, 0.4)",
  padding: "5px 14px",
  borderRadius: 999,
  marginBottom: 14,
};
const hdrTitle: React.CSSProperties = {
  fontFamily: "var(--a2-sans)",
  fontSize: 32,
  fontWeight: 700,
  color: "#fff",
  margin: "0 0 10px",
  letterSpacing: "-0.015em",
  lineHeight: 1.15,
};
const hdrSub: React.CSSProperties = {
  fontSize: 14.5,
  lineHeight: 1.55,
  color: "rgba(255,255,255,0.7)",
  margin: "0 auto 12px",
  maxWidth: 720,
};
const hdrPsych: React.CSSProperties = {
  fontSize: 13.5,
  lineHeight: 1.55,
  color: "rgba(255,255,255,0.75)",
  margin: "16px auto 0",
  maxWidth: 720,
  padding: "12px 20px",
  background: "rgba(90, 51, 255, 0.12)",
  border: "1px solid rgba(90, 51, 255, 0.3)",
  borderRadius: 10,
};
const hdrPsychLabel: React.CSSProperties = {
  fontWeight: 800,
  color: "#8F45EE",
  letterSpacing: "0.04em",
  marginRight: 6,
};

const bandShell: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: "12px 24px",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.6)",
};
const bandArrow: React.CSSProperties = { color: "#28DFE8" };
const bandText: React.CSSProperties = { color: "rgba(255,255,255,0.55)" };
