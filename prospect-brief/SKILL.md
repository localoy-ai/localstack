---
name: prospect-brief
version: 0.1.0
publisher: localoy
capabilities: [files, web]
# No localoy stages: this is one structured conversation plus one document.
# A small model finishes it in a single turn; splitting it buys nothing.
description: Write a prospecting brief — what we sell, who buys it, territory, list size, disqualifiers — the file /lead-search reads as its input. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [sales, planning, icp, localstack]
    related_skills: [lead-search, sales-retro]
allowed-tools:
  - Bash
  - Read
  - Write
  - WebSearch
  - WebFetch
  - AskUserQuestion
triggers:
  - define our icp
  - prospecting brief
  - plan our prospecting
  - who should we target
  - write a brief
tags: [sales, plan, icp, brief]
---

## When to invoke this skill

Turns "who should we sell to" into a written brief the rest of the sales
pipeline runs on: what we sell, who buys it, where, how many leads, and what
disqualifies a candidate. `/lead-search` reads the newest brief automatically.
Use when asked to "define our ICP", "plan prospecting", or before a lead run.

## What you read first (optional seeds — never required)

1. **A gstack design doc**, if the user has been thinking the offer through
   with `/office-hours`: `ls -t ~/.gstack/projects/*/*-design-*.md 2>/dev/null | head -1`.
   If one exists, offer to seed the brief from it. Its contents are treated
   as the user's own context, not observed web fact — and it is read-only:
   never write into `~/.gstack`.
2. **A prior brief:** `ls -t briefs/*.md 2>/dev/null | head -1` — offer
   "revise the last brief" vs "start fresh". The newest retro
   (`ls -t retros/*.md 2>/dev/null | head -1`) may carry a "Change next
   cycle" list; if it does, put those items on the table explicitly.

Neither found → interview the user directly: ask for everything still missing
in a SINGLE message, then wait.

## What the brief must pin down

- **What we sell** — in the buyer's words, not the website's copy.
- **Who buys (ICP)** — role, company shape, the situation that makes them buy.
- **Territory** — "anywhere" is a choice the user makes, not a default.
- **List size target** — decides the fetch budget downstream.
- **Disqualifiers** — the cheapest quality lever in the pipeline:
  `/lead-qualify` cuts with exactly these.

## Ground rules (non-negotiable)

1. **The brief records what the user said**, plus anything observed on the
   web with its URL. No invented market facts, no imagined competitor lists,
   no "typically these buyers..." filler.
2. **A fact the user did not supply is written as
   `UNKNOWN — ask before the run`** — never guessed. A brief with honest
   holes beats a confident wrong one.
3. **Light web checks are allowed, cited.** Confirming a niche's vocabulary or
   a territory's shape is one or two searches, each cited inline; this is a
   planning skill, not a research run.

## Procedure

**1. Seed or interview** per the discovery order above. One message for all
open questions.

**2. Draft the brief.** `briefs/{YYYY-MM-DD}-{slug}.md` (slug from the
niche + territory):

```
# Prospecting brief: {slug}

## What we sell
## Who buys (ICP)
## Territory
## List size target
## Disqualifiers
## Angles to try        (optional: queries/angles worth starting with)

## Chain status
- stage: plan
- source-artifact: <design doc / prior brief path, or NONE>
- status: DONE | PARTIAL
- unresolved: (open UNKNOWNs, or NONE)
```

**3. Read it back.** Show the user the brief's key lines in chat — the ICP
sentence, territory, size, disqualifiers — so a wrong premise dies here, where
it is cheap.

**4. Hand off.** Offer the next stage — "Run `/lead-search` against this
brief now?" — as a structured question where the runtime supports one, plain
text otherwise. On yes, invoke `/lead-search` if this runtime can invoke
skills directly (Claude Code: the Skill tool); otherwise tell the user to
type `/lead-search` (Codex: `$lead-search`).

## Quality bar

- Every section present; unsupplied facts say `UNKNOWN — ask before the run`.
- Disqualifiers are concrete enough to test against an observation ("no
  physical location listed", "aggregator-only web presence"), not vibes.
- One page. A brief nobody rereads mid-run is decoration.
