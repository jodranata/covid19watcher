/* eslint-disable no-nested-ternary */
import React, { useContext, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { GlobalContext } from '../context/store';
import HeaderSummary from './HeaderSummary';
import './style/Header.css';

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
    '& .summary-container': {
      marginTop: '25px',
      padding: '15px 5%',
      '& .summary-casetype': {
        '& .summary-data': {
          margin: '10px 0',
          position: 'relative',
          '& .data-rate': {
            position: 'absolute',
            top: '25%',
            right: '0',
            fontSize: '0.8rem',
            fontWeight: 400,
            color: 'rgb(0,0,0)',
            '& .MuiSvgIcon-root': {
              fontSize: '2.4rem',
            },
          },
        },
        '@media (max-width: 960px)': {
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
    state: { Global, UpdateDate, YesterdayGlobal },
  } = useContext(GlobalContext);
  const [formatDate, setFormatDate] = useState(null);

  const classes = useStyles();
  useEffect(() => {
    if (UpdateDate) {
      setFormatDate(new Date(UpdateDate).toUTCString());
    }
  }, [UpdateDate]);

  return (
    <Grid container className={classes.appHeader}>
      <Grid item xs={12}>
        <Grid item className="app-title">
          <h1>Covid19Watcher</h1>
          <p>Tracker for Covid-19 Pandemic</p>
        </Grid>
        <Grid item className={classes.headerSummary}>
          <p className="summary-title">Global Cases</p>
          <p className="summary-date">{`Last updated: ${formatDate || '-'}`}</p>
          <Grid item container xs={12} className="summary-container">
            <HeaderSummary summary={Global} yesterdaySum={YesterdayGlobal} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
