export const TICKER = [
  "deals stalling in the pipeline",
  "leads who've never heard your name",
  "$30K brand video sitting on a homepage",
  "content that gets likes but not pipeline",
  "demo no-shows",
  "prospects don't understand what you do",
  "buyers ghosting after the first call",
  "reps re-explaining the product on every call",
  "zero inbound from organic",
  "prospects can't differentiate you from competitors",
  "sales sending decks nobody opens",
  "warm leads going cold between touches",
];

export type Study = {
  id: string;
  name: string;
  bigStat: string;
  bigLabel: string;
  bigSub: string;
  tabName: string;
  tabOutcome: string;
  stats: { num: string; label: string; sub?: string }[];
  before: string;
  after: string;
  videoEngine: { title: string; body: string };
  closingPill?: { text: string; emphasis: string };
};

export const STUDIES: Study[] = [
  {
    id: "reveal",
    name: "Reveal",
    bigStat: "$600K",
    bigLabel: "closed-won revenue",
    bigSub: "from video at Reveal",
    tabName: "Reveal",
    tabOutcome: "$600K · 40% faster close",
    stats: [
      { num: "$600K", label: "Closed-won revenue", sub: "attributed to video" },
      { num: "40%", label: "Faster time to close", sub: "(60 → 35 days)" },
      { num: "7,000", label: "Attendees at their", sub: "virtual summit" },
      { num: "100+", label: "Videos produced", sub: "in 1.5 years" },
    ],
    before:
      "Reveal had no video content, no content marketing, and no content team. Their sales team was closing deals in 60 days with zero marketing air cover, relying entirely on outbound and word of mouth.",
    after:
      "Sales reps started sending videos directly to prospects. Buyers were showing up to calls already educated from LinkedIn. The sales cycle compressed by 40%, and video-attributed deals closed $600K in revenue over 1.5 years.",
    videoEngine: {
      title: "The Video Engine (in collaboration with PartnerHacker)",
      body:
        "We stood up Reveal's entire content engine from scratch. We built out their video marketing strategy from TOFU to BOFU. Created 100+ videos across the full spectrum: LinkedIn thought leadership, YouTube education, outbound sales enablement, top-of-funnel comedy, webinars, and more. We also helped promote and produce the Nearbound Summit, a 7,000-person virtual summit that generated pipeline and put Reveal at the center of the partner-led growth conversation.",
    },
    closingPill: {
      text: "Reveal later",
      emphasis:
        "merged with Crossbeam. Their marketing engine helped make it happen.",
    },
  },
  {
    id: "okta",
    name: "Auth0 (Okta)",
    bigStat: "22K+",
    bigLabel: "new subscribers",
    bigSub: "added organically at Auth0",
    tabName: "Auth0 (Okta)",
    tabOutcome: "22K subs · 5.2M views",
    stats: [
      { num: "5.2M+", label: "Total video views", sub: "across channels" },
      { num: "22K+", label: "New subscribers", sub: "added organically" },
      { num: "35%", label: "Video-sourced", sub: "event registrations" },
      { num: "2", label: "YouTube channels", sub: "revived & scaled" },
    ],
    before:
      "Auth0's YouTube channel was stalling. Losing subscribers monthly despite existing content. Years of paid ad spend had inflated view counts, but organic engagement was flat. The channel needed a strategy that turned views into real developer engagement and event registrations.",
    after:
      "The channel went from bleeding subscribers to 22K+ new organic subscribers and 5.2M+ views with minimal ad spend. Video content drove 35% of registrations for Oktane and Developer Day virtual events, turning content into a measurable pipeline driver for developer signups and product adoption.",
    videoEngine: {
      title: "The Video Engine",
      body:
        "We revived Auth0's YouTube channel and took them multichannel across YouTube, LinkedIn, and TikTok. We launched focused developer education series, produced content for the main Okta channel, and built video funnels that drove developer signups for the Oktane and Developer Day virtual events. Instead of chasing virality, we created consistent streams of content that educated developers and fostered community, turning Auth0 into a trusted resource for developers globally.",
    },
    closingPill: {
      text: "Engagement ongoing since Feb 2024.",
      emphasis:
        "Video now drives event registrations, developer adoption, and stakeholder buy-in.",
    },
  },
  {
    id: "partnerhacker",
    name: "PartnerHacker",
    bigStat: "8 mo",
    bigLabel: "from launch to acquired",
    bigSub: "PartnerHacker, $0 → exit",
    tabName: "PartnerHacker",
    tabOutcome: "$0 to acquired in 8mo",
    stats: [
      { num: "$900K+", label: "Closed-won", sub: "in sponsorships" },
      { num: "5,000", label: "Attendees at their", sub: "virtual summit" },
      { num: "8 mo", label: "From launch", sub: "to acquisition" },
      { num: "50", label: "Videos", sub: "produced" },
    ],
    before:
      "PartnerHacker was a brand new company with a hypothesis: partnerships needed its own media brand. They had an audience, but no video team and a small content library. They needed to turn attention into authority fast in a space dominated by established players.",
    after:
      "We became their first video hire and built the content engine from day one. Within months, PartnerHacker was recognized at events, leading conversations on LinkedIn, and positioned as the definitive voice in the partnerships space. Alongside them, using video, we coined Nearbound, a term that became an industry standard alongside inbound and outbound. It showed up on hiring boards, was adopted by other companies to describe their go-to-market motions, and the term has since evolved into ELG (Ecosystem Led Growth).",
    videoEngine: {
      title: "The Video Engine",
      body:
        "We produced 50 pieces of content across webinars, podcasts, short video clips, and full-funnel video (top, middle, and bottom of funnel). We helped host the largest partnerships webinar in history at the time (5,000 attendees), closed $900K+ in sponsorships, and built the video presence that made PartnerHacker synonymous with partner-led growth.",
    },
    closingPill: {
      text: "PartnerHacker was",
      emphasis:
        "acquired just 8 months after launch. Content made the brand impossible to ignore.",
    },
  },
];

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const range = (p: number, start: number, end: number) =>
  clamp01((p - start) / (end - start));
