import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Modal, Card, Button } from '@material-ui/core';
import CurriculumInterface from '../../Interfaces/Curriculum';
import PaymentInterface from '../../Interfaces/Payment';
import ProfileInterface from '../../Interfaces/Profile';
import SettingsInterface from '../../Interfaces/Settings';
import SideBar from '../../SideBar';
import ClassInfoCard from '../../Classes/InfoCard';
import ClassEditor from '../../Classes/Editor';
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
            {this.state.classes.map(cls => (
              <ClassInfoCard
                cls={cls}
                key={cls.id}
                openUpdate={() => this.setState({ selected: { cls, shouldEdit: true } })}
                openDelete={() => this.setState({ selected: { cls, shouldEdit: false } })}
              />
            ))}
            {this.state.selected !== null ? (
              <Modal
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                open={this.state.selected !== null}
                onClose={() => this.setState({ selected: null })}
                disableAutoFocus
              >
                {this.state.selected.shouldEdit ? (
                  <ClassEditor
                    submit={classData => {
                      this.updateClass(this.state.selected.id, classData);
                      this.setState({ selected: null });
                    }}
                    title="Edit Class Details"
                    submitText="Update Class"
                    cls={this.state.selected.cls}
                  />
                ) : (
                  <Card className="delete-card">
                    <h1>{`Are you sure you want to delete ${this.state.selected.cls.name}?`}</h1>
                    <h4>This will remove the class and all signed up students permanently</h4>
                    <div className="options">
                      <Button
                        color="default"
                        variant="outlined"
                        onClick={() => this.setState({ selected: null })}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          this.deleteClass(this.state.selected.cls.id);
                          this.setState({ selected: null });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                )}
              </Modal>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

ApprovedTeacher.propTypes = {
  location: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

export default withRouter(ApprovedTeacher);
