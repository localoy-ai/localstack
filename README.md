# localstack

Skills for Claude Code: install once, and your agent is ready to do real
marketing work — SEO today, sales prospecting today, more as each skill earns
its place.

Each skill is a directory with a `SKILL.md`, installed by symlink into
`~/.claude/skills`. Updating is `git pull` — the symlinks mean there is
nothing to re-install.

## Install

```bash
git clone https://github.com/localoy-ai/localstack.git ~/localstack && ~/localstack/install.sh
```

That's it. Open Claude Code anywhere and the skills are available.
`~/localstack/install.sh --remove` takes the wrappers back out and touches
nothing else.

## Skills

| Skill | What it does |
|---|---|
| `/lead-search` | Builds a lead list from the open web only — companies and decision makers, every row carrying the URL it came from and an honest confidence. No accounts, no logins, no paid data, no outreach. |
| `/seo-audit` | Crawls up to 30 of a site's important pages and reports what is actually on them — titles, metas, headings, internal links, canonicals, markup flags — as a prioritized fix list. |
| `/keyword-research` | Decides what a site should target: the terms its buyers actually use, grouped by intent, each mapped to the page that should own it. No invented volumes or difficulty scores. |
| `/on-page-optimizer` | Rewrites one page against one target term — current and proposed values side by side, so a human approves each change. Produces a proposal, never an edit. |

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

## One suite, several runtimes

These skills run anywhere a `SKILL.md` runs. Each file's frontmatter is a
two-dialect superset: `allowed-tools` and `triggers` are read by Claude Code;
`publisher` and `capabilities` are read by the localoy daemon, whose catalog
syncs from this repo; each runtime ignores the other's keys. Codex support is
planned. Two rules keep this working:

- **A content change needs a version bump.** localoy pins installs by
  `@publisher/name@version` digest — same version with new content is refused.
- **`stacks/` holds charters, not skills.** A `STACK.md` there becomes an
  agent role (persona + skill set) in localoy; Claude Code and `install.sh`
  ignore the directory entirely.

## Curate your own stack

A stack is just a repo shaped like this one: skill folders, each with a
`SKILL.md`, and this `install.sh` at the root. Fork it, keep the skills you
want, add your own — installing your fork beside this repo works, because the
installer only ever touches wrappers that point back into its own checkout.

## Roadmap

Qualify/verify skills for the lead list, and outreach drafting, follow once
the current set proves out on real work. Enabling multiple stacks side by side
is the intended shape — install each repo, and its skills land together in
`~/.claude/skills`. Nothing here sends anything on your behalf — that stays
true until there is a send path a human reviews.
