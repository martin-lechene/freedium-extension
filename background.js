// Service Worker pour l'extension Freedium
let settings = {
  mode: 'manual',
  language: 'en'
};

// Charger les paramètres au démarrage
chrome.runtime.onStartup.addListener(loadSettings);
chrome.runtime.onInstalled.addListener(loadSettings);

async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(['mode', 'language']);
    settings.mode = result.mode || 'manual';
    settings.language = result.language || 'en';
    
    // Créer le menu contextuel
    createContextMenu();
  } catch (error) {
    console.error('Erreur lors du chargement des paramètres:', error);
  }
}

// Créer le menu contextuel
function createContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'freedium-redirect',
      title: chrome.i18n.getMessage('menuTitle'),
      contexts: ['link', 'page'],
      documentUrlPatterns: ['*://medium.com/*', '*://*.medium.com/*']
    });
  });
}

// Gérer les clics sur le menu contextuel
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'freedium-redirect') {
    redirectToFreedium(info.linkUrl || tab.url, tab.id);
  }
});

// Redirection vers Freedium
function redirectToFreedium(url, tabId) {
  if (url && url.includes('medium.com')) {
    const freediumUrl = `https://freedium.cfd/${url}`;
    chrome.tabs.update(tabId, { url: freediumUrl });
  }
}

// Gérer les changements d'onglets pour la redirection automatique
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && settings.mode === 'auto') {
    if (tab.url && tab.url.includes('medium.com')) {
      // Vérifier si c'est un article Medium premium bloqué
      try {
        const response = await fetch(tab.url, { method: 'HEAD' });
        if (response.status === 403 || response.status === 402) {
          // Article premium bloqué, rediriger automatiquement
          redirectToFreedium(tab.url, tabId);
        }
      } catch (error) {
        // En cas d'erreur, on peut quand même essayer la redirection
        console.log('Tentative de redirection automatique:', error);
      }
    }
  }
});

// Écouter les changements de paramètres
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.mode) {
      settings.mode = changes.mode.newValue;
    }
    if (changes.language) {
      settings.language = changes.language.newValue;
    }
  }
});
