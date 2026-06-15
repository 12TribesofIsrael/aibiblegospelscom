# Changelog

All notable changes to aibiblegospels.com.

## [Unreleased]

### Added

- **CRM lead ingestion** — `/api/subscribe` now also mirrors each signup into the BMB LeadStack CRM as a contact (no pipeline stage; tagged `aibiblegospels` + source), so subscribers live in one place alongside leads from the other sites. Runs via Next `after()` *after* the response is sent, with an 8s timeout and full error-swallowing, so the CRM can never slow or break the subscribe form. New helper [src/lib/crm.ts](src/lib/crm.ts); gated by two new **optional** env vars `BMB_CRM_INGEST_URL` + `BMB_CRM_API_KEY` (push silently no-ops if unset). Follow-up strategy lives in `bmbaiautomations/docs/sales/`.

## [0.2.1] — 2026-05-14

### Added

- **Telegram channel surfaced on homepage** — `https://t.me/aibiblegospels` (handle `@aibiblegospels`) now appears in two places:
  - Welcome / TikTok funnel section: added as a fourth "plug in" card alongside YouTube, Faith Walk Live, and TikTok. Section copy updated from "Three places to plug in" → "Four places to plug in". Grid restructured from `sm:grid-cols-3` → `sm:grid-cols-2 lg:grid-cols-4`.
  - Footer: Telegram link added to the social row between YouTube and Privacy.
- Rationale: TikTok visitors landing on `/#welcome` can now connect to the owned audience layer (Telegram) directly from the page — previously Telegram was only reachable via the welcome email after email capture. Both paths now work in parallel. Funnel architecture per the community-hub strategy: TikTok → site → email + Telegram → YouTube.

## [0.2.0] — 2026-05-12

### Added

- **Deuteronomy 28 cheatsheet email-capture flow** — new section in `/welcome` (TikTok funnel) on the homepage. Visitors submit email → contact lands in Resend Audience "AI Bible Gospels Subscribers" + receives the cheatsheet PDF via Resend. Purpose: convert viral TikTok traffic into owned email list before the bio link unlocks at 1k followers.
  - `POST /api/subscribe` — Next.js route, validates email, writes to Resend Audience, sends styled cheatsheet email from `info@anointed.app`
  - `src/components/SubscribeForm.tsx` — client component, idle/submitting/success/error states, brand-styled
  - `public/deut28-cheatsheet.pdf` — 4-page lead magnet: cover, why-this-matters, 12 verses → modern conditions table, what-to-do CTAs
  - `scripts/cheatsheet.html` + `scripts/generate-cheatsheet-pdf.ps1` — source HTML + headless-Chrome renderer
- **Anointed surfaced as flagship #2** on the homepage (commit `9af3fcb`, 2026-04-29) — paste KJV scripture or custom script → narrated cinematic video at [anointed.app](https://anointed.app)
- **TikTok funnel "Welcome, remnant" section** (commit `c3c04c4`, 2026-05-02) — three plug-in CTAs to YouTube / Faith Walk Live / TikTok
- **TikTok OAuth login flow** at `/connect/tiktok` (commit `9f454a3`, 2026-05-01) — multi-account scheduling pitch
- **Privacy and Terms pages** moved onto canonical site for TikTok app review (commit `85d3f13`, 2026-04-29)
- **CHANGELOG.md** + **.env.example** for documentation discipline

### Changed

- Footer: brand identity scrubbed of decommissioned LLC references (commit `df9a44f`, 2026-04-22)
- Contact email standardized to `aibiblegospels444@gmail.com`
- `.gitignore`: `.env.example` now allowed (`!.env.example`) — was previously caught by `.env*`

### Infrastructure

- **Resend integration** — sending from `info@anointed.app` via Resend API. Audience `AI Bible Gospels Subscribers` (id `2e3d8b65-...`). Both `RESEND_API_KEY` + `RESEND_AUDIENCE_ID` set in Vercel and local `.env.local`.
- **Norton MITM cert fix** for Node fetch — global Windows USER env var `NODE_EXTRA_CA_CERTS` points to `C:\Users\Owner\.claude\norton-root.pem`. Documented in global CLAUDE.md.

## [0.1.0] — 2026-04-21

### Added

- Initial scaffold: Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind v4
- Homepage with 6 sections (hero, flagship case study, what we build, YouTube, work-with-us, footer)
- `Organization` + `WebSite` JSON-LD in `src/app/layout.tsx`
- `public/llms.txt` per [llmstxt.org](https://llmstxt.org) spec
- AI-bot allowlist in `src/app/robots.ts`
- Auto-generated `src/app/sitemap.ts`
- Brand palette matching faithwalklivecom (Deep Navy / Divine Gold / Soft Gold)
- Vercel deploy + domain connect at aibiblegospels.com (commit `0c9db40`, 2026-04-22)
