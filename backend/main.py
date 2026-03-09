"""
DermaNetra — FastAPI Backend
Certainty Factor-based Skin Disease Expert System
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ── App Init ──────────────────────────────────────────────
app = FastAPI(
    title="DermaNetra API",
    description="AI-powered Dermatology Expert System using Certainty Factor method",
    version="1.0.0",
)

# ── CORS ──────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # dev: allow all; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Schemas ───────────────────────────────────────────────
class PatientInfo(BaseModel):
    age: int
    sex: str            # "male" | "female"
    skinType: str       # "normal" | "dry" | "oily" | "combination" | "sensitive"
    duration: str       # "lt3days" | "1to2weeks" | "gt1month"

class DiagnoseRequest(BaseModel):
    symptoms: list[str]
    patient: PatientInfo

class DiagnosisResult(BaseModel):
    disease_id: str
    disease_name: str
    certainty_factor: float
    icd10: str
    description: str

class DiagnoseResponse(BaseModel):
    status: str
    results: list[DiagnosisResult]
    disclaimer: str

# ── Health Check ──────────────────────────────────────────
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "DermaNetra API", "version": "1.0.0"}

# ── Diagnose Endpoint (dummy placeholder) ─────────────────
@app.post("/api/diagnose", response_model=DiagnoseResponse)
async def diagnose(req: DiagnoseRequest):
    """
    Accepts selected symptoms and patient info.
    Returns diagnosis results using Certainty Factor method.
    
    NOTE: This is a placeholder. Replace with real CF algorithm
    that queries your disease knowledge base.
    """
    # Dummy response for development / testing
    dummy_results = [
        DiagnosisResult(
            disease_id="eczema",
            disease_name="Atopic Dermatitis (Eczema)",
            certainty_factor=0.78,
            icd10="L20.9",
            description="Chronic inflammatory skin condition causing itchy, red, dry patches.",
        ),
        DiagnosisResult(
            disease_id="contact_dermatitis",
            disease_name="Contact Dermatitis",
            certainty_factor=0.54,
            icd10="L25.9",
            description="Skin inflammation triggered by contact with an irritant or allergen.",
        ),
    ]
    
    return DiagnoseResponse(
        status="success",
        results=dummy_results,
        disclaimer="DermaNetra provides preliminary screening only. "
                   "This does not constitute a medical diagnosis. "
                   "Always consult a licensed dermatologist.",
    )
