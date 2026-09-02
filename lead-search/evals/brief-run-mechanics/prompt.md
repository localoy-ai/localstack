---
name: "Brief present: consumes it and writes a well-formed leads CSV"
tags: ["paid", "network"]
runs: 2
max_turns: 30
timeout_seconds: 900
allowed_tools: ["Bash", "Read", "Write", "WebSearch", "WebFetch"]
---

Run lead-search against the newest brief in this workspace. Target 3 leads.
I confirm the brief — use it as-is, do not ask me anything.
