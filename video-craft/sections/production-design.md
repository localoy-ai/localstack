# Production design: places, props, costume, colour

Production design makes the world believable and makes it mean something.
In AI pictures, it's the part of the prompt that isn't the people.

## Places

- **One clear description per location**, written once in the style sheet
  (`## Places`): what it is, the time and era, materials, what's in it,
  the light, the colours. Reuse it word for word in every shot there.
- **The place shows the story**: a cramped room for pressure, a vast empty
  one for loneliness, clutter for chaos, order for control.
- **Establish once, then go closer**: a wide when we arrive, then details.
- **Recurring places look the same** every episode (the window, the
  console, the door).

## Props

- **Story props** (the radio, the countdown, the letter) are characters:
  describe them exactly and keep them the same; give each its own insert
  shot when it matters.
- **Set dressing** adds life: a mug, a photo, a calendar; specific beats
  generic.
- **No readable text on props in pictures** (it comes out wrong); put any
  text the viewer must read on screen with VertX `text`.

## Costume

- Clothes say who and when: job, class, era, mood.
- **Signature colours** per character, distinct from each other and from
  the background.
- A change of costume is a story beat (before/after, day/night, disguise).
- Exact descriptions in the character sheet; never improvise clothes per
  shot.

## Colour script

- Plan the colour of each scene across the piece: warm safety → cold
  danger → one warm light at the end, for example.
- One accent colour reserved for what matters most (the threat, the
  product).
- Keep backgrounds lower in saturation than faces and story props, so the
  eye goes to them.

## Era and culture

- Get the details right for the time and place: architecture, clothes,
  vehicles, signage, food. For Bangladesh and South Asia: real materials,
  real streets, real festival details, not a generic "Asian" look.
- Research what you don't know; cite it in the style sheet.

## Continuity

A continuity list per piece or series: each place's look, each prop, each
character's clothes per scene. Check it before export.

## What this means in VertX

- Place and prop descriptions go in the `picture` prompt after the style
  prefix; the same words every time.
- Text the viewer reads is `text`, never drawn in the picture.
- `look` at the scenes in a place side by side to catch drift.
