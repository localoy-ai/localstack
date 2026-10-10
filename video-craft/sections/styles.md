# Animation and styles: looks, and how to prompt them

A look is a set of choices held for the whole piece: medium, line, colour,
light, texture. Write them once as a prompt prefix and use it on every
picture.

## Building a prompt prefix

`<medium>, <line and shape>, <colour>, <light>, <texture>, <framing note>`

Then the shot: `<shot size> of <who> <doing what> in <where>, <mood>`.

Keep the prefix identical across pictures; change only the shot part.

**Words in pictures**, in any style: put in only the words the design
calls for (a title, a sign, lettering in the art), write them in the
prompt exactly as they should read, and say "no other writing". Image
models add signs, menus and labels of their own, often garbled or making
claims nobody made (real test 2026-10-10: "Coffee & Pastries" on a window,
gibberish in speech bubbles). Look at every picture that has words and
remake any with a wrong or garbled word. Spoken lines are captioned in
VertX, sharp and editable.

## Recipes

| Look | Prefix (starting point) | Good for | Watch out |
|---|---|---|---|
| **Comic / graphic novel** | comic book panel, bold black ink outlines, flat colour fills with cel shading, halftone dot shadows, limited palette | stories, thrillers, series | keep inks the same weight; no photoreal skin; leave room for balloons |
| **Manga / anime** | anime style, clean line art, cel shading, expressive eyes, soft gradient sky | drama, youth, fantasy | faces drift between pictures: always use the cast references |
| **Cinematic realism** | cinematic film still, 35mm, shallow depth of field, natural skin texture, motivated lighting, subtle film grain | ads, drama, documentary illustration | label as illustration when it stands in for real events |
| **Painterly** | digital painting, visible brush strokes, soft edges, rich colour, painterly light | storybooks, mood pieces | detail varies; keep the palette tight |
| **Flat graphic / motion design** | flat vector illustration, geometric shapes, bold solid colours, no gradients, clean negative space | explainers, brand, data | can look generic: give it a brand palette and one quirk |
| **3D cartoon** | stylized 3D render, soft global illumination, rounded shapes, clay-like materials, pastel palette | kids, products, mascots | plastic sameness: vary the light by scene |
| **Watercolour** | watercolour illustration, wet edges, paper texture, muted washes, white of the paper showing | gentle stories, travel, poetry | low contrast at phone size: keep subjects big |
| **Documentary still** | documentary photograph, available light, candid moment, slight grain, real-world colour | real stories, interviews | never pass it off as a real photo of a real event |
| **Retro / film** | 1970s film photograph, warm faded colour, grain, soft highlights | nostalgia, fashion, music | keep the era consistent in clothes and objects |
| **Noir** | black and white film noir, hard low-key light, deep shadows, venetian blind shadows, rain-wet streets | mystery, thriller | read at phone size: big shapes |

## Comic: the full recipe

- **Panels**: one picture per panel, each a clear shot (see
  `cinematography.md`); vary panel sizes by importance (a big panel for the
  reveal).
- **Inks**: same outline weight everywhere; heavier on foreground.
- **Colour**: flat fills, 4–6 colour palette, one accent for danger or the
  key object; night scenes in blues with one warm light source.
- **Halftone**: dots in shadows and skies; not on faces' highlights.
- **Lettering**: narration in rectangular boxes (top), speech in balloons
  near the speaker, sound effects as big outlined letters in the scene's
  accent colour. Bangla: check joined letters (যুক্তাক্ষর) render whole in
  big outlined text; choose words without fragile conjuncts for sound
  effects when the font breaks them.
- **Rhythm**: a panel holds 2–4 s with a slow push; a page turn (a cut to a
  new layout) marks a scene change.
- **Gutters**: a dark page colour around the panel (VertX `new` `bg`) reads
  as a comic page.

## Choosing a look

- **From the brief's feel and platform**: a thriller reel → comic or noir;
  a product explainer → flat graphic; a kids' story → 3D cartoon or
  watercolour.
- **Show 2–3 on the same moment**, never one.
- **Brand pieces**: the palette comes from DESIGN.md.

## What this means in VertX

- The prefix goes at the start of every `picture`, `character` and
  `video` prompt; the cast goes in `with`.
- Comic page colour: `new {bg}`; panels are pictures, `fit contain` with a
  `box` if a panel should sit inside the page with gutters.
- Lettering: `text` with `style box` (narration), `style outline` (sound
  effects); captions for spoken lines.
- Can't do yet: speech balloons with tails, panel borders drawn by VertX,
  halftone as a filter (make it part of the picture's prompt), page-turn
  transitions.
