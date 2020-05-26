import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Tabs, Tab, Typography } from '@material-ui/core';
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
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const routeToInterface = {
  '/admin': null,
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

  getTeacherRequests() {
    return (
      <AdminTeacherPage
        db={this.db}
        firebase={this.firebase}
        showSideDrawer={this.state.shouldShowSideDrawer}
        toggleDrawer={() => null}
      />
    );
  }

  getOrgRequests() {
    return (
      <AdminOrganizationPage
        db={this.db}
        firebase={this.firebase}
        showSideDrawer={this.state.shouldShowSideDrawer}
        toggleDrawer={() => null}
      />
    );
  }

  getInterface() {
    const Interface = routeToInterface[this.props.location.pathname];
    const { firebase, db, user, accounts } = this.props;
    return Interface === null ? null : <Interface {...{ firebase, db, user, accounts }} />;
  }

  render() {
    const { firebase, user, classes } = this.props;
    const { tabIndex } = this.state;
    return user.isSignedIn ? (
      <PageWrapper>
        <SideBar
          names={['Profile', 'Dashboard', 'Parent Dash', 'Teacher Dash']}
          baseRoute="/admin"
          firebase={firebase}
        />
        {this.getInterface() || (
          <div className={classes.reqsWrapper}>
            <Typography variant="h2" style={{ marginBottom: '15px' }}>
              Account Requests
            </Typography>
            <Tabs
              value={tabIndex}
              onChange={(_, v) => this.setState({ tabIndex: v })}
              indicatorColor="primary"
            >
              <Tab label="Teacher Requests" />
              <Tab label="Organization Requests" />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
              <div className="admin-dashboard">{this.getTeacherRequests()}</div>
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
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

const styles = {
  reqsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px 8px 15px 8px'
  }
};

export default withStyles(styles)(AdminDashboard);
