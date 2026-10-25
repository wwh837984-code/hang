const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
}
const progress = document.querySelector('.reading-progress');
let scheduled = false;
function updateProgress() {
  const length = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${length > 0 ? Math.max(0, Math.min(1, window.scrollY / length)) : 0})`;
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
