import React, { useContext, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { InitContext, DataContext } from '../../context/store';
import ChartLine from './ChartLine';
import ChartPie from './ChartPie';
import DataOption from './DataOption';

import { sortTimeline, createCountriesList } from '../../context/constant';

const useStyles = makeStyles({
  dataOption: {
    marginBottom: '50px',
  },
  charts: {
    '& > *': {
      padding: '0 30px',
    },
    padding: '15px 0 35px 0',
  },
  chartLine: {
    padding: '0 8px',
    marginBottom: '55px',
  },
  chartPie: {
    padding: '0 8px',
  },
});

const CaseStats = () => {
  const {
    initState: { globalHis, countriesCases, todaySum },
  } = useContext(InitContext);
  const {
    dataState: { countryCases, dataErrors },
  } = useContext(DataContext);
  const classes = useStyles();
  const [useCountryData, setUseCountryData] = useState(false);
  const [optList, setOptList] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [hisPlace, setHisPlace] = useState('Global');
  const [globalOption, setGlobalOption] = useState([]);
  const [pieData, setPieData] = useState({});

  useEffect(() => {
    if (todaySum) {
      const {
        active,
        cases,
        deaths,
        recovered,
        critical,
        todayCases,
        todayDeaths,
      } = todaySum;
      const globOption = {
        countryName: 'Global',
        countryIso: 'GLOB',
        countryID: 'GLOB',
        countryCases: cases,
        countryDeaths: deaths,
        countryRecovered: recovered,
        countryActive: active,
        countryCritical: critical,
        countryFlag: null,
        countryTodayCases: todayCases,
        countryTodayDeaths: todayDeaths,
      };

      setGlobalOption(globOption);
    }
  }, [todaySum]);

  useEffect(() => {
    if (countryCases.timeline && useCountryData && !dataErrors) {
      setChartData(sortTimeline(countryCases.timeline));
    } else if (dataErrors || !countryCases.timeline) {
      setChartData(sortTimeline(globalHis));
    }
  }, [useCountryData, countryCases, globalHis, dataErrors]);

  useEffect(() => {
    if (Array.isArray(countriesCases) && countriesCases.length) {
      const list = createCountriesList(countriesCases);

      setOptList([globalOption].concat(list));
      setPieData(globalOption);
    }
  }, [countriesCases, globalOption]);

  return (
    <Grid>
      <Grid item xs={12} className={classes.dataOption}>
        <DataOption
          optList={optList}
          setUseData={setUseCountryData}
          setPieData={setPieData}
          setHisPlace={setHisPlace}
        />
      </Grid>
      <Grid container className={classes.charts}>
        <Grid item container xs={12} md={7} className={classes.chartLine}>
          <ChartLine
            lineChartData={chartData}
            placeName={hisPlace}
            error={dataErrors}
          />
        </Grid>
        <Grid item container xs={12} md={5} className={classes.chartPie}>
          <ChartPie pieChartData={pieData} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CaseStats;
