import sqlite3
import json
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

DB_PATH = Path(__file__).parent / "dermanetra.db"

def init_db():
    """Inisialisasi tabel SQLite saat startup."""
    try:
        with sqlite3.connect(DB_PATH) as conn:
            conn.execute('''
                CREATE TABLE IF NOT EXISTS diagnostics_log (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                    age INTEGER,
                    sex TEXT,
                    nlp_text TEXT,
                    symptoms_detected TEXT,
                    predicted_disease TEXT,
                    probability REAL,
                    user_feedback INTEGER DEFAULT 0
                )
            ''')
            conn.commit()
        logger.info(f"[DB] Inisialisasi database SQLite berhasil di {DB_PATH.name}")
    except Exception as e:
        logger.error(f"[DB] Gagal inisialisasi database: {e}")


def save_log(patient: dict, nlp_text: str, symptoms: list[str], predicted_disease: str, probability: float) -> int:
    """
    Menyimpan riwayat diagnosis ke database.
    Kembalikan ID row yang baru saja disimpan untuk kebutuhan feedback nanti.
    """
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO diagnostics_log 
                (age, sex, nlp_text, symptoms_detected, predicted_disease, probability)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                patient.get('age', 0), 
                patient.get('sex', 'unknown'), 
                nlp_text, 
                json.dumps(symptoms), 
                predicted_disease, 
                probability
            ))
            conn.commit()
            return cursor.lastrowid
    except Exception as e:
        logger.error(f"[DB] Gagal menyimpan log: {e}")
        return -1


def update_feedback(log_id: int, feedback_value: int) -> bool:
    """
    Update kolom user_feedback (1 = Like, -1 = Dislike)
    """
    try:
        with sqlite3.connect(DB_PATH) as conn:
            conn.execute('UPDATE diagnostics_log SET user_feedback = ? WHERE id = ?', (feedback_value, log_id))
            conn.commit()
            return True
    except Exception as e:
        logger.error(f"[DB] Gagal menyimpan feedback: {e}")
        return False
