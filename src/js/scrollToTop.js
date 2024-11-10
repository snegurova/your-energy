const anchor = document.querySelector('.scroll-to-top');
console.log(anchor);
document.addEventListener('scroll', function () {
  if (window.scrollY === 0) {
    anchor.style.transform = 'rotate(0deg)';
  } else {
    anchor.style.transform = 'rotate(180deg)';
  }
});

const handleScrollBtn = () => {
  console.log('scroll');
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

anchor.addEventListener('click', handleScrollBtn);
