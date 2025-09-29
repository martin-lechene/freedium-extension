# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Versioning Sémantique](https://semver.org/lang/fr/).

## [0.1.1] - 2025-09-29

### Ajouté
- Mode automatique pour l'extension
- Gestion dynamique des domaines Medium
- Interface utilisateur pour l'ajout/suppression de domaines personnalisés
- Vérification pour éviter le traitement de freedium.cfd comme un site Medium

### Modifié
- Remplacement des icônes PNG par des icônes SVG
- Amélioration de l'interface utilisateur (options.html et options.js)

### Corrigé
- Prévention des boucles infinies lors du traitement de freedium.cfd

## [0.1.0] - 2025-09-28

### Ajouté
- Structure complète du projet
- Fichier manifest.json avec métadonnées et permissions
- Système d'internationalisation (i18n) français/anglais
- Interface de gestion des préférences utilisateur (options.html/js)
- Documentation complète (README.md principal et icônes)
- Licence d'utilisation et de distribution
- Gestion du chargement/sauvegarde des préférences
- Gestion des traductions

### Corrigé
- Bugs dans options.js
- Amélioration de l'interface utilisateur

---

## Historique des commits

| Hash | Date | Description |
|------|------|-------------|
| `cb31cc7` | 2025-09-29 | Vérification pour éviter le traitement de freedium.cfd comme un site Medium |
| `b0e3c46` | 2025-09-29 | Mode automatique + gestion dynamique des domaines Medium |
| `74363e0` | 2025-09-29 | Remplacement des icônes PNG par SVG |
| `c68d2ba` | 2025-09-28 | Ajout du fichier LICENSE |
| `1cb3b01` | 2025-09-28 | Ajout du README.md principal |
| `7a090ec` | 2025-09-28 | Ajout du README.md des icônes |
| `99fb23e` | 2025-09-28 | Ajout du fichier options.js |
| `129cc6a` | 2025-09-28 | Correction de bugs dans options.js |
| `3d27bdc` | 2025-09-28 | Ajout du fichier manifest.json |
| `37390a2` | 2025-09-28 | Plan technique initial + structure du projet |

---

## Légende

- **Ajouté** pour les nouvelles fonctionnalités
- **Modifié** pour les changements de fonctionnalités existantes  
- **Déprécié** pour les fonctionnalités qui seront supprimées dans les prochaines versions
- **Supprimé** pour les fonctionnalités supprimées dans cette version
- **Corrigé** pour les corrections de bugs
- **Sécurité** pour les vulnérabilités corrigées
