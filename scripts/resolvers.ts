/**
 * RESOLVERS — maps {{PLACEHOLDER}} / {{PLACEHOLDER:arg}} names in
 * SKILL.md.tmpl files to the text baked into the generated SKILL.md.
 *
 * These exist so the suite's file-management idioms are written once and
 * stay identical across every skill. Behavior changes to
 * an idiom happen here, then `scripts/build.sh` regenerates every SKILL.md.
 *
 * v0.9.0 — standard files. A working folder holds files any agent already
 * understands (AGENTS.md, PLAN-<topic>.md, TODOS.md, CHANGELOG.md,
 * DESIGN.md) plus one living lead list per topic (leads-<topic>.csv),
 * instead of one private folder per pipeline stage. Files are updated in
 * place; CHANGELOG.md and git keep the history.
 */

export type ResolverCtx = { skill: string };
export type ResolverFn = (arg: string | undefined, ctx: ResolverCtx) => string;

function requireArg(name: string, arg: string | undefined, ctx: ResolverCtx): string {
  if (!arg || !arg.trim()) {
    throw new Error(`{{${name}}} in ${ctx.skill} requires an argument`);
  }
  return arg.trim();
}

/** The one lead list's columns, in order. Stages fill their own columns in
 *  place on the same rows; the first eight are lead-search's, unchanged
 *  since v0.2 so older readers still parse them.
 *    search (or an imported file) → the first eight
 *    qualify, "check & fill"       → Verdict … Verified Date, Channel, Channel Evidence
 *    reach                         → Reached, Reached Channel
 *    export (optional hand-off)    → Exported
 *    Notes                         → an imported file's columns that fit nowhere else */
export const LEADS_HEADER =
  'Company Name,Location,Website,Decision Maker Name,Title,Profile URL,Evidence URL,Confidence,' +
  'Verdict,Verdict Reason,Verification URL,Verified Date,Channel,Channel Evidence,' +
  'Reached,Reached Channel,Exported,Notes';

/** The steps a PLAN's checklist tracks, in chain order. Export is not one:
 *  it is an optional hand-off, run only when the list goes to someone else. */
export const STEPS = ['search', 'qualify', 'draft', 'reach', 'retro'];

export const RESOLVERS: Record<string, ResolverFn> = {
  // Which topic this run works on. A topic is one piece of sales work
  // ("austin-dentists"): its PLAN, its lead list, its lines in the log.
  PICK_TOPIC: () =>
    'Pick the topic: `ls PLAN-*.md 2>/dev/null`. If the user named a topic, ' +
    'use `PLAN-<topic>.md`. If exactly one PLAN exists, use it. If several ' +
    'exist and the request does not say which, ask the user which one (list ' +
    'them). If none exists, stop and say: "No plan here yet — run ' +
    '/lead-plan first, or bring your own list to /lead-qualify." The ' +
    'topic is the part between `PLAN-` and `.md`; every other file for it ' +
    'uses the same topic: `leads-<topic>.csv`.',

  // A domain this folder has already dealt with — never found, drafted or
  // contacted again.
  ALREADY_HANDLED: () =>
    'A lead is **already handled** when its canonical domain (strip `www.`, ' +
    'lowercase) has a `Reached` or `Exported` value in any `leads-*.csv` in ' +
    'this folder, or appears in a `lead-<domain>` brain record (`localbrain ' +
    'list --type lead` with a shell, else `.brain/context.md` if it exists).',

  // The full header of the one lead list.
  LEADS_HEADER: () => '`' + LEADS_HEADER + '`',

  // How every skill keeps the standard files. The argument is the step this
  // skill ticks in the PLAN's checklist ("none" for skills outside it).
  STANDARD_FILES: (arg, ctx) => {
    const step = requireArg('STANDARD_FILES', arg, ctx);
    const tick =
      step === 'none'
        ? ''
        : `- **PLAN-<topic>.md** — in \`## Steps\`, tick \`- [x] ${step}\` ` +
          `(add today's date after it) once this step is done; leave it ` +
          `unticked if you stopped partway, and say why in CHANGELOG.md.\n`;
    return (
      `**Standard files.** This folder is kept in files any agent already ` +
      `reads. Update them in place; never scatter output into new folders.\n` +
      `- **AGENTS.md** — create it if missing. localstack owns only the ` +
      `block between \`<!-- localstack:start -->\` and ` +
      `\`<!-- localstack:end -->\`; rewrite that block, never anything ` +
      `outside it. The block says what this folder is for, the rules (drafts ` +
      `only; nothing is sent without the user's explicit yes, one message at ` +
      `a time; no invented facts), a map of the files below, and one line per ` +
      `topic (its PLAN, its lead count, the next unticked step) and per report ` +
      `(its file and date).\n` +
      tick +
      `- **CHANGELOG.md** — create it if missing (\`# Changelog\`). Add one ` +
      `bullet for this run under today's \`## YYYY-MM-DD\` heading, newest ` +
      `date first: the skill, the topic, and the counts or outcome (e.g. ` +
      `\`- lead-search austin-dentists: 18 found, 3 skipped as already ` +
      `contacted\`).\n` +
      `- **TODOS.md** — create it if missing (\`# TODOs\`). Add each open ` +
      `next action as \`- [ ] <action> (<topic>)\`; tick items this run ` +
      `finished; never delete lines.\n` +
      `- **DESIGN.md** — decisions meant to last (positioning, tone, ` +
      `channels to use or avoid). Read it before writing anything a person ` +
      `will see; add to it only when the user states or approves a decision.`
    );
  },

  // Per-run scratch directory convention.
  WORK_DIR: () =>
    `Scratch for this run lives in \`.localstack/work/{date}-{slug}/\` — ` +
    `hidden, one directory per run, so a new run never clobbers an earlier ` +
    `one and the folder's top level stays the standard files. Scratch is ` +
    `disposable; old run directories may be deleted freely.`,
};
