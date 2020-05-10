import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { formatNumber } from '../../context/constant';

const StatChart = ({ statData }) => {
  console.log(statData);
  return (
    <LineChart
      width={800}
      height={450}
      data={statData}
      margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
    >
      <Line
        dot={false}
        type="linear"
        dataKey="totalCases"
        stroke="rgb(245, 118, 92)"
      />
      <Line dot={false} type="linear" dataKey="totalDeaths" stroke="#000000" />
      <Line
        dot={false}
        type="linear"
        dataKey="totalRecovered"
        stroke="rgb(55, 194, 102)"
      />
      {/* <CartesianGrid stroke="#CCC" strokeDasharray="5 5" /> */}
      <XAxis dataKey="date" />
      <YAxis tickFormatter={tick => formatNumber(tick)} />
      <Tooltip
        formatter={(num, name) => [
          formatNumber(num),
          name === 'totalCases'
            ? 'Confirmed'
            : name === 'totalDeaths'
            ? 'Deaths'
            : 'Recovered',
        ]}
        animationEasing="ease-in"
      />
    </LineChart>
  );
};

export default StatChart;
