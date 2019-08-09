import React from 'react';
import PropTypes from 'prop-types';
import { Modal, IconButton, Tooltip, Button, Paper, Card } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ClassEditor from './Editor';
import { getDate, getTime } from '../../helpers';
import autoBind from '../../autoBind';
import '../../assets/css/Teacher.css';

class ClassViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditor: false,
      showDelete: false
    };
    autoBind(this);
  }

  getDaysString() {
    let daysString = '';
    this.props.cls.daysOfWeek.forEach(day => {
      daysString += `${day}, `;
    });
    return daysString.length > 0 ? daysString.substr(0, daysString.length - 2) : '';
  }

  render() {
    const { cls } = this.props;
    return (
      <div className="inner-page">
        <Button className="back-button" onClick={this.props.close}>
          <ArrowBackIcon />
          Back
        </Button>
        <div className="actions">
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => this.setState({ showEditor: true })}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" onClick={() => this.setState({ showDelete: true })}>
            <IconButton color="secondary">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
        <h1>{cls.name}</h1>
        <Paper className="class-wrapper">
          <h3>{`Location: ${cls.locationName} - ${cls.locationAddress}`}</h3>
          <h3>{`Class Start Date: ${getDate(cls.startDate)}`}</h3>
          <h3>{`Class End Date: ${getDate(cls.endDate)}`}</h3>
          <h3>{`Class Start Time: ${getTime(cls.startTime)}`}</h3>
          <h3>{`Class End Time: ${getTime(cls.endTime)}`}</h3>
          <h3>{`Days of the week: ${this.getDaysString()}`}</h3>
          <h3>{`Acceptable Ages: ${cls.startAge} - ${cls.endAge}`}</h3>
          <h3>{`Expected # of Students: ${cls.minStudents} - ${cls.maxStudents}`}</h3>
          <h3>{`Price: $${cls.price}`}</h3>
        </Paper>
        <Modal
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          open={this.state.showEditor || this.state.showDelete}
          onClose={() => this.setState({ showEditor: false, showDelete: false })}
          disableAutoFocus
        >
          {this.state.showEditor ? (
            <ClassEditor
              submit={classData => {
                this.props.update(this.props.cls.id, classData);
                this.setState({ showEditor: false });
              }}
              title="Edit Class Info"
              submitText="Update Class"
              cls={this.props.cls}
            />
          ) : (
            <Card className="delete-card">
              <h1>{`Are you sure you want to delete ${this.props.cls.name}?`}</h1>
              <h4>This will remove the class and all signed up students permanently</h4>
              <div className="options">
                <Button
                  color="default"
                  variant="outlined"
                  onClick={() => this.setState({ showDelete: false })}
                >
                  Cancel
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    this.props.delete(this.props.cls.id);
                    this.setState({ showDelete: false });
                    this.props.close();
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          )}
        </Modal>
      </div>
    );
  }
}

ClassViewer.propTypes = {
  close: PropTypes.func.isRequired,
  cls: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired
};

export default ClassViewer;
