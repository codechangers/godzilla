import React from 'react';
import { Typography } from '@material-ui/core';
import { getLiveTeacherCheckOffsData } from '../../../hooks/items';

const CheckOffList = () => {
  const checkOffs = getLiveTeacherCheckOffsData();
  return checkOffs.map(co => (
    <Typography variant="body1" key={co.id}>
      {co.gameRef.id}
    </Typography>
  ));
};

export default CheckOffList;
