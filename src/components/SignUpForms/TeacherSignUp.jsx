import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Button, TextField, MenuItem } from '@material-ui/core';
import autoBind from '../../autoBind';
import { getUserData, validateFields, getErrorStatus } from '../../helpers';
import '../../assets/css/Signup.css';

const locationToPrompt = {
  '': 'Location Name',
  school: 'What is the name of the school?',
  office: 'What is the name of the company?',
  house: 'What is the address of the house?',
  other: 'Describe the location'
};

const idToDataMember = {
  address: 'address',
  whyTeach: 'whyTeach',
  prevExp: 'prevExp',
  region: 'region',
  location: 'location'
};

const allFields = ['whyTeach', 'prevExp', 'region', 'location', 'address'];

const propTypes = {
  db: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

class TeacherSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whyTeach: '',
      prevExp: '',
      region: '',
      location: '',
      address: '',
      whyTeachError: '',
      prevExpError: '',
      regionError: '',
      locationError: '',
      addressError: '',
      errors: {}
    };
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    autoBind(this);
  }

  getTeacherData() {
    const date = new Date();
    // Filter out any fields for local state that shouldn't be saved to the teacher document.
    return Object.keys(this.state)
      .filter(key => Object.keys(idToDataMember).includes(key))
      .reduce(
        (obj, key) => {
          const newObj = { ...obj };
          newObj[key] = this.state[key];
          return newObj;
        },
        {
          isVerrified: false,
          isDeclined: false,
          isTraining: true,
          dateApplied: date,
          isRead: false
        }
      );
  }

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[idToDataMember[id]] = value;
    this.setState(newState);
  }

  handleSelectLocation(e) {
    const { name, value } = e.target;
    const newState = {};
    newState[idToDataMember[name]] = value;
    this.setState(newState);
  }

  handleSubmit() {
    if (this.validateFields(allFields) === true) {
      this.props.db
        .collection('teachers')
        .doc(this.props.firebase.auth().currentUser.uid)
        .set(this.getTeacherData())
        .then(this.props.login);
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="signup-wrapper">
        <Card className="signup-form">
          <CardHeader title="Teacher Account Information" />
          <CardContent className="column">
            <TextField
              error={getErrorStatus(errors.region)}
              id="whyTeach"
              type="text"
              label="Why do you want to teach STEM topics to kids?"
              variant="outlined"
              multiline
              helperText={errors.whyTeach}
              value={this.state.whyTeach}
              onChange={this.handleChange}
            />
            <TextField
              error={getErrorStatus(errors.region)}
              id="prevExp"
              type="text"
              label="Do you have any previous teaching experience?"
              variant="outlined"
              multiline
              helperText={errors.prevExp}
              value={this.state.prevExp}
              onChange={this.handleChange}
            />
            <TextField
              error={getErrorStatus(errors.region)}
              id="region"
              type="text"
              label="Where Will you Teach? (City, State)"
              variant="outlined"
              helperText={errors.region}
              value={this.state.region}
              onChange={this.handleChange}
            />
            <TextField
              error={getErrorStatus(errors.region)}
              id="location"
              name="location"
              select
              label="What type of Location will you teach at?"
              variant="outlined"
              helperText={errors.location}
              value={this.state.location}
              onChange={this.handleSelectLocation}
            >
              <MenuItem key="school" value="school">
                School
              </MenuItem>
              <MenuItem key="office" value="office">
                Company&apos;s Office
              </MenuItem>
              <MenuItem key="house" value="house">
                House
              </MenuItem>
              <MenuItem key="other" value="other">
                Other
              </MenuItem>
            </TextField>
            <TextField
              error={getErrorStatus(errors.region)}
              id="address"
              type="text"
              label={locationToPrompt[this.state.location]}
              variant="outlined"
              helperText={errors.address}
              value={this.state.address}
              onChange={this.handleChange}
            />
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Submit Teacher Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

TeacherSignUp.propTypes = propTypes;

export default TeacherSignUp;
