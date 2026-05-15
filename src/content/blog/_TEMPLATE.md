# A2 Media Blog — Article Template + Scoring Rubric

> Single source of truth. Every blog post on a2media.ca is built from this template and scored against this rubric before it ships. Future generation pipelines (cron, AI drafts, script-to-article conversion) read from this file.

---

## What this blog is for

The blog exists for one reason: get a2media.ca cited by LLMs (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews) when Christina — Head of Marketing / Demand Gen at a $10M+ ARR B2B SaaS — asks an AI tool any question in our category.

Every structural decision below is downstream of that goal.

The blog lives at `/blog` and is linked **only from the footer**. Not in the main nav. It's an answer surface for AI crawlers, not a destination for browsing visitors.

---

## What "good" looks like — the five non-negotiables

A great A2 Media blog post answers **one specific question Christina would type into an LLM, so cleanly that the LLM lifts the answer verbatim.**

That sentence is the whole strategy. Five things follow from it:

1. **One question per post.** Not "the complete guide to B2B SaaS video." One question, like "How much should a SaaS company spend on video editing?" or "When does it make sense to hire a video editor in-house vs. an agency?"
2. **The answer is in the first paragraph.** Not built up to. Not teased. The first 40-80 words ARE the answer. Everything after is depth, evidence, and nuance for the reader who wants more.
3. **It sounds like Ademola, not ChatGPT.** Coffee voice (essay/teaching register), not bar voice (LinkedIn). Confident, opinion-forward, second-person, no AI-tell vocabulary.
4. **It has at least one thing only A2 could have written.** A real client number, a screenshot from a real engagement, a quote from a real call, a script excerpt, a stat from internal research. Without it, it's a content-farm post.
5. **It pulls toward A2 Media without always selling.** The closing block always has one CTA. 75% of the time that CTA pulls toward A2 (Pricing, Process, Studies, Book a Call). 25% of the time it's a purely helpful CTA (a sister blog post, an external resource, a free tool). The default is "be useful first." Internal links to the homepage Process / Pricing / Studies sections placed naturally inside the body. The article teaches first; the ask is at the end.

If a post fails any one of those five, it's not great. If it passes all five and clears the 30-question rubric below, it ships.

---

## The article template (the structure)

Every post follows this skeleton. No exceptions. Same skeleton every time so LLMs and humans both learn to expect it.

### URL + file location

- URL: `/blog/[slug]` — flat, no date-nesting. Slug is a question-shaped phrase: `/blog/how-much-does-saas-video-cost`, not `/blog/2026/05/saas-video-pricing-guide`
- File: `src/content/blog/[slug].mdx`
- One file per post. No drafts in this folder; drafts live in the topic queue (Notion or scratch branch) until they're ready to publish.

### Frontmatter spec

Every MDX file opens with this YAML block. The fields drive rendering, schema, sitemap, llms.txt index, and rubric scoring.

```yaml
---
question: "How much does B2B SaaS video editing cost?"          # the H1, exactly as a person would type it
slug: "how-much-does-saas-video-cost"                           # URL slug, lowercase, hyphenated
answer: "Most B2B SaaS companies spend $5K-$25K per month..."   # 40-80 word lead, also used in llms.txt blog index
publishedAt: "2026-05-12"                                       # ISO date
updatedAt: "2026-05-12"                                         # ISO date, bump on any edit
author: "Ademola Adelakun"                                      # always; Person schema generated from this
cluster: "pricing"                                              # one of the 6 clusters (see taxonomy below)
intent: "BOFU"                                                  # TOFU | MOFU | BOFU
ctaMode: "sell"                                                 # sell | helpful — see CTA rule below
proprietaryInput:                                               # required — every post must include at least one
  type: "client-stat"                                           # client-stat | script-excerpt | call-quote | screenshot | original-research
  source: "Reveal case study"
  detail: "$600K closed-won attributed to video"
outboundCitations:                                              # 3-5 authoritative external sources
  - { url: "https://wistia.com/learn/...", anchor: "Wistia 2024 video benchmarks" }
  - { url: "https://www.demandcurve.com/...", anchor: "Demand Curve growth playbook" }
internalLinks:                                                  # 2-3, mix of homepage anchors + sister blog posts
  - { url: "/#Pricing", anchor: "Video Growth Engine" }
  - { url: "/blog/in-house-vs-agency-video", anchor: "in-house vs. agency" }
faqSchema: true                                                 # if H2s are question-shaped, emit FAQPage schema
---
```

Required fields: `question`, `slug`, `answer`, `publishedAt`, `updatedAt`, `author`, `cluster`, `intent`, `ctaMode`, `proprietaryInput`, `outboundCitations` (3-5), `internalLinks` (2-3).

### CTA mode rule (75% sell, 25% helpful)

The blog cannot read like an extended sales page. The split between selling and being purely helpful is mapped to intent stage, not random:

| Intent | Default ctaMode | What the closing CTA looks like |
|---|---|---|
| **BOFU** (pricing, comparison, "should I hire...") | `sell` | Link to homepage Pricing / Process / Studies / Book a Call |
| **MOFU** (how-to, framework, "what should I consider...") | mixed: `helpful` 50% of the time, `sell` 50% | Helpful = sister blog post, free resource, video. Sell = case study or process page |
| **TOFU** (broad strategy, education, "why does X matter...") | `helpful` | Sister blog post, external resource, recommended reading. Building trust, not converting |

At any moment, run a 10-post rolling check: the ratio of `sell` to `helpful` should sit around 75/25. If it drifts past 80/20 toward selling, force the next BOFU posts to use a helpful CTA. If it drifts past 70/30 toward helpful, force the next MOFU post to sell.

The closing block always has exactly one CTA. The difference is what it pulls toward.

### Body structure (in order, top to bottom)

1. **H1 = the question, verbatim.** Same string as `question` in frontmatter. "How much does B2B SaaS video editing cost?" The LLM uses this as the page's primary topic signal.
2. **Lead paragraph = the direct answer.** 40-80 words. Self-contained — readable in isolation, without depending on later context. This is the paragraph an LLM extracts. Same string as `answer` in frontmatter.
3. **2-3 H2 sub-questions.** Each H2 is itself a question. Examples: "What's included in the price?" / "What changes the cost up or down?" / "When does it pay back?" 60-100 words of body per H2.
4. **One list or comparison table.** Inside one of the H2 sections. LLMs cite tables and numbered lists at much higher rates than prose. Use a comparison table for "vs." posts, a numbered checklist for "how do I" posts, a stat list for "what should I budget" posts.
5. **One proprietary-input block.** Visually distinct (a quoted stat, a callout, an embedded screenshot, a script excerpt in a code-style block). Must reference its source in-line. This is the line that says "only A2 could have written this."
6. **Closing block.** 2-3 sentences. The opinionated takeaway. Ends with one CTA: a sentence that links to the relevant homepage section or a sister post. No "Book a call now!" buttons stuffed inline. No CTAs in the body.

### Length

- Total body: 600-1,000 words (sweet spot 750)
- Below 500 = too thin to demonstrate authority
- Above 1,200 = LLM extraction degrades, readers bounce

### Voice register

**Coffee voice** (essay/teaching), not bar voice. Bar voice is the LinkedIn default — wrong for the blog because Christina arrives via a search query, not a feed scroll. She wants a confident, useful answer, not a story about a friend at a bar.

Coffee voice rules (all from `feedback_voice_full_rules.md`):

**Banned words** (replace with plain language):
crickets, straightforward, game-changer, landscape (metaphorical), leverage (verb), robust, delve, utilize, elevate, foster, pivotal, harness (metaphorical), navigate (metaphorical), unlock (metaphorical), empower.

**Banned constructions:**
1. Triple-beat negation: "Not X. Not Y. Z." Collapse into one direct positive.
2. "X isn't Y, it's Z" inversion. State what it IS directly.
3. Abstract-noun-is-metaphor headlines: "Trust is a currency," "X is a science."
4. Announcement lines: "Here's what actually works," "Let me break this down."
5. Ultra-punchy fragments: "Same ingredients. Different result." Expand to a real sentence.
6. Stacked negations: more than one "we're not" / "this isn't" before the positive.

**Zero em dashes anywhere.** Use periods, commas, colons, or hyphens-with-spaces.

**Allowed connectors:** "so," "now," "but," "the thing is," "which brings us to," "and that's why," "all right, so."

**Person:** Second person ("you"). First-person plural ("we" = A2 Media). Never third-person corporate ("A2 Media offers...").

**Opinion-forward where it counts.** The reader should know what Ademola thinks, not just see a balanced summary. "It depends" is not an answer.

### Schema (auto-generated at render)

Every post page renders three JSON-LD blocks via the existing `JsonLd` injector + extended `schemas.ts` helpers:

- **Article** schema: author = Person(Ademola Adelakun), publisher = Organization(A2 Media), datePublished, dateModified, headline, articleBody snippet, mainEntityOfPage = the post URL
- **FAQPage** schema: only if `faqSchema: true` in frontmatter. Each H2 + first paragraph of its section becomes a Q&A pair
- **BreadcrumbList** schema: Home → Blog → [Post]

### Cluster taxonomy

Every post belongs to exactly one of six clusters. Tight clusters > sprawl. Each cluster builds toward 30-50 posts over time.

| Cluster slug | Cluster name | What it covers |
|---|---|---|
| `strategy` | B2B SaaS Video Strategy | What to make, when, why |
| `pricing` | Pricing & Budgeting | How much, what's included, ROI |
| `team` | Hiring & Team | In-house vs. agency vs. freelance, what to look for |
| `formats` | Format Playbooks | Customer Stories, Episodic Series, Talking Heads, Animated Explainers, Shorts, Product Launches |
| `distribution` | Distribution & Repurposing | YouTube, LinkedIn, paid social, sales-enablement |
| `measurement` | Measurement & ROI | Attribution, leading indicators, what to report to a CMO |

**Internal-link rule:** every new post links to at least 2 sister posts in the same cluster. Once a cluster has 10+ posts, it earns its own cluster page (`/blog/cluster/[name]`) listing all posts in that cluster. The cluster page is what LLMs start citing as the topical authority hub.

---

## The scoring rubric

30 yes/no questions across 5 lenses. Modeled on `/score-script`. Every draft scores X/30 before it can ship.

**Threshold:** 26/30 to publish. Below 26 = revise. Below 22 = scrap and start over.

A "no" on any question in **bold** is an automatic revise regardless of total score. These are the structural non-negotiables.

### Lens 1: Extractability (6 questions) — is it LLM-friendly?

1. **Is the H1 a question that Christina would actually type into an LLM?**
2. **Does the lead paragraph (first paragraph after H1) directly answer the question in 40-80 words?**
3. Is the lead paragraph self-contained — readable in isolation, without depending on later context?
4. Are there 2-3 H2 sub-headings, each phrased as a follow-up question?
5. Does the post contain one comparison table or numbered list?
6. Is total word count between 600 and 1,000?

### Lens 2: Authority (6 questions) — does it earn citation?

7. **Does the post cite at least one proprietary input (real client stat, screenshot, script excerpt, call quote, original research)?**
8. Is the proprietary input visually distinct in the layout (callout, blockquote, embedded image)?
9. Does the post link to 3-5 outbound authoritative sources?
10. Does the post include a visible byline (Ademola Adelakun) and publish date?
11. **Are Article + (FAQPage where applicable) + BreadcrumbList JSON-LD present and valid?**
12. Does the post include 2-3 internal links — at least 1 to a homepage anchor and at least 1 to a sister blog post?

### Lens 3: Voice (6 questions) — does it sound like Ademola?

13. **Zero em dashes anywhere?**
14. **Zero banned words** (utilize, leverage, unlock, empower, robust, delve, foster, pivotal, harness-metaphorical, navigate-metaphorical, elevate, game-changer, landscape-metaphorical, crickets, straightforward)?
15. Zero banned constructions (triple-beat negation, "X isn't Y, it's Z," abstract-noun-is-metaphor headlines, announcement lines, ultra-punchy fragments, stacked negations)?
16. Is the register coffee voice (essay/teaching), not bar voice or third-person corporate?
17. Is at least one opinion clearly stated — does the reader know what Ademola thinks, not just a balanced summary?
18. Would a real person say this to a friend over coffee, not type it into a LinkedIn post or motivational poster?

### Lens 4: Conversion (6 questions) — does it pull toward A2 Media?

19. Does the closing block contain exactly one CTA (sell OR helpful, never both, never zero)?
20. Are CTAs absent from the body? (No mid-article "Book a call now!" interruptions.)
21. Does the post's `ctaMode` match its intent stage per the 75/25 rule (BOFU = sell, TOFU = helpful, MOFU = mixed)?
22. Is the post mapped to a clear ICP intent stage (TOFU / MOFU / BOFU) in frontmatter?
23. Does the cluster assignment match the post's actual topic?
24. If the post is BOFU intent AND `ctaMode = sell`, does it reference at least one A2 Media case study (Reveal, Auth0, PartnerHacker)?

### Lens 5: Helpfulness (6 questions) — would a human thank you for it?

25. Does the post answer the question with a clear, actionable position, not "it depends"?
26. Does the post include at least one concrete example (a number, a scenario, a named tool, a named situation)?
27. Could a reader walk away and DO something different on Monday based on this post?
28. Does the post avoid rehashing what the top 5 Google results already say (i.e., adds a unique angle)?
29. Does the post avoid filler phrases like "in today's fast-paced world," "in this article we'll explore," "without further ado"?
30. **Would Ademola be comfortable forwarding this article to a current client?**

### Scoring tiers

| Score | Tier | Action |
|---|---|---|
| 30/30 | Hero post | Add to homepage internal links, push to social |
| 28-29/30 | Strong | Ship as-is |
| 26-27/30 | Acceptable | Ship, log the gaps for prompt-tuning |
| 22-25/30 | Revise | Specific failure modes get specific fixes |
| Below 22 | Scrap | Topic stays in queue, draft gets discarded |

A "no" on any **bold** question = automatic revise even if total ≥ 26.

---

## Reference example (skeleton)

Use this as the shape, not the final copy. Words are placeholders.

```mdx
---
question: "How much does B2B SaaS video editing cost?"
slug: "how-much-does-saas-video-cost"
answer: "Most B2B SaaS companies spend $5,000 to $25,000 per month on video editing, depending on volume and strategy. The split is usually 60% editor labor, 30% strategy and creative direction, 10% tooling. Companies that bundle strategy in (instead of hiring an editor and figuring out what to make separately) close the gap between footage and pipeline faster."
publishedAt: "2026-05-12"
updatedAt: "2026-05-12"
author: "Ademola Adelakun"
cluster: "pricing"
intent: "BOFU"
proprietaryInput:
  type: "client-stat"
  source: "Reveal case study"
  detail: "$600K closed-won attributed to video at $X/month engagement"
outboundCitations:
  - { url: "https://wistia.com/learn/marketing/video-marketing-statistics", anchor: "Wistia 2024 State of Video Report" }
  - { url: "https://www.demandcurve.com/playbooks/video-content", anchor: "Demand Curve video playbook" }
  - { url: "https://blog.hubspot.com/marketing/video-marketing-budget", anchor: "HubSpot video budget benchmarks" }
internalLinks:
  - { url: "/#Pricing", anchor: "Video Growth Engine pricing" }
  - { url: "/blog/in-house-vs-agency-video", anchor: "hiring in-house vs. an agency" }
faqSchema: true
---

# How much does B2B SaaS video editing cost?

Most B2B SaaS companies spend $5,000 to $25,000 per month on video editing, depending on volume and strategy. The split is usually 60% editor labor, 30% strategy and creative direction, 10% tooling. Companies that bundle strategy in (instead of hiring an editor and figuring out what to make separately) close the gap between footage and pipeline faster.

## What's included at each price tier?

[60-100 words covering: $5K freelance editor, $10-15K small agency, $20-25K full-service strategy + production, what each actually delivers]

| Tier | Monthly spend | Includes | Best for |
|---|---|---|---|
| Freelance editor | $3K-$5K | Editing only, you bring scripts | Companies with internal strategy |
| Small agency | $8K-$15K | Editing + light strategy | Companies in pilot phase |
| Full-service | $20K-$25K | Strategy + scripts + editing + distribution | Companies treating video as a pipeline channel |

## What changes the cost up or down?

[60-100 words on volume, cinematography needs, talent sourcing, turnaround time]

> When Reveal worked with us, the engagement traced back to $600K in closed-won revenue and dropped their sales cycle 40%. The cost of the engagement was a fraction of the deal size it influenced. (See the full Reveal case study.)

## When does the spend pay back?

[60-100 words on attribution timeline, the layered measurement approach, leading indicators]

The honest answer is that most B2B SaaS companies underspend on video, then overspend on ads to compensate. If you're already running paid social, redirecting 20% of that budget into a strategy-led video engine is usually the highest-leverage move available. See [our Video Growth Engine pricing](/#Pricing) for what a flexible 3 to 6-month engagement looks like, or read the [Reveal case study](/#Studies) for the full breakdown.
```

---

## Daily delivery + approval workflow

The blog runs on a daily generation cycle. Locked decisions:

**Cadence:** 2 drafts per weekday (Monday – Friday). 10/week, ~40/month, ~480/year.

**Daily delivery:** Every weekday at 9 AM Toronto time (13:00 UTC, pinned — drifts to 8 AM during EST winter months). A Vercel cron triggers:

1. Pull the next 2 approved topics from the queue (Notion DB or topic source pipeline once built)
2. Generate each article via Claude API, applying the AEO template + voice rules + 75/25 CTA rule
3. Run the 30-question rubric scoring on each draft. Below 26/30 = skip and pull next topic instead
4. Create one Google Doc per draft in the Drive folder `A2 Media Blog / 01 Drafts` (folder ID `1QFnq2PabG0LqD4Q7Jb0SQ5cnmKw4aKxV`)
5. Send a single "Review drafts" Slack message to the assigned channel via the existing PM Bot incoming webhook (`SLACK_WEBHOOK_URL` env var, same one the PM Agent uses). Message contains: each draft's title, cluster + intent + CTA mode, rubric score (e.g. "28/30 Strong"), the 40-80 word lead paragraph as a preview, a "Open Doc to edit" button linking to the Drive file, and a footer note reminding to drag to `02 Published` to approve or `03 Rejected` to kill

**Approval surface:** Drive folder moves are the approval signal.

- Approve = drag the Doc from `01 Drafts` → `02 Published` (folder ID `1jb4lk46sGNGQywn-2hSyNGf_HAGygATP`)
- Reject = drag the Doc from `01 Drafts` → `03 Rejected` (folder ID `1aLEvFxbLLR7xgBVujpcIyaWAHSCKYn31`)

A separate watcher (Vercel cron every 15 min, or webhook) polls for Docs that moved into `02 Published`. For each new arrival: read the current Doc content (which includes any edits), parse it back into the `BlogPost` shape, write the MDX file at `src/content/blog/[slug].mdx`, commit + push to the `a2media-site` repo, Vercel auto-deploys. The Doc title gets stamped with the publish date and stays in `02 Published` as the audit trail.

Docs that move to `03 Rejected` flag their topic in the queue as "needs revision" and don't auto-republish.

**No 24-hour auto-merge.** A draft sits in `01 Drafts` indefinitely until you move it. Skipping a day means a backlog, not a forced publish.

---

## When this template gets updated

Update this file when:

- A new banned word or construction gets added to `feedback_voice_full_rules.md`
- A new cluster gets added to the taxonomy (don't do this lightly — sprawl kills topical depth)
- A scoring criterion proves wrong in practice (we've shipped 30+ posts and pattern X correlates with low LLM citation)
- A new schema requirement emerges (e.g., HowTo schema for step-by-step posts)

Bump a `## Changelog` line at the bottom each time. The next blog generation cron / human writer reads this file fresh on every run.

---

## Changelog

- 2026-05-10 — Initial template + 30-question rubric established.
- 2026-05-10 — Added `ctaMode` field + 75/25 sell-vs-helpful rule by intent stage. Updated rubric Lens 4 to score against CTA mode rather than always-sell. Added daily delivery + Drive-folder approval workflow.
- 2026-05-15 — Switched daily delivery from Resend email to Slack. Reuses existing PM Bot incoming webhook (`SLACK_WEBHOOK_URL`). No new infra.
