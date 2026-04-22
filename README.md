# AI Bible Gospels

**Current Version: v0.1.0**
**Domain:** [aibiblegospels.com](https://aibiblegospels.com) (not yet live — scaffolded Apr 21, 2026)
**Owner:** Thomas (AI Bible Gospels)

Parent-brand site for AI Bible Gospels. Positioning, case studies, services, and contact. Flagship deliverable is [Faith Walk Live](https://faithwalklive.com) in the sibling repo.

## What this is

The canonical home for the AI Bible Gospels brand. One-page site (for now) with:

1. Hero — faith-tech for ministers, streamers, missions
2. Flagship case study — Faith Walk Live
3. What we build — trackers, stream automation, ministry sites, content pipelines
4. YouTube channel credit
5. Work-with-us email CTA
6. Footer with scripture

## Why it exists

- **Entity anchor for AEO.** The schema.org work across the faithwalklivecom repo treats "AI Bible Gospels" as an `Organization`. This site is that Organization's canonical URL — so answer engines can resolve it coherently.
- **Consulting funnel.** Per the faith-tech pivot strategy (see sibling `faithwalklivecom` docs), target market is Christian streamers, ministers, missions orgs. This is where inbound lands.
- **Brand hierarchy.** AI Bible Gospels is the parent brand; Faith Walk Live is a flagship project under it.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind v4**
- **Brand palette:** Deep Navy / Divine Gold / Soft Gold (matches faithwalklivecom)
- **Deploy target:** Vercel → `aibiblegospels.com` (GoDaddy DNS)

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Must pass before deploy
npm start            # Production server
```

## Repo relationships

Sibling repos under `../`:

- `AIconsultantforHmblzayy/` — HMBL client consulting (source of truth for Faith Walk checkpoints)
- `faithwalklivecom/` — faithwalklive.com site (flagship deliverable)
- `faithwalkbook/` — private book repo
- `aibiblegospelscom/` — **this repo**

Opened together via the `hblfaithwalk.code-workspace` file in the parent directory.

## AEO baseline

Shipped in v0.1.0:

- Organization + WebSite JSON-LD with `@id` + `sameAs` (YouTube + faithwalklive.com)
- `public/llms.txt` ([llmstxt.org](https://llmstxt.org) spec)
- Explicit AI-bot allowlist in `src/app/robots.ts`
- Auto-generated `sitemap.xml`

## Voice

Match faithwalklivecom's positioning rules:

1. **Testimony voice, not tech voice.** Faith-first. No AI hype.
2. **Work speaks.** Faith Walk Live is the proof. No begging, no over-explaining.
3. **No em-dash-heavy, adjective-piled copy.** Plain and direct.

## Roadmap

Phase 1 (v0.1.x — shipped):
- [x] Next.js + Tailwind scaffold
- [x] Homepage with 6 sections
- [x] Organization JSON-LD
- [x] robots.ts with AI-bot allowlist
- [x] llms.txt
- [x] sitemap.ts

Phase 2 (v0.2.x — when inbound demand materializes):
- [ ] Vercel deploy + domain connect
- [ ] Update faithwalklivecom Organization `sameAs` to include aibiblegospels.com
- [ ] Case study page template + second case study (once second project ships)
- [ ] Dedicated /services page if pitch-vs-inquiry split ever justifies it
- [ ] Blog or resources section for long-tail AEO content
