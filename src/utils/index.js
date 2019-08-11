import Swiper from 'swiper';
import M from 'materialize-css/dist/js/materialize.min';

export function calculateGrid(numberOfElements) {
  const grids = {
    1: 'col s12 m4 offset-m4',
    2: 'col s12 m4 push-m2',
    3: 'col s12 m4',
    4: 'col s12 m6'
  };
  return grids[numberOfElements];
}

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

export function openModal(selector) {
  const el = document.querySelector(selector);
  const instance = M.Modal.getInstance(el);
  instance.open();
}
