document.addEventListener('DOMContentLoaded', () => {
  const burgerMenuButton = document.querySelector('.burger-menu');
  const burgerMenuContent = document.querySelector('.burger-menu-content');
  const closeMenuButton = document.querySelector('.close-menu');
  const navLinks = document.querySelectorAll('.router-link');
  const logoLink = document.querySelector('.icon-logo');

  document.addEventListener('click', (e) => {
    if (
      burgerMenuContent.classList.contains('open') &&
      !burgerMenuContent.contains(e.target) &&
      !burgerMenuButton.contains(e.target)
    ) {
      burgerMenuContent.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  function setActiveLink() {
    const currentPath = window.location.pathname;
    navLinks.forEach((link) => {
      const linkTarget = link.getAttribute('href');
      if (linkTarget === './') {
        currentPath === '/'
          ? link.classList.add('active')
          : link.classList.remove('active');
      }
      if (linkTarget === './favorites') {
        currentPath.includes('favorites')
          ? link.classList.add('active')
          : link.classList.remove('active');
        return;
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
