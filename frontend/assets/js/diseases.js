// DermaNetra — Disease Knowledge Base (keyed by D-code)
// Used by buildResultsUI() to render diagnosis detail cards.
// Backend provides: disease_id, disease_name, disease_name_id, probability,
//                   icd10, contagious, description, regions.
// This file provides:  prevalence, clinical_features, causes,
//                      risk_factors, treatments, references.

const DISEASE_DB = {

'D001': {
  prevalence:'Very Common',
  clinical_features:['Sisik kekuningan berminyak di kulit kepala, sela alis, lipatan hidung','Kemerahan di area berminyak wajah dan dada','Sering kambuh, dipicu stres dan cuaca dingin'],
  causes:['Overgrowth jamur Malassezia','Produksi sebum berlebih','Gangguan imun'],
  risk_factors:['Kulit berminyak','Stres','HIV / Parkinson\'s disease','Cuaca dingin'],
  treatments:{
    otc:['Sampo zinc pyrithione 2–3×/minggu','Sampo selenium sulfide 1%','Sampo ketokonazol 1% (Nizoral)'],
    prescription:['Ketokonazol 2% krim/sampo','Topical steroid ringan (desonide untuk wajah)','Tacrolimus/pimecrolimus'],
    lifestyle:['Keramas lebih sering','Kelola stres','Paparan sinar matahari moderat pada kulit kepala'],
    see_doctor:'Konsultasikan ke dokter jika lesi meluas ke wajah atau resisten terhadap sampo antijamur.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/seborrhoeic-dermatitis'],
},

'D002': {
  prevalence:'Very Common',
  clinical_features:['Gatal intensif (terutama malam hari)','Kulit kering, merah, bersisik','Predileksi: lipatan siku, lutut, pergelangan tangan, leher','Likenifikasi (penebalan) pada fase kronik'],
  causes:['Mutasi gen filaggrin (gangguan skin barrier)','Respons imun Th2 yang berlebihan','Pemicu: tungau debu, bulu hewan, iritan'],
  risk_factors:['Riwayat keluarga atopi','Kulit kering / sensitif','Iklim dingin dan kering'],
  treatments:{
    otc:['Pelembab tebal (CeraVe, Cetaphil) setelah mandi','Krim hidrokortison 1% untuk flare ringan','Mandi oatmeal koloid'],
    prescription:['Steroid topikal sedang–kuat (triamcinolone)','Tacrolimus/pimecrolimus (wajah & lipatan)','Dupilumab (Dupixent) — biologis IL-4/IL-13'],
    lifestyle:['Mandi singkat dan segera lembabkan (soak & seal)','Hindari pemicu pribadi','Pakaian katun longgar'],
    see_doctor:'Konsultasikan ke dokter jika gatal mengganggu tidur, kulit terinfeksi, atau tidak membaik dengan OTC.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/atopic-dermatitis'],
},

'D003': {
  prevalence:'Common',
  clinical_features:['Pustul kecil berisi nanah di sekitar folikel rambut','Kemerahan dan nyeri setempat','Dapat berkembang menjadi furunkel (bisul besar)'],
  causes:['Bakteri Staphylococcus aureus','Jamur (pada kasus kronik)','Bercukur, gesekan, keringat berlebih'],
  risk_factors:['Kulit berminyak','Panas dan lembap','Diabetes mellitus','Sistem imun lemah'],
  treatments:{
    otc:['Sabun antiseptik (chlorhexidine)','Kompres hangat 2× sehari','Mupirocin 2% krim'],
    prescription:['Antibiotik oral (eritromisin, doksisiklin)','Antijamur topikal jika penyebab jamur'],
    lifestyle:['Jaga kulit tetap bersih dan kering','Hindari mencukur area terinfeksi'],
    see_doctor:'Konsultasikan ke dokter jika bisul membesar, demam, atau tidak membaik dalam 1 minggu.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/folliculitis'],
},

'D004': {
  prevalence:'Common',
  clinical_features:['Gatal hebat, memuncak malam hari','Garis terowongan (burrow) di sela jari, pergelangan, sekitar pinggang','Ruam papulovesikuler menyebar','Sangat menular antar anggota keluarga'],
  causes:['Tungau Sarcoptes scabiei var. hominis','Kontak kulit langsung berkepanjangan'],
  risk_factors:['Tinggal padat/bersama','Fasilitas umum','Sistem imun lemah','Anak-anak'],
  treatments:{
    otc:['Krim permetrin 5% (seluruh tubuh, diamkan 8–14 jam)','Losion benzyl benzoate 25%'],
    prescription:['Ivermectin oral (dosis tunggal, ulangi 2 minggu)','Krim permetrin resep'],
    lifestyle:['Cuci semua pakaian/seprei air panas & keringkan','Obati seluruh anggota keluarga bersamaan','Hindari kontak kulit hingga sembuh'],
    see_doctor:'Segera ke dokter — seluruh kontak rumah tangga harus diobati bersamaan.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/scabies'],
},

'D005': {
  prevalence:'Very Common',
  clinical_features:['Bintik-bintik merah kecil atau vesikel transparan','Perih / gatal saat berkeringat','Muncul di area tertutup pakaian atau lipatan','Sembuh sendiri jika lingkungan lebih sejuk'],
  causes:['Sumbatan kelenjar ekrin akibat panas dan kelembapan tinggi','Pakaian ketat atau sintetis'],
  risk_factors:['Iklim tropis panas lembap','Bayi dan anak-anak','Aktivitas fisik berat','Demam tinggi'],
  treatments:{
    otc:['Bedak tabur bebas wewangian','Lotion calamine','Kompres dingin'],
    prescription:['Krim steroid ringan (untuk miliaria profunda)'],
    lifestyle:['Pakai pakaian katun longgar','AC atau lingkungan sejuk','Mandi lebih sering'],
    see_doctor:'Konsultasikan ke dokter jika lesi menyebar luas atau disertai demam.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/miliaria'],
},

'D006': {
  prevalence:'Common',
  clinical_features:['Plak merah tebal bersisik keperakan berbatas tegas','Predileksi: siku, lutut, kulit kepala, punggung bawah','Tanda Auspitz (perdarahan titik saat sisik diangkat)','Fenomena Koebner (lesi di bekas trauma)','Perubahan kuku pada 50–80% kasus'],
  causes:['Autoimun: hiperaktivasi sel T (jalur Th17)','Sitokin IL-17, IL-23, TNF-alpha','Pemicu: infeksi strep, stres, trauma, beta-blocker'],
  risk_factors:['Riwayat keluarga','Obesitas','Merokok','Alkohol'],
  treatments:{
    otc:['Preparat coal tar','Asam salisilat (melepas sisik)','Pelembab ointment tebal'],
    prescription:['Steroid topikal kelas I–II','Vitamin D analog (kalsipotriol)','Biologis: adalimumab, secukinumab','Fototerapi NB-UVB'],
    lifestyle:['Pelembab harian','Hindari pemicu: stres, trauma kulit, merokok, alkohol'],
    see_doctor:'Rujuk ke dokter kulit untuk konfirmasi diagnosis dan terapi sistemik.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/psoriasis'],
},

'D007': {
  prevalence:'Common',
  clinical_features:['Bercak botak bersisik di kulit kepala','Rambut rapuh dan mudah patah di pangkal','Gatal hebat di kulit kepala','Dapat membentuk kerion (abses inflamasi besar)','Paling umum pada anak-anak'],
  causes:['Dermatofit Trichophyton/Microsporum','Kontak dengan hewan atau manusia terinfeksi'],
  risk_factors:['Anak-anak usia sekolah','Kondisi padat penduduk','Berbagi sisir/topi'],
  treatments:{
    otc:['Sampo selenium sulfide 1% (kontrol penyebaran, bukan penyembuhan)'],
    prescription:['Griseofulvin oral 6–8 minggu (first-line)','Terbinafine oral','Itrakonazol oral'],
    lifestyle:['Jangan berbagi sisir, topi, bantal','Obati juga anggota keluarga/kontak dekat'],
    see_doctor:'Wajib ke dokter — tinea capitis memerlukan antijamur oral sistemik.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/tinea-capitis'],
},

'D008': {
  prevalence:'Common',
  clinical_features:['Gatal hebat di kulit kepala, diperparah malam hari','Terlihat nits (telur kutu) berwarna putih menempel di batang rambut','Kutu dewasa bergerak di rambut','Bekas garukan di kulit kepala'],
  causes:['Pediculus humanus capitis (kutu rambut)','Kontak kepala ke kepala langsung','Berbagi perlengkapan rambut'],
  risk_factors:['Anak-anak usia sekolah 4–11 tahun','Rambut panjang','Kontak dekat'],
  treatments:{
    otc:['Permetrin 1% losion (tinggal 10 menit)','Pirethrin shampo','Sisir serit untuk sisir nits'],
    prescription:['Malathion 0.5% losion','Ivermectin topikal 0.5%','Spinosad suspensi 0.9%'],
    lifestyle:['Cuci pakaian/sprei air panas','Periksa dan obati semua anggota keluarga','Jangan berbagi sisir/topi'],
    see_doctor:'Konsultasikan ke dokter jika OTC gagal setelah 2 siklus pengobatan.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/head-lice'],
},

'D009': {
  prevalence:'Common',
  clinical_features:['Krusta warna kuning madu yang khas','Vesikel/pustul yang mudah pecah dan mengering','Sangat menular, terutama pada anak-anak','Dapat menyebar ke area lain (autoinokulasi)'],
  causes:['Staphylococcus aureus','Streptococcus pyogenes','Kontak langsung dengan lesi'],
  risk_factors:['Anak-anak','Cuaca panas dan lembap','Luka kulit terbuka','Kepadatan tinggi'],
  treatments:{
    otc:['Mupirocin 2% krim topikal (lini pertama lesi terbatas)','Jaga area tetap bersih'],
    prescription:['Antibiotik oral (amoksisilin-klavulanat, cefaleksin)','Mupirocin resep dosis tinggi'],
    lifestyle:['Tutup lesi dengan perban','Cuci tangan sering','Jangan berbagi handuk'],
    see_doctor:'Ke dokter jika lesi meluas, ada demam, atau tidak membaik dalam 3 hari.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/impetigo'],
},

'D010': {
  prevalence:'Uncommon',
  clinical_features:['Bercak botak berbentuk bulat/oval yang jelas','Kulit kepala tampak halus dan normal (tidak inflamasi)','Dapat menyerang alis, bulu mata, janggut','Terkadang kambuh dan remisi sendiri'],
  causes:['Reaksi autoimun — sel T menyerang folikel rambut','Faktor genetik (HLA)','Pemicu: stres, infeksi'],
  risk_factors:['Riwayat keluarga','Kondisi autoimun lain (tiroid, vitiligo)'],
  treatments:{
    otc:['Tidak ada OTC yang terbukti efektif'],
    prescription:['Injeksi triamsinolon intrafolikuler','Minoksidil topikal 5%','Kortikosteroid sistemik (kasus luas)','JAK inhibitor oral (baricitinib, ritlecitinib)'],
    lifestyle:['Kelola stres','Dukungan psikososial','Pemakaian wig sementara'],
    see_doctor:'Wajib ke dokter kulit — memerlukan evaluasi dan penanganan spesialis.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/alopecia-areata'],
},

'D011': {
  prevalence:'Very Common',
  clinical_features:['Komedo (blackhead/whitehead) di wajah, dada, punggung','Papul dan pustul meradang merah','Nodul/kista pada kasus berat (meninggalkan bekas)','Predileksi zona-T (dahi, hidung, dagu)','Hiperpigmentasi pasca inflamasi'],
  causes:['Produksi sebum berlebih','Bakteri Cutibacterium acnes','Sumbatan folikel (hiperkeratinisasi)','Fluktuasi hormon androgen'],
  risk_factors:['Masa remaja','Kulit berminyak','Riwayat keluarga','Diet tinggi glikemik','Stres'],
  treatments:{
    otc:['Benzoyl peroxide 2.5–5% gel/sabun','Asam salisilat 0.5–2%','Adapalene 0.1% gel (OTC retinoid)'],
    prescription:['Retinoid topikal (tretinoin, tazaroten)','Antibiotik topikal/oral (doksisiklin, klindamisin)','Isotretinoin oral (kasus berat)'],
    lifestyle:['Cuci wajah 2× sehari','Jangan memencet jerawat','Produk non-komedogenik','Diet rendah glikemik'],
    see_doctor:'Ke dokter jika tidak membaik dalam 8 minggu OTC, muncul nodul/kista, atau ada bekas luka.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/acne-vulgaris'],
},

'D012': {
  prevalence:'Common',
  clinical_features:['Hiperpigmentasi simetris berwarna cokelat/abu-abu di wajah','Terutama di pipi, dahi, bibir atas','Tidak ada keluhan gatal','Memburuk setelah paparan matahari'],
  causes:['Paparan UV','Hormonal (kehamilan, pil KB)','Obat-obatan (minosiklin)'],
  risk_factors:['Wanita usia reproduktif','Phototype kulit gelap','Paparan matahari tinggi','Kehamilan'],
  treatments:{
    otc:['Sunscreen mineral SPF 50+ setiap hari','Niacinamide 4% serum','Krim pemutih OTC (arbutin, kojic acid)'],
    prescription:['Krim triple combination (hydroquinone + tretinoin + steroid)','Chemical peeling','Laser Q-switched'],
    lifestyle:['Tabir surya WAJIB setiap hari','Topi lebar saat keluar','Hindari sinar matahari pukul 10–14'],
    see_doctor:'Konsultasikan ke dokter kulit untuk penanganan tepat dan hindari produk sembarangan.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/melasma'],
},

'D013': {
  prevalence:'Common',
  clinical_features:['Eritema sentrofasial persisten ("kupu-kupu")','Flushing dipicu panas, alkohol, makanan pedas','Telangiektasia (pembuluh darah halus terlihat)','Papul dan pustul TANPA komedo (bedakan dari jerawat)','Rosacea okular: mata kering, blefaritis'],
  causes:['Disfungsi neurovaskuler','Overgrowth tungau Demodex','Kerusakan UV kronik'],
  risk_factors:['Kulit terang (Fitzpatrick I–II)','Usia 30–50 tahun','Keturunan Eropa Utara'],
  treatments:{
    otc:['Sunscreen mineral SPF 30+ setiap hari','Pembersih lembut tanpa pewangi','Niacinamide 4% topikal'],
    prescription:['Metronidazol topikal 0.75–1%','Ivermectin 1% krim (anti-Demodex)','Asam azelaat 15%','Doksisiklin 40 mg slow-release'],
    lifestyle:['Catat pemicu flushing pribadi','Hindari makanan pedas, alkohol, paparan ekstrem','Gunakan sunscreen setiap hari'],
    see_doctor:'Ke dokter untuk diagnosis dini dan cegah progresivitas (rhinophyma).',
  },
  references:['DermNet NZ: dermnetnz.org/topics/rosacea'],
},

'D014': {
  prevalence:'Very Common',
  clinical_features:['Bercak oval hipo/hiperpigmentasi dengan sisik halus','Distribusi di dada, punggung atas, lengan atas','Sangat terlihat setelah berjemur (warna tak merata)','Lampu Wood: fluoresensi kuning-hijau','KOH: "spaghetti and meatballs"'],
  causes:['Overgrowth Malassezia furfur','Iklim panas/lembap, kulit berminyak, keringat berlebih'],
  risk_factors:['Kulit berminyak','Iklim tropis','Remaja/dewasa muda','Hiperhidrosis'],
  treatments:{
    otc:['Sampo selenium sulfide 1% diaplikasikan ke area (10 menit, 2 minggu)','Krim klotrimazol 1% × 2–4 minggu','Sabun zinc pyrithione'],
    prescription:['Sampo ketokonazol 2% (tinggal 5 menit × 3 hari)','Flukonazol 400 mg dosis tunggal','Itrakonazol 200 mg/hari × 5–7 hari'],
    lifestyle:['Perubahan pigmen mungkin bertahan bulan setelah sembuh (normalkan pasien)','Sampo ketokonazol 1×/bulan sebagai maintenance'],
    see_doctor:'Ke dokter jika tidak respons OTC setelah 4 minggu.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/pityriasis-versicolor'],
},

'D015': {
  prevalence:'Very Common',
  clinical_features:['Eritema, vesikel, lesi weeping di area kontak (fase akut)','Pola ruam mengikuti area kontak (jam tangan, sabuk, sandal)','Gatal hebat (ACD) atau rasa terbakar (ICD)','Likenifikasi dan fisura pada fase kronik'],
  causes:['ICD: sabun, deterjen, bahan kimia','ACD: nikel, wewangian, pewarna rambut (PPD), lateks'],
  risk_factors:['Tenaga kesehatan / penata rambut','Pekerjaan basah','Dermatitis atopik','Paparan kimia berulang'],
  treatments:{
    otc:['Krim hidrokortison 1%','Segera hindari/hapus penyebab','Kompres dingin untuk lesi basah'],
    prescription:['Steroid topikal sedang–kuat','Prednison oral short course (ACD berat)','Tacrolimus/pimecrolimus (wajah, lipatan)'],
    lifestyle:['Hindari ketat agen penyebab','Sarung tangan nitril untuk pekerjaan basah','Pelembab rutin'],
    see_doctor:'Ke dokter untuk patch test formal atau jika ruam berat/meluas.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/contact-dermatitis'],
},

'D016': {
  prevalence:'Common',
  clinical_features:['Kista keratin kecil warna putih/kuning keras di bawah kulit','Tidak meradang, tidak nyeri','Sering di pipi, hidung, kelopak mata, dagu','Pada bayi: menghilang sendiri dalam beberapa minggu'],
  causes:['Tertahannya keratin di folikel rambut atau kelenjar keringat','Trauma kulit atau luka bakar (milia sekunder)'],
  risk_factors:['Bayi baru lahir (milia primer)','Penggunaan produk berminyak berat (dewasa)','Kulit sensitif'],
  treatments:{
    otc:['Retinol topikal OTC (mencegah baru)','Eksfoliasi lembut (AHA/BHA)'],
    prescription:['Ekstraksi manual oleh dokter dengan jarum steril','Retinoid topikal (tretinoin 0.025%)'],
    lifestyle:['Hindari produk berminyak/komedogenik','Eksfoliasi 1–2×/minggu','Lindungi dari paparan matahari'],
    see_doctor:'Konsultasikan ke dokter untuk ekstraksi yang aman, jangan dipencet sendiri.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/milium'],
},

'D017': {
  prevalence:'Common',
  clinical_features:['Vesikel berkelompok berisi cairan bening di tepi bibir atau genital','Rasa terbakar, gatal, nyeri sebelum vesikel muncul (prodromal)','Krusta dalam 3–5 hari, sembuh 7–10 hari','Kambuhan dipicu stres, demam, paparan matahari'],
  causes:['Herpes Simplex Virus type 1 (HSV-1, oral)','HSV-2 (genital)','Laten di ganglion sensorik, reaktivasi periodik'],
  risk_factors:['Stres fisik atau emosional','Demam/penyakit lain','Paparan matahari intens','Sistem imun lemah'],
  treatments:{
    otc:['Krim acyclovir 5% (episode awal)','Kompres dingin untuk nyeri'],
    prescription:['Asiklovir/valasiklovir/famsiklovir oral','Terapi supresi harian jika kambuhan sering'],
    lifestyle:['Hindari kontak saat lesi aktif','Cuci tangan setelah menyentuh lesi','Tabir surya di bibir (SPF lip balm)'],
    see_doctor:'Ke dokter untuk terapi antiviral resep, terutama jika kambuhan sering atau sistem imun lemah.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/herpes-simplex'],
},

'D018': {
  prevalence: { id: 'Sangat Umum', en: 'Very Common' },
  clinical_features: {
    id: ['Wheal (bentol) merah menonjol gatal, lesi individual hilang <24 jam tanpa bekas','Ukuran bervariasi, dapat berpindah','Angioedema (pembengkakan dalam) pada 40% kasus','Dermografisme: goresan memicu wheal'],
    en: ['Itchy, raised red wheals (hives); individual lesions vanish <24h without scars','Varying sizes, can migrate','Angioedema (deep swelling) in 40% of cases','Dermographism: stroking the skin triggers wheals']
  },
  causes: {
    id: ['Makanan: kacang, seafood, telur','Obat: penisilin, NSAID','Pemicu fisik: tekanan, dingin, panas','Autoimun (urtikaria kronik)'],
    en: ['Foods: nuts, seafood, eggs','Drugs: penicillin, NSAIDs','Physical triggers: pressure, cold, heat','Autoimmune (chronic urticaria)']
  },
  risk_factors: {
    id: ['Riwayat atopi','Penggunaan NSAID','Stres'],
    en: ['History of atopy','NSAID use','Stress']
  },
  treatments: {
    otc: {
      id: ['Cetirizine 10 mg atau loratadine 10 mg (antihistamin non-sedasi)','Feksofenadin 180 mg','Kompres dingin'],
      en: ['Cetirizine 10 mg or Loratadine 10 mg (non-sedating antihistamines)','Fexofenadine 180 mg','Cold compress']
    },
    prescription: {
      id: ['Antihistamin dosis tinggi (4× standar)','Prednison oral short course (kasus akut berat)','Omalizumab (Xolair) untuk urtikaria kronik refrakter'],
      en: ['High-dose antihistamines (up to 4× standard)','Short-course oral Prednisone (severe acute cases)','Omalizumab (Xolair) for refractory chronic cases']
    },
    lifestyle: {
      id: ['Identifikasi dan hindari pemicu (food diary)','Hindari NSAID dan pemanasan berlebih'],
      en: ['Identify and avoid triggers (keep a food diary)','Avoid NSAIDs and overheating']
    },
    see_doctor: {
      id: 'Segera ke UGD jika tenggorokan bengkak / sesak napas (anafilaksis). Ke dokter jika >6 minggu.',
      en: 'Seek ER immediately for throat swelling/shortness of breath (anaphylaxis). See doctor if lasts >6 weeks.'
    }
  },
  references: ['DermNet NZ: dermnetnz.org/topics/urticaria-an-overview'],
},

'D019': {
  prevalence:'Common',
  clinical_features:['Benjolan kulit daging/putih mutiara ukuran 2–5 mm','Lekukan/titik putih di tengah (umbilikasi) — KHAS','Tidak nyeri, tidak gatal kecuali saat inflamasi','Mudah menyebar (autoinokulasi) saat digaruk'],
  causes:['Poxvirus (Molluscum contagiosum virus)','Kontak kulit langsung atau kolam renang'],
  risk_factors:['Anak-anak','Atopik (kulit kering + sering garuk)','Imunosupresi'],
  treatments:{
    otc:['Krim adapalene 0.1% (mempercepat resolusi)'],
    prescription:['Kuretase (pengangkatan mekanis)','Krioterapi dengan nitrogen cair','Cantaridin (blister beetle extract)','Imiquimod 5% krim'],
    lifestyle:['Hindari berbagi handuk/pakaian','Jangan mencubit atau memencet lesi','Tutup lesi dengan plester'],
    see_doctor:'Konsultasikan ke dokter untuk terapi definitif — bisa sembuh sendiri dalam 1–2 tahun.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/molluscum-contagiosum'],
},

'D020': {
  prevalence:'Common',
  clinical_features:['Plak anular (cincin) merah dengan tepi aktif menonjol dan bersisik','Central clearing saat lesi meluas keluar','Gatal intens di tepi aktif','Jamur dermatofit, bukan cacing'],
  causes:['Trichophyton rubrum (paling umum)','Microsporum canis (dari kucing/anjing)','Lingkungan panas dan lembap'],
  risk_factors:['Kontak dengan hewan/manusia terinfeksi','Berbagi handuk/perlengkapan olahraga','Sistem imun lemah'],
  treatments:{
    otc:['Klotrimazol 1% krim 2×/hari × 2–4 minggu','Terbinafine 1% krim 1×/hari × 1–2 minggu'],
    prescription:['Terbinafine oral 250 mg/hari × 2–4 minggu (penyakit luas)','Itrakonazol atau flukonazol oral'],
    lifestyle:['Keringkan kulit setelah mandi','Hindari berbagi barang pribadi','Obati hewan peliharaan yang terinfeksi'],
    see_doctor:'Ke dokter jika tidak sembuh setelah 4 minggu OTC atau lesi meluas.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/tinea-corporis'],
},

'D021': {
  prevalence:'Common',
  clinical_features:['Lesi merah basah/maserasi di lipatan bertanda batas tegas','Bintik-bintik satelit kecil di pinggiran lesi (KHAS)','Rasa terbakar dan gatal','Pada bayi: ruam popok candida'],
  causes:['Candida albicans (jamur oportunistik)','Kelembapan dan panas di lipatan kulit'],
  risk_factors:['Diabetes mellitus','Obesitas','Antibiotik jangka lama','Imunosupresi','Inkontinensia'],
  treatments:{
    otc:['Klotrimazol 1% krim 2×/hari × 2–4 minggu','Mikonazol 2% krim'],
    prescription:['Flukonazol oral 150 mg dosis tunggal (berat)','Nistatin topikal untuk area genital/oral'],
    lifestyle:['Jaga area lipatan tetap kering','Ganti popok/celana dalam sering','Hindari pakaian ketat sintetis'],
    see_doctor:'Ke dokter jika infeksi berulang — periksa kemungkinan diabetes atau imunodefisiensi.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/candida-infection'],
},

'D022': {
  prevalence:'Common',
  clinical_features:['Plak eritematosa anular di selangkangan/paha dalam — berbentuk bulan sabit','TIDAK mengenai skrotum (bedakan dari kandidiasis)','Sering bilateral dan simetris','Sering bersamaan dengan tinea pedis'],
  causes:['Trichophyton rubrum','Epidermophyton floccosum','Autoinokulasi dari tinea pedis'],
  risk_factors:['Pria','Obesitas','Atlet/keringat berlebih','Pakaian ketat'],
  treatments:{
    otc:['Klotrimazol 1% krim 2×/hari × 2–4 minggu','Terbinafine 1% krim × 1–2 minggu','Bedak antijamur untuk mengurangi kelembapan'],
    prescription:['Terbinafine oral 250 mg/hari (kasus luas)','Obati tinea pedis bersamaan'],
    lifestyle:['Pakai kaus kaki sebelum celana dalam (cegah autoinokulasi)','Celana dalam katun longgar','Mandi segera setelah olahraga'],
    see_doctor:'Ke dokter jika lesi mengenai skrotum, gagal OTC 4 minggu, atau berulang.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/tinea-cruris'],
},

'D023': {
  prevalence:'Uncommon',
  clinical_features:['Bercak merah-cokelat tipis dan rata di lipatan paha, ketiak, atau jari kaki','HAMPIR TIDAK GATAL (bedakan dari tinea)','Batas tegas','Lampu Wood: fluoresensi merah coral — diagnostik'],
  causes:['Corynebacterium minutissimum (bakteri)','Kondisi lembap kronik di lipatan'],
  risk_factors:['Diabetes mellitus','Obesitas','Hiperhidrosis','Iklim panas'],
  treatments:{
    otc:['Sabun antiseptik (erythromycin-based)'],
    prescription:['Eritromisin oral 250 mg 4×/hari × 14 hari','Klaritromisin atau asam fusidat topikal'],
    lifestyle:['Jaga lipatan tetap kering','Bedak tabur antiseptik'],
    see_doctor:'Ke dokter untuk diagnosis pasti — lampu Wood dibutuhkan.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/erythrasma'],
},

'D024': {
  prevalence:'Rare',
  clinical_features:['Ulkus kulit dalam dengan dinding curam dan krusta tebal di atasnya','Meninggalkan bekas luka (scar)','Dari impetigo yang tidak diobati, bertambah parah','Lebih dalam dari impetigo biasa'],
  causes:['Staphylococcus aureus','Streptococcus pyogenes (lebih sering)','Komplikasi impetigo yang diabaikan'],
  risk_factors:['Sanitasi buruk','Gigitan serangga sebagai port of entry','Sistem imun lemah','Malnutrisi'],
  treatments:{
    otc:['Bersihkan luka dan tutup dengan plester bersih'],
    prescription:['Antibiotik oral (penisilin, amoksisilin-klavulanat)','Mupirocin topikal lesi kecil'],
    lifestyle:['Jaga kebersihan luka','Hindari menggaruk','Nutrisi cukup untuk penyembuhan'],
    see_doctor:'Wajib ke dokter — ecthyma memerlukan antibiotik sistemik dan perawatan luka.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/ecthyma'],
},

'D025': {
  prevalence:'Rare',
  clinical_features:['Bisul/abses bernanah nyeri dan berulang di lipatan (ketiak, selangkangan)','Membentuk sinus (saluran) dan fistula','Meninggalkan bekas luka dan fibrosis','Kronik dan sangat memengaruhi kualitas hidup'],
  causes:['Oklusi dan ruptur folikel apokrin','Respons inflamasi steril (bukan infeksi primer)'],
  risk_factors:['Merokok','Obesitas','Keluarga','Wanita lebih umum'],
  treatments:{
    otc:['Sabun antiseptik (chlorhexidine)','Kompres hangat untuk drainase'],
    prescription:['Antibiotik topikal (klindamisin)','Antibiotik oral kombinasi (rifampisin + klindamisin)','Biologis: adalimumab (Humira) — satu-satunya yang disetujui FDA','Operasi eksisi luas untuk kasus berat'],
    lifestyle:['Berhenti merokok','Turunkan berat badan','Pakaian longgar katun','Hindari cukur di area terdampak'],
    see_doctor:'Wajib ke dokter spesialis kulit — kondisi kronik yang memerlukan manajemen jangka panjang.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/hidradenitis-suppurativa'],
},

'D026': {
  prevalence:'Common',
  clinical_features:['Kulit merah, basah, nyeri, dan mengelupas di lipatan','Tidak ada komponen infeksi primer (bedakan dari kandidiasis)','Batas tidak tegas','Dapat berkembang menjadi superinfeksi bakteri/jamur'],
  causes:['Gesekan kulit-ke-kulit dengan kelembapan','Panas berlebih','Obesitas menyebabkan lipatan dalam'],
  risk_factors:['Obesitas','Diabetes mellitus','Inkontinensia','Imobilitas','Panas dan lembap'],
  treatments:{
    otc:['Bedak tabur zinc oxide','Barrier cream (pasta seng)','Kompres dingin'],
    prescription:['Jika ada infeksi sekunder: antijamur atau antibiotik topical','Steroid lemah jangka pendek'],
    lifestyle:['Jaga lipatan tetap kering (kipas angin, kain penyerap)','Turunkan berat badan','Ganti pakaian basah segera'],
    see_doctor:'Ke dokter jika tidak membaik atau ada tanda infeksi sekunder (satelit lesi, bau).',
  },
  references:['DermNet NZ: dermnetnz.org/topics/intertrigo'],
},

'D027': {
  prevalence:'Very Rare',
  clinical_features:['Luka (ulkus) tanpa rasa sakit yang terus membesar','Permukaan luka mudah berdarah bila disentuh','Tidak ada bekas infeksi atau pembengkakan kelenjar awal','Terbatas di daerah tropik dan subtropik'],
  causes:['Klebsiella granulomatis (Calymmatobacterium)','Penularan seksual atau fecal-oral'],
  risk_factors:['Aktivitas seksual tidak aman','Wilayah endemik (India, Papua Nugini, Afrika Selatan)'],
  treatments:{
    otc:['Tidak ada terapi OTC yang efektif'],
    prescription:['Doksisiklin oral 100 mg 2×/hari minimal 3 minggu','Azithromisin atau eritromisin alternatif'],
    lifestyle:['Penggunaan kondom','Hindari hubungan seksual saat pengobatan'],
    see_doctor:'WAJIB ke dokter — penyakit menular seksual yang memerlukan antibiotik spesifik.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/granuloma-inguinale'],
},

'D028': {
  prevalence:'Common',
  clinical_features:['Vesikel (bintik berair) kecil SANGAT gatal di telapak tangan, sisi jari, telapak kaki','Vesikel dalam di lapisan kulit (tidak mudah pecah)','Sangat gatal sebelum vesikel muncul','Kambuhan, sering dipicu stres, reaksi alergi'],
  causes:['Idiopatik (belum jelas)','Pemicu: stres, paparan logam (nikel, kobalt)','Berkaitan dengan dermatitis atopik / alergi'],
  risk_factors:['Dermatitis atopik','Stres emosional','Paparan logam','Pekerjaan basah'],
  treatments:{
    otc:['Krim hidrokortison 1%','Kompres dingin untuk gatal akut','Pelembab bebas pewangi'],
    prescription:['Steroid topikal kuat (clobetasol)','Tacrolimus/pimecrolimus','Fototerapi PUVA tangan'],
    lifestyle:['Hindari pemicu yang diketahui','Kenakan sarung tangan saat kerja basah','Kelola stres'],
    see_doctor:'Ke dokter jika vesikel tidak membaik, pecah dan berinfeksi, atau sangat mengganggu.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/dyshidrotic-eczema'],
},

'D029': {
  prevalence:'Common',
  clinical_features:['Penebalan (hyperkeratosis) dan sisik difus di telapak tangan','Sering hanya satu telapak tangan (asymmetric) — KHAS','Kulit kering dan pecah-pecah','Sering bersamaan dengan tinea pedis'],
  causes:['Trichophyton rubrum','Sering autoinokulasi dari tinea pedis'],
  risk_factors:['Tinea pedis yang tidak diobati','Kebun/pertanian','Kontak dengan tanah terkontaminasi'],
  treatments:{
    otc:['Klotrimazol 1% krim','Terbinafine 1% krim'],
    prescription:['Terbinafine oral 250 mg/hari × 2–4 minggu','Itrakonazol oral'],
    lifestyle:['Obati tinea pedis bersamaan','Jaga tangan tetap kering','Hindari berbagi handuk'],
    see_doctor:'Ke dokter untuk dikonfirmasi (mirip eksim tangan — butuh KOH prep).',
  },
  references:['DermNet NZ: dermnetnz.org/topics/tinea-manuum'],
},

'D030': {
  prevalence:'Rare',
  clinical_features:['Bercak kulit mati rasa (PATOGNOMONIK) — hilangnya sensasi pada bercak','Bercak berwarna lebih pucat dari kulit sekitar','Penebalan saraf tepi yang teraba','Kelemahan otot tangan/kaki','Kondisi kronik, masa inkubasi bertahun-tahun'],
  causes:['Mycobacterium leprae (bakteri bersifat sangat lambat berkembang biak)','Penularan via droplet pernapasan jarak dekat, berkepanjangan'],
  risk_factors:['Kontak berkepanjangan dengan penderita tidak terobati','Wilayah endemik (Indonesia, India, Brasil)','Sistem imun lemah'],
  treatments:{
    otc:['Tidak ada'],
    prescription:['MDT (Multi-Drug Therapy): dapson + rifampisin + klofazimin','Durasi 6 bulan (tipe PB) atau 12 bulan (tipe MB)'],
    lifestyle:['Lindungi area mati rasa dari cedera dan panas','Patuhi seluruh pengobatan (tidak boleh berhenti di tengah)'],
    see_doctor:'SEGERA ke dokter / puskesmas — kusta dapat disembuhkan dan program MDT GRATIS dari pemerintah.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/leprosy'],
},

'D031': {
  prevalence:'Common',
  clinical_features:['Area kulit merah, hangat, membengkak, nyeri berdenyut','Batas tidak tegas (berbeda dari erisipelas)','Demam dan menggigil (sistemik)','Sering di tungkai bawah setelah luka/gigitan'],
  causes:['Streptococcus pyogenes','Staphylococcus aureus','Masuk melalui luka, lecet, tinea pedis'],
  risk_factors:['Luka kulit terbuka','Obesitas','Limfedema','Diabetes mellitus','Riwayat selulitis sebelumnya'],
  treatments:{
    otc:['Tidak ada — wajib antibiotik'],
    prescription:['Antibiotik oral: cefaleksin atau amoksisilin-klavulanat','Antibiotik IV (rawat inap) jika sistemik berat'],
    lifestyle:['Istirahatkan dan tinggikan tungkai','Obati tinea pedis untuk cegah kambuh','Jaga luka tetap bersih'],
    see_doctor:'SEGERA ke dokter — selulitis adalah infeksi serius yang memerlukan antibiotik resep.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/cellulitis'],
},

'D032': {
  prevalence:'Uncommon',
  clinical_features:['Herald patch (bercak awal besar) diikuti ruam lebih kecil 1–2 minggu','Pola distribusi "pohon cemara" atau "Christmas tree" di batang tubuh','Oval bersisik dengan warna salmon/merah muda','Sembuh sendiri 6–12 minggu','Gatal sedang hingga ringan'],
  causes:['Diduga reaktivasi HHV-6 atau HHV-7','BUKAN jamur meski nama mirip panu'],
  risk_factors:['Dewasa muda','Stres atau infeksi virus sebelumnya'],
  treatments:{
    otc:['Antihistamin oral untuk gatal','Pelembab','Bedak calamine'],
    prescription:['Acyclovir oral (mempercepat resolusi)','Steroid topikal untuk gatal berat'],
    lifestyle:['Hindari mandi air panas (memperparah gatal)','Pakaian katun longgar','Paparan sinar matahari moderat membantu'],
    see_doctor:'Ke dokter untuk konfirmasi dan singkirkan sifilis sekunder (tampilan mirip).',
  },
  references:['DermNet NZ: dermnetnz.org/topics/pityriasis-rosea'],
},

'D033': {
  prevalence:'Common',
  clinical_features:['Benjolan keras kasar seperti kembang kol (permukaan tidak rata)','Warna kulit atau sedikit lebih gelap','Di tangan, jari, kaki, atau wajah','Dapat muncul multipel, bertangkai atau datar'],
  causes:['Human Papillomavirus (HPV)','Kontak kulit langsung dengan virus','Autoinokulasi saat digaruk'],
  risk_factors:['Anak-anak dan remaja','Luka di kulit','Sistem imun lemah','Renang di kolam umum'],
  treatments:{
    otc:['Asam salisilat 17% topikal (BeFreeze, Compound W) — oleskan harian','Plester asam salisilat'],
    prescription:['Krioterapi nitrogen cair (paling efektif)','Cantaridin','Imiquimod 5% krim','Laser CO2'],
    lifestyle:['Jangan dipotong sendiri','Tutup dengan plester saat di kolam renang','Jangan garuk atau gigit'],
    see_doctor:'Ke dokter untuk krioterapi jika OTC gagal setelah 12 minggu.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/viral-wart'],
},

'D034': {
  prevalence:'Common',
  clinical_features:['Pembengkakan merah nyeri di lipatan kuku (acute: bakteri)','Dapat keluar nanah dari ujung kuku','Kronis: kulit di pangkal kuku mengeras dan terangkat (Candida)','Sering di ibu jari tangan'],
  causes:['Akut: Staphylococcus aureus','Kronik: Candida albicans','Trauma kuku atau menggigit kuku'],
  risk_factors:['Pekerjaan basah (koki, pencuci piring)','Menggigit kuku','Diabetes mellitus','Manikur yang terlalu agresif'],
  treatments:{
    otc:['Rendam dalam air hangat 3–4× sehari (akut)','Mupirocin 2% topikal'],
    prescription:['Insisi dan drainase (akut dengan abses)','Antijamur azol topikal (kronik)'],
    lifestyle:['Jaga kuku pendek dan bersih','Hindari pekerjaan basah tanpa sarung tangan','Hindari menggigit kuku'],
    see_doctor:'Ke dokter jika ada abses untuk drainase, atau jika kronik dan tidak membaik.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/paronychia'],
},

'D035': {
  prevalence:'Very Common',
  clinical_features:['Maserasi, sisik, dan fisura di sela jari kaki (ruang 4–5 paling umum)','Plantar: penebalan difus dan sisik di telapak (moccasin type)','Vesikel/bulla gatal di punggung kaki (vesicular type)','Sering berhubungan dengan tinea unguium (kuku)'],
  causes:['Trichophyton rubrum','T. mentagrophytes','Lingkungan hangat dan lembap'],
  risk_factors:['Atlet','Alas kaki tertutup','Kaki berkeringat','Berjalan barefoot di fasilitas umum','Diabetes'],
  treatments:{
    otc:['Terbinafine 1% krim 1×/hari × 1 minggu','Klotrimazol 1% krim 2×/hari × 4 minggu','Bedak antijamur di sepatu'],
    prescription:['Terbinafine oral 250 mg/hari × 2 minggu','Itrakonazol oral','Obati kuku bersamaan jika terlibat'],
    lifestyle:['Keringkan sela jari setelah mandi','Kaus kaki moisture-wicking, ganti harian','Sandal di fasilitas umum','Semprot antijamur di sepatu'],
    see_doctor:'Ke dokter jika infeksi menyebar ke kuku, selulitis berkembang, atau berulang. Diabetes: segera ke dokter.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/tinea-pedis'],
},

'D036': {
  prevalence:'Uncommon',
  clinical_features:['Jalur merah berkelok-kelok yang maju beberapa mm per hari','Gatal PARAH di sepanjang jalur','Terutama di telapak kaki, bokong, paha (area kontak tanah)','Tidak ada gejala sistemik (berbeda dari infeksi cacing sistemik)'],
  causes:['Larva cacing tambang anjing/kucing (Ancylostoma)','Kontak dengan tanah/pasir terkontaminasi feses hewan'],
  risk_factors:['Berjalan barefoot di pantai atau tanah basah','Wisatawan ke daerah tropis','Pekerjaan kebun/pertanian','Bermain di pasir'],
  treatments:{
    otc:['Tiabendazol topikal (kurang efektif)'],
    prescription:['Albendazol oral 400 mg × 3–7 hari (first-line)','Ivermectin oral 200 mcg/kg dosis tunggal','Krioterapi untuk membunuh larva di jalur'],
    lifestyle:['Pakai alas kaki di pantai / tanah','Hindari duduk langsung di pasir tanpa alas'],
    see_doctor:'Ke dokter — butuh antihelmintik oral resep untuk penyembuhan.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/cutaneous-larva-migrans'],
},

'D037': {
  prevalence:'Uncommon',
  clinical_features:['Ruam berbentuk bulat/oval seperti koin (2–5 cm) berbatas tegas','Sangat gatal, basah, berkerak','Sering di tungkai, lengan, badan','Kambuhan, sering bersamaan dengan kulit kering'],
  causes:['Idiopatik','Dipicu: kulit sangat kering, gigitan serangga, infeksi, stres','Berkaitan dengan atopik'],
  risk_factors:['Kulit kering ekstrem','Usia lanjut','Alkohol','Iklim dingin'],
  treatments:{
    otc:['Krim hydrokortison 1%','Pelembab oklusif tebal (petroleum jelly)','Antihistamin oral untuk gatal'],
    prescription:['Steroid topikal kuat (mometasone, betamethasone)','Fototerapi NB-UVB','Tacrolimus/pimecrolimus'],
    lifestyle:['Pelembab agresif segera setelah mandi','Hindari mandi air panas','Pakaian katun longgar'],
    see_doctor:'Ke dokter jika tidak membaik, lesi bernanah, atau sangat luas.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/discoid-eczema'],
},

'D038': {
  prevalence:'Very Common',
  clinical_features:['Bentol merah gatal dengan titik gigitan di tengah','Khas berkelompok','Reaksi bisa delayed (6–12 jam setelah gigitan)','Tidak ada gejala sistemik pada kasus ringan'],
  causes:['Nyamuk','Kutu kasur (bed bugs)','Kutu hewan peliharaan','Semut api'],
  risk_factors:['Tidur tanpa kelambu','Hewan peliharaan berparasit','Rumah tidak bersih dari serangga'],
  treatments:{
    otc:['Krim hidrokortison 1% untuk mengurangi gatal','Antihistamin oral (cetirizine)','Kompres dingin','Calamine lotion'],
    prescription:['Steroid topikal kuat jika reaksi berat'],
    lifestyle:['Gunakan repelen nyamuk (DEET)','Pasang kelambu','Basmi sumber serangga','Obati hewan peliharaan dari kutu'],
    see_doctor:'Ke dokter jika reaksi anafilaksis, tanda infeksi (cellulitis), atau gigitan laba-laba beracun.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/arthropod-bites-and-stings'],
},

'D039': {
  prevalence:'Very Common',
  clinical_features:['Kuku menebal, rapuh, mudah hancur','Perubahan warna: kuning, cokelat, atau putih','Permukaan kuku tidak rata, bergelombang','Sering dimulai dari tepi bebas kuku','Sering bersamaan dengan tinea pedis'],
  causes:['Trichophyton rubrum (>90%)','T. mentagrophytes','Candida (kuku jari tangan)'],
  risk_factors:['Usia lanjut','Pria','Diabetes','Sirkulasi buruk','Kaki berkeringat','Alas kaki tertutup'],
  treatments:{
    otc:['Cat kuku antijamur efinakonazol / ciclopiroks (efektivitas terbatas)','Perawatan kuku rutin (kikir, potong pendek)'],
    prescription:['Terbinafine oral 250 mg/hari × 12 minggu (kuku kaki)','Itrakonazol pulse therapy','Laser antijamur'],
    lifestyle:['Pakai kaus kaki moisture-wicking','Ganti alas kaki bergantian','Jangan berbagi gunting kuku'],
    see_doctor:'Ke dokter untuk terapi oral yang efektif — terapi topikal saja umumnya tidak cukup.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/fungal-nail-infections'],
},

'D040': {
  prevalence:'Common',
  clinical_features:['Lubang-lubang kecil dangkal di telapak kaki (KHAS)','BAU SANGAT MENYENGAT seperti sulfur/telur busuk','Telapak kaki terasa lembap dan lunak','Tidak nyeri biasanya'],
  causes:['Bakteri: Kytococcus sedentarius, Corynebacterium','Proliferasi di stratum korneum akibat keringat berlebih','Sepatu tertutup dan keringat berlebih'],
  risk_factors:['Keringat kaki berlebih (hyperhidrosis)','Alas kaki tertutup sepanjang hari','Kaus kaki tidak diganti','Tentara, atlet'],
  treatments:{
    otc:['Sabun antiseptik (benzoyl peroxide)','Bedak chlorhexidine / miconazole','Deodorant antiperspirant pada telapak kaki'],
    prescription:['Klindamisin topikal / eritromisin topikal','Injeksi botulinum toxin (hyperhidrosis berat)'],
    lifestyle:['Ganti kaus kaki minimal 2× sehari','Keringkan kaki setiap saat','Pakai sandal terbuka bila memungkinkan','Rotasi alas kaki agar mengering sempurna'],
    see_doctor:'Ke dokter jika tidak membaik dalam 2 minggu terapi topikal.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/pitted-keratolysis'],
},

'D041': {
  prevalence:'Very Common',
  clinical_features:['Corn: penebalan kecil keras dengan inti, NYERI saat ditekan','Callus: penebalan luas, lebih datar, umumnya tidak nyeri','Corn keras: permukaan kulit; Corn lunak: di sela jari (lembap)','Disebabkan tekanan dan gesekan dari alas kaki'],
  causes:['Tekanan/gesekan berulang dari alas kaki yang tidak pas','Deformitas jari (hallux valgus, hammer toe)'],
  risk_factors:['Alas kaki ketat atau tidak pas','Aktivitas berdiri lama','Deformitas tulang','Usia lanjut'],
  treatments:{
    otc:['Plester asam salisilat 40% (potong sesuai ukuran)','Batu apung untuk mengikis lapisan mati','Bantalan pelindung (moleskin)'],
    prescription:['Podiatrist: debridemen mekanis','Operasi jika deformitas tulang penyebab utama'],
    lifestyle:['Pakai alas kaki pas dan nyaman','Gunting kuku kaki lurus','Kaus kaki katun tebal bantalan'],
    see_doctor:'Ke dokter jika nyeri berat, corn lunak berulang, atau ada diabetes (risiko ulkus diabetik).',
  },
  references:['DermNet NZ: dermnetnz.org/topics/corn-callus'],
},

'D042': {
  prevalence:'Common',
  clinical_features:['Ruam vesikel berair HANYA di SATU sisi tubuh (mengikuti dermatom)','Nyeri neuropatik mendahului ruam (prodromal 1–5 hari)','Nyeri seperti terbakar, ditusuk, atau tersengat listrik','Setelah sembuh: neuralgia post-herpetik (nyeri kronik)'],
  causes:['Reaktivasi Varicella-Zoster Virus (VZV) yang laten','Virus tersimpan di ganglion saraf sejak infeksi cacar air'],
  risk_factors:['Usia >50 tahun','Sistem imun lemah','Stres berat','Kemoterapi / kortikosteroid jangka lama'],
  treatments:{
    otc:['Kompres dingin untuk nyeri','Calamine lotion untuk gatal vesikel','Parasetamol untuk nyeri ringan'],
    prescription:['Asiklovir/valasiklovir/famsiklovir oral (mulai <72 jam onset)','Pregabalin/gabapentin untuk neuralgia','Vaksin Shingrix (pencegahan)'],
    lifestyle:['Jangan memecahkan vesikel','Tutup lesi jika kontak dengan yang belum pernah cacar air','Istirahat cukup'],
    see_doctor:'SEGERA ke dokter dalam 72 jam onset untuk terapi antiviral maksimal efektif.',
  },
  references:['DermNet NZ: dermnetnz.org/topics/herpes-zoster'],
},

}; // end DISEASE_DB
