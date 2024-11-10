export function setupScrollToTop() {
  const scrollToTopButton = document.getElementById('scroll-to-top');

  if (!scrollToTopButton) {
    return;
  }

  scrollToTopButton.addEventListener('click', (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
}

export function setupLogoAnimation() {
  const logo = document.getElementById('logo');

  if (!logo) {
    return;
  }

  logo.addEventListener('click', () => {
    logo.style.transition = 'transform 0.5s ease-in-out';
    logo.style.transform = 'scale(1.2)';
    setTimeout(() => {
      logo.style.transform = 'scale(1)';
    }, 500);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupScrollToTop();
  setupLogoAnimation();
});
s;
