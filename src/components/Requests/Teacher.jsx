import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  Divider,
  Button,
  ListItemText,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Tooltip
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import NewIcon from '@material-ui/icons/Lens';
import autoBind from '../../autoBind';

const propTypes = {
  db: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  declineRequest: PropTypes.func.isRequired
};

const isReadToBackgroundColor = {
  true: 'is-read',
  false: 'is-not-read'
};

class TeacherRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: null,
      teacher: null,
      isRead: null,
      open: false
    };
    autoBind(this);
  }

  componentDidMount() {
    this.props.db
      .collection('parents')
      .doc(this.props.teacher.id)
      .get()
      .then(doc => {
        this.setState({
          parent: doc.data(),
          teacher: this.props.teacher,
          isRead: this.props.teacher.isRead
        });
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }

  getModalData() {
    return (
      <Table className="modal-table">
        <TableBody>
          <TableRow>
            <TableCell className="table-header">Name</TableCell>
            <TableCell>{`${this.state.parent.fName} ${this.state.parent.lName}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-header">Email</TableCell>
            <TableCell>{this.state.parent.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-header">Phone</TableCell>
            <TableCell>{this.state.parent.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-header">Date Applied</TableCell>
            <TableCell>
              {new Date(this.props.teacher.dateApplied.seconds * 1000).toDateString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-header">Type of Teaching Location</TableCell>
            <TableCell>{this.props.teacher.location}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-header">Desired Region</TableCell>
            <TableCell>{this.props.teacher.region}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-header">Why they want to Teach</TableCell>
            <TableCell>{this.props.teacher.whyTeach}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-header">Previous Experience</TableCell>
            <TableCell>{this.props.teacher.prevExp}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  getStatus() {
    return this.props.teacher.isDeclined === true ? (
      <div className="declined">
        <Button
          variant="contained"
          size="large"
          color="secondary"
          disabled
          className="applicant-status"
        >
          <CloseIcon />
          Declined
        </Button>
      </div>
    ) : (
      <div className="accepted">
        <Button variant="contained" size="large" disabled className="applicant-status">
          <DoneIcon />
          Accepted
        </Button>
      </div>
    );
  }

  getOptionButtons() {
    const { teacher } = this.props;
    return this.props.teacher.isDeclined === false && this.props.teacher.isVerrified === false ? (
      <div className="options">
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => {
            this.props.acceptRequest(teacher);
          }}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => {
            this.props.declineRequest(teacher);
          }}
        >
          Decline
        </Button>
      </div>
    ) : (
      this.getStatus()
    );
  }

  handleOpen() {
    let { open } = this.state;
    open = true;
    this.setState({ open });

    this.props.db
      .collection('teachers')
      .doc(this.props.teacher.id)
      .update({
        isRead: true
      });

    this.props.db
      .collection('teachers')
      .doc(this.props.teacher.id)
      .get()
      .then(updatedTeacher => {
        this.setState({
          teacher: updatedTeacher,
          isRead: true
        });
      });
  }

  handleClose() {
    let { open } = this.state;
    open = false;
    this.setState({ open });
  }

  render() {
    return this.state.parent === null || this.state.teacher === null ? (
      <div className="teacher-request" />
    ) : (
      <div>
        <ListItem button onClick={this.handleOpen} className="teacher-request">
          <NewIcon
            fontSize="small"
            className={`read-indicator ${isReadToBackgroundColor[this.state.isRead]}`}
          />
          <ListItemText
            className="teacher-request-name"
            primary={`${this.state.parent.fName} ${this.state.parent.lName}`}
          />
          {this.getOptionButtons()}
        </ListItem>
        <Divider />
        <Modal className="admin-modal-wrapper" open={this.state.open} onClose={this.handleClose}>
          <Paper className="admin-modal">
            <Tooltip title="Close" placement="left">
              <IconButton
                aria-label="close"
                onClick={this.handleClose}
                className="admin-modal-close"
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            {this.getModalData()}
            {this.getOptionButtons()}
          </Paper>
        </Modal>
      </div>
    );
  }
}

TeacherRequest.propTypes = propTypes;

export default TeacherRequest;
