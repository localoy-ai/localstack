---
name: lead-search
version: 0.3.0
publisher: localoy
capabilities: [files, web]
# localoy dialect: stages make this runnable on small local models. Each stage
# is its own turn with its own time budget and a file that survives it, so a
# model too slow to finish one monolithic research turn still ships the list.
# Claude Code ignores this key and runs the Procedure below in one pass.
stages:
  - id: harvest
    goal: >
      Run 5 to 8 web searches for the described buyer, each with a DIFFERENT
      angle: direct ("<niche> companies in <place>"), roundups ("best <niche>
      <place>"), neighboring cities by name, and site: queries for gated
      sources read from snippets. Snippets only — fetch NO pages in this
      stage. Record every candidate company as a line: name, the query that
      found it, the result URL. Never repeat an identical query.
    produces: work/found.md
  - id: resolve
    goal: >
      For each candidate in work/found.md, establish its own website (its own
      domain — a Yelp, Clutch, Facebook or directory page is never the
      website), its location, and its decision maker via one search like
      "<company>" (founder OR CEO OR owner) or site:linkedin.com/in
      "<company>", reading names and titles from result titles only. Never
      construct a profile URL — record only URLs a search surfaced. Fetch at
      most 3 pages in this whole stage, and only where snippets left a row
      ambiguous. Write UNKNOWN for anything not observed.
    produces: work/resolved.md
  - id: report
    goal: >
      Read work/found.md and work/resolved.md. Deduplicate by canonical domain
      (strip www, lowercase, one row per domain). Write the CSV with header
      "Company Name,Location,Website,Decision Maker Name,Title,Profile URL,
      Evidence URL,Confidence" — one row per lead, Confidence one of
      verified/likely/unconfirmed, every row carrying the evidence URL a
      reader could open. After the rows, add no commentary; the file is data.
    produces: leads/{date}-{slug}.csv
description: Find sales leads on the open web — companies and decision makers with evidence behind every row. (localstack)
allowed-tools:
  - Bash
  - Read
  - Write
  - WebSearch
  - WebFetch
  - AskUserQuestion
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

Three facts. Check the conversation and workspace first; ask for whatever is
still missing in a SINGLE message, then wait.

- **What they sell** — a list built from a guessed offering is confidently
  aimed at the wrong buyer.
- **Where they sell** — territory decides which of two identically named
  companies is the lead. "Anywhere" is a choice the user makes, not a default
  you assume.
- **How many they want** — ten leads deserve a fetch each; a hundred are
  snippet work. The budget below scales from this.

If no answer comes, produce what is genuinely useful anyway, state at the top
which facts you lacked, and say what would change once you have them.

## Ground rules (non-negotiable)

These come from watching earlier lead tools fail. Each one bans a specific,
observed failure.

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

## Procedure

**1. Write the buyer down.** One sentence, from what the user told you — not
from their website's copy. Copy says how they describe themselves, which is
often not how their buyers look.

**2. Harvest, varying the angle — not the page.** Breadth comes from different
query shapes, never from paging one phrasing:

- direct: `<niche> companies in <place>`
- roundups: `best <niche> <place>`, `top <niche> agencies <year>`
- directories surfaced by search (fetch a directory page only when one result
  names many candidates at once — that is one fetch buying N candidates)
- local: `<niche> near <city>` and neighboring cities by name
- signal-based: who is hiring for the role your product replaces, who sponsors
  the niche's events, who wrote about the problem
- `site:` dorks for gated sources, read from snippets only

Record every candidate with the query that found it and the URL of the result.
Never repeat an identical query; never fetch the same URL twice.

**3. Resolve each candidate — snippet-first, fetch-budgeted.** Per candidate:
canonical website (their own domain), location, and one targeted search for the
decision maker: `"<company>" (founder OR CEO OR owner)` then
`site:linkedin.com/in "<company>"`, reading from result titles per rule 1.
Budget: **at most one page fetch per candidate**, and only when snippets left
the row ambiguous. Scraped pages are the expensive thing — a page you did not
need to fetch is the cheapest page there is.

**4. Dedupe by canonical domain.** Strip `www.`, lowercase, one row per
domain. Two names on one domain are one company; the same company found by two
angles keeps the stronger evidence.

**5. Write the list.** `leads/{YYYY-MM-DD}-{slug}.csv` in the project, header
exactly:

```
Company Name,Location,Website,Decision Maker Name,Title,Profile URL,Evidence URL,Confidence
```

One row per lead, appended as resolved — not held back for a final flourish.
`Confidence` is `verified` (two independent observations), `likely` (one solid
observation), or `unconfirmed` (snippet only). Every row's `Evidence URL` is a
page or search that a reader could open to check the row.

**6. Report.** In chat: how many leads, the angles that worked, what you cut
and why, and what you could not check. The cut list matters — a candidate
dropped for cause (aggregator-only presence, wrong territory, dead domain) is
information the next run needs. Keep the gist short; the file is the
deliverable.

## Quality bar

- Every field traces to something fetched, searched, or told to you this
  session. What you remember about a company is not evidence.
- A row that fails rule 2 or 3 does not ship with a caveat — it ships fixed
  or not at all.
- Partial work is reported as partial: "34 found, 20 resolved, budget spent"
  beats a padded list where the last ten rows are guesses.
- No scores. Confidence is the three-word enum, argued from observations,
  never a number.
