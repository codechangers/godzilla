import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import AcceptedOrganization from './AcceptedOrganization';
import DeclinedOrganization from './DeclinedOrganization';
import PendingOrganization from './PendingOrganization';

const OrganizationDashboard = props => {
  const { user, accounts } = props;
  let Dashboard = null;
  if (user.isSignedIn && accounts.organizations) {
    const org = accounts.organizations.data();
    if (org.isVerrified) {
      Dashboard = AcceptedOrganization;
    } else {
      Dashboard = org.isDeclined ? DeclinedOrganization : PendingOrganization;
    }
  }
  return Dashboard ? <Dashboard {...props} /> : <Redirect to="/login" />;
};

OrganizationDashboard.propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default OrganizationDashboard;
