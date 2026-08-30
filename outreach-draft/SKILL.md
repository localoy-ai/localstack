---
name: outreach-draft
version: 0.1.0
publisher: localoy
capabilities: [files, web]
# localoy dialect: stages make this runnable on small local models. Each stage
# is its own turn with its own budget and a file that survives it. Claude Code
# ignores this key and runs the Procedure below in one pass.
stages:
  - id: channels
    goal: >
      Read the newest reviews/*.csv (Verdict=keep rows only; fall back to the
      newest leads/*.csv with a stated warning). For each row, find the
      OBSERVED outreach channel: a contact page URL read from a fetched page
      or search result, an email address actually read on a page you fetched
      (cite that page), a contact-form URL, or a Profile URL already present
      in the row. Never construct an email or profile URL — a guessed
      first@domain.com is fabrication. A row with nothing observed gets
      "UNKNOWN — no observed channel" and will receive no draft. Budget: at
      most one page fetch per row. Record one line per row: company, channel
      type, channel value, evidence URL.
    produces: work/channels.md
  - id: draft
    goal: >
      Read the newest briefs/*.md for what we sell (ask the user if there is
      no brief). For each row in work/channels.md with an observed channel,
      write one short draft personalized ONLY from facts observed this
      session or recorded in the chain files, each fact cited with its URL.
      No invented pain points, no "I noticed you..." claims without a page
      that shows it. Append each draft under a heading per company.
    produces: work/drafts.md
  - id: package
    goal: >
      Assemble outreach/{date}-{slug}.md: per lead — channel + evidence URL,
      the personalization facts with their URLs, then the draft. End with a
      "Leads with no observed channel" list and the Chain status block.
      State plainly at the top: drafts only, a human sends every one.
    produces: outreach/{date}-{slug}.md
description: Draft outreach for qualified leads — drafts only, a human sends every one; channels and personalization come only from pages actually observed. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [sales, outreach, drafts, localstack]
    related_skills: [lead-qualify, lead-ship]
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
"write cold emails". The output is a file a human reviews and sends from
their own tools.

## Never sends — the hard boundary

This skill NEVER sends anything: no email tool, no form submission, no
connection request, no API call that delivers a message. Drafts go to a file;
the send is a human decision made outside this skill. It also never invents a
channel: no guessed email patterns (`first@domain.com` is fabrication), no
constructed profile URLs, no "probably reachable at". **A lead with no
observed channel gets no draft** — that lead is listed as a finding instead.
This skill has no send path and refuses to acquire one.

## What you read first

- **Qualified list (preferred):** `ls -t reviews/*.csv 2>/dev/null | head -1`,
  `Verdict=keep` rows only. Missing → the newest `leads/*.csv` with an
  explicit warning ("unqualified list — drafts may target rows /lead-qualify
  would have cut"), after offering to run `/lead-qualify` first. Neither →
  ask for a path or pasted rows. Never fabricate.
- **The brief (for the value proposition):** `ls -t briefs/*.md 2>/dev/null | head -1`.
  Missing → ask what they sell and what the one-line value proposition is, in
  the same single message as anything else you need.

## Ground rules (non-negotiable)

1. **Observed channels only.** A channel is an email read on a fetched page
   (cited), a contact page or form URL surfaced by search or fetch, or a
   Profile URL already in the row. Nothing else qualifies.
2. **Personalization is citation.** Every personalized claim in a draft
   ("your site's pricing page", "your post about X") names the URL it was
   read from. A draft that cannot cite its hook does not use that hook.
3. **The brief's voice, the evidence's facts.** What we offer comes from the
   brief or the user; what we know about the lead comes from observations.
   The two never blur.
4. **Budget: one fetch per lead** while hunting channels, and only where
   search snippets left it ambiguous. Gated sites stay gated — searched
   about, never fetched, never logged into.
5. **Partial is labeled.** Rows skipped for missing channels are a named
   list, not a silent omission.

## Procedure

**1. Load** the inputs above; note fallbacks in the output.

**2. Find channels** per kept row (the `channels` stage goal above is the
spec: observed only, one fetch max, UNKNOWN is an answer).

**3. Draft** one message per lead-with-channel: short, specific, the cited
hook first, the brief's value proposition once, one clear ask. No template
smell — but personalization is only as deep as the evidence goes.

**4. Package.** `outreach/{YYYY-MM-DD}-{slug}.md`, stating at the top:
**drafts only — a human sends every one.** Per lead:

```
## <Company> — <Decision maker or UNKNOWN>
- Channel: <email|form|contact page|profile> <value> — evidence: <URL>
- Personalization facts: <fact — URL>; <fact — URL>
### Draft
<subject + body, or message text>
```

Then `## Leads with no observed channel` (company + what was tried), and:

```
## Chain status
- stage: draft
- source-artifact: <reviews or leads CSV consumed>
- status: DONE | PARTIAL
- drafted: N / no-channel: M
- unresolved: (list or NONE)
```

**5. Report and hand off.** In chat: drafted count, no-channel count, any
fallback warnings. Then offer the next stage — "Package the final list with
`/lead-ship`?" — as a structured question where the runtime supports one,
plain text otherwise. On yes, invoke `/lead-ship` if this runtime can invoke
skills directly (Claude Code: the Skill tool); otherwise tell the user to
type `/lead-ship` (Codex: `$lead-ship`).

## Quality bar

- Zero sends, zero invented channels, zero uncited personalization — any one
  of these is a failed run, not a caveat.
- A reader can open every URL in the file and see what the draft claims.
- Ten drafts a human would actually send beat forty that smell generated.
