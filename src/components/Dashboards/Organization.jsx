import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar';

const OrganizationDashboard = ({ firebase, user, accounts }) =>
  user.isSignedIn ? (
    <div>
      <NavBar accounts={accounts} firebase={firebase} />
      <h1>Welcome to the Organization Dashboard</h1>
    </div>
  ) : (
    <Redirect to="/" />
  );

OrganizationDashboard.propTypes = {
  firebase: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default OrganizationDashboard;
