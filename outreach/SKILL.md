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
2. List projects. Match by id, name, website, or user-provided target.
3. If no project exists and the user asked to set up one, create it with project details and sender identity.
4. Inspect project prospects, templates, plans, drafts, events, settings, inbound emails, and integrations as needed.
5. Define the ICP, adjacent ICP, positive signals, disqualifiers, pain triggers, and timing triggers.
6. Research prospects with current public sources. Read `references/first-customer-research.md` before deep prospect discovery.
7. For every meaningful finding, add an investigation with summary, findings, sources, and discovered contact if found.
8. Add or update prospects with contact info, fit score, why-fit, angle, ask, notes, and status.
9. Create a plan when the work is multi-step or the user asked an agent to run a campaign.
10. Create drafts for review. Use persisted draft endpoints, not direct send, unless the user explicitly authorizes sending.
11. End with a concise report: project id, prospects added/updated, investigations logged, drafts created, statuses changed, blockers.

## References

- Read `references/api.md` when making API calls, writing a handoff prompt, or debugging an Outreach workflow.
- Read `references/first-customer-research.md` when asked to find prospects, design partners, early adopters, first customers, public pain signals, or investigation targets.

## Example User Invocation

```text
/outreach Do investigations for Luys. Here is my Outreach API key: <key>.
Find 20 high-fit prospects, log investigations and sources, create draft outreach, but do not send.
```

## Minimal cURL Pattern

```bash
curl https://outreach.hakobs.com/api/projects \
  -H "Authorization: Bearer ${OUTREACH_API_KEY}"
```
