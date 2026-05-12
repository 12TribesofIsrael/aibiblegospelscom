# AI Bible Gospels

**Current Version: v0.2.0**
**Status:** LIVE at [aibiblegospels.com](https://aibiblegospels.com) (Vercel, deployed Apr 22, 2026)
**Owner:** Thomas (AI Bible Gospels)

Parent-brand site for AI Bible Gospels. Two flagships (Faith Walk Live, Anointed), a TikTok-funnel landing experience, a creator-onboarding pitch, and an email-capture flow that delivers the Deuteronomy 28 cheatsheet PDF.

## What this is

Single-scroll homepage. Sections:

1. Hero — "Faith-tech for ministers, streamers, and missions"
2. **TikTok funnel** — "From TikTok? Start here." → YouTube / Faith Walk Live / TikTok triage + **Deut 28 cheatsheet capture form**
3. Flagship #1 — **Faith Walk Live** (live)
4. Flagship #2 — **Anointed** at [anointed.app](https://anointed.app) (live)
5. What we build — trackers, stream automation, ministry sites, content pipelines
6. YouTube channel feature
7. For creators — TikTok multi-account scheduling pitch (powered by `/connect/tiktok` OAuth)
8. Work with us — email CTA
9. Footer — Colossians 3:23 + brand credits + Privacy + Terms

Routes: `/`, `/privacy`, `/terms`, `/connect/tiktok` (OAuth landing), `/api/subscribe` (Deut 28 capture), `/api/tiktok/start` + `/api/tiktok/callback`.

## Why it exists

- **Entity anchor for AEO.** Canonical URL for the `Organization` schema entity referenced across all sibling repos.
- **Consulting funnel.** Inbound lands here after seeing Faith Walk Live or the TikTok channel.
- **Brand hierarchy.** AI Bible Gospels = parent. Faith Walk Live + Anointed = flagship deliverables.
- **List-building.** v0.2.0 captures viral TikTok traffic into a Resend Audience before the bio link unlocks at 1k.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind v4**
- **Email**: [Resend](https://resend.com) — sending from `info@anointed.app`, contacts stored in the "AI Bible Gospels Subscribers" Audience
- **Brand palette:** Deep Navy `#0A0A2A` / Divine Gold `#E8C46B` / Soft Gold `#F5DEB3`
- **Deploy target:** Vercel → aibiblegospels.com (GoDaddy DNS)

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Must pass before deploy
npm start            # Production server

# Regenerate the Deut 28 cheatsheet PDF after editing scripts/cheatsheet.html
powershell -File scripts/generate-cheatsheet-pdf.ps1
```

## Environment

Copy `.env.example` → `.env.local`. Required for local dev of `/api/subscribe`:

- `RESEND_API_KEY` — full-access key from https://resend.com/api-keys
- `RESEND_AUDIENCE_ID` — UUID from https://resend.com/audiences
- `TIKTOK_CLIENT_KEY` — only needed if testing `/connect/tiktok`

Set the same vars in Vercel for production.

> **Norton-cert note (this machine):** Node fetch fails against Resend / external HTTPS without trusting the Norton MITM root. Fixed permanently via USER env var `NODE_EXTRA_CA_CERTS=C:\Users\Owner\.claude\norton-root.pem`. See global CLAUDE.md.

## Repo relationships

Siblings under `../`:

- `AIconsultantforHmblzayy/` — HMBL consulting (Faith Walk checkpoint source-of-truth)
- `faithwalklivecom/` — faithwalklive.com (flagship #1)
- `faithwalkbook/` — private book project
- `aibiblegospelmaster/` — Anointed pipeline (flagship #2)
- `aibiblegospelscom/` — **this repo**

Opened together via `hblfaithwalk.code-workspace` in the parent directory.

## Voice

1. **Testimony voice, not tech voice.** Faith-first. No "AI-powered" / "revolutionize" / "disrupt" language.
2. **Work speaks.** Flagships are the proof. No padding, no over-explaining.
3. **No em-dash-heavy or adjective-piled copy.** Plain and direct.
4. **No AI-generated copy on public pages.** Marketing PDFs for opted-in subscribers are draft-then-review (see `docs/`).

## Roadmap

Phase 1 (v0.1.x — shipped):
- [x] Next.js + Tailwind scaffold
- [x] Organization JSON-LD, robots.ts, llms.txt, sitemap.ts
- [x] Vercel deploy + domain connect
- [x] Privacy / Terms / Connect (TikTok OAuth)

Phase 2 (v0.2.x — shipped):
- [x] Second flagship surfaced (Anointed)
- [x] TikTok funnel section ("Welcome, remnant")
- [x] **Deut 28 cheatsheet capture form** → Resend Audience + auto-email
- [x] Cheatsheet PDF at `/deut28-cheatsheet.pdf`

Phase 3 (v0.3.x — when):
- [ ] TikTok app review approval
- [ ] Update faithwalklivecom Organization `sameAs` to include aibiblegospels.com (both directions)
- [ ] Broadcast emails to the Deut 28 audience (new prophecy drops)
- [ ] Case study pages once results to point at
- [ ] Blog section for long-tail AEO content
