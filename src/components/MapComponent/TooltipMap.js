import React, { useState, useEffect, memo, useCallback } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

import { scaleQuantile } from 'd3-scale';
import { formatNumber } from '../../context/constant';

// eslint-disable-next-line max-len
const topoJSON = `https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json`;
const colorRange = [
  '#b1b0b0',
  '#fffeb5',
  '#fffda0',
  '#fcfa8f',
  '#ffd079',
  '#ffb067',
  '#ffa34d',
  '#ff9838',
  '#ff8a2a',
  '#ff6a13',
  '#ff5709',
  '#f34500',
  '#f13000',
  '#e42200',
  '#d82000',
  '#c71700',
  '#bd0600',
  '#a70404',
  '#920000',
  '#520000',
];
const domainRange = [
  0,
  1,
  10,
  50,
  100,
  200,
  500,
  1000,
  2000,
  5000,
  10000,
  25000,
  50000,
  70000,
  80000,
  100000,
  150000,
  200000,
  250000,
  350000,
  500000,
];

const colorScale = scaleQuantile().domain(domainRange).range(colorRange);

const TooltipMap = ({ setTooltip, dataCountries }) => {
  const [country, setCountry] = useState(null);

  const handleClick = useCallback(e => {
    setCountry(e.target);
  }, []);

  const handleMouseLeave = useCallback(() => setTooltip(''), [setTooltip]);

  useEffect(() => {
    const allCountry = document.querySelectorAll('.standard');
    allCountry.forEach(el => el.classList.remove('selected'));
    if (country) return country.classList.add('selected');
  }, [country]);

  const Geo = ({ geographies }) =>
    geographies.map(geo => {
      const {
        properties: { NAME, ISO_A2 },
      } = geo;

      const currCountry = dataCountries.find(
        curr => curr.countryIso === ISO_A2,
      );
      const tooltip = `
      ${NAME} <br />
      Confirmed: ${
        currCountry ? formatNumber(currCountry.countryCases) : '0'
      } <br />
      Deaths: ${
        currCountry ? formatNumber(currCountry.countryDeaths) : '0'
      } <br />
      Recovered: ${
        currCountry ? formatNumber(currCountry.countryRecovered) : '0'
      } <br />
      `;

      const handleMouseEnter = () => {
        if (!dataCountries) return setTooltip('');
        setTooltip(tooltip);
      };

      return (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          className="standard"
          onMouseEnter={handleMouseEnter}
          fill={currCountry ? colorScale(currCountry.countryCases) : '#b1b1b1'}
          onMouseLeave={handleMouseLeave}
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
      );
    });

  return (
    <ComposableMap
      data-tip=""
      data-html
      width={860}
      height={540}
      style={{
        maxWidth: '100vw',
        maxHeight: '100vh',
      }}
    >
      <Geographies geography={topoJSON}>{Geo}</Geographies>
    </ComposableMap>
  );
};

export default memo(TooltipMap);
