---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: reconcile
version: 0.1.0
publisher: localoy
capabilities: [files, shell]
description: >-
  Matches invoices, payments and bank or platform exports in the CSV or XLSX
  files the person points at — three checks (totals, duplicates, missing) —
  and lists every mismatch line by line. Never guesses a number; never edits
  the source files. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [finance, reconciliation, csv, xlsx, localstack]
    related_skills: [money-report]
allowed-tools:
  - Bash
  - Read
  - Write
  - AskUserQuestion
triggers:
  - reconcile these
  - match invoices to payments
  - do the books match
  - check the bank export against invoices
  - find missing payments
tags: [finance, reconciliation, bookkeeping]
---

## When to invoke this skill

Lines up two or more money files — invoices against payments, a bank export
against a sales export, a payout report against orders — and reports exactly
what matches and what does not. Use when asked to "reconcile these", "match
invoices to payments", "find what's missing". Zorp's skill; the monthly
summary is `/money-report`.

## The hard boundary

- **Numbers come from the files.** Every amount, date and id in the output is
  copied from a named file and row. A cell that is blank, unreadable or
  ambiguous is reported as such — never filled, rounded into agreement, or
  "probably" anything.
- **Source files are read-only.** Never edit, sort in place, re-save or
  delete the person's files. Working copies go in scratch.
- **Computed, not eyeballed.** Totals and matches are computed by a script
  (`python3`, or `bun`/`node`, with `csv`/`openpyxl` or plain parsing) whose
  code is saved in scratch, so anyone can re-run it. If no script runtime is
  available, say so and stop rather than adding by eye.
- **No money moves.** This skill never pays, refunds, chases or messages
  anyone; it reports.

## What you need first

- **The files** — paths to each CSV/XLSX (and which sheet).
- **What should match what** — e.g. "every invoice should have a payment".
- **The match key**, if the person knows it (invoice number, reference,
  amount + date). If not, propose one from the columns and confirm it.
- **The period**, if the files cover more than one.

Ask for what is missing in a SINGLE message, then wait.

## Procedure

**1. Inspect.** For each file: row count, column names, date format, number
format (decimal comma? currency symbols? negatives in brackets?), currency.
Write it to `.localstack/work/{date}-<slug>/inspect.md` and show the person
the columns you will use. Slug: from the files' subject and period
(`stripe-vs-invoices-2026-09`).

Scratch for this run lives in `.localstack/work/{date}-{slug}/` — hidden, one directory per run, so a new run never clobbers an earlier one and the folder's top level stays the standard files. Scratch is disposable; old run directories may be deleted freely.

**2. Normalise in scratch.** Parse dates and amounts into a working copy;
log every row that could not be parsed, with its file and row number. Mixed
currencies are never converted — they are reconciled separately, or flagged.

**3. Run the three checks.**

- **Totals** — each file's total for the period, and the difference. A
  difference is shown to the cent, never rounded away.
- **Duplicates** — rows that repeat the key (or the same amount + date +
  counterparty) within one file, each listed.
- **Missing** — keys on one side with no match on the other, both
  directions. Near-matches (same key, different amount; same amount, dates a
  few days apart) are listed as `near match`, never counted as matched.

**4. Write `reconcile-<slug>.md`** at the top of the working folder:

```
# Reconcile — <slug>
Updated: YYYY-MM-DD
Files: <file (sheet), rows, period> …
Match key: <key> · Script: .localstack/work/<run>/reconcile.py

## Totals
| File | Rows | Total | Currency |
Difference: <amount> (<file A> − <file B>)

## Duplicates
| File | Row | Key | Date | Amount |

## Missing
### In <A>, not in <B>
| Row | Key | Date | Amount | Counterparty |
### In <B>, not in <A>
…

## Near matches
| A row | B row | What differs |

## Could not read
| File | Row | Why |
```

An empty section says "none found", never disappears.

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

For this step: the CHANGELOG line gives files, rows, matched / missing /
duplicate / near counts and the totals difference. One TODO per missing or
duplicate item the person must chase (`- [ ] check <key> <amount> — <what>
(reconcile <slug>)`).

**5. Report.** The totals difference first, then counts per check, then
where the line-by-line list is. Offer `/money-report` once the files agree.

**Completion status.** End the chat report with one of:
- **DONE** — completed, with the evidence named (files written, counts, URLs).
- **DONE_WITH_CONCERNS** — completed, and list each concern.
- **BLOCKED** — cannot proceed; say what blocked it and what was tried.
- **NEEDS_CONTEXT** — missing information; say exactly what is needed.

## Quality bar

- Every line in the output can be found by opening the named file at the
  named row.
- The difference in "Totals" equals the sum of what the other sections
  explain, or the gap is stated as unexplained.
- Zero edited source files, zero guessed numbers.
