# Rokt Ads — Next-Generation Media Buying Platform Prototype

## Context

Rokt Ads is evolving from its current One Platform (OP) advertiser experience into a modern, world-class media buying platform. The current product supports campaign management, audience targeting, creative management, reporting, experimentation, and billing — but the UX was built incrementally and doesn't match the polish of Meta, Google Ads, or The Trade Desk. Rokt is also introducing new object hierarchy changes (Offers, Ad Sets, Product Sets) in FY27 that fundamentally reshape the advertiser workflow.

**Goal:** Build a complete, clickable HTML prototype of the reimagined Rokt Ads platform — a bleeding-edge, design-forward product that feels like it was built by a top-tier design agency (IDEO/Work&Co/Clay caliber). This is an explorable, static prototype with no backend — pure interaction design, animations, and workflow polish.

---

## Design Philosophy

### Inspirations & Benchmarks

**Premium SaaS (UX gold standard):**
- **Linear** — Command palette (Cmd+K), keyboard-first, calmer interface, advanced AND/OR filtering, sub-100ms interactions, animations that communicate state
- **Vercel/Geist** — Monochrome + accent color, sidebar navigation masterclass, developer-first density, real-time deployment feel
- **Stripe** — Dense but readable tables, `?` shortcut discovery, auto-generated WCAG-compliant color tokens, systematic accessible design
- **Figma** — Collaborative feel, contextual toolbars, prompt-to-prototype AI, smooth transitions

**Ad Platform competitors:**
- **Meta Ads Manager** — Campaign > Ad Set > Ad hierarchy, inline editing in tables, Advantage+ AI automation, guided creation flow with objective selection cards
- **Google Ads** — Recommendations tab with optimization score, Performance Max asset groups, Material Design patterns, smart bidding visual explanations
- **The Trade Desk (Solimar)** — Purpose-built for programmatic, Koa AI optimizer, cross-device graph visualization, modern redesign (2023+)
- **TikTok Ads** — Creative Center with AI tools, Spark Ads native format, interactive ad builder, trend-aware suggestions
- **Snapchat Ads** — AR lens creation flow, story-native formats, simplified campaign builder

**Design agency principles informing this work:**
- **IDEO** — Human-centered design: empathy research → ideation → rapid prototyping. Every screen must solve a real user need.
- **Work & Co** — Prototype-first (no decks, ever). Ship working prototypes from day one. Ruthless prioritization. Virgin America's 60-second booking as benchmark for flow compression.
- **Clay** — Behavioral science meets storytelling. Visual design should drive measurable outcomes (40% traffic lift, 25% conversion improvement on their projects).
- **ustwo** — "Every screen should be art worth hanging on a wall." Minimalism as discipline, emotional engagement through restraint.
- **Fantasy** — Enterprise complexity simplification. Take the most complex workflow and make it feel effortless.

**Key insight from research:** Two functionally similar products can command 3-5x pricing differences based on experiential differentiation. Linear vs. Jira is the canonical example. We're building the "Linear of ad platforms."

### Core Design Principles
1. **Keyboard-first, mouse-optional** — Cmd+K command palette (cmdk pattern), vim-style `j/k` navigation, `?` shortcut discovery (Stripe pattern), every action keyboard-reachable
2. **Progressive disclosure** — Simple by default, powerful on demand. No overwhelming forms. Bento grid dashboards with expandable detail.
3. **Real-time feel** — Streaming number counters, live pacing indicators, pulse animations on active campaigns, WebSocket-style status updates
4. **Spatial awareness** — Breadcrumbs + hierarchy visualization always visible. Meta's campaign tree pattern adapted for Rokt's deeper hierarchy (Account > Campaign > Ad Set > Offer > Creative)
5. **Information density done right** — Stripe-style tables with smart column defaults, expandable rows, inline editing, auto-saved changes
6. **Motion with purpose** — Every animation communicates state change. 150-250ms sweet spot. Framer Motion-inspired choreography. No gratuitous animation. "The rainbow dashboard is dead" — neutral grays + wine/blue accents only.
7. **AI-native, not AI-bolted** — Conversational assistant woven into workflow (like Google Ads Advisor), natural language campaign creation, proactive suggestions, but invisible-and-useful not marketed-and-mediocre
8. **Craft is the product** — Typography, spacing, color, and motion ARE the competitive advantage. Inter for UI, JetBrains Mono for data. Generous whitespace. Pill-shaped CTAs. Glassmorphism for modals.

### Rokt Brand System
Based on rokt.com's actual design tokens and visual language:
- **Wine/Beetroot:** #8B2635 — primary brand accent, CTAs, active states (deep burgundy-red, not bright red)
- **Brand Blue:** #4D65FF — focus outlines, secondary interactive accent, links
- **Black:** #000000 — dark mode backgrounds, hero sections, strong headings
- **White:** #FFFFFF — light mode surfaces, reversed text on dark
- **Surface Light:** #F7F8FA — content area backgrounds, card fills
- **Surface Dark:** #0A1628 — sidebar, dark panels, navigation
- **Text Primary:** #1A1A2E — body text on light backgrounds
- **Text Secondary:** #6B7280 — labels, captions, metadata
- **Positive:** #10B981 (emerald) — growth indicators, healthy metrics, live status
- **Warning:** #F59E0B (amber) — attention needed, approaching limits
- **Negative:** #EF4444 — errors, declining metrics, critical alerts
- **Typography:** Inter (UI text) + JetBrains Mono (metrics, data tables, code) — matching Rokt's geometric sans-serif aesthetic
- **Signature visual elements:** Pill-shaped buttons (border-radius: 5rem), skewed section dividers, glassmorphism on modals (backdrop-filter: blur), angular/geometric aesthetic
- **Border radius:** 12px (cards — generous, modern), 8px (inputs), 20px (badges/pills)
- **Shadows:** Layered system — `0 1px 2px rgba(0,0,0,0.04)` base, `0 4px 16px rgba(0,0,0,0.08)` elevated, `0 8px 32px rgba(0,0,0,0.12)` floating
- **Motion:** 200ms ease-out default transitions, scale(1.02) hover lifts, smooth page crossfades

---

## Prototype Architecture

### Single HTML Application
- **One `index.html` file** with embedded CSS and JavaScript
- **CSS:** Custom properties (design tokens), CSS Grid/Flexbox, @keyframes animations, view transitions
- **JS:** Vanilla JS with a lightweight router for page navigation, no frameworks needed
- **Interactions:** CSS transitions + JS for command palette, modals, drawer panels, tab switching, inline editing
- **Data:** Hardcoded mock data objects representing realistic Rokt campaigns, metrics, audiences

### Screen Map (9 core views + contextual overlays)

Consolidated from 13 → 9 views. Merged related workflows instead of replicating OP's siloed structure. Every view is a destination that earns its place — no empty "settings" pages.

```
┌─────────────────────────────────────────────────────────┐
│ GLOBAL SHELL (sidebar + topbar + status bar)             │
│ ┌──────┬──────────────────────────────────────────────┐  │
│ │ Nav  │  Content Area                                │  │
│ │      │                                              │  │
│ │  ◉   │  1. Command Center (Dashboard)               │  │
│ │  ◉   │  2. Campaigns (List + Detail inline)         │  │
│ │  ◉   │  3. Campaign Builder (Create/Edit wizard)    │  │
│ │  ◉   │  4. Audiences (Library + Builder unified)    │  │
│ │  ◉   │  5. Creative Studio (Editor + Library)       │  │
│ │  ◉   │  6. Intelligence (Reports + Experiments)     │  │
│ │  ◉   │  7. Catalog (Products + Offers)              │  │
│ │  ◉   │  8. Measurement (Groups + EMQ + Attribution) │  │
│ │  ◉   │  9. Account (Billing + Settings + Users)     │  │
│ │      │                                              │  │
│ └──────┴──────────────────────────────────────────────┘  │
│                                                          │
│ [Cmd+K Command Palette]     [AI Copilot Drawer]          │
│ [Context Alerts Bar]        [Keyboard Shortcuts Overlay]  │
└─────────────────────────────────────────────────────────┘
```

**Key consolidations:**
- Audiences Manager + Audience Builder → **Audiences** (library with inline builder, no separate page)
- Reporting + Experiments → **Intelligence** (experiments ARE a form of analysis, unified view)
- Product Catalog + Offers → **Catalog** (products and offers are both "what you sell")
- Measurement Groups + EMQ → **Measurement** (attribution health in one place)
- Billing + Settings + Users → **Account** (one place for everything admin)
- Campaign List + Campaign Detail → **Campaigns** (master-detail with sliding panel, no full page nav)

---

## Ambient Intelligence Layer

Every screen should feel alive with contextual data. This isn't a feature — it's a design principle.

### Persistent Signals (visible everywhere)
- **Global health pulse** (status bar): Active campaigns, today's spend rate, system status — always ticking
- **Smart Bidding heartbeat**: Small animated indicator on any campaign card/row showing optimization state (learning ◐, optimizing ●, limited ◑)
- **Pacing indicators**: Color-coded micro progress bars on every budget touchpoint — green (on track), amber (behind/ahead), red (exhausted/overspending)

### Contextual Suggestions (per-view)
- **Campaign list**: "3 campaigns below target CPA — consolidate?" / "Creative refresh overdue on 2 campaigns"
- **Campaign detail**: "This audience has 40% overlap with your other ad set — consider exclusion" / "EMQ dropped to 4 — check CTL integration"
- **Creative Studio**: "Creatives with strikethrough pricing see 60% higher CoPI" / "Title exceeds 40 chars — shorter titles test better"
- **Audiences**: "This LAL seed hasn't been refreshed in 45 days" / "Suppression list is stale — last updated 30 days ago"
- **Intelligence**: "Statistical significance reached on Experiment #4 — ready to apply winner"

### Alert System (3 tiers)
- **Info** (blue dot): Recommendations, optimization opportunities, tips
- **Warning** (amber badge): Performance declining, budgets approaching limits, stale data
- **Critical** (red pulse): Integration broken, budget exhausted, EMQ below threshold, campaign paused unexpectedly

Alerts surface as: inline banners within relevant views, notification bell count in topbar, and proactive AI copilot messages.

---

## Rokt-Specific Metrics Framework

Unlike Meta/Google, Rokt operates in the **Transaction Moment** — post-purchase, high-intent, ecommerce context. The metrics hierarchy reflects this.

### Tier 1: Hero Metrics (always visible in ribbons and dashboards)
| Metric | Why it matters at Rokt | Display |
|---|---|---|
| **CoPI** (Conversions per Impression) | Rokt's north star efficiency metric. Unique to Rokt — combines CTR × CVR into one number | Large, prominent, with trend arrow |
| **CPA** (Cost per Acquisition) | Primary advertiser success metric for acquisition campaigns | With target comparison (actual vs target) |
| **ROAS** | Primary success metric for revenue campaigns | Multiple windows: Default, Social (7C1V), Search (30C1V) |
| **Spend / Budget** | Pacing is everything — under/overspend both bad | Progress bar with projected end-of-period |
| **EMQ** (Event Match Quality) | Rokt-unique: integration health score 1-10, directly impacts optimization | Gauge with color zones (red <5, amber 5-7, green 8+) |

### Tier 2: Diagnostic Metrics (visible in detail views and reports)
| Metric | Rokt context |
|---|---|
| **Smart Bidding State** | Learning / Optimizing / Limited — with "conversions to next state" counter |
| **CTR** (Click-through Rate) | Engagement rate for Rokt creatives in the Transaction Moment |
| **CVR** (Conversion Rate) | Post-click conversion — heavily impacted by landing page quality |
| **AOV** (Average Order Value) | Critical for ROAS campaigns — enables value-based optimization |
| **LAL Match Rate** | How well the seed list overlaps with Rokt's network |
| **Creative Diversity Score** | Are there enough materially different creatives? (min 4 recommended) |
| **Audience Overlap** | Cross-ad-set overlap detection — prevents cannibalization |

### Tier 3: Advanced Metrics (in Intelligence/reporting)
| Metric | Rokt context |
|---|---|
| **CPiA** (Cost per Incremental Acquisition) | For incrementality-measured campaigns |
| **Incremental Lift %** | Causal impact measurement |
| **Conversion Latency** | Time from impression/click to conversion — helps optimize attribution windows |
| **Event Coverage** | % of conversion events being captured (integration completeness) |
| **Deduplication Rate** | SDK + CAPI overlap health |

---

## Detailed Screen Specifications

### 0. Global Shell — The Living Frame
- **Left sidebar:** Collapsible to icon-only (animated width transition). Grouped: Command Center, Campaigns, Audiences, Creatives, Intelligence, Catalog, Measurement, Account. Active item has wine-colored left border + subtle glow.
- **Top bar:** Account switcher (dropdown with search), Cmd+K search trigger (pill-shaped, pulsing placeholder text cycles: "Search campaigns...", "Jump to reports...", "Ask AI anything..."), notification bell with count badge (animated on new alerts), user avatar with status dot
- **Command Palette (Cmd+K):** Full-screen overlay with backdrop blur. Fuzzy search across all entities. Sections: Navigate, Campaigns, Audiences, Creatives, Actions. Recent items at top. AI natural-language mode: type a sentence and it routes to the right action.
- **AI Copilot:** Persistent floating button (bottom-right) with breathing pulse when it has suggestions. Opens as a slide-in panel from right. Chat-style conversation. Can take actions: "Pause campaign", "Create audience", "Show report". Mock responses with inline action buttons and data cards.
- **Status bar (bottom):** Compact bar with: [12 Active Campaigns] [Today: $42,187 ↑3.2%] [System: Healthy ●] — numbers animate/tick in real-time
- **Context alert bar:** Below topbar, appears when there are critical/warning alerts. Dismissable. Amber or red background with action button. "EMQ dropped below 5 on Disney+ campaign → Fix integration"
- **Keyboard shortcuts:** `?` triggers full-screen overlay listing all shortcuts with animated entrance

### 1. Command Center (Dashboard)
The nerve center. Not a passive dashboard — an active command station.

- **Hero metrics strip:** 5 large KPI cards in a row — Total Spend (with $ ticking animation), Conversions (counter roll-up), Avg CoPI (Rokt's north star, prominent), Avg CPA (with target comparison), Avg ROAS. Each card has sparkline, trend arrow, and period comparison badge. Cards animate in with staggered fade-up on load.
- **Spend pacing visualization:** Full-width area chart — actual spend (solid wine area) vs projected (dashed line) vs budget ceiling (dotted). Hover shows daily breakdown tooltip with smooth tracking crosshair.
- **Campaign health grid:** Bento grid of campaign cards (not a table). Each card: campaign name, objective icon, mini pacing bar, CoPI trend, Smart Bidding state (animated ◐/●/◑). Click → slides open campaign detail panel. Cards have subtle hover lift animation.
- **AI Insights sidebar:** Right-side panel with scrollable insight cards. Each has: icon (lightbulb/warning/chart), brief insight, impact estimate, one-click action button. "Hulu CPA is 22% above target → Suggest: Expand LAL to Broad tier" with "Apply" button. New insights slide in with animation.
- **Activity timeline:** Recent actions as a vertical timeline with avatars, timestamps, and entity links. "Budget increased on Capital One campaign" / "Experiment #4 reached significance"

### 2. Campaigns — Master-Detail View
No separate list and detail pages. One unified view with a master list on the left and sliding detail panel on the right.

- **Left panel (campaign list):**
  - Toolbar: search input, filter pills (Status, Objective, Date), "New Campaign" primary CTA (wine pill button)
  - Smart filters: "Needs Attention" (campaigns with warnings), "Top Performers", "Recently Edited"
  - Table rows: Status dot (green/amber/red with pulse animation on active), Name, Objective icon, Spend/Budget progress bar (mini, inline), CPA or ROAS (vs target, color-coded), CoPI, Trend sparkline
  - Inline editing: double-click any number to edit in place (input appears with smooth transition, saves on blur/enter with toast confirmation)
  - Row expansion: chevron expands to show nested Ad Sets inline (animated height expansion)
  - Bulk select: checkbox column, floating action bar slides up from bottom ("Pause 3 campaigns", "Adjust budgets")
  - `j/k` keyboard navigation, `Enter` to open detail, `Space` to toggle status

- **Right panel (campaign detail — slides in from right):**
  - Header: Large campaign name (inline editable on click), status badge (toggleable), objective badge, action buttons (Duplicate, Archive, Share)
  - **Metric ribbon:** Horizontal scrolling strip of metric pills — Spend, Budget Remaining, CPA (vs target), ROAS, Conversions, CTR, CoPI, EMQ, Smart Bidding State. Each metric is a clickable chip that expands to show trend chart.
  - **Tabbed content area:** Overview | Ad Sets | Creatives | Analytics
    - **Overview:** Performance chart (multi-line, toggleable metrics via legend chips, date range bar with presets + custom), Budget pacing gauge (circular), Smart Bidding card with animated state indicator and "X conversions until optimizing" progress, Delivery heatmap (hour × day matrix)
    - **Ad Sets:** CBO/ABO toggle at top (with animated explanation tooltip). Ad set cards: name, audience, bid strategy, budget/pacing bar, linked creatives count. Each expandable to show linked offers and creatives. "Add Ad Set" button opens inline form.
    - **Creatives:** Grid of creative preview cards with format badge (Text/Benefits/Hero/Carousel). Hover reveals performance overlay (CTR, CVR, CoPI) with smooth fade. Click opens Creative Studio for that creative. "Link to Ad Set" drag handle.
    - **Analytics:** Inline pivot table with draggable dimension/metric chips. Chart toggle (line/bar/funnel). Quick presets: "By Day", "By Creative", "By Audience", "Conversion Funnel". Export button.
  - **Contextual alerts:** Inline banners within the detail panel — "Creative refresh overdue (last updated 47 days ago)" / "Audience overlap: 35% with Ad Set B"

### 3. Campaign Builder — Guided Creation Flow
A focused, full-screen experience (replaces the main content area) with cinematic step transitions.

- **Step indicator:** Top progress bar with labeled steps, completed steps get checkmark animation, current step pulses gently
- **Step 1 — Goal:** "What do you want to achieve?" Large, beautifully illustrated objective cards with hover animations (slight tilt + shadow lift). Cards: Customer Acquisition (CPA), Revenue Growth (ROAS), App Installs, Product Sales (DPA), Email Leads, Embedded Actions. Each card has a one-line description and relevant icon. **Or:** "Describe your campaign" text area → AI pre-fills everything (slides down with typing animation).
- **Step 2 — Setup:** Clean form: Campaign name (with AI suggestion), Measurement Group selector (with inline EMQ preview), Schedule (visual calendar with drag-to-select date range), Budget builder — visual stacked bars showing budget types (Lifetime guardrail on top, Daily/Weekly below). Drag handles to adjust amounts. Live "projected daily spend" indicator.
- **Step 3 — Strategy (Ad Sets):** "How do you want to reach people?" Add strategy cards. Each card: Name, Audience (searchable dropdown that inline-previews the audience with size gauge), Bid Strategy (Smart Bidding recommended with animated explanation — "Rokt's AI optimizes every impression using transaction intent signals"), optional Ad Set budget override. "Add Another Strategy" button to layer multiple.
- **Step 4 — Offers & Creatives:** "What will people see?" Split view: Left = Offer builder (type selector with icons: discount, free trial, cashback, shipping, product; value input, cost input, validity). Right = Creative editor (compact version of Creative Studio). Live preview updates as you type. Format picker (Text/Benefits/Savings/Hero). AI generate button: "Generate 4 variations" → cards fan out with staggered animation.
- **Step 5 — Review & Launch:** Summary card with visual hierarchy showing the full campaign tree (Campaign → Ad Sets → Offers → Creatives). Validation checklist with green checkmarks (animated) or amber warnings. "Launch Campaign" button — on click, confetti particle burst + success card with campaign link. If warnings: "Launch Anyway" secondary option.

### 4. Audiences — Library + Builder Unified
One view, two modes. Library is default; builder opens as an expanding panel within the same view.

- **Library mode:**
  - Grid of audience cards with type icon (Custom 👥, LAL 🔄, Starter ⚡, Demographic 📊, Behavioral 🎯, Experian 🏢)
  - Each card: name, type badge, size (formatted as "12.4M users"), linked campaigns count, freshness indicator (green/amber/red dot), match rate
  - Search + filter bar. Quick create buttons: "Upload List", "Create Lookalike", "Build Audience"
  - **LAL quick-create:** Select seed → tier picker with animated size visualization (concentric circles that grow: Default 10M → Broad 20M → Broader 30M) → generate (progress animation)
  - Contextual alerts on cards: "Suppression list stale — refresh recommended" / "LAL seed < 5K matched users — quality may be low"

- **Builder mode** (slides up from bottom as a half-screen panel, or opens full if needed):
  - Visual rule builder: AND/OR groups with drag-to-reorder
  - Rule row: [Category dropdown] → [Attribute] → [Operator] → [Value multi-select/input]. Add rule (+), remove rule (×), toggle AND/OR between groups
  - Categories: Demographics, Geography, Device, Custom Lists, Lookalikes, Experian (3rd party), Behavioral Signals, Feature-based (custom snippet attributes)
  - **Live reach estimator** (right sidebar): Animated gauge that updates in real-time as rules change. Shows: total reach, % of network, estimated daily impressions. With indicator of whether reach is sufficient for Smart Bidding.
  - Suppression toggle with explanation: "Exclude existing customers (recommended for CPA campaigns)"

### 5. Creative Studio — Editor + Library
Split-screen creative workspace with library on left, editor+preview on right.

- **Library panel (left):** Scrollable grid of existing creatives with thumbnails, format badges, performance sparklines. Search + filter. Drag a creative to edit it.
- **Editor panel (center):**
  - Format selector tabs at top: Text | Benefits | Savings | Hero Image | Product Carousel — selecting a tab smoothly morphs the form fields with animated transitions
  - **Title field:** Rich input with live character counter (turns amber near limit, red at limit). AI suggest button (sparkle icon) → generates 3 alternatives in a dropdown.
  - **Body/Benefits:** Expandable text areas with formatting hints. Benefits mode shows 3 benefit slots with drag-to-reorder.
  - **CTA:** Positive CTA input with character counter. Toggle for negative CTA option.
  - **Images:** Drag-drop zone with format-specific aspect ratio guides. Logo (1:1 + 4:1), Product (1:1 + 1.91:1), Hero (1.91:1). Thumbnail preview with remove button.
  - **Dynamic attributes:** "Insert variable" dropdown → `{rokt.customeraction}`, `{customer.firstname}`, `{partner.name}` — inserts as a colored chip in the text field
  - **Offer linking:** Dropdown to link this creative to an Offer (or create one inline)
  - **AI Generate panel:** Side panel: "Generate 4 creative variations" → controls for tone (rational/emotive), emphasis (value/urgency/social proof), length → generates cards with one-click apply
  - **Policy checker:** Bottom strip showing compliance status — green ✓ / amber ⚠ / red ✗ with specific issues ("Discount claim needs disclaimer")

- **Preview panel (right):**
  - Live preview that updates as you type (with debounced rendering)
  - Device toggle: Desktop / Mobile (preview resizes with smooth animation)
  - Partner context mockup: shows creative rendered within a mock ecommerce checkout page (Ticketmaster-style, retail-style, travel-style backgrounds)
  - Format preview: shows how the same creative renders across all eligible formats

### 6. Intelligence — Reports + Experiments Unified
One workspace for understanding performance. Reports and experiments are tabs within the same view.

- **Reports tab:**
  - **Quick insights strip:** 4-5 auto-generated insight cards at top (AI-surfaced anomalies, trends, opportunities). "CPA improved 12% week-over-week across all campaigns" / "Creative #7 outperforming by 3x — consider expanding"
  - **Report builder:** Dimension chips (drag from palette) for rows: Date, Campaign, Ad Set, Offer, Creative, Audience, Device, Geo, Hour. Metric chips for columns: Impressions, Clicks, CTR, Conversions, CPA, ROAS, CoPI, CVR, Spend, Revenue, AOV, EMQ. Drag to add/remove/reorder.
  - **Visualization toggle:** Table (default) / Line / Bar / Treemap / Funnel — smooth morphing animation between chart types
  - **Date range bar:** Preset pills (Today, 7D, 30D, MTD, QTD, Custom) + "Compare to" toggle (previous period, YoY)
  - **Attribution window selector:** Dropdown: Default (7C+1V), Custom (30C click-only), Social ROAS (7C1V), Search ROAS (30C1V) — switching recomputes all metrics with loading skeleton
  - **Saved reports:** Dropdown to load saved configurations. Share link button.
  - **Export:** CSV, PDF, scheduled email

- **Experiments tab:**
  - Active / Completed / Draft filter tabs
  - Experiment cards: name, type badge (A/B or MAB), campaign, status (running/concluded/draft), progress (days elapsed / total), current leader
  - **Create flow (modal):** Type selection (A/B or MAB with visual explanation), campaign selector, control creative, variant builder (add/edit variants inline), traffic allocation (A/B: sliders; MAB: "Auto-optimizing" with Thompson Sampling explanation), duration, success metric
  - **Results view:** Side-by-side creative previews with metric comparison table below. Statistical significance bar (fills up to 95%). Lift calculation with confidence interval. "Apply Winner" button → confirms and updates campaign creatives. For MAB: animated traffic allocation visualization showing how traffic shifted over time.

### 7. Catalog — Products + Offers
Unified view for managing what you're selling/offering.

- **Offers section:**
  - Card grid of offers: type icon (discount 🏷️, trial 🆓, cashback 💰, shipping 📦, product 🛍️), value display, cost to advertiser, validity, linked creatives count, performance (CoPI, CVR)
  - "Create Offer" → modal with structured form. Type selector (large icon buttons), value input, cost input, validity dates, fulfillment method (if Rokt-fulfilled: coupon bank, gift card, sweepstakes). Immutable once live — versioning explained.
  - Offer performance comparison: side-by-side view of offers by CoPI/CVR to identify best-performing value propositions

- **Products section (for DPA):**
  - Catalog browser: searchable grid with product images, names, prices, availability status
  - Product Set builder: "Create Set" → manual selection (checkbox grid) or rule-based (category filters, price range slider, availability toggle, AI-recommended)
  - Feed health: last sync, error count, coverage metrics
  - DPA preview: carousel mockup showing how products render in dynamic ads

### 8. Measurement — Attribution Health Center
Single view for everything related to conversion tracking, attribution, and measurement integrity.

- **EMQ Dashboard (hero section):**
  - Large EMQ gauge (1-10 scale, animated needle) with color zones
  - Breakdown by identifier: email ✓, phone ✗, Rokt Click ID ✓, IP ✓, etc. — each with contribution score
  - "Improve EMQ" action cards: specific recommendations ("Add phone number to CAPI integration → estimated +1.5 EMQ points")
  - Historical EMQ trend chart

- **Measurement Groups list:**
  - Cards showing: name, linked campaigns, status (Live/Draft/Deactivated), optimization target event, attribution window, incrementality status
  - Click to expand: conversion event configuration (up to 5 events with star icon on optimization target), attribution window visual slider (click-through days + view-through toggle), incrementality toggle (with lock warning)

- **Integration health:**
  - SDK status, CAPI status, event coverage %, deduplication rate, data freshness indicator
  - "Run diagnostic" button that checks integration quality

### 9. Account — Admin Hub
Clean, minimal admin section. Only the essentials.

- **Overview:** Account name, region, Rokt entity, account ID. Parent/child relationship visualization.
- **Billing:** Current month spend (large number), credit limit (progress bar), payment status. Invoice table with download links. Agency commission toggle (Gross/Net view).
- **Team:** User list with role badges (Admin/Editor/Viewer), last active time. Invite user flow. Permission matrix.
- **Integrations:** SDK setup wizard (step-by-step with code snippets), CAPI credentials, CDP connections (mParticle, Segment, etc.), SFTP config. Each integration has a health indicator.
- **Data governance:** Data retention selector, custom audience sharing toggles, privacy settings.

---

## Interaction Design Details

### Animations & Transitions
| Interaction | Animation | Duration |
|---|---|---|
| Page navigation | Crossfade with slight slide | 200ms ease-out |
| Modal open | Scale from 0.95 + fade | 150ms cubic-bezier |
| Drawer slide | Slide from right edge | 250ms ease-out |
| Table row expand | Height collapse/expand | 200ms ease-in-out |
| Metric counter | Number roll-up animation | 600ms on load |
| Status toggle | Smooth color transition | 150ms |
| Command palette | Fade + scale from top | 100ms |
| Toast notification | Slide in from top-right | 200ms, auto-dismiss 4s |
| Button hover | Subtle lift + shadow | 100ms |
| Chart render | Staggered line draw | 400ms per series |
| Confetti (launch) | Particle burst | 1.5s |

### Keyboard Shortcuts
| Shortcut | Action |
|---|---|
| `Cmd+K` | Open command palette |
| `?` | Show keyboard shortcuts |
| `g c` | Go to Campaigns |
| `g r` | Go to Reports |
| `g a` | Go to Audiences |
| `g d` | Go to Dashboard |
| `n c` | New Campaign |
| `n a` | New Audience |
| `Esc` | Close modal/drawer |
| `j/k` | Navigate table rows |
| `/` | Focus search |
| `e` | Edit selected item |
| `Space` | Toggle selected campaign |

### AI Assistant Interactions
- Floating button (bottom-right) with pulse animation when insights available
- Slide-in chat drawer with message history
- Example prompts: "Create a CPA campaign for Disney+ targeting women 25-45", "What's the best performing creative this week?", "Why did CPA spike yesterday?"
- AI responses include actionable buttons ("Apply this change", "View campaign", "Create audience")

---

## Implementation Plan

### Phase 1: Foundation — Design System, Shell & Command Center
**Output:** `index.html`, `styles.css`, `app.js` — the foundational trio
- Full CSS design token system (colors, typography, spacing, shadows, radii, animation timings)
- Global shell: collapsible sidebar with hover expand, topbar with account switcher and Cmd+K trigger, status bar with live tickers
- Hash-based SPA router with animated view transitions (crossfade + slide)
- Command palette: full-screen overlay with backdrop blur, fuzzy search, sections, keyboard navigation
- Keyboard shortcut system: `?` overlay, `g+key` go-to, `j/k` list navigation, `Esc` close
- Toast notification system (slide-in from top-right, auto-dismiss)
- Animation utility library (fade-in, slide-up, scale-in, number-roll, pulse, stagger)
- Alert/context bar system (info/warning/critical)
- **Command Center view:** Hero metrics with animated counters, pacing chart (CSS-drawn or lightweight canvas), campaign health bento grid, AI insights sidebar, activity timeline

### Phase 2: Campaigns — Master-Detail + Builder
- Campaigns master-detail view: list panel (left) with search/filters/table/inline edit/row expansion + detail panel (right) that slides in
- Detail panel tabs: Overview (chart + pacing + smart bidding status), Ad Sets (FY27 hierarchy), Creatives (grid with hover overlays), Analytics (inline pivot)
- Campaign Builder: 5-step wizard with cinematic transitions
  - Objective cards, setup form with visual budget builder, strategy/ad sets, offers + creatives with live preview, review + launch with confetti
  - AI natural language input at step 1
- Mock data: 6 realistic campaigns (Disney+, Capital One, Hulu, True Classic, PayPal Pay+, Audible) with full metric sets

### Phase 3: Audiences & Creative Studio
- Audiences unified view: library grid with inline builder panel
- Audience card design with type icons, size gauges, freshness indicators, contextual alerts
- Visual rule builder with AND/OR groups, live reach estimator, suppression toggle
- LAL quick-create with animated concentric circles tier visualization
- Creative Studio: library panel + editor + live preview three-panel layout
- Format selector tabs with morphing form transitions
- AI generate panel, dynamic attribute insertion, policy checker
- Preview with device toggle and partner context mockups

### Phase 4: Intelligence + Catalog + Measurement
- Intelligence view: Reports tab (insight strip + report builder + viz toggle + attribution selector) + Experiments tab (list + create modal + results with significance bar)
- Catalog view: Offers section (card grid + create modal) + Products section (DPA catalog browser + product set builder + feed health)
- Measurement view: EMQ dashboard (gauge + identifier breakdown + improvement recommendations) + Measurement Groups list with expand-to-configure + Integration health status

### Phase 5: Account, AI Copilot & Polish
- Account view: overview, billing summary, team management, integrations, data governance
- AI Copilot drawer: floating button with breathing pulse, slide-in chat panel, mock conversation with action buttons and data cards
- Dark mode toggle (CSS custom property swap)
- Animation polish pass: ensure all transitions are smooth, all number counters roll, all hovers feel responsive
- Empty states with illustrations
- Loading skeleton states
- Final responsive tuning (sidebar collapse, stack on mobile)

### Phase 6: Documentation & QA
- Copy plan file to project directory (`rokt-ads-prototype/PLAN.md`)
- Create user flows document (`rokt-ads-prototype/USER-FLOWS.md`) — detailed workflow specifications for feeding to a UI AI agent
- Use `preview_start` to serve prototype
- Use `preview_screenshot` to capture every view for visual QA
- Use `preview_click`/`preview_fill` to test all interactive elements
- Verify keyboard shortcuts, animations, brand consistency, responsive behavior

---

## Verification Plan

1. **Serve locally** via `preview_start` — test at `localhost`
2. **Navigate all 9 views** via sidebar + verify active state highlighting
3. **Test Cmd+K** — fuzzy search, navigate to campaigns, trigger quick actions
4. **Test keyboard shortcuts** — `?` overlay, `g c`/`g r`/`g a`, `j/k` list nav, `Esc` close
5. **Test campaign creation wizard** — complete all 5 steps, verify confetti on launch
6. **Test master-detail** — click campaign in list, verify detail panel slides in
7. **Test inline editing** — double-click budget/CPA cells, edit, verify toast confirmation
8. **Test audience builder** — add rules, toggle AND/OR, verify reach estimator updates
9. **Test creative studio** — switch formats, verify preview updates, test AI generate mock
10. **Test AI copilot** — open drawer, type message, verify mock response with action buttons
11. **Test animations** — page transitions smooth, metric counters roll, hover states responsive
12. **Verify Rokt brand** — Wine/Beetroot accent (#8B2635), Inter typography, pill buttons, glassmorphism modals
13. **Test responsive** — collapse sidebar at narrow widths, verify layout adapts
14. **Test dark mode** — toggle, verify all tokens swap correctly
15. **Screenshot all views** with `preview_screenshot` for documentation

---

## File Structure
```
/Users/maxdowaliby/ClaudeCode/rokt-ads-prototype/
├── index.html          # SPA shell + all 9 views (hash routing)
├── styles.css          # Design tokens + component styles + animations
├── app.js              # Router, mock data, interactions, command palette, keyboard shortcuts
├── PLAN.md             # This plan file (copied from claude plans)
└── USER-FLOWS.md       # Detailed user flow specifications (for feeding to UI AI agents)
```

**Zero dependencies.** No npm, no build tools, no frameworks. Open `index.html` in any browser. Three source files + two documentation files.

## Deliverables

### 1. Working Prototype (`index.html` + `styles.css` + `app.js`)
Clickable, explorable HTML prototype of the complete Rokt Ads platform with:
- 9 interconnected views with smooth animated transitions
- Command palette, keyboard shortcuts, AI copilot
- Realistic mock data for 6 campaigns with full metrics
- Modern interactions: inline editing, drag-drop, expanding panels, contextual alerts
- Rokt brand system applied consistently
- Dark mode support

### 2. Plan Document (`PLAN.md`)
This plan file, stored in the project directory for future reference.

### 3. User Flows Document (`USER-FLOWS.md`)
Detailed specification of every user workflow, optimized for feeding to a UI AI agent. Includes:
- Step-by-step flows for each major task (create campaign, build audience, create creative, etc.)
- State transitions and navigation paths
- Interaction specifications (what happens on click, hover, keyboard)
- Data flow between views (how entities link together)
- Mock data schema
- Component specifications with exact properties

## Tools & Skills Used
- **Google Docs (gws)** — fetched 3 source documents (Handbook, Demand Side Objects, Object Principles)
- **Background research agents (6)** — Meta Ads, Google Ads, TTD/TikTok/Snap, UX trends, design agencies, Rokt brand
- **Figma MCP** — available for pulling Rokt design files if URLs provided
- **Preview tools** — `preview_start`, `preview_screenshot`, `preview_click`/`preview_fill`, `preview_inspect` for QA
- **gstack skill** — for end-to-end interaction dogfooding
