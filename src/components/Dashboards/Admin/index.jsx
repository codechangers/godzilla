import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Redirect } from 'react-router-dom';
import NavBar from '../../NavBar';
import autoBind from '../../../autoBind';
import '../../../assets/css/Admin.css';
import AdminTeacherPage from './TeacherPage';
import AdminOrganizationPage from './OrganizationPage';

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

TabPanel.defaultProps = {
  children: []
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
      />
    );
  }

  getOrgRequests() {
    return (
      <AdminOrganizationPage
        db={this.db}
        firebase={this.firebase}
        showSideDrawer={this.state.shouldShowSideDrawer}
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
      >
        <MenuIcon />
      </IconButton>
    );
  }

  toggleTeacherOrg() {
    let { teacherOrgToggle } = this.state;
    if (teacherOrgToggle === 0) {
      teacherOrgToggle = 1;
    } else {
      teacherOrgToggle = 0;
    }
    // teacherOrgToggle = !teacherOrgToggle;
    this.setState({ teacherOrgToggle });
  }

  showTeachers() {
    return (
      <div className="admin-dashboard">
        <h4>Teacher Requests:</h4>
        <button type="submit" onClick={this.toggleTeacherOrg}>
          Switch to Organization Requests
        </button>
        {this.getTeacherRequests()}
      </div>
    );
  }

  showOrgs() {
    return (
      <div className="admin-dashboard">
        <h4>Organization Requests:</h4>
        <button type="submit" onClick={this.toggleTeacherOrg}>
          Switch to Teacher Requests
        </button>
        {this.getOrgRequests()}
      </div>
    );
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
        {/* {!this.state.teacherOrgToggle ? this.showTeachers() : this.showOrgs()} */}
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
      <Redirect to="/" />
    );
  }
}

AdminDashboard.propTypes = propTypes;

export default AdminDashboard;
