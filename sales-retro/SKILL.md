---
name: sales-retro
version: 0.1.1
publisher: localoy
capabilities: [files]
# No localoy stages: one read-and-write pass over files already on disk. A
# small model finishes this in a single turn; splitting it buys nothing.
description: Retro a sales-development cycle — read every artifact the pipeline produced, report the funnel with real counts, and say what to change in the next brief. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [sales, retro, localstack]
    related_skills: [lead-ship, prospect-brief]
allowed-tools:
  - Bash
  - Read
  - Write
  - AskUserQuestion
triggers:
  - sales retro
  - retro the lead run
  - what did we learn from prospecting
  - review the sales cycle
tags: [sales, retro, reflect, pipeline]
---

## When to invoke this skill

Closes a sales-development cycle: reads whatever the pipeline wrote
(`briefs/`, `leads/`, `reviews/`, `outreach/`, `shipped/`), reports the funnel
with counts taken from the files, and turns what happened into concrete edits
for the next brief. Use after `/lead-ship`, or whenever asked "what did we
learn from prospecting".

## What you read first

The newest file from each stage directory — whatever exists is in scope:

```
ls -t briefs/*.md 2>/dev/null | head -1
ls -t leads/*.csv 2>/dev/null | head -1
ls -t reviews/*.csv 2>/dev/null | head -1
ls -t outreach/*.md 2>/dev/null | head -1
ls -t shipped/*.csv 2>/dev/null | head -1
```

A missing stage is reported as **"stage not run"** — never reconstructed or
guessed. If nothing exists at all, say so and point at `/prospect-brief` to
start a cycle; there is no retro without artifacts.

Then ask the user ONE question: what happened after shipping — replies,
meetings, bounces, bad rows? Their answer enters the retro labeled
**user-reported**, never presented as something you observed.

## Ground rules (non-negotiable)

1. **Every count cites its file.** "12 shipped" carries
   `shipped/2026-08-29-acme.csv` next to it. A count you cannot point at a
   file for does not appear.
2. **Opinions are labeled opinions.** "The roundup queries outperformed" is a
   claim only if the brief/leads files show it; otherwise it is a hypothesis
   and says so.
3. **Outcomes are the user's facts.** Replies and meetings come from the user;
   the retro repeats them with that label and draws conclusions cautiously.
4. **Partial cycles get partial retros.** A cycle that stopped at `reviews/`
   is retroed to there, with the unrun stages listed as unrun.

## Procedure

**1. Load the cycle.** The five newest artifacts above, plus the previous
retro (`ls -t retros/*.md 2>/dev/null | head -2` — the second-newest) to check
whether its "Change next cycle" items were actually applied.

**2. Count the funnel from the files.** found (rows in the leads CSV before
dedupe notes, if recorded) → resolved (rows in leads CSV) → kept (Verdict=keep
rows in reviews CSV) → drafted (drafts in the outreach file) → shipped (rows in
the shipped CSV). Each number cites its file.

**3. Aggregate the verdicts.** Group the reviews CSV's `Verdict Reason` values:
what got rows cut, and which brief disqualifier did the cutting. This is the
sharpest signal for the next brief.

**4. Ask the outcome question** (one message), fold the answer in as
user-reported.

**5. Write the retro.** `retros/{YYYY-MM-DD}-{slug}.md`:

```
# Sales retro: {slug}

## Cycle inputs
(the artifact paths read, one per stage; "stage not run" where missing)

## Funnel
found N (file) → resolved N (file) → kept N (file) → drafted N (file) → shipped N (file)

## What worked
(angles, queries, channels — each backed by the artifact that shows it)

## What was cut and why
(aggregated verdict reasons, counts per reason)

## Outcomes (user-reported)
(what the user said happened after send; "none reported" if none)

## Change next cycle
(concrete edits to the next brief: disqualifiers to add, angles to drop or
double, territory changes — each traced to a finding above)

## Chain status
- stage: reflect
- source-artifact: (newest shipped CSV, or the last stage that ran)
- status: DONE | PARTIAL
- unresolved: (list or NONE)
```

**6. Report in chat.** The funnel line, the top two findings, and the "change
next cycle" list. This is the end of the chain — for the next cycle, point at
`/prospect-brief`. Do not invoke it; the next cycle starts when the user
says so.

## Quality bar

- Zero numbers without a named file, zero outcomes without the user-reported
  label.
- The previous retro's recommendations are checked, not just re-issued: say
  which were applied and what happened.
- Short. A retro nobody reads changes nothing.
