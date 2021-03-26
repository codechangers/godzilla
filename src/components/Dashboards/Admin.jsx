import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { PageWrapper } from './styles';
import AccountRequests from '../Interfaces/AccountRequests';
import StudentIDs from '../Interfaces/StudentIDs';
import ProfileInterface from '../Interfaces/Profile';
import SideBar from '../UI/SideBar';

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const routeToInterface = {
  '/admin': AccountRequests,
  '/admin/ids': StudentIDs,
  '/admin/profile': ProfileInterface
};

const AdminDashboard = ({ firebase, db, user, accounts, location }) => {
  const getInterface = () => {
    const Interface = routeToInterface[location.pathname];
    return Interface === null ? null : <Interface {...{ firebase, db, user, accounts }} />;
  };

  return user.isSignedIn ? (
    <PageWrapper>
      <SideBar
        names={['Profile', 'Dashboard', 'Student IDs', 'Parent Dash', 'Teacher Dash']}
        baseRoute="/admin"
        firebase={firebase}
      />
      {getInterface()}
    </PageWrapper>
  ) : (
    <Redirect to="/login" />
  );
};

AdminDashboard.propTypes = propTypes;

export default AdminDashboard;
