import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Button, TextField, MenuItem } from '@material-ui/core';
import autoBind from '../../autoBind';
import { getUserData, validateFields, getErrorStatus } from '../../helpers';
import '../../assets/css/Signup.css';

import * as Styled from '../Pages/PageStyles/StyledSignUp';

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
  updateAccounts: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
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
      errors: {}
    };
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    autoBind(this);
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
      const { user } = this.props;
      const date = new Date();
      this.props.db
        .collection('teachers')
        .doc(user.uid)
        .set({
          ...this.getUserData(allFields),
          isVerrified: false,
          isDeclined: false,
          isTraining: true,
          dateApplied: date,
          isRead: false
        })
        .then(() => this.props.updateAccounts(user))
        .then(this.props.next);
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <Card>
        <CardHeader title="Teacher Account Information" />
        <CardContent>
          <Styled.Subtitle>Account Information</Styled.Subtitle>
          <Styled.FormFieldsRow firstRow>
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
          </Styled.FormFieldsRow>
          <Styled.FormFieldsRow firstRow>
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
          </Styled.FormFieldsRow>
          <Styled.FormFieldsRow firstRow>
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
          </Styled.FormFieldsRow>
          <Styled.FormFieldsRow firstRow>
            <TextField
              className="white-label"
              error={getErrorStatus(errors.region)}
              id="address"
              type="text"
              label={locationToPrompt[this.state.location]}
              variant="outlined"
              helperText={errors.address}
              value={this.state.address}
              onChange={this.handleChange}
            />
          </Styled.FormFieldsRow>
          <Styled.NavigationButtons style={{ boxSizing: 'border-box', padding: 5 }}>
            <Button onClick={this.props.prev} variant="contained">
              Back
            </Button>
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Next
            </Button>
          </Styled.NavigationButtons>
        </CardContent>
      </Card>
    );
  }
}

TeacherSignUp.propTypes = propTypes;

export default TeacherSignUp;
