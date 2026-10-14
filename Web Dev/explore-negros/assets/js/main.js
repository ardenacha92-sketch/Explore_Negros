/* ============================================================
   EXPLORE NEGROS — main.js
   Shared utilities, navigation, and fallback data
   ============================================================ */

/* ── Fallback Destination Data ─────────────────────────────────
   Used when Supabase is not yet configured. Mirrors the DB schema.
   ──────────────────────────────────────────────────────────── */
window.EN_DESTINATIONS = [
  {
    id: '1',
    name: 'Mag-aso Falls',
    slug: 'mag-aso-falls',
    location: 'Brgy. Oringao, Kabankalan City',
    barangay: 'Brgy. Oringao',
    description: 'A stunning multi-tiered waterfall hidden in the mountains of southern Negros Occidental, known for its crystal-clear pools and lush jungle surroundings.',
    long_description: 'Mag-aso Falls is one of the most spectacular natural wonders of Negros Occidental. Located in the mountains of Kabankalan City, this multi-tiered waterfall cascades through lush tropical rainforest into a series of crystal-clear pools perfect for swimming. The journey to the falls takes visitors through scenic countryside and forested trails, making it a favourite destination for nature lovers and adventure seekers alike. Local guides are available at the entrance to lead visitors safely through the trail.',
    activities: ['Swimming', 'Hiking', 'Photography', 'Picnicking', 'Nature Trekking'],
    facilities: ['Changing Rooms', 'Picnic Area', 'Food Stalls', 'Parking Area', 'Restrooms'],
    visiting_hours: '8:00 AM – 5:00 PM',
    entrance_fee: '₱50 per person',
    image_url: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format&fit=crop&q=80'
    ],
    status: 'active'
  },
  {
    id: '2',
    name: 'Mambukal Mountain Resort',
    slug: 'mambukal-resort',
    location: 'Brgy. Minoyan, Murcia',
    barangay: 'Brgy. Minoyan',
    description: 'A government-managed mountain resort famous for seven waterfalls, hot spring pools, a butterfly sanctuary, and exciting adventure activities.',
    long_description: 'Mambukal Mountain Resort is a premier eco-tourism destination managed by the Provincial Government of Negros Occidental. Nestled at the foot of Mount Kanlaon, the active volcano that dominates the island, the resort features seven waterfalls, naturally heated hot spring pools, a butterfly garden, zip lines, and extensive hiking trails leading to stunning viewpoints. It is a perfect retreat for families, nature enthusiasts, and adventure seekers looking for a refreshing mountain getaway.',
    activities: ['Hot Spring Bathing', 'Trekking', 'Butterfly Watching', 'Swimming', 'Zip Line', 'Camping'],
    facilities: ['Hot Spring Pools', 'Cottages & Rooms', 'Restaurant', 'Butterfly Garden', 'Parking', 'Playground'],
    visiting_hours: '8:00 AM – 6:00 PM',
    entrance_fee: '₱100 per person',
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511497584788-87676104235f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&auto=format&fit=crop&q=80'
    ],
    status: 'active'
  },
  {
    id: '3',
    name: 'Lakawon Island',
    slug: 'lakawon-island',
    location: 'Brgy. Cadiz Viejo, Cadiz City',
    barangay: 'Brgy. Cadiz Viejo',
    description: 'A tropical island paradise with white sandy beaches, crystal-clear turquoise waters, and the Philippines\' largest floating waterpark — Aqua Fun.',
    long_description: 'Lakawon Island is Negros Occidental\'s premier beach and island destination, located off the coast of Cadiz City in the northern part of the province. The island features pristine white sand beaches, calm turquoise waters ideal for swimming and snorkeling, and the iconic Aqua Fun floating waterpark — widely regarded as the largest floating waterpark in the Philippines. The island is easily accessible by boat from the Cadiz City port and welcomes both day-trippers and overnight guests in its beachfront accommodations.',
    activities: ['Swimming', 'Snorkeling', 'Island Hopping', 'Beach Volleyball', 'Kayaking', 'Floating Waterpark'],
    facilities: ['Floating Waterpark', 'Beach Cottages', 'Restaurant & Bar', 'Water Sports Equipment', 'Parking', 'Restrooms'],
    visiting_hours: '8:00 AM – 5:00 PM',
    entrance_fee: '₱150 per person',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80'
    ],
    status: 'active'
  },
  {
    id: '4',
    name: 'The Ruins',
    slug: 'the-ruins',
    location: 'Brgy. Zone 15, Talisay City',
    barangay: 'Brgy. Zone 15',
    description: 'Known as the "Taj Mahal of Negros", this iconic ancestral Italianate mansion was built in the early 1900s amidst sugar plantations.',
    long_description: 'The Ruins in Talisay City is one of the most iconic historical landmarks in the Philippines. Known as the Taj Mahal of Negros, the mansion was built in the early 1900s by sugar baron Don Mariano Ledesma Lacson for his Portuguese wife, Maria Braga. Although burned down during World War II to prevent Japanese forces from using it as headquarters, the four-tiered neoclassical shell remains standing amidst manicured gardens and fountain courtyards.',
    activities: ['Heritage Tour', 'Photography', 'Dining', 'Sunset Watching', 'Souvenir Shopping'],
    facilities: ['Cafe & Restaurant', 'Gift Shop', 'Restrooms', 'Parking', 'Event Grounds'],
    visiting_hours: '8:00 AM – 8:00 PM',
    entrance_fee: '₱150 per person',
    image_url: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582650625119-3a31f8418365?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80'
    ],
    status: 'active'
  },
  {
    id: '5',
    name: 'Campuestohan Highland Resort',
    slug: 'campuestohan-highland-resort',
    location: 'Brgy. Cabatangan, Talisay City',
    barangay: 'Brgy. Cabatangan',
    description: 'A cool mountain adventure wonderland on the slopes of Mt. Mandalagan with wave pools, rope courses, and panoramic vistas.',
    long_description: 'Nestled on the misty slopes between Talisay City and Bacolod, Campuestohan Highland Resort offers year-round cool mountain breezes and family-friendly recreation. It features giant superhero statues, themed Indian teepees, King Kong replicas, zip lines, sky biking, rope courses, and a wave pool with sweeping views of Negros Occidental.',
    activities: ['Wave Pool Swimming', 'Zip Line', 'Sky Bicycle', 'Rope Course', 'Horseback Riding'],
    facilities: ['Swimming Pools', 'Log Cabins & Teepees', 'Restaurant', 'Children Playground', 'Souvenir Stalls'],
    visiting_hours: '7:00 AM – 6:00 PM',
    entrance_fee: '₱200 per person',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=1200&auto=format&fit=crop&q=80'
    ],
    status: 'active'
  },
  {
    id: '6',
    name: 'Balay Negrense',
    slug: 'balay-negrense',
    location: 'Brgy. III, Silay City',
    barangay: 'Brgy. III',
    description: 'A magnificent 19th-century sugar baron lifestyle museum in the heart of Silay City, the "Paris of Negros".',
    long_description: 'Balay Negrense (Victor Fernandez Gaston Ancestral House) is a prominent lifestyle museum representing the 19th-century golden age of the Negros sugar industry. Located in the heritage-rich Silay City, the mansion features wide capiz-shell sliding windows, antique wooden furniture, ironwork chandeliers, and heirloom artifacts from the Spanish colonial period.',
    activities: ['Historical Museum Tour', 'Cultural Walking Tour', 'Photography', 'Heritage Sightseeing'],
    facilities: ['Guided Tours', 'Souvenir Shop', 'Restrooms', 'Garden Courtyard'],
    visiting_hours: '9:00 AM – 5:00 PM',
    entrance_fee: '₱80 per person',
    image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582650625119-3a31f8418365?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524813686514-a57563d77d61?w=1200&auto=format&fit=crop&q=80'
    ],
    status: 'active'
  },
  {
    id: '7',
    name: 'Danjugan Island Sanctuary',
    slug: 'danjugan-island',
    location: 'Brgy. Bulata, Cauayan',
    barangay: 'Brgy. Bulata',
    description: 'A 43-hectare pristine island marine sanctuary with five lagoons, bat caves, limestone forests, and thriving coral reefs.',
    long_description: 'Danjugan Island is an award-winning eco-tourism paradise and wildlife sanctuary managed by the Philippine Reef and Rainforest Conservation Foundation. It hosts five distinct lagoons, ancient bat caves, nesting grounds for white-bellied sea eagles, and coral reefs that rank among the most biodiverse in the Coral Triangle.',
    activities: ['Snorkeling', 'Kayaking', 'Scuba Diving', 'Bird Watching', 'Trekking', 'Marine Education'],
    facilities: ['Eco-Cabanas', 'Solar-Powered Dining Hall', 'Dive Equipment', 'Nature Trails'],
    visiting_hours: 'Prior Booking Required',
    entrance_fee: '₱950 (Day Tour with Boat)',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format&fit=crop&q=80'
    ],
    status: 'active'
  },
  {
    id: '8',
    name: 'Guintubdan Mountain Resort',
    slug: 'guintubdan-mountain-resort',
    location: 'Brgy. Ara-al, La Carlota City',
    barangay: 'Brgy. Ara-al',
    description: 'An eco-adventure haven at the foothills of Mt. Kanlaon with cold cascading waterfalls, natural springs, and mountain trails.',
    long_description: 'Guintubdan Pavilion and Mountain Resort sits at the foot of Mount Kanlaon in La Carlota City. Known for its chilly climate and natural spring water, it serves as the gateway to multiple cascading waterfalls, lush fern forests, and scenic Mt. Kanlaon trekking trails.',
    activities: ['Waterfall Trekking', 'Cold Spring Swimming', 'Camping', 'Mountain Biking', 'Bird Watching'],
    facilities: ['Camping Grounds', 'Cottages', 'Restrooms', 'Picnic Huts', 'Viewing Decks'],
    visiting_hours: '6:00 AM – 5:00 PM',
    entrance_fee: '₱50 per person',
    image_url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511497584788-87676104235f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80'
    ],
    status: 'active'
  },
  {
    id: '9',
    name: 'Suyac Island Mangrove Eco-Park',
    slug: 'suyac-island-mangrove',
    location: 'Brgy. Taba-ao, Sagay City',
    barangay: 'Brgy. Taba-ao',
    description: 'An ancient mangrove sanctuary inside Sagay Marine Reserve with bamboo boardwalks over crystal-clear sea waters.',
    long_description: 'Suyac Island Mangrove Eco-Park is an exemplary community-based eco-tourism sanctuary within the Sagay Marine Reserve. Visitors walk along extensive elevated bamboo boardwalks that weave through centuries-old mangroves. The island is surrounded by turquoise waters teeming with marine life.',
    activities: ['Mangrove Boardwalk Tour', 'Swimming', 'Paddleboarding', 'Bird Watching', 'Local Seafood Dining'],
    facilities: ['Bamboo Boardwalks', 'Eco Cottages', 'Floating Sheds', 'Community Kitchen'],
    visiting_hours: '7:00 AM – 5:00 PM',
    entrance_fee: '₱100 per person',
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80'
    ],
    status: 'active'
  }
];

/* ── Navigation ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', initNav);

function initNav() {
  // Highlight the active navigation link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Mobile hamburger toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.innerHTML = svgMenu();

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen ? svgClose() : svgMenu();
  });

  // Close nav when clicking outside or pressing Escape
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) closeNav();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });

  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = svgMenu();
  }
}

/* ── Shared Utility Functions ──────────────────────────────── */

/** Return URL query parameter value or null */
function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

/** Escape text for safe HTML insertion */
function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = String(str ?? '');
  return d.innerHTML;
}

/** Format a date string for Filipino locale */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('en-PH', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  } catch { return dateStr; }
}

/** Show a loading spinner inside an element */
function showLoading(el, msg = 'Loading…') {
  el.innerHTML = `<div class="loading"><div class="spinner"></div><span>${escapeHtml(msg)}</span></div>`;
}

/** Show an empty-state message inside an element */
function showEmpty(el, title = 'Nothing found', detail = '') {
  el.innerHTML = `
    <div class="empty-state">
      <strong>${escapeHtml(title)}</strong>
      ${detail ? `<p>${escapeHtml(detail)}</p>` : ''}
    </div>`;
}

/** Render a destination card for the grid layout */
function renderDestCard(dest, idx = 0) {
  return `
    <article class="dest-card" style="--card-index: ${idx};">
      <div class="dest-card-img">
        <img src="${escapeHtml(dest.image_url)}"
             alt="Photo of ${escapeHtml(dest.name)}"
             loading="lazy">
        <div class="dest-card-overlay"></div>
        ${dest.entrance_fee ? `<span class="dest-card-fee">${escapeHtml(dest.entrance_fee)}</span>` : ''}
      </div>
      <div class="dest-card-body">
        <div class="dest-card-meta">
          <span class="dest-card-location">📍 ${escapeHtml(dest.location)}</span>
          ${dest.visiting_hours ? `<span class="dest-card-hours">⏰ ${escapeHtml(dest.visiting_hours)}</span>` : ''}
        </div>
        <h3 class="dest-card-title">${escapeHtml(dest.name)}</h3>
        <p class="dest-card-desc">${escapeHtml(dest.description)}</p>
        <div class="dest-card-footer">
          <a href="details.html?id=${encodeURIComponent(dest.slug)}"
             class="dest-card-link">
            <span>View Details</span>
            <span class="dest-arrow-icon" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>`;
}

/* ── SVG Icons ─────────────────────────────────────────────── */
function svgMenu() {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>`;
}
function svgClose() {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`;
}
