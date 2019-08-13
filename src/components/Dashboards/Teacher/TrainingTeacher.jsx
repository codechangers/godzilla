import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../UI/NavBar';

const TrainingTeacher = ({ firebase, accounts }) => (
  <div>
    <NavBar accounts={accounts} firebase={firebase} />
    <h1>Welcome to the Training Teacher Dashboard</h1>
  </div>
);

TrainingTeacher.propTypes = {
  firebase: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default TrainingTeacher;
