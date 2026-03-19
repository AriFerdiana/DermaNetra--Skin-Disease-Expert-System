"""
DermaNetra — FastAPI Backend
Naive Bayes Skin Disease Expert System
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from engine import naive_bayes as nb

# ── App Init ──────────────────────────────────────────────────────────────────
app = FastAPI(
    title="DermaNetra API",
    description="Dermatology Expert System — Naive Bayes Inference Engine",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Schemas ───────────────────────────────────────────────────────────────────
class PatientInfo(BaseModel):
    age: int
    sex: str          # "male" | "female"
    skinType: str     # "normal" | "dry" | "oily" | "combination" | "sensitive"
    duration: str     # "lt3days" | "1to2weeks" | "gt1month"

class DiagnoseRequest(BaseModel):
    symptom_ids: list[str]           # ["G001", "G003", ...]
    patient: PatientInfo
    selected_regions: list[str] = [] # ["head", "neck", ...]

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

class DiagnoseResponse(BaseModel):
    status: str
    method: str
    results: list[DiseaseResult]
    symptom_count: int
    disclaimer: str

# ── Health Check ──────────────────────────────────────────────────────────────
@app.get("/api/health")
async def health_check():
    diseases = nb.get_all_diseases()
    symptoms = nb.get_all_symptoms()
    return {
        "status": "ok",
        "service": "DermaNetra API",
        "version": "2.0.0",
        "method": "Naive Bayes",
        "kb_diseases": len(diseases),
        "kb_symptoms": len(symptoms),
    }

# ── Diagnose ──────────────────────────────────────────────────────────────────
@app.post("/api/diagnose", response_model=DiagnoseResponse)
async def diagnose(req: DiagnoseRequest):
    """
    Accepts selected symptom IDs and patient info.
    Returns diagnosis results using the Naive Bayes inference engine.

    Algorithm:
      P(D | G₁..Gₙ) ∝ P(D) × ∏ P(Gᵢ | D)
    Computed in log-space to prevent underflow, then softmax-normalised.
    """
    if not req.symptom_ids:
        raise HTTPException(status_code=400, detail="At least one symptom_id is required.")

    raw_results = nb.diagnose(
        symptom_ids=req.symptom_ids,
        patient=req.patient.model_dump(),
    )

    results = [DiseaseResult(**r) for r in raw_results]

    return DiagnoseResponse(
        status="success",
        method="naive_bayes",
        results=results,
        symptom_count=len(req.symptom_ids),
        disclaimer=(
            "DermaNetra memberikan screening awal berbasis Naive Bayes. "
            "Hasil ini BUKAN diagnosis medis resmi. "
            "Selalu konsultasikan ke dokter spesialis kulit (Sp. KK)."
        ),
    )

# ── Symptoms & Diseases (for frontend init) ───────────────────────────────────
@app.get("/api/symptoms")
async def get_symptoms():
    return {"symptoms": nb.get_all_symptoms()}

@app.get("/api/diseases")
async def get_diseases():
    return {"diseases": nb.get_all_diseases()}
