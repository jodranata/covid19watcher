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
  return (
    <LineChart
      width={800}
      height={500}
      data={statData}
      margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
    >
      <Line
        dot={false}
        type="linear"
        dataKey="totalConfirmed"
        stroke="rgb(245, 118, 92)"
      />
      <Line dot={false} type="linear" dataKey="totalDeaths" stroke="#000000" />
      <CartesianGrid stroke="#CCC" />
      <XAxis dataKey="reportDate" />
      <YAxis tickFormatter={tick => formatNumber(tick)} />
      <Tooltip
        formatter={(num, name) => [
          formatNumber(num),
          name === 'totalConfirmed' ? 'Confirmed' : 'Deaths',
        ]}
        animationEasing="ease-in"
      />
    </LineChart>
  );
};

export default StatChart;
