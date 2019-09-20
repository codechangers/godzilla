import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getAgeFromBirthday } from '../../helpers';
import { URL } from '../../globals';
import InfoCardHeader from './InfoCardHeader';

class StudentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: null
    };
  }

  componentDidMount() {
    if (this.props.student !== null) {
      this.props.student.get().then(studentDoc => {
        this.setState({ student: { ...studentDoc.data(), id: studentDoc.id } });
      });
    }
  }

  render() {
    const { showLabels } = this.props;
    const { student } = this.state;
    return student !== null || showLabels ? (
      <div className={`infocard-student${showLabels ? ' bold' : ''}`}>
        <p>{showLabels ? 'Name' : `${student.fName} ${student.lName}`}</p>
        <p>{showLabels ? 'Gender' : `${student.gender}`}</p>
        <p>{showLabels ? 'Age' : `${getAgeFromBirthday(student.birthDate)}`}</p>
        <p>{showLabels ? 'Current Grade' : `${student.currentGrade} Grade`}</p>
        <p>{showLabels ? 'Current School' : `${student.currentSchool}`}</p>
        <p>Status</p>
      </div>
    ) : null;
  }
}

StudentInfo.propTypes = {
  student: PropTypes.object,
  showLabels: PropTypes.bool
};

StudentInfo.defaultProps = {
  student: null,
  showLabels: false
};

const ClassInfoCard = ({ cls, openUpdate, openDelete }) => (
  <Paper className="infocard-wrapper">
    <InfoCardHeader cls={cls} />
    <div className="options">
      <Button variant="contained" onClick={openUpdate}>
        <EditIcon />
        EDIT CLASS DETAILS
      </Button>
      <CopyToClipboard text={`${URL}/parent/signup/${cls.id}`}>
        <Button variant="contained">
          <LinkIcon />
          STUDENT SIGN UP LINK
        </Button>
      </CopyToClipboard>
      <Button variant="contained" onClick={openDelete}>
        <DeleteIcon />
        DELETE CLASS
      </Button>
    </div>
    <div className="students-wrapper">
      <StudentInfo showLabels />
      {cls.children.map(childRef => (
        <StudentInfo student={childRef} key={childRef.id} />
      ))}
    </div>
  </Paper>
);

ClassInfoCard.propTypes = {
  cls: PropTypes.object.isRequired,
  openUpdate: PropTypes.func.isRequired,
  openDelete: PropTypes.func.isRequired
};

export default ClassInfoCard;
