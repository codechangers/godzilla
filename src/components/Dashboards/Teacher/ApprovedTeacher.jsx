import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import CurriculumInterface from '../../Interfaces/Curriculum';
import PaymentInterface from '../../Interfaces/Payment';
import ProfileInterface from '../../Interfaces/Profile';
import SettingsInterface from '../../Interfaces/Settings';
import SideBar from '../../UI/SideBar';
import Banner from '../../UI/Banner';
import ClassInfoCard from '../../Classes/InfoCard';
import ClassEditor from '../../Classes/Editor';
import DeleteCard from '../../UI/DeleteCard';
import autoBind from '../../../autoBind';
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
      classes: [],
      selected: null
    };
    autoBind(this);
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
    return Interface === null ? null : <Interface firebase={this.props.firebase} />;
  }

  getCrudModal() {
    return (
      <Modal
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        open={this.state.selected !== null}
        onClose={() => this.setState({ selected: null })}
        disableAutoFocus
      >
        {this.state.selected.shouldEdit ? (
          <ClassEditor
            submit={classData => {
              this.updateClass(this.state.selected.cls.id, classData);
              this.setState({ selected: null });
            }}
            title="Edit Class Details"
            submitText="Submit"
            cls={this.state.selected.cls}
            close={() => this.setState({ selected: null })}
          />
        ) : (
          <DeleteCard
            prompt={`Are you sure you want to delete ${this.state.selected.cls.name}?`}
            warning="This will remove the class and all signed up students permanently"
            onCancel={() => this.setState({ selected: null })}
            onDelete={() => {
              this.deleteClass(this.state.selected.cls.id);
              this.setState({ selected: null });
            }}
          />
        )}
      </Modal>
    );
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

  updateClass(classId, classData) {
    this.props.db
      .collection('classes')
      .doc(classId)
      .update(classData)
      .then(() => {
        this.fetchClasses(this.props.accounts.teachers, classId);
      });
  }

  deleteClass(classId) {
    const { teachers } = this.props.accounts;
    this.props.db
      .collection('classes')
      .doc(classId)
      .delete()
      .then(() => {
        let classes = teachers.data().classes || [];
        classes = classes.filter(cls => cls.id !== classId);
        teachers.ref.update({ classes });
      });
  }

  render() {
    return (
      <div className="page-wrapper">
        <SideBar />
        {this.getInterface() || (
          <div className="page-content">
            <Banner
              name="Macuyler Dunn"
              buttonText="ADD A NEW CLASS"
              onClick={() => console.log('click')}
            />
            {this.state.classes.map(cls => (
              <ClassInfoCard
                cls={cls}
                key={cls.id}
                openUpdate={() => this.setState({ selected: { cls, shouldEdit: true } })}
                openDelete={() => this.setState({ selected: { cls, shouldEdit: false } })}
              />
            ))}
            {this.state.selected !== null ? this.getCrudModal() : null}
          </div>
        )}
      </div>
    );
  }
}

ApprovedTeacher.propTypes = {
  location: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

export default withRouter(ApprovedTeacher);
