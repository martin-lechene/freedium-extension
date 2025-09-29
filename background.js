// Service Worker pour l'extension Freedium
let settings = {
  mode: 'auto',
  language: 'en'
};

// Liste des domaines Medium connus
const MEDIUM_DOMAINS = [
  'medium.com',
  'levelup.gitconnected.com',
  'towardsdatascience.com',
  'betterprogramming.pub',
  'codeburst.io',
  'hackernoon.com',
  'freecodecamp.org',
  'javascript.plainenglish.io',
  'blog.devgenius.io',
  'blog.logrocket.com',
  'uxplanet.org',
  'uxdesign.cc',
  'proandroiddev.com',
  'android.jlelse.eu',
  'blog.usejournal.com',
  'blog.prototypr.io',
  'uxmastery.com',
  'blog.angular.io',
  'blog.vuejs.org',
  'blog.reactjs.org'
];

// Charger les paramètres au démarrage
chrome.runtime.onStartup.addListener(loadSettings);
chrome.runtime.onInstalled.addListener(loadSettings);

async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(['mode', 'language', 'domains']);
    settings.mode = result.mode || 'auto';
    settings.language = result.language || 'en';
    
    // Utiliser les domaines sauvegardés ou les domaines par défaut
    if (result.domains && result.domains.length > 0) {
      MEDIUM_DOMAINS.length = 0;
      MEDIUM_DOMAINS.push(...result.domains);
    }
    
    // Créer le menu contextuel
    createContextMenu();
  } catch (error) {
    console.error('Erreur lors du chargement des paramètres:', error);
  }
}

// Fonction pour détecter si c'est un site Medium
function isMediumSite(url) {
  if (!url) return false;
  
  // Vérifier les domaines connus
  for (const domain of MEDIUM_DOMAINS) {
    if (url.includes(domain)) {
      return true;
    }
  }
  
  // Vérifier si c'est un sous-domaine Medium
  if (url.includes('.medium.com/') || url.includes('medium.com/')) {
    return true;
  }
  
  return false;
}

// Créer le menu contextuel
function createContextMenu() {
  chrome.contextMenus.removeAll(() => {
    // Créer les patterns dynamiquement basés sur les domaines
    const patterns = MEDIUM_DOMAINS.map(domain => `*://${domain}/*`);
    
    chrome.contextMenus.create({
      id: 'freedium-redirect',
      title: chrome.i18n.getMessage('menuTitle'),
      contexts: ['link', 'page'],
      documentUrlPatterns: patterns
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
  if (url && isMediumSite(url)) {
    const freediumUrl = `https://freedium.cfd/${url}`;
    chrome.tabs.update(tabId, { url: freediumUrl });
  }
}

// Gérer les changements d'onglets pour la redirection automatique
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && settings.mode === 'auto') {
    if (tab.url && isMediumSite(tab.url)) {
      // Redirection automatique pour tous les articles Medium (plus de limitation premium)
      redirectToFreedium(tab.url, tabId);
    }
  }
});

// Écouter les messages du content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'mediumDetected' && settings.mode === 'auto') {
    redirectToFreedium(message.url, sender.tab.id);
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
    if (changes.domains) {
      // Mettre à jour la liste des domaines
      MEDIUM_DOMAINS.length = 0;
      MEDIUM_DOMAINS.push(...changes.domains.newValue);
      // Recréer le menu contextuel avec les nouveaux domaines
      createContextMenu();
    }
  }
});
