# AI Bible Gospels — Parent Brand Site

**Current Version: v0.1.0**
**Status:** Scaffolded Apr 21, 2026. Not yet deployed.
**Owner:** Thomas (AI Bible Gospels)

## Project overview

Parent-brand site for AI Bible Gospels at [aibiblegospels.com](https://aibiblegospels.com). Companion to sibling repos:

- `../AIconsultantforHmblzayy/` — HMBL client consulting, Faith Walk checkpoint source-of-truth
- `../faithwalklivecom/` — Faith Walk Live companion site (flagship deliverable)
- `../faithwalkbook/` — private book project
- `../aibiblegospelscom/` — **this repo**

Opened together via `hblfaithwalk.code-workspace` in the parent directory.

## What this site is

Single-page parent brand site with 6 sections:

1. Hero — "Faith-tech for ministers, streamers, and missions"
2. Flagship — Faith Walk Live case study
3. What we build — trackers, stream automation, ministry sites, content pipelines
4. YouTube channel feature
5. Work with us — email CTA (`technologygurusllc@gmail.com`)
6. Footer — Colossians 3:23 + brand credits

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
| `src/app/page.tsx` | Homepage — all 6 sections inline, no component split yet |
| `src/app/globals.css` | Tailwind + AI Bible Gospels brand palette |
| `src/app/robots.ts` | AI-bot allowlist (matches faithwalklivecom pattern) |
| `src/app/sitemap.ts` | Auto-generated sitemap |
| `public/llms.txt` | llmstxt.org-spec index, entity definitions, policy |

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

- [ ] Vercel deploy + domain connect
- [ ] Update faithwalklivecom Organization `sameAs` to include aibiblegospels.com (both directions)
- [ ] Case study template + second case study (once second project ships)
- [ ] Dedicated `/services` page if pitch-vs-inquiry split ever justifies it
- [ ] Blog section for long-tail AEO content (e.g. "How to build a tracker for your missions trip")

## Success metrics

Defer to faithwalklivecom/docs/aeo-strategy.md — this site is the entity anchor for that whole strategy.

Specific to this repo:
- 1+ inbound consulting lead in 30 days from Vercel deploy
- Answer engines cite aibiblegospels.com when asked "what is AI Bible Gospels"
- Organization entity resolves consistently across ChatGPT / Claude / Perplexity / Google AI Overviews
