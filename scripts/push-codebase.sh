#!/bin/bash
# One-time push of the local codebase to GitHub.
#
# Why: the publish-check cron commits new blog posts to
# a2media-web/a2media-site, but the repo is empty — Vercel auto-deploys
# fail with "Couldn't find any pages or app directory". Pushing the full
# local codebase once fixes this permanently.
#
# Why this script vs. plain `git push`:
#   - Reads your GitHub PAT silently (no terminal echo, no screenshot leak)
#   - Feeds it to git via an in-memory credential helper, never the URL
#   - Unsets the variable when done
#
# Usage:
#   bash scripts/push-codebase.sh
#
# Then paste your PAT when prompted (you'll see no characters as you type).

set -e

cd "$(dirname "$0")/.."

# Ensure we're in the right place.
if [ ! -f "package.json" ] || ! grep -q '"a2media-site"' package.json; then
  echo "✗ Not in a2media-site project root. Aborting."
  exit 1
fi

# Initialize git if needed.
if [ ! -d ".git" ]; then
  echo "→ Initializing local git repo..."
  git init -q
  git branch -M main
  git remote add origin https://github.com/a2media-web/a2media-site.git
fi

# Make sure remote is set correctly even if .git already existed.
if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin https://github.com/a2media-web/a2media-site.git
fi

# Write a tight .gitignore if one doesn't exist.
if [ ! -f ".gitignore" ]; then
  cat > .gitignore <<'EOF'
node_modules
.next
.vercel
.env
.env.*
.review
*.log
.DS_Store
EOF
  echo "→ Wrote .gitignore"
fi

# Pull in whatever's already on origin/main (the auto-posts JSON file).
echo "→ Fetching origin/main..."
git fetch origin main -q 2>/dev/null || true

# Merge remote if it exists. --allow-unrelated-histories because local
# was just init'd with no shared history.
if git rev-parse --verify origin/main >/dev/null 2>&1; then
  if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
    # No local commits yet — make an empty initial commit so merge has
    # something to attach to.
    git commit --allow-empty -m "Initial empty commit" -q
  fi
  echo "→ Merging origin/main into local..."
  git merge --allow-unrelated-histories origin/main -m "Bring in initial bot-committed file" -q 2>/dev/null || true
fi

# Stage everything and commit. This is the big push.
git add .
if ! git diff --cached --quiet; then
  git commit -m "Initial codebase push for Vercel auto-deploy" -q
  echo "→ Committed local codebase"
else
  echo "→ Nothing new to commit"
fi

# Silently read the PAT.
echo
echo "Paste your GitHub PAT and press Enter."
echo "(Characters will NOT be displayed as you type/paste.)"
read -s GH_PAT
echo

if [ -z "$GH_PAT" ]; then
  echo "✗ No token entered. Aborting."
  exit 1
fi

# Push using an in-memory credential helper. The PAT lives only in this
# shell's env and is unset at the end.
export GH_PAT

git -c credential.helper='!f() { echo "username=a2media-web"; echo "password=$GH_PAT"; }; f' \
    push -u origin main

PUSH_STATUS=$?

unset GH_PAT

if [ $PUSH_STATUS -eq 0 ]; then
  echo
  echo "✓ Pushed to https://github.com/a2media-web/a2media-site"
  echo "  Vercel will auto-rebuild in ~90 seconds."
  echo "  Check: https://vercel.com/ademola-adelakuns-projects-1020aecf/a2media-site"
else
  echo
  echo "✗ Push failed. The PAT may not have 'repo' scope, or may not have"
  echo "  access to a2media-web/a2media-site."
  exit 1
fi
