import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, LinearProgress, Button } from '@material-ui/core';
import { AccessTime, LocationOn } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import { getDateString, getTime, calcSessions, getAgeFromBirthday } from '../../helpers';
import { Template2 } from '../Images';

const SignUpsProgress = withStyles({
  root: {
    height: 6,
    backgroundColor: '#E0F4FD',
    borderRadius: 8
  },
  bar: {
    backgroundColor: '#00AFEF'
  }
})(LinearProgress);

const InfoCardHeader = ({ cls }) => (
  <div className="infocard-header">
    <div>
      <h5>{cls.name}</h5>
      <div className="inliner">
        <p>{`Start Date: ${getDateString(cls.startDate)}`}</p>
        <p>{`End Date: ${getDateString(cls.endDate)}`}</p>
      </div>
      <div className="inliner close">
        <p>{`${calcSessions(cls)} Sessions`}</p>
        <p>
          <AccessTime fontSize="inherit" />
          {getTime(cls.startTime)}
        </p>
        <p>{`$${cls.price} per Student`}</p>
      </div>
      <div className="inliner">
        <p>{cls.locationName}</p>
        <p>
          <LocationOn fontSize="inherit" />
          {cls.locationAddress}
        </p>
      </div>
      <div className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </div>
      <div className="progress-label">
        <h6>Students Sign-up</h6>
        <p>{`${cls.children.length}/${cls.maxStudents} STUDENTS`}</p>
      </div>
      <SignUpsProgress
        className="progress-bar"
        variant="determinate"
        color="primary"
        value={(cls.children.length / cls.maxStudents) * 100}
      />
      <div className="progress-overlay">
        <span style={{ marginLeft: `${(cls.minStudents / cls.maxStudents) * 100}%` }} />
      </div>
      <div className="bottom-line" />
    </div>
    <Template2 />
  </div>
);

InfoCardHeader.propTypes = {
  cls: PropTypes.object.isRequired
};

class StudentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: null
    };
  }

  componentDidMount() {
    console.log(this.props.student);
    this.props.student.get().then(studentDoc => {
      this.setState({ student: { ...studentDoc.data(), id: studentDoc.id } });
    });
  }

  render() {
    const { student } = this.state;
    return student !== null ? (
      <div className="infocard-student">
        <p>{`${student.fName} ${student.lName}`}</p>
        <p>{student.gender}</p>
        <p>{`${getAgeFromBirthday(student.birthDate)}`}</p>
        <p>{`${student.currentGrade} Grade`}</p>
        <p>{student.currentSchool}</p>
        <p>Status</p>
      </div>
    ) : null;
  }
}

StudentInfo.propTypes = {
  student: PropTypes.object.isRequired
};

const ClassInfoCard = ({ cls, openUpdate, openDelete }) => (
  <Paper className="infocard-wrapper">
    <InfoCardHeader cls={cls} />
    <div className="options">
      <Button variant="contained" onClick={openUpdate}>
        <EditIcon />
        EDIT CLASS DETAILS
      </Button>
      <Button variant="contained">
        <LinkIcon />
        STUDENT SIGN UP LINK
      </Button>
      <Button variant="contained" onClick={openDelete}>
        <DeleteIcon />
        DELETE CLASS
      </Button>
    </div>
    {cls.children.map(childRef => (
      <StudentInfo student={childRef} key={childRef.id} />
    ))}
  </Paper>
);

ClassInfoCard.propTypes = {
  cls: PropTypes.object.isRequired,
  openUpdate: PropTypes.func.isRequired,
  openDelete: PropTypes.func.isRequired
};

export default ClassInfoCard;
