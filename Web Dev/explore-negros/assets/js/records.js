/* ============================================================
   EXPLORE NEGROS — records.js
   Destination list page: search, city filter, barangay filter,
   type filter, sort, grid/list view toggle, and quick suggestions
   ============================================================ */

document.addEventListener('DOMContentLoaded', initRecordsPage);

async function initRecordsPage() {
  const listEl          = document.getElementById('dest-list');
  const searchInput     = document.getElementById('dest-search');
  const clearBtn        = document.getElementById('search-clear-btn');
  const resetBtn        = document.getElementById('filter-reset-btn');
  const sortSelect      = document.getElementById('dest-sort');
  const countEl         = document.getElementById('results-count-num');
  const cityList        = document.getElementById('city-filter-list');
  const brgyList        = document.getElementById('barangay-filter-list');
  const cityCountHint   = document.getElementById('city-count-hint');
  const brgyCountHint   = document.getElementById('brgy-count-hint');
  const activeTagsEl    = document.getElementById('active-filter-tags');
  const gridBtn         = document.getElementById('view-grid-btn');
  const listBtn         = document.getElementById('view-list-btn');

  if (!listEl) return;

  // ── State ──────────────────────────────────────────────────
  let allDestinations = [];
  let activeCity      = 'all';
  let activeBarangay  = 'all';
  let activeType      = 'all';
  let activeSearch    = '';
  let viewMode        = 'grid'; // 'grid' | 'list'

  // Type-to-keyword mapping for classification
  const TYPE_KEYWORDS = {
    waterfall: ['falls', 'waterfall', 'cascade', 'lagoon'],
    beach:     ['beach', 'island', 'sand', 'shore', 'coast', 'sea', 'bay', 'marine'],
    mountain:  ['mountain', 'volcano', 'peak', 'highland', 'spring', 'hot spring', 'guintubdan', 'campuestohan', 'mambukal'],
    heritage:  ['heritage', 'museum', 'ruins', 'ancestral', 'historic', 'church', 'balay'],
    resort:    ['resort', 'park', 'garden', 'sanctuary', 'eco-park'],
  };

  function classifyType(dest) {
    const text = (dest.name + ' ' + (dest.description || '') + ' ' + (dest.location || '')).toLowerCase();
    for (const [type, keywords] of Object.entries(TYPE_KEYWORDS)) {
      if (keywords.some(kw => text.includes(kw))) return type;
    }
    return 'other';
  }

  function extractCity(dest) {
    if (dest.location && dest.location.includes(',')) {
      const parts = dest.location.split(',');
      return parts[parts.length - 1].trim();
    }
    return dest.city || dest.location || 'Negros Occidental';
  }

  function extractBarangay(dest) {
    if (dest.barangay && dest.barangay.trim()) {
      return dest.barangay.trim();
    }
    if (dest.location && dest.location.includes(',')) {
      const parts = dest.location.split(',');
      return parts[0].trim();
    }
    return '';
  }

  // ── Load data ──────────────────────────────────────────────
  showLoading(listEl, 'Loading destinations…');

  try {
    allDestinations = await window.DB.select('destinations', 'status=eq.active&order=name.asc');
  } catch (err) {
    console.warn('Supabase fetch failed, using fallback data.', err);
    allDestinations = window.EN_DESTINATIONS || [];
  }

  if (!allDestinations || allDestinations.length === 0) {
    allDestinations = window.EN_DESTINATIONS || [];
  }

  // Enrich each destination with parsed city, barangay, and type
  allDestinations = allDestinations.map(d => ({
    ...d,
    _city:     extractCity(d),
    _barangay: extractBarangay(d),
    _type:     classifyType(d)
  }));

  // Build filters from data
  buildCityChips();
  buildBarangayChips();

  // Initial render
  renderFiltered();

  // ── Event: Search Input ────────────────────────────────────
  searchInput.addEventListener('input', () => {
    activeSearch = searchInput.value.trim().toLowerCase();
    clearBtn.hidden = activeSearch.length === 0;
    renderFiltered();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    activeSearch = '';
    clearBtn.hidden = true;
    searchInput.focus();
    renderFiltered();
  });

  // ── Event: Quick Search tags in Hero ───────────────────────
  document.querySelectorAll('.quick-search-tag').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.query;
      searchInput.value = q;
      activeSearch = q.toLowerCase();
      clearBtn.hidden = false;
      renderFiltered();
      // Scroll smoothly down to results area
      document.querySelector('.dest-results-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── Event: City chips ──────────────────────────────────────
  cityList.addEventListener('click', e => {
    const btn = e.target.closest('.filter-chip[data-city]');
    if (!btn) return;
    cityList.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    activeCity = btn.dataset.city;

    // Reset barangay to 'all' when city changes, and rebuild barangays list
    activeBarangay = 'all';
    buildBarangayChips();

    renderFiltered();
  });

  // ── Event: Barangay chips ──────────────────────────────────
  brgyList.addEventListener('click', e => {
    const btn = e.target.closest('.filter-chip[data-barangay]');
    if (!btn) return;
    brgyList.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    activeBarangay = btn.dataset.barangay;
    renderFiltered();
  });

  // ── Event: Type chips ──────────────────────────────────────
  document.getElementById('type-filter-list').addEventListener('click', e => {
    const btn = e.target.closest('.filter-chip[data-type]');
    if (!btn) return;
    document.querySelectorAll('#type-filter-list .filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    activeType = btn.dataset.type;
    renderFiltered();
  });

  // ── Event: Sort ────────────────────────────────────────────
  sortSelect.addEventListener('change', () => renderFiltered());

  // ── Event: Reset all filters ───────────────────────────────
  resetBtn.addEventListener('click', () => {
    activeCity     = 'all';
    activeBarangay = 'all';
    activeType     = 'all';
    activeSearch   = '';
    searchInput.value = '';
    clearBtn.hidden = true;
    sortSelect.value = 'name-asc';

    cityList.querySelectorAll('.filter-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
    buildBarangayChips();
    document.querySelectorAll('#type-filter-list .filter-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
    renderFiltered();
  });

  // ── Event: View toggle ─────────────────────────────────────
  gridBtn.addEventListener('click', () => setViewMode('grid'));
  listBtn.addEventListener('click', () => setViewMode('list'));

  // ── Dynamic Chip Builders ──────────────────────────────────
  function buildCityChips() {
    // Collect distinct cities and counts
    const counts = {};
    allDestinations.forEach(d => {
      const city = d._city;
      if (city) counts[city] = (counts[city] || 0) + 1;
    });

    const cities = Object.keys(counts).sort();
    if (cityCountHint) cityCountHint.textContent = `${cities.length} available`;

    // Keep 'All Cities' button
    cityList.innerHTML = `<button type="button" class="filter-chip active" data-city="all">All Cities (${allDestinations.length})</button>`;

    cities.forEach(city => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-chip';
      btn.dataset.city = city;
      btn.textContent = `${city} (${counts[city]})`;
      cityList.appendChild(btn);
    });
  }

  function buildBarangayChips() {
    // Filter destinations by current active city if not 'all'
    const pool = (activeCity === 'all')
      ? allDestinations
      : allDestinations.filter(d => d._city === activeCity);

    const counts = {};
    pool.forEach(d => {
      const b = d._barangay;
      if (b) counts[b] = (counts[b] || 0) + 1;
    });

    const barangays = Object.keys(counts).sort();
    if (brgyCountHint) {
      brgyCountHint.textContent = barangays.length > 0 ? `${barangays.length} in area` : 'None specified';
    }

    brgyList.innerHTML = `
      <button type="button" class="filter-chip ${activeBarangay === 'all' ? 'active' : ''}" data-barangay="all">
        All Barangays
      </button>
    `;

    barangays.forEach(brgy => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `filter-chip ${activeBarangay === brgy ? 'active' : ''}`;
      btn.dataset.barangay = brgy;
      btn.textContent = `${brgy} (${counts[brgy]})`;
      brgyList.appendChild(btn);
    });
  }

  // ── Filtering, Sorting & Rendering ─────────────────────────
  function renderFiltered() {
    let results = allDestinations.slice();

    // 1. City Filter
    if (activeCity !== 'all') {
      results = results.filter(d => d._city === activeCity);
    }

    // 2. Barangay Filter
    if (activeBarangay !== 'all') {
      results = results.filter(d => d._barangay === activeBarangay);
    }

    // 3. Type Filter
    if (activeType !== 'all') {
      results = results.filter(d => d._type === activeType);
    }

    // 4. Keyword / Text Search
    if (activeSearch) {
      results = results.filter(d => {
        const text = [
          d.name,
          d.description,
          d.location,
          d._city,
          d._barangay,
          ...(d.activities || []),
          ...(d.facilities || [])
        ].join(' ').toLowerCase();
        return text.includes(activeSearch);
      });
    }

    // 5. Sorting
    const sortVal = sortSelect.value;
    results.sort((a, b) => {
      if (sortVal === 'name-asc')  return a.name.localeCompare(b.name);
      if (sortVal === 'name-desc') return b.name.localeCompare(a.name);
      const feeA = parseFee(a.entrance_fee);
      const feeB = parseFee(b.entrance_fee);
      return sortVal === 'fee-asc' ? feeA - feeB : feeB - feeA;
    });

    // Update Counter
    if (countEl) countEl.textContent = results.length;

    // Update Active Filter Pills Bar
    updateActiveTags();

    // Render Cards or Empty State
    if (results.length === 0) {
      listEl.innerHTML = `
        <div class="dest-empty-state">
          <div class="dest-empty-icon">🔍</div>
          <h3>No matching destinations found</h3>
          <p>We couldn't find any spots matching your current search or filters. Try choosing a different city or clearing some filters.</p>
          <button type="button" class="btn btn-primary btn-sm" id="empty-reset-btn" style="margin-top:1.25rem;">Reset All Filters</button>
        </div>`;
      const emptyReset = document.getElementById('empty-reset-btn');
      if (emptyReset) emptyReset.addEventListener('click', () => resetBtn.click());
    } else {
      listEl.innerHTML = results.map((d, i) =>
        viewMode === 'grid' ? renderGridCard(d, i) : renderListCard(d, i)
      ).join('');
    }

    listEl.setAttribute('aria-busy', 'false');
  }

  // ── Card Renderers ─────────────────────────────────────────
  function renderGridCard(d, idx) {
    const typeLabel = getTypeLabel(d._type);
    const locationDisplay = d._barangay && d._city
      ? `${d._barangay}, ${d._city}`
      : (d.location || 'Negros Occidental');

    const activityTags = (d.activities || []).slice(0, 3).map(act =>
      `<span class="card-activity-tag">${escapeHtml(act)}</span>`
    ).join('');

    return `
      <article class="dest-card" style="--card-index:${idx};" data-type="${escapeHtml(d._type)}">
        <div class="dest-card-img">
          <img src="${escapeHtml(d.image_url || '')}" alt="Photo of ${escapeHtml(d.name)}" loading="lazy">
          <div class="dest-card-overlay"></div>
          ${d.entrance_fee ? `<span class="dest-card-fee">${escapeHtml(d.entrance_fee)}</span>` : ''}
          <span class="dest-type-badge">${typeLabel}</span>
        </div>
        <div class="dest-card-body">
          <div class="dest-card-meta">
            <span class="dest-card-location" title="${escapeHtml(locationDisplay)}">
              📍 <strong>${escapeHtml(d._city || '')}</strong>
              ${d._barangay ? `<span class="dest-sub-brgy">• ${escapeHtml(d._barangay)}</span>` : ''}
            </span>
            ${d.visiting_hours ? `<span class="dest-card-hours">⏰ ${escapeHtml(d.visiting_hours)}</span>` : ''}
          </div>
          <h3 class="dest-card-title">${escapeHtml(d.name)}</h3>
          <p class="dest-card-desc">${escapeHtml(d.description)}</p>
          ${activityTags ? `<div class="card-activity-list">${activityTags}</div>` : ''}
          <div class="dest-card-footer">
            <a href="details.html?id=${encodeURIComponent(d.slug)}" class="dest-card-link">
              <span>View Details</span>
              <span class="dest-arrow-icon" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>`;
  }

  function renderListCard(d, idx) {
    const typeLabel = getTypeLabel(d._type);
    const locationDisplay = d._barangay && d._city
      ? `${d._barangay}, ${d._city}`
      : (d.location || 'Negros Occidental');

    const activityTags = (d.activities || []).slice(0, 4).map(act =>
      `<span class="card-activity-tag">${escapeHtml(act)}</span>`
    ).join('');

    return `
      <article class="dest-list-card" style="--card-index:${idx};" data-type="${escapeHtml(d._type)}">
        <div class="dest-list-card-img">
          <img src="${escapeHtml(d.image_url || '')}" alt="Photo of ${escapeHtml(d.name)}" loading="lazy">
          <span class="dest-type-badge">${typeLabel}</span>
        </div>
        <div class="dest-list-card-body">
          <div class="dest-card-meta">
            <span class="dest-card-location">
              📍 <strong>${escapeHtml(d._city || '')}</strong>
              ${d._barangay ? `<span class="dest-sub-brgy">• ${escapeHtml(d._barangay)}</span>` : ''}
            </span>
            ${d.visiting_hours ? `<span class="dest-card-hours">⏰ ${escapeHtml(d.visiting_hours)}</span>` : ''}
            ${d.entrance_fee ? `<span class="dest-card-fee-inline">🎟️ ${escapeHtml(d.entrance_fee)}</span>` : ''}
          </div>
          <h3 class="dest-card-title">${escapeHtml(d.name)}</h3>
          <p class="dest-card-desc">${escapeHtml(d.description)}</p>
          ${activityTags ? `<div class="card-activity-list" style="margin-bottom:1rem;">${activityTags}</div>` : ''}
          <div class="dest-card-footer" style="padding-top:0.75rem; border-top:1px solid rgba(0,0,0,0.06);">
            <a href="details.html?id=${encodeURIComponent(d.slug)}" class="dest-card-link">
              <span>View Details</span>
              <span class="dest-arrow-icon" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>`;
  }

  // ── Active Filter Tags Bar ─────────────────────────────────
  function updateActiveTags() {
    const tags = [];

    if (activeCity !== 'all') {
      tags.push({
        label: `City: ${activeCity}`,
        clear: () => {
          activeCity = 'all';
          cityList.querySelectorAll('.filter-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
          buildBarangayChips();
        }
      });
    }

    if (activeBarangay !== 'all') {
      tags.push({
        label: `Barangay: ${activeBarangay}`,
        clear: () => {
          activeBarangay = 'all';
          brgyList.querySelectorAll('.filter-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
        }
      });
    }

    if (activeType !== 'all') {
      tags.push({
        label: `Type: ${getTypeLabel(activeType)}`,
        clear: () => {
          activeType = 'all';
          document.querySelectorAll('#type-filter-list .filter-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
        }
      });
    }

    if (activeSearch) {
      tags.push({
        label: `Search: "${activeSearch}"`,
        clear: () => {
          activeSearch = '';
          searchInput.value = '';
          clearBtn.hidden = true;
        }
      });
    }

    if (tags.length === 0) {
      activeTagsEl.hidden = true;
      activeTagsEl.innerHTML = '';
    } else {
      activeTagsEl.hidden = false;
      activeTagsEl.innerHTML = `
        <span class="active-tags-label">Active Filters:</span>
        ${tags.map((t, i) => `<button type="button" class="active-tag-pill" data-tag-idx="${i}" title="Remove filter">${escapeHtml(t.label)} ✕</button>`).join('')}
        <button type="button" class="active-tag-clear-all" id="clear-all-tags-btn">Clear all</button>
      `;

      activeTagsEl.querySelectorAll('.active-tag-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          tags[Number(btn.dataset.tagIdx)].clear();
          renderFiltered();
        });
      });

      const clearAllBtn = document.getElementById('clear-all-tags-btn');
      if (clearAllBtn) clearAllBtn.addEventListener('click', () => resetBtn.click());
    }
  }

  // ── Helpers ────────────────────────────────────────────────
  function setViewMode(mode) {
    viewMode = mode;
    listEl.classList.toggle('dest-cards-grid', mode === 'grid');
    listEl.classList.toggle('dest-cards-list', mode === 'list');
    gridBtn.classList.toggle('active', mode === 'grid');
    listBtn.classList.toggle('active', mode === 'list');
    renderFiltered();
  }

  function parseFee(feeStr) {
    if (!feeStr) return 0;
    const match = String(feeStr).replace(/,/g, '').match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  function getTypeLabel(type) {
    const labels = {
      waterfall: '💧 Waterfall',
      beach:     '🏖️ Beach & Island',
      mountain:  '⛰️ Mountain',
      heritage:  '🏛️ Heritage',
      resort:    '🌄 Resort',
      other:     '📍 Destination',
    };
    return labels[type] || '📍 Destination';
  }
}
