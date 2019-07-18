import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar';
import autoBind from '../../autoBind';
import '../../assets/css/Admin.css';
import AdminTeacherPage from './Admin-TeacherPage';
import AdminOrganizationPage from './Admin-OrganizationPage';

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
      teacherOrgToggle: false
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  getTeacherRequests() {
    return <AdminTeacherPage db={this.db} firebase={this.firebase} />;
  }

  getOrgRequests() {
    return <AdminOrganizationPage db={this.db} firebase={this.firebase} />;
  }

  toggleTeacherOrg() {
    let { teacherOrgToggle } = this.state;
    teacherOrgToggle = !teacherOrgToggle;
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

  render() {
    return this.props.user.isSignedIn ? (
      <div className="admin-dashboard">
        <NavBar accounts={this.props.accounts} firebase={this.firebase} />
        <h1>Hello Admin</h1>
        {!this.state.teacherOrgToggle ? this.showTeachers() : this.showOrgs()}
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

AdminDashboard.propTypes = propTypes;

export default AdminDashboard;
