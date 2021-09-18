import './sass/main.scss';
import { itemEventMarcup, listCountryMarcup } from './js/marcup.js';
import getEventApi from './js/apiServices.js';
import { getCode } from 'country-list';
import { debounce } from 'lodash';
import refs from './js/refs';

let countryCode = ' ';
let page = 1;
let keyword = '';
let amountEl = 20;

// поиск по стране
const checkCountry = e => {
  e.preventDefault();
  console.log(e.target.value);
  let countryName = e.target.value;
  refs.eventsContainer.innerHTML = '';
  countryCode = getCode(countryName);
  console.log(countryCode);
  createEventMarcup();
};
refs.dataCountryList.addEventListener('click', debounce(checkCountry, 1000));
refs.dataCountryList.insertAdjacentHTML('beforeend', listCountryMarcup);
// поиск по событию
const searchEvent = e => {
  e.preventDefault();
  let searchEv = e.target.value;
  refs.eventsContainer.innerHTML = '';
  const joinInputValue = searchEv.split(' ').join('-');
  keyword = joinInputValue;
  createEventMarcup();
  console.log(joinInputValue);
};
refs.inputEventSearch.addEventListener('input', debounce(searchEvent, 1500));
refs.simpleEl.style.position = 'absolute';
// определяет к-во эл-в на странице в зависмости от вьюпорта
const amountElChange = () => {
  if (window.matchMedia('(min-width: 768px) and (max-width: 1279.98px)').matches) {
    amountEl = 21;
  } else {
    amountEl = 20;
  }
};

// работа с API
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
