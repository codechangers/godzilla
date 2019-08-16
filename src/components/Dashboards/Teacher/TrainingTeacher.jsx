import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const completeTraining = (user, db) => {
  db.collection('teachers')
    .doc(user.uid)
    .update({ isTraining: false });
};

const TrainingTeacher = ({ user, db }) => (
  <div className="page-content horiz-center">
    <h1>Welcome to the Training Teacher Dashboard</h1>
    <h3 style={{ width: '60%', textAlign: 'left' }}>
      This dashboard is meant to help you prepare for your first codechangers class. We hope that
      after recieving training you will feel comfortable and confident in your ability to change the
      lives of your students by teaching them invaluable skills related to different STEM fields.
    </h3>
    <Button
      onClick={() => completeTraining(user, db)}
      variant="contained"
      color="primary"
      style={{ marginTop: '30px', width: '30%' }}
    >
      Next
    </Button>
  </div>
);

TrainingTeacher.propTypes = {
  user: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

export default TrainingTeacher;
