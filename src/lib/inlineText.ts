/**
 * Minimal inline markup for long-form content strings: `[anchor](url)` links.
 * Kept deliberately small so authored content stays plain text everywhere else.
 */

export type InlinePart =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string; url: string };

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseInline(input: string): InlinePart[] {
  const parts: InlinePart[] = [];
  let last = 0;
  for (const m of input.matchAll(LINK)) {
    const start = m.index ?? 0;
    if (start > last) parts.push({ kind: "text", text: input.slice(last, start) });
    parts.push({ kind: "link", text: m[1], url: m[2] });
    last = start + m[0].length;
  }
  if (last < input.length) parts.push({ kind: "text", text: input.slice(last) });
  return parts;
}

/** The string with link markup removed, for schema, meta tags and word counts. */
export function plainText(input: string): string {
  return input.replace(LINK, "$1");
}
