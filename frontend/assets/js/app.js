// ═══════════════════════════════════════════════════════════
//  DermaNetra — Application Logic v5
//  Centered body map · Premium modal with search · Floating pill
// ═══════════════════════════════════════════════════════════

const state = {
  age:'', sex:'', skinType:'', duration:'', disclaimer:false,
  view:'front',
  activeRegion:null,
  symptoms:{},
  results:null,
};

// ── Intake Form ─────────────────────────────────────────────
function selectSex(sex){
  state.sex = sex;
  document.getElementById('sex-male').classList.toggle('active', sex==='male');
  document.getElementById('sex-female').classList.toggle('active', sex==='female');
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

// ── Disclaimer visual ────────────────────────────────────
function updateDisclaimerVisual(checked){
  const box  = document.querySelector('.disc-box');
  const icon = document.querySelector('.disc-check-icon');
  if(!box) return;
  box.style.background  = checked ? '#0891b2' : 'white';
  box.style.borderColor = checked ? '#0891b2' : '#cbd5e1';
  if(icon) icon.style.display = checked ? 'block' : 'none';
}
document.addEventListener('DOMContentLoaded',()=>{
  const chk = document.getElementById('chk-disclaimer');
  if(chk) chk.addEventListener('change', function(){ updateDisclaimerVisual(this.checked); checkForm(); });
});

// ── Page Transitions ──────────────────────────────────────
function showPage(from, to){
  const fEl = document.getElementById('page-'+from);
  fEl.style.transition = 'opacity .3s ease,transform .3s ease';
  fEl.style.opacity = '0'; fEl.style.transform = 'translateY(-14px)';
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
  Object.assign(state,{age:'',sex:'',skinType:'',duration:'',disclaimer:false,view:'front',activeRegion:null,symptoms:{},results:null});
  document.getElementById('input-age').value = '';
  document.getElementById('input-skin').value = '';
  const chk = document.getElementById('chk-disclaimer');
  if(chk) chk.checked = false;
  updateDisclaimerVisual(false);
  document.querySelectorAll('.sex-btn,.dur-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('btn-start').disabled = true;
  const slider = document.getElementById('toggle-slider');
  if(slider) slider.classList.remove('back');
  const lF = document.getElementById('lbl-front');
  const lB = document.getElementById('lbl-back');
  if(lF){ lF.classList.add('active'); }
  if(lB){ lB.classList.remove('active'); }
  showPage('diagnosis','intake');
}
function goBackToDiagnosis(){
  showPage('results','diagnosis');
  setTimeout(()=>renderBodyMap(), 380);
}

// ── Patient Info ──────────────────────────────────────────
const SKIN_LABELS = {normal:'Normal Skin',dry:'Dry Skin',oily:'Oily Skin',combination:'Combination Skin',sensitive:'Sensitive Skin'};
const DUR_LABELS  = {lt3days:'< 3 Days','1to2weeks':'1–2 Weeks',gt1month:'> 1 Month'};
function populatePatientInfo(){
  const sL  = state.sex==='male' ? 'Male' : 'Female';
  const skL = SKIN_LABELS[state.skinType] || state.skinType;
  const hp  = document.getElementById('header-patient');
  if(hp) hp.textContent = `${sL}, ${state.age} · ${skL}`;
}

// ═══════════════════════════════════════════════════════════
//  BODY MAP — SVG hotspot overlay
//  ViewBox: 0 0 100 180 — calibrated per sex (female offset +6Y)
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════

// Male (front) — calibrated to male_front.png (1:1 square image)
// viewBox is now 0 0 640 640
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

// Female Front — perfectly symmetric coordinates (Right side = ground truth; Left = mirror x→640-x)
const REGIONS_FEMALE_FRONT = [
  // ── Head & Neck ────────────────────────────────────────────
  {key:'head',    label:'Head & Face',    shape:'polygon', points:'320,34 308,38 297,48 294,65 295,81 299,94 310,102 320,105 330,102 341,94 345,81 346,65 343,48 332,38'},
  {key:'neck',    label:'Neck',           shape:'polygon', points:'308,105 306,116 304,128 312,132 320,133 328,132 336,128 334,116 332,105'},
  // ── Torso ──────────────────────────────────────────────────
  {key:'chest',   label:'Chest',          shape:'polygon', points:'278,130 272,155 270,185 276,202 300,204 320,204 340,204 364,202 370,185 368,155 362,130'},
  {key:'abdomen', label:'Abdomen',        shape:'polygon', points:'276,202 274,228 272,252 268,272 295,275 320,276 345,275 372,272 368,252 366,228 364,202'},
  {key:'pelvis',  label:'Pelvis & Groin', shape:'polygon', points:'268,272 278,292 292,310 308,325 320,330 332,325 348,310 362,292 372,272'},
  // ── Arms (Right = ground truth, Left = mirror) ─────────────
  // Right Arm  (screen-right = patient right)  → x as-is
  {key:'arms',    label:'Right Arm',      shape:'polygon', points:'372,128 388,158 396,198 414,250 424,296 430,304 418,310 402,278 389,232 374,192 370,152'},
  // Left Arm   (screen-left = patient left)   → x = 640 - x_right
  {key:'arms',    label:'Left Arm',       shape:'polygon', points:'268,128 252,158 244,198 226,250 216,296 210,304 222,310 238,278 251,232 266,192 270,152'},
  // ── Hands (Right = ground truth, Left = mirror) ────────────
  // Right Hand
  {key:'hands',   label:'Right Hand',     shape:'polygon', points:'420,308 422,330 426,354 436,364 448,362 454,350 454,324 430,306'},
  // Left Hand  → x = 640 - x_right
  {key:'hands',   label:'Left Hand',      shape:'polygon', points:'220,308 218,330 214,354 204,364 192,362 186,350 186,324 210,306'},
  // ── Legs (Right = ground truth, Left = mirror) ─────────────
  // Right Leg — clean top, natural inner edge, properly tapered calf
  {key:'legs',    label:'Right Leg',      shape:'polygon', points:'376,340 374,395 368,460 360,522 350,568 338,574 326,568 322,500 324,450 326,400 328,340'},
  // Left Leg   → x = 640 - x_right
  {key:'legs',    label:'Left Leg',       shape:'polygon', points:'264,340 266,395 272,460 280,522 290,568 302,574 314,568 318,500 316,450 314,400 312,340'},
  // ── Feet (Right = ground truth, Left = mirror) ─────────────
  // Right Foot — cleaner smaller shape
  {key:'feet',    label:'Right Foot',     shape:'polygon', points:'340,572 338,600 354,614 370,610 356,576'},
  // Left Foot  → x = 640 - x_right
  {key:'feet',    label:'Left Foot',      shape:'polygon', points:'300,572 302,600 286,614 270,610 284,576'},
];

// Female Back — perfectly symmetric coordinates (Right side = ground truth; Left = mirror x→640-x)
const REGIONS_FEMALE_BACK = [
  // ── Head & Neck ────────────────────────────────────────────
  // Head — enlarged, properly centered at x=320
  {key:'head',    label:'Head (Back)',    shape:'polygon', points:'320,20 305,30 292,46 288,64 292,84 306,96 320,100 334,96 348,84 352,64 348,46 335,30'},
  // Neck — wider and taller to properly cover neck area
  {key:'neck',    label:'Neck (Back)',    shape:'polygon', points:'310,98 306,112 312,122 320,125 328,122 334,112 330,98'},
  // ── Torso ──────────────────────────────────────────────────
  {key:'back',    label:'Back',          shape:'polygon', points:'265,122 266,155 274,184 300,186 320,185 340,186 366,184 374,155 375,122'},
  {key:'abdomen', label:'Lower Back',    shape:'polygon', points:'268,202 270,240 266,278 294,280 320,282 346,280 374,278 370,240 372,202'},
  {key:'pelvis',  label:'Buttocks',      shape:'polygon', points:'266,276 260,310 258,332 264,342 294,346 320,348 346,346 376,342 382,332 380,310 374,276'},
  // ── Arms (Right = ground truth, Left = mirror) ─────────────
  // Right Arm
  {key:'arms',    label:'Right Arm',     shape:'polygon', points:'380,130 394,154 402,206 412,258 416,312 408,312 392,264 382,212 370,152'},
  // Left Arm  → x = 640 - x_right
  {key:'arms',    label:'Left Arm',      shape:'polygon', points:'260,130 246,154 238,206 228,258 224,312 232,312 248,264 258,212 270,152'},
  // ── Hands (Right = ground truth, Left = mirror) ────────────
  // Right Hand
  {key:'hands',   label:'Right Hand',    shape:'polygon', points:'404,314 402,340 406,364 414,370 420,358 422,330 418,314'},
  // Left Hand  → x = 640 - x_right
  {key:'hands',   label:'Left Hand',     shape:'polygon', points:'236,314 238,340 234,364 226,370 220,358 218,330 222,314'},
  // ── Legs (Right = ground truth, Left = mirror) ─────────────
  // Right Leg — natural thigh gap inner edge, better contour matching model silhouette
  {key:'legs',    label:'Right Leg',     shape:'polygon', points:'378,346 374,410 368,472 360,535 350,578 338,584 326,578 320,535 322,472 324,410 328,346'},
  // Left Leg  → x = 640 - x_right
  {key:'legs',    label:'Left Leg',      shape:'polygon', points:'262,346 266,410 272,472 280,535 290,578 302,584 314,578 320,535 318,472 316,410 312,346'},
  // ── Feet (Right = ground truth, Left = mirror) ─────────────
  // Right Foot — clean small shape matching ankle width
  {key:'feet',    label:'Right Foot',    shape:'polygon', points:'340,582 338,608 352,618 364,612 352,586'},
  // Left Foot  → x = 640 - x_right
  {key:'feet',    label:'Left Foot',     shape:'polygon', points:'300,582 302,608 288,618 276,612 288,586'},
];

function regionHasSymptoms(key){ return state.symptoms[key] && state.symptoms[key].size>0; }
function regionFill(key)  { return regionHasSymptoms(key) ? 'rgba(8,145,178,0.20)' : 'rgba(255,255,255,0.01)'; }
function regionStroke(key){ return regionHasSymptoms(key) ? '#0891b2' : 'rgba(0,0,0,0)'; }

// ── Visual Group Rules ─────────────────────────────────────
// Regions in the same MERGE_GROUP will all be highlighted together on hover.
// e.g. hovering "Right Arm" also highlights "Left Arm", "Right Hand", "Left Hand".
// Label keywords used to detect left/right side:
const MERGE_GROUPS = [
  // arms + hands (both sides merged into one visual group)
  { keys: ['arms', 'hands'] },
  // legs + feet (both sides merged into one visual group)
  { keys: ['legs', 'feet'] },
];

// Returns the merged key-set for a given region key, or just [key] if standalone
function getMergedKeys(key){
  for(const g of MERGE_GROUPS){
    if(g.keys.includes(key)) return g.keys;
  }
  return [key];
}

// ── Render Body Map ────────────────────────────────────────
function renderBodyMap(){
  const isMale  = state.sex === 'male';
  const isFront = state.view === 'front';
  const imgSrc  = isMale
    ? (isFront ? 'assets/images/male_front.png'   : 'assets/images/male_back.png')
    : (isFront ? 'assets/images/female_front.png' : 'assets/images/female_back.png');

  // Use sex-specific coordinate sets
  let regions;
  if(isMale)  { regions = isFront ? REGIONS_FRONT : REGIONS_BACK; }
  else        { regions = isFront ? REGIONS_FEMALE_FRONT : REGIONS_FEMALE_BACK; }

  const container = document.getElementById('body-map-container');
  container.innerHTML = '';

  // Full-height wrap — no background, no border-radius
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:relative;width:100%;height:100%;cursor:default;';

  const img = document.createElement('img');
  img.src = imgSrc; img.alt = 'Body diagram';
  
  // mix-blend-mode: multiply menghapus warna putih/abu terang dari background bawaan gambar. 
  // filter: drop-shadow & contrast memberikan efek embos 3D yang menonjolkan bentuk tubuh.
  img.style.cssText = 'width:100%;height:100%;display:block;object-fit:contain;object-position:top center;mix-blend-mode:multiply;filter:drop-shadow(0 20px 40px rgba(0,0,0,0.2)) contrast(1.1);';
  
  img.onerror = ()=>{
    img.style.display = 'none';
  };

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS,'svg');
  // Calibrated viewbox: perfectly matches the 640x640 PNG image coordinates
  svg.setAttribute('viewBox','0 0 640 640');
  svg.setAttribute('preserveAspectRatio','xMidYMin meet');
  svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:all;';

  // Build an index: key -> [shape elements]
  // so we can bulk-highlight all shapes sharing a visual group
  const shapesByKey = {}; // { 'arms': [shapeEl, shapeEl], 'hands': [...], ... }

  // First pass — create all shapes
  const shapeInfos = regions.map(r => {
    const g = document.createElementNS(svgNS,'g');
    g.style.cursor = 'pointer';

    const shape = document.createElementNS(svgNS,'polygon');
    shape.setAttribute('points', r.points);
    shape.setAttribute('fill', regionFill(r.key));
    shape.setAttribute('stroke', regionStroke(r.key));
    shape.setAttribute('stroke-width','0.8');
    shape.style.transition = 'fill .15s, stroke .15s';
    g.appendChild(shape);
    svg.appendChild(g);

    if(!shapesByKey[r.key]) shapesByKey[r.key] = [];
    shapesByKey[r.key].push({ shape, key: r.key });

    return { g, shape, r };
  });

  // Helper: get all shapes that belong to the visual group of a key
  function getSiblingShapes(key){
    const groupKeys = getMergedKeys(key);
    const result = [];
    groupKeys.forEach(k => { if(shapesByKey[k]) shapesByKey[k].forEach(s => result.push(s)); });
    return result;
  }

  // Second pass — attach events (now shapesByKey is fully populated)
  shapeInfos.forEach(({ g, shape, r }) => {
    g.addEventListener('mouseenter', e=>{
      // Highlight all shapes in the same visual group (arms+hands, or legs+feet)
      getSiblingShapes(r.key).forEach(({ shape: s }) => {
        s.setAttribute('fill','rgba(0,191,255,0.15)');
        s.setAttribute('stroke','cyan');
        s.setAttribute('stroke-width','0.6');
      });
      showTooltip(r.label, e);
    });
    g.addEventListener('mousemove', e=>showTooltip(r.label, e));
    g.addEventListener('mouseleave', ()=>{
      // Restore all shapes in the same visual group
      getSiblingShapes(r.key).forEach(({ shape: s, key: k }) => {
        s.setAttribute('fill', regionFill(k));
        s.setAttribute('stroke', regionStroke(k));
        s.setAttribute('stroke-width','0.8');
      });
      hideTooltip();
    });
    g.addEventListener('click', ()=>{ hideTooltip(); openModal(r.key); });
  });

  wrap.appendChild(img);
  wrap.appendChild(svg);
  container.appendChild(wrap);

  updateAnalyzeBar();
}

// ── Pill Tooltip (cursor-following, fixed) ────────────────
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
  state.view = state.view==='front' ? 'back' : 'front';
  const slider = document.getElementById('toggle-slider');
  const lF = document.getElementById('lbl-front');
  const lB = document.getElementById('lbl-back');
  if(state.view==='back'){
    slider.classList.add('back'); lF.classList.remove('active'); lB.classList.add('active');
  } else {
    slider.classList.remove('back'); lF.classList.add('active'); lB.classList.remove('active');
  }
  renderBodyMap();
}

// ── Floating Action Bar (pill at bottom center) ──────────
function updateAnalyzeBar(){
  const allEntries = Object.entries(state.symptoms).filter(([,s])=>s.size>0);
  const total = allEntries.reduce((n,[,s])=>n+s.size, 0);
  const btn     = document.getElementById('btn-analyze');
  const counter = document.getElementById('floating-count');
  const bar     = document.getElementById('floating-bar');

  if(bar) {
    if(total > 0 && state.view === 'front' && window.getComputedStyle(document.getElementById('page-diagnosis')).display !== 'none') {
      bar.classList.remove('hidden');
    } else if (total === 0) {
      bar.classList.add('hidden');
    }
    // Also if we have total > 0 but we are on intake or results, app.js logic normally hides it.
    // However, the bar is globally sticky. The original design unconditionally showed/hid it.
    if(total > 0) bar.classList.remove('hidden');
    else bar.classList.add('hidden');
  }

  if(counter){
    counter.textContent = total > 0
      ? `${total} Symptom${total>1?'s':''} Added`
      : 'No Symptoms Yet';
    counter.style.color = total > 0 ? '#0891b2' : '#94a3b8';
  }
  if(btn){
    btn.disabled = total === 0;
    btn.style.opacity = total > 0 ? '1' : '0.4';
  }
}

// ═══════════════════════════════════════════════════════════
//  SYMPTOM MODAL — with search, dynamic button count
// ═══════════════════════════════════════════════════════════
let _currentModalSyms = [];

function openModal(regionKey){
  if(regionKey==='groin') regionKey='pelvis';
  state.activeRegion = regionKey;
  const db = SYMPTOM_DB[regionKey];
  if(!db) return;

  const syms = (db[state.view]&&db[state.view].length) ? db[state.view] : (db.front||[]);
  _currentModalSyms = syms;
  const existing = state.symptoms[regionKey] || new Set();

  // Set header
  document.getElementById('modal-region').textContent = db.label + ' Symptoms';
  document.getElementById('modal-view-badge').textContent = state.view==='front' ? 'FRONT VIEW' : 'BACK VIEW';

  // Reset search
  const searchEl = document.getElementById('modal-search');
  if(searchEl) searchEl.value = '';

  // Reset selected count display
  updateModalSelectedCount();

  // Render symptoms
  renderModalSymptoms(syms, existing, '');

  document.getElementById('symptom-modal').classList.add('open');
  document.getElementById('modal-overlay').classList.add('open');
  if(searchEl) setTimeout(()=>searchEl.focus(), 300);
}

function renderModalSymptoms(syms, existing, query){
  const list = document.getElementById('modal-symptom-list');
  list.innerHTML = '';
  const rKey = state.activeRegion;

  if(!syms.length || (syms[0]&&syms[0].startsWith('Referred'))){
    list.innerHTML = `<div style="text-align:center;padding:32px 16px;color:#94a3b8;">
      <svg style="width:32px;height:32px;margin:0 auto 10px;color:#cbd5e1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
      <p style="font-size:13px;">Switch to <strong>Back View</strong><br/>to select symptoms for this region.</p>
    </div>`;
    document.getElementById('modal-add-btn').textContent = 'Add Symptom(s)';
    return;
  }

  const q = query.toLowerCase().trim();
  const filtered = q ? syms.filter(s=>s.toLowerCase().includes(q)) : syms;

  if(!filtered.length){
    list.innerHTML = `<div style="text-align:center;padding:24px;color:#94a3b8;font-size:13px;">No symptoms match "<strong>${query}</strong>"</div>`;
    document.getElementById('modal-add-btn').textContent = 'Add Symptom(s)';
    return;
  }

  filtered.forEach((sym,i)=>{
    const id = `msym-${rKey}-${i}`;
    const div = document.createElement('div');
    div.className = 'sym-check-item';
    const currentSet = state.symptoms[rKey] || new Set();
    div.innerHTML = `<input type="checkbox" id="${id}" value="${sym}" ${currentSet.has(sym)?'checked':''}/>
      <label for="${id}"><span class="chk-box"></span><span>${sym}</span></label>`;
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

  if(countEl){
    if(checked > 0){
      countEl.textContent = `${checked} symptom${checked>1?'s':''} selected`;
      countEl.classList.remove('hidden');
    } else {
      countEl.classList.add('hidden');
    }
  }
  if(btn){
    btn.textContent = checked > 0 ? `Add ${checked} Symptom${checked>1?'s':''}` : 'Add Symptom(s)';
  }
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
  const set = new Set(); checked.forEach(c=>set.add(c.value));
  if(set.size > 0){
    state.symptoms[state.activeRegion] = set;
  } else {
    delete state.symptoms[state.activeRegion];
  }
  closeModal();
  renderBodyMap();
}

// ── Expert System Engine ──────────────────────────────────
function runExpertSystem(){
  const allSelected = new Set();
  Object.values(state.symptoms).forEach(s=>s.forEach(v=>allSelected.add(v)));
  if(!allSelected.size) return null;

  const scores = DISEASE_DB.map(disease=>{
    let score = 0;
    const matched = new Set();

    disease.trigger_symptoms.forEach(ts=>{
      if(allSelected.has(ts)){ score+=2; matched.add(ts); }
    });
    allSelected.forEach(sel=>{
      const selWords = sel.toLowerCase().split(/[\s/(),\-]+/).filter(w=>w.length>3);
      disease.trigger_symptoms.forEach(ts=>{
        if(matched.has(ts)) return;
        const tsLow = ts.toLowerCase();
        if(selWords.some(w=>tsLow.includes(w))){ score+=0.7; matched.add(ts); }
      });
    });
    const selRegions = Object.keys(state.symptoms).filter(k=>state.symptoms[k].size>0);
    selRegions.forEach(r=>{
      const rAlt = r==='pelvis'?'groin':r;
      if(disease.affected_regions.includes(r)||disease.affected_regions.includes(rAlt)) score+=0.8;
    });
    if(state.skinType==='oily'      && ['acne','rosacea','seborrheic_dermatitis','tinea_versicolor'].includes(disease.id)) score+=1;
    if(state.skinType==='dry'       && ['eczema','psoriasis','contact_dermatitis'].includes(disease.id)) score+=1;
    if(state.skinType==='sensitive' && ['eczema','contact_dermatitis','urticaria'].includes(disease.id)) score+=0.5;

    const maxPossible = disease.trigger_symptoms.length * 2.5;
    const confidence  = Math.min(97, Math.max(10, Math.round((score/maxPossible)*100)));
    return {disease, score, confidence};
  });

  scores.sort((a,b)=>b.score-a.score);
  const top = scores.filter(s=>s.score>0.5).slice(0,3);
  return top.length ? top : null;
}

// ── Analyze Flow ──────────────────────────────────────────
function analyzeCondition(){
  const results = runExpertSystem();
  state.results = results;
  document.getElementById('floating-bar').classList.add('hidden');
  showPage('diagnosis','results');
  setTimeout(()=>renderResults(results), 380);
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
    requestAnimationFrame(()=>{ contentEl.style.transition='opacity .5s'; contentEl.style.opacity='1'; });
  }, 2500);
}

// ── Disease color dot (no emoji) ─────────────────────────
const DISEASE_COLOR = {
  acne:'#f87171', eczema:'#fb923c', psoriasis:'#f59e0b',
  tinea_corporis:'#22c55e', urticaria:'#eab308', contact_dermatitis:'#a16207',
  rosacea:'#ec4899', seborrheic_dermatitis:'#6366f1',
  tinea_pedis:'#0891b2', tinea_versicolor:'#94a3b8', tinea_cruris:'#ef4444',
};
function diseaseColorDot(disease, size='44px', radius='12px'){
  const c = DISEASE_COLOR[disease.id] || '#0891b2';
  return `<div style="width:${size};height:${size};border-radius:${radius};background:${c}20;border:2px solid ${c};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
    <div style="width:calc(${size} * 0.4);height:calc(${size} * 0.4);border-radius:50%;background:${c}"></div>
  </div>`;
}

// ── Build Results UI ──────────────────────────────────────
function buildResultsUI(results){
  const el = document.getElementById('results-content');
  if(!results||!results.length){
    el.innerHTML = `<div style="text-align:center;padding:48px;"><h3 style="font-size:18px;font-weight:700;color:#334155;margin-bottom:8px;">No Matches Found</h3>
      <p style="color:#64748b;font-size:14px;">The selected symptoms did not match our database.<br/>Please add more symptoms or consult a dermatologist directly.</p></div>`;
    return;
  }
  const primary = results[0], alts = results.slice(1), d = primary.disease;
  el.innerHTML = `
  <div class="result-context-bar">
    <span>${state.sex==='male'?'Male':'Female'}, ${state.age} yrs</span>
    <span style="color:#94a3b8">/</span>
    <span>${SKIN_LABELS[state.skinType]||state.skinType}</span>
    <span style="color:#94a3b8">/</span>
    <span>Duration: ${DUR_LABELS[state.duration]||state.duration}</span>
  </div>

  <div class="primary-card">
    <div class="primary-card-header">
      <span class="primary-badge">PRIMARY DIAGNOSIS</span>
      <div class="confidence-ring">
        <svg viewBox="0 0 36 36" class="ring-svg">
          <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
          <path class="ring-fill" stroke-dasharray="${primary.confidence}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
        </svg>
        <span class="ring-label">${primary.confidence}%</span>
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:16px;padding:20px 24px 24px">
      ${diseaseColorDot(d)}
      <div style="flex:1">
        <div class="disease-name">${d.name}</div>
        <div class="disease-meta">
          <span class="meta-chip">ICD-10: ${d.icd10}</span>
          <span class="meta-chip">${d.prevalence}</span>
          <span class="meta-chip ${d.contagious?'chip-warn':'chip-ok'}">${d.contagious?'Contagious':'Non-contagious'}</span>
        </div>
        <p class="disease-desc">${d.description}</p>
      </div>
    </div>
  </div>

  <div class="section-card">
    <div class="section-title">Clinical Features</div>
    <ul class="feature-list">${d.clinical_features.map(f=>`<li><span class="feat-dot"></span>${f}</li>`).join('')}</ul>
  </div>

  <div class="section-card two-col">
    <div><div class="section-title">Causes</div><ul class="plain-list">${d.causes.map(c=>`<li>${c}</li>`).join('')}</ul></div>
    <div><div class="section-title">Risk Factors</div><ul class="plain-list">${d.risk_factors.map(r=>`<li>${r}</li>`).join('')}</ul></div>
  </div>

  <div class="section-card">
    <div class="section-title">Treatment Options</div>
    <div class="treatment-grid">
      <div class="treat-block treat-otc"><div class="treat-label">Over-the-Counter</div><ul>${d.treatments.otc.map(t=>`<li>${t}</li>`).join('')}</ul></div>
      <div class="treat-block treat-rx"><div class="treat-label">Prescription</div><ul>${d.treatments.prescription.map(t=>`<li>${t}</li>`).join('')}</ul></div>
      <div class="treat-block treat-life"><div class="treat-label">Lifestyle</div><ul>${d.treatments.lifestyle.map(t=>`<li>${t}</li>`).join('')}</ul></div>
    </div>
    <div class="see-doctor-box">
      <svg style="flex-shrink:0;margin-top:2px" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      <span><strong>When to See a Doctor:</strong> ${d.treatments.see_doctor}</span>
    </div>
  </div>

  ${alts.length ? `<div class="section-card">
    <div class="section-title">Other Possible Conditions</div>
    <div class="alt-grid">${alts.map(r=>`
      <div class="alt-card">
        ${diseaseColorDot(r.disease,'32px','8px')}
        <div><div class="alt-name">${r.disease.name}</div><div class="alt-icd">ICD-10: ${r.disease.icd10}</div><div class="alt-conf">Match: ${r.confidence}%</div></div>
      </div>`).join('')}
    </div>
  </div>` : ''}

  <div class="section-card">
    <div class="section-title">References & Sources</div>
    <ol class="ref-list">${d.references.map((r,i)=>`<li>${i+1}. ${r}</li>`).join('')}</ol>
    <div class="disclaimer-box">
      <strong>Medical Disclaimer:</strong> DermaNetra provides preliminary screening only and does not constitute a medical diagnosis. Always consult a licensed dermatologist.
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════════════
//  BACKEND FETCH — Connect to FastAPI (for future use)
// ═══════════════════════════════════════════════════════════
const API_BASE = 'http://localhost:8000';

async function fetchDiagnosis() {
  const allSymptoms = [];
  Object.values(state.symptoms).forEach(s => s.forEach(v => allSymptoms.push(v)));
  if (!allSymptoms.length) { console.warn('[DermaNetra] No symptoms selected'); return null; }

  const payload = {
    symptoms: allSymptoms,
    patient: { age: parseInt(state.age), sex: state.sex, skinType: state.skinType, duration: state.duration },
  };

  try {
    console.log('[DermaNetra] Sending to API:', payload);
    const resp = await fetch(`${API_BASE}/api/diagnose`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
    const data = await resp.json();
    console.log('[DermaNetra] API Response:', data);
    return data;
  } catch (err) {
    console.error('[DermaNetra] API Error:', err.message);
    console.info('[DermaNetra] Falling back to client-side expert system');
    return null;
  }
}
