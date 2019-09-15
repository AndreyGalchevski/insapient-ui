import Swiper from 'swiper';

export function initSlider(selector) {
  const el = document.querySelector(selector);
  return new Swiper(el, {
    autoHeight: true,
    loop: true,
    autoplay: {
      delay: 4000
    }
  });
}
