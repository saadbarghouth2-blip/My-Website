document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const menu   = document.querySelector(".menu");
  const navbar = document.querySelector(".topnav");
  const sections = document.querySelectorAll('section, header');

  let activeModal = null;

  // Page fade-in
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.8s ease";
  window.addEventListener("load", () => {
    setTimeout(() => document.body.style.opacity = "1", 200);
  });

  // Mobile menu toggle
  if (toggle && menu) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("active");
    });
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => menu.classList.remove("active"));
    });
  }

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });

  // Fade functions
  function fadeIn(element) {
    let opacity = 0;
    element.style.display = 'block';
    element.style.opacity = '0';
    element.style.position = 'fixed';
    element.style.top = '50%';
    element.style.left = '50%';
    element.style.transform = 'translate(-50%, -50%)';
    element.style.zIndex = '999';
    element.style.background = 'rgba(0,0,0,0.9)';
    element.style.padding = '20px';
    element.style.borderRadius = '10px';
    element.style.maxHeight = '90vh';
    element.style.overflowY = 'auto';
    element.style.width = '90%';
    activeModal = element;
    const timer = setInterval(() => {
      opacity += 0.05;
      element.style.opacity = opacity;
      if (opacity >= 1) clearInterval(timer);
    }, 25);
  }

  function fadeOut(element, callback) {
    if (!element) { if(callback) callback(); return; }
    let opacity = 1;
    const timer = setInterval(() => {
      opacity -= 0.05;
      element.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(timer);
        element.style.display = 'none';
        element.style.position = '';
        element.style.top = '';
        element.style.left = '';
        element.style.transform = '';
        element.style.zIndex = '';
        element.style.background = '';
        element.style.padding = '';
        element.style.borderRadius = '';
        element.style.maxHeight = '';
        element.style.overflowY = '';
        element.style.width = '';
        if (activeModal === element) activeModal = null;
        if (callback) callback();
      }
    }, 25);
  }

  function showAllSections() {
    sections.forEach(section => {
      section.style.display = 'block';
      section.style.opacity = '1';
      section.style.position = '';
      section.style.top = '';
      section.style.left = '';
      section.style.transform = '';
      section.style.zIndex = '';
      section.style.background = '';
      section.style.padding = '';
      section.style.borderRadius = '';
      section.style.maxHeight = '';
      section.style.overflowY = '';
      section.style.width = '';
    });
    activeModal = null;
  }

  // Navbar link handling
  const navLinks = document.querySelectorAll('.menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      e.preventDefault();

      if (['#all', '#home', '#default'].includes(targetId)) {
        showAllSections();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        if (activeModal) fadeOut(activeModal, () => fadeIn(document.querySelector(targetId)));
        else fadeIn(document.querySelector(targetId));
      }

      if (menu) menu.classList.remove('active');
    });
  });

  // Removed click outside and ESC handlers
  // Section will remain visible until user clicks another link

  // Handle direct hash on load
  (function handleInitialHash() {
    const hash = window.location.hash;
    if (hash && !['#all', '#home', '#default'].includes(hash)) {
      const target = document.querySelector(hash);
      if (target) fadeIn(target);
    }
  })();
});
