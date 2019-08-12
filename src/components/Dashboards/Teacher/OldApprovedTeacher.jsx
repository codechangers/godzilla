import React from 'react';
import PropTypes from 'prop-types';
import { Fab, Button, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NavBar from '../../NavBar';
import ClassEditor from '../../Classes/Editor';
import ClassViewer from '../../Classes/Viewer';
import ClassPanel from '../../Classes/Panel';
import autoBind from '../../../autoBind';

let teacherSub = () => null;

class OldApprovedTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      showCreate: false,
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

  getMoreInfo(cls) {
    return (
      <Button
        onClick={() => {
          this.setState({ selected: cls });
        }}
        color="primary"
      >
        More Info
      </Button>
    );
  }

  fetchClasses(teacher, selectedId) {
    const classRefs = teacher.data().classes || [];
    const classes = [];
    classRefs.forEach(classRef => {
      classRef.get().then(classDoc => {
        const classData = { ...classDoc.data(), id: classDoc.id };
        classes.push(classData);
        if (classes.length === classRefs.length) {
          this.setState({ classes });
        }
        if (selectedId && classDoc.id === selectedId) {
          this.setState({ selected: classData });
        }
      });
    });
  }

  createClass(classData) {
    const { teachers } = this.props.accounts;
    this.props.db
      .collection('classes')
      .add({ ...classData, children: [] })
      .then(classObj => {
        const classes = teachers.data().classes || [];
        classes.push(classObj);
        teachers.ref.update({ classes });
      });
    this.setState({ showCreate: false });
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
    const { accounts, firebase } = this.props;
    return (
      <div className="list-view">
        <NavBar accounts={accounts} firebase={firebase} />
        <div className="top-right">
          <Fab
            variant="extended"
            color="primary"
            onClick={() => this.setState({ showCreate: true })}
          >
            <AddIcon />
            Create a Class
          </Fab>
        </div>
        <h1>Welcome to the Approved Teacher Dashboard</h1>
        <div className="classes-wrapper">
          {this.state.classes.map(cls => (
            <ClassPanel cls={cls} getButton={this.getMoreInfo} />
          ))}
        </div>
        <Modal
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          open={this.state.showCreate}
          onClose={() => this.setState({ showCreate: false })}
          disableAutoFocus
        >
          <ClassEditor submit={this.createClass} />
        </Modal>
        {this.state.selected ? (
          <ClassViewer
            cls={this.state.selected}
            update={(id, data) => this.updateClass(id, data)}
            delete={id => this.deleteClass(id)}
            close={() => this.setState({ selected: null })}
          />
        ) : null}
      </div>
    );
  }
}

OldApprovedTeacher.propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default OldApprovedTeacher;
