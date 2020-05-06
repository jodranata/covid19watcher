/* eslint-disable no-nested-ternary */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RemoveIcon from '@material-ui/icons/Remove';
import { Typography } from '@material-ui/core';

const formatNumber = num => new Intl.NumberFormat().format(num);
const caseType = ['Confirmed', 'Deaths', 'Recovered'];
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
  } = objData;
  const {
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
          : type === 'Deaths'
          ? TotalDeaths
          : TotalRecovered,
      newCase:
        type === 'Confirmed'
          ? NewConfirmed
          : type === 'Deaths'
          ? NewDeaths
          : NewRecovered,
      colorCase:
        type === 'Confirmed'
          ? `rgb(92, 146, 245)`
          : type === 'Deaths'
          ? `inherit`
          : `rgb(76, 201, 117)`,
      rateCase:
        type === 'Confirmed'
          ? infRate
          : type === 'Deaths'
          ? deathRate
          : recRate,
      yesRateCase:
        type === 'Confirmed'
          ? yesInfRate
          : type === 'Deaths'
          ? yesDeathRate
          : yesRecRate,
      compareCase:
        type === 'Confirmed'
          ? compareRate(infRate, yesInfRate)
          : type === 'Deaths'
          ? compareRate(deathRate, yesDeathRate)
          : compareRate(recRate, yesRecRate),
    };
  });
};

const HeaderSummary = ({ summary, yesterdaySum }) => {
  const sumObj = { today: { ...summary }, yesterday: { ...yesterdaySum } };

  const headerData = createHeaderData(caseType, sumObj);

  return headerData.map(({ ...argument }) => {
    return (
      <Grid
        item
        container
        xs={12}
        md={4}
        key={typeCase}
        className="summary-casetype"
        style={{ color: colorCase }}
        justify="center"
      >
        <span className="case-title">{typeCase}</span>
        <Grid item container className="summary-casedata">
          <Grid item xs={6} className="summary-data">
            <p className="data-title">Total</p>
            <p className="data-number">
              {totalCase ? formatNumber(totalCase) : 'Loading'}
            </p>
          </Grid>
          <Grid item xs={6} className="summary-data">
            <p className="data-title">New</p>
            <p className="data-number">
              {newCase !== undefined ? formatNumber(newCase) : 'Loading'}
            </p>
            <span className="data-rate">
              {compareCase === 'inc' ? (
                <ArrowDropUpIcon
                  color={typeCase === 'Recovered' ? 'secondary' : 'error'}
                />
              ) : compareCase === 'dec' ? (
                <ArrowDropDownIcon
                  color={typeCase === 'Recovered' ? 'error' : 'secondary'}
                />
              ) : (
                <RemoveIcon color="disabled" />
              )}
              <span>{newCase !== undefined ? yesRateCase : '-'}</span>
              <span>{`${newCase !== undefined ? rateCase : '-'} %`}</span>
            </span>
          </Grid>
        </Grid>
      </Grid>
    );
  });
};

export default HeaderSummary;
