---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: vinci
version: 0.1.0
publisher: localoy
capabilities: [files, web, browser, terminal]
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [art, painting, design, vinci, localstack]
    related_skills: []
description: >-
  Paints or designs anything in Vinci, the stroke editor at localoy.ai/vinci,
  the way a master would: researches the subject and the artist's method
  first, plans one layer per stage, writes every stroke with code, opens the
  painting in the editor, replays it from the first stroke and exports it at
  up to 16x. Use when asked to "paint", "draw", "design" something, "/vinci
  <subject>", or to make a picture "the way <artist> did". (localstack)
allowed-tools:
  - Bash
  - Read
  - Write
  - WebFetch
  - WebSearch
triggers:
  - paint this
  - draw this
  - design this in vinci
  - paint it the way
  - /vinci
---
# Vinci

Make the picture the person asked for in Vinci, the way the artist behind it
would have made it: understand how they worked before the first stroke, then
build it up in the same stages, every mark a stroke.

## Read the editor's contract first

Open **https://localoy.ai/vinci/AGENTS.md** before anything else (a plain
fetch). It is served with the editor and changes with it: the project file
format, how to open a file in the editor, Replay, Export. When it disagrees
with this skill, the contract wins. Menus and buttons may move; the contract
says where things are now.

## What you need first

- **The subject** — what to paint or design. If the request names it, you have it.
- **The manner** — whose way ("the way Leonardo did", "like a Van Gogh", "a
  flat logo"). If none is given, choose the manner that suits the subject
  best, say which and why, and go on.
- **The size** — portrait 530 × 770 unless the subject wants another shape
  (landscape, square). Choose, and say so.

Ask only if the subject itself is unclear. Everything else: decide and flag.

## Before any stroke: research

1. **The method.** How did this artist (or this kind of design) get made?
   Materials, the ORDER of the layers or stages, and what the artist was
   thinking at each: what each stage was for. Use real sources (museum
   technical studies, conservation papers, the artist's own writing) and cite
   them in the PLAN. A stage list from memory is not research.
2. **The reference.** For a known work, find a good public-domain image and
   save it in the scratch folder. It is a GUIDE for where strokes go and what
   colour they are — it never goes onto the canvas: do not import it as a
   layer, do not trace its pixels into flat patches. Every mark is a stroke.
3. **Never use someone else's strokes.** The editor ships its own Leonardo
   study (the data behind Replay on an empty canvas); do not load, copy or
   adapt it. Make your own.

## Plan

Write **PLAN-<slug>.md** (`<slug>` = the subject, lowercase, hyphens —
`mona-lisa`, `starry-night`). At the top, `## Where we are` as a checklist,
one line per stage (`- [ ] 3 Imprimatura — translucent umber wash…`), so the
plan can be carried out and resumed. Then a table, one row per editor layer:
name, what goes on it, brush, typical size, stroke opacity, layer opacity,
blend mode, stroke count — and the sources. Order the layers as the artist
worked. Several layers for one stage are fine (by region: face, hands,
landscape); name them so a person can follow the stages.

## Paint

1. **Write the strokes with code** (Python with numpy/PIL is usually fastest),
   stage by stage, into one project file as the contract describes. Follow
   form, not grid: stroke direction along the edges and folds, length and
   width by stage (broad early, fine late), order within a layer as a painter
   would work. Glazes are many thin, low-opacity strokes on a multiply layer.
   Tens of thousands of strokes are normal; the contract gives the limits.
2. **Scratch stays scratch.** Scratch for this run lives in `.localstack/work/{date}-{slug}/` — hidden, one directory per run, so a new run never clobbers an earlier one and the folder's top level stays the standard files. Scratch is disposable; old run directories may be deleted freely. Scripts, masks and previews go
   there; the folder's top holds the PLAN, the project file and the exports.
3. **Open it in the editor.** localoy.ai/vinci → File → Open project… → hand
   it the file (localoy's browser: action `upload`). Wait for the paint-in,
   then look (screenshot).

## Look before you finish

A screenshot shows the whole. To judge closely, export at 2× and compare
with the reference by code, region by region (face, hands, background):
colour, value, edges. Fix the stage that is off by regenerating its layers,
and open the project again. Stop when the picture reads as the subject at a
glance and holds up up close — and say plainly what still falls short.

## Show it and export it

1. **Replay** it from the first stroke (the Replay tab), so the stages can be
   watched in order. Take a screenshot partway and at the end.
2. **Export at 16×** (File → Export PNG…; the dialog opens at 2× — choose
   16×). The PNG lands in the working folder. Save the project file beside
   it as `<slug>.project.json`.

## Files

- **PLAN-<slug>.md** — the research, the layer plan, and `## Where we are`
  kept current as each stage is done.
- **AGENTS.md** — one short line per lesson that will help the next painting
  here (an editor quirk, a stroke recipe that worked). Update, never duplicate.
- **CHANGELOG.md** — one bullet per run under today's date: subject, layers,
  strokes, what was exported.
- **TODOS.md** — what is left, if anything.

## Report

A short summary first: what you painted, in whose manner, the stages as
layers (name, strokes), the total strokes, and the files (project, 16×
export). Then the sources behind the method, then what still falls short.
Never claim a likeness score you did not measure.
