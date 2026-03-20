# Rokt Ads: One Platform vs Prototype Feature Comparison

**Feature Mapping Report | March 20, 2026 | Prepared by Max Dowaliby**

---

## Purpose

This document maps every action, workflow, and feature available in the live Rokt One Platform (OP) against the Rokt Ads prototype. The goal is **NOT** 1:1 parity — the prototype reimagines workflows for better UX, efficiency, and forward-looking AI capabilities. This comparison ensures we preserve all critical functionality while identifying opportunities for innovation.

**Sources:**
- `rokt/op2-workspace` — Production Angular/React frontend codebase (~50+ libs, 150+ feature flags)
- `rokt/control-plane` — OpenAPI 3.1 API contracts (11 spec files, ~80 endpoints, ~60 schemas)
- `rokt/campaign-configuration-schemas` — Go schema library (8 core entities, 37 enums, 70+ fields per entity)
- `docs.rokt.com` — Public advertiser documentation
- Prototype codebase audit (`app.js`, `index.html`, `styles.css`)

---

## Section 1: Features in Both OP and Prototype

### 1.1 Campaign Management

| Feature | OP Implementation | Prototype | Notes |
|---------|------------------|-----------|-------|
| Campaign creation wizard | CCC (Compound Campaign Creator) — 4-step wizard + Ease Flow (5-step simplified) + DTC (accelerated self-serve) | Dual-mode builder: Autopilot (3-step AI-managed) + Advanced (5-step full control) | OP has 3 wizard variants; prototype has 2 modes inspired by PMax/Advantage+ |
| Campaign name | Required, max 200 chars | Free text with format hint | Same |
| Campaign objectives | 14 types: Email, Phone, Traffic, App, Calendar, CrossSell, AddToCart, Promotion, CustomerFeedback, IntegratedApplication, PaymentTrigger, BrandCampaign, ProductSales, ShoppableAd | 6 types: Acquisition, Revenue, App Install, DPA, Email, Embedded | **Prototype has fewer** — should map to OP types |
| Campaign status: Active | Active (via object status system) | Active | Same |
| Campaign status: Paused | Paused (via object status) | Paused with toggle animation | Enhanced UX |
| Campaign schedule | Start date + End date + "Run indefinitely" toggle + timezone | Start date + End date | OP has timezone + indefinite toggle |
| Budget | totalSpendCap, dailySpendCap, weeklySpendCap, monthlySpendCap + dailyReferralsCap + impression caps (daily/monthly/total) + purchaseOrderNumber | Daily, Monthly, Lifetime caps with projected spend bar | Prototype missing weekly + referral + impression caps |
| Referral/impression suppression | impressionSuppressionDays, transactionSuppressionDays, refusalSuppressionDays (17 options from NoSuppression to AllTime) | Referral Exclusion dropdown (1/7/14/30/90 days) | OP much more granular |
| Brand details | campaignBrandName (max 200), domains | Company name, Brand URL | Same concept |
| Terms & Conditions | Separate Term entity (TermCore) with type (LinkToWebsite/FreeformText), linkText variants, approval workflow | Toggle + textarea | OP is separate entity with approval |
| Privacy Policy | privacyPolicyUrl field | Toggle + textarea | Same concept |
| Measurement group | measurementGroupId dropdown, pre-populated | Dropdown with "Create New" option | Same |
| Country selection | countryId (required, determines currency) | ❌ Not yet implemented | **GAP** |
| Language selection | campaignLanguageCode (max 5 chars) | ❌ Not yet implemented | **GAP** |
| Timezone selection | timezoneId (required) | ❌ Not yet implemented | **GAP** |
| Campaign labels | campaignLabels array with toggle | ❌ Not yet implemented | **GAP** |
| Duplicate campaign | `POST /campaigns/{id}/duplicate` + UI "Clone Campaign" modal | Duplicate button with data mutation — creates "Copy of..." entry | Now functional (v3.0) |
| Archive campaign | Archive + restore to draft | Archive button with confirmation dialog | Now functional (v3.0) |
| Edit campaign | PATCH endpoint, draft/publish workflow | Edit button → opens builder | Different approach |

### 1.2 Ad Sets

| Feature | OP Implementation | Prototype | Notes |
|---------|------------------|-----------|-------|
| Ad Set as entity | First-class entity: create, update, enable, disable, archive, unarchive. Max 400 audiences per ad set. Flex budgets per ad set. Pricing per ad set. | Ad sets in campaign builder Step 3 with audience + targeting | OP is full CRUD entity; prototype is builder section |
| Ad set pricing | PricingOption with type (Fixed/Floating/CPA/CPS/CPImpression/ExposureControl), amount, CPA config, CPS config | Bid strategy cards (Smart/Budget Opt/Manual) | OP more granular pricing |
| Ad set budgets | FlexBudget with schedule, time ranges, day selection, referral + spend caps | Budget override per ad set | OP much more complex |
| Enable/disable ad set | Separate API endpoints | Not explicit (part of campaign status) | **GAP** |

### 1.3 Audience Management

| Feature | OP Implementation | Prototype | Notes |
|---------|------------------|-----------|-------|
| Create audience | 51-field AudienceCore with targeting config | Build Audience modal with rule builder — now persists to data and renders (v3.0) | OP much more complex but prototype now has real data mutation |
| Edit audience | PATCH endpoint with targeting update | Edit modal with rule builder | Same concept |
| Archive audience | Separate endpoint | Not implemented | **GAP** |
| AND/OR targeting logic | Feature-flagged AND/OR toggle | AND/OR toggle in rule builder | Same |
| Age targeting | TargetAge with min/max (0-100) + invertAges + unknownAge | Age Min/Max in ad set targeting | Same concept |
| Gender targeting | TargetGender enum (Male/Female/Both) + unknownGender | Gender dropdown in ad set targeting | Same |
| Device targeting | TargetPlatform (desktop/mobile/tablet bools) | Device checkboxes (Desktop/Mobile/Tablet) | Same |
| Geographic targeting | Geolocation with type (Global/Country/States/Postcode/Area/Radius/Locality), locality targeting lists, postcode CSV, radius with distance units | Country, State/Region, City, ZIP codes | OP much more granular |
| OS targeting | TargetOperatingSystem (android/ios/other) | ❌ Not implemented | **GAP** |
| Device manufacturer | TargetDeviceManufacturer (apple/htc/lg/nokia/samsung/other) | ❌ Not implemented | **GAP** |
| Industry verticals | industries array (int32 IDs) | ❌ Not implemented | **GAP** — core Rokt dimension |
| Placement targeting | TargetPlacement (coreg/engagement/pretickCoreg/survey) | Inventory Targeting: 8 partners, Overlay/Embedded/Post-Transaction placement types, position targeting, frequency caps (v3.0) | Different taxonomy but concept now covered |
| Interaction targeting | TargetInteraction (10 bool fields: purchase, registration, etc.) | ❌ Not implemented | **GAP** |
| Attribute targeting | TargetAttributeTargeting with 24 condition types (Equals/Contains/StartsWith/Regex/NumberGreaterThan/DateLessThan/etc.) | Categories in rule builder | OP much more powerful |
| Custom audience rules | CustomAudienceRule with types (Email/Retargeting/Lookalike) | Suppress existing customers toggle | OP more complex |
| Lookalike audiences | Account-level list + create from seedlist (async) | Create LAL modal with 3 tiers | Similar concept |
| Upload audience list | 4-step workflow: Upload CSV → Validate → Process → Poll Status. Types: email, postcode, dynamic | Drag-and-drop CSV upload | OP has validation pipeline |
| Experian targeting | Feature-flagged | Not implemented | **GAP** |
| Payment page targeting | Feature-flagged | Not implemented | **GAP** |
| Day/time targeting | dayTimeTargeting map | ❌ Not implemented | **GAP** |
| Audience strategy | NewCustomers/HighIntentVisitors/Custom enum | Not implemented | **GAP** |

### 1.4 Creative Management

| Feature | OP Implementation | Prototype | Notes |
|---------|------------------|-----------|-------|
| Create creative | 42-field CreativeCore, 9-step wizard | New Creative modal + Creative Studio editor | OP has many more fields |
| Edit creative | PATCH endpoint with content update | 3-panel studio: Library, Editor, Preview | Prototype has better UX |
| Creative types | 7 types: standard, catalog, app_install, email_traffic, sms, benefits, compact | 5 formats: Text, Benefits, Savings, Hero Image, Carousel | Different categorization |
| Creative formats (rendering) | 15 formats via bitmask: Standard, Block, Tile, CtaOnly, StandardCatalog, InsuranceCatalog, WarrantyCatalog, CatalogItemOnly, Benefits, Savings, Compact, Discount, Button, HeroImage, ShoppableAdStandard | Format tabs in editor | OP has many more |
| Title field | title string (no explicit max in schema) | Max 40 chars with live counter | Prototype adds counter |
| Body copy | text string | Textarea with live preview | Same |
| Positive CTA | responses[] with responseType=Positive, responseText, multiple actions per response | Single CTA input, max 25 chars | OP supports multiple responses with multiple actions |
| Negative CTA | responses[] with responseType=Negative | Disabled, shows "No thanks" | Same concept |
| Response actions | 10 action types: CustomerReferral, SalesReferral, TrafficReferral, SendEmail, PlayVideo, SendSms, EmailTraffic, AppDownload, Calendar | Click-through only | OP much more complex |
| Image upload | Upload via API, DAM integration (Digital Asset Manager with crop tool), DamImage references | Simulated upload zone | OP has full DAM |
| Image roles | logo, hero, background, button_icon | Not differentiated | **GAP** |
| Dynamic placeholders | Insert Attribute in body | Dynamic attribute chips | Same concept |
| Callout tags | callouts[] with icon, text, type | Promotion/Social Proof/Guarantee pills | Same concept |
| Benefits format | CreativeBenefits with 3 description/icon pairs | Benefits tab in format selector | Same |
| Discount/promotion | CreativeDiscount with promotionType (Monetary/Percent), amount, label, currency | Part of offer section | Different location |
| Disclaimer | disclaimer string field | Disclaimer textarea | Same |
| Creative approval | approvalTaskId, approval workflow through Rokt ops | Approval banner on launch | Simplified |
| Live preview | Mobile preview with custom IDs | Desktop/Mobile toggle with real-time preview | Both have it |
| Archive creative | Archive/unarchive endpoints | Not implemented | **GAP** |
| Batch create | `POST /creatives/batch` for bulk create+link | Not implemented | **GAP** |
| Link to audience | Separate link/unlink endpoints, incompatibility check | Via ad sets | Different approach |
| Link to ad set | Separate link endpoint | Via builder | Different approach |
| Learn More | LearnMore with title (max 200) + link (max 2000) | Not implemented | **GAP** |
| Refer a Friend | ReferFriend with label + placeholder | Not implemented | **GAP** |
| Remind Me Later | RemindMeLater toggle | Not implemented | **GAP** |
| State-specific copy | Per-state response text variations | Not implemented | **GAP** |
| Scheduling | durationStartDateTz / durationEndDateTz | Not implemented at creative level | **GAP** |

### 1.5 Offers

| Feature | OP Implementation | Prototype | Notes |
|---------|------------------|-----------|-------|
| Create offer | 14-field OfferCore, 15 offer types | Create Offer modal with 5 types | OP has more types |
| Offer types | free_trial, percentage_off, up_to_percentage_off, fixed_amount_off, up_to_fixed_amount_off, cash_reward, introductory_price, introductory_term, free_item, bogo, sweepstakes, loyalty_points, gift_with_purchase, no_offer | Discount, Trial, Cashback, Free Shipping, Bundle | Prototype simplified |
| Offer fields | name, description, cost, amount, content, unit, currency, AOV, customerSavingsValue, customerSavingsValuePercentage | Type, value, cost, landing page URL, coupon code, validity | Different field sets |
| Copy offer | `POST /offers/{id}/copy` — cross-campaign, cross-region | Not implemented | **GAP** |
| Edit offer | PATCH (name-only update) | Edit Offer modal | Prototype allows more editing |
| Delete offer | DELETE (must unlink first) | Archive button | Different approach |

### 1.6 Terms (Legal)

| Feature | OP Implementation | Prototype | Notes |
|---------|------------------|-----------|-------|
| Terms as entities | Separate TermCore entity with CRUD, type (LinkToWebsite/FreeformText), link text variants (T&C/TermsApply/RatesAndFees/OfferDetails), approval workflow | Inline toggles + textareas in campaign builder | OP treats terms as reusable entities |

### 1.7 Bid Strategy

| Feature | OP Implementation | Prototype | Notes |
|---------|------------------|-----------|-------|
| Manual/Fixed bidding | PricingOption type=Fixed with amount | Manual Bidding card with price input | Same |
| Budget Optimization | PricingOption type=Floating (auto-adjusts) | Budget Optimization card | Same |
| Smart Bidding / CPA | Outcome Optimiser with 5 strategies: ScaleAtCPATarget, MaximiseConversionsWithinBudget, BalanceScaleAndEfficiency, ScaleAtROASTarget, LearningPhase | Smart Bidding card with CPA target | OP has 5 strategies vs prototype's 1 |
| CPS (Cost Per Sale) | CostPerSalePrice with amountDirect, percentageDirect, conversionWindow | ❌ Not implemented | **GAP** |
| CPImpression | PricingOption type=CPImpression | ❌ Not implemented | **GAP** |
| Exposure Control | PricingOption type=ExposureControl | ❌ Not implemented | **GAP** |
| CPA config | directAmount, bidPriceExposure, chargeAllTime, chargeType, conversionWindow, targetGroupCPAId | Simple CPA target input | OP much more complex |
| Smart Bid config | conversionType, conversionWindow, cpaTarget, fixedConversionValue, goal, maxBid, minBid, profitMargin | Not exposed | **GAP** |
| Per-audience CPA | CustomTargetAudience with audienceId + cpaTarget + isEnabled | Not implemented | **GAP** |
| Auto pacing | enableAutoPacing toggle | Not implemented | **GAP** |

### 1.8 Experiments

| Feature | OP Implementation | Prototype | Notes |
|---------|------------------|-----------|-------|
| Creative experiments | Full wizard with variants, bucket preview, metrics chart, publish | A/B Test + MAB experiment creation modal with data mutation (v3.0) | OP more mature; prototype now persists |
| Page experiments | Separate experiment type for page/layout testing | ❌ Not in prototype | **GAP** — partner-side feature |
| Experiment statuses | Draft, Active, Disapproved, Inactive, Scheduled, In Review, Paused, Archived, Deleted | Draft, Running, Concluded | Prototype simplified |
| ACE agent | AI-powered experiment agent (feature-flagged) | Not implemented | **GAP** |
| Experiment readouts | Summary, segmentation, legacy grid views | Significance bar + leader | OP more detailed |
| Configure bucket weights | Feature-flagged live weight adjustment | Not implemented | **GAP** |
| Export results | CSV export modal | Not implemented | **GAP** |
| Counterfactual experiments | Rokt Impact Measurement (feature-flagged) | Not implemented | **GAP** |

### 1.9 Measurement & Conversions

| Feature | OP Implementation | Prototype | Notes |
|---------|------------------|-----------|-------|
| Measurement groups | Full CRUD with conversionRules[], attribution config, incrementality, control groups | Create + edit modals | OP much more complex |
| Conversion rules | Multiple rules per group with eventType, windowType (Days/Cohort), referral + impression windows (1-90 days), conversionEventUrls, conversionEventSKUs, fallbackConversionAmount | Single optimization event + attribution window | OP much more granular |
| Attribution events | Referral, Impression, ReferralAndImpression | Click-through + view-through | Same concept |
| Incrementality | Toggle with control/treatment group weights, refresh period | "Enable Incrementality" checkbox | OP more detailed |
| Integration health | Full health page with gauge score, D3 charts, breakdown, customer data indicators | EMQ gauge + identifier coverage table | OP has dedicated health page |
| Integration pulse check | Feature-flagged React page | ❌ Not implemented | **GAP** |

### 1.10 Reporting

| Feature | OP Implementation | Prototype | Notes |
|---------|------------------|-----------|-------|
| Campaign reporting | Reporting dashboard with templates (5 types), headline metrics, charts, drag-and-drop editor | Intelligence view with 3-line chart (Spend/Conversions/CPA), working filters, Group By breakdowns, compare toggle (v3.0) | Prototype significantly enhanced |
| Metrics | 200+ campaign metric keys including base+parameterized variants | ~15 metrics in table | OP massively more |
| Dimensions | 56 dimension keys (demographic, geographic, device, campaign, creative, placement, etc.) | Group By dropdown: Campaign/Ad Set/Creative/Device/Geography/Day of Week (v3.0) | OP still more granular but prototype now has working breakdowns |
| Date ranges | Global date range selector | Today, 7D, 30D, MTD, Custom — now functional with data filtering (v3.0) | Same concept, now working |
| Period comparison | Period-over-period comparison in reports | Compare toggle for period-over-period with dashed overlay lines (v3.0) | New in prototype |
| Export | Async CSV export via API with status polling + download URL | Export modal (CSV/PDF/Excel) | OP is async pipeline |
| Scheduled reports | 3-step wizard: Setup (name, type, format) → Build (columns, filters) → Schedule & Delivery (frequency, recipients) | Recurring export checkbox | OP is full workflow |
| Real-time dashboard | Feature-flagged ClickHouse-backed | ❌ Not implemented | **GAP** |
| Ecommerce dashboard | Feature-flagged React page | ❌ Not implemented | **GAP** |
| Account summary | Campaigns + accounts views | Dashboard KPIs | Same concept |

### 1.11 Account Management

| Feature | OP Implementation | Prototype | Notes |
|---------|------------------|-----------|-------|
| Advertiser account selection | Account picker in nav, per-account context | Full-page advertiser picker gate on load with favorites, recents, search (v3.0) | Prototype has richer picker UX |
| Account switching | Account dropdown in header | Topbar account switcher dropdown with quick-switch, favorites stars (v3.0) + sidebar "Switch Advertiser" button | Enhanced UX |
| Per-account data scoping | All views scoped to selected account | Per-advertiser data scoping across all views (v3.0) | Same concept |
| Portfolio/multi-account view | Account summary dashboard | Portfolio Dashboard for multi-advertiser internal overview (v3.0) | Prototype adds cross-account view |
| User roles | Editor, Reporter (OP) + Admin/Staff roles | Admin, Editor, Viewer | Different taxonomy |
| User management | Per-account access page + global user management (staff) | Invite User modal | Simplified |
| Company settings | Account details, commercial terms (acquire + commerce), data governance, tags, approved partner domains, mParticle provisioning, account teams | Account overview card | OP much more complex |
| Billing | Legacy + V2 (feature-flagged) with marketing orders | Current month spend + credit limit | Simplified |
| Activity history | Dedicated page | Recent Activity on dashboard | Same concept |
| Account alerts | Staff-only alerts page | Context alerts on views | Different approach |
| Integrations | Full integrations page + event API config + tag editor | 6 integrations with status | Prototype is subset |

---

## Section 2: OP-Only Features (Not in Prototype)

### 2.1 Entire Missing Modules

| Module | OP Details | Priority |
|--------|-----------|----------|
| **Nurture Journeys** | Full CRUD: create journey → add steps (email/SMS) → link audiences → publish. Steps have schedule (anchor event, offset, send time). 12 API endpoints. | 🟡 Medium |
| **Digital Asset Manager (DAM)** | Full image management: search, upload (JPEG/PNG, max 10MB), crop tool with canvas, format targeting, image type selector, inventory browser | 🟡 Medium |
| **Coupon Management** | Coupon lists + multi-use static coupons. Types: LegacyStatic, LegacyUnique, Static, Unique. Linked to creatives. | 🟡 Medium |
| **Transaction Pages/Layouts** | Pages CRUD + Layout editor (templates, custom, AI-assisted) + Themes + Custom Fonts + Controls + QA Config | 🟢 Low (partner-side) |
| **Customer Data (RDP)** | Custom fields for referral/transaction/unsubscribe + FTP wizards + connections | 🟢 Low |
| **Selector Ineligibility Dashboard** | Beta partner analytics for ineligibility | 🟢 Low |
| **Calendars** | Calendar subscription management | 🟢 Low |

### 2.2 Campaign Features Missing

| Feature | Details | Priority |
|---------|---------|----------|
| **14 campaign objectives** | Email, Phone, Traffic, App, Calendar, CrossSell, AddToCart, Promotion, CustomerFeedback, IntegratedApplication, PaymentTrigger, BrandCampaign, ProductSales, ShoppableAd | 🔴 High — prototype has only 6 |
| **Draft/Publish workflow** | Entities created as drafts, published via campaign-level publish with entity selection and partial failure support | 🔴 High — fundamental OP workflow |
| **Campaign status: Requires Action** | Sub-states: Hit Limit, Inactive, Disapproved, No Live Entities, Ended, Suspended, Limit Reached | 🔴 High |
| **Campaign status: Archived** | Archive + restore to draft | 🟡 Medium |
| **Campaign status: Pending Review** | Approval workflow via Rokt ops | 🟡 Medium |
| **Country/Language/Timezone** | Required locked fields determining currency and scheduling | 🔴 High |
| **Campaign type** | SelfService, Managed, Demo, Internal, Market | 🟡 Medium |
| **Price types** | CPR, CPA, CPT, CPS%, CPQ, SaaS Fee, CPM, eCPM | 🟡 Medium |
| **Campaign labels** | Tagging system | 🟢 Low |
| **Share of Voice %** | Traffic allocation | 🟡 Medium |
| **Campaign rank** | Priority ordering | 🟢 Low |
| **Auto pacing** | enableAutoPacing toggle | 🟡 Medium |
| **App store URLs** | iOS + Google Play URLs for app campaigns | 🟡 Medium |
| **Payment attributes** | Payment types (PayPal/ApplePay/Affirm/Klarna/etc.), networks (AMEX/Visa/etc.), issuers (BofA/Citi/etc.) | 🟢 Low |
| **Impression suppression** | 17 granular options | 🟡 Medium |
| **Referral caps** | Daily referral limits + daily/monthly/total impression caps | 🟡 Medium |
| **Flex budgets** | Time-based budgets with schedule, day selection, time ranges | 🟡 Medium |

### 2.3 Audience Features Missing

| Feature | Details | Priority |
|---------|---------|----------|
| **Industry verticals** | industries[] — core Rokt targeting dimension | 🔴 High |
| **Placement targeting** | coreg/engagement/pretickCoreg/survey — fundamental to Rokt model | 🟡 Medium — prototype now has Inventory Targeting with placement types (Overlay/Embedded/Post-Transaction) but different taxonomy |
| **Interaction targeting** | 10 types: purchase, registration, enquiry, etc. | 🟡 Medium |
| **OS targeting** | android/ios/other | 🟢 Low |
| **Device manufacturer** | apple/htc/lg/nokia/samsung/other | 🟢 Low |
| **Day/time targeting** | Map of day → time slots | 🟡 Medium |
| **Domain targeting** | Include/exclude domains | 🟡 Medium |
| **Email domain targeting** | emaildomains string | 🟢 Low |
| **Postcode targeting** | CSV upload, radius with distance units (miles/km) | 🟡 Medium |
| **24 condition types** | Equals/Contains/StartsWith/Regex/NumberGreaterThan/DateLessThan/etc. | 🟡 Medium |
| **Audience strategy** | NewCustomers/HighIntentVisitors/Custom | 🟡 Medium |
| **Cart category targeting** | CartCategoryTargetingRule | 🟢 Low |
| **Experian targeting** | Feature-flagged third-party data | 🟢 Low |
| **Payment page targeting** | Feature-flagged | 🟢 Low |

### 2.4 Creative Features Missing

| Feature | Details | Priority |
|---------|---------|----------|
| **15 creative formats** | Standard, Block, Tile, CtaOnly, Catalog variants (5), Benefits, Savings, Compact, Discount, Button, HeroImage, ShoppableAdStandard | 🟡 Medium |
| **Multiple response actions** | 10 action types per response | 🟡 Medium |
| **Application form** | Embedded forms with iFrame/NewWindow open method | 🟢 Low |
| **Customer feedback** | Medallia + ShopperApproved + TrustPilot integrations | 🟢 Low |
| **Learn More** | Title + link (max 2000 chars) | 🟡 Medium |
| **Refer a Friend** | Label + placeholder | 🟢 Low |
| **State-specific copy** | Per-state response text variations | 🟢 Low |
| **Creative scheduling** | Start/end dates at creative level | 🟡 Medium |
| **Secondary CTA** | Feature-flagged | 🟡 Medium |
| **Creative score** | Feature-flagged quality score | 🟡 Medium |
| **DAM integration** | Feature-flagged image manager | 🟡 Medium |
| **Batch create+link** | Bulk API for multiple creatives | 🟢 Low |

### 2.5 Bidding Features Missing

| Feature | Details | Priority |
|---------|---------|----------|
| **5 Smart Bidding strategies** | ScaleAtCPA, MaximizeConversions, BalanceScaleAndEfficiency, ScaleAtROAS, LearningPhase | 🔴 High |
| **CPS pricing** | Cost per sale with percentage/direct amount, conversion window | 🟡 Medium |
| **CPImpression** | Cost per impression pricing | 🟡 Medium |
| **Exposure Control** | Holdback/control group pricing | 🟢 Low |
| **Per-audience CPA targets** | Individual CPA per audience within campaign optimization | 🟡 Medium |
| **Smart Bid config** | Min/max bid, profit margin, conversion type (Acquisition/Transaction/CPIA/IROAS/ROAS) | 🟡 Medium |
| **Flex budget pricing** | Time-based pricing schedules | 🟡 Medium |

### 2.6 Experiment Features Missing

| Feature | Details | Priority |
|---------|---------|----------|
| **Page experiments** | Separate experiment type for layout/page testing | 🟢 Low (partner-side) |
| **ACE agent** | AI experiment agent (feature-flagged) | 🟡 Medium |
| **Counterfactual/incrementality** | Rokt Impact Measurement | 🟡 Medium |
| **Configure live bucket weights** | Feature-flagged | 🟢 Low |
| **Experiment readout views** | Summary, segmentation, legacy grid | 🟡 Medium |
| **Full status lifecycle** | 10 statuses vs prototype's 3 | 🟡 Medium |

### 2.7 Reporting Features Missing

| Feature | Details | Priority |
|---------|---------|----------|
| **200+ metrics** | Including parameterized attribution window variants | 🟡 Medium |
| **56 dimensions** | Including DMA, ZCTA, income range, credit range, density, line of business | 🟡 Medium |
| **Scheduled reports wizard** | 3-step: Setup → Build → Schedule & Delivery | 🟡 Medium |
| **Real-time dashboard** | ClickHouse-backed live reporting | 🟡 Medium |
| **Ecommerce dashboard** | Dedicated ecommerce analytics | 🟢 Low |
| **Reporting templates** | 5 pre-built template types | 🟡 Medium |
| **Async CSV export** | Status polling + signed download URL | 🟢 Low |

### 2.8 Account Features Missing

| Feature | Details | Priority |
|---------|---------|----------|
| **Commercial terms** | Acquire + Commerce terms configuration | 🟢 Low |
| **Data governance** | Custom data retention settings | 🟢 Low |
| **Relevancy controls** | Smart interactions settings | 🟢 Low |
| **Approved partner domains** | Domain allowlisting | 🟢 Low |
| **Account teams** | Team-level access management | 🟢 Low |
| **mParticle provisioning** | CDP setup | 🟢 Low |
| **Activity history** | Dedicated audit trail page | 🟡 Medium |
| **Account creation wizard** | 2-step: Company details → Billing | 🟢 Low |
| **Billing V2** | Marketing orders, enhanced billing | 🟢 Low |
| **Onboarding/signup flow** | With ecommerce path | 🟢 Low |

### 2.9 AI Features in OP

| Feature | Details | Priority |
|---------|---------|----------|
| **Creative AI chat** | Dedicated `/creative-ai` route with chat interface, history, action cards | 🟡 Medium — prototype has AI Copilot |
| **AI content generation** | Feature-flagged within creative wizard | 🟡 Medium — prototype has AI Generate |
| **AI layout edit** | Feature-flagged for transaction layouts | 🟢 Low (partner-side) |
| **Recommendations** | Dedicated route with "Ask a Question" chat (feature-flagged) | 🟡 Medium — prototype has AI Recommendations |
| **Rokt Mate** | Staff-only AI assistant | 🟢 Low (staff-only) |

---

## Section 3: Prototype-Only Features (Not in OP)

These features exist in the prototype but **NOT** in the current live One Platform.

### 3.1 AI-Native Workflow Features

| Feature | Description | Value |
|---------|-------------|-------|
| **AI Campaign Generation from NLP** | Natural language prompt generates full 5-step campaign configuration | 🔥 Very High |
| **AI Copilot with contextual routing** | Routes responses based on message content (campaigns/pause/creative/budget) with actionable buttons | 🔥 Very High |
| **AI Natural Language Actions** | "Pause all campaigns over $10 CPA" with preview + confirm | 🔥 Very High |
| **AI Performance Prediction** | Predicted scores (1-10) on generated creative variations | ⭐ High |
| **AI Portfolio Summary** | "How are campaigns doing?" → formatted analysis card | ⭐ High |
| **Optimization Score gauge** | 0-100 account health score with SVG arc and recommendations | ⭐ High |
| **AI Recommendations feed** | Prioritized cards with estimated impact and Apply/Dismiss buttons | ⭐ High |

*Note: OP has Creative AI chat and Recommendations, but prototype's implementation is more tightly integrated into workflows with actionable inline buttons.*

### 3.2 Advertiser Account Model (v3.0)

| Feature | Description | Value |
|---------|-------------|-------|
| Full-page advertiser picker gate | Favorites, recents, all advertisers with search on app load | ⭐ High |
| Per-advertiser data scoping | All views filtered to selected advertiser context | ⭐ High |
| Portfolio Dashboard | Multi-advertiser internal overview with cross-account KPIs | ⭐ High |
| Topbar account switcher | Quick-switch dropdown with favorites stars | ⭐ High |
| Sidebar "Switch Advertiser" | Always-visible button to return to picker | 🟡 Medium |

### 3.3 Dual-Mode Campaign Builder (v3.0)

| Feature | Description | Value |
|---------|-------------|-------|
| Autopilot mode (3 steps) | Goal → Assets → Launch — AI handles targeting/bidding/optimization | 🔥 Very High |
| Advanced mode (5 steps) | Full control builder for power users | ⭐ High |
| Mode selector cards | Visual choice between Autopilot and Advanced at Step 1 | ⭐ High |
| Asset Group step | Consolidated creative + audience signals in one step (Autopilot) | 🔥 Very High |
| Audience signals (hints) | Interest keywords and demographic hints — AI expands autonomously | 🔥 Very High |
| Ad Strength gauge | Poor/Average/Good/Excellent creative quality indicator (both modes) | ⭐ High |
| AI Managed card | Visual indicator of what AI controls in Autopilot | 🟡 Medium |

### 3.4 Inventory Targeting (v3.0)

| Feature | Description | Value |
|---------|-------------|-------|
| 8 mock partners | Ticketmaster, Fanatics, Booking.com, StubHub, Grubhub, Shutterfly, Chewy, LiveNation | ⭐ High |
| Placement type cards | Overlay, Embedded, Post-Transaction selection | ⭐ High |
| Partner search + select all | Searchable partner list with bulk selection | 🟡 Medium |
| Position targeting | Any / 1st / 1st or 2nd position preference | 🟡 Medium |
| Frequency caps | Per user per day + per user lifetime limits | ⭐ High |

### 3.5 Enhanced Builder UX

| Feature | Description | Value |
|---------|-------------|-------|
| AI hero in Step 1 | Cycling placeholder prompts, glowing border, "Generate Campaign" | ⭐ High |
| Objective auto-advance | Click card → 400ms pulse → auto-advance | 🟡 Medium |
| Per-ad-set inline targeting | Geography + device + demographics + suppression in expandable panel | ⭐ High |
| Budget projected spend bar | Visual indicator of projected spend | 🟡 Medium |
| Live creative preview | Phone frame with real-time updates as user types | ⭐ High |
| Validation checklist | Dynamic 6-point check before launch | 🟡 Medium |
| Confetti celebration | 60-particle launch animation | 🟢 Low |

### 3.6 Visual Design & Interactions

| Feature | Description | Value |
|---------|-------------|-------|
| Mouse-tracking card glow | Radial gradient follows cursor | 🟡 Medium |
| Animated gradient mesh background | Dashboard backdrop | 🟢 Low |
| Staggered card animations | 60ms cascade entrance with scale+translateY+opacity | 🟡 Medium |
| Row action buttons | Slide-in Pause/Edit/Duplicate on hover | ⭐ High |
| Campaign detail panel | Slide-in right panel with 4 tabs | ⭐ High |
| SVG sparkline charts | Inline trend visualization | 🟡 Medium |
| Spend pacing chart | SVG line chart with filters | 🟡 Medium |
| Campaign health grid | Card-based dashboard overview | 🟡 Medium |
| Progress bar shimmer | Animated shine effect | 🟢 Low |
| Rokt connector data points | Connector logo shapes as chart data points on all charts (v3.0) | 🟡 Medium |
| Entity-specific card designs | Type strips, thumbnails, status-driven progress per entity type (v3.0) | 🟡 Medium |
| Empty state CSS patterns | Dot grids and geometric shapes with CTA prompts for empty views (v3.0) | 🟡 Medium |
| Typography hierarchy | Systematic type scale: display, heading, body, caption, mono (v3.0) | 🟡 Medium |
| Warm light mode surfaces | Cream/warm-tinted whites instead of cold pure white (v3.0) | ⭐ High |
| 9 overlay opacity tokens | CSS custom properties that auto-flip between dark/light (v3.0) | 🟡 Medium |
| Sidebar grouped sections | Workspace/Build/Analyze/Settings with beetroot accent bar (v3.0) | ⭐ High |
| Sidebar badge counts | Attention indicators on nav items needing action (v3.0) | 🟡 Medium |

### 3.7 Navigation & Productivity

| Feature | Description | Value |
|---------|-------------|-------|
| Command Palette (Cmd+K) | Fuzzy search across all entity types with grouped results (v3.0 enhanced) | ⭐ High |
| 12 keyboard shortcuts | G+D, G+C, N+C, J/K navigation, ?, / | ⭐ High |
| Key chord visual indicator | Floating label showing available completions for key sequences (v3.0 enhanced) | 🟡 Medium |
| Dark/Light theme toggle | Full CSS custom property theming with warm light mode (v3.0 enhanced) | 🟡 Medium |
| Notification navigation | Clicking notifications navigates to relevant view and entity (v3.0) | ⭐ High |
| Notification center | Categorized unread notifications | 🟡 Medium |
| Context alerts | View-specific actionable bars | 🟡 Medium |
| Status bar | Live metrics footer | 🟢 Low |
| Confirmation dialogs | Required confirmation for destructive actions (archive, delete) (v3.0) | ⭐ High |
| Toast action cleanup | Duplicate/Archive/Fix Now toasts now trigger real workflows (v3.0) | 🟡 Medium |

### 3.8 Intelligence Enhancements

| Feature | Description | Value |
|---------|-------------|-------|
| 3-line performance chart | Spend, Conversions, CPA displayed simultaneously (v3.0) | ⭐ High |
| Working date range filtering | Date pills now actually filter chart and table data (v3.0) | ⭐ High |
| Compare toggle | Period-over-period comparison with dashed overlay lines (v3.0) | ⭐ High |
| Group By breakdowns | Dimension grouping: Campaign/Ad Set/Creative/Device/Geography/Day (v3.0) | ⭐ High |
| Working filter dropdowns | Campaign, Status, Objective filters functional (v3.0) | ⭐ High |
| Rokt connector chart markers | Brand-shaped data points on all charts (v3.0) | 🟡 Medium |
| Insight strip | 4 contextual insight cards above reports | 🟡 Medium |
| Attribution window presets | Default, Social ROAS, Search ROAS, Click-only quick toggle | 🟡 Medium |
| Add Metric modal | 8 advanced metrics (AOV, CPiA, Incremental Lift, etc.) | 🟡 Medium |
| Multi-Armed Bandit experiments | MAB type alongside A/B | ⭐ High |

### 3.9 Entity CRUD Completeness (v3.0)

| Feature | Description | Value |
|---------|-------------|-------|
| Create audiences with persistence | Build Audience modal now mutates data array and renders | ⭐ High |
| Create offers with persistence | Create Offer modal adds to catalog data | ⭐ High |
| Create experiments with persistence | New Experiment modal with type/campaign/variants | ⭐ High |
| Duplicate campaigns | Creates "Copy of..." entry with data mutation | ⭐ High |
| Archive campaigns | Removes with confirmation dialog | ⭐ High |
| Creative live preview updates | Typing in editor immediately reflected in preview (v3.0) | ⭐ High |
| Creative format switching | Format change updates editor fields and preview (v3.0) | 🟡 Medium |

### 3.10 Catalog & Product Management

| Feature | Description | Value |
|---------|-------------|-------|
| Product catalog | Product cards with stock status | 🟡 Medium |
| Product set creation | Manual/Rule-Based/AI Recommended selection | 🟡 Medium |

---

## Section 4: Gap Analysis & Recommendations

### 🔴 Critical Gaps (Must Address)

1. **Draft/Publish workflow** — OP's fundamental pattern where all entities are created as drafts and published through the campaign. Prototype creates entities directly. Consider adding a "publish" step.
2. **14 campaign objectives** — Prototype has 6, OP has 14. Map prototype objectives to OP enums.
3. **Country/Language/Timezone** — Required locked fields. Add to builder Step 2.
4. **Industry vertical targeting** — Core Rokt dimension. Add to audience targeting.
5. ~~**Placement type targeting**~~ — **Partially addressed in v3.0:** Inventory Targeting now includes Overlay/Embedded/Post-Transaction placement types, 8 partner selections, position targeting, and frequency caps. Taxonomy differs from OP's coreg/engagement model but concept is covered.
6. **5 Smart Bidding strategies** — Prototype only shows generic "Smart Bidding." Add strategy selector: Scale at CPA, Maximize Conversions, Balance, Scale at ROAS, Learning Phase.
7. **Full status lifecycle** — Add: Requires Action (with sub-states), Pending Review, Archived (partially addressed — archive now works in v3.0), Ended, Suspended, Limit Reached.

### 🟡 Important Gaps

8. **Nurture Journeys** — Entire email/SMS follow-up workflow missing.
9. **Coupon Management** — Important for offer-based campaigns.
10. **Digital Asset Manager** — Image management with cropping.
11. **Complex pricing types** — CPS, CPImpression, multiple price types.
12. **Advanced targeting** — 24 condition types, domain targeting, day/time targeting, interaction targeting.
13. **Scheduled reports** — Full 3-step wizard vs checkbox.
14. **Terms as entities** — Reusable terms with approval workflow.
15. **Flex budgets** — Time-based budget scheduling.

### 🟢 Low Priority / Not Applicable

16. Transaction pages/layouts (partner-side)
17. Customer data/RDP (backend integration)
18. Calendar subscriptions (niche)
19. Payment attributes (niche)
20. Staff-only tools (admin, finance, Rokt Mate)

---

## Section 5: Summary

| Category | Count |
|----------|-------|
| Features in both platforms | 75+ (up from 65+ — advertiser model, inventory targeting, CRUD ops, reporting filters now overlap) |
| OP-only features (total) | 75+ (down from 80+ — placement targeting and archive partially addressed) |
| OP-only — critical gaps | 5-6 (down from 7 — placement targeting partially covered, archive added) |
| OP-only — important gaps | 8 |
| OP-only — low priority/N/A | 60+ |
| Prototype-only features | 65+ (up from 38+ — advertiser model, dual-mode builder, inventory targeting, visual polish, CRUD completeness) |

### Key Takeaway

The v3.0 prototype now goes well beyond a UX demo. It includes a full advertiser account model (picker gate, per-advertiser scoping, portfolio view, account switcher), a dual-mode campaign builder inspired by Google PMax and Meta Advantage+ (Autopilot for speed, Advanced for control), inventory targeting with partner/placement/position/frequency controls, fully functional entity CRUD (create/edit/duplicate/archive with data mutation), a significantly upgraded intelligence view (3-line charts, working filters, compare toggle, group-by breakdowns), and comprehensive visual polish (warm light mode, Rokt connector data points, entity-specific cards, systematic typography, animation fixes).

The **remaining critical gaps** are Rokt-specific platform concepts (draft/publish workflow, industry verticals, full status lifecycle) and real-platform fields (country/language/timezone, 14 objectives, 5 bidding strategies). Placement targeting is now partially addressed through the Inventory Targeting feature, though the taxonomy differs from OP's coreg/engagement model.

The **vast majority** of OP-only features are either partner-side (transactions/layouts), staff-only (admin/finance), or backend integrations (APIs, CDPs) that are out of scope for an advertiser UX prototype.

The prototype-only feature count has grown from 38+ to 65+, reflecting the addition of the advertiser account model (5 features), dual-mode builder (7 features), inventory targeting (5 features), entity CRUD completeness (7 features), intelligence enhancements (6 features), visual polish (8 features), and navigation improvements (3 features) — none of which exist in the current OP.

---

*Sources: `rokt/op2-workspace` (Angular/React frontend), `rokt/control-plane` (OpenAPI 3.1 contracts), `rokt/campaign-configuration-schemas` (Go entity schemas), `docs.rokt.com` (public docs), prototype codebase. Updated March 20, 2026 to reflect v3.0 features.*
