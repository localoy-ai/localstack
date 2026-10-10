# Series: planning a show, writing episodes

A series is a promise kept every episode: the same people, the same world,
the same feel, and a reason to come back.

## The series plan (the bible)

Write it once, in the series' `PLAN-<series>.md`, and keep it true:

- **Premise**: one or two sentences: who, what they want, what's in the
  way, what's at stake. ("An engineer alone on a Mars station hears her
  own voice on the radio, warning her not to come home.")
- **The engine**: what makes a new episode possible every time (a case
  per episode, a countdown, a journey, a mystery peeled one layer each).
- **Cast**: each regular character's want, flaw, voice, look (with the
  reference picture once cast), and how they change over the season.
- **World rules**: what's possible and what isn't. Break a rule only on
  purpose, and late.
- **Style**: the look (comic, cinematic, flat…), palette, music feel,
  narration voice, title card. Every episode uses it.
- **Season arc**: where it starts, the midpoint turn, where it ends, and
  the question left for next season.
- **Episode list**: one line per episode: what happens, what changes.

## Episodes

- **Each episode works alone and moves the whole.** A viewer arriving at
  episode 3 still gets a story; a viewer who saw 1 and 2 gets more.
- **Cold open**: start each episode in motion, before the title.
- **A-story and B-story** in longer episodes: the main plot and a smaller
  personal one that comments on it.
- **The cliffhanger**: end on a question, a reveal or a decision, not on a
  calm moment. The last line or picture is the hook for the next episode.
- **Recaps**: a few seconds of "previously" for episode 2 on, when the
  platform shows episodes out of order.

## Continuity: what must stay the same

- Faces, hair, clothes (unless the story changes them), props, places,
  time of day, the scars and the rings.
- Names, spellings, how characters speak.
- The style: palette, lettering, music theme, the title card.

Keep a **continuity list** in the series plan (what each character wears,
what each place looks like) and check every episode against it before
export.

## Short-form series

- **Part 1 / Part 2** on social: each part ends on an open question and
  is under the platform's comfortable length; the next part opens with a
  one-line recap.
- **Consistent thumbnails and titles** so people recognise the series in a
  feed.
- **Release rhythm**: same day and time; say it at the end ("Part 3
  Friday").

## Story so far

After each episode, add to the series plan: what happened, what changed,
what was set up and not paid off yet. The next episode's writer (you,
later) reads it first.

## What this means in VertX

- **Characters belong to the series, not one episode**: make each
  character once with `character` (a reference picture), and name them in
  `with` on every picture so they're drawn the same. (A new project not
  seeing the folder's characters is a known gap; until it's fixed, reuse
  the same reference files by name and check with `look`.)
- Use the same `preset`, palette, fonts and lettering style in every
  episode's project; copy them from the bible, not from memory.
- The title card and end card are `text` pieces with the series' fonts;
  keep their wording in the bible.
