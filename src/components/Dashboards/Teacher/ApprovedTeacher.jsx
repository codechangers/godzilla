import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from '@material-ui/core';
import Banner from '../../UI/Banner';
import ClassInfoCard from '../../Classes/InfoCard';
import ClassEditor from '../../Classes/Editor';
import DeleteCard from '../../UI/DeleteCard';
import StripeConnect from '../../UI/StripeConnect';
import autoBind from '../../../autoBind';
import { API_URL } from '../../../globals';
import '../../../assets/css/Teacher.css';

const getName = user => `${user.data().fName} ${user.data().lName}`;

let teacherSub = () => null;

class ApprovedTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      selected: null,
      showCreate: false,
      stripeIsLinked: true
    };
    autoBind(this);
  }

  componentDidMount() {
    teacherSub = this.props.accounts.teachers.ref.onSnapshot(teacher => {
      this.fetchClasses(teacher);
    });
    // eslint-disable-next-line
    fetch(`${API_URL}/teacher_account/${this.props.user.uid}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        this.setState({ stripeIsLinked: res.stripe_is_linked });
      });
  }

  componentWillUnmount() {
    teacherSub();
    teacherSub = () => null;
  }

  getEmptyPrompt() {
    if (this.state.stripeIsLinked) {
      return this.state.classes.length <= 0 ? (
        <div className="empty-warning">
          <h2>Looks like you don&apos;t have any classes yet</h2>
          <Button onClick={() => this.setState({ showCreate: true })}>Create one Now!</Button>
        </div>
      ) : null;
    }
    if (!this.state.stripeIsLinked) {
      return (
        <div className="empty-warning">
          <h2>Looks like you haven&apos;t linked your stripe account yet</h2>
          <StripeConnect />
        </div>
      );
    }
    return null;
  }

  getCrudModal() {
    if (this.state.showCreate) {
      return (
        <Modal
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          open={this.state.showCreate}
          onClose={() => this.setState({ showCreate: false })}
          disableAutoFocus
        >
          <ClassEditor
            submit={this.createClass}
            submitText="Submit"
            close={() => this.setState({ showCreate: false })}
          />
        </Modal>
      );
    }
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
        const classData = { ...classDoc.data(), id: classDoc.id, ref: classDoc.ref };
        classes.push(classData);
        if (classes.length === classRefs.length) {
          this.setState({ classes });
        }
      });
    });
  }

  createClass(classData) {
    const { teachers } = this.props.accounts;
    this.props.db
      .collection('classes')
      .add({ ...classData, children: [], teacher: teachers.ref })
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
        this.fetchClasses(this.props.accounts.teachers);
      });
  }

  deleteClass(classId) {
    const { teachers } = this.props.accounts;
    const cls = this.state.classes.filter(c => c.id === classId)[0];
    if (cls) {
      cls.children.forEach(childRef => {
        childRef.get().then(childDoc => {
          let childClasses = childDoc.data().classes || [];
          childClasses = childClasses.filter(c => c.id !== classId);
          childRef.update({ classes: childClasses });
        });
      });
      cls.ref.delete().then(() => {
        let classes = teachers.data().classes || [];
        classes = classes.filter(c => c.id !== classId);
        teachers.ref.update({ classes });
      });
    }
  }

  render() {
    return (
      <div className="page-content">
        <Banner
          name={
            this.props.accounts.parents ? getName(this.props.accounts.parents) : 'Hello Teacher'
          }
          stripeIsLinked={this.state.stripeIsLinked}
          buttonText="ADD A NEW CLASS"
          onClick={() => this.setState({ showCreate: true })}
        />
        {this.getEmptyPrompt()}
        {this.state.classes.map(cls => (
          <ClassInfoCard
            cls={cls}
            key={cls.id}
            openUpdate={() => this.setState({ selected: { cls, shouldEdit: true } })}
            openDelete={() => this.setState({ selected: { cls, shouldEdit: false } })}
          />
        ))}
        {this.state.selected !== null || this.state.showCreate ? this.getCrudModal() : null}
      </div>
    );
  }
}

ApprovedTeacher.propTypes = {
  accounts: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(ApprovedTeacher);
