document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const menu   = document.getElementById("menu");
  const navbar = document.querySelector(".topnav");

  if (toggle && menu) {
    // Toggle menu on hamburger click
    toggle.addEventListener("click", (e) => {
      e.stopPropagation(); 
      menu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => menu.classList.remove("active"));
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("active");
      }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") menu.classList.remove("active");
    });
  }

  // Navbar effect on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
      menu.classList.remove("active");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
