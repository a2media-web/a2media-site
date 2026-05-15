/**
 * Serialize a BlogPost → plain-text Google Doc body.
 * Parse a Google Doc body → BlogPost.
 *
 * The serializer drives both the daily Doc creation (cron) and the local
 * preview file in 01 Drafts. The parser is the inverse — used by the
 * publish-check watcher to read back any edits Ademola made in the Doc.
 *
 * Plain text is the contract because Drive auto-converts text/plain to a
 * Google Doc and the Doc retains the structure visually. Avoids depending
 * on the heavier Google Docs API for now.
 */

import type {
  BlogPost,
  BlogPostBlock,
  Cluster,
  CtaMode,
  Intent,
  ProprietaryInputType,
} from "@/content/blog/posts";

const SEP = "─────────────────────────────────────────────";
const SEP_THICK = "═════════════════════════════════════════════";

export function serializeBlogPost(
  post: BlogPost,
  rubricScore: number,
  rubricNotes: string[],
): string {
  const lines: string[] = [];

  lines.push(SEP);
  lines.push(`SAMPLE DRAFT — Generated ${new Date().toISOString().slice(0, 10)}`);
  lines.push("");
  lines.push(`Edit anything in this doc. When you're done:`);
  lines.push(`  • Drag this file to "02 Published" to publish.`);
  lines.push(`  • Drag this file to "03 Rejected" to kill it.`);
  lines.push(SEP);
  lines.push("");

  lines.push("METADATA");
  lines.push("");
  lines.push(`Question:          ${post.question}`);
  lines.push(`Slug:              ${post.slug}`);
  lines.push(`Cluster:           ${post.clusterLabel} (${post.cluster})`);
  lines.push(`Intent:            ${post.intent}`);
  lines.push(`CTA mode:          ${post.ctaMode}`);
  lines.push(
    `Proprietary input: ${post.proprietaryInput.source} — ${post.proprietaryInput.detail}`,
  );
  lines.push(`Author:            ${post.author}`);
  lines.push(`Publish date:      ${post.publishedAt}`);
  lines.push(`Rubric score:      ${rubricScore}/30`);
  if (rubricNotes.length) {
    lines.push(`Rubric notes:      ${rubricNotes.join("; ")}`);
  }
  lines.push("");
  lines.push(SEP_THICK);
  lines.push("ARTICLE");
  lines.push(SEP_THICK);
  lines.push("");

  lines.push(`# ${post.question}`);
  lines.push("");
  lines.push(post.answer);
  lines.push("");
  lines.push(`By ${post.author} · ${formatDate(post.publishedAt)}`);
  lines.push("");

  for (const block of post.body) {
    switch (block.type) {
      case "h2":
        lines.push("");
        lines.push(`## ${block.text}`);
        lines.push("");
        break;
      case "p":
        lines.push(block.text);
        lines.push("");
        break;
      case "ol":
        block.items.forEach((item, i) => {
          lines.push(`${i + 1}. ${item}`);
        });
        lines.push("");
        break;
      case "table":
        lines.push(renderTable(block.headers, block.rows));
        lines.push("");
        break;
      case "proprietary":
        lines.push("┌─ PROPRIETARY INPUT ─────────────────────────────────────────────");
        lines.push(`│ ${block.label}`);
        lines.push("│");
        for (const para of block.body.split(/\n\n+/)) {
          for (const line of wrap(para, 64)) {
            lines.push(`│ ${line}`);
          }
        }
        lines.push("│");
        lines.push(`│ Source: ${block.source}`);
        lines.push("└─────────────────────────────────────────────────────────────────");
        lines.push("");
        break;
    }
  }

  lines.push("");
  lines.push("─── CLOSING ─────────────────────────────────────────────────────────");
  lines.push("");
  lines.push(post.closing.text);
  lines.push("");
  lines.push(`CTA (${post.ctaMode}): ${post.closing.cta.anchor} → ${post.closing.cta.url}`);
  lines.push("");
  lines.push(SEP_THICK);
  lines.push("APPENDIX (does not render on the published page)");
  lines.push(SEP_THICK);
  lines.push("");

  lines.push("OUTBOUND CITATIONS (3-5 required)");
  for (const cite of post.outboundCitations) {
    lines.push(`  • ${cite.anchor}`);
    lines.push(`    ${cite.url}`);
  }
  lines.push("");
  lines.push("INTERNAL LINKS (2-3 required, must include 1 sister blog post)");
  for (const link of post.internalLinks) {
    lines.push(`  • ${link.anchor} → ${link.url}`);
  }
  lines.push("");

  return lines.join("\n");
}

function renderTable(headers: string[], rows: string[][]): string {
  const allRows = [headers, ...rows];
  const widths = headers.map((_, col) =>
    Math.max(...allRows.map((r) => (r[col] ?? "").length)),
  );
  const pad = (s: string, w: number) => s + " ".repeat(Math.max(0, w - s.length));
  const top = "┌─" + widths.map((w) => "─".repeat(w)).join("─┬─") + "─┐";
  const mid = "├─" + widths.map((w) => "─".repeat(w)).join("─┼─") + "─┤";
  const bot = "└─" + widths.map((w) => "─".repeat(w)).join("─┴─") + "─┘";
  const headerRow =
    "│ " + headers.map((h, i) => pad(h, widths[i])).join(" │ ") + " │";
  const dataRows = rows.map(
    (r) => "│ " + r.map((c, i) => pad(c ?? "", widths[i])).join(" │ ") + " │",
  );
  return [top, headerRow, mid, ...dataRows, bot].join("\n");
}

function wrap(text: string, width: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > width) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Parse a Doc body back to a BlogPost. Tolerant of edits Ademola made in
 * the Doc — looks for metadata via labeled lines, body via the H1/H2/H3
 * markers we wrote, and falls back to the original post structure for
 * anything ambiguous.
 *
 * Returns null if it can't find the basics (question + answer + slug).
 */
export type ParseResult =
  | { ok: true; post: BlogPost }
  | { ok: false; reason: string };

export function parseDocToPost(docText: string, original: BlogPost): ParseResult {
  const lines = docText.split(/\r?\n/);

  const meta = extractMetadata(lines);
  if (!meta.slug || !meta.question) {
    return { ok: false, reason: "missing slug or question in metadata block" };
  }

  // Article body lives between "ARTICLE" thick separator and "APPENDIX".
  const articleStart = lines.findIndex((l) => /^ARTICLE\s*$/.test(l));
  const appendixStart = lines.findIndex((l) =>
    /^APPENDIX\b/.test(l),
  );
  if (articleStart === -1 || appendixStart === -1) {
    return { ok: false, reason: "could not locate ARTICLE/APPENDIX sections" };
  }
  const articleLines = lines
    .slice(articleStart + 2, appendixStart - 1)
    .filter((l) => !/^[─═]+$/.test(l));

  // Pull lead = first non-empty paragraph after H1.
  let leadIdx = -1;
  for (let i = 0; i < articleLines.length; i++) {
    if (articleLines[i].startsWith("# ")) {
      // next non-empty
      for (let j = i + 1; j < articleLines.length; j++) {
        if (articleLines[j].trim()) {
          leadIdx = j;
          break;
        }
      }
      break;
    }
  }
  if (leadIdx === -1) {
    return { ok: false, reason: "could not locate lead paragraph" };
  }
  const lead = articleLines[leadIdx].trim();

  // Body blocks: parse H2 sections, lists, tables, proprietary blocks.
  const closingIdx = articleLines.findIndex((l) => /^─── CLOSING/.test(l));
  const bodySlice = articleLines.slice(leadIdx + 1, closingIdx);
  const body = parseBodyBlocks(bodySlice);

  // Closing block.
  const closingTextLines: string[] = [];
  let closingCtaUrl = original.closing.cta.url;
  let closingCtaAnchor = original.closing.cta.anchor;
  for (let i = closingIdx + 1; i < articleLines.length; i++) {
    const line = articleLines[i];
    const ctaMatch = line.match(/^CTA(?:\s*\([^)]*\))?:\s*(.+?)\s*→\s*(\S+)\s*$/);
    if (ctaMatch) {
      closingCtaAnchor = ctaMatch[1].trim();
      closingCtaUrl = ctaMatch[2].trim();
      break;
    }
    if (line.trim()) closingTextLines.push(line.trim());
  }
  const closingText = closingTextLines.join(" ") || original.closing.text;

  // Outbound + internal links from appendix.
  const appendixLines = lines.slice(appendixStart);
  const outbound = parseLinkList(appendixLines, "OUTBOUND CITATIONS");
  const internal = parseLinkList(appendixLines, "INTERNAL LINKS");

  return {
    ok: true,
    post: {
      ...original,
      question: meta.question,
      slug: meta.slug,
      answer: lead,
      author: meta.author ?? original.author,
      publishedAt: meta.publishedAt ?? original.publishedAt,
      updatedAt: new Date().toISOString().slice(0, 10),
      cluster: (meta.cluster as Cluster) ?? original.cluster,
      clusterLabel: meta.clusterLabel ?? original.clusterLabel,
      intent: (meta.intent as Intent) ?? original.intent,
      ctaMode: (meta.ctaMode as CtaMode) ?? original.ctaMode,
      proprietaryInput: meta.proprietaryInput ?? original.proprietaryInput,
      outboundCitations: outbound.length ? outbound : original.outboundCitations,
      internalLinks: internal.length ? internal : original.internalLinks,
      body: body.length ? body : original.body,
      closing: {
        text: closingText,
        cta: { url: closingCtaUrl, anchor: closingCtaAnchor },
      },
    },
  };
}

type Meta = {
  question?: string;
  slug?: string;
  cluster?: string;
  clusterLabel?: string;
  intent?: string;
  ctaMode?: string;
  author?: string;
  publishedAt?: string;
  proprietaryInput?: BlogPost["proprietaryInput"];
};

function extractMetadata(lines: string[]): Meta {
  const meta: Meta = {};
  for (const raw of lines) {
    const line = raw.trim();
    const m = line.match(/^([A-Za-z ]+):\s*(.+)$/);
    if (!m) continue;
    const key = m[1].toLowerCase().trim();
    const value = m[2].trim();
    if (key === "question") meta.question = value;
    else if (key === "slug") meta.slug = value;
    else if (key === "cluster") {
      const cm = value.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
      if (cm) {
        meta.clusterLabel = cm[1].trim();
        meta.cluster = cm[2].trim();
      } else {
        meta.cluster = value;
      }
    } else if (key === "intent") meta.intent = value;
    else if (key === "cta mode") meta.ctaMode = value;
    else if (key === "author") meta.author = value;
    else if (key === "publish date") meta.publishedAt = value;
    else if (key === "proprietary input") {
      const pm = value.match(/^(.+?)\s*—\s*(.+)$/);
      if (pm) {
        meta.proprietaryInput = {
          type: "client-stat" as ProprietaryInputType,
          source: pm[1].trim(),
          detail: pm[2].trim(),
        };
      }
    }
  }
  return meta;
}

function parseBodyBlocks(lines: string[]): BlogPostBlock[] {
  const blocks: BlogPostBlock[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) {
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3).trim() });
      i++;
      continue;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }
    if (line.startsWith("┌─ PROPRIETARY INPUT")) {
      const proprietaryLines: string[] = [];
      let label = "";
      let source = "";
      i++;
      while (i < lines.length && !lines[i].startsWith("└")) {
        const body = lines[i].replace(/^│\s?/, "");
        if (!label && body.trim() && !body.startsWith("Source:")) {
          label = body.trim();
        } else if (body.startsWith("Source:")) {
          source = body.replace(/^Source:\s*/, "").trim();
        } else if (body.trim()) {
          proprietaryLines.push(body.trim());
        }
        i++;
      }
      i++; // skip closing └
      blocks.push({
        type: "proprietary",
        label,
        body: proprietaryLines.join(" "),
        source,
      });
      continue;
    }
    if (line.startsWith("┌─")) {
      // table - skip for now, parser keeps original
      while (i < lines.length && !lines[i].startsWith("└")) i++;
      i++;
      continue;
    }
    // Default: paragraph (collect until blank line or H2)
    const paraLines: string[] = [trimmed];
    i++;
    while (i < lines.length) {
      const next = lines[i];
      if (!next.trim()) break;
      if (next.startsWith("## ") || next.startsWith("┌─")) break;
      if (/^\d+\.\s/.test(next.trim())) break;
      paraLines.push(next.trim());
      i++;
    }
    blocks.push({ type: "p", text: paraLines.join(" ") });
  }
  return blocks;
}

function parseLinkList(
  lines: string[],
  heading: string,
): { url: string; anchor: string }[] {
  const start = lines.findIndex((l) => l.trim().startsWith(heading));
  if (start === -1) return [];
  const out: { anchor: string; url: string }[] = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    if (line.match(/^[A-Z][A-Z\s()0-9-]+$/)) break; // next section heading
    const anchorMatch = line.match(/^\s*•\s*(.+?)\s*$/);
    if (anchorMatch) {
      const anchor = anchorMatch[1].trim();
      const next = lines[i + 1]?.trim();
      const arrowSplit = anchor.split(/\s*→\s*/);
      if (arrowSplit.length === 2) {
        out.push({ anchor: arrowSplit[0].trim(), url: arrowSplit[1].trim() });
        continue;
      }
      if (next && /^https?:\/\//.test(next)) {
        out.push({ anchor, url: next });
        i++;
      }
    }
  }
  return out;
}
