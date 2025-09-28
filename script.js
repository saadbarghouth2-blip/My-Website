<script>
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const menu   = document.querySelector(".menu");

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

    // Optional: Close menu with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        menu.classList.remove("active");
      }
    });
  }
});
</script>
