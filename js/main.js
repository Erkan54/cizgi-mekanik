/**
 * ÇİZGİ MEKANİK - Dynamic Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initTickerInteraction();
  initNavTabActive();
  initMobileMenu();
  initMobileBrandSlider();
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

function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileNavClose');
  const overlay = document.getElementById('mobileNavOverlay');

  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', () => {
      overlay.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close menu when clicking links inside drawer
  const links = overlay ? overlay.querySelectorAll('a') : [];
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (overlay) {
        overlay.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

/**
 * Mobile Brands Auto-Loop 3-Item Carousel
 */
function initMobileBrandSlider() {
  const container = document.querySelector('.ticker-container');
  const track = document.querySelector('.ticker-track');
  if (!container || !track) return;

  const items = Array.from(track.querySelectorAll('.ticker-item'));
  if (items.length === 0) return;

  let currentIndex = 1;
  let autoPlayInterval = null;
  let touchStartX = 0;
  let touchEndX = 0;
  const totalItems = items.length;
  const originalCount = totalItems >= 12 ? 6 : totalItems;

  function updateSlider(animate = true) {
    if (window.innerWidth > 768) return;

    if (animate) {
      track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      track.style.transition = 'none';
    }

    const offset = -(currentIndex - 1) * (100 / 3);
    track.style.transform = `translateX(${offset}%)`;

    items.forEach((item, index) => {
      item.classList.remove('mobile-active', 'mobile-side');
      if (index === currentIndex) {
        item.classList.add('mobile-active');
      } else if (index === currentIndex - 1 || index === currentIndex + 1) {
        item.classList.add('mobile-side');
      }
    });
  }

  function nextSlide() {
    if (window.innerWidth > 768) return;
    currentIndex++;
    updateSlider(true);

    if (currentIndex >= originalCount + 1) {
      setTimeout(() => {
        if (window.innerWidth > 768) return;
        currentIndex = 1;
        updateSlider(false);
      }, 400);
    }
  }

  function prevSlide() {
    if (window.innerWidth > 768) return;
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = originalCount - 1;
      updateSlider(false);
    } else {
      updateSlider(true);
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    if (window.innerWidth <= 768) {
      autoPlayInterval = setInterval(() => {
        nextSlide();
      }, 1000);
    }
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function checkAndInit() {
    if (window.innerWidth <= 768) {
      currentIndex = 1;
      updateSlider(false);
      startAutoPlay();
    } else {
      stopAutoPlay();
      track.style.transform = '';
      track.style.transition = '';
      items.forEach(item => item.classList.remove('mobile-active', 'mobile-side'));
    }
  }

  // Touch swipe handling
  container.addEventListener('touchstart', (e) => {
    if (window.innerWidth > 768) return;
    touchStartX = e.touches[0].clientX;
    stopAutoPlay();
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    if (window.innerWidth > 768) return;
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startAutoPlay();
  }, { passive: true });

  checkAndInit();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(checkAndInit, 150);
  });
}

