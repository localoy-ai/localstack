# Cutting music and cutting to music

Music decides the pace of most short video. Choose it by what it does,
then cut it and the picture together.

## Choosing

- By function: drive (steady beat, builds), emotion (strings, piano,
  space), tension (pulses, low drones, risers), lightness (plucks,
  claps, whistles), prestige (big drums, brass, choir) for trailers.
- Under a voice: no strong melody in the voice's range; sparse.
- Tempo matches the edit: 90–110 bpm calm, 120–130 bright, 140+ hype.
- Licensing: only music the person owns, made for this, or licensed.

## Structure

- Music is in bars (usually 4 beats) and phrases (4 or 8 bars). Changes of
  section land on phrase starts; cut big changes there.
- Intro → build → drop or chorus → outro. Put the hook on the first strong
  downbeat, the reveal on the drop, the logo on the last hit.

## Fitting it to length

- Cut music on a downbeat to a matching downbeat in another section (the
  same bar position) so the join is invisible; hide it under a hit or a
  transition sound.
- Shorten by removing whole bars or phrases, never half a bar.
- End on the music's own ending or a hit plus a short fade (0.5–1.5 s),
  never a mid-phrase fade.

## Cutting picture to music

- Cuts on beats; bigger changes on downbeats; the biggest on phrase starts.
- Not every beat: cutting on every beat tires the eye; vary 1, 2 and 4
  beats a shot, faster toward the climb.
- Moves inside a shot (a whip, a punch-in, a title) can land on beats
  between cuts.

## Levels

- Music alone: full; under voice: about 15–20 dB below it (VertX ducks it);
  in pauses: up a little.

## What this means in VertX

- `beats {id}` gives the tempo and beat times (* marks likely bar starts);
  `cut` and `move` the music clip on beat times; `fade_out` its end;
  place clips' `at` on beats.
