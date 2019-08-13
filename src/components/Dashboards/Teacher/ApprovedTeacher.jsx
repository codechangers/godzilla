import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CurriculumInterface from '../../Interfaces/Curriculum';
import PaymentInterface from '../../Interfaces/Payment';
import ProfileInterface from '../../Interfaces/Profile';
import SettingsInterface from '../../Interfaces/Settings';
import SideBar from '../../SideBar';
import ClassInfoCard from '../../Classes/InfoCard';
import '../../../assets/css/Teacher.css';

const routeToInterface = {
  '/teacher': null,
  '/teacher/curriculum': CurriculumInterface,
  '/teacher/payments': PaymentInterface,
  '/teacher/profile': ProfileInterface,
  '/teacher/settings': SettingsInterface
};

let teacherSub = () => null;

class ApprovedTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: []
    };
  }

  componentDidMount() {
    teacherSub = this.props.accounts.teachers.ref.onSnapshot(teacher => {
      this.fetchClasses(teacher);
    });
  }

  componentWillUnmount() {
    teacherSub();
    teacherSub = () => null;
  }

  getInterface() {
    const Interface = routeToInterface[this.props.location.pathname];
    return Interface === null ? null : <Interface />;
  }

  fetchClasses(teacher) {
    const classRefs = teacher.data().classes || [];
    const classes = [];
    classRefs.forEach(classRef => {
      classRef.get().then(classDoc => {
        const classData = { ...classDoc.data(), id: classDoc.id };
        classes.push(classData);
        if (classes.length === classRefs.length) {
          this.setState({ classes });
        }
      });
    });
  }

  render() {
    return (
      <div className="page-wrapper">
        <SideBar />
        {this.getInterface() || (
          <div className="page-content">
            {this.state.classes.map(cls => (
              <ClassInfoCard cls={cls} key={cls.id} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

ApprovedTeacher.propTypes = {
  location: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default withRouter(ApprovedTeacher);
