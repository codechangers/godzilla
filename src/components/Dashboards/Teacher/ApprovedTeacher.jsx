import React from 'react';
import PropTypes from 'prop-types';
import { Fab, Button, Paper, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import NavBar from '../../NavBar';
import CreateClass from '../../Classes/CreateClass';
import ViewClass from '../../Classes/ViewClass';
import autoBind from '../../../autoBind';
import { getMMDDYYYY, getDateFromTimestamp } from '../../../helpers';

let teacherSub = () => null;

class ApprovedTeacher extends React.Component {
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
      const classRefs = teacher.data().classes || [];
      const classes = [];
      classRefs.forEach(classRef => {
        classRef.get().then(classDoc => {
          classes.push({ ...classDoc.data(), id: classDoc.id });
          if (classes.length === classRefs.length) {
            this.setState({ classes });
          }
        });
      });
    });
  }

  componentWillUnmount() {
    teacherSub();
    teacherSub = () => null;
  }

  getClasses() {
    const { classes } = this.state;
    return classes.map(cls => (
      <Paper className="class-card" key={cls.id}>
        <div className="left">
          <h2>{cls.name}</h2>
          <p>
            {`${getMMDDYYYY(getDateFromTimestamp(cls.startDate))} - ${getMMDDYYYY(
              getDateFromTimestamp(cls.endDate)
            )}`}
          </p>
        </div>
        <div className="right">
          <div className="top">
            <p style={{ marginRight: '8px' }}>
              <strong>Price:</strong>
              {` $${cls.price}`}
            </p>
            <div className="info">
              <PersonIcon />
              <p>{cls.children.length}</p>
            </div>
          </div>
          <Button
            onClick={() => {
              this.setState({ selected: cls });
            }}
            color="primary"
          >
            More Info
          </Button>
        </div>
      </Paper>
    ));
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
        <div className="classes-wrapper">{this.getClasses()}</div>
        <Modal
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          open={this.state.showCreate}
          onClose={() => this.setState({ showCreate: false })}
          disableAutoFocus
        >
          <CreateClass submit={this.createClass} />
        </Modal>
        {this.state.selected ? (
          <ViewClass cls={this.state.selected} close={() => this.setState({ selected: null })} />
        ) : null}
      </div>
    );
  }
}

ApprovedTeacher.propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default ApprovedTeacher;
