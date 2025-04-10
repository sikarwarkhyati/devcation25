// Select the about section and the floating image
const aboutSection = document.querySelector('.about-section');
const cursorImg = document.querySelector('.cursor-image');

// Use requestAnimationFrame to throttle mousemove effect
let animationFrameId;

aboutSection.addEventListener('mousemove', (event) => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);

  animationFrameId = requestAnimationFrame(() => {
    const rect = aboutSection.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;

    const offsetX = (relativeX - rect.width / 2) * 0.03; // subtle parallax
    const offsetY = (relativeY - rect.height / 2) * 0.03;

    cursorImg.style.transform = `translate(${relativeX + offsetX}px, ${relativeY + offsetY}px)`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const trackBoxes = document.querySelectorAll(".track-box");

  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");
          observer.unobserve(entry.target); // optional: only animate once
        }
      });
    }, { threshold: 0.1 });

    trackBoxes.forEach(box => {
      observer.observe(box);
    });
  } else {
    // Fallback: immediately show animation class
    trackBoxes.forEach(box => box.classList.add("animate-visible"));
  }
});
