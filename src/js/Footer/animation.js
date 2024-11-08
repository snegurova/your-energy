const scrollToTopButton = document.getElementById('scroll-to-top');

scrollToTopButton.addEventListener('click', function (event) {
  event.preventDefault();

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
