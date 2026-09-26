import '../scss/style.scss'
import Swiper from 'swiper/bundle';

let swiperInstances = [];
let resizeTimer = null;

function initSwipers() {
  const screenWidth = window.innerWidth;
  const sliderContainers = document.querySelectorAll('.slide__list.swiper');

  if (screenWidth < 768) {
    if (swiperInstances.length === 0) {
      sliderContainers.forEach((sliderEl) => {
        const paginationEl = sliderEl.querySelector('.swiper-pagination');
        
        const instance = new Swiper(sliderEl, {
          slidesPerView: 'auto',
          spaceBetween: 0,
          watchSlidesProgress: true,
          pagination: {
            el: paginationEl,
            clickable: true,
          },
        });

        swiperInstances.push(instance);
      });
    }
  } else {
    if (swiperInstances.length > 0) {
      swiperInstances.forEach((instance) => instance.destroy(true, true));
      swiperInstances = [];
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSwipers();

  const expandButtons = document.querySelectorAll('.expand__btn');

  expandButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const parentSection = btn.closest('.services__slide') || btn.parentElement;
      const slideList = btn.previousElementSibling;
      const btnText = btn.querySelector('.expand__btn-text');

      if (slideList && slideList.classList.contains('slide__list')) {
        slideList.classList.toggle('expanded');
        btn.classList.toggle('expand__btn--active');

        if (slideList.classList.contains('expanded')) {
          btnText.textContent = 'Скрыть';
        } else {
          btnText.textContent = 'Показать все';
        }
      }
    });
  });
});

window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initSwipers, 200);
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
