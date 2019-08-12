import React from 'react';
import { Paper } from '@material-ui/core';
import { Template2 } from '../Images';

const ClassInfoCard = () => (
  <Paper>
    <div className="infocard-header">
      <div>
        <h5>Name of Class</h5>
      </div>
      <Template2 />
    </div>
  </Paper>
);

export default ClassInfoCard;
