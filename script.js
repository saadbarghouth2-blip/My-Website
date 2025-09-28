<script>
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const menu   = document.querySelector(".menu");
  const navbar = document.querySelector(".topnav");

  if (toggle && menu) {
    // Toggle menu open/close when hamburger is clicked
    toggle.addEventListener("click", (e) => {
      e.stopPropagation(); 
      menu.classList.toggle("active");
    });

    // Close menu when any link inside it is clicked
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });

    // Close menu when clicking anywhere outside
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("active");
      }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        menu.classList.remove("active");
      }
    });
  }

  // Add shadow or background when scrolling
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
      menu.classList.remove("active"); // auto-close menu on scroll
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
</script>
