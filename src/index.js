import './sass/main.scss';
import getEventApi from './js/apiServices.js';
let countryCode = ' ';
let page = 1;
let amountEl = 20;
let keyword = ' ';
getEventApi({ countryCode, page, amountEl, keyword }).then(result => console.log(result.data));