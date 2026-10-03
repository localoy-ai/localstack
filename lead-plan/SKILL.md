---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: lead-plan
version: 0.5.2
publisher: localoy
capabilities: [files, web]
# No localoy stages: this is one structured conversation plus one document.
# A small model finishes it in a single turn; splitting it buys nothing.
# The plan's headings are checked on disk at the end of the turn: a model
# that skipped the outreach questions is sent back to settle them.
produces: PLAN-{slug}.md
sections: [What we sell, Who buys, Territory, List size target, Disqualifiers, Trigger, Angle and ask, Proof we can offer, Channel and sender, Cadence, Success]
description: Plan a whole outreach campaign — who to reach and why now, what we say and offer, the channel, cadence and follow-ups, and what counts as success — as PLAN-<topic>.md, the plan every later sales step reads and ticks off. (localstack)
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

Turns "find me people to sell to" into a plan for the whole outreach the user
is about to run — not just a search. Who we reach and why now, what we say
and what we ask for, through which channel, how often and how many times,
and how we will know it worked. The list exists to serve the message: a lead
nobody can reach, or nobody would reply to, is not a lead. It is `PLAN-<topic>.md` in the working folder — a
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

None found → interview the user directly, then wait.

## Think before you ask — the user will not spell everything out

Users describe the trigger ("whose competitor just raised") and forget the
shape of a buyer. Do not expect a better prompt; your job is to notice the
gap. Before asking anything, picture the list a plain search would return
for their words — the first five names that come to mind. Then ask yourself:

- **Could they actually sell to these?** If the obvious names are giants,
  household brands, or companies already served by big vendors, company size
  is the first question.
- **Would this person answer?** A CEO of a 5,000-person company never reads a
  cold note. Ask which role really owns the problem at the size they pick.
- **Is the trigger testable?** Name what counts as proof ("a comparison page
  either side publishes", "a dated announcement"), and what does not ("both
  named in one market report").
- **Is anything doubled?** Many targets resting on one event (one round, one
  news story) make a thin list — ask whether that is fine.
- **What happens after we find them?** Walk the outreach to the end: what
  the first message says, what it asks for, where it is sent, who sends it,
  how many follow-ups. Every step the user hasn't decided is a question —
  a list built for a channel the user won't use is wasted work.

Every gap that would change who is on the list becomes a question. Ask
each as a structured question with 2–4 concrete options, your recommended
one first and marked "(recommended)", and one line saying why it matters.
Ask the ones that change the list most first; never ask what the user
already said. A plan written before these are settled records them as
`UNKNOWN — ask before the run`, and the run does not start.

## What the plan must pin down — the whole outreach

Who
- **What we sell** — in the buyer's words, not the website's copy.
- **Who buys (ICP)** — company size (a range in people, always — asked if
  not given), the situation that makes them buy, and the person who would
  actually reply at that size (not the most senior title).
- **Territory** — "anywhere" is a choice the user makes, not a default.
- **List size target** — decides the fetch budget downstream.
- **Disqualifiers** — the cheapest quality lever in the pipeline:
  `/lead-qualify` cuts with exactly these.

Why now and what we say
- **The trigger** — the event that makes this the moment (a rival raised, a
  new hire, a launch), and what counts as proof of it on a page.
- **The angle** — one sentence connecting their trigger to our product, in
  their words. If the trigger doesn't lead to a sentence they'd care about,
  the list is wrong, not the copy.
- **The ask** — what a yes looks like: a reply, a 15-minute call, a trial, a
  free audit. One ask per message.
- **Proof we can offer** — a customer, a number, a demo link the user
  really has. UNKNOWN if none; never invented.

How
- **Channel** — email, LinkedIn, contact form, phone; what the user can and
  will actually send from, and what they never do.
- **Sender** — whose name the messages go out under, and the tone.
- **Cadence** — first touch plus how many follow-ups, how many days apart,
  and how many sends a day (deliverability and the user's own time).
- **Success** — what counts as working (replies, calls booked) and when the
  retro looks at it.

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

**1. Seed or interview** per the discovery order above, with the questions
from "Think before you ask". Company size and the reachable person are
always settled before the plan is final.

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
## Trigger              (the event, and what proves it on a page)
## Angle and ask        (one sentence why now; what a yes looks like)
## Proof we can offer
## Channel and sender
## Cadence              (first touch + follow-ups, days apart, sends a day)
## Success              (what counts, when we look)
## Search angles        (optional: queries worth starting with)

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

**3. Read it back.** Show the user the plan's key lines in chat — who, why
now, the angle and the ask, channel and cadence, success — so a wrong premise
dies here, where it is cheap.

**4. Hand off** — only when `## Open questions` says none. Never offer the
search while a decision is still open, and never ask a question after the
hand-off. Offer the next stage — "Run `/lead-search` against this
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
- The plan sections fit on one page. A brief nobody rereads mid-run is decoration.
