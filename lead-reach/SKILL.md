---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: lead-reach
version: 0.4.0
publisher: localoy
capabilities: [files, browser]
# localoy dialect: stages make this runnable on small local models. The user
# sees every message before any is sent and says yes once for the whole
# queue, or lead by lead (owner, 2026-10-07: a yes per person was annoying).
stages:
  - id: queue
    goal: >
      Read PLAN-{slug}.md's "## Drafts" and its Cadence (sends a day,
      follow-up spacing); queue no more than that day's sends. For each draft with "Status: draft"
      and an observed channel, take the channel, its evidence URL and the
      draft text exactly as written. Drop every lead whose row in ANY
      leads-*.csv already has a Reached date, or whose channel value appears
      in any Reached Channel — a lead is contacted once. Drop leads under
      "No observed channel". Write the queue, one block per lead (company,
      channel type, channel value, evidence URL, draft), at most 10 leads
      unless the user named another number. Show the user the whole queue,
      each lead with its exact final text, and ask once: send all, one by
      one, or stop. Write the answer at the top of the queue file
      ("Approved: all N, as shown" / "Approved: one by one" / "Stopped").
    produces: .localstack/work/{date}-{slug}/queue.md
  - id: reach
    goal: >
      For each lead in .localstack/work/{date}-{slug}/queue.md, in order: open its channel in
      the browser (the user's own signed-in session) and put the draft in
      exactly as written. With "Approved: all N, as shown", press send — the
      text must be the one shown, word for word; anything different needs
      its own yes. With "Approved: one by one", STOP and ask for this lead:
      send, edit, or skip; press send only on a yes for THIS lead. Leave
      about a minute between sends. After sending, confirm it went by
      reading the page's text (a sent confirmation, the message in the
      thread, "Pending" on the profile, the sent folder) — a screenshot only
      when no text says so. Stop the whole run at a CAPTCHA, a login wall, a rate or
      spam warning, or an account-safety notice. Append one line per lead to
      the stage file: company, channel, status (sent|skipped|failed|blocked),
      time, evidence (the confirmation text, or a screenshot path), note.
    produces: .localstack/work/{date}-{slug}/reach.md
  - id: log
    goal: >
      From .localstack/work/{date}-{slug}/reach.md: on each SENT lead's row
      in leads-{slug}.csv set Reached (YYYY-MM-DD HH:MM) and Reached Channel
      ("<type> <value>"), in place. In PLAN-{slug}.md change that draft's
      "Status: draft" to "Status: sent YYYY-MM-DD" (or "skipped", "failed —
      <what you saw>", "blocked — <why>"). Add to CHANGELOG.md one line per
      lead: company, channel, status, and for sent ones the text exactly as
      sent and the evidence. Add a TODO to watch for each sent lead's reply.
      Tick reach in the PLAN's Steps once no draft is left at Status: draft.
    produces: leads-{slug}.csv
    columns: [Company Name, Location, Website, Decision Maker Name, Title, Profile URL, Evidence URL, Confidence, Verdict, Verdict Reason, Verification URL, Verified Date, Channel, Channel Evidence, Reached, Reached Channel, Exported, Notes]
    values:
      Verdict: [keep, close, cut, UNKNOWN]
description: >-
  Reach the leads you drafted for — shows you every message first, then on one
  yes (or lead by lead, if you prefer) opens each lead's observed channel in
  your own browser and sends the draft. Every send is verified and logged.
  (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [sales, outreach, send, browser, localstack]
    related_skills: [lead-draft, lead-retro, lead-export]
allowed-tools:
  - Bash
  - Read
  - Write
  - AskUserQuestion
triggers:
  - send the outreach
  - reach out to these leads
  - send the drafts
  - contact the leads
tags: [sales, outreach, send, browser]
---

## When to invoke this skill

Sends the outreach `/lead-draft` wrote: one lead at a time, through the
channel that lead was actually observed on, from the user's own browser, and
only after the user has seen that exact message and said yes to it — once for
the whole queue, or lead by lead. Use after
`/lead-draft`, or when asked to "send the outreach", "reach out to these
leads", or "send the drafts".

## A yes for exactly what was shown — the hard boundary

This is the one skill in the stack that sends, so it sends narrowly:

- **Nothing is sent before the user has seen it and said yes.** Show the
  whole queue first — each lead's recipient, channel and exact final text —
  then ask once: **send all**, **one by one**, or **stop**. "Send all" is a
  yes for exactly those messages, word for word, and nothing else: a message
  the user edits, a lead added later, or a text that differs from what was
  shown needs its own yes. "One by one" asks before each send. Silence is not
  a yes. This holds in every mode, including an agent's auto mode: auto skips
  questions about ordinary work, never this one.
- **The app may ask before the first click on a site.** In localoy that is
  the click permission; the user can answer "Allow everything on <site> in
  this chat" so the rest of the queue does not stop again. Say so once,
  before the first send — never answer it for them.
- **Sent one at a time, about a minute apart.** A burst of identical actions
  is what platforms flag; the pace is part of the yes.
- **Only the drafted text, only the observed channel.** The message is the
  draft in the plan's `## Drafts` word for word, unless the user edits it
  here. The
  channel is the one the draft names, with its evidence URL. No guessed
  email addresses, no looked-up profiles, no second channel when the first
  fails.
- **The user's own session, never a new one.** The browser is already signed
  in as the user, or it is not. Never type a password, never create an
  account, never solve a CAPTCHA. A login wall or a CAPTCHA ends the run for
  that channel, reported as `blocked`.
- **Once per lead.** A lead whose row in any `leads-*.csv` has a `Reached`
  date, or whose channel value appears in any `Reached Channel`, is never
  contacted again by this skill, whatever the newer drafts say.
- **A platform's warning is a stop.** A rate limit, a "this looks like spam"
  notice, an account-restriction banner: stop the whole run, log it, tell
  the user. Pushing past one is how an account gets banned.

If the runtime has no browser the agent can drive, say so and stop. Do not
fall back to an email tool, an API, or a script — the channel is the user's
browser or nothing.

## What you read first

- **The topic:** Pick the topic: `ls PLAN-*.md 2>/dev/null`. If the user named a topic, use `PLAN-<topic>.md`. If exactly one PLAN exists, use it. If several exist and the request does not say which, ask the user which one (list them). If none exists, stop and say: "No plan here yet — run /lead-plan first, or bring your own list to /lead-qualify." The topic is the part between `PLAN-` and `.md`; every other file for it uses the same topic: `leads-<topic>.csv`.
- **Drafts (required):** the plan's `## Drafts`, entries with
  `Status: draft`. None → offer `/lead-draft` first. Never send a message
  here that was not drafted there; this skill sends, it does not draft.
- **Everything already reached:** the `Reached` and `Reached Channel` columns
  of every `leads-*.csv` in the folder (not just this topic's) — the
  once-per-lead set.
- **How many:** at most 10 leads per run unless the user names a number.
  Ten careful sends beat forty a platform flags.

**A message the user asks for directly** ("message Shahrin on LinkedIn to say
thanks") still goes through a draft: write it into the plan's `## Drafts`
under the lead-draft rules (observed channel, cited facts checked by
`/fact-check` and worded to their grade, DESIGN.md's tone), show it, then send it with the same one-yes rule below. A person who is
not a row in any lead list is logged in CHANGELOG.md only. With no plan in the
folder at all, skip the plan and the list: CHANGELOG.md and TODOS.md carry the
record.

## How each channel is reached

| Channel in the draft | Open | Put the draft in | Send |
|---|---|---|---|
| email (address read on a page) | the user's webmail compose (for Gmail: `https://mail.google.com/mail/?view=cm&to=<addr>&su=<subject>`) | subject and body fields | the compose Send button |
| contact form / contact page | the form URL from the draft | name, email, message as the form asks — the sender fields are the user's own details, asked once per run | the form's submit button |
| profile (LinkedIn and the like) | the profile URL from the draft | the platform's Message box; if messaging needs a connection, the connection note (trimmed to its limit, told to the user) | Send — for a LinkedIn connection the dialog's own buttons: "Send" after adding the note, or "Send without a note" when the draft has none (not "Add a note") |

A channel the table does not cover: open it, show the user what you see, and
ask how they want it handled before typing anything.

## Procedure

**1. Load** the inputs above.

Scratch for this run lives in `.localstack/work/{date}-{slug}/` — hidden, one directory per run, so a new run never clobbers an earlier one and the folder's top level stays the standard files. Scratch is disposable; old run directories may be deleted freely.

**2. Queue and one yes.** The `queue` stage goal above is the spec:
observed channels only, drafts verbatim, once-per-lead against every lead
list's `Reached` columns, capped. Before asking, check each fact every draft
states about its lead in `facts-<topic>.md`: a fact missing there, or worded
more strongly than its grade, means `/fact-check` and a fixed draft first —
the user approves the text that will really be sent. Then show the whole
queue and ask once — as a structured question where the runtime has one
(Send all N / One by one / Stop), plain text otherwise:

```
<N> messages, <dropped> dropped as already reached.

1. <Company> — <channel type> <channel value>
   <the exact text that will be sent>
2. …

Send all <N>, one by one, or stop?
```

- **Send all:** the yes covers these N messages exactly as shown.
- **One by one:** ask before each send, as in step 3.
- **An edit to any message:** apply it, show that message again, ask again.
- **Stop:** nothing is sent; log the queue as `skipped`.

**3. Reach, one lead at a time.** Open the lead's channel and fill in the
draft. With "send all", press send if the text is exactly what was shown;
with "one by one", first stop and ask (Send / Edit / Skip) with the
recipient, the channel and the exact text. Then:

- **Sent:** confirm it went by reading the page's text — the platform's sent
  confirmation, the message in the thread, "Pending" where the button was,
  or the sent folder — and log that text as the evidence. Take a screenshot
  into `.localstack/work/{date}-{slug}/` only when no text confirms it. No
  confirmation at all → `failed`, with what you saw.

Work the page by its text, not by pictures: read it to find the button,
read it again to confirm. A screenshot after every click is the most
expensive way to look — every later step re-reads it — and a long queue
runs out of room for the turn. Look at a picture only when the text can't
answer.
- **Edit (one by one):** apply the user's change, show the new text, ask again.
- **Skip:** log `skipped` and move to the next lead.

Wait about a minute before the next lead. A CAPTCHA, a login wall, or a rate,
spam or account-safety notice stops the whole run, whatever the yes said.

**4. Record it where every agent will look.**

- `leads-<topic>.csv` — on each sent lead's row, set `Reached`
  (`YYYY-MM-DD HH:MM`) and `Reached Channel` (`<type> <value>`), in place.
- `PLAN-<topic>.md` — each queued draft's `Status:` becomes `sent YYYY-MM-DD`,
  `skipped`, `failed — <what you saw>` or `blocked — <why>`.
- `CHANGELOG.md` — one line per queued lead, e.g.
  `- lead-reach austin-dentists: sent to Jane Doe, Acme Dental (email jane@acme.com) — "<the text exactly as sent>" — evidence: .localstack/work/…/acme.png`.
  Skipped, failed and blocked leads get a line too, with the reason.
- `TODOS.md` — `- [ ] watch for a reply from <person>, <Company> (<topic>)`
  per sent lead; a TODO for each blocked channel.

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **PLAN-<topic>.md** — in `## Steps`, tick `- [x] reach` (add today's date after it) once this step is done; leave it unticked if you stopped partway, and say why in CHANGELOG.md.
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

**5. Remember who was contacted**, so no `/lead-search` in any folder on this
machine finds them again. For each sent lead with a known domain: with
`localbrain` on PATH,

```
localbrain put "lead-<canonical-domain>" --type lead \
  --field domain=<canonical-domain> --field reached=<YYYY-MM-DD> \
  --body "<Company Name> — <canonical domain>. Reached <YYYY-MM-DD> by <channel type> (leads-<topic>.csv). Contact: <Decision Maker Name>, <Title>."
```

Without a shell, if a `.brain/` directory exists, write the same record as
`.brain/put/lead-<canonical-domain>.md` — a frontmatter fence with
`type: lead`, `domain:` and `reached:`, then the body. Neither available →
note it in the CHANGELOG line. A brain error never undoes a send; note it and
move on. A lead with no domain gets no record.

**6. Report and hand off.** In chat: sent, skipped, failed and blocked
counts, and anything that stopped the run. Then offer what comes next — when
replies have had time to come in, "Look back on this round with
`/lead-retro`?" — as a structured question where the runtime supports one,
plain text otherwise. On yes, invoke `/lead-retro` if this runtime can invoke
skills directly (Claude Code: the Skill tool); otherwise tell the user to type
`/lead-retro` (Codex: `$lead-retro`). If the list also has to go to someone
else, mention `/lead-export`.

## Quality bar

- Every `sent` row has evidence a reader can check: the platform's
  confirmation text, or a screenshot path when no text confirmed it.
- Zero sends the user did not see and say yes to (all at once or one by
  one), zero sends of a text that differs from the one shown, zero sends to a channel the draft did
  not name, zero second contacts — any one of these is a failed run, not a
  caveat.
- A run that stopped at a warning and said so beats one that finished.
