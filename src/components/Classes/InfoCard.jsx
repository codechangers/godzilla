import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, LinearProgress } from '@material-ui/core';
import { AccessTime, LocationOn } from '@material-ui/icons';
import { Template2 } from '../Images';

const SignUpsProgress = withStyles({
  root: {
    height: 6,
    backgroundColor: '#E0F4FD',
    borderRadius: 8
  },
  bar: {
    backgroundColor: '#00AFEF'
  }
})(LinearProgress);

const ClassInfoCard = () => (
  <Paper>
    <div className="infocard-header">
      <div>
        <h5>Name of Class</h5>
        <div className="inliner big">
          <p>Start Date: October 5, 2019</p>
          <p>End Date: October 5, 2019</p>
        </div>
        <div className="inliner">
          <p>6 Sessions</p>
          <p>
            <AccessTime fontSize="inherit" />
            7:30PM
          </p>
          <p>$100 per Student</p>
          <p>Hawkins Highschool</p>
          <p>
            <LocationOn fontSize="inherit" />
            825 W 60th St, Los Angeles, CA 90044
          </p>
        </div>
        <div className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
        <div className="progress-label">
          <h6>Students Sign-up</h6>
          <p>15/20 STUDENTS</p>
        </div>
        <SignUpsProgress
          className="progress-bar"
          variant="determinate"
          color="primary"
          value={75}
        />
        <div className="bottom-line" />
      </div>
      <Template2 />
    </div>
  </Paper>
);

export default ClassInfoCard;
