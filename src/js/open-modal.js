import * as basicLightbox from 'basiclightbox';
import { getIdApi } from './apiServices';
import template from '../templates/modal-events.hbs';
import refs from './refs';

refs.eventMarcup.addEventListener('click', openModal);

function openModal(e) {
    const eventsMetaTitle = document.querySelector('.events__meta-title');

    if (e.eventPhase === 3) {
        const idNum = eventsMetaTitle.dataset.id;
    
        getIdApi(idNum).then(res => {
          const instance = basicLightbox.create(template(res), {
            onShow: instance => {
              instance.element().querySelector('[data-action="modal-close"]').onclick = () => instance.close();
              window.addEventListener('keydown', (e) => {
                console.log(e.code);
                if (e.code === 'Escape') {
                  instance.close();
                }
              });
            }
          });

          instance.show();
          refs.btnToTop.classList.add('visually-hidden');
        })
    }
}