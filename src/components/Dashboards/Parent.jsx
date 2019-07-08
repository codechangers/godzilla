import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar';
import Logout from '../Logout';

const ParentDashboard = ({ firebase, user, accounts }) =>
  user.isSignedIn ? (
    <div>
      <NavBar accounts={accounts} />
      <h1>Welcome to the Parent Dashboard</h1>
      <Logout firebase={firebase} />
    </div>
  ) : (
    <Redirect to="/" />
  );

ParentDashboard.propTypes = {
  firebase: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default ParentDashboard;
