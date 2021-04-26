import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  page: PropTypes.string.isRequired
};

const CheckOff = ({ page }) => <div>Check Off: {page}</div>;
CheckOff.propTypes = propTypes;

export default CheckOff;
