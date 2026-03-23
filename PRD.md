# Rokt Ads — AI-Native Media Buying Platform

## Product Requirements Document (PRD)

**Version:** 5.0
**Date:** March 23, 2026
**Author:** Max Dowaliby + Claude (AI-assisted design)
**Status:** Prototype Complete — fully interactive SPA with 18+ views, AI-native features, advertiser-scoped data model, and comprehensive entity management

---

## 1. Overview

Rokt Ads is a next-generation media buying platform prototype designed to demonstrate what an AI-native advertising platform looks like when built from scratch rather than bolted onto legacy infrastructure. The prototype is a fully interactive, zero-dependency HTML/CSS/JS single-page application — no frameworks, no build tools, no npm. Open `index.html` in any browser.

### Platform at a Glance

| Dimension | Detail |
|---|---|
| **Views** | 18+ interconnected views with hash-based routing and sub-routes |
| **Architecture** | Vanilla HTML/CSS/JS SPA, IIFE module pattern, `RoktAds` global namespace |
| **Theming** | Dark/light mode with Rokt Beetroot (`#C20075`) brand accent |
| **Navigation** | Hash-based routing with sub-routes (`#campaign/{id}`, `#audience/{id}`, `#creative/{id}`) |
| **Data Model** | Advertiser-scoped — all views filter to selected advertiser context |
| **AI Integration** | AI Hero prompt, ACE creative scoring engine, Copilot drawer, optimization scoring, recommendations throughout |
| **Keyboard** | 15+ shortcuts with visual chord feedback and nav overlay badges; command palette (Cmd+K) |
| **Source Files** | `index.html` (~960 lines), `styles.css` (~6,600 lines), `app.js` (~6,900 lines) |
| **Dependencies** | Zero. No frameworks, no build tools, no node_modules |

---

## 2. Architecture

### 2.1 Module Pattern

All logic lives in a single IIFE (`const RoktAds = (() => { ... })()`), exporting a public API on `window.RoktAds`. This gives a clean global namespace without a build step.

### 2.2 Hash-Based Router

`window.addEventListener('hashchange', handleRoute)` intercepts all navigation. Sub-routes (`campaign/c1`, `audience/a1`, `creative/cr1`) are parsed from `location.hash` to render full-screen entity detail views. All other routes call `navigate(view)` which clones an `<template id="tmpl-{view}">` into `#content` and runs the view's init function.

View transitions: exit animation (150ms fade) → clone template → enter animation. Each init function fires inside `requestAnimationFrame` for smooth rendering.

### 2.3 Dark/Light Theming

`data-theme` attribute on `<html>` switches between dark and light token sets. All colors are CSS custom properties (`--beetroot`, `--surface-dark`, `--text-primary`, etc.). Toggle via `Cmd+D` or the theme button in the sidebar footer.

### 2.4 Advertiser Scoping

All data accessors (`getFilteredCampaigns()`, `getFilteredAudiences()`, `getFilteredCreatives()`, `getFilteredOffers()`) check `selectedAdvertiser` and return the matching subset. Picker selection sets `selectedAdvertiser` and all views re-render from that scope. Portfolio mode (`selectedAdvertiser === 'all'`) aggregates across all advertisers.

### 2.5 File Structure

```
rokt-ads-prototype/
├── index.html      # ~960 lines — SPA shell, <template> blocks for each view
├── styles.css      # ~6,600 lines — Design tokens, components, animations, themes
├── app.js          # ~6,900 lines — IIFE module, router, data, interactions
└── PRD.md          # This document
```

---

## 3. Design System

### 3.1 Brand Color

**Beetroot: `#C20075`** — primary CTA, active states, chart fills, AI indicators, campaign status bars.

### 3.2 Color Tokens

**Dark Mode (default)**

| Token | Value | Usage |
|---|---|---|
| `--beetroot` | `#C20075` | Brand accent, CTAs, active states |
| `--surface-dark` | `#0B0F1A` | Sidebar background |
| `--surface-white` | `#161D2E` | Main content background |
| `--surface-light` | `#1C2438` | Cards, elevated surfaces |
| `--brand-blue` | `#4D65FF` | Focus outlines, secondary accent, links |
| `--border` | `rgba(255,255,255,0.06)` | Default borders |
| `--text-primary` | `#F0F2F5` | Body text |
| `--text-secondary` | `#8B95A8` | Labels, metadata |
| `--positive` | `#10B981` | Growth, success, healthy, live |
| `--warning` | `#F59E0B` | Attention needed, above target |
| `--negative` | `#EF4444` | Errors, declining, critical |

**Light Mode** — warm-tinted surfaces (not cold pure-white). All 9 overlay opacity tokens flip automatically. All components verified in both themes.

### 3.3 Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| UI text | Archivo | 400/500/600/700 | 11–16px |
| Data / metrics | Roboto Mono | 400/500 | 11–32px |
| KPI hero values | Roboto Mono | 700 | 32px |
| KPI labels | Archivo | 600 | 10px uppercase |
| Table headers | Archivo | 600 | 11px uppercase |
| Badges | Archivo | 600 | 11px |

### 3.4 Animations

| Animation | Duration | Purpose |
|---|---|---|
| `fadeSlideIn` | 200ms | Page transitions, view entry |
| `modalIn` | 200ms | Modal open (spring feel) |
| `pulse` | 2–2.5s | Active campaign status dots, bidding states |
| `breathe` | 3s | AI Copilot FAB glow |
| `confettiFall` | 1.5s | Campaign launch celebration (60 particles) |
| `shimmer` | 1.5s | Loading skeleton states, progress bars |
| `drawLine` | 600ms | SVG chart line animation |
| Counter roll-up | 800ms | KPI number animation (cubic ease-out) |
| Staggered entrance | 60ms delay per card | Card cascade on view load |
| Mouse-tracking glow | Real-time | Card hover radial gradient via `--mouse-x/y` CSS vars |
| Gradient mesh | Continuous | Dashboard background drift |
| AI sparkles | 500ms per spark | Cursor sparkles on hover over AI elements |

### 3.5 Components

- **Cards** — 12px radius, `--surface-light` background, `--border` outline, mouse-tracking glow effect
- **Badges** — pill-shaped, semantic color variants: `positive`, `negative`, `warning`, `wine`, `blue`, `gray`
- **Buttons** — Primary (beetroot), Ghost (transparent), small `btn-xs` and pill `btn-pill` modifiers
- **Inputs** — 8px radius, `--border` outline, focus ring with `--brand-blue`
- **Progress bars** — shimmer animation, color changes to `--warning` when >85% paced
- **Filter pills** — Active state with beetroot background; used for view tabs, date ranges, type filters

---

## 4. Global Shell

### 4.1 Sidebar Navigation

Fixed left panel, 240px wide. Collapses to 60px icon-only mode via always-visible toggle button (`.sidebar-toggle-btn`). Active item shows beetroot left accent bar and tinted background.

**Navigation sections:**
- **Workspace** — Command Center (Dashboard)
- **Campaigns** — Campaigns (with badge count for `requires_action` items)
- **Build** — Audiences, Creative Studio, Offers
- **Analyze** — Intelligence, Measurement
- **Settings** — Account

**Sidebar footer:** Keyboard shortcuts button, theme toggle (sun/moon icons), "Switch Advertiser" button.

### 4.2 Top Bar

- **Left:** Account switcher dropdown — shows current advertiser avatar + name + chevron. Dropdown lists recent/favorites with quick switch, "View All Advertisers" link returns to picker.
- **Center:** Search trigger pill showing "Cmd+K" — clicking opens command palette. Placeholder text is contextual: "Search campaigns...", "Find audiences...", etc., based on current view. Placeholder also cycles through phrases every 3s with fade transition.
- **Right:** Notification bell (badge count, dropdown with 4 notifications by type), keyboard shortcuts button, user avatar with online status dot.

### 4.3 Context Alert Bar

View-specific warning bar below the top bar with a "Fix Now" action button. Alerts:
- **Dashboard / Campaigns:** "Integration Health dropped below 5.0 on True Classic — conversion tracking may be degraded"
- **Measurement:** "Phone identifier is missing from CAPI integration — estimated +1.5 Integration Health impact"
- **Creative Studio:** "Creative refresh overdue on 2 campaigns — last updated 47 days ago"

Hidden on views with no alert.

### 4.4 Status Bar

Fixed bottom bar displaying real-time aggregate stats: Active Campaigns | Today's Spend | System Health | Smart Bidding Status. Updates on every navigation event via `updateStatusBar()`.

### 4.5 Toast Notifications

Top-right position. Types: Success (green), Error (red), Info (blue), Warning (amber). Auto-dismiss with animated progress bar indicator. Slide-in from right. Accessible via `RoktAds.toast(message, type)`.

---

## 5. Views & Routes

### Route Table

| Route | View | Notes |
|---|---|---|
| `#dashboard` | Command Center | Default after advertiser selection |
| `#campaigns` | Campaign list + detail sidebar | |
| `#campaign/{id}` | Campaign full view | Sub-route, rendered directly |
| `#builder` | Campaign builder wizard | |
| `#audiences` | Audience library | |
| `#audience/{id}` | Audience detail view | Sub-route |
| `#creatives` | Creative Studio | 3-panel layout |
| `#creative/{id}` | Creative detail view | Sub-route |
| `#offers` | Offers + product catalog | |
| `#intelligence` | Reports + Experiments tabs | |
| `#network-analyzer` | Network Analyzer & Forecaster | |
| `#measurement` | Measurement / Attribution | |
| `#advertiser-profile` | Advertiser Profile | |
| `#account` | Account / Settings | |

---

## 6. Advertiser Picker (Entry Gate)

**Trigger:** App load before any view is accessible. Full-page overlay blocks access until an advertiser is selected.

**Sections:**
- **Favorites** — Star-favorited advertisers. Each card shows avatar (colored initials), name, active campaign count, total spend. Favoriting toggleable via star button.
- **Recents** — Recently accessed accounts ordered by `lastAccessed` date.
- **All Advertisers** — Complete list with search filter (`#pickerSearch` input).

**Picker card:** Advertiser avatar (branded color background), name, last accessed date, active campaigns, spend. Click navigates into the app scoped to that advertiser.

**Portfolio option:** Selecting "Portfolio Dashboard" sets `selectedAdvertiser = 'all'` and renders the cross-advertiser portfolio view.

**6 mock advertisers:** Disney+ (adv1), Capital One (adv2), Hulu (adv3), True Classic (adv4), PayPal (adv5), Audible (adv6) — each with distinct brand colors, campaign subsets, and spend totals.

---

## 7. Command Center (Dashboard)

**Route:** `#dashboard`

**Layout:** KPI strip → two-column grid (main content left, 340px sidebar right).

### 7.1 KPI Strip (5 cards)

| Metric | Notes |
|---|---|
| Total Spend | Sum of non-draft campaigns; counter roll-up animation |
| Conversions | Sum across active campaigns |
| Avg CoPI | Average Conversions per Impression; "North Star" badge |
| Avg CPA | Weighted average cost per acquisition |
| Avg ROAS | Average return on ad spend |

Each card: sparkline SVG trend, trend indicator (up/down arrow with color), period label, counter roll-up on load, mouse-tracking glow on hover.

### 7.2 Spend Pacing Chart

SVG area chart with beetroot gradient fill. Range switcher pills: **7D / 30D / MTD / QTD** — actively changes chart data and labels on click. Features:
- Solid line: actual spend to date
- Dashed line: projected spend continuation
- Dotted horizontal line: budget ceiling with label
- Rokt connector-shaped SVG symbols as data point markers

### 7.3 Campaign Health Cards

Auto-fill grid of all non-draft campaigns scoped to advertiser. Each card:
- Campaign name with animated status dot (pulsing for active)
- Bidding state pill (Optimizing / Learning / Limited / Draft)
- Metric quartet: CoPI, CPA/ROAS, Spend, Pacing %
- Budget pacing progress bar (turns amber when >85%)
- Click navigates to `#campaign/{id}`

### 7.4 Optimization Score

Semi-circle gauge SVG (0–100). Color-coded: green (80+), yellow (60–79), red (<60). Current score: 78. Shows "+6 pts available from 3 recommendations" below. Animated fill on load.

### 7.5 AI Recommendations Feed

Dynamically generated from advertiser-scoped campaign data. Each recommendation card:
- Icon, priority level (high/medium/low with color coding)
- Recommendation text with bolded entity name
- Estimated impact ("+15% CoPI", "+$2.4K conv.")
- **Apply** button (shows toast) + **Dismiss** button (hides card)

Example recommendations auto-generated:
- Low creative count on active campaigns → "Add more creatives to [Campaign]"
- High budget pacing (>70%) → "Increase budget on [Campaign]"
- Multiple active campaigns → "Refresh audiences across N active campaigns"
- Low Integration Health → "Consider pausing [Campaign] — Integration Health below threshold"

### 7.6 Dynamic Insights Panel

AI-generated insight items based on real campaign data:
- CPA above/below target → named campaign with % deviation
- Integration Health issues → specific campaign callout
- Best performer highlight → top CoPI campaign with budget expansion suggestion
- Audience refresh nudge if 2+ active campaigns

### 7.7 Activity Feed (Timeline)

Chronological list of recent platform events: budget changes, new creatives, experiment significance milestones, campaign pauses, report generation. Static mock entries with relative timestamps.

### 7.8 Portfolio Dashboard (Cross-Advertiser Mode)

When `selectedAdvertiser === 'all'`: replaces the standard dashboard with a cross-advertiser view. KPI strip shows aggregated Total Spend, Active Campaigns, Total Conversions, Blended CPA, Advertiser Count. Below: grid of advertiser health cards showing per-advertiser spend/active/conversion/health status with "Click to manage" navigation.

---

## 8. Campaigns

**Route:** `#campaigns`

**Layout:** Flex row — campaign list (flexible width) + detail sidebar (520px, slides in on row selection).

### 8.1 Campaign List

**Toolbar:** "Campaigns" title with count badge, search input (filters rows live), "+ New Campaign" button (navigates to `#builder`).

**Filter pills:** All | Active | Requires Action | Paused | Draft | Pending Review | Archived. Each pill shows dynamic count in parentheses.

**Table columns:** Checkbox | Status dot (animated pulse for active/requires-action) | Campaign name | Objective badge | Spend/Budget with inline progress bar | CPA (amber text when above `cpaTarget`) | CoPI % | ROAS | 8-point sparkline trend | Bidding state pill.

**Row interactions:**
- Click row → opens detail sidebar (selected row gets beetroot left border + tinted background)
- Hover → reveals inline action buttons: Pause/Resume, Edit, Duplicate, Archive (slide-in animation)
- J/K keyboard navigation between rows
- Search filters rows by campaign name

### 8.2 Campaign Detail Sidebar (520px)

Slides in from right when a row is selected. Header contains campaign name, status badges (status + statusDetail + objective), contextual quick actions:
- Active: Pause, Edit, Archive
- Paused: Resume, Edit, Archive
- Draft: Publish, Edit, Delete
- Requires Action: Resolve, Pause, Archive

**Metric ribbon:** Horizontally scrollable chips — Spend, Budget Left, CPA, ROAS, Conversions, Ref. Rate, CoPI (hero highlighted), Integration Health (color-coded by score).

**Tabs:** Overview | Ad Sets | Creatives | Analytics | Nurture

- **Overview tab:** Daily Spend SVG chart (7D/30D/MTD range switcher), Budget Pacing card, Smart Bidding status visualization, AI Analysis & Suggestions card
- **Ad Sets tab:** List of ad sets with audience name, bid strategy, linked creative count
- **Creatives tab:** Grid of creatives with format badge, CTR/CVR/CoPI metrics
- **Analytics tab:** Inline pivot table with performance breakdown
- **Nurture tab:** Nurture journey visualization

Expand button navigates to full-screen campaign view (`#campaign/{id}`). Close button (or Esc) closes the sidebar.

---

## 9. Campaign Full View

**Route:** `#campaign/{id}`

Full-page dashboard for a single campaign.

**Header:** Back button → `#campaigns`, campaign name, status + objective badges.

**8 KPI Cards:** Spend, Budget Left, CPA, CoPI, ROAS, Conversions, Impressions, Ref. Rate — each with sparkline and trend badge.

**Two-column grid (main + sidebar):**

**Main column:**
- **AI Analysis & Suggestions card** — generated from campaign data; shows 1–6 actionable suggestion items with impact estimates and action buttons (Create Creative, Expand Audience, Increase Budget, View Details, Scale Up). "Deep Dive Analysis" button opens modal.
- **Spend Performance Chart** — SVG line chart with gradient fill, range switcher (7D / 30D / MTD), animated line draw, data point markers.
- **Performance Metrics Table** — Impressions, Clicks, Ref. Rate, CVR, Conversions, CPA, ROAS columns.

**Sidebar column:**
- Budget & Pacing card with progress bar
- Smart Bidding visualization (learning progress bar with conversion count, optimizing state, limited state)
- Ad Sets list (clickable → navigates to audience detail)
- Creatives list (clickable → navigates to creative detail)
- AI Recommendations mini-feed
- Nurture Journey card

**Deep Dive Modal** (triggered from AI Analysis card): Campaign Health Summary narrative, 7-day trend visualization, optimization opportunities with estimated impact, action buttons.

**Smart Bidding State Visualization:**
- **Learning** — progress bar showing conversions to date vs. 30-conversion threshold to exit learning
- **Optimizing** — pulsing green dot with "ML model actively optimizing bids"
- **Limited** — amber indicator with "budget-limited" explanation

---

## 10. Campaign Builder

**Route:** `#builder`

Full-screen wizard. Step progress bar across top with Back/Next navigation. Builder state persists in `builderData` object throughout the session.

### 10.1 AI Hero Prompt

Top of builder, always visible. Prominent text input with animated gradient border (cycling beetroot → blue). Cycling placeholder text: "Create a Disney+ acquisition campaign targeting women 25-45...", "Launch a PayPal cashback offer for high-value shoppers...", etc.

"Generate Campaign" button — calls `generateAICampaign()`, which fills all `builderData` fields with a realistic AI-generated campaign (Disney+ Q2 Acquisition with 2 ad sets, smart bidding, full creative), jumps to Step 5, and shows toast "AI configured your campaign — review below".

### 10.2 Mode Toggle

**Autopilot** (3 steps: Goal → Assets → Launch) — AI handles targeting, bidding, optimization. Simpler UX.

**Advanced / Advisor** (5 steps: Objective → Details → Targeting → Creative → Review) — Full control.

### 10.3 Advanced Mode — Step 1: Objective

6 objective cards in a grid:
- Customer Acquisition (CPA)
- Revenue Growth (ROAS)
- App Installs
- Product Sales (DPA)
- Email Subscription
- Embedded Actions

**Auto-advance behavior:** Selecting an objective triggers a 400ms pulse animation on the card, then automatically advances to Step 2. No manual "Next" required.

### 10.4 Advanced Mode — Step 2: Details

| Field | Notes |
|---|---|
| Campaign Name | Text input with "recommended format" hint below |
| Company Name | Text input |
| Brand URL | URL input |
| Measurement Group | Dropdown of existing groups + "Create New" option |
| Referral Exclusion Period | Select: 1d / 7d / 14d / 30d / 90d |
| Start Date | Date input |
| End Date | Date input (optional) |
| Daily Cap | Number input with `$` prefix |
| Monthly Cap | Number input with `$` prefix |
| Lifetime Cap | Number input with `$` prefix |
| Budget visualization | Progress bar showing daily × 30 vs. lifetime ratio |
| Policy Links | Collapsible sections for Terms & Conditions, Privacy Policy, Disclaimer — toggle enables text input |

### 10.5 Advanced Mode — Step 3: Targeting

**Bid Strategy cards (mutually exclusive):**
- **Smart Bidding** — Target CPA input, requires 30+ historical conversions to exit learning phase
- **Budget Optimization** — Auto-adjusts bids based on predicted volume; no manual CPA input
- **Manual Bidding** — Static price per conversion; manual bid input

**Ad Sets management:**
Each ad set card contains:
- Audience dropdown (filtered to advertiser's audiences)
- Collapsible targeting panel (toggle via "Targeting" button):
  - Geography: Country / State / City / ZIP inputs
  - Device: Desktop / Mobile / Tablet checkboxes
  - Demographics: Age range slider (min/max), Gender select (All/Male/Female)
- Suppress Existing Customers toggle
- Budget Override (optional per-set override)

"+ Add Ad Set" button (no limit). Remove button on each set (minimum 1 required — shows toast warning if attempted).

### 10.6 Advanced Mode — Step 4: Creative

**Two-column layout:** form fields (left) + sticky live preview (right).

**Offer section:**
| Field | Notes |
|---|---|
| Offer Type | Select: Discount / Free Trial / Cashback / Free Shipping / Product |
| Offer Value | Text: "30% off first month", "$50 credit", etc. |
| Cost to Advertiser | Monetary input |
| Landing Page URL | Required, HTTPS only, must match offer |
| Coupon Code | Optional |
| Validity dates | Start + End date inputs |

**Creative section:**
| Field | Notes |
|---|---|
| Title | Text input, contributes to 175-char combined limit |
| Body Copy | Textarea, contributes to 175-char combined limit |
| CTA (Positive) | Text input, 20-char max with live counter |
| Negative CTA | "No thanks" — disabled, not customizable (policy note) |
| Callout Tags | Three separate inputs: Promotion, Social Proof, Guarantee |
| Disclaimer | Textarea for legal text displayed below offer |
| Image | Upload zone (simulated) — click shows "brand-logo.png · 1080×565px" success state |

**ACE Generate 4 Variations button** — triggers toast "ACE generating 4 creative variations..." (simulated).

**Ad Strength Gauge** (same as Autopilot) — live-scoring ring that updates as fields are filled.

**Live Preview panel (sticky right column):**
- Phone frame mockup
- "Partner checkout page" bar
- "SPONSORED" tag
- Callout pill (Promotion tag, if set)
- Title, Body text (update in real-time on input)
- Social proof line (if Callout Social set)
- CTA button (beetroot)
- "No thanks" decline link
- Disclaimer text (if set)

### 10.7 Advanced Mode — Step 5: Review & Launch

**Approval banner:** "Campaign will be reviewed by Rokt. Typically 1-2 business days."

**Campaign tree visualization:** Full hierarchy diagram showing Campaign → Ad Sets → Creatives.

**Validation checklist:** Dynamic items — each shows checkmark (green) or X (red):
- Objective selected
- Campaign name set (non-default, >3 chars)
- Budget configured
- Audience assigned
- Creative content added (title + body)
- Landing page URL set (non-example)

**Amber recommendations:** Best-practice warnings for items not strictly required but recommended (e.g., missing measurement group).

**"Launch Campaign" button:** On click, triggers 60-particle confetti explosion (wine/gold/white particles, 1.5s fall animation) and toast "Campaign launched!".

### 10.8 Autopilot Mode — Step 2: Asset Group

Consolidated single step replacing Steps 2–4 of Advanced mode:
- Budget & Goal section: Daily Budget, Lifetime Budget, Conversion Goal dropdown
- Creative Assets: 3 headline inputs (30-char max each), 2 description textareas (90-char max each), CTA input, Image upload zone
- Audience Signals: interest keywords input (hints, not hard targeting)
- Ad Strength Gauge with live score

**AI Managed Card:** Visual card showing "AI is managing: Targeting, Bidding, Audience Expansion, Budget Allocation" — indicates what AI handles automatically.

### 10.9 Autopilot Mode — Step 3: Review

Simplified review showing budget/goal summary + launch button with confetti.

### 10.10 Campaign Projections Panel (Steps 2–5, both modes)

Sticky right column showing live-calculated projections:

**AI Readiness ring** — circular SVG gauge (0–100) colored green/amber/red. Score is computed from builder completeness: +15 pts for objective, +10 for name, +15 for budget, +10 per ad set (up to 2), +10 for bid strategy, +5 for offer type, +5 for creative content, +5 for non-example landing page URL. Starting base: 20 pts.

**Projection metrics:**
- Est. Reach — based on audience selection + ad set count
- Est. CPA — from `targetCpa` or objective-specific multiplier
- Est. Conversions — `lifetimeCap / estCPA`
- Est. Duration — `lifetimeCap / dailyCap` in days

**Contextual tips** — 2–3 tips per step, updating based on current step and field state:
- Step 2: Budget efficiency advice, name format hint, daily cap pacing warning
- Step 3: Smart Bidding advantage reminder, multi-ad-set recommendation, manual bid warning
- Step 4: 3+ creatives CoPI impact stat, 175-char limit reminder
- Step 5: Readiness assessment, projected conversion estimate

---

## 11. Audiences

**Route:** `#audiences`

**Toolbar:** "Audiences" title with count badge, search input, three action buttons: Build Audience / Upload List / Create Lookalike.

**AI Recommended Audiences section** — 3 AI-suggested cards above the main grid:
- "LAL from your top converters" — Lookalike, AI-generated based on best-performing audience
- "Reactivation: lapsed users 60-90 days" — Reactivation segment suggestion
- "Behavioral: in-market for [vertical]" — Intent-based behavioral segment

Each AI card has a beetroot sparkle icon and "+ Create" button.

**Type filter pills:** All | Custom | Lookalike (LAL) | Behavioral | Demographic | Starter | Experian.

**Audience Cards Grid:** Responsive auto-fill grid. Each card:
- Type icon + audience name + type badge
- Size (e.g., "14.2M"), campaigns linked count, match rate
- Freshness indicator (green "Fresh" dot or amber "Stale" dot)
- Hover: edit pencil icon appears
- Click: navigates to `#audience/{id}`

### 11.1 Build Audience Modal

Two-column layout: rule builder (left) + Reach Estimator (right, 240px).

**Rule builder:**
- Audience Name input
- Industry Verticals checkboxes (12 verticals: Entertainment, Finance, Retail, Travel, etc.)
- Placement Type radio (Inline / Engagement / Pre-ticked / Survey)
- Rules section with AND/OR toggle, rows of Category/Attribute/Operator/Value selects
- "+ Add Rule" button
- Suppress Existing Customers checkbox

**Reach Estimator sidebar:**
- Estimated reach number
- Percentage of Rokt network
- Smart Bidding sufficiency indicator (green checkmark if reach sufficient for learning)

### 11.2 Create Lookalike Modal

- Seed audience dropdown
- **3-tier visualization:** concentric circles labeled Default (~10M), Broad (~20M), Broader (~30M). Click a circle to select tier.
- Create button calls `createLookalike()` — adds LAL to audiences array with appropriate size.

### 11.3 Upload List Modal

- Drag-and-drop CSV zone
- List name input
- Identifier type selector (Email, Phone, etc.)
- Match rate preview

---

## 12. Audience Detail View

**Route:** `#audience/{id}`

Full-screen audience profile. Header with back button → `#audiences`, audience name, type badge.

**6 KPI cards:** Size, Match Rate, Linked Campaigns, Avg CPA, Total Conversions, Total Spend.

**Two-column grid (main + sidebar):**

**Main column:**

**AI Audience Insights card:** 4 insight items:
- Match rate quality assessment + identifier advice
- Campaign usage warning (frequency cap if used in 2+ campaigns) or expansion opportunity
- Top-performing age cohort recommendation (25–34 focus segment)
- Mobile-first recommendation (64% mobile composition)

**Audience Composition card (2-column layout):**
- Age Distribution: horizontal bar chart for 18–24, 25–34, 35–44, 45–54, 55+ age bands
- Gender: Female / Male / Non-binary percentage bars (beetroot / blue / amber fill)

**Device & Geography card (2-column layout):**
- Device cards with icon: Desktop, Mobile, Tablet with percentages and mini progress bars
- Top Regions table: region name + percentage

**Performance by Campaign table:** Linked campaigns with Status, Spend, CPA, Conversions, Ref. Rate, CVR. Clickable rows → `#campaign/{id}`.

**Sidebar column:**
- **Details card:** Type badge, Size, Match Rate (color-coded), Freshness, Created date, Last Updated
- **Interest Signals card:** Tag cloud of interest badges (varies by audience type)
- **Expansion Options card:** Create Lookalike, Broaden Targeting, Overlap Analysis buttons

---

## 13. Creative Studio

**Route:** `#creatives`

**3-panel layout:** Library (220px fixed) | Editor (flexible) | Preview (320px fixed).

### 13.1 Library Panel

- Search input (filters list in real-time)
- Format selector dropdown
- Scrollable list of advertiser-scoped creatives
- Each item: creative name, format · CoPI% metadata
- Active item: beetroot left border highlight
- Expand icon (⛶) on each item → navigates to `#creative/{id}`

### 13.2 Editor Panel

**Format tabs:** Text | Benefits | Savings | Hero Image | Carousel — each tab changes the preview rendering format.

**Fields:**
- Title (40-char max with live counter; warns at 35)
- Body (textarea with live updates)
- CTA (25-char max with live counter)
- Linked Offer dropdown (filtered to advertiser's offers)
- Dynamic Attributes chips: `{customer.firstname}`, `{partner.name}`, `{rokt.customeraction}` — clicking a chip inserts the attribute at the cursor position in the focused field

**ACE Performance Score (ring gauge):**
- Circular SVG arc 0–10 scale
- Score computed live: base 5.0, +1.2 for title 10–40 chars, +1.0 for body 30–120 chars, +0.8 for CTA 5–20 chars, +0.3 for urgency signals (!, %, $), +0.4 for 8+ word body. Max 9.9, min 3.0.
- Arc color: green (≥8), beetroot (≥6), amber (<6)
- Score dimension pills below ring: `✓ Title length` / `⚠ Short title` (good/warn/bad states)

**Auto-Enhance button** — appends `!` to title if missing, fires `updateCreativeAIScore()`, shows success toast.

**Generate A/B Variants button** — calls `generateVariants()`, shows panel with 3 angle-labeled variants:
- Variant 1: "[base] — Limited Offer!" · Score 8.4 · Angle: Urgency
- Variant 2: "Why Millions Love [brand]" · Score 7.9 · Angle: Social Proof
- Variant 3: "Get Started Today — [base]" · Score 7.2 · Angle: Action-First
- Each variant has "Use" button that applies title to editor and re-scores

**Policy Check button** — 1.2s simulated check with "Checking..." state → "✓ Passes policy check" success state.

**Dynamic attribute chips** — `{customer.firstname}`, `{partner.name}`, `{rokt.customeraction}` insert into the focused textarea at cursor position.

### 13.3 Preview Panel

- **Device toggle:** Desktop | Mobile (adjusts preview card max-width)
- **Partner context tabs:** Ticketmaster | Fanatics | Booking.com — switching updates the partner context label in the preview card
- **Live preview card:** "SPONSORED" tag, partner context label, title, body, offer value pill, CTA button (beetroot), "No thanks" decline link. Updates in real-time on every keystroke.

---

## 14. Creative Detail View

**Route:** `#creative/{id}`

Full-screen creative profile. Header with back button → `#creatives`, creative name, format badge.

**6 KPI cards:** Referral Rate, CVR, CoPI, Impressions, Clicks, Conversions (aggregated from linked campaigns).

**Two-column grid (main + sidebar):**

**Main column:**
- **AI Creative Insights card:** Performance narrative (strong/weak based on CTR), fatigue detection if high impressions + low engagement, best-performing audience segment identification, mobile optimization recommendation.
- **Performance by Audience table:** 3 audience rows with Impressions, CTR, CVR, CoPI — computed as +/- multipliers from base creative stats.
- **Linked Campaigns table:** Campaigns using this creative with status, spend, CPA.

**Sidebar column:**
- Creative preview card (title/body/CTA rendered visually)
- Details card (format, campaign, created/modified dates, status)
- ACE Enhancement card: Generate Variants, Auto-Enhance, Predict Performance buttons

---

## 15. Offers

**Route:** `#offers`

Two sections: Offers grid (top) and Product Catalog (bottom).

**Offers grid:** Advertiser-scoped cards, each showing:
- Type icon + offer name + type label
- Value, cost, linked campaigns count, CoPI %, CVR %
- Hover: edit pencil appears
- Click: opens edit modal

**Create Offer button** → modal with: Type pills (Discount/Trial/Cashback/Shipping/Product), Offer Value input, Cost input, Validity date range.

**Edit Offer modal:** Same fields pre-populated. Delete button (with confirmation dialog).

**Product Catalog section** (below offers): Filter pills (All / Low Stock / In Stock). Product cards showing icon, name, price, stock status badge.

---

## 16. Intelligence

**Route:** `#intelligence`

**Tab navigation:** Reports | Experiments (tab switch via `switchIntelTab()`).

### 16.1 Reports Tab

**AI Insight banner** — dismissable, shows data-driven insight (e.g., "CPA improved 12% week-over-week — primarily driven by Disney+ Spring optimization").

**Report controls bar:**
- Date range pills: **7D | 14D | 30D | MTD** — actively re-render chart and table on click
- Attribution model dropdown: Last Click, First Click, Linear, Time Decay — triggers toast + re-render
- Compare toggle: when enabled, overlays previous period as dashed lines on the chart
- Group By dropdown: Campaign / Ad Set / Creative / Device / Geography / Day of Week

**Report Chart:** 3-line SVG chart:
- Spend line (beetroot)
- Conversions line (brand-blue)
- CPA line (positive green)
- Rokt connector-shaped data point markers

**Campaign Performance Table:**
- Columns: Campaign | Impressions | Clicks | Ref. Rate | Conversions | CPA | ROAS | CoPI | Spend
- Sortable headers — click to sort asc/desc with ↑/↓/↕ indicator
- CPA cells amber when above campaign's `cpaTarget`
- Totals/averages row at bottom

**Export options:** CSV, PDF, Scheduled Email, API.

### 16.2 Experiments Tab

**Filter pills:** All | Running | Concluded | Draft.

**Experiment cards:**
- Type badge (A/B or MAB)
- Campaign name, status badge, days progress (e.g., "8/14")
- Statistical significance progress bar (green at ≥95%, blue at ≥70%, gray below)
- Leader + lift metric (e.g., "Variant B · +18% CoPI")
- "Apply Winner" button on concluded experiments

**New Experiment button** → modal with: Experiment name, Type (A/B vs MAB pills), Campaign selector, Control/Variant builder, Traffic allocation, Duration (days), Success metric.

**4 mock experiments:** Disney+ Creative A/B (Concluded, 97% significance), Capital One Audience Split (Running, 72%), Hulu MAB Creative (Running, 58%), True Classic DPA vs Static (Draft).

---

## 17. Network Analyzer & Forecaster

**Route:** `#network-analyzer`

**Header:** Back button → `#intelligence`, "Network Analyzer & Forecaster" title, Refresh Forecast + Export buttons.

**Forecast KPI strip (6 metrics):**
| Metric | Notes |
|---|---|
| 8-Week Spend Forecast | Aggregated projected spend |
| 8-Week Conversion Forecast | Projected conversions |
| Predicted Avg. CPA | With trending direction |
| Network Utilization % | Of available inventory |
| Active Partners | Count vs. 12 available |
| Confidence | Model confidence % (colored positive) |

**Spend Forecast Chart (left):** SVG line chart with beetroot fill, animated line, confidence band (upper/lower bounds as dashed lines ±10%), week labels.

**Conversion Forecast Chart (right):** Same structure with blue/green fill.

**Partner Network Quality Table:**
- 8 partners: Ticketmaster, Fanatics, Booking.com, StubHub, Grubhub, Shutterfly, Chewy, LiveNation
- Columns: Name, Category, Transaction Volume, Match Rate %, Avg CPA, Quality score bar (60–100 range), Trend (↑/↓)

**AI Network Recommendations:** Actionable cards (e.g., "Add Chewy to partner mix for +12% reach at similar CPA").

**Scenario Planner:**
- Budget change input/slider
- Audience expansion options
- Partner addition/removal toggles
- "Run Scenario" button — recalculates and updates forecast KPIs (via toast in prototype)

---

## 18. Measurement

**Route:** `#measurement`

**Layout:** 3-column top section (gauge + identifiers + recommendations) + measurement groups table below.

### 18.1 Integration Health Gauge

Circular gauge 0–10. Score: 7.8. Color: amber (5–7) / green (8+) / red (<5). Trend: "+0.4 from last month". Context: True Classic at 4.8 triggers the context alert bar.

### 18.2 Identifier Coverage Grid

| Identifier | Status | Impact |
|---|---|---|
| Email (SHA-256) | Active ✓ | High |
| Phone (SHA-256) | Missing ✗ | Medium |
| Rokt Click ID | Active ✓ | High |
| IP Address | Active ✓ | Low |
| User Agent | Active ✓ | Low |
| Transaction ID | Active ✓ | Medium |

Missing phone drives the context alert bar warning.

### 18.3 Integration Health Recommendations

Actionable improvement cards with estimated Health impact:
- Add phone number to CAPI integration → +1.5 Health
- Enable server-side Click ID passback → +0.5 Health
- Increase email coverage from 78% to 90% → +0.3 Health

Each card: icon, text, impact badge, "View Integration Guide" / "Configure SDK" buttons.

### 18.4 Measurement Groups Table

Columns: Name | Linked Campaigns | Status | Optimization Event | Attribution Window | Integration Health score (color-coded).

4 mock groups: Disney+ Acquisition MG (7C+1V), Capital One Cards MG (30C+1V), Streaming Bundle MG (7C+1V), True Classic DPA MG (7C).

**Row click → Measurement Group Detail Modal:**
- Applied campaigns list
- Conversion Events with enable/disable toggles
- Attribution Window configuration (click-through days slider, view-through toggle)
- Identifier Coverage for this group
- Group-specific recommendations

---

## 19. Advertiser Profile

**Route:** `#advertiser-profile`

**Header:** Advertiser avatar (branded color + initials), name, industry tag, vertical badges.

**6 KPI cards:** Total Spend, Active Campaigns, Conversions, Avg CPA, ROAS, Account Health score.

**Industry Benchmarks:** Two-row comparison table (You vs. Industry Average) for CPA, CVR, Referral Rate. Visual bar showing relative position.

**Campaign Performance Table:** All campaigns for this advertiser with full performance metrics.

**AI Advertiser Insights card (3 items):**
- CPA vs. industry benchmark — outperforming/underperforming % with scaling or optimization recommendation
- Campaign count vs. comparable advertisers — expansion or confirmation message
- Top partner recommendations for advertiser's vertical

**Sidebar (3 cards):**

**Profile Details:**
- Industry, Vertical, Account Tier (Enterprise), Region (North America), Currency, Timezone, Onboarded date, Account Manager (Sarah Chen)

**Quick Actions:**
- New Campaign, Network Analyzer, Intelligence, Account Report buttons

**Integration Status:**
- Web SDK, CAPI, CDP Integration, Product Feed — connected/not connected per advertiser

---

## 20. Account

**Route:** `#account`

### 20.1 Team Management

Table: Name | Email | Role (Admin/Editor/Viewer badge) | Last Active.

4 mock team members: Max Dowaliby (Admin), Sarah Chen (Editor), James Wilson (Editor), Emily Park (Viewer).

"Invite User" button → modal with email input, role selector, optional message.

### 20.2 Integrations

Grid of integration cards:
| Integration | Status |
|---|---|
| Web SDK (v4.2.1) | Connected |
| Conversions API (CAPI) | Connected |
| mParticle CDP | Connected |
| Segment | Disconnected |
| SFTP Data Feed | Connected |
| Google Analytics | Disconnected |

Each card: status dot, name, description, Configure / Connect button.

### 20.3 MCP Connectors

**Intro copy:** "Connect AI tools and external services via Model Context Protocol (MCP). MCP servers expose Rokt Ads capabilities as tools that AI assistants can use to manage your campaigns."

7 connector cards in a grid:

| Connector | Type | Status | Tools |
|---|---|---|---|
| Claude (Anthropic) | MCP Server | Connected | Campaign Management, Audience Builder, Creative Generator, Performance Analyzer, Bid Optimizer |
| Reporting API | MCP Server | Connected | Query Metrics, Export Reports, Schedule Dashboards |
| Offer Catalog API | MCP Server | Connected | Create Offers, Update Creatives, Manage Landing Pages |
| Audience API | MCP Server | Connected | Build Audiences, Sync Segments, Lookalike Generation |
| Experimentation API | MCP Server | Available | Create Experiments, Analyze Results, Apply Winners |
| ChatGPT (OpenAI) | AI Provider | Available | Text Generation, Summarization |
| Gemini (Google) | AI Provider | Available | Image Analysis, Performance Prediction |

Claude card shows MCP Server Endpoint: `mcp://rokt-ads.mcp.rokt.com/v1` with "Copy Endpoint" button.

Available connectors have animated "Connect" button (1.2s connecting state → Connected badge).

---

## 21. AI Features

AI is woven throughout the platform, not bolted on.

### 21.1 AI Hero Prompt (Builder)

Animated gradient border input at the top of the Campaign Builder. Accepts natural language campaign descriptions. "Generate Campaign" fills all builder fields with realistic data and jumps to the review step.

### 21.2 ACE Performance Score (Creative Studio)

Live-computed creative quality score (3.0–9.9) updating on every keystroke in the title, body, or CTA fields. Circular SVG ring gauge changes color from amber → beetroot → green as score improves. Score breakdown pills show pass/warn/fail states per dimension.

### 21.3 AI Recommendations Feed (Dashboard)

Dynamically generated from real campaign data: low creative count warnings, high pacing alerts, audience refresh nudges, integration health pausing suggestions. Each card has Apply + Dismiss actions.

### 21.4 AI Analysis & Suggestions (Campaign Views)

Present in both the campaign detail sidebar (overview tab) and campaign full view. Generates 1–6 suggestions per campaign from a rule-based engine evaluating: CPA vs. target, creative count, budget pacing, integration health, bidding state, trend direction. Each suggestion has icon, text, estimated impact, and action button.

### 21.5 Deep Dive Analysis Modal

Triggered from campaign AI Analysis card. Shows full narrative health summary, 7-day trend, optimization opportunities with impact estimates, action buttons.

### 21.6 Optimization Score Gauge (Dashboard)

Semi-circle gauge showing account-level AI health. Score 78/100 with "+6 pts available from 3 recommendations" label. Color-coded green/yellow/red.

### 21.7 AI Audience Insights (Audience Detail)

4 contextual insights per audience: match rate quality, campaign usage frequency, top-performing age cohort, device mix recommendation.

### 21.8 AI Creative Insights (Creative Detail)

Performance narrative, fatigue detection, audience affinity analysis.

### 21.9 AI Advertiser Insights (Advertiser Profile)

3 insights: CPA vs. vertical benchmark, campaign count vs. comparable advertisers, top partner recommendations.

### 21.10 AI Network Recommendations (Network Analyzer)

Partner mix optimization suggestions with estimated reach impact.

### 21.11 AI Recommended Audiences Section

Top of Audiences view: 3 AI-suggested audience cards (LAL from top converters, Reactivation segment, Behavioral in-market segment) with sparkle icons and "+ Create" buttons.

### 21.12 AI Copilot Drawer

**Trigger:** Breathing sparkle FAB at bottom-right (`.ai-fab` with `breathe` animation).

**Visual:** Right-side slide-out drawer, conversational chat interface with user/assistant message threading.

**Intro message:** Lists capabilities with bullet points. Proactive insight: "I noticed 3 campaigns are below target CPA. Want me to analyze them?"

**Typing indicator:** 3 bouncing dots while processing (1.2s delay).

**Context-aware NLP responses based on message content:**
- "pause" / "stop" → lists matching active campaigns with individual Apply buttons for each
- "how" + "campaign" / "doing" / "performance" → portfolio summary with active count, avg CPA, total conversions, top performer, and warning callout
- "creative" / "headline" / "generate" → 3 headline variants with ACE scores (8.7, 7.9, 7.2) and "Use" buttons
- "budget" / "spend" → budget analysis (daily cap hitting, remaining budgets, paused unspent)
- Other → generic recommendation response with Apply + More Details buttons

### 21.13 AI Sparkle Effect

On hover over AI-designated elements (`.ai-badge`, `.ai-rec-card`, `.ai-hero-section`, `.ai-analysis-card`), cursor sparkles spawn at mouse position with random offset, fade out in 500ms. Capped at 8 concurrent sparkles.

---

## 22. Keyboard Shortcuts

### Navigation Shortcuts

| Shortcut | Action |
|---|---|
| `Cmd+K` or `/` | Open command palette |
| `?` | Toggle keyboard shortcuts overlay |
| `Cmd+D` | Toggle dark/light mode |
| `Esc` | Close modal / drawer / palette / blur focused input |
| `G → D` | Go to Dashboard |
| `G → C` | Go to Campaigns |
| `G → A` | Go to Audiences |
| `G → R` | Go to Intelligence (Reports) |
| `G → M` | Go to Measurement |
| `G → O` | Go to Offers |
| `G → E` | Go to Creative Studio |
| `G → S` | Go to Account (Settings) |
| `N → C` | New Campaign (opens builder) |
| `N → A` | New Audience (opens Build Audience modal) |
| `J` / `K` | Navigate down/up in campaign table rows |

### Two-Key Chord Indicator

On first keypress of `G` or `N`: a floating `.key-chord-indicator` element appears showing:
- The pressed key in a `<kbd>` tag
- Label ("Go to..." or "New...")
- Available completion keys with destination labels

Auto-dismisses after 1.5s timeout (or immediately on completion or Esc).

### Navigation Overlay Badges

Simultaneously with the chord indicator, each matching sidebar nav item receives a `.shortcut-overlay-badge` overlay showing the completion key letter in a `<kbd>` tag. Removed on completion or timeout.

### Command Palette

**Trigger:** Cmd+K, `/`, or clicking the search bar.

**Visual:** Full-screen overlay with backdrop blur, centered 600px panel, scale-in animation.

**Sections:**
- **Navigate** — all views with icons and keyboard shortcut hints
- **Campaigns** — all campaign names (advertiser-scoped)
- **Audiences** — all audience names
- **Creatives** — all creative names
- **Actions** — New Campaign (N C), New Audience (N A)

**Interaction:** Live fuzzy text search filters all sections simultaneously. Arrow key navigation highlights items. Enter selects. Esc closes.

### Shortcuts Overlay

`?` toggles a full-screen overlay (`#shortcutsOverlay`) showing a formatted two-column table of all shortcuts with `<kbd>` styling.

---

## 23. Data Model

### Advertisers (6)

| ID | Name | Color | Campaigns | Spend |
|---|---|---|---|---|
| adv1 | Disney+ | #1A3B8F | c1, c7, c8 | $85,750 |
| adv2 | Capital One | #C41230 | c2, c9, c10 | $50,700 |
| adv3 | Hulu | #1CE783 | c3, c11 | $31,000 |
| adv4 | True Classic | #2D3748 | c4, c12 | $39,200 |
| adv5 | PayPal | #003087 | c5, c13 | $8,900 |
| adv6 | Audible | #F7991C | c6 | $0 |

### Campaigns (13)

| Campaign | Status | Bidding | CPA | CoPI | ROAS |
|---|---|---|---|---|---|
| Disney+ Spring Acquisition | Active | Optimizing | $5.82 | 4.12% | 5.1x |
| Capital One Card Acquisition | Active | Optimizing | $8.45 | 3.21% | 3.8x |
| Hulu Streaming Signup | Active | Learning | $9.14 | 2.84% | 2.9x |
| True Classic DPA | Requires Action | Limited | $12.30 | 2.15% | 4.8x |
| PayPal Pay+ Activation | Paused | Optimizing | $6.20 | 3.95% | 4.2x |
| Audible Free Trial | Draft | Draft | — | — | — |
| Disney+ Bundle Upsell | Active | Optimizing | $6.10 | 3.85% | 4.6x |
| Disney+ App Install | Active | Learning | $3.40 | 4.55% | 6.2x |
| Capital One Venture Rewards | Active | Optimizing | $9.75 | 2.95% | 3.5x |
| Capital One Travel Portal | Draft | Draft | — | — | — |
| Hulu + Live TV Bundle | Paused | Optimizing | $11.20 | 2.10% | 2.3x |
| True Classic Seasonal Sale | Active | Learning | $10.50 | 2.65% | 5.2x |
| PayPal Business Solutions | Draft | Draft | — | — | — |

**Campaign fields:** id, name, status, objective (CPA/ROAS), spend, budget, cpa, cpaTarget, copi, roas, conversions, impressions, clicks, ctr, cvr, integrationHealth (1–10), biddingState, adSets count, creatives count, trend array (8 points), trendDir (up/down/flat), dailySpend array (7 days), publishState, objectiveType, country, language, timezone, aiHealthScore.

### Audiences (12)

Custom (3), Lookalike/LAL (3), Behavioral (3), Demographic (1), Starter (1), Experian (1). Sizes: 245K–31.2M. Match rates: 55%–94%.

### Creatives (8)

Formats: Text (3), Benefits (1), Savings (2), Hero Image (1), Carousel (1). Each: id, name, format, campaign label, ctr, cvr, copi, plus detail object with title/body/cta/offer.

### Offers (6)

Types: Discount (2), Trial (1), Cashback (2), Free Shipping (1). Cost range: $0–$50.00.

### Experiments (4)

Disney+ Creative A/B (Concluded, 97% sig), Capital One Audience Split (Running, 72%), Hulu MAB (Running, 58%), True Classic DPA vs Static (Draft).

### Measurement Groups (4)

Disney+ Acquisition MG, Capital One Cards MG, Streaming Bundle MG, True Classic DPA MG — each with event type and attribution window.

### Partners (8)

Ticketmaster, Fanatics, Booking.com, StubHub, Grubhub, Shutterfly, Chewy, LiveNation — with category and monthly transaction volume.

### Rokt-Specific Metrics

| Metric | Definition |
|---|---|
| **CoPI** | Conversions per Impression — Rokt's North Star; combines CTR × CVR |
| **CPA** | Cost per Acquisition — primary advertiser success metric |
| **ROAS** | Return on Ad Spend — for revenue-objective campaigns |
| **Integration Health / EMQ** | Event Match Quality — 1–10 score indicating signal coverage |
| **Smart Bidding State** | Learning / Optimizing / Limited — ML model status |
| **CVR** | Conversion Rate — post-click conversion rate |
| **Ref. Rate (CTR)** | Referral Rate — click-through rate in the Transaction Moment |

---

## 24. CRUD Operations

All create/edit operations mutate the in-memory data arrays and re-render the relevant view. Destructive operations require confirmation dialogs.

| Entity | Create | Edit | Delete / Archive | Duplicate |
|---|---|---|---|---|
| Campaign | Builder wizard (AI or manual) | Edit modal (name, budget, CPA target, status, objective, bid strategy) | Archive → status: 'archived' with confirmation | "Copy of..." prefix, resets to draft |
| Audience | Build/LAL/Upload modals | Edit modal with rule builder + reach estimator | Delete with confirmation | Duplicate button in edit modal |
| Creative | Builder Step 4 or Studio editor | Inline editor in Creative Studio | — | — |
| Offer | Create Offer modal | Edit Offer modal | Delete with confirmation | — |
| Experiment | New Experiment modal | Edit modal (draft only; view-only if running/concluded) | Delete with confirmation | — |
| Measurement Group | Create Group modal | Detail modal config | — | — |

---

## 25. SVG Charts

All charts are inline SVG with no external chart library:

- **Spend Pacing (Dashboard):** Area chart with wine gradient fill, dashed projection line, dotted budget ceiling, Rokt connector symbol data points, live range switching.
- **Campaign Spend (Detail):** Line chart with gradient fill, range switching, connector markers.
- **Report Chart (Intelligence):** 3-line chart (spend/conversions/CPA) with compare mode overlay.
- **Network Forecast (Network Analyzer):** 2 forecast charts with confidence bands (dashed ±10% bounds).
- **Audience Composition:** Horizontal bar chart (age), segmented bar (gender), progress bars (device), table (geography).
- **Optimization Score:** Semi-circle SVG gauge with animated stroke-dasharray on load.
- **AI Readiness (Builder):** Circular ring gauge, animated via CSS transition.
- **ACE Score (Creative Studio):** Circular arc gauge with live animation on keystroke.
- **Bidding State (Campaign):** Learning phase progress bar + conversion counter.

Chart line animation: `stroke-dasharray` drawn via CSS class `.chart-line-animate` with 600ms transition.

---

## 26. Public API (`RoktAds.*`)

The IIFE returns a public object used by inline `onclick` handlers throughout `index.html` templates:

```
RoktAds.navigate(view)          — Navigate to a view
RoktAds.openModal(type, id)     — Open a modal
RoktAds.closeModal()            — Close modal overlay
RoktAds.toast(message, type)    — Show toast notification
RoktAds.toggleTheme()           — Toggle dark/light mode
RoktAds.toggleAIDrawer()        — Open/close AI Copilot drawer
RoktAds.openCommandPalette()    — Open command palette
RoktAds.switchAdvertiser(id)    — Switch to advertiser
RoktAds.toggleFavorite(id)      — Toggle advertiser favorite
RoktAds.toggleCampaignStatus(id) — Pause/resume campaign
RoktAds.archiveCampaign(id)     — Archive with confirmation
RoktAds.duplicateCampaign(id)   — Clone campaign as draft
RoktAds.openDeepDive(id)        — Open Deep Dive modal
RoktAds.selectCreative(id)      — Select creative in Studio
RoktAds.updateCreativeAIScore() — Recompute ACE score
RoktAds.generateVariants()      — Generate A/B creative variants
RoktAds.enhanceCreative()       — Auto-enhance creative title
RoktAds.insertAttr(attr)        — Insert dynamic attribute in editor
RoktAds.sortReport(col)         — Sort report table by column
RoktAds.switchIntelTab(tab)     — Switch Intelligence tab
RoktAds.persistField(key, val)  — Update builderData field
RoktAds.updateBuilderPreview()  — Re-render Step 4 live preview
RoktAds.generateAICampaign()    — Fill builder from AI prompt
RoktAds.nextBuilderStep()       — Advance builder step
RoktAds.prevBuilderStep()       — Go back a builder step
RoktAds.addAdSet()              — Add ad set to builder
RoktAds.removeAdSet(idx)        — Remove ad set from builder
RoktAds.selectBidStrategy(str)  — Set bid strategy in builder
RoktAds.simulateImageUpload()   — Simulate image upload state
RoktAds.createAudience()        — Save new audience from modal
RoktAds.createLookalike()       — Save new LAL audience from modal
RoktAds.createOffer()           — Save new offer from modal
RoktAds.createExperiment()      — Save new experiment from modal
RoktAds.confirmDelete(type, id) — Show delete confirmation
```
