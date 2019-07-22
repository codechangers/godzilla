import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ApprovedTeacher from './ApprovedTeacher';
import DeclinedTeacher from './DeclinedTeacher';
import PendingTeacher from './PendingTeacher';
import TrainingTeacher from './TrainingTeacher';
import '../../../assets/css/Dashboards.css';

const TeacherDashboard = props => {
  const { user, accounts } = props;
  let Dashboard = null;
  if (user.isSignedIn && accounts.teachers) {
    const teacher = accounts.teachers.data();
    if (teacher.isVerrified) {
      Dashboard = teacher.isTraining ? TrainingTeacher : ApprovedTeacher;
    } else {
      Dashboard = teacher.isDeclined ? DeclinedTeacher : PendingTeacher;
    }
  }
  return Dashboard ? <Dashboard {...props} /> : <Redirect to="/login" />;
};

TeacherDashboard.propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default TeacherDashboard;
