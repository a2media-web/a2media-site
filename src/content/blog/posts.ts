/**
 * Blog post data — typed, hand-authored.
 *
 * This is preview-stage. When the generation pipeline ships, posts move to
 * MDX files in `src/content/blog/[slug].mdx` and a loader serializes them
 * into this same `BlogPost` shape.
 *
 * Every post must conform to the template at `src/content/blog/_TEMPLATE.md`.
 */

export type ProprietaryInputType =
  | "client-stat"
  | "script-excerpt"
  | "call-quote"
  | "screenshot"
  | "original-research";

export type Cluster =
  | "strategy"
  | "pricing"
  | "team"
  | "formats"
  | "distribution"
  | "measurement";

export type Intent = "TOFU" | "MOFU" | "BOFU";

export type CtaMode = "sell" | "helpful";

export type BlogPostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "ol"; items: string[] }
  | {
      type: "proprietary";
      label: string; // e.g. "From a real Reveal engagement"
      body: string; // the quote / stat / excerpt itself
      source: string; // attribution line
    };

export type BlogPost = {
  question: string;
  slug: string;
  answer: string; // 40-80 word lead
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
  author: string;
  cluster: Cluster;
  clusterLabel: string;
  intent: Intent;
  ctaMode: CtaMode;
  proprietaryInput: {
    type: ProprietaryInputType;
    source: string;
    detail: string;
  };
  outboundCitations: { url: string; anchor: string }[];
  internalLinks: { url: string; anchor: string }[];
  faqSchema: boolean;
  body: BlogPostBlock[];
  closing: {
    text: string;
    cta: { url: string; anchor: string };
  };
};

export const POSTS: BlogPost[] = [
  {
    question: "How much does B2B SaaS video editing cost?",
    slug: "how-much-does-saas-video-editing-cost",
    answer:
      "Most B2B SaaS companies spend $5,000 to $25,000 per month on video editing, depending on volume and strategy. The split is usually 60% editor labor, 30% strategy and creative direction, 10% tooling. Companies that bundle strategy in, instead of hiring an editor and figuring out what to make separately, close the gap between footage and pipeline faster.",
    publishedAt: "2026-05-12",
    updatedAt: "2026-05-12",
    author: "Ademola Adelakun",
    cluster: "pricing",
    clusterLabel: "Pricing & Budgeting",
    intent: "BOFU",
    ctaMode: "sell",
    proprietaryInput: {
      type: "client-stat",
      source: "Reveal case study",
      detail: "$600K closed-won attributed to video at a fraction of deal size",
    },
    outboundCitations: [
      {
        url: "https://wistia.com/learn/marketing/video-marketing-statistics",
        anchor: "Wistia 2024 State of Video Report",
      },
      {
        url: "https://www.demandcurve.com/playbooks/video-content",
        anchor: "Demand Curve video playbook",
      },
      {
        url: "https://blog.hubspot.com/marketing/video-marketing-budget",
        anchor: "HubSpot video budget benchmarks",
      },
    ],
    internalLinks: [
      { url: "/#Pricing", anchor: "Video Growth Engine pricing" },
      {
        url: "/blog/in-house-vs-agency-video-editor",
        anchor: "in-house vs. agency",
      },
    ],
    faqSchema: true,
    body: [
      {
        type: "h2",
        text: "What's included at each price tier?",
      },
      {
        type: "p",
        text: "At the freelance tier, you're paying for editing only. You bring scripts, you bring strategy, the editor delivers cuts. At the small-agency tier, you get editing plus light strategy: someone else picks the formats and writes the scripts. At full-service, you're buying a team that owns the whole engine, from ICP research to script to edit to distribution to measurement.",
      },
      {
        type: "table",
        headers: ["Tier", "Monthly spend", "What's included", "Best for"],
        rows: [
          [
            "Freelance editor",
            "$3K – $5K",
            "Editing only, you bring scripts",
            "Companies with internal strategy",
          ],
          [
            "Small agency",
            "$8K – $15K",
            "Editing + light strategy",
            "Companies in pilot phase",
          ],
          [
            "Full-service",
            "$20K – $25K",
            "Strategy + scripts + editing + distribution",
            "Companies treating video as a pipeline channel",
          ],
        ],
      },
      {
        type: "h2",
        text: "What changes the cost up or down?",
      },
      {
        type: "p",
        text: "Three things move the number. Volume: 4 videos a month vs. 14 videos a month is a 3x labor difference. Cinematography needs: a talking-head from a webinar recording costs nothing to source; a custom shoot with talent and crew is its own line item. Turnaround speed: 72-hour delivery costs more than a 2-week cycle because the team has to hold capacity for you.",
      },
      {
        type: "proprietary",
        label: "From the Reveal engagement",
        body: "Reveal's video work traced back to $600K in closed-won revenue and dropped their sales cycle 40% (60 days down to 35). The cost of the engagement was a fraction of the deal size it influenced. They also produced 100+ videos in 18 months and helped run the 7,000-attendee Nearbound Summit on the same retainer.",
        source: "A2 Media — Reveal case study",
      },
      {
        type: "h2",
        text: "When does the spend pay back?",
      },
      {
        type: "p",
        text: "Faster than founders expect, slower than CFOs hope. Most clients see leading indicators (target-account engagement, video views from named accounts, sales-call mentions) in the first 60 days. Closed-won attribution shows up at the 90 to 120-day mark, once the videos have time to influence active deals. If you're already running paid social, redirecting 20% of that budget into a strategy-led video engine is usually the highest-leverage move available.",
      },
    ],
    closing: {
      text: "The honest answer is that most B2B SaaS companies underspend on video, then overspend on ads to compensate. If you want to see what a flexible 3 to 6-month engagement actually delivers, the breakdown is on the pricing page.",
      cta: { url: "/#Pricing", anchor: "See the Video Growth Engine →" },
    },
  },
  {
    question:
      "Should you hire an in-house video editor or work with an agency?",
    slug: "in-house-vs-agency-video-editor",
    answer:
      "Hire in-house when video is core to your product story and you'll need 20+ videos a month for the next two years. Hire an agency when you need strategy, format range, and pipeline impact in months not quarters. Most B2B SaaS companies between $10M and $100M ARR get more leverage from an agency, because the bottleneck is rarely editing capacity. It's knowing what to make.",
    publishedAt: "2026-05-12",
    updatedAt: "2026-05-12",
    author: "Ademola Adelakun",
    cluster: "team",
    clusterLabel: "Hiring & Team",
    intent: "MOFU",
    ctaMode: "sell",
    proprietaryInput: {
      type: "call-quote",
      source: "Discovery call, B2B SaaS Head of Marketing, $40M ARR",
      detail:
        "We hired an editor, then realized we'd hired a button-pusher. We still didn't know what to make.",
    },
    outboundCitations: [
      {
        url: "https://www.gartner.com/en/marketing/insights/cmo-strategy",
        anchor: "Gartner CMO Strategy",
      },
      {
        url: "https://blog.hubspot.com/marketing/video-marketing",
        anchor: "HubSpot video marketing benchmarks",
      },
      {
        url: "https://www.lennysnewsletter.com/p/marketing-team-structure",
        anchor: "Lenny's marketing team structures",
      },
    ],
    internalLinks: [
      { url: "/#our-process", anchor: "our 3-step process" },
      {
        url: "/blog/how-much-does-saas-video-editing-cost",
        anchor: "the cost breakdown",
      },
    ],
    faqSchema: true,
    body: [
      {
        type: "h2",
        text: "What does an in-house editor actually solve?",
      },
      {
        type: "p",
        text: "An in-house editor solves throughput. If you already have a content engine generating raw footage faster than you can ship cuts, an in-house hire unblocks the queue. They sit in Slack, turn around quick edits, and own the small day-to-day asks. What they don't solve is strategy: most editors aren't paid to think about which video moves your buyer to the next stage, and very few have ever sat in a sales call.",
      },
      {
        type: "h2",
        text: "When does an agency outperform a hire?",
      },
      {
        type: "p",
        text: "Three conditions. First, you don't yet know which formats work for your audience, so you need range across Customer Stories, Episodic Series, Talking Heads, Animated Explainers, Shorts, and Product Launches without hiring six specialists. Second, you need someone who's already shipped this in your category and won't take 9 months to figure out your buyer. Third, your CMO needs measurement reporting, not just deliverables, and the agency owns that layer.",
      },
      {
        type: "ol",
        items: [
          "Volume target: under 10 videos/month? Agency. Above 20/month sustained for 2+ years? Hire.",
          "Format range: more than 3 formats? Agency. One repeated format? Hire.",
          "Strategy ownership: need someone to decide what to make? Agency. Have an internal strategist? Hire.",
          "Time to first results: need pipeline impact in 90 days? Agency. Building a 12-month engine? Either works.",
        ],
      },
      {
        type: "proprietary",
        label: "From a discovery call earlier this year",
        body: "A Head of Marketing at a $40M ARR SaaS told us: \"We hired an editor, then realized we'd hired a button-pusher. We still didn't know what to make.\" That's the failure mode in one sentence. Editing capacity isn't usually the bottleneck. Knowing what to make is.",
        source: "A2 Media — anonymized discovery call",
      },
      {
        type: "h2",
        text: "What about the hybrid model?",
      },
      {
        type: "p",
        text: "Hybrid works once you've validated formats. The pattern: agency owns strategy and the high-stakes pieces (customer stories, product launches, founder content), in-house owns repeat-format throughput (weekly shorts, repurposed clips, internal video). The split usually settles at 60/40 agency-to-in-house in months 6 through 12, then shifts further in-house once you've codified what's working.",
      },
    ],
    closing: {
      text: "If you're stuck between the two, the question to answer first is not \"can we afford the hire.\" It's \"do we know exactly what to make and what good looks like.\" If the answer is no, hiring an editor first is expensive guessing.",
      cta: { url: "/#our-process", anchor: "See how A2 Media runs strategy →" },
    },
  },
  {
    question: "What kind of video should a B2B SaaS company make first?",
    slug: "first-video-b2b-saas-company-should-make",
    answer:
      "Start with one customer story video. Not a founder talking-head, not an animated explainer, not a product demo. A 90-second customer story is the highest-leverage first asset for B2B SaaS because it does three jobs at once: builds social proof, shortens the sales cycle, and gives your marketing team a piece they can repurpose into ten more.",
    publishedAt: "2026-05-12",
    updatedAt: "2026-05-12",
    author: "Ademola Adelakun",
    cluster: "strategy",
    clusterLabel: "B2B SaaS Video Strategy",
    intent: "TOFU",
    ctaMode: "helpful",
    proprietaryInput: {
      type: "client-stat",
      source: "Auth0 (Okta) engagement",
      detail:
        "22K+ new YouTube subscribers, 5.2M+ video views, 35% of event registrations attributed to video",
    },
    outboundCitations: [
      {
        url: "https://wistia.com/learn/marketing/customer-story-videos",
        anchor: "Wistia on customer story videos",
      },
      {
        url: "https://blog.hubspot.com/marketing/customer-testimonial-video",
        anchor: "HubSpot testimonial video guide",
      },
      {
        url: "https://www.gong.io/blog/customer-evidence",
        anchor: "Gong on customer evidence in sales",
      },
    ],
    internalLinks: [
      { url: "/#work", anchor: "the kinds of videos we make" },
      {
        url: "/blog/how-much-does-saas-video-editing-cost",
        anchor: "what this costs",
      },
    ],
    faqSchema: true,
    body: [
      {
        type: "h2",
        text: "Why a customer story and not a founder talking-head?",
      },
      {
        type: "p",
        text: "Founder talking-heads are great for a brand that already has audience equity. For most $10M to $50M ARR SaaS, no one outside the buyer pool has heard of the founder yet, so the talking-head sits at zero views. A customer story is different. It carries social proof a founder can't claim about themselves, and it's the asset your sales team will actually send in deal cycles. That changes the math from \"branding spend\" to \"sales-enablement asset.\"",
      },
      {
        type: "h2",
        text: "What does a great first customer story look like?",
      },
      {
        type: "p",
        text: "90 seconds, three beats. The before-state (what the customer was struggling with), the moment of truth (the specific thing your product changed), and the outcome (a number, a quote, or a named win). Shot on a single 30-minute Zoom call with the customer, edited tightly, with the customer's quote driving the structure. No B-roll-heavy production. No fancy intro. The customer's voice is the product.",
      },
      {
        type: "ol",
        items: [
          "Pick the customer who closed fastest in the last 6 months and ask them.",
          "Run the interview as 5 questions, 30 minutes, recorded on Zoom or Riverside.",
          "Edit to 90 seconds. The customer carries the whole thing.",
          "Cut a 30-second version for paid social and a 15-second version for sales emails.",
          "Use the same interview to repurpose 3-5 LinkedIn quote cards.",
        ],
      },
      {
        type: "proprietary",
        label: "What this looked like at Auth0",
        body: "When we worked with Auth0 (Okta), customer-led content drove 22,000+ new YouTube subscribers and 5.2M+ video views. 35% of registrations for Oktane and Developer Day virtual events came from video. The first asset that proved the model wasn't a polished brand film. It was a developer talking about a real implementation problem and how they solved it.",
        source: "A2 Media — Auth0 case study",
      },
      {
        type: "h2",
        text: "What if you can't get a customer on camera?",
      },
      {
        type: "p",
        text: "Then your second-best first move is a problem-aware founder explainer. Not a product demo. A 60-second video where the founder names the exact problem your buyer feels on Monday morning and shows how your category solves it. The trap is that most founders try to demo the product. Don't. The first video's job is to make the buyer feel understood, not informed.",
      },
    ],
    closing: {
      text: "If you only ship one video this quarter, ship a customer story. It pays back in three places at once: pipeline (sales sends it in deals), top-of-funnel (paid social loves it), and team (your marketing org learns the repurposing playbook on a low-stakes asset). If you want a starting playbook before you write anything, Wistia's free Show Builder is a strong opinionated framework.",
      cta: {
        url: "https://wistia.com/learn/marketing/customer-story-videos",
        anchor: "Wistia's customer story video guide →",
      },
    },
  },
];

// Auto-published posts are written by the publish-check cron as JSON files
// in src/content/blog/auto-posts/. We load them at module evaluation time
// (server-side only — all consumers are RSCs / server routes) and merge
// into a single ALL_POSTS list. POSTS stays exported for backwards-compat
// with anything that wants only the hardcoded sample posts.
function loadAutoPosts(): BlogPost[] {
  // Dynamic require so tooling that bundles this module for the client side
  // (none today, but as a safety net) wouldn't pull in fs.
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs") as typeof import("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path") as typeof import("path");
    const dir = path.join(process.cwd(), "src/content/blog/auto-posts");
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    return files.map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      return JSON.parse(raw) as BlogPost;
    });
  } catch {
    return [];
  }
}

export const AUTO_POSTS: BlogPost[] = loadAutoPosts();

export const ALL_POSTS: BlogPost[] = [...POSTS, ...AUTO_POSTS];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

export function getSisterPosts(slug: string, cluster: Cluster, limit = 2): BlogPost[] {
  return ALL_POSTS.filter((p) => p.slug !== slug && p.cluster === cluster).slice(0, limit);
}

export function getRecentPosts(limit = 9): BlogPost[] {
  return [...ALL_POSTS]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}
