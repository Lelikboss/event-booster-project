import * as basicLightbox from 'basiclightbox';
import { getIdApi } from './apiServices';
import template from '../templates/modal-events.hbs';
import { lowerFirst, throttle } from 'lodash';
import refs from './refs';

refs.eventMarcup.addEventListener('click', openModal);
function openModal(e) {
  if (e.target.dataset.id) {
    const idNum = e.target.dataset.id;
    refs.bodyEl.classList.add('overflow--hidden');

    getIdApi(idNum).then(res => {
      // console.log(res.data._embedded.events[0]._embedded.attractions);
      // console.log(res.data._embedded.events[0]._embedded.attractions[0].hasOwnProperty('externalLinks'));
      // console.log(res.data._embedded.events[0]._embedded.attractions.length >= 2);

      const instance = basicLightbox.create(template(res), {
        onShow: instance => {
          instance.element().querySelector('[data-action="modal-close"]').onclick = () => {
            instance.close();
            refs.bodyEl.classList.remove('overflow--hidden');
          };
          window.addEventListener(
            'keydown',
            throttle(e => {
              if (e.code === 'Escape') {
                instance.close();
                refs.bodyEl.classList.remove('overflow--hidden');
              }
            }, 500),
          );
          window.addEventListener('click', e => {
            if (e.target.classList.contains('basicLightbox')) {
              refs.bodyEl.classList.remove('overflow--hidden');
            }
          });
          const isPropEvents = res.data._embedded.events[0].hasOwnProperty('priceRanges');
          if (isPropEvents && res.data._embedded.events[0].priceRanges.length < 3) {
            const hiddenEl = instance.element().querySelector('.centered--left--vip');
            hiddenEl.classList.add('visually-hidden');
          } else if (isPropEvents === false) {
            const contentEl = instance.element().querySelector('#vip');
            contentEl.classList.remove('modal__item-content--icon');
            contentEl.textContent = 'The organizer did not put VIP tickets on sale.';
          }

          // const isPropAttractions = res.data._embedded.events[0]._embedded.attractions[0].hasOwnProperty('externalLinks');
          // if (isPropAttractions && res.data._embedded.events[0]._embedded.attractions.length >= 2) {
          //   const moreBtn = instance.element().querySelector('.modal__more-btn-container');
          //   const string = `<a href="${res.data._embedded.events[0]._embedded.attractions[1].externalLinks.homepage[1].url}" target="_blank" rel="noopener noreferer"
          //   class="modal__more-btn link">MORE FROM THIS ${res.data._embedded.events[0]._embedded.attractions[1].name}</a>`
          //   moreBtn.insertAdjacentHTML('beforeend', string);
          // }
        },
      });

      instance.show();
      refs.btnToTopImg.classList.remove('showBtn');
    });
  }
}
