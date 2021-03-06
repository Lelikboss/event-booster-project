import axios from 'axios';
const BASIC_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?';
const KEY = '5YjHLxiERacoASpI4A0M5bRuOeVRN8nS';

export const getEventApi = async ({ countryCode, page, amountEl, keyword }) => {
  try {
    const res = await axios.get(
      `${BASIC_URL}&countryCode=${countryCode}&keyword=${keyword}&page=${page}&size=${amountEl}&apikey=${KEY}`,
    );
    return res;
  } catch (error) {
    return 'Error';
  }
};

export const getIdApi = async idNum => {
  try {
    const res = await axios.get(`${BASIC_URL}&id=${idNum}&apikey=${KEY}`);
    return res;
  } catch (error) {
    return 'Error';
  }
};
