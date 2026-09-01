# localstack

Skills for coding agents: install once, and your agent is ready to do real
marketing work — SEO and a full sales-development pipeline today, more as each
skill earns its place.

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
| `/prospect-brief` | Writes the prospecting brief — what we sell, who buys, territory, disqualifiers — that `/lead-search` reads as its input. |
| `/lead-search` | Builds a lead list from the open web only — companies and decision makers, every row carrying the URL it came from and an honest confidence. No accounts, no logins, no paid data. |
| `/lead-qualify` | Re-checks the list row by row against the open web: keep or cut, a reason, fresh evidence — never a score. Cut rows ship in the file too. |
| `/outreach-draft` | Drafts outreach for the kept rows — drafts only, a human sends every one. Channels and personalization come only from pages actually observed. |
| `/lead-ship` | Packages the final list: kept rows, deduped against every previously shipped list, with a provenance summary naming the whole chain. |
| `/sales-retro` | Retros the cycle: the funnel with counts read from the files, what got rows cut, and what to change in the next brief. |
| `/seo-audit` | Crawls up to 30 of a site's important pages and reports what is actually on them — titles, metas, headings, internal links, canonicals, markup flags — as a prioritized fix list. |
| `/keyword-research` | Decides what a site should target: the terms its buyers actually use, grouped by intent, each mapped to the page that should own it. No invented volumes or difficulty scores. |
| `/on-page-optimizer` | Rewrites one page against one target term — current and proposed values side by side, so a human approves each change. Produces a proposal, never an edit. |

## The sales pipeline

Each skill feeds into the next. `/prospect-brief` writes a brief that
`/lead-search` reads. `/lead-search` writes a list that `/lead-qualify`
verifies. `/lead-qualify`'s kept rows are what `/outreach-draft` drafts for
and `/lead-ship` packages, deduped against every earlier shipment.
`/sales-retro` reads the whole cycle and its findings feed the next brief.
Nothing falls through the cracks because every step knows what came before it.

```
Plan     /prospect-brief   → briefs/{date}-{slug}.md
Build    /lead-search      → leads/{date}-{slug}.csv
Review   /lead-qualify     → reviews/{date}-{slug}.csv + .md
Draft    /outreach-draft   → outreach/{date}-{slug}.md
Ship     /lead-ship        → shipped/{date}-{slug}.csv + -summary.md
Reflect  /sales-retro      → retros/{date}-{slug}.md
```

The chain needs no infrastructure: artifacts are plain files in the working
directory, one directory per stage, and each skill finds its input as the
newest file in the previous stage's directory — "newest" meaning the `{date}`
filename prefix (`ls <dir>/* | sort -rV | head -1` — version
sort ranks a `-2` rerun above its base file), never mtime. Runs never
overwrite each other: scratch lives in `work/{date}-{slug}/`, one directory
per run, and a same-day collision on a final artifact takes a `-2`, `-3`…
suffix instead of clobbering the earlier file. Every stage runs standalone
too — a skill whose input is missing offers to run the upstream skill, or
takes a file path, and never fabricates one. Each stage ends by offering the
next, so "run the whole pipeline" is just starting at `/prospect-brief` and
saying yes.

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
- **Nothing here sends anything on your behalf.** `/outreach-draft` writes
  drafts; the send is a human decision made in the human's own tools, every
  time.

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
