# 🥊 SAVATE OFFICIALS - Application CPTE Complète (Fusion)

## 📋 Description

Cette application fusionne **l'apparence visuelle moderne de "savate-officials-merged 2"** avec **toutes les fonctionnalités complètes de "SAVATE OFFICIALS JPM Test"**.

## ✨ Caractéristiques

### 🎨 Design Visuel (de merged 2)
- **Palette de couleurs** : Bleu (#0055A4), Rouge (#EF4135) et Blanc
- **Gradients modernes** : Effets visuels sophistiqués
- **Interface responsive** : Adaptation automatique aux écrans mobiles et desktop
- **Animations fluides** : Transitions et effets d'hover agréables
- **Glassmorphism** : Effets de verre dépoli et ombres élégantes

### ⚙️ Fonctionnalités Complètes (de JPM Test)

#### 🔗 Système WebRTC Robuste
- Connexion P2P temps réel via PeerJS
- Gestion avancée des erreurs et reconnexions
- Indicateur de synchronisation en temps réel
- Support de plusieurs juges simultanés

#### 👑 Interface Délégué
- **Configuration de session** : Type de combat (Assaut, Combat 1ère/2ème série)
- **Monitoring en temps réel** : Fiches CPTE complètes de tous les juges
- **Tableau récapitulatif** : Scores par reprise de tous les juges
- **Résultat final automatique** : Calcul par majorité des votes
- **Fonction Annuler** : Historique des actions avec possibilité d'annulation
- **Réinitialisation avancée** :
  - Partielle : Conserve les connexions, réinitialise les scores
  - Complète : Nouvelle session, reconnexion requise
- **Export multiple** : Excel, Markdown, JSON, PDF/Impression

#### ⚖️ Interface Juge CPTE Complète
- **Conforme au règlement officiel** de la Savate
- **Validation automatique** des combinaisons de scores (3-2, 3-1, 2-2)
- **Gestion des avertissements** : Maximum 3 par tireur, marquage "A"
- **Gestion des comptes** (Combats uniquement) : Maximum 3 par tireur, marquage "C"
- **Détection disqualification** : Automatique à 3 avertissements ou 3 comptes
- **Système de bonus** : Obligation en cas d'égalité
- **Gestion des abandons** : Avec confirmation et verrouillage des scores
- **Calcul automatique** :
  - Sous-totaux 1 et 2
  - Soustraction des avertissements et comptes
  - Ajout des bonus
  - Totaux finaux et décision
- **Verrouillage des reprises** : Une fois complétées
- **Historique d'actions** : Fonction Annuler complète
- **Synchronisation temps réel** : Envoi automatique au délégué
- **Export individuel** : Excel et Markdown

#### 🎯 Validation et Conformité
- ✅ Scores 3-3 interdits
- ✅ Seules les combinaisons 3-2, 3-1, 2-2 autorisées
- ✅ Maximum 3 avertissements par tireur
- ✅ Maximum 3 comptes par tireur (Combat)
- ✅ Bonus obligatoire en cas d'égalité
- ✅ Un seul bonus par combat
- ✅ Disqualification automatique à 3 AVT ou 3 CPTE

## 🚀 Utilisation

### Option 1 : Ouvrir directement
1. Ouvrir le fichier `savate-officials-fusion.html` dans un navigateur web moderne
2. Choisir son rôle : **Délégué** ou **Juge**

### Option 2 : Serveur local
```bash
# Python 3
cd output
python3 -m http.server 8000

# Puis ouvrir: http://localhost:8000/savate-officials-fusion.html
```

## 📖 Mode d'emploi

### Pour le Délégué

1. **Sélectionner "Délégué Officiel"**
2. **Configurer la session** :
   - Type de rencontre (Assaut, Combat 2ème série, Combat 1ère série)
   - Nombre de juges (3 ou 5)
3. **Créer la session WebRTC**
4. **Communiquer le code à 4 chiffres** aux juges
5. **Remplir les noms des tireurs** (coins rouge et bleu)
6. **Suivre en temps réel** :
   - Onglet Monitoring : Fiches CPTE de tous les juges
   - Onglet Récapitulatif : Tableau des scores par reprise
   - Onglet Résultat : Calcul automatique du vainqueur
   - Onglet Export : Téléchargement des résultats
7. **Options avancées** :
   - Bouton "Annuler" : Revenir en arrière
   - Bouton "Réinitialisation" : Partielle ou complète

### Pour le Juge

1. **Sélectionner "Juge"**
2. **Entrer les informations** :
   - Nom complet
   - Numéro de juge
   - Code de session à 4 chiffres (fourni par le délégué)
3. **Se connecter WebRTC**
4. **Attendre la réception des noms des tireurs**
5. **Remplir la fiche CPTE** :
   - **Scores** : Sélectionner 3, 2 ou 1 pour chaque coin par reprise
   - **Avertissements** : Cliquer sur les cellules AVT (cycle 0→1→2→3→0)
   - **Comptes** (Combat) : Cliquer sur les cellules CPTE (cycle 0→1→2→3→0)
   - **Abandon** : Cliquer sur le bouton ABANDON avec confirmation
   - **Bonus** : En cas d'égalité, attribuer 1 à un coin (obligatoire)
6. **Synchronisation automatique** à chaque modification
7. **Fonction Annuler** : Revenir à l'état précédent
8. **Export** : Télécharger sa fiche en Excel ou Markdown

## 🎨 Détails Techniques

### Architecture
- **Frontend seul** : Application HTML/CSS/JavaScript autonome
- **WebRTC P2P** : Pas de serveur central nécessaire pour les données
- **PeerJS** : Bibliothèque pour simplifier WebRTC

### Structure du fichier
```
savate-officials-fusion.html
├── <head>
│   ├── Meta tags
│   ├── PeerJS CDN
│   └── <style> (CSS de merged 2 - ~27 KB)
└── <body>
    ├── HTML Interface (de JPM Test - ~95 KB)
    │   ├── Indicateur de synchronisation
    │   ├── En-tête application
    │   ├── Sélection de rôle avec logo
    │   ├── Interface délégué
    │   │   ├── Configuration
    │   │   └── Dashboard (Monitoring, Récap, Résultat, Export)
    │   ├── Interface juge CPTE complète
    │   └── Modales (réinitialisation, etc.)
    └── <script> (JavaScript de JPM Test - ~152 KB)
        ├── Variables globales et état
        ├── Système WebRTC (PeerJS)
        ├── Gestion des sessions
        ├── Interface délégué
        ├── Interface juge CPTE
        ├── Validation et calculs
        ├── Synchronisation temps réel
        └── Exports et utilitaires
```

### Compatibilité
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Taille du fichier
- **Total** : ~269 KB
- **CSS** : ~27 KB
- **JavaScript** : ~152 KB
- **HTML** : ~95 KB

## 🔧 Technologies utilisées
- **HTML5** : Structure sémantique
- **CSS3** : Gradients, animations, flexbox, grid
- **JavaScript (ES6+)** : Logique applicative
- **PeerJS 1.4.7** : WebRTC simplifié
- **Web APIs** : LocalStorage potentiel, Blob pour exports

## 📦 Exports disponibles

### Pour le délégué
1. **Excel complet** : Toutes les données (juges, scores, résultat)
2. **Rapport Markdown** : Document formaté officiel
3. **JSON brut** : Données complètes pour analyse
4. **PDF/Impression** : Feuille de résultats

### Pour chaque juge
1. **Excel** : Fiche CPTE personnelle
2. **Markdown** : Fiche formatée

## ⚠️ Notes importantes

### Réseau et connexion
- **WebRTC nécessite** :
  - Connexion Internet pour la signalisation PeerJS
  - Ports réseau non bloqués (firewall)
  - Connexion stable pendant la session
- **Serveur PeerJS** : Utilise le serveur public par défaut
- **Production** : Recommandé d'héberger son propre serveur PeerJS

### Données
- **Aucune sauvegarde serveur** : Tout est en P2P et local
- **Fermeture navigateur** : Perte des données non exportées
- **Export conseillé** : Sauvegarder régulièrement

### Sécurité
- **Code 4 chiffres** : Simple mais limité
- **Production** : Implémenter authentification robuste
- **Données sensibles** : Ne pas utiliser pour infos hautement confidentielles

## 🐛 Dépannage

### Problème de connexion juge
1. Vérifier le code à 4 chiffres
2. Vérifier que le délégué a créé la session
3. Recharger la page et réessayer
4. Vérifier la connexion Internet
5. Désactiver VPN/Proxy si activé

### Synchronisation lente
1. Vérifier la qualité de la connexion Internet
2. Réduire le nombre de juges connectés
3. Utiliser un réseau local stable

### Interface ne s'affiche pas
1. Vérifier la compatibilité du navigateur
2. Activer JavaScript
3. Vider le cache du navigateur
4. Essayer en navigation privée

## 📝 Licence et Crédits

### Origine
- **Design visuel** : savate-officials-merged 2
- **Fonctionnalités** : SAVATE OFFICIALS JPM Test
- **Fusion** : Application combinée

### Utilisation
Développé pour les officiels de la Fédération Française de Savate Boxe Française.

## 🎯 Prochaines améliorations possibles
- Sauvegarde automatique locale (LocalStorage)
- Mode hors ligne avec synchronisation différée
- Serveur PeerJS dédié
- Authentification renforcée
- Historique des combats
- Statistiques et analyses
- Application mobile native
- Mode spectateur en direct

## 📧 Support
Pour toute question ou problème, contacter les responsables techniques de la FFSavate.

---

**Version** : Fusion v1.0  
**Date** : 2025  
**Auteur de la fusion** : Agent E1 (Emergent AI)
