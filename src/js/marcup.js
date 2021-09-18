import eventTemplates from '../templates/events.hbs';
import refs from './refs.js';
import { getAllCountriesNames } from 'get-all-country-info';

export const itemEventMarcup = result => {
  const markup = eventTemplates(result);
  refs.eventMarcup.insertAdjacentHTML('beforeend', markup);
};
export const listCountryMarcup = getAllCountriesNames()
  .map(e => `<option>${e}</option>`)
  .sort()
  .join(' ');
