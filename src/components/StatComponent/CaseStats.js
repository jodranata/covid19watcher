import React, { useContext, useEffect, useState } from 'react';

import { GlobalContext } from '../../context/store';
import StatChart from './StatChart';
import DataOption from './DataOption';
import { sortTimeline } from '../../context/constant';

const CaseStats = ({ countriesList }) => {
  const {
    handleFetch,
    state: { globalHis },
  } = useContext(GlobalContext);

  const [optList, setOptList] = useState([]);

  useEffect(() => {
    if (countriesList) setOptList(countriesList);
  }, [countriesList]);

  const globalHisData = sortTimeline(globalHis);

  return (
    <div>
      <DataOption optList={optList} />
      <StatChart statData={globalHisData} />
    </div>
  );
};

export default CaseStats;
