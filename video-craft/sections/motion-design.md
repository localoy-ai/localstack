# Motion design: type, logos, diagrams and data that move

Motion graphics explain, brand and give rhythm where there is no footage
(or over it). You design them for each piece; VertX renders them (`scene`).

## The principles

- **Purpose first**: every move says something — arrives (new idea),
  points (look here), transforms (this becomes that), leaves (done). A move
  with no meaning is noise.
- **Timing**: arrivals 0.3–0.6 s, holds long enough to read twice (about
  1 s per 3 words), exits 0.2–0.4 s. Stagger related things by 60–120 ms.
- **Easing**: ease-out to arrive, ease-in to leave, ease-in-out to travel;
  a little overshoot for energy; linear only for constant drift.
- **Hierarchy**: one thing moves at a time, the most important first and
  largest. The eye follows motion; don't make it choose.
- **Continuity**: things move *from* somewhere *to* somewhere; match a
  shape or direction across cuts (the circle that becomes the dot).
- **Consistency**: one set of eases, durations, type sizes and colours for
  the whole piece, kept in one shared stylesheet.

## Kinetic typography

- Break lines where they're spoken; one idea per card; the key word bigger,
  heavier or in the accent.
- Reveals: by word (most readable), by line, by letter (only short words);
  masks and slides read as "designed"; fades read as "soft".
- Match type motion to the voice or music: a word lands on its syllable or
  beat.
- Type: one family, two weights; titles heavy and tight, labels small,
  uppercase and tracked; never under ~3.5% of the frame's short side.

## Logos and stings

- 2–4 s; the logo builds from its own parts (its shapes, its letters) or
  arrives with light (a bloom, a sheen); land it on a sound.
- Never distort a logo (stretch, recolour, crop); animate around it.
- End with it still for at least a second.

## Diagrams, maps and UI

- Build a diagram in the order it's explained: one part per sentence, the
  rest dimmed or not yet there.
- Arrows and lines draw on (stroke animation); flows move left to right
  (or top to bottom) in reading order.
- Maps: start wide, zoom to the place, a pin drops, a label slides in.
- UI and product screens: crop to the part that matters, zoom on it,
  highlight with a ring or a dimmed surround; a pointer shows where the
  action is.

## Data that moves

- One number or one comparison per scene. Bars grow from zero, lines draw
  left to right, numbers count up and land with a small kick.
- Label directly on the chart (no legends); round numbers; the source in
  small type when it's a claim.
- Highlight the one bar or point the story is about; grey the rest.

## Transitions you design

- A shape that wipes, a colour that floods the frame, a zoom through an
  object, a match of shape or colour into the next scene: designed
  transitions carry the brand's look; keep one or two for the whole piece.

## Writing a scene page (VertX renders it)

- An HTML page the size of the frame: motion in CSS keyframes (timed by
  `animation-delay`), the Web Animations API or GSAP; anything drawn by
  script (a counter, particles, a chart) in `window.onFrame(seconds)`.
- Sizes in `vmin`/`vw`/`vh` so the same page works wide and tall.
- Overlays leave the background transparent (`overlay: true`).
- Shared look in one `brand.css` (colours, typeface link, type scale,
  eases as CSS variables); each scene page then holds only its words and
  its own motion — short, quick to write.
- No timers that add things later: everything exists from frame 0 and is
  timed by delays, so every frame renders exactly.
- Look at 2–3 frames of each new scene before placing it.

## What this means in VertX

- `scene {file, seconds, at, overlay, layer}` renders a page into clips/
  and places it; `look` checks frames; re-render one scene after a fix.
- Footage under an overlay: `add` the clip, then the scene on a higher
  `layer`.
