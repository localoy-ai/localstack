#!/usr/bin/env bash
# Installs localstack skills into every coding agent on this machine: each
# skill gets a wrapper directory holding one symlink back to this repo, so a
# `git pull` here updates every installed skill in every runtime with no
# re-install.
#
# Targets (installed automatically where the runtime's home dir exists):
#   Claude Code  ~/.claude/skills/<name>/SKILL.md            → /<name>
#   Codex        ~/.codex/skills/<name>/SKILL.md             → /skills picker, $<name>
#   Hermes       ~/.hermes/skills/localstack/<name>/SKILL.md → /<name> after /reload-skills
#   localoy      no files — its catalog syncs from this repo
#
#   ./install.sh                     install into every detected runtime
#   ./install.sh --claude --codex    install into named runtimes only
#   ./install.sh --remove            remove localstack's wrappers everywhere (repo untouched)
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]:-.}")" && pwd)"

# Standalone bootstrap: `curl -fsSL .../install.sh | bash` runs with no
# checkout next to it. Clone one to ~/localstack (or fast-forward the one
# already there) and hand off to ITS installer — the wrappers must point
# into a repo that `git pull` keeps updating, never into a temp download.
if [ ! -f "$REPO/lead-search/SKILL.md" ]; then
  DEST="$HOME/localstack"
  if [ -d "$DEST/.git" ]; then
    git -C "$DEST" pull --ff-only || echo "warn: could not update $DEST; installing what is there" >&2
  else
    git clone https://github.com/localoy-ai/localstack.git "$DEST"
  fi
  exec "$DEST/install.sh" "$@"
fi

skills() {
  # A skill is any top-level directory carrying a SKILL.md.
  for d in "$REPO"/*/; do
    [ -f "$d/SKILL.md" ] && basename "$d"
  done
}

# dest dir per runtime (skills live one wrapper dir below these)
claude_root="$HOME/.claude/skills"
codex_root="$HOME/.codex/skills"
hermes_root="$HOME/.hermes/skills/localstack"

remove_from() {
  local root="$1" label="$2" name link
  for name in $(skills); do
    # Only remove wrappers that point into THIS repo — never someone else's skill.
    link="$root/$name/SKILL.md"
    if [ -L "$link" ] && [[ "$(readlink "$link")" == "$REPO"/* ]]; then
      rm -rf "$root/$name"
      echo "removed $name ($label)"
    fi
  done
  # Drop hermes' category dir if we emptied it.
  [ "$label" = hermes ] && rmdir "$root" 2>/dev/null || true
}

install_into() {
  local root="$1" label="$2" name
  mkdir -p "$root"
  for name in $(skills); do
    if [ -e "$root/$name" ] && [ ! -L "$root/$name/SKILL.md" ]; then
      echo "skip $name ($label): $root/$name exists and is not ours" >&2
      continue
    fi
    mkdir -p "$root/$name"
    ln -sf "$REPO/$name/SKILL.md" "$root/$name/SKILL.md"
    # Skills with on-demand sections get the whole sections/ dir symlinked
    # beside SKILL.md; skills without one drop any stale link. (-sfn: replace
    # an existing dir symlink instead of descending into it.)
    if [ -d "$REPO/$name/sections" ]; then
      ln -sfn "$REPO/$name/sections" "$root/$name/sections"
    elif [ -L "$root/$name/sections" ]; then
      rm "$root/$name/sections"
    fi
    echo "installed /$name ($label)"
  done
}

if [ "${1:-}" = "--remove" ]; then
  remove_from "$claude_root" claude
  remove_from "$codex_root" codex
  remove_from "$hermes_root" hermes
  exit 0
fi

# Freshness gate: SKILL.md files are generated from SKILL.md.tmpl; never
# install a SKILL.md that no longer matches its template.
if compgen -G "$REPO/*/SKILL.md.tmpl" >/dev/null; then
  if command -v bun >/dev/null 2>&1; then
    bun "$REPO/scripts/gen-skill-docs.ts" --dry-run || {
      echo "install aborted: run scripts/build.sh, commit, then re-run install.sh" >&2
      exit 1
    }
  else
    echo "warn: bun not found — skipping the SKILL.md freshness check" >&2
  fi
fi

# Pick targets: flags name them; no flags = every runtime whose home exists.
want_claude=false; want_codex=false; want_hermes=false; any_flag=false
for arg in "$@"; do
  case "$arg" in
    --claude) want_claude=true; any_flag=true ;;
    --codex)  want_codex=true;  any_flag=true ;;
    --hermes) want_hermes=true; any_flag=true ;;
    --all)    want_claude=true; want_codex=true; want_hermes=true; any_flag=true ;;
    *) echo "unknown flag: $arg" >&2; exit 1 ;;
  esac
done
if ! $any_flag; then
  [ -d "$HOME/.claude" ] && want_claude=true
  [ -d "$HOME/.codex" ]  && want_codex=true
  [ -d "$HOME/.hermes" ] && want_hermes=true
fi

$want_claude && install_into "$claude_root" claude
$want_codex  && install_into "$codex_root" codex
$want_hermes && install_into "$hermes_root" hermes

echo
$want_claude && echo "Claude Code: type /<skill-name> in any session."
$want_codex  && echo "Codex: pick from /skills, or invoke inline with \$<skill-name>."
$want_hermes && echo "Hermes: run /reload-skills once, then type /<skill-name>."
echo "localoy: nothing to install — its catalog syncs from this repo."
