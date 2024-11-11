const anchor = document.querySelector('.scroll-to-top');

if (anchor) {
  document.addEventListener('scroll', function () {
    if (!anchor) {
      return;
    }
    if (window.scrollY === 0) {
      anchor.style.transform = 'rotate(135deg)';
    } else {
      anchor.style.transform = 'rotate(-45deg)';
    }
  });

  const handleScrollBtn = () => {
    if (window.scrollY === 0) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };
  if (anchor) {
    anchor.addEventListener('click', handleScrollBtn);
  }
}
