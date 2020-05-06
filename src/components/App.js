import React, { useContext, useEffect } from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {
  MuiThemeProvider as ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles/';

import Header from './Header';
import WorldMap from './WorldMap';
import { GlobalContext } from '../context/store';
import {
  FETCH_DATASUM,
  yesterdayISO,
  twoDaysAgoISO,
  FETCH_YESTERDAYSUM,
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

function App() {
  const { handleFetch, state } = useContext(GlobalContext);

  useEffect(() => {
    handleFetch(urlSum, FETCH_DATASUM);
    handleFetch(yesterdayURL, FETCH_YESTERDAYSUM);
  }, [handleFetch]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <WorldMap />
        <h1>Hwllo</h1>
      </ThemeProvider>
    </div>
  );
}

export default App;
