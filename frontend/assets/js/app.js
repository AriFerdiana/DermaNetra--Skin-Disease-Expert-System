// ═══════════════════════════════════════════════════════════
//  DermaNetra — Application Logic v6 (Premium Redesign)
//  Side drawer · Pulsing dots · Circular gauge · Clean cards
// ═══════════════════════════════════════════════════════════

let state = {
  sex: null,
  age: '',
  skinType: '',
  duration: '',
  symptoms: {}, // region_key -> Set(symptom_ids)
  currentView: 'front', // 'front' or 'back'
  viewMode: 'adult',
  results: null,
  language: localStorage.getItem('dn-lang') || 'id'
};

// ── Translation Map ──────────────────────────────────────
const I18N = {
  id: {
    appTitle: 'DermaNetra',
    appTagline: 'Sistem Pakar Penyakit Kulit',
    intakeTitle: 'Formulir Pasien',
    intakeDesc: 'Lengkapi data berikut untuk memulai analisis.',
    sexLabel: 'Jenis Kelamin Biologis',
    male: 'Laki-laki',
    female: 'Perempuan',
    ageLabel: 'Usia (Tahun)',
    skinLabel: 'Tipe Kulit',
    selectSkin: 'Pilih tipe kulit',
    skinNormal: 'Normal',
    skinDry: 'Kering',
    skinOily: 'Berminyak',
    skinCombo: 'Kombinasi',
    skinSensitive: 'Sensitif',
    durationLabel: 'Durasi Gejala',
    durShort: '< 3 Hari',
    durMed: '1–2 Minggu',
    durLong: '> 1 Bulan',
    disclaimerText: 'Saya mengerti bahwa ini adalah untuk tujuan edukasi dan bukan diagnosis medis formal.',
    startBtn: 'Mulai Analisis Kulit',
    versionText: 'DermaNetra',
    legalText: 'Hanya untuk tujuan edukasi & skrining',
    mapTitle: 'Peta Tubuh Interaktif',
    mapDesc: 'Ketuk titik yang berdenyut untuk menambah gejala',
    front: 'DEPAN',
    back: 'BELAKANG',
    noSymptoms: 'Belum Ada Gejala',
    analyzeBtn: 'Analisis Sekarang',
    drawerSub: 'Pilih semua gejala yang sesuai',
    searchPlaceholder: 'Cari gejala...',
    addBtn: 'Tambah Gejala',
    topMatch: 'Hasil Analisis Utama',
    contextMale: 'Laki-laki',
    contextFemale: 'Perempuan',
    downloadReport: 'Unduh Laporan Medis',
    clinicalReport: 'Laporan Klinis DermaNetra',
    confidential: 'Ringkasan Medis Rahasia',
    icdLabel: 'ICD-10',
    clinicalFeatures: 'Fitur Klinis',
    causesLabel: 'Penyebab & Faktor Risiko',
    treatmentPlan: 'Rencana Perawatan Umum',
    otherConditions: 'Kemungkinan Kondisi Lain',
    notSpecified: 'Tidak ditentukan.',
    blueprintTitle: 'Blueprint Analisis',
    medicalDisclaimer: 'Penafian Medis: Sistem ini menggunakan basis data pakar untuk skrining awal dan BUKAN diagnosis medis. Selalu konsultasikan dengan dokter spesialis kulit berlisensi.',
    whenToSee: 'Kapan harus ke dokter:',
    otc: 'Obat Bebas',
    rx: 'Resep Dokter',
    lifestyle: 'Gaya Hidup',
    confidenceHigh: 'Tinggi',
    confidenceMed: 'Sedang',
    confidenceLow: 'Rendah',
    viewFront: 'Tampilan Depan',
    viewBack: 'Tampilan Belakang',
    backToMap: 'Kembali ke Peta',
    noSymptomsYet: 'Belum Ada Gejala',
    noMatchesFound: 'Tidak ada hasil',
    resultsTitle: 'Hasil Analisis',
    diagnosisMode: 'Mode Diagnosis',
    printPdf: 'Cetak PDF',
    startOver: 'Mulai Ulang',
    symptomsCount: (n) => `${n} Gejala Terpilih`
  },
  en: {
    appTitle: 'DermaNetra',
    appTagline: 'Skin Disease Expert System',
    intakeTitle: 'Patient Intake Form',
    intakeDesc: 'Complete all fields to begin your skin analysis.',
    sexLabel: 'Biological Sex',
    male: 'Male',
    female: 'Female',
    ageLabel: 'Age (Years)',
    skinLabel: 'Skin Type',
    selectSkin: 'Select skin type',
    skinNormal: 'Normal',
    skinDry: 'Dry',
    skinOily: 'Oily',
    skinCombo: 'Combination',
    skinSensitive: 'Sensitive',
    durationLabel: 'Symptom Duration',
    durShort: '< 3 Days',
    durMed: '1–2 Weeks',
    durLong: '> 1 Month',
    disclaimerText: 'I understand that this is for educational purposes and not a formal medical diagnosis.',
    startBtn: 'Start Skin Analysis',
    versionText: 'DermaNetra',
    legalText: 'Educational & screening purposes only',
    mapTitle: 'Interactive Body Map',
    mapDesc: 'Tap the pulsing dots to add symptoms',
    front: 'FRONT',
    back: 'BACK',
    noSymptoms: 'No Symptoms Yet',
    analyzeBtn: 'Analyze Now',
    drawerSub: 'Select all symptoms that apply',
    searchPlaceholder: 'Search symptoms...',
    addBtn: 'Add Symptom(s)',
    topMatch: 'Top Match Analysis',
    contextMale: 'Male',
    contextFemale: 'Female',
    downloadReport: 'Download Medical Report',
    clinicalReport: 'DermaNetra Clinical Report',
    confidential: 'Confidential Medical Summary',
    icdLabel: 'ICD-10',
    clinicalFeatures: 'Clinical Features',
    causesLabel: 'Causes & Risk Factors',
    treatmentPlan: 'Common Treatment Plan',
    otherConditions: 'Other Possible Conditions',
    notSpecified: 'Not specified.',
    blueprintTitle: 'Analysis Blueprint',
    medicalDisclaimer: 'Medical Disclaimer: This system uses an expert system approach for preliminary screening and is NOT a medical diagnosis. Always consult a board-certified dermatologist.',
    whenToSee: 'When to see a doctor:',
    otc: 'OTC',
    rx: 'RX',
    lifestyle: 'Life',
    confidenceHigh: 'High',
    confidenceMed: 'Medium',
    confidenceLow: 'Low',
    viewFront: 'Front View',
    viewBack: 'Back View',
    backToMap: 'Back to Map',
    noSymptomsYet: 'No Symptoms Yet',
    noMatchesFound: 'No matches found',
    resultsTitle: 'Analysis Results',
    diagnosisMode: 'Diagnosis Mode',
    printPdf: 'Print PDF',
    startOver: 'Start Over',
    symptomsCount: (n) => `${n} Symptom(s) Selected`
  }
};

const SKIN_LABELS = {
  id: {
    normal: 'Normal',
    dry: 'Kering',
    oily: 'Berminyak',
    combination: 'Kombinasi',
    sensitive: 'Sensitif'
  },
  en: {
    normal: 'Normal',
    dry: 'Dry',
    oily: 'Oily',
    combination: 'Combination',
    sensitive: 'Sensitive'
  }
};

// ── Pulse Dots & Badges ─────────────────────────────────────
function updateRegionInteractions() {
  const isMale = state.sex === 'male';
  const isFront = state.currentView === 'front';
  let regions;
  if (isMale) { regions = isFront ? REGIONS_FRONT : REGIONS_BACK; }
  else { regions = isFront ? REGIONS_FEMALE_FRONT : REGIONS_FEMALE_BACK; }

  // Clear existing dots/badges
  document.querySelectorAll('.pulse-dot, .region-badge').forEach(el => el.remove());

  regions.forEach(r => {
    const count = state.symptoms[r.key] ? state.symptoms[r.key].size : 0;
    const container = document.getElementById('body-map-wrap');
    if(!container) return;
    
    // Calculate center for positioning (calibrated for 640x640)
    const pts = r.points.split(/\s+/).map(p => p.split(',').map(Number));
    let minX = 1000, maxX = 0, minY = 1000, maxY = 0;
    pts.forEach(([x, y]) => {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    });
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const posX = (cx / 640 * 100) + '%';
    const posY = (cy / 640 * 100) + '%';

    // 1. Add Pulsing Dot (only on main key points)
    const dot = document.createElement('div');
    dot.className = `pulse-dot ${count > 0 ? 'has-symptoms' : ''}`;
    dot.style.left = posX;
    dot.style.top = posY;
    container.appendChild(dot);

    // 2. Add Badge if symptoms selected
    if (count > 0) {
      const badge = document.createElement('div');
      badge.className = 'region-badge';
      badge.textContent = count;
      badge.style.left = posX;
      badge.style.top = posY;
      container.appendChild(badge);
    }
  });
}

// ── Intake Form ─────────────────────────────────────────────
function selectSex(s){
  state.sex = s;
  document.getElementById('sex-male').classList.toggle('active', s === 'male');
  document.getElementById('sex-female').classList.toggle('active', s === 'female');
  checkForm();
}
function selectDuration(btn){
  document.querySelectorAll('.dur-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  state.duration = btn.dataset.val;
  checkForm();
}
function checkForm(){
  state.age = document.getElementById('input-age').value.trim();
  state.skinType = document.getElementById('input-skin').value;
  state.disclaimer = document.getElementById('chk-disclaimer').checked;
  const ok = state.age && +state.age>0 && state.sex && state.skinType && state.duration && state.disclaimer;
  document.getElementById('btn-start').disabled = !ok;
}

// ── Disclaimer visual (Backwards compatibility) ───────────
function updateDisclaimerVisual(checked){
  // Logic handled by CSS in v6
}
document.addEventListener('DOMContentLoaded',()=>{
  const chk = document.getElementById('chk-disclaimer');
  if(chk) chk.addEventListener('change', function(){ checkForm(); });
});

// ── Preference Handlers ──────────────────────────────
function updateUIText() {
  const lang = state.language;
  const dict = I18N[lang];

  // Update elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  // Update elements with data-i18n-attr (e.g. placeholders)
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const attrPair = el.getAttribute('data-i18n-attr'); // "placeholder:key"
    const [attr, key] = attrPair.split(':');
    if (dict[key]) el.setAttribute(attr, dict[key]);
  });
}

function setLanguage(lang) {
  state.language = lang;
  localStorage.setItem('dn-lang', lang);
  
  // Update toggle buttons in header
  const btnId = document.getElementById('lang-id');
  const btnEn = document.getElementById('lang-en');
  if(btnId && btnEn) {
    btnId.className = lang === 'id' 
      ? 'px-3 py-1 text-[10px] font-bold rounded-full transition-all bg-white dark:bg-slate-700 shadow-sm text-teal-700' 
      : 'px-3 py-1 text-[10px] font-bold rounded-full transition-all text-slate-500';
    btnEn.className = lang === 'en' 
      ? 'px-3 py-1 text-[10px] font-bold rounded-full transition-all bg-white dark:bg-slate-700 shadow-sm text-teal-700' 
      : 'px-3 py-1 text-[10px] font-bold rounded-full transition-all text-slate-500';
  }

  updateUIText();
  
  // Re-render if in state where dynamic content exists
  if (state.results) buildResultsUI(state.results);
  renderBodyMap();
  updateFloatingPill();
}

function applyTheme() {
  // Always light mode as requested
  document.documentElement.classList.remove('dark');
}

// ── Lifecycle ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  setLanguage(state.language);
  
  // Pre-fill from quiz if exists
  const savedSkin = localStorage.getItem('dermanetra_skin_type');
  const skinEl = document.getElementById('input-skin');
  if (savedSkin && skinEl) {
    skinEl.value = savedSkin;
    state.skinType = savedSkin;
  }

  checkForm();
});

// ── Page Transitions ──────────────────────────────────────
function showPage(from, to){
  const fEl = document.getElementById('page-'+from);
  fEl.style.transition = 'opacity .3s ease,transform .3s ease';
  fEl.style.opacity = '0'; fEl.style.transform = 'translateY(-14px)';
  
  // Update Header State
  const meta = document.getElementById('header-meta');
  const badge = document.getElementById('header-mode-badge');
  const hActions = document.getElementById('header-actions');
  const btnPrint = document.getElementById('btn-header-print');
  const btnBack = document.getElementById('btn-header-back');
  const btnRestart = document.getElementById('btn-header-restart');
  const dict = I18N[state.language];

  if(to === 'intake') {
    if(meta) meta.classList.add('hidden');
    if(hActions) hActions.classList.add('hidden');
  } else {
    if(meta) meta.classList.remove('hidden');
    if(hActions) hActions.classList.remove('hidden');
    if(badge) {
      badge.classList.remove('hidden');
      badge.textContent = to === 'diagnosis' ? dict.diagnosisMode : dict.resultsTitle;
    }
  }

  if(to === 'results') {
    if(btnPrint) btnPrint.classList.remove('hidden');
    if(btnBack) btnBack.classList.remove('hidden');
    if(btnRestart) btnRestart.classList.add('hidden');
  } else if(to === 'diagnosis') {
    if(btnPrint) btnPrint.classList.add('hidden');
    if(btnBack) btnBack.classList.add('hidden');
    if(btnRestart) btnRestart.classList.remove('hidden');
  }

  setTimeout(()=>{
    fEl.classList.add('hidden');
    const tEl = document.getElementById('page-'+to);
    tEl.classList.remove('hidden');
    tEl.style.opacity = '0'; tEl.style.transform = 'translateY(14px)';
    requestAnimationFrame(()=>{
      tEl.style.transition = 'opacity .4s ease, transform .4s ease';
      tEl.style.opacity = '1'; tEl.style.transform = 'translateY(0)';
    });
  }, 280);
}

function startAnalysis(){
  state.symptoms = {};
  populatePatientInfo();
  showPage('intake','diagnosis');
  setTimeout(()=>renderBodyMap(), 380);
}
function resetAll(){
  Object.assign(state,{age:'',sex:'',skinType:'',duration:'',disclaimer:false,currentView:'front',activeRegion:null,symptoms:{},results:null});
  
  // Clear inputs
  document.getElementById('input-age').value = '';
  document.getElementById('input-skin').value = '';
  const chk = document.getElementById('chk-disclaimer');
  if(chk) chk.checked = false;
  
  document.querySelectorAll('.sex-btn,.dur-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('btn-start').disabled = true;
  
  // Reset body map view
  const slider = document.getElementById('toggle-slider');
  if(slider) slider.classList.remove('back');
  const lF = document.getElementById('lbl-front');
  const lB = document.getElementById('lbl-back');
  if(lF){ lF.classList.add('active'); }
  if(lB){ lB.classList.remove('active'); }
  
  // Navigation
  // If we are on results, go to intake
  // If we are on diagnosis, go to intake
  const from = !document.getElementById('page-results').classList.contains('hidden') ? 'results' : 'diagnosis';
  showPage(from, 'intake');
  
  const pill = document.querySelector('.floating-pill-wrap');
  if(pill) pill.classList.remove('visible');
}
function goBackToDiagnosis(){
  showPage('results','diagnosis');
  setTimeout(()=>renderBodyMap(), 380);
}

// ── Patient Info ──────────────────────────────────────────
const DUR_LABELS  = {lt3days:'< 3 Days','1to2weeks':'1–2 Weeks',gt1month:'> 1 Month'};
function populatePatientInfo(){
  const dict = I18N[state.language];
  const sL  = state.sex==='male' ? dict.male : dict.female;
  const skL = SKIN_LABELS[state.language][state.skinType] || state.skinType;
  const hp  = document.getElementById('header-patient');
  if(hp) hp.textContent = `${sL}, ${state.age} · ${skL}`;
}

// ═══════════════════════════════════════════════════════════
//  BODY MAP CONSTANTS — Calibrated for 640x640 PNGs
// ═══════════════════════════════════════════════════════════

// Male (front)
const REGIONS_FRONT = [
  {key:'head', label:'Head & Face', shape:'polygon', points:'320,25 340,32 347,65 335,95 320,100 305,95 293,65 300,32'},
  {key:'neck', label:'Neck', shape:'polygon', points:'305,100 335,100 350,128 320,131 290,128'},
  {key:'chest', label:'Chest', shape:'polygon', points:'320,131 350,128 380,135 390,185 365,196 320,198 275,196 250,185 260,135 290,128'},
  {key:'abdomen', label:'Abdomen', shape:'polygon', points:'275,196 320,198 365,196 360,240 365,275 320,280 275,275 280,240'},
  {key:'pelvis', label:'Pelvis & Groin', shape:'polygon', points:'275,275 320,280 365,275 375,300 320,335 265,300'},
  {key:'arms', label:'Right Arm', shape:'polygon', points:'260,180 250,135 225,220 200,310 220,310 245,220'},
  {key:'arms', label:'Left Arm', shape:'polygon', points:'380,180 395,220 420,310 440,310 415,220 390,135'},
  {key:'hands', label:'Right Hand', shape:'polygon', points:'200,310 180,330 180,355 195,360 215,355 220,310'},
  {key:'hands', label:'Left Hand', shape:'polygon', points:'440,310 460,330 460,355 445,360 425,355 420,310'},
  {key:'legs', label:'Right Leg', shape:'polygon', points:'310,335 305,430 295,565 270,565 265,430 265,300'},
  {key:'legs', label:'Left Leg', shape:'polygon', points:'330,335 375,300 375,430 370,565 345,565 335,430'},
  {key:'feet', label:'Right Foot', shape:'polygon', points:'270,565 260,605 280,615 295,595 295,565'},
  {key:'feet', label:'Left Foot', shape:'polygon', points:'370,565 345,565 345,595 360,615 380,605'},
];

// Male (back)
const REGIONS_BACK = [
  {key:'head', label:'Head (Back)', shape:'polygon', points:'320,25 340,32 347,65 335,95 320,100 305,95 293,65 300,32'},
  {key:'neck', label:'Neck (Back)', shape:'polygon', points:'305,100 335,100 350,128 320,131 290,128'},
  {key:'back', label:'Back', shape:'polygon', points:'320,131 350,128 380,135 390,185 365,196 320,198 275,196 250,185 260,135 290,128'},
  {key:'abdomen', label:'Lower Back', shape:'polygon', points:'275,196 320,198 365,196 360,240 365,275 320,280 275,275 280,240'},
  {key:'arms', label:'Right Arm', shape:'polygon', points:'260,180 250,135 225,220 200,310 220,310 245,220'},
  {key:'arms', label:'Left Arm', shape:'polygon', points:'380,180 395,220 420,310 440,310 415,220 390,135'},
  {key:'hands', label:'Right Hand', shape:'polygon', points:'200,310 180,330 180,355 195,360 215,355 220,310'},
  {key:'hands', label:'Left Hand', shape:'polygon', points:'440,310 460,330 460,355 445,360 425,355 420,310'},
  {key:'buttocks', label:'Buttocks', shape:'polygon', points:'275,275 320,280 365,275 375,300 320,335 265,300'},
  {key:'legs', label:'Right Leg', shape:'polygon', points:'310,335 305,430 295,565 270,565 265,430 265,300'},
  {key:'legs', label:'Left Leg', shape:'polygon', points:'330,335 375,300 375,430 370,565 345,565 335,430'},
  {key:'feet', label:'Right Foot', shape:'polygon', points:'270,565 260,605 280,615 295,595 295,565'},
  {key:'feet', label:'Left Foot', shape:'polygon', points:'370,565 345,565 345,595 360,615 380,605'},
];

// Female (front)
const REGIONS_FEMALE_FRONT = [
  {key:'head',    label:'Head & Face',    shape:'polygon', points:'320,34 308,38 297,48 294,65 295,81 299,94 310,102 320,105 330,102 341,94 345,81 346,65 343,48 332,38'},
  {key:'neck',    label:'Neck',           shape:'polygon', points:'308,105 306,116 304,128 312,132 320,133 328,132 336,128 334,116 332,105'},
  {key:'chest',   label:'Chest',          shape:'polygon', points:'278,130 272,155 270,185 276,202 300,204 320,204 340,204 364,202 370,185 368,155 362,130'},
  {key:'abdomen', label:'Abdomen',        shape:'polygon', points:'276,202 274,228 272,252 268,272 295,275 320,276 345,275 372,272 368,252 366,228 364,202'},
  {key:'pelvis',  label:'Pelvis & Groin', shape:'polygon', points:'268,272 278,292 292,310 308,325 320,330 332,325 348,310 362,292 372,272'},
  {key:'arms',    label:'Right Arm',      shape:'polygon', points:'372,128 388,158 396,198 414,250 424,296 430,304 418,310 402,278 389,232 374,192 370,152'},
  {key:'arms',    label:'Left Arm',       shape:'polygon', points:'268,128 252,158 244,198 226,250 216,296 210,304 222,310 238,278 251,232 266,192 270,152'},
  {key:'hands',   label:'Right Hand',     shape:'polygon', points:'420,308 422,330 426,354 436,364 448,362 454,350 454,324 430,306'},
  {key:'hands',   label:'Left Hand',      shape:'polygon', points:'220,308 218,330 214,354 204,364 192,362 186,350 186,324 210,306'},
  {key:'legs',    label:'Right Leg',      shape:'polygon', points:'376,340 374,395 368,460 360,522 350,568 338,574 326,568 322,500 324,450 326,400 328,340'},
  {key:'legs',    label:'Left Leg',       shape:'polygon', points:'264,340 266,395 272,460 280,522 290,568 302,574 314,568 318,500 316,450 314,400 312,340'},
  {key:'feet',    label:'Right Foot',     shape:'polygon', points:'340,572 338,600 354,614 370,610 356,576'},
  {key:'feet',    label:'Left Foot',      shape:'polygon', points:'300,572 302,600 286,614 270,610 284,576'},
];

// Female (back)
const REGIONS_FEMALE_BACK = [
  {key:'head',    label:'Head (Back)',    shape:'polygon', points:'320,20 305,30 292,46 288,64 292,84 306,96 320,100 334,96 348,84 352,64 348,46 335,30'},
  {key:'neck',    label:'Neck (Back)',    shape:'polygon', points:'310,98 306,112 312,122 320,125 328,122 334,112 330,98'},
  {key:'back',    label:'Back',           shape:'polygon', points:'265,122 266,155 274,184 300,186 320,185 340,186 366,184 374,155 375,122'},
  {key:'abdomen', label:'Lower Back',     shape:'polygon', points:'268,202 270,240 266,278 294,280 320,282 346,280 374,278 370,240 372,202'},
  {key:'pelvis',  label:'Buttocks',       shape:'polygon', points:'266,276 260,310 258,332 264,342 294,346 320,348 346,346 376,342 382,332 380,310 374,276'},
  {key:'arms',    label:'Right Arm',      shape:'polygon', points:'380,130 394,154 402,206 412,258 416,312 408,312 392,264 382,212 370,152'},
  {key:'arms',    label:'Left Arm',       shape:'polygon', points:'260,130 246,154 238,206 228,258 224,312 232,312 248,264 258,212 270,152'},
  {key:'hands',   label:'Right Hand',     shape:'polygon', points:'404,314 402,340 406,364 414,370 420,358 422,330 418,314'},
  {key:'hands',   label:'Left Hand',      shape:'polygon', points:'236,314 238,340 234,364 226,370 220,358 218,330 222,314'},
  {key:'legs',    label:'Right Leg',      shape:'polygon', points:'378,346 374,410 368,472 360,535 350,578 338,584 326,578 320,535 322,472 324,410 328,346'},
  {key:'legs',    label:'Left Leg',       shape:'polygon', points:'262,346 266,410 272,472 280,535 290,578 302,584 314,578 320,535 318,472 316,410 312,346'},
  {key:'feet',    label:'Right Foot',     shape:'polygon', points:'340,582 338,608 352,618 364,612 352,586'},
  {key:'feet',    label:'Left Foot',      shape:'polygon', points:'300,582 302,608 288,618 276,612 288,586'},
];

// ── Region Helper Logic ────────────────────────────────────
function regionHasSymptoms(key){ return state.symptoms[key] && state.symptoms[key].size>0; }
function regionFill(key)  { return regionHasSymptoms(key) ? 'rgba(8,145,178,0.15)' : 'rgba(255,255,255,0.01)'; }
function regionStroke(key){ return regionHasSymptoms(key) ? '#0891b2' : 'rgba(0,0,0,0)'; }

// Returns the merged key-set for a given region key, or just [key] if standalone
function getMergedKeys(key){
  const groups = [ { keys: ['arms', 'hands'] }, { keys: ['legs', 'feet'] } ];
  for(const g of groups){
    if(g.keys.includes(key)) return g.keys;
  }
  return [key];
}

// ── Render Body Map ────────────────────────────────────────
function renderBodyMap(){
  const isMale  = state.sex === 'male';
  const isFront = state.currentView === 'front';
  const imgSrc  = isMale
    ? (isFront ? 'assets/images/male_front.png'   : 'assets/images/male_back.png')
    : (isFront ? 'assets/images/female_front.png' : 'assets/images/female_back.png');

  let regions;
  if(isMale)  { regions = isFront ? REGIONS_FRONT : REGIONS_BACK; }
  else        { regions = isFront ? REGIONS_FEMALE_FRONT : REGIONS_FEMALE_BACK; }

  const container = document.getElementById('body-map-container');
  container.innerHTML = '';
  container.style.position = 'relative';

  const wrap = document.createElement('div');
  wrap.id = 'body-map-wrap';
  wrap.style.cssText = 'position:relative; width:100%; height:100%; aspect-ratio:1/1; max-height:100%; margin:0 auto; cursor:default;';

  const img = document.createElement('img');
  img.src = imgSrc; img.alt = 'Body diagram';
  img.style.cssText = 'width:100%;height:100%;display:block;object-fit:contain;object-position:top center;mix-blend-mode:multiply;filter:drop-shadow(0 20px 40px rgba(0,0,0,0.18)) contrast(1.05);';
  
  img.onerror = ()=>{ img.style.display = 'none'; };

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS,'svg');
  svg.setAttribute('viewBox','0 0 640 640');
  svg.setAttribute('preserveAspectRatio','xMidYMin meet');
  svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:all;z-index:10;';

  const shapesByKey = {};

  regions.forEach(r => {
    const g = document.createElementNS(svgNS,'g');
    g.style.cursor = 'pointer';

    const shape = document.createElementNS(svgNS,'polygon');
    shape.setAttribute('points', r.points);
    shape.setAttribute('fill', regionFill(r.key));
    shape.setAttribute('stroke', regionStroke(r.key));
    shape.setAttribute('stroke-width','1.2');
    shape.style.transition = 'fill .2s ease, stroke .2s ease, filter .2s ease';
    g.appendChild(shape);
    svg.appendChild(g);

    if(!shapesByKey[r.key]) shapesByKey[r.key] = [];
    shapesByKey[r.key].push({ shape, key: r.key, label: r.label });

    // Events
    g.addEventListener('mouseenter', e=>{
      const groupKeys = getMergedKeys(r.key);
      groupKeys.forEach(k => {
        if(shapesByKey[k]) shapesByKey[k].forEach(s => {
          s.shape.setAttribute('fill','rgba(8,145,178,0.18)');
          s.shape.setAttribute('stroke','#0891b2');
          s.shape.style.filter = 'drop-shadow(0 0 8px rgba(8,145,178,0.4))';
        });
      });
      showTooltip(r.label, e);
    });

    g.addEventListener('mousemove', e=>showTooltip(r.label, e));

    g.addEventListener('mouseleave', ()=>{
      const groupKeys = getMergedKeys(r.key);
      groupKeys.forEach(k => {
        if(shapesByKey[k]) shapesByKey[k].forEach(s => {
          s.shape.setAttribute('fill', regionFill(s.key));
          s.shape.setAttribute('stroke', regionStroke(s.key));
          s.shape.style.filter = 'none';
        });
      });
      hideTooltip();
    });

    g.addEventListener('click', ()=>{ hideTooltip(); openModal(r.key); });
  });

  wrap.appendChild(img);
  wrap.appendChild(svg);
  container.appendChild(wrap);

  updateRegionInteractions();
  updateFloatingPill();
}

// ── Pill Tooltip ──────────────────────────────────────────
function showTooltip(text, e){
  const t = document.getElementById('tooltip');
  t.textContent = text.toUpperCase();
  t.style.opacity = '1';
  t.style.left = (e.clientX + 14) + 'px';
  t.style.top  = (e.clientY - 38) + 'px';
}
function hideTooltip(){
  document.getElementById('tooltip').style.opacity = '0';
}

// ── View Toggle ───────────────────────────────────────────
function toggleView(){
  state.currentView = state.currentView==='front' ? 'back' : 'front';
  const slider = document.getElementById('toggle-slider');
  const lF = document.getElementById('lbl-front');
  const lB = document.getElementById('lbl-back');
  if(state.currentView==='back'){
    slider.classList.add('back'); lF.classList.remove('active'); lB.classList.add('active');
  } else {
    slider.classList.remove('back'); lF.classList.add('active'); lB.classList.remove('active');
  }
  renderBodyMap();
}

// ── Floating Action Bar ──────────────────────────────────
function updateFloatingPill() {
  const pill = document.querySelector('.floating-pill-wrap');
  if(!pill) return;
  
  const countLabel = document.getElementById('floating-count');
  const btn = document.getElementById('btn-analyze');
  const dict = I18N[state.language];

  // Only show if we are NOT on the results page
  const isResultsPage = !document.getElementById('page-results').classList.contains('hidden');
  
  let total = 0;
  for (let k in state.symptoms) total += state.symptoms[k].size;

  if (total > 0 && !isResultsPage) {
    pill.classList.add('visible');
    countLabel.textContent = dict.symptomsCount(total);
    btn.disabled = false;
  } else {
    pill.classList.remove('visible');
    countLabel.textContent = dict.noSymptoms;
    btn.disabled = true;
  }
  
  updateSelectedSymptomsPanel();
}

// ── Selected Symptoms Panel ──────────────────────────────
function updateSelectedSymptomsPanel() {
  const panel = document.getElementById('selected-symptoms-panel');
  const listEl = document.getElementById('selected-symptoms-list');
  if (!panel || !listEl) return;

  const isResultsPage = !document.getElementById('page-results').classList.contains('hidden');
  
  let total = 0;
  const allSelectedIds = [];
  
  for (let k in state.symptoms) {
    total += state.symptoms[k].size;
    state.symptoms[k].forEach(id => {
      allSelectedIds.push(id);
    });
  }

  if (total > 0 && !isResultsPage) {
    panel.classList.remove('hidden');
    panel.classList.add('show');
    
    listEl.innerHTML = '';
    
    allSelectedIds.forEach((id) => {
      const name = SYMPTOM_MAP[id] || `Gejala ${id}`;
      const li = document.createElement('li');
      li.innerHTML = `<div class="sym-bullet"></div> <span>${name}</span>`;
      listEl.appendChild(li);
    });
  } else {
    panel.classList.add('hidden');
    panel.classList.remove('show');
  }
}

// ═══════════════════════════════════════════════════════════
//  SYMPTOM SIDE DRAWER (v6)
// ═══════════════════════════════════════════════════════════
let _currentModalSyms = [];
let _tempSelected = new Set();

function openModal(regionKey){
  if(regionKey==='groin') regionKey='pelvis';
  state.activeRegion = regionKey;
  const db = SYMPTOM_DB[regionKey];
  if(!db) return;

  const syms = (db[state.currentView]&&db[state.currentView].length) ? db[state.currentView] : (db.front||[]);
  _currentModalSyms = syms;
  
  // Clone existing symptoms to temp set for persistence during modal session
  const existing = state.symptoms[regionKey] || new Set();
  _tempSelected = new Set(existing);

  document.getElementById('modal-region').textContent = db.label;
  document.getElementById('modal-view-badge').textContent = state.currentView==='front' ? I18N[state.language].viewFront : I18N[state.language].viewBack;

  const searchEl = document.getElementById('modal-search');
  if(searchEl) searchEl.value = '';

  renderModalSymptoms(syms, _tempSelected, '');

  document.getElementById('symptom-modal').classList.add('open');
  document.getElementById('modal-overlay').classList.add('open');
  if(searchEl) setTimeout(()=>searchEl.focus(), 300);
}

function renderModalSymptoms(syms, existing, query){
  const list = document.getElementById('modal-symptom-list');
  list.innerHTML = '';
  const rKey = state.activeRegion;
  const dict = I18N[state.language];

  if(!syms.length || (typeof syms[0]==='string' && syms[0].startsWith('Referred'))){
    list.innerHTML = `<div style="text-align:center;padding:48px 20px;color:#94a3b8;">
      <svg style="width:40px;height:40px;margin:0 auto 16px;opacity:0.4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/></svg>
      <p style="font-size:14px;line-height:1.5">This region is best viewed from the <strong>${state.currentView==='front'?dict.viewBack.toUpperCase():dict.viewFront.toUpperCase()}</strong> side.<br>Please toggle the view and try again.</p>
    </div>`;
    document.getElementById('modal-add-btn').style.display = 'none';
    return;
  }
  document.getElementById('modal-add-btn').style.display = 'block';

  const q = query.toLowerCase().trim();
  const filtered = q ? syms.filter(s=>s.name.toLowerCase().includes(q)) : syms;

  if(!filtered.length){
    list.innerHTML = `<div style="text-align:center;padding:32px;color:#94a3b8;font-size:14px;">${dict.noMatchesFound.replace('{query}', `<strong>${query}</strong>`)}</div>`;
    return;
  }

  filtered.forEach((sym,i)=>{
    const elemId = `msym-${rKey}-${i}`;
    const div = document.createElement('div');
    div.className = 'sym-check-item';
    const isChecked = _tempSelected.has(sym.id);
    
    div.innerHTML = `
      <input type="checkbox" id="${elemId}" value="${sym.id}" ${isChecked?'checked':''}/>
      <label for="${elemId}">
        <span class="sym-check-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <span>${sym.name}</span>
      </label>`;
    
    const input = div.querySelector('input');
    input.addEventListener('change', (e) => {
      const val = parseInt(e.target.value) || e.target.value;
      if(e.target.checked) _tempSelected.add(val);
      else _tempSelected.delete(val);
      updateModalSelectedCount();
    });
    list.appendChild(div);
  });

  updateModalSelectedCount();
}

function filterSymptoms(query){
  renderModalSymptoms(_currentModalSyms, _tempSelected, query);
}

function updateModalSelectedCount(){
  const countEl = document.getElementById('modal-selected-count');
  const btn = document.getElementById('modal-add-btn');
  const dict = I18N[state.language];

  if(countEl){
    if(_tempSelected.size > 0){
      countEl.textContent = dict.symptomsCount(_tempSelected.size);
      countEl.classList.remove('hidden');
    } else {
      countEl.classList.add('hidden');
    }
  }
  if(btn) btn.textContent = _tempSelected.size > 0 ? `${dict.addBtn} (${_tempSelected.size})` : dict.addBtn;
}

function closeModal(){
  document.getElementById('symptom-modal').classList.remove('open');
  document.getElementById('modal-overlay').classList.remove('open');
  state.activeRegion = null;
  _currentModalSyms = [];
}

function confirmModal(){
  if(!state.activeRegion) return;
  
  if(_tempSelected.size > 0) {
    state.symptoms[state.activeRegion] = new Set(_tempSelected);
  } else {
    delete state.symptoms[state.activeRegion];
  }
  
  closeModal();
  renderBodyMap();
}

// ── Analyze Flow ─────────────────────────────────────────
async function analyzeCondition(){
  const allIds = [];
  Object.values(state.symptoms).forEach(s => s.forEach(id => allIds.push(id)));
  if(!allIds.length) return;

  const pill = document.querySelector('.floating-pill-wrap');
  if(pill) pill.classList.remove('visible');
  
  showPage('diagnosis','results');

  let apiResults = null;
  try {
    const resp = await fetchDiagnosis(allIds);
    if(resp && resp.results) apiResults = resp.results;
  } catch(e) { console.error('[DermaNetra] API Error:', e); }
  
  state.results = apiResults;
  setTimeout(()=>renderResults(apiResults), 380);
}

function renderResults(results){
  const loadEl    = document.getElementById('results-loading');
  const contentEl = document.getElementById('results-content');
  loadEl.classList.remove('hidden');
  contentEl.classList.add('hidden');
  
  setTimeout(()=>{
    loadEl.classList.add('hidden');
    contentEl.classList.remove('hidden');
    buildResultsUI(results);
    contentEl.style.opacity = '0';
    requestAnimationFrame(()=>{ contentEl.style.transition='opacity .6s ease-out'; contentEl.style.opacity='1'; });
  }, 2200);
}

// ── Circular Gauge Generator ──────────────────────────────
function getCircularGauge(percentage) {
  const dash = (percentage / 100) * 100; // Stroke dasharray value
  const lang = state.language;
  const dict = I18N[lang];
  
  const risk = percentage >= 80 ? 'high' : (percentage >= 40 ? 'med' : 'low');
  const riskLabel = percentage >= 80 ? dict.confidenceHigh : (percentage >= 40 ? dict.confidenceMed : dict.confidenceLow);

  return `
    <div class="confidence-gauge">
      <svg class="gauge-svg" viewBox="0 0 36 36">
        <path class="gauge-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
        <path class="gauge-fill risk-${risk}" stroke-dasharray="${dash}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
      </svg>
      <div class="gauge-label">
        <span class="gauge-percent">${percentage.toFixed(2)}%</span>
        <span class="gauge-sub">${riskLabel}</span>
      </div>
    </div>`;
}

// ── Blueprint Report Visualization Generator ──────────────────
function getReportVisualization() {
  const isMale = state.sex === 'male';
  const dict = I18N[state.language];
  
  const generateMiniBody = (isFront) => {
    const regions = isMale 
      ? (isFront ? REGIONS_FRONT : REGIONS_BACK) 
      : (isFront ? REGIONS_FEMALE_FRONT : REGIONS_FEMALE_BACK);
    
    // ... same as before but with translated labels
    const imgSrc = isMale
      ? (isFront ? 'assets/images/male_front.png' : 'assets/images/male_back.png')
      : (isFront ? 'assets/images/female_front.png' : 'assets/images/female_back.png');
    
    let svgContent = '';
    regions.forEach(r => {
      const hasSym = state.symptoms[r.key] && state.symptoms[r.key].size > 0;
      const fill = hasSym ? 'rgba(8,145,178,0.5)' : 'rgba(0,0,0,0.02)';
      const stroke = hasSym ? '#0891b2' : 'rgba(0,0,0,0.05)';
      svgContent += `<polygon points="${r.points}" fill="${fill}" stroke="${stroke}" stroke-width="2" />`;
    });

    return `
      <div class="report-body-mini">
        <img src="${imgSrc}" />
        <svg viewBox="0 0 640 640">${svgContent}</svg>
        <div style="position:absolute;bottom:4px;width:100%;text-align:center;font-size:8px;font-weight:800;text-transform:uppercase;color:#94a3b8">${isFront ? dict.viewFront : dict.viewBack}</div>
      </div>`;
  };

  return `
    <div class="report-visualization flex flex-row gap-3 justify-center items-center py-2">
      ${generateMiniBody(true)}
      ${generateMiniBody(false)}
    </div>`;
}

// ── Symptom Match Analysis (Fase 1) ────────────────────────
function buildSymptomMatchSection(diseaseId, userSymptomIds) {
  const lt = (typeof LIKELIHOOD_TABLE !== 'undefined') ? LIKELIHOOD_TABLE[diseaseId] : null;
  if (!lt) return '';

  const strong = [], partial = [], none = [];
  
  userSymptomIds.forEach(sid => {
    const name = SYMPTOM_MAP[sid] || `Gejala ${sid}`;
    const prob = lt[sid];
    if (prob === undefined || prob < 0.2) {
      none.push({ sid, name, prob: prob || 0 });
    } else if (prob >= 0.7) {
      strong.push({ sid, name, prob });
    } else {
      partial.push({ sid, name, prob });
    }
  });

  // Profile context notes
  const profileNotes = [];
  const skinLabels = { dry: 'Kulit Kering', oily: 'Kulit Berminyak', sensitive: 'Kulit Sensitif', combination: 'Kulit Kombinasi', normal: 'Kulit Normal' };
  if (state.skinType && state.skinType !== 'normal') {
    profileNotes.push(`<div class="match-profile-item"><span class="match-icon-profile">👤</span> <span><strong>${skinLabels[state.skinType] || state.skinType}</strong> — Dapat memengaruhi sensitivitas dan respons kulit terhadap kondisi ini.</span></div>`);
  }
  if (state.duration) {
    const durLabels = { lt3days: '< 3 Hari (Akut)', '1to2weeks': '1-2 Minggu', gt1month: '> 1 Bulan (Kronik)' };
    profileNotes.push(`<div class="match-profile-item"><span class="match-icon-profile">⏱️</span> <span>Durasi <strong>${durLabels[state.duration] || state.duration}</strong></span></div>`);
  }

  const renderItem = (item, cls, icon) => 
    `<div class="match-item ${cls}"><span class="match-icon">${icon}</span><div class="match-text"><span class="match-name">${item.name}</span><span class="match-prob">P(G|D) = ${(item.prob * 100).toFixed(0)}%</span></div></div>`;

  let html = `
    <div class="symptom-match-card section-card bg-white border border-slate-100 p-6 rounded-2xl shadow-sm my-8 animate-fade">
      <h3 class="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
        <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
        🔬 Kenapa Sistem Memilih Ini?
      </h3>
      <p class="text-xs text-slate-500 mb-4">Analisis kecocokan antara gejala yang Anda pilih dan gejala khas penyakit ini berdasarkan tabel probabilitas P(Gejala | Penyakit).</p>
      <div class="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Gejala Anda (${userSymptomIds.length}):</div>
      <div class="match-list">`;

  if (strong.length) {
    html += strong.map(s => renderItem(s, 'match-strong', '✅')).join('');
  }
  if (partial.length) {
    html += partial.map(s => renderItem(s, 'match-partial', '🟡')).join('');
  }
  if (none.length) {
    html += none.map(s => renderItem(s, 'match-none', '⚪')).join('');
  }

  html += `</div>`;

  if (profileNotes.length) {
    html += `<div class="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4">Latar Belakang Anda:</div>
      <div class="match-profile-list">${profileNotes.join('')}</div>`;
  }

  html += `</div>`;
  return html;
}

// ── Triage Badge (Fase 3) ─────────────────────────────────
function getTriageBadge(diseaseId) {
  const db = (typeof DISEASE_DB !== 'undefined' && DISEASE_DB[diseaseId]) || {};
  const level = db.triage_level || 'gp_visit';
  const note = db.triage_note || '';

  const config = {
    home_care:   { label: '🟢 Perawatan Mandiri', cls: 'triage-home',       desc: 'Cukup dirawat di rumah dengan saran berikut' },
    gp_visit:    { label: '🟡 Dokter Umum',       cls: 'triage-gp',         desc: 'Jadwalkan kunjungan dalam 2–3 hari' },
    specialist:  { label: '🟠 Dokter Spesialis',   cls: 'triage-specialist', desc: 'Temui dokter spesialis kulit dalam 24 jam' },
    emergency:   { label: '🔴 Gawat Darurat',      cls: 'triage-emergency',  desc: 'Segera ke rumah sakit / UGD' },
  };

  const c = config[level] || config.gp_visit;
  return `
    <div class="triage-badge ${c.cls}">
      <div class="flex flex-col gap-1">
        <span class="triage-label">${c.label}</span>
        <span class="triage-desc">${note || c.desc}</span>
      </div>
      <button onclick="window.open('https://www.google.com/maps/search/klinik+kulit+terdekat','_blank')" class="ml-auto bg-white/20 hover:bg-white/30 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        Cari Dokter Terdekat
      </button>
    </div>`;
}

// ── Red Flags Checklist (Fase 4) ──────────────────────────
function buildRedFlagsSection(diseaseId) {
  const db = (typeof DISEASE_DB !== 'undefined' && DISEASE_DB[diseaseId]) || {};
  const flags = db.red_flags;
  if (!flags || !flags.length) return '';

  const items = flags.map(f => `<li><span class="red-flag-icon">🚩</span> ${f}</li>`).join('');

  return `
    <div class="red-flags-card section-card p-6 rounded-2xl shadow-sm my-8 animate-fade">
      <h3 class="font-bold border-b pb-3 mb-4 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        Monitor Kondisi Anda!
      </h3>
      <p class="text-xs mb-4 opacity-80">Segera batalkan perawatan mandiri dan cari bantuan medis darurat jika mengalami:</p>
      <ul class="red-flags-list">${items}</ul>
    </div>`;
}

// ── Personalized Treatment Notes (Fase 5) ─────────────────
function getPersonalizedNotes(diseaseId) {
  const notes = [];
  const skin = state.skinType;
  const dur = state.duration;
  const age = parseInt(state.age) || 0;

  // Skin-type based notes
  if (skin === 'dry') {
    notes.push('Karena kulit Anda <strong>kering</strong>, gunakan pelembap hypoallergenic secara rutin dan hindari sabun yang mengandung antiseptik keras.');
    if (['D018','D002','D015'].includes(diseaseId)) {
      notes.push('Gunakan pelembap tebal (ointment-based) segera setelah kompres dingin untuk mengunci kelembapan.');
    }
  } else if (skin === 'oily') {
    notes.push('Karena kulit Anda <strong>berminyak</strong>, gunakan pembersih dengan basis air dan hindari produk yang terlalu berat/oklusif.');
    if (['D003','D011'].includes(diseaseId)) {
      notes.push('Cuci area yang terkena dengan sabun antiseptik ringan (chlorhexidine) 2× sehari.');
    }
  } else if (skin === 'sensitive') {
    notes.push('Kulit <strong>sensitif</strong> Anda mungkin bereaksi terhadap banyak produk. Lakukan patch test sebelum menggunakan obat topikal baru.');
  }

  // Duration-based notes
  if (dur === 'lt3days') {
    notes.push('Kondisi Anda masih <strong>fase akut (< 3 hari)</strong>. Respons terhadap OTC umumnya baik jika ditangani segera.');
  } else if (dur === 'gt1month') {
    notes.push('Durasi > 1 bulan menunjukkan kondisi mungkin sudah <strong>kronik</strong>. Pertimbangkan konsultasi dokter spesialis kulit untuk evaluasi lebih lanjut.');
  }

  // Age-based notes
  if (age < 12) {
    notes.push('Untuk anak-anak, konsultasikan dosis dan jenis obat dengan dokter anak terlebih dahulu.');
  } else if (age > 60) {
    notes.push('Untuk usia lanjut, perhatikan interaksi obat dan pertimbangkan konsultasi dokter untuk penyesuaian dosis.');
  }
  if (!notes.length) return '';

  return `
    <div class="personalized-note-card p-4 rounded-xl mt-4">
      <div class="text-[10px] font-black uppercase tracking-widest text-purple-700 mb-2 flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        Saran Khusus untuk Profil Anda
      </div>
      <ul class="text-sm text-slate-700 space-y-2">${notes.map(n => `<li class="flex gap-2"><span class="text-purple-500 mt-0.5">💡</span><span>${n}</span></li>`).join('')}</ul>
    </div>`;
}

// ── Medical Constants ─────────────────────────────────────
const DISEASE_SLUGS = {
  'D001': 'seborrhoeic-dermatitis', 'D002': 'atopic-dermatitis', 'D003': 'folliculitis',
  'D004': 'scabies', 'D005': 'miliaria', 'D006': 'psoriasis-vulgaris', 'D007': 'tinea-capitis',
  'D008': 'head-lice', 'D009': 'impetigo', 'D010': 'alopecia-areata', 'D011': 'acne-vulgaris',
  'D012': 'melasma', 'D013': 'rosacea', 'D014': 'pityriasis-versicolor', 'D015': 'contact-dermatitis',
  'D016': 'milia', 'D017': 'herpes-simplex', 'D018': 'urticaria', 'D019': 'molluscum-contagiosum',
  'D020': 'tinea-corporis', 'D021': 'candida', 'D022': 'tinea-cruris', 'D023': 'erythrasma',
  'D024': 'ecthyma', 'D025': 'hidradenitis-suppurativa', 'D026': 'intertrigo',
  'D027': 'granuloma-inguinale', 'D028': 'dyshidrotic-eczema', 'D029': 'tinea-manuum',
  'D030': 'leprosy', 'D031': 'cellulitis', 'D032': 'pityriasis-rosea', 'D033': 'viral-wart',
  'D034': 'paronychia', 'D035': 'tinea-pedis', 'D036': 'cutaneous-larva-migrans',
  'D037': 'discoid-eczema', 'D038': 'arthropod-bites-and-stings', 'D039': 'onychomycosis',
  'D040': 'pitted-keratolysis', 'D041': 'corn-and-callus', 'D042': 'herpes-zoster'
};

const MEDICAL_SVG_FALLBACK = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjUwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2Y4ZmFmYyIvPjxwYXRoIGQ9Ik0xODAgMTAwbDIwIDIwIDUwLTUwIiBzdHJva2U9IiM5NGEzYjgiIHN0cm9rZS13aWR0aD0iMTAiIGZpbGw9Im5vbmUiLz48dGV4dCB4PSI1MCUiIHk9Ijc1JSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NDc0OGIiPkFzc2V0cyBUZXJwcm90ZWtzaSBMaW5rIFRlcmxhbXBpcjwvdGV4dD48L3N2Zz4=";

function getClinicalGallery(diseaseId, diseaseName) {
  const slug = DISEASE_SLUGS[diseaseId] || diseaseName.toLowerCase().replace(/ /g, '-');
  const topicUrl = `https://dermnetnz.org/topics/${slug}`;
  
  // Disease-category color mapping for the SVG placeholder
  const fungal  = ['D001','D007','D014','D020','D021','D022','D029','D035','D039'];
  const viral   = ['D008','D017','D019','D033','D036','D042'];
  const bacterial = ['D003','D009','D023','D024','D031','D040'];
  const inflammatory = ['D002','D006','D013','D015','D028','D037'];
  
  let svgColor = '#0891b2'; let svgBg = '#ecfeff'; let catLabel = 'Dermatologi';
  if (fungal.includes(diseaseId))      { svgColor = '#10b981'; svgBg = '#ecfdf5'; catLabel = 'Mikologi'; }
  else if (viral.includes(diseaseId))  { svgColor = '#8b5cf6'; svgBg = '#f5f3ff'; catLabel = 'Virologi'; }
  else if (bacterial.includes(diseaseId)) { svgColor = '#ef4444'; svgBg = '#fef2f2'; catLabel = 'Bakteriologi'; }
  else if (inflammatory.includes(diseaseId)) { svgColor = '#f59e0b'; svgBg = '#fffbeb'; catLabel = 'Imunologi'; }
  
  // Beautiful SVG medical illustration placeholder
  const placeholderSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 220' width='400' height='220'>
    <rect width='400' height='220' fill='${svgBg}'/>
    <circle cx='200' cy='90' r='52' fill='none' stroke='${svgColor}' stroke-width='2.5' stroke-dasharray='8 4' opacity='0.4'/>
    <circle cx='200' cy='90' r='35' fill='${svgColor}' opacity='0.08'/>
    <path d='M178 90 l14 14 l28-28' stroke='${svgColor}' stroke-width='3.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/>
    <rect x='145' y='155' width='110' height='26' rx='13' fill='${svgColor}' opacity='0.1'/>
    <text x='200' y='173' text-anchor='middle' font-family='system-ui,sans-serif' font-size='10' font-weight='700' fill='${svgColor}' letter-spacing='2' text-transform='uppercase'>${catLabel.toUpperCase()}</text>
    <circle cx='80' cy='60' r='18' fill='${svgColor}' opacity='0.05'/>
    <circle cx='320' cy='130' r='24' fill='${svgColor}' opacity='0.05'/>
    <circle cx='340' cy='50' r='10' fill='${svgColor}' opacity='0.07'/>
    <circle cx='60' cy='160' r='14' fill='${svgColor}' opacity='0.07'/>
  </svg>`;
  
  const placeholderDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(placeholderSvg);
  const imgUrl = `https://dermnetnz.org/assets/Uploads/${slug}-1__FocusFillWzYwMCw0MDAsIm9wZW4iLDBd.jpg`;
  
  return `
    <div class="clinical-gallery-card section-card bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm mb-0">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <h3 class="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
          <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          Galeri Referensi
        </h3>
        <a href="${topicUrl}" target="_blank" class="text-[9px] font-black text-primary hover:scale-105 transition-all flex items-center gap-1 bg-primary/5 px-3 py-1 rounded-full border border-primary/15 uppercase tracking-tighter">
          DermNet →
        </a>
      </div>

      <div class="medical-gallery-frame rounded-2xl overflow-hidden border border-slate-100 relative" style="background:${svgBg}; min-height:160px;">
        <img src="${imgUrl}" referrerpolicy="no-referrer" loading="lazy" 
          onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');"
          class="w-full object-cover" style="max-height:180px;" />
        <div class="hidden flex flex-col items-center justify-center p-6 text-center" style="min-height:160px;">
          <img src="${placeholderDataUrl}" class="w-full rounded-xl" alt="Ilustrasi medis ${diseaseName}" />
          <p class="text-[9px] font-bold uppercase tracking-widest mt-3" style="color:${svgColor}; opacity:0.7">${diseaseName}</p>
        </div>
      </div>
      
      <a href="${topicUrl}" target="_blank" class="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:opacity-80" style="background:${svgBg}; color:${svgColor}; border:1px solid ${svgColor}30">
        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        Lihat di DermNet NZ
      </a>
    </div>`;
}

function buildFeedbackSection() {
  return `
    <div class="feedback-card bg-white border border-slate-100 p-8 rounded-[2rem] shadow-xl text-center max-w-lg w-full animate-fade">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-4 font-serif italic text-xl font-black shadow-inner">DN</div>
      <h3 class="text-xl font-black text-slate-900 mb-3 tracking-tight">${state.language === 'id' ? 'Apakah diagnosis ini membantu?' : 'Was this diagnosis helpful?'}</h3>
      <p class="text-slate-500 mb-6 leading-relaxed text-xs font-medium">
        ${state.language === 'id' 
          ? 'Masukan Anda membantu kami meningkatkan akurasi sistem pakar ini.' 
          : 'Your feedback helps us improve the accuracy of this clinical engine.'}
      </p>
      <div class="flex gap-3 justify-center">
        <button onclick="this.parentElement.innerHTML='<div class=\'text-green-600 font-black py-2 animate-bounce text-[10px] tracking-widest uppercase\'>✨ TERIMA KASIH!</div>'" 
                class="flex-1 max-w-[140px] py-3 bg-primary text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95">
          ${state.language === 'id' ? 'Ya, Akurat' : 'Yes'}
        </button>
        <button onclick="this.parentElement.innerHTML='<div class=\'text-slate-500 font-black py-2 animate-bounce text-[10px] tracking-widest uppercase\'>🙏 TERIMA KASIH.</div>'" 
                class="flex-1 max-w-[140px] py-3 bg-white border-2 border-slate-100 text-slate-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-50 hover:scale-105 transition-all active:scale-95">
          ${state.language === 'id' ? 'Kurang Tepat' : 'No'}
        </button>
      </div>
    </div>`;
}

// ── Build Results UI (PROFESSIONAL 3-COLUMN DASHBOARD) ─────────
function buildResultsUI(results){
  const el = document.getElementById('results-content');
  if(!el) return;
  const dict = I18N[state.language];

  try {
    if(!results || !results.length){
      el.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 animate-fade text-center">
          <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6">
             <svg class="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <h3 class="text-xl font-bold text-slate-800">${dict.noMatchesFound}</h3>
          <button onclick="resetAll()" class="mt-4 px-8 py-3 bg-primary text-white rounded-xl font-black tracking-widest uppercase text-xs hover:scale-105 transition-all shadow-xl">Ulangi Analisis</button>
        </div>`;
      return;
    }

    const p = results[0];
    const alts = results.slice(1, 4);
    const db = (typeof DISEASE_DB !== 'undefined' && DISEASE_DB[p.disease_id]) || {};
    const t = db.treatments || {otc:[],prescription:[],lifestyle:[],see_doctor:'Consult a medical professional.'};

    const allUserSymptomIds = [];
    Object.values(state.symptoms).forEach(s => s.forEach(id => allUserSymptomIds.push(id)));

    const _getV = (v) => v ? (typeof v === 'string' ? v : (Array.isArray(v) ? v : (v[state.language] || v['id'] || v))) : '';
    const _lst = (arrOrObj) => {
      const data = _getV(arrOrObj);
      if (!data || !Array.isArray(data)) return `<li>${dict.notSpecified || 'Tidak spesifik.'}</li>`;
      return data.length ? data.map(x=>`<li>${x}</li>`).join('') : `<li>None.</li>`;
    };

    let out = `
      <div class="w-full max-w-[1920px] mx-auto px-6 py-6 animate-fade">
        
        <!-- Compact Context Header -->
        <div class="flex justify-center mb-8">
           <span class="bg-white px-6 py-2.5 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] shadow-sm border border-slate-100 ring-1 ring-slate-50 italic">
              ${state.sex==='male' ? dict.contextMale : dict.contextFemale} • ${state.age} THN • ${SKIN_LABELS[state.language][state.skinType]}
           </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- [1/3] LEFT COLUMN: THE VISUAL (3 Units) -->
          <div class="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
            <div class="section-card bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm overflow-hidden">
                <h3 class="font-black text-[9px] text-primary tracking-[0.4em] uppercase mb-4 flex items-center gap-3">
                  <span class="w-6 h-[1.5px] bg-primary/30"></span>
                  Blueprint Lokasi Gejala
                </h3>
                <div class="blueprint-body-map-container">
                  ${getReportVisualization()}
                </div>
                <p class="text-[8px] text-slate-400 font-bold uppercase tracking-widest text-center mt-3">Zona Tubuh Teridentifikasi</p>
            </div>
          </div>

          <!-- [2/3] MIDDLE COLUMN: MAIN FOCUS (6 Units) -->
          <div class="lg:col-span-6 space-y-4">
            
            <!-- Main Diagnosis -->
            <div class="primary-card shadow-xl border border-slate-100 rounded-[2rem] overflow-hidden bg-white ring-1 ring-slate-100/50">
               <div class="p-6 bg-primary text-white flex justify-between items-center bg-gradient-to-br from-primary to-blue-800">
                  <div>
                    <div class="flex items-center gap-2 mb-2">
                       <span class="text-[8px] uppercase font-black tracking-widest bg-white/20 px-2 py-0.5 rounded-full">${dict.topMatch}</span>
                       <button onclick="saveToHistory()" class="bg-white text-primary text-[8px] font-black px-3 py-0.5 rounded-full shadow-lg hover:scale-105 transition-all">
                          SIMPAN
                       </button>
                    </div>
                    <h1 class="text-xl lg:text-2xl font-black tracking-tighter leading-tight">${state.language === 'en' ? (p.disease_name_en || p.disease_name) : (p.disease_name_id || p.disease_name)}</h1>
                  </div>
                  ${getCircularGauge(p.percentage)}
               </div>
               <div class="p-6">
                  <div class="flex flex-wrap gap-2 mb-4">
                     <span class="px-2 py-1 bg-slate-50 border border-slate-100 rounded-md text-[8px] font-black tracking-widest text-slate-400 font-mono uppercase">${p.icd10} • DATABASE</span>
                     <span class="px-2 py-1 border rounded-md text-[8px] font-black tracking-[0.2em] ${p.contagious ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'} uppercase">${p.contagious ? '⚠️ Menular' : '✅ Tidak Menular'}</span>
                  </div>
                  <div class="mb-4">${getTriageBadge(p.disease_id)}</div>
                  <p class="text-slate-600 text-sm font-medium leading-relaxed opacity-90">${state.language === 'en' ? (p.description_en || p.description) : (p.description_id || p.description)}</p>
               </div>
            </div>

            ${buildRedFlagsSection(p.disease_id).replace('my-8', 'mb-0')}

            <!-- Treatment Dashboard -->
            <div class="section-card bg-white border border-blue-50 p-6 rounded-[2rem] shadow-sm ring-1 ring-blue-50">
               <h3 class="font-black text-[10px] text-blue-700 tracking-[0.4em] uppercase mb-6 flex items-center gap-2">💊 ${dict.treatmentPlan}</h3>
               <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div class="p-5 rounded-2xl bg-green-50/40 border-l-[6px] border-l-green-500 shadow-sm">
                     <span class="text-[8px] font-black uppercase text-green-700 tracking-widest block mb-2">${dict.otc}</span>
                     <ul class="text-[11px] text-slate-700 space-y-1 font-medium opacity-90">${_lst(t.otc)}</ul>
                  </div>
                  <div class="p-5 rounded-2xl bg-blue-50/40 border-l-[6px] border-l-blue-500 shadow-sm">
                     <span class="text-[8px] font-black uppercase text-blue-700 tracking-widest block mb-2">${dict.rx}</span>
                     <ul class="text-[11px] text-slate-700 space-y-1 font-medium opacity-90">${_lst(t.prescription)}</ul>
                  </div>
               </div>
               <div class="p-4 bg-slate-50 border border-slate-100 rounded-xl mb-4 text-[10px] text-slate-600 italic font-medium">${getPersonalizedNotes(p.disease_id)}</div>
               <div class="p-5 border-2 border-amber-50 bg-amber-50/50 rounded-[1.5rem] text-[10px] text-amber-950 flex gap-3 transition-all hover:bg-amber-100 items-start">
                 <span class="text-xl animate-pulse">🚨</span>
                 <div><strong class="block mb-0.5 text-xs font-black uppercase tracking-tight text-amber-900">KAPAN HARUS KE DOKTER</strong> <p class="opacity-80">${_getV(t.see_doctor)}</p></div>
               </div>
            </div>

            ${alts.length ? `
            <!-- Alternative Diagnoses -->
            <div class="section-card bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm mb-0">
               <h3 class="font-black text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-6 flex items-center gap-2">🔍 Kemungkinan Lainnya</h3>
               <div class="space-y-4">
                  ${alts.map(a => `
                  <div class="flex items-center justify-between p-5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-primary/20 transition-all">
                    <div>
                      <div class="font-black text-slate-800 text-lg tracking-tight">${state.language === 'en' ? a.disease_name_en : a.disease_name_id}</div>
                      <div class="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">${a.icd10} • COMMON</div>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-black text-slate-900 leading-none">${a.percentage.toFixed(2)}%</div>
                      <div class="text-[10px] uppercase font-bold text-slate-400">Match</div>
                    </div>
                  </div>`).join('')}
               </div>
            </div>` : ''}
          </div>

          <!-- [3/3] RIGHT COLUMN: AI ANALYTICS (3 Units) -->
          <div class="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
            
            ${buildSymptomMatchSection(p.disease_id, allUserSymptomIds).replace('my-8', 'my-0')}

            <div class="section-card bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm">
               <h3 class="font-black text-[10px] text-indigo-700 tracking-[0.3em] uppercase mb-6 flex items-center gap-2">🔬 Bukti Klinis</h3>
               <div class="space-y-6">
                  <div>
                    <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">FITUR KLINIS</span>
                    <ul class="text-[11px] text-slate-600 space-y-1.5 list-disc pl-3">${_lst(db.clinical_features)}</ul>
                  </div>
                  <div>
                    <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">PENYEBAB</span>
                    <ul class="text-[11px] text-slate-600 space-y-1.5 list-disc pl-3">${_lst(db.causes)}</ul>
                  </div>
               </div>
            </div>

            ${getClinicalGallery(p.disease_id, p.disease_name_en || p.disease_name)}

            
          </div> <!-- COL-8 CLOSED STRICTLY -->
        </div> <!-- GRID CLOSED STRICTLY -->

        <!-- FINAL FEEDBACK -->
        <div class="w-full max-w-4xl mx-auto mt-16 py-8 border-t border-slate-200/50 flex flex-col items-center">
           ${buildFeedbackSection()}
        </div>

        <div class="mt-32 p-12 bg-slate-900 text-white rounded-[4rem] text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden animate-fade">
           <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/10 pointer-events-none"></div>
           <div class="w-16 h-1.5 bg-primary/50 mx-auto mb-8 rounded-full"></div>
           <p class="text-slate-400 text-[10px] md:text-[11px] font-medium leading-[2] max-w-3xl mx-auto px-4 italic opacity-80">${dict.medicalDisclaimer}</p>
           <div class="mt-10 text-[9px] font-black tracking-[0.5em] text-slate-600 uppercase">DermaNetra Clinical Engine v7.0</div>
        </div>

      </div>
    `;
    el.innerHTML = out;
  } catch (err) {
    console.error('[DermaNetra] Render Error:', err);
    el.innerHTML = `<div class="p-10 text-center text-red-500">Render Error: ${err.message}</div>`;
  }
}

// ── API Helpers ───────────────────────────────────────────
const API_BASE = 'http://localhost:8000';
async function fetchDiagnosis(symptomIds) {
  const payload = {
    symptom_ids: symptomIds,
    patient: { age: parseInt(state.age), sex: state.sex, skinType: state.skinType, duration: state.duration },
    selected_regions: Object.keys(state.symptoms).filter(k=>state.symptoms[k].size>0),
  };
  const resp = await fetch(`${API_BASE}/api/diagnose`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error('API request failed');
  return await resp.json();
}
