import eventTemplates from '../templates/events.hbs';
import refs from './refs.js';
export const itemEventMarcup = result => {
  const markup = eventTemplates(result);
  refs.eventMarcup.insertAdjacentHTML('beforeend', markup);
};
