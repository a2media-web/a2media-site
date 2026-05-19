/**
 * Claude-powered blog post generator.
 *
 * Uses claude-opus-4-7 (Ademola's quality call — the article voice and
 * proprietary-input weaving are worth Opus pricing). The huge fixed portion
 * of the prompt (AEO template, voice rules, JSON schema, two-shot examples)
 * sits in a cached system block — within a single cron run, draft #2 reads
 * the prompt from cache at ~10% of the uncached cost.
 *
 * Per-call we vary only the topic question + cluster + intent + ctaMode +
 * proprietary input. That payload sits after the cache breakpoint.
 *
 * Output is structured JSON validated against the BlogPost shape. If the
 * model returns malformed JSON or fails our minimal shape check, we
 * surface the error to the cron caller so the day's run skips the topic
 * rather than shipping garbage.
 */

import Anthropic from "@anthropic-ai/sdk";
import type {
  BlogPost,
  BlogPostBlock,
  Cluster,
  CtaMode,
  Intent,
  ProprietaryInputType,
} from "@/content/blog/posts";

const MODEL = "claude-opus-4-7";

let cachedClient: Anthropic | null = null;
function getClient(): Anthropic {
  if (cachedClient) return cachedClient;
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY not set");
  }
  cachedClient = new Anthropic();
  return cachedClient;
}

const SYSTEM_PROMPT = `You are writing answers a B2B SaaS marketing leader would search for in ChatGPT, Claude, Perplexity, or Gemini. The blog lives at a2media.ca/blog — owned by A2 Media, a video content strategy and editing agency run by founder Ademola Adelakun. But the post is for the reader, not for A2.

# Core mandate: be genuinely useful

The reader should finish the article knowing what to do tomorrow, not knowing how to hire A2 Media. If the honest answer to a question is "use a specific external tool" or "the industry benchmark is X", say so plainly. Disinterested expertise wins LLM citations. Self-promotion loses them.

A2 Media context (for your reference, NOT to repeat in every post):
- Agency for B2B SaaS, remote-first, takes five clients per quarter
- Selected client outcomes Ademola can speak to: Reveal ($600K closed-won attributed to video, 40% sales cycle reduction), Auth0/Okta (22K+ YouTube subs, 35% of event registrations from video), PartnerHacker (acquired 8 months after launch, $900K+ sponsorship revenue)
- Don't pin the audience to a specific ARR band. The reader could be a marketing leader at any SaaS stage where the question applies.

# Anti-self-promotion rules (hard constraints)

- A2 Media name-check: at most ONCE per post, never in the lead paragraph, never in two consecutive H2 sections.
- The Reveal / Auth0 / PartnerHacker client stories are valuable but heavy. Use at most ONE of them per post, and only when it directly shifts the answer. If the answer can be made without a client story, omit it.
- Never use "$10M+ ARR" or any ARR-band as audience framing in the lead.
- Never pivot from a generic question to "what we do at A2 Media" inside an H2. Stay on the reader's question.

# Your job

Write one blog post that answers ONE specific question your reader would type into an LLM. The article must be so structurally clean that an LLM lifts the answer verbatim when citing the source.

# The article template

1. The H1 is the question, verbatim. Do not paraphrase or shorten.
2. The first paragraph is a 40-80 word direct answer to the question. It must be self-contained — readable on its own without depending on later context. This is what the LLM extracts.
3. 2-3 H2 sub-headings. Each H2 is itself a follow-up question. 60-100 words of body per H2 section.
4. One comparison table OR one numbered list, inside one of the H2 sections. LLMs cite tables and numbered lists at higher rates than prose.
5. ONE proprietary-input block per post. Source it from whichever is BEST for this question:
   (a) A specific A2 Media client moment (Reveal / Auth0 / PartnerHacker) when it genuinely shifts the answer — use sparingly, never as the default.
   (b) Authoritative external research with a real source (Wistia State of Video, HubSpot research, Gartner, Demand Curve, Lenny's, Pavilion, MarketingBrew benchmarks, etc.).
   (c) An original observation or pattern Ademola has named (e.g., "the volume-vs-pipeline curve flattens after the 6th asset").
   Most posts should use (b) or (c). (a) only when the client outcome IS the most credible answer available.
6. Closing block: 2-3 sentences with the opinionated takeaway. Ends with one CTA. No mid-article CTAs.

Total body length: 600-1,000 words. Sweet spot 750.

# Voice rules (non-negotiable — every violation is a credibility leak)

Coffee voice. Essay/teaching register. Confident, opinion-forward, second-person, conversational. Never corporate.

ZERO em dashes anywhere. Replace with periods, commas, colons, or hyphens with spaces.

BANNED WORDS — never use any of these:
crickets, straightforward, game-changer, landscape (metaphorical), leverage (as a verb), robust, delve, utilize, elevate, foster, pivotal, harness (metaphorical), navigate (metaphorical), unlock (metaphorical), empower.

BANNED CONSTRUCTIONS — never use:
1. Triple-beat negation: "Not X. Not Y. Z." Collapse into one positive sentence.
2. "X isn't Y, it's Z" inversion. State what it IS directly.
3. Abstract-noun-is-metaphor headlines: "Trust is a currency", "X is a science".
4. Announcement lines: "Here's what actually works", "Let me break this down".
5. Ultra-punchy fragments: "Same ingredients. Different result." Use real sentences.
6. Stacked negations: more than one "we're not" / "this isn't" before the positive.

ALLOWED CONNECTORS: so, now, but, the thing is, which brings us to, and that's why, all right so.

PERSON: Second person (you). First-person plural (we = A2 Media). Never third-person corporate ("A2 Media offers...").

Opinion-forward where it counts. The reader should know what Ademola thinks. "It depends" is not an answer.

# CTA mode rule (helpful-first by default)

Every post has a ctaMode set in the request. Honor it strictly:

- ctaMode = "helpful" (the default for most posts): Closing CTA pulls to a useful external resource or sister blog post. NOT a sales link. Examples: Wistia's State of Video report, a HubSpot benchmark, Lenny's relevant essay, or an internal sister-post URL like /blog/some-related-question. Builds trust and citation density. The closing should sound like an expert sending the reader to the best next thing to read, NOT a sales pitch.
- ctaMode = "sell" (only when the reader is BOFU and explicitly buying): Closing CTA can pull toward A2 Media. Link to /#Pricing, /#our-process, /#Studies, or https://cal.com/a2media/meeting. Even then, the body of the post stays disinterested and useful — only the final CTA leans sell.

The closing block always has exactly ONE CTA. No mid-article CTAs. Never disguise a sell CTA as helpful.

# Required output: JSON only

Respond with a single JSON object matching this exact shape. No prose before or after. No markdown code fence. Pure JSON.

{
  "answer": string,                          // 40-80 word lead paragraph; same string that appears as first paragraph of body
  "body": [                                  // 4-8 blocks total: H2s + paragraphs + one list/table + one proprietary
    { "type": "h2", "text": string },        // each H2 is a follow-up question
    { "type": "p", "text": string },         // 60-100 word paragraph
    { "type": "table", "headers": [string], "rows": [[string]] },     // OR
    { "type": "ol", "items": [string] },                              // OR
    { "type": "proprietary", "label": string, "body": string, "source": string }
  ],
  "proprietaryInput": {                      // metadata about the proprietary block in body
    "type": "client-stat" | "script-excerpt" | "call-quote" | "screenshot" | "original-research",
    "source": string,                        // e.g. "Reveal case study"
    "detail": string                         // one-line summary of the proprietary fact
  },
  "outboundCitations": [                     // 3-5 entries, real authoritative URLs (Wistia, HubSpot, Demand Curve, Gartner, Gong, etc.)
    { "url": string, "anchor": string }
  ],
  "internalLinks": [                         // 2-3 entries. At least one homepage anchor (/#Pricing, /#our-process, /#Studies, /#work, /#FAQ-Section) AND at least one sister blog post path (/blog/...).
    { "url": string, "anchor": string }
  ],
  "closing": {
    "text": string,                          // 2-3 sentences with opinionated takeaway
    "cta": { "url": string, "anchor": string }
  }
}

Hard requirements:
- body MUST contain exactly one block of type "table" or "ol", AND exactly one block of type "proprietary".
- body MUST contain 2 or 3 blocks of type "h2".
- Each H2 must be followed by at least one "p" paragraph.
- answer MUST be 40-80 words.
- Total word count across body paragraphs MUST be 600-1000.
- closing.cta.url MUST match ctaMode: if "sell", point to an A2 Media internal URL (/#Pricing, /#our-process, /#Studies, /#work, /#FAQ-Section, or https://cal.com/a2media/meeting). If "helpful", point to an external authoritative URL or a sister /blog/... path.

# Tone calibration examples

Bad (LinkedIn/corporate): "In today's fast-paced SaaS landscape, video has become a game-changer. Let's delve into how to leverage it."
Good (coffee/Ademola): "Most B2B SaaS companies underspend on video, then overspend on ads to compensate. The cheaper fix is usually a strategy-led video engine, not more ad budget."

Bad (em dash, banned word): "It's not about volume — it's about strategy. Companies that leverage video..."
Good: "It's not about volume. Companies that build strategy around their video work close deals faster than companies that just commission more cuts."

Now generate the article per the request.`;

export type GenerationRequest = {
  question: string;
  slug: string;
  cluster: Cluster;
  clusterLabel: string;
  intent: Intent;
  ctaMode: CtaMode;
  sisterSlugs: string[]; // existing blog slugs the model can link to
  topicId: string;
};

export type GenerationResult =
  | { ok: true; post: BlogPost }
  | { ok: false; reason: string; raw?: string };

export async function generateBlogPost(
  req: GenerationRequest,
): Promise<GenerationResult> {
  const client = getClient();

  const userMessage = buildUserMessage(req);

  // Retry transient 5xx / 429 errors a few times with exponential backoff.
  // Anthropic occasionally returns 529 "Overloaded" during traffic spikes —
  // those would otherwise lose us a day's drafts.
  const RETRYABLE_STATUSES = new Set([408, 429, 500, 502, 503, 504, 529]);
  let response: Anthropic.Message | null = null;
  let lastErr: unknown = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      response = await client.messages.create({
        model: MODEL,
        max_tokens: 4000,
        system: [
          {
            type: "text",
            text: SYSTEM_PROMPT,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: [{ role: "user", content: userMessage }],
      });
      break;
    } catch (err) {
      lastErr = err;
      const isRetryable =
        err instanceof Anthropic.APIError &&
        typeof err.status === "number" &&
        RETRYABLE_STATUSES.has(err.status);
      if (!isRetryable || attempt === 2) break;
      // 4s, 12s — within Vercel's 60s function cap for two retries.
      const delayMs = 4000 * Math.pow(3, attempt);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  if (!response) {
    if (lastErr instanceof Anthropic.APIError) {
      return {
        ok: false,
        reason: `Anthropic API error ${lastErr.status}: ${lastErr.message}`,
      };
    }
    return {
      ok: false,
      reason: `Anthropic call failed: ${(lastErr as Error)?.message ?? "unknown"}`,
    };
  }

  // Extract the text block from the response.
  const textBlock = response.content.find(
    (b): b is Anthropic.TextBlock => b.type === "text",
  );
  if (!textBlock) {
    return { ok: false, reason: "No text block in Anthropic response" };
  }

  const json = extractJsonObject(textBlock.text);
  if (!json) {
    return {
      ok: false,
      reason: "Could not extract JSON object from response",
      raw: textBlock.text,
    };
  }

  const parsed = validateAndBuildPost(json, req);
  if (!parsed.ok) {
    return { ok: false, reason: parsed.reason, raw: textBlock.text };
  }
  return { ok: true, post: parsed.post };
}

function buildUserMessage(req: GenerationRequest): string {
  const sisters = req.sisterSlugs.length
    ? req.sisterSlugs
        .map((s) => `  - /blog/${s}`)
        .join("\n")
    : "  (no sister posts yet in this cluster)";
  return `Generate the article.

Question: ${req.question}
Slug: ${req.slug}
Cluster: ${req.clusterLabel} (${req.cluster})
Intent: ${req.intent}
ctaMode: ${req.ctaMode}

Sister blog posts available for internal linking (use at least one if any exist):
${sisters}

Respond with JSON only. No prose before or after. No markdown fences.`;
}

function extractJsonObject(text: string): unknown | null {
  // Strip code fences if the model wrapped output despite instructions.
  const stripped = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
  try {
    return JSON.parse(stripped);
  } catch {
    // Try to find the first { ... last } in case there's stray prose.
    const first = stripped.indexOf("{");
    const last = stripped.lastIndexOf("}");
    if (first === -1 || last === -1 || last <= first) return null;
    try {
      return JSON.parse(stripped.slice(first, last + 1));
    } catch {
      return null;
    }
  }
}

type ValidationResult =
  | { ok: true; post: BlogPost }
  | { ok: false; reason: string };

function validateAndBuildPost(
  raw: unknown,
  req: GenerationRequest,
): ValidationResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, reason: "Response is not an object" };
  }
  const r = raw as Record<string, unknown>;

  const answer = pickString(r.answer);
  if (!answer) return { ok: false, reason: "Missing answer" };

  const body = pickBody(r.body);
  if (!body.ok) return { ok: false, reason: `Invalid body: ${body.reason}` };

  const proprietary = pickProprietaryMeta(r.proprietaryInput);
  if (!proprietary)
    return { ok: false, reason: "Missing or invalid proprietaryInput" };

  const outbound = pickLinks(r.outboundCitations, 3, 5);
  if (!outbound.ok)
    return {
      ok: false,
      reason: `Invalid outboundCitations: ${outbound.reason}`,
    };

  const internal = pickLinks(r.internalLinks, 2, 3);
  if (!internal.ok)
    return { ok: false, reason: `Invalid internalLinks: ${internal.reason}` };

  const closing = pickClosing(r.closing);
  if (!closing.ok) return { ok: false, reason: `Invalid closing: ${closing.reason}` };

  const today = new Date().toISOString().slice(0, 10);

  return {
    ok: true,
    post: {
      question: req.question,
      slug: req.slug,
      answer,
      publishedAt: today,
      updatedAt: today,
      author: "Ademola Adelakun",
      cluster: req.cluster,
      clusterLabel: req.clusterLabel,
      intent: req.intent,
      ctaMode: req.ctaMode,
      proprietaryInput: proprietary,
      outboundCitations: outbound.links,
      internalLinks: internal.links,
      faqSchema: true,
      body: body.blocks,
      closing: closing.value,
    },
  };
}

function pickString(v: unknown): string | null {
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : null;
}

function pickBody(
  v: unknown,
): { ok: true; blocks: BlogPostBlock[] } | { ok: false; reason: string } {
  if (!Array.isArray(v)) return { ok: false, reason: "body is not an array" };
  const blocks: BlogPostBlock[] = [];
  for (const item of v) {
    if (!item || typeof item !== "object") continue;
    const t = (item as { type?: unknown }).type;
    if (t === "h2") {
      const text = pickString((item as { text?: unknown }).text);
      if (text) blocks.push({ type: "h2", text });
    } else if (t === "p") {
      const text = pickString((item as { text?: unknown }).text);
      if (text) blocks.push({ type: "p", text });
    } else if (t === "ol") {
      const items = (item as { items?: unknown }).items;
      if (Array.isArray(items)) {
        const cleaned = items
          .map((s) => (typeof s === "string" ? s.trim() : ""))
          .filter(Boolean);
        if (cleaned.length) blocks.push({ type: "ol", items: cleaned });
      }
    } else if (t === "table") {
      const headers = (item as { headers?: unknown }).headers;
      const rows = (item as { rows?: unknown }).rows;
      if (
        Array.isArray(headers) &&
        Array.isArray(rows) &&
        headers.every((h) => typeof h === "string")
      ) {
        const cleanRows: string[][] = [];
        for (const row of rows) {
          if (!Array.isArray(row)) continue;
          cleanRows.push(row.map((c) => (typeof c === "string" ? c : String(c))));
        }
        blocks.push({
          type: "table",
          headers: headers as string[],
          rows: cleanRows,
        });
      }
    } else if (t === "proprietary") {
      const label = pickString((item as { label?: unknown }).label);
      const bodyText = pickString((item as { body?: unknown }).body);
      const source = pickString((item as { source?: unknown }).source);
      if (label && bodyText && source) {
        blocks.push({ type: "proprietary", label, body: bodyText, source });
      }
    }
  }
  const h2Count = blocks.filter((b) => b.type === "h2").length;
  const hasListOrTable = blocks.some(
    (b) => b.type === "ol" || b.type === "table",
  );
  const hasProprietary = blocks.some((b) => b.type === "proprietary");
  if (h2Count < 2 || h2Count > 3)
    return {
      ok: false,
      reason: `H2 count is ${h2Count}, expected 2-3`,
    };
  if (!hasListOrTable)
    return { ok: false, reason: "missing list or table block" };
  if (!hasProprietary)
    return { ok: false, reason: "missing proprietary block" };
  return { ok: true, blocks };
}

function pickProprietaryMeta(v: unknown): BlogPost["proprietaryInput"] | null {
  if (!v || typeof v !== "object") return null;
  const r = v as Record<string, unknown>;
  const type = pickString(r.type);
  const source = pickString(r.source);
  const detail = pickString(r.detail);
  const validTypes: ProprietaryInputType[] = [
    "client-stat",
    "script-excerpt",
    "call-quote",
    "screenshot",
    "original-research",
  ];
  if (!type || !source || !detail) return null;
  if (!validTypes.includes(type as ProprietaryInputType)) return null;
  return {
    type: type as ProprietaryInputType,
    source,
    detail,
  };
}

function pickLinks(
  v: unknown,
  min: number,
  max: number,
):
  | { ok: true; links: { url: string; anchor: string }[] }
  | { ok: false; reason: string } {
  if (!Array.isArray(v)) return { ok: false, reason: "not an array" };
  const links: { url: string; anchor: string }[] = [];
  for (const item of v) {
    if (!item || typeof item !== "object") continue;
    const url = pickString((item as { url?: unknown }).url);
    const anchor = pickString((item as { anchor?: unknown }).anchor);
    if (url && anchor) links.push({ url, anchor });
  }
  if (links.length < min) return { ok: false, reason: `${links.length} < ${min}` };
  return { ok: true, links: links.slice(0, max) };
}

function pickClosing(
  v: unknown,
):
  | { ok: true; value: BlogPost["closing"] }
  | { ok: false; reason: string } {
  if (!v || typeof v !== "object") return { ok: false, reason: "not an object" };
  const r = v as Record<string, unknown>;
  const text = pickString(r.text);
  const cta = r.cta;
  if (!text) return { ok: false, reason: "missing closing text" };
  if (!cta || typeof cta !== "object")
    return { ok: false, reason: "missing closing.cta" };
  const url = pickString((cta as { url?: unknown }).url);
  const anchor = pickString((cta as { anchor?: unknown }).anchor);
  if (!url || !anchor)
    return { ok: false, reason: "closing.cta missing url or anchor" };
  return { ok: true, value: { text, cta: { url, anchor } } };
}
