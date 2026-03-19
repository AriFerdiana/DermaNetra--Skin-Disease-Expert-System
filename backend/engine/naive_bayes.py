"""
DermaNetra — Naive Bayes Inference Engine
==========================================
Formula: P(D | G₁..Gₙ) ∝ P(D) × ∏ P(Gᵢ | D)

Uses log-space arithmetic to prevent floating-point underflow.
Missing P(G|D) pairs use Laplace smoothing (ε = 0.01).
"""

import json
import math
from pathlib import Path
from functools import lru_cache

KB_DIR = Path(__file__).parent.parent / "knowledge_base"
EPSILON = 0.01  # Laplace smoothing for missing likelihood entries


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


def diagnose(symptom_ids: list[str], patient: dict | None = None) -> list[dict]:
    """
    Run Naive Bayes diagnosis given selected symptom IDs.

    Returns a ranked list (highest probability first) of up to 5 disease dicts.
    Each dict contains: disease_id, disease_name, disease_name_id, probability,
    percentage, description, icd10, contagious, regions.
    """
    if not symptom_ids:
        return []

    diseases, disease_map, symptom_map, likelihood_map = _load_kb()

    # ── Step 1: Compute log-posterior for every disease ─────────────────────
    log_scores: list[tuple[str, float]] = []
    for disease in diseases:
        did = disease["id"]
        
        # Base Prior
        prior = disease["prior"]

        # --- Context-Aware Prior Adjustments ---
        if patient:
            # 1. Sex-based adjustment (Melasma is much more common in females)
            if did == "D012": # Melasma
                if patient.get("sex") == "female": prior *= 1.5
                elif patient.get("sex") == "male": prior *= 0.2
            
            # 2. Age-based adjustment (Acne is common in teens/young adults)
            if did == "D011": # Acne
                age = patient.get("age", 0)
                if 12 <= age <= 25: prior *= 1.5
                elif age > 40: prior *= 0.5

            # 3. Duration-based adjustment (Acute vs Chronic)
            duration = patient.get("duration")
            if duration == "lt3days":
                if did == "D018": prior *= 1.4 # Urticaria (Acute)
            elif duration == "gt1month":
                if did in ["D006", "D002"]: prior *= 1.4 # Psoriasis/Atopic (Chronic)
        # ----------------------------------------

        log_score = math.log(prior)          # log P(D)
        for gid in symptom_ids:
            p_g_d = likelihood_map.get((did, gid), EPSILON)
            log_score += math.log(p_g_d)               # + log P(Gᵢ | D)
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
    return results[:5]


def get_all_symptoms() -> list[dict]:
    """Return the full symptom list (for frontend use if needed)."""
    _, _, symptom_map, _ = _load_kb()
    return list(symptom_map.values())


def get_all_diseases() -> list[dict]:
    """Return the full disease list."""
    diseases, *_ = _load_kb()
    return diseases
