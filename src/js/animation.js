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
