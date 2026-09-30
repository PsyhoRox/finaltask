import '../scss/style.scss'
import Swiper from 'swiper/bundle'

let swipers = []
let resizeTimer

// Слайдеры: только на мобильных
function initSwipers() {
  const isMobile = window.innerWidth < 768
  const sliders = document.querySelectorAll('.slide__list.swiper')

  if (isMobile && !swipers.length) {
    sliders.forEach((el) => {
      swipers.push(
        new Swiper(el, {
          slidesPerView: 'auto',
          spaceBetween: 0,
          watchSlidesProgress: true,
          pagination: {
            el: el.querySelector('.swiper-pagination'),
            clickable: true
          }
        })
      )
    })
  } else if (!isMobile && swipers.length) {
    swipers.forEach((swiper) => swiper.destroy(true, true))
    swipers = []
  }
}

// Кнопки «Показать все / Скрыть»
function initExpandButtons() {
  if (document.body.dataset.expandInitialized) return
  document.body.dataset.expandInitialized = 'true'

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.expand__btn')
    if (!btn) return

    const list = btn.previousElementSibling

    if (!list?.matches('.slide__list, .slide__list-others-wrapper')) return

    const expanded = list.classList.toggle('expanded')
    const text = btn.querySelector('.expand__btn-text')

    if (text) {
      text.textContent = expanded ? 'Скрыть' : 'Показать все'
    }
  })
}

// Бургер-меню
function initMenu() {
  const burger = document.getElementById('burger')
  const menu = document.getElementById('menu')
  const overlay = document.getElementById('overlay')

  if (!burger || !menu || !overlay) return

  const closeBtn = menu.querySelector('.menu__btn-close')

  function toggleMenu(isOpen) {
    menu.classList.toggle('menu--open', isOpen)
    overlay.classList.toggle('overlay--open', isOpen)
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }

  burger.addEventListener('click', () => toggleMenu(true))
  closeBtn?.addEventListener('click', () => toggleMenu(false))
  overlay.addEventListener('click', () => toggleMenu(false))

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false)
  })
}

// Запуск
function initApp() {
  initSwipers()
  initExpandButtons()
  initMenu()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}

// Пересоздание слайдеров при изменении ширины
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(initSwipers, 200)
})
