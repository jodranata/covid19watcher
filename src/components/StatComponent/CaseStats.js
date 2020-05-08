import React, { useContext, useEffect, useState } from 'react';

import { GlobalContext } from '../../context/store';
import StatChart from './StatChart';
import DataOption from './DataOption';

const dateOption = { year: 'numeric', month: 'numeric', day: 'numeric' };
const dashDate = (str, dateOpt) => str.toLocaleDateString('en-gb', dateOpt);

const CaseStats = ({ CountriesList }) => {
  const {
    handleFetch,
    state: { GlobalHistory },
  } = useContext(GlobalContext);

  const [optList, setOptList] = useState([]);

  useEffect(() => {
    if (CountriesList) setOptList(CountriesList);
  }, [CountriesList]);

  const globalHisData = GlobalHistory.map(date => {
    const dateFormat = new Date(date.reportDate);
    const reportDate = dashDate(dateFormat, dateOption);
    return {
      totalConfirmed: date.confirmed.total,
      totalDeaths: date.deaths.total,
      reportDate,
    };
  });

  return (
    <div>
      <DataOption optList={optList} />
      <StatChart statData={globalHisData} />
    </div>
  );
};

export default CaseStats;
