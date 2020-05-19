import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import GithubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles({
  footerBar: {
    bottom: '0',
    position: 'relative',
    padding: '20px 0 8px 0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: '300',
    backgroundColor: 'rgb(64,64,64)',
    '& .footer-content': {
      color: 'rgb(237,237,237)',
      '& a': {
        textDecoration: 'none',
        color: 'inherit',
      },
      '& a.source-link': {
        textDecoration: 'underline',
        textDecorationColor: 'rgb(237,237,237)',
      },
      '& > *': {
        margin: '3px 0',
      },
      '& .footer-links': {
        margin: '5px 0 0 0',
        '& .footer-link': {
          '& svg': {
            top: '2px',
            backgroundColor: 'rgb(49,49,49)',
            padding: '7px',
            borderRadius: '50%',
            color: 'rgb(237,237,237)',
            boxShadow: '0 0 3px 1px rgba(23,23,23, 0.427)',
            margin: '7px 5px 0px 5px',
            backgroundPosition: 'center',
            transition: '0.6s',
            '&:hover': {
              // eslint-disable-next-line max-len
              background: `rgba(23,23,23) radial-gradient(circle, transparent 1%, rgb(23,23,23) 1%) center/15000%;`,
              color: 'rgb(255,255,245)',
              boxShadow: '0 0 8px 2px rgb(23,23,23)',
            },
          },
        },
      },
    },
  },
});

const FooterComp = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerBar}>
      <div className="footer-line" />
      <div className="footer-content">
        <div className="footer-source">
          {`Data provided by `}
          <a
            href="https://github.com/NovelCOVID/API"
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
          >
            NovelCovid API
          </a>
        </div>
        <div>©Jodi Pranata 2020</div>
        <div className="footer-links">
          <a
            href="mailto:prantajodi@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <EmailIcon color="error" />
          </a>
          <a
            href="https://www.linkedin.com/in/jodi-pranata/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://twitter.com/Jodranata"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://github.com/jodranata"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterComp;
