import React, { useContext, useEffect, useCallback } from 'react';
// import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {
  MuiThemeProvider as ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles/';
import CaseStats from './CaseStats';
import Header from './HeaderComponent/Header';
import WorldMap from './WorldMap';
import { GlobalContext } from '../context/store';
import {
  FETCH_DATASUM,
  yesterdayISO,
  twoDaysAgoISO,
  FETCH_YESTERDAYSUM,
  FETCH_GLOBALHISTORY,
} from '../context/constant';

import './style/App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(92, 146, 245)',
    },
    secondary: {
      main: 'rgb(76, 201, 117)',
    },
    error: {
      main: 'rgb(245, 118, 92)',
    },
    disabled: {
      main: 'rgb(177, 177, 177)',
    },
  },
});

const urlSum = `https://api.covid19api.com/summary`;
const yesterdayURL = `
  https://api.covid19api.com/world?from=${twoDaysAgoISO}&to=${yesterdayISO}`;

const detailGlobalURL = `https://covid19.mathdro.id/api/daily`;

function App() {
  const { handleFetch, state } = useContext(GlobalContext);
  const handleInitFetch = useCallback(() => {
    handleFetch(urlSum, FETCH_DATASUM);
    handleFetch(yesterdayURL, FETCH_YESTERDAYSUM);

    handleFetch(detailGlobalURL, FETCH_GLOBALHISTORY);
  }, [handleFetch]);
  useEffect(() => {
    handleInitFetch();
  }, [handleInitFetch]);
  console.log(state);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <WorldMap />
        <CaseStats />
      </ThemeProvider>
    </div>
  );
}

export default App;
