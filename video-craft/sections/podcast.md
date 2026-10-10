# Podcast production

A podcast is a voice someone chooses to spend time with. Clear sound and a
reason to keep listening matter more than anything else.

## The show

- **Premise**: who it's for and what they get each episode, in one line.
- **Format**: solo, interview, co-hosts, panel, narrative, audio drama
  (shapes in `formats.md`).
- **Length**: what the subject holds; a steady length helps listeners plan
  (15–20 min commute, 40–60 min deep conversation).
- **Rhythm**: weekly or every two weeks, same day.
- **Sound identity**: a theme (5–15 s), a short sting between segments, a
  consistent intro and outro line.
- **Show art**: square, readable small, the same style as the brand.

## The episode

1. **Cold open** (10–30 s): the best moment of the episode, before the
   intro.
2. **Intro**: the show's theme and a line: who, what this episode answers.
3. **Segments**: 2–4, each with its own question or turn, stings between.
4. **The middle hook**: a "coming up" or a question that keeps them past
   the halfway drop.
5. **Takeaway**: what to remember or do.
6. **Outro**: thanks, next episode's teaser, where to find more.

## Interviews

- Research the guest; know their best stories and ask for those.
- Open warm and easy; save the hard question for the middle.
- Ask open questions ("what happened when…"), one at a time; follow up on
  the surprising answer rather than the next question on the list.
- Let silence work; people fill it with the good part.
- For an AI-voiced interview format, never invent what a real person said.

## Hosts and voices

- Distinct voices for co-hosts (pitch, pace), and roles (the curious one,
  the expert).
- Narration in a narrative show: intimate, close to the mic, unhurried.
- Read scripts as talk, not as reading: short sentences, contractions,
  the words people use.

## Editing speech

- Cut ums, false starts and long tangents, but keep natural rhythm; an
  over-cut voice sounds robotic.
- Keep breaths that make sentences sound human; shorten long pauses,
  keep meaningful ones.
- Level the voices so no one is quieter; music beds well under speech.
- Tighten the start: the first minute decides whether they stay.

## Music and sound

- Theme at the top and end; a bed under the intro and outro, faded out
  under talk; stings between segments.
- Narrative and drama: ambience for every place, sound cues for actions.

## Show notes and chapters

- A summary in 2–3 sentences, what they'll learn, guest bio and links.
- Chapters with times (`00:00 Cold open`, `02:10 Why…`).
- A transcript helps search and accessibility.

## Video podcasts

- Shot per speaker (a picture or a clip), a wide for the room, captions
  for clips cut for social.
- Cut short clips (30–60 s) of the best moments for Reels and Shorts, each
  with a hook line on screen.

## Delivery

- Audio: about −16 LUFS (−14 also fine on Spotify), peaks under −1 dBTP;
  MP3 or M4A for most hosts, WAV for archive.

## What this means in VertX

- An audio-only project: `voice` per host line (or `add` the person's own
  recording with `role voice`), `music` for theme, bed and stings,
  `export {format: m4a | wav}`.
- A video podcast: a picture or clip per speaker on the timeline with
  `motion`, `captions` on the voice, `export` mp4.
- Can't do yet: noise removal, EQ, a loudness target, automatic
  chapter markers, transcript export (write the transcript from the
  script).
