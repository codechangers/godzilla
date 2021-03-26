import React from 'react';
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

let teacherListener = () => {};

class TeacherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: null
    };
  }

  componentDidMount() {
    if (this.props.accounts.teachers) {
      teacherListener = this.props.db
        .collection('teachers')
        .doc(this.props.accounts.teachers.id)
        .onSnapshot(tDoc => {
          this.setState({ teacher: tDoc.data() });
        });
    }
  }

  componentWillUnmount() {
    teacherListener();
    teacherListener = () => {};
  }

  getInterface() {
    const Interface = routeToInterface[this.props.location.pathname];
    const { firebase, db, user, accounts } = this.props;
    return Interface === null ? null : <Interface {...{ firebase, db, user, accounts }} />;
  }

  getDashboard() {
    const { user, accounts } = this.props;
    const { teacher } = this.state;
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
    return Dashboard !== null ? <Dashboard {...this.props} /> : null;
  }

  isApproved() {
    const { teacher } = this.state;
    return teacher && teacher.isVerrified && !teacher.isTraining;
  }

  render() {
    const { user, firebase, accounts } = this.props;
    let approvedRoutes = this.isApproved()
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
        {this.getInterface() || this.getDashboard()}
      </PageWrapper>
    ) : (
      <Redirect to="/login" />
    );
  }
}

TeacherDashboard.propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default TeacherDashboard;
