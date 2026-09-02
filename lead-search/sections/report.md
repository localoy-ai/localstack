<!-- GENERATED from sections/report.md.tmpl — edit the .tmpl, then run scripts/build.sh. -->
# Report: dedupe, the CSV, and the gist

**Dedupe by canonical domain.** Strip `www.`, lowercase, one row per domain.
Two names on one domain are one company; the same company found by two angles
keeps the stronger evidence. A domain present in any prior `shipped/*.csv`
is cut here, logged with the shipped file it first appeared in.

**The brain widens the dedupe set beyond this repo.** If the `localbrain` CLI
is on PATH (`command -v localbrain`), read the shipped memory ONCE —
`localbrain list --type lead` — and cut any candidate whose canonical domain
appears in a record name (`lead-<domain>`), logged as "cut: in the brain —
<record name>". This catches leads shipped from OTHER repos and machines that
`shipped/*.csv` cannot see. No CLI on PATH → skip silently; the file scan
above still stands. Never let a brain error kill the report — note it and
continue.

**Write the list.** `leads/{YYYY-MM-DD}-{slug}.csv` in the project, header
exactly:

```
Company Name,Location,Website,Decision Maker Name,Title,Profile URL,Evidence URL,Confidence
```

One row per lead, appended as resolved — not held back for a final flourish.
`Confidence` is `verified` (two independent observations), `likely` (one solid
observation), or `unconfirmed` (snippet only). Every row's `Evidence URL` is a
page or search that a reader could open to check the row. After the rows, no
commentary — the file is data.
Never overwrite an existing artifact: if `leads/{date}-{slug}.csv` already exists, append a sequence suffix before the extension — `leads/{date}-{slug}-2.csv`, then `-3`… (count the existing matches and add one).

**Report in chat.** How many leads, the angles that worked, what you cut and
why, what you could not check — and which brief you consumed (`briefs/...` by
path, or "no brief"). The cut list matters: a candidate dropped for cause
(aggregator-only presence, wrong territory, dead domain) is information the
next run needs. Keep the gist short; the file is the deliverable.
