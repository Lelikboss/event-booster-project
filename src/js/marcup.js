import eventTemplates from '../templates/events.hbs';
import refs from './refs.js';
import countries from '../js/countries-list';

export const itemEventMarcup = result => {
  refs.eventsContainer.innerHTML = '';
  const markup = eventTemplates(result);
  refs.eventMarcup.insertAdjacentHTML('beforeend', markup);
};

export const listCountryMarcup = countries
  .map(e => `<option>${e}</option>`)
  .sort()
  .join(' ');

export const modalEventMarcup = result => {
  const modalWindow = modalTemplates(result);
  refs.bodyEl.insertAdjacentHTML('beforeend', modalWindow);
};
