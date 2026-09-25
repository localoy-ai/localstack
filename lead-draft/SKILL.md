---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: lead-draft
version: 0.5.0
publisher: localoy
capabilities: [files, web]
# localoy dialect: stages make this runnable on small local models. Each stage
# is its own turn with its own budget and a file that survives it. Claude Code
# ignores this key and runs the Procedure below in one pass.
stages:
  - id: channels
    goal: >
      Read leads-{slug}.csv, Verdict=keep rows only (if no row has a Verdict
      yet, use all rows with a stated warning), skipping rows that already
      have a draft under PLAN-{slug}.md's "## Drafts" and rows already
      reached or exported (a Reached or Exported value). A row whose Channel
      column is filled (by /lead-qualify, or user-supplied) uses that
      channel and its Channel Evidence as-is. For each other row, find the
      OBSERVED outreach channel: a contact page URL read from a fetched page
      or search result, an email address actually read on a page you fetched
      (cite that page), a contact-form URL, or a Profile URL already present
      in the row. Never construct an email or profile URL — a guessed
      first@domain.com is fabrication. A row with nothing observed gets
      "UNKNOWN — no observed channel" and will receive no draft. Budget: at
      most one page fetch per row. Record one line per row: company, channel
      type, channel value, evidence URL.
    produces: .localstack/work/{date}-{slug}/channels.md
  - id: draft
    goal: >
      Read PLAN-{slug}.md for what we sell (ask the user if it says
      UNKNOWN) and DESIGN.md, if present, for tone and channels to use or
      avoid. For each row in .localstack/work/{date}-{slug}/channels.md with an observed channel,
      write one short draft personalized ONLY from facts observed this
      session or recorded in the chain files, each fact cited with its URL.
      No invented pain points, no "I noticed you..." claims without a page
      that shows it. Append each draft under a heading per company.
    produces: .localstack/work/{date}-{slug}/drafts.md
  - id: package
    goal: >
      Add the drafts to PLAN-{slug}.md under "## Drafts" (create the section
      after Steps if missing; keep every draft already there): per lead a
      "### <Company> — <Decision maker>" heading, "Status: draft", channel +
      evidence URL, the personalization facts with their URLs, then the
      draft. Under "### No observed channel" list the leads that got none.
      The section starts with: drafts only — /lead-reach sends each one after
      the user says yes to it. Then add today's line to CHANGELOG.md, one
      TODO per no-channel lead, and tick draft in the PLAN's Steps.
    produces: PLAN-{slug}.md
description: >-
  Draft outreach for qualified leads — drafts only, sent later one yes at a
  time by /lead-reach; channels and personalization come only from pages
  actually observed. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [sales, outreach, drafts, localstack]
    related_skills: [lead-qualify, lead-reach, lead-export]
allowed-tools:
  - Bash
  - Read
  - Write
  - WebSearch
  - WebFetch
  - AskUserQuestion
triggers:
  - draft outreach
  - write cold emails
  - draft messages to these leads
  - outreach for the list
tags: [sales, outreach, drafts, cold-email]
---

## When to invoke this skill

Writes outreach drafts for the qualified rows of a lead list — one draft per
lead that has an actually observed channel, personalized only from cited
observations. Use after `/lead-qualify`, or when asked to "draft outreach" or
"write cold emails". The drafts go into the topic's plan, `PLAN-<topic>.md`,
under `## Drafts`, where the user reviews them; `/lead-reach` sends from
there, one message at a time, each after the user's yes.

## Never sends — the hard boundary

This skill NEVER sends anything: no email tool, no form submission, no
connection request, no API call that delivers a message. Drafts go into the plan;
sending is `/lead-reach`'s job, and it asks the user before every message. It also never invents a
channel: no guessed email patterns (`first@domain.com` is fabrication), no
constructed profile URLs, no "probably reachable at". **A lead with no
observed channel gets no draft** — that lead is listed as a finding instead.
This skill has no send path; the draft it writes is exactly what
`/lead-reach` will show the user before sending, so write it ready to go.

## What you read first

- **The topic:** Pick the topic: `ls PLAN-*.md 2>/dev/null`. If the user named a topic, use `PLAN-<topic>.md`. If exactly one PLAN exists, use it. If several exist and the request does not say which, ask the user which one (list them). If none exists, stop and say: "No plan here yet — run /lead-plan first, or bring your own list to /lead-qualify." The topic is the part between `PLAN-` and `.md`; every other file for it uses the same topic: `leads-<topic>.csv`.
- **Qualified rows (preferred):** `leads-<topic>.csv`, `Verdict=keep` rows
  only, minus any row with a `Reached` or `Exported` value. Their `Channel`
  and `Channel Evidence`, when filled, are the channel to draft for. If no row has a Verdict yet → all rows, with an explicit warning
  ("unqualified list — drafts may target rows /lead-qualify would have
  cut"), after offering to run `/lead-qualify` first. No list → ask for a
  path or pasted rows. Never fabricate.
- **Drafts already written:** the plan's `## Drafts` section. A lead that
  already has a draft is skipped unless the user asks to redo it.
- **The plan (for the value proposition):** `## What we sell` and
  `## Who buys (ICP)`. UNKNOWN there → ask what they sell and the one-line
  value proposition, in the same single message as anything else you need.
- **DESIGN.md**, if present — tone, and channels to use or avoid. It wins
  over your defaults.

## Ground rules (non-negotiable)

1. **Observed channels only.** A channel is an email read on a fetched page
   (cited), a contact page or form URL surfaced by search or fetch, or a
   Profile URL already in the row. Nothing else qualifies.
2. **Personalization is citation.** Every personalized claim in a draft
   ("your site's pricing page", "your post about X") names the URL it was
   read from. A draft that cannot cite its hook does not use that hook.
3. **The plan's offer, the evidence's facts.** What we offer comes from the
   plan, DESIGN.md or the user; what we know about the lead comes from
   observations. The two never blur.
4. **Budget: one fetch per lead** while hunting channels, and only where
   search snippets left it ambiguous. Gated sites stay gated — searched
   about, never fetched, never logged into.
5. **Partial is labeled.** Rows skipped for missing channels are a named
   list, not a silent omission.

## Procedure

**1. Load** the inputs above; note fallbacks in the output.

Scratch for this run lives in `.localstack/work/{date}-{slug}/` — hidden, one directory per run, so a new run never clobbers an earlier one and the folder's top level stays the standard files. Scratch is disposable; old run directories may be deleted freely.

**2. Find channels** per kept row — reuse `Channel` when `/lead-qualify`
already filled it (the `channels` stage goal above is the
spec: observed only, one fetch max, UNKNOWN is an answer).

**3. Draft** one message per lead-with-channel: short, specific, the cited
hook first, the plan's value proposition once, one clear ask, in DESIGN.md's
tone when it sets one. No template
smell — but personalization is only as deep as the evidence goes.

**4. Add them to the plan.** In `PLAN-<topic>.md`, under `## Drafts` (create
it right after `## Steps` if missing; never remove a draft already there),
starting with the line **drafts only — `/lead-reach` sends each one after your
yes.** Per lead:

```
### <Company> — <Decision maker or UNKNOWN>
Status: draft
- Channel: <email|form|contact page|profile> <value> — evidence: <URL>
- Personalization facts: <fact — URL>; <fact — URL>

<subject + body, or message text>
```

`/lead-reach` changes `Status: draft` to `Status: sent YYYY-MM-DD` when it
sends one. Then, at the end of the section, `### No observed channel` —
company + what was tried.

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **PLAN-<topic>.md** — in `## Steps`, tick `- [x] draft` (add today's date after it) once this step is done; leave it unticked if you stopped partway, and say why in CHANGELOG.md.
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

For this step: the CHANGELOG line gives drafted / no-channel counts; add one
TODO per no-channel lead (`- [ ] find a channel for <Company> (<topic>)`) and
`- [ ] review N drafts, then /lead-reach (<topic>)`.

**5. Report and hand off.** In chat: drafted count, no-channel count, any
fallback warnings. Then offer the next stage — "Send them with
`/lead-reach`? It asks you before each message." — as a structured question
where the runtime supports one, plain text otherwise; if the user would
rather send from their own tools, or hand the list to someone else, offer
`/lead-export` instead. On yes, invoke
the skill if this runtime can invoke skills directly (Claude Code: the Skill
tool); otherwise tell the user to type it (Codex: `$lead-reach`).

## Quality bar

- Zero sends, zero invented channels, zero uncited personalization — any one
  of these is a failed run, not a caveat.
- A reader can open every URL in the file and see what the draft claims.
- Ten drafts a human would actually send beat forty that smell generated.
