# 🚀 Freedium Extension

Une extension Chrome qui redirige automatiquement les articles Medium premium vers [Freedium](https://freedium.cfd) pour un accès gratuit.

## ✨ Fonctionnalités

- **Redirection automatique** : Détecte et redirige automatiquement les articles Medium bloqués
- **Mode manuel** : Clic droit pour rediriger manuellement
- **Interface multilingue** : Support français et anglais
- **Paramètres persistants** : Sauvegarde vos préférences
- **Interface moderne** : Design épuré et intuitif

## 🛠️ Installation

### Installation en mode développeur

1. **Téléchargez le code source**
   ```bash
   git clone https://github.com/votre-username/freedium-extension.git
   cd freedium-extension
   ```

2. **Ouvrez Chrome et allez dans les extensions**
   - Tapez `chrome://extensions/` dans la barre d'adresse
   - Activez le "Mode développeur" (en haut à droite)

3. **Chargez l'extension**
   - Cliquez sur "Charger l'extension non empaquetée"
   - Sélectionnez le dossier `freedium-extension`

4. **Configurez vos préférences**
   - Cliquez sur l'icône de l'extension dans la barre d'outils
   - Ou allez dans `chrome://extensions/` et cliquez sur "Options"

## 🎯 Utilisation

### Mode Automatique (Recommandé)
- L'extension détecte automatiquement les articles Medium premium bloqués
- Redirection transparente vers Freedium
- Aucune action requise de votre part

### Mode Manuel
- Clic droit sur n'importe quel lien Medium
- Sélectionnez "Ouvrir avec Freedium" dans le menu contextuel

## ⚙️ Configuration

### Paramètres disponibles

| Paramètre | Description | Options |
|-----------|-------------|---------|
| **Langue** | Interface de l'extension | Français, English |
| **Mode** | Type de redirection | Automatique, Manuel |

### Changer les paramètres

1. Cliquez sur l'icône de l'extension
2. Ou allez dans `chrome://extensions/` → Freedium → Options
3. Modifiez vos préférences
4. Cliquez sur "Save"

## 🔧 Développement

### Structure du projet

```
freedium-extension/
├── manifest.json              # Configuration de l'extension
├── background.js             # Service worker principal
├── options.html              # Page de configuration
├── options.js                # Logique des options
├── _locales/                 # Fichiers de traduction
│   ├── en/messages.json      # Traductions anglaises
│   └── fr/messages.json      # Traductions françaises
└── icons/                    # Icônes de l'extension
    ├── icon16.svg            # Icône 16x16
    ├── icon48.svg            # Icône 48x48
    └── icon128.svg           # Icône 128x128
```

### Technologies utilisées

- **Manifest V3** : Dernière version des extensions Chrome
- **Service Worker** : Gestion en arrière-plan
- **Chrome APIs** : contextMenus, tabs, storage, scripting
- **Internationalisation** : Support multilingue natif

### Permissions requises

| Permission | Utilisation |
|------------|-------------|
| `contextMenus` | Menu clic droit |
| `tabs` | Gestion des onglets |
| `storage` | Sauvegarde des paramètres |
| `scripting` | Injection de scripts |

## 🐛 Dépannage

### L'extension ne fonctionne pas

1. **Vérifiez que l'extension est activée**
   - Allez dans `chrome://extensions/`
   - Assurez-vous que l'extension est activée

2. **Rechargez l'extension**
   - Cliquez sur l'icône de rechargement dans `chrome://extensions/`

3. **Vérifiez les paramètres**
   - Assurez-vous que le mode est correctement configuré

### Problèmes de redirection

- **Mode automatique** : Vérifiez que l'URL contient `medium.com`
- **Mode manuel** : Utilisez le clic droit sur les liens Medium

## 📝 Changelog

### Version 1.0
- ✅ Redirection automatique des articles Medium premium
- ✅ Menu contextuel pour redirection manuelle
- ✅ Interface multilingue (FR/EN)
- ✅ Paramètres persistants
- ✅ Design moderne et responsive

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🔗 Liens utiles

- [Freedium](https://freedium.cfd) - Service de redirection
- [Documentation Chrome Extensions](https://developer.chrome.com/docs/extensions/)
- [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)

## ⚠️ Avertissement

Cette extension est destinée à un usage éducatif et de recherche. Respectez les conditions d'utilisation des services concernés.

---

**Développé avec ❤️ pour la communauté open source**
