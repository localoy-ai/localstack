---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: lead-qualify
version: 0.3.0
publisher: localoy
capabilities: [files, web]
# localoy dialect: stages make this runnable on small local models. Row-by-row
# checking is the most naturally multi-turn work in the suite — each stage
# is its own turn with a file that survives it. Claude Code ignores this key
# and runs the Procedure below in one pass.
stages:
  - id: load
    goal: >
      If the user handed over their own file (a CSV path or pasted rows),
      import it first: map its columns onto leads-{slug}.csv's header by
      meaning, put every column that fits nowhere into Notes as
      "<column>: <value>; …", set Evidence URL to "user-supplied" and
      Confidence to "unconfirmed" on imported rows, and start a short
      PLAN-{slug}.md if none exists. Then read leads-{slug}.csv and
      PLAN-{slug}.md (its Disqualifiers section). Queue every row whose
      Verdict is empty (or every row, if the user asked to re-check all).
      Write one line per queued row: canonical domain, the claims to check,
      the blanks and UNKNOWNs to try to fill (website, location, decision
      maker, title, contact channel), and which plan disqualifiers could
      apply. No web work in this stage.
    produces: .localstack/work/{date}-{slug}/qualify-queue.md
  - id: verify
    goal: >
      For each line in .localstack/work/{date}-{slug}/qualify-queue.md:
      check the website resolves and is the company's own domain (at most
      ONE fetch per row, only when a search snippet leaves it ambiguous);
      re-run one search for the decision maker ("<company>" founder OR CEO
      OR owner, or site:linkedin.com/in "<company>") and compare names from
      result titles only; look for an OBSERVED contact channel (an email
      read on a fetched page, a contact page or form URL, or the row's
      Profile URL); test each applicable disqualifier against what you
      observe. Verdict per row: keep or cut, one-sentence reason, and a fresh
      evidence URL from THIS session. Fill a blank or UNKNOWN only with a
      value you observed, cited. Never construct URLs or emails, never fetch
      gated sites. Append one line per row.
    produces: .localstack/work/{date}-{slug}/qualify-verdicts.md
  - id: report
    goal: >
      Read the queue and verdicts. In leads-{slug}.csv, on each queued row,
      in place: fill Verdict (keep, cut or UNKNOWN), Verdict Reason,
      Verification URL and Verified Date; fill Channel ("<email|form|contact
      page|profile> <value>") and Channel Evidence when a channel was
      observed; replace blanks or UNKNOWNs in the first columns only with
      observed values. Never drop, add or reorder rows. Then add a dated
      "## Qualify — YYYY-MM-DD" section to PLAN-{slug}.md: kept N / cut M by
      reason, filled F values, rows with no channel, and the rows that could
      not be verified. Add today's line to CHANGELOG.md, tick qualify in the
      PLAN's Steps. No numeric scores anywhere.
    produces: leads-{slug}.csv
description: >-
  Check & fill a lead list — yours or one /lead-search built. Re-checks each
  row against the open web, fills the gaps it can actually observe (website,
  decision maker, contact channel), and keeps or cuts each row with a reason
  and fresh evidence. Never a score. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [sales, qualify, verify, enrich, import, localstack]
    related_skills: [lead-search, lead-draft]
allowed-tools:
  - Bash
  - Read
  - Write
  - WebSearch
  - WebFetch
  - AskUserQuestion
triggers:
  - qualify these leads
  - verify the lead list
  - check these leads
  - clean up the list
  - enrich this list
  - here is my lead list
  - import my leads
  - check my csv
tags: [sales, qualify, verify, enrich, import]
---

## When to invoke this skill

**Check & fill.** Takes a lead list — one `/lead-search` built, or a file the
user brings — and works through it row by row against the open web:

- **Check:** does the website resolve and belong to the company, does the
  decision maker still match a fresh search, does any plan disqualifier fire.
- **Fill:** blanks and UNKNOWNs it can actually observe — website, location,
  decision maker, title — and each lead's **contact channel**, so drafting
  can start straight away.

Every row gets keep or cut, a reason, and a fresh evidence URL — never a
score. Use after `/lead-search`, when someone shares a list ("here's my
list", "enrich this", "check my CSV"), or when asked to "qualify", "verify",
or "clean up" a lead list.

## Bringing your own file

A shared list comes in whatever shape its author used ("Name, Company, Email,
Notes"). Import it before checking:

1. **Pick the topic.** If `PLAN-*.md` files exist, use the one the user
   named, or the only one, or ask which — or start a new topic when the file
   is a different piece of work. If none exists, do not send the user to
   `/lead-plan`: name the topic from the file and
   the conversation (`<niche>-<territory>`, or the file's name), and start a
   short `PLAN-<topic>.md` — `# Plan: <topic>`, then `## What we sell`,
   `## Who buys (ICP)`, `## Territory` and `## Disqualifiers`, filled from
   what the user said and `UNKNOWN — ask before drafting` otherwise, then the
   `## Steps` checklist with `search` ticked as "imported <file>".
2. **Map the columns by meaning** onto the list's header:
   `Company Name,Location,Website,Decision Maker Name,Title,Profile URL,Evidence URL,Confidence,Verdict,Verdict Reason,Verification URL,Verified Date,Channel,Channel Evidence,Reached,Reached Channel,Exported,Notes`
   "Company"/"Business" → `Company Name`, "URL"/"Domain" → `Website`,
   "Contact"/"Name" → `Decision Maker Name`, "Role" → `Title`, "LinkedIn" →
   `Profile URL`, an email column → `Channel` (`email <address>`, with
   `Channel Evidence` = `user-supplied`). Show the mapping in one short list
   before writing, and ask only if a column is genuinely ambiguous.
3. **Nothing is dropped.** Every column that fits nowhere goes into `Notes`
   as `<column>: <value>; …`.
4. **Imported rows are the user's facts, not observations.** `Evidence URL` =
   `user-supplied`, `Confidence` = `unconfirmed` until this run checks them.
5. **Merge, never duplicate.** A row whose canonical domain is already in
   `leads-<topic>.csv` is merged: blanks filled from the file, nothing
   overwritten, the difference noted in `Notes`. A lead is **already handled** when its canonical domain (strip `www.`, lowercase) has a `Reached` or `Exported` value in any `leads-*.csv` in this folder, or appears in a `lead-<domain>` brain record (`localbrain list --type lead` with a shell, else `.brain/context.md` if it exists). Such a
   row is still imported, but marked in `Notes` as "already reached or exported"
   and never queued for drafting.

Say how many rows came in, how many merged, and how many were already
handled.

## What you read first

- **The topic** (no file brought): Pick the topic: `ls PLAN-*.md 2>/dev/null`. If the user named a topic, use `PLAN-<topic>.md`. If exactly one PLAN exists, use it. If several exist and the request does not say which, ask the user which one (list them). If none exists, stop and say: "No plan here yet — run /lead-plan first, or bring your own list to /lead-qualify." The topic is the part between `PLAN-` and `.md`; every other file for it uses the same topic: `leads-<topic>.csv`.
- **The list:** `leads-<topic>.csv` (after an import, if there was one). No
  list and no file → offer `/lead-search`, or ask for a CSV path or pasted
  rows. Never fabricate input.
- **The plan:** its `## Disqualifiers` section becomes the cut criteria. No
  disqualifiers written → check on observability alone (dead domains,
  aggregator-as-website, decision maker mismatch) and say so in the report.
- **DESIGN.md**, if present — channels to use or avoid; a channel it rules
  out is not recorded as the lead's `Channel`.

By default only rows with an empty `Verdict` are checked, so a rerun picks up
just the rows added since. Re-check every row only when the user asks.

## Ground rules (non-negotiable)

1. **Fresh evidence or no verdict.** Every keep and every cut cites a URL
   observed THIS session. The original row's evidence proves what was true
   then; checking is about now.
2. **Keep/cut + reason, never a score.** A number invented to rank rows is a
   fabrication with extra steps. The reason sentence does the ranking.
3. **Cut rows stay in the file.** The list keeps every row, its `Verdict`
   filled — the cut list is as useful as the keep list.
4. **Fill only what you observed.** A blank or UNKNOWN becomes a value only
   when you read it this session, cited. Never guess an email pattern
   (`first@domain.com` is fabrication), never construct a profile URL, never
   "resolve" UNKNOWN by inference.
5. **Same doors as lead-search.** Gated sites via search snippets only; no
   constructed URLs; at most one page fetch per row, and only when snippets
   left it ambiguous.
6. **Partial is partial.** Budget spent at row 30 of 50 → the report says 30
   checked, 20 unchecked, and the unchecked rows keep verdict `UNKNOWN`.

## Procedure

**1. Load** — import the user's file first if there is one (above), then the
list and plan (stage `load` above is the spec).

Scratch for this run lives in `.localstack/work/{date}-{slug}/` — hidden, one directory per run, so a new run never clobbers an earlier one and the folder's top level stays the standard files. Scratch is disposable; old run directories may be deleted freely.

**2. Check and fill each queued row** (stage `verify` is the spec): website is
their own domain and alive; decision maker re-searched and compared from
result titles; an observed contact channel found where one exists; blanks
filled only from observations; disqualifiers tested against observations. One
line per row.

**3. Write the results in place.**

- `leads-<topic>.csv` — on each checked row, fill `Verdict` (`keep`, `cut` or
  `UNKNOWN`), `Verdict Reason`, `Verification URL`, `Verified Date`, and
  `Channel` / `Channel Evidence` when a channel was observed; replace blanks
  or UNKNOWNs only with observed values. The row count and order never
  change.
- `PLAN-<topic>.md` — add a dated section after `## Steps`:

```
## Qualify — YYYY-MM-DD
kept N / cut M — cuts by reason: <reason>: n, ...
filled: F values (websites w, decision makers d, channels c)
no observed channel: (kept rows without one), or "none"
could not verify: (rows left UNKNOWN and why — budget, ambiguity, dead
trails), or "none"
```

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **PLAN-<topic>.md** — in `## Steps`, tick `- [x] qualify` (add today's date after it) once this step is done; leave it unticked if you stopped partway, and say why in CHANGELOG.md.
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

For this step: the CHANGELOG line gives kept / cut / filled counts (and
"imported N rows from <file>" when there was an import); add
`- [ ] draft outreach for N kept leads (<topic>)` to TODOS.md, and one TODO
per kept row with no observed channel.

**4. Report and hand off.** In chat: kept/cut counts, what was filled, the
dominant cut reasons, what could not be checked. Then offer the next stage —
"Draft outreach for the kept rows with `/lead-draft`?" — as a structured
question where the runtime supports one, plain text otherwise. On yes, invoke
`/lead-draft` if this runtime can invoke skills directly (Claude Code:
the Skill tool); otherwise tell the user to type `/lead-draft` (Codex:
`$lead-draft`).

## Quality bar

- Every verdict and every filled value a reader can check by opening one URL.
- A cut without a reason, or a keep without fresh evidence, is a failed row —
  fix it or mark it UNKNOWN.
- An imported file loses nothing: every source column is in a header column
  or in `Notes`.
- The verdict distribution is honest: a pass that keeps everything checked
  nothing.
