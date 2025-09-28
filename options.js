// Gestion des options de l'extension Freedium
document.addEventListener('DOMContentLoaded', function() {
  const languageSelect = document.getElementById('language');
  const modeSelect = document.getElementById('mode');
  const saveButton = document.getElementById('save');
  const statusDiv = document.getElementById('status');

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

  async function loadSettings() {
    try {
      const result = await chrome.storage.sync.get(['language', 'mode']);
      
      if (result.language) {
        languageSelect.value = result.language;
      }
      
      if (result.mode) {
        modeSelect.value = result.mode;
      }
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
      const settings = {
        language: languageSelect.value,
        mode: modeSelect.value
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
});
