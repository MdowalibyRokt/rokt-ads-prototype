# Rokt Ads — Next-Generation Media Buying Platform
## Product Requirements Document (PRD)

**Version:** 1.0
**Date:** March 19, 2026
**Author:** Max Dowaliby + Claude (AI-assisted design)
**Status:** Prototype Complete — 3 critique rounds applied

---

## 1. Executive Summary

Rokt Ads is a reimagined media buying platform prototype, designed from scratch to feel like a bleeding-edge product built by a top-tier design agency (IDEO/Work&Co/Clay caliber). The prototype is a fully interactive, clickable HTML/CSS/JS single-page application with zero dependencies — no frameworks, no build tools, no npm. Open `index.html` in any browser.

### Key Stats
- **9 interconnected views** with hash-based routing and animated transitions
- **6,076 lines** of handcrafted code across 3 files
- **15+ modal types** for create/edit workflows
- **5-step campaign builder** with cinematic step transitions
- **Command palette** (Cmd+K) with fuzzy search across all entities
- **AI Copilot** drawer with conversational interaction
- **Dark + Light mode** with full token swap
- **Keyboard-first** navigation (12+ shortcuts)
- **Mock data** for 6 campaigns, 12 audiences, 8 creatives, 6 offers, 4 experiments, 6 products

---

## 2. Design System

### 2.1 Color Palette (Dark Mode — Default)

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
| `--border-light` | `rgba(255,255,255,0.08)` | Card borders |
| `--text-primary` | `#F0F2F5` | Body text |
| `--text-secondary` | `#8B95A8` | Labels, metadata |
| `--text-tertiary` | `#5A6478` | Captions, inactive text |
| `--positive` | `#10B981` | Growth, success, healthy, live |
| `--warning` | `#F59E0B` | Attention needed, above target |
| `--negative` | `#EF4444` | Errors, declining, critical |
| `--warning-light` | `rgba(245,158,11,0.08)` | Alert bar background |

### 2.2 Light Mode Override

When toggled via the theme button (bottom-left gear icon) or `Cmd+D`:
- `--surface-dark` → `#1A1F2E` (darker sidebar)
- `--surface-white` → `#F5F7FA` (light content bg)
- `--surface-light` → `#FFFFFF` (white cards)
- `--border` → `rgba(0,0,0,0.08)`
- `--text-primary` → `#1A1A2E`
- `--text-secondary` → `#6B7280`

### 2.3 Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| UI text | Inter | 400/500/600/700 | 11-16px |
| Data/metrics | JetBrains Mono | 500/600 | 11-32px |
| KPI hero values | JetBrains Mono | 700 | 32px |
| KPI labels | Inter | 600 | 10px uppercase |
| Table headers | Inter | 600 | 11px uppercase |
| Table body | Inter | 400 | 13px |
| Badges | Inter | 600 | 11px |

### 2.4 Spacing Scale

Based on 4px grid: `--space-1` (4px) through `--space-8` (48px).

### 2.5 Border Radius

| Element | Radius |
|---|---|
| Cards | 12px (`--radius-xl`) |
| Inputs | 8px (`--radius-lg`) |
| Badges/Pills | 9999px (`--radius-pill`) |
| Buttons | 8px default, pill variant available |
| Modals | 16px (`--radius-2xl`) |

### 2.6 Shadow System

Three-tier layered shadows:
- **Base** (`--shadow-sm`): `0 1px 2px rgba(0,0,0,0.1)` — subtle lift
- **Elevated** (`--shadow-md`): `0 4px 12px rgba(0,0,0,0.15)` — cards on hover
- **Floating** (`--shadow-lg`): `0 8px 24px rgba(0,0,0,0.2)` — modals, dropdowns
- **Ultra** (`--shadow-xl`): `0 16px 48px rgba(0,0,0,0.3)` — command palette

### 2.7 Animations

| Animation | Duration | Easing | Purpose |
|---|---|---|---|
| `fadeSlideIn` | 200ms | ease-out | Page transitions, view entry |
| `modalIn` | 200ms | cubic-bezier(0.34, 1.56, 0.64, 1) | Modal open (spring feel) |
| `cmdScaleIn` | 150ms | cubic-bezier(0.34, 1.56, 0.64, 1) | Command palette open |
| `pulse` | 2-2.5s | ease-in-out, infinite | Active campaign dots, bidding states |
| `breathe` | 3s | ease-in-out, infinite | AI Copilot FAB glow |
| `confettiFall` | 1.5s | ease-out | Campaign launch celebration |
| `shimmer` | 1.5s | linear, infinite | Loading skeleton states |
| `toastIn/Out` | 300ms/500ms | ease-out | Toast slide-in/fade-out |
| `drawLine` | 600ms | ease-out | Chart line animation |
| Counter roll-up | 800ms | cubic ease-out | KPI number animation |
| Hover lift | 100ms | ease-out | `translateY(-2px)` + shadow |

---

## 3. Global Shell — The Living Frame

### 3.1 Sidebar Navigation

**Structure:** Fixed left panel, 240px wide (collapses to 60px on click or at ≤1200px breakpoint).

**Navigation items:**
1. Command Center (Dashboard) — Grid icon
2. Campaigns — List icon
3. Audiences — People icon
4. Creative Studio — Image icon
5. Intelligence — Chart icon
6. Catalog — Grid icon
7. Measurement — Clock icon
8. Account — Settings icon

**Visual indicators:**
- Active item: Wine-colored left border (3px), wine background tint, white text
- Hover: `rgba(255,255,255,0.04)` background
- Collapse button: Chevron at top-right of sidebar

**Theme toggle:** Gear icon at bottom-left of sidebar, toggles dark/light mode.

### 3.2 Top Bar

**Left section:**
- Account avatar pill: "RA" initials badge + "Rokt Ads Demo" + dropdown caret
- Clickable, visual-only (no functional account switcher in prototype)

**Center section:**
- Search trigger: Pill-shaped button with search icon + contextual placeholder text + "⌘K" badge
- Placeholder cycles based on current view: "Jump to any view..." (dashboard), "Search campaigns..." (campaigns), "Find audiences..." (audiences), etc.
- Clicking opens the Command Palette overlay

**Right section:**
- Notification bell with red badge count ("3")
  - Clicking opens notification dropdown (4 items with colored dots: critical/warning/info)
  - "Mark all read" button
  - Notifications: EMQ drop, CPA above target, experiment significance, weekly report
- Keyboard shortcuts button (opens `?` overlay)
- User avatar: "MD" initials with green online status dot

### 3.3 Context Alert Bar

**Position:** Below topbar, above content area.

**Behavior:** Shows view-specific warnings:
- Dashboard: "EMQ dropped below 5.0 on True Classic — conversion tracking may be degraded"
- Campaigns: "EMQ dropped below 5.0 on True Classic DPA — conversion tracking may be degraded"
- Measurement: "Phone identifier is missing from CAPI integration — estimated +1.5 EMQ impact"
- Creative Studio: "Creative refresh overdue on 2 campaigns — last updated 47 days ago"

**Actions:**
- "Fix Now" amber pill button → navigates to Measurement view with toast confirmation
- "✕" dismiss button

### 3.4 Status Bar

**Position:** Fixed bottom, full width.

**Content:** `● 5 Active Campaigns | Today: $ 42,187 ↑3.2% | System: ● Healthy | Smart Bidding: ● Optimizing`

### 3.5 Command Palette (Cmd+K)

**Trigger:** Click search bar, press `Cmd+K`, or press `/`

**Visual:** Full-screen overlay with backdrop blur (`blur(20px)`), centered panel (600px wide), scale-in animation.

**Sections:**
- **Navigate:** Command Center, Campaigns, Audiences, Creative Studio, Intelligence, Catalog, Measurement, Account — each with icon and keyboard shortcut
- **Campaigns:** All 6 campaigns listed by name
- **Actions:** New Campaign (N C), New Audience (N A)

**Features:**
- Fuzzy text search (filters items as you type)
- Arrow key navigation (↑/↓) with visual highlight
- Enter to select
- Esc to close
- Footer: keyboard hints for Navigate/Select/Close

### 3.6 Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Cmd+K` | Open command palette |
| `?` | Show keyboard shortcuts overlay |
| `Cmd+D` | Toggle dark/light mode |
| `/` | Focus search |
| `Esc` | Close modal/drawer/palette |
| `G → D` | Go to Dashboard |
| `G → C` | Go to Campaigns |
| `G → A` | Go to Audiences |
| `G → R` | Go to Intelligence (Reports) |
| `N → C` | New Campaign (opens builder) |
| `N → A` | New Audience (opens audience modal) |
| `J` / `K` | Navigate down/up in tables |

Two-key shortcuts (G+D, N+C) use a 500ms timeout between keys.

### 3.7 AI Copilot

**Trigger:** Floating action button (FAB) at bottom-right with breathing pulse animation.

**Visual:** Slide-in drawer from right side, 380px wide.

**Features:**
- Chat-style conversation interface
- Introductory message listing capabilities
- Proactive insight: "I noticed 3 campaigns are below target CPA. Want me to analyze them?" with Analyze/Dismiss buttons
- User can type messages → receives contextual mock responses
- Mock responses reference campaign creation, bidding adjustment, performance analysis

**Current state:** Mock responses only — no actual AI integration. All responses are templated.

### 3.8 Toast Notifications

**Position:** Top-right, below topbar.

**Types:** Success (green left border), Error (red), Info (blue), Warning (amber).

**Behavior:** Slide-in animation, auto-dismiss after 4 seconds, manual dismiss via ✕ button.

---

## 4. View Specifications

### 4.1 Command Center (Dashboard)

**URL hash:** `#dashboard` (default on load)

**Layout:** KPI strip (full width) → two-column grid (main + 340px aside)

#### KPI Strip (5 cards)
| Metric | Value | Trend | Source |
|---|---|---|---|
| Total Spend | $123,350 | ↑ 8.4% vs last 7d | Sum of all active campaign spend |
| Conversions | 16,235 | ↑ 12.1% vs last 7d | Sum of all active campaign conversions |
| Avg CoPI | 3.25% (North Star badge) | ↑ 0.18pp vs last 7d | Average across active campaigns |
| Avg CPA | $8.38 | ↑ Above target ($7.50) | Average across active campaigns |
| Avg ROAS | 4.2x | ↑ 0.3x vs last 7d | Average across active campaigns |

Each card includes: sparkline SVG, trend indicator (green ↑ or amber), period comparison.

**Counter animation:** Numbers roll up from 0 to target over 800ms with cubic ease-out.

**North Star badge:** Wine-colored pill on AVG CoPI card, signifying Rokt's primary metric.

#### Spend Pacing Chart
- SVG-based area chart (wine gradient fill)
- 7-day view (Mon–Sun) with data points for Mon–Thu (today)
- Dashed projected line and dotted budget ceiling
- Period selector pills: 7D (active), 30D, MTD, QTD (visual only)
- Legend: Actual Spend, Projected, Budget Ceiling

#### Campaign Health Grid
- Auto-fill grid (min 220px cards), max 360px height with scroll
- 5 cards (one per active campaign, drafts excluded)
- Each card: campaign name, status dot (animated pulse for active), bidding state pill badge, CoPI %, CPA $, Spend $, Pacing %, progress bar
- Click → navigates to Campaigns view and opens that campaign's detail panel

#### AI Insights Sidebar
4 AI-generated insight cards:
1. 💡 Hulu CPA 22% above target — consider expanding LAL to Broad tier
2. ⚠️ True Classic EMQ dropped to 4.8 — check CAPI integration
3. ✅ Disney+ Creative #3 (Hero) outperforming by 3x CoPI — consider expanding
4. 💡 3 campaigns have stale audiences — refresh recommended

#### Recent Activity Timeline
5 timeline items with icons, timestamps, and entity links:
1. Budget increased on Capital One (2 min ago)
2. New creative "Disney+ Hero Banner" added (1 hour ago)
3. Experiment #1 reached 97% significance (3 hours ago)
4. PayPal Pay+ campaign paused (5 hours ago)
5. Weekly report generated (Yesterday)

---

### 4.2 Campaigns — Master-Detail View

**URL hash:** `#campaigns`

**Layout:** Flex row — list panel (flexible width) + detail panel (520px, slides in on selection)

#### Campaign List Panel

**Toolbar:**
- Title: "Campaigns" + count badge (6)
- Right: Search input + "New Campaign" wine pill button → navigates to `#builder`

**Filter pills:** All (6) | Active (4) | Needs Attention (2) | Paused (1) | Draft (1)
- Needs Attention: campaigns where bidding is limited/learning OR CPA is above target
- Clicking a pill filters the table

**Table columns:**
| Column | Content |
|---|---|
| ☐ | Checkbox (visual only) |
| ● | Status dot (green pulse = active, amber = paused, gray = draft) |
| Campaign | Name (truncated at 220px with ellipsis) |
| Objective | Badge: CPA or ROAS |
| Spend/Budget | "$42,150 / $75,000" with mini progress bar |
| CPA | "$5.82" with target in gray — amber if above target |
| CoPI | "4.12%" |
| ROAS | "5.1x" |
| Trend | Mini sparkline SVG (8 data points) |
| Bidding | Colored pill badge: ● Optimizing (green bg), ● Learning (blue bg), ● Limited (amber bg), ○ Draft (gray) |

**Row interactions:**
- Click → opens campaign detail panel (right side)
- Selected row gets wine-subtle background + left wine border
- Hover → slight background highlight

#### Campaign Detail Panel

**Opens:** Sliding panel from right, 520px wide.

**Header:** Campaign name + status badges (Active/CPA) + back arrow button

**Metric Ribbon:** Horizontal scrollable strip of metric chips:
- Spend ($42,150), Budget Left ($32,850), CPA ($5.82), ROAS (5.1x), Conversions (7,241), CTR (7.09%)
- Each chip is clickable (visual only in prototype)

**Tabs:** Overview | Ad Sets | Creatives | Analytics

**Overview tab (default):**
- Daily Spend chart (SVG line chart with gradient fill, 7D/30D toggle)
- Budget Pacing card: "56%" with progress bar
- Smart Bidding card: "● Optimizing — Fully optimized" with animated dot
- Impressions: 175,800
- CVR: 58.1%

**Ad Sets tab:**
- List of ad sets with audience, bid strategy, linked creatives count
- "Add Ad Set" button (visual only)

**Creatives tab:**
- Grid of creative cards with format badge, CTR/CVR/CoPI overlay
- Sorted by CoPI descending

**Analytics tab:**
- Inline pivot table with campaign metrics (visual only)

---

### 4.3 Campaign Builder — 5-Step Wizard

**URL hash:** `#builder`

**Layout:** Full-screen wizard with step progress bar at top, Back/Next buttons at bottom.

#### Step 1 — Goal
- Heading: "What do you want to achieve?"
- 6 objective cards in 3x2 grid:
  1. 🎯 Customer Acquisition — "Get new customers at a target CPA"
  2. 📈 Revenue Growth — "Maximize return on ad spend"
  3. 📱 App Installs — "Drive mobile app downloads"
  4. 🛍️ Product Sales (DPA) — "Dynamic product ads from your catalog"
  5. ✉️ Email Leads — "Capture email addresses and signups"
  6. ⚡ Embedded Actions — "Drive in-page actions and engagement"
- Selected card gets wine border highlight
- Alternative: "or describe your campaign" text input for natural language AI creation
- Placeholder: "e.g. I want to acquire Disney+ subscribers at $7 CPA targeting women 25-45"

#### Step 2 — Setup
- Campaign Name input (default: "My New Campaign")
- Measurement Group dropdown (Create New + 4 existing groups with EMQ scores)
- Start Date (pre-filled to today) + End Date (optional)
- Daily Budget ($1667) + Lifetime Budget ($50,000)
- Budget Distribution visual toggle: Daily vs Lifetime with colored bar indicator

#### Step 3 — Strategy & Targeting
- "Ad Set 1 — Primary Audience" card with Active badge
- Audience dropdown (pre-selected: Women 25-45 Entertainment Enthusiasts, 14.2M)
- Bid Strategy dropdown (Smart Bidding — Recommended)
- Smart Bidding explanation: "Smart Bidding uses Rokt's AI to optimize every impression using transaction intent signals."
- Ad Set Budget Override input (optional)
- "+ Add Another Ad Set" button

#### Step 4 — Offers & Creatives
- Split layout: Offer (left) + Creative (right)
- **Offer section:** Type dropdown (Discount/Trial/Cashback/Shipping/Product), Value input ("30% off first month"), Cost to Advertiser ($4.99)
- **Creative section:** Title input ("Stream for Less!"), Body textarea, CTA input ("Start Streaming"), "✨ AI Generate Variations" button

#### Step 5 — Review & Launch
- Campaign tree visualization showing hierarchy:
  - 📋 Campaign: My New Campaign
  - 🎯 Objective: CPA
  - 💰 Budget: $50,000 lifetime, $1667/day
  - 📅 Schedule: Mar 20, 2026 — Ongoing
  - 👥 Ad Set 1: Women 25-45 Entertainment Enthusiasts
  - 🏷️ Offer: 30% off first month ($4.99 cost)
  - 🎨 Creative: "Stream for Less!" (Text format)
- Validation checklist (5 green checkmarks):
  ✓ Campaign objective set
  ✓ Budget configured
  ✓ At least 1 ad set with audience
  ✓ Offer created
  ✓ Creative added
- Amber recommendation: "Add 3 more creative variations for better optimization"
- "🚀 Launch Campaign" button → confetti animation + success toast + redirects to campaigns

**Confetti animation:** 60 particles burst from center, wine/gold/white colors, 1.5s fall animation.

---

### 4.4 Audiences — Library + Builder

**URL hash:** `#audiences`

**Layout:** Toolbar + filter pills + responsive card grid

**Toolbar:**
- Title: "Audiences" + count badge (12)
- Search input
- Action buttons: Upload List | Create Lookalike | Build Audience (wine pill)

**Type filter pills:** All (12) | Custom (3) | Lookalike (3) | Behavioral (3) | Demographic (1) | Starter (1) | Experian (1)

**Audience cards (12 total):**
Each card shows:
- Icon (type-based emoji: 👥 Custom, 🔄 LAL, 🎯 Behavioral, 📊 Demographic, ⚡ Starter, 🏢 Experian)
- Name + type label
- Stats: Size (e.g. "14.2M"), Campaigns linked, Match Rate
- Freshness indicator: green "Fresh" or amber "Stale — refresh recommended"
- Type badge (bottom-right)
- Click → opens View Audience modal

**Mock audiences:**
1. Women 25-45 Entertainment Enthusiasts (Custom, 14.2M, 82%)
2. Streaming Subscribers LAL Default (LAL, 10.1M, 71%)
3. Cord Cutters Behavioral (Behavioral, 8.7M, 68%)
4. High-Value Shoppers LAL Broad (LAL, 22.4M, 64%)
5. Finance Decision Makers (Experian, 5.8M, 76%)
6. Existing Customers Suppress (Custom, 2.1M, 94%)
7. Mobile App Users (Behavioral, 18.9M, 59%)
8. US Demographics 18-34 (Demographic, 31.2M, 55%)
9. Starter: Frequent Online Shoppers (Starter, 25.6M, 61%)
10. Disney+ Seed Audience (Custom, 245K, 91%)
11. Travel Bookers LAL (LAL, 12.8M, 66%)
12. Health & Wellness Interest (Behavioral, 9.4M, 70%)

#### Build Audience Modal (Large)
- Audience Name input
- Rules section with AND/OR toggle:
  - Rule 1: Demographics > Age Range > is > 25-45
  - Rule 2: Behavioral > Interest > contains > Entertainment
  - Each rule: category/attribute/operator/value selects + ✕ remove
  - "+ Add Rule" button
- Suppress Existing Customers checkbox (checked by default, with explanation hint)
- **Reach Estimator sidebar (240px):**
  - Large number: "14.2M"
  - Label: "Estimated Reach"
  - Progress bar (42% of Rokt network)
  - "✓ Sufficient for Smart Bidding" indicator

#### Create Lookalike Modal
- Seed Audience dropdown
- Lookalike Tier visualization: 3 concentric circles
  - Default (~10M) — wine border, active
  - Broad (~20M) — larger circle, semi-transparent
  - Broader (~30M) — largest circle
- Helper text: "Broader tiers reach more users but may reduce precision"
- "Generate Lookalike" button

#### Upload List Modal
- Drag-and-drop zone with file type info (CSV)
- List name input + identifier type selector
- Match rate preview

---

### 4.5 Creative Studio — Editor + Library

**URL hash:** `#creatives`

**Layout:** 3-panel grid — Library (220px) | Editor (flex) | Preview (320px)

#### Creative Library Panel
- Search input
- Scrollable list of 8 creatives
- Each item: format badge (Text/Benefits/Savings/Hero Image/Carousel) + name + stats (CTR, CoPI)
- Active item highlighted with wine left border
- Click selects creative for editing

#### Creative Editor Panel
- **Format tabs:** Text | Benefits | Savings | Hero Image | Carousel
- **Title field:** Input with character counter (24/40)
- **Body field:** Textarea
- **CTA field:** Input with character counter (15/25)
- **Linked Offer:** Dropdown (pre-selected offer with value)
- **Dynamic Attributes:** Clickable chips: `{customer.firstname}`, `{partner.name}`, `{rokt.customeraction}` — inserts into focused field
- **AI Generate panel:** "✨ AI Generate" button + "Policy Check" button
- **Policy status:** "✓ Passes policy check" (green)

#### Preview Panel
- **Device toggle:** Desktop (active) | Mobile
- Live preview card showing creative rendered as it would appear:
  - Partner context label (e.g. "ticketmaster.com")
  - "SPONSORED" tag
  - Title + body text
  - Offer value pill (e.g. "30% off first month")
  - CTA button (wine pill)
  - "No thanks" secondary link
- **Partner Contexts:** Ticketmaster | Fanatics | Booking.com tabs

---

### 4.6 Intelligence — Reports + Experiments

**URL hash:** `#intelligence`

**Layout:** Tab-based — Reports (default) | Experiments

#### Reports Tab

**AI Insight Banner:**
- "✨ CPA improved 12% week-over-week across all campaigns" (dismissable)

**Date Range Bar:**
- Preset pills: Today | 7D | 30D | MTD | Custom
- Attribution window dropdown: "Default (7C+1V)"
- "+ Add Metric" button → opens metric selector modal
- "Export" button → opens export modal

**Performance Chart:**
- Dual-axis SVG line chart
- CPA ($) line (wine) + ROAS (x) line (blue)
- 30-day view with data points

**Data Table:**
- Sortable columns (click header to sort, arrow indicator):
  - Campaign, Impressions, Clicks, CTR, Conversions, CPA, ROAS, CoPI, Spend
- 5 active campaign rows with real metric data
- CPA cells colored amber when above $7.50 target
- Column sorting: toggles asc/desc, wine-colored sort arrow

**Export modal options:** CSV, PDF, Scheduled Email, API

#### Experiments Tab

**Filter pills:** All | Running | Concluded | Draft

**Experiment cards (4):**
1. Disney+ Creative A/B Test — Concluded, 14/14 days, 97% significance, Variant B wins (+18% CoPI), "Apply Winner" button
2. Capital One Audience Split — Running, 8/14 days, 72% significance, Control leads (+4% CPA)
3. Hulu MAB Creative Test — Running, 5/21 days, 58% significance, Variant A leads (+7% CVR)
4. True Classic DPA vs Static — Draft, 0/14 days, 0% significance

Each card shows: type badge (A/B or MAB), campaign, status, days progress, statistical significance bar (fills proportionally), leader, lift metric.

**"Apply Winner" button:** Only on concluded experiments — toast confirmation.

**"New Experiment" button → modal:** Experiment type (A/B vs MAB with visual explanation), campaign selector, control/variant builder, traffic allocation sliders, duration, success metric.

---

### 4.7 Catalog — Offers + Products

**URL hash:** `#catalog`

**Layout:** Tab-based — Offers (default) | Products

#### Offers Tab

**Toolbar:** "Create Offer" wine pill button

**Offer cards (6):**
Each card: type emoji icon, name, type label, VALUE/COST/CAMPAIGNS stats, CoPI %, CVR %

| Offer | Type | Value | Cost | CoPI | CVR |
|---|---|---|---|---|---|
| 30% off first month | Discount | 30% off | $4.99 | 4.53% | 58.1% |
| 7-day free trial | Trial | Free trial | $0.00 | 3.61% | 52.3% |
| $50 statement credit | Cashback | $50 credit | $50.00 | 2.93% | 41.2% |
| $2 off first month | Discount | $2 off | $2.00 | 2.64% | 40.6% |
| Free shipping on first order | Shipping | Free shipping | $8.99 | 1.78% | 30.7% |
| $5 PayPal cashback | Cashback | $5 back | $5.00 | 4.75% | 56.5% |

**Create Offer modal:** Type selector (Discount/Trial/Cashback/Shipping/Product icons), value input, cost input, description textarea, validity dates, "Create Offer" button.

#### Products Tab

**Toolbar:** Filter pills (All Products, In Stock, Low Stock) + "Create Product Set" button

**Product cards (6):**
Each with large emoji icon, name, price, stock status (green "In Stock" / amber "Low Stock" / red "Out of Stock"):
1. Classic V-Neck Tee — $34.99, In Stock
2. Premium Henley — $44.99, In Stock
3. Active Shorts — $39.99, Low Stock
4. Crew Neck Sweatshirt — $54.99, In Stock
5. Slim Fit Chinos — $49.99, In Stock
6. Performance Polo — $42.99, Out of Stock

**Create Product Set modal:** Name input, selection method (Manual/Rule-based/AI Recommended), category multi-select, price range slider, availability filter.

---

### 4.8 Measurement — Attribution Health Center

**URL hash:** `#measurement`

**Layout:** 3-column grid (EMQ gauge | Identifier coverage | Improve EMQ) + Measurement Groups table

#### EMQ Dashboard

**EMQ Gauge:**
- Circular gauge visualization showing 7.8/10
- Color zones: red (<5), amber (5-7), green (8+)
- Label: "Good · +0.4 from last month"

**Identifier Coverage table:**
| Identifier | Status | Contribution |
|---|---|---|
| Email (SHA-256) | ✓ Active | +2.1 |
| Phone (SHA-256) | ✗ Missing | — |
| Rokt Click ID | ✓ Active | +1.8 |
| IP Address | ✓ Active | +1.2 |
| User Agent | ✓ Active | +0.8 |
| Transaction ID | ✓ Active | +1.5 |

**Improve EMQ cards:**
1. "Add phone number to CAPI integration for estimated +1.5 EMQ points" → "View Integration Guide" button
2. "Enable enhanced matching in Web SDK for +0.8 EMQ points" → "Configure SDK" button

#### Measurement Groups Table

| Name | Linked Campaigns | Status | Optimization Event | Attribution Window | EMQ |
|---|---|---|---|---|---|
| Disney+ Conversions | 2 | ● Live | Purchase | 7C + 1V | 8.4 |
| Capital One Applications | 1 | ● Live | Application Submit | 30C | 7.9 |
| Hulu Signups | 1 | ● Live | Signup | 7C + 1V | 8.1 |
| True Classic Orders | 1 | ⚠ Warning | Purchase | 7C + 1V | 4.8 |
| PayPal Activations | 1 | ● Live | Account Activation | 7C | 7.2 |

**"Create Group" button → modal:** Name, linked campaign selector, optimization event selector, attribution window config (click-through days slider + view-through toggle).

---

### 4.9 Account — Admin Hub

**URL hash:** `#account`

**Layout:** 2x2 grid — Overview | Billing | Team | Integrations

#### Overview Card
- Account Name: Rokt Ads Demo Account
- Account ID: ACC-2847291
- Region: North America
- Rokt Entity: Rokt Inc.
- Account Type: Self-serve
- Created: Jan 15, 2025

#### Billing Card
- March 2026 Spend: $89,421 (large number)
- Credit Limit: $89K / $150K with progress bar
- Payment Status: "Current" green badge

#### Team Card
| Name | Email | Role | Last Active |
|---|---|---|---|
| Max Dowaliby | max.dowaliby@rokt.com | Admin | Just now |
| Sarah Chen | sarah.chen@rokt.com | Editor | 2 hours ago |
| James Wilson | james.wilson@rokt.com | Viewer | Yesterday |

**"Invite User" button → modal:** Email input, role selector (Admin/Editor/Viewer), invitation message.

#### Integrations Card
- ✓ Web SDK v4.2.1 installed
- ✓ Conversions API Connected
- ○ mParticle Not configured
- ○ Segment Not configured

---

## 5. Modal System

All modals share consistent structure: `.modal-overlay` (backdrop blur) → `.modal` (centered, max-width varies, spring animation).

| Modal Type | Trigger | Size | Key Content |
|---|---|---|---|
| `buildAudience` | Audiences > Build Audience | Large (860px) | Rule builder + reach estimator |
| `createLAL` | Audiences > Create Lookalike | Default (560px) | Seed selector + tier circles |
| `uploadList` | Audiences > Upload List | Default | Drag-drop + identifier selector |
| `newOffer` | Catalog > Create Offer | Default | Type selector + value/cost form |
| `newExperiment` | Intelligence > New Experiment | Large | Type/campaign/variants/allocation |
| `newMeasurementGroup` | Measurement > Create Group | Default | Event config + attribution window |
| `newProductSet` | Catalog > Create Product Set | Default | Selection method + filters |
| `inviteUser` | Account > Invite User | Small (420px) | Email + role selector |
| `exportReport` | Intelligence > Export | Default | Format selector + schedule option |
| `addMetrics` | Intelligence > + Add Metric | Default | Metric checklist |
| `viewAudience` | Audiences > Click card | Default | Audience details (read-only) |
| `aiGenerate` | Creative Studio > AI Generate | Default | Tone/emphasis/length controls |

---

## 6. Mock Data Summary

### 6.1 Campaigns (6)
| Campaign | Status | Objective | Spend | Budget | CPA | CoPI | ROAS | EMQ | Bidding |
|---|---|---|---|---|---|---|---|---|---|
| Disney+ Spring Acquisition | Active | CPA | $42,150 | $75,000 | $5.82 | 4.12% | 5.1x | 8.4 | Optimizing |
| Capital One Card Acquisition | Active | CPA | $31,200 | $50,000 | $8.45 | 3.21% | 3.8x | 7.9 | Optimizing |
| Hulu Streaming Signup | Active | CPA | $18,700 | $25,000 | $9.14 | 2.84% | 2.9x | 8.1 | Learning |
| True Classic DPA | Active | ROAS | $22,400 | $40,000 | $12.30 | 2.15% | 4.8x | 4.8 | Limited |
| PayPal Pay+ Activation | Paused | CPA | $8,900 | $20,000 | $6.20 | 3.95% | 4.2x | 7.2 | Optimizing |
| Audible Free Trial | Draft | CPA | $0 | $30,000 | — | — | — | 7.5 | Draft |

### 6.2 Key Rokt-Specific Metrics

| Metric | Definition | Tier |
|---|---|---|
| **CoPI** | Conversions per Impression — Rokt's north star combining CTR × CVR | Hero |
| **CPA** | Cost per Acquisition — primary advertiser success metric | Hero |
| **ROAS** | Return on Ad Spend — for revenue-focused campaigns | Hero |
| **EMQ** | Event Match Quality — integration health score 1-10 | Hero |
| **Smart Bidding State** | Learning / Optimizing / Limited — ML model status | Diagnostic |
| **CVR** | Conversion Rate — post-click conversion rate | Diagnostic |
| **CTR** | Click-through Rate — engagement in Transaction Moment | Diagnostic |

---

## 7. What's Possible Today (Interactive)

| Feature | Status | Notes |
|---|---|---|
| Navigate all 9 views | ✅ Working | Hash-based routing with animated transitions |
| Campaign table with filtering | ✅ Working | All/Active/Needs Attention/Paused/Draft + search |
| Campaign detail panel | ✅ Working | Opens for any campaign, 4 tabs |
| Campaign builder (5 steps) | ✅ Working | Full flow through Goal→Setup→Strategy→Creative→Review |
| Campaign launch with confetti | ✅ Working | Confetti particles + success toast + redirect |
| Audience library with filtering | ✅ Working | Type filters, search, all 12 cards |
| Build Audience modal | ✅ Working | Rule builder with AND/OR, reach estimator |
| Create Lookalike modal | ✅ Working | Tier circles visualization |
| Creative Studio 3-panel layout | ✅ Working | Library selection, editor, live preview |
| Creative format switching | ✅ Working | Text/Benefits/Savings/Hero Image/Carousel tabs |
| Dynamic attribute insertion | ✅ Working | Chips insert variables into text fields |
| Intelligence report table | ✅ Working | Sortable columns with visual arrows |
| Experiment cards with significance | ✅ Working | Progress bars, leader, "Apply Winner" |
| Catalog offers and products | ✅ Working | Card grids with tabs |
| Measurement EMQ dashboard | ✅ Working | Gauge, identifier coverage, improvement cards |
| Account admin hub | ✅ Working | Overview, billing, team, integrations |
| Command palette (Cmd+K) | ✅ Working | Fuzzy search, keyboard nav, sections |
| Keyboard shortcuts (12+) | ✅ Working | Two-key combos with 500ms timeout |
| AI Copilot chat | ✅ Working | Send messages, receive mock responses |
| Notification dropdown | ✅ Working | 4 notifications with types and timestamps |
| Dark/Light mode toggle | ✅ Working | Full CSS token swap |
| Toast notifications | ✅ Working | Multiple types, auto-dismiss |
| Context alert bar | ✅ Working | View-specific alerts with "Fix Now" action |
| Responsive layout | ✅ Working | Sidebar collapse at 1200px, stack at 900px |
| Inline editing (campaigns) | ✅ Working | Double-click cells to edit (visual only) |
| Report sorting | ✅ Working | Click headers to sort columns asc/desc |

---

## 8. What's NOT Possible / Mock-Only

| Feature | Status | Notes |
|---|---|---|
| Actual data fetching | ❌ Mock only | All data is hardcoded JavaScript objects |
| Backend persistence | ❌ None | Changes are lost on refresh |
| Real AI responses | ❌ Mock only | Copilot returns template responses |
| Authentication/login | ❌ Not implemented | No auth flow |
| Real search/fuzzy matching | ⚠️ Basic | Simple substring matching, not AI-powered |
| Chart interactivity | ⚠️ Limited | Static SVG charts, no hover tooltips |
| Drag-and-drop | ❌ Not implemented | Rule reordering, creative dragging |
| Real-time updates | ❌ Mock only | Status bar numbers are static |
| File upload | ❌ Visual only | Upload List modal has drop zone but no upload |
| API/export functionality | ❌ Visual only | Export button opens modal but doesn't download |
| Collaborative features | ❌ Not implemented | No multi-user, no comments |
| Permission system | ❌ Not implemented | All users see everything |
| Undo/redo | ❌ Not implemented | No action history |
| Deep linking | ⚠️ Partial | View-level hash routing only, no entity deep links |
| Mobile optimization | ⚠️ Basic | Responsive breakpoints but not mobile-optimized |
| Accessibility (a11y) | ⚠️ Partial | Semantic HTML, keyboard nav, but no ARIA roles or screen reader support |

---

## 9. Technical Architecture

### 9.1 File Structure
```
rokt-ads-prototype/
├── index.html       # 832 lines — SPA shell + 9 <template> elements
├── styles.css       # 2,996 lines — Design tokens + component styles + animations
├── app.js           # 2,248 lines — IIFE module with router, data, interactions
├── PLAN.md          # Original design plan
├── USER-FLOWS.md    # User flow specifications
└── PRD.md           # This document
```

### 9.2 Architecture Decisions

| Decision | Rationale |
|---|---|
| **Zero dependencies** | Opens in any browser, no build step, no node_modules bloat |
| **IIFE module pattern** | Single `RoktAds` global, clean public API, no module system needed |
| **Hash-based routing** | Simple SPA navigation without server config |
| **`<template>` cloning** | Efficient DOM rendering, templates parsed once by browser |
| **`requestAnimationFrame` init** | Ensures DOM is ready after template clone |
| **CSS custom properties** | Enables dark/light mode toggle without JS class swapping |
| **Vanilla JS** | Full control, no framework overhead, easier to prototype |
| **SVG charts** | Inline, no chart library dependency, fully styled with CSS vars |
| **Cache-busting query params** | `?v=5` on CSS/JS imports to prevent stale caches |

### 9.3 Public API (`RoktAds.*`)

| Method | Parameters | Description |
|---|---|---|
| `navigate(view)` | String: view name | Route to a view |
| `toast(msg, type)` | String, String | Show toast notification |
| `openCampaignDetail(id)` | String: campaign ID | Open detail panel |
| `closeCampaignDetail()` | — | Close detail panel |
| `selectObjective(id)` | String: objective ID | Select builder objective |
| `switchIntelTab(tab)` | 'reports' or 'experiments' | Switch Intelligence tab |
| `switchCatalogTab(tab)` | 'offers' or 'products' | Switch Catalog tab |
| `openModal(type, id?)` | String, String? | Open modal by type |
| `closeModal()` | — | Close any open modal |
| `toggleFilter(type, value)` | String, String | Toggle audience type filter |
| `applyFilter(type, value)` | String, String | Apply specific filter |
| `insertAttr(attr)` | String: attribute token | Insert dynamic attribute in creative editor |
| `selectCreative(id)` | String: creative ID | Select creative in library |
| `sortReport(col)` | String: column name | Sort report table by column |

---

## 10. Rokt Brand Alignment

### Brand Elements Applied
- **Wine/Beetroot accent** (#C43B52) throughout — CTAs, active states, metric highlights, progress bars
- **Pill-shaped buttons** (border-radius: 9999px) for primary CTAs
- **Inter + JetBrains Mono** typography pairing
- **Dark-first palette** matching Rokt's modern, premium aesthetic
- **Geometric sans-serif** feel consistent with rokt.com
- **Generous whitespace** — 16-24px padding on cards, 32px+ section gaps

### Competitive Differentiation
- **Linear-inspired** command palette and keyboard-first navigation
- **Stripe-inspired** data density with readable tables
- **Meta Ads Manager-inspired** campaign hierarchy and master-detail pattern
- **Vercel-inspired** dark theme and monochrome + accent color system
- **Unique to Rokt:** CoPI as North Star metric, EMQ dashboard, Transaction Moment context in creative previews, Smart Bidding states

---

## 11. Design Decisions & Rationale

### Why dark mode default?
Rokt's brand is dark-first (rokt.com uses dark backgrounds). Media buyers often work long hours — dark mode reduces eye strain. Light mode is available as an override.

### Why 5 KPI cards instead of 3?
Rokt's unique metrics (CoPI, EMQ) require more top-level real estate than generic ad platforms. 5 cards at ~220px each fit comfortably in a standard 1440px+ viewport.

### Why master-detail for campaigns instead of separate pages?
Reduces context switching. Media buyers need to compare campaigns while viewing details. The sliding panel pattern (borrowed from email clients and Linear) keeps the list visible.

### Why a 5-step builder instead of a single form?
Progressive disclosure prevents overwhelm. Each step focuses on one decision domain. The "cinematic" step transitions make campaign creation feel intentional rather than form-filling.

### Why colored bidding state badges?
Bidding state is a critical signal — Learning means "don't touch it yet," Limited means "something's wrong." Color-coded pills with background tints make these states instantly scannable in a table.

### Why concentric circles for LAL tiers?
Spatial metaphor: bigger circle = more reach = less precision. This matches the mental model better than a dropdown or slider.

### Why a separate Measurement view?
EMQ is Rokt-unique and critical to campaign success. Burying it in settings would make it easy to miss. A dedicated view with gauge visualization, identifier breakdown, and improvement recommendations makes attribution health a first-class concern.

---

*This PRD was generated from a working prototype — every feature described above has been implemented and visually verified through 3 rounds of critique and polish. The prototype can be opened by serving the `rokt-ads-prototype/` directory with any HTTP server.*
