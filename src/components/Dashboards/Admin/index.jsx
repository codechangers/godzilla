import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Redirect } from 'react-router-dom';
import AdminTeacherPage from './TeacherPage';
import AdminOrganizationPage from './OrganizationPage';
import { PageWrapper } from '../styles';
import ProfileInterface from '../../Interfaces/Profile';
import SideBar from '../../UI/SideBar';
import TabPanel from '../../UI/TabPanel';
import autoBind from '../../../autoBind';

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const routeToInterface = {
  '/admin': null,
  '/admin/profile': ProfileInterface
};

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherOrgToggle: 0,
      shouldShowSideDrawer: false
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  getTeacherRequests() {
    return (
      <AdminTeacherPage
        db={this.db}
        firebase={this.firebase}
        showSideDrawer={this.state.shouldShowSideDrawer}
        toggleDrawer={() => this.toggleSideDrawer()}
      />
    );
  }

  getOrgRequests() {
    return (
      <AdminOrganizationPage
        db={this.db}
        firebase={this.firebase}
        showSideDrawer={this.state.shouldShowSideDrawer}
        toggleDrawer={() => this.toggleSideDrawer()}
      />
    );
  }

  getSideDrawerButton() {
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={this.toggleSideDrawer}
        edge="start"
        className="side-drawer-button"
      >
        <MenuIcon />
      </IconButton>
    );
  }

  toggleTeacherOrg(_, value) {
    let { teacherOrgToggle } = this.state;
    teacherOrgToggle = value;
    this.setState({ teacherOrgToggle });
  }

  toggleSideDrawer() {
    let { shouldShowSideDrawer } = this.state;
    shouldShowSideDrawer = !shouldShowSideDrawer;
    this.setState({ shouldShowSideDrawer });
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
          names={['Profile', 'Dashboard', 'Parent Dash', 'Teacher Dash']}
          baseRoute="/admin"
          firebase={firebase}
        />
        {this.getInterface() || (
          <div>
            <h1>Hello Admin</h1>
            <Tabs
              value={this.state.teacherOrgToggle}
              onChange={this.toggleTeacherOrg}
              indicatorColor="primary"
            >
              <Tab label="Teacher Requests" />
              <Tab label="Organization Requests" />
            </Tabs>
            <TabPanel value={this.state.teacherOrgToggle} index={0}>
              <div className="admin-dashboard">{this.getTeacherRequests()}</div>
            </TabPanel>
            <TabPanel value={this.state.teacherOrgToggle} index={1}>
              <div className="admin-dashboard">{this.getOrgRequests()}</div>
            </TabPanel>
          </div>
        )}
      </PageWrapper>
    ) : (
      <Redirect to="/login" />
    );
  }
}

AdminDashboard.propTypes = propTypes;

export default AdminDashboard;
