document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const menu = document.querySelector(".menu");
  const navbar = document.querySelector(".topnav");
  const logo = document.getElementById("logo");
  const sections = document.querySelectorAll('section, header');
  const animatedCards = document.querySelectorAll('.card.animate');

  // =============================
  // Page fade-in
  // =============================
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.8s ease";
  window.addEventListener("load", () => setTimeout(() => document.body.style.opacity = "1", 200));

  // =============================
  // Mobile menu toggle
  // =============================
  if (toggle && menu) {
    toggle.addEventListener("click", (e) => { 
      e.stopPropagation(); 
      menu.classList.toggle("active"); 
    });
    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => menu.classList.remove("active")));
  }

  // =============================
  // Navbar scroll effect
  // =============================
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });

  // =============================
  // Fade functions
  // =============================
  function fadeIn(section) {
    section.style.display = 'flex';
    section.style.flexDirection = 'column';
    section.style.justifyContent = 'center';
    section.style.alignItems = 'center';
    section.style.minHeight = '100vh';
    section.style.opacity = '0';
    section.style.transition = 'opacity 0.5s';
    section.style.zIndex = '999';
    section.style.background = 'rgba(5,7,26,0.95)';
    section.style.color = 'var(--text)';
    setTimeout(() => section.style.opacity = '1', 50);
  }

  function fadeOut(section) {
    section.style.opacity = '0';
    setTimeout(() => section.style.display = 'none', 500);
  }

  // =============================
  // Show all sections (default)
  // =============================
  function showAllSections() {
    sections.forEach(sec => {
      sec.style.display = '';
      sec.style.flexDirection = '';
      sec.style.justifyContent = '';
      sec.style.alignItems = '';
      sec.style.minHeight = '';
      sec.style.opacity = '';
      sec.style.transition = '';
      sec.style.zIndex = '';
      sec.style.background = '';
      sec.style.color = '';
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showAllSections(); // initial load

  // =============================
  // Navbar links click
  // =============================
  const navLinks = document.querySelectorAll('.menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      e.preventDefault();

      if(['#all','#home','#default'].includes(targetId)) {
        showAllSections();
        return;
      }

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      // Hide all other sections
      sections.forEach(sec => { if(sec !== targetSection) fadeOut(sec); });

      // Show target section
      fadeIn(targetSection);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // =============================
  // Logo click -> show all sections
  // =============================
  if (logo) {
    logo.addEventListener('click', showAllSections);
  }

  // =============================
  // Initial hash handling
  // =============================
  const hash = window.location.hash;
  if (hash && !['#all','#home','#default'].includes(hash)) {
    const target = document.querySelector(hash);
    if (target) {
      sections.forEach(sec => { if(sec !== target) fadeOut(sec); });
      fadeIn(target);
    }
  }

  // =============================
  // Animate cards on scroll (Intersection Observer)
  // =============================
  if(animatedCards.length){
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);
    animatedCards.forEach(card => observer.observe(card));
  }

  // =============================
  // Smooth scroll for anchor links
  // =============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if(menu.classList.contains('active')) menu.classList.remove('active');
      }
    });
  });
});
