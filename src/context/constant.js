export const FETCH_DATASUM = 'FETCH_DATASUM';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_YESTERDAYSUM = 'FETCH_YESTERDAYSUM';
export const FETCH_GLOBALHISTORY = 'FETCH_GLOBALHISTORY';
export const FETCH_COUNTRIESLIST = 'FETCH_COUNTRIESLIST';
export const FETCH_INITIALDATA = 'FETCH_INITIALDATA';

export const formatNumber = num => new Intl.NumberFormat().format(num);
export const today = new Date();
export const yesterday = new Date(today);
export const twoDaysAgo = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

const formatISOMidnight = date => {
  return `${date.toISOString().replace(/(?<=T).*[0-9]/g, '00:00:00.000')}`;
};

export const todayISO = formatISOMidnight(today);
export const yesterdayISO = formatISOMidnight(yesterday);
export const twoDaysAgoISO = formatISOMidnight(twoDaysAgo);

const urlSum = `https://api.covid19api.com/summary`;
const yesterdayURL = `
  https://api.covid19api.com/world?from=${twoDaysAgoISO}&to=${yesterdayISO}`;

const detailGlobalURL = `https://covid19.mathdro.id/api/daily`;
const countriesListURL = `https://api.covid19api.com/countries`;

export const linksArr = [
  urlSum,
  yesterdayURL,
  detailGlobalURL,
  countriesListURL,
];
