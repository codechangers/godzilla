import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../UI/NavBar';

const PendingOrganization = ({ firebase, accounts }) => (
  <div>
    <NavBar accounts={accounts} firebase={firebase} />
    <h1>Welcome to the Pending Organization Dashboard</h1>
  </div>
);

PendingOrganization.propTypes = {
  firebase: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default PendingOrganization;
