# Cinematography: shots, angles, movement, composition, light

The camera decides what the viewer feels before a word is said.

## Shot sizes

| Shot | Shows | Feels |
|---|---|---|
| EWS (extreme wide) | the whole place, people tiny | scale, isolation, establishing |
| WS (wide) | full bodies in their place | where we are, who's there |
| MWS / cowboy | knees up | action, standoff |
| MS (medium) | waist up | conversation, neutral |
| MCU | chest up | attention, the start of feeling |
| CU (close-up) | the face | emotion, reaction |
| ECU (extreme close-up) | eyes, a hand, an object | tension, a detail that matters |
| Insert | a thing: the countdown, the letter | information |
| OTS (over the shoulder) | one face past another's shoulder | dialogue, connection |
| POV | what a character sees | putting the viewer inside them |
| Two-shot | two people in one frame | relationship |

Rule of thumb: **wide to orient, closer as the stakes rise, close-up for
the turn**, wide again for the aftermath.

## Angles

- **Eye level**: neutral, honest.
- **Low angle** (looking up): power, threat, heroism.
- **High angle** (looking down): smallness, vulnerability, being watched.
- **Top-down / bird's eye**: pattern, fate, a map of the scene.
- **Dutch tilt**: unease, something wrong. Use rarely.
- **Over the shoulder**: we're with someone, looking at someone.

## Movement

| Move | Use it for |
|---|---|
| Push in (dolly or zoom in) | realisation, rising tension, drawing us into a mind |
| Pull out | loneliness, revealing context, an ending |
| Pan | following a look or action, revealing across the space |
| Tilt | revealing height, from feet to face |
| Tracking / dolly alongside | walking with someone, energy |
| Crane / drone rise | ending, scale, leaving the story |
| Handheld | urgency, documentary truth, panic |
| Static | calm, formality, letting the actor work |

Every move needs a reason. A slow push on a still is the default life of
an image; a move against the action (pull out while the character runs in)
is a deliberate effect.

## Composition

- **Rule of thirds**: eyes on the top third line; the subject off centre,
  looking into the open space (lead room).
- **Centre** for symmetry, confrontation, stillness.
- **Headroom**: little above the head in close-ups; never cut at joints.
- **Leading lines** (corridors, roads, cables) pull the eye to the subject.
- **Foreground framing** (a doorway, a window, a shoulder) adds depth and
  can mean being watched.
- **Negative space** for loneliness; a crowded frame for pressure.
- **Depth**: foreground, subject, background in three planes.
- **Vertical video**: stack the story top to bottom; keep faces in the
  upper half, the bottom fifth clear for captions and the platform's
  buttons.

## Lenses and depth of field (describe in prompts)

- **Wide lens** (24 mm): space, distortion near the edges, energy.
- **Normal** (35–50 mm): how we see.
- **Long lens** (85 mm+): flattened background, intimacy, surveillance.
- **Shallow depth of field**: subject sharp, background soft; draws the
  eye.
- **Deep focus**: everything sharp; the world matters.

## Light

- **Three-point** (key, fill, back): clean, readable.
- **High key**: bright, few shadows; comedy, ads, kids.
- **Low key**: deep shadows, one source; thriller, drama, noir.
- **Motivated light**: comes from something in the scene (a screen, a
  window, a candle); always more believable.
- **Golden hour**: warm, low, long shadows; nostalgia, romance.
- **Blue hour / night**: cool, with one warm source for the eye.
- **Colour temperature as meaning**: cold blue for distance and danger,
  warm amber for safety and memory; mix them for conflict.

## Colour

- A palette per piece (see the style sheet); one accent colour for what
  matters most.
- Shift the palette with the story (warm → cold as things go wrong) on
  purpose, scene by scene.

## Continuity rules

- **180° rule** in conversations and chases.
- **Screen direction**: a journey left to right keeps going left to right.
- **Eyeline match**: a look and what's looked at agree on direction.
- **Match on action**: cut in the middle of a movement, continued in the
  next shot.

## What this means in VertX

- Shot size, angle, lens, light and palette go into the `picture` prompt
  (after the style prefix).
- Movement on stills: `motion` zoom-in (push in), zoom-out (pull out),
  pan-left, pan-right; none for a held static frame.
- Real movement (tracking, handheld, a crane) needs a `video` clip, 4–8 s,
  costly: keep for the moments that need it; `from` a picture to keep the
  look.
- Can't do yet: tilt, rack focus, speed ramps, camera shake as an effect.
