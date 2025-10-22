# 🚀 Guide Rapide - SAVATE OFFICIALS Fusion

## 📂 Fichier créé

✅ **`savate-officials-fusion.html`** (268.66 KB)

## ✨ Ce qui a été fusionné

### 🎨 De "savate-officials-merged 2"
- ✅ Design visuel moderne avec gradients bleu/rouge/blanc
- ✅ Interface responsive et élégante
- ✅ Animations et transitions fluides
- ✅ Palette de couleurs officielle Savate
- ✅ Effets glassmorphism et ombres modernes

### ⚙️ De "SAVATE OFFICIALS JPM Test"
- ✅ Système WebRTC P2P complet (PeerJS)
- ✅ Interface CPTE conforme au règlement officiel
- ✅ Validation automatique des scores et règles
- ✅ Gestion avertissements (AVT) et comptes (CPTE)
- ✅ Détection automatique des disqualifications
- ✅ Système de bonus obligatoire en cas d'égalité
- ✅ Historique et fonction Annuler (délégué et juge)
- ✅ Monitoring temps réel du délégué
- ✅ Calcul automatique des résultats par majorité
- ✅ Export multiple (Excel, Markdown, JSON, PDF)
- ✅ Réinitialisation avancée (partielle/complète)

## 🎯 Démarrage rapide

### 1️⃣ Ouvrir l'application
Double-cliquer sur `savate-officials-fusion.html` ou ouvrir dans un navigateur web moderne.

### 2️⃣ Pour le DÉLÉGUÉ

```
1. Cliquer "Délégué Officiel"
2. Choisir le type de combat (Assaut, Combat 1ère/2ème série)
3. Choisir le nombre de juges (3 ou 5)
4. Cliquer "Créer Session WebRTC"
5. Noter le CODE À 4 CHIFFRES affiché
6. Communiquer ce code aux juges
7. Remplir les noms des tireurs (Rouge et Bleu)
8. Suivre en temps réel dans les onglets :
   - 📊 Monitoring : Toutes les fiches CPTE des juges
   - 📋 Récapitulatif : Tableau des scores
   - 🏆 Résultat : Vainqueur automatique
   - 📤 Export : Téléchargements
```

### 3️⃣ Pour le JUGE

```
1. Cliquer "Juge"
2. Entrer :
   - Votre nom complet
   - Votre numéro de juge
   - Le code à 4 chiffres (reçu du délégué)
3. Cliquer "Se connecter WebRTC"
4. Attendre les noms des tireurs
5. Remplir la fiche CPTE :
   
   SCORES (par reprise) :
   - Cliquer sur le menu déroulant
   - Choisir 3, 2 ou 1 pour chaque coin
   - Seuls 3-2, 3-1, 2-2 sont valides
   
   AVERTISSEMENTS (AVT) :
   - Cliquer sur la cellule AVT
   - Cycle : vide → A → AA → AAA → vide
   - Max 3 par tireur sur tout le combat
   - 3 AVT = Disqualification automatique
   
   COMPTES (CPTE - Combat uniquement) :
   - Cliquer sur la cellule CPTE
   - Cycle : vide → C → CC → CCC → vide
   - Max 3 par tireur sur tout le combat
   - 3 CPTE = Hors Combat automatique
   
   BONUS (en cas d'égalité) :
   - Entrer 1 dans la case Bonus
   - Un seul tireur peut avoir le bonus
   - Obligatoire si égalité parfaite
   
   ABANDON :
   - Cliquer sur le bouton ABANDON
   - Confirmer l'action
   - Verrouille toute la fiche

6. Synchronisation automatique à chaque modification
7. Utiliser "ANNULER" si erreur
8. Exporter en Excel ou Markdown si besoin
```

## 📊 Tableau récapitulatif des fonctionnalités

| Fonctionnalité | Délégué | Juge |
|----------------|---------|------|
| Configuration session | ✅ | ❌ |
| Saisie scores | ❌ | ✅ |
| Avertissements (AVT) | ❌ | ✅ |
| Comptes (CPTE) | ❌ | ✅ |
| Bonus | ❌ | ✅ |
| Abandon | ❌ | ✅ |
| Monitoring temps réel | ✅ | ❌ |
| Calcul résultat final | ✅ | ❌ |
| Export complet | ✅ | ✅ |
| Fonction Annuler | ✅ | ✅ |
| Réinitialisation | ✅ | ❌ |

## 🔑 Codes d'erreur courants

| Erreur | Cause | Solution |
|--------|-------|----------|
| "Session introuvable" | Mauvais code ou délégué pas connecté | Vérifier le code à 4 chiffres |
| "Connexion impossible" | Problème réseau | Vérifier Internet et firewall |
| "Score 3-3 interdit" | Règle CPTE | Modifier un des deux scores |
| "Égalité - Attribuer bonus" | Scores égaux | Entrer 1 dans Bonus d'un coin |
| "Maximum 3 AVT atteints" | Limite d'avertissements | Disqualification automatique |

## 📱 Compatibilité

| Navigateur | Version min | Statut |
|------------|-------------|--------|
| Chrome | 90+ | ✅ Recommandé |
| Firefox | 88+ | ✅ Supporté |
| Safari | 14+ | ✅ Supporté |
| Edge | 90+ | ✅ Supporté |
| Opera | 76+ | ✅ Supporté |

## ⚡ Raccourcis et astuces

### Pour le Délégué
- **Ctrl+Z** : Annuler la dernière action (via bouton)
- **Onglets** : Navigation rapide entre Monitoring/Récap/Résultat/Export
- **Réinit. Partielle** : Nouveau combat, mêmes juges (conserve connexions)
- **Réinit. Complète** : Tout recommencer (ferme tout)

### Pour le Juge
- **Clic répété AVT/CPTE** : Cycle automatique 0→1→2→3→0
- **Verrouillage auto** : Reprises complètes = verrouillées
- **Égalité** : Indicateur jaune = Bonus obligatoire
- **Annuler** : Revient à l'état précédent (multi-niveaux)

## ⚠️ Points d'attention

### Réseau
- ⚠️ Internet requis pour WebRTC (signalisation PeerJS)
- ⚠️ Firewall peut bloquer WebRTC (ports)
- ⚠️ VPN peut ralentir ou bloquer la connexion

### Données
- ⚠️ Aucune sauvegarde serveur (tout en P2P)
- ⚠️ Fermer le navigateur = Perte des données
- ✅ **TOUJOURS EXPORTER** avant de quitter

### Utilisation
- ⚠️ Code 4 chiffres = Sécurité basique
- ⚠️ Production : Utiliser serveur PeerJS dédié
- ⚠️ Maximum 5 juges recommandé (performances)

## 🆘 Dépannage express

### Juge ne peut pas se connecter
```
1. Vérifier que le délégué a créé la session
2. Vérifier le code à 4 chiffres (chiffres uniquement)
3. Recharger la page (F5)
4. Vérifier Internet
5. Désactiver VPN temporairement
```

### Scores ne se synchronisent pas
```
1. Cliquer "SYNCHRONISER" (juge)
2. Vérifier l'indicateur de sync (vert = OK)
3. Recharger la page du délégué
4. Vérifier la connexion Internet
```

### Interface ne s'affiche pas correctement
```
1. Vider le cache (Ctrl+Maj+Suppr)
2. Essayer en navigation privée
3. Mettre à jour le navigateur
4. Essayer un autre navigateur
```

## 📋 Checklist avant un combat

### Délégué
- [ ] Connexion Internet stable vérifiée
- [ ] Navigateur à jour
- [ ] Type de combat sélectionné
- [ ] Nombre de juges configuré
- [ ] Session créée
- [ ] Code communiqué aux juges
- [ ] Tous les juges connectés (vérif. Monitoring)
- [ ] Noms des tireurs remplis

### Juge
- [ ] Connexion Internet stable vérifiée
- [ ] Navigateur à jour
- [ ] Code reçu du délégué
- [ ] Nom et numéro saisis
- [ ] Connexion établie (indicateur vert)
- [ ] Noms des tireurs reçus et affichés
- [ ] Interface CPTE visible et fonctionnelle

## 💾 Exports disponibles

### Délégué
1. **📊 Excel** : Feuille complète avec tous les juges
2. **📋 Markdown** : Rapport officiel formaté
3. **📝 JSON** : Données brutes complètes
4. **🖨️ PDF** : Via impression (Ctrl+P)

### Juge
1. **📊 Excel** : Fiche CPTE personnelle
2. **📝 Markdown** : Fiche formatée

## 🎓 Formation express (5 minutes)

### Pour un nouveau délégué
1. Ouvrir l'appli → Délégué
2. Créer session (Assaut, 3 juges)
3. Noter le code
4. Entrer des noms fictifs
5. Explorer les 4 onglets
6. Tester Annuler et Réinitialisation

### Pour un nouveau juge
1. Ouvrir l'appli → Juge
2. Se connecter avec le code du délégué
3. Remplir une reprise complète (scores)
4. Tester AVT (clic répété)
5. Tester CPTE (clic répété)
6. Vérifier calcul automatique des totaux
7. Tester Annuler

## 📞 Support

- **Documentation complète** : Voir `README.md`
- **Vérification technique** : Lancer `verify_fusion.py`
- **Contact FFSavate** : Pour assistance officielle

---

**Version** : Fusion v1.0  
**Fichier** : savate-officials-fusion.html  
**Taille** : 268.66 KB  
**Dernière mise à jour** : 2025
