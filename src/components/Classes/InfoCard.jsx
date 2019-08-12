import React from 'react';
import { Paper } from '@material-ui/core';
import { Template2 } from '../Images';

const ClassInfoCard = () => (
  <Paper>
    <div className="infocard-header">
      <div>
        <h5>Name of Class</h5>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{ marginRight: '24px' }}>Start Date: October 5, 2019</p>
          <p>End Date: October 5, 2019</p>
        </div>
      </div>
      <Template2 />
    </div>
  </Paper>
);

export default ClassInfoCard;
