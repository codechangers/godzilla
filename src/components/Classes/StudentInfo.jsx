import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import { getAgeFromBirthday } from '../../helpers';

const StudentInfo = ({ showLabels, student }) => {
  const classes = useStyles();
  return student !== null || showLabels ? (
    <div className={`${classes.student}${showLabels ? ' ' + classes.bold : ''}`}>
      <Typography variant="body2" style={{ width: 190 }}>
        {showLabels ? 'Name' : `${student.fName} ${student.lName}`}
      </Typography>
      <Typography variant="body2" style={{ width: 65 }}>
        {showLabels ? 'Gender' : `${student.gender}`}
      </Typography>
      <Typography variant="body2" style={{ width: 40 }}>
        {showLabels ? 'Age' : `${getAgeFromBirthday(student.birthDate)}`}
      </Typography>
      <Typography variant="body2" style={{ width: 100 }}>
        {showLabels ? 'Current Grade' : `${student.currentGrade} Grade`}
      </Typography>
      <Typography variant="body2" style={{ width: 190 }}>
        {showLabels ? 'Current School' : `${student.currentSchool}`}
      </Typography>
      <Typography variant="body2" style={{ width: 150 }}>
        {showLabels ? 'Student ID' : `${student.learnID || 'No Student ID'}`}
      </Typography>
    </div>
  ) : null;
};

StudentInfo.propTypes = {
  student: PropTypes.object,
  showLabels: PropTypes.bool
};

StudentInfo.defaultProps = {
  student: null,
  showLabels: false
};

const useStyles = makeStyles({
  student: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottom: '1px solid #f2f2f2',
    padding: '16px',
    '& p': {
      marginRight: 32
    }
  },
  bold: {
    '& p': {
      fontWeight: 'bold'
    }
  }
});

export default StudentInfo;
