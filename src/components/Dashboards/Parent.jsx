import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar';

const ParentDashboard = ({ firebase, user, accounts }) =>
  user.isSignedIn ? (
    <div>
      <NavBar accounts={accounts} firebase={firebase} />
      <h1>Welcome to the Parent Dashboard</h1>
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
