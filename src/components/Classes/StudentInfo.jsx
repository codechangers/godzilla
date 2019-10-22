import React from 'react';
import PropTypes from 'prop-types';
import { getAgeFromBirthday } from '../../helpers';

const StudentInfo = ({ showLabels, student }) =>
  student !== null || showLabels ? (
    <div className={`infocard-student${showLabels ? ' bold' : ''}`}>
      <p>{showLabels ? 'Name' : `${student.fName} ${student.lName}`}</p>
      <p>{showLabels ? 'Gender' : `${student.gender}`}</p>
      <p>{showLabels ? 'Age' : `${getAgeFromBirthday(student.birthDate)}`}</p>
      <p>{showLabels ? 'Current Grade' : `${student.currentGrade} Grade`}</p>
      <p>{showLabels ? 'Current School' : `${student.currentSchool}`}</p>
      <p>{showLabels ? 'Student ID' : `${student.learnID || 'No Student ID'}`}</p>
    </div>
  ) : null;

StudentInfo.propTypes = {
  student: PropTypes.object,
  showLabels: PropTypes.bool
};

StudentInfo.defaultProps = {
  student: null,
  showLabels: false
};

export default StudentInfo;
