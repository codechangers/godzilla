import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TeacherRequest from '../Requests/Teacher';
import Logout from '../Logout';
import Spinner from '../Spinner';
import autoBind from '../../autoBind';
import '../../assets/css/Admin.css';
import OrganizationRequest from '../Requests/Organization';

let cancelTeacherSub = () => {};
let cancelOrganizationSub = () => {};

const collectionToDataMember = {
  teachers: 'teacherReqs',
  organizations: 'orgReqs'
};

const collectionToLoadingType = {
  teachers: 'isLoadingTeachers',
  organizations: 'isLoadingOrgs'
};

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingTeachers: true,
      isLoadingOrgs: true,
      teacherReqs: [],
      orgReqs: []
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  componentDidMount() {
    cancelTeacherSub = this.getRequestsFromCollection('teachers');
    cancelOrganizationSub = this.getRequestsFromCollection('organizations');
  }

  componentWillUnmount() {
    cancelTeacherSub();
    cancelOrganizationSub();
  }

  getRequestsFromCollection(col) {
    return this.db.collection(col).onSnapshot(users => {
      const requests = users.docs.map(u => ({ id: u.id, ...u.data() }));
      const newState = {};
      newState[collectionToDataMember[col]] = requests
        .filter(t => !t.isVerrified)
        .filter(t => !t.isDeclined);
      newState[collectionToLoadingType[col]] = false;
      this.setState({ ...newState });
    });
  }

  getTeacherRequests() {
    return this.state.isLoadingTeachers ? (
      <Spinner color="primary" />
    ) : (
      this.state.teacherReqs.map(teacher => (
        <TeacherRequest
          db={this.db}
          teacher={teacher}
          acceptRequest={t => this.acceptRequest(t, 'teachers')}
          declineRequest={t => this.declineRequest(t, 'teachers')}
          key={teacher.id}
        />
      ))
    );
  }

  getOrgRequests() {
    return this.state.isLoadingOrgs ? (
      <Spinner color="primary" />
    ) : (
      this.state.orgReqs.map(org => (
        <OrganizationRequest
          org={org}
          acceptRequest={o => this.acceptRequest(o, 'organizations')}
          declineRequest={o => this.declineRequest(o, 'organizations')}
          key={org.id}
        />
      ))
    );
  }

  acceptRequest(user, collection) {
    this.db
      .collection(collection)
      .doc(user.id)
      .update({ isVerrified: true });
  }

  declineRequest(user, collection) {
    this.db
      .collection(collection)
      .doc(user.id)
      .update({ isDeclined: true });
  }

  render() {
    return this.props.user.isSignedIn ? (
      <div className="admin-dashboard">
        <h1>Hello Admin</h1>
        <Logout firebase={this.firebase} />
        <h4>Teacher Requests:</h4>
        {this.state.teacherReqs.length > 0 || this.state.isLoadingTeachers ? (
          this.getTeacherRequests()
        ) : (
          <h2>There are currently no teacher requests</h2>
        )}
        <h4>Organization Requests:</h4>
        {this.state.orgReqs.length > 0 || this.state.isLoadingOrgs ? (
          this.getOrgRequests()
        ) : (
          <h2>There are currently no organization requests</h2>
        )}
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

AdminDashboard.propTypes = propTypes;

export default AdminDashboard;
