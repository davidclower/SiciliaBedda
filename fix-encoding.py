#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix encoding issues in translations(1).js file
Replaces common UTF-8 encoding errors with correct characters
"""
import codecs
import sys
import re

filename = 'translations(1).js'

# Common encoding fixes - these are UTF-8 bytes misinterpreted as Windows-1252
# The bytes E2 80 94 represent em dash (—) in UTF-8
# When read as Windows-1252, they become â€"
replacements = {
    'â€"': '—',  # em dash (E2 80 94 in UTF-8, read as Windows-1252)
    'â€"': '—',  # em dash (alternative)
    'â€™': "'",  # apostrophe (E2 80 99)
    'â€œ': '"',  # opening double quote (E2 80 9C)
    'â€': '"',   # closing double quote (E2 80 9D)
    'â€"': '—',  # em dash (variant)
    'â€"': '—',  # em dash (another variant)
    'â€"': '—',  # em dash (yet another variant)
}

# Also fix common accented character issues
# These occur when UTF-8 is misinterpreted as Latin-1 or Windows-1252
accent_fixes = {
    'Ã ': 'à',   # à
    'Ã©': 'é',   # é
    'Ã¨': 'è',   # è
    'Ã¬': 'ì',   # ì
    'Ã²': 'ò',   # ò
    'Ã¹': 'ù',   # ù
    'Ã': 'à',    # à (without space)
    'Ã': 'à',    # à (variant)
    'Ã': 'à',    # à (another variant)
}

try:
    # Read file as UTF-8
    with codecs.open(filename, 'r', 'utf-8') as f:
        content = f.read()
    
    # Apply replacements
    for old, new in replacements.items():
        count = content.count(old)
        if count > 0:
            content = content.replace(old, new)
            print(f'  Replaced {count} instances of "{old}" with "{new}"')
    
    # Apply accent fixes
    for old, new in accent_fixes.items():
        content = content.replace(old, new)
    
    # Write back as UTF-8
    with codecs.open(filename, 'w', 'utf-8') as f:
        f.write(content)
    
    print(f'Fixed encoding issues in {filename}')
    print(f'Applied {len(replacements)} replacement patterns')
    
except FileNotFoundError:
    print(f'Error: {filename} not found')
    sys.exit(1)
except Exception as e:
    print(f'Error: {e}')
    sys.exit(1)
