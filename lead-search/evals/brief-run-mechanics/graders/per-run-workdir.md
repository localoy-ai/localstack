---
type: regex
pattern: "work/\\d{4}-\\d{2}-\\d{2}-[a-z0-9-]+/found\\.md"
match: contains
target: trace
---

Scratch must land in the per-run directory (work/{date}-{slug}/found.md),
never the legacy flat work/found.md that every run clobbered.
