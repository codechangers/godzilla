import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Redirect } from 'react-router-dom';
import AdminTeacherPage from './TeacherPage';
import AdminOrganizationPage from './OrganizationPage';
import NavBar from '../../UI/NavBar';
import TabPanel from '../../UI/TabPanel';
import autoBind from '../../../autoBind';

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
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

  render() {
    return this.props.user.isSignedIn ? (
      <div className="admin-dashboard">
        <NavBar
          accounts={this.props.accounts}
          firebase={this.firebase}
          getMenuButton={this.getSideDrawerButton}
        />
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
    ) : (
      <Redirect to="/login" />
    );
  }
}

AdminDashboard.propTypes = propTypes;

export default AdminDashboard;
