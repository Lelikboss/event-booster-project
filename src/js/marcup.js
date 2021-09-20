import eventTemplates from '../templates/events.hbs';
import refs from './refs.js';
import { getAllCountriesNames } from 'get-all-country-info';
import modalTemplates from '../templates/modal.hbs';

export const itemEventMarcup = result => {
  const markup = eventTemplates(result);
  refs.eventMarcup.insertAdjacentHTML('beforeend', markup);
};
export const listCountryMarcup = getAllCountriesNames()
  .map(e => `<option>${e}</option>`)
  .sort()
  .join(' ');

export const modalEventMarcup = response => {
    const modalWindow = modalTemplates(response);
    refs.bodyEl.insertAdjacentHTML('beforeend', modalWindow);
}
