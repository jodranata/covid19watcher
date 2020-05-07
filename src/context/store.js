import React, { createContext, useReducer, useCallback } from 'react';
import axios from 'axios';
import { FETCH_ERROR, FETCH_DATASUM, FETCH_YESTERDAYSUM } from './constant';
import appReducer from './appReducer';

const INITIAL_STATE = {
  Global: {},
  YesterdayGlobal: {},
  Countries: [],
  UpdateDate: '',
  GlobalHistory: [],
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

  return (
    <Provider
      value={{
        state,
        dispatch,
        handleFetch,
      }}
    >
      {children}
    </Provider>
  );
};
