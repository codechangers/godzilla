import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Checkbox,
  InputAdornment,
  Button,
  FormControlLabel,
  MenuItem,
  Typography,
  withStyles
} from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import {
  getUserData,
  validateFields,
  getErrorStatus,
  getDateFromTimestamp,
  rgba,
  rgb
} from '../../utils/helpers';
import { programTypeToText, weekDays } from '../../utils/globals';
import autoBind from '../../utils/autoBind';

const allFields = [
  'name',
  'programType',
  'price',
  'description',
  'locationName',
  'locationAddress',
  'daysOfWeek',
  'startDate',
  'endDate',
  'startTime',
  'endTime',
  'startAge',
  'endAge',
  'minStudents',
  'maxStudents',
  'privacyCode',
  'waiverURL'
];
const dontConvert = [
  'name',
  'programType',
  'description',
  'locationName',
  'locationAddress',
  'daysOfWeek',
  'isPrivate',
  'privacyCode',
  'hasWaiver',
  'waiverURL'
];
const convertToNumber = ['startAge', 'endAge', 'price', 'minStudents', 'maxStudents'];
const convertToDate = ['startDate', 'endDate', 'startTime', 'endTime'];

class ClassEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      programType: 'contest',
      description: '',
      locationName: '',
      locationAddress: '',
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      daysOfWeek: [],
      startAge: '',
      endAge: '',
      price: '',
      minStudents: '',
      maxStudents: '',
      isPrivate: false,
      privacyCode: '',
      hasWaiver: false,
      waiverURL: '',
      errors: {}
    };
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    autoBind(this);
  }

  componentDidMount() {
    const { cls } = this.props;
    const newState = {};
    Object.keys(cls).forEach(attr => {
      if (dontConvert.includes(attr)) {
        newState[attr] = cls[attr];
      } else if (convertToNumber.includes(attr)) {
        newState[attr] = Number(cls[attr]);
      } else if (convertToDate.includes(attr)) {
        newState[attr] = getDateFromTimestamp(cls[attr]);
      }
    });
    this.setState(newState);
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
    const { id, name, value } = e.target;
    const newState = {};
    newState[id || name] = value;
    this.setState(newState);
  }

  handleSubmit() {
    let fields = allFields;
    if (!this.state.isPrivate) {
      fields = fields.filter(a => a !== 'privacyCode');
    }
    if (!this.state.hasWaiver) {
      fields = fields.filter(a => a !== 'waiverURL');
    }
    if (this.validateFields(fields)) {
      const data = { ...this.state };
      delete data.errors;
      if (!this.state.isPrivate) {
        data.privacyCode = '';
      }
      if (!this.state.hasWaiver) {
        data.waiverURL = '';
      }
      this.props.submit(data);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Typography variant="h4" style={{ marginBottom: 24 }}>
          {this.props.title}
        </Typography>
        <TextField
          id="name"
          className={`${classes.input} ${classes.most}`}
          type="text"
          label="Name of Class"
          variant="outlined"
          value={this.state.name}
          onChange={this.handleInput}
          error={getErrorStatus(this.state.errors.name)}
          helperText={this.state.errors.name}
        />
        <TextField
          id="description"
          className={`${classes.input} ${classes.wide}`}
          type="text"
          multiline
          rows="4"
          label="Description of Class"
          variant="outlined"
          value={this.state.description}
          onChange={this.handleInput}
          error={getErrorStatus(this.state.errors.description)}
          helperText={this.state.errors.description}
        />
        <div className={classes.inliner}>
          <TextField
            id="price"
            className={`${classes.input} ${classes.most}`}
            type="text"
            label="Price Per Student"
            variant="outlined"
            value={this.state.price}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.price)}
            helperText={this.state.errors.price}
            InputProps={{
              startAdornment: (
                <InputAdornment className={classes.boldIcon} position="start">
                  $
                </InputAdornment>
              )
            }}
          />
          <TextField
            id="programType"
            name="programType"
            className={classes.input}
            type="text"
            label="Type of Program"
            variant="outlined"
            value={this.state.programType}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.programType)}
            helperText={this.state.errors.programType}
            select
          >
            {Object.entries(programTypeToText).map(([value, text]) => (
              <MenuItem value={value} key={value}>
                {text}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {this.state.errors.daysOfWeek ? (
          <Typography variant="body2" style={{ textAlign: 'center', color: 'red' }}>
            {this.state.errors.daysOfWeek}
          </Typography>
        ) : null}
        <div className={classes.daysOfWeek}>
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
        <div className={classes.inliner}>
          <KeyboardDatePicker
            clearable
            className={classes.input}
            value={this.state.startDate}
            placeholder="10/10/2010"
            onChange={date => this.setDate(date, 'startDate')}
            label={this.state.errors.startDate ? this.state.errors.startDate : 'Start Date'}
            error={getErrorStatus(this.state.errors.startDate)}
            format="MM/dd/yyyy"
          />
          <KeyboardDatePicker
            clearable
            className={classes.input}
            value={this.state.endDate}
            placeholder="11/11/2011"
            onChange={date => this.setDate(date, 'endDate')}
            label={this.state.errors.endDate ? this.state.errors.endDate : 'End Date'}
            error={getErrorStatus(this.state.errors.endDate)}
            format="MM/dd/yyyy"
          />
        </div>
        <div className={classes.inliner}>
          <KeyboardTimePicker
            label={this.state.errors.startTime ? this.state.errors.startTime : 'Start Time'}
            error={getErrorStatus(this.state.errors.startTime)}
            className={classes.input}
            placeholder="8:00 AM"
            mask="__:__ _M"
            keyboardIcon={<QueryBuilderIcon />}
            value={this.state.startTime}
            onChange={time => this.setDate(time, 'startTime')}
          />
          <KeyboardTimePicker
            label={this.state.errors.endTime ? this.state.errors.endTime : 'End Time'}
            error={getErrorStatus(this.state.errors.endTime)}
            className={classes.input}
            placeholder="2:00 PM"
            mask="__:__ _M"
            keyboardIcon={<QueryBuilderIcon />}
            value={this.state.endTime}
            onChange={time => this.setDate(time, 'endTime')}
          />
        </div>
        <TextField
          id="locationName"
          className={`${classes.input} ${classes.most}`}
          type="text"
          label="Location Name"
          variant="outlined"
          value={this.state.locationName}
          onChange={this.handleInput}
          error={getErrorStatus(this.state.errors.locationName)}
          helperText={this.state.errors.locationName}
        />
        <TextField
          id="locationAddress"
          className={`${classes.input} ${classes.most}`}
          type="text"
          label="Location Address"
          variant="outlined"
          value={this.state.locationAddress}
          onChange={this.handleInput}
          error={getErrorStatus(this.state.errors.locationAddress)}
          helperText={this.state.errors.locationAddress}
        />
        <div className={classes.inliner}>
          <TextField
            id="startAge"
            className={classes.input}
            type="text"
            label="Minimum Age"
            variant="outlined"
            value={this.state.startAge}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.startAge)}
            helperText={this.state.errors.startAge}
            InputProps={{
              endAdornment: (
                <InputAdornment className={classes.bold} position="end">
                  years
                </InputAdornment>
              )
            }}
          />
          <TextField
            id="endAge"
            className={classes.input}
            type="text"
            label="Maximum Age"
            variant="outlined"
            value={this.state.endAge}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.endAge)}
            helperText={this.state.errors.endAge}
            InputProps={{
              endAdornment: (
                <InputAdornment className={classes.bold} position="end">
                  years
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className={classes.inliner}>
          <TextField
            id="minStudents"
            className={classes.input}
            type="text"
            label="Min Students"
            variant="outlined"
            value={this.state.minStudents}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.minStudents)}
            helperText={this.state.errors.minStudents}
            InputProps={{
              endAdornment: (
                <InputAdornment className={classes.bold} position="end">
                  students
                </InputAdornment>
              )
            }}
          />
          <TextField
            id="maxStudents"
            className={classes.input}
            type="text"
            label="Max Students"
            variant="outlined"
            value={this.state.maxStudents}
            onChange={this.handleInput}
            error={getErrorStatus(this.state.errors.maxStudents)}
            helperText={this.state.errors.maxStudents}
            InputProps={{
              endAdornment: (
                <InputAdornment className={classes.bold} position="end">
                  students
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className={classes.inliner} style={{ alignItems: 'flex-start' }}>
          <div className={`${classes.input} ${classes.most}`} style={{ marginBottom: 0 }}>
            <FormControlLabel
              value="top"
              control={
                <Checkbox
                  checked={this.state.isPrivate}
                  onChange={() => this.setState({ isPrivate: !this.state.isPrivate })}
                  color="primary"
                  value={this.state.isPrivate}
                />
              }
              label="This Class is Private"
              labelPlacement="end"
              style={{ flexGrow: 'grow' }}
            />
            {this.state.isPrivate && (
              <TextField
                id="privacyCode"
                className={`${classes.input} ${classes.most}`}
                style={{ width: '100%' }}
                type="text"
                label="Private Registration Code"
                variant="outlined"
                value={this.state.privacyCode}
                onChange={this.handleInput}
                error={getErrorStatus(this.state.errors.privacyCode)}
                helperText={this.state.errors.privacyCode}
                disabled={!this.state.isPrivate}
              />
            )}
          </div>
          <div className={`${classes.input} ${classes.most}`} style={{ marginBottom: 0 }}>
            <FormControlLabel
              value="top"
              control={
                <Checkbox
                  checked={this.state.hasWaiver}
                  onChange={() => this.setState({ hasWaiver: !this.state.hasWaiver })}
                  color="primary"
                  value={this.state.hasWaiver}
                />
              }
              label="Class requires a Waiver"
              labelPlacement="end"
              style={{ flexGrow: 'grow' }}
            />
            {this.state.hasWaiver && (
              <TextField
                id="waiverURL"
                className={`${classes.input} ${classes.most}`}
                style={{ width: '100%' }}
                type="text"
                label="URL of online Waiver"
                variant="outlined"
                value={this.state.waiverURL}
                onChange={this.handleInput}
                error={getErrorStatus(this.state.errors.waiverURL)}
                helperText={this.state.errors.waiverURL}
                disabled={!this.state.hasWaiver}
              />
            )}
          </div>
        </div>
        <div className={classes.options}>
          <Button onClick={this.props.close}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={this.handleSubmit}>
            {this.props.submitText}
          </Button>
        </div>
      </>
    );
  }
}

ClassEditor.propTypes = {
  submit: PropTypes.func.isRequired,
  title: PropTypes.string,
  submitText: PropTypes.string,
  cls: PropTypes.object,
  close: PropTypes.func,
  classes: PropTypes.object.isRequired
};

ClassEditor.defaultProps = {
  title: 'Create a Class',
  submitText: 'Create Class',
  cls: {},
  close: () => console.log('closing...')
};

const styles = theme => ({
  input: {
    marginBottom: 21
  },
  most: {
    width: '70%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  wide: {
    width: '100%'
  },
  inliner: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& $input': {
      width: '45%'
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& $input': {
        width: '100%'
      }
    }
  },
  options: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '40px',
    '& button': {
      paddingLeft: 24,
      paddingRight: 24,
      margin: '0 10px'
    }
  },
  boldIcon: {
    '& p': {
      fontWeight: 700,
      color: rgb(117, 117, 117)
    }
  },
  bold: {
    '& p': {
      fontWeight: 'normal',
      color: rgba(255, 255, 255, 0.87)
    }
  },
  daysOfWeek: {
    width: '100%',
    margin: '0',
    marginBottom: '21px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
});

export default withStyles(styles)(ClassEditor);
