// Gestion des options de l'extension Freedium
document.addEventListener('DOMContentLoaded', function() {
  const languageSelect = document.getElementById('language');
  const modeSelect = document.getElementById('mode');
  const saveButton = document.getElementById('save');
  const statusDiv = document.getElementById('status');
  const domainsList = document.getElementById('domains-list');
  const newDomainInput = document.getElementById('new-domain');
  const addDomainButton = document.getElementById('add-domain');
  const addCurrentDomainButton = document.getElementById('add-current-domain');

  // Charger les paramètres sauvegardés
  loadSettings();

  // Charger les traductions
  loadTranslations();

  // Écouter les changements de langue pour recharger les traductions
  languageSelect.addEventListener('change', function() {
    loadTranslations();
  });

  // Sauvegarder les paramètres
  saveButton.addEventListener('click', function() {
    saveSettings();
  });

  // Gestion des domaines
  addDomainButton.addEventListener('click', function() {
    const domain = newDomainInput.value.trim();
    if (domain && isValidDomain(domain)) {
      addDomain(domain);
      newDomainInput.value = '';
    } else {
      showStatus('Veuillez entrer un domaine valide (ex: example.com)', 'error');
    }
  });

  newDomainInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addDomainButton.click();
    }
  });

  // Bouton pour ajouter le domaine actuel
  addCurrentDomainButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0] && tabs[0].url) {
        const url = new URL(tabs[0].url);
        const domain = url.hostname;
        if (isValidDomain(domain)) {
          addDomain(domain);
          addCurrentDomainButton.style.display = 'none';
        }
      }
    });
  });

  // Vérifier si on est sur un site Medium pour afficher le bouton
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0] && tabs[0].url) {
      const url = tabs[0].url;
      if (isMediumSite(url)) {
        addCurrentDomainButton.style.display = 'block';
        const domain = new URL(url).hostname;
        addCurrentDomainButton.innerHTML = `<span data-i18n="addCurrentDomain"></span> (${domain})`;
      }
    }
  });

  async function loadSettings() {
    try {
      const result = await chrome.storage.sync.get(['language', 'mode', 'domains']);
      
      if (result.language) {
        languageSelect.value = result.language;
      }
      
      if (result.mode) {
        modeSelect.value = result.mode;
      }

      // Charger les domaines sauvegardés ou utiliser les domaines par défaut
      const domains = result.domains || getDefaultDomains();
      displayDomains(domains);
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error);
      showStatus('Erreur lors du chargement des paramètres', 'error');
    }
  }

  function loadTranslations() {
    // Appliquer les traductions aux éléments avec data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        try {
          const message = chrome.i18n.getMessage(key);
          if (message) {
            element.textContent = message;
          }
        } catch (error) {
          console.warn(`Traduction manquante pour: ${key}`);
        }
      }
    });
  }

  async function saveSettings() {
    try {
      const domains = getCurrentDomains();
      const settings = {
        language: languageSelect.value,
        mode: modeSelect.value,
        domains: domains
      };

      await chrome.storage.sync.set(settings);
      
      showStatus('Paramètres sauvegardés avec succès!', 'success');
      
      // Recharger les traductions après sauvegarde
      setTimeout(() => {
        loadTranslations();
      }, 500);
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showStatus('Erreur lors de la sauvegarde des paramètres', 'error');
    }
  }

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';
    
    // Masquer le message après 3 secondes
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 3000);
  }

  // Fonctions utilitaires pour la gestion des domaines
  function getDefaultDomains() {
    return [
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
  }

  function isValidDomain(domain) {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  }

  function isMediumSite(url) {
    const mediumDomains = getDefaultDomains();
    for (const domain of mediumDomains) {
      if (url.includes(domain)) {
        return true;
      }
    }
    return url.includes('medium.com') || url.includes('.medium.com');
  }

  function displayDomains(domains) {
    domainsList.innerHTML = '';
    domains.forEach(domain => {
      const domainItem = document.createElement('div');
      domainItem.className = 'domain-item';
      domainItem.innerHTML = `
        <span class="domain-name">${domain}</span>
        <button class="domain-remove" data-domain="${domain}">×</button>
      `;
      domainsList.appendChild(domainItem);
    });

    // Ajouter les événements de suppression
    domainsList.querySelectorAll('.domain-remove').forEach(button => {
      button.addEventListener('click', function() {
        const domain = this.getAttribute('data-domain');
        removeDomain(domain);
      });
    });
  }

  function addDomain(domain) {
    const currentDomains = getCurrentDomains();
    if (!currentDomains.includes(domain)) {
      currentDomains.push(domain);
      displayDomains(currentDomains);
      showStatus(`Domaine ${domain} ajouté!`, 'success');
    } else {
      showStatus('Ce domaine est déjà dans la liste', 'error');
    }
  }

  function removeDomain(domain) {
    const currentDomains = getCurrentDomains();
    const index = currentDomains.indexOf(domain);
    if (index > -1) {
      currentDomains.splice(index, 1);
      displayDomains(currentDomains);
      showStatus(`Domaine ${domain} supprimé!`, 'success');
    }
  }

  function getCurrentDomains() {
    const domainItems = domainsList.querySelectorAll('.domain-name');
    return Array.from(domainItems).map(item => item.textContent.trim());
  }
});
