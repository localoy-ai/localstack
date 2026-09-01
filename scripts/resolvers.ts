/**
 * RESOLVERS — maps {{PLACEHOLDER}} / {{PLACEHOLDER:arg}} names in
 * SKILL.md.tmpl files to the text baked into the generated SKILL.md.
 *
 * These exist so the suite's file-management idioms are written once and
 * stay identical across every skill (the gstack model). Behavior changes to
 * an idiom happen here, then `scripts/build.sh` regenerates every SKILL.md.
 */

export type ResolverCtx = { skill: string };
export type ResolverFn = (arg: string | undefined, ctx: ResolverCtx) => string;

function requireArg(name: string, arg: string | undefined, ctx: ResolverCtx): string {
  if (!arg || !arg.trim()) {
    throw new Error(`{{${name}}} in ${ctx.skill} requires an argument`);
  }
  return arg.trim();
}

export const RESOLVERS: Record<string, ResolverFn> = {
  // Newest-input discovery. Canonical order is the {date} filename prefix,
  // never mtime — mtime drifts across copies/rsync and is not authoritative.
  DISCOVER_INPUT: (arg, ctx) => {
    const glob = requireArg('DISCOVER_INPUT', arg, ctx);
    return `\`ls ${glob} 2>/dev/null | sort -rV | head -1\``;
  },

  // Never-overwrite rule for a final artifact path.
  COLLISION_SUFFIX: (arg, ctx) => {
    const p = requireArg('COLLISION_SUFFIX', arg, ctx);
    const dot = p.lastIndexOf('.');
    const suffixed = dot > 0 ? `${p.slice(0, dot)}-2${p.slice(dot)}` : `${p}-2`;
    return (
      `Never overwrite an existing artifact: if \`${p}\` already exists, ` +
      `append a sequence suffix before the extension — \`${suffixed}\`, then ` +
      `\`-3\`… (count the existing matches and add one).`
    );
  },

  // Surface earlier same-slug runs — only when any exist.
  PRIOR_RUNS: (arg, ctx) => {
    const glob = requireArg('PRIOR_RUNS', arg, ctx);
    return (
      `**Prior runs:** \`ls ${glob} 2>/dev/null | sort -rV\` — if anything ` +
      `matches, tell the user what already exists (one line per file: date ` +
      `and filename) before proceeding; earlier runs are never overwritten. ` +
      `If nothing matches, say nothing and continue.`
    );
  },

  // Per-run scratch directory convention.
  WORK_DIR: () =>
    `Scratch for this run lives in \`work/{date}-{slug}/\` — one directory ` +
    `per run, so a new run never clobbers an earlier one. Scratch is ` +
    `disposable; old \`work/\` run directories may be deleted freely.`,
};
