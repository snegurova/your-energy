document.addEventListener('DOMContentLoaded', () => {
  const burgerMenuButton = document.querySelector('.burger-menu');
  const burgerMenuContent = document.querySelector('.burger-menu-content');
  const closeMenuButton = document.querySelector('.close-menu');
  const navLinks = document.querySelectorAll('.router-link');
  const logoLink = document.querySelector('.icon-logo');

  function setActiveLink() {
    const currentPath = window.location.pathname;
    navLinks.forEach((link) => {
      if (
        link.getAttribute('href') === currentPath ||
        (currentPath === '/' && link.getAttribute('href') === '/')
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActiveLink();

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      navLinks.forEach((l) => l.classList.remove('active'));
      e.target.classList.add('active');

      if (burgerMenuContent.classList.contains('open')) {
        burgerMenuContent.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      if (burgerMenuContent.classList.contains('open')) {
        burgerMenuContent.classList.remove('open');
        document.body.style.overflow = '';
      }
      window.location.href = '/';
    });
  }

  if (burgerMenuButton) {
    burgerMenuButton.addEventListener('click', () => {
      burgerMenuContent.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeMenuButton) {
    closeMenuButton.addEventListener('click', () => {
      burgerMenuContent.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});
