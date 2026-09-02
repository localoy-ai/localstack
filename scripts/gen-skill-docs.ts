#!/usr/bin/env bun
/**
 * Generate SKILL.md files from SKILL.md.tmpl templates (the gstack model),
 * and section files from <skill>/sections/*.md.tmpl.
 *
 * Pipeline: read .tmpl → resolve {{PLACEHOLDERS}} via RESOLVERS → write .md
 * next to the template, with a generated-file marker injected (into the
 * frontmatter for SKILL.md; as a leading HTML comment for sections, which
 * have no frontmatter).
 *
 * --dry-run: generate to memory and exit 1 if any committed output differs
 * from what its template produces (freshness check; used by install.sh).
 */

import * as fs from 'fs';
import * as path from 'path';
import { RESOLVERS } from './resolvers';

const ROOT = path.resolve(import.meta.dir, '..');
const DRY_RUN = process.argv.includes('--dry-run');
// Arg may contain single-brace tokens like {date}/{slug}; only `}}` ends it.
const TOKEN = /\{\{([A-Z_][A-Z0-9_]*)(?::((?:[^}]|\}(?!\}))+))?\}\}/g;
const MARKER =
  '# GENERATED from SKILL.md.tmpl — edit the .tmpl, then run scripts/build.sh.';

function discoverTemplates(): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const skillTmpl = path.join(ROOT, e.name, 'SKILL.md.tmpl');
    if (fs.existsSync(skillTmpl)) out.push(skillTmpl);
    const sectionsDir = path.join(ROOT, e.name, 'sections');
    if (fs.existsSync(sectionsDir)) {
      for (const s of fs.readdirSync(sectionsDir)) {
        if (s.endsWith('.md.tmpl')) out.push(path.join(sectionsDir, s));
      }
    }
  }
  return out.sort();
}

function isSectionTemplate(tmplPath: string): boolean {
  return path.basename(path.dirname(tmplPath)) === 'sections';
}

function render(tmplPath: string): string {
  const skill = isSectionTemplate(tmplPath)
    ? path.basename(path.dirname(path.dirname(tmplPath)))
    : path.basename(path.dirname(tmplPath));
  const rel = path.relative(ROOT, tmplPath);
  const src = fs.readFileSync(tmplPath, 'utf-8');
  const body = src.replace(TOKEN, (_m, name: string, arg?: string) => {
    const resolver = RESOLVERS[name];
    if (!resolver) {
      throw new Error(`Unknown placeholder {{${name}}} in ${rel}`);
    }
    return resolver(arg, { skill });
  });
  if (isSectionTemplate(tmplPath)) {
    // Sections have no frontmatter; the marker is a leading HTML comment.
    const base = path.basename(tmplPath);
    return `<!-- GENERATED from sections/${base} — edit the .tmpl, then run scripts/build.sh. -->\n${body}`;
  }
  // Inject the generated-file marker as the first line inside the YAML
  // frontmatter (a YAML comment — every runtime's parser ignores it).
  if (!body.startsWith('---\n')) {
    throw new Error(`${rel} must start with YAML frontmatter (---)`);
  }
  return body.replace('---\n', `---\n${MARKER}\n`);
}

let stale: string[] = [];
const templates = discoverTemplates();
if (templates.length === 0) {
  console.error('No SKILL.md.tmpl files found — nothing to generate.');
  process.exit(1);
}

for (const tmpl of templates) {
  const outPath = isSectionTemplate(tmpl)
    ? tmpl.slice(0, -'.tmpl'.length)
    : path.join(path.dirname(tmpl), 'SKILL.md');
  const rendered = render(tmpl);
  const current = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf-8') : '';
  if (rendered === current) continue;
  if (DRY_RUN) {
    stale.push(path.relative(ROOT, outPath));
  } else {
    fs.writeFileSync(outPath, rendered);
    console.log(`generated ${path.relative(ROOT, outPath)}`);
  }
}

if (DRY_RUN) {
  if (stale.length) {
    console.error(
      `stale (generated file differs from its template):\n  ${stale.join('\n  ')}\n` +
        'Run scripts/build.sh to regenerate.'
    );
    process.exit(1);
  }
  console.log(`fresh: ${templates.length} generated files match their templates.`);
}
