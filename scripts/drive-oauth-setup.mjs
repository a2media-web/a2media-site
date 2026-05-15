#!/usr/bin/env node
/**
 * One-time OAuth refresh-token capture for the blog pipeline.
 *
 * Why this exists: the a2media.ca Google Workspace has an org policy that
 * blocks service account key creation (iam.disableServiceAccountKeyCreation).
 * This script lets us use user-OAuth-based Drive access instead — same
 * Drive API permissions, no service account JSON, no policy override.
 *
 * What it does:
 *   1. Reads GOOGLE_OAUTH_CLIENT_ID + GOOGLE_OAUTH_CLIENT_SECRET from
 *      ~/.a2-blog-oauth.env (or current env)
 *   2. Spins up a local HTTP server on port 8765
 *   3. Prints a Google auth URL — you open it in your browser
 *   4. You grant Drive access; Google redirects back to localhost:8765
 *   5. The script catches the redirect, exchanges the code for a refresh
 *      token, and prints the next command to add it to Vercel.
 *
 * Run via: npm run drive-auth
 */

import http from "node:http";
import { URL } from "node:url";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const PORT = 8765;
const REDIRECT = `http://localhost:${PORT}/oauth-callback`;
const SCOPE = "https://www.googleapis.com/auth/drive";
const CRED_FILE = path.join(os.homedir(), ".a2-blog-oauth.env");

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

function loadCreds() {
  let id = process.env.GOOGLE_OAUTH_CLIENT_ID;
  let secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (fs.existsSync(CRED_FILE)) {
    const raw = fs.readFileSync(CRED_FILE, "utf-8");
    const idMatch = raw.match(/^GOOGLE_OAUTH_CLIENT_ID=(.+)$/m);
    const secretMatch = raw.match(/^GOOGLE_OAUTH_CLIENT_SECRET=(.+)$/m);
    if (idMatch) id = idMatch[1].trim().replace(/^["']|["']$/g, "");
    if (secretMatch) secret = secretMatch[1].trim().replace(/^["']|["']$/g, "");
  }
  return { id, secret };
}

const { id: clientId, secret: clientSecret } = loadCreds();
if (!clientId || !clientSecret) {
  console.error(`
Missing OAuth client credentials.

You need to create an OAuth 2.0 Client ID in Google Cloud Console first:

  1. Open https://console.cloud.google.com/apis/credentials?project=a2-blog-bot
  2. Click "+ Create Credentials" → "OAuth client ID"
  3. If asked to configure consent screen: User Type = External, App name = "A2 Blog Bot",
     User support email = your email, Scopes = leave default, Test users = add your own email
  4. Application type: "Desktop app"
  5. Name: "a2-blog-bot-local"
  6. Click Create. You'll get a Client ID and Client Secret.

Then write them to ${CRED_FILE} like this:

  GOOGLE_OAUTH_CLIENT_ID=123-abc.apps.googleusercontent.com
  GOOGLE_OAUTH_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxx

And re-run: npm run drive-auth
`);
  process.exit(1);
}

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id", clientId);
authUrl.searchParams.set("redirect_uri", REDIRECT);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", SCOPE);
authUrl.searchParams.set("access_type", "offline");
authUrl.searchParams.set("prompt", "consent");

console.log(`
─────────────────────────────────────────────────────────────────
A2 Blog OAuth Setup
─────────────────────────────────────────────────────────────────

1. Open this URL in your browser:

${authUrl.toString()}

2. Sign in as ademola@a2media.ca (the account that owns the Drive folders).
3. If you see "Google hasn't verified this app" → click "Advanced" → "Go to A2 Blog Bot (unsafe)".
4. Grant Drive access.
5. You'll be redirected to localhost:${PORT}/oauth-callback — this script catches it.

Waiting on port ${PORT}...
`);

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    if (url.pathname !== "/oauth-callback") {
      res.writeHead(404);
      res.end();
      return;
    }
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");
    if (error) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(`OAuth error: ${error}`);
      console.error(`\n✗ OAuth error: ${error}\n`);
      server.close();
      process.exit(1);
    }
    if (!code) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Missing code");
      return;
    }

    // Exchange code for refresh token.
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: REDIRECT,
        grant_type: "authorization_code",
      }).toString(),
    });
    const tokens = await tokenRes.json();

    if (!tokens.refresh_token) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(
        `No refresh_token in response. You may have already authorized this client. ` +
          `Revoke in https://myaccount.google.com/permissions and retry.`,
      );
      console.error(
        "\n✗ No refresh_token in response:",
        JSON.stringify(tokens, null, 2),
      );
      server.close();
      process.exit(1);
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      `<html><body style="font-family:system-ui;max-width:600px;margin:80px auto;padding:0 20px;">
        <h1 style="color:#5A33FF;">✓ Authorized</h1>
        <p>Drive access granted. Refresh token captured. You can close this tab.</p>
        <p>Return to your terminal — the script will print the next command.</p>
       </body></html>`,
    );

    console.log("\n✓ Refresh token captured.");
    console.log("\nAdding all three to Vercel production env now...\n");

    // Add all three env vars to Vercel.
    const setEnv = (name, value) => {
      console.log(`  → ${name}`);
      execSync(
        `printf '%s' "${value.replace(/"/g, '\\"')}" | npx vercel env add ${name} production --force`,
        {
          stdio: ["ignore", "ignore", "inherit"],
          shell: "/bin/bash",
        },
      );
    };

    try {
      setEnv("GOOGLE_OAUTH_CLIENT_ID", clientId);
      setEnv("GOOGLE_OAUTH_CLIENT_SECRET", clientSecret);
      setEnv("GOOGLE_OAUTH_REFRESH_TOKEN", tokens.refresh_token);
      console.log(
        "\n✓ All three env vars added to Vercel production.\n\nNext step: redeploy with `npx vercel --prod --yes`.\n",
      );
    } catch (err) {
      console.error(
        `\n✗ Vercel CLI failed: ${err.message}\n\nManual fallback — run these three commands:\n` +
          `  printf '${clientId}' | npx vercel env add GOOGLE_OAUTH_CLIENT_ID production\n` +
          `  printf '${clientSecret}' | npx vercel env add GOOGLE_OAUTH_CLIENT_SECRET production\n` +
          `  printf '${tokens.refresh_token}' | npx vercel env add GOOGLE_OAUTH_REFRESH_TOKEN production\n`,
      );
    }

    server.close();
    process.exit(0);
  } catch (err) {
    res.writeHead(500);
    res.end(err.message);
    console.error("\n✗ Unexpected error:", err);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  // Try to auto-open the URL (best-effort).
  try {
    const cmd = process.platform === "darwin" ? "open" : "xdg-open";
    execSync(`${cmd} "${authUrl.toString()}"`, { stdio: "ignore" });
  } catch {
    // ignore — user can copy manually
  }
});

setTimeout(() => {
  console.log(
    `\n⏱ No callback after 10 minutes. Closing. Re-run npm run drive-auth to retry.\n`,
  );
  server.close();
  process.exit(1);
}, 600_000);
