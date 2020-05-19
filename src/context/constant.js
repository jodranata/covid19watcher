/* eslint-disable no-nested-ternary */
export const FETCH_DATASUM = 'FETCH_DATASUM';
export const FETCH_INITERROR = 'FETCH_INITERROR';

export const FETCH_YESTERDAYSUM = 'FETCH_YESTERDAYSUM';
export const FETCH_GLOBALHISTORY = 'FETCH_GLOBALHISTORY';
export const FETCH_COUNTRIESLIST = 'FETCH_COUNTRIESLIST';
export const FETCH_INITIALDATA = 'FETCH_INITIALDATA';
export const FETCH_DATAERROR = 'FETCH_DATAERROR';
export const FETCH_TEST = 'FETCH_TEST';
export const FETCH_COUNTRYCASES = 'FETCH_COUNTRYCASES';
export const CLEAR_COUNTRYCASES = 'CLEAR_COUNTRYCASES';
export const CLEAR_DATAERROR = 'CLEAR_DATAERROR';
export const INIT_LOADING = 'INIT_LOADING';

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

const dateOption = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};
const dashDate = (str, dateOpt) => str.toLocaleDateString('en-gb', dateOpt);

export const sortTimeline = obj => {
  return Object.keys(obj)
    .reduce((acc, curr) => {
      const objType =
        curr === 'cases'
          ? 'totalCases'
          : curr === 'deaths'
          ? 'totalDeaths'
          : 'totalRecovered';
      const objDate = Object.keys(obj[curr]);

      const objData = objDate.map(date => {
        const newDate = new Date(Date.parse(date));
        return {
          date: dashDate(newDate, dateOption),
          [objType]: obj[curr][date],
        };
      });
      return [...acc, ...objData];
    }, [])
    .reduce((accu, curru) => {
      const dateIndex = accu.findIndex(el => el.date === curru.date);
      if (accu.length <= 0 || dateIndex === -1) {
        return accu.concat(curru);
      }
      const newAccu = JSON.parse(JSON.stringify(accu));
      newAccu[dateIndex] = { ...newAccu[dateIndex], ...curru };
      return newAccu;
    }, []);
};

export const createCountriesList = cases => {
  return cases.map(country => ({
    countryName: country.country,
    countryIso: country.countryInfo.iso2,
    countryID: country.countryInfo._id,
    countryCases: country.cases,
    countryDeaths: country.deaths,
    countryRecovered: country.recovered,
    countryCritical: country.critical,
    countryActive: country.active,
    countryUpdated: country.updated,
    countryFlag: country.countryInfo.flag,
    countryTodayCases: country.todayCases,
    countryTodayDeaths: country.todayDeaths,
  }));
};
