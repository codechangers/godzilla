import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import ContactsIcon from '@material-ui/icons/Contacts';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { URL } from '../../globals';
import InfoCardHeader from './InfoCardHeader';
import CSVDownload from '../UI/CSVDownload';
import autoBind from '../../autoBind';
import StudentInfo from './StudentInfo';

class ClassInfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
    autoBind(this);
  }

  componentDidMount() {
    const { children } = this.props.cls;
    const students = [];
    children.forEach(childRef => {
      childRef.get().then(childDoc => {
        const student = { ...childDoc.data(), id: childDoc.id };
        students.push(student);
        if (students.length === children.length) {
          this.setState({ students });
        }
      });
    });
  }

  getStudentData() {
    return this.state.students.map(s => ({
      first_name: s.fName,
      last_name: s.lName,
      username: s.learnID || `user${Math.floor(Math.random() * 2000)}`,
      password: '12345678'
    }));
  }

  render() {
    const { cls, openUpdate, openDelete } = this.props;
    return (
      <Paper className="infocard-wrapper">
        <InfoCardHeader cls={cls} />
        <div className="options">
          <CopyToClipboard text={`${URL}/search/${cls.id}`}>
            <Button variant="contained">
              <LinkIcon />
              STUDENT SIGN UP LINK
            </Button>
          </CopyToClipboard>
          <CSVDownload filename={`${cls.name}-students.csv`} data={this.getStudentData()}>
            <Button variant="contained">
              <DownloadIcon />
              Download Logins
            </Button>
          </CSVDownload>
          <Button variant="contained">
            <ContactsIcon />
            Contact Info
          </Button>
          <Button variant="contained" onClick={openUpdate}>
            <EditIcon />
            EDIT CLASS
          </Button>
          <Button variant="contained" onClick={openDelete}>
            <DeleteIcon />
            DELETE CLASS
          </Button>
        </div>
        <div className="students-wrapper">
          <StudentInfo showLabels />
          {this.state.students.map(student => (
            <StudentInfo student={student} key={student.id} />
          ))}
        </div>
      </Paper>
    );
  }
}

ClassInfoCard.propTypes = {
  cls: PropTypes.object.isRequired,
  openUpdate: PropTypes.func.isRequired,
  openDelete: PropTypes.func.isRequired
};

export default ClassInfoCard;
