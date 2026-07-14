# Outreach Reporting

Use this reference when the user asks for a full report, audit, summary, export, project health check, pipeline review, or data-backed status update.

## Report-Only Contract

- Read data first; do not write records during reporting unless the user explicitly asks.
- Do not approve, regenerate, send, delete, or change statuses as a side effect of a report.
- If the user asks to save the report, ask where: final answer, local markdown file, project document, event/note, or plan.
- Distinguish facts from Outreach from external public research.
- Include source URLs for external research and for investigations already stored with sources.

## Scope Resolution

Resolve these before collecting a large amount of data:

- Project identity: exact project id, normalized name, website, repo, or local folder.
- Report type: full report, pipeline report, prospect report, contact coverage report, draft/send report, inbox report, or integration report.
- Data source: Outreach data only, or Outreach plus fresh public research.
- Timeframe: all-time by default, otherwise requested dates.
- Output destination: final answer by default.

If scope is unclear but there is only one likely project match, proceed and state the assumption.

## Collection Plan

Use `references/api.md` for endpoint details. For a full report, collect:

1. `GET /projects`, then match the project.
2. `GET /projects/:projectId`.
3. `GET /settings` and `GET /projects/:projectId/settings`.
4. `GET /projects/:projectId/documents`.
5. `GET /projects/:projectId/prospects`.
6. `GET /projects/:projectId/templates`.
7. `GET /projects/:projectId/plans`.
8. `GET /projects/:projectId/drafts`.
9. `GET /projects/:projectId/events`.
10. `GET /projects/:projectId/inbound-emails`.
11. `GET /projects/:projectId/integrations`.
12. `GET /projects/:projectId/prospects/:prospectId/investigations` for the relevant prospects.

Fetch investigations for all prospects when the user asks for a full report, source coverage, evidence audit, contact provenance, or appendix data. For short summaries, fetch only top-fit prospects, prospects with contacts, prospects with drafts, and stale/high-risk records.

## Normalization

Build in-memory indexes:

- Prospects by id, normalized name, canonical URL/domain, lowercased contact, status, category, type, and fit score.
- Investigations by prospect id and source URL.
- Drafts by prospect id, status, delivery status, template id, created date, approved date, sent date, and feedback.
- Events by type, prospect id, and date.
- Inbound emails by status, sender, recipient, subject, received date, and project assignment.
- Integrations by provider, status, and capability.

Treat empty strings as missing. Parse JSON strings in `sources`, `payload`, `capabilities`, `config`, and `sendResult` when possible; if parsing fails, quote them as raw values in the appendix.

## Metrics

Calculate useful counts:

- Total prospects, by status, type, category, platform, and fit score bucket.
- Contact coverage: direct email, role inbox, form/profile/social, missing contact.
- Investigation coverage: prospects with at least one investigation, source count, stale or missing sources.
- Draft coverage: proposed, approved, rejected, sent; drafts per prospect; drafts with feedback.
- Delivery: accepted, delivered, bounced, complained, failed, opened, clicked, unknown.
- Replies: new, processed, assigned/unassigned inbound emails.
- Plans: proposed, approved, rejected, done; overdue or in-progress steps when due dates exist.
- Data quality: duplicates, missing URLs, missing contacts, missing ask/angle/whyFit, stale `lastContacted`.

## Report Shape

Use this structure unless the user requests another format:

```text
Report: <Project Name>
Last generated: <ISO date/time or local date/time>
Data source: Outreach only | Outreach + public research

1. Executive Summary
2. Project Snapshot
3. ICP, Positioning, and Philosophy
4. Pipeline Overview
5. Highest-Fit Prospects
6. Contact Coverage
7. Investigation and Source Coverage
8. Draft, Approval, Send, and Delivery Status
9. Inbox and Replies
10. Plans, Tasks, and Integrations
11. Risks and Blockers
12. Recommended Next Actions
13. Appendix: Data Tables
```

Keep the executive summary short and decision-oriented. Put raw rows and long evidence lists in the appendix.

## Data Tables

Include compact tables when useful:

- Prospects: id, name, type/category, status, fit score, contact coverage, last contacted, draft status, investigation count.
- Top prospects: name, why fit, angle, ask, contact path, evidence/source count, next action.
- Drafts: id, prospect, status, delivery status, created, approved, sent, feedback summary.
- Inbox: from, subject, status, received, notes, likely prospect/project link.
- Integrations: provider, label, status, capabilities, next setup action.

Do not include full email bodies unless the user asks; summarize drafts and cite draft ids.

## External Enrichment

Only browse when the user asks for fresh research, when Outreach data is too thin to answer, or when validating stale/high-value prospects. When browsing:

- Prefer primary sources: official site, docs, GitHub, company pages, public profiles, press pages, submission/contact pages.
- Cite URLs.
- Mark contact details as public and note confidence.
- Do not scrape private sources, infer personal emails, or use sensitive personal data.
- Do not save new findings to Outreach unless explicitly asked.

## Final Recommendations

Recommendations should be actionable:

- "Approve these drafts" with draft ids.
- "Research these prospects" with prospect ids and missing fields.
- "Create drafts for these prospects" only when contact/evidence is sufficient.
- "Do not send yet" when contacts, sender settings, compliance, or evidence are incomplete.
- "Clean duplicates" with exact duplicate candidates.
- "Configure integration" with provider and missing configuration.
