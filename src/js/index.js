import '../scss/style.scss'
import Swiper from 'swiper/bundle';

let brandSwiper = null;
let resizeTimer = null;

function initSwiper() {
  const screenWidth = window.innerWidth;
  const sliderEl = document.querySelector('.slide__list');

  if (!sliderEl) {
    return;
  }

  if (screenWidth < 768) {
    if (!brandSwiper) {
      brandSwiper = new Swiper(sliderEl, {
        slidesPerView: 1.25,
        spaceBetween: 16,
        watchSlidesProgress: true,

        pagination: {
          el: sliderEl.querySelector('.swiper-pagination'),
          clickable: true,
        },
      });
    }
  } else {
    if (brandSwiper) {
      brandSwiper.destroy(true, true);
      brandSwiper = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', initSwiper);

window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initSwiper, 200);
});

const expandBtn = document.querySelector('.expand__btn');
const slideList = document.querySelector('.slide__list');
const btnText = expandBtn.querySelector('.expand__btn-text');

expandBtn.addEventListener('click', () => {

  slideList.classList.toggle('expanded');

  if (slideList.classList.contains('expanded')) {
    btnText.textContent = 'Скрыть';
  } else {
    btnText.textContent = 'Показать все';
  }
});
