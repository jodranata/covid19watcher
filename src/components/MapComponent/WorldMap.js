import React, { useState, useContext, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

import { InitContext } from '../../context/store';
import { createCountriesList } from '../../context/constant';
import TooltipMap from './TooltipMap';

const WorldMap = () => {
  const [tooltip, setTooltip] = useState('');
  const {
    initState: { countriesCases },
  } = useContext(InitContext);

  const [countriesList, setCountriesList] = useState(null);
  useEffect(() => {
    if (Array.isArray(countriesCases) || countriesCases.length) {
      const list = createCountriesList(countriesCases);
      setCountriesList(list);
    }
  }, [countriesCases]);

  return (
    <div className="map-viewbox">
      {countriesCases && (
        <TooltipMap setTooltip={setTooltip} dataCountries={countriesList} />
      )}

      <ReactTooltip multiline className="country-tooltip">
        {tooltip}
      </ReactTooltip>
    </div>
  );
};

export default WorldMap;
