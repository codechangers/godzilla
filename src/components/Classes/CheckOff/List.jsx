import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { getLiveClassCheckOffsData } from '../../../hooks/items';

const propTypes = {
  cls: PropTypes.object.isRequired
};

const CheckOffList = ({ cls }) => {
  const checkOffs = getLiveClassCheckOffsData(cls.id);
  return checkOffs.map(co => (
    <Typography variant="body1" key={co.id}>
      {co.gameRef.id}
    </Typography>
  ));
};
CheckOffList.propTypes = propTypes;

export default CheckOffList;
