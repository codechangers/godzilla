import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';
import TeacherRequest from '../Requests/Teacher';
import Spinner from '../Spinner';

let cancelTeacherSub = () => {};

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

class AdminTeacherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherReqs: [],
      originalReqs: [],
      isLoadingTeachers: true,
      shouldShowRead: 'both',
      shouldShowTeacherType: 'pending'
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  componentDidMount() {
    cancelTeacherSub = this.getRequestsFromCollection();
  }

  componentWillUnmount() {
    cancelTeacherSub();
  }

  getRequestsFromCollection() {
    return this.db.collection('teachers').onSnapshot(users => {
      const requests = users.docs.map(u => ({ id: u.id, ...u.data() }));
      requests.sort(function(a, b) {
        return new Date(b.dateApplied.seconds) - new Date(a.dateApplied.seconds);
      });
      const newState = {};
      newState.teacherReqs = requests.filter(t => !t.isVerrified).filter(t => !t.isDeclined);
      newState.originalReqs = requests;
      newState.isLoadingTeachers = false;
      this.setState({ ...newState });
    });
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

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[id] = value;
    this.setState({ ...newState }, function() {
      const teacherArray = this.state.originalReqs;

      if (this.state.shouldShowRead === 'true') {
        newState.teacherReqs = teacherArray.filter(function(t) {
          return t.isRead;
        });
      } else if (this.state.shouldShowRead === 'false') {
        newState.teacherReqs = teacherArray.filter(function(t) {
          return !t.isRead;
        });
      }

      if (this.state.shouldShowTeacherType === 'pending') {
        newState.teacherReqs = teacherArray.filter(function(t) {
          return t.isVerrified === false && t.isDeclined === false;
        });
      } else if (this.state.shouldShowTeacherType === 'approved') {
        newState.teacherReqs = teacherArray.filter(function(t) {
          return t.isVerrified;
        });
      } else if (this.state.shouldShowTeacherType === 'declined') {
        newState.teacherReqs = teacherArray.filter(function(t) {
          return t.isDeclined;
        });
      }

      this.setState({ ...newState });
    });
  }

  getFilteredTeachers() {
    return this.state.teacherReqs.map(teacher => (
      <TeacherRequest
        db={this.db}
        teacher={teacher}
        acceptRequest={t => this.acceptRequest(t, 'teachers')}
        declineRequest={t => this.declineRequest(t, 'teachers')}
        key={teacher.id}
      />
    ));
  }

  render() {
    return this.state.isLoadingTeachers ? (
      <Spinner color="primary" />
    ) : (
      <>
        <div className="left-side-filters">
          <h4>Filters</h4>
          <div className="inline">
            <p>Read, Unread, Both</p>
            <select id="shouldShowRead" onChange={this.handleChange}>
              <option value="both">Both</option>
              <option value="true">Read Only</option>
              <option value="false">Unread Only</option>
            </select>
            <br />
            <p>
              Show only
              <select id="shouldShowTeacherType" onChange={this.handleChange}>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="declined">Declined</option>
              </select>
              Teachers
            </p>
          </div>
        </div>
        {this.getFilteredTeachers()}
      </>
    );
  }
}

AdminTeacherPage.propTypes = propTypes;

export default AdminTeacherPage;
