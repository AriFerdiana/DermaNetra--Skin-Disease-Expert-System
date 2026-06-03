import sys
sys.path.insert(0, '.')
from nlp.symptom_matcher import match_symptoms
from engine import naive_bayes as nb

# Test case 1: Scabies
text1 = "kulit saya gatal parah malam hari ada terowongan di sela jari"
matched1 = match_symptoms(text1)
ids1 = [m["symptom_id"] for m in matched1[:8]]
results1 = nb.diagnose(ids1, {"age": 22, "sex": "male", "skinType": "normal", "duration": "gt1month"})
print("=== Test 1: Scabies ===")
print(f"Gejala terdeteksi ({len(ids1)}): {ids1}")
for r in results1:
    print(f"  {r['disease_id']} {r['disease_name_id']} - {r['percentage']}% [{r['confidence_level']}] conclusive={r['is_conclusive']}")

# Test case 2: Panu
text2 = "ada bercak putih di punggung makin besar saat berkeringat tidak terlalu gatal"
matched2 = match_symptoms(text2)
ids2 = [m["symptom_id"] for m in matched2[:8]]
results2 = nb.diagnose(ids2, {"age": 20, "sex": "male", "skinType": "oily", "duration": "gt1month"})
print("\n=== Test 2: Panu ===")
print(f"Gejala terdeteksi ({len(ids2)}): {ids2}")
for r in results2:
    print(f"  {r['disease_id']} {r['disease_name_id']} - {r['percentage']}%")
