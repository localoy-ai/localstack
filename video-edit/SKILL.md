---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: video-edit
version: 0.1.3
publisher: localoy
capabilities: [files, pictures, videos]
description: >-
  Cut the video in VertX from the approved plan: scenes made in the picked
  style and cast, placed on the voice, paced and cut like an editor, with
  frames checked as it goes. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [video, edit, vertx, localstack]
    related_skills: [video-shots, video-sound, video-finish, video-craft]
allowed-tools:
  - Read
  - Write
triggers:
  - edit the video
  - cut the video
  - put it together
  - make the scenes
tags: [video, edit, vertx]
---

## When to invoke this skill

Once the plan's phases are picked and the person pressed Start: this is
the run. It makes the scenes the shot list describes, puts them on the
timeline against the voice and music, and cuts it like an editor. While
planning, don't start it: its steps are the plan's `## Steps`, and VertX
renders only a short test clip until Start.

## What you read first

1. `PLAN-<topic>.md`, `script-<topic>.md`, `style-<topic>.md`,
   `shots-<topic>.md`: everything already decided. Don't redecide it.
2. `video-craft`: `sections/editing.md` (pace, cuts, transitions, rhythm);
   `sections/short-form.md` for anything short.

## Build order

1. **The project**: `new` with the brief's preset and the style's page
   colour (`bg`) if it has one. One project per piece; a series: one per
   episode.
2. **Voices** first, in script order, if they aren't on the timeline yet:
   they are the clock.
3. **Scenes**: for each row of the shot list, one VertX `picture` (or a
   `video` for the rows marked as moving). Use VertX, not the general
   picture tool: only VertX draws the cast from their reference pictures,
   and a face drawn without one changes from shot to shot. Each with:
   - the prompt = the style prefix + the row's "what we see";
   - `with` = the row's cast;
   - `motion` from the row's camera;
   - `says` = the row's first words, so `sync` can place it.
   Make in order; look at each picture as it comes (you see it): a wrong
   face, a wrong style, text in the picture → make it again before going
   on.
4. **`sync`**: scenes start when the voice says their words.
5. **Music** under it, from the sound phase.
6. **Pace**: read the timeline (`show`) against `editing.md`: no still
   holding past its limit, no two same-size neighbours, the hook short, a
   beat of silence where the script wants one. Fix with `edit`, `cut`,
   `move`.
7. **Look** at one frame per scene (`look {at: [...]}`) and fix what's
   wrong before the finish phase.

## Ground rules

1. **The plan is the contract.** A change to the story, cast, look or
   shots during the run goes back to the person (in Auto, only if it
   changes what they approved; small fixes, just do and say).
2. **Spend what the plan said.** Remakes of a bad picture are fine; new
   scenes, new clips or more voices than planned need a yes.
3. **Every scene moves.** A still with no motion and no reason is a bug.
4. **Fix at the source.** A wrong face is remade from the reference, not
   covered with text.
5. **Say what you're about to change**, in one plain sentence, before each
   change to the timeline, so the person can follow and stop you.
6. **A make that fails** (a model busy or down): try once more, then carry
   on without it and say so. A story without music is still a story.

## The check

- The timeline's length matches the brief (±10%).
- Every script line has its scene on screen while it's said.
- No still holds longer than ~3 s (fast) or ~5 s (slow) without a new
  shot or real motion.
- Faces and style match the references in every looked-at frame.
