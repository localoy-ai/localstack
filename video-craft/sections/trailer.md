# Product demos and trailers

A 15–60 s piece that makes someone want a product: a launch trailer, a
feature demo, a site hero video, a LinkedIn or ad cut. What makes the good
ones (Apple, Linear, Arc, Raycast launch films) look expensive is not
effects everywhere; it is **real product in motion, cut to music, framed by
a few big, confident motion-graphic beats**.

## Before anything: know the product

- Read the site and docs first (browser, web_extract). Write down the
  promise in the product's own words (its hero line), who it is for, and
  4–6 features, each with where you saw it. Never invent a feature.
- Take the brand from the site: its accent colour, its typeface (read it
  with the browser), its logo file. One accent colour, used sparingly.
- Pick the **3–5 features a viewer will remember**. A feature you can
  *show happening* beats one you can only name.

## The shape (30 s; scale it)

| Time | Beat | What's on screen |
|---|---|---|
| 0–3 s | Hook | A title slam of the promise, or the most striking real moment. Never a logo first. |
| 3–6 s | The world | Kinetic words that frame the problem or the shift ("One app. Ten agents. Your computer."). |
| 6–24 s | Features | 3–5 beats of ~4 s: real footage of it happening, its name as a lower third or callout, a sound on every cut. |
| 24–27 s | Proof / build | A counter, a quick montage of the best moments, faster cuts. |
| 27–30 s | Logo + ask | Logo reveal or end card: the address and one action. Music lands. |

## Real footage, filmed right

- **vertx tour** for a page: a smooth scroll down a section, full
  size. Tour the part that shows the feature, 4–8 s, then trim.
- **vertx record** … **stop** for something happening (you work in the tab with the browser tool meanwhile): typing a request, clicking through,
  a result appearing. Work slowly and deliberately while it records: a
  viewer must follow every move. Hold on the result for a second
  (browser wait) before stopping.
- Film each feature as its own short clip with a clear name
  (clips/browser-typing.mp4). Don't record one long take.
- Wide footage in a tall frame: crop to the action (focus) or blur fill;
  text must read on a phone.
- The person's own app is filmed through its web pages or a live demo the
  site offers; never film private chats, inboxes or accounts.

## Motion graphics: designing your own scenes

Every company's trailer should look like that company, so there are no
stock designs: you design each scene from the brand, and VertX renders it.
A scene is a small HTML page; `vertx scene {file}` films it frame by
frame at the project's size (every animation frozen at each frame's exact
time, so it is perfectly smooth).

**Start from the brand, once.** Read the site's colours and typeface (the
browser can read its CSS), and save its logo into the folder. Write them
once into `scenes/brand.css` (colour variables, the typeface link, the
type scale, a few shared keyframes), and link it from every scene. Each
scene page is then 15–30 lines: its words and its own motion.

**The beats a trailer uses** (shape each one to the brand):
- *Title hit*: the promise in 2–6 words, arriving with force (from large
  and blurred to sharp, or cut in on a flash), then settling and drifting.
- *Kinetic type*: short lines replacing each other on the beat, one idea
  each; the key word in the accent.
- *Feature label* (overlay): the feature's name and one line, entering
  from an edge over its footage, leaving before the cut.
- *Pointer* (overlay): a line or ring drawing to one thing in the footage
  that a viewer would otherwise miss.
- *Hero product shot*: footage or a screenshot inside a frame (a window, a
  phone) turning slowly in 3D space with light behind it.
- *Proof*: one number counting up, or a row of logos or quotes.
- *Sting*: the logo arriving with light (a bloom, a sheen, a glow).
- *End card*: logo, the address, one action; everything else gone.

**How to design and write them**: `motion-design.md` (timing, easing,
hierarchy, kinetic type, logos, data, and how to write a scene page that
renders exactly).

**Taste**: big type, few words, dark space, one accent. Every scene earns
its seconds: a hook, a feature name, proof or the ask; else cut it.

## Work fast: say little, batch everything

A trailer is a few dozen tool calls, not hundreds of lines of writing. The
model's writing is the slow part (a 30 s trailer once took 30 minutes,
most of it writing).

- **Plan short**: the beat table and the copy, nothing more. Update the
  plan by ticking a phase (`patch_file` on one line), never by rewriting
  it. No separate notes file.
- **Film in one pass**: every `tour` and `record` back to back, then build.
- **Write scenes small**: brand.css once, then each scene page short;
  write all the scene pages in one step, render them all in the next.
- **Batch**: send all the `add`s, all the `scene`s and all the `sfx` of a
  pass together in one step, not one per step.
- **Check once**: one `look` at 6–8 times across the cut (the middle of
  each scene and transition), fix what is wrong in one batch, export.
- No terminal for media work: VertX does cutting, scaling and rendering.
- Keep replies to the person to a few lines: what was made, where, what it
  cost.

## Sound carries a trailer

- Music decides the cut: find its beats (`beats`) and put every cut and
  every title on one; the logo lands on the drop or the last hit.
- A riser before the hook and before the logo; an impact or boom when a
  title slams; whooshes on transitions; pops on callouts; ticks under a
  counter.
- **Music and voice cost money**: estimate first and ask the person. A
  voice-over is optional; a trailer reads fine with titles, music and
  sound design alone. Without music, carry the rhythm with sfx and cuts.

## Edit like a trailer

- Cuts get faster toward the end (4 s → 2 s → 1 s), then a held logo.
- Transitions: one family (whips or quick dissolves) plus a flash on the
  big hits; most joins are hard cuts on the beat.
- One grade over everything (`edit {id: "video"}`), a little grain.
- Check: `look` at the middle of every scene and every transition; watch
  the export once start to finish; fix anything unreadable or late.

## What this means in VertX and the browser

- vertx `tour {url, seconds, screens, name}`, `record {url}` … (browser
  steps) … `stop {name}` → clips/ in the folder, in the project's shape.
- vertx `scene {file, seconds, at, overlay, layer}` renders your scene page; `add` puts footage; `keys`, `focus`, `fit: "blur"`,
  `transition`, `sfx`, `beats`, `grade` finish it.
