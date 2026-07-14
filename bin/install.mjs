#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const args = new Set(process.argv.slice(2));
const force = args.has('--force') || args.has('-f');
const help = args.has('--help') || args.has('-h');

if (help) {
  console.log(`Install the Outreach Codex skill.

Usage:
  npx github:silvandiepen/outreach-skill
  npx github:silvandiepen/outreach-skill -- --force
  OUTREACH_SKILL_DEST=/path/to/skills npx github:silvandiepen/outreach-skill

Options:
  --force, -f   Replace an existing outreach skill directory.
  --help, -h    Show this help.
`);
  process.exit(0);
}

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');
const source = join(repoRoot, 'outreach');

if (!existsSync(source) || !statSync(source).isDirectory()) {
  console.error(`Could not find bundled skill at ${source}`);
  process.exit(1);
}

const skillsRoot = resolveSkillRoot();
const target = join(skillsRoot, 'outreach');

mkdirSync(skillsRoot, { recursive: true });

if (existsSync(target)) {
  if (!force) {
    console.log(`Outreach skill already exists at ${target}`);
    console.log('Run again with -- --force to replace it.');
    process.exit(0);
  }
  rmSync(target, { recursive: true, force: true });
}

cpSync(source, target, { recursive: true });

console.log(`Installed Outreach skill to ${target}`);
console.log('Restart Codex or start a new session, then use:');
console.log('/outreach Do outreach for Luys: https://luys.dev. This is my API key: XXXX.');

function resolveSkillRoot() {
  if (process.env.OUTREACH_SKILL_DEST) return process.env.OUTREACH_SKILL_DEST;
  if (process.env.CODEX_HOME) return join(process.env.CODEX_HOME, 'skills');

  const accountSkills = join(homedir(), '.codex-account1', 'skills');
  if (existsSync(accountSkills)) return accountSkills;

  return join(homedir(), '.codex', 'skills');
}
