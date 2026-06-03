"""
DermaNetra — NLP Symptom Matcher
===================================
Mencocokkan token hasil preprocessing ke symptom IDs dari knowledge base.
Strategi 2 lapis: Keyword Match + Phrase Detection.
"""

import json
import math
from pathlib import Path
from functools import lru_cache
from .preprocessor import preprocess, get_pipeline_steps, _stemmer

KB_DIR = Path(__file__).parent.parent / "knowledge_base"

# ── Keyword dictionary per symptom ─────────────────────────────────────────
# Kunci: symptom_id, Nilai: set kata kunci (sudah di-stem)
SYMPTOM_KEYWORDS: dict[str, list[str]] = {
    "G001": ["gatal", "kepala", "wajah", "hebat", "parah", "kulit kepala"],
    "G002": ["gatal", "malam", "buruk", "meningkat", "malam hari"],
    "G003": ["sisik", "putih", "ketombe", "rontok", "kepala", "bersisik"],
    "G004": ["sisik", "tebal", "berlapis", "perak", "keperakan"],
    "G005": ["bercak", "merah", "wajah", "dahi", "leher", "kemerahan"],
    "G006": ["bintik", "benjolan", "nanah", "pustul"],
    "G007": ["keropeng", "kerak", "kuning", "madu", "krusta"],
    "G008": ["rambut", "rontok", "botak", "pitak", "kebotakan"],
    "G009": ["rambut", "rapuh", "patah", "mudah patah"],
    "G010": ["kutu", "rambut", "telur kutu", "nits"],
    "G011": ["bintik", "merah", "perih", "keringat", "biang"],
    "G012": ["wajah", "kering", "kasar", "kulit kering"],
    "G013": ["benjolan", "merah", "nyeri", "komedo", "nanah", "jerawat"],
    "G014": ["bercak", "cokelat", "gelap", "tidak gatal", "hiperpigmentasi"],
    "G015": ["merah", "kronis", "pembuluh", "telangiektasia", "rosacea"],
    "G016": ["bercak", "putih", "cokelat muda", "sisik halus", "panu"],
    "G017": ["gatal", "keringat", "memburuk", "berkeringat", "parah"],
    "G018": ["ruam", "merah", "gatal", "kalung", "parfum", "kimia", "alergi"],
    "G019": ["bintik", "putih", "keras", "mutiara", "milia"],
    "G020": ["lepuh", "air", "berkelompok", "perih", "panas", "vesikel"],
    "G021": ["bentol", "merah", "menonjol", "tebal", "tiba", "urtikaria"],
    "G022": ["bentol", "gatal", "berpindah", "pindah", "biduran"],
    "G023": ["keropeng", "kuning", "madu", "kerak", "kering"],
    "G024": ["bintik", "keras", "kubah", "lekukan", "umbilikasi", "moluskum"],
    "G025": ["bercak", "putih", "cokelat", "dada", "bersisik", "panu"],
    "G026": ["jerawat", "bisul", "dada", "punggung", "berjerawat"],
    "G027": ["ruam", "gatal", "kering", "menebal", "puting", "ketiak"],
    "G028": ["bercak", "merah", "tebal", "sisik", "perak", "dada"],
    "G029": ["bercak", "merah", "cincin", "tepi", "menonjol", "kurap"],
    "G030": ["ruam", "merah", "basah", "lecet", "lipatan", "bintik", "satelit"],
    "G031": ["bintik", "gatal", "pusar", "malam hari", "kudis"],
    "G032": ["ruam", "gatal", "kemerahan", "kancing", "celana", "sabuk"],
    "G033": ["plak", "merah", "tebal", "sisik", "keperakan", "pusar", "psoriasis"],
    "G034": ["bintik", "kemerahan", "perut", "keringat", "biang keringat"],
    "G035": ["bercak", "merah", "gatal", "bulan sabit", "paha", "selangkangan"],
    "G036": ["ruam", "lecet", "kemerahan", "bintik", "satelit", "lipatan"],
    "G037": ["bercak", "merah", "cokelat", "lipatan", "paha"],
    "G038": ["bisul", "bernanah", "nyeri", "kambuh", "abses"],
    "G039": ["kemerahan", "lecet", "gesekan", "paha"],
    "G040": ["luka", "borok", "ulkus", "keropeng", "keras"],
    "G041": ["bintik", "gatal", "malam", "bokong", "kemaluan", "kudis"],
    "G042": ["benjolan", "keras", "mutiara", "lekukan", "putih", "moluskum"],
    "G043": ["luka", "terbuka", "borok", "tidak sakit", "berdarah", "membesar"],
    "G044": ["sisik", "kuning", "berminyak", "kelamin"],
    "G045": ["bintik", "berair", "gatal", "telapak", "jari tangan", "vesikel"],
    "G046": ["bercak", "putih", "mati rasa", "tidak terasa", "baal", "lepra"],
    "G047": ["lengan", "bengkak", "merah", "panas", "nyeri", "berdenyut"],
    "G048": ["ruam", "merah", "oval", "bersisik", "pohon cemara", "pityriasis"],
    "G049": ["benjolan", "keras", "kasar", "kembang kol", "kutil"],
    "G050": ["bengkak", "merah", "nyeri", "nanah", "kuku"],
    "G051": ["garis", "terowongan", "jari", "gatal", "malam", "kudis", "skabies"],
    "G052": ["telapak", "kering", "menebal", "bersisik", "pecah"],
    "G053": ["tangan", "gatal", "bruntusan", "sabun", "kimia", "deterjen"],
    "G054": ["sela jari", "kaki", "mengelupas", "pecah", "putih", "basah", "gatal"],
    "G055": ["garis", "merah", "berkelok", "cacing", "bawah kulit", "larva"],
    "G056": ["kuku", "kaki", "menebal", "rapuh", "hancur", "kuning", "cokelat"],
    "G057": ["telapak", "kaki", "berbau", "bau", "lubang", "pitted keratolysis"],
    "G058": ["penebalan", "keras", "menonjol", "telapak", "nyeri", "berjalan", "kapalan"],
    "G059": ["bentol", "merah", "berkelompok", "gatal", "gigitan", "serangga"],
    "G060": ["ruam", "merah", "bulat", "koin", "gatal", "berair", "berkerak"],
    "G061": ["tungkai", "bengkak", "merah", "panas", "nyeri", "demam", "selulitis"],
    "G062": ["ruam", "merah", "gatal", "lecet", "sandal", "sepatu", "alergi"],
    "G063": ["lepuh", "berair", "menjalar", "melingkar", "satu sisi", "nyeri saraf", "herpes zoster", "cacar ular"],
    "G064": ["jerawat", "meradang", "komedo", "nanah", "punggung", "atas"],
    "G065": ["bercak", "panu", "lebar", "punggung", "gatal", "berkeringat"],
    "G066": ["gatal", "ruam", "kemerahan", "karet", "celana", "sabuk", "pinggang"],
    "G067": ["demam", "menggigil", "lemas", "sistemik"],
    "G068": ["bengkak", "kelenjar", "getah bening", "lipatan", "paha", "ketiak", "leher"],
    "G069": ["kulit", "menebal", "kasar", "kayu", "garis kulit", "likenifikasi"],
    "G070": ["panas", "terbakar", "hebat", "kulit", "sebelum ruam"],
    "G071": ["nanah", "kental", "kuning", "hijau", "berbau", "busuk"],
    "G072": ["alergi", "asma", "bersin", "rinitis", "debu", "riwayat alergi"],
    "G073": ["ruam", "hewan", "kucing", "anjing", "peliharaan", "tidur"],
    "G074": ["ruam", "flek", "memburuk", "matahari", "sinar", "UV"],
    "G075": ["bintik", "perdarahan", "sisik", "dikelupas", "Auspitz"],
    "G076": ["luka", "kambuh", "berulang", "sama", "lokasi", "bulan"],
    "G077": ["ruam", "melepuh", "menyebar", "cepat", "seluruh tubuh", "24 jam"],
    "G078": ["bengkak", "wajah", "bibir", "kelopak mata", "sesak napas", "angioedema"],
    "G079": ["nyeri", "panas", "bengkak", "keras", "demam", "mendadak"],
    "G080": ["luka", "nanah", "parah", "meluas", "garis merah", "jantung"],
    "G081": ["keringat", "malam", "berlebih", "tanpa alasan"],
    "G082": ["nyeri", "sendi", "berpindah", "pegal"],
    "G083": ["berat badan", "turun", "drastis", "tanpa diet"],
    "G084": ["lemas", "lelah", "berkepanjangan", "malaise"],
    "G085": ["gatal", "ringan", "stres", "pikiran"],
    "G086": ["gatal", "parah", "mengganggu", "tidur", "malam"],
    "G087": ["ditusuk", "jarum", "keringat", "mulai berkeringat"],
    "G088": ["tebal", "baal", "mati rasa", "tidak peka", "sentuhan"],
    "G089": ["ruam", "memburuk", "telur", "seafood", "kacang", "makanan"],
    "G090": ["ruam", "perhiasan", "jam tangan", "sabuk", "logam", "nikel"],
    "G091": ["gatal", "dingin", "mandi", "air dingin", "cuaca dingin"],
    "G092": ["memburuk", "pakaian", "ketat", "sintetis", "wol"],
    "G093": ["warna", "gelap", "hitam", "lipatan", "menghitam"],
    "G094": ["sisik", "rontok", "beterbangan", "digaruk", "ketombe kering"],
    "G095": ["luka", "basah", "sulit kering", "dua minggu"],
    "G096": ["bintik", "merah", "kecil", "merata", "digigit nyamuk", "sekujur"],
}

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


def _detect_phrases(tokens: list[str]) -> dict[str, float]:
    """
    Deteksi frasa multi-kata dalam token list.
    Returns: dict {symptom_id: score}
    """
    scores: dict[str, float] = {}
    token_set = set(tokens)

    for phrase_tokens, sids in _STEMMED_PHRASE_MAP:
        # Cek apakah semua token frasa ada di token list
        if all(pt in token_set for pt in phrase_tokens):
            if _is_negated(tokens, phrase_tokens):
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

    for sid, keywords in SYMPTOM_KEYWORDS.items():
        score = 0.0
        for kw in keywords:
            kw_tokens = kw.split()
            if len(kw_tokens) == 1:
                # Single word match
                kw_stemmed = _stem_word(kw)
                if kw_stemmed in token_set or kw in token_set:
                    matched_token = kw_stemmed if kw_stemmed in token_set else kw
                    if not _is_negated(tokens, [matched_token]):
                        score += 1.0
            else:
                # Multi-word keyword: cek semua token ada
                kw_stemmed = [_stem_word(w) for w in kw_tokens]
                if all(w in token_set for w in kw_stemmed):
                    if not _is_negated(tokens, kw_stemmed):
                        score += 1.5

        if score > 0:
            # Normalize by number of keywords untuk menghindari bias gejala dengan banyak keyword
            normalized = score / math.sqrt(len(SYMPTOM_KEYWORDS[sid]))
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
