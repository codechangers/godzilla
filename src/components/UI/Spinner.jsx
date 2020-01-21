import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/Spinner.css';

const Spinner = ({ color }) => (
  <div className={`lds-ring ${color}`}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

Spinner.propTypes = {
  color: PropTypes.string
};
Spinner.defaultProps = {
  color: ''
};

export default Spinner;
