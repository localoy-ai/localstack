---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: lead-search
version: 0.6.0
publisher: localoy
capabilities: [files, web]
# localoy dialect: stages make this runnable on small local models. Each stage
# is its own turn with its own time budget and a file that survives it, so a
# model too slow to finish one monolithic research turn still ships the list.
# Claude Code ignores this key and runs the Procedure below in one pass.
# The stage goals double as the compressed fallback when sections/ is absent.
stages:
  - id: harvest
    goal: >
      If briefs/*.md exists, read the newest one first for the buyer,
      territory, list size and disqualifiers.
      Run 5 to 8 web searches for the described buyer, each with a DIFFERENT
      angle: direct ("<niche> companies in <place>"), roundups ("best <niche>
      <place>"), neighboring cities by name, and site: queries for gated
      sources read from snippets. Snippets only — fetch NO pages in this
      stage. Record every candidate company as a line: name, the query that
      found it, the result URL. Never repeat an identical query.
    produces: work/{date}-{slug}/found.md
  - id: resolve
    goal: >
      For each candidate in work/{date}-{slug}/found.md, establish its own website (its own
      domain — a Yelp, Clutch, Facebook or directory page is never the
      website), its location, and its decision maker via one search like
      "<company>" (founder OR CEO OR owner) or site:linkedin.com/in
      "<company>", reading names and titles from result titles only. Never
      construct a profile URL — record only URLs a search surfaced. Fetch at
      most 3 pages in this whole stage, and only where snippets left a row
      ambiguous. Write UNKNOWN for anything not observed.
    produces: work/{date}-{slug}/resolved.md
  - id: report
    goal: >
      Read this run's work/{date}-{slug}/found.md and resolved.md. Deduplicate by canonical domain
      (strip www, lowercase, one row per domain). Write the CSV with header
      "Company Name,Location,Website,Decision Maker Name,Title,Profile URL,
      Evidence URL,Confidence" — one row per lead, Confidence one of
      verified/likely/unconfirmed, every row carrying the evidence URL a
      reader could open. After the rows, add no commentary; the file is data.
    produces: leads/{date}-{slug}.csv
description: Find sales leads on the open web — companies and decision makers with evidence behind every row. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [sales, leads, prospects, localstack]
    related_skills: [prospect-brief, lead-qualify]
allowed-tools:
  - Bash
  - Read
  - Write
  - WebSearch
  - WebFetch
  - AskUserQuestion
  - Skill
triggers:
  - find leads
  - build a lead list
  - find prospects
  - who could we sell to
  - find companies that need this
  - find agencies
  - find companies
  - find businesses
  - agencies in
  - companies in
  - lead list
tags: [sales, leads, prospects, agencies, companies, businesses]
---

## When to invoke this skill

Builds a lead list from the open web only: companies (or people) matching a
described buyer, each row carrying the URL it came from and an honest
confidence. No accounts, no logins, no paid data, no outreach — this skill
ends at the list. Use when asked to "find leads", "build a lead list",
"find prospects", or "who could we sell to".

## What you need first

**Check for a brief before asking anything:**
`ls briefs/*.md 2>/dev/null | sort -rV | head -1`. If one exists, confirm it in one
line ("Found briefs/2026-08-29-acme.md — sell X in Y, target N. Use it?") and
take the three facts below, plus the disqualifiers, from it. Anything the user
says explicitly in this conversation overrides the brief. No brief — written
by `/prospect-brief` — means the current behavior:

Three facts. Check the conversation and workspace first; ask for whatever is
still missing in a SINGLE message, then wait.

- **What they sell** — a list built from a guessed offering is confidently
  aimed at the wrong buyer.
- **Where they sell** — territory decides which of two identically named
  companies is the lead. "Anywhere" is a choice the user makes, not a default
  you assume.
- **How many they want** — ten leads deserve a fetch each; a hundred are
  snippet work. The budget scales from this.

If no answer comes, produce what is genuinely useful anyway, state at the top
which facts you lacked, and say what would change once you have them.

## Ground rules (non-negotiable)

These come from watching earlier lead tools fail. Each one bans a specific,
observed failure. They apply in every step, whether or not you read a
section.

1. **Search engines are the only door to gated sites.** Never fetch LinkedIn,
   Crunchbase, ZoomInfo, G2, Clutch or anything behind a login — they block,
   time out, or poison the session. `site:linkedin.com/in "<company>"` in a
   web search is fine: read the name and title off the result title
   (`Jane Doe - CEO - Acme | LinkedIn`) and cite the search, not the profile.
2. **Never construct a profile URL.** A LinkedIn slug you guessed
   (`/in/first-last`) is fabrication — real slugs almost always carry a
   disambiguator. A profile URL enters the file only if a search surfaced it
   this session. A right name with a wrong URL is worse than a name alone.
3. **The Website column holds the company's own domain, never an aggregator.**
   A Yelp, Clutch, Facebook or directory page is evidence, not a website.
4. **No invented contact data.** No email patterns, no guessed phones. A
   contact detail appears only if you read it on a page you fetched, cited.
5. **No invented firmographics.** Founding year, headcount, revenue — only if
   observed, with the source. A number invented to justify keeping a row
   poisons the list.
6. **`UNKNOWN` is a value.** Every field you could not observe says `UNKNOWN`.
   A blank looks like an oversight; `UNKNOWN` is a finding.

## Sections (read on demand)

The step-by-step mechanics live in `sections/` next to this file. Read a
section right before doing that step — never all of them up front:

| When | Read |
|---|---|
| planning the harvest queries (Step 2) | `sections/harvest.md` |
| resolving candidates into rows (Step 3) | `sections/resolve.md` |
| deduping, writing the CSV, reporting (Steps 4-6) | `sections/report.md` |

If `sections/` is missing (partial install), do not stop: the stage goals in
this file's frontmatter carry the compressed rules — follow those plus the
ground rules above.

## Procedure

Scratch for this run lives in `work/{date}-{slug}/` — one directory per run, so a new run never clobbers an earlier one. Scratch is disposable; old `work/` run directories may be deleted freely.

**Prior runs:** `ls leads/*-{slug}*.csv 2>/dev/null | sort -rV` — if anything matches, tell the user what already exists (one line per file: date and filename) before proceeding; earlier runs are never overwritten. If nothing matches, say nothing and continue.

**1. Write the buyer down.** One sentence, from what the user told you — not
from their website's copy. Copy says how they describe themselves, which is
often not how their buyers look.

**2. Harvest** (read `sections/harvest.md`): 5-8 searches, each a different
angle, snippets only. Every candidate lands in `work/{date}-{slug}/found.md`
with its query and result URL.

**3. Resolve** (read `sections/resolve.md`): per candidate — own website,
location, decision maker from result titles; at most one page fetch per
candidate. Trail goes to `work/{date}-{slug}/resolved.md`.

**4-6. Dedupe, write, report** (read `sections/report.md`): one row per
canonical domain, `leads/{YYYY-MM-DD}-{slug}.csv` with the exact canonical
header, then the short gist in chat naming the brief consumed.

**7. Hand off.** Offer the next stage — "Qualify this list with
`/lead-qualify`?" — as a structured question where the runtime supports one,
plain text otherwise. On yes, invoke `/lead-qualify` if this runtime can
invoke skills directly (Claude Code: the Skill tool); otherwise tell the user
to type `/lead-qualify` (Codex: `$lead-qualify`). The skill still ends at the
list; the chain continues only when the user says so.

## Quality bar

- Every field traces to something fetched, searched, or told to you this
  session. What you remember about a company is not evidence.
- A row that fails rule 2 or 3 does not ship with a caveat — it ships fixed
  or not at all.
- Partial work is reported as partial: "34 found, 20 resolved, budget spent"
  beats a padded list where the last ten rows are guesses.
- No scores. Confidence is the three-word enum, argued from observations,
  never a number.
