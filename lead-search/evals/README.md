# lead-search evals

Behavioral (tier-1) eval cases in `claude plugin eval` format — one case per
directory: `prompt.md` (frontmatter + the user prompt), `graders/` (regex /
file_exists / tool_used / llm), optional `case.yaml` (workspace scaffold).

Run (needs Claude Code with plugin-eval early access enabled):

```
claude plugin eval ./lead-search --json --threshold 0.75
```

- `no-brief-asks-once` — cheap, no network: with an empty workspace the skill
  must consolidate its three questions into one message and write nothing.
- `brief-run-mechanics` — paid, live web: with a scaffolded PLAN the skill
  must produce `leads-<topic>.csv` with the canonical header, hidden per-run
  work dir, evidence discipline (judged), and the standard files kept.

Tier-0 (free, deterministic) checks live in `scripts/test.sh` at the repo
root — run those on every change; run these before a release or after
editing lead-search's prose.
