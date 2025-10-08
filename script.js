document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle"); // hamburger button
  const menu   = document.querySelector(".menu");       // nav links container
  const navbar = document.querySelector(".topnav");     // navbar element

  // =============================
  // Mobile menu & navbar behavior
  // =============================

  // Toggle mobile menu open/close
  if (toggle && menu) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("active");
    });

    // Close mobile menu when clicking any link inside it
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside the menu and toggle button
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("active");
      }
    });

    // Close mobile menu with the Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        menu.classList.remove("active");
      }
    });
  }

  // Change navbar appearance when scrolling
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // =============================
  // Show only one section at a time
  // =============================

  const navLinks = document.querySelectorAll('.menu a');
  const sections = document.querySelectorAll('section, header');

  // Hide all sections (set display none)
  function hideAllSections() {
    sections.forEach(section => {
      section.style.display = 'none';
    });
  }

  // Show only the hero section on initial load (if exists)
  hideAllSections();
  const hero = document.querySelector('#hero');
  if (hero) hero.style.display = 'block';

  // Attach click handlers to navbar links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      // Only handle internal anchor links that start with '#'
      if (!targetId || !targetId.startsWith('#')) {
        // let external links (or anchors that are not #... ) behave normally
        return;
      }

      e.preventDefault(); // prevent default anchor behavior

      // Hide all sections then show the target section only
      hideAllSections();
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.style.display = 'block';
      }

      // Close mobile menu after selection (if open)
      if (menu) menu.classList.remove('active');

      // Smooth scroll to top so the section appears from top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // OPTIONAL: handle direct visits to URL with hash (e.g. domain.com/#skills)
  // Show only the section referenced by the hash on page load
  (function handleInitialHash() {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        hideAllSections();
        target.style.display = 'block';
        // ensure page positioned at top of that section
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
      }
    }
  })();
});
