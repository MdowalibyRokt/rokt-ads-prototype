# Rokt Ads — User Flows & Workflow Specifications

This document specifies every major user workflow in the Rokt Ads prototype, optimized for feeding to a UI AI agent for implementation refinement.

---

## 1. Navigation & Global Interactions

### 1.1 Sidebar Navigation
- **Trigger:** Click any nav item in the left sidebar
- **Behavior:** Active item gets wine-colored left border + background highlight. Content area crossfades to the new view with `fadeSlideIn` animation (200ms ease-out). Hash route updates (`#dashboard`, `#campaigns`, etc.)
- **Collapse:** Click the `<` button in sidebar header. Sidebar animates from 240px → 56px. Labels and dividers hide. Grid column transitions smoothly. Icon-only mode shows tooltips on hover.
- **Keyboard:** `g d` → Dashboard, `g c` → Campaigns, `g a` → Audiences, `g r` → Intelligence, `g v` → Creative Studio

### 1.2 Command Palette (Cmd+K)
- **Trigger:** `Cmd+K` keyboard shortcut or click the search trigger in the topbar
- **Open Animation:** Full-screen backdrop blur overlay (rgba(0,0,0,0.5) + blur(8px)). Palette scales in from 0.96 (150ms spring easing). Input auto-focuses.
- **Search:** Fuzzy search across Navigate, Actions, and Campaigns sections. Results filter in real-time on `input` event. Navigate with `↑`/`↓` arrow keys, select with `Enter`, close with `Esc`.
- **Actions:** Each result has an icon, label, and optional shortcut badge. Clicking a result executes its action (navigate, open campaign detail, toggle theme, etc.)
- **Close:** `Esc` key or click outside the palette

### 1.3 Keyboard Shortcuts Overlay
- **Trigger:** Press `?` key (when not in an input field)
- **Display:** Full-screen overlay with 3-column grid: Navigation, Actions, Lists & Tables
- **Close:** `Esc` key or click the `×` close button

### 1.4 AI Copilot
- **Trigger:** Click the floating action button (bottom-right, wine-colored with breathing pulse animation)
- **Open:** Drawer slides in from right (400px width, 300ms ease-out). Shows chat-style conversation with welcome message and proactive insight.
- **Interaction:** Type in the input field, press Enter or click send. Mock AI response appears with action buttons (Apply, View, Dismiss).
- **Close:** Click `×` button or press `Esc`

### 1.5 Toast Notifications
- **Trigger:** Any action that needs confirmation (button clicks, campaign launch, settings changes)
- **Animation:** Slides in from top-right (200ms spring easing). Auto-dismisses after 3.5 seconds with slide-out animation.
- **Types:** Success (green left border), Error (red), Warning (amber), Info (blue)

### 1.6 Context Alert Bar
- **Display:** Fixed bar below topbar showing critical/warning alerts. Amber background for warnings.
- **Content:** "EMQ dropped below 5.0 on True Classic — conversion tracking may be degraded"
- **Actions:** "Fix Now" button and `×` dismiss button

### 1.7 Theme Toggle
- **Trigger:** Click sun/moon icon in sidebar footer or press `Cmd+D`
- **Behavior:** Swaps `data-theme` attribute between "dark" and "light". All CSS custom properties transition to their light-mode values. Icon swaps between sun and moon.

---

## 2. Command Center (Dashboard)

### 2.1 View Structure
```
┌─────────────────────────────────────────────────────────┐
│ KPI Strip (5 cards in a row)                            │
├────────────────────────────────┬────────────────────────┤
│ Spend Pacing Chart             │ AI Insights (4 cards)  │
│ Campaign Health Grid (6 cards) │ Recent Activity (6)    │
└────────────────────────────────┴────────────────────────┘
```

### 2.2 KPI Strip
- **Cards:** Total Spend ($127,450), Conversions (18,247), Avg CoPI (3.42% — "North Star" hero card), Avg CPA ($6.98), Avg ROAS (4.2x)
- **Animation:** Numbers animate from 0 to target value over 800ms with ease-out cubic easing. Uses `data-target` attribute as source of truth.
- **Hover:** Cards lift 3px with shadow increase and border brightening
- **Hero Card (CoPI):** Has wine-colored gradient background and glow shadow, "North Star" badge

### 2.3 Spend Pacing Chart
- **Type:** SVG line chart with area fill
- **Elements:** Wine-colored actual spend line (animated draw-in over 1.2s), dashed projected line, dotted budget ceiling
- **Interaction:** Date range pills (7D, 30D, MTD, QTD) — clicking one adds `.active` class
- **Data points:** Circles at each data point, largest circle on "Today" with white stroke

### 2.4 Campaign Health Grid
- **Layout:** Auto-fill grid, min 240px columns
- **Cards:** Status dot (green pulse for active, amber for paused), campaign name, CoPI + CPA metrics, pacing progress bar, Smart Bidding state indicator (● Optimizing, ◐ Learning, ◑ Limited)
- **Click:** Navigates to `#campaigns` and opens that campaign's detail panel after 300ms delay
- **Stagger:** Cards animate in with 80ms delay between each

### 2.5 AI Insights Sidebar
- **Cards:** Warning (Hulu CPA above target), Positive (Disney+ creative outperforming), Info (True Classic creative fatigue), Positive (Experiment reached significance)
- **Each card has:** Icon, text description with bold entity names, action buttons (Apply, Dismiss, View, Create Variations, Apply Winner)
- **Background colors:** warning-subtle, positive-subtle, info-subtle

### 2.6 Activity Timeline
- **Items:** Vertical list with colored dots (green, blue, wine, amber), text with bold entity names, relative timestamps
- **Animation:** Each item fades in with stagger delay

---

## 3. Campaigns — Master-Detail View

### 3.1 Layout
```
┌──────────────────────────────┬───────────────────────┐
│ Campaign List Panel           │ Detail Panel (520px)  │
│ - Toolbar (title + search)   │ - Header + badges     │
│ - Filter pills               │ - Metric ribbon       │
│ - Data table (6 rows)        │ - Tabs (4)            │
│                              │ - Tab content          │
└──────────────────────────────┴───────────────────────┘
```

### 3.2 Campaign List
- **Toolbar:** Title "Campaigns" with count badge (6), search input, "New Campaign" button (wine pill, navigates to `#builder`)
- **Filters:** All, Active (4), Needs Attention (2), Paused (1), Draft (1). Clicking a pill filters the table rows and adds `.active` class with wine styling.
- **Table columns:** Checkbox, Status dot, Campaign name (bold), Objective (CPA/ROAS badge), Spend/Budget (progress bar), CPA (with target comparison — red if above target), CoPI, ROAS, Trend (sparkline), Bidding state
- **Row click:** Opens campaign detail panel (slides in from right, 520px width, 300ms ease-out). Selected row gets wine-subtle background.
- **Keyboard:** `j`/`k` to navigate rows, `Enter` to open detail

### 3.3 Campaign Detail Panel
- **Header:** Back arrow button, campaign name (large, bold), status + objective badges, Duplicate/Archive action buttons
- **Metric Ribbon:** Horizontal scrollable strip of metric chips — Spend, Budget Left, CPA (vs target), ROAS, Conversions, CTR, CoPI. Warning chip styling for metrics above target.
- **Tabs:** Overview | Ad Sets | Creatives | Analytics

#### 3.3.1 Overview Tab
- **Performance chart:** SVG line chart with CPA (wine line) and ROAS (blue line) over 7 days. Date range pills (7D, 30D, MTD).
- **Budget Pacing:** Circular gauge (SVG arc) showing % spent of budget. Wine-colored fill arc.
- **Smart Bidding:** Card showing state indicator (large symbol), state name, and "X conversions to next state" progress info.

#### 3.3.2 Ad Sets Tab
- Cards showing ad set name, audience, bid strategy, budget progress bar, linked creatives count.

#### 3.3.3 Creatives Tab
- 2-column grid of creative cards with format badge, name, and CTR/CVR/CoPI metrics.

#### 3.3.4 Analytics Tab
- Placeholder pivot table with dimension/metric chips and chart toggle buttons.

### 3.4 Close Detail
- **Trigger:** Click back arrow or press `Esc`
- **Animation:** Panel width transitions from 520px → 0. Selected row deselects.

---

## 4. Campaign Builder — 5-Step Wizard

### 4.1 Layout
```
┌─────────────────────────────────────────────────────────┐
│ Builder Header: Back | "Create Campaign" | Step Indicator│
├─────────────────────────────────────────────────────────┤
│ Step Content (max-width 900px, centered)                 │
├─────────────────────────────────────────────────────────┤
│ Builder Footer: Previous | Next/Launch                   │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Step Indicator
- **Visual:** 5 steps connected by lines. Each step: numbered circle + label.
- **States:** Active (wine fill), Completed (green fill + checkmark implied), Pending (gray border)
- **Transition:** Step content fades out, new step fades in with `fadeSlideIn`

### 4.3 Step 1: Goal
- **AI Input:** Wine-bordered input with sparkle icon. Placeholder: "Describe your campaign... e.g., 'Acquire new Disney+ subscribers at $8 CPA targeting women 25-45'"
- **Divider:** "or choose an objective" with horizontal rules
- **Objective Cards:** 3×2 grid (Customer Acquisition, Revenue Growth, App Installs, Product Sales, Email Leads, Embedded Actions). Each card: SVG icon, title, description. Hover: lift + wine glow. Click: adds `.selected` class, auto-advances to step 2 after 600ms.

### 4.4 Step 2: Setup
- **Form fields:** Campaign Name (with AI suggest button), Measurement Group (dropdown with EMQ preview), Optimization Target (dropdown), Start/End Date (date inputs), Budget Builder (lifetime + daily cap with projected spend hint)
- **Budget Builder:** Styled container with two rows, dollar prefix, mono-font input

### 4.5 Step 3: Strategy
- **Ad Set Card:** Name, Audience dropdown (with reach hint), Bid Strategy dropdown (with AI explanation hint in wine text)
- **Add button:** Dashed border "Add Another Strategy" button

### 4.6 Step 4: Offers & Creatives
- **Layout:** 2-column (form left, preview right at 320px)
- **Offer section:** Type picker (pill buttons: Discount, Trial, Cashback, Shipping, Product), value/cost inputs
- **Creative section:** Format tabs (Text, Benefits, Savings, Hero Image, Carousel), Title input with character counter, Body textarea, CTA input, Dynamic attributes (clickable chips: `{customer.firstname}`, `{partner.name}`, `{rokt.customeraction}`)
- **Preview:** Live-updating creative preview card showing partner context, sponsored badge, title, body, offer badge, CTA button, dismiss link

### 4.7 Step 5: Review & Launch
- **Summary card:** Three sections (Campaign, Strategy, Offer & Creative) with label-value rows
- **Validation checklist:** Green checkmarks for "Budget configured correctly" and "Measurement group linked (EMQ: 8.4)"
- **Launch button:** "🚀 Launch Campaign" with gradient wine background
- **Launch action:** Triggers confetti particle burst (80 particles, random colors, fall animation), success toast, redirects to `#campaigns`

### 4.8 Navigation
- **Next button:** Advances `builderStep`, updates step indicator, hides/shows step content
- **Previous button:** Goes back one step. Hidden on step 1.
- **Back button:** `history.back()` — returns to previous view

---

## 5. Audiences — Library + Builder

### 5.1 Layout
```
┌─────────────────────────────────────────────────────────┐
│ Header: "Audiences" (12) | Search | Upload | LAL | Build │
├─────────────────────────────────────────────────────────┤
│ Audience Grid (3 columns, 12 cards)                      │
├─────────────────────────────────────────────────────────┤
│ [Audience Builder Panel — slides up when activated]       │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Audience Cards
- **Header:** Type icon (👥 Custom, 🔄 LAL, ⚡ Starter, 📊 Demographic, 🎯 Behavioral, 🏢 Experian), name, type badge
- **Stats:** User count (formatted: "14.2M"), campaigns linked, match rate percentage
- **Footer:** Freshness indicator (green "Fresh" or amber "Stale — refresh recommended")
- **Hover:** Wine border glow, lift 3px
- **Stagger:** Each card has incremental animation delay

### 5.3 Builder Panel
- **Trigger:** "Build Audience" button
- **Layout:** 2-column (rules left, reach estimator right at 280px)
- **Rules:** AND/OR groups with dropdowns for category/attribute/operator/value
- **Reach Estimator:** Animated gauge bar, total reach number, % of network, daily impressions estimate

---

## 6. Creative Studio — 3-Panel Layout

### 6.1 Layout
```
┌──────────────┬──────────────────────┬───────────────────┐
│ Library (220) │ Editor               │ Preview (340px)   │
│ - Search      │ - Format tabs        │ - Device toggle   │
│ - 8 items     │ - Title/Body/CTA     │ - Live preview    │
│               │ - Dynamic attrs      │ - Partner context  │
│               │ - Policy check       │                   │
└──────────────┴──────────────────────┴───────────────────┘
```

### 6.2 Library Panel
- **Items:** 8 creatives with format badge (Text, Benefits, Hero Image, Savings, Carousel), name truncated, CTR/CoPI metrics
- **Active state:** Wine-colored left border + wine-subtle background
- **Click:** Loads creative data into editor

### 6.3 Editor Panel
- **Format tabs:** Text | Benefits | Savings | Hero Image | Carousel (segmented control style, active tab has white bg + wine text)
- **Fields:** Title (with char count 24/40), Body (textarea), CTA (15/25 char count)
- **Dynamic Attributes:** Clickable chip buttons that insert variables
- **Policy Check:** Green "✓ Passes policy check" strip at bottom
- **AI Actions:** "AI Generate" and "Policy Check" buttons in header

### 6.4 Preview Panel
- **Device Toggle:** Desktop | Mobile buttons
- **Preview Card:** Simulated creative rendering with partner context bar (Ticketmaster.com), SPONSORED badge, title, body, offer highlight, CTA button, dismiss link
- **Live Update:** Title, body, and CTA inputs update preview text in real-time via `input` event listeners
- **Partner Contexts:** Clickable pills (Ticketmaster, Fanatics, Booking.com) to switch preview background context

---

## 7. Intelligence — Reports + Experiments

### 7.1 Reports Tab
- **Insight Strip:** Horizontal scrollable cards with auto-generated insights (CPA improved 12%, Creative #7 outperforming 3x, True Classic CoPI declining)
- **Date Range:** Today, 7D, 30D, MTD, Custom pills
- **Attribution:** Dropdown selector (Default 7C+1V, etc.)
- **Chart:** SVG dual-line chart (CPA in wine, ROAS in blue) with legend
- **Data Table:** Sortable table with columns: Campaign, Impressions, Clicks, CTR, Conversions, CPA, ROAS, CoPI, Spend
- **CPA highlighting:** Values above target shown in red/wine

### 7.2 Experiments Tab
- **Grid:** Auto-fill cards (min 400px)
- **Card contents:** Experiment name, type badge (A/B or MAB), campaign name, status, traffic split (control/variant percentages), days elapsed progress bar, significance progress bar (fills to 95%), current lift result, "Apply Winner" / "View Details" buttons

---

## 8. Catalog — Offers + Products

### 8.1 Offers Tab
- **Grid:** 3-column cards
- **Card:** Type icon + emoji, offer name, type badge, value/cost/campaigns/CoPI/CVR metrics
- **"Create Offer" button:** Opens modal (not implemented in prototype — shows toast)

### 8.2 Products Tab
- **Grid:** Auto-fill (min 160px)
- **Cards:** Product emoji icon, name, price, availability badge
- **Feed Health:** Metrics strip showing last sync, error count, coverage

---

## 9. Measurement — Attribution Health

### 9.1 EMQ Dashboard
- **Layout:** 3-column grid
- **EMQ Gauge:** Large circular SVG gauge (1-10 scale) with color zones (red < 5, amber 5-7, green 8+). Current value displayed large (7.8). Trend text below.
- **Identifier Coverage:** Table of identifiers (Email, Phone, Rokt Click ID, IP, User Agent, Transaction ID) with Active/Missing badges and contribution scores
- **Improve EMQ:** Recommendation cards with action buttons ("View Integration Guide", "Configure SDK")

### 9.2 Measurement Groups Table
- **Columns:** Name, Linked Campaigns, Status (Live/Warning dot), Optimization Event, Attribution Window, EMQ score
- **EMQ color coding:** Green (8+), amber (5-7), red/wine (<5)

---

## 10. Account — Admin Hub

### 10.1 Layout
```
┌──────────────────────┬──────────────────────┐
│ Overview              │ Billing              │
│ - Account details     │ - Monthly spend      │
│                       │ - Credit limit bar   │
├──────────────────────┬──────────────────────┤
│ Team                  │ Integrations         │
│ - User table          │ - SDK/CAPI status    │
│ - Invite button       │ - CDP connections    │
└──────────────────────┴──────────────────────┘
```

---

## 11. Mock Data Schema

### Campaigns (6)
```javascript
{
  id: string,           // 'c1'-'c6'
  name: string,         // 'Disney+ Spring Acquisition'
  status: 'active'|'paused'|'draft',
  objective: 'CPA'|'ROAS',
  spend: number,        // current spend in dollars
  budget: number,       // total budget
  cpa: number,          // current CPA
  cpaTarget: number,    // target CPA
  copi: number,         // conversions per impression %
  roas: number,         // return on ad spend
  conversions: number,
  impressions: number,
  clicks: number,
  ctr: number,          // click-through rate %
  cvr: number,          // conversion rate %
  emq: number,          // event match quality 1-10
  biddingState: 'optimizing'|'learning'|'limited'|'draft',
  adSets: number,
  creatives: number,
  trend: number[],      // 8-point sparkline data
  trendDir: 'up'|'down',
  dailySpend: number[]  // 7-day spend array
}
```

### Audiences (12)
```javascript
{
  id: string,
  name: string,
  type: 'custom'|'lal'|'starter'|'demographic'|'behavioral'|'experian',
  size: string,         // '14.2M'
  campaigns: number,
  matchRate: string,    // '82%'
  fresh: boolean
}
```

### Creatives (8)
```javascript
{
  id: string,
  name: string,
  format: 'text'|'benefits'|'hero'|'savings'|'carousel',
  campaign: string,
  ctr: number,
  copi: number
}
```

### Offers (6)
```javascript
{
  id: string,
  name: string,
  type: 'discount'|'trial'|'cashback'|'shipping'|'product',
  value: string,
  cost: string,
  campaigns: number,
  copi: number,
  cvr: number
}
```

### Experiments (4)
```javascript
{
  id: string,
  name: string,
  type: 'ab'|'mab',
  campaign: string,
  status: 'running'|'concluded',
  split: string,        // '50/50'
  days: string,         // '12/21'
  significance: number, // 0-100
  lift: string          // '+18% CoPI'
}
```

### Products (6)
```javascript
{
  id: string,
  name: string,
  price: string,
  availability: 'in-stock'|'low-stock'|'out-of-stock',
  emoji: string
}
```

---

## 12. CSS Design Token Reference

### Colors (Dark Mode — Default)
| Token | Value | Usage |
|---|---|---|
| `--wine` | `#C43B52` | Primary accent, CTAs, active states |
| `--wine-light` | `#E04D66` | Hover states |
| `--wine-dark` | `#8B2635` | Original brand wine |
| `--brand-blue` | `#4D9AFF` | Focus, links, secondary accent |
| `--accent-cyan` | `#22D3EE` | Tertiary accent |
| `--surface-dark` | `#0B0F1A` | Main background |
| `--surface-white` | `#161D2E` | Card/panel backgrounds |
| `--surface-light` | `#111827` | Secondary surfaces |
| `--text-primary` | `#E8ECF4` | Body text |
| `--text-secondary` | `#8B95A8` | Labels, captions |
| `--text-tertiary` | `#5C6578` | Hints, disabled |
| `--positive` | `#34D399` | Success, growth |
| `--warning` | `#FBBF24` | Attention needed |
| `--negative` | `#F87171` | Errors, declining |
| `--glass-bg` | `rgba(22,29,46,0.7)` | Glassmorphism panels |
| `--glass-border` | `rgba(255,255,255,0.06)` | Subtle glass borders |

### Typography
- **UI Font:** Inter (300-700)
- **Data Font:** JetBrains Mono (400-600)
- **Scale:** 11px / 12px / 13px / 14px / 16px / 20px / 24px / 32px / 40px

### Animation Timings
| Duration | Value | Usage |
|---|---|---|
| `--duration-fast` | 100ms | Hover states, toggles |
| `--duration-normal` | 200ms | Page transitions, modals |
| `--duration-slow` | 300ms | Drawer slides, panel widths |
| `--duration-slower` | 400ms | Chart animations |

### Spacing Scale
4px / 8px / 12px / 16px / 20px / 24px / 32px / 40px / 48px / 64px

### Border Radius
4px (sm) / 6px (md) / 8px (lg) / 12px (xl) / 16px (2xl) / 9999px (pill)

---

## 13. Interaction Patterns

### Hover Effects
- **Cards:** `translateY(-2px)` to `-3px`, shadow increase, border color brightens
- **Buttons:** Primary buttons lift 1px with shadow. Ghost buttons get light bg fill.
- **Table rows:** Subtle `rgba(255,255,255,0.03)` background
- **Objective cards:** `translateY(-4px) scale(1.02)` with 30px wine glow

### Focus States
- **Inputs:** Wine border color + wine glow shadow (`0 0 0 3px rgba(196,59,82,0.25)`)
- **Keyboard navigation:** Visible focus outlines on all interactive elements

### Loading States
- **Skeleton:** Shimmer animation on placeholder content areas
- **Counters:** Animate from 0 to target over 800ms with ease-out cubic

### Responsive Breakpoints
| Breakpoint | Changes |
|---|---|
| ≤ 1400px | EMQ dashboard 2-col, Account grid 1-col |
| ≤ 1200px | Dashboard aside hidden, KPI 3-col, Creative library hidden, Builder creative 1-col, Objective grid 2-col |
| ≤ 600px | Sidebar hidden, KPI 2-col, Creative preview hidden, Campaign detail full-width, EMQ dashboard 1-col |
