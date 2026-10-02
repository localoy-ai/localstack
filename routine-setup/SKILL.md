---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: routine-setup
version: 0.1.0
publisher: localoy
capabilities: [files, shell, schedule]
description: >-
  Turns a task the person repeats into a scheduled routine — writes the
  steps down, runs it once with them watching, then schedules it, with a run
  log every run appends to. Nothing runs on a schedule the person has not
  seen work once. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [automation, schedule, routine, localstack]
    related_skills: [routine-report, competitor-watch, money-report]
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - AskUserQuestion
triggers:
  - automate this
  - do this every week
  - schedule this task
  - set up a routine
  - run this every morning
tags: [automation, scheduling, routines]
---

## When to invoke this skill

Takes something the person does over and over — a Monday report, a morning
check, a monthly export — and makes it run on its own. Use when asked to
"automate this", "do this every week", "schedule this". Grit's skill; the
weekly look back over every routine is `/routine-report`.

## The hard boundary

- **Seen once before it is scheduled.** The steps run once, now, with the
  person watching, and they say the result is right. Only then is the
  schedule created.
- **A schedule can only do what a yes already covers.** A routine that would
  send, post, publish, pay, delete or sign in on its own is not scheduled as
  such: those steps become "draft it and tell the person", and the person
  approves each item when it comes up. Say this plainly when the task
  includes one.
- **No secrets in the routine.** No passwords, tokens or keys written into
  the steps, scripts or log. A step that needs a login uses a session the
  person already has, or the routine stops and says so.
- **The runtime's own scheduler.** Use the agent runtime's schedule tool
  (localoy schedules, or the runtime's equivalent). No scheduler → write the
  routine and say how to run it by hand; never install system cron jobs or
  launch agents without the person's yes to that exact entry.

## What you need first

- **The task**, and how often (and when — day, time, timezone).
- **What a good result looks like** — the file, the number, the message.
- **Who should hear about it, and when** — default: the person, only when
  something changed or failed.

Ask for what is missing in a SINGLE message, then wait.

## Procedure

**1. Write the steps.** Watch or ask how the person does it now; write each
step as something a fresh agent can follow with no memory of this chat:
inputs (paths, URLs), the skill to call when one exists (`/competitor-watch`,
`/money-report`, `/site-check`…), what to write, and what counts as
"changed" and "failed". Slug: `<routine>` (`monday-competitors`).

Scratch for this run lives in `.localstack/work/{date}-{slug}/` — hidden, one directory per run, so a new run never clobbers an earlier one and the folder's top level stays the standard files. Scratch is disposable; old run directories may be deleted freely.

**2. Write `PLAN-routine-<routine>.md`:**

```
# Routine — <routine>
Schedule: <every Monday 09:00 Asia/Dhaka> · Owner: <person>
Good result: <one line> · Tell: <who, when>

## Steps
- [ ] steps written
- [ ] run once with the person
- [ ] scheduled

## Routine steps
1. …

## Changed means / Failed means
- changed: <…>
- failed: <…>

## Run log
| When | Result (ok/changed/failed) | What happened | Output |
```

**3. Run it once, together.** Follow the steps exactly as written — not from
memory — and show the result. Fix the steps (not just the run) for anything
that went wrong, and run again until the person says it is right. Log each
trial run in `## Run log`.

**4. Schedule it.** Create the schedule with the runtime's schedule tool,
pointing it at this plan ("follow PLAN-routine-<routine>.md, append one row
to its Run log"). Record the schedule id and the next run time in the plan.
Show the person the exact schedule before creating it.

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

For this step: tick the plan's own Steps as each is done. The CHANGELOG line
gives the routine, its schedule and its first run's result. TODO: `- [ ]
review the first scheduled run of <routine> (routine-report)`.

**5. Report.** The schedule, the next run time, where its log is, and what
it will tell the person and when. Offer `/routine-report` for a weekly look
across routines.

**Completion status.** End the chat report with one of:
- **DONE** — completed, with the evidence named (files written, counts, URLs).
- **DONE_WITH_CONCERNS** — completed, and list each concern.
- **BLOCKED** — cannot proceed; say what blocked it and what was tried.
- **NEEDS_CONTEXT** — missing information; say exactly what is needed.

## Quality bar

- Nothing scheduled that has not run once in front of the person.
- The steps work for an agent that has never seen this chat.
- Every run leaves a row in the Run log, ok runs included.
