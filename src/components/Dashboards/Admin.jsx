import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Logout from '../Logout';
import Spinner from '../Spinner';
import autoBind from '../../autoBind';
import '../../assets/css/Admin.css';

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
      newState[collectionToDataMember[col]] = requests.filter(t => !t.isVerrified);
      newState[collectionToLoadingType[col]] = false;
      this.setState({ ...newState });
    });
  }

  getTeacherRequests() {
    return this.state.isLoadingTeachers ? (
      <Spinner color="primary" />
    ) : (
      this.state.teacherReqs.map(teacher => (
        <div className="teacher-request" key={teacher.id}>
          <p>{`${teacher.fName} ${teacher.lName}`}</p>
          <button
            type="button"
            onClick={() => {
              this.acceptRequest(teacher, 'teachers');
            }}
          >
            Accept
          </button>
        </div>
      ))
    );
  }

  getOrgRequests() {
    return this.state.isLoadingOrgs ? (
      <Spinner color="primary" />
    ) : (
      this.state.orgReqs.map(org => (
        <div className="org-request" key={org.id}>
          <p>{`${org.name}`}</p>
          <button
            type="button"
            onClick={() => {
              this.acceptRequest(org, 'organizations');
            }}
          >
            Accept
          </button>
        </div>
      ))
    );
  }

  acceptRequest(user, collection) {
    this.db
      .collection(collection)
      .doc(user.id)
      .update({ isVerrified: true });
  }

  render() {
    return this.props.user.isSignedIn ? (
      <div className="admin-dashboard">
        <h1>Hello Admin</h1>
        <Logout firebase={this.firebase} />
        <h4>Teacher Requests:</h4>
        {this.getTeacherRequests()}
        <h4>Organization Requests:</h4>
        {this.getOrgRequests()}
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

AdminDashboard.propTypes = propTypes;

export default AdminDashboard;
