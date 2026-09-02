#!/usr/bin/env bash
# The suite's test entrypoint. Tier 0 is deterministic and free:
#   1. tmpl freshness (generated files match their templates)
#   2. lint-suite (frontmatter dialects, markers, sort -rV, sections
#      integrity, chain wiring, version bumps)
# Tier 1 (paid, behavioral) lives in each skill's evals/ directory in
# `claude plugin eval` format — run it with:
#   claude plugin eval ./<skill> --json --threshold 0.75
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bun "$HERE/gen-skill-docs.ts" --dry-run
bun "$HERE/lint-suite.ts"
