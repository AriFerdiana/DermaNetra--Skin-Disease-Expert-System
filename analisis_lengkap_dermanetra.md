# Dokumen Analisis Sistem Pakar: DermaNetra
**Topik:** Sistem Diagnosa Penyakit Kulit Menggunakan Naive Bayes dengan Context-Aware Prior
**Target:** Materi Presentasi & Laporan Akhir

---

## 1. Latar Belakang, Masalah, & Solusi
### Latar Belakang
Penyakit kulit merupakan masalah kesehatan masyarakat yang sangat umum di Indonesia. Faktor iklim tropis yang lembap serta kepadatan penduduk meningkatkan risiko penularan infeksi kulit (jamur, bakteri, parasit). Meskipun banyak yang tidak berakibat fatal, penyakit kulit berdampak besar pada kualitas hidup dan kepercayaan diri.

### Problem (Masalah)
1. **Diagnosis Mandiri yang Salah:** Banyak pasien mengidentifikasi penyakit hanya berdasarkan kemiripan visual yang seringkali menjebak (contoh: Psoriasis yang mirip dengan Dermatitis Seboroik).
2. **Keterbatasan Spesialis:** Tidak semua daerah memiliki akses cepat ke dokter spesialis kulit (Dermatologis).
3. **Penggunaan Obat yang Tidak Tepat:** Swamedikasi tanpa diagnosis yang tepat sering menyebabkan resistensi bakteri atau efek samping steroid.

### Solusi
**DermaNetra** hadir sebagai sistem pakar berbasis kecerdasan buatan yang mampu mensimulasikan kemampuan seorang pakar kulit. Dengan menggunakan metode probabilitas Naive Bayes, sistem memberikan estimasi diagnosis yang ilmiah berdasarkan data klinis dan faktor risiko pasien.

---

## 2. Gambaran Sistem Pakar yang Dibangun
Sistem ini dibangun dengan arsitektur **Hybrid Expert System**:
- **Expertise Base:** Pengetahuan medis yang dikodekan ke dalam dataset JSON (Likelihood, Symptoms, Diseases).
- **Inference Engine:** Mesin logika berbasis Python yang menghitung skor probabilitas secara mendalam.
- **Interactive UI:** Antarmuka yang memudahkan pengguna melakukan input gejala melalui visualisasi region tubuh (Head, Chest, Arms, Legs, dll).

Sistem tidak hanya memberikan hasil tunggal, melainkan **Ranking Diagnosis** (Top 5 kemungkinan terbesar) beserta persentasenya, sehingga memberikan ruang diskusi bagi pengguna dan tenaga medis.

---

## 3. Akuisisi Pengetahuan
Tahap ini merupakan proses memindahkan keahlian manusia ke dalam sistem.

### Pakar & Sumber Data
- **Sumber Utama:** International Statistical Classification of Diseases and Related Health Problems (ICD-10) untuk standarisasi kode penyakit.
- **Sumber Klinis:** Buku teks dermatologi (Fitzpatrick's Dermatology), Panduan Praktik Klinis (PPK) Tata Laksana Dokter Umum.

### Teknik Akuisisi Pengetahuan
1. **Extraction:** Menentukan gejala-gejala kunci (Key Symptoms) untuk setiap penyakit.
2. **Quantification:** Mengonversi data ke dalam nilai probabilitas.
   - *Prior Probability:* Seberapa umum penyakit tersebut muncul di masyarakat umum.
   - *Likelihood:* Seberapa sering gejala tertentu muncul pada penderita penyakit tersebut.

### Hasil Akuisisi Pengetahuan
- **42 Penyakit Kulit:** Mencakup kategori Infeksi Bakteri, Jamur, Virus, Parasit, hingga Gangguan Autoimun/Alergi.
- **76 Gejala Klinis:** Gejala yang telah divalidasi dan dihubungkan secara matematis dengan setiap penyakit.

---

## 4. Knowledge Base (Basis Pengetahuan)
Basis pengetahuan direpresentasikan dalam format JSON agar memiliki performa tinggi saat proses inferensi:

1. **Disease Knowledge (`diseases.json`)**:
   - Menyimpan meta-data penyakit: `ID`, `Nama`, `ICD-10`, `Prior`, `Description`, `Contagious Status`.
2. **Symptom Knowledge (`symptoms.json`)**:
   - Daftar keluhan fisik pengguna, dikategorikan berdasarkan lokasi anatomi tubuh.
3. **Relational Knowledge (`likelihood.json`)**:
   - Matriks yang menghubungkan Penyakit (D) dan Gejala (G) dengan nilai probabilitas spesifik $P(G|D)$.

---

## 5. Mesin Inferensi (Inference Engine)
Mesin inferensi adalah "otak" dari sistem ini. Menggunakan metodologi **Naive Bayes** dengan beberapa optimasi teknis:

1. **Log-Space Arithmetic**: 
   Perkalian banyak probabilitas kecil (misal: $0.1 \times 0.05 \times ...$) akan menghasilkan angka yang sangat mendekati nol (*underflow*). Sistem mengatasinya dengan mengubah perkalian menjadi penjumlahan dalam ruang logaritma:
   $$\ln(Score) = \ln(Prior) + \sum \ln(Likelihood)$$
2. **Laplace Smoothing**: 
   Jika seorang pasien memiliki gejala yang tidak terdata di salah satu penyakit, probabilitasnya tidak akan langsung menjadi nol. Sistem memberikan nilai $\epsilon = 0.01$ sebagai penyeimbang.
3. **Context-Aware Priors**:
   Sistem menyesuaikan diagnosis berdasarkan profil pasien (Gender, Usia, Durasi). 
   - *Contoh:* Jika pasien "Wanita", peluang **Melasma** secara otomatis dinaikkan (boost) karena secara klinis jauh lebih umum pada wanita.

---

## 6. Rumus Teorema Bayes
Teorema Bayes digunakan untuk menghitung probabilitas posterior penyakit setelah gejala diketahui:

$$P(D|G_1, G_2, ..., G_n) \propto P(D) \times \prod_{i=1}^n P(G_i|D)$$

**Penjelasan Komponen:**
- $P(D|G)$: Probabilitas pasien menderita penyakit D setelah menunjukkan gejala G.
- $P(D)$: Probabilitas awal (Prior) sebelum gejala diketahui.
- $P(G|D)$: Probabilitas munculnya gejala G pada pasien yang sudah positif menderita penyakit D.

---

## 7. Implementasi Kode Program
Logika utama diimplementasikan pada file `naive_bayes.py` (Backend) dan diintegrasikan melalui FastAPI:

```python
# Potongan Logika Utama (Simplified)
def diagnose(symptom_ids, patient_info):
    log_scores = []
    for disease in diseases:
        # 1. Start with Log(Prior)
        score = math.log(disease['prior'])
        
        # 2. Add Contextual Adjustment (Age/Gender)
        if patient_info['sex'] == 'female' and disease['id'] == 'D012':
            score += math.log(1.5) # Boost for Melasma
            
        # 3. Add Log(Likelihood) for each selected symptom
        for gid in symptom_ids:
            p_g_d = likelihood_map.get((did, gid), EPSILON)
            score += math.log(p_g_d)
            
        log_scores.append((disease_id, score))
```

---

## 8. Kesimpulan
1. **Akurasi Teoritis:** Sistem mampu memberikan diagnosis yang didasarkan pada perhitungan matematis yang objektif.
2. **Aksesibilitas:** Dengan format aplikasi web, diagnosa pakar dapat diakses kapan saja dan di mana saja.
3. **Penyuluhan Medis:** Selain diagnosis, sistem memberikan edukasi mengenai pencegahan penularan (Contagious status) dan kode ICD-10 untuk rujukan medis lebih lanjut.

---

## 9. Daftar Pustaka
1. World Health Organization (WHO). (2016). *ICD-10: International Statistical Classification of Diseases*.
2. James, W. D., et al. (2020). *Andrews' Diseases of the Skin: Clinical Dermatology*.
3. Norvig, P., & Russell, S. (2021). *Artificial Intelligence: A Modern Approach*.
4. Peraturan Menteri Kesehatan RI (2014). *Panduan Praktik Klinis Dokter di Fasyankes Primer*.
