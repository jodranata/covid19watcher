import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// eslint-disable-next-line max-len
const geoUrl = `https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json`;
const WorldMap = () => {
  const Geo = ({ geographies }) =>
    geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />);
  return (
    <div>
      <div>
        <ComposableMap>
          <Geographies geography={geoUrl}>{Geo}</Geographies>
        </ComposableMap>
      </div>
    </div>
  );
};

export default WorldMap;
