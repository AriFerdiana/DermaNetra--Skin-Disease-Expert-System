import sys
path = r'c:\KULIAH\Daftar Tugas Semester 4\SISPAK\Projek_UTS\frontend\assets\js\app.js'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_treatment = -1
start_alts = -1
end_alts = -1
start_prognosis = -1
end_grid = -1

for i, line in enumerate(lines):
    if '<!-- Treatment Dashboard -->' in line: start_treatment = i
    if '<!-- Prognosis -->' in line: start_prognosis = i
    if '<!-- Alternative Diagnoses -->' in line and '${alts.length ? `' in lines[i-1]: start_alts = i-1
    if '<!-- AI Analytics & Clinical Evidence -->' in line: end_alts = i-1
    if '</div> <!-- flex flex-col gap-8 -->' in line: end_grid = i

treatment_block = lines[start_treatment:start_prognosis]
alts_block = lines[start_alts:end_alts]
prognosis_to_gallery = lines[start_prognosis:start_alts] + lines[end_alts:end_grid]

new_lines = lines[:start_treatment]
new_lines += treatment_block
new_lines += alts_block
new_lines += ['               </div> <!-- END LEFT COLUMN -->\n\n', '               <!-- RIGHT COLUMN -->\n', '               <div class="space-y-6 flex flex-col h-full">\n']
new_lines += prognosis_to_gallery
new_lines += ['               </div> <!-- END RIGHT COLUMN -->\n']
new_lines += lines[end_grid:]

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print('Layout rewritten successfully!')
