# localstack

A Claude Code skill suite in the gstack mold: each skill is a directory with a
`SKILL.md`, installed by symlink into `~/.claude/skills`, updated by `git pull`.

**Scope, deliberately: sales only.** One skill ships today. The bar for the
second is that the first is demonstrably good on real work — breadth is not
allowed to do the work evidence should do.

## Install

```bash
./install.sh
```

`./install.sh --remove` takes the wrappers back out and touches nothing else.

## Skills

| Skill | What it does |
|---|---|
| `/lead-search` | Builds a lead list from the open web only — companies and decision makers, every row carrying the URL it came from and an honest confidence. No accounts, no logins, no paid data, no outreach. |

## Principles

Carried from a prior project (skopio.ai) that learned them the expensive way:

- **Search engines are the universal adapter.** One search integration plus
  `site:` dorks replaces N brittle per-site scrapers, and never gets blocked.
  Gated sites (LinkedIn, Crunchbase, directories) are read through what search
  results say about them, never fetched.
- **Provenance on every field.** `UNKNOWN` for the unobserved, an evidence URL
  and a three-value confidence on every row. It is what makes a later verify
  pass possible at all.
- **Bound the expensive thing.** Page fetches are budgeted per row; snippets
  first. You cannot prompt your way out of a cost problem — only the procedure
  can bound it.
- **Fabrication has known shapes.** Guessed profile slugs, aggregator URLs in
  the website column, invented firmographics. Each is banned by name.

## Roadmap

Qualify/score, verify, and outreach-draft skills follow once `/lead-search`
has earned them. Nothing here sends anything, and that is a feature until a
send channel exists that a human reviews.
