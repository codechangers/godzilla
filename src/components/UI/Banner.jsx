import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const Banner = ({ onClick, buttonText, stripeIsLinked }) => (
  <div className="banner-wrapper">
    <div className="upper">
      <h1>Educator Dashboard</h1>
      <Button variant="contained" disabled={!stripeIsLinked} onClick={onClick} color="primary">
        {buttonText}
      </Button>
    </div>
    <div className="lower" id="background1-img" />
  </div>
);

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

export default Banner;
