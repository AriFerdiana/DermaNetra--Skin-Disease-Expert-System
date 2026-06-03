"""
DermaNetra — NLP Text Preprocessor
=====================================
Pipeline: clean → tokenize → remove_stopwords → stem

Uses PySastrawi for Bahasa Indonesia stemming.
"""

import re
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory

# ── Build stemmer once (singleton, expensive to create) ─────────────────────
_factory = StemmerFactory()
_stemmer = _factory.create_stemmer()

# ── Bahasa Indonesia stopwords ───────────────────────────────────────────────
# Carefully curated: exclude medically meaningful words
# (tidak, sangat, parah, ringan, malam, sering, dll. tetap dipertahankan)
ID_STOPWORDS = {
    "yang", "dan", "di", "ke", "dari", "untuk", "dengan", "ini", "itu",
    "pada", "dalam", "adalah", "atau", "juga", "sudah", "akan", "ada",
    "saya", "aku", "kamu", "kita", "kami", "mereka", "dia", "ia",
    "bisa", "bisa", "dapat", "harus", "perlu", "ingin", "mau", "menjadi",
    "oleh", "karena", "saat", "ketika", "jika", "kalau", "namun", "tapi",
    "tetapi", "sedangkan", "selain", "bahwa", "agar", "supaya", "yaitu",
    "yakni", "seperti", "misalnya", "contoh", "antara", "lain", "sampai",
    "hingga", "sejak", "lagi", "pula", "pun", "jadi", "maka", "demikian",
    "hal", "cara", "setelah", "sebelum", "kemudian", "lalu", "terus",
    "serta", "tidak", "bukan", "belum", "sudah", "lebih", "paling",
    "sebuah", "suatu", "beberapa", "semua", "tiap", "setiap", "masing",
    "tersebut", "terdapat", "terjadi", "timbul", "muncul", "memiliki",
    "mengalami", "merasakan", "rasakan", "merasa", "terasa",
    # Kata medis non-informatif
    "kulit", "tubuh", "bagian", "area", "daerah", "lokasi", "tempat",
    "kondisi", "keadaan", "gejala", "tanda", "symptom",
    # Kata umum pelengkap
    "nya", "ku", "mu", "si", "pun", "lah", "kah", "tah",
    "saja", "hanya", "cuma", "malah", "bahkan", "juga",
    "masih", "sedang", "sudah", "telah", "pernah",
    "agak", "cukup", "sekali", "betul", "memang",
    # Preposisi & konjungsi
    "atas", "bawah", "depan", "belakang", "samping", "antara",
    "seputar", "sekitar", "dekat", "jauh",
}

# Kata-kata yang TIDAK boleh dihapus meski mirip stopword
# (informatif secara medis)
MEDICAL_KEEP = {
    "tidak", "bukan", "parah", "ringan", "berat", "akut", "kronis",
    "malam", "pagi", "siang", "sore", "lama", "baru", "tiba",
    "sangat", "hebat", "intens", "terus", "sering", "jarang",
    "panas", "dingin", "lembap", "kering", "basah", "berminyak",
    "merah", "putih", "hitam", "kuning", "cokelat", "hijau", "ungu",
    "besar", "kecil", "lebar", "sempit", "dalam", "dangkal", "tebal", "tipis",
    "gatal", "nyeri", "sakit", "perih", "panas", "terbakar", "pedih",
    "bengkak", "keras", "lunak", "lembut", "kasar", "halus",
    "bernanah", "berair", "berdarah", "bersisik", "bekerak",
    "lepuh", "bisul", "jerawat", "bintik", "ruam", "plak", "bercak",
    "sisik", "kerak", "koreng", "luka", "borok", "lecet",
    "kemerahan", "kecokelatan", "kekuningan", "kehijauan",
    "mengelupas", "rontok", "pecah", "retak",
    "menyebar", "meluas", "merambat", "menjalar",
    "berulang", "kambuh", "sembuh",
}

# Hilangkan dari stopwords kata yang ada di MEDICAL_KEEP
ID_STOPWORDS = ID_STOPWORDS - MEDICAL_KEEP


def clean_text(text: str) -> str:
    """
    Tahap 1: Bersihkan teks dari noise.
    - Lowercase
    - Hapus tanda baca & angka
    - Hapus whitespace berlebih
    """
    text = text.lower()
    # Hapus karakter non-alfabet kecuali spasi dan slash (untuk gejala seperti "kulit/wajah")
    text = re.sub(r"[^a-z\s/]", " ", text)
    # Ganti slash dengan spasi
    text = text.replace("/", " ")
    # Hapus whitespace berlebih
    text = re.sub(r"\s+", " ", text).strip()
    return text


def tokenize(text: str) -> list[str]:
    """
    Tahap 2: Pecah teks menjadi list token.
    """
    tokens = text.split()
    # Hapus token yang sangat pendek (1 karakter) karena tidak informatif
    tokens = [t for t in tokens if len(t) > 1]
    return tokens


def remove_stopwords(tokens: list[str]) -> list[str]:
    """
    Tahap 3: Hapus kata-kata yang tidak informatif (stopwords).
    Kata medis dalam MEDICAL_KEEP selalu dipertahankan.
    """
    return [t for t in tokens if t not in ID_STOPWORDS or t in MEDICAL_KEEP]


def stem_tokens(tokens: list[str]) -> list[str]:
    """
    Tahap 4: Stemming menggunakan PySastrawi (Bahasa Indonesia).
    Contoh: "mengalami" → "alami", "kemerahan" → "merah"
    Pertahankan token asli + token hasil stem (untuk meningkatkan coverage matching).
    """
    stemmed = []
    for token in tokens:
        stemmed_token = _stemmer.stem(token)
        stemmed.append(stemmed_token)
        # Jika hasil stem berbeda dari aslinya, tambahkan keduanya
        if stemmed_token != token:
            stemmed.append(token)
    # Deduplicate sambil pertahankan order
    seen = set()
    result = []
    for t in stemmed:
        if t not in seen:
            seen.add(t)
            result.append(t)
    return result


def preprocess(text: str) -> list[str]:
    """
    Full NLP pipeline: clean → tokenize → remove_stopwords → stem.
    Returns list of processed tokens.
    """
    cleaned = clean_text(text)
    tokens = tokenize(cleaned)
    filtered = remove_stopwords(tokens)
    stemmed = stem_tokens(filtered)
    return stemmed


def get_pipeline_steps(text: str) -> dict:
    """
    Jalankan pipeline dan kembalikan detail setiap langkah.
    Digunakan untuk NLP Preview Panel di frontend.
    """
    original = text.strip()
    cleaned = clean_text(text)
    tokens = tokenize(cleaned)
    filtered = remove_stopwords(tokens)
    stemmed = stem_tokens(filtered)

    return {
        "original": original,
        "cleaned": cleaned,
        "tokens": tokens,
        "tokens_after_stopword_removal": filtered,
        "tokens_after_stemming": stemmed,
        "token_count_original": len(tokens),
        "token_count_final": len(stemmed),
        "stopwords_removed": len(tokens) - len(filtered),
    }
