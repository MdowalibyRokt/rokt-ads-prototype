/* ============================================================
   ROKT ADS — Next-Generation Media Buying Platform
   Application Logic: Router, Data, Interactions, Modals
   Premium agency-quality interactivity
   ============================================================ */

const RoktAds = (() => {
  'use strict';

  // ── Mock Data ──────────────────────────────────────────────
  const campaigns = [
    {
      id: 'c1', name: 'Disney+ Spring Acquisition', status: 'active', objective: 'CPA',
      spend: 42150, budget: 75000, cpa: 5.82, cpaTarget: 7.50, copi: 4.12, roas: 5.1,
      conversions: 7241, impressions: 175800, clicks: 12460, ctr: 7.09, cvr: 58.1,
      integrationHealth: 8.4, biddingState: 'optimizing', adSets: 2, creatives: 4,
      trend: [10,9,8,7,6,5,5,4], trendDir: 'up',
      dailySpend: [5200, 5800, 6100, 6400, 6850, 5600, 6200],
      publishState: 'published', objectiveType: 'website_traffic', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 85
    },
    {
      id: 'c2', name: 'Capital One Card Acquisition', status: 'active', objective: 'CPA',
      spend: 31200, budget: 50000, cpa: 8.45, cpaTarget: 10.00, copi: 3.21, roas: 3.8,
      conversions: 3692, impressions: 115000, clicks: 8970, ctr: 7.8, cvr: 41.2,
      integrationHealth: 7.9, biddingState: 'optimizing', adSets: 1, creatives: 3,
      trend: [8,7,7,6,5,6,5,5], trendDir: 'up',
      dailySpend: [4200, 4500, 4400, 4700, 4600, 4300, 4500],
      publishState: 'published', objectiveType: 'email', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 72
    },
    {
      id: 'c3', name: 'Hulu Streaming Signup', status: 'active', objective: 'CPA',
      spend: 18700, budget: 25000, cpa: 9.14, cpaTarget: 7.50, copi: 2.84, roas: 2.9,
      conversions: 2046, impressions: 72000, clicks: 5040, ctr: 7.0, cvr: 40.6,
      integrationHealth: 8.1, biddingState: 'learning', adSets: 1, creatives: 2,
      trend: [5,6,7,7,8,8,9,9], trendDir: 'down',
      dailySpend: [2400, 2600, 2700, 2800, 2700, 2600, 2900],
      publishState: 'published', objectiveType: 'website_traffic', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 91
    },
    {
      id: 'c4', name: 'True Classic DPA', status: 'requires_action', statusDetail: 'hit_limit', objective: 'ROAS',
      spend: 22400, budget: 40000, cpa: 12.30, cpaTarget: null, copi: 2.15, roas: 4.8,
      conversions: 1821, impressions: 84700, clicks: 5930, ctr: 7.0, cvr: 30.7,
      integrationHealth: 4.8, biddingState: 'limited', adSets: 2, creatives: 5,
      trend: [4,5,5,6,6,7,7,8], trendDir: 'down',
      dailySpend: [3000, 3200, 3100, 3300, 3400, 3200, 3200],
      publishState: 'published', objectiveType: 'product_sales', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 45
    },
    {
      id: 'c5', name: 'PayPal Pay+ Activation', status: 'paused', objective: 'CPA',
      spend: 8900, budget: 20000, cpa: 6.20, cpaTarget: 8.00, copi: 3.95, roas: 4.2,
      conversions: 1435, impressions: 36300, clicks: 2540, ctr: 7.0, cvr: 56.5,
      integrationHealth: 7.2, biddingState: 'optimizing', adSets: 1, creatives: 3,
      trend: [6,5,5,4,4,4,4,4], trendDir: 'flat',
      dailySpend: [1400, 1500, 1300, 1200, 1300, 1100, 1100],
      publishState: 'published', objectiveType: 'payment_trigger', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 78
    },
    {
      id: 'c6', name: 'Audible Free Trial', status: 'draft', objective: 'CPA',
      spend: 0, budget: 30000, cpa: 0, cpaTarget: 6.00, copi: 0, roas: 0,
      conversions: 0, impressions: 0, clicks: 0, ctr: 0, cvr: 0,
      integrationHealth: 7.5, biddingState: 'draft', adSets: 0, creatives: 0,
      trend: [0,0,0,0,0,0,0,0], trendDir: 'flat',
      dailySpend: [0,0,0,0,0,0,0],
      publishState: 'draft', objectiveType: 'app_download', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 88
    },
    {
      id: 'c7', name: 'Disney+ Bundle Upsell', status: 'active', objective: 'CPA',
      spend: 28400, budget: 60000, cpa: 6.10, cpaTarget: 8.00, copi: 3.85, roas: 4.6,
      conversions: 4656, impressions: 132000, clicks: 9240, ctr: 7.0, cvr: 50.4,
      integrationHealth: 8.1, biddingState: 'optimizing', adSets: 2, creatives: 3,
      trend: [8,7,7,6,5,5,4,4], trendDir: 'up',
      dailySpend: [3800, 4100, 4200, 4000, 4300, 3900, 4100],
      publishState: 'published', objectiveType: 'cross_sell', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 82
    },
    {
      id: 'c8', name: 'Disney+ App Install', status: 'active', objective: 'CPA',
      spend: 15200, budget: 35000, cpa: 3.40, cpaTarget: 5.00, copi: 4.55, roas: 6.2,
      conversions: 4471, impressions: 98000, clicks: 7840, ctr: 8.0, cvr: 57.0,
      integrationHealth: 8.6, biddingState: 'learning', adSets: 1, creatives: 2,
      trend: [6,5,5,4,4,3,3,3], trendDir: 'up',
      dailySpend: [2000, 2100, 2200, 2300, 2100, 2200, 2300],
      publishState: 'published', objectiveType: 'app_download', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 90
    },
    {
      id: 'c9', name: 'Capital One Venture Rewards', status: 'active', objective: 'CPA',
      spend: 19500, budget: 40000, cpa: 9.75, cpaTarget: 12.00, copi: 2.95, roas: 3.5,
      conversions: 2000, impressions: 88000, clicks: 6160, ctr: 7.0, cvr: 32.5,
      integrationHealth: 7.6, biddingState: 'optimizing', adSets: 1, creatives: 2,
      trend: [9,8,8,7,7,6,6,5], trendDir: 'up',
      dailySpend: [2600, 2800, 2900, 2700, 2800, 2900, 2800],
      publishState: 'published', objectiveType: 'email', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 75
    },
    {
      id: 'c10', name: 'Capital One Travel Portal', status: 'draft', objective: 'CPA',
      spend: 0, budget: 25000, cpa: 0, cpaTarget: 10.00, copi: 0, roas: 0,
      conversions: 0, impressions: 0, clicks: 0, ctr: 0, cvr: 0,
      integrationHealth: 7.0, biddingState: 'draft', adSets: 0, creatives: 0,
      trend: [0,0,0,0,0,0,0,0], trendDir: 'flat',
      dailySpend: [0,0,0,0,0,0,0],
      publishState: 'draft', objectiveType: 'website_traffic', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 70
    },
    {
      id: 'c11', name: 'Hulu + Live TV Bundle', status: 'paused', objective: 'CPA',
      spend: 12300, budget: 30000, cpa: 11.20, cpaTarget: 9.00, copi: 2.10, roas: 2.3,
      conversions: 1098, impressions: 52000, clicks: 3640, ctr: 7.0, cvr: 30.2,
      integrationHealth: 7.4, biddingState: 'optimizing', adSets: 1, creatives: 2,
      trend: [4,5,6,7,8,9,10,11], trendDir: 'down',
      dailySpend: [1800, 1900, 1700, 1800, 1700, 1700, 1700],
      publishState: 'published', objectiveType: 'website_traffic', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 55
    },
    {
      id: 'c12', name: 'True Classic Seasonal Sale', status: 'active', objective: 'ROAS',
      spend: 16800, budget: 35000, cpa: 10.50, cpaTarget: null, copi: 2.65, roas: 5.2,
      conversions: 1600, impressions: 71000, clicks: 4970, ctr: 7.0, cvr: 32.2,
      integrationHealth: 6.8, biddingState: 'learning', adSets: 1, creatives: 3,
      trend: [7,6,6,5,5,4,4,3], trendDir: 'up',
      dailySpend: [2200, 2400, 2500, 2400, 2500, 2400, 2400],
      publishState: 'published', objectiveType: 'product_sales', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 68
    },
    {
      id: 'c13', name: 'PayPal Business Solutions', status: 'draft', objective: 'CPA',
      spend: 0, budget: 15000, cpa: 0, cpaTarget: 12.00, copi: 0, roas: 0,
      conversions: 0, impressions: 0, clicks: 0, ctr: 0, cvr: 0,
      integrationHealth: 7.0, biddingState: 'draft', adSets: 0, creatives: 0,
      trend: [0,0,0,0,0,0,0,0], trendDir: 'flat',
      dailySpend: [0,0,0,0,0,0,0],
      publishState: 'draft', objectiveType: 'payment_trigger', country: 'US', language: 'en', timezone: 'America/New_York', aiHealthScore: 72
    }
  ];

  const audiences = [
    { id: 'a1', name: 'Women 25-45 Entertainment Enthusiasts', type: 'Custom', icon: '👥', size: '14.2M', campaigns: 3, fresh: true, matchRate: '82%' },
    { id: 'a2', name: 'Streaming Subscribers LAL (Default)', type: 'LAL', icon: '🔄', size: '10.1M', campaigns: 2, fresh: true, matchRate: '71%' },
    { id: 'a3', name: 'Cord Cutters Behavioral', type: 'Behavioral', icon: '🎯', size: '8.7M', campaigns: 1, fresh: true, matchRate: '68%' },
    { id: 'a4', name: 'High-Value Shoppers LAL (Broad)', type: 'LAL', icon: '🔄', size: '22.4M', campaigns: 2, fresh: true, matchRate: '64%' },
    { id: 'a5', name: 'Finance Decision Makers', type: 'Experian', icon: '🏢', size: '5.8M', campaigns: 1, fresh: true, matchRate: '76%' },
    { id: 'a6', name: 'Existing Customers (Suppress)', type: 'Custom', icon: '👥', size: '2.1M', campaigns: 4, fresh: false, matchRate: '94%' },
    { id: 'a7', name: 'Mobile App Users', type: 'Behavioral', icon: '🎯', size: '18.9M', campaigns: 0, fresh: true, matchRate: '59%' },
    { id: 'a8', name: 'US Demographics 18-34', type: 'Demographic', icon: '📊', size: '31.2M', campaigns: 1, fresh: true, matchRate: '55%' },
    { id: 'a9', name: 'Starter: Frequent Online Shoppers', type: 'Starter', icon: '⚡', size: '25.6M', campaigns: 0, fresh: true, matchRate: '61%' },
    { id: 'a10', name: 'Disney+ Seed Audience', type: 'Custom', icon: '👥', size: '245K', campaigns: 1, fresh: true, matchRate: '91%' },
    { id: 'a11', name: 'Travel Bookers LAL', type: 'LAL', icon: '🔄', size: '12.8M', campaigns: 0, fresh: false, matchRate: '66%' },
    { id: 'a12', name: 'Health & Wellness Interest', type: 'Behavioral', icon: '🎯', size: '9.4M', campaigns: 0, fresh: true, matchRate: '70%' },
  ];

  const creatives = [
    { id: 'cr1', name: 'Disney+ Spring Offer — Text', format: 'Text', campaign: 'Disney+', ctr: 7.8, cvr: 58.1, copi: 4.53 },
    { id: 'cr2', name: 'Disney+ Benefits List', format: 'Benefits', campaign: 'Disney+', ctr: 6.9, cvr: 52.3, copi: 3.61 },
    { id: 'cr3', name: 'Disney+ Hero Banner', format: 'Hero Image', campaign: 'Disney+', ctr: 9.2, cvr: 61.4, copi: 5.65 },
    { id: 'cr4', name: 'Capital One Card Value', format: 'Savings', campaign: 'Capital One', ctr: 7.1, cvr: 41.2, copi: 2.93 },
    { id: 'cr5', name: 'Hulu Free Month', format: 'Text', campaign: 'Hulu', ctr: 6.5, cvr: 40.6, copi: 2.64 },
    { id: 'cr6', name: 'True Classic Product Grid', format: 'Carousel', campaign: 'True Classic', ctr: 5.8, cvr: 30.7, copi: 1.78 },
    { id: 'cr7', name: 'PayPal Pay+ Cashback', format: 'Savings', campaign: 'PayPal', ctr: 8.4, cvr: 56.5, copi: 4.75 },
    { id: 'cr8', name: 'Audible 3-Month Trial', format: 'Text', campaign: 'Audible', ctr: 0, cvr: 0, copi: 0 },
  ];

  const offers = [
    { id: 'o1', type: 'discount', icon: '🏷️', name: '30% off first month', value: '30% off', cost: '$4.99', campaigns: 2, copi: 4.53, cvr: 58.1 },
    { id: 'o2', type: 'trial', icon: '🆓', name: '7-day free trial', value: 'Free trial', cost: '$0.00', campaigns: 1, copi: 3.61, cvr: 52.3 },
    { id: 'o3', type: 'cashback', icon: '💰', name: '$50 statement credit', value: '$50 credit', cost: '$50.00', campaigns: 1, copi: 2.93, cvr: 41.2 },
    { id: 'o4', type: 'discount', icon: '🏷️', name: '$2 off first month', value: '$2 off', cost: '$2.00', campaigns: 1, copi: 2.64, cvr: 40.6 },
    { id: 'o5', type: 'shipping', icon: '📦', name: 'Free shipping on first order', value: 'Free shipping', cost: '$8.99', campaigns: 1, copi: 1.78, cvr: 30.7 },
    { id: 'o6', type: 'cashback', icon: '💰', name: '$5 PayPal cashback', value: '$5 back', cost: '$5.00', campaigns: 1, copi: 4.75, cvr: 56.5 },
  ];

  const experiments = [
    { id: 'e1', name: 'Disney+ Creative A/B Test', type: 'A/B', campaign: 'Disney+', status: 'concluded', days: '14/14', leader: 'Variant B', lift: '+18% CoPI', significance: 97 },
    { id: 'e2', name: 'Capital One Audience Split', type: 'A/B', campaign: 'Capital One', status: 'running', days: '8/14', leader: 'Control', lift: '+4% CPA', significance: 72 },
    { id: 'e3', name: 'Hulu MAB Creative Test', type: 'MAB', campaign: 'Hulu', status: 'running', days: '5/21', leader: 'Variant A', lift: '+7% CVR', significance: 58 },
    { id: 'e4', name: 'True Classic DPA vs Static', type: 'A/B', campaign: 'True Classic', status: 'draft', days: '0/14', leader: '—', lift: '—', significance: 0 },
  ];

  const products = [
    { id: 'p1', name: 'Classic V-Neck Tee', price: '$34.99', stock: 'In Stock', icon: '👕' },
    { id: 'p2', name: 'Premium Henley', price: '$44.99', stock: 'In Stock', icon: '👔' },
    { id: 'p3', name: 'Active Shorts', price: '$39.99', stock: 'Low Stock', icon: '🩳' },
    { id: 'p4', name: 'Crew Neck Sweatshirt', price: '$54.99', stock: 'In Stock', icon: '🧥' },
    { id: 'p5', name: 'Slim Fit Chinos', price: '$49.99', stock: 'In Stock', icon: '👖' },
    { id: 'p6', name: 'Performance Polo', price: '$42.99', stock: 'Out of Stock', icon: '👕' },
  ];

  const teamMembers = [
    { name: 'Max Dowaliby', email: 'max@rokt.com', role: 'Admin', lastActive: '2 min ago' },
    { name: 'Sarah Chen', email: 'sarah.chen@rokt.com', role: 'Editor', lastActive: '1 hour ago' },
    { name: 'James Wilson', email: 'james.w@rokt.com', role: 'Editor', lastActive: '3 hours ago' },
    { name: 'Emily Park', email: 'emily.p@rokt.com', role: 'Viewer', lastActive: '1 day ago' },
  ];

  const measurementGroups = [
    { name: 'Disney+ Acquisition MG', campaigns: 'Disney+ Spring', status: 'Live', event: 'Purchase', window: '7C + 1V', integrationHealth: 8.4 },
    { name: 'Capital One Cards MG', campaigns: 'Capital One Card', status: 'Live', event: 'Application Submit', window: '30C + 1V', integrationHealth: 7.9 },
    { name: 'Streaming Bundle MG', campaigns: 'Hulu Streaming', status: 'Live', event: 'Signup', window: '7C + 1V', integrationHealth: 8.1 },
    { name: 'True Classic DPA MG', campaigns: 'True Classic DPA', status: 'Live', event: 'Purchase', window: '7C', integrationHealth: 4.8 },
  ];

  // ── Partners (Inventory) ──────────────────────────────────
  const partners = [
    { id: 'ptr1', name: 'Ticketmaster', category: 'Entertainment', volume: '2.4M txns/mo' },
    { id: 'ptr2', name: 'Fanatics', category: 'Sports', volume: '1.8M txns/mo' },
    { id: 'ptr3', name: 'Booking.com', category: 'Travel', volume: '3.1M txns/mo' },
    { id: 'ptr4', name: 'StubHub', category: 'Entertainment', volume: '890K txns/mo' },
    { id: 'ptr5', name: 'Grubhub', category: 'Food & Delivery', volume: '2.1M txns/mo' },
    { id: 'ptr6', name: 'Shutterfly', category: 'Retail', volume: '650K txns/mo' },
    { id: 'ptr7', name: 'Chewy', category: 'Pet & Retail', volume: '1.2M txns/mo' },
    { id: 'ptr8', name: 'LiveNation', category: 'Entertainment', volume: '1.5M txns/mo' },
  ];

  // ── State ──────────────────────────────────────────────────
  let currentView = '';
  let selectedCampaign = null;
  let campaignMode = 'autopilot';
  let builderStep = 1;
  let pendingKey = null;
  let pendingKeyTimer = null;
  let reportSort = { col: null, dir: 'desc' };
  let reportDateRange = '7d';
  let reportCompare = false;
  let reportGroupBy = 'none';
  let reportFilters = { campaign: null, adset: null, creative: null, status: null };
  let placeholderInterval = null;
  let selectedAdvertiser = null; // null = picker shown, 'all' = portfolio, or advertiser id
  let accountSwitcherOpen = false;

  const advertisers = [
    { id: 'adv1', name: 'Disney+', avatar: 'D+', color: '#1A3B8F', campaigns: ['c1', 'c7', 'c8'], spend: 85750, activeCampaigns: 3, favorited: true, lastAccessed: '2026-03-20' },
    { id: 'adv2', name: 'Capital One', avatar: 'CO', color: '#C41230', campaigns: ['c2', 'c9', 'c10'], spend: 50700, activeCampaigns: 2, favorited: true, lastAccessed: '2026-03-19' },
    { id: 'adv3', name: 'Hulu', avatar: 'Hu', color: '#1CE783', campaigns: ['c3', 'c11'], spend: 31000, activeCampaigns: 1, favorited: false, lastAccessed: '2026-03-18' },
    { id: 'adv4', name: 'True Classic', avatar: 'TC', color: '#2D3748', campaigns: ['c4', 'c12'], spend: 39200, activeCampaigns: 2, favorited: false, lastAccessed: '2026-03-17' },
    { id: 'adv5', name: 'PayPal', avatar: 'PP', color: '#003087', campaigns: ['c5', 'c13'], spend: 8900, activeCampaigns: 0, favorited: false, lastAccessed: '2026-03-15' },
    { id: 'adv6', name: 'Audible', avatar: 'Au', color: '#F7991C', campaigns: ['c6'], spend: 0, activeCampaigns: 0, favorited: false, lastAccessed: '2026-03-10' },
  ];

  // Advertiser ↔ creative/audience/offer mappings
  const advertiserCreatives = {
    adv1: ['cr1', 'cr2', 'cr3'],
    adv2: ['cr4'],
    adv3: ['cr5'],
    adv4: ['cr6'],
    adv5: ['cr7'],
    adv6: ['cr8'],
  };
  const advertiserOffers = {
    adv1: ['o1', 'o2'],
    adv2: ['o3'],
    adv3: ['o4'],
    adv4: ['o5'],
    adv5: ['o6'],
    adv6: [],
  };
  const advertiserAudiences = {
    adv1: ['a1', 'a2', 'a3', 'a10'],
    adv2: ['a5', 'a6'],
    adv3: ['a2', 'a3'],
    adv4: ['a4', 'a6', 'a8'],
    adv5: ['a6', 'a7'],
    adv6: ['a9', 'a11', 'a12'],
  };

  const defaultBuilderData = {
    // Mode
    mode: 'autopilot',
    // Step 1
    objective: '',
    aiPrompt: '',
    // Step 2
    name: '',
    companyName: '',
    brandUrl: '',
    measurementGroup: '',
    startDate: '2026-03-20',
    endDate: '',
    dailyCap: 1667,
    monthlyCap: 0,
    lifetimeCap: 50000,
    referralExclusion: '30',
    termsEnabled: false, termsText: '',
    privacyEnabled: false, privacyText: '',
    disclaimerEnabled: false, disclaimerText: '',
    // Step 3
    bidStrategy: 'smart',
    targetCpa: '7.50',
    manualBid: '',
    adSets: [{
      audience: 'a1',
      geoCountry: 'US', geoState: '', geoCity: '', geoZip: '',
      deviceDesktop: true, deviceMobile: true, deviceTablet: true,
      ageMin: 18, ageMax: 65, gender: 'all',
      suppressExisting: false,
      budgetOverride: '',
      targetingExpanded: false,
    }],
    // Step 4
    offerType: 'discount',
    offerValue: '30% off first month',
    offerCost: '$4.99',
    landingPageUrl: 'https://www.example.com/offer',
    couponCode: '',
    offerStartDate: '2026-03-20', offerEndDate: '2026-06-30',
    creativeTitle: 'Stream for Less!',
    creativeBody: 'Get 30% off your first month. Stream thousands of movies and shows.',
    creativeCta: 'Start Streaming',
    calloutPromotion: '30% OFF', calloutSocial: '', calloutGuarantee: '',
    creativeDisclaimer: '',
    // Workflow completeness fields
    country: 'US',
    language: 'en',
    timezone: 'America/New_York',
    bidStrategyDetail: '',
    objectiveType: '',
    industryVerticals: [],
    placementType: '',
    // Autopilot asset group fields
    headlines: ['', '', ''],
    descriptions: ['', ''],
    autoCta: '',
    autoImage: false,
    conversionGoal: 'purchase',
    audienceSignals: [],
    interestKeywords: '',
    // Inventory targeting (Advanced)
    placementTypes: [],
    selectedPartners: [],
    positionTargeting: 'any',
    freqCapDaily: 3,
    freqCapLifetime: '',
  };
  let builderData = { ...defaultBuilderData };

  // ── Utility Functions ──────────────────────────────────────
  function fmtNum(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return n.toLocaleString();
    return String(n);
  }
  function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  // ── Router ─────────────────────────────────────────────────
  function navigate(view) {
    // Don't navigate if no advertiser is selected (picker is showing)
    if (!selectedAdvertiser) return;
    if (view === currentView && view !== 'builder') return;
    currentView = view;

    // Update sidebar active state
    $$('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === view);
    });

    // Clone template into content area
    const tmpl = document.getElementById(`tmpl-${view}`);
    const content = document.getElementById('content');
    if (!tmpl || !content) return;

    // View exit animation
    const currentContent = content.querySelector('.view');
    if (currentContent) {
      currentContent.classList.add('view-exit');
      setTimeout(() => {
        content.innerHTML = '';
        const clone = tmpl.content.cloneNode(true);
        content.appendChild(clone);
        const newView = content.querySelector('.view');
        if (newView) newView.classList.add('view-enter');
        afterNavigate(view);
      }, 150);
    } else {
      content.innerHTML = '';
      const clone = tmpl.content.cloneNode(true);
      content.appendChild(clone);
      const newView = content.querySelector('.view');
      if (newView) newView.classList.add('view-enter');
      afterNavigate(view);
    }
  }

  function afterNavigate(view) {
    // Initialize view
    requestAnimationFrame(() => {
      const initMap = {
        dashboard: initDashboard,
        campaigns: initCampaigns,
        builder: initBuilder,
        audiences: initAudiences,
        creatives: initCreatives,
        intelligence: initIntelligence,
        offers: initCatalog,
        measurement: initMeasurement,
        account: initAccount,
      };
      if (initMap[view]) initMap[view]();

      // Show context alert for certain views
      showContextAlert(view);

      // Update status bar with filtered data
      updateStatusBar();

      // Init AI sparkles on relevant views
      initAISparkles();
    });
  }

  function showContextAlert(view) {
    const alert = document.getElementById('contextAlert');
    const text = document.getElementById('contextAlertText');
    if (!alert || !text) return;
    const alerts = {
      dashboard: 'Integration Health dropped below 5.0 on True Classic — conversion tracking may be degraded',
      campaigns: 'Integration Health dropped below 5.0 on True Classic DPA — conversion tracking may be degraded',
      measurement: 'Phone identifier is missing from CAPI integration — estimated +1.5 Integration Health impact',
      creatives: 'Creative refresh overdue on 2 campaigns — last updated 47 days ago',
    };
    if (alerts[view]) {
      text.textContent = alerts[view];
      alert.style.display = 'flex';
    } else {
      alert.style.display = 'none';
    }

    // Update search placeholder contextually
    const searchTrigger = document.querySelector('.search-trigger span:not(.search-kbd)');
    if (searchTrigger) {
      const placeholders = {
        dashboard: 'Jump to any view...',
        campaigns: 'Search campaigns...',
        audiences: 'Find audiences...',
        creatives: 'Search creatives...',
        intelligence: 'Search reports...',
        offers: 'Search offers & products...',
        measurement: 'Search measurement groups...',
        account: 'Search settings...',
        builder: 'Search campaigns...',
      };
      searchTrigger.textContent = placeholders[view] || 'Ask AI anything...';
    }
  }

  // ── Animate Counters ──────────────────────────────────────
  function animateCounters() {
    $$('.kpi-number[data-target]').forEach(el => {
      const target = parseFloat(el.dataset.target);
      const isDecimal = String(target).includes('.');
      const decimals = isDecimal ? (String(target).split('.')[1] || '').length : 0;
      const duration = 800;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        if (isDecimal) {
          el.textContent = current.toFixed(decimals);
        } else {
          el.textContent = Math.round(current).toLocaleString();
        }

        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  // ── Dashboard ──────────────────────────────────────────────
  let pacingTimeRange = '7D';

  function initDashboard() {
    // Portfolio mode: show cross-advertiser dashboard
    if (selectedAdvertiser === 'all') {
      renderPortfolioDashboard();
      return;
    }
    // Compute KPIs from filtered campaign data
    const fc = getFilteredCampaigns().filter(c => c.status !== 'draft');
    const totalSpend = fc.reduce((s, c) => s + c.spend, 0);
    const totalConv = fc.reduce((s, c) => s + c.conversions, 0);
    const avgCopi = fc.length ? (fc.reduce((s, c) => s + c.copi, 0) / fc.length).toFixed(2) : '0.00';
    const avgCPA = totalConv > 0 ? (totalSpend / totalConv).toFixed(2) : '0.00';
    const avgROAS = fc.length ? (fc.reduce((s, c) => s + c.roas, 0) / fc.length).toFixed(1) : '0.0';

    const kpiEls = $$('.kpi-number[data-target]');
    const kpiValues = [totalSpend, totalConv, avgCopi, avgCPA, avgROAS];
    kpiEls.forEach((el, i) => {
      if (kpiValues[i] !== undefined) el.dataset.target = kpiValues[i];
    });

    animateCounters();
    renderDashboardHealth();
    renderDashboardInsights();
    renderDashboardActivity();
    renderOptimizationScore();
    renderAIRecommendations();
    initCardGlow();
    initPacingTimeHorizon();
  }

  function renderPortfolioDashboard() {
    const content = document.getElementById('content');
    const view = content?.querySelector('.view');
    if (!view) return;

    const totalSpend = advertisers.reduce((s, a) => s + a.spend, 0);
    const totalActive = campaigns.filter(c => c.status === 'active' || c.status === 'requires_action').length;
    const totalConversions = campaigns.filter(c => c.status !== 'draft').reduce((s, c) => s + c.conversions, 0);
    const avgCPA = totalConversions > 0 ? (totalSpend / totalConversions).toFixed(2) : '0.00';

    view.innerHTML = `
      <div style="padding:var(--space-5) var(--space-6)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-5)">
          <div>
            <h2 class="view-title" style="margin-bottom:4px">Portfolio Dashboard</h2>
            <p style="font-size:13px;color:var(--text-secondary)">Cross-advertiser overview for all managed accounts</p>
          </div>
        </div>

        <div class="kpi-strip">
          <div class="kpi-card">
            <div class="kpi-label">TOTAL SPEND</div>
            <div class="kpi-value"><span class="kpi-prefix">$</span><span class="kpi-number" data-target="${totalSpend}">${totalSpend.toLocaleString()}</span></div>
            <div class="kpi-meta"><span class="kpi-period">Across ${advertisers.length} advertisers</span></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">ACTIVE CAMPAIGNS</div>
            <div class="kpi-value"><span class="kpi-number" data-target="${totalActive}">${totalActive}</span></div>
            <div class="kpi-meta"><span class="kpi-period">of ${campaigns.length} total</span></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">TOTAL CONVERSIONS</div>
            <div class="kpi-value"><span class="kpi-number" data-target="${totalConversions}">${totalConversions.toLocaleString()}</span></div>
            <div class="kpi-meta"><span class="trend-up">All advertisers</span></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">BLENDED CPA</div>
            <div class="kpi-value"><span class="kpi-prefix">$</span><span class="kpi-number" data-target="${avgCPA}">${avgCPA}</span></div>
            <div class="kpi-meta"><span class="kpi-period">Weighted average</span></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">ADVERTISERS</div>
            <div class="kpi-value"><span class="kpi-number" data-target="${advertisers.length}">${advertisers.length}</span></div>
            <div class="kpi-meta"><span class="kpi-period">Managed accounts</span></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:var(--space-4)">
          <div class="card-header">
            <h3 class="card-title">Advertiser Overview</h3>
          </div>
          <div class="card-body">
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:var(--space-4)">
              ${advertisers.map(adv => {
                const advCampaigns = campaigns.filter(c => adv.campaigns.includes(c.id));
                const advActive = advCampaigns.filter(c => c.status === 'active' || c.status === 'requires_action').length;
                const advConv = advCampaigns.reduce((s, c) => s + c.conversions, 0);
                const advSpend = advCampaigns.reduce((s, c) => s + c.spend, 0);
                const healthColor = advCampaigns.some(c => c.status === 'requires_action') ? 'var(--negative)' : advActive > 0 ? 'var(--positive)' : 'var(--text-tertiary)';
                return `
                  <div class="health-card" style="cursor:pointer" onclick="RoktAds.switchAdvertiser('${adv.id}')">
                    <div class="health-card-header">
                      <div class="health-card-name">
                        <div style="width:28px;height:28px;border-radius:var(--radius-md);background:${adv.color};color:white;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">${adv.avatar}</div>
                        ${adv.name}
                      </div>
                      <span style="width:8px;height:8px;border-radius:50%;background:${healthColor};flex-shrink:0"></span>
                    </div>
                    <div class="health-card-metrics">
                      <div>
                        <div class="health-metric-label">Spend</div>
                        <div class="health-metric-value">$${fmtNum(advSpend)}</div>
                      </div>
                      <div>
                        <div class="health-metric-label">Active</div>
                        <div class="health-metric-value">${advActive} / ${advCampaigns.length}</div>
                      </div>
                      <div>
                        <div class="health-metric-label">Conversions</div>
                        <div class="health-metric-value">${fmtNum(advConv)}</div>
                      </div>
                      <div>
                        <div class="health-metric-label">Health</div>
                        <div class="health-metric-value" style="color:${healthColor}">${advCampaigns.some(c => c.status === 'requires_action') ? 'Needs Attn' : advActive > 0 ? 'Healthy' : 'Inactive'}</div>
                      </div>
                    </div>
                    <div style="margin-top:8px;font-size:11px;color:var(--beetroot);font-weight:500">Click to manage &rarr;</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    animateCounters();
    initCardGlow();
  }

  function initPacingTimeHorizon() {
    const pills = document.querySelectorAll('.view-dashboard .card:first-of-type .filter-pills .filter-pill');
    if (!pills.length) return;
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        pacingTimeRange = pill.textContent.trim();
        updatePacingChart();
      });
    });
  }

  function updatePacingChart() {
    const svg = document.getElementById('pacingChartSvg');
    if (!svg) return;

    const range = pacingTimeRange;
    let points, labels, projected, budgetY;

    if (range === '7D') {
      points = [[0,180],[100,160],[200,138],[300,118],[400,90]];
      projected = [[0,180],[100,155],[200,130],[300,108],[400,85],[500,62],[600,40],[700,18]];
      labels = [['Mon',0],['Tue',100],['Wed',200],['Thu',300],['Today',400],['Sat',500],['Sun',600]];
      budgetY = 20;
    } else if (range === '30D') {
      points = [[0,170],[175,140],[350,105],[525,72]];
      projected = [[0,170],[175,140],[350,105],[525,72],[700,30]];
      labels = [['Wk 1',0],['Wk 2',175],['Wk 3',350],['Wk 4',525],['Wk 5',700]];
      budgetY = 15;
    } else if (range === 'MTD') {
      points = [[0,175],[50,168],[100,160],[150,152],[200,142],[250,132],[300,120],[350,108],[400,96],[450,84],[500,72],[550,60],[600,50],[650,40],[700,30]];
      projected = points;
      labels = [['Mar 1',0],['Mar 5',150],['Mar 10',350],['Mar 15',500],['Mar 20',700]];
      budgetY = 15;
    } else if (range === 'QTD') {
      points = [[0,175],[233,120],[466,65]];
      projected = [[0,175],[233,120],[466,65],[700,20]];
      labels = [['Jan',0],['Feb',233],['Mar',466],['Apr (Proj)',700]];
      budgetY = 10;
    }

    const actualStr = points.map(p => p.join(',')).join(' ');
    const projStr = projected.map(p => p.join(',')).join(' ');
    const lastPoint = points[points.length - 1];
    const fillStr = actualStr + ` ${lastPoint[0]},200 0,200`;

    const dotSvg = points.map(p => `<use href="#roktDot" x="${p[0]-6}" y="${p[1]-6}" width="12" height="12" color="var(--beetroot)"/>`).join('');
    const labelSvg = labels.map(l => `<text x="${l[1]}" y="196" fill="var(--text-tertiary)" font-size="9" font-family="var(--font-mono)">${l[0]}</text>`).join('');

    // Keep existing defs, replace content
    const defs = svg.querySelector('defs');
    const defsHTML = defs ? defs.outerHTML : '';

    svg.innerHTML = `
      ${defsHTML}
      <defs><linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--beetroot)" stop-opacity="0.25"/><stop offset="100%" stop-color="var(--beetroot)" stop-opacity="0.02"/></linearGradient></defs>
      <line x1="0" y1="${budgetY}" x2="700" y2="${budgetY}" stroke="var(--border)" stroke-width="1" stroke-dasharray="6,4"/>
      <text x="705" y="${budgetY+4}" fill="var(--text-tertiary)" font-size="10" font-family="var(--font-mono)">${range === '30D' ? '$100K' : range === 'QTD' ? '$300K' : '$25K'}</text>
      <polyline points="${projStr}" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5" stroke-dasharray="5,5" opacity="0.4"/>
      <polygon points="${fillStr}" fill="url(#spendGrad)"/>
      <polyline points="${actualStr}" fill="none" stroke="var(--beetroot)" stroke-width="2.5" stroke-linecap="round" class="chart-line-animate"/>
      ${dotSvg}
      ${labelSvg}
    `;
  }

  function renderDashboardHealth() {
    const grid = document.getElementById('campaignHealthGrid');
    if (!grid) return;
    grid.innerHTML = getFilteredCampaigns().filter(c => c.status !== 'draft').map(c => `
      <div class="health-card" onclick="location.hash='campaigns';setTimeout(()=>RoktAds.openCampaignDetail('${c.id}'),200)">
        <div class="health-card-header">
          <div class="health-card-name">
            <span class="campaign-status-dot ${c.status}"></span>
            ${c.name}
          </div>
          <span class="bidding-state state-${c.biddingState}"><span class="bidding-dot ${c.biddingState}"></span> ${capitalize(c.biddingState)}</span>
        </div>
        <div class="health-card-metrics">
          <div>
            <div class="health-metric-label">CoPI</div>
            <div class="health-metric-value">${c.copi}%</div>
          </div>
          <div>
            <div class="health-metric-label">${c.objective === 'ROAS' ? 'ROAS' : 'CPA'}</div>
            <div class="health-metric-value">${c.objective === 'ROAS' ? c.roas + 'x' : '$' + c.cpa.toFixed(2)}</div>
          </div>
          <div>
            <div class="health-metric-label">Spend</div>
            <div class="health-metric-value">$${fmtNum(c.spend)}</div>
          </div>
          <div>
            <div class="health-metric-label">Pacing</div>
            <div class="health-metric-value">${Math.round(c.spend/c.budget*100)}%</div>
          </div>
        </div>
        <div class="progress-bar" style="margin-top:8px">
          <div class="progress-bar-fill" style="width:${Math.round(c.spend/c.budget*100)}%;background:${c.spend/c.budget > 0.85 ? 'var(--warning)' : 'var(--beetroot)'}"></div>
        </div>
      </div>
    `).join('');
  }

  function renderDashboardInsights() {
    const list = document.getElementById('insightList');
    if (!list) return;
    // Build insights from filtered campaigns for the selected advertiser
    const fc = getFilteredCampaigns();
    const insights = [];
    // Find campaigns above CPA target
    const aboveTarget = fc.filter(c => c.cpaTarget && c.cpa > c.cpaTarget && c.status === 'active');
    if (aboveTarget.length) {
      const worst = aboveTarget.sort((a,b) => (b.cpa/b.cpaTarget) - (a.cpa/a.cpaTarget))[0];
      const pct = Math.round(((worst.cpa - worst.cpaTarget) / worst.cpaTarget) * 100);
      insights.push({ icon: '💡', type: 'tip', text: `<strong>${worst.name}</strong> CPA is ${pct}% above target — consider expanding LAL to Broad tier` });
    }
    // Low integration health
    const lowHealth = fc.filter(c => c.integrationHealth < 5 && c.status !== 'draft');
    if (lowHealth.length) {
      insights.push({ icon: '⚠️', type: 'warn', text: `<strong>${lowHealth[0].name}</strong> Integration Health at ${lowHealth[0].integrationHealth} — check CAPI integration` });
    }
    // Best performer
    const active = fc.filter(c => c.status === 'active' && c.copi > 0);
    if (active.length) {
      const best = active.sort((a,b) => b.copi - a.copi)[0];
      insights.push({ icon: '✅', type: 'good', text: `<strong>${best.name}</strong> leading with ${best.copi}% CoPI — consider expanding budget` });
    }
    // Stale audience hint
    if (fc.filter(c => c.status === 'active').length >= 2) {
      insights.push({ icon: '💡', type: 'tip', text: `<strong>${fc.filter(c => c.status === 'active').length} active campaigns</strong> — consider refreshing audiences for better targeting` });
    }
    list.innerHTML = `<div class="insight-list">${insights.map(i => `
      <div class="insight-item">
        <div class="insight-icon-wrap ${i.type}">${i.icon}</div>
        <div class="insight-body">${i.text}</div>
      </div>
    `).join('')}</div>`;
  }

  function renderDashboardActivity() {
    const tl = document.getElementById('activityTimeline');
    if (!tl) return;
    const items = [
      { icon: '💰', time: '2 min ago', text: 'Budget increased on <strong>Capital One</strong> campaign to $50K' },
      { icon: '🎨', time: '1 hour ago', text: 'New creative "<strong>Disney+ Hero Banner</strong>" added' },
      { icon: '🧪', time: '3 hours ago', text: 'Experiment #1 reached <strong>97% significance</strong> — ready to apply' },
      { icon: '⏸️', time: '5 hours ago', text: '<strong>PayPal Pay+</strong> campaign paused by Sarah Chen' },
      { icon: '📊', time: 'Yesterday', text: 'Weekly report generated for all campaigns' },
    ];
    tl.innerHTML = `<div class="timeline-list">${items.map(i => `
      <div class="timeline-item">
        <div class="timeline-dot-wrap">${i.icon}</div>
        <div class="timeline-body">
          <div class="timeline-time">${i.time}</div>
          <div class="timeline-text">${i.text}</div>
        </div>
      </div>
    `).join('')}</div>`;
  }

  // ── Dashboard AI Features (Phase 3) ─────────────────────────
  function renderOptimizationScore() {
    const container = document.getElementById('optScoreContainer');
    if (!container) return;
    const score = 78;
    const color = score >= 80 ? 'var(--positive)' : score >= 60 ? 'var(--warning)' : 'var(--negative)';
    container.innerHTML = `
      <div class="opt-score-card">
        <div class="opt-score-gauge">
          <svg viewBox="0 0 120 60" width="120" height="60">
            <path d="M10 55 A50 50 0 0 1 110 55" fill="none" stroke="var(--border)" stroke-width="8" stroke-linecap="round"/>
            <path d="M10 55 A50 50 0 0 1 110 55" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"
              stroke-dasharray="${score * 1.57} 157" style="transition:stroke-dasharray 1.2s var(--ease-out)"/>
          </svg>
          <div class="opt-score-value" style="color:${color}">${score}</div>
        </div>
        <div class="opt-score-label">Optimization Score</div>
        <div style="font-size:11px;color:var(--text-secondary);margin-top:4px">+6 pts available from 3 recommendations</div>
      </div>
    `;
  }

  function renderAIRecommendations() {
    const container = document.getElementById('aiRecsContainer');
    if (!container) return;
    // Generate advertiser-scoped recommendations
    const fc = getFilteredCampaigns();
    const recs = [];
    // Low creative count recommendation
    const lowCreative = fc.filter(c => c.creatives <= 2 && c.status === 'active');
    if (lowCreative.length) {
      recs.push({ icon: '🎨', priority: 'high', text: `Add <strong>more creatives</strong> to ${lowCreative[0].name}`, impact: 'Est. +15% CoPI', action: 'Create Creative' });
    }
    // Budget cap recommendation
    const highPacing = fc.filter(c => c.spend / c.budget > 0.7 && c.status === 'active');
    if (highPacing.length) {
      recs.push({ icon: '💰', priority: 'high', text: `<strong>Increase budget</strong> on ${highPacing[0].name} — high pacing rate`, impact: 'Est. +$2.4K conv.', action: 'Apply' });
    }
    // Stale audiences
    const activeCount = fc.filter(c => c.status === 'active').length;
    if (activeCount >= 2) {
      recs.push({ icon: '👥', priority: 'medium', text: `<strong>Refresh audiences</strong> across ${activeCount} active campaigns`, impact: 'Est. +8% match rate', action: 'Refresh All' });
    }
    // Low health
    const lowHealth = fc.filter(c => c.integrationHealth < 5 && c.status !== 'draft');
    if (lowHealth.length) {
      recs.push({ icon: '⏸️', priority: 'low', text: `Consider pausing <strong>${lowHealth[0].name}</strong> — Integration Health below threshold`, impact: `Save $${fmtNum(Math.round(lowHealth[0].spend * 0.15))}/wk`, action: 'Review' });
    }
    container.innerHTML = recs.map(r => `
      <div class="ai-rec-card">
        <div class="ai-rec-icon ${r.priority}">${r.icon}</div>
        <div class="ai-rec-body">
          <div class="ai-rec-text">${r.text}</div>
          <div class="ai-rec-impact">${r.impact}</div>
          <div class="ai-rec-actions">
            <button class="btn btn-xs btn-primary btn-pill" onclick="RoktAds.toast('${r.action} applied','success')">${r.action}</button>
            <button class="btn btn-xs btn-ghost" onclick="this.closest('.ai-rec-card').style.display='none';RoktAds.toast('Dismissed','info')">Dismiss</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ── Card Glow Effect (mouse tracking) ─────────────────────
  function initCardGlow() {
    document.querySelectorAll('.kpi-card, .health-card, .audience-card, .experiment-card, .offer-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width * 100) + '%';
        const y = ((e.clientY - rect.top) / rect.height * 100) + '%';
        card.style.setProperty('--mouse-x', x);
        card.style.setProperty('--mouse-y', y);
      });
    });
  }

  // ── Campaigns ──────────────────────────────────────────────
  function initCampaigns() {
    updateCampaignFilterCounts();
    renderCampaignTable();

    // Filter pills
    $$('#campaignFilters .filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        $$('#campaignFilters .filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderCampaignTable(pill.dataset.filter);
      });
    });

    // Detail panel back
    const backBtn = document.getElementById('detailPanelBack');
    if (backBtn) backBtn.addEventListener('click', closeCampaignDetail);

    // Search
    const search = document.getElementById('campaignSearch');
    if (search) search.addEventListener('input', () => renderCampaignTable('all', search.value));
  }

  function updateCampaignFilterCounts() {
    const fc = getFilteredCampaigns();
    const counts = {
      all: fc.length,
      active: fc.filter(c => c.status === 'active').length,
      requires_action: fc.filter(c => c.status === 'requires_action').length,
      paused: fc.filter(c => c.status === 'paused').length,
      draft: fc.filter(c => c.status === 'draft').length,
      pending_review: fc.filter(c => c.status === 'pending_review').length,
      archived: fc.filter(c => c.status === 'archived').length,
    };
    $$('#campaignFilters .filter-pill').forEach(pill => {
      const f = pill.dataset.filter;
      const countEl = pill.querySelector('.filter-count');
      if (countEl && counts[f] !== undefined) countEl.textContent = counts[f];
    });
    const countBadge = document.getElementById('campaignCount');
    if (countBadge) countBadge.textContent = fc.length;
  }

  function renderCampaignTable(filter = 'all', search = '') {
    const tbody = document.getElementById('campaignsTableBody');
    if (!tbody) return;
    let filtered = getFilteredCampaigns();
    if (filter === 'active') filtered = filtered.filter(c => c.status === 'active');
    else if (filter === 'requires_action') filtered = filtered.filter(c => c.status === 'requires_action');
    else if (filter === 'paused') filtered = filtered.filter(c => c.status === 'paused');
    else if (filter === 'draft') filtered = filtered.filter(c => c.status === 'draft');
    else if (filter === 'pending_review') filtered = filtered.filter(c => c.status === 'pending_review');
    else if (filter === 'archived') filtered = filtered.filter(c => c.status === 'archived');
    else if (filter === 'ended') filtered = filtered.filter(c => c.status === 'ended');
    if (search) filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    tbody.innerHTML = filtered.map(c => {
      const detailText = c.statusDetail ? c.statusDetail.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
      return `
      <tr class="clickable ${selectedCampaign === c.id ? 'selected' : ''}" data-id="${c.id}" onclick="RoktAds.openCampaignDetail('${c.id}')">
        <td><input type="checkbox" class="table-checkbox" onclick="event.stopPropagation()"></td>
        <td><span class="campaign-status-dot ${c.status}" ${detailText ? 'title="' + detailText + '"' : ''}></span></td>
        <td class="campaign-name">${c.name}</td>
        <td><span class="badge badge-gray">${c.objective}</span></td>
        <td>
          <div class="spend-bar-cell">
            <div class="spend-bar-text">$${fmtNum(c.spend)} / $${fmtNum(c.budget)}</div>
            <div class="progress-bar"><div class="progress-bar-fill" style="width:${c.budget ? Math.round(c.spend/c.budget*100) : 0}%;background:${c.spend/c.budget > 0.85 ? 'var(--warning)' : 'var(--beetroot)'}"></div></div>
          </div>
        </td>
        <td>
          <span class="mono ${c.cpaTarget && c.cpa > c.cpaTarget ? 'trend-down' : ''}" style="font-size:12px">${c.cpa ? '$' + c.cpa.toFixed(2) : '—'}</span>
          ${c.cpaTarget ? `<span style="font-size:10px;color:var(--text-tertiary)">/$${c.cpaTarget.toFixed(2)}</span>` : ''}
        </td>
        <td><span class="mono" style="font-size:12px">${c.copi ? c.copi + '%' : '—'}</span></td>
        <td><span class="mono" style="font-size:12px">${c.roas ? c.roas + 'x' : '—'}</span></td>
        <td>
          <svg width="48" height="16" viewBox="0 0 48 16">
            <polyline points="${c.trend.map((v,i) => `${i*48/7},${16-v*1.6}`).join(' ')}"
              fill="none" stroke="${c.trendDir === 'up' ? 'var(--positive)' : c.trendDir === 'down' ? 'var(--negative)' : 'var(--text-tertiary)'}" stroke-width="1.5"/>
          </svg>
        </td>
        <td>
          <span class="bidding-state state-${c.biddingState}"><span class="bidding-dot ${c.biddingState}"></span> ${capitalize(c.biddingState)}</span>
        </td>
        <td>
          <div class="row-actions">
            <button class="row-action-btn" onclick="event.stopPropagation();RoktAds.toggleCampaignStatus('${c.id}')" title="${c.status === 'active' ? 'Pause' : 'Resume'}">${c.status === 'active' ? '⏸' : '▶'}</button>
            <button class="row-action-btn" onclick="event.stopPropagation();RoktAds.openModal('editCampaign','${c.id}')" title="Edit">✏️</button>
            <button class="row-action-btn" onclick="event.stopPropagation();RoktAds.duplicateCampaign('${c.id}')" title="Duplicate">⧉</button>
          </div>
        </td>
      </tr>`;
    }).join('');
  }

  function openCampaignDetail(id) {
    selectedCampaign = id;
    const c = campaigns.find(x => x.id === id);
    if (!c) return;

    const panel = document.getElementById('campaignDetailPanel');
    if (panel) panel.classList.add('open');

    // Mark selected row
    $$('.campaigns-table-wrap tr').forEach(r => r.classList.toggle('selected', r.dataset.id === id));

    // Title & badges with edit/pause actions
    const title = document.getElementById('detailTitle');
    if (title) title.textContent = c.name;
    const statusBadgeMap = {
      active: 'positive', paused: 'warning', draft: 'gray',
      requires_action: 'negative', pending_review: 'blue', archived: 'gray', ended: 'gray'
    };
    const statusLabelMap = {
      active: 'Active', paused: 'Paused', draft: 'Draft',
      requires_action: 'Requires Action', pending_review: 'Pending Review', archived: 'Archived', ended: 'Ended'
    };
    const badges = document.getElementById('detailBadges');
    if (badges) badges.innerHTML = `
      <span class="badge badge-${statusBadgeMap[c.status] || 'gray'}">${statusLabelMap[c.status] || capitalize(c.status)}</span>
      ${c.statusDetail ? '<span class="badge badge-warning" style="font-size:9px">' + c.statusDetail.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + '</span>' : ''}
      <span class="badge badge-gray">${c.objective}</span>
    `;

    // Add action buttons to header based on status
    const headerWrap = document.querySelector('.detail-panel-title-wrap');
    // Remove existing actions first
    const existingActions = headerWrap?.querySelector('.detail-actions');
    if (existingActions) existingActions.remove();
    if (headerWrap) {
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'detail-actions';
      if (c.status === 'requires_action') {
        actionsDiv.innerHTML = `
          <button class="btn btn-xs btn-primary btn-pill" onclick="RoktAds.toast('Opening resolution workflow...','info')">Resolve</button>
          <button class="btn btn-xs btn-ghost" onclick="RoktAds.toggleCampaignStatus('${c.id}')">⏸ Pause</button>
          <button class="btn btn-xs btn-ghost" onclick="RoktAds.archiveCampaign('${c.id}')">Archive</button>`;
      } else if (c.status === 'draft') {
        actionsDiv.innerHTML = `
          <button class="btn btn-xs btn-primary btn-pill" onclick="RoktAds.toast('Campaign published!','success')">Publish</button>
          <button class="btn btn-xs btn-ghost" onclick="RoktAds.openModal('editCampaign', '${c.id}')">✏️ Edit</button>
          <button class="btn btn-xs btn-ghost" style="color:var(--negative)" onclick="RoktAds.toast('Campaign deleted','info')">Delete</button>`;
      } else {
        actionsDiv.innerHTML = `
          <button class="btn btn-xs btn-ghost" onclick="RoktAds.toggleCampaignStatus('${c.id}')">${c.status === 'active' ? '⏸ Pause' : c.status === 'paused' ? '▶ Resume' : '✏️ Edit'}</button>
          <button class="btn btn-xs btn-ghost" onclick="RoktAds.openModal('editCampaign', '${c.id}')">✏️ Edit</button>
          <button class="btn btn-xs btn-ghost" onclick="RoktAds.archiveCampaign('${c.id}')">Archive</button>`;
      }
      headerWrap.appendChild(actionsDiv);
    }

    // Metric ribbon
    const ribbon = document.getElementById('detailMetricRibbon');
    if (ribbon) ribbon.innerHTML = [
      { l: 'Spend', v: '$' + fmtNum(c.spend) },
      { l: 'Budget Left', v: '$' + fmtNum(c.budget - c.spend) },
      { l: 'CPA', v: '$' + c.cpa.toFixed(2) },
      { l: 'ROAS', v: c.roas + 'x' },
      { l: 'Conversions', v: fmtNum(c.conversions) },
      { l: 'CTR', v: c.ctr + '%' },
      { l: 'CoPI', v: c.copi + '%', hero: true },
      { l: 'Int. Health', v: c.integrationHealth, color: c.integrationHealth >= 7 ? 'var(--positive)' : c.integrationHealth >= 5 ? 'var(--warning)' : 'var(--negative)' },
    ].map(m => `
      <div class="metric-chip ${m.hero ? 'kpi-card--hero' : ''}">
        <span class="metric-chip-label">${m.l}</span>
        <span class="metric-chip-value mono" ${m.color ? `style="color:${m.color}"` : ''}>${m.v}</span>
      </div>
    `).join('');

    // Render overview tab by default
    renderCampaignTab('overview', c);

    // Tab listeners
    $$('.detail-tab').forEach(tab => {
      tab.onclick = () => {
        $$('.detail-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderCampaignTab(tab.dataset.tab, c);
      };
    });
  }

  function generateAIAnalysis(c) {
    const insights = [];
    if (c.cpaTarget && c.cpa > c.cpaTarget) insights.push(`CPA is ${Math.round((c.cpa/c.cpaTarget - 1) * 100)}% above target at $${c.cpa.toFixed(2)}.`);
    else if (c.cpaTarget && c.cpa > 0) insights.push(`CPA is ${Math.round((1 - c.cpa/c.cpaTarget) * 100)}% below target — strong performance.`);
    if (c.trendDir === 'down' && c.trend && c.trend[c.trend.length-1] > c.trend[0]) insights.push(`Spend trending up week-over-week.`);
    if (c.integrationHealth && c.integrationHealth < 5) insights.push(`Integration Health score of ${c.integrationHealth} is below recommended threshold of 5.0.`);
    if (c.biddingState === 'learning') insights.push('Smart Bidding is still in learning phase — avoid major changes.');
    if (c.biddingState === 'limited') insights.push('Smart Bidding is budget-limited — consider increasing budget or narrowing audience.');
    if (c.aiHealthScore >= 80) insights.push(`AI Health Score: ${c.aiHealthScore}/100 — campaign is performing well.`);
    else if (c.aiHealthScore >= 60) insights.push(`AI Health Score: ${c.aiHealthScore}/100 — some areas need attention.`);
    else if (c.aiHealthScore) insights.push(`AI Health Score: ${c.aiHealthScore}/100 — critical issues detected.`);
    return insights.join(' ');
  }

  function renderCampaignTab(tab, c) {
    const container = document.getElementById('detailTabContent');
    if (!container) return;

    if (tab === 'overview') {
      const aiAnalysis = generateAIAnalysis(c);
      container.innerHTML = `
        <div class="ai-analysis-card">
          <div class="ai-analysis-header">
            <svg width="14" height="14" viewBox="0 0 22 22" fill="none" stroke="var(--beetroot)" stroke-width="1.5"><path d="M11 2L13.5 8.5L20 11L13.5 13.5L11 20L8.5 13.5L2 11L8.5 8.5L11 2Z"/></svg>
            AI Analysis
          </div>
          <div class="ai-analysis-body">${aiAnalysis}</div>
          <div class="ai-analysis-actions">
            <button onclick="RoktAds.toast('Optimization suggestions generated','info')">Get Suggestions</button>
            <button onclick="RoktAds.toast('Opening detailed report...','info')">Deep Dive</button>
          </div>
        </div>
        <div class="detail-chart-area">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <span style="font-size:12px;font-weight:600">Daily Spend</span>
            <div class="filter-pills">
              <button class="filter-pill active" style="font-size:10px">7D</button>
              <button class="filter-pill" style="font-size:10px">30D</button>
            </div>
          </div>
          <svg width="100%" height="120" viewBox="0 0 460 120" preserveAspectRatio="none">
            <defs>
              <symbol id="rDotDetail" viewBox="0 0 12 12"><path d="M0 10 L2.5 0 L5 10 L7.5 0 L10 10 L8.5 10 L7.5 3 L5 10 L2.5 3 L1.5 10 Z" fill="currentColor"/></symbol>
              <linearGradient id="detailGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--beetroot)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--beetroot)" stop-opacity="0"/></linearGradient>
            </defs>
            <polygon points="${c.dailySpend.map((v,i) => `${i*460/6},${120 - v/60}`).join(' ')} 460,120 0,120" fill="url(#detailGrad)"/>
            <polyline points="${c.dailySpend.map((v,i) => `${i*460/6},${120 - v/60}`).join(' ')}" fill="none" stroke="var(--beetroot)" stroke-width="2" stroke-linecap="round" class="chart-line-animate"/>
            ${c.dailySpend.map((v,i) => `<use href="#rDotDetail" x="${i*460/6 - 5}" y="${120 - v/60 - 5}" width="10" height="10" color="var(--beetroot)"/>`).join('')}
          </svg>
        </div>
        <div class="detail-stats-grid">
          <div class="detail-stat-card">
            <div class="detail-stat-label">Budget Pacing</div>
            <div class="detail-stat-value">${Math.round(c.spend/c.budget*100)}%</div>
            <div class="progress-bar" style="margin-top:8px"><div class="progress-bar-fill" style="width:${Math.round(c.spend/c.budget*100)}%;background:var(--beetroot)"></div></div>
          </div>
          <div class="detail-stat-card">
            <div class="detail-stat-label">Smart Bidding</div>
            <div class="detail-stat-value"><span class="bidding-state state-${c.biddingState}"><span class="bidding-dot ${c.biddingState}"></span> ${capitalize(c.biddingState)}</span></div>
            <div style="font-size:10px;color:var(--text-tertiary);margin-top:6px">${c.biddingState === 'learning' ? '~45 conversions to Optimizing' : c.biddingState === 'limited' ? 'Budget or audience too narrow' : 'Fully optimized'}</div>
          </div>
          <div class="detail-stat-card">
            <div class="detail-stat-label">Impressions</div>
            <div class="detail-stat-value">${fmtNum(c.impressions)}</div>
          </div>
          <div class="detail-stat-card">
            <div class="detail-stat-label">CVR</div>
            <div class="detail-stat-value">${c.cvr}%</div>
          </div>
        </div>
      `;
      // Wire detail chart time pills
      setTimeout(() => {
        const detailPills = container.querySelectorAll('.detail-chart-area .filter-pill');
        detailPills.forEach(pill => {
          pill.addEventListener('click', () => {
            detailPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const is30d = pill.textContent.trim() === '30D';
            const chartSvg = container.querySelector('.detail-chart-area svg');
            if (!chartSvg) return;
            let spendData;
            if (is30d) {
              // Aggregate daily into 4 weekly points
              const weeklySpend = [];
              for (let w = 0; w < 4; w++) {
                let wk = 0;
                for (let d = 0; d < 7; d++) wk += c.dailySpend[d % c.dailySpend.length] * (0.9 + Math.random() * 0.2);
                weeklySpend.push(Math.round(wk));
              }
              spendData = weeklySpend;
            } else {
              spendData = c.dailySpend;
            }
            const n = spendData.length;
            const maxV = Math.max(...spendData);
            const w = 460, h = 120;
            const pts = spendData.map((v, i) => `${i * w / (n - 1)},${h - (v / maxV) * (h - 10)}`).join(' ');
            const fillPts = pts + ` ${w},${h} 0,${h}`;
            const dots = spendData.map((v, i) => `<use href="#rDotDetail" x="${i * w / (n - 1) - 5}" y="${h - (v / maxV) * (h - 10) - 5}" width="10" height="10" color="var(--beetroot)"/>`).join('');
            chartSvg.innerHTML = `<defs><symbol id="rDotDetail" viewBox="0 0 12 12"><path d="M0 10 L2.5 0 L5 10 L7.5 0 L10 10 L8.5 10 L7.5 3 L5 10 L2.5 3 L1.5 10 Z" fill="currentColor"/></symbol><linearGradient id="detailGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--beetroot)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--beetroot)" stop-opacity="0"/></linearGradient></defs><polygon points="${fillPts}" fill="url(#detailGrad)"/><polyline points="${pts}" fill="none" stroke="var(--beetroot)" stroke-width="2" stroke-linecap="round" class="chart-line-animate"/>${dots}`;
          });
        });
      }, 0);
    } else if (tab === 'adsets') {
      const adSetNames = ['Broad — Women 25-45', 'Lookalike — Streaming Subs'];
      container.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
          <span style="font-size:12px;color:var(--text-tertiary)">CBO Enabled — budget distributed automatically</span>
          <button class="btn btn-xs btn-primary btn-pill" onclick="RoktAds.toast('Add Ad Set modal coming soon','info')">+ Add Ad Set</button>
        </div>
        ${Array.from({length: Math.min(c.adSets, 2)}, (_, i) => `
          <div class="adset-card">
            <div class="adset-card-header">
              <span class="adset-name">${adSetNames[i] || 'Ad Set ' + (i+1)}</span>
              <span class="badge badge-${c.status === 'active' ? 'positive' : 'gray'}">${capitalize(c.status)}</span>
            </div>
            <div class="adset-meta">
              <span class="adset-meta-item">Audience: ${audiences[i]?.name || 'Custom'}</span>
            </div>
            <div class="adset-meta" style="margin-top:8px">
              <span class="adset-meta-item">Bid: Smart Bidding (${c.objective})</span>
              <span class="adset-meta-item">Creatives: ${Math.ceil(c.creatives/2)}</span>
            </div>
          </div>
        `).join('')}
        ${c.adSets === 0 ? '<div class="empty-state"><div class="empty-state-icon">📦</div><div class="empty-state-title">No Ad Sets</div><div class="empty-state-desc">This campaign is in draft. Add ad sets to start.</div></div>' : ''}
      `;
    } else if (tab === 'creatives') {
      const campaignCreatives = creatives.filter(cr => c.name.toLowerCase().includes(cr.campaign.toLowerCase()));
      container.innerHTML = `
        <div class="creative-mini-grid">
          ${campaignCreatives.map(cr => `
            <div class="creative-mini-card" onclick="location.hash='creatives'">
              <div class="creative-mini-name">${cr.name}</div>
              <span class="badge badge-gray" style="margin-bottom:8px">${cr.format}</span>
              <div class="creative-mini-metrics">
                <span>CTR: ${cr.ctr}%</span>
                <span>CVR: ${cr.cvr}%</span>
                <span>CoPI: ${cr.copi}%</span>
              </div>
            </div>
          `).join('')}
          ${campaignCreatives.length === 0 ? '<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🎨</div><div class="empty-state-title">No Creatives</div></div>' : ''}
        </div>
      `;
    } else if (tab === 'analytics') {
      container.innerHTML = `
        <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:12px">Quick Analytics — Campaign-level breakdown</div>
        <table class="data-table">
          <thead><tr><th>METRIC</th><th>VALUE</th><th>VS TARGET</th><th>TREND</th></tr></thead>
          <tbody>
            <tr><td>Spend</td><td class="mono">$${fmtNum(c.spend)}</td><td class="mono">$${fmtNum(c.budget)} budget</td><td>${Math.round(c.spend/c.budget*100)}% paced</td></tr>
            <tr><td>CPA</td><td class="mono">$${c.cpa.toFixed(2)}</td><td class="mono" style="color:${c.cpaTarget && c.cpa > c.cpaTarget ? 'var(--negative)' : 'var(--positive)'}">Target: ${c.cpaTarget ? '$'+c.cpaTarget.toFixed(2) : 'N/A'}</td><td>${c.trendDir === 'up' ? '↑ Improving' : c.trendDir === 'down' ? '↓ Declining' : '→ Stable'}</td></tr>
            <tr><td>CoPI</td><td class="mono">${c.copi}%</td><td>—</td><td>${c.trendDir === 'up' ? '↑' : c.trendDir === 'down' ? '↓' : '→'}</td></tr>
            <tr><td>ROAS</td><td class="mono">${c.roas}x</td><td>—</td><td>—</td></tr>
            <tr><td>CTR</td><td class="mono">${c.ctr}%</td><td>—</td><td>—</td></tr>
            <tr><td>CVR</td><td class="mono">${c.cvr}%</td><td>—</td><td>—</td></tr>
            <tr><td>Integration Health</td><td class="mono" style="color:${c.integrationHealth >= 7 ? 'var(--positive)' : c.integrationHealth >= 5 ? 'var(--warning)' : 'var(--negative)'}">${c.integrationHealth}/10</td><td>—</td><td>—</td></tr>
          </tbody>
        </table>
      `;
    } else if (tab === 'nurture') {
      container.innerHTML = `
        <div style="text-align:center;padding:var(--space-6)">
          <div style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:var(--radius-pill);background:rgba(194,0,117,0.08);color:var(--beetroot);font-size:11px;font-weight:500;margin-bottom:var(--space-4)">AI-Powered Nurture Journeys</div>
          <div class="nurture-flow" style="display:flex;flex-direction:column;align-items:center;gap:0;margin:var(--space-4) auto;max-width:360px">
            <div class="nurture-node" style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:12px 16px;width:100%;text-align:left">
              <div style="font-weight:600;font-size:12px">Welcome Email</div>
              <div style="font-size:11px;color:var(--text-tertiary);margin-top:2px">Sent immediately after positive interaction</div>
            </div>
            <div style="width:2px;height:20px;background:var(--border)"></div>
            <div style="width:8px;height:8px;border-left:2px solid var(--border);border-bottom:2px solid var(--border);transform:rotate(-45deg);margin-top:-6px"></div>
            <div class="nurture-node" style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:12px 16px;width:100%;text-align:left;margin-top:4px">
              <div style="font-weight:600;font-size:12px">Wait 3 Days</div>
              <div style="font-size:11px;color:var(--text-tertiary);margin-top:2px">Allow time for initial conversion</div>
            </div>
            <div style="width:2px;height:20px;background:var(--border)"></div>
            <div style="width:8px;height:8px;border-left:2px solid var(--border);border-bottom:2px solid var(--border);transform:rotate(-45deg);margin-top:-6px"></div>
            <div class="nurture-node" style="background:rgba(194,0,117,0.06);border:1px solid var(--beetroot);border-radius:var(--radius-lg);padding:12px 16px;width:100%;text-align:left;margin-top:4px">
              <div style="font-weight:600;font-size:12px;color:var(--beetroot)">AI Follow-Up</div>
              <div style="font-size:11px;color:var(--text-tertiary);margin-top:2px">Personalized message based on engagement signals</div>
            </div>
            <div style="width:2px;height:20px;background:var(--border)"></div>
            <div style="width:8px;height:8px;border-left:2px solid var(--border);border-bottom:2px solid var(--border);transform:rotate(-45deg);margin-top:-6px"></div>
            <div class="nurture-node" style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:12px 16px;width:100%;text-align:left;margin-top:4px">
              <div style="font-weight:600;font-size:12px">Wait 7 Days</div>
              <div style="font-size:11px;color:var(--text-tertiary);margin-top:2px">Final conversion window</div>
            </div>
            <div style="width:2px;height:20px;background:var(--border)"></div>
            <div style="width:8px;height:8px;border-left:2px solid var(--border);border-bottom:2px solid var(--border);transform:rotate(-45deg);margin-top:-6px"></div>
            <div class="nurture-node" style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:12px 16px;width:100%;text-align:left;margin-top:4px">
              <div style="font-weight:600;font-size:12px">Final Offer</div>
              <div style="font-size:11px;color:var(--text-tertiary);margin-top:2px">Last-chance incentive with deadline</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="margin-top:var(--space-4)" onclick="RoktAds.toast('Nurture journey builder coming soon','info')">+ Add Step</button>
        </div>`;
    }
  }

  function switchDetailTab(tab) {
    const c = campaigns.find(x => x.id === selectedCampaign);
    if (!c) return;
    $$('.detail-tab').forEach(t => t.classList.remove('active'));
    const tabBtn = document.querySelector(`.detail-tab[data-tab="${tab}"]`);
    if (tabBtn) tabBtn.classList.add('active');
    renderCampaignTab(tab, c);
  }

  function closeCampaignDetail() {
    selectedCampaign = null;
    const panel = document.getElementById('campaignDetailPanel');
    if (panel) panel.classList.remove('open');
    $$('.campaigns-table-wrap tr').forEach(r => r.classList.remove('selected'));
  }

  // ── Campaign Builder ──────────────────────────────────────
  function initBuilder() {
    builderStep = 1;
    builderData = { ...defaultBuilderData, headlines: ['', '', ''], descriptions: ['', ''], audienceSignals: [], selectedPartners: [], placementTypes: [] };
    campaignMode = 'autopilot';
    builderData.mode = 'autopilot';
    renderBuilderStepIndicator();
    updateBuilderStep();

    const nextBtn = document.getElementById('builderNext');
    const prevBtn = document.getElementById('builderPrev');
    if (nextBtn) nextBtn.addEventListener('click', () => {
      const maxSteps = campaignMode === 'autopilot' ? 3 : 5;
      if (builderStep < maxSteps) {
        builderStep++;
        updateBuilderStep();
      } else {
        launchCampaign();
      }
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (builderStep > 1) {
        builderStep--;
        updateBuilderStep();
      }
    });
  }

  function setCampaignMode(mode) {
    campaignMode = mode;
    builderData.mode = mode;
    builderStep = 1;
    renderBuilderStepIndicator();
    updateBuilderStep();
  }

  function renderBuilderStepIndicator() {
    const container = document.getElementById('builderSteps');
    if (!container) return;
    const steps = campaignMode === 'autopilot'
      ? [{ n: 1, label: 'Goal' }, { n: 2, label: 'Assets' }, { n: 3, label: 'Launch' }]
      : [{ n: 1, label: 'Goal' }, { n: 2, label: 'Setup' }, { n: 3, label: 'Strategy' }, { n: 4, label: 'Creative' }, { n: 5, label: 'Review' }];
    container.innerHTML = steps.map((s, i) => {
      let html = `<div class="builder-step ${s.n === builderStep ? 'active' : ''} ${s.n < builderStep ? 'completed' : ''}" data-step="${s.n}"><span class="step-number">${s.n}</span><span class="step-label">${s.label}</span></div>`;
      if (i < steps.length - 1) html += '<div class="builder-step-line"></div>';
      return html;
    }).join('');
  }

  function calculateAdStrength() {
    let score = 0;
    // Headlines (25 pts for 3+)
    const filledHeadlines = (builderData.headlines || []).filter(h => h.trim().length > 0).length;
    if (filledHeadlines >= 3) score += 25;
    else if (filledHeadlines >= 2) score += 15;
    else if (filledHeadlines >= 1) score += 8;
    // Descriptions (25 pts for 2+)
    const filledDescs = (builderData.descriptions || []).filter(d => d.trim().length > 0).length;
    if (filledDescs >= 2) score += 25;
    else if (filledDescs >= 1) score += 12;
    // CTA (25 pts)
    if (campaignMode === 'autopilot') {
      if ((builderData.autoCta || '').trim().length > 0) score += 25;
    } else {
      if ((builderData.creativeCta || '').trim().length > 0) score += 25;
    }
    // Image (25 pts)
    if (builderData.autoImage) score += 25;
    return Math.min(score, 100);
  }

  function renderAdStrengthGauge() {
    const score = calculateAdStrength();
    let level, cls;
    if (score <= 25) { level = 'Poor'; cls = 'strength-poor'; }
    else if (score <= 50) { level = 'Average'; cls = 'strength-average'; }
    else if (score <= 75) { level = 'Good'; cls = 'strength-good'; }
    else { level = 'Excellent'; cls = 'strength-excellent'; }

    const filledHeadlines = (builderData.headlines || []).filter(h => h.trim().length > 0).length;
    const filledDescs = (builderData.descriptions || []).filter(d => d.trim().length > 0).length;
    const hasCta = campaignMode === 'autopilot' ? (builderData.autoCta || '').trim().length > 0 : (builderData.creativeCta || '').trim().length > 0;
    const hasImage = builderData.autoImage;

    return `
      <div class="ad-strength-gauge">
        <div class="ad-strength-header">
          <span class="ad-strength-label">Ad Strength</span>
          <span class="ad-strength-score" style="color:${score <= 25 ? 'var(--negative)' : score <= 50 ? 'var(--warning)' : score <= 75 ? '#EAB308' : 'var(--positive)'}">${level}</span>
        </div>
        <div class="ad-strength-bar">
          <div class="ad-strength-bar-fill ${cls}" style="width:${score}%"></div>
        </div>
        <div class="ad-strength-tips">
          <span class="ad-strength-tip ${filledHeadlines >= 3 ? 'filled' : ''}">${filledHeadlines >= 3 ? '&#10003;' : '+'} 3 Headlines</span>
          <span class="ad-strength-tip ${filledDescs >= 2 ? 'filled' : ''}">${filledDescs >= 2 ? '&#10003;' : '+'} 2 Descriptions</span>
          <span class="ad-strength-tip ${hasCta ? 'filled' : ''}">${hasCta ? '&#10003;' : '+'} CTA</span>
          <span class="ad-strength-tip ${hasImage ? 'filled' : ''}">${hasImage ? '&#10003;' : '+'} Image</span>
        </div>
      </div>`;
  }

  // Helper: persist form field to builderData
  function persistField(field, value) {
    if (field.includes('.')) {
      const parts = field.split('.');
      let obj = builderData;
      for (let i = 0; i < parts.length - 1; i++) {
        obj = obj[isNaN(parts[i]) ? parts[i] : parseInt(parts[i])];
      }
      obj[parts[parts.length - 1]] = value;
    } else {
      builderData[field] = value;
    }
  }

  // Helper: toggle collapsible section
  function toggleSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.classList.toggle('collapsed');
  }

  // Helper: add ad set
  function addAdSet() {
    builderData.adSets.push({
      audience: audiences[builderData.adSets.length % audiences.length]?.id || 'a1',
      geoCountry: 'US', geoState: '', geoCity: '', geoZip: '',
      deviceDesktop: true, deviceMobile: true, deviceTablet: true,
      ageMin: 18, ageMax: 65, gender: 'all',
      suppressExisting: false, budgetOverride: '', targetingExpanded: false,
    });
    updateBuilderStep();
    toast(`Ad Set ${builderData.adSets.length} added`, 'success');
  }

  function removeAdSet(idx) {
    if (builderData.adSets.length <= 1) { toast('Must have at least 1 ad set', 'warning'); return; }
    builderData.adSets.splice(idx, 1);
    updateBuilderStep();
    toast('Ad set removed', 'info');
  }

  function toggleTargeting(idx) {
    builderData.adSets[idx].targetingExpanded = !builderData.adSets[idx].targetingExpanded;
    updateBuilderStep();
  }

  function selectBidStrategy(strategy) {
    builderData.bidStrategy = strategy;
    updateBuilderStep();
  }

  function simulateImageUpload() {
    toast('Image uploaded (simulated)', 'success');
    const zone = document.getElementById('imageUploadZone');
    if (zone) {
      zone.classList.add('has-image');
      zone.innerHTML = '<div style="font-size:48px">🖼️</div><div style="font-size:12px;color:var(--text-secondary)">brand-logo.png · 1080×565px</div>';
    }
  }

  function generateAICampaign() {
    const prompt = document.getElementById('aiCampaignPrompt')?.value || '';
    // Simulate AI filling out the whole campaign
    builderData = {
      ...defaultBuilderData,
      objective: 'cpa',
      aiPrompt: prompt,
      name: 'AI-Generated: Disney+ Q2 Acquisition',
      companyName: 'Disney+',
      brandUrl: 'https://www.disneyplus.com',
      measurementGroup: measurementGroups[0]?.name || '',
      dailyCap: 2500,
      monthlyCap: 75000,
      lifetimeCap: 150000,
      bidStrategy: 'smart',
      targetCpa: '7.00',
      adSets: [
        { audience: 'a1', geoCountry: 'US', geoState: '', geoCity: '', geoZip: '', deviceDesktop: true, deviceMobile: true, deviceTablet: true, ageMin: 25, ageMax: 45, gender: 'female', suppressExisting: true, budgetOverride: '', targetingExpanded: false },
        { audience: 'a2', geoCountry: 'US', geoState: '', geoCity: '', geoZip: '', deviceDesktop: true, deviceMobile: true, deviceTablet: false, ageMin: 18, ageMax: 34, gender: 'all', suppressExisting: true, budgetOverride: '', targetingExpanded: false },
      ],
      offerType: 'discount',
      offerValue: '30% off first month',
      offerCost: '$4.99',
      landingPageUrl: 'https://www.disneyplus.com/offer?utm_source=rokt',
      couponCode: 'ROKT30',
      creativeTitle: 'Stream for Less!',
      creativeBody: 'Get 30% off your first month of Disney+. Watch thousands of movies and shows.',
      creativeCta: 'Start Streaming',
      calloutPromotion: '30% OFF',
      calloutSocial: '50M+ subscribers',
      calloutGuarantee: 'Cancel anytime',
    };
    builderStep = 5;
    updateBuilderStep();
    toast('AI configured your campaign — review below', 'success');
  }

  // Objective labels map
  const objectiveLabels = {
    cpa: 'Customer Acquisition',
    roas: 'Revenue Growth / ROAS',
    app: 'App Installs',
    dpa: 'Product Sales (DPA)',
    leads: 'Email Subscription',
    embed: 'Embedded Actions',
    website_traffic: 'Website Traffic',
    email: 'Email Subscription',
    app_download: 'App Download',
    product_sales: 'Product Sales',
    brand_campaign: 'Brand Campaign',
    add_to_cart: 'Add to Cart',
    payment_trigger: 'Payment Trigger',
    calendar: 'Calendar Subscription',
    cross_sell: 'Cross-Sell',
    promotion: 'Promotion',
    customer_feedback: 'Customer Feedback',
    integrated_app: 'Integrated Application',
    shoppable_ad: 'Shoppable Ad',
    phone: 'Phone Lead',
  };

  function updateBuilderStep() {
    // Clear placeholder cycling
    if (placeholderInterval) { clearInterval(placeholderInterval); placeholderInterval = null; }

    // Update step indicators
    renderBuilderStepIndicator();

    const maxSteps = campaignMode === 'autopilot' ? 3 : 5;

    // Update buttons
    const prevBtn = document.getElementById('builderPrev');
    const nextBtn = document.getElementById('builderNext');
    if (prevBtn) prevBtn.style.visibility = builderStep > 1 ? 'visible' : 'hidden';
    if (nextBtn) nextBtn.innerHTML = builderStep === maxSteps ? '🚀 Launch Campaign' : 'Next →';

    const content = document.getElementById('builderContent');
    if (!content) return;

    if (campaignMode === 'autopilot') {
      if (builderStep === 1) {
        content.innerHTML = renderBuilderStep1();
        initStep1Placeholders();
      } else if (builderStep === 2) {
        content.innerHTML = renderAutopilotStep2();
      } else if (builderStep === 3) {
        content.innerHTML = renderAutopilotStep3();
      }
    } else {
      // Advanced mode — original 5 steps
      if (builderStep === 1) {
        content.innerHTML = renderBuilderStep1();
        initStep1Placeholders();
      } else if (builderStep === 2) {
        content.innerHTML = renderBuilderStep2();
      } else if (builderStep === 3) {
        content.innerHTML = renderBuilderStep3();
      } else if (builderStep === 4) {
        content.innerHTML = renderBuilderStep4();
        initBuilderStep4Preview();
      } else if (builderStep === 5) {
        content.innerHTML = renderBuilderStep5();
      }
    }
  }

  function initStep1Placeholders() {
    const promptEl = document.getElementById('aiCampaignPrompt');
    if (promptEl) {
      const placeholders = [
        'Acquire Disney+ subscribers at $7 CPA targeting women 25-45...',
        'Drive app installs for my fintech app, $3 per install...',
        'Maximize ROAS on my product catalog with dynamic ads...',
        'Get email signups for our newsletter at scale, US only...',
        'Promote free shipping offer to mobile users under $5 CPA...',
      ];
      let pIdx = 0;
      placeholderInterval = setInterval(() => {
        pIdx = (pIdx + 1) % placeholders.length;
        promptEl.style.opacity = '0';
        setTimeout(() => {
          promptEl.placeholder = placeholders[pIdx];
          promptEl.style.opacity = '1';
        }, 200);
      }, 3000);
      promptEl.style.transition = 'opacity 200ms';
    }
  }

  // ── Builder Step Renderers ──────────────────────────────────

  function renderBuilderStep1() {
    const objectives = [
      { id: 'website_traffic', icon: '🌐', title: 'Website Traffic', desc: 'Drive visitors to your site' },
      { id: 'email', icon: '✉️', title: 'Email Subscription', desc: 'Grow your email list' },
      { id: 'app_download', icon: '📱', title: 'App Download', desc: 'Drive app installs (iOS & Android)' },
      { id: 'product_sales', icon: '🛒', title: 'Product Sales', desc: 'Drive purchases with dynamic catalog ads' },
      { id: 'brand_campaign', icon: '✨', title: 'Brand Campaign', desc: 'Build awareness and consideration' },
      { id: 'add_to_cart', icon: '🛍️', title: 'Add to Cart', desc: 'Drive product additions and cross-sells' },
    ];
    const moreObjectives = [
      { id: 'payment_trigger', icon: '💳', title: 'Payment Trigger', desc: 'Activate at payment moment' },
      { id: 'calendar', icon: '📅', title: 'Calendar Subscription', desc: 'Drive calendar event sign-ups' },
      { id: 'cross_sell', icon: '🔄', title: 'Cross-Sell', desc: 'Recommend complementary products' },
      { id: 'promotion', icon: '🎁', title: 'Promotion', desc: 'Distribute promotions and offers' },
      { id: 'customer_feedback', icon: '💬', title: 'Customer Feedback', desc: 'Collect reviews and feedback' },
      { id: 'integrated_app', icon: '🔗', title: 'Integrated Application', desc: 'Custom app integration' },
      { id: 'shoppable_ad', icon: '🏷️', title: 'Shoppable Ad', desc: 'Interactive product catalog ads' },
      { id: 'phone', icon: '📞', title: 'Phone Lead', desc: 'Collect phone number leads' },
    ];
    return `<div class="builder-content-inner">
      <div class="mode-selector">
        <div class="mode-card ${campaignMode === 'autopilot' ? 'selected' : ''}" data-mode="autopilot" onclick="RoktAds.setCampaignMode('autopilot')">
          <div class="mode-icon">&#10024;</div>
          <div class="mode-title">Autopilot</div>
          <div class="mode-desc">AI handles targeting, bidding, and placements. You provide creative assets and budget.</div>
          <div class="mode-badge">Recommended</div>
        </div>
        <div class="mode-card ${campaignMode === 'advanced' ? 'selected' : ''}" data-mode="advanced" onclick="RoktAds.setCampaignMode('advanced')">
          <div class="mode-icon">&#9889;</div>
          <div class="mode-title">Advanced</div>
          <div class="mode-desc">Full control over every setting. For experienced media buyers.</div>
        </div>
      </div>

      <div class="ai-hero-section">
        <div class="ai-hero-label"><svg width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="var(--beetroot)" stroke-width="1.5"><path d="M11 2L13.5 8.5L20 11L13.5 13.5L11 20L8.5 13.5L2 11L8.5 8.5L11 2Z"/></svg> Describe your campaign</div>
        <div class="ai-hero-input-wrap">
          <textarea id="aiCampaignPrompt" class="ai-hero-textarea" rows="2" placeholder="Acquire Disney+ subscribers at $7 CPA targeting women 25-45..." oninput="RoktAds.persistField('aiPrompt', this.value)">${builderData.aiPrompt}</textarea>
          <button class="ai-hero-generate-btn" onclick="RoktAds.generateAICampaign()">
            <svg width="14" height="14" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 2L13.5 8.5L20 11L13.5 13.5L11 20L8.5 13.5L2 11L8.5 8.5L11 2Z"/></svg>
            Generate Campaign
          </button>
        </div>
        <div class="ai-hero-hint">AI will configure objective, targeting, budget, creative, and offer — skip straight to Review</div>
      </div>

      <div class="builder-divider">
        <span>Or choose your objective</span>
      </div>

      <div class="objective-grid">
        ${objectives.map(o => `
          <div class="objective-card ${builderData.objective === o.id ? 'selected' : ''}" data-objective-id="${o.id}" onclick="RoktAds.selectObjective('${o.id}')">
            <span class="objective-icon">${o.icon}</span>
            <div class="objective-name">${o.title}</div>
            <div class="objective-desc">${o.desc}</div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:20px">
        <button class="btn btn-ghost" style="width:100%;font-size:12px" onclick="document.getElementById('moreObjectivesGrid').style.display = document.getElementById('moreObjectivesGrid').style.display === 'none' ? 'grid' : 'none'; this.querySelector('span').textContent = document.getElementById('moreObjectivesGrid').style.display === 'none' ? '▸ More objectives (${moreObjectives.length})' : '▾ More objectives (${moreObjectives.length})'">
          <span>▸ More objectives (${moreObjectives.length})</span>
        </button>
        <div class="objective-grid" id="moreObjectivesGrid" style="display:none;margin-top:12px;grid-template-columns:repeat(4, 1fr)">
          ${moreObjectives.map(o => `
            <div class="objective-card ${builderData.objective === o.id ? 'selected' : ''}" data-objective-id="${o.id}" onclick="RoktAds.selectObjective('${o.id}')" style="padding:12px">
              <span class="objective-icon" style="font-size:20px">${o.icon}</span>
              <div class="objective-name" style="font-size:11px">${o.title}</div>
              <div class="objective-desc" style="font-size:10px">${o.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
  }

  function renderBuilderStep2() {
    return `<div class="builder-content-inner">
      <h3 style="margin-bottom:4px">Campaign Setup</h3>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:24px">Configure the basics — name, schedule, budget, and policies.</p>
      <div class="builder-form">
        <div class="builder-section">
          <div class="builder-section-label">Campaign Details</div>
          <div class="form-group">
            <label class="form-label">Campaign Name</label>
            <input type="text" class="form-input" value="${builderData.name || 'My New Campaign'}" placeholder="e.g. US | Customer Acquisition | Q2 2026" oninput="RoktAds.persistField('name', this.value)">
            <div class="form-hint">Recommended format: [Country] | [Objective] | [Timeframe]</div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Company Name</label>
              <input type="text" class="form-input" value="${builderData.companyName}" placeholder="Your company name" oninput="RoktAds.persistField('companyName', this.value)">
            </div>
            <div class="form-group">
              <label class="form-label">Brand URL</label>
              <input type="url" class="form-input" value="${builderData.brandUrl}" placeholder="https://www.example.com" oninput="RoktAds.persistField('brandUrl', this.value)">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Measurement Group</label>
              <select class="form-select" onchange="RoktAds.persistField('measurementGroup', this.value)">
                <option value="">Create New Measurement Group</option>
                ${measurementGroups.map(mg => `<option value="${mg.name}" ${builderData.measurementGroup === mg.name ? 'selected' : ''}>${mg.name} (Health: ${mg.integrationHealth})</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Referral Exclusion Period</label>
              <select class="form-select" onchange="RoktAds.persistField('referralExclusion', this.value)">
                ${['1', '7', '14', '30', '90'].map(d => `<option value="${d}" ${builderData.referralExclusion === d ? 'selected' : ''}>${d} day${d !== '1' ? 's' : ''}</option>`).join('')}
              </select>
              <div class="form-hint">Time before the same customer sees this offer again</div>
            </div>
          </div>
        </div>

        <div class="builder-section">
          <h3 class="builder-section-label">Region & Language</h3>
          <p style="margin-bottom:12px;font-size:11px;color:var(--text-tertiary)">Set during account creation. Contact support to change.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
            <div class="form-group">
              <label class="form-label">Country <span style="color:var(--text-tertiary);font-size:10px">Locked</span></label>
              <select class="form-select" disabled style="opacity:0.7">
                <option selected>United States</option><option>United Kingdom</option><option>Australia</option><option>Canada</option><option>Germany</option><option>France</option><option>Japan</option><option>Singapore</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Language <span style="color:var(--text-tertiary);font-size:10px">Locked</span></label>
              <select class="form-select" disabled style="opacity:0.7">
                <option selected>English</option><option>Spanish</option><option>French</option><option>German</option><option>Japanese</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Timezone <span style="color:var(--text-tertiary);font-size:10px">Locked</span></label>
              <select class="form-select" disabled style="opacity:0.7">
                <option selected>America/New_York (EST)</option><option>America/Los_Angeles (PST)</option><option>Europe/London (GMT)</option><option>Asia/Tokyo (JST)</option><option>Australia/Sydney (AEST)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="builder-section">
          <div class="builder-section-label">Schedule</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Start Date</label>
              <input type="date" class="form-input" value="${builderData.startDate}" oninput="RoktAds.persistField('startDate', this.value)">
            </div>
            <div class="form-group">
              <label class="form-label">End Date (Optional)</label>
              <input type="date" class="form-input" value="${builderData.endDate}" oninput="RoktAds.persistField('endDate', this.value)">
              <div class="form-hint">Leave blank to run until budget is exhausted</div>
            </div>
          </div>
        </div>

        <div class="builder-section">
          <div class="builder-section-label">Budget</div>
          <div class="form-row" style="grid-template-columns:1fr 1fr 1fr">
            <div class="form-group">
              <label class="form-label">Daily Cap</label>
              <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" class="form-input mono" value="${builderData.dailyCap}" placeholder="0" oninput="RoktAds.persistField('dailyCap', Number(this.value))"></div>
            </div>
            <div class="form-group">
              <label class="form-label">Monthly Cap</label>
              <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" class="form-input mono" value="${builderData.monthlyCap || ''}" placeholder="Optional" oninput="RoktAds.persistField('monthlyCap', Number(this.value))"></div>
            </div>
            <div class="form-group">
              <label class="form-label">Lifetime Cap</label>
              <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" class="form-input mono" value="${builderData.lifetimeCap}" placeholder="0" oninput="RoktAds.persistField('lifetimeCap', Number(this.value))"></div>
            </div>
          </div>
          <div class="budget-visual">
            <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:8px">Projected Spend</div>
            <div class="budget-bar">
              <div class="budget-bar-segment budget-bar-daily" style="flex:${builderData.dailyCap || 1}">Daily: $${fmtNum(builderData.dailyCap)}/day</div>
              ${builderData.monthlyCap ? `<div class="budget-bar-segment budget-bar-monthly" style="flex:${builderData.monthlyCap / 30}">Monthly: $${fmtNum(builderData.monthlyCap)}</div>` : ''}
              <div class="budget-bar-segment budget-bar-lifetime" style="flex:${(builderData.lifetimeCap || 1) / 30}">Lifetime: $${fmtNum(builderData.lifetimeCap)}</div>
            </div>
          </div>
        </div>

        <div class="builder-section collapsible" id="policySection">
          <div class="builder-section-label clickable" onclick="RoktAds.toggleSection('policySectionBody')">
            Policy Links <span class="section-chevron">▸</span>
            <span style="font-weight:400;font-size:11px;color:var(--text-tertiary);margin-left:8px">Optional — Terms, Privacy, Disclaimer</span>
          </div>
          <div class="builder-section-body collapsed" id="policySectionBody">
            <div class="policy-row">
              <label class="form-label" style="display:flex;align-items:center;gap:8px">
                <input type="checkbox" class="form-checkbox" ${builderData.termsEnabled ? 'checked' : ''} onchange="RoktAds.persistField('termsEnabled', this.checked)"> Terms & Conditions
              </label>
              ${builderData.termsEnabled ? '<textarea class="form-textarea" rows="2" placeholder="Enter terms & conditions text..." oninput="RoktAds.persistField(\'termsText\', this.value)">' + builderData.termsText + '</textarea>' : ''}
            </div>
            <div class="policy-row">
              <label class="form-label" style="display:flex;align-items:center;gap:8px">
                <input type="checkbox" class="form-checkbox" ${builderData.privacyEnabled ? 'checked' : ''} onchange="RoktAds.persistField('privacyEnabled', this.checked)"> Privacy Policy
              </label>
            </div>
            <div class="policy-row">
              <label class="form-label" style="display:flex;align-items:center;gap:8px">
                <input type="checkbox" class="form-checkbox" ${builderData.disclaimerEnabled ? 'checked' : ''} onchange="RoktAds.persistField('disclaimerEnabled', this.checked)"> Disclaimer
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderSmartBiddingStrategies() {
    const strategies = [
      { id: 'scale_at_cpa', title: 'Scale at CPA Target', desc: 'Optimize bids to hit your target CPA while maximizing volume', icon: '🎯', input: 'cpa' },
      { id: 'maximize_conversions', title: 'Maximize Conversions', desc: 'Get the most conversions within your budget', icon: '📈', input: 'budget' },
      { id: 'balance', title: 'Balance Scale & Efficiency', desc: 'Find the optimal trade-off between volume and CPA', icon: '⚖️', input: 'cpa' },
      { id: 'scale_at_roas', title: 'Scale at ROAS Target', desc: 'Optimize for return on ad spend', icon: '💰', input: 'roas' },
      { id: 'learning', title: 'Learning Phase', desc: 'Auto-detected while AI gathers enough conversion data (30+)', icon: '🧠', input: 'none', disabled: true },
    ];
    const sel = builderData.bidStrategyDetail;
    let html = '<div style="margin-top:16px"><div style="font-size:12px;font-weight:600;margin-bottom:8px">Smart Bidding Strategy</div>';
    html += '<div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px">';
    strategies.forEach(ss => {
      const isSelected = sel === ss.id;
      const border = isSelected ? 'var(--beetroot)' : 'var(--border)';
      const bg = isSelected ? 'rgba(194,0,117,0.06)' : 'transparent';
      const cursor = ss.disabled ? 'opacity:0.5;cursor:not-allowed' : 'cursor:pointer';
      const onclick = ss.disabled ? '' : 'onclick="RoktAds.selectSmartStrategy(\'' + ss.id + '\')"';
      html += '<div style="padding:10px 12px;border-radius:var(--radius-lg);border:1px solid ' + border + ';' + cursor + ';background:' + bg + ';transition:all 150ms" ' + onclick + '>';
      html += '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><span style="font-size:16px">' + ss.icon + '</span><span style="font-size:11px;font-weight:600">' + ss.title + '</span></div>';
      html += '<div style="font-size:10px;color:var(--text-tertiary)">' + ss.desc + '</div>';
      if (ss.disabled) html += '<div style="font-size:9px;color:var(--text-tertiary);margin-top:4px;font-style:italic">Read-only indicator</div>';
      html += '</div>';
    });
    html += '</div></div>';

    // Show appropriate input based on selected sub-strategy
    if (sel === 'scale_at_cpa' || sel === 'balance' || !sel) {
      html += '<div class="form-group" style="margin-top:12px;max-width:240px"><label class="form-label">Target CPA</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" step="0.01" class="form-input mono" value="' + builderData.targetCpa + '" oninput="RoktAds.persistField(\'targetCpa\', this.value)"></div></div>';
    } else if (sel === 'maximize_conversions') {
      html += '<div class="form-group" style="margin-top:12px;max-width:240px"><label class="form-label">Budget Cap</label><div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" step="1" class="form-input mono" value="' + (builderData.lifetimeCap || '') + '" placeholder="Budget cap" oninput="RoktAds.persistField(\'lifetimeCap\', Number(this.value))"></div></div>';
    } else if (sel === 'scale_at_roas') {
      html += '<div class="form-group" style="margin-top:12px;max-width:240px"><label class="form-label">Target ROAS %</label><div class="input-prefix-wrap"><span class="input-prefix">%</span><input type="number" step="1" class="form-input mono" value="" placeholder="e.g. 400" oninput="RoktAds.persistField(\'targetRoas\', this.value)"></div></div>';
    }
    return html;
  }

  function selectSmartStrategy(id) {
    builderData.bidStrategyDetail = id;
    updateBuilderStep();
  }

  function renderBuilderStep3() {
    return `<div class="builder-content-inner">
      <h3 style="margin-bottom:4px">Strategy & Targeting</h3>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:24px">Choose your bid strategy and define ad sets with targeting.</p>

      <div class="builder-section">
        <div class="builder-section-label">Bid Strategy</div>
        <div class="bid-strategy-grid">
          ${[
            { id: 'smart', name: 'Smart Bidding', icon: '🤖', desc: 'AI optimizes bids per-customer using transaction intent signals', badge: 'Recommended', note: 'Requires 30+ conversions in past 30 days' },
            { id: 'budget_opt', name: 'Budget Optimization', icon: '📊', desc: 'Adjusts bids based on predicted transaction volumes and budget pacing', badge: '', note: 'Cannot be combined with Smart Bidding' },
            { id: 'manual', name: 'Manual Bidding', icon: '✋', desc: 'Set a fixed bid price per audience — full control', badge: '', note: '' },
          ].map(s => `
            <div class="bid-strategy-card ${builderData.bidStrategy === s.id ? 'selected' : ''}" onclick="RoktAds.selectBidStrategy('${s.id}')">
              <div class="bid-strategy-card-header">
                <span style="font-size:20px">${s.icon}</span>
                <div>
                  <div style="font-weight:600;font-size:13px">${s.name}</div>
                  ${s.badge ? `<span class="badge badge-wine" style="font-size:9px">${s.badge}</span>` : ''}
                </div>
                <span class="bid-strategy-radio">${builderData.bidStrategy === s.id ? '●' : '○'}</span>
              </div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:8px">${s.desc}</div>
              ${s.note ? `<div style="font-size:11px;color:var(--warning);margin-top:6px">⚠ ${s.note}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ${builderData.bidStrategy === 'smart' ? renderSmartBiddingStrategies() : ''}

        ${builderData.bidStrategy === 'manual' ? `
          <div class="form-group" style="margin-top:12px;max-width:240px">
            <label class="form-label">Bid Price (per referral)</label>
            <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" step="0.01" class="form-input mono" value="${builderData.manualBid}" placeholder="0.00" oninput="RoktAds.persistField('manualBid', this.value)"></div>
          </div>
        ` : ''}
      </div>

      <div class="builder-section" style="margin-top:20px">
        <div class="builder-section-label">Ad Sets</div>
        ${builderData.adSets.map((as, idx) => {
          const aud = audiences.find(a => a.id === as.audience) || audiences[0];
          return `
          <div class="strategy-card" style="margin-bottom:12px">
            <div class="strategy-card-header">
              <span style="font-weight:600">Ad Set ${idx + 1}${idx === 0 ? ' — Primary' : ''}</span>
              <div style="display:flex;gap:8px;align-items:center">
                <span class="badge badge-positive">Active</span>
                ${idx > 0 ? `<button class="btn btn-xs btn-ghost" style="color:var(--negative)" onclick="RoktAds.removeAdSet(${idx})">Remove</button>` : ''}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Audience</label>
              <select class="form-select" onchange="RoktAds.persistField('adSets.${idx}.audience', this.value)">
                ${audiences.map(a => `<option value="${a.id}" ${as.audience === a.id ? 'selected' : ''}>${a.icon} ${a.name} (${a.size})</option>`).join('')}
              </select>
            </div>

            <button class="btn btn-xs btn-ghost" onclick="RoktAds.toggleTargeting(${idx})" style="margin:8px 0">
              ${as.targetingExpanded ? '▾' : '▸'} Customize Targeting
            </button>

            ${as.targetingExpanded ? `
              <div class="targeting-panel">
                <div class="form-row" style="grid-template-columns:1fr 1fr">
                  <div class="form-group">
                    <label class="form-label">Country</label>
                    <select class="form-select" onchange="RoktAds.persistField('adSets.${idx}.geoCountry', this.value)">
                      ${['US', 'UK', 'AU', 'CA', 'DE', 'FR'].map(c => `<option value="${c}" ${as.geoCountry === c ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">State / Region</label>
                    <input type="text" class="form-input" value="${as.geoState}" placeholder="e.g. CA, NY" oninput="RoktAds.persistField('adSets.${idx}.geoState', this.value)">
                  </div>
                </div>
                <div class="form-row" style="grid-template-columns:1fr 1fr">
                  <div class="form-group">
                    <label class="form-label">City</label>
                    <input type="text" class="form-input" value="${as.geoCity}" placeholder="Optional" oninput="RoktAds.persistField('adSets.${idx}.geoCity', this.value)">
                  </div>
                  <div class="form-group">
                    <label class="form-label">ZIP / Postal Codes</label>
                    <input type="text" class="form-input" value="${as.geoZip}" placeholder="Comma-separated" oninput="RoktAds.persistField('adSets.${idx}.geoZip', this.value)">
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Devices</label>
                  <div class="device-checkbox-group">
                    <label class="device-check"><input type="checkbox" ${as.deviceDesktop ? 'checked' : ''} onchange="RoktAds.persistField('adSets.${idx}.deviceDesktop', this.checked)"> Desktop</label>
                    <label class="device-check"><input type="checkbox" ${as.deviceMobile ? 'checked' : ''} onchange="RoktAds.persistField('adSets.${idx}.deviceMobile', this.checked)"> Mobile</label>
                    <label class="device-check"><input type="checkbox" ${as.deviceTablet ? 'checked' : ''} onchange="RoktAds.persistField('adSets.${idx}.deviceTablet', this.checked)"> Tablet</label>
                  </div>
                </div>
                <div class="form-row" style="grid-template-columns:1fr 1fr 1fr">
                  <div class="form-group">
                    <label class="form-label">Age Min</label>
                    <input type="number" class="form-input mono" value="${as.ageMin}" min="13" max="65" oninput="RoktAds.persistField('adSets.${idx}.ageMin', Number(this.value))">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Age Max</label>
                    <input type="number" class="form-input mono" value="${as.ageMax}" min="13" max="65" oninput="RoktAds.persistField('adSets.${idx}.ageMax', Number(this.value))">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Gender</label>
                    <select class="form-select" onchange="RoktAds.persistField('adSets.${idx}.gender', this.value)">
                      <option value="all" ${as.gender === 'all' ? 'selected' : ''}>All</option>
                      <option value="male" ${as.gender === 'male' ? 'selected' : ''}>Male</option>
                      <option value="female" ${as.gender === 'female' ? 'selected' : ''}>Female</option>
                    </select>
                  </div>
                </div>
              </div>
            ` : ''}

            <div class="form-row" style="margin-top:8px">
              <div class="form-group">
                <label class="form-label" style="display:flex;align-items:center;gap:8px">
                  <input type="checkbox" class="form-checkbox" ${as.suppressExisting ? 'checked' : ''} onchange="RoktAds.persistField('adSets.${idx}.suppressExisting', this.checked)"> Suppress existing customers
                </label>
              </div>
              <div class="form-group">
                <label class="form-label">Budget Override</label>
                <input type="text" class="form-input mono" value="${as.budgetOverride}" placeholder="Inherit from campaign" oninput="RoktAds.persistField('adSets.${idx}.budgetOverride', this.value)">
              </div>
            </div>
          </div>`;
        }).join('')}
        <button class="btn btn-ghost" onclick="RoktAds.addAdSet()" style="margin-top:8px">+ Add Another Ad Set</button>
      </div>

      ${renderInventorySection()}
    </div>`;
  }

  function renderBuilderStep4() {
    const titleLen = builderData.creativeTitle.length;
    const bodyLen = builderData.creativeBody.length;
    const combinedLen = titleLen + bodyLen;
    const ctaLen = builderData.creativeCta.length;

    return `<div class="builder-content-inner builder-step4-layout">
      <div class="builder-step4-forms">
        <h3 style="margin-bottom:4px">Offers & Creatives</h3>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px">What will people see? Create your offer and design creatives.</p>

        <div class="builder-section">
          <div class="builder-section-label">Offer</div>
          <div class="form-group">
            <label class="form-label">Offer Type</label>
            <select class="form-select" onchange="RoktAds.persistField('offerType', this.value)">
              ${[['discount','🏷️ Discount'],['trial','🆓 Free Trial'],['cashback','💰 Cashback'],['shipping','📦 Free Shipping'],['product','🛍️ Product']].map(([v,l]) =>
                `<option value="${v}" ${builderData.offerType === v ? 'selected' : ''}>${l}</option>`
              ).join('')}
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Offer Value</label>
              <input type="text" class="form-input" value="${builderData.offerValue}" placeholder="e.g. 30% off, $10 credit" oninput="RoktAds.persistField('offerValue', this.value)">
            </div>
            <div class="form-group">
              <label class="form-label">Cost to Advertiser</label>
              <input type="text" class="form-input mono" value="${builderData.offerCost}" placeholder="$0.00" oninput="RoktAds.persistField('offerCost', this.value)">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Landing Page URL <span style="color:var(--negative)">*</span></label>
            <input type="url" class="form-input" value="${builderData.landingPageUrl}" placeholder="https://www.example.com/offer" oninput="RoktAds.persistField('landingPageUrl', this.value)">
            <div class="form-hint">Must be HTTPS. Must match the offer described in creative.</div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Coupon Code</label>
              <input type="text" class="form-input mono" value="${builderData.couponCode}" placeholder="Optional" oninput="RoktAds.persistField('couponCode', this.value)">
            </div>
            <div class="form-group">
              <label class="form-label">Validity</label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                <input type="date" class="form-input" value="${builderData.offerStartDate}" oninput="RoktAds.persistField('offerStartDate', this.value)">
                <input type="date" class="form-input" value="${builderData.offerEndDate}" oninput="RoktAds.persistField('offerEndDate', this.value)">
              </div>
            </div>
          </div>
        </div>

        <div class="builder-section" style="margin-top:16px">
          <div class="builder-section-label">Creative</div>
          <div class="form-group">
            <label class="form-label">Title <span class="char-counter ${combinedLen > 160 ? 'warning' : ''}" id="builderCharCount">${combinedLen}/175</span></label>
            <input type="text" class="form-input" id="builderCreativeTitle" value="${builderData.creativeTitle}" maxlength="100" oninput="RoktAds.persistField('creativeTitle', this.value); RoktAds.updateBuilderPreview()">
          </div>
          <div class="form-group">
            <label class="form-label">Body Copy</label>
            <textarea class="form-textarea" id="builderCreativeBody" rows="2" oninput="RoktAds.persistField('creativeBody', this.value); RoktAds.updateBuilderPreview()">${builderData.creativeBody}</textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Positive CTA <span class="char-counter ${ctaLen > 18 ? 'warning' : ''}">${ctaLen}/20</span></label>
              <input type="text" class="form-input" id="builderCreativeCta" value="${builderData.creativeCta}" maxlength="20" oninput="RoktAds.persistField('creativeCta', this.value); RoktAds.updateBuilderPreview()">
            </div>
            <div class="form-group">
              <label class="form-label">Negative CTA</label>
              <input type="text" class="form-input" value="No thanks" disabled style="opacity:0.5">
              <div class="form-hint">Not customizable per Rokt policy</div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Callout Tags</label>
            <div class="callout-tags-row">
              <div class="callout-tag-input">
                <span class="callout-tag-label">Promotion</span>
                <input type="text" class="form-input" value="${builderData.calloutPromotion}" placeholder="e.g. 30% OFF" oninput="RoktAds.persistField('calloutPromotion', this.value)">
              </div>
              <div class="callout-tag-input">
                <span class="callout-tag-label">Social Proof</span>
                <input type="text" class="form-input" value="${builderData.calloutSocial}" placeholder="e.g. 50M+ users" oninput="RoktAds.persistField('calloutSocial', this.value)">
              </div>
              <div class="callout-tag-input">
                <span class="callout-tag-label">Guarantee</span>
                <input type="text" class="form-input" value="${builderData.calloutGuarantee}" placeholder="e.g. Cancel anytime" oninput="RoktAds.persistField('calloutGuarantee', this.value)">
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Disclaimer</label>
            <textarea class="form-textarea" rows="2" placeholder="Legal disclaimer text (displayed below the offer)" oninput="RoktAds.persistField('creativeDisclaimer', this.value)">${builderData.creativeDisclaimer}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Image</label>
            <div class="image-upload-zone" id="imageUploadZone" onclick="RoktAds.simulateImageUpload()">
              <div style="font-size:28px;margin-bottom:8px">📁</div>
              <div style="font-size:12px;color:var(--text-secondary)">Click to upload brand logo or product image</div>
              <div style="font-size:10px;color:var(--text-tertiary);margin-top:4px">PNG/JPG · Max 2MB · Min 400×400px · Rec. 1080×565px</div>
            </div>
          </div>

          <button class="ai-generate-btn-large" onclick="RoktAds.toast('Generating 4 AI creative variations...','info')">
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 2L13.5 8.5L20 11L13.5 13.5L11 20L8.5 13.5L2 11L8.5 8.5L11 2Z"/></svg>
            AI Generate 4 Variations
          </button>

          ${renderAdStrengthGauge()}
        </div>
      </div>

      <div class="builder-step4-preview">
        <div class="preview-sticky">
          <div class="preview-label">Live Preview</div>
          <div class="preview-phone-frame">
            <div class="preview-partner-bar">Partner checkout page</div>
            <div class="preview-offer-card">
              <div class="preview-sponsored">SPONSORED</div>
              ${builderData.calloutPromotion ? `<div class="preview-callout-pill">${builderData.calloutPromotion}</div>` : ''}
              <div class="preview-title-text" id="builderPreviewTitle">${builderData.creativeTitle}</div>
              <div class="preview-body-text" id="builderPreviewBody">${builderData.creativeBody}</div>
              ${builderData.calloutSocial ? `<div class="preview-social-proof">⭐ ${builderData.calloutSocial}</div>` : ''}
              <button class="preview-cta-btn" id="builderPreviewCta">${builderData.creativeCta}</button>
              <div class="preview-decline">No thanks</div>
              ${builderData.creativeDisclaimer ? `<div class="preview-disclaimer">* ${builderData.creativeDisclaimer}</div>` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function initBuilderStep4Preview() {
    // Wire up live preview updates
    const titleInput = document.getElementById('builderCreativeTitle');
    const bodyInput = document.getElementById('builderCreativeBody');
    const ctaInput = document.getElementById('builderCreativeCta');
    if (titleInput) titleInput.addEventListener('input', updateBuilderPreview);
    if (bodyInput) bodyInput.addEventListener('input', updateBuilderPreview);
    if (ctaInput) ctaInput.addEventListener('input', updateBuilderPreview);
  }

  function updateBuilderPreview() {
    const previewTitle = document.getElementById('builderPreviewTitle');
    const previewBody = document.getElementById('builderPreviewBody');
    const previewCta = document.getElementById('builderPreviewCta');
    const charCount = document.getElementById('builderCharCount');

    if (previewTitle) previewTitle.textContent = builderData.creativeTitle;
    if (previewBody) previewBody.textContent = builderData.creativeBody;
    if (previewCta) previewCta.textContent = builderData.creativeCta;

    const combined = builderData.creativeTitle.length + builderData.creativeBody.length;
    if (charCount) {
      charCount.textContent = `${combined}/175`;
      charCount.className = 'char-counter' + (combined > 160 ? ' warning' : combined > 175 ? ' danger' : '');
    }
  }

  // ── Autopilot Step Renderers ──────────────────────────────

  function renderAutopilotStep2() {
    const hl = builderData.headlines || ['', '', ''];
    const desc = builderData.descriptions || ['', ''];
    return `<div class="builder-content-inner">
      <h3 style="margin-bottom:4px">Asset Group</h3>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:24px">Provide your creative assets, budget, and optional audience signals. AI will optimize everything else.</p>

      <div class="asset-group">
        <div class="builder-section">
          <div class="builder-section-label">Budget & Goal</div>
          <div class="form-row" style="grid-template-columns:1fr 1fr">
            <div class="form-group">
              <label class="form-label">Daily Budget</label>
              <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" class="form-input mono" value="${builderData.dailyCap}" placeholder="0" oninput="RoktAds.persistField('dailyCap', Number(this.value))"></div>
            </div>
            <div class="form-group">
              <label class="form-label">Lifetime Budget</label>
              <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" class="form-input mono" value="${builderData.lifetimeCap}" placeholder="0" oninput="RoktAds.persistField('lifetimeCap', Number(this.value))"></div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Conversion Goal</label>
            <select class="form-select" onchange="RoktAds.persistField('conversionGoal', this.value)">
              ${['purchase', 'signup', 'app_install', 'lead'].map(g => `<option value="${g}" ${builderData.conversionGoal === g ? 'selected' : ''}>${g === 'app_install' ? 'App Install' : g.charAt(0).toUpperCase() + g.slice(1)}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="builder-section">
          <div class="builder-section-label">Creative Assets</div>
          <div class="form-group">
            <label class="form-label">Headlines (up to 3)</label>
            <div class="headline-input-row">
              ${hl.map((h, i) => `
                <div class="headline-input-wrap">
                  <input type="text" class="form-input" value="${h}" maxlength="30" placeholder="Headline ${i+1}${i === 0 ? ' (required)' : ' (optional)'}" oninput="RoktAds.persistField('headlines.${i}', this.value); document.getElementById('autoStrengthGauge').innerHTML = RoktAds.renderAdStrengthGaugeHTML()">
                  <span class="char-counter-inline ${h.length > 25 ? 'warning' : ''}">${h.length}/30</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Descriptions (up to 2)</label>
            <div class="headline-input-row">
              ${desc.map((d, i) => `
                <div class="headline-input-wrap">
                  <textarea class="form-textarea" rows="2" maxlength="90" placeholder="Description ${i+1}${i === 0 ? ' (required)' : ' (optional)'}" oninput="RoktAds.persistField('descriptions.${i}', this.value); document.getElementById('autoStrengthGauge').innerHTML = RoktAds.renderAdStrengthGaugeHTML()">${d}</textarea>
                  <span class="char-counter-inline" style="top:12px;transform:none">${d.length}/90</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Call to Action</label>
            <input type="text" class="form-input" value="${builderData.autoCta}" maxlength="20" placeholder="e.g. Start Free Trial" oninput="RoktAds.persistField('autoCta', this.value); document.getElementById('autoStrengthGauge').innerHTML = RoktAds.renderAdStrengthGaugeHTML()">
          </div>
          <div class="form-group">
            <label class="form-label">Image</label>
            <div class="image-upload-zone" id="imageUploadZone" onclick="RoktAds.simulateAutoImageUpload()">
              ${builderData.autoImage
                ? '<div style="font-size:48px">&#128444;&#65039;</div><div style="font-size:12px;color:var(--text-secondary)">brand-logo.png &middot; 1080x565px</div>'
                : '<div style="font-size:28px;margin-bottom:8px">&#128193;</div><div style="font-size:12px;color:var(--text-secondary)">Click to upload brand logo or product image</div><div style="font-size:10px;color:var(--text-tertiary);margin-top:4px">PNG/JPG &middot; Max 2MB &middot; Min 400x400px</div>'
              }
            </div>
          </div>

          <div id="autoStrengthGauge">${renderAdStrengthGauge()}</div>
        </div>

        <div class="builder-section">
          <div class="builder-section-label">Audience Signals <span style="font-weight:400;font-size:11px;color:var(--text-tertiary);margin-left:4px">Optional</span></div>
          <div class="audience-signals-hint">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="6"/><path d="M7 5v0M7 7v3"/></svg>
            These are suggestions to help AI learn faster — not hard targeting constraints.
          </div>
          <div class="form-group">
            <label class="form-label">Audience Suggestions</label>
            <select class="form-select" multiple style="height:100px" onchange="builderData.audienceSignals = Array.from(this.selectedOptions, o => o.value)">
              ${audiences.map(a => `<option value="${a.id}" ${(builderData.audienceSignals || []).includes(a.id) ? 'selected' : ''}>${a.icon} ${a.name} (${a.size})</option>`).join('')}
            </select>
            <div class="form-hint">Hold Cmd/Ctrl to select multiple. These hint the AI — it may expand beyond these.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Interest Keywords</label>
            <input type="text" class="form-input" value="${builderData.interestKeywords || ''}" placeholder="e.g. streaming, entertainment, sports" oninput="RoktAds.persistField('interestKeywords', this.value)">
            <div class="form-hint">Comma-separated keywords to guide AI targeting</div>
          </div>
        </div>

        <div class="ai-managed-card">
          <span class="ai-badge">&#10024; AI Managed</span>
          <p>Rokt AI will automatically select the best placements, partners, and positions to maximize your campaign performance.</p>
        </div>
      </div>
    </div>`;
  }

  function simulateAutoImageUpload() {
    builderData.autoImage = true;
    toast('Image uploaded (simulated)', 'success');
    updateBuilderStep();
  }

  function renderAdStrengthGaugeHTML() {
    return renderAdStrengthGauge();
  }

  function renderAutopilotStep3() {
    const objLabel = objectiveLabels[builderData.objective] || builderData.objective || 'Not selected';
    const filledHeadlines = (builderData.headlines || []).filter(h => h.trim().length > 0);
    const filledDescs = (builderData.descriptions || []).filter(d => d.trim().length > 0);

    return `<div class="builder-content-inner">
      <h3 style="margin-bottom:4px">Review & Launch</h3>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:24px">Review what you provided and what AI will handle.</p>

      <div class="autopilot-review-section">
        <h4><span style="font-size:16px">&#128220;</span> You provided:</h4>
        <div class="autopilot-review-list">
          <div class="autopilot-review-item"><span class="check-icon">&#10003;</span> Objective: <strong>${objLabel}</strong></div>
          <div class="autopilot-review-item"><span class="check-icon">&#10003;</span> Budget: $${fmtNum(builderData.dailyCap)}/day &middot; $${fmtNum(builderData.lifetimeCap)} lifetime</div>
          <div class="autopilot-review-item"><span class="check-icon">&#10003;</span> Conversion Goal: <strong>${(builderData.conversionGoal || 'purchase').charAt(0).toUpperCase() + (builderData.conversionGoal || 'purchase').slice(1)}</strong></div>
          <div class="autopilot-review-item"><span class="check-icon">${filledHeadlines.length > 0 ? '&#10003;' : '&#9888;'}</span> Headlines: ${filledHeadlines.length} provided${filledHeadlines.length > 0 ? ' — "' + filledHeadlines[0] + '"' + (filledHeadlines.length > 1 ? ' + ' + (filledHeadlines.length - 1) + ' more' : '') : ''}</div>
          <div class="autopilot-review-item"><span class="check-icon">${filledDescs.length > 0 ? '&#10003;' : '&#9888;'}</span> Descriptions: ${filledDescs.length} provided</div>
          <div class="autopilot-review-item"><span class="check-icon">${builderData.autoCta ? '&#10003;' : '&#9888;'}</span> CTA: ${builderData.autoCta || 'Not set'}</div>
          <div class="autopilot-review-item"><span class="check-icon">${builderData.autoImage ? '&#10003;' : '&#9888;'}</span> Image: ${builderData.autoImage ? 'Uploaded' : 'Not uploaded'}</div>
          ${(builderData.audienceSignals || []).length > 0 ? `<div class="autopilot-review-item"><span class="check-icon">&#10003;</span> Audience signals: ${builderData.audienceSignals.length} audiences hinted</div>` : ''}
          ${builderData.interestKeywords ? `<div class="autopilot-review-item"><span class="check-icon">&#10003;</span> Interest keywords: ${builderData.interestKeywords}</div>` : ''}
        </div>
      </div>

      <div class="autopilot-review-section ai-will-handle">
        <h4><span style="font-size:16px">&#10024;</span> AI will optimize:</h4>
        <div class="autopilot-review-list">
          <div class="autopilot-review-item"><span class="ai-icon">&#9679;</span> <strong>Targeting</strong> — Audience selection, demographics, geography</div>
          <div class="autopilot-review-item"><span class="ai-icon">&#9679;</span> <strong>Bidding</strong> — Smart bidding strategy, bid amounts, pacing</div>
          <div class="autopilot-review-item"><span class="ai-icon">&#9679;</span> <strong>Placements</strong> — Partner selection, placement types, positions</div>
          <div class="autopilot-review-item"><span class="ai-icon">&#9679;</span> <strong>Budget Allocation</strong> — Daily pacing and cross-partner distribution</div>
          <div class="autopilot-review-item"><span class="ai-icon">&#9679;</span> <strong>Creative Optimization</strong> — Headline/description combinations, A/B testing</div>
          <div class="autopilot-review-item"><span class="ai-icon">&#9679;</span> <strong>Frequency Capping</strong> — Optimal exposure per user</div>
        </div>
      </div>

      ${renderAdStrengthGauge()}

      <div class="approval-banner" style="margin-top:var(--space-4)">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--brand-blue)" stroke-width="1.5"><circle cx="9" cy="9" r="7"/><path d="M9 6v0M9 9v4"/></svg>
        <div>
          <strong>Pending Rokt Approval</strong>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">Your campaign will be reviewed by Rokt before going live. This typically takes 1-2 business days.</div>
        </div>
      </div>
    </div>`;
  }

  // ── Inventory Targeting Section (Advanced Step 3) ─────────

  function renderInventorySection() {
    const selectedPlacements = builderData.placementTypes || [];
    const selectedPartnerIds = builderData.selectedPartners || [];

    return `
      <div class="inventory-section">
        <div class="builder-section" style="margin-top:20px">
          <div class="builder-section-label">Inventory</div>

          <div class="form-group">
            <label class="form-label">Placement Type</label>
            <div class="placement-type-grid">
              ${[
                { id: 'overlay', icon: '&#128301;', name: 'Overlay', desc: 'Full-screen or modal overlay' },
                { id: 'embedded', icon: '&#128203;', name: 'Embedded', desc: 'Inline within page content' },
                { id: 'post_transaction', icon: '&#9989;', name: 'Post-Transaction', desc: 'After checkout completion' },
              ].map(p => `
                <div class="placement-card ${selectedPlacements.includes(p.id) ? 'selected' : ''}" onclick="RoktAds.togglePlacement('${p.id}')">
                  <div class="placement-card-icon">${p.icon}</div>
                  <div class="placement-card-name">${p.name}</div>
                  <div class="placement-card-desc">${p.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Partner Selection</label>
            <div class="partner-controls">
              <input type="text" class="partner-search-input" placeholder="Search partners..." oninput="RoktAds.filterPartners(this.value)">
              <button class="btn btn-xs btn-ghost" onclick="RoktAds.selectAllPartners()">Select All</button>
              <button class="btn btn-xs btn-ghost" onclick="RoktAds.deselectAllPartners()">Deselect All</button>
              <span class="partner-selected-count">${selectedPartnerIds.length}/${partners.length} selected</span>
            </div>
            <div class="partner-checklist" id="partnerChecklist">
              ${partners.map(p => `
                <div class="partner-item" onclick="RoktAds.togglePartner('${p.id}')">
                  <input type="checkbox" ${selectedPartnerIds.includes(p.id) ? 'checked' : ''} onclick="event.stopPropagation(); RoktAds.togglePartner('${p.id}')">
                  <div class="partner-item-info">
                    <div class="partner-item-name">${p.name}</div>
                    <div class="partner-item-meta">${p.category} &middot; ${p.volume}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Position Targeting</label>
            <div class="position-radio-group">
              <label><input type="radio" name="positionTarget" value="any" ${builderData.positionTargeting === 'any' ? 'checked' : ''} onchange="RoktAds.persistField('positionTargeting', 'any')"> Any Position (recommended)</label>
              <label><input type="radio" name="positionTarget" value="first" ${builderData.positionTargeting === 'first' ? 'checked' : ''} onchange="RoktAds.persistField('positionTargeting', 'first')"> 1st Position Only</label>
              <label><input type="radio" name="positionTarget" value="first_second" ${builderData.positionTargeting === 'first_second' ? 'checked' : ''} onchange="RoktAds.persistField('positionTargeting', 'first_second')"> 1st or 2nd Position</label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Frequency Caps</label>
            <div class="freq-cap-row">
              <div class="form-group">
                <label class="form-label" style="font-size:11px">Per user per day</label>
                <input type="number" class="form-input mono" value="${builderData.freqCapDaily}" min="1" placeholder="3" oninput="RoktAds.persistField('freqCapDaily', Number(this.value))">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-size:11px">Per user lifetime</label>
                <input type="number" class="form-input mono" value="${builderData.freqCapLifetime || ''}" min="1" placeholder="Unlimited" oninput="RoktAds.persistField('freqCapLifetime', this.value ? Number(this.value) : '')">
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function togglePlacement(id) {
    const arr = builderData.placementTypes || [];
    const idx = arr.indexOf(id);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(id);
    builderData.placementTypes = arr;
    updateBuilderStep();
  }

  function togglePartner(id) {
    const arr = builderData.selectedPartners || [];
    const idx = arr.indexOf(id);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(id);
    builderData.selectedPartners = arr;
    updateBuilderStep();
  }

  function selectAllPartners() {
    builderData.selectedPartners = partners.map(p => p.id);
    updateBuilderStep();
  }

  function deselectAllPartners() {
    builderData.selectedPartners = [];
    updateBuilderStep();
  }

  function filterPartners(query) {
    const items = document.querySelectorAll('.partner-item');
    const q = query.toLowerCase();
    items.forEach(item => {
      const name = item.querySelector('.partner-item-name')?.textContent.toLowerCase() || '';
      const meta = item.querySelector('.partner-item-meta')?.textContent.toLowerCase() || '';
      item.style.display = (name.includes(q) || meta.includes(q)) ? '' : 'none';
    });
  }

  function renderBuilderStep5() {
    const objLabel = objectiveLabels[builderData.objective] || builderData.objective || 'Not selected';
    const aud0 = audiences.find(a => a.id === builderData.adSets[0]?.audience) || audiences[0];
    const bidLabel = { smart: 'Smart Bidding', budget_opt: 'Budget Optimization', manual: 'Manual Bidding' }[builderData.bidStrategy] || builderData.bidStrategy;

    // Validation checks
    const checks = [
      { ok: !!builderData.objective, label: 'Campaign objective selected' },
      { ok: !!builderData.name && builderData.name !== 'My New Campaign' && builderData.name !== '', label: 'Campaign name configured' },
      { ok: builderData.lifetimeCap > 0 || builderData.dailyCap > 0, label: 'Budget configured' },
      { ok: builderData.adSets.length >= 1, label: 'At least 1 ad set with audience' },
      { ok: !!builderData.creativeTitle, label: 'Creative title added' },
      { ok: !!builderData.landingPageUrl, label: 'Landing page URL provided' },
    ];
    const allPassed = checks.every(c => c.ok);

    return `<div class="builder-content-inner">
      <div class="approval-banner">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--brand-blue)" stroke-width="1.5"><circle cx="9" cy="9" r="7"/><path d="M9 6v0M9 9v4"/></svg>
        <div>
          <strong>Pending Rokt Approval</strong>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">Your campaign will be reviewed by Rokt before going live. This typically takes 1-2 business days.</div>
        </div>
      </div>

      <h3 style="margin-bottom:4px">Review & Launch</h3>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px">Review your campaign setup before submitting for approval.</p>

      <div class="review-tree">
        <div class="review-tree-node"><strong>📋 Campaign:</strong> ${builderData.name || 'My New Campaign'}</div>
        <div class="review-tree-children">
          <div class="review-tree-node"><strong>🎯 Objective:</strong> ${objLabel}</div>
          <div class="review-tree-node"><strong>🏢 Brand:</strong> ${builderData.companyName || '—'} ${builderData.brandUrl ? `(${builderData.brandUrl})` : ''}</div>
          <div class="review-tree-node"><strong>💰 Budget:</strong> $${fmtNum(builderData.dailyCap)}/day ${builderData.monthlyCap ? '· $' + fmtNum(builderData.monthlyCap) + '/mo' : ''} · $${fmtNum(builderData.lifetimeCap)} lifetime</div>
          <div class="review-tree-node"><strong>📅 Schedule:</strong> ${builderData.startDate || 'Not set'} — ${builderData.endDate || 'Ongoing'}</div>
          <div class="review-tree-node"><strong>🎲 Bid Strategy:</strong> ${bidLabel}${builderData.bidStrategy === 'smart' ? ' (Target CPA: $' + builderData.targetCpa + ')' : ''}${builderData.bidStrategy === 'manual' ? ' ($' + builderData.manualBid + '/referral)' : ''}</div>
          ${builderData.adSets.map((as, idx) => {
            const a = audiences.find(x => x.id === as.audience) || audiences[0];
            return `
            <div class="review-tree-children">
              <div class="review-tree-node"><strong>👥 Ad Set ${idx + 1}:</strong> ${a.name} (${a.size})</div>
              <div class="review-tree-children">
                <div class="review-tree-node">Geo: ${as.geoCountry}${as.geoState ? ', ' + as.geoState : ''} · ${[as.deviceDesktop && 'Desktop', as.deviceMobile && 'Mobile', as.deviceTablet && 'Tablet'].filter(Boolean).join(', ')} · Age ${as.ageMin}-${as.ageMax}${as.gender !== 'all' ? ' · ' + capitalize(as.gender) : ''}</div>
              </div>
            </div>`;
          }).join('')}
          <div class="review-tree-children">
            <div class="review-tree-node"><strong>🏷️ Offer:</strong> ${builderData.offerValue} (${builderData.offerCost} cost) ${builderData.couponCode ? '· Code: ' + builderData.couponCode : ''}</div>
            <div class="review-tree-node"><strong>🔗 Landing Page:</strong> ${builderData.landingPageUrl || '⚠ Not set'}</div>
            <div class="review-tree-node"><strong>🎨 Creative:</strong> "${builderData.creativeTitle}" · CTA: "${builderData.creativeCta}"</div>
            ${builderData.calloutPromotion || builderData.calloutSocial || builderData.calloutGuarantee ? `
              <div class="review-tree-node"><strong>🏷 Callouts:</strong> ${[builderData.calloutPromotion, builderData.calloutSocial, builderData.calloutGuarantee].filter(Boolean).join(' · ')}</div>
            ` : ''}
          </div>
          <div class="review-tree-children">
            <div class="review-tree-node"><strong>📜 Legal Terms</strong></div>
            <div class="review-tree-children">
              <div class="review-tree-node">🔗 Terms & Conditions: <a href="#" style="color:var(--beetroot)">https://brand.com/terms</a></div>
              <div class="review-tree-node">🔗 Privacy Policy: <a href="#" style="color:var(--beetroot)">https://brand.com/privacy</a></div>
              ${builderData.disclaimerEnabled ? '<div class="review-tree-node">📝 Disclaimer: Freeform text configured</div>' : ''}
            </div>
          </div>
        </div>
      </div>

      <div class="review-checklist">
        ${checks.map(c => `
          <div class="review-check-item ${c.ok ? '' : 'failing'}">
            <span class="${c.ok ? 'check-icon' : 'warn-icon'}">${c.ok ? '✓' : '⚠'}</span>
            ${c.ok ? c.label : `<span style="color:var(--warning)">${c.label}</span>`}
          </div>
        `).join('')}
        <div class="review-check-item"><span class="warn-icon">⚠</span> <span style="color:var(--text-tertiary)">Pending Rokt approval after submission</span></div>
      </div>
    </div>`;
  }

  function selectObjective(id) {
    builderData.objective = id;
    builderData.objectiveType = id;
    $$('.objective-card').forEach(c => {
      const isSelected = c.dataset.objectiveId === id;
      c.classList.toggle('selected', isSelected);
      if (isSelected) c.classList.add('pulse');
    });
    // Auto-advance to step 2 after brief delay so user sees selection
    setTimeout(() => {
      builderStep = 2;
      updateBuilderStep();
    }, 400);
  }

  function launchCampaign() {
    // Confetti burst
    const overlay = document.createElement('div');
    overlay.className = 'confetti-overlay';
    document.body.appendChild(overlay);
    const colors = ['#C20075', '#D4338F', '#4D9AFF', '#34D399', '#FBBF24', '#D4338F'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 0.8 + 's';
      piece.style.animationDuration = (1.5 + Math.random()) + 's';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.width = (6 + Math.random() * 6) + 'px';
      piece.style.height = (6 + Math.random() * 6) + 'px';
      overlay.appendChild(piece);
    }
    setTimeout(() => overlay.remove(), 3000);

    toast('Campaign launched successfully!', 'success');
    setTimeout(() => navigate('campaigns'), 2000);
  }

  // ── Audiences ──────────────────────────────────────────────
  function initAudiences() {
    renderAudienceGrid();
    updateAudienceCounts();

    // Type filters
    $$('#audienceTypeFilters .filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        $$('#audienceTypeFilters .filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderAudienceGrid(pill.dataset.type);
      });
    });

    // Search
    const search = document.getElementById('audienceSearch');
    if (search) search.addEventListener('input', () => renderAudienceGrid('all', search.value));
  }

  function renderAudienceGrid(type = 'all', search = '') {
    const grid = document.getElementById('audienceGrid');
    if (!grid) return;
    let filtered = getFilteredAudiences();
    if (type && type !== 'all') filtered = filtered.filter(a => a.type === type);
    if (search) filtered = filtered.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

    grid.innerHTML = filtered.map(a => `
      <div class="audience-card" onclick="RoktAds.openModal('editAudience', '${a.id}')">
        <button class="hover-edit-btn" onclick="event.stopPropagation();RoktAds.editAudience('${a.id}')" title="Edit">✏️</button>
        <div class="audience-card-header">
          <div class="audience-card-icon">${a.icon}</div>
          <div class="audience-card-info">
            <div class="audience-card-name">${a.name}</div>
            <div class="audience-card-type">${a.type}</div>
          </div>
        </div>
        <div class="audience-card-stats">
          <div class="audience-stat">
            <span class="audience-stat-label">Size</span>
            <span class="audience-stat-value">${a.size}</span>
          </div>
          <div class="audience-stat">
            <span class="audience-stat-label">Campaigns</span>
            <span class="audience-stat-value">${a.campaigns}</span>
          </div>
          <div class="audience-stat">
            <span class="audience-stat-label">Match Rate</span>
            <span class="audience-stat-value">${a.matchRate}</span>
          </div>
        </div>
        <div class="audience-card-footer">
          <span class="audience-freshness"><span class="freshness-dot ${a.fresh ? 'fresh' : 'stale'}"></span> ${a.fresh ? 'Fresh' : 'Stale — refresh recommended'}</span>
          <span class="badge badge-gray">${a.type}</span>
        </div>
      </div>
    `).join('');
    initCardGlow();
  }

  // ── Creatives ──────────────────────────────────────────────
  function initCreatives() {
    renderCreativeLibrary();
    initCreativeEditor();
    initCreativePartnerContexts();
    initPolicyCheckBtn();
    initCreativeSearch();
  }

  function initCreativePartnerContexts() {
    const badges = document.querySelectorAll('.preview-partner-contexts .context-badges .filter-pill');
    const partnerContext = document.querySelector('.preview-partner-context');
    badges.forEach(badge => {
      badge.addEventListener('click', () => {
        badges.forEach(b => b.classList.remove('active'));
        badge.classList.add('active');
        if (partnerContext) partnerContext.textContent = badge.textContent.trim().toLowerCase() + '.com';
      });
    });
  }

  function initPolicyCheckBtn() {
    const btn = document.getElementById('policyCheckBtn');
    const status = document.getElementById('policyStatus');
    if (btn) {
      btn.addEventListener('click', () => {
        if (status) {
          status.innerHTML = '<span style="color:var(--warning)">&#8987;</span> Checking policy compliance...';
          setTimeout(() => {
            status.innerHTML = '<span style="color:var(--positive)">&#10003;</span> Passes policy check';
            toast('Policy check passed', 'success');
          }, 1200);
        }
      });
    }
  }

  function initCreativeSearch() {
    const search = document.getElementById('creativeSearch');
    if (search) {
      search.addEventListener('input', () => {
        const query = search.value.toLowerCase();
        const list = document.getElementById('creativeLibraryList');
        if (!list) return;
        const filtered = getFilteredCreatives().filter(cr => cr.name.toLowerCase().includes(query));
        list.innerHTML = filtered.map((cr, i) => `
          <div class="creative-lib-item ${i === 0 ? 'active' : ''}" onclick="RoktAds.selectCreative('${cr.id}')">
            <div class="creative-lib-name">${cr.name}</div>
            <div class="creative-lib-meta">${cr.format} · CoPI: ${cr.copi}%</div>
          </div>
        `).join('');
      });
    }
  }

  function renderCreativeLibrary() {
    const list = document.getElementById('creativeLibraryList');
    if (!list) return;
    const filtered = getFilteredCreatives();
    list.innerHTML = filtered.map((cr, i) => `
      <div class="creative-lib-item ${i === 0 ? 'active' : ''}" onclick="RoktAds.selectCreative('${cr.id}')">
        <div class="creative-lib-name">${cr.name}</div>
        <div class="creative-lib-meta">${cr.format} · CoPI: ${cr.copi}%</div>
      </div>
    `).join('');
    // Auto-select first creative if available
    if (filtered.length > 0) selectCreative(filtered[0].id);
  }

  const creativeDetails = {
    cr1: { title: 'Stream Disney+ for Less!', body: 'Get 30% off your first month of Disney+. Stream thousands of movies, shows, and originals.', cta: 'Start Streaming', offer: 'o1', format: 'Text' },
    cr2: { title: 'Why Disney+ is Worth It', body: '10,000+ titles. 4K streaming. Download & watch offline. Family-friendly content.', cta: 'See Plans', offer: 'o2', format: 'Benefits' },
    cr3: { title: 'Disney+ Spring Special', body: 'Unlock a world of entertainment. Stream now with 30% off.', cta: 'Get the Deal', offer: 'o1', format: 'Hero Image' },
    cr4: { title: 'Save $50 on Capital One', body: 'Apply now and earn a $50 statement credit. No annual fee.', cta: 'Apply Now', offer: 'o3', format: 'Savings' },
    cr5: { title: 'Hulu \u2014 First Month Free', body: 'Try Hulu free for 30 days. Cancel anytime.', cta: 'Start Free Trial', offer: 'o4', format: 'Text' },
    cr6: { title: 'True Classic Bestsellers', body: 'Shop our top-rated essentials. Free shipping on first order.', cta: 'Shop Now', offer: 'o5', format: 'Carousel' },
    cr7: { title: 'Get $5 Back with PayPal', body: 'Use Pay+ at checkout and earn $5 cashback.', cta: 'Activate Now', offer: 'o6', format: 'Savings' },
    cr8: { title: 'Audible \u2014 3 Months Free', body: 'Listen to thousands of audiobooks free for 3 months.', cta: 'Start Listening', offer: 'o2', format: 'Text' },
  };

  function selectCreative(id) {
    const cr = creatives.find(c => c.id === id);
    if (!cr) return;
    $$('.creative-lib-item').forEach(item => item.classList.remove('active'));
    const items = $$('.creative-lib-item');
    const idx = creatives.findIndex(c => c.id === id);
    if (items[idx]) items[idx].classList.add('active');
    const detail = creativeDetails[id] || {};
    const titleInput = document.getElementById('creativeTitle');
    if (titleInput) { titleInput.value = detail.title || cr.name; titleInput.dispatchEvent(new Event('input')); }
    const bodyInput = document.getElementById('creativeBody');
    if (bodyInput) { bodyInput.value = detail.body || ''; bodyInput.dispatchEvent(new Event('input')); }
    const ctaInput = document.getElementById('creativeCta');
    if (ctaInput) { ctaInput.value = detail.cta || ''; ctaInput.dispatchEvent(new Event('input')); }
    const offerSelect = document.getElementById('creativeOffer');
    if (offerSelect && detail.offer) offerSelect.value = detail.offer;
    if (detail.format) {
      $$('#creativeFormatTabs .filter-pill').forEach(t => t.classList.toggle('active', t.dataset.format === detail.format));
      updateCreativePreviewFormat(detail.format);
    }
  }

  function updateCreativePreviewFormat(format) {
    const card = document.getElementById('creativePreviewCard'); if (!card) return;
    const body = document.getElementById('previewBody');
    const offer = document.getElementById('previewOffer');
    const title = document.getElementById('previewTitle');
    card.querySelectorAll('.preview-format-extra').forEach(el => el.remove());
    if (title) title.style.display = ''; if (body) body.style.display = '';
    if (offer) offer.style.display = '';
    switch (format) {
      case 'Benefits': { if (body) body.style.display = 'none'; const list = document.createElement('ul'); list.className = 'preview-benefits-list preview-format-extra'; ['10,000+ titles','4K streaming','Download & watch offline','Family-friendly'].forEach(b => { const li = document.createElement('li'); li.innerHTML = '<span style="color:var(--positive)">\u2713</span> ' + b; list.appendChild(li); }); if (offer) offer.parentElement.insertBefore(list, offer); break; }
      case 'Savings': { const badge = document.createElement('div'); badge.className = 'preview-savings-badge preview-format-extra'; badge.textContent = 'SAVE 30%'; if (offer) offer.parentElement.insertBefore(badge, offer); break; }
      case 'Hero Image': { const hero = document.createElement('div'); hero.className = 'preview-hero-image preview-format-extra'; hero.textContent = '\ud83c\udfa5'; if (title) title.parentElement.insertBefore(hero, title.nextSibling); break; }
      case 'Carousel': { if (body) body.style.display = 'none'; const carousel = document.createElement('div'); carousel.className = 'preview-carousel preview-format-extra'; ['\ud83d\udc55','\ud83d\udc54','\ud83e\ude73','\ud83e\udde5','\ud83d\udc56'].forEach(icon => { const item = document.createElement('div'); item.className = 'preview-carousel-item'; item.textContent = icon; carousel.appendChild(item); }); if (offer) offer.parentElement.insertBefore(carousel, offer); break; }
    }
  }

  function initCreativeEditor() {
    // Title live preview
    const titleInput = document.getElementById('creativeTitle');
    const previewTitle = document.getElementById('previewTitle');
    const titleCount = document.getElementById('titleCharCount');
    if (titleInput) {
      titleInput.addEventListener('input', () => {
        if (previewTitle) previewTitle.textContent = titleInput.value;
        if (titleCount) {
          titleCount.textContent = `${titleInput.value.length}/40`;
          titleCount.className = 'char-count' + (titleInput.value.length > 35 ? ' warning' : titleInput.value.length >= 40 ? ' danger' : '');
        }
      });
    }

    // Body live preview
    const bodyInput = document.getElementById('creativeBody');
    const previewBody = document.getElementById('previewBody');
    if (bodyInput) {
      bodyInput.addEventListener('input', () => {
        if (previewBody) previewBody.textContent = bodyInput.value;
      });
    }

    // CTA live preview
    const ctaInput = document.getElementById('creativeCta');
    const previewCta = document.getElementById('previewCta');
    const ctaCount = document.getElementById('ctaCharCount');
    if (ctaInput) {
      ctaInput.addEventListener('input', () => {
        if (previewCta) previewCta.textContent = ctaInput.value;
        if (ctaCount) ctaCount.textContent = `${ctaInput.value.length}/25`;
      });
    }

    // Format tabs
    $$('#creativeFormatTabs .filter-pill').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('#creativeFormatTabs .filter-pill').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        updateCreativePreviewFormat(tab.dataset.format);
      });
    });

    // Device toggle
    $$('.preview-device-toggle .filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.preview-device-toggle .filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const card = document.getElementById('creativePreviewCard');
        if (card) card.style.maxWidth = btn.dataset.device === 'mobile' ? '260px' : '300px';
      });
    });
  }

  function insertAttr(attr) {
    const bodyInput = document.getElementById('creativeBody');
    if (bodyInput) {
      const pos = bodyInput.selectionStart;
      const val = bodyInput.value;
      bodyInput.value = val.slice(0, pos) + attr + val.slice(pos);
      bodyInput.focus();
      bodyInput.setSelectionRange(pos + attr.length, pos + attr.length);
      bodyInput.dispatchEvent(new Event('input'));
    }
    toast(`Inserted ${attr}`, 'info');
  }

  // ── Intelligence ──────────────────────────────────────────
  function initIntelligence() {
    renderIntelInsights();
    renderReportChart();
    renderReportTable();
    renderExperiments();
    initIntelligenceControls();
    initExperimentFilters();
  }

  function initExperimentFilters() {
    const container = document.getElementById('intelExperiments');
    if (!container) return;
    const pills = container.querySelectorAll('.filter-pills .filter-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const text = pill.textContent.trim().toLowerCase();
        renderExperiments(text === 'all' ? 'all' : text);
      });
    });
  }

  function initIntelligenceControls() {
    // Date range pills
    $$('#reportDateRange .filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        $$('#reportDateRange .filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        reportDateRange = pill.dataset.range;
        renderReportChart();
        renderReportTable();
      });
    });

    // Attribution model dropdown
    const attrSelect = document.getElementById('reportAttribution');
    if (attrSelect) {
      attrSelect.addEventListener('change', () => {
        toast(`Attribution changed to: ${attrSelect.value.split(': ')[1] || attrSelect.value}`, 'info');
        renderReportChart();
        renderReportTable();
      });
    }

    // Compare toggle — inject after date range pills
    const dateRangeContainer = document.querySelector('.report-controls-left');
    if (dateRangeContainer && !dateRangeContainer.querySelector('.compare-toggle')) {
      const btn = document.createElement('button');
      btn.className = 'compare-toggle' + (reportCompare ? ' active' : '');
      btn.innerHTML = `<svg class="compare-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 10V4M5 10V6M8 10V3M11 10V7"/><line x1="1" y1="12" x2="13" y2="12" stroke-dasharray="2,2"/></svg> Compare`;
      btn.addEventListener('click', () => {
        reportCompare = !reportCompare;
        btn.classList.toggle('active', reportCompare);
        renderReportChart();
      });
      dateRangeContainer.appendChild(btn);
    }

    // Group By dropdown — inject into report filters area
    const filtersArea = document.getElementById('reportFilters');
    if (filtersArea && !filtersArea.querySelector('.dimension-controls')) {
      const groupByWrap = document.createElement('div');
      groupByWrap.style.cssText = 'margin-left:auto;display:flex;align-items:center;gap:6px;';
      groupByWrap.innerHTML = `
        <label style="font-size:11px;color:var(--text-tertiary);font-weight:500">Group By:</label>
        <select class="form-select form-select-sm" id="reportGroupBy" style="width:auto;padding:3px 8px;font-size:11px">
          <option value="none">None</option>
          <option value="device">Device</option>
          <option value="geography">Geography</option>
          <option value="audience">Audience</option>
          <option value="creative">Creative</option>
        </select>
      `;
      filtersArea.appendChild(groupByWrap);
      const sel = document.getElementById('reportGroupBy');
      if (sel) {
        sel.value = reportGroupBy;
        sel.addEventListener('change', () => {
          reportGroupBy = sel.value;
          renderDimensionBreakdown();
        });
      }
    }
  }

  function renderIntelInsights() {
    const strip = document.getElementById('intelInsightStrip');
    if (!strip) return;
    const insights = [
      { icon: '📈', text: 'CPA improved <strong>12%</strong> week-over-week across all campaigns' },
      { icon: '🏆', text: 'Creative #3 (Hero) outperforming by <strong>3x CoPI</strong>' },
      { icon: '⚠️', text: 'True Classic Integration Health at <strong>4.8</strong> — affecting optimization' },
      { icon: '🧪', text: 'Experiment #1 reached <strong>97% significance</strong> — apply winner' },
    ];
    strip.innerHTML = insights.map(i => `
      <div class="insight-strip-card">
        <span style="font-size:18px">${i.icon}</span>
        <span style="font-size:12px;line-height:1.5">${i.text}</span>
      </div>
    `).join('');
  }

  function getReportData() {
    const active = campaigns.filter(c => c.status !== 'draft');
    const baseSpend = active.reduce((acc, c) => { c.dailySpend.forEach((v, i) => { acc[i] = (acc[i] || 0) + v; }); return acc; }, []);
    const baseConversions = baseSpend.map(s => Math.round(s / 7.5 + 150));
    const rangeScalers = { 'today': { points: 1, labels: ['Today'], scale: 0.15 }, '7d': { points: 7, labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], scale: 1 }, '30d': { points: 5, labels: ['Wk 1','Wk 2','Wk 3','Wk 4','Wk 5'], scale: 4.2 }, 'mtd': { points: 4, labels: ['Mar 1-7','Mar 8-14','Mar 15-20','Projected'], scale: 2.8 }, 'custom': { points: 7, labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], scale: 1 } };
    const config = rangeScalers[reportDateRange] || rangeScalers['7d'];
    let spend = [], conversions = [], cpa = [];
    for (let i = 0; i < config.points; i++) { const srcIdx = i % baseSpend.length; const jitter = 0.9 + (Math.sin(i * 2.1) * 0.1 + 0.1); spend.push(Math.round(baseSpend[srcIdx] * config.scale * jitter)); conversions.push(Math.round(baseConversions[srcIdx] * config.scale * jitter)); cpa.push(conversions[i] ? +(spend[i] / conversions[i]).toFixed(2) : 0); }
    return { spend, conversions, cpa, prevSpend: spend.map(v => Math.round(v * 0.85)), prevConversions: conversions.map(v => Math.round(v * 0.78)), labels: config.labels };
  }

  function renderReportChart() {
    const legend = document.getElementById('reportChartLegend');
    const svg = document.getElementById('reportChartSvg');
    if (!legend || !svg) return;
    const legendItems = [{ label: 'Spend', color: 'var(--beetroot)' },{ label: 'Conversions', color: 'var(--positive)' },{ label: 'CPA', color: 'var(--warning)' }];
    if (reportCompare) { legendItems.push({ label: 'Prev. Spend', color: 'var(--beetroot)', prev: true }); legendItems.push({ label: 'Prev. Conv.', color: 'var(--positive)', prev: true }); }
    legend.innerHTML = legendItems.map(l => `<span class="chart-legend-item"><span class="chart-legend-dot" style="background:${l.color};${l.prev ? 'opacity:0.4' : ''}"></span>${l.label}</span>`).join('');
    const data = getReportData(); const n = data.spend.length; const w = 700, chartH = 150, pad = 10;
    const maxSpend = Math.max(...data.spend, ...(reportCompare ? data.prevSpend : [1]));
    const maxConv = Math.max(...data.conversions, ...(reportCompare ? data.prevConversions : [1]));
    const maxCPA = Math.max(...data.cpa, 1);
    function toLine(vals, maxV) { return vals.map((v, i) => `${n > 1 ? i * w / (n - 1) : w/2},${chartH - (v / maxV) * (chartH - pad)}`).join(' '); }
    const spendLine = toLine(data.spend, maxSpend); const convLine = toLine(data.conversions, maxConv); const cpaLine = toLine(data.cpa, maxCPA);
    let compareSvg = '';
    if (reportCompare) { compareSvg = `<polyline points="${toLine(data.prevSpend, maxSpend)}" fill="none" stroke="var(--beetroot)" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.35"/><polyline points="${toLine(data.prevConversions, maxConv)}" fill="none" stroke="var(--positive)" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.35"/>`; }
    // Rokt connector symbol for data points
    const roktSymbol = `<symbol id="rDot" viewBox="0 0 12 12"><path d="M0 10 L2.5 0 L5 10 L7.5 0 L10 10 L8.5 10 L7.5 3 L5 10 L2.5 3 L1.5 10 Z" fill="currentColor"/></symbol>`;
    function roktDot(x, y, color, size) { size = size || 10; return `<use href="#rDot" x="${x - size/2}" y="${y - size/2}" width="${size}" height="${size}" color="${color}"/>`; }
    svg.innerHTML = `<defs>${roktSymbol}<linearGradient id="reportGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--beetroot)" stop-opacity="0.15"/><stop offset="100%" stop-color="var(--beetroot)" stop-opacity="0"/></linearGradient></defs><line x1="0" y1="${chartH}" x2="${w}" y2="${chartH}" stroke="var(--border)" stroke-width="0.5"/><line x1="0" y1="${chartH/2}" x2="${w}" y2="${chartH/2}" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="4,4"/><polygon points="${spendLine} ${n > 1 ? w : w/2},${chartH} 0,${chartH}" fill="url(#reportGrad)"/>${compareSvg}<polyline points="${spendLine}" fill="none" stroke="var(--beetroot)" stroke-width="2" stroke-linecap="round" class="chart-line-animate"/><polyline points="${convLine}" fill="none" stroke="var(--positive)" stroke-width="2" stroke-linecap="round" stroke-dasharray="6,3" class="chart-line-animate"/><polyline points="${cpaLine}" fill="none" stroke="var(--warning)" stroke-width="2" stroke-linecap="round" stroke-dasharray="2,3" class="chart-line-animate"/>${data.spend.map((v, i) => roktDot(n > 1 ? i*w/(n-1) : w/2, chartH - (v/maxSpend)*(chartH-pad), 'var(--beetroot)', 10)).join('')}${data.conversions.map((v, i) => roktDot(n > 1 ? i*w/(n-1) : w/2, chartH - (v/maxConv)*(chartH-pad), 'var(--positive)', 9)).join('')}${data.cpa.map((v, i) => roktDot(n > 1 ? i*w/(n-1) : w/2, chartH - (v/maxCPA)*(chartH-pad), 'var(--warning)', 8)).join('')}${data.labels.map((l, i) => `<text x="${n > 1 ? i*w/(n-1) : w/2}" y="${chartH + 18}" font-size="9" fill="var(--text-tertiary)" font-family="var(--font-mono)" ${n === 1 ? 'text-anchor="middle"' : ''}>${l}</text>`).join('')}`;
    renderDimensionBreakdown();
  }

  function renderDimensionBreakdown() {
    const existing = document.querySelector('.dimension-breakdown'); if (existing) existing.remove();
    if (reportGroupBy === 'none') return;
    const chartContainer = document.getElementById('reportChart'); if (!chartContainer) return;
    const bd = { device: [{label:'Desktop',pct:55},{label:'Mobile',pct:38},{label:'Tablet',pct:7}], geography: [{label:'US-East',pct:35},{label:'US-West',pct:28},{label:'US-Central',pct:22},{label:'US-South',pct:15}], audience: [{label:'Women 25-45',pct:32},{label:'Streaming LAL',pct:25},{label:'Cord Cutters',pct:18},{label:'Finance DMs',pct:15},{label:'Other',pct:10}], creative: [{label:'Hero Banner',pct:30},{label:'Text Offer',pct:28},{label:'Benefits List',pct:22},{label:'Savings',pct:12},{label:'Carousel',pct:8}] };
    const items = bd[reportGroupBy]; if (!items) return;
    const colors = ['var(--beetroot)','var(--positive)','var(--brand-blue)','var(--warning)','var(--text-tertiary)'];
    const el = document.createElement('div'); el.className = 'dimension-breakdown';
    el.innerHTML = `<div class="dimension-breakdown-title">Breakdown by ${capitalize(reportGroupBy)}</div>${items.map((item, idx) => `<div class="dimension-bar-row"><div class="dimension-bar-label">${item.label}</div><div class="dimension-bar-track"><div class="dimension-bar-segment" style="width:${item.pct}%;background:${colors[idx % colors.length]}"></div></div><div class="dimension-bar-value">${item.pct}%</div></div>`).join('')}<div class="dimension-legend">${items.map((item, idx) => `<div class="dimension-legend-item"><div class="dimension-legend-dot" style="background:${colors[idx % colors.length]}"></div>${item.label}</div>`).join('')}</div>`;
    chartContainer.parentElement.insertBefore(el, chartContainer.nextElementSibling);
  }

  function renderReportTable() {
    const thead = document.getElementById('reportTableHead');
    const tbody = document.getElementById('reportTableBody');
    if (!thead || !tbody) return;

    const cols = ['Campaign', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'CPA', 'ROAS', 'CoPI', 'Spend'];
    thead.innerHTML = `<tr>${cols.map(c => `<th class="sortable" onclick="RoktAds.sortReport('${c}')">${c} <span class="sort-arrow">${reportSort.col === c ? (reportSort.dir === 'asc' ? '↑' : '↓') : '↕'}</span></th>`).join('')}</tr>`;

    let data = campaigns.filter(c => c.status !== 'draft');
    if (reportFilters.campaign) data = data.filter(c => c.name === reportFilters.campaign);
    if (reportFilters.status) data = data.filter(c => capitalize(c.status) === reportFilters.status);

    // Sort
    if (reportSort.col) {
      const key = reportSort.col.toLowerCase();
      data.sort((a, b) => {
        let va = a[key] || 0, vb = b[key] || 0;
        if (key === 'campaign') { va = a.name; vb = b.name; return reportSort.dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va); }
        return reportSort.dir === 'asc' ? va - vb : vb - va;
      });
    }

    tbody.innerHTML = data.map(c => `<tr>
      <td class="campaign-name">${c.name}</td>
      <td class="mono">${fmtNum(c.impressions)}</td>
      <td class="mono">${fmtNum(c.clicks)}</td>
      <td class="mono">${c.ctr}%</td>
      <td class="mono">${fmtNum(c.conversions)}</td>
      <td class="mono">${c.cpa ? '$' + c.cpa.toFixed(2) : '—'}</td>
      <td class="mono">${c.roas ? c.roas + 'x' : '—'}</td>
      <td class="mono">${c.copi}%</td>
      <td class="mono">$${fmtNum(c.spend)}</td>
    </tr>`).join('');

    // Totals row
    const totals = data.reduce((acc, c) => ({
      impressions: acc.impressions + c.impressions,
      clicks: acc.clicks + c.clicks,
      conversions: acc.conversions + c.conversions,
      spend: acc.spend + c.spend,
    }), { impressions: 0, clicks: 0, conversions: 0, spend: 0 });
    const avgCTR = totals.impressions ? (totals.clicks / totals.impressions * 100).toFixed(1) : '0';
    const avgCPA = totals.conversions ? (totals.spend / totals.conversions).toFixed(2) : '0';
    tbody.innerHTML += `<tr style="font-weight:600;border-top:2px solid var(--border)">
      <td>Total / Average</td>
      <td class="mono">${fmtNum(totals.impressions)}</td>
      <td class="mono">${fmtNum(totals.clicks)}</td>
      <td class="mono">${avgCTR}%</td>
      <td class="mono">${fmtNum(totals.conversions)}</td>
      <td class="mono">$${avgCPA}</td>
      <td class="mono">—</td>
      <td class="mono">—</td>
      <td class="mono">$${fmtNum(totals.spend)}</td>
    </tr>`;
  }

  function sortReport(col) {
    if (reportSort.col === col) {
      reportSort.dir = reportSort.dir === 'desc' ? 'asc' : 'desc';
    } else {
      reportSort.col = col;
      reportSort.dir = 'desc';
    }
    renderReportTable();
  }

  let experimentFilter = 'all';

  function renderExperiments(filter) {
    if (filter !== undefined) experimentFilter = filter;
    const grid = document.getElementById('experimentsGrid');
    if (!grid) return;
    let filtered = experiments;
    if (experimentFilter === 'running') filtered = experiments.filter(e => e.status === 'running');
    else if (experimentFilter === 'concluded') filtered = experiments.filter(e => e.status === 'concluded');
    else if (experimentFilter === 'draft') filtered = experiments.filter(e => e.status === 'draft');
    grid.innerHTML = filtered.map(e => `
      <div class="experiment-card" onclick="RoktAds.openModal('editExperiment', '${e.id}')">
        <button class="hover-edit-btn" onclick="event.stopPropagation();RoktAds.editExperiment('${e.id}')" title="Edit">✏️</button>
        <div class="experiment-card-header">
          <span class="experiment-name">${e.name}</span>
          <span class="badge badge-${e.status === 'concluded' ? 'positive' : e.status === 'running' ? 'info' : 'gray'}">${capitalize(e.status)}</span>
        </div>
        <div class="experiment-meta">
          <span>${e.type} Test</span>
          <span>Campaign: ${e.campaign}</span>
          <span>Days: ${e.days}</span>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px">
            <span style="color:var(--text-tertiary)">Statistical Significance</span>
            <span class="mono" style="color:${e.significance >= 95 ? 'var(--positive)' : 'var(--text-secondary)'}">${e.significance}%</span>
          </div>
          <div class="significance-bar">
            <div class="significance-bar-fill" style="width:${e.significance}%;background:${e.significance >= 95 ? 'var(--positive)' : e.significance >= 70 ? 'var(--brand-blue)' : 'var(--text-tertiary)'}"></div>
          </div>
        </div>
        ${e.status !== 'draft' ? `<div class="experiment-result">
          <span>Leader: <strong>${e.leader}</strong></span>
          <span class="experiment-lift">${e.lift}</span>
        </div>` : ''}
        ${e.status === 'concluded' ? '<button class="btn btn-xs btn-primary btn-pill" style="margin-top:8px;width:100%" onclick="event.stopPropagation();RoktAds.toast(\'Winner applied to campaign\',\'success\')">Apply Winner</button>' : ''}
      </div>
    `).join('');
  }

  function switchIntelTab(tab) {
    const reports = document.getElementById('intelReports');
    const experiments = document.getElementById('intelExperiments');
    if (reports) reports.style.display = tab === 'reports' ? 'block' : 'none';
    if (experiments) experiments.style.display = tab === 'experiments' ? 'block' : 'none';
    $$('[data-intel-tab]').forEach(btn => btn.classList.toggle('active', btn.dataset.intelTab === tab));
  }

  // ── Catalog ────────────────────────────────────────────────
  let catalogProductFilter = 'all';

  function initCatalog() {
    renderOffers();
    renderProducts();
    initCatalogProductFilters();
  }

  function initCatalogProductFilters() {
    const productsSection = document.getElementById('catalogProducts');
    if (!productsSection) return;
    const pills = productsSection.querySelectorAll('.filter-pills .filter-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const text = pill.textContent.trim();
        if (text.includes('Low')) catalogProductFilter = 'low';
        else if (text.includes('In Stock')) catalogProductFilter = 'instock';
        else catalogProductFilter = 'all';
        renderProducts();
      });
    });
  }

  function renderOffers() {
    const grid = document.getElementById('offerGrid');
    if (!grid) return;
    const filteredOffers = getFilteredOffers();
    grid.innerHTML = filteredOffers.map(o => `
      <div class="offer-card" onclick="RoktAds.openModal('editOffer', '${o.id}')">
        <button class="hover-edit-btn" onclick="event.stopPropagation();RoktAds.editOffer('${o.id}')" title="Edit">✏️</button>
        <div class="offer-card-header">
          <div class="offer-card-icon">${o.icon}</div>
          <div>
            <div class="offer-card-name">${o.name}</div>
            <div class="offer-card-type">${o.type}</div>
          </div>
        </div>
        <div class="offer-card-stats">
          <div><div class="offer-stat-label">Value</div><div class="offer-stat-value">${o.value}</div></div>
          <div><div class="offer-stat-label">Cost</div><div class="offer-stat-value">${o.cost}</div></div>
          <div><div class="offer-stat-label">CoPI</div><div class="offer-stat-value">${o.copi}%</div></div>
        </div>
      </div>
    `).join('');
    initCardGlow();
  }

  function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    let filtered = products;
    if (catalogProductFilter === 'instock') filtered = products.filter(p => p.stock === 'In Stock');
    else if (catalogProductFilter === 'low') filtered = products.filter(p => p.stock === 'Low Stock');
    grid.innerHTML = filtered.map(p => `
      <div class="product-card">
        <div class="product-card-image">${p.icon}</div>
        <div class="product-card-body">
          <div class="product-card-name">${p.name}</div>
          <div class="product-card-price">${p.price}</div>
          <div class="product-card-stock" style="color:${p.stock === 'In Stock' ? 'var(--positive)' : p.stock === 'Low Stock' ? 'var(--warning)' : 'var(--negative)'}">${p.stock}</div>
        </div>
      </div>
    `).join('');
  }

  function switchCatalogTab(tab) {
    const offersEl = document.getElementById('catalogOffers');
    const productsEl = document.getElementById('catalogProducts');
    if (offersEl) offersEl.style.display = tab === 'offers' ? 'block' : 'none';
    if (productsEl) productsEl.style.display = tab === 'products' ? 'block' : 'none';
    $$('[data-catalog-tab]').forEach(btn => btn.classList.toggle('active', btn.dataset.catalogTab === tab));
  }

  // ── Measurement ────────────────────────────────────────────
  function initMeasurement() {
    renderIdentifierCoverage();
    renderIntegrationHealthRecs();
    renderMeasurementGroups();
  }

  function renderIdentifierCoverage() {
    const el = document.getElementById('identifierCoverage');
    if (!el) return;
    const identifiers = [
      { name: 'Email (SHA-256)', status: true, impact: 'High' },
      { name: 'Phone (SHA-256)', status: false, impact: 'Medium' },
      { name: 'Rokt Click ID', status: true, impact: 'High' },
      { name: 'IP Address', status: true, impact: 'Low' },
      { name: 'User Agent', status: true, impact: 'Low' },
      { name: 'Transaction ID', status: true, impact: 'Medium' },
    ];
    el.innerHTML = identifiers.map(id => `
      <div class="identifier-item">
        <span class="identifier-name">
          <span style="color:${id.status ? 'var(--positive)' : 'var(--negative)'};margin-right:6px">${id.status ? '✓' : '✗'}</span>
          ${id.name}
        </span>
        <span class="badge badge-${id.impact === 'High' ? 'wine' : id.impact === 'Medium' ? 'blue' : 'gray'}">${id.impact}</span>
      </div>
    `).join('');
  }

  function renderIntegrationHealthRecs() {
    const el = document.getElementById('emqRecommendations');
    if (!el) return;
    const recs = [
      { icon: '📱', text: 'Add phone number to CAPI integration', impact: '+1.5 Health' },
      { icon: '🔗', text: 'Enable server-side Click ID passback', impact: '+0.5 Health' },
      { icon: '📧', text: 'Increase email coverage from 78% to 90%', impact: '+0.3 Health' },
    ];
    el.innerHTML = recs.map(r => `
      <div class="emq-rec-item">
        <div class="emq-rec-icon">${r.icon}</div>
        <div class="emq-rec-text">${r.text}</div>
        <div class="emq-rec-impact">${r.impact}</div>
      </div>
    `).join('');
  }

  function renderMeasurementGroups() {
    const tbody = document.getElementById('measurementGroupsBody');
    if (!tbody) return;
    tbody.innerHTML = measurementGroups.map(mg => `
      <tr class="clickable" onclick="RoktAds.openModal('editMeasurementGroup', '${mg.name}')">
        <td class="campaign-name">${mg.name}</td>
        <td>${mg.campaigns}</td>
        <td><span class="badge badge-${mg.status === 'Live' ? 'positive' : 'gray'}">${mg.status}</span></td>
        <td>${mg.event}</td>
        <td class="mono">${mg.window}</td>
        <td><span class="mono" style="color:${mg.integrationHealth >= 7 ? 'var(--positive)' : mg.integrationHealth >= 5 ? 'var(--warning)' : 'var(--negative)'}">${mg.integrationHealth}</span></td>
      </tr>
    `).join('');
  }

  // ── Account ────────────────────────────────────────────────
  function initAccount() {
    renderTeamTable();
    renderIntegrations();
    renderMCPConnectors();
  }

  function renderTeamTable() {
    const tbody = document.getElementById('teamTableBody');
    if (!tbody) return;
    tbody.innerHTML = teamMembers.map(m => `
      <tr>
        <td class="campaign-name">${m.name}</td>
        <td>${m.email}</td>
        <td><span class="badge badge-${m.role === 'Admin' ? 'wine' : m.role === 'Editor' ? 'blue' : 'gray'}">${m.role}</span></td>
        <td style="color:var(--text-tertiary)">${m.lastActive}</td>
      </tr>
    `).join('');
  }

  function renderIntegrations() {
    const el = document.getElementById('integrationsGrid');
    if (!el) return;
    const integrations = [
      { name: 'Web SDK', desc: 'JavaScript snippet on checkout', status: 'connected' },
      { name: 'Conversions API (CAPI)', desc: 'Server-to-server events', status: 'connected' },
      { name: 'mParticle CDP', desc: 'Customer data platform', status: 'connected' },
      { name: 'Segment', desc: 'Event streaming', status: 'disconnected' },
      { name: 'SFTP Data Feed', desc: 'Batch data uploads', status: 'connected' },
      { name: 'Google Analytics', desc: 'Attribution sharing', status: 'disconnected' },
    ];
    el.innerHTML = `<div class="integrations-grid">${integrations.map(i => `
      <div class="integration-item">
        <span class="integration-status ${i.status}"></span>
        <div class="integration-info">
          <div class="integration-name">${i.name}</div>
          <div class="integration-desc">${i.desc}</div>
        </div>
        <button class="btn btn-xs btn-ghost">${i.status === 'connected' ? 'Configure' : 'Connect'}</button>
      </div>
    `).join('')}</div>`;
  }

  function renderMCPConnectors() {
    const el = document.getElementById('mcpConnectorsGrid');
    if (!el) return;
    const connectors = [
      { id: 'claude', name: 'Claude (Anthropic)', desc: 'Connect Claude as an AI copilot for campaign management, audience building, and creative generation via MCP', icon: '✦', status: 'connected', badge: 'MCP Server', tools: ['Campaign Management', 'Audience Builder', 'Creative Generator', 'Performance Analyzer', 'Bid Optimizer'] },
      { id: 'reporting', name: 'Reporting API', desc: 'Programmatic access to campaign metrics, spend data, and conversion reporting', icon: '📊', status: 'connected', badge: 'MCP Server', tools: ['Query Metrics', 'Export Reports', 'Schedule Dashboards'] },
      { id: 'catalog', name: 'Offer Catalog API', desc: 'Manage offers, creatives, and landing pages via the Rokt MCP server', icon: '🏷️', status: 'connected', badge: 'MCP Server', tools: ['Create Offers', 'Update Creatives', 'Manage Landing Pages'] },
      { id: 'audiences', name: 'Audience API', desc: 'Build, manage, and sync audiences programmatically. Supports lookalike generation and rule-based targeting', icon: '👥', status: 'connected', badge: 'MCP Server', tools: ['Build Audiences', 'Sync Segments', 'Lookalike Generation'] },
      { id: 'experiments', name: 'Experimentation API', desc: 'Configure and monitor A/B tests, traffic splits, and holdout groups', icon: '🧪', status: 'available', badge: 'MCP Server', tools: ['Create Experiments', 'Analyze Results', 'Apply Winners'] },
      { id: 'chatgpt', name: 'ChatGPT (OpenAI)', desc: 'Alternative AI provider for content generation and campaign summaries', icon: '🤖', status: 'available', badge: 'AI Provider', tools: ['Text Generation', 'Summarization'] },
      { id: 'gemini', name: 'Gemini (Google)', desc: 'Google AI for multi-modal creative analysis and performance prediction', icon: '💎', status: 'available', badge: 'AI Provider', tools: ['Image Analysis', 'Performance Prediction'] },
    ];
    el.innerHTML = `
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:var(--space-4)">Connect AI tools and external services via <strong>Model Context Protocol (MCP)</strong>. MCP servers expose Rokt Ads capabilities as tools that AI assistants can use to manage your campaigns.</p>
      <div class="mcp-connectors-grid">
        ${connectors.map(c => `
          <div class="mcp-connector-card ${c.status}">
            <div class="mcp-connector-header">
              <div class="mcp-connector-icon">${c.icon}</div>
              <div class="mcp-connector-info">
                <div class="mcp-connector-name">${c.name}</div>
                <span class="badge badge-${c.status === 'connected' ? 'positive' : 'gray'}" style="font-size:9px">${c.badge}</span>
              </div>
              <div class="mcp-connector-status">
                ${c.status === 'connected'
                  ? '<span class="badge badge-positive">Connected</span>'
                  : `<button class="btn btn-xs btn-primary btn-pill" onclick="this.textContent='Connecting...';this.disabled=true;setTimeout(()=>{this.closest('.mcp-connector-card').classList.replace('available','connected');this.outerHTML='<span class=\\'badge badge-positive\\'>Connected</span>';RoktAds.toast('${c.name} connected via MCP','success')},1200)">Connect</button>`
                }
              </div>
            </div>
            <div class="mcp-connector-desc">${c.desc}</div>
            <div class="mcp-connector-tools">
              <div class="mcp-tools-label">Available Tools:</div>
              <div class="mcp-tools-list">${c.tools.map(t => `<span class="mcp-tool-chip">${t}</span>`).join('')}</div>
            </div>
            ${c.id === 'claude' ? `
              <div class="mcp-claude-config">
                <div class="mcp-config-label">MCP Server Endpoint</div>
                <div class="mcp-config-value mono">mcp://rokt-ads.mcp.rokt.com/v1</div>
                <button class="btn btn-xs btn-ghost" onclick="navigator.clipboard?.writeText('mcp://rokt-ads.mcp.rokt.com/v1');RoktAds.toast('Copied MCP endpoint','success')" style="margin-top:6px">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M2 11V3a1 1 0 011-1h8"/></svg>
                  Copy Endpoint
                </button>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // ── Modal System ──────────────────────────────────────────
  function openModal(type, id) {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    if (!overlay || !content) return;

    content.className = 'modal';
    document.body.style.overflow = 'hidden';
    let html = '';

    switch (type) {
      case 'buildAudience':
        content.classList.add('modal-lg');
        html = `
          <div class="modal-header">
            <h2>Build Audience</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div style="display:grid;grid-template-columns:1fr 240px;gap:24px">
              <div>
                <div class="form-group">
                  <label class="form-label">Audience Name</label>
                  <input type="text" class="form-input" value="New Custom Audience" placeholder="Enter audience name">
                </div>
                <div class="form-group">
                  <label class="form-label">Industry Verticals <span class="badge badge-negative" style="font-size:9px">Required</span></label>
                  <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">
                    ${['Entertainment','Finance','Retail','Travel','Health','Technology','Automotive','Food & Beverage','Sports','Education','Media','Telecom'].map(v =>
                      '<label style="display:flex;align-items:center;gap:4px;padding:4px 10px;border-radius:var(--radius-pill);border:1px solid var(--border);font-size:11px;cursor:pointer;transition:all 150ms"><input type="checkbox" style="margin:0"> ' + v + '</label>'
                    ).join('')}
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Placement Type <span class="badge badge-negative" style="font-size:9px">Required</span></label>
                  <div style="display:flex;gap:8px;margin-top:4px">
                    ${[{id:'coreg',label:'Inline',desc:'Standard co-registration'},{id:'engagement',label:'Engagement',desc:'Prime placement'},{id:'pretick',label:'Pre-ticked',desc:'Pre-selected inline'},{id:'survey',label:'Survey',desc:'Solus placement'}].map(p =>
                      '<label style="display:flex;flex-direction:column;align-items:center;padding:8px 12px;border-radius:var(--radius-lg);border:1px solid var(--border);font-size:11px;cursor:pointer;text-align:center;flex:1;transition:all 150ms"><input type="radio" name="placementType" value="' + p.id + '" style="margin:0 0 4px"><strong>' + p.label + '</strong><span style="font-size:9px;color:var(--text-tertiary)">' + p.desc + '</span></label>'
                    ).join('')}
                  </div>
                </div>
                <div class="rule-group">
                  <div class="rule-group-header">
                    <span>Rules</span>
                    <div class="rule-group-logic">
                      <button class="active">AND</button>
                      <button>OR</button>
                    </div>
                  </div>
                  <div class="rule-row">
                    <select><option>Demographics</option><option>Geography</option><option>Device</option><option>Behavioral</option><option>Experian</option></select>
                    <select><option>Age Range</option><option>Gender</option><option>Income</option></select>
                    <select><option>is</option><option>is not</option><option>between</option></select>
                    <input type="text" value="25-45" placeholder="Value">
                    <button class="rule-remove">✕</button>
                  </div>
                  <div class="rule-row">
                    <select><option>Behavioral</option><option>Demographics</option><option>Geography</option></select>
                    <select><option>Interest</option><option>Purchase History</option><option>Browsing</option></select>
                    <select><option>contains</option><option>is</option></select>
                    <input type="text" value="Entertainment" placeholder="Value">
                    <button class="rule-remove">✕</button>
                  </div>
                  <button class="btn btn-xs btn-ghost" style="margin-top:8px">+ Add Rule</button>
                </div>
                <div class="form-group">
                  <label class="form-label" style="display:flex;align-items:center;gap:8px">
                    <input type="checkbox" class="form-checkbox" checked> Suppress existing customers
                  </label>
                  <div class="form-hint">Recommended for CPA campaigns to avoid showing ads to existing customers</div>
                </div>
              </div>
              <div>
                <div class="reach-estimator">
                  <div class="reach-number">14.2M</div>
                  <div class="reach-label">Estimated Reach</div>
                  <div class="reach-bar"><div class="reach-bar-fill" style="width:42%"></div></div>
                  <div style="font-size:10px;color:var(--text-tertiary);margin-top:8px">42% of Rokt network</div>
                  <div style="font-size:10px;color:var(--positive);margin-top:4px">✓ Sufficient for Smart Bidding</div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.createAudience()">Create Audience</button>
          </div>
        `;
        break;

      case 'uploadList':
        html = `
          <div class="modal-header">
            <h2>Upload Customer List</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">List Name</label>
              <input type="text" class="form-input" placeholder="e.g. Q1 2026 Purchasers">
            </div>
            <div style="border:2px dashed var(--border);border-radius:12px;padding:40px;text-align:center;margin:16px 0">
              <div style="font-size:24px;margin-bottom:8px">📁</div>
              <div style="font-size:13px;color:var(--text-secondary)">Drag & drop a CSV file here, or <a href="#">browse files</a></div>
              <div style="font-size:11px;color:var(--text-tertiary);margin-top:8px">Supported: CSV with email, phone, or hashed identifiers. Max 50MB.</div>
            </div>
            <div class="form-group">
              <label class="form-label">List Type</label>
              <select class="form-select">
                <option>Seed List (for Lookalikes)</option>
                <option>Suppression List</option>
                <option>Custom Targeting</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('List uploaded — processing...','success')">Upload & Process</button>
          </div>
        `;
        break;

      case 'createLAL':
        html = `
          <div class="modal-header">
            <h2>Create Lookalike Audience</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Seed Audience</label>
              <select class="form-select">
                ${audiences.filter(a => a.type === 'Custom').map(a => `<option>${a.name} (${a.size})</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Lookalike Tier</label>
              <div class="lal-tiers">
                <div class="lal-circle selected" style="width:100px;height:100px;background:var(--beetroot-subtle)" onclick="this.parentElement.querySelectorAll('.lal-circle').forEach(c=>c.classList.remove('selected'));this.classList.add('selected')">
                  <div><div class="lal-circle-label">Default</div><div class="lal-circle-size">~10M</div></div>
                </div>
                <div class="lal-circle" style="width:140px;height:140px;background:rgba(196,59,82,0.06)" onclick="this.parentElement.querySelectorAll('.lal-circle').forEach(c=>c.classList.remove('selected'));this.classList.add('selected')">
                  <div><div class="lal-circle-label">Broad</div><div class="lal-circle-size">~20M</div></div>
                </div>
                <div class="lal-circle" style="width:180px;height:180px;background:rgba(196,59,82,0.03)" onclick="this.parentElement.querySelectorAll('.lal-circle').forEach(c=>c.classList.remove('selected'));this.classList.add('selected')">
                  <div><div class="lal-circle-label">Broader</div><div class="lal-circle-size">~30M</div></div>
                </div>
              </div>
              <div class="form-hint" style="text-align:center">Broader tiers reach more users but may reduce precision</div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.createLookalike()">Generate Lookalike</button>
          </div>
        `;
        break;

      case 'viewAudience':
        const aud = audiences.find(a => a.id === id);
        if (!aud) return;
        html = `
          <div class="modal-header">
            <h2>${aud.icon} ${aud.name}</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:20px">
              <div class="detail-stat-card"><div class="detail-stat-label">Size</div><div class="detail-stat-value">${aud.size}</div></div>
              <div class="detail-stat-card"><div class="detail-stat-label">Match Rate</div><div class="detail-stat-value">${aud.matchRate}</div></div>
              <div class="detail-stat-card"><div class="detail-stat-label">Campaigns</div><div class="detail-stat-value">${aud.campaigns}</div></div>
            </div>
            <div style="margin-bottom:16px">
              <span class="form-label">Status</span>
              <div style="margin-top:4px"><span class="audience-freshness"><span class="freshness-dot ${aud.fresh ? 'fresh' : 'stale'}"></span> ${aud.fresh ? 'Data is fresh — last updated today' : 'Data is stale — last updated 30+ days ago'}</span></div>
            </div>
            <div>
              <span class="form-label">Type</span>
              <div style="margin-top:4px"><span class="badge badge-gray">${aud.type}</span></div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Close</button>
            <button class="btn btn-ghost" onclick="RoktAds.closeModal();RoktAds.toast('Audience refreshed','success')">Refresh</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();location.hash='campaigns'">Use in Campaign</button>
          </div>
        `;
        break;

      case 'newCreative':
        html = `
          <div class="modal-header">
            <h2>New Creative</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Creative Name</label>
              <input type="text" class="form-input" placeholder="e.g. Spring Offer — Text">
            </div>
            <div class="form-group">
              <label class="form-label">Format</label>
              <select class="form-select">
                <option>Text</option><option>Benefits</option><option>Savings</option><option>Hero Image</option><option>Product Carousel</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Linked Campaign</label>
              <select class="form-select">
                ${campaigns.map(c => `<option>${c.name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Creative created — opening editor','success')">Create & Edit</button>
          </div>
        `;
        break;

      case 'aiGenerate':
        html = `
          <div class="modal-header">
            <h2>✨ AI Generate Creatives</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Tone</label>
              <div class="filter-pills">
                <button class="filter-pill active">Rational</button>
                <button class="filter-pill">Emotive</button>
                <button class="filter-pill">Urgent</button>
                <button class="filter-pill">Playful</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Emphasis</label>
              <div class="filter-pills">
                <button class="filter-pill active">Value</button>
                <button class="filter-pill">Urgency</button>
                <button class="filter-pill">Social Proof</button>
                <button class="filter-pill">Exclusivity</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Number of Variations</label>
              <select class="form-select" style="width:auto"><option>4</option><option>6</option><option>8</option></select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Generating 4 creative variations...','info')">Generate</button>
          </div>
        `;
        break;

      case 'newOffer':
        html = `
          <div class="modal-header">
            <h2>Create Offer</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Offer Type</label>
              <div class="filter-pills" style="gap:8px">
                ${['🏷️ Discount', '🆓 Free Trial', '💰 Cashback', '📦 Shipping', '🛍️ Product'].map((t, i) =>
                  `<button class="filter-pill ${i === 0 ? 'active' : ''}" style="padding:8px 16px">${t}</button>`
                ).join('')}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Offer Value</label>
              <input type="text" class="form-input" placeholder="e.g. 30% off, $10 credit, Free trial">
            </div>
            <div class="form-group">
              <label class="form-label">Cost to Advertiser</label>
              <input type="text" class="form-input mono" placeholder="$0.00">
            </div>
            <div class="form-group">
              <label class="form-label">Validity</label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <input type="date" class="form-input" value="2026-03-20">
                <input type="date" class="form-input" value="2026-06-30">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.createOffer()">Create Offer</button>
          </div>
        `;
        break;

      case 'newExperiment':
        html = `
          <div class="modal-header">
            <h2>New Experiment</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Experiment Name</label>
              <input type="text" class="form-input" placeholder="e.g. Creative A/B Test">
            </div>
            <div class="form-group">
              <label class="form-label">Type</label>
              <div class="filter-pills">
                <button class="filter-pill active">A/B Test</button>
                <button class="filter-pill">Multi-Armed Bandit (MAB)</button>
              </div>
              <div class="form-hint" style="margin-top:8px">A/B: Fixed traffic split. MAB: Auto-optimizes traffic allocation.</div>
            </div>
            <div class="form-group">
              <label class="form-label">Campaign</label>
              <select class="form-select">${campaigns.filter(c => c.status === 'active').map(c => `<option>${c.name}</option>`).join('')}</select>
            </div>
            <div class="form-group">
              <label class="form-label">Duration (Days)</label>
              <input type="number" class="form-input mono" value="14" min="7" max="30">
            </div>
            <div class="form-group">
              <label class="form-label">Success Metric</label>
              <select class="form-select"><option>CoPI</option><option>CPA</option><option>ROAS</option><option>CTR</option><option>CVR</option></select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.createExperiment()">Create Experiment</button>
          </div>
        `;
        break;

      case 'newMeasurementGroup':
        html = `
          <div class="modal-header">
            <h2>Create Measurement Group</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Group Name</label>
              <input type="text" class="form-input" placeholder="e.g. Q2 Acquisition MG">
            </div>
            <div class="form-group">
              <label class="form-label">Optimization Event</label>
              <select class="form-select"><option>Purchase</option><option>Signup</option><option>Application Submit</option><option>Add to Cart</option><option>Custom Event</option></select>
            </div>
            <div class="form-group">
              <label class="form-label">Attribution Window</label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div>
                  <label class="form-label" style="font-size:10px;text-transform:none">Click-through (days)</label>
                  <select class="form-select"><option>7</option><option>14</option><option>30</option></select>
                </div>
                <div>
                  <label class="form-label" style="font-size:10px;text-transform:none">View-through</label>
                  <select class="form-select"><option>1 day</option><option>None</option></select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" style="display:flex;align-items:center;gap:8px">
                <input type="checkbox" class="form-checkbox"> Enable Incrementality Measurement
              </label>
              <div class="form-hint">Measures causal impact via holdout groups. Cannot be changed after activation.</div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Measurement Group created','success')">Create Group</button>
          </div>
        `;
        break;

      case 'inviteUser':
        content.classList.add('modal-sm');
        html = `
          <div class="modal-header">
            <h2>Invite Team Member</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" placeholder="name@company.com">
            </div>
            <div class="form-group">
              <label class="form-label">Role</label>
              <select class="form-select">
                <option>Viewer — Can view campaigns and reports</option>
                <option>Editor — Can create and edit campaigns</option>
                <option>Admin — Full account access</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Invitation sent','success')">Send Invite</button>
          </div>
        `;
        break;

      case 'exportReport':
        content.classList.add('modal-sm');
        html = `
          <div class="modal-header">
            <h2>Export Report</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Format</label>
              <div class="filter-pills" style="gap:8px" onclick="this.querySelectorAll('.filter-pill').forEach(p=>p.classList.remove('active'));event.target.closest('.filter-pill')?.classList.add('active')">
                <button class="filter-pill active" style="padding:8px 20px">CSV</button>
                <button class="filter-pill" style="padding:8px 20px">PDF</button>
                <button class="filter-pill" style="padding:8px 20px">Excel</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Date Range</label>
              <select class="form-select"><option>Last 7 Days</option><option>Last 30 Days</option><option>Month to Date</option><option>Custom</option></select>
            </div>
            <div class="form-group">
              <label class="form-label" style="display:flex;align-items:center;gap:8px">
                <input type="checkbox" class="form-checkbox"> Schedule recurring export
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Report exported','success')">Export</button>
          </div>
        `;
        break;

      case 'addMetric':
        content.classList.add('modal-sm');
        html = `
          <div class="modal-header">
            <h2>Add Metrics</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:12px">Select metrics to add to your report</div>
            ${['AOV', 'Revenue', 'CPiA (Incremental)', 'Incremental Lift %', 'Conversion Latency', 'Event Coverage', 'Deduplication Rate', 'Creative Diversity Score'].map(m => `
              <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border-light)">
                <input type="checkbox" class="form-checkbox" ${['AOV', 'Revenue'].includes(m) ? 'checked' : ''}>
                <span style="font-size:13px">${m}</span>
              </div>
            `).join('')}
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Metrics updated','success')">Apply</button>
          </div>
        `;
        break;

      case 'editCampaign': {
        const camp = campaigns.find(c => c.id === id);
        if (!camp) return;
        content.classList.add('modal-lg');
        html = `
          <div class="modal-header">
            <h2>Edit Campaign — ${camp.name}</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Campaign Name</label>
              <input type="text" class="form-input" value="${camp.name}" id="editCampName">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Budget</label>
                <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" class="form-input mono" value="${camp.budget}" id="editCampBudget"></div>
              </div>
              <div class="form-group">
                <label class="form-label">CPA Target</label>
                <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" step="0.01" class="form-input mono" value="${camp.cpaTarget || ''}" placeholder="N/A" id="editCampCpaTarget"></div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Status</label>
                <select class="form-select" id="editCampStatus">
                  <option value="active" ${camp.status === 'active' ? 'selected' : ''}>Active</option>
                  <option value="paused" ${camp.status === 'paused' ? 'selected' : ''}>Paused</option>
                  <option value="draft" ${camp.status === 'draft' ? 'selected' : ''}>Draft</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Objective</label>
                <select class="form-select" id="editCampObjective">
                  ${['CPA', 'ROAS'].map(o => `<option ${camp.objective === o ? 'selected' : ''}>${o}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Bid Strategy</label>
              <select class="form-select">
                <option ${camp.biddingState === 'optimizing' ? 'selected' : ''}>Smart Bidding</option>
                <option>Budget Optimization</option>
                <option>Manual Bidding</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" style="color:var(--negative)" onclick="RoktAds.closeModal();RoktAds.archiveCampaign('${camp.id}')">Archive</button>
            <div style="display:flex;gap:8px">
              <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
              <button class="btn btn-primary btn-pill" onclick="
                var c = window._editCamp;
                if (c) {
                  c.name = document.getElementById('editCampName').value;
                  c.budget = Number(document.getElementById('editCampBudget').value);
                  c.cpaTarget = Number(document.getElementById('editCampCpaTarget').value) || null;
                  c.status = document.getElementById('editCampStatus').value;
                  c.objective = document.getElementById('editCampObjective').value;
                }
                RoktAds.closeModal();
                RoktAds.toast('Campaign updated','success');
                RoktAds.navigate('campaigns');
              ">Save Changes</button>
            </div>
          </div>
        `;
        // Store reference for save handler
        window._editCamp = camp;
        break;
      }

      case 'editAudience': {
        const aud2 = audiences.find(a => a.id === id);
        if (!aud2) return;
        content.classList.add('modal-lg');
        html = `
          <div class="modal-header">
            <h2>Edit Audience — ${aud2.name}</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div style="display:grid;grid-template-columns:1fr 240px;gap:24px">
              <div>
                <div class="form-group">
                  <label class="form-label">Audience Name</label>
                  <input type="text" class="form-input" value="${aud2.name}">
                </div>
                <div class="rule-group">
                  <div class="rule-group-header">
                    <span>Rules</span>
                    <div class="rule-group-logic"><button class="active">AND</button><button>OR</button></div>
                  </div>
                  <div class="rule-row">
                    <select><option>Demographics</option><option>Geography</option><option>Device</option></select>
                    <select><option>Age Range</option><option>Gender</option><option>Income</option></select>
                    <select><option>is</option><option>is not</option><option>between</option></select>
                    <input type="text" value="25-45" placeholder="Value">
                    <button class="rule-remove">✕</button>
                  </div>
                  <button class="btn btn-xs btn-ghost" style="margin-top:8px">+ Add Rule</button>
                </div>
                <div class="form-group">
                  <label class="form-label">Type</label>
                  <select class="form-select">
                    ${['Custom', 'LAL', 'Behavioral', 'Demographic', 'Experian', 'Starter'].map(t => `<option ${aud2.type === t ? 'selected' : ''}>${t}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div>
                <div class="reach-estimator">
                  <div class="reach-number">${aud2.size}</div>
                  <div class="reach-label">Current Size</div>
                  <div class="reach-bar"><div class="reach-bar-fill" style="width:${parseInt(aud2.matchRate)}%"></div></div>
                  <div style="font-size:10px;color:var(--text-tertiary);margin-top:8px">Match Rate: ${aud2.matchRate}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" style="color:var(--negative)" onclick="RoktAds.confirmDelete('audience','${aud2.id}')">Delete</button>
            <div style="display:flex;gap:8px">
              <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
              <button class="btn btn-ghost" onclick="RoktAds.closeModal();RoktAds.toast('Audience duplicated','success')">Duplicate</button>
              <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Audience updated','success')">Save Changes</button>
            </div>
          </div>
        `;
        break;
      }

      case 'editOffer': {
        const off = offers.find(o => o.id === id);
        if (!off) return;
        html = `
          <div class="modal-header">
            <h2>Edit Offer — ${off.name}</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Offer Type</label>
              <div class="filter-pills" style="gap:8px">
                ${['🏷️ Discount', '🆓 Free Trial', '💰 Cashback', '📦 Shipping', '🛍️ Product'].map((t, i) => {
                  const types = ['discount','trial','cashback','shipping','product'];
                  return `<button class="filter-pill ${off.type === types[i] ? 'active' : ''}" style="padding:8px 16px">${t}</button>`;
                }).join('')}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Offer Value</label>
              <input type="text" class="form-input" value="${off.value}">
            </div>
            <div class="form-group">
              <label class="form-label">Cost to Advertiser</label>
              <input type="text" class="form-input mono" value="${off.cost}">
            </div>
            <div class="form-group">
              <label class="form-label">Validity</label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <input type="date" class="form-input" value="2026-03-20">
                <input type="date" class="form-input" value="2026-06-30">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" style="color:var(--negative)" onclick="RoktAds.confirmDelete('offer','${off.id}')">Delete</button>
            <div style="display:flex;gap:8px">
              <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
              <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Offer updated','success')">Save Changes</button>
            </div>
          </div>
        `;
        break;
      }

      case 'editExperiment': {
        const exp = experiments.find(e => e.id === id);
        if (!exp) return;
        const isDraft = exp.status === 'draft';
        html = `
          <div class="modal-header">
            <h2>${isDraft ? 'Edit' : 'View'} Experiment — ${exp.name}</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Experiment Name</label>
              <input type="text" class="form-input" value="${exp.name}" ${isDraft ? '' : 'disabled'}>
            </div>
            <div class="form-group">
              <label class="form-label">Type</label>
              <div class="filter-pills">
                <button class="filter-pill ${exp.type === 'A/B' ? 'active' : ''}" ${isDraft ? '' : 'disabled'}>A/B Test</button>
                <button class="filter-pill ${exp.type === 'MAB' ? 'active' : ''}" ${isDraft ? '' : 'disabled'}>Multi-Armed Bandit</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Campaign</label>
              <input type="text" class="form-input" value="${exp.campaign}" ${isDraft ? '' : 'disabled'}>
            </div>
            <div class="form-group">
              <label class="form-label">Progress</label>
              <div style="font-size:13px">${exp.days} days · Significance: <strong style="color:${exp.significance >= 95 ? 'var(--positive)' : 'var(--text-secondary)'}">${exp.significance}%</strong></div>
              <div class="significance-bar" style="margin-top:8px"><div class="significance-bar-fill" style="width:${exp.significance}%;background:${exp.significance >= 95 ? 'var(--positive)' : 'var(--brand-blue)'}"></div></div>
            </div>
            ${exp.status !== 'draft' ? `
              <div class="form-group">
                <label class="form-label">Current Leader</label>
                <div style="font-size:14px;font-weight:600">${exp.leader} · <span style="color:var(--positive)">${exp.lift}</span></div>
              </div>
            ` : ''}
          </div>
          <div class="modal-footer">
            ${exp.status === 'running' ? `<button class="btn btn-ghost" style="color:var(--warning)" onclick="RoktAds.closeModal();RoktAds.toast('Experiment paused','warning')">⏸ Pause</button>` : ''}
            <div style="display:flex;gap:8px;margin-left:auto">
              <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Close</button>
              ${exp.status === 'concluded' ? `<button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Winner applied to campaign','success')">Apply Winner</button>` : ''}
              ${isDraft ? `<button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Experiment updated','success')">Save Changes</button>` : ''}
            </div>
          </div>
        `;
        break;
      }

      case 'editMeasurementGroup': {
        const mg = measurementGroups.find(m => m.name === id);
        if (!mg) return;
        html = `
          <div class="modal-header">
            <h2>Edit Measurement Group</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Group Name</label>
              <input type="text" class="form-input" value="${mg.name}">
            </div>
            <div class="form-group">
              <label class="form-label">Linked Campaigns</label>
              <input type="text" class="form-input" value="${mg.campaigns}" disabled>
              <div class="form-hint">Change linked campaigns via the campaign builder</div>
            </div>
            <div class="form-group">
              <label class="form-label">Optimization Event</label>
              <select class="form-select">
                ${['Purchase', 'Signup', 'Application Submit', 'Add to Cart', 'Custom Event'].map(e => `<option ${mg.event === e ? 'selected' : ''}>${e}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Attribution Window</label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div>
                  <label class="form-label" style="font-size:10px;text-transform:none">Click-through</label>
                  <select class="form-select"><option ${mg.window.includes('7C') ? 'selected' : ''}>7 days</option><option ${mg.window.includes('14C') ? 'selected' : ''}>14 days</option><option ${mg.window.includes('30C') ? 'selected' : ''}>30 days</option></select>
                </div>
                <div>
                  <label class="form-label" style="font-size:10px;text-transform:none">View-through</label>
                  <select class="form-select"><option ${mg.window.includes('1V') ? 'selected' : ''}>1 day</option><option>None</option></select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Integration Health</label>
              <div style="font-size:18px;font-weight:700;color:${mg.integrationHealth >= 7 ? 'var(--positive)' : mg.integrationHealth >= 5 ? 'var(--warning)' : 'var(--negative)'}">${mg.integrationHealth} / 10</div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Measurement group updated','success')">Save Changes</button>
          </div>
        `;
        break;
      }

      case 'newProductSet':
        html = `
          <div class="modal-header">
            <h2>Create Product Set</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Set Name</label>
              <input type="text" class="form-input" placeholder="e.g. Summer Collection">
            </div>
            <div class="form-group">
              <label class="form-label">Selection Method</label>
              <div class="filter-pills" style="gap:8px">
                <button class="filter-pill active" style="padding:8px 16px">Manual Selection</button>
                <button class="filter-pill" style="padding:8px 16px">Rule-Based</button>
                <button class="filter-pill" style="padding:8px 16px">AI Recommended</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Products</label>
              ${products.map(p => `
                <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border-light)">
                  <input type="checkbox" class="form-checkbox" ${p.stock !== 'Out of Stock' ? 'checked' : ''}>
                  <span>${p.icon} ${p.name}</span>
                  <span class="mono" style="margin-left:auto;font-size:11px">${p.price}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="RoktAds.closeModal()">Cancel</button>
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Product set created','success')">Create Set</button>
          </div>
        `;
        break;

      default:
        html = `
          <div class="modal-header">
            <h2>Coming Soon</h2>
            <button class="modal-close" onclick="RoktAds.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="empty-state">
              <div class="empty-state-icon">🚧</div>
              <div class="empty-state-title">Feature in Development</div>
              <div class="empty-state-desc">This feature is being built. Check back soon!</div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal()">OK</button>
          </div>
        `;
    }

    content.innerHTML = html;
    overlay.classList.add('open');

    // Wire up logic-toggle buttons inside modal
    content.querySelectorAll('.rule-group-logic button').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Wire up filter pills inside modal
    content.querySelectorAll('.filter-pills').forEach(group => {
      group.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          group.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
        });
      });
    });
  }

  function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── Filter Dropdowns ──────────────────────────────────────
  function toggleFilter(filterType) {
    const dropdown = document.getElementById('filterDropdown');
    if (!dropdown) return;

    if (dropdown.style.display === 'block' && dropdown.dataset.type === filterType) {
      dropdown.style.display = 'none';
      return;
    }

    dropdown.dataset.type = filterType;
    let items = [];
    if (filterType === 'campaign') items = campaigns.map(c => c.name);
    else if (filterType === 'adset') items = ['Broad — Women 25-45', 'LAL — Streaming Subs', 'Finance Decision Makers'];
    else if (filterType === 'creative') items = creatives.map(c => c.name);
    else if (filterType === 'status') items = ['Active', 'Paused', 'Draft'];

    dropdown.innerHTML = items.map(i => `
      <div class="filter-dropdown-item" onclick="RoktAds.applyFilter('${filterType}','${i}')">
        <input type="checkbox" class="form-checkbox" style="pointer-events:none">
        <span>${i}</span>
      </div>
    `).join('');
    dropdown.style.display = 'block';

    // Position near clicked button
    const btn = document.getElementById('filter' + capitalize(filterType));
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const parent = dropdown.parentElement.getBoundingClientRect();
      dropdown.style.left = (rect.left - parent.left) + 'px';
      dropdown.style.top = '100%';
    }
  }

  function applyFilter(type, value) {
    if (reportFilters[type] === value) { reportFilters[type] = null; const btn = document.getElementById('filter' + capitalize(type)); if (btn) btn.classList.remove('filter-active'); toast('Filter cleared: ' + type, 'info'); }
    else { reportFilters[type] = value; const btn = document.getElementById('filter' + capitalize(type)); if (btn) btn.classList.add('filter-active'); toast('Filtered by ' + type + ': ' + value, 'info'); }
    const dropdown = document.getElementById('filterDropdown');
    if (dropdown) dropdown.style.display = 'none';
    renderReportTable();
    renderReportChart();
  }

  // ── Toast ──────────────────────────────────────────────────
  function toast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ'}</span>${message}`;
    container.appendChild(el);
    setTimeout(() => {
      el.classList.add('removing');
      setTimeout(() => el.remove(), 300);
    }, 3500);
  }

  // ── Command Palette ────────────────────────────────────────
  function initCommandPalette() {
    const overlay = document.getElementById('commandPalette');
    const input = document.getElementById('commandInput');
    const results = document.getElementById('commandResults');
    if (!overlay || !input || !results) return;

    const commands = [
      { group: 'Navigate', items: [
        { icon: '📊', text: 'Command Center', shortcut: 'G D', action: () => navigate('dashboard') },
        { icon: '📋', text: 'Campaigns', shortcut: 'G C', action: () => navigate('campaigns') },
        { icon: '👥', text: 'Audiences', shortcut: 'G A', action: () => navigate('audiences') },
        { icon: '🎨', text: 'Creative Studio', action: () => navigate('creatives') },
        { icon: '📈', text: 'Intelligence', shortcut: 'G R', action: () => navigate('intelligence') },
        { icon: '🏷️', text: 'Offers', action: () => navigate('offers') },
        { icon: '🎯', text: 'Measurement', action: () => navigate('measurement') },
        { icon: '⚙️', text: 'Account', action: () => navigate('account') },
      ]},
      { group: 'Actions', items: [
        { icon: '➕', text: 'New Campaign', shortcut: 'N C', action: () => navigate('builder') },
        { icon: '👥', text: 'New Audience', shortcut: 'N A', action: () => { navigate('audiences'); setTimeout(() => openModal('buildAudience'), 200); } },
        { icon: '🎨', text: 'New Creative', action: () => { navigate('creatives'); setTimeout(() => openModal('newCreative'), 200); } },
        { icon: '🧪', text: 'New Experiment', action: () => { navigate('intelligence'); setTimeout(() => openModal('newExperiment'), 200); } },
      ]},
      { group: 'Campaigns', items: campaigns.map(c => ({
        icon: c.status === 'active' ? '🟢' : c.status === 'paused' ? '🟡' : '⚪',
        text: c.name,
        action: () => { navigate('campaigns'); setTimeout(() => openCampaignDetail(c.id), 200); },
      }))},
      { group: 'Audiences', items: audiences.slice(0, 6).map(a => ({
        icon: a.icon, text: a.name,
        action: () => { navigate('audiences'); setTimeout(() => openModal('viewAudience', a.id), 200); },
      }))},
      { group: 'Offers', items: offers.map(o => ({
        icon: o.icon, text: o.name + ' (' + o.type + ')',
        action: () => { navigate('offers'); setTimeout(() => openModal('editOffer', o.id), 200); },
      }))},
    ];

    function renderCommands(query = '') {
      const q = query.toLowerCase().trim();
      let html = '';
      commands.forEach(group => {
        const filtered = group.items.filter(item =>
          !q || item.text.toLowerCase().includes(q)
        );
        if (filtered.length > 0) {
          html += `<div class="command-group-label">${group.group}</div>`;
          filtered.forEach(item => {
            html += `<div class="command-item" data-action="true">
              <span class="command-item-icon">${item.icon}</span>
              <span class="command-item-text">${item.text}</span>
              ${item.shortcut ? `<span class="command-item-shortcut">${item.shortcut}</span>` : ''}
            </div>`;
          });
        }
      });
      if (!html) html = '<div style="padding:16px;text-align:center;color:var(--text-tertiary);font-size:13px">No results found</div>';
      results.innerHTML = html;

      // Click handlers
      let idx = 0;
      results.querySelectorAll('.command-item').forEach(item => {
        const flatItems = commands.flatMap(g => g.items.filter(i => !q || i.text.toLowerCase().includes(q)));
        const i = idx++;
        item.addEventListener('click', () => {
          closeCommandPalette();
          flatItems[i]?.action();
        });
      });

      // Select first
      const first = results.querySelector('.command-item');
      if (first) first.classList.add('selected');
    }

    input.addEventListener('input', () => renderCommands(input.value));

    // Keyboard navigation within palette
    input.addEventListener('keydown', (e) => {
      const items = results.querySelectorAll('.command-item');
      const current = results.querySelector('.command-item.selected');
      const idx = Array.from(items).indexOf(current);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items.forEach(i => i.classList.remove('selected'));
        items[(idx + 1) % items.length]?.classList.add('selected');
        items[(idx + 1) % items.length]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items.forEach(i => i.classList.remove('selected'));
        items[(idx - 1 + items.length) % items.length]?.classList.add('selected');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        current?.click();
      }
    });

    renderCommands();
  }

  function openCommandPalette() {
    const overlay = document.getElementById('commandPalette');
    const input = document.getElementById('commandInput');
    if (!overlay) return;
    overlay.classList.add('open');
    if (input) { input.value = ''; input.focus(); }
    initCommandPalette();
  }

  function closeCommandPalette() {
    const overlay = document.getElementById('commandPalette');
    if (overlay) overlay.classList.remove('open');
  }

  // ── Keyboard Chord Indicator ──────────────────────────────
  let keyChordEl = null;
  function showKeyChord(key) {
    hideKeyChord();
    keyChordEl = document.createElement('div');
    keyChordEl.className = 'key-chord-indicator';
    const labels = { g: 'Go to...', n: 'New...' };
    const hints = { g: [{key:'D',label:'Dashboard'},{key:'C',label:'Campaigns'},{key:'A',label:'Audiences'},{key:'R',label:'Intelligence'}], n: [{key:'C',label:'Campaign'},{key:'A',label:'Audience'}] };
    const hintHtml = (hints[key] || []).map(h => `<span><kbd>${h.key}</kbd>${h.label}</span>`).join('');
    keyChordEl.innerHTML = `<kbd>${key.toUpperCase()}</kbd> ${labels[key] || '...'}<div class="chord-hints">${hintHtml}</div>`;
    document.body.appendChild(keyChordEl);
  }
  function hideKeyChord() {
    if (keyChordEl) { keyChordEl.remove(); keyChordEl = null; }
  }

  // ── Keyboard Shortcuts ────────────────────────────────────
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Escape — ALWAYS close overlays/modals, even from inputs
      if (e.key === 'Escape') {
        e.preventDefault();
        closeCommandPalette();
        closeModal();
        const shortcuts = document.getElementById('shortcutsOverlay');
        if (shortcuts) shortcuts.classList.remove('open');
        const aiDrawer = document.getElementById('aiDrawer');
        if (aiDrawer) aiDrawer.classList.remove('open');
        closeAccountSwitcher();
        closeCampaignDetail();
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
          e.target.blur();
        }
        return;
      }

      // Don't trigger other shortcuts in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
      }

      // Cmd+K — Command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openCommandPalette();
        return;
      }

      // Cmd+D — Toggle theme
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
        return;
      }

      // ? — Show shortcuts
      if (e.key === '?') {
        const shortcuts = document.getElementById('shortcutsOverlay');
        if (shortcuts) shortcuts.classList.toggle('open');
        return;
      }

      // / — Focus search
      if (e.key === '/') {
        e.preventDefault();
        openCommandPalette();
        return;
      }

      // Two-key shortcuts (g+key, n+key)
      if (pendingKey) {
        clearTimeout(pendingKeyTimer);
        hideKeyChord();
        const combo = pendingKey + e.key.toLowerCase();
        pendingKey = null;

        const shortcuts = {
          'gd': () => { location.hash = 'dashboard'; },
          'gc': () => { location.hash = 'campaigns'; },
          'ga': () => { location.hash = 'audiences'; },
          'gr': () => { location.hash = 'intelligence'; },
          'nc': () => { location.hash = 'builder'; },
          'na': () => { navigate('audiences'); setTimeout(() => openModal('buildAudience'), 200); },
        };

        if (shortcuts[combo]) {
          e.preventDefault();
          shortcuts[combo]();
        }
        return;
      }

      // j/k table navigation
      if (e.key === 'j' || e.key === 'k') {
        const rows = document.querySelectorAll('.data-table tbody tr.clickable');
        if (rows.length === 0) return;
        const currentIdx = Array.from(rows).findIndex(r => r.classList.contains('selected'));
        let nextIdx;
        if (e.key === 'j') nextIdx = Math.min(currentIdx + 1, rows.length - 1);
        else nextIdx = Math.max(currentIdx - 1, 0);
        if (nextIdx >= 0 && rows[nextIdx]) {
          rows[nextIdx].click();
          rows[nextIdx].scrollIntoView({ block: 'nearest' });
        }
        return;
      }

      if (e.key === 'g' || e.key === 'n') {
        pendingKey = e.key;
        showKeyChord(e.key);
        pendingKeyTimer = setTimeout(() => {
          pendingKey = null;
          hideKeyChord();
        }, 500);
        return;
      }
    });
  }

  // ── AI Sparkle Effect ─────────────────────────────────────
  let sparkleCount = 0;
  function initAISparkles() {
    document.querySelectorAll('.ai-badge, .ai-rec-card, .ai-hero-section, .sidebar-ai-btn, .ai-monitor, .ai-analysis-card').forEach(el => {
      if (el._sparkleInit) return;
      el._sparkleInit = true;
      el.addEventListener('mousemove', e => {
        if (sparkleCount > 8) return;
        sparkleCount++;
        const s = document.createElement('div');
        s.className = 'cursor-sparkle';
        s.style.left = (e.clientX + (Math.random()-0.5)*12) + 'px';
        s.style.top = (e.clientY + (Math.random()-0.5)*12) + 'px';
        document.body.appendChild(s);
        setTimeout(() => { s.remove(); sparkleCount--; }, 500);
      });
    });
  }

  // ── AI Drawer Toggle ────────────────────────────────────────
  function toggleAIDrawer() {
    const drawer = document.getElementById('aiDrawer');
    if (drawer) drawer.classList.toggle('open');
  }

  // ── AI Copilot ─────────────────────────────────────────────
  function initAICopilot() {
    const fab = document.getElementById('aiFab');
    const drawer = document.getElementById('aiDrawer');
    const closeBtn = document.getElementById('aiDrawerClose');
    const input = document.getElementById('aiInput');
    const sendBtn = document.getElementById('aiSendBtn');
    const messages = document.getElementById('aiMessages');

    if (fab) fab.addEventListener('click', () => {
      if (drawer) drawer.classList.toggle('open');
    });
    if (closeBtn) closeBtn.addEventListener('click', () => {
      if (drawer) drawer.classList.remove('open');
    });

    function sendMessage() {
      if (!input || !messages) return;
      const text = input.value.trim();
      if (!text) return;

      // Add user message
      const userMsg = document.createElement('div');
      userMsg.className = 'ai-message user';
      userMsg.textContent = text;
      messages.appendChild(userMsg);
      input.value = '';

      // Show typing indicator
      const typing = document.createElement('div');
      typing.className = 'ai-message assistant';
      typing.innerHTML = '<div class="ai-typing"><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div></div>';
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;

      // Contextual AI response
      setTimeout(() => {
        typing.remove();
        const lowerText = text.toLowerCase();
        let resp;

        if (lowerText.includes('pause') || lowerText.includes('stop')) {
          const matchedCamps = campaigns.filter(c => c.status === 'active' && (lowerText.includes('all') || c.name.toLowerCase().split(' ').some(w => lowerText.includes(w.toLowerCase()))));
          resp = {
            text: `I found <strong>${matchedCamps.length || 'several'} campaigns</strong> matching your request. Here's a preview of the changes:`,
            actions: matchedCamps.slice(0, 3).map(c => `<div class="ai-action-card"><span>⏸ Pause <strong>${c.name}</strong></span><span class="action-apply" onclick="RoktAds.toggleCampaignStatus('${c.id}')">Apply</span></div>`).join('')
          };
        } else if (lowerText.includes('how') && (lowerText.includes('campaign') || lowerText.includes('doing') || lowerText.includes('performance'))) {
          const active = campaigns.filter(c => c.status === 'active');
          const avgCpa = (active.reduce((s, c) => s + c.cpa, 0) / active.length).toFixed(2);
          const totalConv = active.reduce((s, c) => s + c.conversions, 0);
          resp = {
            text: `<strong>Portfolio Summary</strong><br/>` +
              `• <strong>${active.length}</strong> active campaigns spending <strong>$${fmtNum(active.reduce((s,c) => s + c.spend, 0))}</strong><br/>` +
              `• Avg CPA: <strong>$${avgCpa}</strong> across <strong>${fmtNum(totalConv)}</strong> conversions<br/>` +
              `• Top performer: <strong>Disney+ Spring</strong> at $5.82 CPA (23% below target)<br/>` +
              `• ⚠️ Hulu CPA is 22% above target — recommend expanding LAL audience`,
            actions: '<div class="ai-action-card"><span>📊 Open full Intelligence report</span><span class="action-apply" onclick="location.hash=\'intelligence\'">Go</span></div>'
          };
        } else if (lowerText.includes('creative') || lowerText.includes('headline') || lowerText.includes('generate')) {
          resp = {
            text: `Here are <strong>3 headline variations</strong> with predicted performance:`,
            actions: [
              { title: 'Stream 10,000+ titles — 30% off today', score: 8.7 },
              { title: 'Your next binge starts here. Save 30%', score: 7.9 },
              { title: 'Disney+ for less. Limited time offer.', score: 7.2 },
            ].map(v => `<div class="ai-action-card"><span style="flex:1"><strong>${v.title}</strong><br/><span style="color:var(--positive);font-size:10px;font-family:var(--font-mono)">Score: ${v.score}/10</span></span><span class="action-apply" onclick="RoktAds.toast('Creative applied','success')">Use</span></div>`).join('')
          };
        } else if (lowerText.includes('budget') || lowerText.includes('spend')) {
          resp = {
            text: `<strong>Budget Analysis:</strong><br/>` +
              `• Capital One is hitting daily cap before noon — <strong>20% increase recommended</strong><br/>` +
              `• Disney+ has $32.8K remaining budget, pacing well at 56% through<br/>` +
              `• PayPal is paused with $11.1K unspent budget`,
            actions: '<div class="ai-action-card"><span>💰 Increase Capital One budget by 20%</span><span class="action-apply" onclick="RoktAds.toast(\'Budget updated\',\'success\')">Apply</span></div>'
          };
        } else {
          resp = {
            text: `I analyzed your request. Based on current campaign data, here's what I recommend:`,
            actions: '<div class="ai-actions" style="margin-top:8px"><button class="btn btn-xs btn-primary btn-pill" onclick="RoktAds.toast(\'Action applied\',\'success\')">Apply Suggestion</button><button class="btn btn-xs btn-ghost">More Details</button></div>'
          };
        }

        const aiMsg = document.createElement('div');
        aiMsg.className = 'ai-message assistant';
        aiMsg.innerHTML = `<p>${resp.text}</p>${resp.actions || ''}`;
        messages.appendChild(aiMsg);
        messages.scrollTop = messages.scrollHeight;
      }, 1200);
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (input) input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // ── Theme Toggle ──────────────────────────────────────────
  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);

    const sun = document.querySelector('.icon-sun');
    const moon = document.querySelector('.icon-moon');
    if (sun) sun.style.display = next === 'dark' ? 'block' : 'none';
    if (moon) moon.style.display = next === 'light' ? 'block' : 'none';

    toast(`Switched to ${next} mode`, 'info');
  }

  // ── Search Placeholder Cycling ────────────────────────────
  function initSearchPlaceholder() {
    const el = document.getElementById('searchPlaceholder');
    if (!el) return;
    const texts = ['Search campaigns...', 'Jump to reports...', 'Ask AI anything...', 'Find audiences...'];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % texts.length;
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = texts[idx];
        el.style.opacity = '1';
      }, 200);
    }, 3000);
    el.style.transition = 'opacity 200ms';
  }

  // ── Initialization ─────────────────────────────────────────
  function init() {
    // Router: hash-based navigation
    function handleRoute() {
      const hash = location.hash.slice(1) || 'dashboard';
      navigate(hash);
    }
    window.addEventListener('hashchange', handleRoute);

    // Sidebar links
    $$('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        location.hash = item.dataset.view;
      });
    });

    // Sidebar collapse
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    if (toggleBtn) toggleBtn.addEventListener('click', () => {
      document.getElementById('app')?.classList.toggle('sidebar-collapsed');
    });

    // Search trigger
    const searchTrigger = document.getElementById('searchTrigger');
    if (searchTrigger) searchTrigger.addEventListener('click', openCommandPalette);

    // Command palette overlay close on bg click
    const cmdOverlay = document.getElementById('commandPalette');
    if (cmdOverlay) cmdOverlay.addEventListener('click', (e) => {
      if (e.target === cmdOverlay) closeCommandPalette();
    });

    // Shortcuts overlay
    const shortcutsBtn = document.getElementById('shortcutsBtn');
    const shortcutsOverlay = document.getElementById('shortcutsOverlay');
    const shortcutsClose = document.getElementById('shortcutsClose');
    if (shortcutsBtn) shortcutsBtn.addEventListener('click', () => {
      if (shortcutsOverlay) shortcutsOverlay.classList.toggle('open');
    });
    if (shortcutsClose) shortcutsClose.addEventListener('click', () => {
      if (shortcutsOverlay) shortcutsOverlay.classList.remove('open');
    });
    if (shortcutsOverlay) shortcutsOverlay.addEventListener('click', (e) => {
      if (e.target === shortcutsOverlay) shortcutsOverlay.classList.remove('open');
    });

    // Modal overlay close on bg click (not on scrollbar area)
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) modalOverlay.addEventListener('mousedown', (e) => {
      if (e.target === modalOverlay) {
        // Only close if the click is actually on the backdrop, not the scrollbar
        const modal = modalOverlay.querySelector('.modal');
        if (modal) {
          const rect = modal.getBoundingClientRect();
          if (e.clientX < rect.left || e.clientX > rect.right ||
              e.clientY < rect.top || e.clientY > rect.bottom) {
            closeModal();
          }
        } else {
          closeModal();
        }
      }
    });

    // Context alert dismiss and action
    const alertDismiss = document.getElementById('contextAlertDismiss');
    if (alertDismiss) alertDismiss.addEventListener('click', () => {
      document.getElementById('contextAlert').style.display = 'none';
    });
    const alertAction = document.getElementById('contextAlertAction');
    if (alertAction) alertAction.addEventListener('click', () => {
      const alertText = (document.getElementById('contextAlertText') || {}).textContent || '';
      if (alertText.includes('Integration Health') || alertText.includes('conversion tracking') || alertText.includes('CAPI')) {
        location.hash = 'measurement';
        toast('Navigated to Measurement \u2014 check Integration Health', 'info');
      } else if (alertText.includes('Creative refresh') || alertText.includes('creative')) {
        location.hash = 'creatives';
        toast('Navigated to Creative Studio \u2014 review overdue creatives', 'info');
      } else {
        location.hash = 'intelligence';
        toast('Navigated to Intelligence', 'info');
      }
    });

    // Notification dropdown toggle
    const notifBtn = document.getElementById('notificationBtn');
    const notifDrop = document.getElementById('notifDropdown');
    if (notifBtn && notifDrop) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDrop.style.display = notifDrop.style.display === 'none' ? 'block' : 'none';
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.notif-wrap')) notifDrop.style.display = 'none';
      });
      notifDrop.querySelectorAll('.notif-item').forEach((item, idx) => {
        item.addEventListener('click', () => {
          notifDrop.style.display = 'none';
          if (idx === 0) { location.hash = 'measurement'; toast('Navigated to Measurement \u2014 check Integration Health', 'info'); }
          else if (idx === 1) { location.hash = 'campaigns'; setTimeout(() => openCampaignDetail('c2'), 300); }
          else if (idx === 2) { location.hash = 'intelligence'; setTimeout(() => switchIntelTab('experiments'), 300); }
          else { location.hash = 'intelligence'; }
        });
      });
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    // AI monitor indicator click handler
    document.getElementById('aiMonitor')?.addEventListener('click', () => toggleAIDrawer());

    // Account switcher
    const acctBtn = document.querySelector('.account-switcher-btn');
    if (acctBtn) acctBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAccountSwitcher();
    });

    // Sidebar Switch Advertiser button
    const switchAdvBtn = document.getElementById('sidebarSwitchAdv');
    if (switchAdvBtn) switchAdvBtn.addEventListener('click', () => showAdvertiserPicker());

    // Init subsystems
    initKeyboardShortcuts();
    initAICopilot();
    initSearchPlaceholder();

    // Show advertiser picker on boot (no advertiser selected yet)
    if (!selectedAdvertiser) {
      renderAdvertiserPicker();
      // Wire picker search
      const pickerSearch = document.getElementById('pickerSearch');
      if (pickerSearch) {
        pickerSearch.oninput = () => renderAdvertiserPicker(pickerSearch.value);
      }
    } else {
      // If advertiser already set (e.g. reload), go directly to app
      document.getElementById('advertiserPicker')?.classList.add('picker-hidden');
      document.getElementById('app')?.classList.remove('app-hidden');
      handleRoute();
      updateNavBadges();
      updateStatusBar();
    }
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── Edit Workflows (Phase 2) ────────────────────────────────

  function toggleCampaignStatus(id) {
    const c = campaigns.find(x => x.id === id);
    if (!c) return;
    if (c.status === 'active' || c.status === 'requires_action') {
      c.status = 'paused';
      toast(`${c.name} paused`, 'warning');
    } else if (c.status === 'paused') {
      c.status = 'active';
      toast(`${c.name} resumed`, 'success');
    }
    // Re-render
    if (currentView === 'campaigns') {
      renderCampaignTable();
      openCampaignDetail(id);
    }
  }

  function editAudience(id) {
    const aud = audiences.find(a => a.id === id);
    if (!aud) return;
    openModal('editAudience', id);
  }

  function editOffer(id) {
    openModal('editOffer', id);
  }

  function editExperiment(id) {
    openModal('editExperiment', id);
  }

  function editMeasurementGroup(name) {
    openModal('editMeasurementGroup', name);
  }

  // ── Account/Advertiser Switcher ──────────────────────────────
  function toggleAccountSwitcher() {
    accountSwitcherOpen = !accountSwitcherOpen;
    renderAccountSwitcher();
  }

  function closeAccountSwitcher() {
    if (!accountSwitcherOpen) return;
    accountSwitcherOpen = false;
    const dropdown = document.querySelector('.account-switcher-dropdown');
    if (dropdown) dropdown.remove();
  }

  function renderAccountSwitcher() {
    // Remove existing
    const existing = document.querySelector('.account-switcher-dropdown');
    if (existing) existing.remove();
    if (!accountSwitcherOpen) return;

    const switcher = document.querySelector('.account-switcher');
    if (!switcher) return;

    const currentAdv = getSelectedAdvertiserData();
    const dropdown = document.createElement('div');
    dropdown.className = 'account-switcher-dropdown';

    // Current advertiser header
    const headerName = currentAdv ? currentAdv.name : 'All Advertisers';
    const headerAvatar = currentAdv ? currentAdv.avatar : 'RA';
    const headerColor = currentAdv ? currentAdv.color : 'var(--beetroot)';

    dropdown.innerHTML = `
      <div class="account-switcher-header">
        <div class="account-avatar-lg" style="background:${headerColor}">${headerAvatar}</div>
        <div class="account-switcher-info">
          <div class="account-name-lg">${headerName}</div>
          <div class="account-id">ACC-2847291</div>
        </div>
      </div>
      <div class="account-switcher-section">
        <div class="account-switcher-section-label">Quick Switch</div>
        ${selectedAdvertiser && selectedAdvertiser !== 'all' ? `
          <div class="advertiser-item active" data-adv="${selectedAdvertiser}">
            <div class="advertiser-avatar" style="background:${currentAdv ? currentAdv.color : ''}">${currentAdv ? currentAdv.avatar : ''}</div>
            <span class="advertiser-name">${currentAdv ? currentAdv.name : ''}</span>
            <span class="advertiser-check">&#10003;</span>
          </div>
          <div class="adv-divider"></div>
        ` : ''}
        ${advertisers.filter(a => a.id !== selectedAdvertiser).map(a => `
          <div class="advertiser-item" data-adv="${a.id}">
            <div class="advertiser-avatar" style="background:${a.color}">${a.avatar}</div>
            <span class="advertiser-name">${a.name}</span>
            ${a.favorited ? '<span class="adv-fav-star">&#9733;</span>' : ''}
          </div>
        `).join('')}
        <div class="adv-divider"></div>
        <div class="adv-view-all" data-adv="picker">
          &#8592; View All Advertisers
        </div>
      </div>
    `;

    switcher.appendChild(dropdown);

    // Wire click handlers
    dropdown.querySelectorAll('.advertiser-item').forEach(item => {
      item.addEventListener('click', () => {
        const advId = item.dataset.adv;
        closeAccountSwitcher();
        switchAdvertiser(advId);
      });
    });

    // View all advertisers -> show picker
    const viewAllBtn = dropdown.querySelector('.adv-view-all');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', () => {
        closeAccountSwitcher();
        showAdvertiserPicker();
      });
    }

    // Close on outside click
    setTimeout(() => {
      const handler = (e) => {
        if (!e.target.closest('.account-switcher')) {
          closeAccountSwitcher();
          document.removeEventListener('click', handler);
        }
      };
      document.addEventListener('click', handler);
    }, 0);
  }

  // ── Nav Badge Updates ──────────────────────────────────────
  function updateNavBadges() {
    const badge = document.getElementById('navCampaignBadge');
    if (badge) {
      const actionCount = getFilteredCampaigns().filter(c => c.status === 'requires_action').length;
      badge.textContent = actionCount > 0 ? actionCount : '';
      badge.style.display = actionCount > 0 ? 'flex' : 'none';
    }
  }

  function getFilteredCampaigns() {
    if (!selectedAdvertiser || selectedAdvertiser === 'all') return campaigns;
    const advData = advertisers.find(a => a.id === selectedAdvertiser);
    if (!advData) return campaigns;
    return campaigns.filter(c => advData.campaigns.includes(c.id));
  }

  function getFilteredAudiences() {
    if (!selectedAdvertiser || selectedAdvertiser === 'all') return audiences;
    const ids = advertiserAudiences[selectedAdvertiser];
    if (!ids) return audiences;
    return audiences.filter(a => ids.includes(a.id));
  }

  function getFilteredCreatives() {
    if (!selectedAdvertiser || selectedAdvertiser === 'all') return creatives;
    const ids = advertiserCreatives[selectedAdvertiser];
    if (!ids) return creatives;
    return creatives.filter(c => ids.includes(c.id));
  }

  function getFilteredOffers() {
    if (!selectedAdvertiser || selectedAdvertiser === 'all') return offers;
    const ids = advertiserOffers[selectedAdvertiser];
    if (!ids) return offers;
    return offers.filter(o => ids.includes(o.id));
  }

  function getSelectedAdvertiserData() {
    if (!selectedAdvertiser || selectedAdvertiser === 'all') return null;
    return advertisers.find(a => a.id === selectedAdvertiser) || null;
  }


  // \u2500\u2500 CRUD Operations \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  function createAudience() {
    const nameInput = document.querySelector('#modalContent .form-input');
    const name = nameInput ? nameInput.value : 'New Custom Audience';
    audiences.push({ id: 'a' + (audiences.length + 1), name, type: 'Custom', icon: '\ud83d\udc65', size: (Math.random() * 20 + 1).toFixed(1) + 'M', campaigns: 0, fresh: true, matchRate: (Math.random() * 30 + 60).toFixed(0) + '%' });
    closeModal(); toast('Audience created successfully', 'success');
    if (currentView === 'audiences') { renderAudienceGrid(); updateAudienceCounts(); }
  }

  function createLookalike() {
    const sel = document.querySelector('#modalContent .form-select');
    const seedName = sel ? sel.options[sel.selectedIndex].text : 'Seed';
    const tierEl = document.querySelector('#modalContent .lal-circle.selected .lal-circle-label');
    const tier = tierEl ? tierEl.textContent : 'Default';
    const sizeMap = { Default: '10.1M', Broad: '20.4M', Broader: '30.8M' };
    audiences.push({ id: 'a' + (audiences.length + 1), name: seedName.split(' (')[0] + ' LAL (' + tier + ')', type: 'LAL', icon: '\ud83d\udd04', size: sizeMap[tier] || '10.1M', campaigns: 0, fresh: true, matchRate: (Math.random() * 20 + 55).toFixed(0) + '%' });
    closeModal(); toast('Lookalike audience generating...', 'success');
    if (currentView === 'audiences') { renderAudienceGrid(); updateAudienceCounts(); }
  }

  function createOffer() {
    const inputs = document.querySelectorAll('#modalContent .form-input');
    const value = inputs[0] ? inputs[0].value : 'New Offer';
    const cost = inputs[1] ? inputs[1].value : '$0.00';
    const ap = document.querySelector('#modalContent .filter-pills .filter-pill.active');
    const tl = ap ? ap.textContent.trim() : 'Discount';
    const tm = { Discount: 'discount', Trial: 'trial', Cashback: 'cashback', Shipping: 'shipping', Product: 'product' };
    const type = Object.entries(tm).find(([k]) => tl.includes(k))?.[1] || 'discount';
    const im = { discount: '\ud83c\udff7\ufe0f', trial: '\ud83c\udd93', cashback: '\ud83d\udcb0', shipping: '\ud83d\udce6', product: '\ud83d\udecd\ufe0f' };
    offers.push({ id: 'o' + (offers.length + 1), type, icon: im[type] || '\ud83c\udff7\ufe0f', name: value || 'New Offer', value: value || 'New Offer', cost: cost || '$0.00', campaigns: 0, copi: 0, cvr: 0 });
    closeModal(); toast('Offer created', 'success');
    if (currentView === 'offers') renderOffers();
  }

  function createExperiment() {
    const ni = document.querySelector('#modalContent .form-input[placeholder]');
    const name = ni ? ni.value : 'New Experiment';
    const cs = document.querySelector('#modalContent .form-select');
    const campName = cs ? cs.options[cs.selectedIndex].text : 'Disney+';
    const di = document.querySelector('#modalContent input[type="number"]');
    const duration = di ? di.value : '14';
    const tp = document.querySelector('#modalContent .filter-pills .filter-pill.active');
    const type = tp && tp.textContent.includes('MAB') ? 'MAB' : 'A/B';
    experiments.push({ id: 'e' + (experiments.length + 1), name: name || 'New Experiment', type, campaign: campName.split(' ').slice(0, 2).join(' '), status: 'draft', days: '0/' + duration, leader: '\u2014', lift: '\u2014', significance: 0 });
    closeModal(); toast('Experiment created as draft', 'success');
    if (currentView === 'intelligence') renderExperiments();
  }

  function duplicateCampaign(id) {
    const c = campaigns.find(x => x.id === id); if (!c) return;
    const clone = JSON.parse(JSON.stringify(c));
    clone.id = 'c' + (campaigns.length + 1); clone.name = c.name + ' (Copy)'; clone.status = 'draft'; clone.biddingState = 'draft'; clone.spend = 0; clone.conversions = 0; clone.impressions = 0; clone.clicks = 0;
    campaigns.push(clone); toast(c.name + ' duplicated as draft', 'success');
    if (currentView === 'campaigns') renderCampaignTable(); updateNavBadges();
  }

  function archiveCampaign(id) {
    showConfirm('Archive Campaign', 'Are you sure you want to archive this campaign?', () => {
      const c = campaigns.find(x => x.id === id); if (!c) return;
      c.status = 'archived'; c.biddingState = 'draft'; closeModal();
      toast(c.name + ' archived', 'info');
      if (currentView === 'campaigns') { renderCampaignTable(); closeCampaignDetail(); } updateNavBadges();
    });
  }

  function confirmDelete(entityType, id) {
    showConfirm('Delete ' + capitalize(entityType), 'Are you sure? This cannot be undone.', () => {
      if (entityType === 'audience') { const idx = audiences.findIndex(a => a.id === id); if (idx >= 0) audiences.splice(idx, 1); closeModal(); toast('Audience deleted', 'info'); if (currentView === 'audiences') { renderAudienceGrid(); updateAudienceCounts(); } }
      else if (entityType === 'offer') { const idx = offers.findIndex(o => o.id === id); if (idx >= 0) offers.splice(idx, 1); closeModal(); toast('Offer deleted', 'info'); if (currentView === 'offers') renderOffers(); }
      else if (entityType === 'experiment') { const idx = experiments.findIndex(e => e.id === id); if (idx >= 0) experiments.splice(idx, 1); closeModal(); toast('Experiment deleted', 'info'); if (currentView === 'intelligence') renderExperiments(); }
    });
  }

  function showConfirm(title, message, onConfirm) {
    const ov = document.createElement('div'); ov.className = 'confirm-dialog-overlay';
    ov.innerHTML = '<div class="confirm-dialog"><h3>' + title + '</h3><p>' + message + '</p><div class="confirm-dialog-actions"><button class="btn btn-ghost confirm-cancel">Cancel</button><button class="btn btn-primary btn-pill confirm-ok">Confirm</button></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('.confirm-cancel').addEventListener('click', () => ov.remove());
    ov.querySelector('.confirm-ok').addEventListener('click', () => { ov.remove(); onConfirm(); });
    ov.addEventListener('click', (e) => { if (e.target === ov) ov.remove(); });
  }

  function updateAudienceCounts() {
    const filtered = getFilteredAudiences();
    const cb = document.getElementById('audienceCount'); if (cb) cb.textContent = filtered.length;
  }

  // ── Advertiser Picker ──────────────────────────────────────

  function renderPickerCard(adv, showFav) {
    const activeCamps = adv.campaigns.filter(cid => {
      const c = campaigns.find(x => x.id === cid);
      return c && c.status === 'active';
    }).length;
    const spendStr = adv.spend >= 1000 ? '$' + (adv.spend / 1000).toFixed(0) + 'K' : '$' + adv.spend;
    const lastDate = adv.lastAccessed ? new Date(adv.lastAccessed) : null;
    const lastStr = lastDate ? lastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
    return `
      <div class="picker-card" data-adv-id="${adv.id}" onclick="RoktAds.switchAdvertiser('${adv.id}')">
        <button class="picker-card-fav ${adv.favorited ? 'favorited' : ''}" onclick="event.stopPropagation();RoktAds.toggleFavorite('${adv.id}')" title="${adv.favorited ? 'Unfavorite' : 'Favorite'}">
          ${adv.favorited ? '&#9733;' : '&#9734;'}
        </button>
        <div class="picker-card-header">
          <div class="picker-card-avatar" style="background:${adv.color}">${adv.avatar}</div>
          <div>
            <div class="picker-card-name">${adv.name}</div>
            <div class="picker-card-last-accessed">${lastStr ? 'Last accessed ' + lastStr : ''}</div>
          </div>
        </div>
        <div class="picker-card-metrics">
          <div class="picker-card-metric">
            <span class="picker-card-metric-label">Active Campaigns</span>
            <span class="picker-card-metric-value">${activeCamps}</span>
          </div>
          <div class="picker-card-metric">
            <span class="picker-card-metric-label">Spend (MTD)</span>
            <span class="picker-card-metric-value">${spendStr}</span>
          </div>
        </div>
        <div class="picker-card-footer">
          <div class="picker-card-status">
            <span class="picker-card-status-dot ${activeCamps > 0 ? '' : 'inactive'}"></span>
            ${activeCamps > 0 ? activeCamps + ' active' : 'No active campaigns'}
          </div>
        </div>
      </div>
    `;
  }

  function renderAdvertiserPicker(searchQuery) {
    const picker = document.getElementById('advertiserPicker');
    if (!picker) return;

    const query = (searchQuery || '').toLowerCase();
    const favGrid = document.getElementById('pickerFavGrid');
    const recentGrid = document.getElementById('pickerRecentGrid');
    const allGrid = document.getElementById('pickerAllGrid');
    const favSection = document.getElementById('pickerFavorites');
    const recentSection = document.getElementById('pickerRecent');

    let all = [...advertisers];
    if (query) all = all.filter(a => a.name.toLowerCase().includes(query));

    // Portfolio card (first item in All section)
    const portfolioCard = query ? '' : `
      <div class="picker-card picker-card-portfolio" onclick="RoktAds.switchAdvertiser('all')">
        <div class="picker-card-header">
          <div class="picker-card-portfolio-icon">&#128202;</div>
          <div>
            <div class="picker-card-name">Portfolio Dashboard</div>
            <div class="picker-card-last-accessed">View all advertisers at once</div>
          </div>
        </div>
        <div class="picker-card-metrics">
          <div class="picker-card-metric">
            <span class="picker-card-metric-label">Advertisers</span>
            <span class="picker-card-metric-value">${advertisers.length}</span>
          </div>
          <div class="picker-card-metric">
            <span class="picker-card-metric-label">Total Spend</span>
            <span class="picker-card-metric-value">$${Math.round(advertisers.reduce((s, a) => s + a.spend, 0) / 1000)}K</span>
          </div>
        </div>
        <div class="picker-card-footer">
          <div class="picker-card-status" style="color:var(--beetroot-light)">Internal multi-advertiser view</div>
        </div>
      </div>
    `;

    // Favorites
    const favs = all.filter(a => a.favorited);
    if (favSection) favSection.style.display = favs.length ? '' : 'none';
    if (favGrid) favGrid.innerHTML = favs.map(a => renderPickerCard(a, true)).join('');

    // Recent (sorted by lastAccessed, exclude favorites, top 3)
    const recent = all.filter(a => !a.favorited).sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed)).slice(0, 3);
    if (recentSection) recentSection.style.display = recent.length ? '' : 'none';
    if (recentGrid) recentGrid.innerHTML = recent.map(a => renderPickerCard(a)).join('');

    // All
    if (allGrid) allGrid.innerHTML = portfolioCard + all.map(a => renderPickerCard(a)).join('');
  }

  function showAdvertiserPicker() {
    selectedAdvertiser = null;
    const picker = document.getElementById('advertiserPicker');
    const app = document.getElementById('app');
    if (picker) {
      picker.classList.remove('picker-hidden', 'picker-exit');
      picker.style.display = '';
    }
    if (app) {
      app.classList.add('app-hidden');
      app.classList.remove('app-entering');
    }
    renderAdvertiserPicker();

    // Wire search
    const search = document.getElementById('pickerSearch');
    if (search) {
      search.value = '';
      search.focus();
      search.oninput = () => renderAdvertiserPicker(search.value);
    }
  }

  function switchAdvertiser(advId) {
    selectedAdvertiser = advId;
    const adv = advertisers.find(a => a.id === advId);

    // Update lastAccessed
    if (adv) adv.lastAccessed = '2026-03-20';

    // Animate picker out, app in
    const picker = document.getElementById('advertiserPicker');
    const app = document.getElementById('app');

    if (picker) {
      picker.classList.add('picker-exit');
      setTimeout(() => {
        picker.classList.add('picker-hidden');
        picker.style.display = 'none';
        picker.classList.remove('picker-exit');
      }, 350);
    }

    // Update topbar immediately
    updateTopbarAdvertiser();

    if (app) {
      setTimeout(() => {
        app.classList.remove('app-hidden');
        app.classList.add('app-entering');
        setTimeout(() => app.classList.remove('app-entering'), 400);

        // Re-render current view AFTER app is visible (force by resetting currentView)
        const hash = location.hash.slice(1) || 'dashboard';
        currentView = ''; // force re-render
        navigate(hash);
        updateNavBadges();
        updateStatusBar();
      }, 200);
    }

    if (advId === 'all') {
      toast('Portfolio Dashboard — viewing all advertisers', 'info');
    } else if (adv) {
      toast(`Switched to ${adv.name}`, 'success');
    }
  }

  function toggleFavorite(advId) {
    const adv = advertisers.find(a => a.id === advId);
    if (!adv) return;
    adv.favorited = !adv.favorited;
    renderAdvertiserPicker(document.getElementById('pickerSearch')?.value || '');
    toast(adv.favorited ? `${adv.name} added to favorites` : `${adv.name} removed from favorites`, 'info');
  }

  function updateTopbarAdvertiser() {
    const nameEl = document.querySelector('.account-switcher-btn .account-name');
    const avatarEl = document.querySelector('.account-switcher-btn .account-avatar');
    if (!selectedAdvertiser || selectedAdvertiser === 'all') {
      if (nameEl) nameEl.textContent = 'Rokt Ads Demo';
      if (avatarEl) { avatarEl.textContent = 'RA'; avatarEl.style.background = ''; }
    } else {
      const adv = advertisers.find(a => a.id === selectedAdvertiser);
      if (adv) {
        if (nameEl) nameEl.textContent = adv.name;
        if (avatarEl) { avatarEl.textContent = adv.avatar; avatarEl.style.background = adv.color; }
      }
    }
  }

  function updateStatusBar() {
    const fc = getFilteredCampaigns();
    const active = fc.filter(c => c.status === 'active' || c.status === 'requires_action').length;
    const spend = fc.reduce((s, c) => s + c.spend, 0);
    const acEl = document.getElementById('activeCampaignCount');
    const spEl = document.getElementById('todaySpend');
    if (acEl) acEl.textContent = active;
    if (spEl) spEl.textContent = spend.toLocaleString();
  }

  // ── Public API ─────────────────────────────────────────────
  return {
    navigate,
    toast,
    openCampaignDetail,
    closeCampaignDetail,
    selectObjective,
    switchIntelTab,
    switchCatalogTab,
    openModal,
    closeModal,
    toggleFilter,
    applyFilter,
    insertAttr,
    selectCreative,
    sortReport,
    // Phase 1: Campaign builder
    persistField,
    selectBidStrategy,
    addAdSet,
    removeAdSet,
    toggleTargeting,
    toggleSection,
    simulateImageUpload,
    generateAICampaign,
    updateBuilderPreview,
    // Phase 2: Edit workflows
    toggleCampaignStatus,
    editAudience,
    editOffer,
    editExperiment,
    editMeasurementGroup,
    // Phase 3: Visual UI upgrades
    toggleAIDrawer,
    generateAIAnalysis,
    initAISparkles,
    // Phase 4: Workflow completeness
    switchDetailTab,
    selectSmartStrategy,
    // Phase 5: Account switcher & Advertiser picker
    toggleAccountSwitcher,
    closeAccountSwitcher,
    updateNavBadges,
    getFilteredCampaigns,
    switchAdvertiser,
    showAdvertiserPicker,
    toggleFavorite,
    // Entity CRUD & utilities
    createAudience,
    createLookalike,
    createOffer,
    createExperiment,
    duplicateCampaign,
    archiveCampaign,
    confirmDelete,
    updateCreativePreviewFormat,
    // Phase 6: Dual-mode & Inventory
    setCampaignMode,
    simulateAutoImageUpload,
    renderAdStrengthGaugeHTML: renderAdStrengthGauge,
    togglePlacement,
    togglePartner,
    selectAllPartners,
    deselectAllPartners,
    filterPartners,
    updatePacingChart,
    renderPortfolioDashboard,
  };
})();
