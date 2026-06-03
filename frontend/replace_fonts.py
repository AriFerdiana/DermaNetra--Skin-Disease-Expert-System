import os
import glob
import re

frontend_dir = r'c:\KULIAH\Daftar Tugas Semester 4\SISPAK\Projek_UTS\frontend'
poppins_link = '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />'

# Replace in all html files
html_files = glob.glob(os.path.join(frontend_dir, '*.html'))
for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace Inter only
    content = re.sub(r'<link href=\"https://fonts\.googleapis\.com/css2\?family=Inter.*?\"[^>]*>', poppins_link, content)
    # Replace index.html specific font link
    content = re.sub(r'<link href=\"https://fonts\.googleapis\.com/css2\?family=Plus\+Jakarta\+Sans.*?\"[^>]*>', poppins_link, content)
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
