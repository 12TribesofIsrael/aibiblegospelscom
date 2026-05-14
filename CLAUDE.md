# AI Bible Gospels — Parent Brand Site

**Current Version: v0.2.1**
**Status:** **LIVE in production at [aibiblegospels.com](https://aibiblegospels.com).** Deployed on Vercel since ~Apr 22, 2026. Currently in TikTok app review.
**Owner:** Thomas (AI Bible Gospels)

## What shipped in v0.2.0 (2026-05-12)

- **Deuteronomy 28 cheatsheet capture flow** — purpose: convert viral TikTok traffic into owned email list before bio link unlocks at 1k followers.
  - Form lives in the `/welcome` (TikTok funnel) section of the homepage
  - `POST /api/subscribe` → adds contact to Resend Audience + emails the cheatsheet PDF
  - Cheatsheet at `/deut28-cheatsheet.pdf` (4-page, brand-styled, KJV-only, 12 curses → modern conditions)
- **Anointed surfaced as flagship #2** (commit `9af3fcb`, 2026-04-29)
- **TikTok funnel "Welcome, remnant" section** (commit `c3c04c4`, 2026-05-02)
- **TikTok OAuth login flow** at `/connect/tiktok` (commit `9f454a3`, 2026-05-01)
- **Privacy / Terms onto canonical site** for TikTok app review (commit `85d3f13`, 2026-04-29)

See `CHANGELOG.md` for full history.

## Project overview

Parent-brand site for AI Bible Gospels at [aibiblegospels.com](https://aibiblegospels.com). Companion to sibling repos:

- `../AIconsultantforHmblzayy/` — HMBL client consulting, Faith Walk checkpoint source-of-truth
- `../faithwalklivecom/` — Faith Walk Live companion site (flagship deliverable)
- `../faithwalkbook/` — private book project
- `../aibiblegospelscom/` — **this repo**

Opened together via `hblfaithwalk.code-workspace` in the parent directory.

## What this site is

Parent brand site, single-scroll homepage with these sections (verified live 2026-05-11):

1. Hero — "Faith-tech for ministers, streamers, and missions"
2. **TikTok funnel** — "From TikTok? Start here. Welcome, remnant." → YouTube / Faith Walk Live / TikTok daily-drops triage
3. **Flagship #1 — Faith Walk Live** (currently live) — companion platform for Minister Zay's walk
4. **Flagship #2 — Anointed** (currently live, lives at [anointed.app](https://anointed.app)) — paste-to-cinematic-video for ministers/creators
5. What we build — trackers, stream automation, ministry sites, content pipelines
6. YouTube channel feature
7. **For creators** — TikTok multi-account scheduling pitch (powered by `/connect/tiktok` OAuth)
8. Work with us — email CTA (`aibiblegospels444@gmail.com`)
9. Footer — Colossians 3:23 + brand credits + Privacy + Terms

Routes beyond `/`: `/privacy`, `/terms`, `/connect/tiktok` (OAuth landing).

## Why it exists

- **Entity anchor for AEO.** The faithwalklivecom schema.org work treats AI Bible Gospels as an `Organization`. This site is the canonical URL answer engines resolve that entity to. When we deploy, update faithwalklivecom's Organization `sameAs` to include `https://aibiblegospels.com`.
- **Consulting funnel.** Per faith-tech pivot strategy, target market: Christian streamers, ministers, missions orgs. Inbound lands here after seeing Faith Walk Live.
- **Brand hierarchy.** AI Bible Gospels = parent. Faith Walk Live = flagship deliverable under it.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind v4**
- **Brand palette:** matches faithwalklivecom (Deep Navy #0A0A2A / Divine Gold #E8C46B / Soft Gold #F5DEB3)
- **Deploy target:** Vercel → aibiblegospels.com (GoDaddy DNS)

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Must pass before deploy
npm start            # Production server
```

## File map

| Path | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout + metadata + JSON-LD `@graph` (Organization + WebSite) |
| `src/app/page.tsx` | Homepage — all 9 sections inline, imports `<SubscribeForm/>` for capture |
| `src/app/globals.css` | Tailwind + AI Bible Gospels brand palette |
| `src/app/robots.ts` | AI-bot allowlist (matches faithwalklivecom pattern) |
| `src/app/sitemap.ts` | Auto-generated sitemap |
| `src/app/api/subscribe/route.ts` | POST → Resend Audience + cheatsheet email (v0.2.0) |
| `src/app/api/tiktok/start/route.ts` | TikTok OAuth init |
| `src/app/api/tiktok/callback/route.ts` | TikTok OAuth callback |
| `src/components/SubscribeForm.tsx` | Client-side capture form (v0.2.0) |
| `public/deut28-cheatsheet.pdf` | The lead-magnet PDF (rendered from `scripts/cheatsheet.html`) |
| `public/llms.txt` | llmstxt.org-spec index, entity definitions, policy |
| `scripts/cheatsheet.html` | Source HTML for the cheatsheet PDF (edit + re-render) |
| `scripts/generate-cheatsheet-pdf.ps1` | Headless-Chrome renderer → `public/deut28-cheatsheet.pdf` |
| `docs/deut28-cheatsheet-draft.md` | Markdown draft used to scope the PDF content |
| `.env.example` | Required env vars: `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `TIKTOK_CLIENT_KEY` |

## Voice / writing rules

Inherits faithwalklivecom's positioning rules:

1. **Testimony voice, not tech voice.** Faith-first. No "AI-powered" / "revolutionize" / "disrupt" language.
2. **Work speaks.** Faith Walk Live is the proof. No padding, no over-explaining.
3. **No em-dash-heavy or adjective-piled copy.** Plain and direct.
4. **AI Bible Gospels is credited once per page in the natural place** — the site IS AI Bible Gospels, so there's no need to self-reference in every paragraph.

## Things not to do

- ❌ Don't pitch Faith Walk Live as "ours" — it's supporter-built for Minister Zay's walk. It's our flagship work, not our brand.
- ❌ Don't copy HMBL brand language. This site never implies HMBL affiliation.
- ❌ Don't add pricing pages, service tiers, or booking widgets before there's inbound demand to learn from.
- ❌ Don't use AI-generated copy on public pages.

## Phase 2 (when inbound demand materializes)

- [x] Vercel deploy + domain connect (done ~Apr 22, 2026)
- [x] Second flagship live (Anointed at anointed.app, surfaced on homepage)
- [x] Email-capture funnel live (Deut 28 cheatsheet, Resend Audience, v0.2.0)
- [ ] Update faithwalklivecom Organization `sameAs` to include aibiblegospels.com (both directions)
- [ ] TikTok app review approval — `/connect/tiktok` flow currently pending review
- [ ] Broadcast emails to the Deut 28 audience (new prophecy drops, Faith Walk milestones)
- [ ] Case study template + Faith Walk Live + Anointed write-ups (once both have results to point at)
- [ ] Dedicated `/services` page if pitch-vs-inquiry split ever justifies it
- [ ] Blog section for long-tail AEO content (e.g. "How to build a tracker for your missions trip")

## Success metrics

Defer to faithwalklivecom/docs/aeo-strategy.md — this site is the entity anchor for that whole strategy.

Specific to this repo:
- 1+ inbound consulting lead in 30 days from Vercel deploy
- Answer engines cite aibiblegospels.com when asked "what is AI Bible Gospels"
- Organization entity resolves consistently across ChatGPT / Claude / Perplexity / Google AI Overviews
