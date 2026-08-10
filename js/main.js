/**
 * ÇİZGİ MEKANİK - Dynamic Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initTickerInteraction();
  initNavTabActive();
});

function initPreloader() {
  const preloader = document.getElementById('preloader');

  if (!preloader) return;

  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !href.startsWith('https://wa.me')) {
        sessionStorage.setItem('isInternalNav', 'true');
      }
    });
  });

  const isInternalNav = sessionStorage.getItem('isInternalNav');
  sessionStorage.removeItem('isInternalNav');

  if (isInternalNav) {
    preloader.style.display = 'none';
    if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    return;
  }

  const hidePreloader = () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 800);
  };

  const minDisplayTime = 1500; // Minimum time for full reveal animation
  const startTime = performance.now();

  const handlePageLoad = () => {
    const elapsedTime = performance.now() - startTime;
    const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

    setTimeout(hidePreloader, remainingTime);
  };

  if (document.readyState === 'complete') {
    handlePageLoad();
  } else {
    window.addEventListener('load', handlePageLoad);
    setTimeout(hidePreloader, 3500); // Fallback timeout
  }
}

function initTickerInteraction() {
  const tickerTrack = document.querySelector('.brands-ticker-track');
  const brandCards = document.querySelectorAll('.brand-card');

  brandCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (tickerTrack) tickerTrack.style.animationPlayState = 'paused';
    });
    card.addEventListener('mouseleave', () => {
      if (tickerTrack) tickerTrack.style.animationPlayState = 'running';
    });
  });
}

function initNavTabActive() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
