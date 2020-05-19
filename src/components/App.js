import React, { useContext, useEffect, useState } from 'react';
// import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {
  MuiThemeProvider as ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles/';
import Dialog from '@material-ui/core/Dialog';
import LoadingDialog from './LoadingDialog';
import CaseStats from './StatComponent/CaseStats';
import Header from './HeaderComponent/Header';
import WorldMap from './MapComponent/WorldMap';
import Overview from './Overview';
import { InitContext, DataProvider } from '../context/store';

import './style/App.css';
import FooterComp from './FooterComp';
import PreventionComp from './PreventionComp';

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

const useStyles = makeStyles({
  dialogPaper: {
    '& .MuiPaper-root.MuiDialog-paper': {
      width: '90vw',
      height: '90vh',
      backgroundColor: 'rgb(72,72,72)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

function App() {
  const {
    handleInitFetch,
    initState: { initLoading },
  } = useContext(InitContext);

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleInitFetch();
  }, [handleInitFetch]);

  useEffect(() => {
    if (initLoading) setOpen(true);
    else setOpen(false);
  }, [initLoading]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Dialog open={open} className={classes.dialogPaper} maxWidth="xl">
          <LoadingDialog />
        </Dialog>
        <Header />
        <WorldMap />
        <Overview />
        <DataProvider>
          <CaseStats />
        </DataProvider>
        <PreventionComp />
        <FooterComp />
      </ThemeProvider>
    </div>
  );
}

export default App;
