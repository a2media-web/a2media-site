/**
 * Plain-text FAQ source — used for FAQPage JSON-LD on the homepage.
 *
 * The visual FAQ component renders rich JSX (with <strong>, multi-paragraph
 * etc) from its own typed source. This file mirrors those Q&As as plain
 * text so structured data stays clean and crawler-friendly. When updating
 * an answer, change BOTH places to keep visual + schema in sync.
 */

export type FaqEntry = { q: string; a: string };

export const FAQ_PLAIN: FaqEntry[] = [
  {
    q: "How much of our time will this actually take?",
    a:
      "4 to 6 hours per month. AKA minimal. We built our process so you can stay focused on running your business. After an initial strategy session and a few async check-ins, we handle almost everything: strategy, scripts, creative direction, editing, and publishing. Most clients spend less than 2 hours a week with us, and that time gets shorter as we learn your voice and brand.",
  },
  {
    q: "What do the first 30 days look like?",
    a:
      "We start with a deep-dive into your ICP, your sales cycle, and the content gaps that are costing you pipeline. From there, we build a video strategy tailored to your buyer's journey. By the end of month one, you'll have a clear roadmap, your first 3 videos ready to use by your sales team, and then we get into systemizing it over the next engagement.",
  },
  {
    q: "What happens after the 30-day accelerator?",
    a:
      "You'll have a fully built video strategy and your first content in market. From there, most clients move into the Video Growth Engine, our ongoing retainer where we execute, optimize, and scale what's working. But there's no lock-in between plans. The Accelerator is designed to stand on its own, so if you want to take the playbook and run with it internally, you absolutely can.",
  },
  {
    q: "How do you measure results and prove ROI?",
    a:
      'We use self-reported attribution ("how did you hear about us?" on forms and in sales calls) to capture the touchpoints analytics teams often miss, like someone binging your LinkedIn videos for weeks before booking a call. We also monitor last-touch attribution from your CRM to see which specific videos influenced closed deals. And we track leading indicators like time-to-close, video engagement from target accounts, and pipeline velocity. For example, one of our previous clients saw a 42% reduction in their sales cycle and $600K in video-attributed revenue. P.S. If your team already has a way of measuring, we layer into how you do it best.',
  },
  {
    q: "What if we've tried video before and it didn't work?",
    a:
      "That's actually most of our clients. Here's a pattern we see all the time: a company hires a freelancer or agency, gets a batch of nice-looking videos, posts them, and nothing happens. The issue wasn't the video itself, it was the absence of strategy. No ICP targeting, no distribution plan, no alignment with the sales cycle. So we've committed to doing it differently. Every video we build is mapped to a specific stage, a specific audience, and a specific outcome.",
  },
  {
    q: "Can we use footage and content we already have?",
    a:
      "Absolutely. We regularly repurpose existing webinars, podcasts, product demos, event recordings, and founder content into high-performing short-form and long-form video. If you've got raw footage sitting in a Google Drive somewhere, we'll turn it into content that actually drives conversations. As long as it fits into the strategy that we've set for you, that is.",
  },
  {
    q: "Why not just hire an in-house editor or use AI tools?",
    a:
      "An in-house editor gives you execution but not strategy. AI gives you speed but not differentiation. You'd still need a strategist, a creative director, a project manager, and a distribution plan, AKA 4+ roles on top of the editor. We replace all of that. And unlike AI-generated content that your competitors can replicate overnight, the work we build together compounds over time and becomes impossible to copy.",
  },
];

/** Same six videos used in ScrubReel — kept here so JSON-LD stays in sync
 *  when the ScrubReel format list changes. */
export const SCRUB_VIDEOS = [
  {
    label: "Shorts & Ads",
    description: "Reels and paid ads built for the social feed.",
    videoId: "apivro02ry",
  },
  {
    label: "Customer Stories",
    description: "Their words. Our edit. Pipeline lift.",
    videoId: "wyj54nrmol",
  },
  {
    label: "Episodic Series",
    description: "Multi-episode video that compounds over time.",
    videoId: "bdvyv8woqp",
  },
  {
    label: "Animated Explainers",
    description: "Visualize what cameras can't capture.",
    videoId: "qidqrdit0r",
  },
  {
    label: "Talking Head Videos",
    description: "Founder and executive thought leadership.",
    videoId: "stlupwk5hi",
  },
  {
    label: "Product Launches",
    description: "Big swings. High production value.",
    videoId: "sunf403e3b",
  },
];
