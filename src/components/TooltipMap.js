import React, { useState, useEffect, memo, useContext } from 'react';
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps';
import { scaleQuantize, scaleQuantile, scaleThreshold } from 'd3-scale';

import { GlobalContext } from '../context/store';

// eslint-disable-next-line max-len
const topoJSON = `https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json`;

const TooltipMap = ({ setTooltip }) => {
  const {
    state: { Countries },
  } = useContext(GlobalContext);
  const [country, setCountry] = useState(null);
  const [data, setData] = useState([]);

  const allCountry = document.querySelectorAll('.standard');
  const handleClick = e => {
    setCountry(e.target);
  };

  useEffect(() => {
    if (Countries) {
      setData(Countries);
    }
  }, [Countries]);

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.TotalConfirmed))
    .range([
      '#ffedea',
      '#ffcec5',
      '#ffad9f',
      '#ff8a75',
      '#ff5533',
      '#e2492d',
      '#be3d26',
      '#9a311f',
      '#782618',
    ]);
  const Geo = ({ geographies }) =>
    geographies.map(geo => {
      const {
        properties: { NAME, ISO_A2 },
      } = geo;
      const currCountry = data.find(curr => curr.CountryCode === ISO_A2);

      return (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          // className="standard"
          onMouseEnter={() => {
            setTooltip(`${NAME} — ${currCountry.TotalConfirmed}`);
          }}
          onClick={handleClick}
          fill={colorScale(currCountry ? currCountry.TotalConfirmed : '#EEE')}
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
      );
    });

  useEffect(() => {
    allCountry.forEach(el => el.classList.remove('selected'));
    if (country) return country.classList.add('selected');
  }, [allCountry, country]);

  return (
    <ComposableMap
      data-tip=""
      width={720}
      height={576}
      style={{ maxWidth: '100vw', maxHeight: '90vh', border: 'solid 1px rgb(0,0,0)' }}
    >
      <Graticule stroke="#e7e7e7" />
      <Geographies geography={topoJSON}>{Geo}</Geographies>
    </ComposableMap>
  );
};

export default memo(TooltipMap);
