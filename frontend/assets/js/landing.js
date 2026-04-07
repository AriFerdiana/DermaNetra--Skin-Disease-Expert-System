/* ═══════════════════════════════════════════════════════════
   DermaNetra Landing Page — Interactive Engine
   Search · Toast · Nav · Conditions · News · i18n (ID/EN)
   ═══════════════════════════════════════════════════════════ */

let currentLang = 'id';

/* ─── i18n Dictionary ──────────────────────────────────── */
const I18N = {
  id: {
    nav_conditions: 'Kondisi Kulit A–Z',
    nav_skincare: 'Perawatan Harian',
    nav_news: 'Berita Kesehatan',
    nav_tools: 'Alat & Pelacak',
    sign_in: 'Masuk',
    hero_badge: 'Konten Dermatologi Ditinjau Pakar',
    hero_title_1: 'Informasi Kulit Lebih Baik.',
    hero_title_2: 'Kesehatan Kulit Lebih Baik.',
    hero_subtitle: 'Memberdayakan Anda dengan wawasan dermatologi yang ditinjau pakar dan sistem diagnostik canggih.',
    search_placeholder: 'Cari kondisi kulit, gejala, atau perawatan…',
    search_btn: 'Cari',
    or_use_ai: 'atau gunakan alat kami',
    cta_btn: 'Mulai Symptom Checker — Peta Tubuh Interaktif',
    cta_note: 'Gratis · Tanpa registrasi · Bukan pengganti saran medis',
    tools_badge: 'Perangkat Kesehatan Digital',
    tools_title: 'Alat Kesehatan & Pelacak',
    tools_subtitle: 'Perawatan diri dimulai dari alat yang tepat. Jelajahi rangkaian utilitas dermatologi kami yang dirancang dengan presisi klinis.',
    tool1_title: 'Symptom Checker',
    tool1_desc: 'Identifikasi kondisi kulit Anda menggunakan peta tubuh interaktif dan sistem pakar kami.',
    tool1_action: 'Mulai Alat',
    tool2_title: 'Kalkulator UV & SPF',
    tool2_desc: 'Dapatkan data indeks UV real-time dan rekomendasi SPF tabir surya untuk lokasi Anda.',
    tool2_action: 'Buka Kalkulator',
    tool3_title: 'Pelacak Jerawat',
    tool3_desc: 'Catat pemicu harian, diet, tingkat stres, dan amati pola penyebab jerawat Anda.',
    tool3_action: 'Catat Log Hari Ini',
    tool4_title: 'Kuis Tipe Kulit',
    tool4_desc: 'Temukan apakah kulit Anda berminyak, kering, sensitif, atau kombinasi hanya dalam 2 menit.',
    tool4_action: 'Ikuti Kuis',
    coming_soon: 'Segera Hadir',
    news_badge: 'Pembaruan Terkini',
    news_title: 'Berita & Terobosan Dermatologi',
    news_view_all: 'Lihat Semua Berita',
    expert_reviewed: '✓ Ditinjau Pakar',
    conditions_badge: 'Basis Pengetahuan',
    conditions_title: 'Jelajahi Kondisi Kulit Umum',
    conditions_subtitle: 'Telusuri perpustakaan kondisi dermatologi yang dikurasi secara klinis, perawatan, dan panduan.',
    see_all: 'Lihat semua →',
    trust_derm: '50+ Dermatologis',
    trust_derm_sub: 'dalam dewan editorial kami',
    trust_cond: '500+ Kondisi',
    trust_cond_sub: 'ditinjau secara klinis',
    trust_users: '2 Juta+ Pengguna',
    trust_users_sub: 'mempercayai DermaNetra',
    trust_hipaa: 'Prinsip HIPAA',
    trust_hipaa_sub: 'desain privasi-utama',
    footer_brand: 'Pengetahuan dermatologi ditinjau pakar, alat diagnostik canggih, dan panduan perawatan kulit harian — dalam satu platform.',
    footer_about: 'Tentang Kami',
    footer_mission: 'Misi Kami',
    footer_board: 'Dewan Penasihat Medis',
    footer_editorial: 'Kebijakan Editorial',
    footer_research: 'Riset & Metodologi',
    footer_resources: 'Sumber Daya',
    footer_conditions: 'Kondisi Kulit A–Z',
    footer_drug: 'Referensi Obat',
    footer_find_derm: 'Temukan Dermatologis',
    footer_tools: 'Alat Kesehatan',
    footer_legal: 'Legal',
    footer_privacy: 'Kebijakan Privasi',
    footer_terms: 'Syarat & Ketentuan',
    footer_cookie: 'Kebijakan Cookie',
    footer_access: 'Aksesibilitas',
    footer_contact: 'Kontak',
    footer_contact_us: 'Hubungi Kami',
    footer_advertise: 'Periklanan',
    footer_press: 'Pers & Media',
    footer_careers: 'Karir',
    footer_disclaimer: 'DermaNetra tidak memberikan saran medis, diagnosis, atau pengobatan. Informasi di situs ini hanya untuk tujuan edukasi. Selalu konsultasikan dengan tenaga kesehatan atau dermatologis berlisensi sebelum membuat keputusan kesehatan.',
    footer_disclaimer_label: 'Penafian Medis:',
    footer_copy: '© 2026 DermaNetra Health Portal. Hak cipta dilindungi.',
    toast_coming_soon: '🚀 Fitur ini segera hadir! Nantikan update terbaru.',
    toast_search_empty: 'Silakan ketik kata kunci pencarian.',
    search_no_results: 'Tidak ada hasil untuk',
    min_read: 'mnt baca',
  },
  en: {
    nav_conditions: 'Skin Conditions A–Z',
    nav_skincare: 'Daily Skincare',
    nav_news: 'Health News',
    nav_tools: 'Tools & Trackers',
    sign_in: 'Sign In',
    hero_badge: 'Expert-Reviewed Dermatology Content',
    hero_title_1: 'Better Skin Information.',
    hero_title_2: 'Better Skin Health.',
    hero_subtitle: 'Empowering you with expert-reviewed dermatology insights and an advanced diagnostic system.',
    search_placeholder: 'Search skin conditions, symptoms, or treatments…',
    search_btn: 'Search',
    or_use_ai: 'or use our tool',
    cta_btn: 'Launch Symptom Checker — Interactive Body Map',
    cta_note: 'Free · No registration required · Not a substitute for medical advice',
    tools_badge: 'Digital Health Toolkit',
    tools_title: 'Health Tools & Trackers',
    tools_subtitle: 'Self-care starts with the right tools. Explore our suite of dermatology utilities designed with clinical precision.',
    tool1_title: 'Symptom Checker',
    tool1_desc: 'Pinpoint your skin condition using our interactive body map and expert system.',
    tool1_action: 'Launch Tool',
    tool2_title: 'UV Index & SPF Calculator',
    tool2_desc: 'Get real-time UV data and personalized sunscreen SPF recommendations for your location.',
    tool2_action: 'Open Calculator',
    tool3_title: 'Acne Flare-Up Tracker',
    tool3_desc: 'Log daily triggers, diet, stress levels, and observe patterns that cause your breakouts.',
    tool3_action: 'Log Today',
    tool4_title: 'Skin Type Quiz',
    tool4_desc: 'Discover if you have oily, dry, sensitive, or combination skin in just 2 minutes.',
    tool4_action: 'Take the Quiz',
    coming_soon: 'Coming Soon',
    news_badge: 'Latest Updates',
    news_title: 'Dermatology News & Breakthroughs',
    news_view_all: 'View All News',
    expert_reviewed: '✓ Expert Reviewed',
    conditions_badge: 'Knowledge Base',
    conditions_title: 'Explore Common Skin Conditions',
    conditions_subtitle: 'Browse our clinically curated library of dermatological conditions, treatments, and care guides.',
    see_all: 'See all →',
    trust_derm: '50+ Dermatologists',
    trust_derm_sub: 'on our editorial board',
    trust_cond: '500+ Conditions',
    trust_cond_sub: 'clinically reviewed',
    trust_users: '2M+ Users',
    trust_users_sub: 'trust DermaNetra',
    trust_hipaa: 'HIPAA Principles',
    trust_hipaa_sub: 'privacy-first design',
    footer_brand: 'Expert-reviewed dermatology knowledge, powerful diagnostic tools, and daily skincare guidance — all in one platform.',
    footer_about: 'About Us',
    footer_mission: 'Our Mission',
    footer_board: 'Medical Advisory Board',
    footer_editorial: 'Editorial Policy',
    footer_research: 'Research & Methodology',
    footer_resources: 'Resources',
    footer_conditions: 'Skin Conditions A–Z',
    footer_drug: 'Drug Reference',
    footer_find_derm: 'Find a Dermatologist',
    footer_tools: 'Health Tools',
    footer_legal: 'Legal',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_cookie: 'Cookie Policy',
    footer_access: 'Accessibility',
    footer_contact: 'Contact',
    footer_contact_us: 'Contact Us',
    footer_advertise: 'Advertise',
    footer_press: 'Press & Media',
    footer_careers: 'Careers',
    footer_disclaimer: 'DermaNetra does not provide medical advice, diagnosis, or treatment. Information on this site is for educational purposes only. Always consult with a qualified, licensed healthcare provider or dermatologist before making any health decisions or beginning any treatment.',
    footer_disclaimer_label: 'Medical Disclaimer:',
    footer_copy: '© 2026 DermaNetra Health Portal. All rights reserved.',
    toast_coming_soon: '🚀 This feature is coming soon! Stay tuned for updates.',
    toast_search_empty: 'Please type a search keyword.',
    search_no_results: 'No results for',
    min_read: 'min read',
  }
};

/* ─── News Data ────────────────────────────────────────── */
const NEWS_DATA = [
  {
    featured: true,
    badge: 'BREAKING',
    title_id: 'Biologik Baru Disetujui FDA untuk Eksim Atopik Parah Memberi Harapan Bagi Jutaan Pasien',
    title_en: 'New FDA-Approved Biologic for Severe Atopic Eczema Offers Hope for Millions',
    excerpt_id: 'FDA telah menyetujui inhibitor jalur IL-33 baru yang menunjukkan tingkat kesembuhan kulit 70% dalam uji klinis Fase III untuk dermatitis atopik sedang-berat.',
    excerpt_en: 'The FDA has approved a novel IL-33 pathway inhibitor, demonstrating 70% clear-skin rates in Phase III trials for moderate-to-severe atopic dermatitis.',
    author: 'Dr. Maria D. Santos',
    author_role_id: 'Dermatologis Bersertifikat',
    author_role_en: 'Board-Certified Dermatologist',
    author_initials: 'MD',
    date: '7 Mar 2026',
    read_time: 8,
    gradient: 'linear-gradient(135deg,#0e7490,#164e63)',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    featured: false,
    title_id: 'Bagaimana Perubahan Iklim dan Polusi Urban Menghancurkan Barrier Kulit Anda',
    title_en: 'How Climate Change and Urban Pollution Are Destroying Your Skin Barrier',
    date: '5 Mar 2026',
    read_time: 5,
    gradient: 'linear-gradient(135deg,#fef3c7,#fde68a)',
    icon_color: '#d97706',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    featured: false,
    title_id: 'Kebenaran Tentang Retinol di 2026: Dermatologis Akhirnya Angkat Bicara',
    title_en: 'The Truth About Retinol in 2026: Dermatologists Finally Weigh In',
    date: '3 Mar 2026',
    read_time: 6,
    gradient: 'linear-gradient(135deg,#ede9fe,#ddd6fe)',
    icon_color: '#7c3aed',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    featured: false,
    title_id: 'Skincare Berbasis Mikrobioma: Apakah Axis Usus-Kulit Masa Depan Dermatologi?',
    title_en: 'Microbiome-Based Skincare: Is the Gut-Skin Axis the Future of Dermatology?',
    date: '1 Mar 2026',
    read_time: 7,
    gradient: 'linear-gradient(135deg,#fce7f3,#fbcfe8)',
    icon_color: '#db2777',
    icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
  }
];

/* ─── Condition Category Mapping ───────────────────────── */
const CONDITION_CATEGORIES = {
  'acne': {
    label_id: 'Jerawat & Noda',
    label_en: 'Acne & Blemishes',
    ids: ['D011', 'D016']
  },
  'eczema': {
    label_id: 'Eksim & Dermatitis',
    label_en: 'Eczema & Dermatitis',
    ids: ['D001', 'D002', 'D015', 'D028', 'D036']
  },
  'fungal': {
    label_id: 'Infeksi Jamur',
    label_en: 'Fungal Infections',
    ids: ['D007', 'D014', 'D020', 'D021', 'D022', 'D023', 'D029', 'D035', 'D038', 'D039']
  },
  'bacterial': {
    label_id: 'Infeksi Bakteri',
    label_en: 'Bacterial Infections',
    ids: ['D003', 'D009', 'D024', 'D025', 'D031']
  },
  'viral': {
    label_id: 'Infeksi Virus & Parasit',
    label_en: 'Viral & Parasitic',
    ids: ['D004', 'D008', 'D017', 'D019', 'D033', 'D042', 'D034']
  },
  'allergy': {
    label_id: 'Alergi & Ruam',
    label_en: 'Allergies & Rashes',
    ids: ['D005', 'D018', 'D032', 'D037']
  },
  'autoimmune': {
    label_id: 'Autoimun & Kronik',
    label_en: 'Autoimmune & Chronic',
    ids: ['D006', 'D010', 'D013', 'D030']
  },
  'pigment': {
    label_id: 'Pigmentasi & Lainnya',
    label_en: 'Pigmentation & Other',
    ids: ['D012', 'D026', 'D027', 'D040']
  }
};

/* ─── Pill Tags for quick filter ───────────────────────── */
const PILL_TAGS = [
  { key: 'all', label_id: 'Semua', label_en: 'All' },
  { key: 'acne', label_id: 'Jerawat', label_en: 'Acne' },
  { key: 'eczema', label_id: 'Eksim', label_en: 'Eczema' },
  { key: 'fungal', label_id: 'Jamur', label_en: 'Fungal' },
  { key: 'bacterial', label_id: 'Bakteri', label_en: 'Bacterial' },
  { key: 'viral', label_id: 'Virus', label_en: 'Viral' },
  { key: 'allergy', label_id: 'Alergi', label_en: 'Allergy' },
  { key: 'autoimmune', label_id: 'Autoimun', label_en: 'Autoimmune' },
  { key: 'pigment', label_id: 'Pigmentasi', label_en: 'Pigmentation' },
];

let activeFilter = 'all';

/* ═══════════════════════════════════════════════════════════
   TOAST NOTIFICATION
   ═══════════════════════════════════════════════════════════ */
function showToast(message, duration = 3000) {
  // Remove existing
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;font-size:18px;cursor:pointer;padding:0 0 0 12px;line-height:1">×</button>
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ═══════════════════════════════════════════════════════════
   GLOBAL SEARCH (Debounced)
   ═══════════════════════════════════════════════════════════ */
let searchTimeout;

function initSearch() {
  const input = document.getElementById('hero-search-input');
  const btn = document.getElementById('hero-search-btn');
  const dropdown = document.getElementById('search-dropdown');
  const headerSearchBtn = document.getElementById('header-search-btn');
  if (!input) return;

  // Debounce input
  input.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { dropdown.innerHTML = ''; dropdown.style.display = 'none'; return; }
      renderSearchResults(q, dropdown);
    }, 250);
  });

  // Search button click
  btn.addEventListener('click', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { showToast(t('toast_search_empty')); return; }
    if (q.length < 2) return;
    renderSearchResults(q, dropdown);
  });

  // Enter key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btn.click();
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
      dropdown.style.display = 'none';
    }
  });

  // Header search icon
  if (headerSearchBtn) {
    headerSearchBtn.addEventListener('click', () => {
      input.focus();
      document.getElementById('hero-section').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function highlightMatches(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span class="bg-yellow-100 text-teal-800 font-bold">$1</span>');
}

function renderSearchResults(query, dropdown) {
  if (typeof DISEASE_DB === 'undefined') return;
  const results = [];

  for (const [id, d] of Object.entries(DISEASE_DB)) {
    const nameEn = (d.name || '').toLowerCase();
    const nameId = (d.name_id || '').toLowerCase();
    const desc = (d.description || '').toLowerCase();
    if (nameEn.includes(query) || nameId.includes(query) || desc.includes(query)) {
      results.push({ id, ...d });
    }
  }

  if (results.length === 0) {
    dropdown.innerHTML = `<div class="search-no-result">${t('search_no_results')} "<strong>${query}</strong>"</div>`;
    dropdown.style.display = 'block';
    return;
  }

  dropdown.innerHTML = results.slice(0, 8).map(r => {
    const name = currentLang === 'id' ? r.name_id : r.name;
    const highlightedName = highlightMatches(name, query);
    return `
      <a href="condition.html?id=${r.id}" class="search-result-item">
        <div class="search-result-name">${highlightedName}</div>
        <div class="search-result-meta">${r.icd10} · ${r.prevalence || ''}</div>
      </a>
    `;
  }).join('');
  dropdown.style.display = 'block';
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION (Smooth Scroll)
   ═══════════════════════════════════════════════════════════ */
function initNav() {
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(el.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('[data-coming-soon]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(t('toast_coming_soon'));
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   NEWS RENDERING
   ═══════════════════════════════════════════════════════════ */
function renderNews() {
  const container = document.getElementById('news-container');
  if (!container) return;

  const featured = NEWS_DATA.find(n => n.featured);
  const side = NEWS_DATA.filter(n => !n.featured);

  const featuredHTML = featured ? `
    <div class="lg:col-span-3 news-card" onclick="showToast('${currentLang === 'id' ? '📰 Artikel lengkap segera hadir!' : '📰 Full article coming soon!'}')">
      <div class="h-56 relative overflow-hidden" style="background:${featured.gradient}">
        <div class="absolute inset-0 flex items-center justify-center opacity-10">
          <svg class="w-48 h-48 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="${featured.icon}" />
          </svg>
        </div>
        <div class="absolute bottom-4 left-4"><span class="bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">${featured.badge}</span></div>
      </div>
      <div class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <span class="badge-expert">${t('expert_reviewed')}</span>
          <span class="text-xs text-slate-400 font-medium">${featured.date} · ${featured.read_time} ${t('min_read')}</span>
        </div>
        <h3 class="text-xl font-extrabold text-slate-800 mb-3 leading-tight">${currentLang === 'id' ? featured.title_id : featured.title_en}</h3>
        <p class="text-slate-500 text-sm leading-relaxed mb-4">${currentLang === 'id' ? featured.excerpt_id : featured.excerpt_en}</p>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">${featured.author_initials}</div>
          <div>
            <div class="text-xs font-bold text-slate-700">${featured.author}</div>
            <div class="text-xs text-slate-400">${currentLang === 'id' ? featured.author_role_id : featured.author_role_en}</div>
          </div>
        </div>
      </div>
    </div>
  ` : '';

  const sideHTML = side.map(n => `
    <div class="news-card flex gap-4 p-4" onclick="showToast('${currentLang === 'id' ? '📰 Artikel lengkap segera hadir!' : '📰 Full article coming soon!'}')">
      <div class="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center" style="background:${n.gradient}">
        <svg class="w-8 h-8" style="color:${n.icon_color}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="${n.icon}" />
        </svg>
      </div>
      <div>
        <span class="badge-expert">${t('expert_reviewed')}</span>
        <h4 class="text-sm font-bold text-slate-800 mt-1.5 leading-tight">${currentLang === 'id' ? n.title_id : n.title_en}</h4>
        <p class="text-xs text-slate-400 mt-1">${n.date} · ${n.read_time} ${t('min_read')}</p>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    ${featuredHTML}
    <div class="lg:col-span-2 flex flex-col gap-4">${sideHTML}</div>
  `;
}

/* ═══════════════════════════════════════════════════════════
   CONDITIONS EXPLORER (Dynamic from DISEASE_DB)
   ═══════════════════════════════════════════════════════════ */
function renderConditions() {
  const grid = document.getElementById('conditions-grid');
  const pillContainer = document.getElementById('pills-container');
  if (!grid || typeof DISEASE_DB === 'undefined') return;

  // Render pills
  if (pillContainer) {
    pillContainer.innerHTML = PILL_TAGS.map(p => `
      <button class="pill ${activeFilter === p.key ? 'pill-active' : ''}" data-filter="${p.key}">
        ${currentLang === 'id' ? p.label_id : p.label_en}
      </button>
    `).join('');

    pillContainer.querySelectorAll('.pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        renderConditions();
      });
    });
  }

  // Filter categories
  const cats = activeFilter === 'all'
    ? Object.entries(CONDITION_CATEGORIES)
    : Object.entries(CONDITION_CATEGORIES).filter(([key]) => key === activeFilter);

  grid.innerHTML = cats.map(([key, cat]) => {
    const diseases = cat.ids
      .filter(id => DISEASE_DB[id])
      .map(id => {
        const d = DISEASE_DB[id];
        const name = currentLang === 'id' ? d.name_id : d.name;
        return `<a href="condition.html?id=${id}" class="block text-slate-600 hover:text-primary-600 font-medium transition-colors">${name}</a>`;
      });

    return `
      <div>
        <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">${currentLang === 'id' ? cat.label_id : cat.label_en}</h4>
        <div class="space-y-2 text-sm">${diseases.join('')}</div>
      </div>
    `;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════
   i18n LANGUAGE TOGGLE
   ═══════════════════════════════════════════════════════════ */
function t(key) {
  return I18N[currentLang]?.[key] || I18N['en']?.[key] || key;
}

function setLanguage(lang) {
  currentLang = lang;
  // Update toggle buttons
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('lang-active', btn.dataset.langBtn === lang);
  });

  // Update static text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (el.tagName === 'INPUT') el.placeholder = val;
    else el.textContent = val;
  });

  // Re-render dynamic content
  renderNews();
  renderConditions();
  renderTools();
}

function initI18n() {
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.langBtn));
  });
}

/* ═══════════════════════════════════════════════════════════
   TOOLS SECTION (Dynamic render for i18n)
   ═══════════════════════════════════════════════════════════ */
function renderTools() {
  const container = document.getElementById('tools-grid');
  if (!container) return;

  const tools = [
    { href: 'index.html', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', gradient: 'linear-gradient(135deg,#cffafe,#a5f3fc)', iconColor: '#0891b2', titleKey: 'tool1_title', descKey: 'tool1_desc', actionKey: 'tool1_action', actionColor: 'text-primary-600', active: true },
    { href: 'uv-calculator.html', icon: 'M12 3v1m0 16v1m8-9h1M3 12H2m15.657-6.343l-.707.707M6.343 6.343l.707.707M17.657 17.657l-.707-.707M6.343 17.657l.707-.707M12 8a4 4 0 110 8 4 4 0 010-8z', gradient: 'linear-gradient(135deg,#fef3c7,#fde68a)', iconColor: '#d97706', titleKey: 'tool2_title', descKey: 'tool2_desc', actionKey: 'tool2_action', actionColor: 'text-amber-600', active: true },
    { href: 'acne-tracker.html', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', gradient: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', iconColor: '#db2777', titleKey: 'tool3_title', descKey: 'tool3_desc', actionKey: 'tool3_action', actionColor: 'text-pink-600', active: true },
    { href: 'skin-quiz.html', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', gradient: 'linear-gradient(135deg,#ede9fe,#ddd6fe)', iconColor: '#7c3aed', titleKey: 'tool4_title', descKey: 'tool4_desc', actionKey: 'tool4_action', actionColor: 'text-violet-600', active: true },
  ];

  container.innerHTML = tools.map(tool => {
    const tag = tool.active ? 'a' : 'div';
    const hrefAttr = tool.active ? `href="${tool.href}"` : '';
    const clickAttr = tool.active ? '' : `onclick="showToast(t('toast_coming_soon'))"`;
    const actionText = tool.active ? t(tool.actionKey) : t('coming_soon');

    return `
      <${tag} ${hrefAttr} class="tool-card block" ${clickAttr}>
        <div class="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style="background:${tool.gradient}">
          <svg class="w-6 h-6" style="color:${tool.iconColor}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="${tool.icon}" />
          </svg>
        </div>
        <h3 class="font-bold text-slate-800 text-base mb-2">${t(tool.titleKey)}</h3>
        <p class="text-slate-500 text-sm leading-relaxed">${t(tool.descKey)}</p>
        <div class="mt-4 text-xs font-bold ${tool.actionColor} flex items-center gap-1">${actionText}
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </div>
      </${tag}>
    `;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════ */
async function loadDiseaseMetadata() {
  try {
    const res = await fetch('http://localhost:8000/api/diseases');
    const data = await res.json();
    if (data.diseases && Array.isArray(data.diseases)) {
      data.diseases.forEach(d => {
        if (DISEASE_DB[d.id]) {
          DISEASE_DB[d.id].name = d.name;
          DISEASE_DB[d.id].name_id = d.name_id;
          DISEASE_DB[d.id].description = d.description;
          DISEASE_DB[d.id].icd10 = d.icd10;
          DISEASE_DB[d.id].contagious = d.contagious;
          DISEASE_DB[d.id].regions = d.regions;
        }
      });
    }
  } catch (e) {
    console.warn('Could not fetch disease metadata from API, using fallback names.');
    // Provide fallback names from backend knowledge
    const FALLBACK_NAMES = {
      'D001': { name: 'Seborrheic Dermatitis', name_id: 'Dermatitis Seboroik (Ketombe Parah)', icd10: 'L21.9', contagious: false },
      'D002': { name: 'Atopic Dermatitis', name_id: 'Dermatitis Atopik (Eksim)', icd10: 'L20.9', contagious: false },
      'D003': { name: 'Folliculitis', name_id: 'Folikulitis (Radang Folikel/Bisul Kecil)', icd10: 'L73.9', contagious: false },
      'D004': { name: 'Scabies', name_id: 'Skabies (Kudis)', icd10: 'B86', contagious: true },
      'D005': { name: 'Miliaria', name_id: 'Miliaria (Biang Keringat)', icd10: 'L74.3', contagious: false },
      'D006': { name: 'Psoriasis Vulgaris', name_id: 'Psoriasis Vulgaris', icd10: 'L40.0', contagious: false },
      'D007': { name: 'Tinea Capitis', name_id: 'Tinea Kapitis (Kurap Kepala)', icd10: 'B35.0', contagious: true },
      'D008': { name: 'Pediculosis Capitis', name_id: 'Pedikulosis Kapitis (Kutu Kepala)', icd10: 'B85.0', contagious: true },
      'D009': { name: 'Impetigo', name_id: 'Impetigo (Koreng)', icd10: 'L01.0', contagious: true },
      'D010': { name: 'Alopecia Areata', name_id: 'Alopecia Areata (Kebotakan Setempat)', icd10: 'L63.9', contagious: false },
      'D011': { name: 'Acne Vulgaris', name_id: 'Acne Vulgaris (Jerawat)', icd10: 'L70.0', contagious: false },
      'D012': { name: 'Melasma', name_id: 'Melasma (Flek Hitam)', icd10: 'L81.1', contagious: false },
      'D013': { name: 'Rosacea', name_id: 'Rosacea (Kemerahan Wajah Kronis)', icd10: 'L71.9', contagious: false },
      'D014': { name: 'Pityriasis Versicolor', name_id: 'Panu (Pityriasis Versicolor)', icd10: 'B36.0', contagious: false },
      'D015': { name: 'Contact Dermatitis', name_id: 'Dermatitis Kontak', icd10: 'L25.9', contagious: false },
      'D016': { name: 'Milia', name_id: 'Milia (Bintik Putih Kecil)', icd10: 'L72.0', contagious: false },
      'D017': { name: 'Herpes Simplex', name_id: 'Herpes Simpleks', icd10: 'B00.9', contagious: true },
      'D018': { name: 'Urticaria', name_id: 'Urtikaria (Biduran/Kaligata)', icd10: 'L50.9', contagious: false },
      'D019': { name: 'Molluscum Contagiosum', name_id: 'Moluskum Kontagiosum', icd10: 'B08.1', contagious: true },
      'D020': { name: 'Tinea Corporis', name_id: 'Tinea Korporis (Kurap Badan)', icd10: 'B35.4', contagious: true },
      'D021': { name: 'Cutaneous Candidiasis', name_id: 'Kandidosis Kutanea (Jamur Candida)', icd10: 'B37.2', contagious: false },
      'D022': { name: 'Tinea Cruris', name_id: 'Tinea Kruris (Kurap Selangkangan)', icd10: 'B35.6', contagious: true },
      'D023': { name: 'Erythrasma', name_id: 'Eritrasma', icd10: 'L08.1', contagious: false },
      'D024': { name: 'Ecthyma', name_id: 'Ektima (Koreng Dalam)', icd10: 'L08.0', contagious: true },
      'D025': { name: 'Hidradenitis Suppurativa', name_id: 'Hidradenitis Supurativa', icd10: 'L73.2', contagious: false },
      'D026': { name: 'Intertrigo', name_id: 'Intertrigo (Ruam Lipatan)', icd10: 'L30.4', contagious: false },
      'D027': { name: 'Granuloma Inguinale', name_id: 'Granuloma Inguinale (Donovanosis)', icd10: 'A58', contagious: true },
      'D028': { name: 'Dyshidrotic Eczema', name_id: 'Eksim Dishidrotik (Pompholyx)', icd10: 'L30.1', contagious: false },
      'D029': { name: 'Tinea Manuum', name_id: 'Tinea Manuum (Kurap Tangan)', icd10: 'B35.2', contagious: true },
      'D030': { name: 'Leprosy', name_id: 'Lepra (Kusta/Morbus Hansen)', icd10: 'A30.9', contagious: true },
      'D031': { name: 'Cellulitis', name_id: 'Selulitis', icd10: 'L03.9', contagious: false },
      'D032': { name: 'Pityriasis Rosea', name_id: 'Pitiriasis Rosea', icd10: 'L42', contagious: false },
      'D033': { name: 'Viral Wart', name_id: 'Kutil (Veruka Vulgaris)', icd10: 'B07', contagious: true },
      'D034': { name: 'Paronychia', name_id: 'Paronikia (Cantengan/Infeksi Kuku)', icd10: 'L03.0', contagious: false },
      'D035': { name: 'Tinea Pedis', name_id: 'Tinea Pedis (Kutu Air/Kurap Kaki)', icd10: 'B35.3', contagious: true },
      'D036': { name: 'Discoid Eczema', name_id: 'Eksim Diskoid (Nummular)', icd10: 'L30.0', contagious: false },
      'D037': { name: 'Arthropod Bite Reaction', name_id: 'Reaksi Gigitan Serangga', icd10: 'T63.4', contagious: false },
      'D038': { name: 'Onychomycosis', name_id: 'Onikomikosis (Jamur Kuku)', icd10: 'B35.1', contagious: true },
      'D039': { name: 'Pitted Keratolysis', name_id: 'Pitted Keratolysis (Lubang Telapak)', icd10: 'L08.8', contagious: false },
      'D040': { name: 'Corn & Callus', name_id: 'Klus/Mata Ikan & Kapalan', icd10: 'L84', contagious: false },
      'D041': { name: 'Cutaneous Larva Migrans', name_id: 'Cutaneous Larva Migrans (CLM)', icd10: 'B76.9', contagious: false },
      'D042': { name: 'Herpes Zoster', name_id: 'Herpes Zoster (Cacar Ular)', icd10: 'B02.9', contagious: true },
    };
    for (const [id, meta] of Object.entries(FALLBACK_NAMES)) {
      if (DISEASE_DB[id]) Object.assign(DISEASE_DB[id], meta);
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadDiseaseMetadata();
  initNav();
  initSearch();
  initI18n();
  renderNews();
  renderConditions();
  renderTools();
  setLanguage('id'); // Default Bahasa Indonesia
});
