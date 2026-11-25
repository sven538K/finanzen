#!/usr/bin/env python3
"""Baut index.html und neu.html aus src/app.html. Aufruf: python3 build.py"""
import re, pathlib
root = pathlib.Path(__file__).parent
s = (root / 'src' / 'app.html').read_text(encoding='utf-8')
pages = [('index.html', 'Finanzen', 'manifest.json', 'apple-touch-icon.png', False),
         ('neu.html', 'Ausgabe +', 'manifest-neu.json', 'apple-touch-icon-neu.png', True)]
for name, title, man, icon, quick in pages:
    out = (s.replace('%%TITLE%%', title).replace('%%MANIFEST%%', man)
             .replace('%%ICON%%', icon).replace('%%QUICK%%', 'true' if quick else 'false'))
    (root / name).write_text(out, encoding='utf-8')
# Service-Worker-Cache-Version hochzählen, damit Handys das Update laden
sw = root / 'sw.js'
t = sw.read_text(encoding='utf-8')
t = re.sub(r"finanzen-v(\d+)", lambda m: f"finanzen-v{int(m.group(1)) + 1}", t, count=1)
sw.write_text(t, encoding='utf-8')
print('Gebaut: index.html, neu.html; sw.js Cache-Version erhöht')
