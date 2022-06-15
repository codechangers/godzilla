import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { PageWrapper } from './styles';
import AccountRequests from '../Interfaces/AccountRequests';
import ProfileInterface from '../Interfaces/Profile';
import StudentIDs from '../Interfaces/StudentIDs';
import SideBar from '../UI/SideBar';

const propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const routeToInterface = {
  '/admin': AccountRequests,
  '/admin/profile': ProfileInterface,
  '/admin/ids': StudentIDs
};

const AdminDashboard = ({ user, accounts, location }) => {
  const getInterface = () => {
    const Interface = routeToInterface[location.pathname];
    return Interface === null ? null : <Interface {...{ user, accounts }} />;
  };

  return user.isSignedIn ? (
    <PageWrapper>
      <SideBar
        names={['Profile', 'Dashboard', 'Student IDs', 'Parent Dash', 'Teacher Dash']}
        baseRoute="/admin"
      />
      {getInterface()}
    </PageWrapper>
  ) : (
    <Redirect to="/login" />
  );
};

AdminDashboard.propTypes = propTypes;

export default AdminDashboard;
