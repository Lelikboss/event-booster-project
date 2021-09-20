import './sass/main.scss';
import { itemEventMarcup, listCountryMarcup, modalEventMarcup, customModal } from './js/marcup.js';
import getEventApi from './js/apiServices.js';
import './js/btnToTop';
import { getCode } from 'country-list';
import { debounce } from 'lodash';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { notice } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import refs from './js/refs';
const pageEl = document.querySelector('#pagination');
let countryCode = ' ';
let page = 0;
let keyword = ' ';
let amountEl = 20;
const onCardClick = e => {
  if (e.target.dataset.id) {
    const instance = basicLightbox.create(customModal());
    instance.show();
  }
};
refs.eventsContainer.addEventListener('click', onCardClick);
// pagination   ----  удалить потом !!!!    смотерть строчку 61
// pageEl.addEventListener('click', onPageNumberClick);
// function onPageNumberClick(e) {
//   refs.eventsContainer.innerHTML = '';
//   console.log(e.target.textContent);
//   page = e.target.textContent;
//   console.log(page);
//   createEventMarcup();
// }
// поиск по стране
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
  createEventMarcup();
};
refs.dataCountryList.addEventListener('click', debounce(checkCountry, 1000));
refs.dataCountryList.insertAdjacentHTML('beforeend', listCountryMarcup);
new SimpleBar(refs.simpleEl, { autoHide: false });
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
refs.dataCountryList.style.position = 'absolute';

// определяет к-во эл-в на странице в зависмости от вьюпорта
const amountElChange = () => {
  if (window.matchMedia('(min-width: 768px) and (max-width: 1279.98px)').matches) {
    amountEl = 21;
  } else {
    amountEl = 20;
  }
};

// смена стилей инпута поиска страны
const onInputClick = e => {
  refs.datalist.style.display = 'block';
  refs.inputCountryEl.classList.remove('change-bottom-border');
  if (!e.target.list) {
    refs.inputCountryEl.classList.add('change-top-border');
  } else {
    console.log('no');
  }
};

refs.inputCountryEl.addEventListener('click', onInputClick);

// работа с API
const createEventMarcup = () => {
  amountElChange();
  getEventApi({ countryCode, page, amountEl, keyword })
    .then(result => {
      itemEventMarcup(result.data._embedded.events);
      console.log(result.data._embedded.events);
      console.log(result.data.page); //  инфа по страницам !!!!!!!!!!!!!!!!!!!!
    })
    .catch(err => {
      console.log(err);
      notice({
        text: 'Sorry, there are no events for your query',
        hide: true,
        delay: 2000,
        styling: 'custom',
      });
    });
};
createEventMarcup();
