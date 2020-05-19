/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { formatNumber } from '../../context/constant';

const ChartLine = ({ lineChartData, placeName, error }) => {
  return (
    <>
      <Grid container item xs={12} justify="center">
        {error ? (
          <Alert variant="filled" severity="error">
            {`No Timeline Data for ${placeName}`}
          </Alert>
        ) : (
          <Typography variant="h5">
            {`${placeName}'s Cases Timeline`}
          </Typography>
        )}
      </Grid>
      <ResponsiveContainer minWidth={500} height={550}>
        <LineChart
          data={lineChartData}
          margin={{ top: 5, bottom: 5, left: 25 }}
          padding={{ top: 5, right: 10, bottom: 5, left: 10 }}
        >
          <Line
            dot={false}
            type="linear"
            dataKey="totalCases"
            stroke="rgb(245, 118, 92)"
            activeDot={{ strokeWidth: 2, r: 6 }}
          />
          <Line
            dot={false}
            type="linear"
            activeDot={{ strokeWidth: 2, r: 6 }}
            dataKey="totalDeaths"
            stroke="#000000"
          />
          <Line
            dot={false}
            type="linear"
            dataKey="totalRecovered"
            stroke="rgb(55, 194, 102)"
            activeDot={{ strokeWidth: 2, r: 6 }}
          />
          <CartesianGrid stroke="#CCC" strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={tick => formatNumber(tick)} />
          <Legend
            formatter={v => {
              return v === 'totalCases'
                ? 'Confirmed cases'
                : v === 'totalDeaths'
                ? 'Death cases'
                : 'Recovered cases';
            }}
          />
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
      </ResponsiveContainer>
    </>
  );
};

export default ChartLine;
