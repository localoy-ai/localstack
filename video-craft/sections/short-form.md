# Short-form: reels, shorts, ads

Short video is watched with the thumb on the screen. Every second has to
earn the next one.

## The hook (0–3 s)

The first frame and the first line decide whether anyone sees the rest.

- **Open on the most interesting thing**, not the logo, not "Hi guys".
  Start in the middle: the spill, the reveal, the strange sound.
- **Make a promise the video keeps**: a question ("Why does this cost
  ৳50?"), a claim ("This fixed our mornings"), a tension ("She heard her
  own voice on the radio"), a visual surprise.
- **Work with the sound off.** Most people start muted: the hook needs a
  picture or on-screen words that carry it alone.
- **One promise.** Two hooks cancel each other.

Weak: a logo, a slow pan, a greeting, context before the point.
Strong: a face reacting, motion toward the camera, a before/after, a
bold line of text, a question the viewer wants answered.

## Retention (the middle)

- **One idea per video.** A second idea is a second video.
- **Something changes every 1–3 s** in a fast piece: a new shot, a new
  line, text appearing, a zoom. In a slow, moody piece, the change can be
  smaller (a sound, a glance), but it is still there.
- **Open loops**: raise a question early and answer it late ("…and the
  third one surprised us").
- **Cut the warm-up.** Most first drafts improve by deleting their first
  sentence.
- **Pattern breaks**: a sudden silence, a change of angle, a cut to black
  wake a drifting viewer.

## The ending

- **Pay off the hook.** The promise is kept on screen.
- **One ask**, if any: follow, comment, link, next part. Several asks get
  none.
- **Loop-friendly endings** (the last frame flows into the first) make
  people watch twice; use them when the piece allows.

## Shapes that work

| Shape | Beats |
|---|---|
| Problem → fix | Pain (0–3 s) → the fix in use → the result → ask |
| Before / after | After first (hook) → how → before → after again |
| List | "3 things…" → each one, fastest last → payoff |
| Story | Tension → turn → payoff → hook for part 2 |
| Show me | The finished thing → how it's made, sped up → the finished thing |
| Ad | Hook → benefit you can see → proof (demo, review) → offer → ask |

## Words on screen

- Short lines (≤ 6–7 words), big, high contrast, inside the platform's
  safe zone (`platforms.md`: the central ~900×1400 px on vertical video).
- Captions on every spoken line in short-form; many watch muted.

## What this means in VertX

- `new` with `reel-9x16` for Reels/TikTok/Shorts, `portrait` for a 4:5 feed
  post.
- The hook scene is scene 1 in the script and the first `add`; keep it
  short (1–3 s).
- `motion` on every still (zoom-in, zoom-out, pan-left, pan-right) so
  nothing sits frozen; a still should rarely hold longer than ~3 s in a
  fast piece, ~5 s in a slow one.
- `captions` for spoken lines, `text` for hook lines and labels; check
  them with `look` at the frames where they appear.
- Can't do yet: speed ramps, whip transitions, beat-synced cuts by itself
  (place cuts at the music's beats by hand with `at`).
