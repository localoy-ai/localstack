<!-- GENERATED from sections/report.md.tmpl — edit the .tmpl, then run scripts/build.sh. -->
# Report: dedupe, the list, and the gist

**Dedupe by canonical domain.** Strip `www.`, lowercase, one row per domain.
Two names on one domain are one company; the same company found by two angles
keeps the stronger evidence. Then skip, and log, any candidate whose domain:

- is already a row in `leads-<topic>.csv` — "skipped: already listed";
- has a `Reached` or `Exported` value in any `leads-*.csv` in this folder
  (contacted, or handed to someone, on any topic) — "skipped: already
  contacted in leads-<other>.csv" / "skipped: already exported".

**The brain widens the dedupe set beyond this folder.** Read the lead
memory ONCE, through whichever door this runtime has: the `localbrain` CLI
on PATH (`localbrain list --type lead`), or — when you cannot run commands —
the `.brain/context.md` file in the workspace (localoy writes it before every
turn). Skip any candidate whose canonical domain appears in a record name
(`lead-<domain>`), logged as "skipped: in the brain — <record name>". This
catches leads contacted or exported from OTHER folders and machines that the lists here
cannot see. Neither door available → skip silently; the file checks above
still stand. Never let a brain error kill the report — note it and
continue.

**Write the list.** One living list per topic: `leads-<topic>.csv`. Create it
if missing, with this header exactly:

`Company Name,Location,Website,Decision Maker Name,Title,Profile URL,Evidence URL,Confidence,Verdict,Verdict Reason,Verification URL,Verified Date,Channel,Channel Evidence,Reached,Reached Channel,Exported,Notes`

Append one row per new lead, as resolved — not held back for a final flourish.
Fill the first eight columns; leave `Verdict` through `Notes` empty — later
steps fill them in place on the same row. `Confidence` is
`verified` (two independent observations), `likely` (one solid observation),
or `unconfirmed` (snippet only). Every row's `Evidence URL` is a page or
search that a reader could open to check the row. Never rewrite or reorder
existing rows, and never add a second list for the same topic. The file holds
rows only — no commentary.

**Standard files.** This folder is kept in files any agent already reads. Update them in place; never scatter output into new folders.
- **AGENTS.md** — create it if missing. localstack owns only the block between `<!-- localstack:start -->` and `<!-- localstack:end -->`; rewrite that block, never anything outside it. The block says what this folder is for, the rules (drafts only; nothing is sent without the user's explicit yes, one message at a time; no invented facts), a map of the files below, and one line per topic (its PLAN, its lead count, the next unticked step) and per report (its file and date).
- **PLAN-<topic>.md** — in `## Steps`, tick `- [x] search` (add today's date after it) once this step is done; leave it unticked if you stopped partway, and say why in CHANGELOG.md.
- **CHANGELOG.md** — create it if missing (`# Changelog`). Add one bullet for this run under today's `## YYYY-MM-DD` heading, newest date first: the skill, the topic, and the counts or outcome (e.g. `- lead-search austin-dentists: 18 found, 3 skipped as already contacted`).
- **TODOS.md** — create it if missing (`# TODOs`). Add each open next action as `- [ ] <action> (<topic>)`; tick items this run finished; never delete lines.
- **DESIGN.md** — decisions meant to last (positioning, tone, channels to use or avoid). Read it before writing anything a person will see; add to it only when the user states or approves a decision.

For this step: the CHANGELOG line gives found / added / skipped counts; add a
TODO `- [ ] qualify N new leads (<topic>)`.

**Report in chat.** How many leads were added, the angles that worked, what
you skipped and why, what you could not check — and which plan you used
(`PLAN-<topic>.md`, or "no plan"). The skip list matters: a candidate dropped
for cause (aggregator-only presence, wrong territory, dead domain, already
contacted) is information the next run needs. Keep the gist short; the file is
the deliverable.
