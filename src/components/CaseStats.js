import React, { useContext } from 'react';
import { GlobalContext } from '../context/store';

const CaseStats = () => {
  const { handleFetch } = useContext(GlobalContext);
  return (
    <div>
      <h1>Hello Stats</h1>
    </div>
  );
};

export default CaseStats;
