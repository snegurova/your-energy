const navLinks = document.querySelectorAll('.router-link');

export function setActiveLink(base) {
  const currentPath = window.location.pathname;
  navLinks.forEach((link) => {
    const linkTarget = link.getAttribute('href');
    if (linkTarget === './') {
      currentPath === '/' || currentPath === base + '/'
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

export function burgerMenuHandler() {
  const burgerMenuButton = document.querySelector('.burger-menu');
  const burgerMenuContent = document.querySelector('.burger-menu-content');
  const closeMenuButton = document.querySelector('.close-menu');

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
}
