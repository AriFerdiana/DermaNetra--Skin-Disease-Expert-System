"""
DermaNetra — Naive Bayes Inference Engine
==========================================
Formula: P(D | G₁..Gₙ) ∝ P(D) × ∏ P(Gᵢ | D)

Uses log-space arithmetic to prevent floating-point underflow.
Missing P(G|D) pairs use Laplace smoothing (ε = 0.001).

v2.1 Improvements:
- EPSILON turun ke 0.001 (lebih akurat)
- Confidence level & is_conclusive di output
- Red flag boost untuk penyakit serius
- validate_kb() dijalankan saat startup
"""

import json
import math
import logging
from pathlib import Path
from functools import lru_cache

logger = logging.getLogger(__name__)

KB_DIR = Path(__file__).parent.parent / "knowledge_base"
EPSILON = 0.001   # Laplace smoothing — turun dari 0.01 untuk penalti lebih akurat

# IDs penyakit yang mendapat boost ketika ada gejala red flag
RED_FLAG_SERIOUS_DISEASES = {
    "D031",  # Cellulitis
    "D042",  # Herpes Zoster
    "D024",  # Ecthyma
    "D027",  # Granuloma Inguinale
    "D030",  # Leprosy
}
RED_FLAG_BOOST = 1.3


@lru_cache(maxsize=1)
def _load_kb():
    """Load all KB files once, cached for the lifetime of the process."""
    with open(KB_DIR / "diseases.json", encoding="utf-8") as f:
        diseases = json.load(f)
    with open(KB_DIR / "symptoms.json", encoding="utf-8") as f:
        symptoms = json.load(f)
    with open(KB_DIR / "likelihood.json", encoding="utf-8") as f:
        likelihood_list = json.load(f)

    disease_map = {d["id"]: d for d in diseases}
    symptom_map = {s["id"]: s for s in symptoms}
    likelihood_map = {
        (e["disease_id"], e["symptom_id"]): e["probability"]
        for e in likelihood_list
    }
    return diseases, disease_map, symptom_map, likelihood_map


def validate_kb() -> dict:
    """
    Validasi konsistensi Knowledge Base.
    Dipanggil saat startup — log warning jika ada inkonsistensi.
    """
    try:
        diseases, disease_map, symptom_map, likelihood_map = _load_kb()
        issues = []

        # Cek semua disease_id di likelihood ada di diseases
        likelihood_disease_ids = {k[0] for k in likelihood_map.keys()}
        unknown_diseases = likelihood_disease_ids - set(disease_map.keys())
        if unknown_diseases:
            issues.append(f"Likelihood merujuk disease tidak dikenal: {unknown_diseases}")

        # Cek semua symptom_id di likelihood ada di symptoms
        likelihood_symptom_ids = {k[1] for k in likelihood_map.keys()}
        unknown_symptoms = likelihood_symptom_ids - set(symptom_map.keys())
        if unknown_symptoms:
            issues.append(f"Likelihood merujuk symptom tidak dikenal: {unknown_symptoms}")

        if issues:
            for issue in issues:
                logger.warning(f"[KB Validation] {issue}")
            return {"valid": False, "issues": issues}

        logger.info(f"[KB Validation] OK — {len(diseases)} penyakit, {len(symptom_map)} gejala, {len(likelihood_map)} likelihood entries")
        return {"valid": True, "issues": []}
    except Exception as e:
        logger.error(f"[KB Validation] Error: {e}")
        return {"valid": False, "issues": [str(e)]}


def _get_confidence(probability: float) -> str:
    """Tentukan level kepercayaan berdasarkan probabilitas top-1."""
    if probability >= 0.45:
        return "high"
    elif probability >= 0.20:
        return "medium"
    else:
        return "low"


def diagnose(symptom_ids: list[str], patient: dict | None = None) -> list[dict]:
    """
    Run Naive Bayes diagnosis given selected symptom IDs.

    Returns a ranked list (highest probability first) of up to 5 disease dicts.
    Each dict contains: disease_id, disease_name, disease_name_id, probability,
    percentage, description, icd10, contagious, regions, confidence_level, is_conclusive.
    """
    if not symptom_ids:
        return []

    diseases, disease_map, symptom_map, likelihood_map = _load_kb()

    # Cek apakah ada gejala red flag
    has_red_flag = any(
        symptom_map.get(sid, {}).get("is_red_flag", False)
        for sid in symptom_ids
    )

    # ── Step 1: Compute log-posterior for every disease ─────────────────────
    log_scores: list[tuple[str, float]] = []
    for disease in diseases:
        did = disease["id"]

        # Base Prior
        prior = disease["prior"]

        # --- Context-Aware Prior Adjustments ---
        if patient:
            # 1. Sex-based adjustment
            if did == "D012":  # Melasma
                if patient.get("sex") == "female":
                    prior *= 1.5
                elif patient.get("sex") == "male":
                    prior *= 0.2

            # 2. Age-based adjustment
            if did == "D011":  # Acne
                age = patient.get("age", 0)
                if 12 <= age <= 25:
                    prior *= 1.5
                elif age > 40:
                    prior *= 0.5

            # 3. Duration-based adjustment
            duration = patient.get("duration")
            if duration == "lt3days":
                if did == "D018":
                    prior *= 1.4  # Urticaria (Acute)
            elif duration == "gt1month":
                if did in ["D006", "D002"]:
                    prior *= 1.4  # Psoriasis/Atopic (Chronic)

        # 4. Red Flag Boost — prioritaskan penyakit serius jika ada red flag
        if has_red_flag and did in RED_FLAG_SERIOUS_DISEASES:
            prior *= RED_FLAG_BOOST

        log_score = math.log(max(prior, 1e-10))  # Cegah log(0)
        for gid in symptom_ids:
            p_g_d = likelihood_map.get((did, gid), EPSILON)
            log_score += math.log(max(p_g_d, 1e-10))
        log_scores.append((did, log_score))

    # ── Step 2: Softmax normalisation (log-sum-exp trick) ───────────────────
    max_log = max(s for _, s in log_scores)
    exp_scores = [(did, math.exp(s - max_log)) for did, s in log_scores]
    total = sum(s for _, s in exp_scores)

    # ── Step 3: Build result objects ─────────────────────────────────────────
    results = []
    for did, raw in exp_scores:
        prob = raw / total
        d = disease_map[did]
        results.append({
            "disease_id":      did,
            "disease_name":    d["name"],
            "disease_name_id": d["name_id"],
            "probability":     round(prob, 6),
            "percentage":      round(prob * 100, 2),
            "description":     d["description"],
            "icd10":           d["icd10"],
            "contagious":      d["contagious"],
            "regions":         d["regions"],
        })

    results.sort(key=lambda x: x["probability"], reverse=True)
    top5 = results[:5]

    # Tambahkan confidence info ke setiap result
    top_prob = top5[0]["probability"] if top5 else 0
    for r in top5:
        r["confidence_level"] = _get_confidence(top_prob)
        r["is_conclusive"] = top_prob >= 0.20

    return top5


def get_all_symptoms() -> list[dict]:
    """Return the full symptom list (for frontend use if needed)."""
    _, _, symptom_map, _ = _load_kb()
    return list(symptom_map.values())


def get_all_diseases() -> list[dict]:
    """Return the full disease list."""
    diseases, *_ = _load_kb()
    return diseases
