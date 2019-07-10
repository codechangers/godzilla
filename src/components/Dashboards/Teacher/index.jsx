import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ApprovedTeacher from './ApprovedTeacher';
import DeclinedTeacher from './DeclinedTeacher';
import PendingTeacher from './PendingTeacher';
import TrainingTeacher from './TrainingTeacher';

const TeacherDashboard = ({ db, firebase, user, accounts }) => {
  let Dashboard = null;
  if (user.isSignedIn && accounts.teachers) {
    const teacher = accounts.teachers.data();
    switch (teacher) {
      case teacher.isVerrified:
        Dashboard = teacher.isTraining ? TrainingTeacher : ApprovedTeacher;
        break;
      default:
        Dashboard = teacher.isDeclined ? DeclinedTeacher : PendingTeacher;
    }
  }
  return Dashboard ? (
    <Dashboard db={db} firebase={firebase} user={user} accounts={accounts} />
  ) : (
    <Redirect to="/login" />
  );
};

TeacherDashboard.propTypes = {
  db: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default TeacherDashboard;
