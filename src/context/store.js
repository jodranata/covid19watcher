import React, { createContext, useReducer, useCallback } from 'react';

import axios from 'axios';
import {
  FETCH_ERROR,
  FETCH_INITIALDATA,
  // FETCH_DATASUM,
  // FETCH_YESTERDAYSUM,
  // FETCH_COUNTRIESLIST,
  // FETCH_GLOBALHISTORY,
  FETCH_TEST,
} from './constant';
import appReducer from './appReducer';

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
  errors: null,
  test: null,
};

export const GlobalContext = createContext(INITIAL_STATE);
const { Provider } = GlobalContext;

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  const handleFetch = useCallback((URL, dispatchType) => {
    axios
      .get(URL)
      .then(res => {
        dispatch({ type: dispatchType, payload: res.data });
      })
      .catch(err =>
        dispatch({ type: FETCH_ERROR, payload: err.response.data }),
      );
  }, []);

  const handleInitFetch = useCallback(() => {
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

          dispatch({
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
        dispatch({ type: FETCH_ERROR, payload: err.response.data }),
      );
  }, []);

  return (
    <Provider
      value={{
        state,
        dispatch,
        handleFetch,
        handleInitFetch,
      }}
    >
      {children}
    </Provider>
  );
};
