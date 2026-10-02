---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: money-report
version: 0.1.0
publisher: localoy
capabilities: [files, shell]
description: >-
  A monthly money summary from the CSV or XLSX files the person points at —
  money in, money out, what is still owed, and what changed notably from last
  month — with every number taken from the files and traceable to them.
  (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [finance, report, monthly, localstack]
    related_skills: [reconcile, routine-setup]
allowed-tools:
  - Bash
  - Read
  - Write
  - AskUserQuestion
triggers:
  - monthly money report
  - how did we do this month
  - summarise our finances
  - what came in and went out
  - who still owes us
tags: [finance, monthly-report, cash]
---

## When to invoke this skill

Writes one month's money summary from the person's own exports — bank,
payment platform, invoices, expenses: what came in, what went out, what is
outstanding, and what moved notably against last month. Use when asked for "a
monthly money report", "how did we do this month", "who still owes us". Zorp's
skill; to check the files agree first, use `/reconcile`. To get it every
month, hand it to `/routine-setup`.

## The hard boundary

- **Numbers only from the files.** Every figure is computed from named files
  by a script saved in scratch. No figure from memory, from a previous chat,
  or estimated to fill a gap. A month with no data for a category says
  `no data`, not zero.
- **Not advice.** The report says what the numbers are and what changed. It
  does not recommend investments, tax positions or financing; when asked,
  say plainly that is for an accountant or adviser.
- **Read-only, no money moves.** Source files are never edited; nothing is
  paid, invoiced or chased.
- **Categories are the person's.** Use the categories in the files or in
  DESIGN.md's `## Money categories`. Rows you would have to guess a category
  for go under `uncategorised`, listed — never silently sorted.

## What you need first

- **The files** for the month (and last month's, for the comparison).
- **The month** — default: the last full calendar month.
- **Which file is the truth for cash** — usually the bank export.

Ask for what is missing in a SINGLE message, then wait. If `/reconcile` found
unexplained differences for this month, say so at the top of the report.

## Procedure

**1. Inspect** each file as `/reconcile` does — columns, date and number
formats, currency, row count — and confirm which columns mean in, out and
outstanding.

Scratch for this run lives in `.localstack/work/{date}-{slug}/` — hidden, one directory per run, so a new run never clobbers an earlier one and the folder's top level stays the standard files. Scratch is disposable; old run directories may be deleted freely.

**2. Compute** in a script (`.localstack/work/{date}-money-<yyyy-mm>/report.py`,
or the bun/node equivalent): totals in and out by category, net, outstanding
invoices (issued, unpaid by month end — from the invoice file's status or
payment match), and the same figures for last month when its files are
given. Mixed currencies are reported separately, never converted.

**3. Find what is notable** — only from the numbers: a category up or down
by a large share against last month, a new largest customer or supplier, an
invoice outstanding longer than 30 days, a one-off large payment. Each
names its rows.

**4. Write `money-<yyyy-mm>.md`** at the top of the working folder:

```
# Money — <Month YYYY>
Updated: YYYY-MM-DD
Files: <file, rows, period> … · Script: .localstack/work/<run>/report.py

## In
| Category | This month | Last month | Change |
## Out
| Category | This month | Last month | Change |
Net: <amount>

## Outstanding
| Invoice | Customer | Issued | Amount | Days open |

## Notable
- <what> — <amount> — rows: <file:row, …>

## Not covered
- <category or file missing, rows uncategorised, anything unreadable>
```

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

For this step: the CHANGELOG line gives the month, in, out, net and the
outstanding total. One TODO per invoice open over 30 days (`- [ ] chase
<invoice> <customer> <amount> (money <yyyy-mm>)`) — the chase itself is the
person's, or a draft with its own yes.

**5. Report.** In / out / net / outstanding in one line each, then the
notable items. Offer `/routine-setup` to produce it every month.

**Completion status.** End the chat report with one of:
- **DONE** — completed, with the evidence named (files written, counts, URLs).
- **DONE_WITH_CONCERNS** — completed, and list each concern.
- **BLOCKED** — cannot proceed; say what blocked it and what was tried.
- **NEEDS_CONTEXT** — missing information; say exactly what is needed.

## Quality bar

- Every figure re-computes from the saved script and the named files.
- `no data` and `uncategorised` are visible, never folded into a total.
- A short true report beats a polished one with one invented number.
