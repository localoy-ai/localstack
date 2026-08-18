#!/usr/bin/env bash
# Installs localstack skills into ~/.claude/skills, the same way gstack does:
# each skill gets a wrapper directory holding one symlink back to this repo,
# so a `git pull` here updates every installed skill with no re-install.
#
#   ./install.sh            install/refresh all skills
#   ./install.sh --remove   remove localstack's wrappers (repo untouched)
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$HOME/.claude/skills"

skills() {
  # A skill is any top-level directory carrying a SKILL.md.
  for d in "$REPO"/*/; do
    [ -f "$d/SKILL.md" ] && basename "$d"
  done
}

if [ "${1:-}" = "--remove" ]; then
  for name in $(skills); do
    # Only remove wrappers that point into THIS repo — never someone else's skill.
    link="$DEST/$name/SKILL.md"
    if [ -L "$link" ] && [[ "$(readlink "$link")" == "$REPO"/* ]]; then
      rm -rf "$DEST/$name"
      echo "removed $name"
    fi
  done
  exit 0
fi

mkdir -p "$DEST"
for name in $(skills); do
  if [ -e "$DEST/$name" ] && [ ! -L "$DEST/$name/SKILL.md" ]; then
    echo "skip $name: $DEST/$name exists and is not ours" >&2
    continue
  fi
  mkdir -p "$DEST/$name"
  ln -sf "$REPO/$name/SKILL.md" "$DEST/$name/SKILL.md"
  echo "installed /$name"
done
