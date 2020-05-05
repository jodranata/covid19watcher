import React, { useContext, useEffect } from 'react';

import Header from './Header';
import WorldMap from './WorldMap';
import { GlobalContext } from '../context/store';
import { FETCH_DATASUM } from '../context/constant';

import './style/App.css';

const urlSum = 'summary';

function App() {
  const { handleFetch } = useContext(GlobalContext);

  useEffect(() => {
    handleFetch(urlSum, FETCH_DATASUM);
  }, [handleFetch]);

  return (
    <div className="App">
      <Header />
      <WorldMap />
      <h1>Hwllo</h1>
    </div>
  );
}

export default App;
