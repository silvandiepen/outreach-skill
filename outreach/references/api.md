# Outreach API Reference

Base URL: `https://outreach.hakobs.com/api`

Auth header:

```text
Authorization: Bearer <OUTREACH_API_KEY>
content-type: application/json
```

Do not persist the key in files. Prefer `OUTREACH_API_KEY` in the shell environment when running commands.

## Project Discovery

List projects:

```bash
curl "$BASE/projects" -H "Authorization: Bearer $OUTREACH_API_KEY"
```

Create project:

```bash
curl -X POST "$BASE/projects" \
  -H "Authorization: Bearer $OUTREACH_API_KEY" \
  -H "content-type: application/json" \
  -d '{
    "name": "Example Product",
    "website": "https://example.com",
    "oneLine": "Short positioning for the product",
    "defaultFrom": "Your Name <you@example.com>",
    "replyTo": "you@example.com",
    "status": "active"
  }'
```

Get/update a project:

```text
GET /projects/:projectId
PUT /projects/:projectId
POST /projects/:projectId/generate-description
```

Before creating a project, list projects and match existing records by id, normalized name, website, repo, or local folder identity.

`generate-description` uses project documents and AI to return `{ "description": "..." }`. It never saves automatically; review and save with `PUT /projects/:projectId` if requested.

## Prospects

```text
GET /projects/:projectId/prospects
POST /projects/:projectId/prospects
PUT /projects/:projectId/prospects/:prospectId
DELETE /projects/:projectId/prospects/:prospectId
```

Create prospect:

```bash
curl -X POST "$BASE/projects/$PROJECT_ID/prospects" \
  -H "Authorization: Bearer $OUTREACH_API_KEY" \
  -H "content-type: application/json" \
  -d '{
    "name": "Jane Doe",
    "type": "publication",
    "category": "press",
    "url": "https://example.com",
    "contact": "jane@example.com",
    "platform": "email",
    "angle": "Why this angle fits",
    "fitScore": 4,
    "whyFit": "Specific evidence-backed fit reason",
    "ask": "review or feedback",
    "status": "new",
    "notes": "Operational notes"
  }'
```

Useful statuses: `new`, `researched`, `needs_approval`, `sent`, `follow_up_due`, `no_response`.

`category` is freeform, for example `press`, `curator`, `community`, `founder`, `agency`, or `partner`.

Before creating prospects, fetch all existing prospects and build a dedupe map:

- canonical URL/domain
- lowercased contact
- normalized name
- name + platform/type
- organization/publication/person source identity

If a match exists, call `PUT /projects/:projectId/prospects/:prospectId` with merged fields instead of `POST`.

## Investigations

Use investigations to log research and sources against a prospect.

```text
GET /projects/:projectId/prospects/:prospectId/investigations
POST /projects/:projectId/prospects/:prospectId/investigations
```

```bash
curl -X POST "$BASE/projects/$PROJECT_ID/prospects/$PROSPECT_ID/investigations" \
  -H "Authorization: Bearer $OUTREACH_API_KEY" \
  -H "content-type: application/json" \
  -d '{
    "summary": "Found a relevant editor and contact path.",
    "findings": "They cover indie iOS apps and recently wrote about puzzle games.",
    "sources": [
      { "url": "https://example.com/article", "note": "Relevant recent coverage" }
    ],
    "discoveredContact": "editor@example.com"
  }'
```

If `discoveredContact` is supplied, Outreach updates the prospect contact and can move a `new` prospect toward researched state. Put contact source, channel type, confidence, and caveats in `findings`, `sources`, and prospect `notes`.

Before creating an investigation, fetch existing investigations for that prospect when available and avoid duplicate source URLs or materially identical summaries.

## Plans

```text
GET /projects/:projectId/plans
POST /projects/:projectId/plans
GET /projects/:projectId/plans/:planId
PUT /projects/:projectId/plans/:planId
PUT /projects/:projectId/plans/:planId/steps/:stepId
```

Plan step types: `research`, `draft`, `send`, `follow_up`, `note`.

Before creating a plan, list active plans and update/extend an equivalent plan with the same project/prospect scope and goal.

## Drafts

Prefer persisted drafts for agent work. Drafts start as `proposed`; sending requires explicit approval. Drafts should be ready to send: concrete recipient/contact path, project philosophy, prospect-specific evidence, clear ask, and no unsupported claims.

```text
GET /projects/:projectId/drafts
POST /projects/:projectId/drafts
PUT /projects/:projectId/drafts/:draftId
DELETE /projects/:projectId/drafts/:draftId
POST /projects/:projectId/drafts/:draftId/regenerate
POST /projects/:projectId/drafts/:draftId/send
```

Create a draft from a template:

```bash
curl -X POST "$BASE/projects/$PROJECT_ID/drafts" \
  -H "Authorization: Bearer $OUTREACH_API_KEY" \
  -H "content-type: application/json" \
  -d '{
    "prospectId": "'"$PROSPECT_ID"'",
    "templateId": "'"$TEMPLATE_ID"'"
  }'
```

Create an AI draft grounded in project details, project documents, prospect fields, investigations, non-secret account/project settings, and the prospect's recent draft feedback:

```bash
curl -X POST "$BASE/projects/$PROJECT_ID/drafts" \
  -H "Authorization: Bearer $OUTREACH_API_KEY" \
  -H "content-type: application/json" \
  -d '{ "prospectId": "'"$PROSPECT_ID"'", "mode": "ai" }'
```

Draft updates accept `status`, `subject`, `body`, and `feedback`. Approval uses `{ "status": "approved" }`; rejection can use `{ "status": "rejected", "feedback": "..." }`.

Regenerate an existing draft with feedback:

```bash
curl -X POST "$BASE/projects/$PROJECT_ID/drafts/$DRAFT_ID/regenerate" \
  -H "Authorization: Bearer $OUTREACH_API_KEY" \
  -H "content-type: application/json" \
  -d '{ "feedback": "Make it shorter and avoid unsupported claims." }'
```

Regeneration rewrites the same draft in place, resets it to `proposed`, and keeps feedback in the prospect feedback loop.

Do not call `/drafts/:draftId/send` unless the user explicitly authorizes sending.

Sending requires the draft status to be `approved`; otherwise the API returns `409`. If project setting `daily_send_limit` is reached, sending returns `429`. Successful sends set `status: "sent"`, `sentAt`, `sendResult`, `resendEmailId`, and `deliveryStatus: "accepted"` until Resend webhook events update delivery status.

Before creating a draft, list drafts and avoid duplicate proposed/approved drafts for the same prospect, template, subject, or angle. Update the existing draft when the new version is materially better.

Legacy endpoints exist:

```text
POST /projects/:projectId/draft
POST /projects/:projectId/send
```

Use them only when the user explicitly asks for direct render/send behavior.

## Project Documents

Documents are project knowledge used by AI description and draft generation. Store factual product/project material here when the user asks to persist project knowledge.

```text
GET /projects/:projectId/documents
POST /projects/:projectId/documents
PUT /projects/:projectId/documents/:documentId
DELETE /projects/:projectId/documents/:documentId
```

Create/update shape:

```json
{
  "title": "Positioning notes",
  "content": "Facts, features, philosophy, constraints, proof, and wording guidance."
}
```

Before creating documents, list existing documents and update/merge when the title or content purpose already exists.

## Templates, Settings, Events, Inbox, Integrations

```text
GET /projects/:projectId/templates
POST /projects/:projectId/templates
PUT /projects/:projectId/templates/:templateId
DELETE /projects/:projectId/templates/:templateId

GET /settings
PUT /settings/:key

GET /projects/:projectId/settings
PUT /projects/:projectId/settings/:key

GET /projects/:projectId/events
POST /projects/:projectId/events

GET /projects/:projectId/inbound-emails
PUT /projects/:projectId/inbound-emails/:emailId

GET /projects/:projectId/integrations
POST /projects/:projectId/integrations
PUT /projects/:projectId/integrations/:integrationId
```

Account settings (`/settings`) are scoped to the API-key/session user and apply to every project unless overridden by project settings. Project settings override account settings for the same key. Non-secret settings feed AI draft generation; `tone_of_voice` and `writing_examples` receive special drafting treatment.

Events return the 200 newest project events. Inbound email returns project-specific messages plus unassigned messages (`project_id IS NULL`) so an agent can triage replies. Integrations are project-scoped records with `provider`, `label`, `status`, `capabilities`, `config`, and `notes`.

## Reporting Collection Checklist

For read-only reports, fetch this data before summarizing:

```text
GET /projects
GET /projects/:projectId
GET /settings
GET /projects/:projectId/settings
GET /projects/:projectId/documents
GET /projects/:projectId/prospects
GET /projects/:projectId/prospects/:prospectId/investigations
GET /projects/:projectId/templates
GET /projects/:projectId/plans
GET /projects/:projectId/drafts
GET /projects/:projectId/events
GET /projects/:projectId/inbound-emails
GET /projects/:projectId/integrations
```

Only fetch investigations for every prospect when the report needs source coverage, contact provenance, fit evidence, or prospect-level appendix data. Otherwise fetch investigations for top prospects, stale prospects, and prospects with contacts or drafts.

Report-only mode must not call `POST`, `PUT`, `DELETE`, `regenerate`, or `send` unless the user explicitly requests a write action.

## Resend Webhook

```text
POST /webhooks/resend
```

This public endpoint is called by Resend, not by agents. It records delivery events, updates matching draft `deliveryStatus`, and logs `email.<status>` events.

## API Keys

Agents normally receive an API key from the user. If asked to create one while logged in through the UI/session:

```text
GET /api-keys
POST /api-keys
DELETE /api-keys/:keyId
```

Do not reveal existing keys; newly created keys are shown once.
