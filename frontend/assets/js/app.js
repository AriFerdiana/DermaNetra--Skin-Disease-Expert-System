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
  language: localStorage.getItem('dn-lang') || 'id',
  // NLP Mode state
  diagnosisMode: 'manual',   // 'manual' | 'nlp'
  nlpText: '',
  nlpMatchedSymptoms: [],    // [{symptom_id, symptom_name, score, match_type}]
  nlpHybridSymptoms: {},     // Same format as state.symptoms for manual hybrid additions
  nlpFullResponse: null,
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
    symptomsCount: (n) => `${n} Gejala Terpilih`,
    // NLP Mode strings
    tabManual: 'Body Map',
    tabNLP: '✍️ Cerita Gejala',
    nlpInputTitle: 'Ceritakan Keluhan Anda',
    nlpInputDesc: 'Tulis gejala Anda dengan kata-kata sendiri — sistem akan memahaminya',
    nlpExampleLabel: 'Contoh keluhan:',
    nlpAnalyzeBtn: 'Analisis Keluhan Saya',
    nlpAddManual: '+ Tambah dari Peta',
    nlpPreviewTitle: 'Sistem Memahami Keluhan Anda',
    nlpMatchedLabel: 'Gejala yang terdeteksi:',
    nlpNoMatch: 'Belum ada gejala yang dipahami. Coba ceritakan lebih detail, contoh: "gatal di malam hari", "kulit bersisik", dll.',
    hybridModeActive: 'Mode Gabungan:',
    nlpResultBanner: (n, m) => `✨ Sistem memahami <strong>${n} gejala</strong> dari cerita Anda${m > 0 ? ` + <strong>${m} gejala tambahan</strong> dari Body Map` : ''}.`,
    backToDashboard: 'Kembali ke Dashboard',
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
    symptomsCount: (n) => `${n} Symptom(s) Selected`,
    // NLP Mode strings (EN)
    tabManual: 'Body Map',
    tabNLP: '✍️ Describe Symptoms',
    nlpInputTitle: 'Describe Your Symptoms',
    nlpInputDesc: 'Write your symptoms in your own words — the system will understand',
    nlpExampleLabel: 'Example complaints:',
    nlpAnalyzeBtn: 'Analyze My Symptoms',
    nlpAddManual: '+ Add from Body Map',
    nlpPreviewTitle: 'System Understands Your Complaint',
    nlpMatchedLabel: 'Detected symptoms:',
    nlpNoMatch: 'No symptoms understood yet. Try describing in more detail, e.g. "itchy at night", "scaly skin", etc.',
    hybridModeActive: 'Combined Mode:',
    nlpResultBanner: (n, m) => `✨ System understood <strong>${n} symptoms</strong> from your description${m > 0 ? ` + <strong>${m} extra symptoms</strong> from Body Map` : ''}.`,
    backToDashboard: 'Back to Dashboard',
  }
};

const SKIN_LABELS = {
  id: {
    normal: 'Kulit Normal',
    dry: 'Kulit Kering',
    oily: 'Kulit Berminyak',
    combination: 'Kulit Kombinasi',
    sensitive: 'Kulit Sensitif'
  },
  en: {
    normal: 'Normal Skin',
    dry: 'Dry Skin',
    oily: 'Oily Skin',
    combination: 'Combination Skin',
    sensitive: 'Sensitive Skin'
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
      ? 'px-3 py-1 text-xs font-bold rounded-full transition-all bg-white dark:bg-slate-700 shadow-sm text-teal-700' 
      : 'px-3 py-1 text-xs font-bold rounded-full transition-all text-slate-500';
    btnEn.className = lang === 'en' 
      ? 'px-3 py-1 text-xs font-bold rounded-full transition-all bg-white dark:bg-slate-700 shadow-sm text-teal-700' 
      : 'px-3 py-1 text-xs font-bold rounded-full transition-all text-slate-500';
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
  Object.assign(state,{age:'',sex:'',skinType:'',duration:'',disclaimer:false,currentView:'front',activeRegion:null,symptoms:{},results:null,
    // Reset NLP state too
    diagnosisMode:'manual', nlpText:'', nlpMatchedSymptoms:[], nlpHybridSymptoms:{}, nlpFullResponse:null
  });
  
  // Clear inputs
  document.getElementById('input-age').value = '';
  document.getElementById('input-skin').value = '';
  const chk = document.getElementById('chk-disclaimer');
  if(chk) chk.checked = false;
  
  // Clear NLP textarea
  const nlpTa = document.getElementById('nlp-complaint-text');
  if(nlpTa) nlpTa.value = '';
  
  // Reset NLP preview
  const nlpPanel = document.getElementById('nlp-preview-panel');
  if(nlpPanel) nlpPanel.classList.add('hidden');
  
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

  let fullResponse = null;
  try {
    const resp = await fetchDiagnosis(allIds);
    if(resp && resp.results) fullResponse = resp;
  } catch(e) { 
    console.error('[DermaNetra] API Error:', e);
    alert('Gagal menghubungi server. Pastikan koneksi internet aktif dan backend sedang berjalan.');
    showPage('diagnosis');
    return;
  }
  
  state.results = fullResponse ? fullResponse.results : null;
  state.fullResponse = fullResponse;
  setTimeout(()=>renderResults(fullResponse), 380);
}

function renderResults(fullResponse){
  const loadEl    = document.getElementById('results-loading');
  const contentEl = document.getElementById('results-content');
  loadEl.classList.remove('hidden');
  contentEl.classList.add('hidden');
  
  setTimeout(()=>{
    loadEl.classList.add('hidden');
    contentEl.classList.remove('hidden');
    buildResultsUI(fullResponse);
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

  return `
    <div class="confidence-gauge">
      <svg class="gauge-svg" viewBox="0 0 36 36">
        <path class="gauge-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
        <path class="gauge-fill risk-${risk}" stroke-dasharray="${dash}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
      </svg>
      <div class="gauge-label">
        <span class="gauge-percent">${percentage.toFixed(0)}%</span>
        <span class="gauge-sub" style="font-size: 7px; opacity: 0.9; text-transform: uppercase; margin-top: -2px; letter-spacing: 0.05em;">Kecocokan</span>
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
function buildSymptomMatchSection(diseaseId, userSymptomIds, nlpSymptomNames = {}) {
  const lt = (typeof LIKELIHOOD_TABLE !== 'undefined') ? LIKELIHOOD_TABLE[diseaseId] : null;
  if (!lt) return '';

  const strong = [], partial = [], none = [];
  
  userSymptomIds.forEach(sid => {
    const name = nlpSymptomNames[sid] || SYMPTOM_MAP[sid] || `Gejala ${sid}`;
    const prob = lt[sid];
    if (prob === undefined || prob < 0.2) {
      none.push({ sid, name, label: state.language === 'en' ? 'Unlikely Related' : 'Mungkin dari Kondisi Lain' });
    } else if (prob >= 0.7) {
      strong.push({ sid, name, label: state.language === 'en' ? 'Highly Typical' : 'Sangat Khas' });
    } else {
      partial.push({ sid, name, label: state.language === 'en' ? 'Supporting' : 'Pendukung' });
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
    `<div class="match-item ${cls}"><span class="match-icon">${icon}</span><div class="match-text"><span class="match-name">${item.name}</span><span class="match-prob">${item.label}</span></div></div>`;

  const totalSymptoms = strong.length + partial.length + none.length;
  const matchRatio = totalSymptoms > 0 ? (strong.length + partial.length) / totalSymptoms : 0;
  
  let warningHtml = '';
  if (totalSymptoms >= 3 && matchRatio <= 0.35) {
      warningHtml = `
      <div class="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 text-amber-800 animate-fade">
         <svg class="w-6 h-6 flex-shrink-0 text-amber-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
         <div>
            <h4 class="font-bold text-sm mb-1">${state.language === 'en' ? 'Low Diagnostic Confidence' : 'Akurasi Diagnosis Rendah (Low Confidence)'}</h4>
            <p class="text-xs opacity-90 leading-relaxed">${state.language === 'en' ? 'Your reported symptoms vary widely and most do not fit the typical profile of this condition. You may be experiencing a different condition or a combination of skin issues.' : 'Gejala yang Anda laporkan sangat bervariasi dan sebagian besar tidak cocok dengan profil khas penyakit ini. Ada kemungkinan Anda mengalami kondisi lain atau kombinasi beberapa masalah kulit.'}</p>
         </div>
      </div>`;
  }

  let html = `
    ${warningHtml}
    <div class="symptom-match-card section-card bg-white border border-slate-100 p-6 rounded-2xl shadow-sm my-8 animate-fade">
      <h3 class="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2 text-base">
        <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
        📋 Kenapa Sistem Memilih Ini?
      </h3>
      <p class="text-sm text-slate-500 mb-4 leading-relaxed">${state.language === 'en' ? 'Analysis of how your selected symptoms match the typical profile of this condition.' : 'Analisis kecocokan antara gejala yang Anda pilih dengan profil khas penyakit ini.'}</p>
      <div class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Gejala Anda (${userSymptomIds.length}):</div>
      <div class="match-list text-sm max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">`;

  if (strong.length) {
    html += strong.map(s => renderItem(s, 'match-strong', '✅')).join('');
  }
  if (partial.length) {
    html += partial.map(s => renderItem(s, 'match-partial', '🟡')).join('');
  }
  if (none.length) {
    html += none.map(s => renderItem(s, 'match-none', '⚪')).join('');
    html += `
    <div class="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-500 flex gap-2">
      <svg class="w-4 h-4 flex-shrink-0 text-slate-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>${state.language === 'en' ? 'Some of your symptoms (⚪) might not be part of this condition and could indicate a different secondary issue.' : 'Beberapa gejala Anda (⚪) mungkin bukan bagian dari penyakit ini dan bisa saja menandakan kondisi sekunder.'}</span>
    </div>`;
  }

  html += `</div>`;

  if (profileNotes.length) {
    html += `<div class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 mt-6">Latar Belakang Anda:</div>
      <div class="match-profile-list text-sm space-y-2">${profileNotes.join('')}</div>`;
  }

  html += `</div>`;
  return html;
}

// ── Triage Badge (Fase 3) ─────────────────────────────────
function getTriageBadge(diseaseId, percentage, hasRedFlag = false) {
  const db = (typeof DISEASE_DB !== 'undefined' && DISEASE_DB[diseaseId]) || {};
  let level = db.triage_level || 'gp_visit';
  let note = db.triage_note || '';

  // Red Flag Override (Absolute Priority)
  if (hasRedFlag) {
    level = 'emergency';
    note = 'Gejala Red Flag terdeteksi! Segera cari bantuan medis darurat.';
  } else if (percentage < 70) {
    if (level === 'emergency') level = 'specialist';
    if (percentage < 50 && (level === 'emergency' || level === 'specialist')) level = 'gp_visit';
  }

  const config = {
    home_care:   { label: '🏠 Perawatan Mandiri', cls: 'triage-home',       desc: 'Cukup dirawat di rumah dengan saran berikut' },
    gp_visit:    { label: '🟡 Dokter Umum',       cls: 'triage-gp',         desc: 'Jadwalkan kunjungan dalam 2–3 hari' },
    specialist:  { label: '🟠 Dokter Spesialis',   cls: 'triage-specialist', desc: 'Temui dokter spesialis kulit dalam 24 jam' },
    emergency:   { label: '🔴 Gawat Darurat',      cls: 'triage-emergency',  desc: 'Segera ke rumah sakit / UGD' },
  };

  const c = config[level] || config.gp_visit;
  return `
    <div class="triage-badge ${c.cls}">
      <div class="flex flex-col gap-1">
        <span class="triage-label text-base font-bold">${c.label}</span>
        <span class="triage-desc text-sm">${note || c.desc} ${!hasRedFlag && percentage < 70 && level === 'emergency' ? '(Peringatan ini muncul dari kecocokan sebagian, disarankan periksa dokter untuk kepastian)' : ''}</span>
      </div>
      <button onclick="window.open('https://www.google.com/maps/search/klinik+kulit+terdekat','_blank')" class="ml-auto bg-white/20 hover:bg-white/30 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        Cari Dokter Terdekat
      </button>
    </div>`;
}

// ── Red Flags Checklist (Fase 4) ──────────────────────────
function buildRedFlagsSection(diseaseId, percentage, hasRedFlag = false, redFlagSymptoms = []) {
  if (!hasRedFlag && percentage < 70) return '';

  const db = (typeof DISEASE_DB !== 'undefined' && DISEASE_DB[diseaseId]) || {};
  let flags = db.red_flags || [];
  
  // Combine db red_flags with triggered red_flag_symptoms if any
  let allFlags = new Set([...flags]);
  if (hasRedFlag && redFlagSymptoms.length) {
    redFlagSymptoms.forEach(rfs => allFlags.add(`Gejala Bahaya Terdeteksi: ${rfs}`));
  }
  
  if (allFlags.size === 0) return '';

  const items = Array.from(allFlags).map(f => `<li><span class="red-flag-icon">🚩</span> ${f}</li>`).join('');

  return `
    <div class="red-flags-card section-card p-6 rounded-2xl shadow-sm my-8 animate-fade bg-red-50/50 border-red-100">
      <h3 class="font-bold text-red-700 border-b border-red-200 pb-3 mb-4 flex items-center gap-2 text-base">
        <svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        ${hasRedFlag ? 'PERHATIAN MEDIS SEGERA DIBUTUHKAN!' : 'Monitor Kondisi Anda!'}
      </h3>
      <p class="text-sm mb-4 text-red-900 opacity-90">${hasRedFlag ? 'Anda memilih gejala yang bersifat sangat darurat. Segera batalkan perawatan mandiri dan kunjungi UGD terdekat.' : 'Segera batalkan perawatan mandiri dan cari bantuan medis darurat jika mengalami:'}</p>
      <ul class="red-flags-list text-sm text-red-900">${items}</ul>
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
    <div class="personalized-note-card p-5 rounded-xl mt-4">
      <div class="text-xs font-black uppercase tracking-widest text-purple-700 mb-3 flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        Saran Khusus untuk Profil Anda
      </div>
      <ul class="text-sm text-slate-700 space-y-2.5 leading-relaxed">${notes.map(n => `<li class="flex gap-2"><span class="text-purple-500 mt-0.5">💡</span><span>${n}</span></li>`).join('')}</ul>
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
    <div class="clinical-gallery-card section-card bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm mb-0">
      <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <h3 class="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
          <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          Galeri Referensi
        </h3>
        <a href="${topicUrl}" target="_blank" class="text-xs font-black text-primary hover:scale-105 transition-all flex items-center gap-1 bg-primary/5 px-4 py-1.5 rounded-full border border-primary/15 uppercase tracking-tighter">
          DermNet →
        </a>
      </div>

      <div class="medical-gallery-frame rounded-2xl overflow-hidden border border-slate-100 relative" style="background:${svgBg}; min-height:160px;">
        <img src="${imgUrl}" referrerpolicy="no-referrer" loading="lazy" 
          onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');"
          class="w-full object-cover" style="max-height:220px;" />
        <div class="hidden flex flex-col items-center justify-center p-6 text-center" style="min-height:160px;">
          <img src="${placeholderDataUrl}" class="h-40 w-auto mx-auto rounded-xl drop-shadow-sm opacity-90" alt="Ilustrasi medis ${diseaseName}" />
          <p class="text-xs font-bold uppercase tracking-widest mt-3" style="color:${svgColor}; opacity:0.7">${diseaseName}</p>
        </div>
      </div>
      
      <a href="${topicUrl}" target="_blank" class="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:opacity-80" style="background:${svgBg}; color:${svgColor}; border:1px solid ${svgColor}30">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        Lihat di DermNet NZ
      </a>
    </div>`;
}

function buildFeedbackSection() {
  return `
    <div class="feedback-card bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-center max-w-md w-full animate-fade">
      <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 mb-3 font-serif italic text-lg font-black shadow-inner">DN</div>
      <h3 class="text-base font-black text-slate-900 mb-2 tracking-tight">${state.language === 'id' ? 'Apakah diagnosis ini membantu?' : 'Was this diagnosis helpful?'}</h3>
      <p class="text-slate-500 mb-5 leading-relaxed text-xs font-medium">
        ${state.language === 'id' 
          ? 'Masukan Anda membantu kami meningkatkan akurasi sistem pakar ini.' 
          : 'Your feedback helps us improve the accuracy of this clinical engine.'}
      </p>
      <div class="flex gap-3 justify-center">
        <button onclick="this.parentElement.innerHTML='<div class=\'text-green-600 font-black py-1.5 animate-bounce text-xs tracking-widest uppercase\'>✨ TERIMA KASIH!</div>'" 
                class="flex-1 max-w-[120px] py-2.5 bg-primary text-white rounded-lg font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-sm active:scale-95">
          ${state.language === 'id' ? 'Ya, Akurat' : 'Yes'}
        </button>
        <button onclick="this.parentElement.innerHTML='<div class=\'text-slate-500 font-black py-1.5 animate-pulse text-xs tracking-widest uppercase\'>TERIMA KASIH ATAS MASUKANNYA!</div>'" 
                class="flex-1 max-w-[120px] py-2.5 bg-slate-100 text-slate-600 rounded-lg font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-sm active:scale-95">
          ${state.language === 'id' ? 'Kurang Pas' : 'No'}
        </button>
      </div>
    </div>`;
}

function buildNLPDebugView(fullResponse) {
  if (!fullResponse || !fullResponse.nlp_pipeline) return '';
  
  // Cek apakah URL sudah mengandung nlp
  const url = window.location.href.toLowerCase();
  const isDebug = url.includes('#nlp') || url.includes('?nlp') || url.includes('/nlp');
  
  const pipe = fullResponse.nlp_pipeline;
  
  // Bungkus dalam div ber-ID agar bisa di-toggle tanpa reload
  return `
    <div id="nlp-debug-container" class="${isDebug ? '' : 'hidden'} bg-slate-900 text-green-400 p-6 rounded-2xl mb-6 font-mono text-xs overflow-x-auto shadow-inner border border-slate-700 animate-fade relative">
      
      <!-- Tombol Close -->
      <button onclick="document.getElementById('nlp-debug-container').classList.add('hidden'); history.replaceState(null, '', window.location.pathname + window.location.search);" 
              class="absolute top-4 right-4 text-slate-400 hover:text-red-400 font-bold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-600 transition-colors flex items-center gap-2">
        <span>Tutup Debug</span>
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <div class="text-white font-bold mb-3 uppercase tracking-widest text-sm border-b border-slate-700 pb-2 pr-32">🛠️ Debug: NLP Pipeline Process</div>
      
      <div class="mb-3"><strong class="text-blue-400">1. Original Text:</strong> <span class="text-slate-300">"${pipe.original}"</span></div>
      
      <div class="mb-3"><strong class="text-blue-400">2. Cleaned Text:</strong> <span class="text-slate-300">"${pipe.cleaned}"</span></div>
      
      <div class="mb-3"><strong class="text-blue-400">3. Tokenization (${pipe.token_count_original} kata):</strong> 
        <div class="mt-1 flex flex-wrap gap-1">
          ${pipe.tokens.map(t => `<span class="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-yellow-300">${t}</span>`).join('')}
        </div>
      </div>
      
      <div class="mb-3"><strong class="text-blue-400">4. Stopword Removal (-${pipe.stopwords_removed} kata tidak penting):</strong>
        <div class="mt-1 flex flex-wrap gap-1">
          ${pipe.tokens_after_stopword_removal.map(t => `<span class="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-orange-300">${t}</span>`).join('')}
        </div>
      </div>
      
      <div class="mb-3"><strong class="text-blue-400">5. Stemming (Kata Dasar by PySastrawi):</strong>
        <div class="mt-1 flex flex-wrap gap-1">
          ${pipe.tokens_after_stemming.map(t => `<span class="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-green-300">${t}</span>`).join('')}
        </div>
      </div>

      <div class="mb-1 mt-4 border-t border-slate-700 pt-3"><strong class="text-purple-400">6. Ekstraksi ID Gejala Akhir:</strong> 
        <span class="text-white font-bold text-sm bg-purple-900/50 px-2 py-1 rounded ml-2">${fullResponse.all_symptom_ids.join(', ')}</span>
      </div>
    </div>
  `;
}

function buildResultsUI(fullResponse) {
  const el = document.getElementById('results-content');
  if (!fullResponse || !fullResponse.results || !fullResponse.results.length) {
    el.innerHTML = `<div class="p-10 text-center text-slate-500 font-bold bg-white rounded-2xl shadow-sm border border-slate-100">Silakan pilih gejala terlebih dahulu.</div>`;
    return;
  }

  const results = fullResponse.results;
  const hasRedFlag = fullResponse.has_red_flag;
  const redFlagSymptoms = fullResponse.red_flag_symptoms || [];

  const dict = I18N[state.language];
  const p = results[0];
  const alts = results.slice(1, 4);

  const t = (typeof DISEASE_DB !== 'undefined' && DISEASE_DB[p.disease_id] && DISEASE_DB[p.disease_id].treatments) 
            || { otc:[], prescription:[], lifestyle:[], see_doctor:'' };
  const db = (typeof DISEASE_DB !== 'undefined' && DISEASE_DB[p.disease_id]) || { clinical_features:[], causes:[] };
  
  // Collect symptom IDs: NLP mode uses all_symptom_ids from response, manual uses state.symptoms
  const allUserSymptomIds = [];
  const nlpSymptomNames = {};

  if (fullResponse && fullResponse.all_symptom_ids && fullResponse.method && fullResponse.method.startsWith('nlp')) {
    allUserSymptomIds.push(...fullResponse.all_symptom_ids);
    if (fullResponse.matched_symptoms) {
      fullResponse.matched_symptoms.forEach(m => nlpSymptomNames[m.symptom_id] = m.symptom_name);
    }
  } else {
    Object.values(state.symptoms).forEach(s => s.forEach(id => allUserSymptomIds.push(id)));
  }

  // NLP banner (only shown when NLP mode)
  const nlpBanner = buildNLPResultsBanner(fullResponse);

  try {
    const _getV = v => {
      if (!v) return 'Hubungi dokter untuk info lebih lanjut.';
      if (typeof v === 'object' && !Array.isArray(v)) return v[state.language] || v.id || v.en;
      return v;
    };
    const _lst = arr => {
      const val = _getV(arr);
      if (!val || !val.length) return '<li class="italic opacity-50">Data belum tersedia</li>';
      return val.map(i => `<li>${i}</li>`).join('');
    };

    let out = `
      <div class="w-full max-w-[1920px] mx-auto px-6 py-6 animate-fade">
        
        <!-- Header Banner & Warning -->
        ${nlpBanner}
        ${buildNLPDebugView(fullResponse)}

        <!-- Compact Context Header -->
        <div class="flex justify-center mb-8">
           <span class="bg-white px-6 py-2.5 rounded-full text-xs font-black text-slate-400 uppercase tracking-[0.3em] shadow-sm border border-slate-100 ring-1 ring-slate-50 italic">
              ${state.sex==='male' ? dict.contextMale : dict.contextFemale} • ${state.age} THN • ${SKIN_LABELS[state.language][state.skinType]}
           </span>
        </div>

        <!-- Symptom Summary -->
        ${allUserSymptomIds.length ? `
        <div class="bg-white border border-slate-100 rounded-2xl shadow-sm px-6 py-4 mb-6 flex flex-wrap gap-2 items-center">
          <span class="text-xs font-black uppercase tracking-widest text-slate-400 mr-2">Gejala Dilaporkan:</span>
          ${allUserSymptomIds.map(sid => `<span class="px-2.5 py-1 bg-primary/8 text-primary border border-primary/15 rounded-full text-xs font-bold">${nlpSymptomNames[sid] || SYMPTOM_MAP[sid] || sid}</span>`).join('')}
        </div>` : ''}

        <div class="flex flex-col gap-6">
            
            <!-- TOP FULL WIDTH SECTIONS -->
            <div class="space-y-6">
            <!-- Main Diagnosis -->
            <div class="primary-card shadow-xl border border-slate-100 rounded-[2rem] overflow-hidden bg-white ring-1 ring-slate-100/50">
               <div class="p-8 bg-primary text-white flex justify-between items-center bg-gradient-to-br from-primary to-blue-800">
                  <div>
                    <div class="flex items-center gap-2 mb-3">
                       <span class="text-xs uppercase font-black tracking-widest bg-white/20 px-3 py-1 rounded-full">${dict.topMatch}</span>
                       <button onclick="saveToHistory()" class="bg-white text-primary text-xs font-black px-4 py-1 rounded-full shadow-lg hover:scale-105 transition-all">
                          SIMPAN
                       </button>
                    </div>
                    <h1 class="text-2xl lg:text-3xl font-black tracking-tight leading-snug">${state.language === 'en' ? (p.disease_name_en || p.disease_name) : (p.disease_name_id || p.disease_name)}</h1>
                  </div>
                  ${getCircularGauge(p.percentage)}
               </div>
               <div class="p-8">
                  <div class="flex flex-wrap gap-2 mb-6">
                     <span class="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-md text-xs font-black tracking-widest text-slate-500 font-mono uppercase" title="Kode Medis Internasional (ICD-10)">ICD-10: ${p.icd10}</span>
                     <span class="px-3 py-1.5 border border-slate-100 rounded-md text-xs font-black tracking-[0.2em] bg-slate-50 text-slate-500 uppercase">${_getV(db.prevalence) || 'UMUM'}</span>
                     <span class="px-3 py-1.5 border rounded-md text-xs font-black tracking-[0.2em] ${p.contagious ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'} uppercase">${p.contagious ? '⚠️ Menular' : '✅ Tidak Menular'}</span>
                  </div>
                  <div class="mb-6">${getTriageBadge(p.disease_id, p.percentage, hasRedFlag)}</div>
                  <p class="text-slate-600 text-sm font-medium leading-relaxed">${state.language === 'en' ? (p.description_en || p.description) : (p.description_id || p.description)}</p>
               </div>
            </div>

            ${buildRedFlagsSection(p.disease_id, p.percentage, hasRedFlag, redFlagSymptoms).replace('my-8', 'mb-0')}

            ${buildSymptomMatchSection(p.disease_id, allUserSymptomIds, nlpSymptomNames).replace('my-8', 'mb-0')}
            </div> <!-- END FULL WIDTH -->

            <!-- 50/50 GRID LAYOUT FOR REMAINDER -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
               
               <!-- LEFT COLUMN -->
               <div class="space-y-6">
                  
                  <!-- Treatment Dashboard -->
                  <div class="section-card bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm ring-1 ring-slate-100/50 h-full">
                     <h3 class="font-black text-sm text-slate-800 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">💊 ${dict.treatmentPlan}</h3>
                     
                     <div class="flex flex-col gap-6 mb-6">
                  <!-- Green Zone: OTC & Safe Care -->
                  <div class="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm relative overflow-hidden flex flex-col gap-5">
                     <div class="absolute top-0 right-0 p-3 opacity-20 text-4xl">🌿</div>
                     <div>
                        <span class="text-xs font-black uppercase text-emerald-700 tracking-[0.2em] block mb-3 flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Perawatan Mandiri (Aman)</span>
                        <ul class="text-sm text-emerald-950 space-y-2 font-medium opacity-90 list-disc pl-4 relative z-10">${_lst(t.otc)}</ul>
                     </div>
                     ${t.lifestyle && _getV(t.lifestyle) ? `
                     <div class="pt-4 border-t border-emerald-200/50">
                        <span class="text-xs font-black uppercase text-emerald-700 tracking-[0.2em] block mb-3 flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Gaya Hidup & Pantangan</span>
                        <ul class="text-sm text-emerald-950 space-y-2 font-medium opacity-90 list-disc pl-4 relative z-10">${_lst(t.lifestyle)}</ul>
                     </div>` : ''}
                  </div>
                  
                  <!-- Blue/Red Zone: Prescription -->
                  <div class="p-6 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm relative overflow-hidden ring-1 ring-blue-500/10">
                     <div class="absolute top-0 right-0 p-3 opacity-10 text-4xl">⚠️</div>
                     <span class="text-xs font-black uppercase text-blue-800 tracking-[0.2em] block mb-3 flex items-center gap-1.5"><svg class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> Wajib Resep & Pengawasan Dokter</span>
                     <ul class="text-sm text-blue-950 space-y-2 font-medium opacity-90 list-disc pl-4 relative z-10">${_lst(t.prescription)}</ul>
                  </div>
               </div>

               ${getPersonalizedNotes(p.disease_id) ? `<div class="p-6 bg-slate-50 border border-slate-100 rounded-xl mb-6 text-sm text-slate-600 italic font-medium">${getPersonalizedNotes(p.disease_id)}</div>` : ''}
               
               <!-- Consolidated Action Plan -->
               <div class="p-6 bg-amber-50 rounded-[1.5rem] border border-amber-200 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-2">
                 <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
                 <div>
                    <h4 class="text-amber-900 font-black text-xs tracking-widest uppercase mb-1">Langkah Medis Selanjutnya</h4>
                    <p class="text-amber-800 text-sm font-medium leading-relaxed">${_getV(t.see_doctor)}</p>
                 </div>
               </div>
            </div>

            ${alts.length ? `
            <!-- Alternative Diagnoses -->
            <div class="section-card bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm">
               <h3 class="font-black text-xs text-slate-500 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">🔍 Kemungkinan Lainnya</h3>
               <div class="space-y-4">
                  ${alts.map(a => `
                  <div class="flex items-center justify-between p-6 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-primary/20 transition-all">
                    <div>
                      <div class="font-black text-slate-800 text-base tracking-tight">${state.language === 'en' ? a.disease_name_en : a.disease_name_id}</div>
                      <div class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">${a.icd10} • ${typeof DISEASE_DB !== 'undefined' && DISEASE_DB[a.disease_id] ? (_getV(DISEASE_DB[a.disease_id].prevalence) || 'UNSPECIFIED') : 'UNSPECIFIED'}</div>
                    </div>
                    <div class="text-right">
                      <div class="text-lg font-black text-slate-800 leading-none">${a.percentage.toFixed(1)}%</div>
                      <div class="text-xs uppercase font-bold text-slate-400 mt-1 tracking-widest">Match</div>
                    </div>
                  </div>`).join('')}
               </div>
            </div>` : ''}
               </div> <!-- END LEFT COLUMN -->

               <!-- RIGHT COLUMN -->
               <div class="space-y-6 flex flex-col h-full">
            <!-- Prognosis -->
            ${db.prognosis ? `
            <div class="section-card bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
               <h3 class="font-black text-xs text-teal-700 tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                 <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                 Prognosis & Perkiraan Pemulihan
               </h3>
               <p class="text-base text-slate-700 leading-relaxed font-medium">${db.prognosis}</p>
            </div>` : ''}

            <!-- Complications -->
            ${db.complications && db.complications.length ? `
            <div class="section-card bg-white border border-red-50 p-6 rounded-2xl shadow-sm">
               <h3 class="font-black text-xs text-red-700 tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                 <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                 Risiko Komplikasi Jika Tidak Ditangani
               </h3>
               <ul class="space-y-3">
                 ${db.complications.map(c => `<li class="flex gap-2 text-base text-slate-700"><span class="text-red-400 mt-1 flex-shrink-0">▶</span><span>${c}</span></li>`).join('')}
               </ul>
            </div>` : ''}


            <!-- AI Analytics & Clinical Evidence -->
             <div class="section-card bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm">
               <h3 class="font-black text-xs text-indigo-700 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">📋 Bukti Klinis</h3>
               <div class="space-y-6">
                  <div>
                    <span class="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">FITUR KLINIS</span>
                    <ul class="text-sm text-slate-700 space-y-2 list-disc pl-4 leading-relaxed">${_lst(db.clinical_features)}</ul>
                  </div>
                  <div>
                    <span class="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">PENYEBAB</span>
                    <ul class="text-sm text-slate-700 space-y-2 list-disc pl-4 leading-relaxed">${_lst(db.causes)}</ul>
                  </div>
                  ${db.risk_factors && _getV(db.risk_factors) ? `
                  <div>
                    <span class="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">FAKTOR RISIKO</span>
                    <ul class="text-sm text-slate-700 space-y-2 list-disc pl-4 leading-relaxed">${_lst(db.risk_factors)}</ul>
                  </div>` : ''}
                  ${db.references && _getV(db.references) ? `
                  <div class="pt-4 border-t border-slate-100">
                    <span class="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2 flex items-center gap-1"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> REFERENSI</span>
                    <ul class="text-sm text-slate-500 space-y-1.5 list-none leading-relaxed">${_getV(db.references).map(r => `<li class="break-all">• ${r}</li>`).join('')}</ul>
                  </div>` : ''}
               </div>
            </div>

            ${getClinicalGallery(p.disease_id, p.disease_name_en || p.disease_name)}
            
               </div> <!-- END RIGHT COLUMN -->
        </div> <!-- flex flex-col gap-8 -->

        <!-- FINAL FEEDBACK -->
        <div class="w-full max-w-4xl mx-auto mt-8 py-6 border-t border-slate-200/50 flex flex-col items-center">
           ${buildFeedbackSection()}
        </div>

        <div class="mt-4 p-8 bg-slate-900 text-white rounded-[2rem] text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden animate-fade">
           <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/10 pointer-events-none"></div>
           <div class="w-12 h-1 bg-primary/50 mx-auto mb-4 rounded-full"></div>
           <p class="text-slate-400 text-xs font-medium leading-relaxed max-w-2xl mx-auto px-4 italic opacity-80">${dict.medicalDisclaimer}</p>
           <div class="mt-6 text-xs font-black tracking-[0.5em] text-slate-600 uppercase">DermaNetra Clinical Engine v7.0</div>
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
// Automatically use current host but port 8000 for local dev
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:8000' 
  : `${window.location.protocol}//${window.location.hostname}:8000`;
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

async function fetchNLPDiagnosis(text, extraSymptomIds = []) {
  const payload = {
    text: text,
    patient: { age: parseInt(state.age), sex: state.sex, skinType: state.skinType, duration: state.duration },
    extra_symptom_ids: extraSymptomIds,
  };
  const resp = await fetch(`${API_BASE}/api/nlp-diagnose`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(typeof err.detail === 'object' ? err.detail.error : err.detail);
  }
  return await resp.json();
}

async function fetchNLPPreview(text) {
  const resp = await fetch(`${API_BASE}/api/nlp-preview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!resp.ok) return null;
  return await resp.json();
}

// ═══════════════════════════════════════════════════════════
//  NLP MODE — All Functions
// ═══════════════════════════════════════════════════════════

// Example complaint texts for the 4 test scenarios
const NLP_EXAMPLES = {
  'Kudis / Scabies': 'Kulit saya gatal sekali terutama di malam hari, tidak bisa tidur. Gatal paling parah di sela-sela jari tangan, pergelangan tangan, dan sekitar pusar. Ada garis-garis kecil seperti terowongan di kulit. Anggota keluarga lain juga mulai gatal.',
  'Psoriasis': 'Kulit saya muncul bercak merah tebal dengan sisik berwarna keperakan. Kalau sisiknya dikelupas, ada bintik-bintik merah kecil berdarah. Plak ini muncul di siku, lutut, dan kulit kepala. Kondisi makin parah saat saya stres.',
  'Panu': 'Ada bercak-bercak putih dan kecokelatan di dada dan punggung saya. Bercaknya tidak gatal tapi kalau digaruk keluar sisik halus. Makin banyak saat saya berkeringat. Bercaknya bergabung jadi satu area yang luas.',
  'Tinea Pedis': 'Sela jari kaki saya mengelupas, putih dan basah, sangat gatal. Kulit di telapak kaki juga terasa kering, menebal, dan mulai pecah-pecah. Kaki saya berbau tidak sedap. Kadang ada bintik berair kecil yang sangat gatal di sela jari.',
};

// Diagnosis mode switch (Manual / NLP)
function switchDiagnosisMode(mode) {
  state.diagnosisMode = mode;

  const tabManual = document.getElementById('tab-manual');
  const tabNlp = document.getElementById('tab-nlp');
  const manualArea = document.getElementById('manual-body-area');
  const nlpArea = document.getElementById('nlp-mode-area');
  const viewToggle = document.getElementById('body-view-toggle');
  const manualTitle = document.getElementById('manual-map-title');
  const pill = document.querySelector('.floating-pill-wrap');

  if (mode === 'manual') {
    tabManual.classList.add('active');
    tabNlp.classList.remove('active');
    manualArea.classList.remove('hidden');
    manualArea.style.display = '';
    nlpArea.classList.add('hidden');
    if (viewToggle) viewToggle.style.display = '';
    if (manualTitle) manualTitle.style.display = '';
    updateFloatingPill();
  } else {
    tabManual.classList.remove('active');
    tabNlp.classList.add('active');
    manualArea.classList.add('hidden');
    nlpArea.classList.remove('hidden');
    if (viewToggle) viewToggle.style.display = 'none';
    if (manualTitle) manualTitle.style.display = 'none';
    // Hide manual pill in NLP mode
    if (pill) pill.classList.remove('visible');
    // Restore NLP text if any
    const ta = document.getElementById('nlp-complaint-text');
    if (ta && state.nlpText) ta.value = state.nlpText;
    updateHybridBadge();
  }
}

// Debounce timer for real-time preview
let _nlpPreviewTimer = null;

function onNLPTextInput(text) {
  state.nlpText = text;
  const btn = document.getElementById('btn-nlp-analyze');
  if (btn) btn.disabled = !text || text.trim().length < 10;

  // Clear previous timer
  clearTimeout(_nlpPreviewTimer);

  if (!text || text.trim().length < 5) {
    document.getElementById('nlp-preview-panel').classList.add('hidden');
    return;
  }

  // Show panel with loading state immediately
  const panel = document.getElementById('nlp-preview-panel');
  const loadingEl = document.getElementById('nlp-loading-state');
  const resultsBody = document.getElementById('nlp-results-body');
  if (panel) panel.classList.remove('hidden');
  if (loadingEl) loadingEl.classList.remove('hidden');
  if (resultsBody) resultsBody.classList.add('hidden');

  // Debounce: 700ms after user stops typing
  _nlpPreviewTimer = setTimeout(async () => {
    const data = await fetchNLPPreview(text);
    if (loadingEl) loadingEl.classList.add('hidden');
    if (resultsBody) resultsBody.classList.remove('hidden');
    if (data) {
      state.nlpMatchedSymptoms = data.matched_symptoms || [];
      renderNLPPreview(data);
    }
  }, 700);
}

function renderNLPPreview(data) {
  const panel = document.getElementById('nlp-preview-panel');
  if (!panel) return;

  panel.classList.remove('hidden');

  // Update count badge — user-friendly language
  const countBadge = document.getElementById('nlp-matched-count');
  const n = data.matched_count || 0;
  if (countBadge) {
    countBadge.textContent = n > 0 ? `${n} gejala dipahami` : 'Belum ada gejala';
    countBadge.style.background = n > 0 ? 'rgba(8,145,178,0.12)' : 'rgba(100,116,139,0.1)';
    countBadge.style.color = n > 0 ? '#0891b2' : '#94a3b8';
  }

  // Update status dot color
  const dot = document.getElementById('nlp-status-dot');
  if (dot) {
    dot.style.background = n > 0 ? '#4ade80' : '#f59e0b';
  }

  // Render matched symptoms — ONLY show friendly symptom names, no pipeline jargon
  const matchedEl = document.getElementById('nlp-matched-symptoms');
  const noMatchEl = document.getElementById('nlp-no-match');
  const matched = data.matched_symptoms || [];

  if (matchedEl) {
    if (matched.length > 0) {
      matchedEl.classList.remove('hidden');
      if (noMatchEl) noMatchEl.classList.add('hidden');
      // Clean symptom name display — only name, no score/type exposed to user
      matchedEl.innerHTML = matched.map(m => `
        <span class="nlp-sym-tag ${m.match_type === 'phrase' ? 'phrase' : ''}" title="${m.symptom_name}">
          ${m.symptom_name}
        </span>`).join('');
    } else {
      matchedEl.innerHTML = '';
      matchedEl.classList.add('hidden');
      if (noMatchEl) noMatchEl.classList.remove('hidden');
    }
  }
}


function setNLPExample(btn) {
  const label = btn.textContent.trim();
  const example = NLP_EXAMPLES[label];
  if (!example) return;

  const ta = document.getElementById('nlp-complaint-text');
  if (ta) {
    ta.value = example;
    ta.dispatchEvent(new Event('input'));
    onNLPTextInput(example);
    // Highlight the active chip
    document.querySelectorAll('.nlp-example-chip').forEach(c => c.classList.remove('active', 'bg-violet-200'));
    btn.classList.add('bg-violet-200');
  }
}

// Analyze via NLP endpoint
async function analyzeNLP() {
  const text = state.nlpText;
  if (!text || text.trim().length < 10) return;

  // Collect extra (hybrid) manual symptom IDs
  const extraIds = [];
  Object.values(state.nlpHybridSymptoms).forEach(s => s.forEach(id => extraIds.push(id)));

  const pill = document.querySelector('.floating-pill-wrap');
  if (pill) pill.classList.remove('visible');

  showPage('diagnosis', 'results');

  let fullResponse = null;
  try {
    const resp = await fetchNLPDiagnosis(text, extraIds);
    if (resp && resp.results) fullResponse = resp;
  } catch (e) {
    console.error('[DermaNetra NLP] Error:', e);
    // Show error in results
    setTimeout(() => {
      const loadEl = document.getElementById('results-loading');
      const contentEl = document.getElementById('results-content');
      if (loadEl) loadEl.classList.add('hidden');
      if (contentEl) {
        contentEl.classList.remove('hidden');
        contentEl.innerHTML = `
          <div class="max-w-lg mx-auto mt-12 p-8 bg-red-50 border border-red-100 rounded-2xl text-center">
            <div class="text-3xl mb-3">⚠️</div>
            <h3 class="font-black text-red-700 mb-2">Gejala Tidak Terdeteksi</h3>
            <p class="text-sm text-red-600 mb-4">${e.message}</p>
            <p class="text-xs text-slate-500 mb-6">Coba gunakan kalimat yang lebih deskriptif seperti: "kulit gatal parah di malam hari", "muncul bercak merah bersisik", dll.</p>
            <button onclick="goBackToDiagnosis()" class="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all">
              ← Kembali & Perbaiki Keluhan
            </button>
          </div>`;
      }
    }, 500);
    return;
  }

  state.nlpFullResponse = fullResponse;
  state.results = fullResponse ? fullResponse.results : null;
  state.fullResponse = fullResponse;
  setTimeout(() => renderResults(fullResponse), 380);
}

// Open side drawer for hybrid manual symptom selection
function openHybridMode() {
  // Open the body modal but use 'hybrid' flag
  // Pick a global region or let user select — show full symptom list
  // For simplicity, use 'head' region which will show global symptoms
  // Actually we'll show ALL symptoms in a combined drawer
  openHybridSymptomDrawer();
}

function openHybridSymptomDrawer() {
  // Use the existing drawer but populate with a "hybrid" region containing all symptoms from the KB
  const allSymptoms = [];
  if (typeof SYMPTOM_DB !== 'undefined') {
    Object.values(SYMPTOM_DB).forEach(db => {
      const syms = db.front || db.back || [];
      syms.forEach(s => {
        if (!allSymptoms.find(x => x.id === s.id)) allSymptoms.push(s);
      });
    });
  }

  state.activeRegion = '__hybrid__';
  const existing = new Set();
  Object.values(state.nlpHybridSymptoms).forEach(s => s.forEach(id => existing.add(id)));
  _tempSelected = new Set(existing);
  _currentModalSyms = allSymptoms;

  const regionEl = document.getElementById('modal-region');
  if (regionEl) regionEl.textContent = '+ Tambah Gejala Manual (Hybrid)';

  const badgeEl = document.getElementById('modal-view-badge');
  if (badgeEl) badgeEl.textContent = 'HYBRID MODE';

  const searchEl = document.getElementById('modal-search');
  if (searchEl) searchEl.value = '';

  renderModalSymptoms(allSymptoms, existing, '');
  document.getElementById('symptom-modal').classList.add('open');
  document.getElementById('modal-overlay').classList.add('open');
  if (searchEl) setTimeout(() => searchEl.focus(), 300);
}

// Override confirmModal for hybrid mode
const _origConfirmModal = window.confirmModal;
function confirmModal() {
  if (state.activeRegion === '__hybrid__') {
    // Save to hybrid symptoms
    state.nlpHybridSymptoms = { hybrid: new Set(_tempSelected) };
    closeModal();
    updateHybridBadge();
    return;
  }
  // Normal manual mode
  if (!state.activeRegion) return;
  if (_tempSelected.size > 0) {
    state.symptoms[state.activeRegion] = new Set(_tempSelected);
  } else {
    delete state.symptoms[state.activeRegion];
  }
  closeModal();
  renderBodyMap();
}

function clearHybridSymptoms() {
  state.nlpHybridSymptoms = {};
  updateHybridBadge();
}

function updateHybridBadge() {
  const badge = document.getElementById('hybrid-badge');
  const countLabel = document.getElementById('hybrid-count-label');
  if (!badge) return;

  let total = 0;
  Object.values(state.nlpHybridSymptoms).forEach(s => total += s.size);

  if (total > 0) {
    badge.classList.remove('hidden');
    if (countLabel) countLabel.textContent = ` ${total} gejala manual ditambahkan`;
  } else {
    badge.classList.add('hidden');
  }
}

// Build NLP result banner (shown at top of results when NLP mode)
function buildNLPResultsBanner(fullResponse) {
  if (!fullResponse || !fullResponse.method || !fullResponse.method.startsWith('nlp')) return '';
  const dict = I18N[state.language];
  const n = fullResponse.matched_symptoms ? fullResponse.matched_symptoms.length : 0;
  const m = fullResponse.extra_symptoms ? fullResponse.extra_symptoms.length : 0;
  const isHybrid = fullResponse.method === 'nlp_hybrid_naive_bayes';

  return `
    <div class="nlp-result-banner animate-fade">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-500 to-primary flex-shrink-0 flex items-center justify-center shadow">
        <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
      <div class="nlp-badge-text">${dict.nlpResultBanner(n, m)}</div>
      ${isHybrid
        ? '<span class="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-black rounded-full border border-violet-200 uppercase tracking-widest ml-auto">Gabungan</span>'
        : '<span class="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-black rounded-full border border-teal-200 uppercase tracking-widest ml-auto">Cerita Gejala</span>'}
    </div>`;
}

// Event listener agar panel debug muncul langsung tanpa reload saat URL ditambah #nlp
window.addEventListener('hashchange', () => {
  const container = document.getElementById('nlp-debug-container');
  if (container) {
    if (window.location.hash.toLowerCase().includes('nlp')) {
      container.classList.remove('hidden');
    } else {
      container.classList.add('hidden');
    }
  }
});
