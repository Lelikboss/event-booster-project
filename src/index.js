import './sass/main.scss';
import { itemEventMarcup } from './js/marcup.js';
import getEventApi from './js/apiServices.js';
import { getAllCountriesNames } from 'get-all-country-info';
import { getCode } from 'country-list';
import { debounce } from 'lodash';
let countryCode = ' ';
let page = 1;
let keyword = ' ';
let amountEl = 20;
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import refs from './js/refs';
new SimpleBar(document.getElementById('countries'), { autoHide: false });
const listCountryMarcup = getAllCountriesNames()
  .map(e => `<option>${e}</option>`)
  .sort()
  .join(' ');
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

refs.simpleEl.style.position = 'absolute';
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
