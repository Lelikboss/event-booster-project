import './sass/main.scss';
import { itemEventMarcup, listCountryMarcup } from './js/marcup.js';
import getEventApi from './js/apiServices.js';
import { getCode } from 'country-list';
import { debounce } from 'lodash';
import refs from './js/refs';
import Pagination from './../node_modules/tui-pagination';
import './../node_modules/tui-pagination/dist/tui-pagination.css';

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
// search by event
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
const createEventMarcup = async (e) => {
  try {
    amountElChange();
    const tempData = await getEventApi({ countryCode, page, amountEl, keyword })
    eventsArr = tempData.data._embedded.events;
    totalEl = tempData.data.page.totalElements;
    if (!pagination) {
      pagination = pagingOptions(totalEl);
    }
    itemEventMarcup(eventsArr);
  } catch (err) {
    console.log(err);
  }
};
createEventMarcup();

//created pagination obj
function pagingOptions(numberOfEl) {
  var pagination = new Pagination(document.getElementById('pagination2'), {
    totalItems: numberOfEl, //set total items
    itemsPerPage: amountEl, //set amount elements to display per page
    visiblePages: 15,       //quantity og pages that will be displayed on the screen
    centerAlign: true,      //will the pagination navigation be displayed on the center of a screen
    page: 1                 //starting page that will be showed with the very first load
  });
  return pagination;
}
const paging = document.getElementById('pagination2');
paging.addEventListener('click', onPageNumberClick);