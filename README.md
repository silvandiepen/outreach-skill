# Outreach Skill

Codex skill for running evidence-backed outreach work in the Outreach app at `https://outreach.hakobs.com`.

It is standalone and does not depend on any other skill. It includes first-customer research guidance for evidence-backed prospect discovery from public signals.

## Install

With npx from GitHub:

```bash
npx github:silvandiepen/outreach-skill
```

Replace an existing install:

```bash
npx github:silvandiepen/outreach-skill -- --force
```

Install into your Codex skills directory:

```bash
git clone https://github.com/silvandiepen/outreach-skill.git
mkdir -p ~/.codex/skills
cp -R outreach-skill$outreach ~/.codex/skills$outreach
```

Or, with the Codex skill installer:

```bash
python3 ~/.codex-account1/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo silvandiepen/outreach-skill \
  --path outreach
```

Restart Codex after installing.

## Usage

```text
$outreach Do outreach for this product: https://example.com. Here is my Outreach API key: <key>.
Find 20 high-fit prospects, log investigations and sources, discover public contact paths, create ready-to-send review drafts, but do not send.
```

The skill never stores API keys. Provide the key per task or set `OUTREACH_API_KEY` in the runtime environment.

Codex skills are invoked with `$outreach`. A slash command like `/outreach` only works in clients that explicitly map slash commands to skills.

## Safety Defaults

- Public-source research only.
- No private enrichment or sensitive personal data.
- Drafts are reviewable by default.
- No email sending unless explicitly authorized.
- Outreach remains the system of record for investigations, sources, drafts, statuses, and plans.
