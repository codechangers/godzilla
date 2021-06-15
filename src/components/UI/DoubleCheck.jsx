import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const propTypes = {
  page: PropTypes.string.isRequired
};

const DoubleCheck = ({ page }) => {
  return (
    <div>
      <Typography variant="h6">DoubleCheck - {page}</Typography>
    </div>
  );
};
DoubleCheck.propTypes = propTypes;

export default DoubleCheck;
