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
    "name": "Luys",
    "website": "https://luys.dev",
    "oneLine": "Short positioning",
    "defaultFrom": "Sil from Hakobs <sil@hakobs.com>",
    "replyTo": "sil@hakobs.com",
    "status": "active"
  }'
```

Get/update a project:

```text
GET /projects/:projectId
PUT /projects/:projectId
```

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

If `discoveredContact` is supplied, Outreach updates the prospect contact and can move a `new` prospect toward researched state.

## Plans

```text
GET /projects/:projectId/plans
POST /projects/:projectId/plans
GET /projects/:projectId/plans/:planId
PUT /projects/:projectId/plans/:planId
PUT /projects/:projectId/plans/:planId/steps/:stepId
```

Plan step types: `research`, `draft`, `send`, `follow_up`, `note`.

## Drafts

Prefer persisted drafts for agent work. Drafts start as `proposed`; sending requires explicit approval.

```text
GET /projects/:projectId/drafts
POST /projects/:projectId/drafts
PUT /projects/:projectId/drafts/:draftId
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

Do not call `/drafts/:draftId/send` unless the user explicitly authorizes sending.

Legacy endpoints exist:

```text
POST /projects/:projectId/draft
POST /projects/:projectId/send
```

Use them only when the user explicitly asks for direct render/send behavior.

## Templates, Settings, Events, Inbox, Integrations

```text
GET /projects/:projectId/templates
POST /projects/:projectId/templates
PUT /projects/:projectId/templates/:templateId

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

## API Keys

Agents normally receive an API key from the user. If asked to create one while logged in through the UI/session:

```text
GET /api-keys
POST /api-keys
DELETE /api-keys/:keyId
```

Do not reveal existing keys; newly created keys are shown once.
