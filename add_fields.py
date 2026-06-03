"""
Line-based insertion of prognosis + complications into diseases.js.
Inserts the new fields immediately before each 'references:' line.
"""

DATA = [
    (24,  "Kondisi kronik namun sangat bisa dikontrol. Sampo antijamur biasanya memperlihatkan perbaikan dalam 2-4 minggu. Kambuhan sangat umum terutama saat stres atau cuaca dingin.",
           ["Superinfeksi bakteri akibat garukan berlebih","Blefaritis (radang kelopak mata) jika mengenai area sekitar mata","Dampak psikologis: rasa malu dan penurunan kualitas hidup","Otitis eksterna jika mengenai liang telinga"]),
    (41,  "60% anak-anak mencapai remisi spontan saat dewasa. Pada dewasa, kondisi kronik kambuhan namun dapat dikontrol dengan rutinitas perawatan kulit yang konsisten.",
           ["Infeksi kulit sekunder (impetigo, selulitis)","Eczema herpeticum - darurat medis jika herpes menginfeksi eksim aktif","Gangguan tidur kronik akibat gatal malam hari","Depresi dan kecemasan sosial","Katarak dan keratokonus pada kasus berat jangka panjang"]),
    (58,  "Folikulitis ringan biasanya sembuh sendiri dalam 1-2 minggu dengan terapi topikal. Kasus berulang memerlukan evaluasi penyakit dasar seperti diabetes.",
           ["Furunkel (bisul besar) atau karbunkel","Selulitis jika infeksi menyebar ke jaringan lebih dalam","Jaringan parut (scar) permanen","Folikulitis keloid di area berambut"]),
    (75,  "Dengan terapi permetrin 5% yang benar dan semua kontak diobati bersamaan, sembuh dalam 1-2 minggu. Gatal dapat bertahan 2-4 minggu post-terapi akibat reaksi hipersensitivitas - ini normal.",
           ["Infeksi kulit sekunder (impetigo) akibat garukan intens","Norwegian/Crusted scabies pada pasien imunosupresi - sangat menular","Glomerulonefritis pasca-streptokokus jika ada infeksi bakteri sekunder","Penyebaran ke seluruh anggota keluarga jika tidak ditangani bersamaan"]),
    (92,  "Prognosis sangat baik. Lesi menghilang sendiri dalam 1-3 hari jika berada di lingkungan yang lebih sejuk dan berpakaian longgar.",
           ["Miliaria profunda (bentuk berat) yang mengganggu fungsi kelenjar keringat","Superinfeksi bakteri jika digaruk berlebihan","Heat stroke jika bersamaan dengan paparan cuaca panas ekstrem"]),
    (109, "Kondisi autoimun kronik seumur hidup tanpa penyembuhan permanen. Terapi modern (biologis) memungkinkan remisi jangka panjang pada 70-80% pasien. Kualitas hidup dapat dipertahankan sangat baik.",
           ["Artritis psoriatik pada 30% pasien (nyeri sendi permanen)","Sindrom metabolik: risiko diabetes, penyakit kardiovaskular, obesitas meningkat","Dampak psikologis berat: depresi, kecemasan, isolasi sosial","Eritroderma psoriatik (seluruh tubuh meradang) - darurat medis"]),
    (126, "Dengan antijamur oral yang tepat selama 6-8 minggu, prognosis sangat baik. Kerion yang tidak ditangani cepat dapat meninggalkan kebotakan permanen.",
           ["Kerion: abses inflamasi besar yang menyebabkan alopesia permanen jika terlambat ditangani","Penyebaran ke teman sekelas dan seluruh anggota keluarga","Bekas luka dan kebotakan permanen","Limfadenopati servikal (pembengkakan kelenjar leher)"]),
    (143, "Dengan pengobatan 2 siklus (hari 1 dan hari 7-10), hampir semua kasus sembuh total. Kambuhan sangat umum jika tidak ada pencegahan sistematis di komunitas sekolah.",
           ["Superinfeksi bakteri di kulit kepala akibat garukan (impetigo, furunkel)","Resistensi terhadap permetrin OTC pada beberapa strain","Penyebaran ke seluruh anggota keluarga dan teman sekelas","Dampak psikologis pada anak: stigma dan dikucilkan"]),
    (160, "Dengan antibiotik yang tepat, sembuh total dalam 7-10 hari. Kasus sangat menular - isolasi dari sekolah hingga 24 jam setelah terapi dimulai.",
           ["Ektima (impetigo yang meluas ke dermis, meninggalkan bekas luka)","Selulitis atau erisipelas","Glomerulonefritis pasca-streptokokus (urin gelap, bengkak wajah, hipertensi)","Demam reumatik akut pada kasus streptokokus yang tidak diobati"]),
    (177, "Sangat bervariasi. 50% kasus bercak tunggal tumbuh kembali spontan dalam 1 tahun. Alopecia totalis/universalis prognosis jauh lebih buruk dan sering bersifat permanen.",
           ["Alopecia totalis: seluruh rambut kepala rontok total","Alopecia universalis: seluruh rambut tubuh rontok","Perubahan kuku: pitting, trachyonychia (permanen)","Depresi berat dan gangguan identitas diri","Berkaitan dengan penyakit autoimun lain: tiroid Hashimoto, vitiligo"]),
    (194, "Sebagian besar membaik setelah masa remaja. Akne kistik yang tidak diobati dapat meninggalkan bekas luka cekungan (acne scars) yang permanen dan memerlukan prosedur estetika.",
           ["Bekas luka cekungan permanen (ice-pick, boxcar, rolling scars)","Hiperpigmentasi pasca-inflamasi (PIH) yang bisa sangat persisten","Kista sebaceous yang sering berulang","Depresi dan penurunan kepercayaan diri yang signifikan secara klinis"]),
    (211, "Kondisi kronik dan sangat mudah kambuh setelah paparan matahari. Dengan tabir surya konsisten dan terapi, dapat memudar signifikan tetapi jarang hilang 100% secara permanen.",
           ["Hiperpigmentasi sangat persisten meski sudah diobati","Kerusakan kulit dari produk pemutih ilegal (merkuri, steroid berlebih)","Kambuhan setiap kehamilan atau penggunaan kontrasepsi hormonal","Ochronosis eksogen (menghitam paradoks) akibat hidrokuinon berlebih"]),
    (228, "Kondisi kronik kambuhan. Dengan manajemen pemicu yang tepat dan terapi rutin, gejala dapat dikontrol sangat baik. Rhinophyma hanya berkembang pada kasus berat yang bertahun-tahun tidak ditangani.",
           ["Rhinophyma: penebalan dan deformitas hidung permanen","Rosacea okular: keratitis dan gangguan penglihatan permanen","Dampak psikologis signifikan (dianggap pemabuk oleh masyarakat)","Infeksi mata kronis (blefaritis, konjungtivitis rekuren)"]),
    (245, "Sangat responsif terhadap terapi antijamur. Perubahan warna kulit (hipo/hiperpigmentasi) mungkin bertahan berbulan-bulan setelah jamur tereradikasi - pasien harus diinformasikan ini normal.",
           ["Kambuhan sangat tinggi (70%+) di iklim tropis tanpa terapi maintenance bulanan","Dampak psikologis: minder karena warna kulit tidak merata","Pityrosporum folliculitis: overgrowth Malassezia mencapai folikel (kondisi berbeda)"]),
    (262, "Dengan identifikasi dan eliminasi penyebab spesifik, prognosis sangat baik. Dermatitis kontak iritan pada pekerjaan basah bisa sangat sulit sembuh jika pekerjaan tidak berubah.",
           ["Sensitisasi permanen (ACD) - sekali alergi, respons imun bertahan seumur hidup","Superinfeksi bakteri pada lesi yang basah/terbuka","Likenifikasi dan penebalan kulit kronik yang sulit dihilangkan","Perubahan karir paksa (tenaga medis, penata rambut, koki)"]),
    (279, "Milia primer pada bayi menghilang sendiri dalam 4-6 minggu. Milia dewasa tidak hilang sendiri tanpa ekstraksi, namun tidak berbahaya sama sekali - murni kosmetik.",
           ["Kondisi murni kosmetik - tidak ada komplikasi medis serius","Infeksi ringan jika dipencet sendiri tanpa alat steril","Bekas luka kecil jika ekstraksi dilakukan oleh yang tidak terlatih"]),
    (296, "Tidak ada penyembuhan permanen - virus tetap laten seumur hidup. Episode akut sembuh dalam 7-10 hari. Antiviral supresi efektif mengurangi frekuensi dan keparahan kambuhan.",
           ["Eczema herpeticum pada pasien atopik - darurat medis","Herpes neonatal jika ibu aktif infeksi saat melahirkan (mortalitas tinggi)","Keratitis herpetik: jaringan parut kornea dan gangguan penglihatan permanen","Herpes ensefalitis: sangat jarang namun potensi fatal","Penularan ke pasangan seksual meski tanpa lesi aktif (asymptomatic shedding)"]),
    (334, "Urtikaria akut: 70% sembuh dalam 1-2 minggu. Urtikaria kronik (>6 minggu): 50% remisi dalam 1 tahun, sisanya dapat berlangsung bertahun-tahun memerlukan manajemen jangka panjang.",
           ["Anafilaksis - darurat mengancam jiwa (epinefrin segera)","Angioedema laring: sumbatan jalan napas yang mengancam jiwa","Dampak psikologis dari gejala kronik yang tidak terduga","Gangguan kualitas tidur dan produktivitas kronik"]),
    (351, "Pada individu imunokompeten, sembuh sendiri dalam 12-18 bulan tanpa pengobatan. Terapi hanya mempercepat resolusi. Pada pasien imunosupresi, dapat menjadi sangat luas dan persisten.",
           ["Eczema molluscatum: reaksi eksim di sekitar lesi pada pasien atopik","Superinfeksi bakteri jika lesi dimanipulasi","Konjungtivitis jika lesi mengenai kelopak mata","Penyebaran masif (ratusan lesi) pada pasien HIV/imunosupresi"]),
    (368, "Dengan krim antijamur OTC yang digunakan konsisten selama 2-4 minggu, prognosis sangat baik. Sumber infeksi yang tidak dieliminasi (hewan peliharaan, kontak manusia) menyebabkan kambuhan.",
           ["Resistensi terhadap antijamur topikal (butuh oral)","Penyebaran ke kulit kepala: tinea capitis - lebih sulit ditangani","Superinfeksi bakteri akibat garukan","Kerion korporis: bentuk inflamasi berat dengan abses"]),
    (385, "Kasus akut: respons baik dalam 1-2 minggu. Infeksi berulang (>3x per tahun) WAJIB evaluasi diabetes mellitus, HIV, atau imunodefisiensi sebagai penyebab dasar yang tersembunyi.",
           ["Kandidemia (kandida masuk darah) pada imunosupresi berat - mengancam jiwa","Infeksi berulang sebagai tanda awal diabetes yang tidak terdiagnosis","Esofagitis kandida pada pasien HIV/kemoterapi (sulit menelan)","Resistensi azol akibat terapi tidak tuntas"]),
    (402, "Respons sangat baik terhadap antijamur topikal OTC dalam 2-4 minggu. Kambuhan sangat tinggi jika tinea pedis (sumber utama via autoinokulasi) tidak diobati bersamaan.",
           ["Likenifikasi dan hiperpigmentasi kronik jika dibiarkan berbulan-bulan","Superinfeksi bakteri sekunder","Kambuhan berulang dari sumber tinea pedis atau kuku yang tidak diobati","Penyebaran ke skrotum atau perianal (perlu diagnosis ulang)"]),
    (419, "Dengan antibiotik oral yang tepat, respons sangat baik dalam 2-4 minggu. Kambuhan umum pada individu dengan faktor risiko (diabetes, obesitas) yang tidak terkontrol.",
           ["Kambuhan berulang pada kondisi predisposisi yang tidak dikontrol","Misdiagnosis sebagai tinea cruris yang menyebabkan keterlambatan terapi","Superinfeksi bakteri sekunder pada lesi yang digaruk"]),
    (436, "Dengan antibiotik sistemik yang tepat, sembuh dalam 2-3 minggu. Namun hampir selalu meninggalkan bekas luka (scar) yang cukup signifikan karena ulkus mencapai lapisan dermis.",
           ["Bekas luka (scar) atrofik permanen di area lesi","Selulitis atau erisipelas sekunder","Limfangitis (infeksi saluran limfatik)","Sangat jarang: osteomielitis jika infeksi mencapai tulang di bawahnya"]),
    (453, "Kondisi kronik seumur hidup tanpa penyembuhan permanen. Dengan manajemen agresif (biologis, operasi), remisi jangka panjang bisa dicapai namun perlu dedikasi dan waktu yang panjang.",
           ["Jaringan parut dan fistula yang merusak kulit secara permanen dan ekstensif","Karsinoma sel skuamosa di area lesi kronik bertahun-tahun (jarang tapi serius)","Depresi berat dan kecacatan sosial yang signifikan","Limfedema di ekstremitas akibat obstruksi kelenjar limfe","Anemia kronik akibat inflamasi sistemik persisten"]),
    (470, "Dengan menjaga lipatan tetap kering dan mengelola faktor predisposisi (turunkan berat badan, kontrol diabetes), prognosis baik. Mudah kambuh jika faktor risiko tidak diatasi.",
           ["Superinfeksi kandida sekunder (lesi satelit muncul)","Superinfeksi bakteri (kemerahan, nyeri, bau tidak sedap)","Ulserasi kulit pada kasus berat yang diabaikan","Sepsis pada pasien imunosupresi jika infeksi sekunder menyebar"]),
    (487, "Dengan antibiotik yang tepat dan durasi minimal 3 minggu (hingga lesi sembuh total), prognosis baik. Keterlambatan diagnosis menyebabkan kerusakan jaringan permanen.",
           ["Destruksi jaringan genital yang luas dan permanen","Elefantiasis genital: pembengkakan masif kronik akibat obstruksi limfatik","Ko-infeksi PMS lain yang harus diskrining: HIV, sifilis, gonore","Penularan ke pasangan seksual yang tidak terdiagnosis"]),
    (504, "Episode akut biasanya sembuh dalam 2-4 minggu. Kondisi bersifat kronik kambuhan. Identifikasi dan eliminasi pemicu individual (logam, stres) adalah kunci kontrol jangka panjang.",
           ["Superinfeksi bakteri pada vesikel yang pecah dan terbuka","Likenifikasi dan fisura kronik yang sangat menyakitkan dan membatasi aktivitas tangan","Gangguan fungsi tangan yang signifikan (sulit memegang benda, mengetik)","Onikolisis jika eksim menyebar ke kuku"]),
    (521, "Memerlukan antijamur oral selama 2-4 minggu (topikal sering tidak cukup untuk telapak tangan). WAJIB mengobati tinea pedis bersamaan untuk mencegah reinfeksi dari kaki.",
           ["Reinfeksi berulang dari tinea pedis yang tidak diobati secara bersamaan","Tinea unguium (infeksi kuku) sebagai komplikasi lanjut","Likenifikasi dan fisura kronik yang nyeri","Misdiagnosis sebagai eksim tangan yang menyebabkan penundaan terapi antijamur"]),
    (538, "Dengan MDT (Multi-Drug Therapy) yang lengkap sesuai durasi, 95%+ kasus dapat disembuhkan. Namun kerusakan saraf yang sudah terjadi BERSIFAT PERMANEN dan tidak dapat dipulihkan.",
           ["Kerusakan saraf permanen: mati rasa, kelemahan otot, cacat fisik (disability)","Deformitas permanen: claw hand, drop foot, saddle nose, lagophthalmos","Kebutaan akibat lagophthalmos (mata tidak bisa menutup saat tidur)","Reaksi kusta tipe 1 & 2: darurat medis memerlukan steroid segera","Stigma sosial dan diskriminasi ekstrem yang merusak kehidupan penderita"]),
    (555, "Dengan antibiotik yang tepat, respons baik dalam 5-10 hari. Kasus berat dengan tanda sistemik memerlukan rawat inap dan antibiotik IV. Kekambuhan umum pada pasien limfedema kronis.",
           ["Abses lokal (memerlukan insisi dan drainase bedah)","Limfangitis dan bakteremia (sepsis) - mengancam jiwa","Fasciitis nekrotikans (flesh-eating bacteria) - darurat bedah absolut","Limfedema kronik pasca-selulitis berulang","Kematian pada lansia atau pasien dengan komorbiditas berat"]),
    (572, "Self-limited - sembuh total tanpa bekas dalam 6-12 minggu pada hampir semua kasus. Kambuhan sangat jarang. Prognosis sangat baik.",
           ["Hiperpigmentasi pasca-inflamasi sementara pada kulit tipe gelap (Fitzpatrick IV-VI)","Gatal berat yang mengganggu kualitas hidup selama masa aktif penyakit","Sangat jarang: pityriasis rosea selama kehamilan berkaitan dengan risiko kelahiran prematur"]),
    (589, "65% kutil menghilang sendiri dalam 2 tahun tanpa pengobatan. Terapi mempercepat resolusi. Pada pasien imunosupresi, sangat sulit dieliminasi dan cenderung kambuh.",
           ["Plantar wart yang sangat nyeri saat berjalan dan mengganggu aktivitas","HPV genital onkogenik (tipe 16, 18) berisiko kanker serviks, anus, orofaring","Penyebaran masif (mosaic warts) pada pasien imunosupresi","Kekambuhan tinggi pasca-krioterapi jika virus belum tereliminasi sempurna"]),
    (606, "Akut: dengan drainase dan antibiotik, sembuh dalam 1-2 minggu. Kronik (kandida): memerlukan antijamur azol topikal berbulan-bulan dan pengurangan paparan basah yang konsisten.",
           ["Felon: infeksi dalam di ruang pulp jari - darurat bedah","Osteomielitis falang distal (sangat jarang)","Onikolisis (kuku terlepas dari alasnya) jika kronik parah","Kehilangan kuku sementara akibat infeksi berat"]),
    (623, "Respons baik terhadap antijamur OTC dalam 1-4 minggu. Tipe moccasin (telapak kaku bersisik) paling sulit dan sering memerlukan oral. Kambuhan sangat umum jika lingkungan tidak diubah.",
           ["Selulitis tungkai bawah (tinea pedis sebagai port of entry utama)","Tinea unguium: infeksi kuku yang sulit dan mahal diobati","Infeksi bakteri sekunder pada fisura kulit","Pada pasien diabetes: ulkus kaki diabetik yang mengancam anggota tubuh"]),
    (640, "Dengan antihelmintik oral yang tepat, larva mati dalam 1-2 minggu dan jalur merah memudar bertahap. Tanpa pengobatan, larva juga mati sendiri dalam 2-8 minggu karena tidak bisa berkembang pada manusia.",
           ["Superinfeksi bakteri akibat garukan intensif di jalur yang gatal parah","Reaksi hipersensitivitas sistemik (eritema multiforme)","Sangat jarang: larva mencapai paru (Loffler syndrome) atau viseral pada kasus berat"]),
    (657, "Dengan terapi steroid kuat dan pelembab agresif, perbaikan dalam 4-8 minggu. Kondisi kronik kambuhan yang memerlukan manajemen jangka panjang dan pelembab rutin seumur hidup.",
           ["Superinfeksi bakteri (impetigo di atas eksim yang terbuka)","Likenifikasi dan perubahan warna kulit permanen di area kambuhan","Gangguan tidur kronik akibat gatal malam hari","Bekas luka hipertrofik jika sering terinfeksi dan digaruk"]),
    (674, "Reaksi gigitan ringan: sembuh sendiri dalam 1-7 hari dengan perawatan simptomatik. Reaksi berat (anafilaksis): darurat medis namun dapat ditangani sempurna jika epinefrin diberikan segera.",
           ["Anafilaksis - mengancam jiwa jika tidak segera diatasi dengan epinefrin","Selulitis akibat garukan dan infeksi sekunder","Penularan penyakit sistemik: malaria, DBD, filariasis (nyamuk); Lyme disease (caplak)","Nekrosis jaringan luas dari gigitan laba-laba tertentu (Loxosceles)"]),
    (691, "Terapi oral memerlukan 12-18 minggu dan kuku sepenuhnya bersih baru terlihat setelah 9-12 bulan (waktu tumbuh kuku baru). Kekambuhan dalam 5 tahun mencapai 20-25%.",
           ["Nyeri dan kesulitan berjalan pada infeksi kuku kaki yang parah","Pada pasien diabetes: distorsi kuku memicu ulkus kaki diabetik","Reservoir reinfeksi tinea pedis yang berulang","Paronikia bakteri sekunder akibat kuku distrofik"]),
    (708, "Dengan terapi topikal antiseptik dan mengurangi keringat kaki (antiperspirant, alas kaki terbuka), perbaikan signifikan dalam 2-4 minggu. Sangat mudah kambuh jika higienitas tidak diperbaiki.",
           ["Bau sangat menyengat yang mengganggu kehidupan sosial dan profesional","Hiperhidrosis plantar persisten yang sulit dikontrol","Selulitis sekunder jika kulit pecah menjadi port of entry bakteri","Ko-infeksi tinea pedis yang sering terjadi bersamaan"]),
    (725, "Dengan penghapusan tekanan (alas kaki yang pas) dan perawatan rutin (asam salisilat + batu apung), perbaikan dalam 2-4 minggu. Kambuhan pasti terjadi jika sumber tekanan tidak dihilangkan.",
           ["Pada pasien DIABETES: ulkus kaki diabetik yang mengancam anggota tubuh (risiko amputasi)","Infeksi sekunder di bawah kapalan yang lembap","Bursitis dan peradangan sendi di sekitar area kapalan","Perubahan gaya berjalan kompensasi yang memicu nyeri lutut dan pinggul"]),
    (742, "Ruam sembuh dalam 2-4 minggu. Komplikasi terbesar: Post-herpetic Neuralgia (PHN) - nyeri kronik berlangsung berbulan-bulan hingga bertahun-tahun pada 10-15% pasien, lebih sering pada usia lanjut.",
           ["Post-herpetic Neuralgia (PHN): nyeri kronik hebat berlangsung berbulan hingga bertahun-tahun","Herpes zoster ophthalmicus: kerusakan kornea dan kebutaan permanen","Sindrom Ramsay-Hunt: paralisis wajah (Bell's palsy) dan tuli permanen","Ensefalitis varisela-zoster: sangat jarang namun berpotensi fatal","Pneumonitis dan hepatitis pada pasien imunosupresi berat"]),
]

with open('frontend/assets/js/diseases.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

# Insert in reverse order so line numbers stay accurate
inserted = 0
for (ref_line, prog, comps) in reversed(DATA):
    idx = ref_line - 1  # 0-indexed
    comps_js = ', '.join(f"'{esc(c)}'" for c in comps)
    new_lines = [
        f"  prognosis:'{esc(prog)}',\n",
        f"  complications:[{comps_js}],\n",
    ]
    lines = lines[:idx] + new_lines + lines[idx:]
    inserted += 1

with open('frontend/assets/js/diseases.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"Done! Inserted prognosis + complications for {inserted} diseases.")
