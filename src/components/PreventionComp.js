import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import prevention1 from '../images/prevention1.jpg';
import prevention2 from '../images/prevention2.png';
import prevention3 from '../images/prevention3.png';
import prevention4 from '../images/prevention4.png';
import prevention5 from '../images/prevention5.png';
import prevention6 from '../images/prevention6.png';

const useStyles = makeStyles({
  preventionTitle: {
    textAlign: 'center',
    margin: '12px 0',
    fontSize: '2.1rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    backgroundColor: '#1d8ab6',
    color: 'rgb(237,237,237)',
    padding: '18px 0',
  },
  preventionContainer: {
    padding: '8px 21px',
    marginBottom: '24px',
    '& img': {
      width: '90%',
      margin: '12px auto',
    },
  },
});

const PreventionComp = () => {
  const classes = useStyles();
  return (
    <>
      <p className={classes.preventionTitle}>Stop the spread</p>
      <Grid container className={classes.preventionContainer}>
        <Grid container item xs={12} md={6} lg={4} justify="center">
          <img src={prevention1} alt="" />
        </Grid>
        <Grid container item xs={12} md={6} lg={4} justify="center">
          <img src={prevention2} alt="" />
        </Grid>
        <Grid container item xs={12} md={6} lg={4} justify="center">
          <img src={prevention3} alt="" />
        </Grid>
        <Grid container item xs={12} md={6} lg={4} justify="center">
          <img src={prevention4} alt="" />
        </Grid>
        <Grid container item xs={12} md={6} lg={4} justify="center">
          <img src={prevention5} alt="" />
        </Grid>
        <Grid container item xs={12} md={6} lg={4} justify="center">
          <img src={prevention6} alt="" />
        </Grid>
      </Grid>
    </>
  );
};

export default PreventionComp;
