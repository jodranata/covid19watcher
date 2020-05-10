/* eslint-disable no-nested-ternary */
// const calcDate = (today, select) => {
//   const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
//   const firstDate = new Date(today);
//   const secondDate = new Date(select);
//   return Math.round(Math.abs((firstDate - secondDate) / oneDay));
// };

const calcRate = (cases, total, round) =>
  ((cases / total) * 100).toFixed(round);

const compareRate = (currRate, yesRate) =>
  currRate > yesRate ? 'inc' : currRate < yesRate ? 'dec' : 'const';
const worldPop = 7800000000;

const createHeaderData = (casesType, objData) => {
  const {
    today: { cases, deaths, recovered, todayCases, todayDeaths },
    yesterday: {
      cases: yesCases,
      deaths: yesDeaths,
      recovered: yesRecovered,
      todayCases: yesNewCases,
      todayDeaths: yesNewDeaths,
    },
  } = objData;

  const infRate = calcRate(todayCases, worldPop, 4);
  const deathRate = calcRate(deaths, cases, 2);
  const recRate = calcRate(recovered, cases, 2);
  const yesInfRate = calcRate(yesNewCases, worldPop, 4);
  const yesDeathRate = calcRate(yesDeaths, yesCases, 2);
  const yesRecRate = calcRate(yesRecovered, yesCases, 2);

  return casesType.map(type => {
    return {
      typeCase: type,
      totalCase:
        type === 'Confirmed' ? cases : type === 'Death' ? deaths : recovered,
      newCase:
        type === 'Confirmed'
          ? todayCases
          : type === 'Death'
          ? todayDeaths
          : recovered - yesRecovered,
      colorCase:
        type === 'Confirmed'
          ? `rgb(92, 146, 245)`
          : type === 'Death'
          ? `inherit`
          : `rgb(76, 201, 117)`,
      rateCase:
        type === 'Confirmed' ? infRate : type === 'Death' ? deathRate : recRate,
      yesRateCase:
        type === 'Confirmed'
          ? yesInfRate
          : type === 'Death'
          ? yesDeathRate
          : yesRecRate,
      compareCase:
        type === 'Confirmed'
          ? compareRate(infRate, yesInfRate)
          : type === 'Death'
          ? compareRate(deathRate, yesDeathRate)
          : compareRate(recRate, yesRecRate),
      yesTotalCase:
        type === 'Confirmed'
          ? yesCases
          : type === 'Death'
          ? yesDeaths
          : yesRecovered,
    };
  });
};

export default createHeaderData;
