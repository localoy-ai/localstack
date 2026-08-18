---
name: keyword-research
version: 0.1.0
description: Decides what a site should target: the terms its buyers actually use, grouped by the intent behind them and mapped to the page that should own each one. Use when asked "what keywords should we target", "find keywords", "what should we write about", or "what do people search for". (localstack)
allowed-tools:
  - Bash
  - Read
  - Write
  - WebFetch
  - WebSearch
  - AskUserQuestion
triggers:
  - what keywords should we target
  - find keywords
  - what should we write about
  - what do people search for
---
# Keyword research

Decide what this site should try to rank for, in the buyer's words, and say which
page should own each term.

## What you need first

- **What the business sells** — a keyword set built from a guess about the offering is confidently aimed at the wrong buyer
- **Where it sells** — a service area changes which terms are worth anything and which are noise
- **Site url** — a term the site already has a page for is a different recommendation from one it does not

Check what you already know from this workspace and the conversation. Ask for everything still missing in a SINGLE message, then wait.

If no answer comes, do not guess your way through. Produce whatever is genuinely useful without the missing facts, state at the top which ones you lacked, and say what would change once you have them.

## What you decide, and what you do not

**Decide yourself** — how terms are grouped, which page should own a term and what to cut. Act; do not ask and do not flag.

**Decide and flag** — the buyer you assumed and any term kept despite thin evidence. Proceed on a named assumption and put it at the top of the output.

**Stop and wait** — buying tool access and or anything that spends money. Never resolve one of these by assumption, however long the wait.

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

## Procedure

1. **Write down what is being sold.** In one sentence, from what you were told —
   not from the site's own copy. Copy tells you how the business describes itself,
   which is frequently not how its buyers search.
2. **Collect the seed terms.** From the business description, from the site's own
   navigation and headings, and from what competitors' pages call the same thing.
   Fetch those pages; quote the terms you found and where you found them.
3. **Harvest the real phrasings.** Use the search suggestions, related searches
   and question boxes you can actually observe for your seed terms. Record each
   one and where it came from. If you cannot reach a source, say so — an
   unreachable source is a gap in the research, not an invitation to invent.
4. **Group by intent, not by topic.** Four groups: ready to buy, comparing
   options, learning about the problem, and looking for the business by name.
   Intent decides what page type wins; topic does not.
5. **Cut what cannot work.** Drop terms whose results are dominated by
   marketplaces, directories or national brands, and say which and why. A term
   this site has no chance at is worse than no term, because it absorbs work.
6. **Map each surviving term to a page.** An existing URL where one fits, or a
   page that would have to be created, named as such. A term with no plausible
   page is not a target.
7. **Write the report.** Save to `reports/{date}-keywords-{slug}.md`. Summary table first —
   term, intent group, target page, exists or to create — then the groups with the
   evidence for each term, then what you cut and why.

## Quality bar

- No search volumes, no difficulty scores, no traffic estimates. You have no
  keyword tool. Where a number would normally go, name the check you could not
  run — the absence is the honest finding, and an invented number here poisons
  every decision downstream.
- Every term traces to something observed: a suggestion you saw, a competitor
  heading you read, a phrase the business used. Terms you generated by analogy are
  labelled as such.
- Priority is argued in words — closeness to a purchase, whether a page already
  exists, whether the results look winnable — never asserted as a rank number.
- Every term maps to exactly one page, and no page collects two terms that would
  compete with each other.
- The cut list is in the report. What you rejected is as useful as what you kept.

## The output contract

These apply to the file you write, not just the reply you send.

- Never state a score, rating or grade you did not measure. Report the values you actually observed instead — they are more useful and they are true.
- Open with a summary table — a row per page, item or finding — so the shape of the result is readable before the detail.
