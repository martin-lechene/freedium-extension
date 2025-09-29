# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Versioning Sémantique](https://semver.org/lang/fr/).

## [Non publié]

### Ajouté
- Vérification pour éviter le traitement de freedium.cfd comme un site Medium
- Gestion dynamique des domaines Medium
- Interface utilisateur améliorée pour l'ajout et la suppression de domaines personnalisés
- Mode automatique pour l'extension

### Modifié
- Remplacement des icônes PNG par des icônes SVG pour améliorer la qualité graphique
- Amélioration de l'interface utilisateur dans options.html et options.js

### Corrigé
- Prévention des boucles infinies lors du traitement de freedium.cfd

## [0.1.0] - 2024-12-19

### Ajouté
- Plan technique initial pour l'extension Freedium
- Structure du projet complète
- Fichier manifest.json avec métadonnées, permissions et configuration
- Système d'internationalisation (i18n) avec support français et anglais
- Fichiers options.html et options.js pour la gestion des préférences utilisateur
- Gestion du chargement et de la sauvegarde des préférences utilisateur
- Gestion des traductions
- Documentation complète avec README.md principal
- Documentation des icônes avec spécifications et exemples de design
- Licence définissant les conditions d'utilisation et de distribution
- Correction de bugs dans options.js
- Amélioration de l'interface utilisateur

### Détails des commits

#### [cb31cc7] - 2024-12-19
- **Corrigé** : Ajout d'une vérification pour éviter le traitement de freedium.cfd comme un site Medium dans les fichiers background.js et content.js, afin de prévenir les boucles infinies.

#### [b0e3c46] - 2024-12-19  
- **Ajouté** : Modification de l'extension Freedium pour passer en mode automatique
- **Ajouté** : Gestion dynamique des domaines Medium
- **Amélioré** : Interface utilisateur dans options.html et options.js pour permettre l'ajout et la suppression de domaines personnalisés

#### [74363e0] - 2024-12-19
- **Amélioré** : Modification du fichier manifest.json pour remplacer les icônes PNG par des icônes SVG, améliorant ainsi la qualité graphique de l'extension Freedium

#### [c68d2ba] - 2024-12-19
- **Ajouté** : Fichier LICENSE définissant les conditions d'utilisation et de distribution de l'extension Freedium, incluant des clauses sur les droits d'auteur et les limitations de responsabilité

#### [1cb3b01] - 2024-12-19
- **Ajouté** : Fichier README.md détaillant les fonctionnalités, l'installation, l'utilisation et la configuration de l'extension Freedium, ainsi que des informations sur le développement et la contribution

#### [7a090ec] - 2024-12-19
- **Ajouté** : Fichier README.md dans le dossier icônes, décrivant les icônes requises pour l'extension Freedium, leurs spécifications et des exemples de design

#### [99fb23e] - 2024-12-19
- **Ajouté** : Fichier options.js pour la gestion des paramètres de l'extension Freedium, incluant le chargement et la sauvegarde des préférences utilisateur ainsi que la gestion des traductions

#### [129cc6a] - 2024-12-19
- **Corrigé** : Bugs dans le fichier options.js
- **Amélioré** : Interface utilisateur dans options.html pour l'extension Freedium

#### [3d27bdc] - 2024-12-19
- **Ajouté** : Fichier manifest.json pour l'extension Freedium, définissant les métadonnées, les permissions et la configuration de l'arrière-plan

#### [37390a2] - 2024-12-19
- **Ajouté** : Plan technique pour l'extension Freedium, incluant la structure du projet, le fichier manifest.json, l'internationalisation, et les fonctionnalités principales
- **Ajouté** : Création des fichiers options.html et options.js pour la gestion des préférences utilisateur

---

## Légende

- **Ajouté** pour les nouvelles fonctionnalités
- **Modifié** pour les changements de fonctionnalités existantes  
- **Déprécié** pour les fonctionnalités qui seront supprimées dans les prochaines versions
- **Supprimé** pour les fonctionnalités supprimées dans cette version
- **Corrigé** pour les corrections de bugs
- **Sécurité** pour les vulnérabilités corrigées
