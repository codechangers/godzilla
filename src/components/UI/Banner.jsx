import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, makeStyles } from '@material-ui/core';

const Banner = ({ onClick, buttonText, stripeIsLinked }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.upper}>
        <Typography variant="h3" className={classes.header}>
          Educator Dashboard
        </Typography>
        <Button
          variant="contained"
          disabled={!stripeIsLinked}
          onClick={onClick}
          color="primary"
          className={classes.button}
        >
          {buttonText}
        </Button>
      </div>
      <div className={classes.lower} id="background1-img" />
    </div>
  );
};

Banner.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  stripeIsLinked: PropTypes.bool
};

Banner.defaultProps = {
  buttonText: 'Create New',
  onClick: () => null,
  stripeIsLinked: true
};

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 40
  },
  upper: {
    width: '100%',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  header: {
    flexGrow: 1,
    marginRight: 12,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 12,
      marginBottom: 8,
      textAlign: 'center'
    }
  },
  button: {
    flexGrow: 0,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 8,
      flexGrow: 1
    }
  },
  lower: {
    width: '100%',
    height: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    [theme.breakpoints.down('xs')]: {
      height: 100
    }
  }
}));

export default Banner;
