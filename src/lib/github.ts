/**
 * GitHub commit helper for the blog publish flow.
 *
 * When a Doc moves to "02 Published" in Drive, the publish-check cron parses
 * the Doc back into BlogPost shape and writes it to a JSON file in this
 * repo: `src/content/blog/auto-posts/[slug].json`. That commit triggers
 * Vercel's auto-deploy on push to main.
 *
 * Why a single JSON file per post (vs editing posts.ts):
 *   - Concurrent publishes don't conflict on the big TS array
 *   - Each post is its own git blob → cleaner history + diffs
 *   - posts.ts at build time merges hardcoded POSTS + auto-posts/*.json
 *
 * Auth: GITHUB_PAT env var. Fine-grained PAT scoped to the a2media-site
 * repo, "Contents: Read and write".
 */

import { Octokit } from "@octokit/rest";
import type { BlogPost } from "@/content/blog/posts";

const OWNER_REPO = process.env.GITHUB_REPO ?? "a2media-web/a2media-site";
const [OWNER, REPO] = OWNER_REPO.split("/");
const BRANCH = process.env.GITHUB_BRANCH ?? "main";

let cachedClient: Octokit | null = null;
function getClient(): Octokit {
  if (cachedClient) return cachedClient;
  if (!process.env.GITHUB_PAT) {
    throw new Error("GITHUB_PAT not set");
  }
  cachedClient = new Octokit({ auth: process.env.GITHUB_PAT });
  return cachedClient;
}

export async function commitBlogPost(post: BlogPost): Promise<{ sha: string; url: string }> {
  const path = `src/content/blog/auto-posts/${post.slug}.json`;
  const content = JSON.stringify(post, null, 2);
  const message = `feat(blog): publish "${post.question}"`;
  return upsertFile(path, content, message);
}

async function upsertFile(
  path: string,
  content: string,
  message: string,
): Promise<{ sha: string; url: string }> {
  const client = getClient();
  const contentBase64 = Buffer.from(content, "utf-8").toString("base64");

  // Check if the file already exists to get its SHA (required for updates).
  let existingSha: string | undefined;
  try {
    const existing = await client.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path,
      ref: BRANCH,
    });
    if (!Array.isArray(existing.data) && existing.data.type === "file") {
      existingSha = existing.data.sha;
    }
  } catch (err) {
    const status = (err as { status?: number }).status;
    if (status !== 404) throw err;
    // 404 = new file, no existing SHA
  }

  const res = await client.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message,
    content: contentBase64,
    branch: BRANCH,
    sha: existingSha,
    committer: {
      name: "A2 Blog Bot",
      email: "ademola@a2media.ca",
    },
    author: {
      name: "A2 Blog Bot",
      email: "ademola@a2media.ca",
    },
  });

  return {
    sha: res.data.commit.sha ?? "",
    url: res.data.commit.html_url ?? "",
  };
}
