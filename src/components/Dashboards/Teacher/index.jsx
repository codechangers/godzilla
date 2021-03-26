import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { PageWrapper } from '../styles';
import CurriculumInterface from '../../Interfaces/Curriculum';
import PaymentsInterface from '../../Interfaces/Payments';
import ProfileInterface from '../../Interfaces/Profile';
import SettingsInterface from '../../Interfaces/Settings';
import PromoCodesInterface from '../../Interfaces/PromoCodes';
import DocumentationInterface from '../../Interfaces/Documentation';
import TutorialsInterface from '../../Interfaces/Tutorials';
import SideBar from '../../UI/SideBar';
import ApprovedTeacher from './ApprovedTeacher';
import DeclinedTeacher from './DeclinedTeacher';
import PendingTeacher from './PendingTeacher';
import TrainingTeacher from './TrainingTeacher';

const propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const routeToInterface = {
  '/teacher': null,
  '/teacher/curriculum': CurriculumInterface,
  '/teacher/payments': PaymentsInterface,
  '/teacher/profile': ProfileInterface,
  '/teacher/settings': SettingsInterface,
  '/teacher/promo': PromoCodesInterface,
  '/teacher/docs': DocumentationInterface,
  '/teacher/tutorials': TutorialsInterface
};

const TeacherDashboard = props => {
  const { accounts, db, firebase, user, location } = props;
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    if (accounts.teachers)
      return db
        .collection('teachers')
        .doc(accounts.teachers.id)
        .onSnapshot(tDoc => setTeacher(tDoc.data()));
    return () => {};
  }, [db, accounts]);

  const getInterface = () => {
    const Interface = routeToInterface[location.pathname];
    return Interface === null ? null : <Interface {...{ firebase, db, user, accounts }} />;
  };

  const getDashboard = () => {
    let Dashboard = null;
    if (teacher) {
      if (user.isSignedIn && accounts.teachers) {
        if (teacher.isVerrified) {
          Dashboard = teacher.isTraining ? TrainingTeacher : ApprovedTeacher;
        } else {
          Dashboard = teacher.isDeclined ? DeclinedTeacher : PendingTeacher;
        }
      }
    }
    return Dashboard !== null ? <Dashboard {...props} /> : null;
  };

  let approvedRoutes =
    teacher && teacher.isVerrified && !teacher.isTraining
      ? ['Promo Codes', 'Docs', 'Tutorials', 'Parent Dash']
      : ['Parent Dash'];
  approvedRoutes = accounts.admins ? approvedRoutes.concat(['Admin Dash']) : approvedRoutes;

  return user.isSignedIn ? (
    <PageWrapper>
      <SideBar
        names={['Profile', 'Dashboard'].concat(approvedRoutes)}
        baseRoute="/teacher"
        firebase={firebase}
      />
      {getInterface() || getDashboard()}
    </PageWrapper>
  ) : (
    <Redirect to="/login" />
  );
};

TeacherDashboard.propTypes = propTypes;

export default TeacherDashboard;
