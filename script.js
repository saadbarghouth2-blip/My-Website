document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle"); // hamburger button
  const menu   = document.querySelector(".menu");       // navigation links container
  const navbar = document.querySelector(".topnav");     // navbar element

  // =============================
  // Mobile menu & navbar behavior
  // =============================
  if (toggle && menu) {
    // Toggle mobile menu open/close
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("active");
    });

    // Close mobile menu when a link inside it is clicked
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("active");
      }
    });

    // Close menu when pressing ESC key
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
  // Section display logic
  // =============================
  const navLinks = document.querySelectorAll('.menu a');
  const sections = document.querySelectorAll('section, header');

  // Hide all sections
  function hideAllSections() {
    sections.forEach(section => {
      section.style.display = 'none';
    });
  }

  // Show all sections
  function showAllSections() {
    sections.forEach(section => {
      section.style.display = 'block';
    });
  }

  // When the page loads, show all sections by default
  showAllSections();

  // Handle navigation link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      // Skip external links
      if (!targetId || !targetId.startsWith('#')) return;

      e.preventDefault();
      hideAllSections();

      // If link is for showing all sections (like #home or #all)
      if (targetId === '#all' || targetId === '#home' || targetId === '#default') {
        showAllSections();
      } else {
        const targetSection = document.querySelector(targetId);
        if (targetSection) targetSection.style.display = 'block';
      }

      // Close mobile menu after selection
      if (menu) menu.classList.remove('active');

      // Smooth scroll to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // =============================
  // Handle direct links with hash
  // =============================
  (function handleInitialHash() {
    const hash = window.location.hash;
    if (hash && hash !== '#all' && hash !== '#home' && hash !== '#default') {
      const target = document.querySelector(hash);
      if (target) {
        hideAllSections();
        target.style.display = 'block';
      }
    }
  })();
});
