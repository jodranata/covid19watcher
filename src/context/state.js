import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { FETCH_DATASUM, FETCH_ERROR } from './constant';
import appReducer from './appReducer';

const INITIAL_STATE = {
  Global: {},
  Countries: [],
  Country: {},
};

export const GlobalContext = createContext(INITIAL_STATE);
const { Provider } = GlobalContext;

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  const handleInitFetch = () => {
    axios
      .get(`https://api.covid19api.com/summary`)
      .then(res => {
        dispatch({ type: FETCH_DATASUM, payload: res.data });
      })
      .catch(err => dispatch({ type: FETCH_ERROR, payload: err.response.data }));
  };
  return (
    <Provider
      value={{
        state,
        handleInitFetch,
      }}
    >
      {children}
    </Provider>
  );
};
