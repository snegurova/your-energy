document.addEventListener('DOMContentLoaded', () => {
  const burgerMenuButton = document.querySelector('.burger-menu');
  const burgerMenuContent = document.querySelector('.burger-menu-content');
  const closeMenuButton = document.querySelector('.close-menu');
  const navLinks = document.querySelectorAll('.router-link');
  const logoLink = document.querySelector('.logo');

  // Автоматично встановлюємо активний клас для поточного шляху URL
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

  // Обробка кліків на посиланнях для зміни активного стану
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      navLinks.forEach((l) => l.classList.remove('active'));
      e.target.classList.add('active');

      // Закриття меню після кліку на посилання в мобільній версії
      if (burgerMenuContent.classList.contains('open')) {
        burgerMenuContent.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Додавання активного класу при натисканні на лого
  logoLink.addEventListener('click', (e) => {
    e.preventDefault(); // Запобігаємо звичайному переходу
    window.history.pushState({}, '', '/'); // Змінюємо шлях без перезавантаження сторінки
    setActiveLink(); // Оновлюємо активні посилання
  });

  burgerMenuButton.addEventListener('click', () => {
    burgerMenuContent.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  closeMenuButton.addEventListener('click', () => {
    burgerMenuContent.classList.remove('open');
    document.body.style.overflow = '';
  });
});
