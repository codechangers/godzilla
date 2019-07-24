import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import NavBar from '../../NavBar';
import autoBind from '../../../autoBind';
import { getMMDDYYYY } from '../../../helpers';

class ApprovedTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [
        {
          name: 'My First Class',
          id: 'class01',
          startDate: new Date(),
          endDate: new Date(),
          startTime: 'MST:2:00:00:am',
          endTime: 'MST:3:00:00:pm',
          daysOfWeek: 'MTW',
          startAge: 10,
          endAge: 12,
          price: 10000,
          Location: '321 American Dr.',
          maxStudents: 20,
          minStudents: 10,
          kids: ['1111111', '2222222', '3333333']
        }
      ]
    };
    autoBind(this);
  }

  getClasses() {
    const { classes } = this.state;
    return classes.map(cls => (
      <Paper className="class-card" key={cls.id}>
        <div className="left">
          <h2>{cls.name}</h2>
          <p>{`${getMMDDYYYY(cls.startDate)} - ${getMMDDYYYY(cls.endDate)}`}</p>
        </div>
        <div className="right">
          <div className="top">
            <p style={{ marginRight: '8px' }}>
              <strong>Price:</strong>
              {` $${cls.price}`}
            </p>
            <div className="info">
              <PersonIcon />
              <p>{cls.kids.length}</p>
            </div>
          </div>
          <Button color="primary">More Info</Button>
        </div>
      </Paper>
    ));
  }

  render() {
    const { accounts, firebase } = this.props;
    return (
      <div className="list-view">
        <NavBar accounts={accounts} firebase={firebase} />
        <div className="top-right">
          <Fab variant="extended" color="primary">
            <AddIcon />
            Create a Class
          </Fab>
        </div>
        <h1>Welcome to the Approved Teacher Dashboard</h1>
        <div className="classes-wrapper">{this.getClasses()}</div>
      </div>
    );
  }
}

ApprovedTeacher.propTypes = {
  firebase: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default ApprovedTeacher;
