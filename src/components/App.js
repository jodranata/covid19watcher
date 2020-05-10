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
  FETCH_TEST,
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
  const { countriesCases } = state;
  const [countriesList, setCountriesList] = useState([]);
  useEffect(() => {
    if (Array.isArray(countriesCases) || countriesCases.length) {
      const list = countriesCases.map(type => ({
        countryName: type.country,
        countryIso: type.countryInfo.iso2,
        countryID: type.countryInfo._id,
      }));
      setCountriesList(list);
    }
  }, [countriesCases]);
  useEffect(() => {
    handleInitFetch();
  }, [handleInitFetch]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <WorldMap />
        <CaseStats countriesList={countriesList} />
      </ThemeProvider>
    </div>
  );
}

export default App;
