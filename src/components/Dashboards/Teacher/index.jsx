import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import CurriculumInterface from '../../Interfaces/Curriculum';
import PaymentInterface from '../../Interfaces/Payment';
import ProfileInterface from '../../Interfaces/Profile';
import SettingsInterface from '../../Interfaces/Settings';
import PromoCodesInterface from '../../Interfaces/PromoCodes';
import SideBar from '../../UI/SideBar';
import ApprovedTeacher from './ApprovedTeacher';
import DeclinedTeacher from './DeclinedTeacher';
import PendingTeacher from './PendingTeacher';
import TrainingTeacher from './TrainingTeacher';
import '../../../assets/css/Dashboards.css';
import '../../../assets/css/Teacher.css';

const routeToInterface = {
  '/teacher': null,
  '/teacher/curriculum': CurriculumInterface,
  '/teacher/payments': PaymentInterface,
  '/teacher/profile': ProfileInterface,
  '/teacher/settings': SettingsInterface,
  '/teacher/promo': PromoCodesInterface
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

  isApproved() {
    const { teacher } = this.state;
    return teacher && teacher.isVerrified && !teacher.isTraining;
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

  render() {
    const { user, firebase } = this.props;
    const approvedRoutes = this.isApproved() ? ['Promo Codes', 'Parent Dash'] : ['Parent Dash'];

    return user.isSignedIn ? (
      <div className="page-wrapper">
        <SideBar
          names={['Profile', 'Dashboard'].concat(approvedRoutes)}
          baseRoute="/teacher"
          firebase={firebase}
        />
        {this.getInterface() || this.getDashboard()}
      </div>
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
