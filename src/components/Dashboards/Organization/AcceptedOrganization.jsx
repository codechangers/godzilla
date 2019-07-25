import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../NavBar';

const AcceptedOrganization = ({ firebase, accounts }) => (
  <div>
    <NavBar accounts={accounts} firebase={firebase} />
    <h1>Welcome to the Accepted Organization Dashboard</h1>
  </div>
);

AcceptedOrganization.propTypes = {
  firebase: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default AcceptedOrganization;
