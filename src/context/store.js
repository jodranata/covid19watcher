import React, { createContext, useReducer, useCallback } from 'react';

import axios from 'axios';
import {
  FETCH_INITERROR,
  FETCH_DATAERROR,
  FETCH_INITIALDATA,
  CLEAR_DATAERROR,
  INIT_LOADING,
  // FETCH_DATASUM,
  // FETCH_YESTERDAYSUM,
  // FETCH_COUNTRIESLIST,
  // FETCH_GLOBALHISTORY,
} from './constant';
import initReducer from './initReducer';
import dataReducer from './dataReducer';

const URLs = [
  `https://disease.sh/v2/all`,
  `https://disease.sh/v2/all?yesterday=true`,
  `https://disease.sh/v2/countries`,
  `https://disease.sh/v2/historical/all?lastdays=all`,
];

const INITIAL_STATE = {
  todaySum: {},
  yesterdaySum: {},
  countriesCases: [],
  globalHis: [],
  countryCases: [],
  initErrors: null,
  test: null,
};

const INITDATA_STATE = {
  countryCases: [],
  dataErrors: null,
};

export const InitContext = createContext(INITIAL_STATE);

export const InitProvider = ({ children }) => {
  const [initState, initDispatch] = useReducer(initReducer, INITIAL_STATE);

  const handleInitFetch = useCallback(() => {
    initDispatch({ type: INIT_LOADING });
    axios
      .all(URLs.map(link => axios.get(link)))
      .then(
        axios.spread((todayRes, yesRes, countriesRes, globalHisRes) => {
          // dispatch({ type: FETCH_DATASUM, payload: sumRes.data });
          // dispatch({ type: FETCH_YESTERDAYSUM, payload: yesSumRes.data });
          // dispatch({
          //   type: FETCH_GLOBALHISTORY,
          //   payload: globalDetailRes.data,
          // });
          // dispatch({ type: FETCH_COUNTRIESLIST, payload: listRes.data });

          initDispatch({
            type: FETCH_INITIALDATA,
            payload: {
              todayRes: todayRes.data,
              yesRes: yesRes.data,
              countriesRes: countriesRes.data,
              globalHisRes: globalHisRes.data,
            },
          });
        }),
      )
      .catch(err =>
        initDispatch({ type: FETCH_INITERROR, payload: err.response.data }),
      );
  }, []);

  return (
    <InitContext.Provider
      value={{
        initState,
        handleInitFetch,
      }}
    >
      {children}
    </InitContext.Provider>
  );
};

export const DataContext = createContext(INITDATA_STATE);
export const DataProvider = ({ children }) => {
  const [dataState, dataDispatch] = useReducer(dataReducer, INITDATA_STATE);
  const handleDataFetch = useCallback((URL, dispatchType) => {
    dataDispatch({ type: CLEAR_DATAERROR });
    axios
      .get(URL)
      .then(res => {
        dataDispatch({ type: dispatchType, payload: res.data });
      })
      .catch(err =>
        dataDispatch({ type: FETCH_DATAERROR, payload: err.response.data }),
      );
  }, []);
  return (
    <DataContext.Provider value={{ dataState, dataDispatch, handleDataFetch }}>
      {children}
    </DataContext.Provider>
  );
};
