document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const menu = document.querySelector(".menu");
  const navbar = document.querySelector(".topnav");
  const logo = document.getElementById("logo");
  const sections = document.querySelectorAll('section, header');
  let activeSection = null;

  // =============================
  // Mobile menu toggle
  // =============================
  if (toggle && menu) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("active");
    });

    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => menu.classList.remove("active"));
    });
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
  // Show only one section at a time
  // =============================
  function showSection(section) {
    sections.forEach(sec => {
      if (sec === section) {
        sec.style.display = "block";
        sec.style.position = "fixed";
        sec.style.top = "50%";
        sec.style.left = "50%";
        sec.style.transform = "translate(-50%, -50%)";
        sec.style.zIndex = "999";
        sec.style.background = "rgba(5,7,26,0.95)";
        sec.style.color = "var(--text)";
        sec.style.padding = "20px";
        sec.style.borderRadius = "10px";
        sec.style.maxHeight = "90vh";
        sec.style.overflowY = "auto";
        sec.style.width = "90%";
        sec.style.backdropFilter = "blur(10px)";
        activeSection = section;
      } else {
        sec.style.display = "none";
        sec.style.position = "";
        sec.style.top = "";
        sec.style.left = "";
        sec.style.transform = "";
        sec.style.zIndex = "";
        sec.style.background = "";
        sec.style.color = "";
        sec.style.padding = "";
        sec.style.borderRadius = "";
        sec.style.maxHeight = "";
        sec.style.overflowY = "";
        sec.style.width = "";
        sec.style.backdropFilter = "";
      }
    });
  }

  // =============================
  // Show all sections (default)
  // =============================
  function showAllSections() {
    sections.forEach(sec => {
      sec.style.display = "block";
      sec.style.position = "";
      sec.style.top = "";
      sec.style.left = "";
      sec.style.transform = "";
      sec.style.zIndex = "";
      sec.style.background = "";
      sec.style.color = "";
      sec.style.padding = "";
      sec.style.borderRadius = "";
      sec.style.maxHeight = "";
      sec.style.overflowY = "";
      sec.style.width = "";
      sec.style.backdropFilter = "";
    });
    activeSection = null;
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

      if (['#all', '#home', '#default'].includes(targetId)) {
        showAllSections();
        window.scrollTo({top:0, behavior:'smooth'});
        return;
      }

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      showSection(targetSection);
      window.scrollTo({top:0, behavior:'smooth'});
    });
  });

  // =============================
  // Logo click -> show all sections
  // =============================
  if (logo) {
    logo.addEventListener('click', () => {
      showAllSections();
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  // =============================
  // Initial hash handling
  // =============================
  const hash = window.location.hash;
  if (hash && !['#all','#home','#default'].includes(hash)) {
    const targetSection = document.querySelector(hash);
    if (targetSection) showSection(targetSection);
  }
});
