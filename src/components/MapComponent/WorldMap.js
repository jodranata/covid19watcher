import React, { useState, useContext } from 'react';
import ReactTooltip from 'react-tooltip';

import { GlobalContext } from '../../context/store';
import TooltipMap from './TooltipMap';

const WorldMap = () => {
  const [tooltip, setTooltip] = useState('');
  const {
    state: { Countries },
  } = useContext(GlobalContext);
  return (
    <div className="map-viewbox">
      {Countries && (
        <TooltipMap setTooltip={setTooltip} dataCountries={Countries} />
      )}

      <ReactTooltip multiline className="country-tooltip">
        {tooltip}
      </ReactTooltip>
    </div>
  );
};

export default WorldMap;
