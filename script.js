document.addEventListener('DOMContentLoaded',()=>{
 const io=new IntersectionObserver((entries)=>{
   entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});
 },{threshold:0.15});
 document.querySelectorAll('.animate').forEach(el=>io.observe(el));
});