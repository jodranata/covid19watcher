/* eslint-disable no-nested-ternary */
import React from 'react';
import Grid from '@material-ui/core/Grid';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RemoveIcon from '@material-ui/icons/Remove';

import CountUp from 'react-countup';

import { yesterday, today, formatNumber } from '../../context/constant';
import createHeaderData from './createHeaderData';
import CustomTooltip from '../MuiComponent/CustomTooltip';

const dateOption = { year: 'numeric', month: 'short', day: 'numeric' };
const caseType = ['Confirmed', 'Death', 'Recovered'];

const tipTitle = (day, date, casesNum, casesType) => {
  const dateString = date.toLocaleDateString('en-gb', dateOption);
  const caseString = formatNumber(casesNum);
  return `${day}, ${dateString}:
   ${caseString} ${casesType} Cases
  `;
};

const HeaderSummary = ({ summary, yesterdaySum, updated }) => {
  const sumObj = { today: { ...summary }, yesterday: { ...yesterdaySum } };

  const headerData = createHeaderData(caseType, sumObj, updated);

  return headerData.map(
    ({
      typeCase,
      newCase,
      totalCase,
      colorCase,
      rateCase,
      compareCase,
      yesRateCase,
      yesTotalCase,
    }) => {
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
                {totalCase !== undefined ? (
                  <CountUp
                    start={0}
                    end={totalCase}
                    duration={1.8}
                    separator=","
                    delay={0}
                  />
                ) : (
                  'Loading'
                )}
              </p>
            </Grid>
            <Grid item xs={6} className="summary-data">
              <p className="data-title">New</p>
              <p className="data-number">
                {newCase !== undefined && Number.isNaN(newCase) === false ? (
                  <CountUp
                    start={0}
                    end={newCase}
                    duration={1.8}
                    separator=","
                    delay={0}
                  />
                ) : (
                  'Loading'
                )}
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
                <div className="rate-case" data-html>
                  <CustomTooltip
                    title={tipTitle(
                      'Yesterday',
                      yesterday,
                      yesTotalCase,
                      typeCase,
                    )}
                    aria-label="date"
                    placement="top"
                    arrow
                  >
                    <span className="span-rate" data-html>
                      {`(${
                        newCase !== undefined && Number.isNaN(newCase) === false
                          ? yesRateCase
                          : '-'
                      }%)`}
                    </span>
                  </CustomTooltip>
                  <CustomTooltip
                    title={tipTitle('Today', today, totalCase, typeCase)}
                    aria-label="date"
                    placement="bottom"
                    arrow
                  >
                    <span className="current-rate span-rate" data-html>
                      {`${
                        newCase !== undefined && Number.isNaN(newCase) === false
                          ? rateCase
                          : '-'
                      } %`}
                    </span>
                  </CustomTooltip>
                </div>
              </span>
            </Grid>
          </Grid>
        </Grid>
      );
    },
  );
};

export default HeaderSummary;
