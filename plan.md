📌 Plan Technique de l’Extension Freedium
1. Structure du projet
freedium-extension/
│
├── manifest.json
├── background.js
├── options.html
├── options.js
├── _locales/
│   ├── en/messages.json
│   └── fr/messages.json
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png

2. manifest.json

Déclaration des permissions, page d’options et i18n.

{
  "manifest_version": 3,
  "name": "Freedium Redirect",
  "version": "1.0",
  "description": "Ouvre les articles Medium via Freedium",
  "permissions": ["contextMenus", "tabs", "storage", "scripting"],
  "background": {
    "service_worker": "background.js"
  },
  "options_page": "options.html",
  "default_locale": "en",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}

3. Internationalisation (_locales)
_locales/en/messages.json
{
  "extName": { "message": "Freedium Redirect" },
  "extDesc": { "message": "Open Medium articles via Freedium" },
  "menuTitle": { "message": "Open with Freedium" },
  "optionLanguage": { "message": "Language" },
  "optionMode": { "message": "Mode" },
  "modeAuto": { "message": "Automatic redirect (premium)" },
  "modeManual": { "message": "Manual via context menu" }
}

_locales/fr/messages.json
{
  "extName": { "message": "Redirection Freedium" },
  "extDesc": { "message": "Ouvre les articles Medium via Freedium" },
  "menuTitle": { "message": "Ouvrir avec Freedium" },
  "optionLanguage": { "message": "Langue" },
  "optionMode": { "message": "Mode" },
  "modeAuto": { "message": "Redirection automatique (premium)" },
  "modeManual": { "message": "Manuel via clic droit" }
}

4. background.js

Crée le menu contextuel.

Gère la redirection auto (si activée).

Utilise chrome.storage.sync pour charger les préférences.

5. options.html

Une page simple pour choisir la langue et le mode.
Exemple :

<!DOCTYPE html>
<html>
<head>
  <title>Freedium Options</title>
</head>
<body>
  <h1 data-i18n="extName"></h1>
  <label>
    <span data-i18n="optionLanguage"></span>
    <select id="language">
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  </label>
  <br><br>
  <label>
    <span data-i18n="optionMode"></span>
    <select id="mode">
      <option value="manual" data-i18n="modeManual"></option>
      <option value="auto" data-i18n="modeAuto"></option>
    </select>
  </label>
  <br><br>
  <button id="save">Save</button>

  <script src="options.js"></script>
</body>
</html>

6. options.js

Sauvegarde les préférences dans chrome.storage.sync.

Charge la langue + traduit les textes avec _locales.

7. Fonctionnalités principales

Menu contextuel : toujours disponible.

Titre traduit (chrome.i18n.getMessage("menuTitle")).

Mode Auto : quand activé →

Si l’utilisateur ouvre une URL Medium premium (medium.com/@... avec blocage),

Extension redirige automatiquement vers https://freedium.cfd/{url}.

Mode Manuel : redirection seulement via clic droit.

Paramètres persistants : sauvegarde dans chrome.storage.sync, rechargés au lancement.