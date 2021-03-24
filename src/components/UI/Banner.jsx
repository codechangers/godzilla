import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, makeStyles } from '@material-ui/core';

const Banner = ({ onClick, buttonText, stripeIsLinked }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.upper}>
        <Typography variant="h3">Educator Dashboard</Typography>
        <Button variant="contained" disabled={!stripeIsLinked} onClick={onClick} color="primary">
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

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    maxWidth: 1000,
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
    alignItems: 'center'
  },
  lower: {
    width: '100%',
    height: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  }
});

export default Banner;
