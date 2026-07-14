---
name: outreach
description: "Use when the user invokes /outreach or asks Codex to manage the Outreach platform at outreach.hakobs.com: create or update outreach projects, research/investigate prospects, find evidence-backed first customers, add prospects, log sources and findings, create plans, create reviewable drafts, update outreach statuses, or use an Outreach API key supplied by the user. This skill does not contain secrets; require the user to provide the API key or set OUTREACH_API_KEY at runtime."
---

# Outreach

Use Outreach as the system of record for outreach work. The app is at `https://outreach.hakobs.com`; the API base is `https://outreach.hakobs.com/api`.

Never invent, store, print, or commit API keys. The user must provide the key in the prompt or as `OUTREACH_API_KEY`. Use it only as `Authorization: Bearer <key>`.

## Operating Rules

- Use the API for structured work and the website for visual checks.
- Check whether the project already exists before creating it.
- Log research in Outreach, not only in private notes.
- For investigations, browse current public sources and record URLs.
- Add prospects only when there is enough evidence to justify fit.
- Treat prospects as hypotheses based on public signals, not confirmed customers.
- Create reviewable drafts by default. Do not send email unless the user explicitly says to send.
- Keep statuses current: `new`, `researched`, `needs_approval`, `sent`, `follow_up_due`, `no_response`.
- Use `sil@hakobs.com` identity only through existing project settings/templates; do not ask for Resend or Cloudflare credentials.

## Standard Workflow

1. Extract the API key and task scope from the user request. If no key is supplied and `OUTREACH_API_KEY` is absent, ask for it.
2. Resolve product context from any supplied website, repo URL, or local folder. Inspect public website/repo/local docs before asking questions.
3. List projects. Match by id, name, website, repo, local folder name, or user-provided target.
4. If no project exists and the user asked to set up one, create it only after enough product context is known.
5. Inspect project prospects, templates, plans, drafts, events, settings, inbound emails, and integrations as needed.
6. Run the startup clarification checklist below when logging/saving behavior is not already clear.
7. Define the ICP, adjacent ICP, positive signals, disqualifiers, pain triggers, and timing triggers.
8. Research prospects with current public sources. Read `references/first-customer-research.md` before deep prospect discovery.
9. For every meaningful finding, add an investigation with summary, findings, sources, and discovered contact if found.
10. Add or update prospects with contact info, fit score, why-fit, angle, ask, notes, and status.
11. Create a plan when the work is multi-step or the user asked an agent to run a campaign.
12. Create drafts for review. Use persisted draft endpoints, not direct send, unless the user explicitly authorizes sending.
13. End with a concise report: project id, prospects added/updated, investigations logged, drafts created, statuses changed, blockers.

## Startup Clarification

When the user says something broad like `/outreach Do outreach for Luys` and provides a website, repo, or local folder, first infer what you can, then ask only for missing choices that materially affect what gets written to Outreach.

Do not ask for information that can be discovered from:

- the supplied website
- the supplied GitHub repo
- the supplied local folder
- the existing Outreach project
- project templates/settings/plans/drafts/events already in Outreach

If key choices are missing, ask a compact set of questions before writing lots of records. Prefer one grouped question with defaults.

Ask about:

- **Goal**: first customers, design partners, press/reviewers, partnerships, sales leads, hiring/customer discovery, or another target.
- **Volume**: how many prospects/investigations/drafts to create.
- **Save policy**: save only high-confidence prospects, save weak leads as skipped notes/events, or save everything with confidence labels.
- **Logging depth**: minimal source summary, full investigation per prospect, or plan + investigations + drafts.
- **Draft policy**: create drafts for every qualified prospect, only top prospects, or no drafts.
- **Send boundary**: default to never send unless explicitly authorized.
- **Channels**: email only, public community channels, social platforms, partnerships, press, or mixed.
- **Exclusions**: geographies, industries, competitors, sensitive categories, or contacts to avoid.

Use this default if the user does not answer and reasonable progress is possible:

- Goal: first customers/design partners.
- Volume: 10 prospects.
- Save policy: only save prospects with cited public evidence; mention skipped weak leads in the final report, not as prospects.
- Logging depth: one investigation with sources per saved prospect.
- Draft policy: create proposed drafts for the top prospects only when a template exists or the user asked for drafts.
- Send boundary: do not send.

Example clarification:

```text
I found or can create the Luys project. Before I write records into Outreach, confirm:
1. Target: first customers/design partners, press, or another audience?
2. Save policy: only high-confidence prospects, or also save weak leads as notes?
3. Output: investigations only, or investigations plus reviewable drafts?
Default if you do not care: 10 first-customer/design-partner prospects, save only cited high-confidence prospects, log one investigation each, draft top matches, do not send.
```

## References

- Read `references/api.md` when making API calls, writing a handoff prompt, or debugging an Outreach workflow.
- Read `references/first-customer-research.md` when asked to find prospects, design partners, early adopters, first customers, public pain signals, or investigation targets.

## Example User Invocation

```text
/outreach Do outreach for Luys: https://luys.dev. This is my API key: <key>.
```

## Minimal cURL Pattern

```bash
curl https://outreach.hakobs.com/api/projects \
  -H "Authorization: Bearer ${OUTREACH_API_KEY}"
```
