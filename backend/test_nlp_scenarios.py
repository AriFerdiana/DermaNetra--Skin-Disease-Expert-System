"""Test NLP symptom matcher untuk 4 skenario"""
import sys
sys.path.insert(0, '.')
from nlp.symptom_matcher import match_symptoms

tests = [
    ('Kudis/Scabies', 'Kulit saya gatal sekali terutama di malam hari, sela-sela jari tangan ada garis terowongan, gatal parah banget'),
    ('Psoriasis', 'Muncul bercak merah tebal dengan sisik keperakan, plak di siku dan lutut, kalau digaruk keluar bintik perdarahan'),
    ('Panu', 'Ada bercak putih dan kecokelatan di dada bersisik halus, makin banyak saat berkeringat'),
    ('Tinea Pedis', 'Sela jari kaki mengelupas putih basah gatal, telapak kaki berbau, kuku menebal kuning'),
]

for name, text in tests:
    matched = match_symptoms(text)
    print(f'\n=== {name} ===')
    print(f'Matched: {len(matched)} gejala')
    for m in matched[:5]:
        sid = m['symptom_id']
        sname = m['symptom_name']
        score = m['score']
        mtype = m['match_type']
        print(f'  {sid}: {sname} (score={score}, type={mtype})')
