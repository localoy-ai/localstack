---
name: lead-qualify
version: 0.1.0
publisher: localoy
capabilities: [files, web]
# localoy dialect: stages make this runnable on small local models. Row-by-row
# verification is the most naturally multi-turn work in the suite — each stage
# is its own turn with a file that survives it. Claude Code ignores this key
# and runs the Procedure below in one pass.
stages:
  - id: load
    goal: >
      Read the newest leads/*.csv and, if present, the newest briefs/*.md
      (its Disqualifiers section). Write one line per lead row: canonical
      domain, the row's claims to re-check (website, decision maker,
      location), and which brief disqualifiers could apply. No web work in
      this stage.
    produces: work/qualify-queue.md
  - id: verify
    goal: >
      For each line in work/qualify-queue.md: check the website resolves and
      is the company's own domain (at most ONE fetch per row, only when a
      search snippet leaves it ambiguous); re-run one search for the decision
      maker ("<company>" founder OR CEO OR owner, or site:linkedin.com/in
      "<company>") and compare names from result titles only; test each
      applicable disqualifier against what you observe. Verdict per row:
      keep or cut, one-sentence reason, and a fresh evidence URL from THIS
      session. UNKNOWN fields stay UNKNOWN unless an observation fills them.
      Never construct URLs, never fetch gated sites. Append one line per
      verdict.
    produces: work/qualify-verdicts.md
  - id: report
    goal: >
      Read the queue and verdicts. Write reviews/{date}-{slug}.csv with the
      lead CSV's original columns plus Verdict,Verdict Reason,Verification
      URL,Verified Date — ALL rows included, cut rows too. Then write
      reviews/{date}-{slug}.md: Source, Verdict summary (kept N / cut M, by
      reason), Could not verify, Chain status. No numeric scores anywhere.
    produces: reviews/{date}-{slug}.csv
description: Qualify and verify a lead list row by row — re-check each claim against the open web, keep or cut with a reason and fresh evidence, never a score. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [sales, qualify, verify, localstack]
    related_skills: [lead-search, outreach-draft]
allowed-tools:
  - Bash
  - Read
  - Write
  - WebSearch
  - WebFetch
  - AskUserQuestion
triggers:
  - qualify these leads
  - verify the lead list
  - check these leads
  - clean up the list
tags: [sales, qualify, verify, review]
---

## When to invoke this skill

Re-checks a lead list row by row against the open web: does the website
resolve, does the decision maker still match a fresh search, does any brief
disqualifier fire. Every row gets keep or cut, a reason, and a fresh evidence
URL — never a score. Use after `/lead-search`, or when asked to "qualify",
"verify", or "clean up" a lead list.

## What you read first

- **The list (required):** `ls -t leads/*.csv 2>/dev/null | head -1`. If none
  exists: offer to run `/lead-search` now, or accept a CSV path or pasted
  rows. Never fabricate input.
- **The brief (optional):** `ls -t briefs/*.md 2>/dev/null | head -1` — its
  `Disqualifiers` section becomes the cut criteria. No brief → qualify on
  observability alone (dead domains, aggregator-as-website, decision maker
  mismatch) and say so in the report.

## Ground rules (non-negotiable)

1. **Fresh evidence or no verdict.** Every keep and every cut cites a URL
   observed THIS session. The original row's evidence proves what was true
   then; qualification is about now.
2. **Keep/cut + reason, never a score.** A number invented to rank rows is a
   fabrication with extra steps. The reason sentence does the ranking.
3. **Cut rows stay in the file.** The reviews CSV carries every row, verdict
   column filled — the cut list is as useful as the keep list.
4. **UNKNOWN survives verification honestly.** Verification may replace
   UNKNOWN only with an observed value; it never "resolves" it by guessing.
5. **Same doors as lead-search.** Gated sites via search snippets only; no
   constructed URLs; at most one page fetch per row, and only when snippets
   left it ambiguous.
6. **Partial is partial.** Budget spent at row 30 of 50 → the report says 30
   verified, 20 unverified, and the unverified rows keep verdict `UNKNOWN`.

## Procedure

**1. Load** the list and brief (stage `load` above is the spec).

**2. Verify each row** (stage `verify` is the spec): website is their own
domain and alive; decision maker re-searched and compared from result titles;
disqualifiers tested against observations. One verdict line per row.

**3. Write the outputs.**

- `reviews/{YYYY-MM-DD}-{slug}.csv` — original columns plus
  `Verdict,Verdict Reason,Verification URL,Verified Date`, all rows included.
- `reviews/{YYYY-MM-DD}-{slug}.md`:

```
# Qualification: {slug}

## Source
(the leads CSV and brief consumed, by path)

## Verdict summary
kept N / cut M — cuts by reason: <reason>: n, ...

## Could not verify
(rows left UNKNOWN and why — budget, ambiguity, dead trails)

## Chain status
- stage: review
- source-artifact: <leads CSV path>
- status: DONE | PARTIAL
- kept: N / cut: M
- unresolved: (list or NONE)
```

**4. Report and hand off.** In chat: kept/cut counts, the dominant cut
reasons, what could not be verified. Then offer the next stage — "Draft
outreach for the kept rows with `/outreach-draft`?" — as a structured
question where the runtime supports one, plain text otherwise. On yes, invoke
`/outreach-draft` if this runtime can invoke skills directly (Claude Code:
the Skill tool); otherwise tell the user to type `/outreach-draft` (Codex:
`$outreach-draft`).

## Quality bar

- Every verdict a reader can check by opening one URL.
- A cut without a reason, or a keep without fresh evidence, is a failed row —
  fix it or mark it UNKNOWN.
- The verdict distribution is honest: a pass that keeps everything verified
  nothing.
