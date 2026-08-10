/**
 * ÇİZGİ MEKANİK - Dynamic Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initTickerInteraction();
  initNavTabActive();
  initMobileMenu();
  initMobileTicker();
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

/* ==========================================================================
   MOBILE & RESPONSIVE SCRIPTS
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const dropdownTitle = document.querySelector('.mobile-nav-dropdown-title');
  const dropdownContent = document.querySelector('.mobile-nav-dropdown-content');

  if (menuBtn && overlay && closeBtn) {
    menuBtn.addEventListener('click', () => {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden'; // prevent scrolling
    });

    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (dropdownTitle && dropdownContent) {
    dropdownTitle.addEventListener('click', () => {
      dropdownContent.classList.toggle('open');
      const icon = dropdownTitle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
      }
    });
  }
}

function initMobileTicker() {
  const container = document.querySelector('.ticker-container');
  const prevBtn = document.querySelector('.ticker-arrow.prev');
  const nextBtn = document.querySelector('.ticker-arrow.next');

  if (!container || !prevBtn || !nextBtn) return;

  const getScrollAmount = () => {
    const card = container.querySelector('.ticker-item');
    return card ? card.offsetWidth + 15 : 255;
  };

  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  // Simple auto scroll for mobile
  let autoScrollInterval;
  
  const startAutoScroll = () => {
    // Only run auto-scroll if we are in mobile view
    if (window.innerWidth <= 992) {
      autoScrollInterval = setInterval(() => {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          // Reached end, snap back to start
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
      }, 3000); // scrolls every 3 seconds
    }
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
  };

  // Start on load
  startAutoScroll();

  // Stop on interaction, then restart
  container.addEventListener('touchstart', stopAutoScroll, {passive: true});
  container.addEventListener('touchend', () => {
    setTimeout(startAutoScroll, 2000);
  }, {passive: true});
  
  // Pause on resize just in case
  window.addEventListener('resize', () => {
    stopAutoScroll();
    startAutoScroll();
  });
}
