/* ============================================================
   EXPLORE NEGROS — admin.js
   Admin Dashboard (admin.html)
   ============================================================ */

const ADMIN_PASSWORD = 'admin2026';

document.addEventListener('DOMContentLoaded', () => {
  const gate         = document.getElementById('password-gate');
  const gateForm     = document.getElementById('gate-form');
  const gateInput    = document.getElementById('gate-password');
  const gateError    = document.getElementById('gate-error');
  const adminContent = document.getElementById('admin-content');

  /* ── Password Gate ──────────────────────────────────────── */
  if (sessionStorage.getItem('en_admin_auth') === 'true') {
    showDashboard();
    return;
  }

  if (gateForm) {
    gateForm.addEventListener('submit', e => {
      e.preventDefault();
      if (gateInput.value === ADMIN_PASSWORD) {
        sessionStorage.setItem('en_admin_auth', 'true');
        gate.remove();
        showDashboard();
      } else {
        gateError.textContent = 'Incorrect password. Please try again.';
        gateInput.value = '';
        gateInput.focus();
        gateInput.style.animation = 'none';
        requestAnimationFrame(() => { gateInput.style.animation = 'shake .35s ease'; });
      }
    });
  }

  /* ── Dashboard Init ─────────────────────────────────────── */
  function showDashboard() {
    if (gate) gate.style.display = 'none';
    if (adminContent) adminContent.removeAttribute('hidden');

    const timeEl = document.getElementById('login-time');
    if (timeEl) {
      timeEl.textContent = new Date().toLocaleString('en-PH', {
        dateStyle: 'long', timeStyle: 'short'
      });
    }

    loadStats();
    loadDestinations();
    loadRequests();
  }

  /* ── Stats ──────────────────────────────────────────────── */
  async function loadStats() {
    const elDest    = document.getElementById('stat-destinations');
    const elActive  = document.getElementById('stat-active');
    const elReqs    = document.getElementById('stat-requests');
    const elPending = document.getElementById('stat-pending');

    try {
      const [dests, reqs] = await Promise.all([
        window.DB.select('destinations', 'select=id,status'),
        window.DB.select('visit_requests', 'select=id,status')
      ]);
      if (elDest)    elDest.textContent    = dests.length;
      if (elActive)  elActive.textContent  = dests.filter(d => d.status === 'active').length;
      if (elReqs)    elReqs.textContent    = reqs.length;
      if (elPending) elPending.textContent = reqs.filter(r => r.status === 'pending').length;
    } catch (err) {
      console.warn('Stats load error (using fallback):', err);
      if (elDest)    elDest.textContent    = window.EN_DESTINATIONS.length;
      if (elActive)  elActive.textContent  = window.EN_DESTINATIONS.filter(d => d.status === 'active').length;
      if (elReqs)    elReqs.textContent    = '—';
      if (elPending) elPending.textContent = '—';
    }
  }

  /* ── Destinations Table ─────────────────────────────────── */
  async function loadDestinations() {
    const tbody = document.getElementById('dest-tbody');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="4"><div class="loading"><div class="spinner"></div><span>Loading…</span></div></td></tr>`;

    let destinations;
    try {
      destinations = await window.DB.select('destinations', 'order=name.asc');
    } catch (err) {
      console.warn('Destinations table error (using fallback):', err);
      destinations = window.EN_DESTINATIONS;
    }

    if (!destinations || destinations.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--color-text-muted);">No destinations found.</td></tr>`;
      return;
    }

    tbody.innerHTML = destinations.map(d => `
      <tr>
        <td><strong>${escapeHtml(d.name)}</strong></td>
        <td>${escapeHtml(d.location)}</td>
        <td>
          <span class="status-badge status-${escapeHtml(d.status)}">
            ${escapeHtml(d.status)}
          </span>
        </td>
        <td>
          <a href="details.html?id=${encodeURIComponent(d.slug)}"
             style="color:var(--color-primary);font-weight:600;text-decoration:none;">
            View →
          </a>
        </td>
      </tr>
    `).join('');
  }

  /* ── Visit Requests State & Controls ─────────────────────── */
  let cachedRequests = [];
  let currentStatusFilter = 'all';
  let currentSearchQuery = '';

  const searchInput    = document.getElementById('req-search');
  const filterTabs     = document.querySelectorAll('.filter-tab');
  const refreshReqBtn  = document.getElementById('refresh-req-btn');
  const countBadge     = document.getElementById('req-count-badge');
  const countAll       = document.getElementById('count-all');
  const countPending   = document.getElementById('count-pending');
  const countApproved  = document.getElementById('count-approved');
  const countRejected  = document.getElementById('count-rejected');

  // Wire live search input
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      renderRequestsTable();
    });
  }

  // Wire filter tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentStatusFilter = tab.dataset.status || 'all';
      renderRequestsTable();
    });
  });

  // Wire refresh button
  if (refreshReqBtn) {
    refreshReqBtn.addEventListener('click', () => {
      refreshReqBtn.classList.add('rotating');
      loadRequests().finally(() => {
        setTimeout(() => refreshReqBtn.classList.remove('rotating'), 500);
      });
      loadStats();
    });
  }

  /* ── Visit Requests Table Loader ─────────────────────────── */
  async function loadRequests() {
    const tbody = document.getElementById('req-tbody');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="6"><div class="loading"><div class="spinner"></div><span>Loading visitor requests…</span></div></td></tr>`;

    try {
      const data = await window.DB.select(
        'visit_requests',
        'order=created_at.desc&limit=100'
      );

      cachedRequests = Array.isArray(data) ? data : [];
      updateRequestCounts();
      renderRequestsTable();

    } catch (err) {
      console.error('Requests table error:', err);
      tbody.innerHTML = `<tr><td colspan="6" style="padding:1.5rem;color:var(--color-error);text-align:center;">⚠ Error loading requests: ${escapeHtml(err.message)}</td></tr>`;
    }
  }

  function updateRequestCounts() {
    const total    = cachedRequests.length;
    const pending  = cachedRequests.filter(r => (r.status || 'pending') === 'pending').length;
    const approved = cachedRequests.filter(r => r.status === 'approved').length;
    const rejected = cachedRequests.filter(r => r.status === 'rejected').length;

    if (countBadge)    countBadge.textContent    = total;
    if (countAll)      countAll.textContent      = total;
    if (countPending)  countPending.textContent  = pending;
    if (countApproved) countApproved.textContent = approved;
    if (countRejected) countRejected.textContent = rejected;
  }

  function renderRequestsTable() {
    const tbody = document.getElementById('req-tbody');
    if (!tbody) return;

    // 1. Filter by status
    let filtered = cachedRequests.filter(r => {
      if (currentStatusFilter === 'all') return true;
      return (r.status || 'pending') === currentStatusFilter;
    });

    // 2. Filter by search query
    if (currentSearchQuery) {
      filtered = filtered.filter(r => {
        const name  = (r.full_name || '').toLowerCase();
        const email = (r.email || '').toLowerCase();
        const dest  = (r.destination || '').toLowerCase();
        const msg   = (r.message || '').toLowerCase();
        return name.includes(currentSearchQuery) ||
               email.includes(currentSearchQuery) ||
               dest.includes(currentSearchQuery) ||
               msg.includes(currentSearchQuery);
      });
    }

    // 3. Handle Empty States
    if (filtered.length === 0) {
      if (cachedRequests.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6">
              <div class="empty-state-card">
                <span class="empty-icon">📬</span>
                <h3>No visitor requests yet</h3>
                <p>When travelers submit visit requests through the site, they will appear here in real-time.</p>
                <a href="form.html" class="btn btn-outline btn-sm" style="margin-top:.75rem;">Submit Test Request</a>
              </div>
            </td>
          </tr>`;
      } else {
        tbody.innerHTML = `
          <tr>
            <td colspan="6">
              <div class="empty-state-card">
                <span class="empty-icon">🔍</span>
                <h3>No matching requests found</h3>
                <p>Try adjusting your search query or status filter.</p>
                <button type="button" class="btn btn-outline btn-sm" id="btn-clear-filters" style="margin-top:.75rem;">Clear Filters</button>
              </div>
            </td>
          </tr>`;
        const clearBtn = document.getElementById('btn-clear-filters');
        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            currentSearchQuery = '';
            currentStatusFilter = 'all';
            if (searchInput) searchInput.value = '';
            filterTabs.forEach(t => {
              const isAll = (t.dataset.status || 'all') === 'all';
              t.classList.toggle('active', isAll);
              t.setAttribute('aria-selected', isAll ? 'true' : 'false');
            });
            renderRequestsTable();
          });
        }
      }
      return;
    }

    // Helper for initials
    function getInitials(name) {
      if (!name) return '?';
      const parts = name.trim().split(/\s+/);
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    function getAvatarColor(name) {
      const palette = [
        { bg: '#dbeafe', text: '#1e40af' }, // blue
        { bg: '#dcfce7', text: '#166534' }, // green
        { bg: '#fef3c7', text: '#92400e' }, // amber
        { bg: '#f3e8ff', text: '#6b21a8' }, // purple
        { bg: '#ffedd5', text: '#9a3412' }, // orange
        { bg: '#ccfbf1', text: '#115e59' }, // teal
        { bg: '#ffe4e6', text: '#9f1239' }, // rose
      ];
      let hash = 0;
      for (let i = 0; i < (name || '').length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      const idx = Math.abs(hash) % palette.length;
      return palette[idx];
    }

    // 4. Render Table Rows with visual polish
    tbody.innerHTML = filtered.map(r => {
      const hasNote = Boolean(r.message && r.message.trim());
      const guestCount = r.num_visitors || 1;
      const status = r.status || 'pending';
      const initials = getInitials(r.full_name);
      const avatar = getAvatarColor(r.full_name);

      return `
        <tr class="req-row" data-id="${r.id}">
          <td>
            <div class="visitor-flex">
              <div class="visitor-avatar" style="background-color: ${avatar.bg}; color: ${avatar.text};">
                ${escapeHtml(initials)}
              </div>
              <div class="visitor-text">
                <strong class="visitor-name">${escapeHtml(r.full_name)}</strong>
                <a href="mailto:${escapeHtml(r.email)}" class="visitor-email" title="Click to email ${escapeHtml(r.full_name)}">
                  ${escapeHtml(r.email)}
                </a>
              </div>
            </div>
          </td>
          <td>
            <span class="dest-badge">
              <span class="dest-pin" aria-hidden="true">📍</span>
              <span class="dest-name">${escapeHtml(r.destination)}</span>
            </span>
          </td>
          <td>
            <div class="date-badge">
              <span class="date-icon" aria-hidden="true">📅</span>
              <span class="date-val">${formatDate(r.visit_date)}</span>
            </div>
          </td>
          <td>
            <span class="party-badge">
              <span class="party-icon" aria-hidden="true">👥</span>
              <span>${escapeHtml(String(guestCount))} ${guestCount === 1 ? 'Guest' : 'Guests'}</span>
            </span>
          </td>
          <td>
            <div class="status-select-wrap">
              <select class="status-select status-${escapeHtml(status)}"
                      data-id="${r.id}"
                      aria-label="Update status for ${escapeHtml(r.full_name)}">
                <option value="pending"  ${status === 'pending'  ? 'selected' : ''}>⏳ Pending</option>
                <option value="approved" ${status === 'approved' ? 'selected' : ''}>✅ Approved</option>
                <option value="rejected" ${status === 'rejected' ? 'selected' : ''}>❌ Rejected</option>
              </select>
            </div>
          </td>
          <td style="text-align: right;">
            <div class="action-flex">
              ${hasNote ? `
                <button type="button"
                        class="btn-note-pill"
                        data-id="${r.id}"
                        aria-expanded="false"
                        title="View traveler's message">
                  <span class="note-icon">💬</span>
                  <span>Note</span>
                </button>
              ` : `
                <span class="no-note-badge" title="No message attached">—</span>
              `}
              <a href="mailto:${escapeHtml(r.email)}?subject=${encodeURIComponent('Regarding your Explore Negros visit request to ' + r.destination)}"
                 class="btn-icon-action"
                 title="Reply via Email">
                ✉
              </a>
            </div>
          </td>
        </tr>
        ${hasNote ? `
          <tr id="note-row-${r.id}" class="note-expand-row" hidden>
            <td colspan="6">
              <div class="note-card-inner">
                <div class="note-card-top">
                  <div class="note-user-info">
                    <span class="note-avatar-mini" style="background-color: ${avatar.bg}; color: ${avatar.text};">${escapeHtml(initials)}</span>
                    <span class="note-author">${escapeHtml(r.full_name)}:</span>
                  </div>
                  <a href="mailto:${escapeHtml(r.email)}?subject=${encodeURIComponent('Regarding your Explore Negros visit request to ' + r.destination)}" class="note-action-reply">
                    ✉ Direct Email Reply
                  </a>
                </div>
                <blockquote class="note-quote">“${escapeHtml(r.message)}”</blockquote>
              </div>
            </td>
          </tr>
        ` : ''}
      `;
    }).join('');

    // Attach status dropdown change listeners
    tbody.querySelectorAll('.status-select').forEach(sel => {
      sel.addEventListener('change', async () => {
        const id = sel.dataset.id;
        const newStatus = sel.value;
        const prevClass = sel.className;

        sel.className = `status-select status-${newStatus} saving`;

        try {
          await window.DB.update('visit_requests', `id=eq.${id}`, { status: newStatus });

          // Update cached item
          const target = cachedRequests.find(r => String(r.id) === String(id));
          if (target) target.status = newStatus;

          updateRequestCounts();
          loadStats(); // Refresh top metric cards

          sel.className = `status-select status-${newStatus}`;
        } catch (err) {
          console.error('Failed to update status:', err);
          alert('Failed to update request status: ' + err.message);
          sel.className = prevClass;
        }
      });
    });

    // Attach note drawer toggle listeners
    tbody.querySelectorAll('.btn-note-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const noteRow = document.getElementById(`note-row-${id}`);
        if (!noteRow) return;

        const isHidden = noteRow.hasAttribute('hidden');
        if (isHidden) {
          noteRow.removeAttribute('hidden');
          btn.setAttribute('aria-expanded', 'true');
          btn.innerHTML = '<span class="note-icon">▲</span><span>Hide</span>';
          btn.classList.add('open');
        } else {
          noteRow.setAttribute('hidden', '');
          btn.setAttribute('aria-expanded', 'false');
          btn.innerHTML = '<span class="note-icon">💬</span><span>Note</span>';
          btn.classList.remove('open');
        }
      });
    });
  }
});
