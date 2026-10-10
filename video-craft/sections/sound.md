# Sound: voices, music, effects, the mix

People forgive a rough picture; they leave at bad sound.

## Voice direction

- **Intent before tone**: what is the line doing (warning, confessing,
  selling)? Write `how` as intent + emotion + pace: "warning him, scared,
  fast and low".
- **Pace**: calm narration ~2–2.5 words/s; ads and hype faster; drama and
  horror slower, with pauses. A pause is written as its own beat in the
  script, not hoped for.
- **Emphasis**: one stressed word per line is plenty. If a key word is
  mumbled, re-record that line.
- **Consistency**: same voice, same `how` family for a character all
  piece long; a change of delivery is a change of state.
- **Names and numbers**: listen to every line with a name, a number, a
  date, a brand; they go wrong most.
- **Bangla**: natural spoken pace; check conjuncts and numbers (০৭:৪২:১৯)
  read correctly; prefer a voice tested on Bangla.

## Narration

- **Who's telling it** decides the voice: the hero looking back (first
  person, intimate), a narrator (neutral, warm), the brand (confident,
  plain).
- **Don't narrate the picture**: say what the picture can't (the thought,
  the stakes, the time jump).

## Music

- **Choose by function**: under talk (calm, sparse, no melody in the
  voice's range), montage (driving, clear beat), tension (low drones,
  pulses, rising), reveal (a hit or a sudden stop), ending (resolve).
- **Describe it as a composer would**: tempo (BPM or slow/medium/fast),
  instruments, mood, structure ("starts sparse, a pulse enters at the
  turn, lifts, stops dead before the last line"). No artist names, no
  lyrics for under-voice beds.
- **Cultural colour**: sitar, tabla, bansuri, dhol for South Asian feel;
  use it with intent, not as a stereotype.
- **Edit to it**: cuts on beats, changes on the phrase (every 4 or 8 bars).
- **Silence** before a reveal is the strongest cue.

## Sound effects, foley, ambience

- **Ambience (room tone)**: every place has a sound (station hum, street,
  rain). Without it, scenes feel dead between lines.
- **Foley**: small human sounds (footsteps, cloth, a cup set down) make a
  picture feel real.
- **Effects**: the story's sounds (the knock, the radio crackle, the
  countdown beep). Each one a reason; a sound that pays off later is set up
  early.
- **Comic style**: on-screen sound-effect lettering doubles the sound.

## The mix

- **Voices on top**, always clear; music and effects under them.
- **Levels**: voice the loudest steady element; music a good deal lower
  under talk, up between lines; effects at the level they'd be heard.
- **Loudness for platforms**: social and streaming normalise loudness;
  very quiet or very loud masters get turned up or down. Aim for a steady
  level, no peaks clipping.
- **Check on a phone speaker** and on headphones.

## What this means in VertX

- `voice {text, voice, how, at}`: one clip per line; voices listed in the
  tool (Eleven v4 and Gemini TTS names).
- `music {prompt, seconds, at, volume}`: volume defaults to 0.35; VertX
  lowers music and other sound under any voice by itself (ducking).
- `add {file, role: voice | music, volume, fade_in, fade_out}` for sound
  files the person gives (effects, their own voice, licensed music).
- `export {format: m4a | wav}` for audio-only.
- Can't do yet: making or finding sound effects, a loudness target for the
  mix, EQ or noise removal.
