# Platforms and delivery

Checked 2026-10-10. Platforms change their limits and screens often, and
published guides disagree; the numbers below are the safe overlap. Before
promising a hard limit (a maximum length, a music rule), check the
platform's own composer or help page, and say the date you checked.

## Sizes

| Where | Shape | VertX preset |
|---|---|---|
| Instagram Reels, TikTok, YouTube Shorts, Stories, Facebook Reels | 9:16 vertical, 1080×1920 | `reel-9x16` (or `reel-720` for a light draft) |
| Instagram / Facebook feed post | 4:5 portrait, 1080×1350 | `portrait` |
| Square feed (LinkedIn, X, older feeds) | 1:1, 1080×1080 | `square` |
| YouTube, websites, presentations, LinkedIn long video | 16:9, 1920×1080 | `wide-16x9` (or `wide-720p`) |

Export 1080p yourself; platforms re-compress anything larger. 30 fps is
standard; 60 for fast motion. MP4 (H.264) is accepted everywhere.

## Lengths

| Platform | Limit (as published, varies by account) | What works |
|---|---|---|
| YouTube Shorts | up to 3 min (since Oct 2024); vertical or square only | 15–60 s; music from YouTube's own library may be capped shorter on long Shorts |
| Instagram Reels | at least 3 min for most accounts; some guides report longer | 7–30 s for reach; past ~90 s reach to non-followers drops |
| TikTok | commonly up to 10 min in the app; varies by account and region | 15–45 s for reach; longer for tutorials and stories that hold |
| YouTube (long) | long videos for verified accounts | 6–15 min for most explainers and stories; as long as it holds |
| LinkedIn, X, Facebook feed | varies | 30–90 s; captions essential, many watch muted at work |

Length rule over all: as short as the idea allows. Cut a beat before you
add a minute.

## Safe zones on vertical video (1080×1920)

The platform's buttons, captions bar, username and progress bar cover the
edges, and the bottom is the worst. Guides disagree; this overlap is safe
on all three of Reels, TikTok and Shorts:

- **Keep faces, text and the ask inside the central ~900×1400 px.**
- **Bottom**: nothing important in the bottom ~350 px (more for ads).
- **Right**: nothing in the right ~180 px (the like/comment/share column).
- **Top**: leave ~200 px for the username and status bar.
- **Feed previews** crop 9:16 to 4:5 or 1:1 (the profile grid): keep the
  hook's key picture in the centre square.

## Thumbnails and the first frame

- Shorts, Reels and TikTok often show the first frame or a chosen cover;
  the grid crops it to the centre square.
- A good cover: one face or object, big, high contrast, 2–4 words of text
  at most, the same design across a series.
- YouTube long-form thumbnails are 16:9 (1280×720 or larger) and decide
  most of the clicks.

## Captions and text

- Burned-in captions for short-form (muted autoplay is common).
- YouTube also takes a subtitle file for accessibility and search.
- Platform auto-captions exist but get names and Bangla wrong; burn in
  your own.

## Loudness

Most platforms turn loud uploads down to a common level, so loudness
gains nothing; clarity does.

- **Video and music**: about −14 LUFS integrated, peaks below −1 dBTP
  (YouTube, Spotify and most social as published by audio guides).
- **Podcasts**: about −16 LUFS (Apple Podcasts' guidance), peaks below
  −1 dBTP; −14 also works on Spotify.
- **Never clip.** A voice that's clear at a phone's speaker matters more
  than the number.

## Posting

- Title and caption: the hook again in words, what it is, one ask; a few
  relevant hashtags at most.
- A series: the same title format ("Arunima-1 · Ep 2 · …") and posting day.
- Post only on the person's yes, from their account, through the
  browser they're signed into.

## What this means in VertX

- `new {preset}` from the table; `look` at frames to check the safe zone
  (VertX doesn't draw platform overlays yet; judge by the margins above).
- `export` is H.264 MP4 at the project's size.
- Can't do yet: a loudness target for the mix, platform overlay previews,
  cover/thumbnail export (make a `picture` for the cover).
