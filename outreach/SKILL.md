---
name: outreach
description: "Use when the user invokes $outreach or asks Codex to run evidence-backed outreach work or build Outreach reports in the Outreach platform at outreach.hakobs.com. Supports read-only project reports, project setup, project discovery from a website/repo/local folder, prospect research, public contact discovery, deduplication, investigation logging, fit scoring, plans, ready-to-send review drafts, and outreach status updates through a user-supplied Outreach API key. This skill contains no secrets; require the user to provide the API key or set OUTREACH_API_KEY at runtime."
---

# Outreach

Use Outreach as the system of record for outreach work. The app is at `https://outreach.hakobs.com`; the API base is `https://outreach.hakobs.com/api`.

Never invent, store, print, or commit API keys. The user must provide the key in the prompt or as `OUTREACH_API_KEY`. Use it only as `Authorization: Bearer <key>`.

## Operating Rules

- Use the API for structured work and the website for visual checks.
- If the user asks for a report, audit, summary, export, or "full report with data", use report-only mode unless they explicitly ask you to write changes.
- Report-only mode must not create, update, delete, approve, regenerate, or send records unless the user separately authorizes that action.
- Check whether the project already exists before creating it.
- With an API key, inspect existing project records before creating anything; avoid duplicate projects, prospects, investigations, plans, and drafts.
- Log research in Outreach, not only in private notes.
- For investigations, browse current public sources and record URLs.
- Treat contact discovery as part of investigations: find a respectful public/professional contact path and log the source.
- Add prospects only when there is enough evidence to justify fit.
- Treat prospects as hypotheses based on public signals, not confirmed customers.
- Create ready-to-send, reviewable drafts by default. Do not send email unless the user explicitly says to send.
- Keep statuses current: `new`, `researched`, `needs_approval`, `sent`, `follow_up_due`, `no_response`.
- Use the sender identity from existing project settings/templates. If creating a project and no sender is known, ask for `defaultFrom` and `replyTo`; do not ask for email-provider credentials.

## Standard Workflow

1. Extract the API key and task scope from the user request. If no key is supplied and `OUTREACH_API_KEY` is absent, ask for it.
2. If the request is report-like, run Report Mode below and stop there unless the user explicitly asks for follow-up writes.
3. Resolve product context from any supplied website, repo URL, or local folder. Inspect public website/repo/local docs before asking questions.
4. List projects. Match by id, name, website, repo, local folder name, or user-provided target.
5. If no project exists and the user asked to set up one, create it only after enough product context is known.
6. Inspect project prospects, documents, templates, plans, drafts, events, settings, inbound emails, and integrations as needed.
7. Build a dedupe map from existing records before writing new data. See `references/api.md` and `references/first-customer-research.md`.
8. Run the startup clarification checklist below when logging/saving behavior is not already clear.
9. Define the ICP, adjacent ICP, positive signals, disqualifiers, pain triggers, and timing triggers.
10. Extract the project philosophy: positioning, values, tone, what the project refuses to do, and the best reason a prospect should care.
11. Research prospects with current public sources. Read `references/first-customer-research.md` before deep prospect discovery.
12. For every meaningful finding, add or update an investigation with summary, findings, sources, discovered contact if found, and contact confidence.
13. Prefer direct professional email when it is publicly listed for outreach. If not found, use role inbox, contact form, public social profile, or other respectful channel and record the limitation.
14. Add or update prospects with contact info, category, fit score, why-fit, angle, ask, notes, and status.
15. Create a plan when the work is multi-step or the user asked an agent to run a campaign and no equivalent active plan exists.
16. Create ready-to-send drafts using project philosophy, prospect details, cited investigation evidence, project documents, and settings. Do not create a duplicate draft for the same prospect/angle. Use persisted draft endpoints unless the user explicitly authorizes direct send.
17. End with a concise report: project id, prospects added/updated, contacts found, investigations logged, drafts created, statuses changed, skipped duplicates, blockers.

## Report Mode

Use this when the user asks to build a report, audit, summarize, export, inspect status, show pipeline data, or produce a full report with data.

1. Resolve the report scope: project id/name/website/repo, timeframe if supplied, and whether to use Outreach data only or include public enrichment.
2. Read `references/reporting.md` and `references/api.md`.
3. Fetch projects and match the target before doing project-specific calls.
4. Collect available data: project details, account settings, project settings, documents, prospects, investigations per relevant prospect, templates, plans and steps, drafts, events, inbound emails, and integrations.
5. Normalize and deduplicate records in memory. Distinguish Outreach data from external research.
6. If public enrichment is requested or necessary for context, browse current public sources and cite URLs in the report. Do not add those findings to Outreach unless asked.
7. Produce a structured report with executive summary, project snapshot, ICP/philosophy, pipeline by status/category, highest-fit prospects, contact coverage, investigation/source coverage, draft/review/send status, inbound replies, integrations, risks/blockers, recommended next actions, and appendix tables.
8. Include "last generated" with date/time and data caveats: missing contact paths, stale investigations, bounced/failed delivery status, unprocessed inbox items, or records without sources.
9. Ask before saving the report back anywhere. If the user asks to save it, clarify destination: final answer, local markdown file, project document, event/note, or plan.

## Dedupe Rules

Before creating data, fetch existing records for the project and prefer update/merge over create.

Project match:

- same id
- same normalized name
- same website/repo/local-folder identity

Prospect match:

- same canonical URL/domain
- same contact value
- same normalized name plus same platform/type
- same organization/publication/person discovered from the same source

Investigation match:

- same prospect and same source URL
- same prospect and materially same summary/findings

Draft match:

- same prospect and same template/subject/angle
- existing `proposed` or `approved` draft should usually be updated, not duplicated

Plan match:

- same project/prospect scope and same goal
- active `proposed` or `approved` plan should be updated or extended, not duplicated

When a duplicate is found:

- update missing fields, better contact info, stronger fit score, new sources, and notes
- append new evidence instead of overwriting useful prior notes
- record in the final report that the record was updated/skipped as duplicate
- do not create a new prospect just because the contact changed; update the existing prospect contact and investigation

## Startup Clarification

When the user says something broad like `$outreach Do outreach for this product` and provides a website, repo, or local folder, first infer what you can, then ask only for missing choices that materially affect what gets written to Outreach.

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
- **Contact policy**: direct public email only, role inbox/contact form acceptable, or social/profile channel acceptable.
- **Channels**: email only, public community channels, social platforms, partnerships, press, or mixed.
- **Exclusions**: geographies, industries, competitors, sensitive categories, or contacts to avoid.

Use this default if the user does not answer and reasonable progress is possible:

- Goal: first customers/design partners.
- Volume: 10 prospects.
- Save policy: only save prospects with cited public evidence; mention skipped weak leads in the final report, not as prospects.
- Logging depth: one investigation with sources per saved prospect.
- Contact policy: use public professional email when available; otherwise save the best respectful public channel and note the limitation.
- Draft policy: create proposed ready-to-send drafts for the top prospects only when a contact path exists and a template/project voice is available.
- Send boundary: do not send.

Example clarification:

```text
I found or can create the project. Before I write records into Outreach, confirm:
1. Target: first customers/design partners, press, or another audience?
2. Save policy: only high-confidence prospects, or also save weak leads as notes?
3. Output: investigations only, or investigations plus reviewable drafts?
Default if you do not care: 10 first-customer/design-partner prospects, save only cited high-confidence prospects, log one investigation each, draft top matches, do not send.
```

## References

- Read `references/api.md` when making API calls, writing a handoff prompt, or debugging an Outreach workflow.
- Read `references/first-customer-research.md` when asked to find prospects, design partners, early adopters, first customers, public pain signals, or investigation targets.
- Read `references/reporting.md` when asked to build a report, audit, summary, export, or data view from Outreach.

## Example User Invocation

```text
$outreach Do outreach for this product: https://example.com. This is my API key: <key>.
$outreach Build a full report for this project using Outreach data only. This is my API key: <key>.
```

## Minimal cURL Pattern

```bash
curl https://outreach.hakobs.com/api/projects \
  -H "Authorization: Bearer ${OUTREACH_API_KEY}"
```
