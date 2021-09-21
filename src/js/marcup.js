import eventTemplates from '../templates/events.hbs';
import refs from './refs.js';
// import { getAllCountriesNames } from 'get-all-country-info';
import modalTemplates from '../templates/modal.hbs';
import countries from '../js/countries-list';

export const itemEventMarcup = result => {
    refs.eventsContainer.innerHTML = '';
    const markup = eventTemplates(result);
    refs.eventMarcup.insertAdjacentHTML('beforeend', markup);
};
// export const listCountryMarcup = getAllCountriesNames()
//   .map(e => `<option>${e}</option>`)
//   .sort()
//   .join(' ');

export const listCountryMarcup = countries
  .map(e => `<option>${e}</option>`)
  .sort()
  .join(' ');

export const modalEventMarcup = result => {
  const modalWindow = modalTemplates(result);
    refs.bodyEl.insertAdjacentHTML('beforeend', modalWindow);
};

export const customModal = result =>
  `<div class="modal__window">
            <button type="button" class="modal__close-btn" data-action="modal-close">
                <svg class="modal__close-icon">
                    <use href="../images/svg/close-modal.svg"></use>
                </svg>
            </button>

            <div class="modal__event-header">
                <img src="{{eventIconUrl}}" alt="icon" class="modal__event__icon" />
            </div>
            <div class="modal__content-wrapper">
                <div class="modal__event-content-image">
                    <img src="{{eventPosterUrl}}" alt="icon" class="modal__event-poster" />
                </div>

                <div class="modal__event-content">
                    <ul class="modal__event-container">
                        <li class="modal__item-info">
                            <h2 class="modal__item-title">INFO</h2>
                            <p class="modal__item-content">{{eventInfoContent}}</p>
                        </li>
                        <li class="modal__item-info">
                            <h2 class="modal__item-title">WHEN</h2>
                            <p class="modal__item-content">{{dates.start.localDate}}</p>
                        </li>
                        <li class="modal__item-info">
                            <h2 class="modal__item-title">WHERE</h2>
                            <p class="modal__item-content">{{eventPlaceContent}}</p>
                        </li>
                        <li class="modal__item-info">
                            <h2 class="modal__item-title">WHO</h2>
                            <p class="modal__item-content">{{eventWhoContent}}</p>
                        </li>
                        <li class="modal__item-info">
                            <h2 class="modal__item-title">PRICES</h2>
                            <svg class="modal__ticket-icon">
                                <use href="../images/svg/ticket.svg"></use>
                            </svg>

                        </li>
                        <ul class="modal__item-buttons">
                            <li>
                                <p class="modal__item-content">Standart {{eventLowPricesContent}} {{currency}}</p>
                                <button type="button" class="modal__btn" data-action="buy-cheap">
                                    BUY TICKETS
                                </button>
                            </li>
                            <li>
                                <p class="modal__item-content">VIP {{eventHighPricesContent}} {{currency}}</p>
                                <button type="button" class="modal__btn" data-action="buy-expensive">
                                    BUY TICKETS
                                </button>
                            </li>
                        </ul>

                    </ul>

                    <div class="modal__more-btn-container">
                        <button type="button" class="modal__more-btn">MORE FROM THIS AUTHOR</button>
                    </div>

                </div>
            </div>
        </div>`;
