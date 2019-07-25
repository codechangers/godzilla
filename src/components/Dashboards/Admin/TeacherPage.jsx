import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../../autoBind';
import TeacherRequest from '../../Requests/Teacher';
import Spinner from '../../Spinner';

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
      shouldShowTeacherType: 'pending',
      shouldShowLocation: 'all',
      shouldShowName: '',
      shouldShowRegion: ''
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
      const requests = users.docs.map(u => ({
        id: u.id,
        ...u.data(),
        parent: this.db
          .collection('parents')
          .doc(u.id)
          .get()
          .then(doc => {
            return doc.data();
          })
      }));
      requests.sort((a, b) => {
        return new Date(b.dateApplied.seconds) - new Date(a.dateApplied.seconds);
      });
      const newState = {};
      newState.teacherReqs = requests.filter(t => !t.isVerrified).filter(t => !t.isDeclined);
      newState.originalReqs = requests;
      newState.isLoadingTeachers = false;
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
    this.setState({ ...newState }, () => {
      let teacherArray = this.state.originalReqs;

      if (this.state.shouldShowName === '' && this.state.shouldShowRegion === '') {
        if (this.state.shouldShowRead === 'true') {
          teacherArray = teacherArray.filter(t => {
            return t.isRead;
          });
        } else if (this.state.shouldShowRead === 'false') {
          teacherArray = teacherArray.filter(t => {
            return !t.isRead;
          });
        }

        if (this.state.shouldShowTeacherType === 'pending') {
          teacherArray = teacherArray.filter(t => {
            return t.isVerrified === false && t.isDeclined === false;
          });
        } else if (this.state.shouldShowTeacherType === 'approved') {
          teacherArray = teacherArray.filter(t => {
            return t.isVerrified;
          });
        } else if (this.state.shouldShowTeacherType === 'declined') {
          teacherArray = teacherArray.filter(t => {
            return t.isDeclined;
          });
        }

        if (this.state.shouldShowLocation === 'school') {
          teacherArray = teacherArray.filter(t => {
            return t.location === 'school';
          });
        } else if (this.state.shouldShowLocation === 'house') {
          teacherArray = teacherArray.filter(t => {
            return t.location === 'house';
          });
        } else if (this.state.shouldShowLocation === 'office') {
          teacherArray = teacherArray.filter(t => {
            return t.location === 'office';
          });
        }
      } else {
        const nameSearchValue = this.state.shouldShowName;
        const regionSearchValue = this.state.shouldShowRegion;
        teacherArray = teacherArray.filter(t => {
          const y = { ...t };
          y.parent.then(parent => {
            y.fullName = `${parent.fName.toLowerCase()} ${parent.lName.toLowerCase()}`;
          });
          if (y.fullName !== undefined) {
            return y.fullName.includes(nameSearchValue.toLowerCase());
          }
          return null;
        });

        teacherArray = teacherArray.filter(t => {
          return t.region.toLowerCase().includes(regionSearchValue.toLowerCase());
        });
      }

      newState.teacherReqs = teacherArray;
      this.setState({ ...newState });
    });
  }

  acceptRequest(user, collection) {
    this.db
      .collection(collection)
      .doc(user.id)
      .update({ isVerrified: true });
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
            <p>Search by location:</p>
            <select id="shouldShowLocation" onChange={this.handleChange}>
              <option value="all">All</option>
              <option value="school">School</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>
            <br />
            <p>Search by Name: </p>
            <input type="text" id="shouldShowName" onChange={this.handleChange} />
            <br />
            <p>Search by Region: </p>
            <input type="text" id="shouldShowRegion" onChange={this.handleChange} />
          </div>
        </div>
        {this.getFilteredTeachers()}
      </>
    );
  }
}

AdminTeacherPage.propTypes = propTypes;

export default AdminTeacherPage;
