// import { itemEventMarcup, listCountryMarcup, modalEventMarcup } from './js/marcup.js';
// import { getEventApi, getIdApi } from './js/apiServices.js';
import './js/btnToTop';
import './js/countryList';

// import './js/countrySearch';
// import { getCode } from 'country-list';
// import { debounce } from 'lodash';
// import SimpleBar from 'simplebar';
// import 'simplebar/dist/simplebar.css';
// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';
// import { notice } from '../node_modules/@pnotify/core/dist/PNotify.js';
// import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
// import '../node_modules/@pnotify/core/dist/BrightTheme.css';
// import refs from './js/refs';
// import Pagination from './../node_modules/tui-pagination';
// import './../node_modules/tui-pagination/dist/tui-pagination.css';
// import scrollIntoView from './js/scroll.js';
import './js/open-modal';
import './js/fullWork';
import './sass/main.scss';

// function loadData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, 2000);
//   });
// }

// loadData().then(() => {
//   let preloaderEl = document.getElementById('preloader');
//   preloaderEl.classList.add('hidden');
//   preloaderEl.classList.remove('visible');
// });

// let countryCode = ' ';
// let page = 0;
// let keyword = ' ';
// let amountEl = 20;
// var pagination;
// //function that draws backend data after retrieving it
// // function onPageNumberClick(e) {
// //   e.preventDefault();
// //   refs.eventsContainer.innerHTML = '';
// //   page = Number.parseInt(e.target.textContent);
// // createEventMarcup();
// // pagination.movePageTo(page);
// // }
// // search by country name

// const checkCountry = e => {
//   e.preventDefault();
//   console.log(e.target.value);
//   let countryName = e.target.value;
//   refs.eventsContainer.innerHTML = '';
//   countryCode = getCode(countryName);
//   console.log(countryCode);
//   refs.datalist.style.display = 'none';
//   refs.inputCountryEl.classList.add('change-bottom-border');
//   refs.inputCountryEl.value = countryName;

//   if (countryName === 'All countries') {
//     countryCode = '';
//   }
//   createEventMarcup();
// };
// refs.dataCountryList.addEventListener('click', debounce(checkCountry, 1000));
// refs.dataCountryList.insertAdjacentHTML('beforeend', listCountryMarcup);
// // search by event
// new SimpleBar(refs.simpleEl, { autoHide: false });
// const searchEvent = e => {
//   e.preventDefault();
//   let searchEv = e.target.value;
//   refs.eventsContainer.innerHTML = '';
//   const joinInputValue = searchEv.split(' ').join('-');
//   keyword = joinInputValue;
//   createEventMarcup();
//   console.log(joinInputValue);
// };
// refs.inputEventSearch.addEventListener('input', debounce(searchEvent, 1500));
// refs.simpleEl.style.position = 'absolute';
// // defines the quantity of elements on a page depending on a viewport
// refs.dataCountryList.style.position = 'absolute';

// // work with API
// export const createEventMarcup = async e => {
//   try {
//     await getEventApi({ countryCode, page, amountEl, keyword }).then(result => {
//       if (!pagination) {
//         pagination = paginationInit();
//       }
//       itemEventMarcup(result.data._embedded.events);
//     });
//   } catch (err) {
//     console.log(err);
//     notice({
//       text: 'Sorry, there are no events for your query',
//       hide: true,
//       delay: 2000,
//       styling: 'custom',
//     });
//   }
//   // changes of input styles for country search
//   const onInputClick = e => {
//     refs.datalist.style.display = 'block';
//     refs.inputCountryEl.classList.remove('change-bottom-border');
//     if (!e.target.list) {
//       refs.inputCountryEl.classList.add('change-top-border');
//     } else {
//       console.log('no');
//     }
//   };

//   refs.inputCountryEl.addEventListener('click', onInputClick);
// };
// createEventMarcup();

// function paginationInit() {
//   console.log('inside paginationInit');
//   pagination = new Pagination(document.getElementById('pagination'), {
//     // totalItems: some number, //set total items
//     itemsPerPage: 20, //amountEl, //set amount elements to display per page
//     visiblePages: 5, //quantity of pages that will be displayed on the screen
//     centerAlign: true, //will the pagination navigation be displayed on the center of a screen
//     page: 1, //starting page that will be showed with the very first load
//   });

//   pagination.on('beforeMove', async e => {
//     pagination.page = e.page - 1;
//     page = e.page - 1;
//     console.log('pagination.page :>> ', pagination);
//     console.log('e.page :>> ', e.page);
//     console.log('page :>> ', page);
//     await getEventApi({ countryCode, page, amountEl, keyword }).then(result => {
//       if (!pagination) {
//         pagination = paginationInit();
//       }
//       itemEventMarcup(result.data._embedded.events);
//     });
//   });

//   let totalItems;
//   const init = async total => {
//     if (total === undefined && !totalItems) {
//       const tempData = await getEventApi({ countryCode, page, amountEl, keyword });
//       totalItems = tempData.data.page.totalElements;
//     }

//     if (total === undefined) {
//       total = totalItems;
//     }
//     console.log(total);
//     pagination.setTotalItems(total);
//     pagination.reset();
//   };
//   init();
//   return pagination;
// }
