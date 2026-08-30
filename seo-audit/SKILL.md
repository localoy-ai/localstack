---
name: seo-audit
version: 0.3.0
publisher: localoy
capabilities: [files, web]
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [seo, audit, localstack]
    related_skills: [keyword-research, on-page-optimizer]
description: Crawls a site's important pages and audits what is actually on them — titles, metas, headings, internal links, canonicals, image and markup flags — then writes a prioritized fix list to reports/. Use when asked to "audit my site", "check my SEO", "is anything broken", or "why am I not ranking". (localstack)
allowed-tools:
  - Bash
  - Read
  - Write
  - WebFetch
  - WebSearch
  - AskUserQuestion
triggers:
  - audit my site
  - check my seo
  - is anything broken on the site
  - run an seo audit
  - why am i not ranking
---
# SEO audit

Find the on-page and structural problems holding a site back, ranked by what they
cost and what they take to fix.

## What you need first

- **Site url** — there is nothing to fetch without it, and the wrong domain wastes the whole run
- **What the site is for** — whether a thin page is a problem depends on whether it was meant to rank

Check what you already know from this workspace and the conversation. Ask for everything still missing in a SINGLE message, then wait.

If no answer comes, do not guess your way through. Produce whatever is genuinely useful without the missing facts, state at the top which ones you lacked, and say what would change once you have them.

## What you decide, and what you do not

**Decide yourself** — which pages to crawl, how findings are grouped and what counts as urgent. Act; do not ask and do not flag.

**Decide and flag** — the page list when no sitemap was found and any page excluded for size or time. Proceed on a named assumption and put it at the top of the output.

**Stop and wait** — changing anything on the site itself. Never resolve one of these by assumption, however long the wait.

## How you work

**Say only what you observed.** Every claim in the output traces to something you
actually read, fetched or were told. If you did not check it, do not assert it.

**Report what you could not do.** A page that would not load, a source you could
not reach, a step you skipped — these go in the output. Dropping them silently
turns partial work into work that looks complete, which is worse than work that
looks partial.

**Name your assumptions.** If you had to assume something to proceed, put it at
the top of what you produce, in one line. An assumption stated is corrected in
seconds; an assumption buried becomes a fact nobody checked.

**Finish or say you did not.** Do not pad to length, and do not present a first
pass as a final one.

## Before you start

Establish what you need before producing anything. A confident answer about a
business you have not described is the most expensive kind of wrong: it reads as
authoritative and nobody catches it until it is in front of a customer.

## Sources

**Cite what you used.** Name the URL, document or statement behind each finding,
inline, where the finding is. A sources list at the bottom that nothing points to
is decoration.

**Prefer what you fetched to what you recall.** When they disagree, the fetch
wins and you say so. When you could not fetch, say that instead of filling the
gap from memory.

**Do not launder a guess through a citation.** Linking a plausible source next to
an unverified claim is worse than the bare claim, because it borrows credibility
the claim did not earn.

## Sequencing

Work in the order the procedure gives. Each step exists because the next one is
worse without it — research before writing, inventory before fixing, baseline
before change.

If you must skip a step, say which and why in the output. A silently skipped step
is indistinguishable from a step that found nothing, and the two mean opposite
things.

## Partial work

Long work gets interrupted. If you cannot complete every step:

- Deliver what is finished, clearly labelled as partial.
- State exactly where you stopped and what remains.
- Never present a subset as the whole. A three-page audit described as a site
  audit is a false claim about coverage, even when every page in it is correct.

## Procedure

1. **Scope the crawl.** Fetch the homepage and `sitemap.xml` (or
   `/sitemap_index.xml`). Build a page list capped at the 30 most important URLs:
   homepage, service and product pages, top posts, contact. If there is no
   sitemap, build the list from the homepage's own navigation and say so at the
   top of the report — a list you inferred is a different claim from a list the
   site published.
2. **Fetch each page.** Request every URL on the list. Record the HTTP status,
   any redirect chain, and every page that failed. Never guess at the content of
   a page you could not fetch.
3. **Check the on-page elements.** For each page, extract the title, meta
   description, H1 and heading structure. Record the observed text and its
   character count, then flag: missing or duplicate titles, titles over 60
   characters, missing metas, more than one H1, headings that skip a level.
4. **Map the internal links.** From the fetched HTML, list internal links per
   page. Flag orphan pages (in the sitemap, linked from nowhere), broken internal
   links, and important pages more than two clicks from the homepage.
5. **Note the markup flags.** From the HTML alone: missing canonical tags,
   missing structured data on pages that plainly want it, images with no
   dimensions or lazy loading, oversized inline scripts. These are flags, not
   measurements — you are not running a performance test and must not imply you
   did.
6. **Prioritize.** Sort every finding into fix this week (broken links, missing
   titles, accidental noindex), fix this month (weak metas, heading structure),
   and backlog (markup niceties). Severity comes from what you observed, never
   from a general rule about what usually matters.
7. **Write the report.** Save to `reports/{date}-seo-audit-{slug}.md`. Summary table first,
   then per-page findings, then the prioritized fix list. Report the path back.

## Quality bar

- Every finding names the exact URL and quotes the observed value — the actual
  title text and its length, not "the title is too long".
- The report states how many pages were fetched, how many failed, and how the page
  list was built. A 30-page crawl is never described as the site.
- No scores, no estimated traffic, no difficulty or authority numbers. You have no
  tool that measures those. Where one is needed, name the check you could not run.
- Every fix says what to change and to what, specifically enough for a
  non-specialist to make the edit.
- Nothing about rankings. You cannot see them from a page fetch, and a page-level
  guess dressed as a ranking cause is the most misleading thing this skill could
  produce.

## The output contract

These apply to the file you write, not just the reply you send.

- Never state a score, rating or grade you did not measure. Report the values you actually observed instead — they are more useful and they are true.
- Open with a summary table — a row per page, item or finding — so the shape of the result is readable before the detail.
