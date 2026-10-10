# Characters: design, casting, consistency

A character is recognised by a silhouette, a face, a colour and a habit.
Decide all four; then never let them drift.

## Designing a character

- **Silhouette**: you should know them from their outline (the coat, the
  hair, the build, the hat).
- **Face**: age, shape, eyes, brows, one distinctive feature (a scar, a
  gap tooth, glasses). Describe it the same way every time.
- **Colour**: one or two signature colours in clothes, kept all piece long.
  Different characters, different colours, so a viewer tells them apart in
  a wide shot.
- **Costume**: exact items and colours ("grey flight suit, orange collar
  tab, mission patch on the left shoulder"). Costume tells the story: a
  change of clothes is a change of state.
- **Habit**: how they stand, move, gesture; for the voice phase, how they
  sound.
- **Fit the world**: same style, same era, same level of detail as
  everyone else.

## The character sheet

Name · role · age · build · face · hair · skin · clothes (with colours) ·
distinguishing detail · posture and movement · voice. Kept in the style
sheet's `## Cast`. Any picture prompt that includes them uses this
description word for word.

## Reference pictures

- One clean reference per character: neutral pose and expression, plain
  background, even light, in the piece's style.
- For a long series, add an **expression set** later (happy, angry,
  afraid) and a **turnaround** (front, side, back) only if the story needs
  them; each is a paid picture.
- A reference is the source of truth. If a scene comes out wrong, redraw
  the scene from the reference; never use a wrong scene as a new
  reference.

## Keeping them the same

- Name them in every picture they're in, and use the same sheet words.
- Same clothes unless the script changes them; note changes in the
  continuity list.
- Group shots are where faces drift most: keep groups to 2–3 named people,
  and check each face against its reference.
- Check every scene with a look at the frame before export; one wrong face
  breaks the spell for the whole piece.

## Voice casting

- Match voice to the character, not the actor's fame: age, energy, warmth
  or edge, pace.
- Distinct voices for characters who talk to each other.
- Narration voice is a character too: decide who is telling the story
  (the hero looking back, a neutral narrator, the brand).
- Record a short sample line per voice and let the person pick before the
  whole script is voiced.

## Real people

No real person's face or voice without their consent; no lookalikes of
public figures; no voice imitations. A person casting themselves (their
photo, their recorded voice) is fine.

## What this means in VertX

- `character {name, prompt}` makes the reference once; `picture {with:
  [names]}` draws them from it in every scene.
- A new project reuses the folder's characters by name: any character
  made in another project here, or a picture in `characters/`, is found
  when you name it in `with`. Never redraw someone who already has a
  reference.
- Voices: `voice {voice, how}` per line; keep a character's voice name and
  `how` the same all piece long.
