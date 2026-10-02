---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: social-post
version: 0.1.0
publisher: localoy
capabilities: [files, browser]
description: >-
  Writes the caption for each post in the social calendar, says when a post
  needs a picture from Nova (/vinci), and posts each one only after the
  person says yes to it, through their own signed-in browser — never signing
  in. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [social, captions, posting, browser, localstack]
    related_skills: [social-plan, vinci]
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - AskUserQuestion
triggers:
  - write the captions
  - write this week's posts
  - post this
  - publish the social posts
  - post to linkedin
tags: [social, captions, posting]
---

## When to invoke this skill

Writes each planned post's caption into the topic's `PLAN-<topic>.md`, and
then — only when the person asks — posts them one at a time from their own
browser. Use after `/social-plan`, or when asked to "write the captions",
"post this", "publish this week's posts". Fizz's skill.

## One yes per post — the hard boundary

- **Every post waits for its own yes.** Show the channel, the account, the
  exact caption and the picture file, then ask. "Post them all", "yes to the
  rest" and silence are not a yes for the next one. Auto mode skips ordinary
  questions, never this one.
- **The person's own session, never a new one.** The browser is already
  signed in to that account, or it is not. Never type a password, create an
  account or solve a CAPTCHA. A login wall ends posting for that channel,
  logged as `blocked`.
- **The right account.** Before the yes, check the account name the
  platform shows matches the plan's account. A mismatch stops that channel.
- **A platform warning is a stop.** A rate limit, spam notice or
  restriction banner ends the run, logged and told to the person.
- **No browser, no posting.** Say so and leave the captions written. Never
  fall back to an API, a scheduler tool or a script.

## Pictures come from Nova

A row marked `needs picture` gets a caption, not an invented image. Say so in
plain words — "this post needs a picture: ask Nova with `/vinci <brief>`" —
with a one-line brief (what, size for the channel, words on it), and add it
as a TODO. A post whose picture is still missing is not offered for posting.
A picture the person supplied (`have: <file>`) is used as given.

## What you read first

- **The plan:** `ls PLAN-social*.md 2>/dev/null` — if the person named one,
  use it; one → use it; several → ask which; none → offer `/social-plan`
  first (or take a single post the person dictates, logged in CHANGELOG.md
  only).
- **The calendar rows** with `Status: planned` (to write) or `written` (to
  post).
- **DESIGN.md** — voice, hashtags policy, words to avoid. It wins over your
  defaults.
- **Each row's source** — the caption's facts come from it, nowhere else.

## Ground rules (non-negotiable)

1. **Facts from the source.** A number, a quote, a claim about a customer or
   result appears only if the row's source shows it.
2. **Fit the channel.** Length and format per the channel's limits; hashtags
   only as DESIGN.md allows.
3. **Posted exactly as approved.** The text posted is the caption shown at
   the yes, word for word.

## Procedure

**1. Load** the inputs above.

Scratch for this run lives in `.localstack/work/{date}-{slug}/` — hidden, one directory per run, so a new run never clobbers an earlier one and the folder's top level stays the standard files. Scratch is disposable; old run directories may be deleted freely.

**2. Write captions.** Under `## Posts` in the plan (create it after the
calendar; never remove an entry), per row:

```
### <Day> — <Channel> — <idea>
Status: written | waiting for picture
- Source: <URL/file>
- Picture: <file, or "needs picture — /vinci <brief>">

<caption>
```

Set the calendar row's Status to `written`.

**3. Post — only when asked, one at a time.** For each `written` post with
its picture ready: open the channel's composer in the signed-in browser,
attach the picture, put the caption in exactly, check the account name, and
stop:

```
<Channel> — <account>
<the exact caption> · picture: <file>
Post this?
```

On yes, post, then confirm it is live (the post on the profile or a posted
notice) and note its URL. Edit → show again and ask. Skip → `skipped`.
Status becomes `posted YYYY-MM-DD <post URL>`, `skipped`, `failed — <what
you saw>` or `blocked — <why>`, in `## Posts` and the calendar row.

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **PLAN-<topic>.md** — in `## Steps`, tick `- [x] post` (add today's date after it) once this step is done; leave it unticked if you stopped partway, and say why in CHANGELOG.md.
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

For this step: tick `- [x] write captions` when every row is written; the
standard tick above marks `post` only when no post is left unposted. The
CHANGELOG line gives written / posted / skipped / blocked counts, and each
posted caption with its URL. TODOs: one per missing picture, one per blocked
channel.

**4. Report.** What was written, what was posted (with links), what waits
for a picture or a yes.

**Completion status.** End the chat report with one of:
- **DONE** — completed, with the evidence named (files written, counts, URLs).
- **DONE_WITH_CONCERNS** — completed, and list each concern.
- **BLOCKED** — cannot proceed; say what blocked it and what was tried.
- **NEEDS_CONTEXT** — missing information; say exactly what is needed.

## Quality bar

- Zero posts without their own yes, zero sign-ins, zero invented claims.
- Every posted entry carries its live URL.
- A missing picture is a named TODO for Nova, never a placeholder posted.
