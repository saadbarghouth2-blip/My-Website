document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle"); // hamburger button
  const menu   = document.querySelector(".menu");       // navigation links container
  const navbar = document.querySelector(".topnav");     // navbar element

  // =============================
  // PAGE LOADING FADE-IN EFFECT
  // =============================
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.8s ease";
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 200);
  });

  // =============================
  // Mobile menu & navbar behavior
  // =============================
  if (toggle && menu) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("active");
    });

    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("active");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") menu.classList.remove("active");
    });
  }

  // =============================
  // Navbar scroll effect
  // =============================
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // =============================
  // Section logic with fade + centering
  // =============================
  const navLinks = document.querySelectorAll('.menu a');
  const sections = document.querySelectorAll('section, header');

  // Hide all sections instantly
  function hideAllSections() {
    sections.forEach(section => {
      section.style.display = 'none';
      section.style.opacity = '0';
    });
  }

  // Show all sections (default homepage)
  function showAllSections() {
    sections.forEach(section => {
      section.style.display = 'block';
      fadeIn(section);
    });
  }

  // Fade-in animation
  function fadeIn(element) {
    let opacity = 0;
    element.style.display = 'block';
    element.style.opacity = '0';
    const timer = setInterval(() => {
      opacity += 0.05;
      element.style.opacity = opacity;
      if (opacity >= 1) clearInterval(timer);
    }, 25);
  }

  // Fade-out animation
  function fadeOut(element, callback) {
    let opacity = 1;
    const timer = setInterval(() => {
      opacity -= 0.05;
      element.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(timer);
        element.style.display = 'none';
        if (callback) callback();
      }
    }, 25);
  }

  // Center section vertically in the viewport
  function centerSection(section) {
    const windowHeight = window.innerHeight;
    const sectionHeight = section.offsetHeight;
    const offset = Math.max((windowHeight - sectionHeight) / 2, 60); // min 60px from top
    window.scrollTo({
      top: section.offsetTop - offset,
      behavior: 'smooth'
    });
  }

  // Default: show all sections (home view)
  showAllSections();

  // Handle navbar link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      if (!targetId || !targetId.startsWith('#')) return;
      e.preventDefault();

      const visibleSections = Array.from(sections).filter(s => s.style.display !== 'none');
      let count = 0;

      visibleSections.forEach(section => {
        fadeOut(section, () => {
          count++;
          if (count === visibleSections.length) {
            if (['#all', '#home', '#default'].includes(targetId)) {
              showAllSections();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              const targetSection = document.querySelector(targetId);
              if (targetSection) {
                fadeIn(targetSection);
                setTimeout(() => centerSection(targetSection), 400); // center after fade-in
              }
            }
          }
        });
      });

      if (menu) menu.classList.remove('active');
    });
  });

  // =============================
  // Handle direct links with hash
  // =============================
  (function handleInitialHash() {
    const hash = window.location.hash;
    if (hash && !['#all', '#home', '#default'].includes(hash)) {
      const target = document.querySelector(hash);
      if (target) {
        hideAllSections();
        fadeIn(target);
        setTimeout(() => centerSection(target), 400);
      }
    }
  })();
});
