"""Script untuk menambahkan field keywords ke setiap entri symptoms.json"""
import json

with open('backend/knowledge_base/symptoms.json', 'r', encoding='utf-8') as f:
    symptoms = json.load(f)

KEYWORDS_MAP = {
    'G001': ['gatal','kepala','wajah','hebat','parah'],
    'G002': ['gatal','malam','buruk','meningkat'],
    'G003': ['sisik','putih','ketombe','rontok','kepala','bersisik'],
    'G004': ['sisik','tebal','berlapis','perak','keperakan'],
    'G005': ['bercak','merah','wajah','dahi','leher','kemerahan'],
    'G006': ['bintik','benjolan','nanah','pustul'],
    'G007': ['keropeng','kerak','kuning','madu','krusta'],
    'G008': ['rambut','rontok','botak','pitak','kebotakan'],
    'G009': ['rambut','rapuh','patah'],
    'G010': ['kutu','rambut','telur kutu','nits'],
    'G011': ['bintik','merah','perih','keringat','biang'],
    'G012': ['wajah','kering','kasar'],
    'G013': ['benjolan','merah','nyeri','komedo','nanah','jerawat'],
    'G014': ['bercak','cokelat','gelap','hiperpigmentasi'],
    'G015': ['merah','kronis','telangiektasia','rosacea'],
    'G016': ['bercak','putih','sisik halus','panu'],
    'G017': ['gatal','keringat','memburuk','berkeringat','parah'],
    'G018': ['ruam','merah','gatal','kalung','parfum','kimia','alergi'],
    'G019': ['bintik','putih','keras','mutiara','milia'],
    'G020': ['lepuh','air','berkelompok','perih','panas','vesikel'],
    'G021': ['bentol','merah','menonjol','tebal','tiba','urtikaria'],
    'G022': ['bentol','gatal','berpindah','biduran'],
    'G023': ['keropeng','kuning','madu','kerak','kering'],
    'G024': ['bintik','keras','kubah','lekukan','umbilikasi','moluskum'],
    'G025': ['bercak','putih','cokelat','dada','bersisik','panu'],
    'G026': ['jerawat','bisul','dada','punggung','berjerawat'],
    'G027': ['ruam','gatal','kering','menebal','puting','ketiak'],
    'G028': ['bercak','merah','tebal','sisik','perak','dada'],
    'G029': ['bercak','merah','cincin','tepi','menonjol','kurap'],
    'G030': ['ruam','merah','basah','lecet','lipatan','bintik','satelit'],
    'G031': ['bintik','gatal','pusar','malam','kudis'],
    'G032': ['ruam','gatal','kemerahan','kancing','celana','sabuk'],
    'G033': ['plak','merah','tebal','sisik','keperakan','pusar','psoriasis'],
    'G034': ['bintik','kemerahan','perut','keringat','biang keringat'],
    'G035': ['bercak','merah','gatal','bulan sabit','paha','selangkangan'],
    'G036': ['ruam','lecet','kemerahan','bintik','satelit','lipatan'],
    'G037': ['bercak','merah','cokelat','lipatan','paha'],
    'G038': ['bisul','bernanah','nyeri','kambuh','abses'],
    'G039': ['kemerahan','lecet','gesekan','paha'],
    'G040': ['luka','borok','ulkus','keropeng','keras'],
    'G041': ['bintik','gatal','malam','bokong','kemaluan','kudis'],
    'G042': ['benjolan','keras','mutiara','lekukan','putih','moluskum'],
    'G043': ['luka','terbuka','borok','berdarah','membesar'],
    'G044': ['sisik','kuning','berminyak','kelamin'],
    'G045': ['bintik','berair','gatal','telapak','sela jari tangan','vesikel'],
    'G046': ['bercak','putih','mati rasa','tidak terasa','baal','lepra'],
    'G047': ['lengan','bengkak','merah','panas','nyeri','berdenyut'],
    'G048': ['ruam','merah','oval','bersisik','cemara','pityriasis'],
    'G049': ['benjolan','keras','kasar','kutil'],
    'G050': ['bengkak','merah','nyeri','nanah','kuku'],
    'G051': ['garis','terowongan','jari','gatal','malam','kudis','skabies'],
    'G052': ['telapak','kering','menebal','bersisik','pecah'],
    'G053': ['tangan','gatal','bruntusan','sabun','kimia','deterjen'],
    'G054': ['sela jari','kaki','mengelupas','pecah','putih','basah','gatal'],
    'G055': ['garis','merah','berkelok','cacing','bawah kulit','larva'],
    'G056': ['kuku','kaki','menebal','rapuh','hancur','kuning','cokelat'],
    'G057': ['telapak','kaki','berbau','bau','lubang'],
    'G058': ['penebalan','keras','menonjol','telapak','nyeri','berjalan','kapalan'],
    'G059': ['bentol','merah','berkelompok','gatal','gigitan','serangga'],
    'G060': ['ruam','merah','bulat','koin','gatal','berair','berkerak'],
    'G061': ['tungkai','bengkak','merah','panas','nyeri','demam','selulitis'],
    'G062': ['ruam','merah','gatal','lecet','sandal','sepatu','alergi'],
    'G063': ['lepuh','berair','menjalar','melingkar','satu sisi','nyeri saraf','herpes zoster','cacar ular'],
    'G064': ['jerawat','meradang','komedo','nanah','punggung'],
    'G065': ['bercak','panu','lebar','punggung','gatal','berkeringat'],
    'G066': ['gatal','ruam','kemerahan','karet','celana','sabuk','pinggang'],
    'G067': ['demam','menggigil','lemas','sistemik'],
    'G068': ['bengkak','kelenjar','getah bening','lipatan','paha','ketiak','leher'],
    'G069': ['kulit','menebal','kasar','garis kulit','likenifikasi'],
    'G070': ['panas','terbakar','hebat','sebelum ruam'],
    'G071': ['nanah','kental','kuning','hijau','berbau','busuk'],
    'G072': ['alergi','asma','bersin','rinitis','debu'],
    'G073': ['ruam','hewan','kucing','anjing','peliharaan'],
    'G074': ['ruam','memburuk','matahari','sinar'],
    'G075': ['bintik','perdarahan','sisik','dikelupas','Auspitz'],
    'G076': ['luka','kambuh','berulang','lokasi','bulan'],
    'G077': ['ruam','melepuh','menyebar','cepat','seluruh tubuh'],
    'G078': ['bengkak','wajah','bibir','kelopak mata','sesak napas','angioedema'],
    'G079': ['nyeri','panas','bengkak','keras','demam','mendadak'],
    'G080': ['luka','nanah','parah','meluas','garis merah','jantung'],
    'G081': ['keringat','malam','berlebih'],
    'G082': ['nyeri','sendi','berpindah','pegal'],
    'G083': ['berat badan','turun','drastis'],
    'G084': ['lemas','lelah','berkepanjangan','malaise'],
    'G085': ['gatal','ringan','stres','pikiran'],
    'G086': ['gatal','parah','mengganggu','tidur','malam'],
    'G087': ['ditusuk','jarum','keringat'],
    'G088': ['tebal','baal','mati rasa','tidak peka','sentuhan'],
    'G089': ['ruam','memburuk','telur','seafood','kacang','makanan'],
    'G090': ['ruam','perhiasan','jam tangan','sabuk','logam','nikel'],
    'G091': ['gatal','dingin','mandi','air dingin'],
    'G092': ['memburuk','pakaian','ketat','sintetis','wol'],
    'G093': ['warna','gelap','hitam','lipatan','menghitam'],
    'G094': ['sisik','rontok','beterbangan','digaruk','ketombe kering'],
    'G095': ['luka','basah','sulit kering'],
    'G096': ['bintik','merah','kecil','merata','sekujur'],
}

updated = 0
for s in symptoms:
    sid = s['id']
    if sid in KEYWORDS_MAP:
        s['keywords'] = KEYWORDS_MAP[sid]
        updated += 1
    elif 'keywords' not in s:
        s['keywords'] = []

print(f'Updated {updated} symptoms with keywords')

with open('backend/knowledge_base/symptoms.json', 'w', encoding='utf-8') as f:
    json.dump(symptoms, f, indent=2, ensure_ascii=False)

print('symptoms.json saved successfully')
