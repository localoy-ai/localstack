---
type: llm
criteria: "Open the leads CSV the run produced. Every data row must carry an Evidence URL that is a real page or search a reader could open (never empty, never a fabricated-looking URL), and every field the run could not observe must say UNKNOWN rather than being blank or guessed. Websites must be the company's own domain, not a Yelp/Clutch/Facebook/directory page. Profile URLs, when present, must look like real surfaced URLs (LinkedIn slugs with disambiguators or other profile pages), not constructed /in/first-last guesses. The final chat message must name the brief it consumed by path."
focus: "Evidence URLs present; UNKNOWN used honestly; no aggregator in Website; brief named"
---
