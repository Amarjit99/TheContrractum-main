import os

dirs_to_fix = [
    r'd:\THE-internship\Rahul1\NEW\TheContrractum-main-1\frontend\src',
    r'd:\THE-internship\Rahul1\NEW\TheContrractum-main-1\backend'
]

replacements = {
    'TheContrractum': 'The Contractum',
    'thecontrractum': 'the contractum',
    'Contrractum': 'Contractum'
}

for root_dir in dirs_to_fix:
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(('.jsx', '.js', '.css', '.html', '.md')):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    for old, new in replacements.items():
                        new_content = new_content.replace(old, new)
                    
                    if new_content != content:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated: {path}")
                except Exception as e:
                    print(f"Skipping {path}: {e}")
