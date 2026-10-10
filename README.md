<p align="center">
  <img src=".github/logo.svg" width="128" alt="localstack logo">
</p>

<h1 align="center">localstack</h1>

<p align="center">
  Skills for coding agents: install once, and your agent is ready to do real
  marketing work — SEO and a full sales-development pipeline today, more as
  each skill earns its place.
</p>

<p align="center">
  <a href="https://github.com/localoy-ai/localstack/tags"><img src="https://img.shields.io/badge/version-0.11.0-FFA02E" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-EFE6D9" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/runtimes-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Hermes%20%C2%B7%20localoy-161210" alt="Runtimes">
</p>

---

Each skill is a directory with a `SKILL.md`, installed by symlink into every
agent runtime found on the machine. Updating is `git pull` — the symlinks mean
there is nothing to re-install.

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/localoy-ai/localstack/HEAD/install.sh | bash
```

One command: it clones the repo to `~/localstack` (or updates it) and wires
the skills into every agent runtime found on the machine. Updating later is
`git -C ~/localstack pull` — or just run the command again. Prefer doing the
steps yourself? The equivalent is:

```bash
git clone https://github.com/localoy-ai/localstack.git ~/localstack && ~/localstack/install.sh
```

`--claude`, `--codex`, `--hermes`, or `--all` narrow or force the targets,
and `~/localstack/install.sh --remove` takes the wrappers back out
everywhere, touching nothing else. **localoy users install nothing** — the
daemon ships this suite as its built-in catalog and keeps it synced from
this repo.

| Runtime | Where skills land | How you invoke them |
|---|---|---|
| Claude Code | `~/.claude/skills/<name>/` | type `/<name>` |
| Codex | `~/.codex/skills/<name>/` | pick from `/skills`, or `$<name>` inline |
| Hermes | `~/.hermes/skills/localstack/<name>/` | `/reload-skills` once, then `/<name>` |
| localoy | nothing to install | catalog syncs from this repo |

## Skills

| Skill | What it does |
|---|---|
| `/localstack` | The router: sends any sales or SEO request to the right skill and pipeline stage. |
| `/lead-plan` | Writes the plan, `PLAN-<topic>.md` — what we sell, who buys, territory, disqualifiers — and the checklist every later step ticks. |
| `/lead-search` | Finds leads on the open web only — companies and decision makers, every row carrying the URL it came from and an honest confidence — into `leads-<topic>.csv`. No accounts, no logins, no paid data. |
| `/lead-qualify` | Check & fill: takes the list, or a file you bring, re-checks each row against the open web, fills the gaps it can observe (website, decision maker, contact channel), and keeps or cuts with a reason — never a score. |
| `/lead-draft` | Drafts outreach for the kept rows — drafts only. Channels and personalization come only from pages actually observed. |
| `/lead-reach` | Sends the drafts from your own browser: shows you every message first, then on one yes (or lead by lead) opens each observed channel, fills in the draft and sends it, a minute apart. Every send verified and logged; no lead contacted twice. |
| `/lead-export` | Optional hand-off: exports the kept rows for a client, a team or a CRM, never a lead already contacted or exported, and marks them on the list. |
| `/lead-retro` | Looks back on the round: the funnel with counts read from the files, what got rows cut, and what to change next time. |
| `/seo-audit` | Crawls up to 30 of a site's important pages and reports what is actually on them — titles, metas, headings, internal links, canonicals, markup flags — as a prioritized fix list. |
| `/keyword-research` | Decides what a site should target: the terms its buyers actually use, grouped by intent, each mapped to the page that should own it. No invented volumes or difficulty scores. |
| `/on-page-optimizer` | Rewrites one page against one target term — current and proposed values side by side, so a human approves each change. Produces a proposal, never an edit. |
| `/vinci` | Paints or designs anything in the Vinci editor (localoy.ai/vinci) the way a master would: researches the artist's method, plans one layer per stage, writes every stroke, replays it and exports at up to 16×. |
| `/support-reply` | Mochi · Drafts replies to customer messages from the business's rules, FAQ and past replies — never promising what isn't approved; sends one yes at a time from your browser, else drafts. |
| `/support-faq` | Mochi · Turns questions asked three or more times into FAQ.md entries, each citing the messages it came from. |
| `/market-research` | Umbra · Agrees the decision first, reads real sources, separates what's true (with URLs) from what's guessed, ends with what it means. |
| `/fact-check` | Umbra · Checks any claim on the web — news, numbers, quotes, people, companies: finds the evidence (primary sources first), grades each claim Confirmed / Reported / Unverified / Contradicted with a confidence level and why, and rewrites any text to say no more than that. |
| `/competitor-watch` | Umbra · A sourced side-by-side of named competitors — offer, price, positioning, recent changes; reruns show what changed. |
| `/social-plan` | Fizz · A week of posts per channel as a calendar in `PLAN-<topic>.md`. Plans only. |
| `/social-post` | Fizz · Writes each caption, asks Nova (`/vinci`) for pictures, posts one yes at a time through your signed-in browser — never signs in. |
| `/reconcile` | Zorp · Matches invoices, payments and exports in your CSV/XLSX files: totals, duplicates, missing, line by line. Never guesses a number. |
| `/money-report` | Zorp · A monthly summary — in, out, outstanding, notable changes — with every number from your files. |
| `/inbox-triage` | Bloop · Sorts waiting messages into needs you / can wait / done and drafts replies; never sends, archives or deletes without a yes. |
| `/file-tidy` | Bloop · Proposes names and folders, shows the plan, moves only after a yes, logs every move in CHANGELOG.md, never deletes. |
| `/routine-setup` | Grit · Turns a repeated task into a schedule: steps written, one run with you, then scheduled with a run log. |
| `/routine-report` | Grit · Weekly "what ran, what changed, what broke" from the run logs; messages you only when something changed or failed. |
| `/site-check` | Blip · Checks a site's pages, links, forms and observable speed signals; a prioritised fix list. Never submits a form. |
| `/site-fix` | Blip · Reproduces a bug, fixes the smallest thing, tests twice in the browser, reports what broke and why; asks before touching production. |
| `/video-brief` | Starts a video, series or podcast: what it's for, who watches, where it goes, length, size, feel and what good means, as `PLAN-<topic>.md` with the job's phases. |
| `/video-story` | Writes the story from the brief: the hook, the beats, numbered scenes with timings and every spoken line, in `script-<topic>.md`, from options you pick. |
| `/video-cast` | Fixes the look and the cast: 2–3 style frames to pick from, a style sheet every picture follows, and a reference picture per character so faces stay the same in every scene and episode. |
| `/video-shots` | Plans every shot like a director and cinematographer — size, angle, camera move, framing, who, how long — with test frames you approve before the scenes are made. |
| `/video-sound` | Casts the voices from samples you hear, directs every line, picks the music from two options, lists the sound effects, then records the script. |
| `/video-edit` | Cuts the video in VertX from the approved plan: scenes in the picked style and cast, synced to the voice, paced like an editor, frames checked as it goes. |
| `/video-finish` | Captions, titles and the end card, a frame-by-frame check against the brief (Bangla letters included), then the export, ready to post on your yes. |
| `/podcast-plan` | Plans a podcast show once (premise, format, hosts, sound identity) and each episode's outline with timed segments, from two directions you pick. |
| `/podcast-make` | Makes the episode in VertX: voices recorded or brought in, theme and stings, speech edited and levelled, audio exported, with show notes, chapters, and optional video and clips. |
| `/video-craft` | The studio's craft library, read when a phase needs it: story, styles, characters, cinematography, directing, choreography, production design, sound, editing, finishing, podcast, platforms, rights. |

## The sales pipeline

Each skill feeds into the next, through the topic's plan and lead list:

```
plan  →  find leads  ─┐
         or bring     ├→  check & fill  →  draft  →  reach  →  retro
         your file  ──┘   (qualify +          (you see each
                          fill gaps)           message; one yes)

                          export — only when you hand the list to someone else
```

Nothing falls through the cracks because every step knows what came before it.

```
Plan     /lead-plan   → PLAN-<topic>.md (brief + ## Steps checklist)
Find     /lead-search      → leads-<topic>.csv rows (or bring your own file to /lead-qualify)
Check    /lead-qualify     → Verdict + Channel columns filled, ## Qualify in the plan
Draft    /lead-draft       → ## Drafts in the plan
Reach    /lead-reach       → Reached columns + CHANGELOG.md lines
Reflect  /lead-retro      → ## Retro in the plan, DESIGN.md, TODOS.md
Export   /lead-export      → optional: an export file + Exported column
```

### How files are kept

The chain needs no infrastructure, and nothing hides in private folders. A
working folder holds the files any agent already knows to read, so the next
person or agent to open it — Claude Code, Codex, Cursor, a teammate — can see
what is going on and pick up the work:

| File | Holds |
|---|---|
| `AGENTS.md` | What the folder is for, the rules, a map of the files, each topic's next step. localstack edits only its own marked block. |
| `PLAN-<topic>.md` | One per topic: the brief, the `## Steps` checklist, `## Drafts`, dated `## Qualify` / `## Shipped` / `## Retro` sections |
| `leads-<topic>.csv` | One living lead list per topic; each step fills its own columns on the same rows |
| `TODOS.md` | Open next actions from every skill |
| `CHANGELOG.md` | A dated log of what ran and every message sent |
| `DESIGN.md` | Lasting decisions: positioning, tone, channels |
| `seo-audit-<site>.md`, `keywords-<site>.md`, `onpage-<page>.md` | SEO reports |
| `.localstack/work/` | Hidden scratch, one directory per run |

A **topic** is one piece of sales work, named by a short slug such as
`austin-dentists`. Files are updated in place; `CHANGELOG.md` and git keep the
history. Every stage runs standalone too — the next step is the first unticked
one in the plan's `## Steps`, and a skill whose input is missing offers to run
the one before it, never fabricates one. "Run the whole pipeline" is just
starting at `/lead-plan` and saying yes.

<!-- legacy-layout -->
A folder from before v0.9.0 (`briefs/`, `leads/`, `reviews/` …) is moved over
by `/localstack`, once, after asking; the old folders are left in place.
<!-- /legacy-layout -->

## Principles

Every skill holds the same line, learned the expensive way in earlier projects:

- **Say only what you observed.** Every claim names the URL and the value
  actually seen. No invented scores, volumes, firmographics, or contact data —
  where a number would normally go, the honest output names the check that
  could not be run.
- **Search engines are the universal adapter.** Gated sites (LinkedIn,
  Crunchbase, directories) are read through what public search results say
  about them, never fetched, never logged into.
- **Provenance on every row.** `UNKNOWN` for the unobserved, an evidence URL,
  an honest confidence. It is what makes checking — by a human or a later
  skill — possible at all.
- **Partial work is reported as partial.** A subset is never described as the
  whole, and what was cut ships alongside what was kept.
- **Nothing sends without your yes.** `/lead-draft` only writes drafts.
  `/lead-reach` sends them from your own signed-in browser after you have seen
  every message and said yes — once for the whole list, or one by one. It
  sends one at a time, a minute apart, never a lead twice, and a platform's
  spam or rate warning stops the run.

## One suite, several runtimes

These skills run anywhere a `SKILL.md` runs. Each file's frontmatter is a
superset of four dialects, and each runtime ignores the other's keys:
`allowed-tools` and `triggers` are read by Claude Code; `name`/`description`
drive Codex's `/skills` picker and `$name` invocation; `author`, `license`,
`platforms` and `metadata.hermes` are read by Hermes; `publisher`,
`capabilities` and `stages` are read by the localoy daemon, whose catalog
syncs from this repo. Skill bodies are written runtime-agnostically — chain
discovery is a plain filename sort (`ls | sort -rV`), and handoffs say what to
type when the runtime cannot invoke skills directly. Three rules keep this
working:

- **A content change needs a version bump.** localoy pins installs by
  `@publisher/name@version` digest — same version with new content is refused.
- **`stacks/` holds charters, not skills.** A `STACK.md` there becomes an
  agent role (persona + skill set) in localoy; the other runtimes and
  `install.sh` ignore the directory entirely.
- **`SKILL.md` is generated — edit `SKILL.md.tmpl`.** Shared idioms (input
  discovery, collision suffixes, per-run scratch, prior-run surfacing) live
  once in `scripts/resolvers.ts` as `{{PLACEHOLDER}}`s; `scripts/build.sh`
  regenerates every `SKILL.md`, and `install.sh` refuses to install a stale
  one (`scripts/build.sh --dry-run` is the freshness check).

## Curate your own stack

A stack is just a repo shaped like this one: skill folders, each with a
`SKILL.md` (generated from its `SKILL.md.tmpl`), and this `install.sh` at
the root. Fork it, keep the skills you
want, add your own — installing your fork beside this repo works, because the
installer only ever touches wrappers that point back into its own checkout.

## Roadmap

The sales pipeline is now end to end: brief → search → qualify → draft →
ship → retro. Next up: feeding user-reported outcomes (replies, meetings)
back into qualification, and richer SEO chaining between audit, keywords, and
page rewrites. Enabling multiple stacks side by side is the intended shape —
install each repo, and its skills land together in every runtime. Drafts
exist now; the send stays human.

## Contributing

Issues and pull requests are welcome. Two things to know before opening one:
skills hold the evidence line described in Principles — a change that invents
data where a check could not run will be declined — and `SKILL.md` files are
generated, so edit the `SKILL.md.tmpl` beside them and run `scripts/build.sh`.

## License

[MIT](LICENSE)
