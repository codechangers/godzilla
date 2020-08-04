import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@material-ui/core';
import { getAgeFromBirthday } from '../../helpers';

const propTypes = {
  showLables: PropTypes.bool,
  student: PropTypes.object
};

const defaultProps = {
  showLables: false,
  student: null
};

const lables = ['Name', 'Gender', 'Age', 'Current Grade', 'Current School', 'Student ID'];

const getInfo = student => [
  `${student.fName} ${student.lName}`,
  `${student.gender}`,
  `${student.birthDate ? getAgeFromBirthday(student.birthDate) : 'No Birth Date'}`,
  `${student.currentGrade} Grade`,
  `${student.currentSchool}`,
  `${student.learnID || 'No Student ID'}`
];

const StudentInfoRow = ({ showLables, student }) => {
  let info = [];
  if (showLables) info = lables;
  else if (student !== null) info = getInfo(student);
  return (
    <TableRow>
      {info.map((item, i) => (
        <TableCell key={i}>{item}</TableCell>
      ))}
    </TableRow>
  );
};

StudentInfoRow.propTypes = propTypes;
StudentInfoRow.defaultProps = defaultProps;

export default StudentInfoRow;
