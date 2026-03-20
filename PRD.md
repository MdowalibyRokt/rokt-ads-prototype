# Rokt Ads — AI-Native Media Buying Platform

## Product Requirements Document (PRD)

**Version:** 4.0
**Date:** March 20, 2026
**Author:** Max Dowaliby + Claude (AI-assisted design)
**Status:** Prototype Complete — fully interactive SPA with 18 views, AI-native features, advertiser-scoped data model, and comprehensive entity management

---

## 1. Executive Summary

Rokt Ads is a next-generation media buying platform prototype, designed to showcase what an AI-native advertising platform looks like when built from scratch rather than bolted onto legacy infrastructure. The prototype is a fully interactive, zero-dependency HTML/CSS/JS single-page application — no frameworks, no build tools, no npm. Open `index.html` in any browser.

### Platform at a Glance

| Dimension | Detail |
|---|---|
| **Views** | 18 interconnected views with hash-based routing and sub-routes |
| **Architecture** | Vanilla HTML/CSS/JS SPA, IIFE module pattern, `RoktAds` global namespace |
| **Theming** | Dark/light mode with Rokt Beetroot (#C20075) brand accent |
| **Navigation** | Hash-based routing with sub-routes (#campaign/{id}, #audience/{id}, #creative/{id}) |
| **Data Model** | Advertiser-scoped — all views filter to selected advertiser context |
| **AI Integration** | AI Hero prompt, ACE creative engine, Copilot drawer, optimization scoring, recommendations throughout |
| **Keyboard** | 15+ shortcuts with visual chord feedback, command palette (Cmd+K) |
| **Accessibility** | Responsive layout, keyboard-navigable, semantic HTML |
| **Source Files** | index.html (~910 lines), styles.css (~6,380 lines), app.js (~6,550 lines) |
| **Dependencies** | Zero. No frameworks, no build tools, no node_modules |

---

## 2. Design System

### 2.1 Color Palette

**Dark Mode (Default)**

| Token | Value | Usage |
|---|---|---|
| `--wine` | `#C43B52` | Primary brand accent, CTAs, active states |
| `--wine-light` | `#D4556A` | Hover states, gradient endpoints |
| `--wine-subtle` | `rgba(196,59,82,0.08)` | Subtle backgrounds, selected rows |
| `--brand-blue` | `#4D65FF` | Focus outlines, secondary accent, links |
| `--surface-dark` | `#0B0F1A` | Sidebar background |
| `--surface-white` | `#161D2E` | Main content background |
| `--surface-light` | `#1C2438` | Cards, elevated surfaces |
| `--border` | `rgba(255,255,255,0.06)` | Default borders |
| `--text-primary` | `#F0F2F5` | Body text |
| `--text-secondary` | `#8B95A8` | Labels, metadata |
| `--positive` | `#10B981` | Growth, success, healthy, live |
| `--warning` | `#F59E0B` | Attention needed, above target |
| `--negative` | `#EF4444` | Errors, declining, critical |

**Light Mode** — Toggled via theme button or `Cmd+D`. Uses warm-tinted surfaces (not cold pure-white) with 9 overlay opacity tokens that automatically flip between dark and light mode. All components verified in both themes.

### 2.2 Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| UI text | Inter | 400/500/600/700 | 11-16px |
| Data/metrics | JetBrains Mono | 500/600 | 11-32px |
| KPI hero values | JetBrains Mono | 700 | 32px |
| KPI labels | Inter | 600 | 10px uppercase |
| Table headers | Inter | 600 | 11px uppercase |
| Badges | Inter | 600 | 11px |

### 2.3 Spacing, Radius & Shadows

- **Spacing:** 4px grid base (`--space-1` through `--space-8`)
- **Radius:** Cards 12px, Inputs 8px, Badges/Pills 9999px, Modals 16px
- **Shadows:** 4-tier system — subtle (sm), elevated (md), floating (lg), ultra (xl)

### 2.4 Animations

| Animation | Duration | Purpose |
|---|---|---|
| `fadeSlideIn` | 200ms | Page transitions, view entry |
| `modalIn` | 200ms | Modal open (spring feel) |
| `pulse` | 2-2.5s | Active campaign dots, bidding states |
| `breathe` | 3s | AI Copilot FAB glow |
| `confettiFall` | 1.5s | Campaign launch celebration |
| `shimmer` | 1.5s | Loading skeleton states, progress bars |
| `drawLine` | 600ms | Chart line animation |
| Counter roll-up | 800ms | KPI number animation |
| Staggered entrance | 60ms delay per card | Card cascade effect |
| Mouse-tracking glow | Real-time | Card hover radial gradient |
| Gradient mesh | Continuous | Dashboard background drift |

---

## 3. Global Shell

### 3.1 Sidebar Navigation

Fixed left panel, 240px wide. Collapses to 60px icon-only mode via always-visible toggle button.

**Grouped Navigation Sections:**
- **Workspace** — Dashboard, Portfolio
- **Build** — Campaigns, Audiences, Creatives, Catalog (Offers)
- **Analyze** — Intelligence, Measurement
- **Settings** — Account

**Visual indicators:**
- Active item: Beetroot left accent bar + wine background tint
- Badge counts on items needing attention
- Sidebar footer: Keyboard shortcuts button, theme toggle
- "Switch Advertiser" button always visible

### 3.2 Top Bar

- **Left:** Account switcher dropdown (current advertiser name + chevron, quick-switch for recent/favorites, "View All Advertisers" link)
- **Center:** Search trigger pill ("Cmd+K") — contextual placeholder text cycles based on current view
- **Right:** Notification bell (badge count, dropdown with 4 notifications by type), keyboard shortcuts button, user avatar with online status dot

### 3.3 Context Alert Bar

View-specific warnings below topbar with "Fix Now" action button:
- Dashboard: EMQ degradation alerts
- Campaigns: CPA above target warnings
- Measurement: Missing identifier alerts
- Creative Studio: Creative refresh overdue warnings

### 3.4 Status Bar

Fixed bottom bar: `Active Campaigns | Today's Spend | System Health | Smart Bidding Status`

### 3.5 Toast Notifications

Top-right position. Types: Success (green), Error (red), Info (blue), Warning (amber). Auto-dismiss with progress indicator bar. Slide-in animation.

---

## 4. Views & Features

### 4.1 Advertiser Picker (Entry Gate)

**Route:** App load (before any view is accessible)

Full-page advertiser selection screen. Users must select an advertiser before accessing the platform.

**Sections:**
- **Favorites** — Starred advertisers for quick access
- **Recents** — Recently accessed accounts
- **All Advertisers** — Complete list with search
- **Portfolio Dashboard** — Cross-advertiser aggregate view option

Once selected, all views are scoped to that advertiser. The topbar account switcher provides quick switching without returning to the full picker.

### 4.2 Command Center (Dashboard)

**Route:** `#dashboard` (default after advertiser selection)

**Layout:** KPI strip → two-column grid (main content + 340px sidebar)

**Dynamic KPI Strip (6 cards):**
| Metric | Example | Notes |
|---|---|---|
| Total Spend | $123,350 | Sum of active campaigns, ↑/↓ trend |
| Conversions | 16,235 | Sum of active campaigns |
| Avg CPA | $8.38 | Amber when above target |
| CoPI | 3.25% | North Star badge |
| ROAS | 4.2x | Return on ad spend |
| Active Campaigns | 4 | Count of running campaigns |

Each card: sparkline SVG, trend indicator, period comparison, counter roll-up animation, mouse-tracking glow on hover.

**Spend Pacing Chart:**
- SVG area chart with wine gradient fill
- Range switcher: 7D / 30D / MTD / QTD
- Dashed projected line + dotted budget ceiling
- Rokt connector-shaped data point markers

**Campaign Health Cards:**
- Auto-fill grid of active campaigns
- Each card: name, animated status dot, bidding state pill, CoPI, CPA, Spend, Pacing progress bar, mini sparkline
- Click navigates to campaign detail

**Optimization Score:**
- Semi-circle AI health gauge (0-100)
- Color-coded: green (80+), yellow (60-79), red (<60)
- Shows improvement potential: "+N pts available from N recommendations"

**AI Recommendations Feed:**
- Prioritized cards with estimated impact (High/Medium/Low)
- Each has Apply / Dismiss actions
- Examples: "Add 2 more creatives -> Est. +15% CoPI", "Increase budget -> hitting daily cap before noon"

**Dynamic Insights:**
- AI-generated insight cards based on campaign data
- Contextual suggestions with actionable links

### 4.3 Campaigns

**Route:** `#campaigns`

**Layout:** Flex row — list panel (flexible) + detail sidebar (520px, slides in on selection)

**Toolbar:** Title + count badge, search input, "New Campaign" button (navigates to `#builder`)

**Filter Pills:** All | Active | Requires Action | Paused | Draft | Pending Review | Archived

**Table Columns:**
- Checkbox, Status dot (animated pulse for active), Campaign name, Objective badge, Spend/Budget with progress bar, CPA (amber if above target), CoPI, ROAS, Trend sparkline, Bidding state pill (Optimizing/Learning/Limited/Draft)

**Row Interactions:**
- Click opens detail sidebar
- Hover reveals action buttons: Pause/Resume, Edit, Duplicate, Archive (slide-in animation)
- Selected row: wine-subtle background + left border
- J/K keyboard navigation

**Campaign Detail Sidebar (520px):**
- Header: name, status badges, back arrow
- Metric ribbon: horizontal scrollable chips (Spend, Budget Left, CPA, ROAS, Conversions, CTR)
- **Tabs:** Overview | Ad Sets | Creatives | Analytics | Nurture
  - Overview: Daily Spend chart, Budget Pacing, Smart Bidding status, Impressions, CVR
  - Ad Sets: List with audience, bid strategy, linked creatives
  - Creatives: Grid with format badge, CTR/CVR/CoPI
  - Analytics: Inline pivot table
  - Nurture: Nurture journey visualization
- Expand to full-screen campaign view

### 4.4 Campaign Full View

**Route:** `#campaign/{id}`

Full-page dashboard for a single campaign.

**8 KPI Cards:** Spend, Budget Left, CPA, CoPI, ROAS, Conversions, Impressions, CTR — each with trend and sparkline.

**AI Analysis & Suggestions:**
- AI-generated performance analysis
- Actionable buttons: Scale Up, Expand Audience, Refresh Creatives, etc.

**Deep Dive Modal:**
- Performance breakdown by dimension
- Optimization opportunities with impact estimates
- 7-day trend visualization

**Spend Performance Chart:**
- SVG line chart with gradient fill
- Range switcher: 7D / 30D / MTD / QTD
- Rokt connector data points

**Detailed Metrics Table:** Full performance data with sorting.

**Sidebar Sections:**
- Budget & Pacing with progress visualization
- Smart Bidding status and state
- Ad Sets (clickable — opens audience detail)
- Creatives (clickable — opens creative detail)
- AI Recommendations
- Nurture Journey

### 4.5 Campaign Builder

**Route:** `#builder`

Full-screen wizard with step progress bar and Back/Next navigation.

**AI Hero Prompt (Step 1 top):**
- Prominent input with animated gradient border (wine to blue cycling)
- Cycling placeholder text demonstrating use cases
- "Generate Campaign" button — auto-fills all builder fields with realistic data, jumps to Step 5

**Mode Toggle:** Autopilot vs Advisor (Advanced)

**Autopilot Mode (3 steps: Goal -> Assets -> Launch):**
- AI handles targeting, bidding, optimization
- Step 2: Consolidated asset group — budget, creative assets (3 headlines, 2 descriptions, CTA, image), audience signals (hints, not hard targeting)
- AI Managed Card: visual indicator of AI-controlled levers

**Advisor/Advanced Mode (5 steps: Objective -> Details -> Targeting -> Creative -> Review):**

**Step 1 — Objective:**
- 6 objective cards in grid: Customer Acquisition, Revenue Growth, App Installs, Product Sales (DPA), Email Leads, Embedded Actions
- Auto-advance on selection (400ms pulse animation)

**Step 2 — Details:**
- Campaign Name (with recommended format hint)
- Company Name + Brand URL
- Measurement Group dropdown (with "Create New" option)
- Referral Exclusion Period (1d/7d/14d/30d/90d)
- Schedule: Start Date + optional End Date
- Budget: Daily Cap + Monthly Cap + Lifetime Cap with visual budget bar
- Policy Links: collapsible Terms & Conditions, Privacy Policy, Disclaimer sections

**Step 3 — Targeting:**
- 3 bid strategy cards (mutually exclusive): Smart Bidding (Target CPA, requires 30+ conversions), Budget Optimization (auto-adjusts on predicted volume), Manual Bidding (static price)
- Ad Set management:
  - Audience dropdown
  - Targeting panel: Geography (Country/State/City/ZIP), Device (Desktop/Mobile/Tablet), Demographics (Age/Gender)
  - Suppress Existing Customers toggle
  - Budget Override
  - "+ Add Ad Set" / Remove (minimum 1)

**Step 4 — Creative:**
- **Offer section:** Type (Discount/Trial/Cashback/Shipping/Product), Value, Cost, Landing Page URL (required), Coupon Code, Validity dates
- **Creative section:** Title (175 combined char limit), Body, CTA (20 char max), character counters
- Callout Tags: Promotion / Social Proof / Guarantee
- Image Upload zone (simulated)
- ACE (Adaptive Content Engine) AI generation button
- **Live Preview panel** (sticky right column): phone frame mockup with partner bar, sponsored label, callout pills, title, body, CTA button, decline link, disclaimer — updates in real-time

**Step 5 — Review & Launch:**
- Approval banner: "Campaign will be reviewed by Rokt. Typically 1-2 business days."
- Campaign tree visualization (full hierarchy)
- Dynamic validation checklist (objective, name, budget, audience, creative, landing page URL)
- Amber recommendation for missing best practices
- "Launch Campaign" button with confetti celebration (60 particles, wine/gold/white, 1.5s)

**Campaign Projections Panel (Steps 2-5):**
- AI Readiness score
- Estimated Reach, CPA, Conversions, Duration
- Contextual tips that update per step

### 4.6 Audiences

**Route:** `#audiences`

**Toolbar:** Title + count badge, search input, Build Audience / Upload List / Create Lookalike buttons

**Type Filter Pills:** All | Custom | Lookalike (LAL) | Behavioral | Demographic | Starter | Experian

**Audience Cards Grid:** Responsive grid of cards, each showing:
- Type icon + name + type label
- Size (e.g., "14.2M"), linked campaigns, match rate
- Freshness indicator (green "Fresh" or amber "Stale")
- Click opens full-screen audience detail view

**Build Audience Modal:**
- Rule builder with AND/OR toggle, category/attribute/operator/value selects
- "+ Add Rule" button, per-rule remove
- Suppress Existing Customers checkbox
- Reach Estimator sidebar: estimated reach number, % of Rokt network, Smart Bidding sufficiency indicator

**Create Lookalike Modal:**
- Seed audience dropdown
- Tier visualization: 3 concentric circles (Default ~10M, Broad ~20M, Broader ~30M)

**Upload List Modal:**
- Drag-and-drop zone (CSV), list name, identifier type selector, match rate preview

### 4.7 Audience Detail View

**Route:** `#audience/{id}`

Full-screen audience profile.

**KPI Strip (6 cards):** Size, Match Rate, Linked Campaigns, Avg CPA, Total Conversions, Total Spend

**AI Audience Insights:** Contextual AI suggestions for audience optimization.

**Audience Composition:**
- Age distribution bars (horizontal bar chart)
- Gender breakdown (percentage split)

**Device & Geography:**
- Device type cards (Desktop, Mobile, Tablet with percentages)
- Top regions table

**Performance by Campaign:** Table showing how this audience performs across linked campaigns.

**Sidebar:**
- Details: type, created date, freshness, last refreshed
- Interest Signals: tag cloud of audience interests
- Expansion Options: Create LAL, Broaden Audience, Overlap Analysis buttons

### 4.8 Creative Studio

**Route:** `#creatives`

**Layout:** 3-panel grid — Library (220px) | Editor (flex) | Preview (320px)

**Library Panel:**
- Search input + format selector dropdown
- Scrollable list of creatives with format badge, name, CTR/CoPI stats
- Active item: wine left border highlight
- Click to expand to full-screen creative detail

**Editor Panel:**
- Format tabs: Text | Benefits | Savings | Hero Image | Carousel
- Title input with character counter
- Body textarea
- CTA input with character counter
- Linked Offer dropdown
- Dynamic Attributes: clickable chips (`{customer.firstname}`, `{partner.name}`, `{rokt.customeraction}`) — inserts into focused field
- ACE (Adaptive Content Engine) AI generation button
- Policy compliance checker: "Passes policy check" (green) or violations listed

**Preview Panel:**
- Device toggle: Desktop | Mobile
- Live preview card updating in real-time as editor fields change
- Partner context: Ticketmaster | Fanatics | Booking.com tabs
- Shows: partner context label, "SPONSORED" tag, title, body, offer value pill, CTA button, "No thanks" link

### 4.9 Creative Detail View

**Route:** `#creative/{id}`

Full-screen creative profile.

**KPI Strip (6 cards):** Referral Rate, CVR, CoPI, Impressions, Clicks, Conversions

**AI Creative Insights:**
- Performance analysis (what's working, what's not)
- Fatigue warning (if impressions high but engagement declining)
- Audience recommendations (which audiences respond best)

**Performance by Audience:** Breakdown table showing creative performance across different audience segments.

**Linked Campaigns:** Table of campaigns using this creative.

**Creative Preview Card:** Visual preview of the creative.

**ACE Enhancement Actions:**
- Generate Variants — create AI variations
- Auto-Enhance — improve copy/layout
- Predict Performance — estimate metrics for proposed changes

### 4.10 Offers

**Route:** `#offers`

**Grid of Offer Cards:** Each showing type icon, name, type label, value, cost, linked campaigns count, CoPI %, CVR %.

**Create Offer Modal:** Type selector (Discount/Trial/Cashback/Shipping/Product), value input, cost input, description, validity dates.

**Edit Offer:** Click card or hover edit icon to open edit modal with pre-populated fields.

### 4.11 Intelligence

**Route:** `#intelligence`

**Layout:** Tab-based — Reports (default) | Experiments

#### Reports Tab

**AI Insight Banner:** Dismissable insight (e.g., "CPA improved 12% week-over-week")

**Date Range Bar:** Preset pills (7D / 14D / 30D / MTD) + attribution model dropdown + compare toggle

**Report Chart:**
- 3-line SVG chart: Spend (wine), Conversions (blue), CPA (green)
- Date range pills actively filter data
- Compare toggle: overlays previous period as dashed lines
- Rokt connector-shaped data points

**Group-By Dropdown:** Slice data by Campaign, Ad Set, Creative, Device, Geography, Day of Week

**Campaign Performance Table:**
- Sortable columns: Campaign, Impressions, Clicks, CTR, Conversions, CPA, ROAS, CoPI, Spend
- Click header to sort asc/desc with arrow indicator
- CPA cells amber when above target

**Export:** CSV, PDF, Scheduled Email, API options

#### Experiments Tab

**Filter Pills:** All | Running | Concluded | Draft

**Experiment Cards:** Each showing:
- Type badge (A/B or MAB)
- Campaign, status, days progress
- Statistical significance bar
- Leader and lift metric
- "Apply Winner" button (concluded only)

**New Experiment Modal:** Type selection (A/B vs MAB), campaign selector, control/variant builder, traffic allocation sliders, duration, success metric.

### 4.12 Network Analyzer & Forecaster

**Route:** `#network-analyzer`

**8-Week Spend Forecast Chart:** Line chart with confidence bands (upper/lower bounds shaded).

**8-Week Conversion Forecast Chart:** Same format as spend forecast.

**Forecast KPIs:** Total predicted spend, total predicted conversions, predicted CPA, network utilization %, confidence score.

**Partner Network Quality Table:**
- Partner name, match rate, CPA, quality score bars, trend indicators
- Quality scoring per partner

**AI Network Recommendations:** Actionable cards (e.g., "Add Chewy to partner mix for +12% reach at similar CPA")

**Scenario Planner:**
- Budget change slider
- Audience expansion options
- Partner addition/removal
- "Run Scenario" button — recalculates forecast KPIs

### 4.13 Measurement

**Route:** `#measurement`

**Layout:** 3-column grid (Integration Health gauge | Identifier Coverage | Recommendations) + Measurement Groups table

**Integration Health Gauge:**
- Circular gauge showing score (e.g., 7.8/10)
- Color zones: red (<5), amber (5-7), green (8+)
- Trend: "+0.4 from last month"

**Identifier Coverage Grid:**
| Identifier | Status | Contribution |
|---|---|---|
| Email (SHA-256) | Active | +2.1 |
| Phone (SHA-256) | Missing | — |
| Rokt Click ID | Active | +1.8 |
| IP Address | Active | +1.2 |
| User Agent | Active | +0.8 |
| Transaction ID | Active | +1.5 |

**Integration Health Recommendations:** Actionable improvement cards with "View Integration Guide" / "Configure SDK" buttons.

**Measurement Groups Table:** Name, Linked Campaigns, Status, Optimization Event, Attribution Window, EMQ score.

**Measurement Group Detail Modal (on row click):**
- Applied campaigns list
- Conversion Events with toggles
- Attribution Window configuration (click-through days slider, view-through toggle)
- Identifier Coverage specific to this group
- Recommendations

### 4.14 Advertiser Profile

**Route:** `#advertiser-profile`

**Header:** Advertiser avatar, name, industry, vertical badges.

**KPI Strip (6 cards):** Total Spend, Active Campaigns, Conversions, Avg CPA, ROAS, Account Health score.

**Industry Benchmarks:** You vs Industry Average comparison for CPA, CVR, Referral Rate.

**Campaign Performance Table:** Performance data for all campaigns under this advertiser.

**AI Advertiser Insights:** AI-generated observations about the advertiser's performance patterns and opportunities.

**Sidebar:**
- Profile Details: industry, vertical, tier, region, currency, timezone, onboarded date, account manager
- Quick Actions: shortcuts to common tasks
- Integration Status: connected systems overview

### 4.15 Account

**Route:** `#account`

**Team Management Table:**
| Name | Email | Role | Last Active |
|---|---|---|---|
| Max Dowaliby | max.dowaliby@rokt.com | Admin | Just now |
| Sarah Chen | sarah.chen@rokt.com | Editor | 2 hours ago |
| James Wilson | james.wilson@rokt.com | Viewer | Yesterday |

"Invite User" button with modal (email, role selector, invitation message).

**Integration Connections:**
- Web SDK v4.2.1 (installed)
- Conversions API (connected)
- mParticle (not configured)
- Segment (not configured)
- SFTP (not configured)
- Google Analytics (not configured)

**MCP Connectors Section:**
| Connector | Status | Details |
|---|---|---|
| Claude / Anthropic | Connected | Tool chips, MCP endpoint |
| Reporting API | Connected | Tool chips, MCP endpoint |
| Offer Catalog API | Connected | Tool chips, MCP endpoint |
| Audience API | Available | Tool chips, MCP endpoint |
| Experimentation API | Available | Tool chips, MCP endpoint |
| ChatGPT | Available | Tool chips, MCP endpoint |
| Gemini | Available | Tool chips, MCP endpoint |

### 4.16 AI Copilot

**Trigger:** Floating action button (FAB) at bottom-right with breathing sparkle animation.

**Visual:** Slide-out drawer from right, conversational chat interface.

**Features:**
- Introductory message listing capabilities
- Proactive insight: "I noticed 3 campaigns are below target CPA. Want me to analyze them?"
- Typing indicator (3 bouncing dots)
- Context-aware mock responses based on message content:
  - Campaign performance queries → portfolio summary with data
  - "Pause campaigns" → affected campaign list with individual Apply buttons
  - "Generate headlines" → 3 variations with predicted performance scores
  - Budget/spend queries → budget analysis with recommendations
- Natural language actions with Apply buttons

### 4.17 Command Palette

**Trigger:** `Cmd+K`, `/`, or click search bar

**Visual:** Full-screen overlay with backdrop blur, centered panel (600px), scale-in animation.

**Sections:**
- **Navigate:** All views with icons and keyboard shortcuts
- **Campaigns:** All campaigns by name
- **Audiences:** All audiences
- **Creatives:** All creatives
- **Actions:** New Campaign (N C), New Audience (N A)

**Interaction:** Fuzzy text search, arrow key navigation, Enter to select, Esc to close.

### 4.18 Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Cmd+K` / `/` | Open command palette |
| `?` | Show keyboard shortcuts overlay |
| `Cmd+D` | Toggle dark/light mode |
| `Esc` | Close modal/drawer/palette |
| `G → D` | Go to Dashboard |
| `G → C` | Go to Campaigns |
| `G → A` | Go to Audiences |
| `G → R` | Go to Intelligence (Reports) |
| `G → M` | Go to Measurement |
| `G → O` | Go to Offers |
| `G → E` | Go to Experiments |
| `G → S` | Go to Account (Settings) |
| `N → C` | New Campaign (opens builder) |
| `N → A` | New Audience (opens modal) |
| `J` / `K` | Navigate down/up in tables |

**Visual Chord Indicator:** On first key press (G or N), a floating indicator appears showing available completions with styled kbd tags. Auto-dismisses after 500ms.

**Visual Overlay Badges:** When chord is active, navigation items show letter badges indicating the completion key.

---

## 5. Cross-Cutting Features

### 5.1 Advertiser-Scoped Data

All views filter to the selected advertiser. Dashboard KPIs, campaign lists, audience libraries, creative studios, intelligence reports, and measurement data are all contextual to the active advertiser.

### 5.2 Entity CRUD

| Entity | Create | View | Edit | Duplicate | Archive |
|---|---|---|---|---|---|
| Campaign | Builder wizard | List + detail + full view | Edit modal | "Copy of..." prefix | Confirmation dialog |
| Audience | Build/LAL/Upload modals | Cards + detail view | Edit modal | — | — |
| Creative | Studio editor | Library + detail view | Inline editor | — | — |
| Offer | Create modal | Card grid | Edit modal | — | — |
| Experiment | New Experiment modal | Cards | Edit modal | — | — |
| Measurement Group | Create Group modal | Table + detail modal | Edit modal | — | — |

All create/edit operations persist to mock data arrays and re-render the UI. Destructive actions show confirmation dialogs.

### 5.3 SVG Charts

All charts are inline SVG with CSS custom property styling:
- Rokt connector logo shape as data point markers (not standard circles)
- Wine gradient fills for area charts
- Animated line drawing (600ms)
- Range switchers that actively filter displayed data

### 5.4 AI-Native Positioning

AI is woven throughout the platform, not bolted on:

| Feature | Location | Purpose |
|---|---|---|
| AI Hero Prompt | Campaign Builder Step 1 | NLP campaign creation from natural language |
| ACE Engine | Creative Studio, Builder Step 4 | AI creative generation and enhancement |
| AI Analysis | Campaign Full View | Performance insights with actionable suggestions |
| Deep Dive Modal | Campaign Full View | Drill-down analysis with optimization opportunities |
| AI Recommendations | Dashboard, Campaign sidebar | Prioritized suggestions with Apply/Dismiss |
| Optimization Score | Dashboard | Account-level AI health gauge |
| AI Copilot | Global drawer | Natural language commands and queries |
| AI Readiness | Builder projections | Score indicating campaign setup quality |
| Network Recommendations | Network Analyzer | AI-driven partner and budget suggestions |
| Industry Benchmarks | Advertiser Profile | You vs industry comparison |
| AI Audience Insights | Audience Detail | Audience optimization suggestions |
| AI Creative Insights | Creative Detail | Performance analysis and fatigue detection |
| AI Advertiser Insights | Advertiser Profile | Account-level pattern recognition |

### 5.5 Responsive Layout

- Sidebar collapses at 1200px breakpoint (or manual toggle)
- Content stacks at 900px
- Mobile-friendly touch targets
- Flexible grids with `auto-fill` and `minmax`

### 5.6 Visual Polish

- Animated gradient mesh background on Dashboard
- Mouse-tracking glow on cards
- Staggered card entrance animations (60ms delay cascade)
- Gradient text headings
- Progress bar shimmer animation
- Glassmorphism topbar (blur + saturate)
- Builder dot grid pattern
- Sparkline drop-shadow glow
- Sidebar active glow effect
- Confetti celebration on campaign launch

---

## 6. Mock Data

### 6.1 Campaigns (6)

| Campaign | Status | Objective | Spend | Budget | CPA | CoPI | ROAS | Bidding |
|---|---|---|---|---|---|---|---|---|
| Disney+ Spring Acquisition | Active | CPA | $42,150 | $75,000 | $5.82 | 4.12% | 5.1x | Optimizing |
| Capital One Card Acquisition | Active | CPA | $31,200 | $50,000 | $8.45 | 3.21% | 3.8x | Optimizing |
| Hulu Streaming Signup | Active | CPA | $18,700 | $25,000 | $9.14 | 2.84% | 2.9x | Learning |
| True Classic DPA | Active | ROAS | $22,400 | $40,000 | $12.30 | 2.15% | 4.8x | Limited |
| PayPal Pay+ Activation | Paused | CPA | $8,900 | $20,000 | $6.20 | 3.95% | 4.2x | Optimizing |
| Audible Free Trial | Draft | CPA | $0 | $30,000 | — | — | — | Draft |

### 6.2 Audiences (12)

Custom (3), Lookalike (3), Behavioral (3), Demographic (1), Starter (1), Experian (1). Sizes range from 245K to 31.2M. Match rates from 55% to 94%.

### 6.3 Creatives (8)

Formats: Text, Benefits, Savings, Hero Image, Carousel. Linked to campaigns with CTR/CVR/CoPI performance data.

### 6.4 Offers (6)

Types: Discount (2), Trial (1), Cashback (2), Shipping (1). Costs from $0 to $50.

### 6.5 Experiments (4)

Disney+ Creative A/B (Concluded, 97% significance), Capital One Audience Split (Running), Hulu MAB Creative (Running), True Classic DPA vs Static (Draft).

### 6.6 Partners (8)

Ticketmaster, Fanatics, Booking.com, StubHub, Grubhub, Shutterfly, Chewy, LiveNation.

### 6.7 Rokt-Specific Metrics

| Metric | Definition | Tier |
|---|---|---|
| **CoPI** | Conversions per Impression — Rokt's North Star combining CTR x CVR | Hero |
| **CPA** | Cost per Acquisition — primary advertiser success metric | Hero |
| **ROAS** | Return on Ad Spend — for revenue-focused campaigns | Hero |
| **EMQ** | Event Match Quality — integration health score 1-10 | Hero |
| **Smart Bidding State** | Learning / Optimizing / Limited — ML model status | Diagnostic |
| **CVR** | Conversion Rate — post-click conversion rate | Diagnostic |
| **CTR** | Click-through Rate — engagement in Transaction Moment | Diagnostic |

---

## 7. Technical Architecture

### 7.1 File Structure

```
rokt-ads-prototype/
├── index.html       # ~910 lines — SPA shell, templates, view structure
├── styles.css       # ~6,380 lines — Design tokens, components, animations, themes
├── app.js           # ~6,550 lines — IIFE module, router, data, interactions
├── PRD.md           # This document
├── OP-COMPARISON.md # Competitive feature comparison
├── PLAN.md          # Original design plan
├── USER-FLOWS.md    # User flow specifications
└── README.md        # Setup instructions
```

### 7.2 Architecture Decisions

| Decision | Rationale |
|---|---|
| **Zero dependencies** | Opens in any browser, no build step, no node_modules |
| **IIFE module pattern** | Single `RoktAds` global namespace, clean public API |
| **Hash-based routing** | SPA navigation without server config, supports sub-routes |
| **CSS custom properties** | Enables dark/light mode toggle, themeable components |
| **Vanilla JS** | Full control, no framework overhead, rapid prototyping |
| **SVG charts** | Inline, no chart library dependency, styled with CSS vars |
| **Mock data arrays** | CRUD operations mutate arrays and re-render, simulating persistence |

### 7.3 Routing

| Route | View |
|---|---|
| `#dashboard` | Command Center |
| `#campaigns` | Campaign list + detail sidebar |
| `#campaign/{id}` | Campaign full view |
| `#builder` | Campaign builder wizard |
| `#audiences` | Audience library |
| `#audience/{id}` | Audience detail view |
| `#creatives` | Creative Studio |
| `#creative/{id}` | Creative detail view |
| `#offers` | Offer catalog |
| `#intelligence` | Reports + Experiments |
| `#network-analyzer` | Network Analyzer & Forecaster |
| `#measurement` | Measurement / Attribution |
| `#advertiser-profile` | Advertiser Profile |
| `#account` | Account / Settings |

### 7.4 Public API (`RoktAds.*`)

**Navigation:**
- `navigate(view)` — Route to a view
- `selectAdvertiser(id)` — Select advertiser and scope data
- `switchAdvertiser()` — Return to advertiser picker

**Campaigns:**
- `openCampaignDetail(id)` — Open detail panel
- `closeCampaignDetail()` — Close detail panel
- `toggleCampaignStatus(id)` — Pause/resume
- `duplicateCampaign(id)` — Duplicate with data mutation
- `archiveCampaign(id)` — Archive with confirmation

**Builder:**
- `selectObjective(id)` — Select builder objective
- `persistField(field, value)` — Write to builderData (dot notation)
- `generateAICampaign()` — AI auto-fill all fields
- `setBuilderMode(mode)` — 'autopilot' or 'advanced'
- `selectBidStrategy(strategy)` — Set bid strategy
- `addAdSet()` / `removeAdSet(idx)` — Manage ad sets
- `updateBuilderPreview()` — Live-update preview panel

**Entities:**
- `editAudience(id)` / `editOffer(id)` / `editExperiment(id)` / `editMeasurementGroup(name)`
- `selectCreative(id)` — Select in library
- `insertAttr(attr)` — Insert dynamic attribute in creative editor

**Intelligence:**
- `switchIntelTab(tab)` — 'reports' or 'experiments'
- `sortReport(col)` — Sort report table
- `toggleCompare()` — Period-over-period comparison
- `setGroupBy(dimension)` — Set reporting dimension

**UI:**
- `toast(msg, type)` — Show toast notification
- `openModal(type, id?)` / `closeModal()` — Modal management
- `toggleFilter(type, value)` / `applyFilter(type, value)` — Filter management
- `confirmAction(action, callback)` — Confirmation dialog

---

## 8. What Works vs. What's Mock

### Interactive & Functional

| Feature | Notes |
|---|---|
| All 18 views with routing | Hash-based, sub-routes for entities |
| Advertiser picker + scoping | Full gate, favorites, recents, switcher |
| Campaign CRUD (create/edit/pause/duplicate/archive) | Data mutations persist in session |
| Campaign builder (both modes) | Full 5-step or 3-step flow |
| Audience library with filtering | Type filters, search, all cards |
| Build/LAL/Upload audience modals | Rule builder, reach estimator |
| Creative Studio 3-panel editor | Live preview, format switching, attribute insertion |
| Intelligence reports with sorting | Sortable columns, date range filtering |
| Experiment management | Create, edit, apply winner |
| Measurement EMQ dashboard | Gauge, identifiers, improvement cards |
| Command palette (Cmd+K) | Fuzzy search across all entities |
| 15+ keyboard shortcuts | Two-key combos with visual feedback |
| AI Copilot chat | Context-aware mock responses |
| Dark/light mode | Full CSS token swap, all components verified |
| Toast notifications | Auto-dismiss with progress bar |
| Responsive layout | Sidebar collapse, content stacking |
| Entity detail views | Campaign, Audience, Creative full pages |
| Notification dropdown | 4 items with navigation |

### Mock / Not Implemented

| Feature | Status |
|---|---|
| Backend persistence | Changes lost on page refresh |
| Real data fetching / APIs | All data is hardcoded JavaScript objects |
| Real AI responses | Copilot returns template responses |
| Authentication / login | No auth flow |
| File upload | Visual drop zone only |
| API export / download | Modal opens but no actual export |
| Real-time updates | Status bar numbers are static |
| Collaborative features | No multi-user, no comments |
| Permission system | All users see all data |
| Undo/redo | No action history |
| Drag-and-drop | No reordering support |
| Full accessibility (a11y) | Semantic HTML and keyboard nav, but no ARIA roles or screen reader support |

---

## 9. Design Rationale

**Why dark mode default?** Rokt's brand is dark-first. Media buyers work long hours — dark mode reduces eye strain. Light mode available as override.

**Why advertiser picker gate?** Ensures data context is always explicit. Prevents confusion about which advertiser's data is being viewed. Mirrors real multi-tenant ad platform patterns.

**Why AI Hero prompt in builder?** Natural language campaign creation is the fastest path from intent to launch. The prompt demonstrates NLP-first design rather than form-first.

**Why dual-mode builder?** Autopilot serves speed-oriented users and AI-managed campaigns (like Google PMax). Advanced mode serves power users who need full control. Both audiences are served without compromise.

**Why master-detail for campaigns?** Reduces context switching. Media buyers compare campaigns while viewing details. The sliding panel keeps the list visible.

**Why CoPI as North Star?** CoPI (Conversions per Impression) is unique to Rokt and combines engagement (CTR) and conversion (CVR) into a single metric. It deserves hero treatment throughout the UI.

**Why a dedicated Measurement view?** EMQ is Rokt-unique and critical to campaign success. A dedicated view with gauge, identifier breakdown, and recommendations makes attribution health a first-class concern.

**Why Rokt connector data points?** Brand reinforcement in every chart. The distinctive Rokt connector shape replaces generic circles, making every visualization unmistakably Rokt.

---

## 10. Running the Prototype

```bash
cd rokt-ads-prototype/
python3 -m http.server 8800
# Open http://localhost:8800 in any browser
```

No build step. No dependencies. No configuration.

---

*This PRD documents the complete state of the Rokt Ads prototype as of March 20, 2026. All features described above have been implemented and are interactive in the browser. The prototype serves as a design reference and vision artifact for Rokt's next-generation media buying platform.*
