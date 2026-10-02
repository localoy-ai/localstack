---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: social-plan
version: 0.1.0
publisher: localoy
capabilities: [files, web]
description: >-
  Plans a week of social content per channel — what to post, where, when, and
  which posts need a picture — as a calendar in PLAN-<topic>.md that
  /social-post writes and posts from. Plans only; nothing is posted.
  (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [social, content, calendar, localstack]
    related_skills: [social-post, vinci]
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - WebFetch
  - WebSearch
  - AskUserQuestion
triggers:
  - plan our social posts
  - content calendar
  - what should we post this week
  - social media plan
  - plan next week's posts
tags: [social, content-calendar, planning]
---

## When to invoke this skill

Writes next week's content calendar, one row per post per channel, into the
topic's plan, `PLAN-<topic>.md`. Use when asked to "plan our social posts",
"make a content calendar", "what should we post this week". Fizz's skill;
`/social-post` writes the captions and posts from this calendar.

## The hard boundary

- **Plans, never posts.** This skill writes a calendar. Posting is
  `/social-post`, one post at a time, after the person's yes.
- **Ideas from real material.** A post idea comes from something the
  business actually has or did — a product page, a review, a launch, a
  CHANGELOG line, a photo the person shared — and the row names it. No
  invented testimonials, numbers or events.
- **Channels the person uses.** Only channels they name or DESIGN.md lists.
  A channel's rules (length, picture size, posting rhythm) come from what
  the person says or the platform's own help pages, cited; not from memory.

## What you need first

- **Which channels** (Instagram, LinkedIn, X, Facebook, TikTok…) and the
  account each is for.
- **The week** — default: next Monday to Sunday.
- **How many posts per channel** — default: three a week.
- **What to push this week** — a launch, an offer, a season, or "nothing
  special".

Check DESIGN.md and any existing `PLAN-social*.md` first. Ask for what is
still missing in a SINGLE message, then wait.

## What you read first

- **DESIGN.md** — voice, content pillars, channels, words to avoid.
- **The last plan** for these channels, if one exists — what was posted
  (`Status: posted`) and anything that went unposted, so this week does not
  repeat it.
- **Source material** — the site, recent CHANGELOG lines, files the person
  points at.

## Procedure

**1. Load** the inputs above. Topic: `social-<yyyy>-w<week>` unless the
person names one (`social-launch-oct`).

Scratch for this run lives in `.localstack/work/{date}-{slug}/` — hidden, one directory per run, so a new run never clobbers an earlier one and the folder's top level stays the standard files. Scratch is disposable; old run directories may be deleted freely.

**2. Gather material.** List what the week can draw on, each with its
source (URL, file, or "the person said"). Thin material → fewer posts, said
plainly, not filler.

**3. Plan.** Spread the posts across the week per channel. Each row: the
idea in one line, the pillar (from DESIGN.md if it has them), the source it
draws on, and whether it needs a picture.

**4. Write `PLAN-<topic>.md`** (update in place if it exists; never drop a
row already posted):

```
# Social — <week or campaign>
Channels: <channel — account>, …
Push this week: <what, or "nothing special">

## Steps
- [x] plan YYYY-MM-DD
- [ ] write captions (/social-post)
- [ ] post (/social-post, one yes per post)

## Calendar — week of YYYY-MM-DD
| Day | Channel | Idea | Pillar | Source | Picture | Status |
|---|---|---|---|---|---|---|
| Mon | LinkedIn | <idea> | <pillar> | <URL/file> | needs picture | planned |
```

`Picture` is `needs picture`, `have: <file>` or `none`. `Status` starts at
`planned`; `/social-post` moves it to `written`, then `posted YYYY-MM-DD`.

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **PLAN-<topic>.md** — in `## Steps`, tick `- [x] plan` (add today's date after it) once this step is done; leave it unticked if you stopped partway, and say why in CHANGELOG.md.
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

For this step: the CHANGELOG line gives posts planned per channel. TODOs: `-
[ ] write captions with /social-post (<topic>)`, and one per post that needs
a picture (`- [ ] picture for <day> <channel> — ask Nova with /vinci
(<topic>)`).

**5. Report and hand off.** The calendar in a few lines, the posts that need
pictures. Offer "Write the captions with `/social-post`?" as a structured
question where the runtime has one; on yes invoke it if this runtime can,
else tell the person to type it.

**Completion status.** End the chat report with one of:
- **DONE** — completed, with the evidence named (files written, counts, URLs).
- **DONE_WITH_CONCERNS** — completed, and list each concern.
- **BLOCKED** — cannot proceed; say what blocked it and what was tried.
- **NEEDS_CONTEXT** — missing information; say exactly what is needed.

## Quality bar

- Every row names the real material it draws on.
- Nothing is posted, scheduled on a platform, or published by this skill.
- Three posts a week the business can stand behind beat seven of filler.
