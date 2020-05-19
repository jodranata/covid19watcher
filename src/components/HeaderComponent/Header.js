/* eslint-disable no-nested-ternary */
import React, { useContext, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CountUp from 'react-countup';
import { InitContext } from '../../context/store';

import HeaderSummary from './HeaderSummary';
import '../style/Header.css';

const useStyles = makeStyles({
  appHeader: {
    color: 'rgb(51, 51, 51)',
    padding: '25px 0',
    '& .app-title': {
      textAlign: 'center',
      marginBottom: '55px',
    },
  },
  headerSummary: {
    textAlign: 'center',
    marginTop: '35px',
    '& > p': {
      margin: 0,
    },
    '& .summary-title': {
      maxWidth: '400px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > .title-text': {
        display: 'block',
        '&.text-prefix': {
          textAlign: 'right',
          width: '65%',
          fontSize: '1.5rem',
        },
        '&.text-active': {
          width: '34%',
          fontSize: '1.4rem',
          fontWeight: 500,
          marginTop: '1px',
          marginLeft: '3px',
          textAlign: 'left',
          letterSpacing: '0.5px',
        },
      },
    },

    '& .summary-container': {
      marginTop: '25px',
      padding: '15px 5%',
      '& .summary-casetype': {
        '& .summary-data': {
          margin: '10px 0',
          position: 'relative',
          '& > p': {
            margin: '8px 0',
          },
          '& .data-rate': {
            position: 'absolute',
            fontSize: '0.7rem',
            display: 'flex',
            fontWeight: 400,
            color: 'rgb(0,0,0)',
            '@media (max-width: 760px)': {
              top: '-20%',
              right: '0',
            },
            '@media (min-width: 760px) and (max-width: 959px)': {
              top: '-25%',
              right: '15%',
            },
            '@media (min-width: 960px)': {
              top: '-20%',
              right: '-10%',
            },
            '@media (min-width: 1160px)': {
              top: '-20%',
              right: '10%',
            },
            '& .rate-case': {
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'start',
              '& .span-rate': {
                cursor: 'pointer',
                fontSize: '0.8rem',
              },
              '& .current-rate': {
                fontSize: '1rem',
              },
            },
            '& .MuiSvgIcon-root': {
              fontSize: '2rem',
            },
          },
        },
        '@media (max-width: 959px)': {
          margin: '18px 0',
          '& .summary-casedata': {
            padding: '0 15%',
          },
        },
      },
    },
  },
});

const Header = () => {
  const {
    initState: { todaySum, yesterdaySum },
  } = useContext(InitContext);
  const { updated, active } = todaySum;
  const [formatDate, setFormatDate] = useState(null);

  const classes = useStyles();
  useEffect(() => {
    if (updated) {
      setFormatDate(new Date(updated).toUTCString());
    }
  }, [updated]);

  return (
    <Grid container className={classes.appHeader}>
      <Grid item xs={12}>
        <Grid item className="app-title">
          <h1>Covid19Watcher</h1>
          <p>Tracker for Covid-19 Pandemic</p>
        </Grid>
        <Grid item className={classes.headerSummary}>
          <div className="summary-title">
            <div className="title-text text-prefix">Global Active Cases:</div>

            <div className="title-text text-active">
              {active ? (
                <CountUp
                  start={0}
                  end={active}
                  duration={1.8}
                  separator=","
                  delay={0}
                />
              ) : (
                'loading'
              )}
            </div>
          </div>
          <p className="summary-date">{`Last updated: ${formatDate || '-'}`}</p>
          <Grid item container xs={12} className="summary-container">
            <HeaderSummary
              date={updated}
              summary={todaySum}
              yesterdaySum={yesterdaySum}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
