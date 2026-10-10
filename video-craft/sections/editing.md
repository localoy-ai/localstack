# Editing: pace, cuts, rhythm

The edit is the last rewrite. Its job is to keep attention and make
every moment land.

## What a cut does

- **Continuity cuts** hide themselves: match on action, eyeline match,
  the 180° rule, consistent screen direction.
- **Cut on action**: in the middle of a movement, so the eye is busy.
- **Cut on the line**: a new shot as a new line starts (or a word before,
  to anticipate).
- **J cut**: the next scene's sound starts before its picture (pulls us
  forward). **L cut**: this scene's sound runs over the next picture
  (lingers).
- **Match cut**: a shape or movement in one shot matches the next (the
  round clock → the round planet), joining two places or times.
- **Jump cut**: same framing, time skipped; energy, vlogs, unease.
- **Cutaway / insert**: to a detail (the hand, the countdown) to show
  information or hide a join.
- **Smash cut**: an abrupt cut from loud to quiet (or the reverse) for
  shock or comedy.

## Pace and rhythm

- **Short-form**: something changes every 1–3 s; the hook within 3 s.
- **Shot length follows content**: a wide needs longer to read than a
  close-up; a new place longer than a reaction.
- **Vary the rhythm**: a run of fast cuts, then a held shot; a pattern the
  viewer feels, then a break.
- **Stills**: 2–3 s with motion in fast pieces, up to ~5 s in slow ones.
- **Breath after a beat**: after a reveal, give the viewer a second.
- **Cut to music**: on beats, changes on phrases; don't fight the music's
  structure.

## Transitions

- **The cut is the default.** Most transitions are a cut done well.
- **Dissolve**: time passing, memory, softness.
- **Fade to/from black**: a beginning, an ending, a big time jump.
- **Whip, wipe, zoom transitions**: energy in ads and vlogs; overused,
  they look cheap.
- **One transition language per piece.**

## Montage

A run of short shots that compresses time or builds an idea; music-led;
each shot a step in the change (training, building, the days passing).

## Structure in the edit

- **Cut the warm-up.** Start later than the script if the start is slow.
- **Move scenes** if the order works better another way; check it still
  makes sense.
- **Lose what doesn't serve the "good means" line**, even if it was
  expensive to make.

## Trailers and teasers

The best moments out of order, a question not answered, the title last;
music builds, then a stop and the date or the ask.

## What this means in VertX

- `sync` places scenes on the voice; then `edit {id, at, for}`, `cut`,
  `move` to pace.
- Dissolve: overlap two clips and give the lower `fade_out` and the upper
  `fade_in` (layers); fade to black: `fade_out` on the last clip over the
  `bg` colour.
- J and L cuts: move the voice's `at` a little before or after the scene's.
- Can't do yet: whip and wipe transitions, speed ramps, beat detection
  (place `at` by the music's beat times by hand).
