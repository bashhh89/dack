# DACK Marketing & Proposal Intelligence Platform

Local-only platform preview for DACK proposal operations, marketing intelligence, staffing, project sheets, rates, agency memory, alerts, and data activation planning.

The current application uses sample data from `src/data/dummyData.ts`. The UI and data model are structured so those records can be replaced with DACK's real proposal tracker, RFP files, resumes, project sheets, rate sheets, reusable content, and marketing records.

## Current Scope

- Executive Command Center for pursuit value, risks, deadlines, compliance, staffing, marketing actions, and website gaps.
- RFP Intelligence Workspace with summary, Go / No-Go recommendation, forms, checklist, team, resumes, project sheets, risks, outline, and next actions.
- Proposal Assembly Room with section library, outline board, selected section preview, status, owners, and recommendations.
- Resume & Staffing Intelligence with certification warnings, agency fit, resume versions, participation, and team builder coverage.
- Project Sheet Matching with relevance scores, match rationale, tags, values, and website status.
- Rate & Pricing Intelligence with bare rates, multipliers, loaded rates, client/agency, prime/sub relationship, expirations, and access warnings.
- Agency & Teaming Memory for DDC, DASNY, MTA, OGS, and NYCHA.
- Marketing Operations for budget, collateral inventory, receipt workflow, website gaps, and homepage feature candidates.
- Alerts & Action Center with severity, category, owner, due date, recommendation, and related record.
- Ready for DACK Data checklist for replacing sample data with live files.

## Local Commands

```bash
npm install
npm run payload:importmap
npm run payload:types
npm run lint
npm run build
npm run dev -- --hostname 0.0.0.0
```

Payload admin runs at:

```bash
http://localhost:3000/admin
```

For local Payload development, start Postgres first:

```bash
docker compose up -d postgres
cp .env.example .env.local
```

The local Postgres container is exposed on host port `55432` to avoid conflicts with other local database services.

To run the production server locally:

```bash
npm run build
npm run start -- --hostname 0.0.0.0 --port 3000
```

## Verification Gate

Before any GitHub push or EasyPanel deployment:

```bash
npm run lint
npm run build
```

For a deployed preview, also confirm the app serves:

```bash
curl -I http://localhost:3000/
```

## GitHub Flow

Repository: `bashhh89/dack`

Use the same delivery discipline as the ANC workflow:

1. Confirm repo state and branch.
2. Run lint and production build.
3. Commit only intended changes.
4. Push the active branch.
5. Let GitHub Actions run the CI workflow.
6. Deploy from the verified branch through EasyPanel.
7. Confirm the production URL responds before calling the work done.

## EasyPanel Deployment

The included `Dockerfile` builds the Next.js app as a standalone server. In EasyPanel, configure this as a Dockerfile-based app service.

Important isolation rule: deploy this in a DACK-specific EasyPanel project, not the ANC `abc` project. Recommended project name: `dack` or `ahmad-dack`. Keep the project limited to this DACK service so users with ANC project access do not see unrelated personal services.

Recommended service settings:

- Build method: Dockerfile
- Port: `3000`
- Health check path: `/`
- Build command: handled inside Dockerfile
- Runtime command: `node server.js`
- Domain: `dack.basheer.app`

Production verification after deploy:

```bash
curl -I https://dack.basheer.app/
```

## Data Activation

To move from sample records to DACK records, collect:

- Proposal tracker spreadsheet
- Active RFP PDFs, addenda, Q&A, and form packages
- Staff resumes, resume versions, certifications, and expiration dates
- Project sheets with agency/client, type, year, value, tags, and website status
- Agency-specific rate sheets with multipliers, loaded rates, expiration dates, and access rules
- Reusable proposal content blocks, forms, appendices, firm overview, and cover letter language
- Marketing budget, inventory, receipts, website recommendations, and homepage feature candidates

Sensitive rate data should remain permission-controlled before live deployment.
