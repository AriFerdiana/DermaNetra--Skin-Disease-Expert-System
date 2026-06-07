"""
DermaNetra — NLP Symptom Matcher
===================================
Mencocokkan token hasil preprocessing ke symptom IDs dari knowledge base.
Strategi 2 lapis: Keyword Match + Phrase Detection.
"""

import json
import math
import difflib
from pathlib import Path
from functools import lru_cache
from .preprocessor import preprocess, get_pipeline_steps, _stemmer

KB_DIR = Path(__file__).parent.parent / "knowledge_base"

# ── Keyword dictionary per symptom ─────────────────────────────────────────
@lru_cache(maxsize=1)
def _get_symptom_keywords() -> dict[str, list[str]]:
    """Load symptom keywords dynamically from KB."""
    with open(KB_DIR / "symptoms.json", encoding="utf-8") as f:
        symptoms = json.load(f)
    result = {}
    for s in symptoms:
        if "keywords" in s:
            result[s["id"]] = s["keywords"]
    return result

# ── Phrase detection map ─────────────────────────────────────────────────────
# Frasa multi-kata yang sangat spesifik ke gejala tertentu
PHRASE_SYMPTOM_MAP: list[tuple[str, list[str]]] = [
    ("gatal malam hari", ["G002", "G086"]),
    ("gatal malam", ["G002", "G086"]),
    ("gatal parah malam", ["G002", "G086"]),
    ("sisik keperakan", ["G004", "G033", "G028"]),
    ("sisik perak", ["G004", "G033"]),
    ("bintik nanah", ["G006"]),
    ("lepuh berair", ["G020", "G063", "G077"]),
    ("lepuh berkelompok", ["G020", "G063"]),
    ("bentol berpindah", ["G022"]),
    ("biduran berpindah", ["G022"]),
    ("bercak mati rasa", ["G046", "G088"]),
    ("kulit mati rasa", ["G046", "G088"]),
    ("mati rasa", ["G046", "G088"]),
    ("terowongan sela jari", ["G051"]),
    ("garis terowongan", ["G051"]),
    ("sela jari kaki", ["G054"]),
    ("kuku kuning", ["G056"]),
    ("kuku menebal", ["G056"]),
    ("garis merah berkelok", ["G055"]),
    ("cacing bawah kulit", ["G055"]),
    ("ruam cincin", ["G029"]),
    ("bercak cincin", ["G029"]),
    ("bercak melingkar", ["G029"]),
    ("pola cemara", ["G048"]),
    ("satu sisi tubuh", ["G063"]),
    ("lepuh satu sisi", ["G063"]),
    ("cacar ular", ["G063"]),
    ("nyeri saraf", ["G063", "G070"]),
    ("panas terbakar", ["G070"]),
    ("kulit terbakar", ["G070"]),
    ("bintik perdarahan", ["G075"]),
    ("ruam menyebar cepat", ["G077"]),
    ("bengkak wajah sesak", ["G078"]),
    ("sesak napas bengkak", ["G078"]),
    ("garis merah menjalar", ["G080"]),
    ("kelenjar bengkak", ["G068"]),
    ("rambut rontok", ["G008"]),
    ("botak bercak", ["G008", "G010"]),
    ("botak bundar", ["G008"]),
    ("kutu rambut", ["G010"]),
    ("telur kutu", ["G010"]),
    ("biang keringat", ["G011", "G034"]),
    ("ketombe rontok", ["G003"]),
    ("sisik kepala", ["G003"]),
    ("jerawat komedo", ["G013"]),
    ("jerawat punggung", ["G064", "G026"]),
    ("flek hitam wajah", ["G014"]),
    ("flek cokelat wajah", ["G014"]),
    ("luka borok", ["G040", "G043"]),
    ("ulkus tidak sakit", ["G043"]),
    ("bisul kambuh", ["G038"]),
    ("berbau kaki", ["G057"]),
    ("kaki berbau", ["G057"]),
    ("kapalan nyeri", ["G058"]),
    ("mata ikan", ["G058"]),
    ("gigitan serangga", ["G059"]),
    ("ruam koin", ["G060"]),
    ("ruam bulat", ["G060", "G029"]),
    ("demam bengkak", ["G061"]),
    ("demam selulitis", ["G061"]),
    ("riwayat alergi asma", ["G072"]),
    ("alergi makanan", ["G089"]),
    ("alergi seafood", ["G089"]),
    ("ruam perhiasan", ["G090"]),
    ("ruam logam", ["G090"]),
    ("gatal dingin", ["G091"]),
    ("warna gelap lipatan", ["G093"]),
    ("menghitam lipatan", ["G093"]),
    ("keringat malam", ["G081"]),
    ("nyeri sendi", ["G082"]),
    ("berat badan turun", ["G083"]),
    ("ruam hewan", ["G073"]),
    ("ruam matahari", ["G074"]),
    ("kulit menebal kasar", ["G069"]),
    ("gatal stres", ["G085"]),
    ("ruam sabun", ["G053"]),
    ("kulit pecah", ["G052", "G054"]),
    ("keringat berlebih", ["G097", "G081"]),
    ("kulit mengelupas", ["G098", "G054"]),
    ("kena air", ["G099"]),
    ("kena sabun", ["G099", "G053"]),
    ("wajah memerah", ["G100", "G005"]),
    ("komedo hitam", ["G101", "G013"]),
    ("komedo putih", ["G101", "G013"]),
    ("nular keluarga", ["G102"]),
    ("ketombe membandel", ["G103"]),
    ("bekas menghitam", ["G104", "G093"]),
    ("sebelum ruam", ["G105", "G070"]),
    ("kulit kaku", ["G106"]),
    ("nanah hijau", ["G107", "G071"]),
    ("kuku rapuh", ["G108", "G056"]),
    ("habis makan", ["G109", "G089"]),
]


@lru_cache(maxsize=1)
def _load_symptom_ids() -> set[str]:
    """Load valid symptom IDs from KB."""
    with open(KB_DIR / "symptoms.json", encoding="utf-8") as f:
        symptoms = json.load(f)
    return {s["id"] for s in symptoms}


def _stem_word(word: str) -> str:
    """Stem a single word."""
    return _stemmer.stem(word)


def _build_stemmed_phrase_map() -> list[tuple[list[str], list[str]]]:
    """Pre-stem all phrases in PHRASE_SYMPTOM_MAP for fast matching."""
    result = []
    for phrase, sids in PHRASE_SYMPTOM_MAP:
        stemmed_phrase_tokens = [_stem_word(w) for w in phrase.split()]
        result.append((stemmed_phrase_tokens, sids))
    return result


# Pre-build stemmed phrase map
_STEMMED_PHRASE_MAP = _build_stemmed_phrase_map()

NEGATION_WORDS = {"tidak", "bukan", "tanpa", "belum"}

def _is_negated(tokens: list[str], target_tokens: list[str]) -> bool:
    """Cek apakah sekumpulan token didahului oleh kata negasi (window 2 kata).
    Jika target muncul lebih dari sekali, hanya bernilai True jika SEMUA kemunculan dinegasikan.
    """
    if not target_tokens:
        return False
    
    first_target = target_tokens[0]
    
    # Cari semua index kemunculan first_target dalam tokens
    indices = [i for i, token in enumerate(tokens) if token == first_target]
    
    if not indices:
        return False
        
    all_negated = True
    for idx in indices:
        start = max(0, idx - 2)
        is_this_occurrence_negated = False
        
        for i in range(start, idx):
            if tokens[i] in NEGATION_WORDS:
                is_this_occurrence_negated = True
                break
                
        # Jika ada minimal 1 kemunculan yang TIDAK dinegasikan, 
        # maka gejala ini secara keseluruhan dianggap ADA (False negasi).
        if not is_this_occurrence_negated:
            all_negated = False
            break
            
    return all_negated


def _is_fuzzy_match(word: str, token_set: set[str], threshold: float = 0.80) -> str | None:
    """Cek apakah word ada di token_set secara exact atau fuzzy.
    Returns: matched_token dari token_set, atau None.
    """
    if word in token_set:
        return word
    for token in token_set:
        # Skip perbandingan difflib jika beda panjang lebih dari 2 karakter (efisiensi)
        if abs(len(word) - len(token)) > 2:
            continue
        if difflib.SequenceMatcher(None, word, token).ratio() >= threshold:
            return token
    return None


def _detect_phrases(tokens: list[str]) -> dict[str, float]:
    """
    Deteksi frasa multi-kata dalam token list.
    Returns: dict {symptom_id: score}
    """
    scores: dict[str, float] = {}
    token_set = set(tokens)

    for phrase_tokens, sids in _STEMMED_PHRASE_MAP:
        # Cek apakah semua token frasa ada di token list (bisa exact / fuzzy)
        matched_tokens_for_phrase = []
        is_match = True
        for pt in phrase_tokens:
            m_token = _is_fuzzy_match(pt, token_set)
            if m_token:
                matched_tokens_for_phrase.append(m_token)
            else:
                is_match = False
                break
                
        if is_match:
            if _is_negated(tokens, matched_tokens_for_phrase):
                continue
            for sid in sids:
                scores[sid] = scores.get(sid, 0) + 1.5  # Phrase match lebih kuat
    return scores


def _match_keywords(tokens: list[str]) -> dict[str, float]:
    """
    Layer 1: Cocokkan token dengan keyword dictionary per gejala.
    Returns: dict {symptom_id: score}
    """
    token_set = set(tokens)
    scores: dict[str, float] = {}
    symptom_keywords = _get_symptom_keywords()

    for sid, keywords in symptom_keywords.items():
        score = 0.0
        for kw in keywords:
            kw_tokens = kw.split()
            if len(kw_tokens) == 1:
                # Single word match
                kw_stemmed = _stem_word(kw)
                matched_token_stemmed = _is_fuzzy_match(kw_stemmed, token_set)
                matched_token_raw = _is_fuzzy_match(kw, token_set)
                
                if matched_token_stemmed or matched_token_raw:
                    actual_match = matched_token_stemmed if matched_token_stemmed else matched_token_raw
                    if not _is_negated(tokens, [actual_match]):
                        score += 1.0
            else:
                # Multi-word keyword: cek semua token ada
                kw_stemmed = [_stem_word(w) for w in kw_tokens]
                matched_multi = []
                is_match = True
                for w in kw_stemmed:
                    m_token = _is_fuzzy_match(w, token_set)
                    if m_token:
                        matched_multi.append(m_token)
                    else:
                        is_match = False
                        break
                        
                if is_match:
                    if not _is_negated(tokens, matched_multi):
                        score += 1.5

        if score > 0:
            # Normalize by number of keywords untuk menghindari bias gejala dengan banyak keyword
            normalized = score / math.sqrt(len(symptom_keywords[sid]))
            scores[sid] = normalized

    return scores


def match_symptoms(text: str, min_score: float = 0.5) -> list[dict]:
    """
    Match teks input ke symptom IDs.

    Args:
        text: Teks keluhan user (Bahasa Indonesia)
        min_score: Minimum score untuk dianggap match (default 0.5)

    Returns:
        List of {symptom_id, symptom_name, score, match_type} sorted by score desc
    """
    if not text or not text.strip():
        return []

    # 1. Preprocess
    tokens = preprocess(text)
    if not tokens:
        return []

    # 2. Keyword matching
    kw_scores = _match_keywords(tokens)

    # 3. Phrase detection (override/boost)
    phrase_scores = _detect_phrases(tokens)

    # 4. Gabungkan scores (phrase boost di atas keyword)
    combined: dict[str, float] = {}
    for sid, score in kw_scores.items():
        combined[sid] = score
    for sid, boost in phrase_scores.items():
        combined[sid] = combined.get(sid, 0) + boost

    # 5. Load symptom names
    try:
        with open(KB_DIR / "symptoms.json", encoding="utf-8") as f:
            symptoms = json.load(f)
        symptom_name_map = {s["id"]: s["name"] for s in symptoms}
    except Exception:
        symptom_name_map = {}

    # 6. Filter & sort
    valid_ids = _load_symptom_ids()
    results = []
    for sid, score in combined.items():
        if score >= min_score and sid in valid_ids:
            match_type = "phrase" if sid in phrase_scores else "keyword"
            results.append({
                "symptom_id": sid,
                "symptom_name": symptom_name_map.get(sid, sid),
                "score": round(score, 3),
                "match_type": match_type,
            })

    results.sort(key=lambda x: x["score"], reverse=True)
    return results


def get_pipeline_info(text: str) -> dict:
    """
    Jalankan full pipeline dan kembalikan semua detail untuk frontend preview.
    """
    from .preprocessor import get_pipeline_steps

    steps = get_pipeline_steps(text)
    matched = match_symptoms(text)

    return {
        "pipeline_steps": steps,
        "matched_symptoms": matched,
        "matched_count": len(matched),
        "symptom_ids": [m["symptom_id"] for m in matched],
    }

def get_dynamic_suggestions(text: str, max_count: int = 7) -> list[str]:
    """
    Generate dynamic suggestions based on partial keyword matches.
    Even if the score < min_score, it will be used to prompt the user.
    """
    if not text or not text.strip():
        return _get_fallback_suggestions(max_count)

    tokens = preprocess(text)
    if not tokens:
        return _get_fallback_suggestions(max_count)

    # Dapatkan raw keyword scores tanpa memfilter min_score
    kw_scores = _match_keywords(tokens)
    phrase_scores = _detect_phrases(tokens)

    combined: dict[str, float] = {}
    for sid, score in kw_scores.items():
        combined[sid] = score
    for sid, boost in phrase_scores.items():
        combined[sid] = combined.get(sid, 0) + boost

    # Jika benar-benar tidak ada yang nyangkut satupun (0)
    if not combined:
        return _get_fallback_suggestions(max_count)

    valid_ids = _load_symptom_ids()
    
    # Load symptom names
    try:
        with open(KB_DIR / "symptoms.json", encoding="utf-8") as f:
            symptoms = json.load(f)
        symptom_name_map = {s["id"]: s["name"] for s in symptoms}
    except Exception:
        symptom_name_map = {}

    # Ambil yang > 0 dan sort
    valid_scores = [(sid, score) for sid, score in combined.items() if sid in valid_ids and score > 0]
    valid_scores.sort(key=lambda x: x[1], reverse=True)

    suggestions = []
    for sid, score in valid_scores[:max_count]:
        name = symptom_name_map.get(sid)
        if name:
            suggestions.append(name)
            
    if not suggestions:
        return _get_fallback_suggestions(max_count)
        
    return suggestions

def _get_fallback_suggestions(max_count: int) -> list[str]:
    # Instead of hardcoded, return random interesting symptoms to prompt the user
    # to provide more diverse inputs.
    try:
        import random
        with open(KB_DIR / "symptoms.json", encoding="utf-8") as f:
            symptoms = json.load(f)
        
        # Filter out some very generic ones if we want, or just pick random names
        # Let's pick random names but ensure they are diverse
        names = [s["name"] for s in symptoms if "name" in s and len(s["name"]) > 5]
        if len(names) >= max_count:
            return random.sample(names, max_count)
        return names
    except Exception:
        # Fallback to hardcoded if file fails
        fallbacks = [
            "Gatal memburuk di malam hari", "Kulit kemerahan bersisik", 
            "Bintik berair berkelompok", "Terasa panas seperti terbakar", 
            "Bengkak dan bernanah", "Nyeri saat disentuh",
            "Keringat berlebih", "Menyebar dengan cepat", "Stres atau banyak pikiran"
        ]
        return fallbacks[:max_count]

