import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getMMDDYYYY, getHrMn, getDateFromTimestamp } from '../../helpers';
import autoBind from '../../autoBind';
import '../../assets/css/Teacher.css';

const getDate = timestamp => getMMDDYYYY(getDateFromTimestamp(timestamp));
const getTime = timestamp => getHrMn(getDateFromTimestamp(timestamp));

class ViewClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      </div>
    );
  }
}

ViewClass.propTypes = {
  close: PropTypes.func.isRequired,
  cls: PropTypes.object.isRequired
};

export default ViewClass;
