import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import '../../assets/css/UI.css';

const Banner = ({ name, onClick, buttonText }) => (
  <div className="banner-wrapper" id="background1-img">
    <div className="name-box">
      <h3>{name}</h3>
    </div>
    <Button variant="contained" onClick={onClick} color="primary">
      {buttonText}
    </Button>
  </div>
);

Banner.propTypes = {
  name: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func
};

Banner.defaultProps = {
  buttonText: 'Create New',
  onClick: () => null
};

export default Banner;
