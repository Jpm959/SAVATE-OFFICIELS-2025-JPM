#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour générer le fichier HTML fusionné 
combinant l'apparence de merged2 et les fonctionnalités de jpm_test
"""

import os

# Lire les fichiers source
with open('/app/source_files/merged2.html', 'r', encoding='utf-8') as f:
    merged2_content = f.read()

with open('/app/source_files/jpm_test.html', 'r', encoding='utf-8') as f:
    jpm_test_content = f.read()

# Extraire le CSS de merged2 (entre <style> et </style>)
css_start = merged2_content.find('<style>')
css_end = merged2_content.find('</style>', css_start)
merged2_css = merged2_content[css_start + 7:css_end]

# Extraire le JavaScript de jpm_test (entre <script> et </script> après le body)
js_start = jpm_test_content.find('<script>', jpm_test_content.find('</body>') - 100000)
js_end = jpm_test_content.find('</script>', js_start)
jpm_test_js = jpm_test_content[js_start + 8:js_end]

# Extraire le HTML body de jpm_test (entre <body> et </body>)
body_start = jpm_test_content.find('<body>')
body_end = jpm_test_content.find('</body>')
jpm_test_body = jpm_test_content[body_start + 6:body_end]

# Créer le fichier HTML fusionné
html_fusion = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover">
    <meta name="theme-color" content="#0055A4">
    <title>SAVATE OFFICIALS - Application CPTE Complète (Fusion)</title>
    
    <!-- PeerJS CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.4.7/peerjs.min.js"></script>
    
    <style>
{merged2_css}
    </style>
</head>
<body>
{jpm_test_body}
    
    <script>
{jpm_test_js}
    </script>
</body>
</html>"""

# Sauvegarder le fichier
output_path = '/app/output/savate-officials-fusion.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html_fusion)

print(f"✅ Fichier HTML fusionné créé avec succès: {output_path}")
print(f"📊 Taille du fichier: {len(html_fusion) / 1024:.2f} KB")
print(f"📝 Lignes de code: {html_fusion.count(chr(10))}")
print(f"\n🎨 CSS de merged2: {len(merged2_css)} caractères")
print(f"⚙️ JavaScript de jpm_test: {len(jpm_test_js)} caractères")
print(f"🏗️ HTML body de jpm_test: {len(jpm_test_body)} caractères")
