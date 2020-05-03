import React, { useState, useContext } from 'react';
import ReactTooltip from 'react-tooltip';
import { GlobalContext } from '../context/state';
import TooltipMap from './TooltipMap';

const WorldMap = () => {
  const { state } = useContext(GlobalContext);
  const [tooltip, setTooltip] = useState('');

  return (
    <div className="map-viewbox">
      <TooltipMap setTooltip={setTooltip} />
      <ReactTooltip>{tooltip}</ReactTooltip>
    </div>
  );
};

export default WorldMap;
