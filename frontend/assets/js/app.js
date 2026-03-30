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
    versionText: 'DermaNetra v6.0',
    legalText: 'Hanya untuk tujuan edukasi & skrining',
    mapTitle: 'Peta Tubuh Interaktif',
    mapDesc: 'Ketuk titik kuning untuk menambah gejala',
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
    medicalDisclaimer: 'Penafian Medis: Sistem ini menggunakan algoritma Naive Bayes untuk skrining awal dan BUKAN diagnosis medis. Selalu konsultasikan dengan dokter spesialis kulit berlisensi.',
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
    versionText: 'DermaNetra v6.0',
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
    medicalDisclaimer: 'Medical Disclaimer: This system uses a Naive Bayes algorithm for preliminary screening and is NOT a medical diagnosis. Always consult a board-certified dermatologist.',
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

function openModal(regionKey){
  if(regionKey==='groin') regionKey='pelvis';
  state.activeRegion = regionKey;
  const db = SYMPTOM_DB[regionKey];
  if(!db) return;

  const syms = (db[state.currentView]&&db[state.currentView].length) ? db[state.currentView] : (db.front||[]);
  _currentModalSyms = syms;
  const existing = state.symptoms[regionKey] || new Set();

  document.getElementById('modal-region').textContent = db.label;
  document.getElementById('modal-view-badge').textContent = state.currentView==='front' ? I18N[state.language].viewFront : I18N[state.language].viewBack;

  const searchEl = document.getElementById('modal-search');
  if(searchEl) searchEl.value = '';

  renderModalSymptoms(syms, existing, '');

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
    const currentSet = state.symptoms[rKey] || new Set();
    const isChecked = currentSet.has(sym.id);
    
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
    div.querySelector('input').addEventListener('change', updateModalSelectedCount);
    list.appendChild(div);
  });

  updateModalSelectedCount();
}

function filterSymptoms(query){
  const existing = state.symptoms[state.activeRegion] || new Set();
  renderModalSymptoms(_currentModalSyms, existing, query);
}

function updateModalSelectedCount(){
  const checked = document.querySelectorAll('#modal-symptom-list input:checked').length;
  const countEl = document.getElementById('modal-selected-count');
  const btn = document.getElementById('modal-add-btn');
  const dict = I18N[state.language];

  if(countEl){
    if(checked > 0){
      countEl.textContent = dict.symptomsCount(checked);
      countEl.classList.remove('hidden');
    } else {
      countEl.classList.add('hidden');
    }
  }
  if(btn) btn.textContent = checked > 0 ? `${dict.addBtn} (${checked})` : dict.addBtn;
}

function closeModal(){
  document.getElementById('symptom-modal').classList.remove('open');
  document.getElementById('modal-overlay').classList.remove('open');
  state.activeRegion = null;
  _currentModalSyms = [];
}

function confirmModal(){
  if(!state.activeRegion) return;
  const checked = document.querySelectorAll('#modal-symptom-list input:checked');
  const set = new Set();
  checked.forEach(c => set.add(parseInt(c.value) || c.value)); // handles numeric ids too
  if(set.size > 0) state.symptoms[state.activeRegion] = set;
  else delete state.symptoms[state.activeRegion];
  
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
        <span class="gauge-percent">${percentage}%</span>
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
    <div class="report-visualization">
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
  return `<div class="triage-badge ${c.cls}">
    <span class="triage-label">${c.label}</span>
    <span class="triage-desc">${note || c.desc}</span>
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

// ── Build Results UI (Redesigned — All 5 Phases) ──────────
function buildResultsUI(results){
  const el = document.getElementById('results-content');
  if(!el) return;
  const dict = I18N[state.language];

  try {
    if(!results || !results.length){
      el.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 animate-fade">
          <div class="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
            <svg class="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">${dict.noMatchesFound}</h3>
          <p class="text-slate-500 max-w-xs text-center mb-8">The expert system couldn't confidently identify a condition based on these symptoms.</p>
          <button onclick="resetAll()" class="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-all">Start Over</button>
        </div>`;
      return;
    }

    const p = results[0];
    const alts = results.slice(1, 4);
    const db = (typeof DISEASE_DB !== 'undefined' && DISEASE_DB[p.disease_id]) || {};
    const t = db.treatments || {otc:[],prescription:[],lifestyle:[],see_doctor:'Consult a medical professional.'};

    // Collect all user symptom IDs
    const allUserSymptomIds = [];
    Object.values(state.symptoms).forEach(s => s.forEach(id => allUserSymptomIds.push(id)));

    // Helper for localized extraction
    const _getV = (v) => {
      if (!v) return '';
      if (typeof v === 'string') return v;
      if (Array.isArray(v)) return v; 
      return v[state.language] || v['id'] || v;
    };

    const _lst = (arrOrObj) => {
      const data = _getV(arrOrObj);
      if (!data || !Array.isArray(data)) return `<li>${dict.notSpecified || 'Not specified.'}</li>`;
      return data.length ? data.map(x=>`<li>${x}</li>`).join('') : `<li>${dict.notSpecified || 'None.'}</li>`;
    };

    el.innerHTML = `
      <!-- Context Bar -->
      <div class="result-context-bar animate-fade mb-6">
        <div class="flex items-center gap-2">
          <span class="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider">${state.sex==='male' ? dict.contextMale : dict.contextFemale}, ${state.age}</span>
          <span class="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider">${SKIN_LABELS[state.language][state.skinType] || state.skinType}</span>
        </div>
      </div>

      <!-- Box 1: Primary Diagnosis Card + Triage -->
      <div class="primary-card animate-fade shadow-xl border border-slate-100">
        <div class="primary-card-header p-6 bg-primary text-white flex justify-between items-center rounded-t-2xl">
          <div class="flex flex-col">
            <span class="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">${dict.topMatch}</span>
            <h1 class="text-3xl font-extrabold tracking-tight">${state.language === 'en' ? (p.disease_name_en || p.disease_name) : (p.disease_name_id || p.disease_name)}</h1>
          </div>
          ${getCircularGauge(Math.round(p.percentage))}
        </div>
        
        <div class="p-8 bg-white">
          <div class="disease-meta mb-4 flex flex-wrap gap-2">
            <span class="meta-chip px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold">${dict.icdLabel}: ${p.icd10}</span>
            <span class="meta-chip px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold">${_getV(db.prevalence) || 'Common'}</span>
            <span class="meta-chip px-3 py-1 border rounded-lg text-xs font-bold ${p.contagious ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}">${p.contagious ? 'CONTAGIOUS' : 'NON-CONTAGIOUS'}</span>
          </div>
          ${getTriageBadge(p.disease_id)}
          <p class="disease-desc text-slate-700 text-lg leading-relaxed mt-4">${state.language === 'en' ? (p.description_en || p.description) : (p.description_id || p.description)}</p>
        </div>
      </div>

      <!-- Box 1b: Blueprint Body Map (ON-SCREEN + Print) -->
      <div class="section-card bg-white border border-slate-200 p-6 rounded-2xl shadow-sm my-8">
        <h3 class="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M9 20l-5.447-2.724A2 2 0 013 15.488V5.488a2 2 0 011.553-1.956l10-2A2 2 0 0117 3.488v10.024a2 2 0 01-1.553 1.956L9 20zm0 0V9"/></svg>
          🗺️ ${dict.blueprintTitle}
        </h3>
        <p class="text-xs text-slate-500 mb-6">Area biru menunjukkan lokasi tubuh di mana Anda melaporkan gejala.</p>
        ${getReportVisualization()}
      </div>

      <!-- Box 2: Symptom Match Analysis -->
      ${buildSymptomMatchSection(p.disease_id, allUserSymptomIds)}

      <!-- Box 3: Red Flags Checklist -->
      ${buildRedFlagsSection(p.disease_id)}

      <!-- Box 4: Clinical Features + Causes + Treatment -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        <div class="flex flex-col gap-6">
          <div class="section-card bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
            <h3 class="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              ${dict.clinicalFeatures}
            </h3>
            <ul class="space-y-2 text-sm text-slate-700 list-disc pl-4">${_lst(db.clinical_features)}</ul>
          </div>
          
          <div class="section-card bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
            <h3 class="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              ${dict.causesLabel}
            </h3>
            <ul class="space-y-2 text-sm text-slate-700 list-disc pl-4">${_lst(db.causes)}</ul>
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <div class="section-card bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex-1">
            <h3 class="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
              ${dict.treatmentPlan}
            </h3>
            <div class="space-y-4">
              <div class="p-4 rounded-xl bg-slate-50 border-l-4 border-green-500">
                <div class="text-[10px] font-black uppercase tracking-widest text-green-700 mb-2">${dict.otc}</div>
                <ul class="text-sm text-slate-700 space-y-1">${_lst(t.otc)}</ul>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border-l-4 border-blue-500">
                <div class="text-[10px] font-black uppercase tracking-widest text-blue-700 mb-2">${dict.rx}</div>
                <ul class="text-sm text-slate-700 space-y-1">${_lst(t.prescription)}</ul>
              </div>
            </div>
            
            <!-- Personalized Notes (Fase 5) -->
            ${getPersonalizedNotes(p.disease_id)}

            <div class="see-doctor-box mt-6 p-4 rounded-xl border-2 border-amber-200 bg-amber-50 text-amber-900 text-sm flex gap-3">
              <svg class="w-5 h-5 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <div><strong class="block mb-1 font-bold">${dict.whenToSee}</strong> ${_getV(t.see_doctor)}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Box 5: Alternative Diagnoses -->
      ${alts.length ? `
      <div class="section-card bg-white border border-slate-100 p-6 rounded-2xl shadow-sm my-8 animate-fade">
        <h3 class="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
          ${dict.otherConditions}
        </h3>
        <div class="space-y-3">
          ${alts.map(a => {
            const altDb = DISEASE_DB[a.disease_id] || {};
            return `
            <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all">
              <div>
                <div class="font-bold text-sm text-slate-800">${state.language === 'en' ? (a.disease_name_en || a.disease_name) : (a.disease_name_id || a.disease_name)}</div>
                <div class="text-[10px] text-slate-500 mt-0.5">${a.icd10} • ${_getV(altDb.prevalence) || ''}</div>
              </div>
              <div class="text-right">
                <div class="text-lg font-extrabold text-slate-700">${Math.round(a.percentage)}%</div>
                <div class="text-[10px] text-slate-400">kecocokan</div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>` : ''}

      <!-- Box 6: Medical Disclaimer -->
      <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed my-8 flex gap-3 items-start animate-fade">
        <svg class="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <div><strong class="text-slate-700">⚕️ ${dict.medicalDisclaimer.split(':')[0]}:</strong> ${dict.medicalDisclaimer.split(':').slice(1).join(':')}</div>
      </div>
    `;
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
