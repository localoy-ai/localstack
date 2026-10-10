---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: video-story
version: 0.1.0
publisher: localoy
capabilities: [files, web]
description: >-
  Write the story of a video, episode or podcast from its brief: the hook,
  the beats, scenes with timings and every spoken line, in
  script-<topic>.md, drafted in options the person picks from. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [video, story, script, localstack]
    related_skills: [video-brief, video-craft]
allowed-tools:
  - Read
  - Write
  - WebSearch
  - WebFetch
  - AskUserQuestion
triggers:
  - write the script
  - write the story
  - write an episode
  - turn this into a video script
  - podcast outline
tags: [video, story, script]
---

## When to invoke this skill

After the brief, before anything is cast or drawn. Everything later
(pictures, voices, the cut) is made to serve the script, so a scene that
isn't in it isn't made.

## What you read first

1. `PLAN-<topic>.md`: the brief. Length, feel, platform and "good means"
   are the frame; don't write past them.
2. The user's material: their post, article, story, interview notes. Keep
   their facts and their best lines.
3. For an episode: the series plan and the earlier episodes' scripts.
4. From `video-craft`, the file for this kind of piece:
   - `sections/short-form.md` for anything under ~90 s (reels, shorts,
     ads): hooks, retention, one idea;
   - `sections/screenwriting.md` for anything with scenes and dialogue;
   - `sections/series.md` for an episode or a series plan;
   - `sections/formats.md` for documentary, explainer, ad, adaptation or
     podcast structure.

## What the script must have

- **The hook**, in the first 1–3 seconds of a short (the first 10–30 s of
  something long): the line or picture that makes them stay. Write it
  first; it's the part people actually see.
- **Beats**: the few turns the piece moves through (setup → turn → payoff,
  problem → fix → proof → ask). One idea per beat.
- **Scenes**, numbered, each with:
  - its time window (`0.0–2.5 s`), summing to the brief's length;
  - what we see, in one line a picture can be made from (who, where,
    doing what, the shot if it matters);
  - every spoken line, with who says it (narrator, a character, the
    host) and how ("whispered", "over the radio");
  - on-screen text, if any, exactly as it will appear;
  - sound that matters (a knock, silence, music rising).
- **The ending**: the payoff or the ask (follow, buy, next episode), and
  for a series, the hook into the next one.

Spoken lines are timed honestly: roughly 2.5 words a second in English,
less for slow, dramatic reading; say a line aloud in your head. Bangla and
other languages: time by syllables, and leave room.

## Options, then the pick

Draft **two or three** directions when the story is open: different hooks
or different shapes (a story vs a list vs a before/after), each a few
lines plus its first scene. Ask the person to pick with one ask, your
recommendation first. Then write the full script of the pick. A request
that already fixes the story ("turn this script into a video") skips the
options: tighten what they gave you and show what you changed.

## Write it down

- `script-<topic>.md`: `# <title>`, the hook, `## Beats`, `## Scenes`
  (the numbered scenes above), `## Ending`. For a podcast,
  `## Outline` with segments, timings and the questions or talking points,
  instead of scenes.
- In `PLAN-<topic>.md`: mark `2. Story — ✓ script-<topic>.md` once the
  person picked, and add any must-make item to `## Steps`.

## Ground rules

1. **Their facts only.** No invented statistics, quotes, prices or claims
   about real people or products. If the story needs a fact you don't have,
   it's a question, not a line.
2. **Serve the length.** Cut a beat before you speed up the lines.
3. **Show, don't say twice.** If the picture shows it, the voice says the
   next thing.
4. **Write for what can be made.** Every scene must be makeable as a
   picture, a short clip or text on screen; a scene that needs a crowd
   dancing in sync, a long continuous move or a real person is flagged,
   with the workaround.

## The check

- The hook works with the sound off (captions or picture carry it).
- Scene times add up to the brief's length, ±10%.
- Every line has a speaker; every scene has something to see.
- A cold reader can tell what happens and why it matters.
- Nothing in it needs a fact we don't have.
