# Colour: correcting, matching, grading

Colour sets mood and makes clips from different sources look like one
film. Work in order: correct, match, then grade.

## 1. Correct each clip

- Exposure: faces and the subject clearly lit; no clipped whites in what
  matters; blacks black but with detail.
- White balance: whites look white, skin looks like skin (warm, not orange,
  not green or grey).
- Contrast and saturation to normal before any style.

## 2. Match

- Shots in one scene share brightness, warmth and saturation; a cut should
  not jump in colour unless the story jumps.
- Mixed sources (phone, screen recording, generated clips): bring them to a
  common middle first, then grade them together.
- Screens and UI: keep them true to the product's colours; grade around
  them lightly.

## 3. Grade (the look)

- One look for the piece, chosen for the mood:
  warm/golden — friendly, food, nostalgia; cool/night — tech, calm,
  tension; teal-orange — cinematic, travel, ads; punchy — social, product,
  energy; mono/noir — serious, history, drama; faded/vintage — memory;
  pastel — soft brands; high contrast desaturated — sport, grit.
- Grade the whole piece at once; then fix single shots that stand out.
- Keep skin believable in every grade; check a face frame.
- A brand's LUT, when given, is the look.
- Subtle beats strong: a viewer should feel it, not notice it.

## Texture

- A little grain unifies sources and makes generated or stock footage feel
  shot; vignettes guide the eye; both light.

## What this means in VertX

- Clip `effects` `brightness`, `contrast`, `saturation`, `warmth` to
  correct and match; `grade` or `lut` on the whole video with
  `edit {id: "video"}`; `look` at a face and at each source to check.
