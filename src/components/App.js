import React, { useContext, useEffect } from 'react';

import Header from './Header';
import WorldMap from './WorldMap';
import { GlobalContext } from '../context/store';

import './style/App.css';

function App() {
  const { handleInitFetch } = useContext(GlobalContext);

  useEffect(() => {
    // axios
    //   .get(`https://api.covid19api.com/summary`)
    //   .then(res => {
    //     dispatch({ type: FETCH_DATASUM, payload: res.data });
    //   })
    //   .catch(err => dispatch({ type: FETCH_ERROR, payload: err.response.data }));
    handleInitFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Header />
      <WorldMap />
      <h1>Hwllo</h1>
    </div>
  );
}

export default App;
