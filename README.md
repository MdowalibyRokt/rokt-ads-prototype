# Rokt Ads — Next-Generation Media Buying Platform Prototype

A fully interactive, agency-quality HTML prototype of a reimagined Rokt Ads media buying platform. Zero dependencies — open `index.html` in any browser.

## Quick Start

```bash
# Serve locally
python3 -m http.server 8800

# Open in browser
open http://localhost:8800
```

## What's Inside

- **9 views:** Dashboard, Campaigns, Campaign Builder, Audiences, Creative Studio, Intelligence, Catalog, Measurement, Account
- **15+ modal workflows:** Build Audience, Create Lookalike, New Offer, New Experiment, Export Report, etc.
- **5-step campaign builder** with confetti on launch
- **Command palette** (Cmd+K) with fuzzy search
- **AI Copilot** chat drawer with mock responses
- **Dark + Light mode** toggle
- **12+ keyboard shortcuts** (press `?` to see all)
- **Responsive layout** with sidebar collapse

## Tech Stack

| File | Lines | Purpose |
|---|---|---|
| `index.html` | 832 | SPA shell + 9 `<template>` view elements |
| `styles.css` | 2,996 | Design tokens + component styles + animations |
| `app.js` | 2,248 | IIFE module: router, mock data, interactions |

**Zero dependencies.** No npm, no build tools, no frameworks. Vanilla HTML/CSS/JS.

## Documentation

- **[PRD.md](PRD.md)** — Comprehensive product requirements document (every feature, decision, color, animation)
- **[PLAN.md](PLAN.md)** — Original design plan and implementation roadmap
- **[USER-FLOWS.md](USER-FLOWS.md)** — Detailed user flow specifications

## Design System

- **Brand:** Wine/Beetroot (#C43B52) accent, dark-first palette
- **Typography:** Inter (UI) + JetBrains Mono (data)
- **Animations:** Spring-feel modals, counter roll-ups, breathing AI FAB, confetti
- **Rokt-specific metrics:** CoPI (North Star), EMQ, Smart Bidding states

## Mock Data

6 campaigns (Disney+, Capital One, Hulu, True Classic, PayPal, Audible), 12 audiences, 8 creatives, 6 offers, 4 experiments, 6 products — all with realistic Rokt metrics.

## Screenshots

Launch the prototype and explore — every view is fully interactive with realistic data.
