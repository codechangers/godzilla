import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Button
} from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import '../../assets/css/Teacher.css';
import autoBind from '../../autoBind';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class CreateClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      locationName: '',
      locationAddress: '',
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      daysOfWeek: [],
      startAge: 0,
      endAge: 0,
      price: 0,
      minStudents: 0,
      maxStudents: 0
    };
    autoBind(this);
  }

  setDate(date, dateType) {
    const newState = {};
    newState[dateType] = date;
    this.setState(newState);
  }

  getWeekDay(day) {
    return (
      <Checkbox
        checked={this.state.daysOfWeek.includes(day)}
        onChange={() => this.toggleWeekDay(day)}
        color="primary"
        value={day}
      />
    );
  }

  toggleWeekDay(day) {
    const { daysOfWeek } = this.state;
    const i = daysOfWeek.indexOf(day);
    if (i !== -1) {
      daysOfWeek.splice(i, 1);
    } else {
      daysOfWeek.push(day);
    }
    this.setState({ daysOfWeek });
  }

  handleInput(e) {
    const newState = this.state;
    newState[e.target.id] = e.target.value;
    this.setState({ ...newState });
  }

  render() {
    return (
      <Card style={{ width: '80%' }}>
        <CardHeader title="Create a Class" />
        <CardContent>
          <div className="full">
            <div className="half">
              <TextField
                id="name"
                type="text"
                label="Class Name"
                variant="outlined"
                value={this.state.name}
                onChange={this.handleInput}
              />
              <TextField
                id="locationName"
                type="text"
                label="Location Name"
                variant="outlined"
                value={this.state.locationName}
                onChange={this.handleInput}
              />
              <TextField
                id="locationAddress"
                type="text"
                label="Location Address"
                variant="outlined"
                value={this.state.locationAddress}
                onChange={this.handleInput}
              />
            </div>
            <div className="half">
              <div className="pickers">
                <KeyboardDatePicker
                  clearable
                  value={this.state.startDate}
                  placeholder="10/10/2010"
                  onChange={date => this.setDate(date, 'startDate')}
                  minDate={new Date()}
                  label="Start Date"
                  format="MM/dd/yyyy"
                />
                <KeyboardDatePicker
                  clearable
                  value={this.state.endDate}
                  placeholder="11/11/2011"
                  onChange={date => this.setDate(date, 'endDate')}
                  minDate={new Date()}
                  label="End Date"
                  format="MM/dd/yyyy"
                />
              </div>
              <div className="pickers">
                <KeyboardTimePicker
                  label="Start Time"
                  placeholder="8:00 AM"
                  mask="__:__ _M"
                  value={this.state.startTime}
                  onChange={time => this.setDate(time, 'startTime')}
                />
                <KeyboardTimePicker
                  label="End Time"
                  placeholder="2:00 PM"
                  mask="__:__ _M"
                  value={this.state.endTime}
                  onChange={time => this.setDate(time, 'endTime')}
                />
              </div>
            </div>
          </div>
          <div className="days-of-week">
            {weekDays.map(day => (
              <FormControlLabel
                value="top"
                key={`week-day-${day}`}
                control={this.getWeekDay(day)}
                label={day}
                labelPlacement="top"
              />
            ))}
          </div>
          <div className="number-data">
            <TextField
              id="startAge"
              type="number"
              label="Minimum Age"
              variant="outlined"
              value={this.state.startAge}
              onChange={this.handleInput}
              InputProps={{
                endAdornment: <InputAdornment position="end">years</InputAdornment>
              }}
            />
            <TextField
              id="endAge"
              type="number"
              label="Maximum Age"
              variant="outlined"
              value={this.state.endAge}
              onChange={this.handleInput}
              InputProps={{
                endAdornment: <InputAdornment position="end">years</InputAdornment>
              }}
            />
            <TextField
              id="price"
              type="number"
              label="Class Price"
              variant="outlined"
              value={this.state.price}
              onChange={this.handleInput}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
            <TextField
              id="minStudents"
              type="number"
              label="Min Students"
              variant="outlined"
              value={this.state.minStudents}
              onChange={this.handleInput}
              InputProps={{
                endAdornment: <InputAdornment position="end">students</InputAdornment>
              }}
            />
            <TextField
              id="maxStudents"
              type="number"
              label="Max Students"
              variant="outlined"
              value={this.state.maxStudents}
              onChange={this.handleInput}
              InputProps={{
                endAdornment: <InputAdornment position="end">students</InputAdornment>
              }}
            />
          </div>
          <div className="full">
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.submit({ ...this.state })}
              style={{ width: '40%', marginTop: '30px' }}
            >
              Create Class
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

CreateClass.propTypes = {
  submit: PropTypes.func.isRequired
};

export default CreateClass;
