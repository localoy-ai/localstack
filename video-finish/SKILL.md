---
# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.
name: video-finish
version: 0.1.1
publisher: localoy
capabilities: [files]
description: >-
  Finish a video in VertX: captions and on-screen text, titles and the end
  card, a frame-by-frame check against the brief, then export the file
  ready to post, and log what was made. (localstack)
author: localoy
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [video, finish, captions, export, localstack]
    related_skills: [video-edit, video-craft]
allowed-tools:
  - Read
  - Write
triggers:
  - add captions
  - finish the video
  - export the video
  - add titles
tags: [video, finish, captions, export]
---

## When to invoke this skill

After the cut is right. Finishing is what the viewer reads and what
breaks most visibly on a phone: captions too small, text under the
platform's buttons, a typo in Bangla, an end card that says nothing.

## What you read first

1. `PLAN-<topic>.md`: "good means", the platform, the language.
2. `style-<topic>.md`: lettering (font, colours, style).
3. `video-craft`: `sections/finishing.md` (captions, titles, the final
   check); `sections/platforms.md` (safe zones, lengths, loudness);
   `sections/rights.md` before anything realistic or with music goes out.

## Steps

1. **Captions** for every spoken line in short-form (most watch muted);
   for longer pieces, as the brief says. Short (3–7 words), large, high
   contrast, inside the safe area; the style's font and colours.
2. **On-screen text**: hook lines, labels, the offer, narration boxes in
   a comic, exactly as the script wrote them. Big, few words, on screen
   long enough to read twice.
3. **Title and end card**: the series' title card for an episode; the end
   card with the ask (follow, link, next part) for social.
4. **The final check**: `look` at frames across the whole piece: the
   first frame (it's the thumbnail on many platforms), every scene, every
   caption change, the end card. Check each against the list below; fix;
   look again.
5. **Export**: `export {name}` (mp4; m4a or wav for audio-only) named
   `<topic>.mp4`, or `<topic>-v2.mp4` for a new version (never overwrite a
   version the person has seen).
6. **Report**: in `PLAN-<topic>.md`, tick the steps and note the file;
   add a line to `CHANGELOG.md` (create it if missing) under today's date;
   say in a few lines what it is, how long, what changed from the plan
   (and why), and what's ready to post. Post only on the person's yes.

## The final check list

- The hook frame is strong as a still.
- Every caption: right words, right time, readable at phone size, not
  covered by the platform's buttons (bottom fifth and right edge on
  vertical video).
- Bangla and other scripts: joined letters whole, no broken glyphs, no
  missing words (look closely at big outlined text).
- Faces and style the same in every scene.
- No picture has stray text or gibberish letters in it.
- The length matches the brief; the end card is on screen long enough.
- Audio: voices clear over music, nothing clipped, no gap of dead silence
  that isn't meant.

## Ground rules

1. **Look before you export, every time.** A fix after export is a new
   version.
2. **Never post without a yes**, and only the version the person saw.
3. **Say what's missing**: an effect VertX couldn't make, a shot that's
   weaker than planned.

## The check

- The exported file's length and size are the brief's.
- The final check list passes on the looked-at frames.
- The plan and CHANGELOG say what was made.
