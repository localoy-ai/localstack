# Generating clips and pictures with models

Generated pictures and clips fill what can't be filmed. They cost money
and vary, so plan them like a shoot.

## When to generate

- Only what can't be filmed, recorded or found in the folder: fiction,
  impossible places, illustrations, product shots that don't exist yet.
- Prefer a picture with camera motion (cheap) over a video clip (costly);
  use clips for real movement (a character acting, water, a crowd).

## Prompt anatomy

- Subject and action → setting → shot size and angle → camera move →
  light and time of day → style (the project's prefix) → mood.
- One action per clip; clips are 4–8 s; describe the start and the end.
- Camera words models follow: slow push in, pull back, pan left, tilt up,
  orbit, handheld, static; one move per clip.
- Say what must not appear (text, extra people, logos) when it keeps
  sneaking in.

## Consistency

- Characters from reference pictures (the cast), every time.
- Start a clip from a picture (its first frame) to keep the look.
- The same style prefix, palette and lighting words in every prompt.

## Cost discipline

- Estimate and ask before generating; generate the cheapest test first
  (one picture, one short clip), then the rest.
- Look at each result before the next; remake only what's wrong.
- Reuse: one good clip can serve several cuts (trimmed, reversed,
  punched in).

## Common failures

- Melting hands and faces in motion: shorter clips, less action, wider
  shots.
- Text in pictures: ask for none; add text in the edit.
- Drift in style: restate the prefix; start from a picture.

## What this means in VertX

- `picture`, `video {from: a picture}`, `character` for the cast; the
  person's own models and keys decide what's available.
