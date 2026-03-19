"""Remove lines 668-709 (0-indexed: 667-708) from app.js — old duplicate buildResultsUI"""
filepath = r'c:\KULIAH\Daftar Tugas Semester 4\SISPAK\Projek_UTS\frontend\assets\js\app.js'

with open(filepath, encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines before: {len(lines)}")

# Line 668 (1-indexed) = index 667 (0-indexed): starts with '  </div>\r\n'  (the spurious </div>)
# Line 709 (1-indexed) = index 708 (0-indexed): the closing } of the old function  
# We want to keep lines 1-667 and 710 onward
# But first, print what we're removing to verify
print("Line 668:", repr(lines[667][:60]))
print("Line 709:", repr(lines[708][:60]))

# Check if line 668 is the spurious </div> and line 709 is the old }
# The buildResultsUI header should be at 710
if len(lines) > 709:
    print("Line 710:", repr(lines[709][:60]))

new_lines = lines[:667] + lines[708:]
print(f"Total lines after: {len(new_lines)}")

# Verify the join looks clean
print("Line 667 (kept):", repr(new_lines[666][:60]))
print("Line 668 (new):", repr(new_lines[667][:60]))

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print("Written.")
