import React, { useState, useContext } from 'react';
import ReactTooltip from 'react-tooltip';

import { GlobalContext } from '../../context/store';
import TooltipMap from './TooltipMap';

const WorldMap = () => {
  const [tooltip, setTooltip] = useState('');
  const {
    state: { countriesCases },
  } = useContext(GlobalContext);

  return (
    <div className="map-viewbox">
      {countriesCases && (
        <TooltipMap setTooltip={setTooltip} dataCountries={countriesCases} />
      )}

      <ReactTooltip multiline className="country-tooltip">
        {tooltip}
      </ReactTooltip>
    </div>
  );
};

export default WorldMap;
