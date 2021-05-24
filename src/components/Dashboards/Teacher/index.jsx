import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { PageWrapper } from '../styles';
import CurriculumInterface from '../../Interfaces/Curriculum';
import PaymentsInterface from '../../Interfaces/Payments';
import ProfileInterface from '../../Interfaces/Profile';
import SettingsInterface from '../../Interfaces/Settings';
import PromoCodesInterface from '../../Interfaces/PromoCodes';
import DocumentationInterface from '../../Interfaces/Documentation';
import TutorialsInterface from '../../Interfaces/Tutorials';
import PreFlightTutorialsInterface from '../../Interfaces/PreFlightTutorials';
import SideBar from '../../UI/SideBar';
import ApprovedTeacher from './ApprovedTeacher';
import DeclinedTeacher from './DeclinedTeacher';
import PendingTeacher from './PendingTeacher';
import TrainingTeacher from './TrainingTeacher';
import { useAccountData } from '../../../hooks/accounts';

const propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
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
  '/teacher/tutorials': TutorialsInterface,
  '/teacher/preflight': PreFlightTutorialsInterface
};

const TeacherDashboard = props => {
  const { accounts, user, location } = props;
  const [isTeacher, teacher, loading] = useAccountData('teachers', true);
  const [isAdmin] = useAccountData('admins');

  // Custom App Bar Init
  const [cab, setCAB] = useState({});
  const useCustomAppBar = newCab => setCAB({ ...cab, ...newCab });
  useEffect(() => setCAB({}), [location]);

  const getInterface = () => {
    const Interface = routeToInterface[location.pathname];
    return Interface === null ? null : <Interface {...{ user, accounts, useCustomAppBar }} />;
  };

  const getDashboard = () => {
    let Dashboard = null;
    if (isTeacher) {
      if (teacher.isVerrified) {
        Dashboard = teacher.isTraining ? TrainingTeacher : ApprovedTeacher;
      } else {
        Dashboard = teacher.isDeclined ? DeclinedTeacher : PendingTeacher;
      }
    }
    return Dashboard !== null ? <Dashboard {...props} useCustomAppBar={useCustomAppBar} /> : null;
  };

  let approvedRoutes =
    isTeacher && teacher.isVerrified && !teacher.isTraining
      ? ['Promo Codes', 'Docs', 'Tutorials', 'Pre Contest', 'Parent Dash']
      : ['Parent Dash'];
  approvedRoutes = isAdmin ? approvedRoutes.concat(['Admin Dash']) : approvedRoutes;

  if (loading)
    return (
      <PageWrapper style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" style={{ marginBottom: 20 }}>
          Loading Dashboard...
        </Typography>
        <CircularProgress />
      </PageWrapper>
    );
  return isTeacher ? (
    <PageWrapper>
      <SideBar
        names={['Profile', 'Dashboard'].concat(approvedRoutes)}
        baseRoute="/teacher"
        appBarConfig={cab}
      />
      {getInterface() || getDashboard()}
    </PageWrapper>
  ) : (
    <Redirect to="/login" />
  );
};
TeacherDashboard.propTypes = propTypes;

export default TeacherDashboard;
