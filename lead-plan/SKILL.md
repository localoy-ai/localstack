---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: lead-plan
version: 0.4.0
publisher: localoy
capabilities: [files, web]
# No localoy stages: this is one structured conversation plus one document.
# A small model finishes it in a single turn; splitting it buys nothing.
description: Plan a round of sales work — what we sell, who buys it, territory, list size, disqualifiers — as PLAN-<topic>.md, the plan every later sales step reads and ticks off. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [sales, planning, icp, localstack]
    related_skills: [lead-search, lead-retro]
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

Turns "who should we sell to" into a written plan the rest of the sales
pipeline runs on: what we sell, who buys it, where, how many leads, and what
disqualifies a candidate. It is `PLAN-<topic>.md` in the working folder — a
standard file any agent can open and pick up from. Use when asked to "define
our ICP", "plan prospecting", or before a lead run.

A **topic** is one piece of sales work, named as a short lowercase slug from
the niche and territory: `austin-dentists`, `berlin-saas-cfos`. Everything for
it shares the name: `PLAN-<topic>.md`, `leads-<topic>.csv`.

## What you read first (optional seeds — never required)

1. **A document the user points at** — a positioning doc, a pitch, a plan.
   If they name one, read it and offer to seed the plan from it. Its
   contents are the user's own context, not observed web fact.
2. **An existing plan:** `ls PLAN-*.md 2>/dev/null`. If one matches this
   topic, offer "revise this plan" vs "start a new topic". Its newest
   `## Retro` section may carry a "Change next time" list; if it does, put
   those items on the table explicitly.
3. **DESIGN.md**, if present — positioning, tone and channel decisions
   already made. Do not re-ask what it settles.

None found → interview the user directly: ask for everything still missing
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

**2. Write the plan.** `PLAN-<topic>.md`. Revising an existing plan edits
it in place: keep its `## Steps`, `## Drafts`, `## Retro` and other sections
the later steps wrote; change only the brief sections. Template for a new one:

```
# Plan: <topic>

## What we sell
## Who buys (ICP)
## Territory
## List size target
## Disqualifiers
## Angles to try        (optional: queries/angles worth starting with)

## Steps
- [ ] search    — /lead-search finds leads into leads-<topic>.csv (or bring your file to /lead-qualify)
- [ ] qualify   — /lead-qualify checks each row, fills the gaps, keeps or cuts
- [ ] draft     — /lead-draft writes ## Drafts below
- [ ] reach     — /lead-reach sends each draft after your yes
- [ ] retro     — /lead-retro writes ## Retro below

(Handing the list to someone else? /lead-export, any time — not a step.)

## Open questions
(each UNKNOWN still to settle, or "none")
```

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

When the user states a lasting decision while you interview — "we never cold
call", "keep it casual", "LinkedIn only" — offer to record it in DESIGN.md
under a dated line, and record it only on their yes.

**3. Read it back.** Show the user the brief's key lines in chat — the ICP
sentence, territory, size, disqualifiers — so a wrong premise dies here, where
it is cheap.

**4. Hand off.** Offer the next stage — "Run `/lead-search` against this
plan now?" — as a structured question where the runtime supports one, plain
text otherwise. On yes, invoke `/lead-search` if this runtime can invoke
skills directly (Claude Code: the Skill tool); otherwise tell the user to
type `/lead-search` (Codex: `$lead-search`).

## Quality bar

- Every brief section present; unsupplied facts say `UNKNOWN — ask before the run`.
- `## Steps` present with all five steps unticked (or kept as they were, on a revision).
- AGENTS.md lists this topic; CHANGELOG.md has today's line.
- Disqualifiers are concrete enough to test against an observation ("no
  physical location listed", "aggregator-only web presence"), not vibes.
- The brief sections fit on one page. A brief nobody rereads mid-run is decoration.
