import React, { useState, useEffect, memo } from 'react';
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps';

// eslint-disable-next-line max-len
const geoUrl = `https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json`;

const rounded = num => {
  if (num > 1000000000) {
    return `${Math.round(num / 100000000) / 10}Bn`;
  }
  if (num > 1000000) {
    return `${Math.round(num / 100000) / 10}M`;
  }
  return `${Math.round(num / 100) / 10}K`;
};

const TooltipMap = ({ setTooltip }) => {
  const [country, setCountry] = useState(null);
  const allCountry = document.querySelectorAll('.standard');
  const handleClick = e => {
    setCountry(e.target);
  };
  const Geo = ({ geographies }) =>
    geographies.map(geo => (
      <Geography
        key={geo.rsmKey}
        geography={geo}
        className="standard"
        onMouseEnter={() => {
          const {
            properties: { NAME, POP_EST },
          } = geo;
          setTooltip(`${NAME} — ${rounded(POP_EST)}`);
        }}
        onClick={handleClick}
        onMouseLeave={() => setTooltip('')}
        style={{
          hover: {
            fill: '#F53',
            outline: 'none',
          },
          pressed: {
            fill: '#E42',
            outline: 'none',
          },
        }}
      />
    ));

  useEffect(() => {
    allCountry.forEach(el => el.classList.remove('selected'));
    if (country) return country.classList.add('selected');
  }, [handleClick]);

  return (
    <ComposableMap
      data-tip=""
      width={720}
      height={600}
      style={{ maxWidth: '100vw', maxHeight: '90vh', border: 'solid 1px rgb(0,0,0)' }}
    >
      <Graticule stroke="#f0f0f0" />
      <Geographies geography={geoUrl}>{Geo}</Geographies>
    </ComposableMap>
  );
};

export default memo(TooltipMap);
