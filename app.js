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
      emq: 8.4, biddingState: 'optimizing', adSets: 2, creatives: 4,
      trend: [10,9,8,7,6,5,5,4], trendDir: 'up',
      dailySpend: [5200, 5800, 6100, 6400, 6850, 5600, 6200]
    },
    {
      id: 'c2', name: 'Capital One Card Acquisition', status: 'active', objective: 'CPA',
      spend: 31200, budget: 50000, cpa: 8.45, cpaTarget: 10.00, copi: 3.21, roas: 3.8,
      conversions: 3692, impressions: 115000, clicks: 8970, ctr: 7.8, cvr: 41.2,
      emq: 7.9, biddingState: 'optimizing', adSets: 1, creatives: 3,
      trend: [8,7,7,6,5,6,5,5], trendDir: 'up',
      dailySpend: [4200, 4500, 4400, 4700, 4600, 4300, 4500]
    },
    {
      id: 'c3', name: 'Hulu Streaming Signup', status: 'active', objective: 'CPA',
      spend: 18700, budget: 25000, cpa: 9.14, cpaTarget: 7.50, copi: 2.84, roas: 2.9,
      conversions: 2046, impressions: 72000, clicks: 5040, ctr: 7.0, cvr: 40.6,
      emq: 8.1, biddingState: 'learning', adSets: 1, creatives: 2,
      trend: [5,6,7,7,8,8,9,9], trendDir: 'down',
      dailySpend: [2400, 2600, 2700, 2800, 2700, 2600, 2900]
    },
    {
      id: 'c4', name: 'True Classic DPA', status: 'active', objective: 'ROAS',
      spend: 22400, budget: 40000, cpa: 12.30, cpaTarget: null, copi: 2.15, roas: 4.8,
      conversions: 1821, impressions: 84700, clicks: 5930, ctr: 7.0, cvr: 30.7,
      emq: 4.8, biddingState: 'limited', adSets: 2, creatives: 5,
      trend: [4,5,5,6,6,7,7,8], trendDir: 'down',
      dailySpend: [3000, 3200, 3100, 3300, 3400, 3200, 3200]
    },
    {
      id: 'c5', name: 'PayPal Pay+ Activation', status: 'paused', objective: 'CPA',
      spend: 8900, budget: 20000, cpa: 6.20, cpaTarget: 8.00, copi: 3.95, roas: 4.2,
      conversions: 1435, impressions: 36300, clicks: 2540, ctr: 7.0, cvr: 56.5,
      emq: 7.2, biddingState: 'optimizing', adSets: 1, creatives: 3,
      trend: [6,5,5,4,4,4,4,4], trendDir: 'flat',
      dailySpend: [1400, 1500, 1300, 1200, 1300, 1100, 1100]
    },
    {
      id: 'c6', name: 'Audible Free Trial', status: 'draft', objective: 'CPA',
      spend: 0, budget: 30000, cpa: 0, cpaTarget: 6.00, copi: 0, roas: 0,
      conversions: 0, impressions: 0, clicks: 0, ctr: 0, cvr: 0,
      emq: 7.5, biddingState: 'draft', adSets: 0, creatives: 0,
      trend: [0,0,0,0,0,0,0,0], trendDir: 'flat',
      dailySpend: [0,0,0,0,0,0,0]
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
    { name: 'Disney+ Acquisition MG', campaigns: 'Disney+ Spring', status: 'Live', event: 'Purchase', window: '7C + 1V', emq: 8.4 },
    { name: 'Capital One Cards MG', campaigns: 'Capital One Card', status: 'Live', event: 'Application Submit', window: '30C + 1V', emq: 7.9 },
    { name: 'Streaming Bundle MG', campaigns: 'Hulu Streaming', status: 'Live', event: 'Signup', window: '7C + 1V', emq: 8.1 },
    { name: 'True Classic DPA MG', campaigns: 'True Classic DPA', status: 'Live', event: 'Purchase', window: '7C', emq: 4.8 },
  ];

  // ── State ──────────────────────────────────────────────────
  let currentView = '';
  let selectedCampaign = null;
  let builderStep = 1;
  let pendingKey = null;
  let pendingKeyTimer = null;
  let reportSort = { col: null, dir: 'desc' };
  let placeholderInterval = null;

  const defaultBuilderData = {
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

    content.innerHTML = '';
    const clone = tmpl.content.cloneNode(true);
    content.appendChild(clone);

    // Initialize view
    requestAnimationFrame(() => {
      const initMap = {
        dashboard: initDashboard,
        campaigns: initCampaigns,
        builder: initBuilder,
        audiences: initAudiences,
        creatives: initCreatives,
        intelligence: initIntelligence,
        catalog: initCatalog,
        measurement: initMeasurement,
        account: initAccount,
      };
      if (initMap[view]) initMap[view]();

      // Show context alert for certain views
      showContextAlert(view);
    });
  }

  function showContextAlert(view) {
    const alert = document.getElementById('contextAlert');
    const text = document.getElementById('contextAlertText');
    if (!alert || !text) return;
    const alerts = {
      dashboard: 'EMQ dropped below 5.0 on True Classic — conversion tracking may be degraded',
      campaigns: 'EMQ dropped below 5.0 on True Classic DPA — conversion tracking may be degraded',
      measurement: 'Phone identifier is missing from CAPI integration — estimated +1.5 EMQ impact',
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
        catalog: 'Search offers & products...',
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
  function initDashboard() {
    animateCounters();
    renderDashboardHealth();
    renderDashboardInsights();
    renderDashboardActivity();
    renderOptimizationScore();
    renderAIRecommendations();
    initCardGlow();
  }

  function renderDashboardHealth() {
    const grid = document.getElementById('campaignHealthGrid');
    if (!grid) return;
    grid.innerHTML = campaigns.filter(c => c.status !== 'draft').map(c => `
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
          <div class="progress-bar-fill" style="width:${Math.round(c.spend/c.budget*100)}%;background:${c.spend/c.budget > 0.85 ? 'var(--warning)' : 'var(--wine)'}"></div>
        </div>
      </div>
    `).join('');
  }

  function renderDashboardInsights() {
    const list = document.getElementById('insightList');
    if (!list) return;
    const insights = [
      { icon: '💡', type: 'tip', text: '<strong>Hulu CPA</strong> is 22% above target — consider expanding LAL to Broad tier' },
      { icon: '⚠️', type: 'warn', text: '<strong>True Classic EMQ</strong> dropped to 4.8 — check CAPI integration' },
      { icon: '✅', type: 'good', text: '<strong>Disney+ Creative #3</strong> (Hero) outperforming by 3x CoPI — consider expanding' },
      { icon: '💡', type: 'tip', text: '<strong>3 campaigns</strong> have stale audiences — refresh recommended for better targeting' },
    ];
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
            <path d="M10 55 A50 50 0 0 1 110 55" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8" stroke-linecap="round"/>
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
    const recs = [
      { icon: '🎨', priority: 'high', text: 'Add <strong>2 more creatives</strong> to Disney+ campaign', impact: 'Est. +15% CoPI', action: 'Create Creative' },
      { icon: '💰', priority: 'high', text: '<strong>Increase budget</strong> on Capital One by 20% — hitting daily cap before noon', impact: 'Est. +$2.4K conv.', action: 'Apply' },
      { icon: '👥', priority: 'medium', text: '<strong>Refresh stale audiences</strong> on 3 campaigns — data is 14+ days old', impact: 'Est. +8% match rate', action: 'Refresh All' },
      { icon: '⏸️', priority: 'low', text: 'Consider pausing <strong>True Classic DPA</strong> — EMQ below threshold', impact: 'Save $3.2K/wk', action: 'Review' },
    ];
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

  function renderCampaignTable(filter = 'all', search = '') {
    const tbody = document.getElementById('campaignsTableBody');
    if (!tbody) return;
    let filtered = campaigns;
    if (filter === 'active') filtered = campaigns.filter(c => c.status === 'active');
    else if (filter === 'paused') filtered = campaigns.filter(c => c.status === 'paused');
    else if (filter === 'draft') filtered = campaigns.filter(c => c.status === 'draft');
    else if (filter === 'attention') filtered = campaigns.filter(c => c.biddingState === 'limited' || c.biddingState === 'learning' || (c.cpaTarget && c.cpa > c.cpaTarget));
    if (search) filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    tbody.innerHTML = filtered.map(c => `
      <tr class="clickable ${selectedCampaign === c.id ? 'selected' : ''}" data-id="${c.id}" onclick="RoktAds.openCampaignDetail('${c.id}')">
        <td><input type="checkbox" class="table-checkbox" onclick="event.stopPropagation()"></td>
        <td><span class="campaign-status-dot ${c.status}"></span></td>
        <td class="campaign-name">${c.name}</td>
        <td><span class="badge badge-gray">${c.objective}</span></td>
        <td>
          <div class="spend-bar-cell">
            <div class="spend-bar-text">$${fmtNum(c.spend)} / $${fmtNum(c.budget)}</div>
            <div class="progress-bar"><div class="progress-bar-fill" style="width:${c.budget ? Math.round(c.spend/c.budget*100) : 0}%;background:${c.spend/c.budget > 0.85 ? 'var(--warning)' : 'var(--wine)'}"></div></div>
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
            <button class="row-action-btn" onclick="event.stopPropagation();RoktAds.toast('Duplicated as draft','success')" title="Duplicate">⧉</button>
          </div>
        </td>
      </tr>
    `).join('');
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
    const badges = document.getElementById('detailBadges');
    if (badges) badges.innerHTML = `
      <span class="badge badge-${c.status === 'active' ? 'positive' : c.status === 'paused' ? 'warning' : 'gray'}">${capitalize(c.status)}</span>
      <span class="badge badge-gray">${c.objective}</span>
    `;

    // Add action buttons to header
    const headerWrap = document.querySelector('.detail-panel-title-wrap');
    if (headerWrap && !headerWrap.querySelector('.detail-actions')) {
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'detail-actions';
      actionsDiv.innerHTML = `
        <button class="btn btn-xs btn-ghost" onclick="RoktAds.toggleCampaignStatus('${c.id}')">${c.status === 'active' ? '⏸ Pause' : c.status === 'paused' ? '▶ Resume' : '✏️ Edit'}</button>
        <button class="btn btn-xs btn-ghost" onclick="RoktAds.openModal('editCampaign', '${c.id}')">✏️ Edit</button>
        <button class="btn btn-xs btn-ghost" onclick="RoktAds.toast('Campaign duplicated as draft','success')">⧉ Duplicate</button>
      `;
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
      { l: 'EMQ', v: c.emq, color: c.emq >= 7 ? 'var(--positive)' : c.emq >= 5 ? 'var(--warning)' : 'var(--negative)' },
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

  function renderCampaignTab(tab, c) {
    const container = document.getElementById('detailTabContent');
    if (!container) return;

    if (tab === 'overview') {
      container.innerHTML = `
        <div class="detail-chart-area">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <span style="font-size:12px;font-weight:600">Daily Spend</span>
            <div class="filter-pills">
              <button class="filter-pill active" style="font-size:10px">7D</button>
              <button class="filter-pill" style="font-size:10px">30D</button>
            </div>
          </div>
          <svg width="100%" height="120" viewBox="0 0 460 120" preserveAspectRatio="none">
            <defs><linearGradient id="detailGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--wine)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--wine)" stop-opacity="0"/></linearGradient></defs>
            <polygon points="${c.dailySpend.map((v,i) => `${i*460/6},${120 - v/60}`).join(' ')} 460,120 0,120" fill="url(#detailGrad)"/>
            <polyline points="${c.dailySpend.map((v,i) => `${i*460/6},${120 - v/60}`).join(' ')}" fill="none" stroke="var(--wine)" stroke-width="2" stroke-linecap="round" class="chart-line-animate"/>
          </svg>
        </div>
        <div class="detail-stats-grid">
          <div class="detail-stat-card">
            <div class="detail-stat-label">Budget Pacing</div>
            <div class="detail-stat-value">${Math.round(c.spend/c.budget*100)}%</div>
            <div class="progress-bar" style="margin-top:8px"><div class="progress-bar-fill" style="width:${Math.round(c.spend/c.budget*100)}%;background:var(--wine)"></div></div>
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
            <tr><td>EMQ</td><td class="mono" style="color:${c.emq >= 7 ? 'var(--positive)' : c.emq >= 5 ? 'var(--warning)' : 'var(--negative)'}">${c.emq}/10</td><td>—</td><td>—</td></tr>
          </tbody>
        </table>
      `;
    }
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
    builderData = { ...defaultBuilderData };
    updateBuilderStep();

    const nextBtn = document.getElementById('builderNext');
    const prevBtn = document.getElementById('builderPrev');
    if (nextBtn) nextBtn.addEventListener('click', () => {
      if (builderStep < 5) {
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
  };

  function updateBuilderStep() {
    // Clear placeholder cycling
    if (placeholderInterval) { clearInterval(placeholderInterval); placeholderInterval = null; }

    // Update step indicators
    $$('.builder-step').forEach(step => {
      const s = parseInt(step.dataset.step);
      step.classList.toggle('active', s === builderStep);
      step.classList.toggle('completed', s < builderStep);
    });

    // Update buttons
    const prevBtn = document.getElementById('builderPrev');
    const nextBtn = document.getElementById('builderNext');
    if (prevBtn) prevBtn.style.visibility = builderStep > 1 ? 'visible' : 'hidden';
    if (nextBtn) nextBtn.innerHTML = builderStep === 5 ? '🚀 Launch Campaign' : 'Next →';

    const content = document.getElementById('builderContent');
    if (!content) return;

    if (builderStep === 1) {
      content.innerHTML = renderBuilderStep1();
      // Start cycling placeholder
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

  // ── Builder Step Renderers ──────────────────────────────────

  function renderBuilderStep1() {
    const objectives = [
      { id: 'cpa', icon: '🎯', name: 'Customer Acquisition', desc: 'Get new customers at a target CPA' },
      { id: 'roas', icon: '📈', name: 'Revenue Growth', desc: 'Maximize return on ad spend' },
      { id: 'app', icon: '📱', name: 'App Installs', desc: 'Drive mobile app downloads' },
      { id: 'dpa', icon: '🛍️', name: 'Product Sales (DPA)', desc: 'Dynamic product ads from your catalog' },
      { id: 'leads', icon: '✉️', name: 'Email Subscription', desc: 'Capture email addresses and signups' },
      { id: 'embed', icon: '⚡', name: 'Embedded Actions', desc: 'Drive in-page actions and engagement' },
    ];
    return `<div class="builder-content-inner">
      <div class="ai-hero-section">
        <div class="ai-hero-label"><svg width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="var(--wine)" stroke-width="1.5"><path d="M11 2L13.5 8.5L20 11L13.5 13.5L11 20L8.5 13.5L2 11L8.5 8.5L11 2Z"/></svg> Describe your campaign</div>
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
            <div class="objective-name">${o.name}</div>
            <div class="objective-desc">${o.desc}</div>
          </div>
        `).join('')}
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
                ${measurementGroups.map(mg => `<option value="${mg.name}" ${builderData.measurementGroup === mg.name ? 'selected' : ''}>${mg.name} (EMQ: ${mg.emq})</option>`).join('')}
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
        ${builderData.bidStrategy === 'smart' ? `
          <div class="form-group" style="margin-top:12px;max-width:240px">
            <label class="form-label">Target CPA</label>
            <div class="input-prefix-wrap"><span class="input-prefix">$</span><input type="number" step="0.01" class="form-input mono" value="${builderData.targetCpa}" oninput="RoktAds.persistField('targetCpa', this.value)"></div>
          </div>
        ` : ''}
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
    const colors = ['#C43B52', '#E04D66', '#4D9AFF', '#34D399', '#FBBF24', '#E879F9'];
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
    let filtered = audiences;
    if (type && type !== 'all') filtered = audiences.filter(a => a.type === type);
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
  }

  function renderCreativeLibrary() {
    const list = document.getElementById('creativeLibraryList');
    if (!list) return;
    list.innerHTML = creatives.map((cr, i) => `
      <div class="creative-lib-item ${i === 0 ? 'active' : ''}" onclick="RoktAds.selectCreative('${cr.id}')">
        <div class="creative-lib-name">${cr.name}</div>
        <div class="creative-lib-meta">${cr.format} · CoPI: ${cr.copi}%</div>
      </div>
    `).join('');
  }

  function selectCreative(id) {
    const cr = creatives.find(c => c.id === id);
    if (!cr) return;
    $$('.creative-lib-item').forEach(item => item.classList.remove('active'));
    // Find and mark active
    const items = $$('.creative-lib-item');
    const idx = creatives.findIndex(c => c.id === id);
    if (items[idx]) items[idx].classList.add('active');

    // Update editor fields
    const titleInput = document.getElementById('creativeTitle');
    if (titleInput) titleInput.value = cr.name;
    const titleCount = document.getElementById('titleCharCount');
    if (titleCount) titleCount.textContent = `${cr.name.length}/40`;

    // Update preview
    const previewTitle = document.getElementById('previewTitle');
    if (previewTitle) previewTitle.textContent = cr.name;
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
        toast(`Switched to ${tab.dataset.format} format`, 'info');
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
  }

  function renderIntelInsights() {
    const strip = document.getElementById('intelInsightStrip');
    if (!strip) return;
    const insights = [
      { icon: '📈', text: 'CPA improved <strong>12%</strong> week-over-week across all campaigns' },
      { icon: '🏆', text: 'Creative #3 (Hero) outperforming by <strong>3x CoPI</strong>' },
      { icon: '⚠️', text: 'True Classic EMQ at <strong>4.8</strong> — affecting optimization' },
      { icon: '🧪', text: 'Experiment #1 reached <strong>97% significance</strong> — apply winner' },
    ];
    strip.innerHTML = insights.map(i => `
      <div class="insight-strip-card">
        <span style="font-size:18px">${i.icon}</span>
        <span style="font-size:12px;line-height:1.5">${i.text}</span>
      </div>
    `).join('');
  }

  function renderReportChart() {
    const legend = document.getElementById('reportChartLegend');
    const svg = document.getElementById('reportChartSvg');
    if (!legend || !svg) return;

    legend.innerHTML = [
      { label: 'Spend', color: 'var(--wine)' },
      { label: 'Conversions', color: 'var(--positive)' },
      { label: 'CPA', color: 'var(--brand-blue)' },
    ].map(l => `<span class="chart-legend-item"><span class="chart-legend-dot" style="background:${l.color}"></span>${l.label}</span>`).join('');

    // Simple multi-line chart
    const spendPoints = campaigns.filter(c => c.status === 'active').reduce((acc, c) => {
      c.dailySpend.forEach((v, i) => { acc[i] = (acc[i] || 0) + v; });
      return acc;
    }, []);
    const maxSpend = Math.max(...spendPoints);
    const spendLine = spendPoints.map((v, i) => `${i * 700 / 6},${170 - (v / maxSpend) * 150}`).join(' ');

    svg.innerHTML = `
      <line x1="0" y1="170" x2="700" y2="170" stroke="var(--border)" stroke-width="0.5"/>
      <line x1="0" y1="85" x2="700" y2="85" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="4,4"/>
      <defs>
        <linearGradient id="reportGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--wine)" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="var(--wine)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon points="${spendLine} 700,170 0,170" fill="url(#reportGrad)"/>
      <polyline points="${spendLine}" fill="none" stroke="var(--wine)" stroke-width="2" stroke-linecap="round" class="chart-line-animate"/>
      ${spendPoints.map((v, i) => `<circle cx="${i*700/6}" cy="${170 - (v/maxSpend)*150}" r="3" fill="var(--wine)"/>`).join('')}
      <text x="0" y="180" font-size="9" fill="var(--text-tertiary)" font-family="var(--font-mono)">Mon</text>
      <text x="${700/6}" y="180" font-size="9" fill="var(--text-tertiary)" font-family="var(--font-mono)">Tue</text>
      <text x="${2*700/6}" y="180" font-size="9" fill="var(--text-tertiary)" font-family="var(--font-mono)">Wed</text>
      <text x="${3*700/6}" y="180" font-size="9" fill="var(--text-tertiary)" font-family="var(--font-mono)">Thu</text>
      <text x="${4*700/6}" y="180" font-size="9" fill="var(--text-tertiary)" font-family="var(--font-mono)">Fri</text>
      <text x="${5*700/6}" y="180" font-size="9" fill="var(--text-tertiary)" font-family="var(--font-mono)">Sat</text>
      <text x="${6*700/6}" y="180" font-size="9" fill="var(--text-tertiary)" font-family="var(--font-mono)">Sun</text>
    `;
  }

  function renderReportTable() {
    const thead = document.getElementById('reportTableHead');
    const tbody = document.getElementById('reportTableBody');
    if (!thead || !tbody) return;

    const cols = ['Campaign', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'CPA', 'ROAS', 'CoPI', 'Spend'];
    thead.innerHTML = `<tr>${cols.map(c => `<th class="sortable" onclick="RoktAds.sortReport('${c}')">${c} <span class="sort-arrow">${reportSort.col === c ? (reportSort.dir === 'asc' ? '↑' : '↓') : '↕'}</span></th>`).join('')}</tr>`;

    let data = campaigns.filter(c => c.status !== 'draft');

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

  function renderExperiments() {
    const grid = document.getElementById('experimentsGrid');
    if (!grid) return;
    grid.innerHTML = experiments.map(e => `
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
  function initCatalog() {
    renderOffers();
    renderProducts();
  }

  function renderOffers() {
    const grid = document.getElementById('offerGrid');
    if (!grid) return;
    grid.innerHTML = offers.map(o => `
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
    grid.innerHTML = products.map(p => `
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
    renderEMQRecommendations();
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

  function renderEMQRecommendations() {
    const el = document.getElementById('emqRecommendations');
    if (!el) return;
    const recs = [
      { icon: '📱', text: 'Add phone number to CAPI integration', impact: '+1.5 EMQ' },
      { icon: '🔗', text: 'Enable server-side Click ID passback', impact: '+0.5 EMQ' },
      { icon: '📧', text: 'Increase email coverage from 78% to 90%', impact: '+0.3 EMQ' },
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
        <td><span class="mono" style="color:${mg.emq >= 7 ? 'var(--positive)' : mg.emq >= 5 ? 'var(--warning)' : 'var(--negative)'}">${mg.emq}</span></td>
      </tr>
    `).join('');
  }

  // ── Account ────────────────────────────────────────────────
  function initAccount() {
    renderTeamTable();
    renderIntegrations();
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

  // ── Modal System ──────────────────────────────────────────
  function openModal(type, id) {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    if (!overlay || !content) return;

    content.className = 'modal';
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
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Audience created successfully','success')">Create Audience</button>
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
                <div class="lal-circle selected" style="width:100px;height:100px;background:var(--wine-subtle)" onclick="this.parentElement.querySelectorAll('.lal-circle').forEach(c=>c.classList.remove('selected'));this.classList.add('selected')">
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
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Lookalike audience generating...','success')">Generate Lookalike</button>
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
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Offer created','success')">Create Offer</button>
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
            <button class="btn btn-primary btn-pill" onclick="RoktAds.closeModal();RoktAds.toast('Experiment created as draft','success')">Create Experiment</button>
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
              <div class="filter-pills" style="gap:8px">
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
            <button class="btn btn-ghost" style="color:var(--negative)" onclick="RoktAds.closeModal();RoktAds.toast('Campaign archived','info')">Archive</button>
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
                if (location.hash === '#campaigns') { location.hash = 'campaigns'; }
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
            <button class="btn btn-ghost" style="color:var(--negative)" onclick="RoktAds.closeModal();RoktAds.toast('Audience deleted','info')">Delete</button>
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
            <button class="btn btn-ghost" style="color:var(--negative)" onclick="RoktAds.closeModal();RoktAds.toast('Offer archived','info')">Archive</button>
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
              <label class="form-label">Current EMQ</label>
              <div style="font-size:18px;font-weight:700;color:${mg.emq >= 7 ? 'var(--positive)' : mg.emq >= 5 ? 'var(--warning)' : 'var(--negative)'}">${mg.emq} / 10</div>
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
    toast(`Filter: ${type} = ${value}`, 'info');
    const dropdown = document.getElementById('filterDropdown');
    if (dropdown) dropdown.style.display = 'none';
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
        { icon: '🏷️', text: 'Catalog', action: () => navigate('catalog') },
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
    keyChordEl.innerHTML = `<kbd>${key.toUpperCase()}</kbd> ${labels[key] || '...'}`;
    document.body.appendChild(keyChordEl);
  }
  function hideKeyChord() {
    if (keyChordEl) { keyChordEl.remove(); keyChordEl = null; }
  }

  // ── Keyboard Shortcuts ────────────────────────────────────
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        if (e.key === 'Escape') e.target.blur();
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

      // Escape — Close overlays
      if (e.key === 'Escape') {
        closeCommandPalette();
        closeModal();
        const shortcuts = document.getElementById('shortcutsOverlay');
        if (shortcuts) shortcuts.classList.remove('open');
        const aiDrawer = document.getElementById('aiDrawer');
        if (aiDrawer) aiDrawer.classList.remove('open');
        closeCampaignDetail();
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
    const collapseBtn = document.getElementById('sidebarCollapseBtn');
    if (collapseBtn) collapseBtn.addEventListener('click', () => {
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

    // Modal overlay close on bg click
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    // Context alert dismiss and action
    const alertDismiss = document.getElementById('contextAlertDismiss');
    if (alertDismiss) alertDismiss.addEventListener('click', () => {
      document.getElementById('contextAlert').style.display = 'none';
    });
    const alertAction = document.getElementById('contextAlertAction');
    if (alertAction) alertAction.addEventListener('click', () => {
      location.hash = 'measurement';
      toast('Navigated to Measurement — check EMQ dashboard', 'info');
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
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    // Init subsystems
    initKeyboardShortcuts();
    initAICopilot();
    initSearchPlaceholder();

    // Initial route
    handleRoute();
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
    if (c.status === 'active') {
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
  };
})();
