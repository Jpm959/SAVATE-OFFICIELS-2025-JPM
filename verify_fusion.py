#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de vérification du fichier HTML fusionné
Vérifie que tous les éléments essentiels sont présents
"""

import os
import re

def check_fusion_file(filepath):
    """Vérifie l'intégrité du fichier HTML fusionné"""
    
    print("=" * 80)
    print("🔍 VÉRIFICATION DU FICHIER HTML FUSIONNÉ")
    print("=" * 80)
    print()
    
    if not os.path.exists(filepath):
        print(f"❌ ERREUR: Le fichier {filepath} n'existe pas")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Vérifications structurelles
    checks = {
        "Structure HTML": {
            "<!DOCTYPE html>": "Déclaration DOCTYPE",
            "<html lang=\"fr\">": "Balise HTML avec langue française",
            "<head>": "Section HEAD",
            "<body>": "Section BODY",
            "</html>": "Fermeture HTML"
        },
        "Dépendances externes": {
            "peerjs": "Bibliothèque PeerJS (WebRTC)",
        },
        "CSS (Apparence de merged 2)": {
            "linear-gradient(135deg, #E8F4F8": "Gradient de fond du body",
            "linear-gradient(135deg, #0055A4": "Couleur bleu (thème)",
            "linear-gradient(135deg, #EF4135": "Couleur rouge (thème)",
            ".app-container": "Conteneur principal",
            ".role-selector": "Sélecteur de rôle",
            ".config-section": "Section de configuration",
            ".tabs-container": "Conteneur d'onglets",
            ".sync-indicator": "Indicateur de synchronisation",
            "@keyframes pulse": "Animation pulse",
            "@keyframes fadeIn": "Animation fadeIn"
        },
        "HTML (Structure de JPM Test)": {
            "id=\"roleSelector\"": "Sélecteur de rôle",
            "id=\"judgeAccessSection\"": "Section d'accès juge",
            "id=\"delegateInterface\"": "Interface délégué",
            "id=\"judgeInterface\"": "Interface juge",
            "id=\"syncIndicator\"": "Indicateur de sync",
            "id=\"judgeScoringTable\"": "Table de scoring juge",
            "id=\"resetModal\"": "Modal de réinitialisation",
            "onclick=\"selectRole": "Boutons de sélection de rôle",
            "onclick=\"createSession": "Bouton création de session",
            "onclick=\"accessJudgeSheet": "Bouton connexion juge"
        },
        "JavaScript (Fonctionnalités de JPM Test)": {
            "app.version": "Variable de version de l'app",
            "function initializeWebRTC": "Initialisation WebRTC",
            "function connectToPeer": "Connexion aux peers",
            "function createSession": "Création de session",
            "function selectRole": "Sélection de rôle",
            "function createJudgeTableStructure": "Création table CPTE",
            "function validateAndUpdateJudgeScores": "Validation des scores",
            "function toggleJudgeWarning": "Gestion avertissements",
            "function toggleJudgeCompte": "Gestion comptes",
            "function calculateJudgeTotals": "Calcul des totaux",
            "function syncJudgeData": "Synchronisation juge",
            "function updateJudgeMonitoring": "Monitoring délégué",
            "function exportCompleteMatchSheet": "Export Excel",
            "function saveDelegateState": "Historique délégué",
            "function undoDelegateLastAction": "Annulation délégué",
            "function undoLastJudgeAction": "Annulation juge",
            "function performPartialReset": "Réinitialisation partielle",
            "function performCompleteReset": "Réinitialisation complète"
        },
        "Intégration WebRTC": {
            "new Peer": "Création d'instance Peer",
            "peer.on('open'": "Gestion ouverture peer",
            "peer.on('connection'": "Gestion connexion entrante",
            "peer.on('error'": "Gestion erreurs WebRTC",
            "conn.send": "Envoi de données",
            "conn.on('data'": "Réception de données",
            "type: 'judge_connection'": "Message connexion juge",
            "type: 'judge_data'": "Message données juge",
            "type: 'session_data'": "Message données session"
        },
        "Fonctionnalités CPTE": {
            "warnings": "Gestion des avertissements",
            "comptes": "Gestion des comptes",
            "abandons": "Gestion des abandons",
            "actionHistory": "Historique des actions",
            "delegateActionHistory": "Historique délégué",
            "isCombat()": "Détection type de combat",
            "getRoundsFromFightType": "Calcul nombre de reprises",
            "areAllJudgeRoundsCompleted": "Vérification reprises complètes",
            "checkJudgeDisqualification": "Vérification disqualification"
        }
    }
    
    all_passed = True
    total_checks = 0
    passed_checks = 0
    
    for category, items in checks.items():
        print(f"\n📦 {category}")
        print("-" * 80)
        
        category_passed = 0
        for pattern, description in items.items():
            total_checks += 1
            found = pattern in content
            
            if found:
                print(f"  ✅ {description}")
                passed_checks += 1
                category_passed += 1
            else:
                print(f"  ❌ {description} - MANQUANT: '{pattern[:50]}...'")
                all_passed = False
        
        print(f"  {category_passed}/{len(items)} vérifications réussies")
    
    # Statistiques finales
    print("\n" + "=" * 80)
    print("📊 RÉSULTAT FINAL")
    print("=" * 80)
    print(f"✅ Vérifications réussies: {passed_checks}/{total_checks}")
    print(f"📊 Taux de réussite: {(passed_checks/total_checks)*100:.1f}%")
    
    file_size_kb = len(content) / 1024
    line_count = content.count('\n')
    print(f"\n📁 Informations du fichier:")
    print(f"  - Taille: {file_size_kb:.2f} KB")
    print(f"  - Lignes: {line_count}")
    print(f"  - Caractères: {len(content)}")
    
    # Compter les principales sections
    css_matches = len(re.findall(r'\{[^}]*\}', content[:50000]))  # Approximation CSS
    js_functions = len(re.findall(r'function\s+\w+', content))
    print(f"\n🔢 Statistiques de code:")
    print(f"  - Règles CSS (approx.): {css_matches}")
    print(f"  - Fonctions JavaScript: {js_functions}")
    id_count = content.count('id="')
    class_count = content.count('class="')
    print(f"  - Éléments HTML avec ID: {id_count}")
    print(f"  - Éléments avec classe: {class_count}")
    
    if all_passed:
        print("\n🎉 SUCCÈS : Tous les éléments essentiels sont présents !")
    else:
        print(f"\n⚠️ ATTENTION : {total_checks - passed_checks} éléments manquants")
    
    print("\n" + "=" * 80)
    
    return all_passed

if __name__ == "__main__":
    filepath = "/app/output/savate-officials-fusion.html"
    success = check_fusion_file(filepath)
    exit(0 if success else 1)
