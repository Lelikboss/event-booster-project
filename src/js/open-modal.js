import * as basicLightbox from 'basiclightbox';
import { getIdApi } from './apiServices';
import template from '../templates/modal-events.hbs';
import refs from './refs';

refs.eventMarcup.addEventListener('click', openModal);
function openModal(e) {
  if (e.target.dataset.id) {
    const idNum = e.target.dataset.id;
    refs.bodyEl.classList.add('overflow--hidden');

    getIdApi(idNum).then(res => {
      const instance = basicLightbox.create(template(res), {
        onShow: instance => {
          instance.element().querySelector('[data-action="modal-close"]').onclick = () => {
            instance.close();
            refs.bodyEl.classList.remove('overflow--hidden');
          };
          window.addEventListener('keydown', e => {
            console.log(e.code);
            if (e.code === 'Escape') {
              instance.close();
              refs.bodyEl.classList.remove('overflow--hidden');
            }
          });
        },
      });

      instance.show();
      refs.btnToTopImg.classList.remove('showBtn');
    });
  }
}
