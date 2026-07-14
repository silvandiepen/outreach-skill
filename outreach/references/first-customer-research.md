# First-Customer Research Framework

Use this when finding early customers, design partners, beta users, outreach targets, or investigation candidates.

The goal is not to create a generic lead list. The goal is to find evidence-backed outreach hypotheses based on recent public signals.

## Product Understanding

Before searching, identify:

- product and URL
- user and buyer
- main outcome
- primary ICP
- adjacent ICP
- price or buying motion when visible
- strongest use case
- disqualifiers

Ask one concise question only when ambiguity would materially change the search.

## Public Signals To Search

Search multiple source types and query angles for:

- explicit requests for tools, recommendations, alternatives, or solutions
- first-person descriptions of the target problem
- manual workflows, repeated workarounds, spreadsheets, scripts, or hacks
- competitor frustration, churn, migration, pricing complaints, or switching intent
- launches, hiring, expansion, funding, regulation, tooling changes, or other timing triggers
- communities where people publicly discuss the pain
- business pages and changelogs that reveal current priorities

Prefer original sources over snippets. Record source URL, source type, visible date, and the exact evidence that qualifies the prospect.

## Safe Research Rules

- Use public, intentionally shared professional or business information only.
- Do not bypass login walls, paywalls, access controls, rate limits, or robots restrictions.
- Do not use data brokers, leaked datasets, private groups, personal email discovery, phone enrichment, or sensitive personal information.
- Do not infer protected traits or target people based on health, finances, politics, sexuality, religion, or other sensitive attributes.
- Quote minimally; paraphrase by default.
- Link every material pain or timing signal.

## Contact Discovery

Every investigation should attempt to find a usable, respectful contact path.

Preferred contact paths, in order:

1. Direct professional email published by the person or organization for work/contact.
2. Role inbox such as `hello@`, `team@`, `press@`, `editor@`, `support@`, or partnerships/sales inbox.
3. Contact form, submission page, press tip page, app review/contact page, or public booking link.
4. Public professional profile or community handle when that is the natural channel.

Do not use:

- guessed personal email patterns
- private email addresses from leaks, data brokers, enrichment services, or scraped private databases
- phone numbers unless the page explicitly invites business calls
- sensitive personal information
- contact routes requiring login, membership, or circumvention

Record contact evidence in the investigation:

- contact value or channel
- source URL where it was found
- whether it is direct email, role inbox, form, or social/profile channel
- confidence: high, medium, or low
- caveat when the contact is generic or indirect

Map to Outreach:

- `prospect.contact`: best usable contact path, preferably email.
- `prospect.platform`: `email`, `contact_form`, `x`, `reddit`, `linkedin`, `github`, `app_store`, `website`, or another clear channel.
- `investigation.discoveredContact`: set when a direct contact or best current channel was found.
- `prospect.notes`: include contact confidence and caveat.

## Qualification Scores

Score each prospect 1-5 for:

- pain strength: how explicit and costly the problem appears
- product fit: how directly the product addresses the signal
- timing: how recent or urgent the signal is
- public reachability: whether a respectful public/professional channel exists
- evidence quality: source credibility, specificity, and recency

Map these into Outreach:

- `fitScore`: overall 1-5 score
- `whyFit`: cite the public signal and reason
- `angle`: the specific source-based outreach angle
- `ask`: low-friction ask such as feedback, review, intro, design-partner call, or trial
- `notes`: uncertainty, caveats, and next step

A prospect without a cited pain, need, or timing signal is speculative and should not be added as a high-fit prospect.

## Outreach Drafting

Draft respectful, short, ready-to-send openers grounded only in cited public context.

Before drafting, infer the project philosophy from project details, website, repo/readme/docs, existing Outreach settings, and existing templates:

- what the project is for
- what it values
- what it refuses to do
- why that matters to the target prospect
- tone: plain, respectful, direct, not hype-heavy

Use that philosophy plus the prospect investigation. A good draft should feel specific to both sides.

Do:

- mention the public source or observable business context
- connect one specific pain to the product
- make one clear low-friction ask
- use the best available contact/channel
- keep the subject line specific and non-clickbait
- keep it brief

Do not:

- pretend familiarity
- overstate certainty
- mention unrelated personal details
- claim they are interested or will buy
- send, connect, comment, submit forms, or message without explicit user approval

Ready-to-send draft checklist:

- has a concrete recipient/contact path
- subject line is specific
- first line references a public source or observed context
- body connects project philosophy to the prospect's situation
- ask is low friction
- no unsupported claims
- no fake familiarity
- no private/sensitive data

## Output To Outreach

For each accepted prospect:

1. Create/update the prospect.
2. Log at least one investigation with sources and contact discovery result.
3. Set status to `researched` when evidence is strong and contact/channel is known.
4. Create a reviewable ready-to-send draft if requested or if default draft policy applies.
5. Record blockers when evidence or contact path is weak.

## What To Save

Use the user's requested save policy. If none is provided, default to:

- Save a prospect only when there is at least one cited public signal and a plausible respectful channel.
- Save an investigation for each saved prospect.
- Put uncertainty and caveats in `notes`.
- Do not create a prospect for generic lookalikes with no cited pain/timing signal.
- Mention skipped weak leads in the final report instead of creating low-quality prospect records.
- Create proposed drafts only for the strongest matches with a usable contact path or when the user explicitly asks for drafts.

If the user wants exhaustive logging, create a plan first and use investigations/events to record weak leads separately from qualified prospects when the API supports that workflow.

## Final Report Shape

End with:

1. project id
2. ICP and disqualifiers used
3. prospect count added/updated
4. contacts found, with count by direct email/role inbox/form/social channel
5. strongest prospect and why
6. repeated pain patterns
7. drafts created
8. skipped weak leads and why
9. next recommended actions
