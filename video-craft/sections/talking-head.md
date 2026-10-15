# Talking heads, creators and interviews

Most video people make is someone talking: a founder update, a tutorial
presenter, a UGC testimonial, an interview. The edit makes it watchable.

## Tighten first

- Cut pauses, false starts, repeated words and "um"s: `tighten` the voice
  or video, then cut what's left by hand. A tight talking head runs 20–40%
  shorter than the raw take.
- Keep breaths before a big line; cut breaths between list items.
- Keep the best take of each sentence; order sentences for the argument,
  not the order they were said.

## Make it move

- **Jump cuts** are the native language: hide them with a **punch-in**
  (110–120%) on alternate cuts, so each cut feels like a new angle.
- Punch harder (130%+) on the joke, the reveal, the strong claim.
- **B-roll** every 3–6 s in fast pieces: what they're talking about, shown
  (the product, the screen, the place). Cut to it on the noun.
- Text pops for the key phrase (2–4 words), not whole sentences.
- Zoom slowly (2–5%) during a long thought to keep it alive.

## Captions

- On by default (most watch muted): word-by-word or 2–3 words, big, in
  the lower middle, the spoken word highlighted; never over the mouth.
- Fix names, numbers and jargon in captions by hand.

## Sound

- Clean the voice (`voice` effect: rumble out, hiss down, levels even).
- Music under talking: quiet, no melody in the voice's range, ducked.
- A pop or whoosh on text and punch-ins, sparingly.

## Interviews

- Lead with the strongest answer, not the first question.
- Cut the interviewer's questions unless the answer needs them; put the
  question as text if needed.
- Name lower thirds the first time each person appears.

## UGC and testimonials

- Hook in the first second, in the creator's voice ("I didn't expect…").
- Show, then tell: the product in hand or on screen while they talk.
- Keep it looking real: light grade, natural sound, no slick transitions.

## What this means in VertX

- `tighten {id, gap}`, `cut`, `move`; `motion: "punch-in"` or `keys` scale
  on alternate cuts; `captions {words: 2, highlight, animate: "pop"}`;
  `effects: ["voice"]` on the voice; `sfx pop` on text.
