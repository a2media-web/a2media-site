#!/usr/bin/env node
/**
 * Manual trigger for the publish-check cron.
 *
 * Run this after you drag a Doc from "01 Drafts" to "02 Published" (or to
 * "03 Rejected") if you don't want to wait for the daily cron at 14:00 UTC.
 *
 * Usage:
 *   npm run publish-now
 *
 * Pulls CRON_SECRET from Vercel's production env (one-time per session) and
 * hits the public publish-check endpoint with Bearer auth.
 */

import { execSync } from "node:child_process";

const SITE_URL = process.env.SITE_URL ?? "https://a2media.ca";

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

let secret = process.env.CRON_SECRET;
if (!secret) {
  console.log("Pulling CRON_SECRET from Vercel...");
  try {
    // `vercel env pull` writes a .env.production file we can read.
    execSync("npx vercel env pull .env.production --environment=production --yes", {
      stdio: ["ignore", "ignore", "pipe"],
    });
    const fs = await import("node:fs");
    const env = fs.readFileSync(".env.production", "utf-8");
    const match = env.match(/^CRON_SECRET="?([^"\n]+)"?/m);
    if (!match) fail("CRON_SECRET not found in pulled env");
    secret = match[1];
  } catch (err) {
    fail(`Could not pull env: ${err.message}`);
  }
}

console.log(`Triggering publish-check at ${SITE_URL}...`);
const res = await fetch(`${SITE_URL}/api/cron/publish-check`, {
  headers: { Authorization: `Bearer ${secret}` },
});
const text = await res.text();
if (!res.ok) fail(`HTTP ${res.status}: ${text}`);

let body;
try {
  body = JSON.parse(text);
} catch {
  body = text;
}

console.log("\n✓ Publish-check ran");
console.log(JSON.stringify(body, null, 2));
console.log("\nCheck #blog-drafts for results.\n");
