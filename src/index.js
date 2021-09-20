import './sass/main.scss';
import { itemEventMarcup, listCountryMarcup, modalEventMarcup, customModal } from './js/marcup.js';
import getEventApi from './js/apiServices.js';
import './js/btnToTop';
import './js/countryList';
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
import Pagination from './../node_modules/tui-pagination';
import './../node_modules/tui-pagination/dist/tui-pagination.css';

function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  });
}

loadData().then(() => {
  let preloaderEl = document.getElementById('preloader');
  preloaderEl.classList.add('hidden');
  preloaderEl.classList.remove('visible');
});

let countryCode = ' ';
let page = 0;
let keyword = ' ';
let amountEl = 20;
var pagination;
//function that draws backend data after retrieving it
function onPageNumberClick(e) {
  e.preventDefault();
  refs.eventsContainer.innerHTML = '';
  page = Number.parseInt(e.target.textContent);
  createEventMarcup();
  pagination.movePageTo(page);
}
// search by country name
const onCardClick = e => {
  if (e.target.dataset.id) {
    const instance = basicLightbox.create(customModal());
    instance.show();
    refs.btnToTop.classList.add('visually-hidden');
  }
};
refs.eventsContainer.addEventListener('click', onCardClick);
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
// search by event
new SimpleBar(refs.simpleEl, { autoHide: false });
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
// defines the quantity of elements on a page depending on a viewport
refs.dataCountryList.style.position = 'absolute';

const amountElChange = () => {
  if (window.matchMedia('(min-width: 768px) and (max-width: 1279.98px)').matches) {
    amountEl = 21;
  } else {
    amountEl = 20;
  }
};

// work with API
var eventsArr = [];
let totalEl = 0;
const createEventMarcup = async e => {
  try {
    amountElChange();
    const tempData = await getEventApi({ countryCode, page, amountEl, keyword });
    eventsArr = tempData.data._embedded.events;
    totalEl = tempData.data.page.totalElements;
    if (!pagination) {
      pagination = pagingOptions(totalEl);
    }
    itemEventMarcup(eventsArr);
  } catch (err) {
    console.log(err);
    notice({
      text: 'Sorry, there are no events for your query',
      hide: true,
      delay: 2000,
      styling: 'custom',
    });
  }
  // changes of input styles for country search
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
};
createEventMarcup();

//created pagination obj
function pagingOptions(numberOfEl) {
  var pagination = new Pagination(document.getElementById('pagination2'), {
    totalItems: numberOfEl, //set total items
    itemsPerPage: amountEl, //set amount elements to display per page
    visiblePages: 15, //quantity og pages that will be displayed on the screen
    centerAlign: true, //will the pagination navigation be displayed on the center of a screen
    page: 1, //starting page that will be showed with the very first load
  });
  return pagination;
}
const paging = document.getElementById('pagination2');
paging.addEventListener('click', onPageNumberClick);
