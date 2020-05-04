/* eslint-disable no-nested-ternary */
import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/store';

import './style/Header.css';

const HeaderSum = ({ summary }) => {
  const formatNumber = num => new Intl.NumberFormat().format(num);
  const {
    NewConfirmed,
    TotalConfirmed,
    NewDeaths,
    TotalDeaths,
    NewRecovered,
    TotalRecovered,
  } = summary;
  const caseType = ['Confirmed', 'Deaths', 'Recovered'];
  const headerData = caseType.map(type => {
    return {
      typeCase: type,
      totalCase:
        type === 'Confirmed'
          ? TotalConfirmed
          : type === 'Deaths'
          ? TotalDeaths
          : TotalRecovered,
      newCase:
        type === 'Confirmed'
          ? NewConfirmed
          : type === 'Deaths'
          ? NewDeaths
          : NewRecovered,
      colorCase:
        type === 'Confirmed'
          ? `rgb(92, 146, 245)`
          : type === 'Deaths'
          ? `inherit`
          : `rgb(76, 201, 117)`,
    };
  });

  return headerData.map(({ typeCase, newCase, totalCase, colorCase }) => {
    return (
      <div key={typeCase} className="summary-casetype" style={{ color: colorCase }}>
        <span className="case-title">{typeCase}</span>
        <div className="summary-casedata">
          <div className="summary-data">
            <p className="data-title">Total</p>
            <p className="data-number">{formatNumber(totalCase)}</p>
          </div>
          <div className="summary-data">
            <p className="data-title">New</p>
            <p className="data-number">{formatNumber(newCase)}</p>
          </div>
        </div>
      </div>
    );
  });
};

const Header = () => {
  const {
    state: { Global, UpdateDate },
  } = useContext(GlobalContext);

  const [formatDate, setFormatDate] = useState(null);
  useEffect(() => {
    if (UpdateDate) {
      setFormatDate(new Date(UpdateDate).toUTCString());
    }
  }, [UpdateDate]);

  return (
    <div className="app-header">
      <div className="app-title">
        <h1>Covid19Watcher</h1>
        <p>Global tracker for Covid-19 Pandemic</p>
      </div>
      <div className="header-summary">
        <p className="summary-title">Global Cases</p>
        {formatDate && <p className="summary-date">{`Last updated: ${formatDate}`}</p>}
        <div className="summary-container">
          <HeaderSum summary={Global} />
        </div>
      </div>
    </div>
  );
};

export default Header;
