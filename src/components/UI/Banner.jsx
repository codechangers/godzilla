import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import StripeConnect from './StripeConnect';
import '../../assets/css/UI.css';

const Banner = ({ name, onClick, buttonText, stripeIsLinked }) => (
  <div className="banner-wrapper" id="background1-img">
    <div className="name-box">
      <h3>{name}</h3>
    </div>
    {stripeIsLinked ? (
      <Button variant="contained" onClick={onClick} color="primary">
        {buttonText}
      </Button>
    ) : (
      <StripeConnect />
    )}
  </div>
);

Banner.propTypes = {
  name: PropTypes.string.isRequired,
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
