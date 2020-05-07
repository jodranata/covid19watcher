/* eslint-disable no-nested-ternary */
const calcRate = (New, Total) => ((New / Total) * 100).toFixed(2);
const compareRate = (currRate, yesRate) =>
  currRate > yesRate ? 'inc' : currRate < yesRate ? 'dec' : 'const';

const createHeaderData = (casesType, objData) => {
  const {
    today: {
      NewConfirmed,
      TotalConfirmed,
      NewDeaths,
      TotalDeaths,
      NewRecovered,
      TotalRecovered,
    },
    yesterday: {
      NewConfirmed: yesNewConfirmed,
      TotalConfirmed: yesTotalConfirmed,
      NewDeaths: yesNewDeaths,
      TotalDeaths: yesTotalDeaths,
      NewRecovered: yesNewRecovered,
      TotalRecovered: yesTotalRecovered,
    },
  } = objData;

  const infRate = calcRate(NewConfirmed, TotalConfirmed);
  const deathRate = calcRate(NewDeaths, TotalDeaths);
  const recRate = calcRate(NewRecovered, TotalRecovered);
  const yesInfRate = calcRate(yesNewConfirmed, yesTotalConfirmed);
  const yesDeathRate = calcRate(yesNewDeaths, yesTotalDeaths);
  const yesRecRate = calcRate(yesNewRecovered, yesTotalRecovered);

  return casesType.map(type => {
    return {
      typeCase: type,
      totalCase:
        type === 'Confirmed'
          ? TotalConfirmed
          : type === 'Death'
          ? TotalDeaths
          : TotalRecovered,
      newCase:
        type === 'Confirmed'
          ? NewConfirmed
          : type === 'Death'
          ? NewDeaths
          : NewRecovered,
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
          ? yesTotalConfirmed
          : type === 'Death'
          ? yesTotalDeaths
          : yesTotalRecovered,
    };
  });
};

export default createHeaderData;
