---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: routine-report
version: 0.1.0
publisher: localoy
capabilities: [files, schedule, messaging]
description: >-
  A weekly "what ran, what changed, what broke" across every routine, read
  from their run logs — and a message to the person only when something
  changed or failed. Quiet weeks stay quiet. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [automation, report, routines, localstack]
    related_skills: [routine-setup]
allowed-tools:
  - Bash
  - Read
  - Write
  - AskUserQuestion
triggers:
  - what ran this week
  - routine report
  - did my automations work
  - what broke this week
  - check my routines
tags: [automation, reporting, monitoring]
---

## When to invoke this skill

Reads the run log of every routine in the folder and writes one weekly
summary: what ran, what changed, what broke. Use when asked "what ran this
week", "did my automations work", or as a routine of its own (Monday
morning). Grit's skill; routines are made by `/routine-setup`.

## The hard boundary

- **From the logs only.** A run happened if it has a row in its `## Run log`
  (or the runtime's schedule history shows it). A scheduled run with no row
  is `missed — no log row`, never assumed fine.
- **Quiet when nothing happened.** No change and no failure → the report is
  written and no message is sent. A message that says "all good" every week
  trains the person to ignore the one that matters.
- **Messages go to the person only.** Through the channel they set up for
  localoy (or the runtime's own notification). A routine's "tell" field
  naming anyone else → the message to them is drafted in the report for the
  person's yes, never sent from here.
- **Reports, does not repair.** A broken routine is described with what the
  log shows; fixing it is a new run of `/routine-setup` (or `/site-fix` for a
  site) after the person agrees.

## What you read first

- Every `PLAN-routine-*.md` in the folder — its schedule, "changed means",
  "failed means", and `## Run log` rows for the period.
- The runtime's schedule list and history, if it can be read — to catch
  routines with no plan, and runs with no log row.
- The last `routine-report-*.md` — so "still broken" can be told from "newly
  broken".

**Period:** the last 7 days unless the person names one.

## Procedure

**1. Load** the inputs above.

Scratch for this run lives in `.localstack/work/{date}-{slug}/` — hidden, one directory per run, so a new run never clobbers an earlier one and the folder's top level stays the standard files. Scratch is disposable; old run directories may be deleted freely.

**2. Tally per routine:** expected runs (from the schedule), logged runs, ok
/ changed / failed / missed counts, and the newest output file.

**3. Pick out what matters:** every `changed` row (what changed, quoted from
the log), every `failed` or `missed` (what the log says went wrong; first
seen date; still failing since the last report?).

**4. Write `routine-report-<yyyy-mm-dd>.md`** at the top of the working
folder:

```
# Routines — week to YYYY-MM-DD

## Broke (N)
- <routine> — <failed/missed> <when> — <what the log says> — since <date>
## Changed (N)
- <routine> — <what changed> — <output file>
## Ran fine (N)
| Routine | Runs expected | Logged | ok |
## Not checked
- <routine with no log, schedule unreadable, …>
```

**5. Message — only if Broke or Changed is non-empty.** One short message to
the person: the broken ones first, then the changes, each in one line, and
the report's path. No message otherwise; say in the report "no message sent
— nothing changed or failed".

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

For this step: the CHANGELOG line gives routines checked, ran / changed /
broke counts, and whether a message was sent. One TODO per broken routine
(`- [ ] fix <routine>: <what broke> (routine-report)`), not repeated if
already open.

**6. Report.** The same three lines as the message, or "all routines ran,
nothing changed".

**Completion status.** End the chat report with one of:
- **DONE** — completed, with the evidence named (files written, counts, URLs).
- **DONE_WITH_CONCERNS** — completed, and list each concern.
- **BLOCKED** — cannot proceed; say what blocked it and what was tried.
- **NEEDS_CONTEXT** — missing information; say exactly what is needed.

## Quality bar

- Every "ran", "changed" and "broke" points at a log row.
- A missed run is never reported as fine.
- No message in a week where nothing changed or failed.
