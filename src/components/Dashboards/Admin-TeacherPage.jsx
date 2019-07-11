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
      isLoadingTeachers: true
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
      newState.teacherReqs = requests;
      // .filter(t => !t.isVerrified)
      // .filter(t => !t.isDeclined);
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
    this.setState(newState);
  }

  filter(event) {
    event.persist();
    const { id, value } = event.target;
    const newTeachers = this.state.teacherReqs;
    const newState = {};
    console.log('new teachers: ', newTeachers);
    newState.teacherReqs = newTeachers.filter(t => {
      console.log('t id: ', t[id]);
      console.log('value: ', value);
      return t[id] === value;
    });
    console.log('new state teacher reqs: ', newState.teacherReqs);
    this.setState({ newState });
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
            <select id="isRead" onChange={this.filter}>
              <option value="both">Both</option>
              <option value="true">Read Only</option>
              <option value="false">Unread Only</option>
            </select>
          </div>
        </div>
        {this.state.teacherReqs.map(teacher => (
          <TeacherRequest
            db={this.db}
            teacher={teacher}
            acceptRequest={t => this.acceptRequest(t, 'teachers')}
            declineRequest={t => this.declineRequest(t, 'teachers')}
            key={teacher.id}
          />
        ))}
      </>
    );
  }
}

AdminTeacherPage.propTypes = propTypes;

export default AdminTeacherPage;
