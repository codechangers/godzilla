import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, TextField, List, Divider, Drawer } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import autoBind from '../../../autoBind';
import TeacherRequest from '../../Requests/Teacher';
import Spinner from '../../UI/Spinner';

let cancelTeacherSub = () => {};

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  showSideDrawer: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired
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
    return (
      <List>
        <Divider />
        {this.state.teacherReqs.map(teacher => (
          <TeacherRequest
            db={this.db}
            teacher={teacher}
            acceptRequest={t => this.acceptRequest(t, 'teachers')}
            declineRequest={t => this.declineRequest(t, 'teachers')}
            key={teacher.id}
          />
        ))}
      </List>
    );
  }

  declineRequest(user, collection) {
    this.db
      .collection(collection)
      .doc(user.id)
      .update({ isDeclined: true });
  }

  handleChange(e) {
    const { id, name, value } = e.target;
    const newState = {};
    if (id) {
      newState[id] = value;
    } else {
      newState[name] = value;
    }
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
        <Drawer
          className="filter-drawer"
          variant="persistent"
          anchor="left"
          open={this.props.showSideDrawer}
        >
          <div className="close-side-drawer">
            <IconButton onClick={this.props.toggleDrawer}>
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
          </div>
          <h3>Filters</h3>
          <div className="inline">
            <p>Read, Unread, Both</p>
            <TextField
              id="shouldShowRead"
              name="shouldShowRead"
              select
              value={this.state.shouldShowRead}
              onChange={this.handleChange}
            >
              <MenuItem value="both">Both</MenuItem>
              <MenuItem value="true">Read Only</MenuItem>
              <MenuItem value="false">Unread Only</MenuItem>
            </TextField>
            <p>Show only Teachers</p>
            <TextField
              id="shouldShowTeacherType"
              name="shouldShowTeacherType"
              select
              value={this.state.shouldShowTeacherType}
              onChange={this.handleChange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="declined">Declined</MenuItem>
            </TextField>
            <p>Search by location</p>
            <TextField
              id="shouldShowLocation"
              name="shouldShowLocation"
              select
              value={this.state.shouldShowLocation}
              onChange={this.handleChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="school">School</MenuItem>
              <MenuItem value="house">House</MenuItem>
              <MenuItem value="office">Office</MenuItem>
            </TextField>
            <br />
            <br />
            <TextField
              id="shouldShowName"
              className="filter-input"
              type="text"
              label="Search by Name"
              value={this.state.shouldShowName}
              onChange={this.handleChange}
            />
            <br />
            <br />
            <TextField
              id="shouldShowRegion"
              className="filter-input"
              type="text"
              label="Search by Region"
              value={this.state.shouldShowRegion}
              onChange={this.handleChange}
            />
          </div>
        </Drawer>
        {this.getFilteredTeachers()}
      </>
    );
  }
}

AdminTeacherPage.propTypes = propTypes;

export default AdminTeacherPage;
