#!/usr/bin/env bun
/**
 * Tier-0 suite lint: deterministic, free, no model calls. Run via
 * scripts/test.sh (which also runs the tmpl freshness check).
 *
 * What it enforces, and why:
 *  - frontmatter shape: the four-dialect superset every runtime parses
 *    (Claude Code, Codex, Hermes, localoy). A bare ": " inside an unfolded
 *    description breaks localoy's YAML parser — that is a release-blocking
 *    class of bug we have shipped before.
 *  - generated-file discipline: SKILL.md and sections/*.md carry the
 *    GENERATED marker exactly when a .tmpl exists.
 *  - sort -rV: plain `sort -r` ranks a `-2` rerun BELOW its base file
 *    (ASCII '-' < '.'), silently feeding stale input to a chain stage.
 *  - sections integrity: manifest, files on disk, and skeleton references
 *    agree in all directions.
 *  - chain wiring: each sales-chain skill still reads and writes the
 *    standard files its neighbours use (PLAN-<topic>.md sections,
 *    leads-<topic>.csv columns) — those names are the whole handoff
 *    mechanism, so a renamed section or column is a broken pipeline.
 *  - standard files: every skill that writes into the working folder keeps
 *    AGENTS.md / CHANGELOG.md / TODOS.md the shared way, and no skill names a
 *    pre-0.9 stage folder (briefs/, reviews/, shipped/ …) outside the one
 *    marked migration block.
 *  - version bumps: a changed skill dir requires a bumped skill version, and
 *    any skill change requires a bumped repo VERSION (installs are pinned by
 *    @publisher/name@version; an unbumped change never reaches users).
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { LEADS_HEADER } from './resolvers';

const ROOT = path.resolve(import.meta.dir, '..');
const failures: string[] = [];
const warnings: string[] = [];
const fail = (msg: string) => failures.push(msg);
const warn = (msg: string) => warnings.push(msg);

function skillDirs(): string[] {
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(ROOT, e.name, 'SKILL.md')))
    .map((e) => e.name)
    .sort();
}

function read(p: string): string {
  return fs.readFileSync(path.join(ROOT, p), 'utf-8');
}

/** SKILL.md body + every generated section body, for content checks. */
function skillCorpus(skill: string): string {
  let corpus = read(`${skill}/SKILL.md`);
  const sec = path.join(ROOT, skill, 'sections');
  if (fs.existsSync(sec)) {
    for (const f of fs.readdirSync(sec)) {
      if (f.endsWith('.md') && !f.endsWith('.md.tmpl')) corpus += '\n' + read(`${skill}/sections/${f}`);
    }
  }
  return corpus;
}

// --- 1. Frontmatter shape ------------------------------------------------

const SEMVER = /^\d+\.\d+\.\d+$/;
for (const skill of skillDirs()) {
  const md = read(`${skill}/SKILL.md`);
  if (!md.startsWith('---\n')) {
    fail(`${skill}/SKILL.md: no YAML frontmatter`);
    continue;
  }
  const end = md.indexOf('\n---', 3);
  const fm = md.slice(4, end < 0 ? undefined : end);
  if (end < 0) fail(`${skill}/SKILL.md: frontmatter never closes`);

  const nameMatch = fm.match(/^name:\s*(\S+)\s*$/m);
  if (!nameMatch) fail(`${skill}/SKILL.md: missing name:`);
  else if (nameMatch[1] !== skill) fail(`${skill}/SKILL.md: name '${nameMatch[1]}' != dir '${skill}'`);

  const verMatch = fm.match(/^version:\s*(\S+)\s*$/m);
  if (!verMatch) fail(`${skill}/SKILL.md: missing version:`);
  else if (!SEMVER.test(verMatch[1])) fail(`${skill}/SKILL.md: version '${verMatch[1]}' is not x.y.z`);

  // localoy parser rule: an UNFOLDED description whose value contains ": "
  // must be folded (>- / >). Folded forms put nothing after the colon.
  const descLine = fm.match(/^description:[ \t]*(.*)$/m);
  if (!descLine) fail(`${skill}/SKILL.md: missing description:`);
  else if (descLine[1] && !/^[>|]/.test(descLine[1]) && descLine[1].includes(': ')) {
    fail(`${skill}/SKILL.md: unfolded description contains ': ' — fold it (>-) or localoy's parser rejects it`);
  }

  for (const key of ['publisher:', 'author:', 'license:', 'platforms:', 'allowed-tools:', 'triggers:', 'description:']) {
    if (!fm.includes(key)) fail(`${skill}/SKILL.md: missing ${key}`);
  }
}

// --- 2. Generated-file discipline ---------------------------------------

const MARKER = 'GENERATED from';
for (const skill of skillDirs()) {
  const tmplExists = fs.existsSync(path.join(ROOT, skill, 'SKILL.md.tmpl'));
  const hasMarker = read(`${skill}/SKILL.md`).includes(MARKER);
  if (tmplExists && !hasMarker) fail(`${skill}/SKILL.md: tmpl exists but no GENERATED marker — run scripts/build.sh`);
  if (!tmplExists && hasMarker) fail(`${skill}/SKILL.md: GENERATED marker but no SKILL.md.tmpl`);
  if (tmplExists && read(`${skill}/SKILL.md.tmpl`).includes(MARKER)) {
    fail(`${skill}/SKILL.md.tmpl: carries the GENERATED marker itself (was a generated file copied over the tmpl?)`);
  }
  const sec = path.join(ROOT, skill, 'sections');
  if (fs.existsSync(sec)) {
    for (const f of fs.readdirSync(sec)) {
      if (!f.endsWith('.md') || f.endsWith('.md.tmpl')) continue;
      const secTmpl = fs.existsSync(path.join(sec, `${f}.tmpl`));
      const secMarker = read(`${skill}/sections/${f}`).includes(MARKER);
      if (secTmpl && !secMarker) fail(`${skill}/sections/${f}: tmpl exists but no GENERATED marker`);
      if (!secTmpl && secMarker) fail(`${skill}/sections/${f}: GENERATED marker but no .tmpl`);
    }
  }
}

// --- 3. sort -rV discipline ----------------------------------------------

for (const skill of skillDirs()) {
  const corpus = skillCorpus(skill);
  for (const m of corpus.matchAll(/sort\s+-[a-zA-Z]+/g)) {
    const flags = m[0].split(/\s+-/)[1];
    if (flags.includes('r') && !flags.includes('V')) {
      fail(`${skill}: '${m[0]}' — reverse sort without -V ranks '-2' reruns below their base file`);
    }
  }
}

// --- 4. Sections integrity -----------------------------------------------

for (const skill of skillDirs()) {
  const sec = path.join(ROOT, skill, 'sections');
  if (!fs.existsSync(sec)) continue;
  const md = read(`${skill}/SKILL.md`);
  const manifestPath = path.join(sec, 'manifest.json');
  let manifestFiles: string[] = [];
  if (!fs.existsSync(manifestPath)) {
    fail(`${skill}/sections: missing manifest.json`);
  } else {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      const entries: any[] = manifest.sections ?? [];
      manifestFiles = entries.map((s) => s.file);
      for (const s of entries) {
        for (const k of ['id', 'file', 'title', 'trigger']) {
          if (typeof s[k] !== 'string' || !s[k]) fail(`${skill}/sections/manifest.json: entry missing ${k}`);
        }
        if (s.file && !fs.existsSync(path.join(sec, s.file))) {
          fail(`${skill}/sections/manifest.json: names ${s.file} which does not exist`);
        }
        if (s.file && !md.includes(`sections/${s.file}`)) {
          fail(`${skill}/SKILL.md: never references sections/${s.file} (manifest entry '${s.id}' is unreachable)`);
        }
      }
    } catch (e) {
      fail(`${skill}/sections/manifest.json: ${(e as Error).message}`);
    }
  }
  for (const f of fs.readdirSync(sec)) {
    if (f.endsWith('.md') && !f.endsWith('.md.tmpl') && !manifestFiles.includes(f)) {
      fail(`${skill}/sections/${f}: on disk but not in manifest.json`);
    }
  }
  // Every sections/X.md the skeleton mentions must exist.
  for (const m of md.matchAll(/sections\/([A-Za-z0-9_-]+\.md)/g)) {
    if (!fs.existsSync(path.join(sec, m[1]))) fail(`${skill}/SKILL.md: references sections/${m[1]} which does not exist`);
  }
}

// --- 5. Chain wiring -----------------------------------------------------

// skill → substrings its corpus (SKILL.md + sections) must contain.
const CHAIN: Record<string, string[]> = {
  'lead-plan': ['PLAN-<topic>.md', '## Steps', '## Disqualifiers', 'Change next time', '/lead-export'],
  'lead-search': ['PLAN-', 'leads-<topic>.csv', LEADS_HEADER, 'Exported'],
  'lead-qualify': ['leads-<topic>.csv', 'Verdict,Verdict Reason,Verification URL,Verified Date', 'Channel Evidence', '## Qualify', '## Disqualifiers', 'Bringing your own file', 'Notes'],
  'lead-draft': ['leads-<topic>.csv', 'Verdict=keep', '## Drafts', 'Status: draft', 'DESIGN.md', 'Channel Evidence'],
  'lead-reach': ['## Drafts', 'Status: draft', 'Status: sent', 'Reached Channel', 'localbrain put'],
  'lead-export': ['leads-*.csv', 'Verdict=keep', 'Exported', '## Export', 'leads-<topic>-export-'],
  'lead-retro': ['PLAN-<topic>.md', 'leads-<topic>.csv', 'CHANGELOG.md', '## Retro', 'Change next time'],
};
for (const [skill, needles] of Object.entries(CHAIN)) {
  if (!fs.existsSync(path.join(ROOT, skill, 'SKILL.md'))) {
    fail(`chain: skill '${skill}' missing entirely`);
    continue;
  }
  const corpus = skillCorpus(skill);
  for (const needle of needles) {
    if (!corpus.includes(needle)) fail(`${skill}: chain wiring lost — expected to find '${needle}'`);
  }
}

// --- 5b. Standard files ----------------------------------------------------

// Skills that write into the working folder must keep the shared files the
// shared way — the STANDARD_FILES resolver's text is the proof.
const WRITES_FOLDER = [
  'lead-plan', 'lead-search', 'lead-qualify', 'lead-draft', 'lead-reach',
  'lead-export', 'lead-retro', 'seo-audit', 'keyword-research', 'on-page-optimizer',
];
for (const skill of WRITES_FOLDER) {
  if (!fs.existsSync(path.join(ROOT, skill, 'SKILL.md'))) continue;
  const corpus = skillCorpus(skill);
  for (const needle of ['<!-- localstack:start -->', 'CHANGELOG.md', 'TODOS.md']) {
    if (!corpus.includes(needle)) fail(`${skill}: standard files not kept — expected '${needle}' (use {{STANDARD_FILES:<step>}})`);
  }
}

// No pre-0.9 stage folder outside the marked migration block. Scratch is
// .localstack/work/, so a bare "work/" is the old layout too.
const LEGACY = /(?<![\w.-])(briefs|leads|reviews|outreach|reached|shipped|retros|reports)\/|(?<![\w./-])work\//;
function stripLegacyBlocks(text: string): string {
  return text.replace(/<!-- legacy-layout[^>]*-->[\s\S]*?<!-- \/legacy-layout -->/g, '');
}
const legacyTargets: string[] = [];
for (const skill of skillDirs()) {
  legacyTargets.push(`${skill}/SKILL.md`);
  const sec = path.join(ROOT, skill, 'sections');
  if (fs.existsSync(sec)) {
    for (const f of fs.readdirSync(sec)) if (f.endsWith('.md') && !f.endsWith('.md.tmpl')) legacyTargets.push(`${skill}/sections/${f}`);
  }
}
for (const d of fs.readdirSync(path.join(ROOT, 'stacks'), { withFileTypes: true })) {
  if (d.isDirectory() && fs.existsSync(path.join(ROOT, 'stacks', d.name, 'STACK.md'))) legacyTargets.push(`stacks/${d.name}/STACK.md`);
}
legacyTargets.push('README.md');
for (const f of legacyTargets) {
  const lines = stripLegacyBlocks(read(f)).split('\n');
  lines.forEach((line, i) => {
    const m = line.match(LEGACY);
    if (m) fail(`${f}: names the pre-0.9 folder '${m[0]}' outside a <!-- legacy-layout --> block — use the standard files`);
  });
}

// --- 6. Version bumps vs origin/main ------------------------------------

function git(args: string): string {
  return execSync(`git ${args}`, { cwd: ROOT, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}
try {
  git('rev-parse --verify origin/main');
  const changed = git('diff --name-only origin/main -- .').split('\n').filter(Boolean);
  const changedSkills = new Set(
    changed.map((f) => f.split('/')[0]).filter((d) => fs.existsSync(path.join(ROOT, d, 'SKILL.md'))),
  );
  for (const skill of changedSkills) {
    const cur = read(`${skill}/SKILL.md`).match(/^version:\s*(\S+)/m)?.[1];
    let old: string | undefined;
    try {
      old = git(`show origin/main:${skill}/SKILL.md`).match(/^version:\s*(\S+)/m)?.[1];
    } catch {
      continue; // new skill — nothing to bump against
    }
    if (cur && old && cur === old) {
      fail(`${skill}: content changed vs origin/main but version is still ${cur} — bump it (installs pin by version)`);
    }
  }
  if (changedSkills.size > 0) {
    let oldRepoVer: string | undefined;
    try {
      oldRepoVer = git('show origin/main:VERSION');
    } catch { /* no VERSION upstream */ }
    const curRepoVer = read('VERSION').trim();
    if (oldRepoVer && oldRepoVer === curRepoVer) {
      fail(`VERSION: skill content changed vs origin/main but repo VERSION is still ${curRepoVer}`);
    }
  }
} catch {
  warn('version-bump guard skipped: origin/main not available');
}

// --- report --------------------------------------------------------------

for (const w of warnings) console.error(`warn: ${w}`);
if (failures.length) {
  console.error(`\nlint-suite: ${failures.length} failure(s)`);
  for (const f of failures) console.error(`  FAIL ${f}`);
  process.exit(1);
}
console.log(`lint-suite: OK — ${skillDirs().length} skills clean`);
