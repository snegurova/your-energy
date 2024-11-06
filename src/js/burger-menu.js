document.addEventListener('DOMContentLoaded', () => {
  const burgerMenuButton = document.querySelector('.burger-menu');
  const burgerMenuContent = document.querySelector('.burger-menu-content');
  const closeMenuButton = document.querySelector('.close-menu');
  const navLinks = document.querySelectorAll('.router-link');

  // За замовчуванням щоб був Home активний
  const homeLink = document.querySelector('a[href="../pages/home.html"]');
  homeLink.classList.add('active');

  // Обробник кліків для навігаційних посилань
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      navLinks.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

  // Бургер-меню
  burgerMenuButton.addEventListener('click', () => {
    burgerMenuContent.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  closeMenuButton.addEventListener('click', () => {
    burgerMenuContent.classList.remove('open');
    document.body.style.overflow = '';
  });
});
