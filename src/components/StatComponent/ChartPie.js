/* eslint-disable no-nested-ternary */
import React, { useState, memo, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import CountUp from 'react-countup';

import { formatNumber } from '../../context/constant';

const COLORS = ['#000000', '#37c266', '#f5765c'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + (radius + 65) * Math.cos(-midAngle * RADIAN);
  const y = cy + (radius + 75) * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x + 7}
      y={y}
      fill="#000000"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const useStyles = makeStyles({
  pieDetail: {
    textAlign: 'center',
  },
  detailTitle: {
    marginBottom: '30px',
  },
  detailPlace: {
    position: 'relative',
    fontSize: '2.5rem',
    fontWeight: '300',
  },
  flagBorder: {
    position: 'absolute',
    transform: 'translate(-110%, -75%)',
    border: '5px solid blue',
    borderRadius: '50%',
    padding: '5px',
    transition: 'ease-in 0.5s',
  },
  detailFlag: {
    width: '65px',
    height: '65px',
  },
  detailContent: {
    fontSize: '1.2rem',
    fontWeight: '300',
    '& > *': {
      margin: '7px 0',
      padding: '2px 5px',
    },
  },
});

const ChartPie = ({ pieChartData }) => {
  const [pieDetail, setPieDetail] = useState([]);
  const [pieData, setPieData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (
      Object.keys(pieChartData).length !== 0 &&
      pieChartData.constructor === Object
    ) {
      const pieDataDetail = {
        place: pieChartData.countryName,
        total: pieChartData.countryCases,
        todayCases: pieChartData.countryTodayCases,
        todayDeaths: pieChartData.countryTodayDeaths,
        critical: pieChartData.countryCritical,
        flag: pieChartData.countryFlag,
      };

      const pieDataObj = Object.entries(pieChartData)
        .filter(
          entry =>
            entry[0] === 'countryActive' ||
            entry[0] === 'countryDeaths' ||
            entry[0] === 'countryRecovered',
        )
        .reduce((acc, curr) => {
          const objData = {
            name: curr[0],
            value: curr[1],
          };
          return [...acc, objData];
        }, []);
      setPieDetail(pieDataDetail);
      setPieData(pieDataObj);
    }
  }, [pieChartData]);

  return (
    <>
      <Grid container className={classes.pieDetail}>
        <Grid
          item
          xs={12}
          container
          justify="center"
          className={classes.detailTitle}
        >
          <span className={classes.detailPlace}>
            {pieDetail.place}

            <Fade in={!!pieDetail.flag}>
              <div className={classes.flagBorder}>
                <Avatar
                  alt="country flag"
                  src={pieDetail.flag}
                  className={classes.detailFlag}
                />
              </div>
            </Fade>
          </span>
        </Grid>
        <Grid item xs={12} container className={classes.detailContent}>
          <Grid item xs={6}>
            <span>
              {`Total Cases: `}
              {pieDetail.total && (
                <CountUp
                  start={0}
                  end={pieDetail.total}
                  duration={1.8}
                  separator=","
                  delay={0}
                />
              )}
            </span>
          </Grid>
          <Grid item xs={6}>
            <span>
              {`Today Cases: `}
              {pieDetail.todayCases && (
                <CountUp
                  start={0}
                  end={pieDetail.todayCases}
                  duration={1.8}
                  separator=","
                  delay={0}
                />
              )}
            </span>
          </Grid>
          <Grid item xs={6}>
            <span>
              {`Today Deaths: `}
              {pieDetail.todayDeaths && (
                <CountUp
                  start={0}
                  end={pieDetail.todayDeaths}
                  duration={1.8}
                  separator=","
                  delay={0}
                />
              )}
            </span>
          </Grid>
          <Grid item xs={6}>
            <span>
              {`Critical: `}
              {pieDetail.critical && (
                <CountUp
                  start={0}
                  end={pieDetail.critical}
                  duration={1.8}
                  separator=","
                  delay={0}
                />
              )}
            </span>
          </Grid>
        </Grid>
      </Grid>
      <ResponsiveContainer minWidth={500} height={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine
            label={renderCustomizedLabel}
            outerRadius={100}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(num, name) => [
              formatNumber(num),
              name === 'countryActive'
                ? 'Active cases: '
                : name === 'countryDeaths'
                ? 'Deaths'
                : 'Recovered',
            ]}
            animationEasing="ease-in"
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default memo(ChartPie);
