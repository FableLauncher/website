const mockAds = [
  {
    id: 'ad-wabbanode',
    banner: 'src/assets/banner-placeholder.svg',
    title: 'Wabbanode',
    description: 'High-performance Minecraft hosting.',
    destination: 'https://wabbanode.example',
    startDate: '2025-10-01',
    endDate: '2025-12-31',
    status: 'active',
    enabled: true,
    impressions: 12480,
    clicks: 842,
    ctr: 6.8,
  },
  {
    id: 'ad-arcane',
    banner: 'src/assets/banner-placeholder.svg',
    title: 'ArcaneMC',
    description: 'Bespoke modded hosting and instant deployment.',
    destination: 'https://arcanemc.example',
    startDate: '2025-09-15',
    endDate: '2025-11-22',
    status: 'draft',
    enabled: false,
    impressions: 6420,
    clicks: 298,
    ctr: 4.6,
  },
  {
    id: 'ad-pulse',
    banner: 'src/assets/banner-placeholder.svg',
    title: 'Pulse Network',
    description: 'Fast support, Discord-ready infrastructure, and zero downtime.',
    destination: 'https://pulsenetwork.example',
    startDate: '2025-07-18',
    endDate: '2025-10-02',
    status: 'expired',
    enabled: false,
    impressions: 15240,
    clicks: 815,
    ctr: 5.3,
  },
];

const mockUpdates = [
  {
    id: 'update-011',
    version: 'v0.1.1',
    title: 'Fable Launcher v0.1.1 BETA',
    notes: 'This release improves install reliability, adds more launch options, and resolves a range of stability issues.',
    metadataUrl: 'https://updates.example/fable/v0.1.1.json',
    releaseDate: '2025-10-07',
    status: 'current',
    downloads: 1862,
  },
  {
    id: 'update-010',
    version: 'v0.1.0',
    title: 'Fable Launcher v0.1.0',
    notes: 'Initial release with launcher onboarding, profile sync, and integrated account flows.',
    metadataUrl: 'https://updates.example/fable/v0.1.0.json',
    releaseDate: '2025-09-22',
    status: 'published',
    downloads: 2820,
  },
  {
    id: 'update-009',
    version: 'v0.0.9',
    title: 'Fable Launcher v0.0.9',
    notes: 'Performance tuning for low-end hardware and targeted bug fixes across launcher UX.',
    metadataUrl: 'https://updates.example/fable/v0.0.9.json',
    releaseDate: '2025-09-07',
    status: 'published',
    downloads: 2114,
  },
];

const mockAnnouncements = [
  {
    id: 'announce-011',
    title: 'Fable Launcher v0.1.1 BETA',
    message: 'Fable Launcher v0.1.1 is now available! This update includes various improvements and bug fixes.',
    image: 'src/assets/announcement-placeholder.svg',
    buttonText: 'View details',
    buttonUrl: 'https://fable.example/release-notes',
    startDate: '2025-10-07',
    endDate: '2025-11-07',
    status: 'published',
    enabled: true,
  },
  {
    id: 'announce-early',
    title: 'New user onboarding improvements',
    message: 'We have improved sign-in guidance and first-run setup for new launcher users.',
    image: 'src/assets/announcement-placeholder.svg',
    buttonText: 'Learn more',
    buttonUrl: 'https://fable.example/onboarding',
    startDate: '2025-09-30',
    endDate: '2025-10-20',
    status: 'draft',
    enabled: false,
  },
];

const mockActivity = [
  { title: 'New launcher download', subtitle: 'Windows • v0.1.1', time: '5 minutes ago', icon: 'accent' },
  { title: 'New user', subtitle: 'Joined the Fable ecosystem', time: '12 minutes ago', icon: 'accent' },
  { title: 'Update published', subtitle: 'v0.1.1 BETA', time: '2 hours ago', icon: 'warning' },
  { title: 'Advertisement clicked', subtitle: 'Wabbanode', time: '3 hours ago', icon: 'danger' },
  { title: 'Announcement published', subtitle: 'Fable Launcher v0.1.1 BETA', time: '5 hours ago', icon: 'accent' },
];

const analyticsSeries = {
  '24h': {
    labels: ['00h', '04h', '08h', '12h', '16h', '20h', '24h'],
    downloads: [98, 130, 145, 190, 214, 236, 254],
    users: [420, 438, 470, 510, 560, 590, 630],
    adImpressions: [760, 820, 910, 1010, 1180, 1250, 1320],
    adClicks: [54, 62, 74, 82, 96, 112, 128],
  },
  '7d': {
    labels: ['Oct 1', 'Oct 2', 'Oct 3', 'Oct 4', 'Oct 5', 'Oct 6', 'Oct 7'],
    downloads: [260, 310, 440, 430, 520, 610, 675],
    users: [1150, 1190, 1220, 1230, 1300, 1375, 1420],
    adImpressions: [2100, 2450, 2680, 2800, 2920, 3070, 3200],
    adClicks: [124, 142, 158, 171, 184, 198, 226],
  },
  '30d': {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5'],
    downloads: [1120, 1700, 1960, 2410, 2810],
    users: [780, 940, 1120, 1270, 1420],
    adImpressions: [8600, 9900, 11400, 12100, 13600],
    adClicks: [420, 508, 581, 650, 742],
  },
  '90d': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    downloads: [2100, 2600, 3200, 4200, 4890, 5610],
    users: [980, 1180, 1290, 1430, 1670, 1870],
    adImpressions: [18200, 21450, 24800, 29000, 32100, 36800],
    adClicks: [860, 1030, 1180, 1330, 1510, 1685],
  },
};

const state = {
  currentPage: 'dashboard',
  adStatus: 'all',
  updateStatus: 'all',
  announcementStatus: 'all',
  analyticsRange: '7d',
  searchText: '',
};

const pageMeta = {
  dashboard: {
    title: 'Dashboard',
    description: 'Overview of your Fable Launcher ecosystem',
  },
  ads: {
    title: 'Advertisements',
    description: 'Manage advertisements displayed inside Fable Launcher.',
  },
  updates: {
    title: 'Launcher Updates',
    description: 'Manage Fable Launcher releases.',
  },
  announcements: {
    title: 'Announcements',
    description: 'Manage messages displayed to Fable Launcher users.',
  },
  analytics: {
    title: 'Analytics',
    description: 'Monitor the Fable Launcher ecosystem.',
  },
  settings: {
    title: 'Settings',
    description: 'Configure your admin and launcher preferences.',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  bindNavigation();
  bindGlobalInteractions();
  bindSearch();
  syncHashFromState();
  renderPage();
});

function bindNavigation() {
  document.querySelectorAll('[data-page]').forEach((button) => {
    button.addEventListener('click', () => {
      const page = button.dataset.page;
      state.currentPage = page;
      syncHashFromState();
      renderPage();
      closeDropdowns();
    });
  });
}

function bindGlobalInteractions() {
  const notificationsButton = document.getElementById('notifications-button');
  const adminButton = document.getElementById('admin-button');
  const notificationsDropdown = document.getElementById('notifications-dropdown');
  const adminDropdown = document.getElementById('admin-dropdown');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  notificationsButton.addEventListener('click', () => {
    const open = notificationsDropdown.hidden;
    notificationsDropdown.hidden = !open;
    adminDropdown.hidden = true;
  });

  adminButton.addEventListener('click', () => {
    const open = adminDropdown.hidden;
    adminDropdown.hidden = !open;
    notificationsDropdown.hidden = true;
  });

  document.addEventListener('click', (event) => {
    const withinNotifications = event.target.closest('.notifications-wrap');
    const withinAdmin = event.target.closest('.admin-menu-wrap');
    if (!withinNotifications) notificationsDropdown.hidden = true;
    if (!withinAdmin) adminDropdown.hidden = true;
  });

  document.addEventListener('click', handleActionClick);
  document.addEventListener('submit', handleFormSubmit);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      closeDropdowns();
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.remove('open');
    }
  });

  document.addEventListener('click', (event) => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    if (sidebar && window.innerWidth <= 1024 && !event.target.closest('.sidebar') && !event.target.closest('#sidebar-toggle')) {
      sidebar.classList.remove('open');
    }
    if (toggle && event.target.closest('.nav-item')) {
      sidebar.classList.remove('open');
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target.matches('#global-search')) {
      state.searchText = event.target.value.trim().toLowerCase();
      if (state.currentPage === 'ads') {
        renderPage();
      }
      if (state.currentPage === 'updates') {
        renderPage();
      }
      if (state.currentPage === 'announcements') {
        renderPage();
      }
    }
  });

  window.addEventListener('hashchange', () => {
    const nextPage = window.location.hash.replace('#', '') || 'dashboard';
    if (pageMeta[nextPage]) {
      state.currentPage = nextPage;
      renderPage();
    }
  });
}

function bindSearch() {
  const input = document.getElementById('global-search');
  input.value = '';
}

function syncHashFromState() {
  const page = state.currentPage || 'dashboard';
  if (window.location.hash !== `#${page}`) {
    window.location.hash = page;
  }
}

function renderPage() {
  const page = state.currentPage;
  const meta = pageMeta[page];
  if (!meta) return;

  document.getElementById('page-title').textContent = meta.title;
  document.getElementById('page-description').textContent = meta.description;

  document.querySelectorAll('.nav-item').forEach((button) => {
    button.classList.toggle('active', button.dataset.page === page);
  });

  const contentRoot = document.getElementById('page-content');

  switch (page) {
    case 'dashboard':
      contentRoot.innerHTML = renderDashboard();
      break;
    case 'ads':
      contentRoot.innerHTML = renderAds();
      break;
    case 'updates':
      contentRoot.innerHTML = renderUpdates();
      break;
    case 'announcements':
      contentRoot.innerHTML = renderAnnouncements();
      break;
    case 'analytics':
      contentRoot.innerHTML = renderAnalytics();
      break;
    case 'settings':
      contentRoot.innerHTML = renderSettings();
      break;
    default:
      contentRoot.innerHTML = renderDashboard();
  }
}

function renderDashboard() {
  const stats = [
    { label: 'Current Version', value: 'v0.1.1', tag: 'BETA', trend: '+12%', tone: 'warning' },
    { label: 'Active Users', value: '1,284', trend: '+12%', tone: 'success' },
    { label: 'Launcher Downloads', value: '4,921', trend: '+28%', tone: 'success' },
    { label: 'Active Advertisement', value: 'Wabbanode', tag: 'Active', tone: 'success' },
  ];

  const usersValues = [430, 520, 610, 560, 700, 780, 860];
  const donationBreakdown = [
    { label: 'v0.1.1 (BETA)', value: 72.4, color: '#3fa0ff' },
    { label: 'v0.1.0', value: 18.1, color: '#67c9ff' },
    { label: 'v0.0.9', value: 6.3, color: '#7de0b7' },
    { label: 'Older', value: 3.2, color: '#b7c9d9' },
  ];

  return `
    <div class="stats-grid">
      ${stats
        .map(
          (metric) => `
            <article class="metric-card">
              <div class="label">
                <span>${metric.label}</span>
                ${metric.tag ? `<span class="tag-badge ${metric.tone === 'warning' ? 'warning' : ''}">${metric.tag}</span>` : ''}
              </div>
              <div class="value">
                <strong>${metric.value}</strong>
                ${metric.trend ? `<span class="trend ${metric.tone === 'warning' ? 'warning' : ''}">${metric.trend}</span>` : ''}
              </div>
            </article>
          `,
        )
        .join('')}
    </div>

    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-header">
          <h3>Active Users</h3>
          <span class="muted">Last 7 days</span>
        </div>
        <div class="chart-card">
          ${buildLineChart(usersValues, ['Oct 1', 'Oct 2', 'Oct 3', 'Oct 4', 'Oct 5', 'Oct 6', 'Oct 7'])}
          <div class="chart-meta">
            <span class="legend"><span class="legend-dot"></span>Users</span>
            <span>Peak: 860</span>
          </div>
        </div>
      </section>

      <aside class="side-stack">
        <section class="panel">
          <div class="panel-header">
            <h3>Current Advertisement</h3>
          </div>
          <div class="advert-card">
            <div class="advert-banner">
              <img src="src/assets/banner-placeholder.svg" alt="Wabbanode banner" />
            </div>
            <div class="advert-body">
              <div class="advert-details">
                <h3>Wabbanode</h3>
                <span class="status-pill">Active</span>
              </div>
              <p>High-performance Minecraft hosting.</p>
              <button class="inline-button secondary-button" type="button">View Details →</button>
            </div>
          </div>
        </section>

        <section class="panel statement-card">
          <strong>Latest Announcement</strong>
          <p>Fable Launcher v0.1.1 BETA</p>
          <p>Fable Launcher v0.1.1 is now available! This update includes various improvements and bug fixes.</p>
          <div class="meta">
            <span class="status-pill neutral">Published</span>
          </div>
          <div style="margin-top: 16px;">
            <button class="inline-button secondary-button" type="button">View Details →</button>
          </div>
        </section>
      </aside>
    </div>

    <div class="dashboard-grid" style="margin-top: 20px;">
      <section class="panel">
        <div class="panel-header">
          <h3>Version Distribution</h3>
        </div>
        <div class="donut-wrapper">
          <div class="donut-chart">
            <div class="donut-center"><div><strong>72.4%</strong><span>v0.1.1</span></div></div>
          </div>
        </div>
        <div class="version-list">
          ${donationBreakdown
            .map(
              (item) => `<div class="version-row"><div class="version-info"><span class="legend-swatch" style="background:${item.color};"></span><span>${item.label}</span></div><strong>${item.value}%</strong></div>`,
            )
            .join('')}
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <h3>Recent Activity</h3>
        </div>
        <ul class="activity-list">
          ${mockActivity
            .map(
              (item) => `
                <li class="activity-item">
                  <span class="activity-dot" style="background:${getActivityColor(item.icon)}"></span>
                  <div>
                    <strong>${item.title}</strong>
                    <span>${item.subtitle}</span>
                  </div>
                  <time>${item.time}</time>
                </li>
              `,
            )
            .join('')}
        </ul>
      </section>
    </div>
  `;
}

function renderAds() {
  const filteredAds = mockAds.filter((ad) => {
    const matchesStatus = state.adStatus === 'all' || ad.status === state.adStatus;
    const matchesSearch = !state.searchText || `${ad.title} ${ad.description}`.toLowerCase().includes(state.searchText);
    return matchesStatus && matchesSearch;
  });

  return `
    <div class="panel">
      <div class="toolbar">
        <div class="filter-group" aria-label="Advertisement status filters">
          ${['all', 'active', 'draft', 'expired']
            .map(
              (status) => `
                <button
                  class="filter-button ${state.adStatus === status ? 'active' : ''}"
                  type="button"
                  data-filter="ad-status"
                  data-value="${status}"
                >
                  ${status === 'all' ? 'All' : capitalize(status)}
                </button>
              `,
            )
            .join('')}
        </div>
        <button type="button" class="primary-button" data-action="create-ad">+ Create Advertisement</button>
      </div>

      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>Banner</th>
              <th>Title</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>CTR</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filteredAds
              .map(
                (ad) => `
                  <tr>
                    <td>
                      <div class="ad-thumb">
                        <img src="${ad.banner}" alt="${ad.title} banner" />
                      </div>
                    </td>
                    <td>
                      <div class="ad-row-title">
                        <div>
                          <strong>${ad.title}</strong>
                          <small>${ad.description}</small>
                        </div>
                      </div>
                    </td>
                    <td><span class="status-pill ${statusClass(ad.status)}">${ad.status}</span></td>
                    <td>${formatDate(ad.startDate)}</td>
                    <td>${formatDate(ad.endDate)}</td>
                    <td>${formatNumber(ad.impressions)}</td>
                    <td>${formatNumber(ad.clicks)}</td>
                    <td>${ad.ctr}%</td>
                    <td>
                      <div class="actions">
                        <button type="button" class="secondary-button" data-action="edit-ad" data-id="${ad.id}">Edit</button>
                        <button type="button" class="danger-button" data-action="delete-ad" data-id="${ad.id}">Delete</button>
                      </div>
                    </td>
                  </tr>
                `,
              )
              .join('') || '<tr><td colspan="9">No advertisements match the current filters.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderUpdates() {
  const filteredUpdates = mockUpdates.filter((update) => {
    const matchesStatus = state.updateStatus === 'all' || update.status === state.updateStatus;
    const matchesSearch = !state.searchText || `${update.version} ${update.title}`.toLowerCase().includes(state.searchText);
    return matchesStatus && matchesSearch;
  });

  return `
    <div class="panel">
      <div class="toolbar">
        <div class="filter-group" aria-label="Update status filters">
          ${['all', 'current', 'published', 'draft']
            .map(
              (status) => `
                <button
                  class="filter-button ${state.updateStatus === status ? 'active' : ''}"
                  type="button"
                  data-filter="update-status"
                  data-value="${status}"
                >
                  ${status === 'all' ? 'All' : capitalize(status)}
                </button>
              `,
            )
            .join('')}
        </div>
        <button type="button" class="primary-button" data-action="create-update">+ Publish Update</button>
      </div>

      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>Version</th>
              <th>Status</th>
              <th>Published</th>
              <th>Downloads</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filteredUpdates
              .map(
                (update) => `
                  <tr>
                    <td>
                      <div class="ad-row-title">
                        <div>
                          <strong>${update.version}</strong>
                          <small>${update.title}</small>
                        </div>
                      </div>
                    </td>
                    <td><span class="status-pill ${statusClass(update.status)}">${update.status === 'current' ? 'Current' : update.status}</span></td>
                    <td>${formatDate(update.releaseDate)}</td>
                    <td>${formatNumber(update.downloads)}</td>
                    <td>
                      <div class="actions">
                        <button type="button" class="secondary-button" data-action="edit-update" data-id="${update.id}">Edit</button>
                        <button type="button" class="danger-button" data-action="delete-update" data-id="${update.id}">Delete</button>
                      </div>
                    </td>
                  </tr>
                `,
              )
              .join('') || '<tr><td colspan="5">No updates match the current filters.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAnnouncements() {
  const filteredAnnouncements = mockAnnouncements.filter((item) => {
    const matchesStatus = state.announcementStatus === 'all' || item.status === state.announcementStatus;
    const matchesSearch = !state.searchText || `${item.title} ${item.message}`.toLowerCase().includes(state.searchText);
    return matchesStatus && matchesSearch;
  });

  return `
    <div class="panel">
      <div class="toolbar">
        <div class="filter-group" aria-label="Announcement status filters">
          ${['all', 'published', 'draft', 'expired']
            .map(
              (status) => `
                <button
                  class="filter-button ${state.announcementStatus === status ? 'active' : ''}"
                  type="button"
                  data-filter="announcement-status"
                  data-value="${status}"
                >
                  ${status === 'all' ? 'All' : capitalize(status)}
                </button>
              `,
            )
            .join('')}
        </div>
        <button type="button" class="primary-button" data-action="create-announcement">+ Create Announcement</button>
      </div>

      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filteredAnnouncements
              .map(
                (announcement) => `
                  <tr>
                    <td>
                      <div class="ad-row-title">
                        <div>
                          <strong>${announcement.title}</strong>
                          <small>${announcement.message}</small>
                        </div>
                      </div>
                    </td>
                    <td><span class="status-pill ${statusClass(announcement.status)}">${announcement.status}</span></td>
                    <td>${formatDate(announcement.startDate)}</td>
                    <td>${formatDate(announcement.endDate)}</td>
                    <td>
                      <div class="actions">
                        <button type="button" class="secondary-button" data-action="edit-announcement" data-id="${announcement.id}">Edit</button>
                        <button type="button" class="danger-button" data-action="delete-announcement" data-id="${announcement.id}">Delete</button>
                      </div>
                    </td>
                  </tr>
                `,
              )
              .join('') || '<tr><td colspan="5">No announcements match the current filters.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAnalytics() {
  const range = state.analyticsRange;
  const rangeData = analyticsSeries[range];

  const kpiCards = [
    { label: 'Downloads', value: '4,921', delta: '+28%', tone: 'success' },
    { label: 'Active Users', value: '1,284', delta: '+12%', tone: 'success' },
    { label: 'Advertisement Impressions', value: '54.7K', delta: '+21%', tone: 'success' },
    { label: 'Advertisement Clicks', value: '2,914', delta: '+16%', tone: 'success' },
    { label: 'CTR', value: '5.3%', delta: '+0.8%', tone: 'success' },
    { label: 'Update Adoption', value: '68.4%', delta: '-2.1%', tone: 'warning' },
  ];

  return `
    <div class="stats-header">
      <div>
        <h3 style="margin:0;">Performance overview</h3>
      </div>
      <div class="range-toggle" aria-label="Analytics time range selector">
        ${['24h', '7d', '30d', '90d']
          .map(
            (period) => `
              <button type="button" class="${period === range ? 'active' : ''}" data-filter="analytics-range" data-value="${period}">
                ${period === '24h' ? '24 hours' : period === '7d' ? '7 days' : period === '30d' ? '30 days' : '90 days'}
              </button>
            `,
          )
          .join('')}
      </div>
    </div>

    <div class="kpi-grid">
      ${kpiCards
        .map(
          (item) => `
            <article class="metric-card kpi-card">
              <h4>${item.label}</h4>
              <strong>${item.value}</strong>
              <span class="${item.tone === 'warning' ? 'down' : ''}">${item.delta}</span>
            </article>
          `,
        )
        .join('')}
    </div>

    <div class="analytics-grid" style="margin-top: 20px;">
      <section class="panel chart-panel">
        <div class="panel-header">
          <h3>Launcher Downloads</h3>
          <span class="muted">${range}</span>
        </div>
        ${buildLineChart(rangeData.downloads, rangeData.labels, '#3fa0ff', 'Downloads')}
      </section>

      <section class="panel chart-panel">
        <div class="panel-header">
          <h3>Active Users</h3>
          <span class="muted">${range}</span>
        </div>
        ${buildLineChart(rangeData.users, rangeData.labels, '#67c9ff', 'Users')}
      </section>

      <section class="panel chart-panel">
        <div class="panel-header">
          <h3>Version Distribution</h3>
          <span class="muted">Current</span>
        </div>
        <div class="donut-wrapper">
          <div class="donut-chart" style="background: conic-gradient(#3fa0ff 0 72.4%, #67c9ff 72.4% 90.5%, #7de0b7 90.5% 96.8%, #b7c9d9 96.8% 100%);">
            <div class="donut-center"><div><strong>72.4%</strong><span>v0.1.1</span></div></div>
          </div>
        </div>
      </section>

      <section class="panel chart-panel">
        <div class="panel-header">
          <h3>Advertisement Performance</h3>
          <span class="muted">${range}</span>
        </div>
        ${buildLineChart(rangeData.adClicks, rangeData.labels, '#7de0b7', 'Clicks')}
      </section>
    </div>
  `;
}

function renderSettings() {
  return `
    <div class="settings-grid">
      <section class="settings-card">
        <h3>General</h3>
        <div class="form-grid">
          <div class="form-field">
            <label for="dashboard-theme">Dashboard Theme</label>
            <select id="dashboard-theme" name="dashboard-theme">
              <option>Dark</option>
              <option>Midnight</option>
              <option>Slate</option>
            </select>
          </div>
          <div class="form-field">
            <label for="timezone">Timezone</label>
            <select id="timezone" name="timezone">
              <option>UTC</option>
              <option selected>Europe/London</option>
              <option>America/New_York</option>
            </select>
          </div>
          <div class="form-field full">
            <label for="date-format">Date Format</label>
            <select id="date-format" name="date-format">
              <option selected>YYYY-MM-DD</option>
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
            </select>
          </div>
        </div>
      </section>

      <section class="settings-card">
        <h3>Admin Profile</h3>
        <div class="form-grid">
          <div class="form-field">
            <label for="username">Username</label>
            <input id="username" name="username" type="text" value="administrator" />
          </div>
          <div class="form-field">
            <label for="display-name">Display Name</label>
            <input id="display-name" name="display-name" type="text" value="Administrator" />
          </div>
          <div class="form-field full">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" value="admin@fable.example" />
          </div>
        </div>
      </section>

      <section class="settings-card">
        <h3>Security</h3>
        <div class="form-grid">
          <div class="form-field full">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" value="********" />
          </div>
          <div class="form-field full">
            <label>Two-factor authentication</label>
            <div class="checkbox-row">
              <input type="checkbox" id="two-factor" checked />
              <label for="two-factor">Enabled placeholder</label>
            </div>
          </div>
          <div class="form-field full">
            <label for="sessions">Active sessions</label>
            <input id="sessions" name="sessions" type="text" value="3 active devices" />
          </div>
        </div>
      </section>

      <section class="settings-card">
        <h3>API</h3>
        <div class="form-grid">
          <div class="form-field full">
            <label>Backend API status</label>
            <div class="status-pill danger" style="width: fit-content;">Backend API not connected</div>
          </div>
          <div class="form-field full">
            <label for="api-base">API Base URL</label>
            <input id="api-base" name="api-base" type="text" placeholder="https://api.example.com" />
          </div>
        </div>
      </section>
    </div>

    <div class="form-actions">
      <button type="button" class="secondary-button">Reset</button>
      <button type="button" class="primary-button">Save Changes</button>
    </div>
  `;
}

function handleActionClick(event) {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.dataset.filter) {
    const filterName = button.dataset.filter;
    const value = button.dataset.value;
    if (filterName === 'ad-status') {
      state.adStatus = value;
      renderPage();
    }
    if (filterName === 'update-status') {
      state.updateStatus = value;
      renderPage();
    }
    if (filterName === 'announcement-status') {
      state.announcementStatus = value;
      renderPage();
    }
    if (filterName === 'analytics-range') {
      state.analyticsRange = value;
      renderPage();
    }
    return;
  }

  const action = button.dataset.action;
  if (!action) return;

  switch (action) {
    case 'create-ad':
      openAdModal('create');
      break;
    case 'edit-ad':
      openAdModal('edit', button.dataset.id);
      break;
    case 'delete-ad':
      openDeleteModal('advertisement', button.dataset.id);
      break;
    case 'create-update':
      openUpdateModal('create');
      break;
    case 'edit-update':
      openUpdateModal('edit', button.dataset.id);
      break;
    case 'delete-update':
      openDeleteModal('update', button.dataset.id);
      break;
    case 'create-announcement':
      openAnnouncementModal('create');
      break;
    case 'edit-announcement':
      openAnnouncementModal('edit', button.dataset.id);
      break;
    case 'delete-announcement':
      openDeleteModal('announcement', button.dataset.id);
      break;
    default:
      break;
  }
}

function handleFormSubmit(event) {
  const form = event.target;
  if (!form.dataset.formType) return;
  event.preventDefault();

  const formData = new FormData(form);
  const saveAction = formData.get('saveAction') || 'draft';

  if (form.dataset.formType === 'ad-form') {
    const payload = {
      title: formData.get('title')?.toString().trim(),
      description: formData.get('description')?.toString().trim(),
      destination: formData.get('destination')?.toString().trim(),
      startDate: formData.get('startDate')?.toString(),
      endDate: formData.get('endDate')?.toString(),
      enabled: formData.get('enabled') === 'on',
      banner: formData.get('banner')?.toString().trim() || 'src/assets/banner-placeholder.svg',
    };

    if (!payload.title || !payload.description || !payload.destination) {
      showToast('Please complete all required advertisement fields.', 'error');
      return;
    }

    if (form.dataset.mode === 'edit') {
      const index = mockAds.findIndex((item) => item.id === form.dataset.id);
      if (index >= 0) {
        mockAds[index] = { ...mockAds[index], ...payload, status: saveAction === 'publish' ? 'active' : mockAds[index].status || 'draft' };
      }
      showToast('Advertisement updated.', 'success');
    } else {
      mockAds.unshift({
        id: `ad-${Date.now()}`,
        ...payload,
        status: saveAction === 'publish' ? 'active' : 'draft',
        impressions: 0,
        clicks: 0,
        ctr: 0,
      });
      showToast('Advertisement created.', 'success');
    }

    closeModal();
    renderPage();
    return;
  }

  if (form.dataset.formType === 'update-form') {
    const payload = {
      version: formData.get('version')?.toString().trim(),
      title: formData.get('title')?.toString().trim(),
      notes: formData.get('notes')?.toString().trim(),
      metadataUrl: formData.get('metadataUrl')?.toString().trim(),
      releaseDate: formData.get('releaseDate')?.toString(),
      status: formData.get('status')?.toString() || 'draft',
    };

    if (!payload.version || !payload.title || !payload.notes) {
      showToast('Please provide a version, title, and notes for the update.', 'error');
      return;
    }

    if (form.dataset.mode === 'edit') {
      const index = mockUpdates.findIndex((item) => item.id === form.dataset.id);
      if (index >= 0) {
        mockUpdates[index] = { ...mockUpdates[index], ...payload, status: saveAction === 'publish' ? 'published' : payload.status };
      }
      showToast('Update saved.', 'success');
    } else {
      mockUpdates.unshift({
        id: `update-${Date.now()}`,
        ...payload,
        downloads: 0,
        status: saveAction === 'publish' ? 'published' : 'draft',
      });
      showToast('Update published.', 'success');
    }

    closeModal();
    renderPage();
    return;
  }

  if (form.dataset.formType === 'announcement-form') {
    const payload = {
      title: formData.get('title')?.toString().trim(),
      message: formData.get('message')?.toString().trim(),
      image: formData.get('image')?.toString().trim() || 'src/assets/announcement-placeholder.svg',
      buttonText: formData.get('buttonText')?.toString().trim() || 'Learn more',
      buttonUrl: formData.get('buttonUrl')?.toString().trim() || '#',
      startDate: formData.get('startDate')?.toString(),
      endDate: formData.get('endDate')?.toString(),
      enabled: formData.get('enabled') === 'on',
    };

    if (!payload.title || !payload.message) {
      showToast('Please provide an announcement title and message.', 'error');
      return;
    }

    if (form.dataset.mode === 'edit') {
      const index = mockAnnouncements.findIndex((item) => item.id === form.dataset.id);
      if (index >= 0) {
        mockAnnouncements[index] = { ...mockAnnouncements[index], ...payload, status: saveAction === 'publish' ? 'published' : mockAnnouncements[index].status || 'draft' };
      }
      showToast('Announcement updated.', 'success');
    } else {
      mockAnnouncements.unshift({
        id: `announcement-${Date.now()}`,
        ...payload,
        status: saveAction === 'publish' ? 'published' : 'draft',
      });
      showToast('Announcement created.', 'success');
    }

    closeModal();
    renderPage();
    return;
  }
}

function openAdModal(mode, id) {
  const existing = mockAds.find((ad) => ad.id === id) || null;
  const formId = `ad-form-${Date.now()}`;
  const body = `
    <form id="${formId}" class="modal-form" data-form-type="ad-form" data-mode="${mode}" data-id="${existing ? existing.id : ''}">
      <div class="form-grid">
        <div class="form-field full">
          <label for="ad-banner">Banner</label>
          <input id="ad-banner" name="banner" type="url" value="${existing ? existing.banner : 'src/assets/banner-placeholder.svg'}" />
        </div>
        <div class="form-field full">
          <label for="ad-title">Title</label>
          <input id="ad-title" name="title" type="text" value="${existing ? existing.title : ''}" required />
        </div>
        <div class="form-field full">
          <label for="ad-description">Description</label>
          <textarea id="ad-description" name="description" required>${existing ? existing.description : ''}</textarea>
        </div>
        <div class="form-field full">
          <label for="ad-destination">Destination URL</label>
          <input id="ad-destination" name="destination" type="url" value="${existing ? existing.destination : ''}" required />
        </div>
        <div class="form-field">
          <label for="ad-start-date">Start Date</label>
          <input id="ad-start-date" name="startDate" type="date" value="${existing ? existing.startDate : '2025-10-08'}" />
        </div>
        <div class="form-field">
          <label for="ad-end-date">End Date</label>
          <input id="ad-end-date" name="endDate" type="date" value="${existing ? existing.endDate : '2025-12-31'}" />
        </div>
        <div class="form-field full">
          <div class="checkbox-row">
            <input id="ad-enabled" name="enabled" type="checkbox" ${existing && existing.enabled ? 'checked' : ''} />
            <label for="ad-enabled">Enabled</label>
          </div>
        </div>
      </div>
      <div class="preview-panel" style="margin-top: 18px;">
        <div class="preview-image">
          <img src="${existing ? existing.banner : 'src/assets/banner-placeholder.svg'}" alt="Advertisement preview" />
        </div>
        <div class="preview-content">
          <h4>${existing ? existing.title : 'Advertisement title'}</h4>
          <p>${existing ? existing.description : 'Add a preview description to show how this ad will appear.'}</p>
        </div>
      </div>
    </form>
  `;

  openModal({
    title: mode === 'edit' ? 'Edit Advertisement' : 'Create Advertisement',
    body,
    footer: `
      <div class="form-actions" style="margin-top:0;">
        <button type="button" class="ghost-button" data-close-modal>Cancel</button>
        <button type="submit" form="${formId}" class="secondary-button" name="saveAction" value="draft">Save Draft</button>
        <button type="submit" form="${formId}" class="primary-button" name="saveAction" value="publish">${mode === 'edit' ? 'Publish Advertisement' : 'Publish Advertisement'}</button>
      </div>
    `,
    formType: 'ad-form',
    mode,
    id: existing ? existing.id : '',
  });

  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener('input', updateAdPreview);
  }
}

function openUpdateModal(mode, id) {
  const existing = mockUpdates.find((item) => item.id === id) || null;
  const formId = `update-form-${Date.now()}`;
  const body = `
    <form id="${formId}" class="modal-form" data-form-type="update-form" data-mode="${mode}" data-id="${existing ? existing.id : ''}">
      <div class="form-grid">
        <div class="form-field">
          <label for="update-version">Version</label>
          <input id="update-version" name="version" type="text" value="${existing ? existing.version : 'v0.1.2'}" required />
        </div>
        <div class="form-field">
          <label for="update-title">Title</label>
          <input id="update-title" name="title" type="text" value="${existing ? existing.title : 'Fable Launcher v0.1.2'}" required />
        </div>
        <div class="form-field full">
          <label for="update-notes">Release Notes</label>
          <textarea id="update-notes" name="notes" required>${existing ? existing.notes : 'Describe the new launcher changes here.'}</textarea>
        </div>
        <div class="form-field full">
          <label for="update-url">Update Metadata URL</label>
          <input id="update-url" name="metadataUrl" type="url" value="${existing ? existing.metadataUrl : 'https://updates.example/fable/v0.1.2.json'}" />
        </div>
        <div class="form-field">
          <label for="update-date">Release Date</label>
          <input id="update-date" name="releaseDate" type="date" value="${existing ? existing.releaseDate : '2025-10-14'}" />
        </div>
        <div class="form-field">
          <label for="update-status">Status</label>
          <select id="update-status" name="status">
            <option value="draft" ${existing && existing.status === 'draft' ? 'selected' : ''}>Draft</option>
            <option value="published" ${existing && existing.status === 'published' ? 'selected' : ''}>Published</option>
            <option value="current" ${existing && existing.status === 'current' ? 'selected' : ''}>Current</option>
          </select>
        </div>
      </div>
    </form>
  `;

  openModal({
    title: mode === 'edit' ? 'Edit Update' : 'Create Update',
    body,
    footer: `
      <div class="form-actions" style="margin-top:0;">
        <button type="button" class="ghost-button" data-close-modal>Cancel</button>
        <button type="submit" form="${formId}" class="secondary-button" name="saveAction" value="draft">Save Draft</button>
        <button type="submit" form="${formId}" class="primary-button" name="saveAction" value="publish">Publish Update</button>
      </div>
    `,
    formType: 'update-form',
    mode,
    id: existing ? existing.id : '',
  });
}

function openAnnouncementModal(mode, id) {
  const existing = mockAnnouncements.find((item) => item.id === id) || null;
  const formId = `announcement-form-${Date.now()}`;
  const body = `
    <form id="${formId}" class="modal-form" data-form-type="announcement-form" data-mode="${mode}" data-id="${existing ? existing.id : ''}">
      <div class="form-grid">
        <div class="form-field full">
          <label for="announcement-title">Title</label>
          <input id="announcement-title" name="title" type="text" value="${existing ? existing.title : 'Fable Launcher update'}" required />
        </div>
        <div class="form-field full">
          <label for="announcement-message">Message</label>
          <textarea id="announcement-message" name="message" required>${existing ? existing.message : 'Our latest update is now live with improvements and fixes.'}</textarea>
        </div>
        <div class="form-field full">
          <label for="announcement-image">Image</label>
          <input id="announcement-image" name="image" type="url" value="${existing ? existing.image : 'src/assets/announcement-placeholder.svg'}" />
        </div>
        <div class="form-field">
          <label for="announcement-button-text">Button Text</label>
          <input id="announcement-button-text" name="buttonText" type="text" value="${existing ? existing.buttonText : 'Learn more'}" />
        </div>
        <div class="form-field">
          <label for="announcement-button-url">Button URL</label>
          <input id="announcement-button-url" name="buttonUrl" type="url" value="${existing ? existing.buttonUrl : 'https://fable.example'}" />
        </div>
        <div class="form-field">
          <label for="announcement-start">Start Date</label>
          <input id="announcement-start" name="startDate" type="date" value="${existing ? existing.startDate : '2025-10-08'}" />
        </div>
        <div class="form-field">
          <label for="announcement-end">End Date</label>
          <input id="announcement-end" name="endDate" type="date" value="${existing ? existing.endDate : '2025-11-08'}" />
        </div>
        <div class="form-field full">
          <div class="checkbox-row">
            <input id="announcement-enabled" name="enabled" type="checkbox" ${existing && existing.enabled ? 'checked' : ''} />
            <label for="announcement-enabled">Enabled</label>
          </div>
        </div>
      </div>

      <div class="preview-panel" style="margin-top: 18px;">
        <div class="preview-image">
          <img src="${existing ? existing.image : 'src/assets/announcement-placeholder.svg'}" alt="Announcement preview" />
        </div>
        <div class="preview-content">
          <h4>${existing ? existing.title : 'Announcement title'}</h4>
          <p>${existing ? existing.message : 'Your announcement body will appear here in real time.'}</p>
          <button type="button" class="secondary-button" style="margin-top:12px;">${existing ? existing.buttonText : 'Learn more'}</button>
        </div>
      </div>
    </form>
  `;

  openModal({
    title: mode === 'edit' ? 'Edit Announcement' : 'Create Announcement',
    body,
    footer: `
      <div class="form-actions" style="margin-top:0;">
        <button type="button" class="ghost-button" data-close-modal>Cancel</button>
        <button type="submit" form="${formId}" class="secondary-button" name="saveAction" value="draft">Save Draft</button>
        <button type="submit" form="${formId}" class="primary-button" name="saveAction" value="publish">Publish</button>
      </div>
    `,
    formType: 'announcement-form',
    mode,
    id: existing ? existing.id : '',
  });

  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener('input', updateAnnouncementPreview);
  }
}

function openDeleteModal(entity, id) {
  const labels = {
    advertisement: 'advertisement',
    update: 'update',
    announcement: 'announcement',
  };

  const content = `
    <div class="confirm-panel">
      <h3>Delete ${labels[entity]}?</h3>
      <p>This action cannot be undone. The item will be removed from the current mock data set.</p>
    </div>
  `;

  openModal({
    title: 'Confirm Delete',
    body: content,
    footer: `
      <div class="form-actions" style="margin-top:0;">
        <button type="button" class="ghost-button" data-close-modal>Cancel</button>
        <button type="button" class="danger-button" data-confirm-delete data-entity="${entity}" data-id="${id}">Delete</button>
      </div>
    `,
  });
}

function openModal({ title, body, footer, formType = '', mode = '', id = '' }) {
  const container = document.getElementById('modal-container');
  container.innerHTML = `
    <div class="modal-header">
      <h2>${title}</h2>
      <button type="button" class="modal-close" data-close-modal aria-label="Close dialog">✕</button>
    </div>
    <div class="modal-body">${body}</div>
    <div class="modal-footer">${footer}</div>
  `;

  const overlay = document.getElementById('modal-overlay');
  overlay.hidden = false;
  document.body.classList.add('modal-open');

  container.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  container.querySelectorAll('[data-confirm-delete]').forEach((button) => {
    button.addEventListener('click', () => {
      const entity = button.dataset.entity;
      const itemId = button.dataset.id;
      if (entity === 'advertisement') {
        const index = mockAds.findIndex((item) => item.id === itemId);
        if (index >= 0) mockAds.splice(index, 1);
        showToast('Advertisement deleted.', 'success');
      }
      if (entity === 'update') {
        const index = mockUpdates.findIndex((item) => item.id === itemId);
        if (index >= 0) mockUpdates.splice(index, 1);
        showToast('Update deleted.', 'success');
      }
      if (entity === 'announcement') {
        const index = mockAnnouncements.findIndex((item) => item.id === itemId);
        if (index >= 0) mockAnnouncements.splice(index, 1);
        showToast('Announcement deleted.', 'success');
      }
      closeModal();
      renderPage();
    });
  });

  if (formType) {
    const form = container.querySelector(`form[data-form-type="${formType}"]`);
    if (form) {
      form.dataset.formType = formType;
      form.dataset.mode = mode;
      form.dataset.id = id;
    }
  }
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.hidden = true;
  }
  document.body.classList.remove('modal-open');
  document.getElementById('modal-container').innerHTML = '';
}

function closeDropdowns() {
  document.getElementById('notifications-dropdown').hidden = true;
  document.getElementById('admin-dropdown').hidden = true;
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2600);
}

function updateAdPreview(event) {
  const form = event.currentTarget;
  const title = form.querySelector('[name="title"]').value || 'Advertisement title';
  const description = form.querySelector('[name="description"]').value || 'Add a preview description to show how this ad will appear.';
  const banner = form.querySelector('[name="banner"]').value || 'src/assets/banner-placeholder.svg';
  const modal = form.closest('.modal-container');
  const previewImage = modal?.querySelector('.preview-image img');
  const previewTitle = modal?.querySelector('.preview-content h4');
  const previewText = modal?.querySelector('.preview-content p');

  if (previewImage) previewImage.src = banner;
  if (previewTitle) previewTitle.textContent = title;
  if (previewText) previewText.textContent = description;
}

function updateAnnouncementPreview(event) {
  const form = event.currentTarget;
  const title = form.querySelector('[name="title"]').value || 'Announcement title';
  const message = form.querySelector('[name="message"]').value || 'Your announcement body will appear here in real time.';
  const image = form.querySelector('[name="image"]').value || 'src/assets/announcement-placeholder.svg';
  const buttonText = form.querySelector('[name="buttonText"]').value || 'Learn more';
  const modal = form.closest('.modal-container');
  const previewImage = modal?.querySelector('.preview-image img');
  const previewTitle = modal?.querySelector('.preview-content h4');
  const previewText = modal?.querySelector('.preview-content p');
  const previewButton = modal?.querySelector('.preview-content button');

  if (previewImage) previewImage.src = image;
  if (previewTitle) previewTitle.textContent = title;
  if (previewText) previewText.textContent = message;
  if (previewButton) previewButton.textContent = buttonText;
}

function buildLineChart(values, labels, color = '#3fa0ff', label = 'Value') {
  const width = 640;
  const height = 220;
  const padding = 28;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const spread = max - min || 1;

  const points = values.map((value, index) => {
    const x = padding + (index * (width - padding * 2)) / (values.length - 1 || 1);
    const y = height - padding - ((value - min) / spread) * (height - padding * 2);
    return [x, y];
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point[0]} ${point[1]}`)
    .join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1][0]} ${height - padding} L ${points[0][0]} ${height - padding} Z`;

  const xPositions = labels
    .map((labelText, index) => {
      const x = padding + (index * (width - padding * 2)) / (labels.length - 1 || 1);
      return `<text x="${x}" y="${height - 6}" fill="#8d97a4" font-size="10" text-anchor="middle">${labelText}</text>`;
    })
    .join('');

  const gradientId = `lineGradient-${label.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).slice(2, 8)}`;

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${label} chart" preserveAspectRatio="none">
      <defs>
        <linearGradient id="${gradientId}" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.26" />
          <stop offset="100%" stop-color="${color}" stop-opacity="0" />
        </linearGradient>
      </defs>
      <path d="${areaPath}" fill="url(#${gradientId})"></path>
      <path d="${linePath}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
      ${xPositions}
    </svg>
  `;
}

function getActivityColor(name) {
  if (name === 'warning') return '#d7b659';
  if (name === 'danger') return '#e85d6b';
  return '#3fa0ff';
}

function statusClass(status) {
  if (status === 'active' || status === 'published' || status === 'current') return 'success';
  if (status === 'warning' || status === 'expired') return 'warning';
  if (status === 'danger') return 'danger';
  return 'neutral';
}

function formatNumber(value) {
  return Number(value).toLocaleString();
}

function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString + 'T00:00:00');
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
