# Finishing: captions, titles, colour, the final check

The finish is what survives a phone screen.

## Captions and subtitles

- **Every spoken line** in short-form; viewers often start muted.
- **Short chunks**: 3–7 words, one or two lines, broken at natural
  phrases (never split a name or a number).
- **Readable**: large for the screen, high contrast (white with a dark box
  or outline), the style's font.
- **Timing**: on as the words start, off as they end; never ahead of the
  voice.
- **Placement**: lower third, but above the platform's buttons and
  caption bar on vertical video; move up if a face is there.
- **Exactly the words said**, spelled right. Bangla: check every
  conjunct and vowel sign in big text; an outlined or bold font can break
  joined letters, so look closely.
- **Burned-in vs a subtitle file**: social needs burned-in; YouTube can
  also take a separate subtitle file.

## Titles and on-screen text

- **Hook text**: a few words, big, first second.
- **Lower thirds**: a name and role on screen when someone first speaks.
- **Labels**: a place, a time ("Mars, Day 214"), a number.
- **Title card**: the series' design every episode.
- **End card**: the ask (follow, link, part 2 when) and enough time to
  read it (2–3 s at least).
- **Hierarchy**: one big thing at a time.

## Colour and look

- **Consistency first**: every scene should feel like the same world.
  Scenes that come out warmer or darker than the rest are remade or moved
  closer with the next picture's prompt.
- **Grade with intent**: warm for safety and memory, cool for distance and
  danger, desaturated for gloom, punchy for ads.
- **Skin tones**: never let the look turn skin unnatural (unless the style
  demands it).

## The final check

Watch it as a viewer would, then look at frames:

1. First frame: a good thumbnail?
2. Hook: lands within 3 s, with the sound off?
3. Each scene: right face, right style, no stray text in the picture?
4. Each caption change: right words, readable, not covered?
5. Bangla and other scripts: whole letters?
6. Pace: no still too long, nothing rushed past?
7. Sound: voices clear, music under, no clipping, intended silences only?
8. End card: readable, the ask clear?
9. Length and size: the brief's?

## Versions

Name exports by topic and version (`<topic>.mp4`, `<topic>-v2.mp4`);
never overwrite a version the person has seen; note what changed.

## What this means in VertX

- `captions {words, style, position, size, color, font}` from the voice
  clips; `text` for titles, labels, lower thirds and the end card.
- `look {at: [...]}` renders frames exactly as the export; check every
  caption change and every scene.
- `export {name, format}` into `videos/` (or `audio/`).
- Can't do yet: a colour grade for the whole video, a separate subtitle
  file export, animated title templates.
