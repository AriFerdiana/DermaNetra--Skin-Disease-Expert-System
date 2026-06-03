"""
DermaNetra — FastAPI Backend v2.1
Naive Bayes Skin Disease Expert System + NLP Mode
"""

import json
import os
import logging
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from engine import naive_bayes as nb

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── App Init ──────────────────────────────────────────────────────────────────
app = FastAPI(
    title="DermaNetra API",
    description="Dermatology Expert System — Naive Bayes + NLP Inference Engine",
    version="2.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Validasi KB saat server start."""
    result = nb.validate_kb()
    if not result["valid"]:
        logger.warning(f"KB validation issues: {result['issues']}")
    else:
        logger.info("KB validation passed.")


# ── Schemas ───────────────────────────────────────────────────────────────────
class PatientInfo(BaseModel):
    age: int
    sex: str          # "male" | "female"
    skinType: str     # "normal" | "dry" | "oily" | "combination" | "sensitive"
    duration: str     # "lt3days" | "1to2weeks" | "gt1month"


class DiagnoseRequest(BaseModel):
    symptom_ids: list[str]           # ["G001", "G003", ...]
    patient: PatientInfo
    selected_regions: list[str] = []


class NLPDiagnoseRequest(BaseModel):
    text: str                        # Keluhan user dalam bahasa alami
    patient: PatientInfo
    extra_symptom_ids: list[str] = []  # Hybrid mode: gejala tambahan dari pilihan manual

    @field_validator("text")
    @classmethod
    def text_not_empty(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("text tidak boleh kosong")
        if len(v.strip()) < 10:
            raise ValueError("Deskripsikan keluhan lebih detail (minimal 10 karakter)")
        return v.strip()


class DiseaseResult(BaseModel):
    disease_id: str
    disease_name: str
    disease_name_id: str
    probability: float
    percentage: float
    description: str
    icd10: str
    contagious: bool
    regions: list[str]
    confidence_level: str = "low"
    is_conclusive: bool = False


class DiagnoseResponse(BaseModel):
    status: str
    method: str
    results: list[DiseaseResult]
    symptom_count: int
    has_red_flag: bool
    red_flag_symptoms: list[str]
    disclaimer: str


class MatchedSymptom(BaseModel):
    symptom_id: str
    symptom_name: str
    score: float
    match_type: str  # "keyword" | "phrase"


class NLPPipelineInfo(BaseModel):
    original: str
    cleaned: str
    tokens: list[str]
    tokens_after_stopword_removal: list[str]
    tokens_after_stemming: list[str]
    token_count_original: int
    token_count_final: int
    stopwords_removed: int


class NLPDiagnoseResponse(BaseModel):
    status: str
    method: str                        # "nlp_naive_bayes" | "nlp_hybrid_naive_bayes"
    nlp_pipeline: NLPPipelineInfo
    matched_symptoms: list[MatchedSymptom]
    extra_symptoms: list[str]          # Dari hybrid mode manual
    all_symptom_ids: list[str]         # Gabungan NLP + manual
    results: list[DiseaseResult]
    symptom_count: int
    has_red_flag: bool
    red_flag_symptoms: list[str]
    disclaimer: str


# ── Helpers ───────────────────────────────────────────────────────────────────
DISCLAIMER = (
    "DermaNetra memberikan screening awal berbasis Naive Bayes + NLP. "
    "Hasil ini BUKAN diagnosis medis resmi. "
    "Selalu konsultasikan ke dokter spesialis kulit (Sp. KK)."
)


def _build_red_flag_list(symptom_ids: list[str]) -> tuple[bool, list[str]]:
    all_symptoms = {s["id"]: s for s in nb.get_all_symptoms()}
    red_flags = [
        all_symptoms[sid]["name"]
        for sid in symptom_ids
        if sid in all_symptoms and all_symptoms[sid].get("is_red_flag")
    ]
    return len(red_flags) > 0, red_flags


# ── Health Check ──────────────────────────────────────────────────────────────
@app.get("/api/health")
async def health_check():
    diseases = nb.get_all_diseases()
    symptoms = nb.get_all_symptoms()
    return {
        "status": "ok",
        "service": "DermaNetra API",
        "version": "2.1.0",
        "method": "Naive Bayes + NLP",
        "kb_diseases": len(diseases),
        "kb_symptoms": len(symptoms),
    }


# ── Diagnose (Manual Mode) ────────────────────────────────────────────────────
@app.post("/api/diagnose", response_model=DiagnoseResponse)
async def diagnose(req: DiagnoseRequest):
    """
    Mode manual: Menerima symptom IDs yang dipilih user dari body map.
    Formula: P(D | G₁..Gₙ) ∝ P(D) × ∏ P(Gᵢ | D)
    """
    if not req.symptom_ids:
        raise HTTPException(status_code=400, detail="Minimal 1 symptom_id diperlukan.")

    raw_results = nb.diagnose(
        symptom_ids=req.symptom_ids,
        patient=req.patient.model_dump(),
    )

    results = [DiseaseResult(**r) for r in raw_results]
    has_red_flag, red_flag_symptoms = _build_red_flag_list(req.symptom_ids)

    return DiagnoseResponse(
        status="success",
        method="naive_bayes",
        results=results,
        symptom_count=len(req.symptom_ids),
        has_red_flag=has_red_flag,
        red_flag_symptoms=red_flag_symptoms,
        disclaimer=DISCLAIMER,
    )


# ── NLP Diagnose ──────────────────────────────────────────────────────────────
@app.post("/api/nlp-diagnose", response_model=NLPDiagnoseResponse)
async def nlp_diagnose(req: NLPDiagnoseRequest):
    """
    Mode NLP: Menerima teks keluhan bebas dalam Bahasa Indonesia.
    Pipeline: clean → tokenize → stopword removal → stemming → symptom matching → Naive Bayes

    Hybrid mode: Jika extra_symptom_ids diisi, gabungkan dengan hasil NLP sebelum diagnosa.
    """
    # Import NLP di sini untuk lazy loading (cegah crash startup jika library belum ada)
    try:
        from nlp.symptom_matcher import match_symptoms, get_pipeline_info
        from nlp.preprocessor import get_pipeline_steps
    except ImportError as e:
        raise HTTPException(
            status_code=503,
            detail=f"NLP module tidak tersedia: {e}. Pastikan PySastrawi terinstall."
        )

    # 1. Jalankan NLP pipeline
    steps = get_pipeline_steps(req.text)
    matched = match_symptoms(req.text)

    nlp_symptom_ids = [m["symptom_id"] for m in matched]

    # 2. Gabungkan dengan extra symptoms (hybrid mode)
    all_ids = list(set(nlp_symptom_ids + req.extra_symptom_ids))

    # 3. Validasi: minimal 1 gejala terdeteksi
    if not all_ids:
        raise HTTPException(
            status_code=422,
            detail={
                "error": "Tidak ada gejala yang terdeteksi dari teks yang diberikan.",
                "suggestion": "Coba deskripsikan keluhan lebih spesifik, misalnya: 'kulit gatal parah di malam hari', 'muncul bintik merah di lengan', dll.",
                "pipeline": steps,
            }
        )

    # 4. Jalankan Naive Bayes
    raw_results = nb.diagnose(
        symptom_ids=all_ids,
        patient=req.patient.model_dump(),
    )

    results = [DiseaseResult(**r) for r in raw_results]
    has_red_flag, red_flag_symptoms = _build_red_flag_list(all_ids)

    # 5. Tentukan method
    method = "nlp_hybrid_naive_bayes" if req.extra_symptom_ids else "nlp_naive_bayes"

    return NLPDiagnoseResponse(
        status="success",
        method=method,
        nlp_pipeline=NLPPipelineInfo(**steps),
        matched_symptoms=[MatchedSymptom(**m) for m in matched],
        extra_symptoms=req.extra_symptom_ids,
        all_symptom_ids=all_ids,
        results=results,
        symptom_count=len(all_ids),
        has_red_flag=has_red_flag,
        red_flag_symptoms=red_flag_symptoms,
        disclaimer=DISCLAIMER,
    )


# ── NLP Preview (Dry Run — tanpa diagnosa) ────────────────────────────────────
@app.post("/api/nlp-preview")
async def nlp_preview(body: dict):
    """
    Dry run NLP pipeline: hanya preprocessing + symptom matching, tanpa diagnosa.
    Digunakan oleh frontend untuk menampilkan Preview Panel secara real-time.
    """
    text = body.get("text", "")
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="text tidak boleh kosong")

    try:
        from nlp.symptom_matcher import match_symptoms
        from nlp.preprocessor import get_pipeline_steps
    except ImportError as e:
        raise HTTPException(status_code=503, detail=f"NLP module tidak tersedia: {e}")

    steps = get_pipeline_steps(text)
    matched = match_symptoms(text)

    return {
        "status": "ok",
        "pipeline": steps,
        "matched_symptoms": matched,
        "matched_count": len(matched),
        "symptom_ids": [m["symptom_id"] for m in matched],
    }


# ── Symptoms & Diseases (for frontend init) ───────────────────────────────────
@app.get("/api/symptoms")
async def get_symptoms():
    return {"symptoms": nb.get_all_symptoms()}


@app.get("/api/diseases")
async def get_diseases():
    return {"diseases": nb.get_all_diseases()}


# ── Admin API (CRUD Knowledge Base) ───────────────────────────────────────────
KB_DIR = Path(__file__).parent / "knowledge_base"
ADMIN_API_KEY = "dermanetra_admin_2024" # Hardcoded simple secret for student project

from fastapi import Depends

def verify_api_key(api_key: str):
    if api_key != ADMIN_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API Key")
    return api_key


def _read_json(filename: str):
    with open(KB_DIR / filename, "r", encoding="utf-8") as f:
        return json.load(f)


def _write_json(filename: str, data):
    with open(KB_DIR / filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    nb._load_kb.cache_clear()


@app.get("/api/admin/diseases")
async def admin_get_diseases(api_key: str = Depends(verify_api_key)):
    return _read_json("diseases.json")


@app.post("/api/admin/diseases")
async def admin_save_diseases(data: list[dict], api_key: str = Depends(verify_api_key)):
    _write_json("diseases.json", data)
    return {"status": "success", "message": "Diseases updated"}


@app.get("/api/admin/symptoms")
async def admin_get_symptoms(api_key: str = Depends(verify_api_key)):
    return _read_json("symptoms.json")


@app.post("/api/admin/symptoms")
async def admin_save_symptoms(data: list[dict], api_key: str = Depends(verify_api_key)):
    _write_json("symptoms.json", data)
    return {"status": "success", "message": "Symptoms updated"}


@app.get("/api/admin/likelihood")
async def admin_get_likelihood(api_key: str = Depends(verify_api_key)):
    return _read_json("likelihood.json")


@app.post("/api/admin/likelihood")
async def admin_save_likelihood(data: list[dict], api_key: str = Depends(verify_api_key)):
    _write_json("likelihood.json", data)
    return {"status": "success", "message": "Likelihood updated"}


# ── Serve Frontend ────────────────────────────────────────────────────────────
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

@app.get("/")
async def root_redirect():
    return RedirectResponse(url="/landing.html")

app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")
