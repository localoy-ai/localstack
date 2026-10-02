---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: site-fix
version: 0.1.0
publisher: localoy
capabilities: [files, shell, browser]
description: >-
  Fixes one website bug — reproduces it, changes the smallest thing that
  fixes it, tests the fix twice in the browser, and reports what broke, why,
  and what changed. Asks before touching anything live. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [web, dev, bugfix, localstack]
    related_skills: [site-check]
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - AskUserQuestion
triggers:
  - fix this bug on my site
  - this page is broken
  - fix my website
  - the form doesn't work
  - fix the broken link
tags: [web, bugfix, debugging]
---

## When to invoke this skill

Fixes one thing that is broken on a website: a page that errors, a button
that does nothing, a layout that breaks on phones, a link that goes nowhere.
Use when asked to "fix this bug", "this page is broken", or after
`/site-check` names a fix-now item. Blip's skill.

## The hard boundary

- **Reproduce before changing anything.** No reproduction, no fix — report
  what you tried and what you saw instead. A guess at the cause shipped as a
  fix is how one bug becomes two.
- **The smallest change.** Fix the cause of this bug and nothing else: no
  refactors, no upgrades, no restyling, no "while I'm here".
- **Production is the person's.** Work on a local copy or staging. Deploying,
  pushing, editing files on the live server, changing a CMS page, DNS,
  hosting or plugin settings — each waits for the person's yes to that exact
  action, shown first. Never sign in to a host or CMS yourself; use a session
  or checkout they already have.
- **Never destroys.** No deleting files, tables, branches or content to make
  a problem go away. Back up any file before editing it in place on a
  server the person approved.
- **Tested twice, honestly.** "Fixed" means you watched the reproduction
  steps pass twice in the browser after the change. Anything less is
  reported as "changed, not verified".

## What you need first

- **The bug** — where it happens (URL) and what should happen instead.
- **Where the code lives** — a folder or repo on this computer, a staging
  URL, or a CMS. Without access to change it, the output is a diagnosis and
  a proposed change, said plainly.
- **How it gets live** — so you can say what the person must approve.

Ask for what is missing in a SINGLE message, then wait.

## Procedure

**1. Reproduce.** In the browser, follow the steps until you see the bug.
Record the steps, what you saw (console errors, failed requests, a
screenshot into scratch) and on which page. Slug: `<bug>` (`contact-form-500`).

Scratch for this run lives in `.localstack/work/{date}-{slug}/` — hidden, one directory per run, so a new run never clobbers an earlier one and the folder's top level stays the standard files. Scratch is disposable; old run directories may be deleted freely.

**2. Find the cause.** Trace from the symptom: the console error to its
file and line, the failed request to its handler, the broken layout to its
CSS rule. Write one sentence: "It breaks because …", with the evidence. Not
sure → say so and what would confirm it.

**3. Change the smallest thing.** On the local copy or staging. If the
project uses git, work on a branch (`fix/<bug>`), never on the main branch.
Note every file and line changed.

**4. Test twice.** Reload and repeat the reproduction steps — twice, in a
fresh page each time. Check the pages next to it still work (the one before
and after in the flow). Run the project's own tests if it has them. Any
failure → back to step 2.

**5. Going live — only with a yes.** Show the exact change and the exact
action that would make it live (the push, the upload, the CMS edit). Do it
only on the person's yes, then repeat the reproduction on the live site
once and report what you saw.

**6. Write `fix-<bug>.md`** at the top of the working folder:

```
# Fix — <bug>
Updated: YYYY-MM-DD · Status: fixed and verified | fixed locally, not live | diagnosed only

## What broke
<URL> — <steps> — <what was seen>
## Why
It breaks because … — evidence: <error/line/request>
## What changed
- <file:line> — <before → after>
## Tested
- run 1: <result> · run 2: <result> · neighbours: <pages> · tests: <result>
## Live
<pushed/deployed on YYYY-MM-DD after the person's yes | not live — waiting for: …>
```

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

For this step: the CHANGELOG line gives the bug, the status, and the files
changed. TODOs: `- [ ] approve going live: <bug> (site-fix)` when it is not
live; a TODO for anything found but left alone.

**7. Report.** What broke, why, what changed, and whether it is live — in
four lines. Offer `/site-check` to recheck the site.

**Completion status.** End the chat report with one of:
- **DONE** — completed, with the evidence named (files written, counts, URLs).
- **DONE_WITH_CONCERNS** — completed, and list each concern.
- **BLOCKED** — cannot proceed; say what blocked it and what was tried.
- **NEEDS_CONTEXT** — missing information; say exactly what is needed.

## Quality bar

- The bug was seen before the change and not seen, twice, after it.
- The diff is small enough to read in a minute.
- Nothing live changed without the person's yes to that exact action.
