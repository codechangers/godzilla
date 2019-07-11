import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import TeacherRequest from '../Requests/Teacher';
import NavBar from '../NavBar';
// import Spinner from '../Spinner';
import autoBind from '../../autoBind';
import '../../assets/css/Admin.css';
// import OrganizationRequest from '../Requests/Organization';
import AdminTeacherPage from './Admin-TeacherPage';
import AdminOrganizationPage from './Admin-OrganizationPage';

// let cancelTeacherSub = () => {};
// let cancelOrganizationSub = () => {};

// const collectionToDataMember = {
//   teachers: 'teacherReqs',
//   organizations: 'orgReqs'
// };

// const collectionToLoadingType = {
//   teachers: 'isLoadingTeachers',
//   organizations: 'isLoadingOrgs'
// };

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
      // isLoadingTeachers: true,
      // isLoadingOrgs: true,
      // teacherReqs: [],
      // orgReqs: [],
      teacherOrgToggle: false
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  // componentDidMount() {
  //   cancelTeacherSub = this.getRequestsFromCollection('teachers');
  //   cancelOrganizationSub = this.getRequestsFromCollection('organizations');
  // }

  // componentWillUnmount() {
  //   cancelTeacherSub();
  //   cancelOrganizationSub();
  // }

  // getRequestsFromCollection(col) {
  //   return this.db.collection(col).onSnapshot(users => {
  //     const requests = users.docs.map(u => ({ id: u.id, ...u.data() }));
  //     requests.sort(function(a, b) {
  //       return new Date(b.dateApplied.seconds) - new Date(a.dateApplied.seconds);
  //     });
  //     const newState = {};
  //     newState[collectionToDataMember[col]] = requests;
  //     // .filter(t => !t.isVerrified)
  //     // .filter(t => !t.isDeclined);
  //     newState[collectionToLoadingType[col]] = false;
  //     this.setState({ ...newState });
  //   });
  // }

  // OLD FUNCTION
  // getTeacherRequests() {
  //   return this.state.isLoadingTeachers ? (
  //     <Spinner color="primary" />
  //   ) : (
  //     this.state.teacherReqs.map(teacher => (
  //       <TeacherRequest
  //         db={this.db}
  //         teacher={teacher}
  //         acceptRequest={t => this.acceptRequest(t, 'teachers')}
  //         declineRequest={t => this.declineRequest(t, 'teachers')}
  //         key={teacher.id}
  //       />
  //     ))
  //   );
  // }

  // NEW FUNCTION
  getTeacherRequests() {
    return <AdminTeacherPage db={this.db} firebase={this.firebase} />;
  }

  // NEW FUNCTION
  getOrgRequests() {
    return <AdminOrganizationPage db={this.db} firebase={this.firebase} />;
  }

  // getOrgRequests() {
  //   return this.state.isLoadingOrgs ? (
  //     <Spinner color="primary" />
  //   ) : (
  //     this.state.orgReqs.map(org => (
  //       <OrganizationRequest
  //         db={this.db}
  //         org={org}
  //         acceptRequest={o => this.acceptRequest(o, 'organizations')}
  //         declineRequest={o => this.declineRequest(o, 'organizations')}
  //         key={org.id}
  //       />
  //     ))
  //   );
  // }

  // acceptRequest(user, collection) {
  //   this.db
  //     .collection(collection)
  //     .doc(user.id)
  //     .update({ isVerrified: true });
  // }

  // declineRequest(user, collection) {
  //   this.db
  //     .collection(collection)
  //     .doc(user.id)
  //     .update({ isDeclined: true });
  // }

  toggleTeacherOrg() {
    let { teacherOrgToggle } = this.state;
    teacherOrgToggle = !teacherOrgToggle;
    this.setState({ teacherOrgToggle });
  }

  showTeachers() {
    return (
      <div className="admin-dashboard">
        <h4>Teacher Requests:</h4>
        <button onClick={this.toggleTeacherOrg}>Switch to Organization Requests</button>
        {this.getTeacherRequests()}
      </div>
    );
  }

  showOrgs() {
    return (
      <div className="admin-dashboard">
        <h4>Organization Requests:</h4>
        <button onClick={this.toggleTeacherOrg}>Switch to Teacher Requests</button>
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
