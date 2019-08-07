import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../NavBar';

const DeclinedOrganization = ({ firebase, accounts }) => (
  <div>
    <NavBar accounts={accounts} firebase={firebase} />
    <h1>Welcome to the Declined Organization Dashboard</h1>
  </div>
);

DeclinedOrganization.propTypes = {
  firebase: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default DeclinedOrganization;
