import React, { useState, useEffect, memo, useCallback } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

import { scaleQuantile } from 'd3-scale';

// eslint-disable-next-line max-len
const topoJSON = `https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json`;
const colorRange = [
  '#E1E1E1',
  '#ffedea',
  '#faded9',
  '#fad6d0',
  '#fac2b8',
  '#fcb1a4',
  '#eb9383',
  '#e97c69',
  '#e77662',
  '#e26251',
  '#dd5a43',
  '#db4f3d',
  '#da4834',
  '#ca3724',
  '#bb301e',
  '#a32717',
  '#962010',
  '#7e150a',
  '#500800',
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
];

const formatNumber = num => new Intl.NumberFormat().format(num);
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
        curr => curr.CountryCode === ISO_A2,
      );
      const tooltip = `
      ${NAME} <br />
      Confirmed: ${
        currCountry ? formatNumber(currCountry.TotalConfirmed) : 'No Data'
      } <br />
      Deaths: ${
        currCountry ? formatNumber(currCountry.TotalDeaths) : 'No Data'
      } <br />
      Recovered: ${
        currCountry ? formatNumber(currCountry.TotalRecovered) : 'No Data'
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
          onClick={handleClick}
          fill={currCountry ? colorScale(currCountry.TotalConfirmed) : '#EEE'}
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
      width={720}
      height={540}
      style={{
        maxWidth: '100vw',
        maxHeight: '90vh',
      }}
    >
      <Geographies geography={topoJSON}>{Geo}</Geographies>
    </ComposableMap>
  );
};

export default memo(TooltipMap);
