import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { PageWrapper } from './styles';
import AccountRequests from '../Interfaces/AccountRequests';
import StudentIDs from '../Interfaces/StudentIDs';
import ProfileInterface from '../Interfaces/Profile';
import SideBar from '../UI/SideBar';
import autoBind from '../../autoBind';

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

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      shouldShowSideDrawer: false
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  getInterface() {
    const Interface = routeToInterface[this.props.location.pathname];
    const { firebase, db, user, accounts } = this.props;
    return Interface === null ? null : <Interface {...{ firebase, db, user, accounts }} />;
  }

  render() {
    const { firebase, user } = this.props;
    return user.isSignedIn ? (
      <PageWrapper>
        <SideBar
          names={['Profile', 'Dashboard', 'Student IDs', 'Parent Dash', 'Teacher Dash']}
          baseRoute="/admin"
          firebase={firebase}
        />
        {this.getInterface()}
      </PageWrapper>
    ) : (
      <Redirect to="/login" />
    );
  }
}

AdminDashboard.propTypes = propTypes;

export default AdminDashboard;
