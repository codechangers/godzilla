import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar';

const TeacherInTrainingDashboard = ({ firebase, user, accounts }) =>
  user.isSignedIn ? (
    <div>
      <NavBar accounts={accounts} firebase={firebase} />
      <h1>Welcome to the Teacher in Training Dashboard</h1>
    </div>
  ) : (
    <Redirect to="/" />
  );

TeacherInTrainingDashboard.propTypes = {
  firebase: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default TeacherInTrainingDashboard;
