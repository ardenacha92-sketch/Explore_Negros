/* ============================================================
   EXPLORE NEGROS — details.js
   Interactive Destination Detail Page with Multi-Photo Gallery,
   Tabbed Context, Interactive Cost Calculator, Wishlist & FAQs
   ============================================================ */

document.addEventListener('DOMContentLoaded', loadDestinationDetail);

// Detailed travel guide, commute directions, packing checklist & FAQs per destination
const DEST_CONTEXTS = {
  'mag-aso-falls': {
    bestTime: 'November to May (Dry Season) • Best between 8:00 AM – 11:30 AM',
    travelTime: '2 hours from Bacolod City via South Road',
    difficulty: 'Moderate Walk (approx. 80 concrete steps down into gorge)',
    estBudget: '₱50 entrance fee + ₱300 cottage rental',
    guideFee: 300,
    cottageFee: 400,
    ecoFee: 20,
    commute: [
      'From Bacolod South Terminal, board a Ceres Bus bound for Kabankalan City (~2 hrs, ₱140–₱160).',
      'From Kabankalan City Public Market or bus stop, hire a tricycle or habal-habal motorcycle to Brgy. Oringao (~25 mins, ₱100–₱150 per ride).',
      'If driving private vehicle, head south along the Bacolod-South Road. Follow directional signages in Kabankalan towards Brgy. Oringao. Secure parking is available at the entrance.'
    ],
    packing: [
      'Aqua shoes or sandals with strong rubber grip for wet rocks',
      'Waterproof dry bag for smartphones, cameras, and wallet',
      'Cash in small peso denominations (no ATMs in the mountain barangay)',
      'Quick-dry microfibre towel and extra set of dry clothes',
      'Refillable water container (drinking water available at entrance canteen)'
    ],
    photoCaptions: [
      'Cascading turquoise falls into the natural canyon pool',
      'Lush tropical rainforest trail leading down the valley',
      'Deep emerald swimming pool beneath the mountain cliffs',
      'Surrounding ancient trees and moss-covered boulder formations'
    ],
    faqs: [
      {
        q: 'Is swimming allowed at Mag-aso Falls?',
        a: 'Yes! Swimming in the crystal-clear mountain pool is the main highlight. Life vests are available for rent, and swimming near the deepest cascade is monitored by local barangay lifeguards.'
      },
      {
        q: 'Can we bring our own food and drinks?',
        a: 'Yes, you may bring packed food and refreshments. Picnic cottages are available for rent, and small local sari-sari stalls sell fresh coconuts, mineral water, and snacks.'
      },
      {
        q: 'How strenuous is the walk down to the falls?',
        a: 'There is a well-built concrete stairway with handrails of approximately 80 steps. The descent is easy, while the climb back up requires moderate cardiovascular effort.'
      },
      {
        q: 'Are mobile signals available at the falls?',
        a: 'Mobile signal is intermittent due to the deep mountain gorge location. We advise downloading maps and coordinating transport before entering the valley.'
      }
    ]
  },

  'mambukal-resort': {
    bestTime: 'Year-round • Morning 8:00 AM for waterfall trekking, late afternoon for hot springs',
    travelTime: '45 minutes from Bacolod City via Murcia Road',
    difficulty: 'Easy to Moderate (Paved resort paths + nature hiking trails)',
    estBudget: '₱100 entrance fee + ₱100 hot spring bath',
    guideFee: 400,
    cottageFee: 600,
    ecoFee: 30,
    commute: [
      'From Bacolod City (Libertad Market or North Terminal), board a direct Murcia/Mambukal mini-bus or jeepney (~45 mins, ₱45–₱55).',
      'The jeepney drops passengers right at the main entrance gate of Mambukal Resort.',
      'Private cars and vans can take the Murcia-Bacolod Road directly. Free and guarded parking spaces are available on-site.'
    ],
    packing: [
      'Swimwear suitable for warm mineral sulfur hot spring pools',
      'Sturdy hiking sneakers or trail shoes for the 7 waterfalls trek',
      'Eco-friendly insect repellent for forest and botanical trails',
      'Camera or binoculars for viewing the thousands of flying foxes (fruit bats)',
      'Light jacket or cardigan for cool mountain breezes in the evening'
    ],
    photoCaptions: [
      'Naturally heated sulfuric hot spring pools at Mambukal',
      'Forest trail crossing mountain streams to the cascading falls',
      'Lush tropical canopy and sanctuary for thousands of fruit bats',
      'Boating lagoon and eco-resort grounds nestled near Mt. Kanlaon'
    ],
    faqs: [
      {
        q: 'How many waterfalls can visitors see?',
        a: 'There are seven waterfalls in total. Waterfalls 1 through 6 are accessible via scenic, shaded trails with an accredited guide. The 7th waterfall is a higher adventure trek.'
      },
      {
        q: 'What health benefits do the hot springs offer?',
        a: 'The naturally heated mineral springs originate from Mt. Kanlaon volcano. Rich in natural sulfur, the waters help soothe muscle tension, stimulate circulation, and nourish the skin.'
      },
      {
        q: 'Are there overnight accommodations available?',
        a: 'Yes, Mambukal Resort offers tourist lodges, family villas, LGU cottages, and designated scenic camping grounds with tent rentals.'
      }
    ]
  },

  'lakawon-island': {
    bestTime: 'March to June (Summer sunny months) • Early boat crossing at 8:00 AM',
    travelTime: '1.5 hours north from Bacolod + 15-minute boat ride',
    difficulty: 'Very Easy / Relaxed Beach Resort',
    estBudget: '₱150 island entrance + ₱350 roundtrip boat transfer',
    guideFee: 0,
    cottageFee: 600,
    ecoFee: 30,
    commute: [
      'From Bacolod North Bus Terminal, board a Ceres Bus bound for Cadiz City or Victorias (~1 hr 20 mins, ₱110–₱130).',
      'Ask the conductor to drop you off at Martisan Crossing (Cadiz Viejo).',
      'Ride a tricycle from the crossing to Cadiz Viejo Port (5 mins, ₱20–₱30).',
      'Board the official Lakawon motorized passenger boat from port directly to the island beach (15 mins).'
    ],
    packing: [
      'Reef-safe sunscreen and UV protective sunglasses',
      'Beach swimwear, rashguard, and sunhat',
      'Waterproof phone case or action camera for waterpark fun',
      'Cash for meals, drinks, and TawHai floating bar passes',
      'Snorkeling goggles to view shoreline marine life'
    ],
    photoCaptions: [
      'Pristine white sand shoreline and crystal turquoise waters',
      'The iconic TawHai Floating Bar anchored off the coast',
      'Beachfront coconut palms and relaxing lounge sunbeds',
      'Spectacular sunset over the Guimaras Strait and Visayan Sea'
    ],
    faqs: [
      {
        q: 'What is the TawHai Floating Bar?',
        a: 'TawHai is Asia’s largest floating bar, anchored right off Lakawon beach. It features comfortable daybeds, live DJ music, craft cocktails, and diving boards into the open sea.'
      },
      {
        q: 'What time is the last boat back to the mainland?',
        a: 'Day tour boats depart the island for Cadiz port until 5:00 PM. Overnight guests can take scheduled morning or afternoon boats.'
      },
      {
        q: 'Can we bring outside food to the island?',
        a: 'A corkage fee applies to outside food and commercial beverages. The island has a full-service beachfront restaurant and cafe serving fresh seafood and Filipino dishes.'
      }
    ]
  },

  'the-ruins': {
    bestTime: '4:00 PM – 7:30 PM (Catch sunset golden hour and night chandelier illumination)',
    travelTime: '15 to 20 minutes from Bacolod City Center (Lacson St.)',
    difficulty: 'Easy / Paved Heritage Garden Walk',
    estBudget: '₱150 adult entrance fee (₱100 for students/seniors)',
    guideFee: 250,
    cottageFee: 0,
    ecoFee: 0,
    commute: [
      'From central Bacolod (Lacson Street or Capitol Park), take a taxi or Grab car directly to The Ruins (~15 mins, ₱120–₱180).',
      'Alternatively, board a Bata-bound or Talisay-bound jeepney from Lacson St. Alight at Bangga Rose Lawns, then take a tricycle directly to The Ruins gate (₱30–₱50).',
      'Ample paved parking is available on-site for cars, vans, and tour buses.'
    ],
    packing: [
      'Camera or smartphone with night mode for stunning architectural lighting',
      'Light casual or smart-casual clothing for portrait photography',
      'Appetite for the famous sugarcane juice and pasta at the courtyard cafe',
      'Valid student or senior citizen ID for discounted entry'
    ],
    photoCaptions: [
      'The iconic Italianate mansion shell illuminated in the golden hour',
      'Courtyard fountains surrounded by landscaped tropical gardens',
      'Intricate neoclassical archways and shell-adorned columns',
      'The Ruins glowing beautifully under evening architectural lighting'
    ],
    faqs: [
      {
        q: 'Why is it called the Taj Mahal of Negros?',
        a: 'Sugar baron Don Mariano Ledesma Lacson built the magnificent mansion in the early 1900s in memory of his beloved Portuguese wife, Maria Braga. Like India’s Taj Mahal, it stands as an enduring monument to eternal love.'
      },
      {
        q: 'Is there a guided tour available?',
        a: 'Yes! Resident tour guides conduct engaging, humorous, and historically rich tours at regular intervals throughout the afternoon at no extra charge.'
      },
      {
        q: 'Can we dine inside the grounds?',
        a: 'Yes, the Gazebo Restaurant inside the grounds serves delicious Italian-Mediterranean dishes, fresh sugarcane calamansi coolers, and local coffee.'
      }
    ]
  },

  'campuestohan-highland-resort': {
    bestTime: 'Year-round • Morning 7:00 AM – 2:00 PM before cool afternoon mountain mist rolls in',
    travelTime: '45 minutes from Bacolod City up Mt. Mandalagan slopes',
    difficulty: 'Easy / Family Adventure Theme Park',
    estBudget: '₱200 entrance fee (access to swimming pool and grounds)',
    guideFee: 0,
    cottageFee: 500,
    ecoFee: 20,
    commute: [
      'Official Campuestohan shuttle vans depart regularly from Bacolod City (Burgos Market / Bangga Pat-pat) for ₱100/way.',
      'Taxis and Grab cars from Bacolod can be hired for roundtrip service (coordinate pickup time with driver).',
      'Private vehicles can take the scenic paved road via Alangilan towards Sitio Campuestohan.'
    ],
    packing: [
      'Swimwear for the massive highland wave pool and water slides',
      'Light jacket, sweater, or hoodie for chilly mountain breezes',
      'Walking shoes / sneakers for exploring the 5-hectare adventure park',
      'Socks (required for children’s indoor play areas)'
    ],
    photoCaptions: [
      'Highland mountain vista overlooking the whimsical adventure wonderland',
      'Huge wave pool and children water play park in the mountains',
      'Unique Indian teepee village and pine log cabins for overnight stays',
      'Adrenaline zip lines and sky bicycle high above the valleys'
    ],
    faqs: [
      {
        q: 'What activities are available inside the resort?',
        a: 'The resort offers wave pool swimming, a 340-meter zip line, sky bicycle, rope obstacle courses, horseback riding, superhero statues, and life-size King Kong replicas.'
      },
      {
        q: 'Can we stay overnight at Campuestohan?',
        a: 'Yes, unique overnight rooms are available, including themed Native American Indian Teepees, log cabins, and King Kong suites.'
      }
    ]
  },

  'balay-negrense': {
    bestTime: '9:00 AM – 4:00 PM (Tuesday to Sunday)',
    travelTime: '25 to 30 minutes north of Bacolod City in Silay City',
    difficulty: 'Easy / Indoor Museum & Walking Tour',
    estBudget: '₱80 adult entrance fee (₱40 students/children)',
    guideFee: 150,
    cottageFee: 0,
    ecoFee: 0,
    commute: [
      'From Bacolod (North Terminal or along Lacson St), board any Silay-bound or Victorias-bound jeepney or Ceres bus (~25 mins, ₱25–₱35).',
      'Ask to alight at Silay City Plaza or San Diego Pro-Cathedral.',
      'Walk 3 blocks east along Cinco de Noviembre Street to reach Balay Negrense.'
    ],
    packing: [
      'Comfortable walking shoes for exploring the Silay Heritage Zone',
      'Camera (indoor flash is prohibited to protect vintage wood and antique relics)',
      'Local food budget to try Silay’s famous Lumpiang Ubod and heirloom pastries'
    ],
    photoCaptions: [
      'The grand 19th-century Bahay na Bato ancestral mansion exterior',
      'Original Narra hardwood staircase and antique chandelier ballroom',
      'Spanish-colonial capiz-shell sliding windows and heritage parlor',
      'Silay heritage streetscape known as the Paris of Negros'
    ],
    faqs: [
      {
        q: 'What is the history behind Balay Negrense?',
        a: 'Built in 1897 by sugar baron Don Victor Gaston, the 2-storey, 12-bedroom mansion showcases how the aristocratic sugar planters lived during the 19th-century Golden Age of Negros.'
      },
      {
        q: 'Are guided tours available in the museum?',
        a: 'Yes, knowledgeable Silay tourism curators provide informative tours explaining the vintage appliances, clothing, and lifestyle of the Spanish era.'
      }
    ]
  },

  'danjugan-island': {
    bestTime: 'February to June (Calmest seas & optimal visibility for snorkeling)',
    travelTime: '3.5 to 4 hours south of Bacolod City via Cauayan',
    difficulty: 'Moderate Eco-Trek & Marine Adventure',
    estBudget: '₱950 day tour package (includes boat transfer & environmental fees)',
    guideFee: 400,
    cottageFee: 0,
    ecoFee: 50,
    commute: [
      'From Bacolod South Terminal, ride a Ceres Bus bound for Hinoba-an or Sipalay (~3.5 hrs, ₱220–₱260).',
      'Alight at Crossing Bulata, Cauayan, Negros Occidental.',
      'Head to the PRRCFI Danjugan staging port at Bulata beach where the conservation boat will transport registered visitors to the island (25 mins).'
    ],
    packing: [
      'Reef-safe biodegradable sunscreen (standard chemical sunscreens are strictly prohibited)',
      'Snorkel mask, snorkel pipe, and aqua reef booties',
      'Refillable water tumbler (single-use plastic bottles are banned on the island)',
      'Headlamp or flashlight for exploring limestone bat caves'
    ],
    photoCaptions: [
      'Aerial panorama of the 5 pristine marine lagoons and coral reef sanctuary',
      'Snorkeling over thriving, biodiverse coral gardens and sea turtles',
      'Kayaking along the mirror-smooth waters of the inner limestone lagoon',
      'Lush canopy trails where white-bellied sea eagles nest freely'
    ],
    faqs: [
      {
        q: 'Why is prior booking mandatory for Danjugan Island?',
        a: 'Danjugan is an accredited wildlife sanctuary and non-profit conservation reserve. To protect its five lagoons, bat caves, and coral reefs, a strict daily carrying capacity is enforced.'
      },
      {
        q: 'Are there motorized vehicles or electricity on the island?',
        a: 'No. Danjugan is completely off-grid, powered by clean solar energy. There are no motor vehicles, providing visitors with total peace and immersion in nature.'
      }
    ]
  },

  'guintubdan-mountain-resort': {
    bestTime: 'October to May • Early morning 7:00 AM for cool mountain trekking',
    travelTime: '1 hour 20 minutes from Bacolod City via La Carlota',
    difficulty: 'Moderate Trail Walk & Natural Spring Trekking',
    estBudget: '₱50 entrance fee + ₱300 guide for 4 waterfalls',
    guideFee: 350,
    cottageFee: 400,
    ecoFee: 20,
    commute: [
      'From Bacolod South Terminal, board a Ceres Bus to La Carlota City (~50 mins, ₱65–₱80).',
      'From La Carlota public terminal, hire a jeepney or habal-habal motorcycle to Brgy. Ara-al (~40 mins, ₱60–₱100).',
      'Private vehicles can drive via the scenic western slopes of Mt. Kanlaon.'
    ],
    packing: [
      'Sturdy trekking sandals or trail shoes with reliable wet grip',
      'Warm fleece or hoodie for the chilly mountain climate',
      'Waterproof action camera for mountain waterfall cascades',
      'Camping tent and sleeping bag if planning an overnight stay'
    ],
    photoCaptions: [
      'Icy-cold cascading natural spring waterfall in the mountain forest',
      'Mossy rainforest slopes at the foothills of active Mt. Kanlaon',
      'Natural spring swimming pavilion with chilly mineral waters',
      'Highland pine tree camping and picnic grounds under mountain fog'
    ],
    faqs: [
      {
        q: 'How many waterfalls can be visited from Guintubdan?',
        a: 'Visitors can trek to 4 main waterfalls within 15–40 minutes of easy-to-moderate hiking: Busay Oro, Busay Abaga, Busay Kahab-an, and Busay Kapid.'
      },
      {
        q: 'Can we camp overnight at Guintubdan?',
        a: 'Yes, designated grassy camping grounds are available with barbecue pits, clean restrooms, and mountain view gazebos.'
      }
    ]
  },

  'suyac-island-mangrove': {
    bestTime: 'March to August • High tide hours for crystal sea reflection beneath boardwalks',
    travelTime: '2 hours north of Bacolod City in Sagay Marine Reserve',
    difficulty: 'Very Easy / Elevated Bamboo Boardwalk Walk',
    estBudget: '₱100 entrance fee + ₱100 boat transfer fee',
    guideFee: 200,
    cottageFee: 500,
    ecoFee: 30,
    commute: [
      'From Bacolod North Bus Terminal, board a Ceres Bus to Sagay City (~2 hrs, ₱140–₱160).',
      'Take a tricycle to Vito Port or the Sagay Eco-Tourism Center (15 mins, ₱30).',
      'Board the community passenger boat across the Sagay Marine Reserve to Suyac Island (15 mins).'
    ],
    packing: [
      'Wide-brimmed sunhat, sunglasses, and light tropical attire',
      'Aqua shoes or flip-flops for shallow sea swimming',
      'Camera or smartphone for bamboo boardwalk perspective photography',
      'Cash to purchase freshly cooked mud crabs and local seafood from the community kitchen'
    ],
    photoCaptions: [
      'Elevated bamboo boardwalk weaving through centuries-old mangrove forests',
      'Crystal-clear turquoise tidal waters teeming with coastal marine life',
      'Traditional open-air eco-cottages perched right over the calm sea',
      'Flocks of migratory birds feeding across the marine sanctuary at sunset'
    ],
    faqs: [
      {
        q: 'What is special about the mangrove forest on Suyac Island?',
        a: 'Suyac Island features some of the oldest Sonneratia alba mangrove trees in Western Visayas, some estimated to be over a century old, with extensive above-water root networks.'
      },
      {
        q: 'Can we order lunch on the island?',
        a: 'Yes! The local Suyac Island Eco-Tourism Association runs a community kitchen that prepares fresh Sagay seafood, including blue crabs, squid, and native oysters upon arrival.'
      }
    ]
  }
};

// Default fallback context if destination is not in dictionary
const DEFAULT_CONTEXT = {
  bestTime: 'October to May • Morning hours for ideal lighting & cooler temperature',
  travelTime: 'Approx. 1–2 hours from Bacolod City',
  difficulty: 'Easy to Moderate',
  estBudget: '₱100–₱200 entrance fee',
  guideFee: 300,
  cottageFee: 400,
  ecoFee: 20,
  commute: [
    'Take a Ceres Bus from Bacolod Terminal to the corresponding municipality or city.',
    'Hire a local tricycle or motorcycle (habal-habal) to the destination jump-off point.',
    'Follow official tourist assistance desks for registration and guide assistance.'
  ],
  packing: [
    'Comfortable outdoor walking or hiking shoes',
    'Waterproof bag for personal valuables and electronics',
    'Adequate cash in Philippine Pesos (small bills preferred)',
    'Camera or smartphone with plenty of storage',
    'Refillable water bottle & eco-friendly sun protection'
  ],
  photoCaptions: [
    'Panoramic scenic view of the destination',
    'Natural surroundings and outdoor recreation area',
    'Visitor pathways and viewing pavilion',
    'Peaceful landscape and surrounding biodiversity'
  ],
  faqs: [
    {
      q: 'Do I need an advance reservation before visiting?',
      a: 'Most destinations welcome walk-in visitors during official visiting hours. Submitting a visit request through this site helps ensure guide availability and smooth assistance.'
    },
    {
      q: 'Are facilities such as restrooms and picnic areas available?',
      a: 'Yes, basic tourist amenities including restrooms, shade cottages, and local food stalls are maintained on site.'
    },
    {
      q: 'What eco-tourism rules should visitors observe?',
      a: 'We strictly practice Leave No Trace principles: pack out all your trash, avoid disturbing flora or wildlife, and support accredited local community guides.'
    }
  ]
};

async function loadDestinationDetail() {
  const contentEl = document.getElementById('details-content');
  if (!contentEl) return;

  const slug = getParam('id');

  if (!slug) {
    contentEl.innerHTML = `
      <div class="container" style="padding:4rem 0;">
        <div class="dest-alert-box dest-alert-box--error" role="alert">
          <span class="dest-alert-icon">⚠️</span>
          <div>
            <strong>No destination specified</strong>
            <p>Please choose a destination from our directory to view full details.</p>
            <a href="records.html" class="btn btn-primary btn-sm" style="margin-top:.75rem;">Browse all destinations →</a>
          </div>
        </div>
      </div>`;
    return;
  }

  showLoading(contentEl, 'Loading destination details…');

  let dest = null;
  let allDestinations = [];

  try {
    const rows = await window.DB.select(
      'destinations',
      'slug=eq.' + encodeURIComponent(slug) + '&limit=1'
    );
    dest = rows && rows[0] ? rows[0] : null;

    // Also fetch all destinations for the "Explore More" recommendation strip
    allDestinations = await window.DB.select('destinations', 'status=eq.active&order=name.asc');
  } catch (err) {
    console.warn('DB fetch failed, using fallback data.', err);
    allDestinations = window.EN_DESTINATIONS || [];
    dest = allDestinations.find(d => d.slug === slug) || null;
  }

  if (!dest) {
    contentEl.innerHTML = `
      <div class="container" style="padding:4rem 0;">
        <div class="dest-alert-box dest-alert-box--error" role="alert">
          <span class="dest-alert-icon">⚠️</span>
          <div>
            <strong>Destination not found</strong>
            <p>We couldn't locate the destination you are looking for.</p>
            <a href="records.html" class="btn btn-primary btn-sm" style="margin-top:.75rem;">Browse all destinations →</a>
          </div>
        </div>
      </div>`;
    return;
  }

  // Update page title
  document.title = `${dest.name} — Explore Negros Occidental`;

  // Merge context data
  const ctx = DEST_CONTEXTS[dest.slug] || DEFAULT_CONTEXT;

  // Prepare photo gallery array (ensure at least 4 photos)
  let gallery = Array.isArray(dest.gallery) && dest.gallery.length > 0
    ? dest.gallery
    : [
        dest.image_url,
        'https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&auto=format&fit=crop&q=80'
      ];

  const activities = Array.isArray(dest.activities) ? dest.activities : [];
  const facilities = Array.isArray(dest.facilities) ? dest.facilities : [];
  const statusClass = dest.status === 'active' ? 'status-active' : 'status-inactive';
  const statusLabel = dest.status === 'active' ? 'Open for Visitors' : 'Temporarily Closed';

  // Parse numeric entrance fee for calculator
  const baseFee = parseFeeNumber(dest.entrance_fee);

  // Recommendations: 3 random other destinations
  const moreSpots = allDestinations
    .filter(d => d.slug !== dest.slug)
    .slice(0, 3);

  // ── Render Full HTML ────────────────────────────────────────
  contentEl.innerHTML = `
    <!-- ══ DESTINATION HERO (Photo Background) ════════════════ -->
    <div class="details-hero" style="--hero-img: url('${gallery[0]}');">
      <div class="details-hero-img-bg" aria-hidden="true"></div>
      <div class="details-hero-overlay" aria-hidden="true"></div>
      <div class="container details-hero-content">

        <nav class="details-breadcrumb" aria-label="Breadcrumb">
          <a href="index.html">Home</a>
          <span class="breadcrumb-separator" aria-hidden="true">/</span>
          <a href="records.html">Destinations</a>
          <span class="breadcrumb-separator" aria-hidden="true">/</span>
          <span aria-current="page">${escapeHtml(dest.name)}</span>
        </nav>

        <div class="details-hero-header">
          <div class="details-hero-left">
            <div class="details-hero-badges">
              <span class="dest-badge-type">📍 ${escapeHtml(dest.location || 'Negros Occidental')}</span>
              <span class="dest-badge-status ${statusClass}">● ${statusLabel}</span>
              <span class="dest-badge-rating">⭐ 4.9 (Recommended Spot)</span>
            </div>
            <h1 class="details-title">${escapeHtml(dest.name)}</h1>
            <p class="details-tagline">${escapeHtml(dest.description)}</p>

            <div class="hero-quick-facts">
              <span class="hero-fact-pill">
                <span>⏰</span> ${escapeHtml(dest.visiting_hours || '8:00 AM – 5:00 PM')}
              </span>
              <span class="hero-fact-pill">
                <span>🎟️</span> ${escapeHtml(dest.entrance_fee || '₱50 per person')}
              </span>
              <span class="hero-fact-pill">
                <span>🚗</span> ${escapeHtml(ctx.travelTime)}
              </span>
            </div>
          </div>

          <div class="details-hero-actions">
            <button type="button" class="btn-action-pill" id="wishlist-btn" aria-label="Save to Wishlist">
              <span class="btn-action-icon" id="wishlist-icon">🤍</span>
              <span id="wishlist-text">Save Spot</span>
            </button>
            <button type="button" class="btn-action-pill" id="share-btn" aria-label="Share Destination">
              <span class="btn-action-icon">🔗</span>
              <span>Share</span>
            </button>
            <a href="form.html?destination=${encodeURIComponent(dest.name)}" class="btn-action-pill btn-action-pill--primary">
              <span>Plan a Visit →</span>
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- ══ MAIN BODY ══════════════════════════════════════════ -->
    <div class="details-body">
      <div class="container">

        <!-- ── Quick Key Highlights Strip ── -->
        <div class="highlights-grid" aria-label="Quick Highlights">
          <div class="highlight-card">
            <div class="highlight-icon">⏱️</div>
            <div class="highlight-text">
              <span class="highlight-label">Best Time to Visit</span>
              <span class="highlight-value">${escapeHtml(ctx.bestTime)}</span>
            </div>
          </div>
          <div class="highlight-card">
            <div class="highlight-icon">🚗</div>
            <div class="highlight-text">
              <span class="highlight-label">Travel Distance</span>
              <span class="highlight-value">${escapeHtml(ctx.travelTime)}</span>
            </div>
          </div>
          <div class="highlight-card">
            <div class="highlight-icon">👟</div>
            <div class="highlight-text">
              <span class="highlight-label">Activity Level</span>
              <span class="highlight-value">${escapeHtml(ctx.difficulty)}</span>
            </div>
          </div>
          <div class="highlight-card">
            <div class="highlight-icon">🎟️</div>
            <div class="highlight-text">
              <span class="highlight-label">Standard Entry Fee</span>
              <span class="highlight-value">${escapeHtml(dest.entrance_fee || '₱50 per person')}</span>
            </div>
          </div>
        </div>

        <div class="details-layout">

          <!-- ════ MAIN LEFT CONTENT ═════════════════════════════ -->
          <div class="details-main">

            <!-- ── INTERACTIVE PHOTO GALLERY ── -->
            <section class="gallery-section" aria-labelledby="gallery-heading">
              <div class="section-header-row">
                <h2 id="gallery-heading" class="details-section-title">
                  📸 Destination Gallery
                </h2>
                <span class="gallery-counter" id="gallery-counter">
                  Photo 1 of ${gallery.length}
                </span>
              </div>

              <div class="gallery-wrapper">
                <div class="gallery-stage" id="gallery-stage" tabindex="0" role="region" aria-label="Interactive Photo Showcase">
                  <img id="gallery-main-img"
                       src="${escapeHtml(gallery[0])}"
                       alt="${escapeHtml(dest.name)} - Photo 1"
                       loading="eager">

                  <!-- Previous / Next Controls -->
                  <button type="button" class="gallery-nav-btn gallery-nav-prev" id="gallery-prev" aria-label="Previous photo">❮</button>
                  <button type="button" class="gallery-nav-btn gallery-nav-next" id="gallery-next" aria-label="Next photo">❯</button>

                  <!-- Fullscreen / Lightbox trigger -->
                  <button type="button" class="gallery-fullscreen-btn" id="gallery-fullscreen-btn" aria-label="View Fullscreen" title="View Fullscreen">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    <span>Fullscreen</span>
                  </button>

                  <div class="gallery-caption-bar" id="gallery-caption">
                    ${escapeHtml(ctx.photoCaptions[0] || dest.name)}
                  </div>
                </div>

                <!-- Thumbnail Navigation Strip -->
                <div class="gallery-thumbs-list" id="gallery-thumbs" role="tablist" aria-label="Photo thumbnails">
                  ${gallery.map((imgUrl, i) => `
                    <button type="button"
                            class="gallery-thumb-btn ${i === 0 ? 'active' : ''}"
                            data-index="${i}"
                            role="tab"
                            aria-selected="${i === 0}"
                            aria-label="View photo ${i + 1}">
                      <img src="${escapeHtml(imgUrl)}" alt="Thumbnail ${i + 1}" loading="lazy">
                      <span class="thumb-badge">${i + 1}</span>
                    </button>
                  `).join('')}
                </div>
              </div>
            </section>

            <!-- ── INTERACTIVE CONTENT TABS ── -->
            <section class="tabs-section" aria-labelledby="details-tabs-heading">
              <h2 id="details-tabs-heading" class="sr-only">Destination Details & Guides</h2>

              <div class="tabs-nav-bar" role="tablist">
                <button type="button" class="tab-nav-btn active" data-tab="tab-overview" role="tab" aria-selected="true">
                  📖 Story &amp; Overview
                </button>
                <button type="button" class="tab-nav-btn" data-tab="tab-activities" role="tab" aria-selected="false">
                  🎯 Activities (${activities.length})
                </button>
                <button type="button" class="tab-nav-btn" data-tab="tab-commute" role="tab" aria-selected="false">
                  🧭 How to Get There
                </button>
                <button type="button" class="tab-nav-btn" data-tab="tab-packing" role="tab" aria-selected="false">
                  🎒 What to Bring
                </button>
              </div>

              <!-- Tab 1: Overview -->
              <div class="tab-pane active" id="tab-overview" role="tabpanel">
                <div class="details-card-box">
                  <h3 class="pane-heading">About ${escapeHtml(dest.name)}</h3>
                  <div class="rich-text-content">
                    <p class="lead-paragraph">${escapeHtml(dest.long_description || dest.description)}</p>

                    <div class="quote-callout">
                      <span class="quote-icon">🌿</span>
                      <p><em>"Negros Occidental is celebrated as the sweet spot of the Philippines &mdash; where breathtaking natural wonders, cool mountain heights, and rich sugarcane heritage meet warm Negrense hospitality."</em></p>
                    </div>

                    <h4>Why You'll Love This Destination</h4>
                    <p>Whether you're seeking a quiet natural escape away from city bustle or an exhilarating adventure with your friends and family, ${escapeHtml(dest.name)} provides unforgettable experiences that showcase the very best of Western Visayas.</p>
                  </div>

                  ${facilities.length ? `
                    <div class="facilities-wrapper">
                      <h4 class="sub-section-title">✅ On-Site Facilities &amp; Amenities</h4>
                      <div class="facilities-grid">
                        ${facilities.map(f => `
                          <div class="facility-pill">
                            <span class="facility-check">✓</span>
                            <span>${escapeHtml(f)}</span>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>
              </div>

              <!-- Tab 2: Activities -->
              <div class="tab-pane" id="tab-activities" role="tabpanel" hidden>
                <div class="details-card-box">
                  <h3 class="pane-heading">Adventures &amp; Things to Do</h3>
                  <p class="tab-sub-text">Exciting experiences you can enjoy while visiting ${escapeHtml(dest.name)}:</p>

                  <div class="activity-cards-grid">
                    ${activities.map((act, idx) => `
                      <div class="activity-card">
                        <div class="activity-icon-wrap">
                          ${getActivityEmoji(act)}
                        </div>
                        <div class="activity-card-body">
                          <h4 class="activity-title">${escapeHtml(act)}</h4>
                          <p class="activity-desc">${getActivityDescription(act, dest.name)}</p>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>

              <!-- Tab 3: Commute / How to get there -->
              <div class="tab-pane" id="tab-commute" role="tabpanel" hidden>
                <div class="details-card-box">
                  <h3 class="pane-heading">How to Get to ${escapeHtml(dest.name)}</h3>
                  <p class="tab-sub-text">Recommended travel routes from Bacolod City and Bacolod-Silay International Airport:</p>

                  <div class="commute-steps-timeline">
                    ${ctx.commute.map((step, idx) => `
                      <div class="commute-step">
                        <div class="step-marker">${idx + 1}</div>
                        <div class="step-content">
                          <strong>Step ${idx + 1}</strong>
                          <p>${escapeHtml(step)}</p>
                        </div>
                      </div>
                    `).join('')}
                  </div>

                  <div class="travel-tip-card">
                    <span class="tip-icon">💡</span>
                    <div>
                      <strong>Negrense Travel Tip:</strong>
                      <p>Start your trip early in the morning (around 7:00 AM – 8:00 AM) to maximize daylight, enjoy cooler travel weather, and beat the midday crowds.</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tab 4: Packing & Tips -->
              <div class="tab-pane" id="tab-packing" role="tabpanel" hidden>
                <div class="details-card-box">
                  <h3 class="pane-heading">What to Pack &amp; Responsible Travel</h3>
                  <p class="tab-sub-text">Interactive packing checklist &mdash; tap items as you pack your bag!</p>

                  <div class="interactive-packing-list" id="packing-checklist">
                    ${ctx.packing.map((item, idx) => `
                      <label class="packing-item-label">
                        <input type="checkbox" class="packing-checkbox">
                        <span class="packing-text">${escapeHtml(item)}</span>
                      </label>
                    `).join('')}
                  </div>

                  <div class="eco-code-card">
                    <h4>🌱 Leave No Trace Eco-Guidelines</h4>
                    <ul>
                      <li>Dispose of all waste properly &mdash; carry back what you carry in.</li>
                      <li>Respect local community customs, wildlife, and natural ecosystems.</li>
                      <li>Support local fruit stalls, guides, and sari-sari vendors.</li>
                    </ul>
                  </div>
                </div>
              </div>

            </section>

            <!-- ── INTERACTIVE FAQ ACCORDION ── -->
            <section class="faqs-section" aria-labelledby="faqs-heading">
              <h2 id="faqs-heading" class="details-section-title">
                ❓ Frequently Asked Questions
              </h2>
              <div class="faq-accordion" id="faq-accordion">
                ${ctx.faqs.map((faq, idx) => `
                  <div class="faq-item">
                    <button type="button" class="faq-question-btn" aria-expanded="false" aria-controls="faq-ans-${idx}">
                      <span>${escapeHtml(faq.q)}</span>
                      <span class="faq-chevron" aria-hidden="true">▾</span>
                    </button>
                    <div class="faq-answer-panel" id="faq-ans-${idx}" hidden>
                      <p>${escapeHtml(faq.a)}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

          </div><!-- /.details-main -->


          <!-- ════ SIDEBAR ═══════════════════════════════════════ -->
          <aside class="details-sidebar" aria-label="Trip planning and rates">

            <!-- ── Card 1: Essential Info ── -->
            <div class="info-card">
              <div class="info-card-header">
                <span class="info-header-icon">ℹ️</span>
                <h3 class="info-card-title">Quick Information</h3>
              </div>

              <div class="info-rows-list">
                <div class="info-row">
                  <span class="info-row-label">📍 Location</span>
                  <span class="info-row-value">${escapeHtml(dest.location || 'Negros Occidental')}</span>
                </div>
                <div class="info-row">
                  <span class="info-row-label">⏰ Hours</span>
                  <span class="info-row-value">${escapeHtml(dest.visiting_hours || '8:00 AM – 5:00 PM')}</span>
                </div>
                <div class="info-row">
                  <span class="info-row-label">🎟️ Entrance</span>
                  <span class="info-row-value highlight-green">${escapeHtml(dest.entrance_fee || '₱50 per person')}</span>
                </div>
                <div class="info-row">
                  <span class="info-row-label">● Status</span>
                  <span class="info-row-value"><span class="status-badge ${statusClass}">${statusLabel}</span></span>
                </div>
              </div>
            </div>

            <!-- ── Card 2: Interactive Cost Estimator ── -->
            <div class="calc-card" id="trip-calculator">
              <div class="calc-header">
                <span class="calc-header-icon">🧮</span>
                <div>
                  <h3 class="calc-title">Trip Cost Estimator</h3>
                  <p class="calc-subtitle">Estimate your group's budget</p>
                </div>
              </div>

              <div class="calc-body">
                <div class="calc-field">
                  <label for="calc-visitors" class="calc-label">Number of Visitors</label>
                  <div class="calc-counter">
                    <button type="button" class="counter-btn" id="calc-minus" aria-label="Decrease visitors">−</button>
                    <input type="number" id="calc-visitors" min="1" max="100" value="2" aria-label="Visitor count">
                    <button type="button" class="counter-btn" id="calc-plus" aria-label="Increase visitors">+</button>
                  </div>
                </div>

                <div class="calc-options">
                  <label class="calc-opt-row">
                    <input type="checkbox" id="opt-entrance" checked disabled>
                    <span>Standard Entrance (₱${baseFee}/pax)</span>
                  </label>

                  ${ctx.cottageFee > 0 ? `
                    <label class="calc-opt-row">
                      <input type="checkbox" id="opt-cottage">
                      <span>Day Cottage / Shed (+₱${ctx.cottageFee})</span>
                    </label>
                  ` : ''}

                  ${ctx.guideFee > 0 ? `
                    <label class="calc-opt-row">
                      <input type="checkbox" id="opt-guide">
                      <span>Accredited Guide (+₱${ctx.guideFee})</span>
                    </label>
                  ` : ''}

                  ${ctx.ecoFee > 0 ? `
                    <label class="calc-opt-row">
                      <input type="checkbox" id="opt-eco" checked>
                      <span>Eco / Conservation Fee (+₱${ctx.ecoFee}/pax)</span>
                    </label>
                  ` : ''}
                </div>

                <div class="calc-total-box">
                  <span class="calc-total-label">Estimated Total:</span>
                  <span class="calc-total-amount" id="calc-total-display">₱${(baseFee * 2) + (ctx.ecoFee * 2)}</span>
                </div>

                <a href="form.html?destination=${encodeURIComponent(dest.name)}&num_visitors=2"
                   id="calc-book-btn"
                   class="btn-calc-cta">
                  Plan Visit With This Estimate →
                </a>
                <p class="calc-disclaimer">*Estimates based on published rates. Excludes private meals &amp; transport.</p>
              </div>
            </div>

            <!-- ── Card 3: Direct Inquiry Card ── -->
            <div class="cta-sidebar-card">
              <div class="cta-sidebar-content">
                <span class="cta-sidebar-tag">🌿 Ready for your trip?</span>
                <h4 class="cta-sidebar-title">Let us help plan your visit to ${escapeHtml(dest.name)}</h4>
                <p class="cta-sidebar-desc">Submit your planned travel dates and our provincial tourism team will assist with bookings, guides, and permits.</p>
                <a href="form.html?destination=${encodeURIComponent(dest.name)}" class="btn-sidebar-primary">
                  Submit Visit Request
                </a>
              </div>
            </div>

          </aside>

        </div><!-- /.details-layout -->


        <!-- ── Explore More Destinations Strip ── -->
        ${moreSpots.length ? `
          <section class="more-spots-section" aria-labelledby="more-heading">
            <div class="more-spots-header">
              <h2 id="more-heading" class="details-section-title">✨ More Destinations to Explore</h2>
              <a href="records.html" class="more-spots-all-link">Browse All →</a>
            </div>

            <div class="more-spots-grid">
              ${moreSpots.map(spot => `
                <a href="details.html?id=${encodeURIComponent(spot.slug)}" class="more-spot-card">
                  <div class="more-spot-img">
                    <img src="${escapeHtml(spot.image_url)}" alt="${escapeHtml(spot.name)}" loading="lazy">
                    <span class="more-spot-fee">${escapeHtml(spot.entrance_fee || 'Explore')}</span>
                  </div>
                  <div class="more-spot-body">
                    <span class="more-spot-loc">📍 ${escapeHtml(spot.location || 'Negros')}</span>
                    <h3 class="more-spot-title">${escapeHtml(spot.name)}</h3>
                    <span class="more-spot-arrow">View Details →</span>
                  </div>
                </a>
              `).join('')}
            </div>
          </section>
        ` : ''}

      </div><!-- /.container -->
    </div><!-- /.details-body -->

    <!-- ══ FULLSCREEN LIGHTBOX MODAL ═══════════════════════════ -->
    <div class="lightbox-modal" id="lightbox-modal" role="dialog" aria-modal="true" aria-label="Photo Lightbox" hidden>
      <div class="lightbox-backdrop" id="lightbox-backdrop"></div>
      <div class="lightbox-container">
        <button type="button" class="lightbox-close-btn" id="lightbox-close" aria-label="Close Lightbox">✕</button>

        <div class="lightbox-img-wrap">
          <img id="lightbox-img" src="" alt="Fullscreen photo">
        </div>

        <button type="button" class="lightbox-nav-btn lightbox-prev" id="lightbox-prev" aria-label="Previous image">❮</button>
        <button type="button" class="lightbox-nav-btn lightbox-next" id="lightbox-next" aria-label="Next image">❯</button>

        <div class="lightbox-footer">
          <span id="lightbox-caption"></span>
          <span id="lightbox-counter"></span>
        </div>
      </div>
    </div>

    <!-- ══ FLOATING TOAST NOTIFICATION ═════════════════════════ -->
    <div class="dest-toast" id="dest-toast" role="status" aria-live="polite" hidden></div>
  `;

  // ── Attach Interactive Event Listeners ───────────────────────
  initGalleryInteractions(gallery, ctx.photoCaptions);
  initTabs();
  initFaqs();
  initCalculator(baseFee, ctx.cottageFee, ctx.guideFee, ctx.ecoFee, dest.name);
  initWishlist(dest);
  initShare(dest);
}

// ── 1. Interactive Gallery Logic (Slider + Lightbox) ─────────
function initGalleryInteractions(photos, captions) {
  let currentIndex = 0;

  const mainImg     = document.getElementById('gallery-main-img');
  const captionEl   = document.getElementById('gallery-caption');
  const counterEl   = document.getElementById('gallery-counter');
  const prevBtn     = document.getElementById('gallery-prev');
  const nextBtn     = document.getElementById('gallery-next');
  const thumbsWrap  = document.getElementById('gallery-thumbs');
  const fsBtn       = document.getElementById('gallery-fullscreen-btn');
  const stageEl     = document.getElementById('gallery-stage');

  // Lightbox elements
  const lightbox    = document.getElementById('lightbox-modal');
  const lbImg       = document.getElementById('lightbox-img');
  const lbCaption   = document.getElementById('lightbox-caption');
  const lbCounter   = document.getElementById('lightbox-counter');
  const lbClose     = document.getElementById('lightbox-close');
  const lbBackdrop  = document.getElementById('lightbox-backdrop');
  const lbPrev      = document.getElementById('lightbox-prev');
  const lbNext      = document.getElementById('lightbox-next');

  function updateGallery(newIndex, animate = true) {
    if (newIndex < 0) newIndex = photos.length - 1;
    if (newIndex >= photos.length) newIndex = 0;
    currentIndex = newIndex;

    if (animate && mainImg) {
      mainImg.style.opacity = '0';
      mainImg.style.transform = 'scale(0.98)';
      setTimeout(() => {
        mainImg.src = photos[currentIndex];
        mainImg.style.opacity = '1';
        mainImg.style.transform = 'scale(1)';
      }, 150);
    } else if (mainImg) {
      mainImg.src = photos[currentIndex];
    }

    if (captionEl) {
      captionEl.textContent = captions[currentIndex] || `Photo ${currentIndex + 1}`;
    }
    if (counterEl) {
      counterEl.textContent = `Photo ${currentIndex + 1} of ${photos.length}`;
    }

    // Update thumbnail active states
    if (thumbsWrap) {
      thumbsWrap.querySelectorAll('.gallery-thumb-btn').forEach((btn, i) => {
        const isActive = i === currentIndex;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    // If lightbox is open, sync it
    if (lightbox && !lightbox.hidden) {
      lbImg.src = photos[currentIndex];
      lbCaption.textContent = captions[currentIndex] || `Photo ${currentIndex + 1}`;
      lbCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
    }
  }

  // Prev / Next click
  if (prevBtn) prevBtn.addEventListener('click', () => updateGallery(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updateGallery(currentIndex + 1));

  // Thumbnail clicks
  if (thumbsWrap) {
    thumbsWrap.addEventListener('click', e => {
      const btn = e.target.closest('.gallery-thumb-btn');
      if (!btn) return;
      const idx = parseInt(btn.dataset.index, 10);
      if (!isNaN(idx)) updateGallery(idx);
    });
  }

  // Keyboard navigation on stage
  if (stageEl) {
    stageEl.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        updateGallery(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        updateGallery(currentIndex + 1);
      }
    });
  }

  // Lightbox open
  function openLightbox() {
    if (!lightbox) return;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    updateGallery(currentIndex, false);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  if (fsBtn) fsBtn.addEventListener('click', openLightbox);
  if (mainImg) mainImg.addEventListener('click', openLightbox);
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => updateGallery(currentIndex - 1));
  if (lbNext) lbNext.addEventListener('click', () => updateGallery(currentIndex + 1));

  document.addEventListener('keydown', e => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateGallery(currentIndex - 1);
    if (e.key === 'ArrowRight') updateGallery(currentIndex + 1);
  });
}

// ── 2. Interactive Tabs Logic ────────────────────────────────
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.hidden = false;
        targetPane.classList.add('active');
      }
    });
  });
}

// ── 3. Interactive FAQs Accordion ────────────────────────────
function initFaqs() {
  const accordion = document.getElementById('faq-accordion');
  if (!accordion) return;

  accordion.addEventListener('click', e => {
    const btn = e.target.closest('.faq-question-btn');
    if (!btn) return;

    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const panelId = btn.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    // Toggle current
    btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    btn.classList.toggle('active', !isExpanded);
    if (panel) {
      panel.hidden = isExpanded;
      panel.classList.toggle('open', !isExpanded);
    }
  });
}

// ── 4. Interactive Cost Estimator & Calculator ───────────────
function initCalculator(baseFee, cottageFee, guideFee, ecoFee, destName) {
  const visitorInput = document.getElementById('calc-visitors');
  const minusBtn     = document.getElementById('calc-minus');
  const plusBtn      = document.getElementById('calc-plus');
  const optCottage   = document.getElementById('opt-cottage');
  const optGuide     = document.getElementById('opt-guide');
  const optEco       = document.getElementById('opt-eco');
  const totalDisplay = document.getElementById('calc-total-display');
  const bookBtn      = document.getElementById('calc-book-btn');

  if (!visitorInput || !totalDisplay) return;

  function calculate() {
    let visitors = parseInt(visitorInput.value, 10);
    if (isNaN(visitors) || visitors < 1) visitors = 1;
    if (visitors > 100) visitors = 100;
    visitorInput.value = visitors;

    let total = baseFee * visitors;

    if (optCottage && optCottage.checked) total += cottageFee;
    if (optGuide && optGuide.checked)     total += guideFee;
    if (optEco && optEco.checked)         total += (ecoFee * visitors);

    totalDisplay.textContent = `₱${total.toLocaleString()}`;

    if (bookBtn) {
      bookBtn.href = `form.html?destination=${encodeURIComponent(destName)}&num_visitors=${visitors}`;
    }
  }

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      let v = parseInt(visitorInput.value, 10) || 1;
      if (v > 1) {
        visitorInput.value = v - 1;
        calculate();
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      let v = parseInt(visitorInput.value, 10) || 1;
      if (v < 100) {
        visitorInput.value = v + 1;
        calculate();
      }
    });
  }

  visitorInput.addEventListener('input', calculate);
  if (optCottage) optCottage.addEventListener('change', calculate);
  if (optGuide) optGuide.addEventListener('change', calculate);
  if (optEco) optEco.addEventListener('change', calculate);

  calculate();
}

// ── 5. Wishlist / Favorites Feature ──────────────────────────
function initWishlist(dest) {
  const wishlistBtn = document.getElementById('wishlist-btn');
  const iconEl      = document.getElementById('wishlist-icon');
  const textEl      = document.getElementById('wishlist-text');
  if (!wishlistBtn) return;

  const storageKey = 'explore_negros_wishlist';
  let wishlist = [];

  try {
    wishlist = JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch (e) {
    wishlist = [];
  }

  const isSaved = wishlist.includes(dest.slug);
  updateWishlistUI(isSaved);

  wishlistBtn.addEventListener('click', () => {
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch (e) {
      list = [];
    }

    const idx = list.indexOf(dest.slug);
    let newlySaved = false;

    if (idx > -1) {
      list.splice(idx, 1);
      newlySaved = false;
      showToast(`Removed ${dest.name} from wishlist.`);
    } else {
      list.push(dest.slug);
      newlySaved = true;
      showToast(`❤️ Saved ${dest.name} to your wishlist!`);
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(list));
    } catch (e) {}

    updateWishlistUI(newlySaved);
  });

  function updateWishlistUI(saved) {
    if (saved) {
      wishlistBtn.classList.add('saved');
      if (iconEl) iconEl.textContent = '❤️';
      if (textEl) textEl.textContent = 'Saved!';
    } else {
      wishlistBtn.classList.remove('saved');
      if (iconEl) iconEl.textContent = '🤍';
      if (textEl) textEl.textContent = 'Save Spot';
    }
  }
}

// ── 6. Share Functionality ───────────────────────────────────
function initShare(dest) {
  const shareBtn = document.getElementById('share-btn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', async () => {
    const url = window.location.href;
    const shareData = {
      title: `${dest.name} — Explore Negros Occidental`,
      text: `Check out ${dest.name} in Negros Occidental!`,
      url: url
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or fallback
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        showToast('✓ Link copied to clipboard!');
      } catch (e) {
        prompt('Copy link to this destination:', url);
      }
    }
  });
}

// ── 7. Floating Toast Helper ─────────────────────────────────
function showToast(message) {
  const toast = document.getElementById('dest-toast');
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add('visible');

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => { toast.hidden = true; }, 300);
  }, 3000);
}

// ── Helper: Parse number from fee string ─────────────────────
function parseFeeNumber(feeStr) {
  if (!feeStr) return 50;
  const match = String(feeStr).replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 50;
}

// ── Helper: Activity Emojis ──────────────────────────────────
function getActivityEmoji(activity) {
  const act = activity.toLowerCase();
  if (act.includes('swim') || act.includes('pool')) return '🏊‍♂️';
  if (act.includes('dive') || act.includes('snorkel')) return '🤿';
  if (act.includes('trek') || act.includes('hike')) return '🥾';
  if (act.includes('boat') || act.includes('kayak')) return '🛶';
  if (act.includes('photo')) return '📷';
  if (act.includes('heritage') || act.includes('museum')) return '🏛️';
  if (act.includes('dine') || act.includes('food') || act.includes('picnic')) return '🍽️';
  if (act.includes('camp')) return '⛺';
  if (act.includes('zip') || act.includes('bike')) return '🚴‍♂️';
  if (act.includes('bird')) return '🦅';
  if (act.includes('hot spring')) return '♨️';
  return '🎯';
}

function getActivityDescription(activity, spotName) {
  const act = activity.toLowerCase();
  if (act.includes('swim')) return `Take a refreshing dip in the clear natural waters of ${spotName}.`;
  if (act.includes('snorkel')) return 'Explore vibrant coral reefs and marine life just offshore.';
  if (act.includes('trek') || act.includes('hike')) return 'Traverse scenic nature trails with panoramic mountain viewpoints.';
  if (act.includes('photo')) return 'Capture postcard-worthy moments and dramatic tropical lighting.';
  if (act.includes('heritage')) return 'Discover fascinating historic stories and rich Negrense culture.';
  if (act.includes('camp')) return 'Sleep under the starry sky surrounded by tranquil nature.';
  if (act.includes('bird')) return 'Spot endemic tropical birds and wildlife in their natural habitat.';
  return `Enjoy ${activity} with your family and companions at ${spotName}.`;
}
