---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: file-tidy
version: 0.1.0
publisher: localoy
capabilities: [files]
description: >-
  Proposes clear names and folders for a messy folder, shows the whole plan,
  and moves files only after the person says yes — every move logged in
  CHANGELOG.md, nothing ever deleted or overwritten. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [operations, files, organise, localstack]
    related_skills: [inbox-triage]
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - AskUserQuestion
triggers:
  - tidy this folder
  - organise my files
  - clean up my downloads
  - rename these files
  - sort these documents
tags: [operations, files, organisation]
---

## When to invoke this skill

Looks at a folder the person names, proposes a name and a home for every
file, shows the plan, and moves only what they approve. Use when asked to
"tidy this folder", "organise my files", "rename these". Bloop's skill.

## The hard boundary

- **Never deletes.** Not duplicates, not empty files, not "obvious junk".
  Those go in the plan as `duplicate of <file>` or `looks unused` for the
  person to decide; even then this skill moves them to a `_review/` folder
  at most, never removes them.
- **Never overwrites.** A target name that exists gets a `-2`, `-3` suffix.
- **Plan first, move after a yes.** Nothing moves until the person has seen
  the plan and said yes — to all of it, to named rows, or "everything except
  …". A changed plan is shown again.
- **Inside the named folder only.** Never touch files outside it, hidden
  files and folders (`.git`, `.localstack`, app data), or anything a program
  is using (a project with a `package.json`, `.git` or similar is moved as
  one unit or left alone, never split).
- **Read names and metadata, not secrets.** Peek inside a file only as far
  as needed to name it (a PDF's title, an invoice number). Never copy its
  contents into the plan.

## What you need first

- **The folder.**
- **How they like it** — by year, by client, by type? Default: by type, then
  year. DESIGN.md `## File rules` may already say.
- **Names to keep** — anything they want left exactly as it is.

Ask for what is missing in a SINGLE message, then wait.

## Procedure

**1. Inventory.** List every file (path, size, modified date, type). Count
them. Spot exact duplicates by size and hash, not by name.

Scratch for this run lives in `.localstack/work/{date}-{slug}/` — hidden, one directory per run, so a new run never clobbers an earlier one and the folder's top level stays the standard files. Scratch is disposable; old run directories may be deleted freely.

**2. Propose.** For each file: a new name (`YYYY-MM-DD-<what>-<who>.<ext>`
unless the person's rule says otherwise — lowercase, hyphens, no spaces) and
a folder. Keep the extension. Leave alone what is already well named and
placed. Say the rule you used in one line at the top.

**3. Write the plan** to `PLAN-tidy-<folder>.md` (slug from the folder name):

```
# Tidy — <folder path>
Rule: <one line>
Files: N · to move: M · left alone: K · duplicates flagged: D

## Steps
- [ ] plan shown
- [ ] moves approved
- [ ] moved and logged

## Moves
| # | From | To | Why |
|---|---|---|---|

## Flagged (not moved unless you say so)
| From | Flag |
```

**4. Show and ask.** Summarise (how many moves, which new folders), point at
the plan, and ask: move all, move some (which rows), or change the rule.

**5. Move, after the yes.** Create folders, move each approved file, never
overwriting. After each move check the file is at its new path. A failed
move stops the run and is reported.

**6. Log every move** in CHANGELOG.md under today's date — one line per file,
`- file-tidy <folder>: moved "<from>" → "<to>"` — so any move can be undone
by hand. Write the same list as a reversible script to
`.localstack/work/{date}-tidy-<folder>/undo.sh` (moves back, newest first).

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

For this step: tick the plan's own Steps as each is done; the CHANGELOG
lines above are this run's record. TODOs: one per flagged duplicate or
unused file (`- [ ] decide: keep or remove <file> (file-tidy <folder>)`).

**7. Report.** Moved, left alone, flagged, failed — and where the undo
script is.

**Completion status.** End the chat report with one of:
- **DONE** — completed, with the evidence named (files written, counts, URLs).
- **DONE_WITH_CONCERNS** — completed, and list each concern.
- **BLOCKED** — cannot proceed; say what blocked it and what was tried.
- **NEEDS_CONTEXT** — missing information; say exactly what is needed.

## Quality bar

- Zero deletions, zero overwrites, zero moves before the yes.
- Every move has a CHANGELOG line and an undo line.
- The person can find any file again from the log alone.
