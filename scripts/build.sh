#!/usr/bin/env bash
# Regenerate every SKILL.md from its SKILL.md.tmpl. Pass --dry-run to check
# freshness without writing (exit 1 if any generated file is stale).
set -euo pipefail
exec bun "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/gen-skill-docs.ts" "$@"
