import './sass/main.scss';
import { itemEventMarcup } from './js/marcup.js';
import getEventApi from './js/apiServices.js';
let countryCode = 'US';
let page = 1;
let keyword = ' ';
let amountEl = 20;

const amountElChange = () => {
  if (window.matchMedia('(min-width: 768px) and (max-width: 1279.98px)').matches) {
    amountEl = 21;
  } else {
    amountEl = 20;
  }
};

const createEventMarcup = () => {
  amountElChange();
  getEventApi({ countryCode, page, amountEl, keyword })
    .then(result => {
      itemEventMarcup(result.data._embedded.events);
      console.log(result.data._embedded.events);
    })
    .catch(err => console.log(err));
};
createEventMarcup();
