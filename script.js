// Mobile menu, scroll reveal, and contact form demo
document.addEventListener('DOMContentLoaded', function() {
  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.querySelector('.nav');
  menuBtn.addEventListener('click', function() {
    if (nav.style.display === 'block') { nav.style.display = ''; }
    else { nav.style.display = 'block'; }
  });

  // scroll reveal
  const faders = document.querySelectorAll('.fade-up');
  const revealOnScroll = function() {
    const triggerBottom = window.innerHeight * 0.9;
    faders.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) el.classList.add('visible');
    });
  };
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // contact form
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (name.length < 2) return alert('Please enter your name.');
    if (!/\\S+@\\S+\\.\\S+/.test(email)) return alert('Please enter a valid email.');
    if (message.length < 10) return alert('Write a longer message (at least 10 chars).');
    alert('Thanks — your message was sent (demo only).');
    form.reset();
  });
});
