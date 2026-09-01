#!/usr/bin/env bun
/**
 * Generate SKILL.md files from SKILL.md.tmpl templates (the gstack model).
 *
 * Pipeline: read .tmpl → resolve {{PLACEHOLDERS}} via RESOLVERS → write .md
 * next to the template, with a generated-file marker injected into the
 * frontmatter.
 *
 * --dry-run: generate to memory and exit 1 if any committed SKILL.md differs
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
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(ROOT, e.name, 'SKILL.md.tmpl'))
    .filter((p) => fs.existsSync(p))
    .sort();
}

function render(tmplPath: string): string {
  const skill = path.basename(path.dirname(tmplPath));
  const src = fs.readFileSync(tmplPath, 'utf-8');
  const body = src.replace(TOKEN, (_m, name: string, arg?: string) => {
    const resolver = RESOLVERS[name];
    if (!resolver) {
      throw new Error(`Unknown placeholder {{${name}}} in ${skill}/SKILL.md.tmpl`);
    }
    return resolver(arg, { skill });
  });
  // Inject the generated-file marker as the first line inside the YAML
  // frontmatter (a YAML comment — every runtime's parser ignores it).
  if (!body.startsWith('---\n')) {
    throw new Error(`${skill}/SKILL.md.tmpl must start with YAML frontmatter (---)`);
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
  const outPath = path.join(path.dirname(tmpl), 'SKILL.md');
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
      `stale (SKILL.md differs from its template):\n  ${stale.join('\n  ')}\n` +
        'Run scripts/build.sh to regenerate.'
    );
    process.exit(1);
  }
  console.log(`fresh: ${templates.length} generated SKILL.md files match their templates.`);
}
