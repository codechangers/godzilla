import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Logout from '../Logout';

const OrganizationDashboard = ({ firebase, user }) =>
  user.isSignedIn ? (
    <div>
      <h1>Welcome to the Organization Dashboard</h1>
      <Logout firebase={firebase} />
    </div>
  ) : (
    <Redirect to="/" />
  );

OrganizationDashboard.propTypes = {
  firebase: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default OrganizationDashboard;
