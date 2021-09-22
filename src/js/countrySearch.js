import { getCode } from 'country-list';
import { itemEventMarcup, listCountryMarcup, modalEventMarcup } from './marcup.js';
import { createEventMarcup } from '../index.js';
import { debounce } from 'lodash';
import refs from './refs.js';

// let countryCode = ' ';

const checkCountry = e => {
  e.preventDefault();
  console.log(e.target.value);
  let countryName = e.target.value;
  refs.eventsContainer.innerHTML = '';
  countryCode = getCode(countryName);
  console.log(countryCode);
  refs.datalist.style.display = 'none';
  refs.inputCountryEl.classList.add('change-bottom-border');
  refs.inputCountryEl.value = countryName;

  if (countryName === 'All countries') {
    countryCode = '';
  }
  createEventMarcup();
};
refs.dataCountryList.addEventListener('click', debounce(checkCountry, 1000));
refs.dataCountryList.insertAdjacentHTML('beforeend', listCountryMarcup);
