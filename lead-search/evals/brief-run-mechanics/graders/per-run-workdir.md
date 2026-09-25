---
type: regex
pattern: "\\.localstack/work/\\d{4}-\\d{2}-\\d{2}-[a-z0-9-]+/found\\.md"
match: contains
target: trace
---

Scratch must land in the hidden per-run directory
(.localstack/work/{date}-{slug}/found.md), never a top-level work/ folder —
the top level holds only the standard files.
