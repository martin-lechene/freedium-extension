// Content script pour détecter les sites Medium et afficher une bannière
(function() {
  'use strict';

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
    
    // Détecter par le contenu de la page (pour les sites hébergés sur Medium)
    const metaTags = document.querySelectorAll('meta');
    for (const meta of metaTags) {
      if (meta.getAttribute('name') === 'generator' && meta.getAttribute('content')?.includes('Medium')) {
        return true;
      }
      if (meta.getAttribute('property') === 'og:site_name' && meta.getAttribute('content')?.toLowerCase().includes('medium')) {
        return true;
      }
    }
    
    return false;
  }

  // Fonction pour rediriger vers Freedium
  function redirectToFreedium() {
    const currentUrl = window.location.href;
    const freediumUrl = `https://freedium.cfd/${currentUrl}`;
    window.location.href = freediumUrl;
  }

  // Fonction pour créer et afficher la bannière
  function createBanner() {
    // Vérifier si la bannière existe déjà
    if (document.getElementById('freedium-banner')) {
      return;
    }

    // Créer l'élément bannière
    const banner = document.createElement('div');
    banner.id = 'freedium-banner';
    banner.innerHTML = `
      <div class="freedium-banner-content">
        <div class="freedium-banner-text">
          <span class="freedium-banner-icon">🔓</span>
          <span class="freedium-banner-message">${chrome.i18n.getMessage('bannerMessage')}</span>
        </div>
        <button class="freedium-banner-button" id="freedium-banner-btn">
          ${chrome.i18n.getMessage('bannerButton')}
        </button>
        <button class="freedium-banner-close" id="freedium-banner-close">×</button>
      </div>
    `;

    // Ajouter les styles CSS
    const style = document.createElement('style');
    style.textContent = `
      #freedium-banner {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10000;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        border-bottom: 2px solid #00d4aa;
        animation: slideDown 0.3s ease-out;
      }

      @keyframes slideDown {
        from {
          transform: translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .freedium-banner-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .freedium-banner-text {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
      }

      .freedium-banner-icon {
        font-size: 16px;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      .freedium-banner-message {
        font-size: 14px;
        font-weight: 500;
      }

      .freedium-banner-button {
        background: linear-gradient(135deg, #00d4aa 0%, #00a085 100%);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-right: 8px;
      }

      .freedium-banner-button:hover {
        background: linear-gradient(135deg, #00a085 0%, #007a6b 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
      }

      .freedium-banner-button:active {
        transform: translateY(0);
      }

      .freedium-banner-close {
        background: transparent;
        color: #ccc;
        border: none;
        font-size: 18px;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: all 0.2s ease;
        line-height: 1;
      }

      .freedium-banner-close:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .freedium-banner-content {
          flex-direction: column;
          gap: 8px;
          padding: 12px 16px;
        }
        
        .freedium-banner-text {
          justify-content: center;
        }
        
        .freedium-banner-message {
          font-size: 13px;
        }
        
        .freedium-banner-button {
          width: 100%;
          margin-right: 0;
        }
      }
    `;

    // Ajouter les styles et la bannière au document
    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Ajouter les événements
    document.getElementById('freedium-banner-btn').addEventListener('click', redirectToFreedium);
    document.getElementById('freedium-banner-close').addEventListener('click', () => {
      banner.remove();
    });

    // Ajuster le padding du body pour éviter que la bannière cache le contenu
    document.body.style.paddingTop = '50px';
  }

  // Fonction pour masquer la bannière
  function hideBanner() {
    const banner = document.getElementById('freedium-banner');
    if (banner) {
      banner.style.animation = 'slideUp 0.3s ease-out';
      setTimeout(() => {
        banner.remove();
        document.body.style.paddingTop = '0';
      }, 300);
    }
  }

  // Ajouter l'animation de sortie
  const hideStyle = document.createElement('style');
  hideStyle.textContent = `
    @keyframes slideUp {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(-100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(hideStyle);

  // Détecter si c'est un site Medium et afficher la bannière
  if (isMediumSite(window.location.href)) {
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createBanner);
    } else {
      createBanner();
    }

    // Envoyer un message au background script pour redirection automatique
    chrome.runtime.sendMessage({
      action: 'mediumDetected',
      url: window.location.href
    });
  }

  // Exposer les fonctions globalement pour le background script
  window.freediumDetector = {
    isMediumSite,
    redirectToFreedium,
    createBanner,
    hideBanner
  };
})();
