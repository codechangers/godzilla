import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AcceptedOrganization from './AcceptedOrganization';
import DeclinedOrganization from './DeclinedOrganization';
import PendingOrganization from './PendingOrganization';
import ProfileInterface from '../../Interfaces/Profile';
import { PageWrapper } from '../styles';
import SideBar from '../../UI/SideBar';

const routeToInterface = {
  '/organization': null,
  '/organization/profile': ProfileInterface
};

const OrganizationDashboard = props => {
  const { user, accounts } = props;
  const getInterface = () => {
    const Interface = routeToInterface[props.location.pathname];
    const { firebase, db, user, accounts } = props;
    return Interface === null ? null : <Interface {...{ firebase, db, user, accounts }} />;
  };
  let Dashboard = null;
  if (user.isSignedIn && accounts.organizations) {
    const org = accounts.organizations.data();
    if (org.isVerrified) {
      Dashboard = AcceptedOrganization;
    } else {
      Dashboard = org.isDeclined ? DeclinedOrganization : PendingOrganization;
    }
  }
  return Dashboard ? (
    <PageWrapper>
      <SideBar
        names={['Profile', 'Dashboard']}
        baseRoute="/organization"
        firebase={props.firebase}
      />
      {getInterface() || <Dashboard {...props} />}
    </PageWrapper>
  ) : (
    <Redirect to="/login" />
  );
};

OrganizationDashboard.propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default OrganizationDashboard;
