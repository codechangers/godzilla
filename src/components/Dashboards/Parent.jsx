import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Logout from '../Logout';

const ParentDashboard = ({ firebase, user }) =>
  user.isSignedIn ? (
    <div>
      <h1>Welcome to the Parent Dashboard</h1>
      <Logout firebase={firebase} />
    </div>
  ) : (
    <Redirect to="/" />
  );

ParentDashboard.propTypes = {
  firebase: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default ParentDashboard;
