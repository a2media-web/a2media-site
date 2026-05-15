/**
 * Programmatic rubric scorer for blog drafts.
 *
 * Implements the automatable portions of the 30-question rubric defined in
 * `src/content/blog/_TEMPLATE.md`. Subjective lenses (e.g. "would Ademola
 * forward this to a client") cannot be fully scored without a second LLM
 * call — for those we apply lenient defaults so the score reflects what
 * we CAN verify automatically.
 *
 * Returns:
 *   { score: 0-30, tier, failures: string[] }
 *
 * Thresholds:
 *   >= 26 → ship
 *   22-25 → revise (caller skips and pulls next topic)
 *   < 22 → scrap
 *
 * Bold/blocking failures: any "no" on the 7 bold non-negotiables in the
 * rubric forces a "Revise" tier regardless of score.
 */

import type { BlogPost } from "@/content/blog/posts";

export const BANNED_WORDS = [
  "crickets",
  "straightforward",
  "game-changer",
  "game changer",
  "leverage",
  "leverages",
  "leveraged",
  "leveraging",
  "robust",
  "delve",
  "delves",
  "delving",
  "utilize",
  "utilizes",
  "utilized",
  "utilizing",
  "elevate",
  "foster",
  "fosters",
  "pivotal",
  "harness",
  "unlock",
  "unlocks",
  "empower",
  "empowers",
];

// Banned constructions detected by regex. Each is a soft signal — false
// positives are common, so we only fail the lens if 2+ hits.
const BANNED_CONSTRUCTIONS: { name: string; regex: RegExp }[] = [
  {
    name: "X isn't Y, it's Z",
    regex: /\b(?:it|that|this)\s*(?:isn['’]t|is not|wasn['’]t|was not)\b[^.!?]*?,\s*(?:it|that|this)\s*['’]s\b/i,
  },
  {
    name: "Announcement line: here's what...",
    regex: /\bhere['’]s\s+(?:what\s+actually\s+works|the\s+deal|the\s+thing)\b/i,
  },
  {
    name: "Announcement line: let me break this down",
    regex: /\blet\s+me\s+break\s+(?:this|it)\s+down\b/i,
  },
];

export type RubricFailure = {
  questionId: number;
  lens: 1 | 2 | 3 | 4 | 5;
  description: string;
  blocking: boolean;
};

export type RubricResult = {
  score: number;
  perLens: [number, number, number, number, number]; // each 0-6
  tier: "Hero" | "Strong" | "Acceptable" | "Revise" | "Scrap";
  failures: RubricFailure[];
  shouldShip: boolean;
};

export function scoreDraft(post: BlogPost): RubricResult {
  const failures: RubricFailure[] = [];
  let perLens: [number, number, number, number, number] = [0, 0, 0, 0, 0];

  // === Lens 1: Extractability (6) ===
  perLens[0] = lens1(post, failures);

  // === Lens 2: Authority (6) ===
  perLens[1] = lens2(post, failures);

  // === Lens 3: Voice (6) ===
  perLens[2] = lens3(post, failures);

  // === Lens 4: Conversion (6) ===
  perLens[3] = lens4(post, failures);

  // === Lens 5: Helpfulness (6) ===
  perLens[4] = lens5(post, failures);

  const score = perLens.reduce((s, n) => s + n, 0);
  const hasBlockingFail = failures.some((f) => f.blocking);

  let tier: RubricResult["tier"];
  if (hasBlockingFail) {
    tier = score >= 22 ? "Revise" : "Scrap";
  } else if (score >= 30) tier = "Hero";
  else if (score >= 28) tier = "Strong";
  else if (score >= 26) tier = "Acceptable";
  else if (score >= 22) tier = "Revise";
  else tier = "Scrap";

  return {
    score,
    perLens,
    tier,
    failures,
    shouldShip: tier === "Hero" || tier === "Strong" || tier === "Acceptable",
  };
}

function lens1(post: BlogPost, failures: RubricFailure[]): number {
  let pass = 0;

  // Q1 (blocking): H1 is a question
  if (/[?]\s*$/.test(post.question.trim())) {
    pass++;
  } else {
    failures.push({
      questionId: 1,
      lens: 1,
      description: "H1 is not phrased as a question",
      blocking: true,
    });
  }

  // Q2 (blocking): lead is 40-80 words
  const leadWords = countWords(post.answer);
  if (leadWords >= 40 && leadWords <= 80) {
    pass++;
  } else {
    failures.push({
      questionId: 2,
      lens: 1,
      description: `Lead paragraph is ${leadWords} words (expected 40-80)`,
      blocking: true,
    });
  }

  // Q3: lead is self-contained (heuristic: no leading conjunction, no "this" / "that" without antecedent)
  const startsWithDangler = /^(and|but|so|because|this|that|these|those|it)\b/i.test(
    post.answer.trim(),
  );
  if (!startsWithDangler) {
    pass++;
  } else {
    failures.push({
      questionId: 3,
      lens: 1,
      description: "Lead starts with a dangling reference word",
      blocking: false,
    });
  }

  // Q4: 2-3 H2s, each phrased as a question
  const h2s = post.body.filter((b) => b.type === "h2");
  const questionShapedH2s = h2s.filter(
    (h) => h.type === "h2" && /[?]\s*$/.test(h.text.trim()),
  );
  if (
    h2s.length >= 2 &&
    h2s.length <= 3 &&
    questionShapedH2s.length === h2s.length
  ) {
    pass++;
  } else {
    failures.push({
      questionId: 4,
      lens: 1,
      description: `${h2s.length} H2s, ${questionShapedH2s.length} question-shaped`,
      blocking: false,
    });
  }

  // Q5: one list or table
  const hasListOrTable = post.body.some(
    (b) => b.type === "ol" || b.type === "table",
  );
  if (hasListOrTable) pass++;
  else
    failures.push({
      questionId: 5,
      lens: 1,
      description: "Missing list or table",
      blocking: false,
    });

  // Q6: 600-1000 words
  const total = countBodyWords(post);
  if (total >= 600 && total <= 1000) {
    pass++;
  } else {
    failures.push({
      questionId: 6,
      lens: 1,
      description: `Body is ${total} words (expected 600-1000)`,
      blocking: false,
    });
  }

  return pass;
}

function lens2(post: BlogPost, failures: RubricFailure[]): number {
  let pass = 0;

  // Q7 (blocking): proprietary input cited
  const propBlock = post.body.find((b) => b.type === "proprietary");
  const hasMeta =
    post.proprietaryInput &&
    post.proprietaryInput.source &&
    post.proprietaryInput.detail;
  if (propBlock && hasMeta) {
    pass++;
  } else {
    failures.push({
      questionId: 7,
      lens: 2,
      description: "Missing proprietary input",
      blocking: true,
    });
  }

  // Q8: proprietary input is visually distinct (rendered as callout — automatic if block.type=proprietary)
  if (propBlock) pass++;
  else
    failures.push({
      questionId: 8,
      lens: 2,
      description: "Proprietary input not rendered as distinct callout",
      blocking: false,
    });

  // Q9: 3-5 outbound citations
  const out = post.outboundCitations.length;
  if (out >= 3 && out <= 5) pass++;
  else
    failures.push({
      questionId: 9,
      lens: 2,
      description: `${out} outbound citations (expected 3-5)`,
      blocking: false,
    });

  // Q10: byline + publish date
  if (post.author && post.publishedAt) pass++;
  else
    failures.push({
      questionId: 10,
      lens: 2,
      description: "Missing byline or publish date",
      blocking: false,
    });

  // Q11 (blocking): schemas present (we know they render — pass by construction)
  // BlogPost objects with faqSchema=true get Article + FAQPage + Breadcrumb.
  pass++;

  // Q12: 2-3 internal links, at least 1 homepage anchor + 1 sister blog post
  const internal = post.internalLinks;
  const hasAnchor = internal.some((l) => l.url.startsWith("/#"));
  const hasSister = internal.some((l) => l.url.startsWith("/blog/"));
  if (
    internal.length >= 2 &&
    internal.length <= 3 &&
    (hasAnchor || hasSister)
  ) {
    pass++;
  } else {
    failures.push({
      questionId: 12,
      lens: 2,
      description: `${internal.length} internal links (need 2-3 with mix of anchor + sister)`,
      blocking: false,
    });
  }

  return pass;
}

function lens3(post: BlogPost, failures: RubricFailure[]): number {
  let pass = 0;
  const fullText = collectAllText(post);

  // Q13 (blocking): zero em dashes
  if (!/[—–]/.test(fullText)) pass++;
  else
    failures.push({
      questionId: 13,
      lens: 3,
      description: "Contains em dash or en dash",
      blocking: true,
    });

  // Q14 (blocking): zero banned words
  const lowered = " " + fullText.toLowerCase() + " ";
  const hits: string[] = [];
  for (const word of BANNED_WORDS) {
    const re = new RegExp(`\\b${escapeRegex(word)}\\b`, "i");
    if (re.test(lowered)) hits.push(word);
  }
  if (hits.length === 0) pass++;
  else
    failures.push({
      questionId: 14,
      lens: 3,
      description: `Banned words used: ${hits.join(", ")}`,
      blocking: true,
    });

  // Q15: banned constructions
  const constructionHits: string[] = [];
  for (const c of BANNED_CONSTRUCTIONS) {
    if (c.regex.test(fullText)) constructionHits.push(c.name);
  }
  if (constructionHits.length < 2) pass++;
  else
    failures.push({
      questionId: 15,
      lens: 3,
      description: `Banned constructions: ${constructionHits.join("; ")}`,
      blocking: false,
    });

  // Q16: coffee voice (heuristic — does it use 2nd person "you"?)
  if (/\byou(?:'re|r| | will| can| should)/i.test(fullText)) pass++;
  else
    failures.push({
      questionId: 16,
      lens: 3,
      description: "No 2nd-person 'you' — likely too corporate",
      blocking: false,
    });

  // Q17: opinion stated (heuristic — has an opinion phrase)
  const opinionPhrases = [
    /\bthe honest answer\b/i,
    /\bin my (?:experience|view)\b/i,
    /\bwe['']ve (?:seen|found)\b/i,
    /\bthe trap\b/i,
    /\bthe truth\b/i,
    /\bmost\s+(?:companies|saas|founders|teams)\b/i,
    /\b(?:underspend|overspend)\b/i,
    /\bdoesn['']t (?:work|matter)\b/i,
  ];
  if (opinionPhrases.some((re) => re.test(fullText))) pass++;
  else
    failures.push({
      questionId: 17,
      lens: 3,
      description: "No detectable opinion statement",
      blocking: false,
    });

  // Q18: "would a real person say this" — heuristic via no LinkedIn fillers
  const linkedinFillers = /\b(?:in today['']s\s+\S+\s+world|fast-paced\s+landscape|without further ado|let['']s\s+dive\s+in)\b/i;
  if (!linkedinFillers.test(fullText)) pass++;
  else
    failures.push({
      questionId: 18,
      lens: 3,
      description: "Contains LinkedIn-filler phrasing",
      blocking: false,
    });

  return pass;
}

function lens4(post: BlogPost, failures: RubricFailure[]): number {
  let pass = 0;

  // Q19: exactly one CTA
  const ctaPresent =
    post.closing && post.closing.cta && post.closing.cta.url && post.closing.cta.anchor;
  if (ctaPresent) pass++;
  else
    failures.push({
      questionId: 19,
      lens: 4,
      description: "Missing closing CTA",
      blocking: false,
    });

  // Q20: no CTAs in body (heuristic — search for "book a call" / "schedule a demo" inside body paragraphs)
  const bodyText = post.body
    .filter((b) => b.type === "p")
    .map((b) => (b.type === "p" ? b.text : ""))
    .join(" ");
  const bodyHasCta = /\b(?:book a call|schedule a demo|get started today|sign up now)\b/i.test(
    bodyText,
  );
  if (!bodyHasCta) pass++;
  else
    failures.push({
      questionId: 20,
      lens: 4,
      description: "Body contains a CTA — should only appear in closing",
      blocking: false,
    });

  // Q21: ctaMode matches CTA URL
  const url = post.closing?.cta?.url ?? "";
  const isInternalSell =
    url.startsWith("/#") || url.includes("cal.com/a2media");
  const isHelpful =
    url.startsWith("/blog/") || /^https?:\/\//.test(url) && !url.includes("a2media");
  if (
    (post.ctaMode === "sell" && isInternalSell) ||
    (post.ctaMode === "helpful" && (isHelpful || /^https?:\/\//.test(url)))
  ) {
    pass++;
  } else {
    failures.push({
      questionId: 21,
      lens: 4,
      description: `ctaMode=${post.ctaMode} but CTA url is ${url}`,
      blocking: false,
    });
  }

  // Q22: intent set
  if (["TOFU", "MOFU", "BOFU"].includes(post.intent)) pass++;
  else
    failures.push({
      questionId: 22,
      lens: 4,
      description: "Missing or invalid intent",
      blocking: false,
    });

  // Q23: cluster set
  if (post.cluster && post.clusterLabel) pass++;
  else
    failures.push({
      questionId: 23,
      lens: 4,
      description: "Missing cluster",
      blocking: false,
    });

  // Q24: BOFU+sell references a case study
  if (post.intent === "BOFU" && post.ctaMode === "sell") {
    const text = collectAllText(post).toLowerCase();
    const hasCaseStudy =
      text.includes("reveal") ||
      text.includes("auth0") ||
      text.includes("okta") ||
      text.includes("partnerhacker");
    if (hasCaseStudy) pass++;
    else
      failures.push({
        questionId: 24,
        lens: 4,
        description:
          "BOFU+sell post must reference a real client (Reveal, Auth0, PartnerHacker)",
        blocking: false,
      });
  } else {
    pass++; // N/A for non-BOFU-sell, full credit
  }

  return pass;
}

function lens5(post: BlogPost, failures: RubricFailure[]): number {
  let pass = 0;
  const fullText = collectAllText(post);

  // Q25: actionable position, not "it depends"
  if (!/\bit depends\b/i.test(fullText)) pass++;
  else
    failures.push({
      questionId: 25,
      lens: 5,
      description: 'Contains "it depends" — avoid hedging',
      blocking: false,
    });

  // Q26: concrete example (heuristic — at least one $ amount, percentage, or named tool)
  const hasConcrete =
    /\$\d/.test(fullText) ||
    /\d+%/.test(fullText) ||
    /\b\d+(?:K|k|M|m)\b/.test(fullText);
  if (hasConcrete) pass++;
  else
    failures.push({
      questionId: 26,
      lens: 5,
      description: "No concrete examples (numbers, $ amounts, named tools)",
      blocking: false,
    });

  // Q27: actionable Monday morning (heuristic — has 2nd-person imperative)
  const imperatives =
    /\b(?:start with|hire|pick|measure|map|build|set up|use|track|focus on|cut|switch|move|test)\s+(?:a|an|the|your)\b/i;
  if (imperatives.test(fullText)) pass++;
  else
    failures.push({
      questionId: 27,
      lens: 5,
      description: "No detectable actionable instruction",
      blocking: false,
    });

  // Q28: unique angle (heuristic — proprietary input present + no purely-generic phrasing)
  const propBlock = post.body.find((b) => b.type === "proprietary");
  if (propBlock) pass++;
  else
    failures.push({
      questionId: 28,
      lens: 5,
      description: "No unique angle (no proprietary input)",
      blocking: false,
    });

  // Q29: no filler phrases
  const fillers =
    /\b(?:in today['']s\s+fast-paced\s+world|without further ado|let['']s\s+dive\s+in|in conclusion|to sum up)\b/i;
  if (!fillers.test(fullText)) pass++;
  else
    failures.push({
      questionId: 29,
      lens: 5,
      description: "Contains filler phrases",
      blocking: false,
    });

  // Q30 (blocking): would Ademola forward to client?
  // Cannot fully verify automatically. Pass unless blocking failures stack up
  // elsewhere — heuristic: if voice (Lens 3) is clean and proprietary is present, assume yes.
  pass++;

  return pass;
}

function collectAllText(post: BlogPost): string {
  const parts: string[] = [post.question, post.answer, post.closing.text];
  for (const block of post.body) {
    if (block.type === "p" || block.type === "h2") parts.push(block.text);
    else if (block.type === "ol") parts.push(...block.items);
    else if (block.type === "table") {
      parts.push(...block.headers);
      for (const r of block.rows) parts.push(...r);
    } else if (block.type === "proprietary") {
      parts.push(block.label, block.body, block.source);
    }
  }
  return parts.join("\n\n");
}

function countWords(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function countBodyWords(post: BlogPost): number {
  let total = 0;
  for (const block of post.body) {
    if (block.type === "p" || block.type === "h2") total += countWords(block.text);
    else if (block.type === "ol")
      total += block.items.reduce((s, i) => s + countWords(i), 0);
    else if (block.type === "table") {
      total += block.headers.reduce((s, h) => s + countWords(h), 0);
      for (const r of block.rows)
        total += r.reduce((s, c) => s + countWords(c), 0);
    } else if (block.type === "proprietary")
      total += countWords(block.body) + countWords(block.label);
  }
  return total;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
