document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const menu   = document.querySelector(".menu");
  const navbar = document.querySelector(".topnav");
  const logo = document.getElementById("logo");
  const sections = document.querySelectorAll('section, header');
  let activeModal = null;

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
    toggle.addEventListener("click", (e) => { e.stopPropagation(); menu.classList.toggle("active"); });
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
  function fadeIn(element) {
    element.style.display = 'block';
    element.style.position = 'fixed';
    element.style.top = '50%';
    element.style.left = '50%';
    element.style.transform = 'translate(-50%, -50%)';
    element.style.zIndex = '999';
    element.style.background = 'rgba(5,7,26,0.95)';
    element.style.color = 'var(--text)';
    element.style.padding = '20px';
    element.style.borderRadius = '10px';
    element.style.maxHeight = '90vh';
    element.style.overflowY = 'auto';
    element.style.width = '90%';
    element.style.backdropFilter = 'blur(10px)';
    activeModal = element;
  }

  function hideModal(element) {
    if(!element) return;
    element.style.display = 'block'; // keep visible for default layout
    element.style.position = '';
    element.style.top = '';
    element.style.left = '';
    element.style.transform = '';
    element.style.zIndex = '';
    element.style.background = '';
    element.style.color = '';
    element.style.padding = '';
    element.style.borderRadius = '';
    element.style.maxHeight = '';
    element.style.overflowY = '';
    element.style.width = '';
    element.style.backdropFilter = '';
    if(activeModal === element) activeModal = null;
  }

  function showAllSections() {
    sections.forEach(section => hideModal(section));
  }

  showAllSections(); // initial load

  // =============================
  // Navbar links
  // =============================
  const navLinks = document.querySelectorAll('.menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      e.preventDefault();

      if(['#all','#home','#default'].includes(targetId)) {
        showAllSections();
        window.scrollTo({top:0, behavior:'smooth'});
        return;
      }

      const targetSection = document.querySelector(targetId);
      if(!targetSection) return;

      // Hide other modals
      sections.forEach(sec => { if(sec !== targetSection) hideModal(sec); });

      // Show target section
      fadeIn(targetSection);
      window.scrollTo({top:0, behavior:'smooth'});
    });
  });

  // =============================
  // Logo click -> show all
  // =============================
  if(logo){
    logo.addEventListener('click', ()=>{
      showAllSections();
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  // =============================
  // Initial hash handling
  // =============================
  (function(){
    const hash = window.location.hash;
    if(hash && !['#all','#home','#default'].includes(hash)){
      const target=document.querySelector(hash);
      if(target) fadeIn(target);
    }
  })();
});
