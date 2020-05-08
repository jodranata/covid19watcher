import React, { createContext, useReducer, useCallback } from 'react';
import axios from 'axios';
import {
  FETCH_ERROR,
  FETCH_INITIALDATA,
  // FETCH_DATASUM,
  // FETCH_YESTERDAYSUM,
  // FETCH_COUNTRIESLIST,
  // FETCH_GLOBALHISTORY,
} from './constant';
import appReducer from './appReducer';

const INITIAL_STATE = {
  Global: {},
  YesterdayGlobal: {},
  Countries: [],
  UpdateDate: '',
  GlobalHistory: [],
  CountriesList: [],
  Errors: null,
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

  const handleInitFetch = useCallback(links => {
    axios
      .all(links.map(link => axios.get(link)))
      .then(
        axios.spread((sumRes, yesSumRes, globalDetailRes, listRes) => {
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
              sumRes: sumRes.data,
              yesSumRes: yesSumRes.data,
              globalDetailRes: globalDetailRes.data,
              listRes: listRes.data,
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
