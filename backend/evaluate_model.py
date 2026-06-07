"""
DermaNetra — Model Evaluation Script
=======================================
Digunakan untuk menguji akurasi mesin Naive Bayes menggunakan simulasi data pasien (Confusion Matrix / A/B Testing).
Skrip ini akan mengenerate 10.000 kasus pasien acak berdasarkan bobot probabilitas P(G|D) di knowledge base.
"""

import json
import random
from pathlib import Path
from engine import naive_bayes as nb

KB_DIR = Path(__file__).parent / "knowledge_base"

def generate_dummy_patient(likelihood_map, disease_id):
    """
    Generate sekumpulan gejala untuk seorang pasien palsu yang mengidap disease_id.
    Gejala dipilih berdasarkan probabilitas P(G|D).
    """
    patient_symptoms = []
    
    # Ambil semua gejala yang memiliki kaitan dengan penyakit ini
    related_symptoms = [(s_id, prob) for (d_id, s_id), prob in likelihood_map.items() if d_id == disease_id]
    
    for s_id, prob in related_symptoms:
        # Probabilitas kemunculan gejala. Jika random float < probabilitas, maka pasien mengalami gejala ini
        if random.random() < prob:
            patient_symptoms.append(s_id)
            
    # Pastikan setidaknya ada 1 gejala, jika tidak, paksa masukkan gejala dengan probabilitas tertinggi
    if not patient_symptoms and related_symptoms:
        related_symptoms.sort(key=lambda x: x[1], reverse=True)
        patient_symptoms.append(related_symptoms[0][0])
        
    return patient_symptoms

def run_evaluation(num_iterations=10000):
    print(f"Memulai Evaluasi Model DermaNetra ({num_iterations} iterasi)...")
    print("-" * 50)
    
    _, disease_map, _, likelihood_map = nb._load_kb()
    
    disease_ids = list(disease_map.keys())
    
    top1_correct = 0
    top3_correct = 0
    total_cases = 0
    
    # Track per disease accuracy
    disease_stats = {d_id: {"total": 0, "top1": 0} for d_id in disease_ids}

    for i in range(num_iterations):
        # 1. Pilih penyakit asli secara acak
        true_disease = random.choice(disease_ids)
        
        # 2. Generate gejala pasien palsu
        patient_symptoms = generate_dummy_patient(likelihood_map, true_disease)
        
        # 3. Minta mesin inferensi mendiagnosa
        # (Kita pass None untuk demografi pasien agar evaluasi fokus ke bobot likelihood gejala murni)
        diagnosis_results = nb.diagnose(patient_symptoms, patient=None)
        
        if not diagnosis_results:
            continue
            
        total_cases += 1
        disease_stats[true_disease]["total"] += 1
        
        predicted_top1 = diagnosis_results[0]["disease_id"]
        predicted_top3 = [res["disease_id"] for res in diagnosis_results[:3]]
        
        if true_disease == predicted_top1:
            top1_correct += 1
            disease_stats[true_disease]["top1"] += 1
            
        if true_disease in predicted_top3:
            top3_correct += 1
            
        if (i + 1) % 1000 == 0:
            print(f"Progress: {i + 1} / {num_iterations} selesai...")

    # Hitung akurasi
    top1_accuracy = (top1_correct / total_cases) * 100
    top3_accuracy = (top3_correct / total_cases) * 100
    
    print("\n" + "=" * 50)
    print("HASIL EVALUASI MODEL (CONFUSION MATRIX SIMULATION)")
    print("=" * 50)
    print(f"Total Kasus Uji    : {total_cases}")
    print(f"Top-1 Accuracy     : {top1_accuracy:.2f}% (Tebakan pertama benar)")
    print(f"Top-3 Accuracy     : {top3_accuracy:.2f}% (Penyakit asli ada di 3 tebakan teratas)")
    print("-" * 50)
    
    # Temukan penyakit yang paling sering salah ditebak
    print("\nPenyakit dengan Akurasi Terendah (Butuh Penyesuaian Bobot di Masa Depan):")
    worst_diseases = []
    for d_id, stats in disease_stats.items():
        if stats["total"] > 0:
            acc = (stats["top1"] / stats["total"]) * 100
            worst_diseases.append((d_id, disease_map[d_id]["name"], acc))
            
    worst_diseases.sort(key=lambda x: x[2])
    for d_id, name, acc in worst_diseases[:5]:
        print(f"- [{d_id}] {name}: {acc:.2f}%")
        
    print("\nPenyakit dengan Akurasi Tertinggi:")
    for d_id, name, acc in reversed(worst_diseases[-5:]):
        print(f"- [{d_id}] {name}: {acc:.2f}%")

if __name__ == "__main__":
    run_evaluation(10000)
