import React, { useContext, useEffect } from 'react';
import WorldMap from './WorldMap';
import { GlobalContext } from '../context/state';
import './App.css';

function App() {
  const { handleInitFetch } = useContext(GlobalContext);
  useEffect(() => {
    handleInitFetch();
  }, []);

  return (
    <div className="App">
      <WorldMap />
      <h1>Hwllo</h1>
    </div>
  );
}

export default App;
