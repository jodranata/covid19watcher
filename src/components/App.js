import React, { useContext, useEffect, useState, useMemo } from 'react';
// import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {
  MuiThemeProvider as ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles/';
import CaseStats from './StatComponent/CaseStats';
import Header from './HeaderComponent/Header';
import WorldMap from './MapComponent/WorldMap';
import { GlobalContext } from '../context/store';
import {
  // FETCH_DATASUM,
  // yesterdayISO,
  // twoDaysAgoISO,
  // FETCH_YESTERDAYSUM,
  // FETCH_GLOBALHISTORY,
  // FETCH_INITIALDATA,
  linksArr,
} from '../context/constant';

import './style/App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(75, 135, 247)',
    },
    secondary: {
      main: 'rgb(55, 194, 102)',
    },
    error: {
      main: 'rgb(245, 118, 92)',
    },
    disabled: {
      main: 'rgb(177, 177, 177)',
    },
  },
});

function App() {
  const { handleInitFetch, state } = useContext(GlobalContext);
  const { CountriesList } = state;

  useEffect(() => {
    handleInitFetch(linksArr);
  }, [handleInitFetch]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <WorldMap />
        <CaseStats CountriesList={CountriesList} />
      </ThemeProvider>
    </div>
  );
}

export default App;
