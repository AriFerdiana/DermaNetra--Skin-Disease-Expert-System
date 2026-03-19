import json, os

base = r'c:\KULIAH\Daftar Tugas Semester 4\SISPAK\Projek_UTS\backend\knowledge_base'

with open(os.path.join(base, 'diseases.json')) as f:
    diseases = json.load(f)
print(f'diseases.json  : {len(diseases)} entries, VALID JSON')

with open(os.path.join(base, 'symptoms.json')) as f:
    symptoms = json.load(f)
print(f'symptoms.json  : {len(symptoms)} entries, VALID JSON')

with open(os.path.join(base, 'likelihood.json')) as f:
    likelihood = json.load(f)
print(f'likelihood.json: {len(likelihood)} entries, VALID JSON')

d_ids = {d['id'] for d in diseases}
s_ids = {s['id'] for s in symptoms}
lk_d_ids = {l['disease_id'] for l in likelihood}
lk_s_ids = {l['symptom_id'] for l in likelihood}

missing_d = lk_d_ids - d_ids
missing_s = lk_s_ids - s_ids
print()
print('Cross-reference checks:')
print(f'  Disease IDs in likelihood NOT in diseases.json : {missing_d if missing_d else "NONE (OK)"}')
print(f'  Symptom IDs in likelihood NOT in symptoms.json : {missing_s if missing_s else "NONE (OK)"}')
print()
print(f'Diseases covered in likelihood : {len(lk_d_ids)} / {len(diseases)}')
print(f'Symptoms covered in likelihood : {len(lk_s_ids)} / {len(symptoms)}')
print(f'Entries with prob >= 0.5       : {sum(1 for l in likelihood if l["probability"] >= 0.5)}')
print(f'Min probability                : {min(l["probability"] for l in likelihood)}')
