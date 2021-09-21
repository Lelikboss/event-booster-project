import * as basicLightbox from 'basiclightbox';
import { getEventApi, getIdApi } from './apiServices';
import template from '../templates/modal-events.hbs';
import refs from './refs';

refs.eventMarcup.addEventListener('click', openModal);

function openModal(e) {
    if (e.target.dataset.id) {
        console.log(e.target.dataset.id);
        const idNum = e.target.dataset.id;
    
        getIdApi(idNum).then(res => {
          const instance = basicLightbox.create(template(res), {
            onShow: instance => {
              instance.element().querySelector('[data-action="modal-close"]').onclick = () => instance.close();
            }
          });

          instance.show();
          refs.btnToTop.classList.add('visually-hidden');
        })
    }
}