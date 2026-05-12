
import json
import re

file_path = r'd:\THE-internship\Rahul1\NEW\TheContrractum-main-1\frontend\src\constants\certificateConstants.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all arrays
arrays = re.findall(r'\[(.*?)\]', content, re.DOTALL)

for i, arr in enumerate(arrays):
    # Clean up strings
    items = [s.strip().strip("'").strip('"') for s in arr.split(',')]
    items = [s for s in items if s] # remove empty
    
    seen = set()
    duplicates = [x for x in items if x in seen or seen.add(x)]
    if duplicates:
        print(f"Array {i} has duplicates: {duplicates}")

# Check for duplicate keys in DESIGNATIONS_MAPPING
# Using a simpler regex for keys
mapping_match = re.search(r'export const DESIGNATIONS_MAPPING = \{(.*?)\};', content, re.DOTALL)
if mapping_match:
    mapping_content = mapping_match.group(1)
    keys = re.findall(r'(\w+): \{', mapping_content)
    seen_keys = set()
    dup_keys = [x for x in keys if x in seen_keys or seen_keys.add(x)]
    print(f"Duplicate keys in mapping: {dup_keys}")
