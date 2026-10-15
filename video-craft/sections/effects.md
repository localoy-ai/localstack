# The modern edit: transitions, speed, colour, effects, motion text

What today's editors (CapCut, Premiere, Resolve, the reels people scroll)
reach for, and when each one helps. Every tool here is a seasoning: the
story, the hook and the cut carry the video. A piece where you notice the
effects more than the content is over-cooked.

## Transitions

- **The cut is still the default.** A transition is for a change of
  place, time, energy or idea, not for every join.
- **Pick one family per piece** and repeat it: a reel of whips, a doc of
  dissolves, a brand film of clean slides. Mixing five kinds reads cheap.
- **Length**: 0.2–0.4 s for energetic kinds (whip, flash, glitch, slide,
  zoom); 0.5–1 s for soft ones (fade, dissolve, fadeblack); 1–2 s only for
  a big time jump or a title.
- **What each says**:
  - *whip* (fast slide with motion blur): energy, "and then", travel; put
    a whoosh on it.
  - *slide / smooth slide / push (cover, reveal)*: next item in a list, a
    product turning, UI-style flow.
  - *zoom (zoomin)*: going deeper, "look closer", a reveal.
  - *flash (fadewhite)*: a punch, a memory, a camera click, a beat drop.
  - *glitch / pixelize*: tech, error, hype, a twist; very short.
  - *fade / dissolve*: time passing, softness, memory; slow pieces.
  - *fadeblack*: chapters, endings, a heavy beat.
  - *circleopen/close, radial, wipes, slices, winds*: playful, retro,
    kids, game shows; use rarely and on purpose.
- **Hide the join**: match the motion across it (a whip left out of one
  shot into a whip left in the next), or match shapes and colours.
- **On the beat**: start a transition so its middle lands on a beat.

## Speed

- **Speed up (1.5–4×)**: compress process (cooking, building, travel),
  timelapses, comedy.
- **Slow down (0.25–0.7×)**: the moment that matters, a reveal, a product
  hero shot, action peaks. Slow footage looks smoother when it was shot at
  a high frame rate; generated clips slowed below 0.5× can stutter.
- **Speed ramp**: cut the clip into parts and give each its own speed
  (fast → slow on the key moment → fast). Ramps land best on a beat.
- **Reverse**: rewinds, "how it started", playful loops; keep it short.
- **Freeze frame**: introduce a person ("this is Sam"), a punchline, a
  "wait for it"; pair it with a title and a sound.

## Camera moves on footage and stills

- *punch-in*: a sudden closer frame on a cut, for emphasis on a word or a
  reaction (talking heads, jokes). Alternate punched and normal shots to
  make one long take feel edited.
- *zoom-in / zoom-out / pans*: life in stills and calm footage.
- *shake*: impacts, drops, panic, hand-held energy; a second, not a scene.
- **Keyframes**: move and scale an overlay (a logo flying in, a phone
  mockup sliding up, a picture-in-picture growing to full screen). Ease
  in and out; overshoot slightly for a playful feel.

## Colour

- **Grade once for the whole piece** (the whole-video look), then fix
  single shots that don't match. A consistent grade is what makes clips
  from different sources look like one film.
- **What each grade says**: warm/golden: friendly, food, lifestyle,
  nostalgia. cool/night: tech, calm, lonely, thriller. teal-orange and
  cinematic: film, travel, ads. punchy: social, products, energy. mono
  and noir: drama, history, serious claims. sepia/vintage/faded: past,
  memory. pastel: soft brands, kids, beauty. cyberpunk: neon, gaming.
  bleach: gritty, war, sport.
- **Adjust before you style**: brightness, contrast, saturation and warmth
  to make shots match; then the grade.
- **Skin**: never push a grade so far that faces go green, grey or orange;
  check a face with `look`.
- **A LUT** the person provides (.cube) is their brand's look: use it
  over everything else.

## Effects

- *grain, film*: makes AI and stock footage feel shot, softens the
  too-clean look; light amounts (0.2–0.4).
- *vignette*: pulls the eye in; subtle.
- *letterbox*: "cinematic" bars; for trailers and moods, not for social
  text-heavy reels (it eats the safe area).
- *glow*: dreamy, beauty, night lights.
- *blur*: backgrounds behind text, a dream, a focus pull between shots.
- *rgb-split, glitch, vhs, pixelate*: retro, tech, hype, error; short
  bursts on a beat beat a whole scene of them.
- *trails*: dance, music, dream sequences.
- *mirror, invert, edge, sketch*: art pieces, music videos; rarely.
- *sharpen*: a touch on soft footage; *denoise* on dark grainy footage;
  *stabilize* on shaky phone video.
- **Overlays in a blend mode**: light leaks, dust, film burns, lens flares
  go on a layer above with *screen* (black disappears); paper and grunge
  textures with *multiply* or *overlay*.
- **Green screen**: key out the colour (`key`) and put the person over
  anything; light the screen evenly for a clean key.

## Wide footage in a tall frame

Screen recordings, landscape clips and promos are 16:9; a reel is 9:16.
- **Crop to what matters** (a cover crop with its focus on the action:
  the left of a terminal, the face, the product) and punch in further on
  the detail. Text must read on a phone: if it's smaller than a caption,
  crop tighter.
- **Blur fill** (the whole shot over a blurred copy of itself) when every
  part of the frame matters (a wide establishing shot, a whole UI). Put
  captions in the blurred space above or below it.
- Never shrink a wide shot into the middle of a black frame.

## Text that moves

- **Captions on reels**: 1–3 words at a time, big, centred low-middle,
  the word being said highlighted (karaoke) in one brand colour. Pop or
  zoom them in.
- **Titles and hooks**: pop or slide in, hold long enough to read twice,
  slide or fade out.
- **Typewriter**: quotes, code, messages, "searching…".
- **One motion style for text per piece**, like transitions.

## Sound design for an edit

- Every transition and text pop gets a sound: whoosh or swoosh on whips
  and slides, pop or click on text, impact or boom on a reveal or a
  freeze, riser into a drop, glitch on glitches, ding for a tip, shutter
  on a flash, typing under typewriter text. Keep them under the voice
  (volume 0.4–0.8).
- **Cut on the beat**: get the music's beats, put cuts on beats and big
  changes on the first beat of a bar.
- **Talking heads**: cut the pauses (tighten), clean the voice (voice
  effect), then punch in on key words.
- **Levels**: the export is levelled for social; a voice should still sit
  clearly above music.

## What this means in VertX

- `transition {kind, seconds}` on the incoming clip (add or edit); a clip
  with no clip before it comes in over the background. `"none"` removes it.
- `speed`, `reverse`; a ramp is `cut` then a `speed` on each part;
  `freeze {id, at, for}` for a freeze frame.
- `motion`: punch-in, shake, zooms and pans, on stills and videos;
  `keys [{at, x, y, scale}]` to move a layered clip.
- `grade`, `lut`, `effects [name or name:amount]` on a clip;
  `edit {id: "video", grade, effects}` for the whole piece.
- `blend` and `key` on a clip in a higher `layer`.
- `fit: "blur"` for blur fill; `focus [x, y]` (0 to 1) picks the part a
  cover crop keeps; add `keys` scale for a punch on the detail. Never
  pre-render shots with ffmpeg in the terminal: VertX does this itself.
- `text {animate, animate_out}`; `captions {words: 1–3, highlight,
  animate: "pop"}` for word-by-word reel captions.
- `sfx {kind, at}`; `beats {id}` for the music's beat times; `tighten
  {id}` to cut pauses from speech; `scenes {file}` to find shot changes
  in a long video before cutting it up.
- Check every transition and effect with `look` at its middle before
  exporting.
