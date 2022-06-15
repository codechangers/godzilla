import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Button, TextField } from '@material-ui/core';
import autoBind from '../../utils/autoBind';
import { db, auth } from '../../utils/firebase';
import { getUserData, validateFields, getErrorStatus } from '../../utils/helpers';

import * as Styled from './styles';

const idToDataMember = {
  name: 'name',
  address: 'address',
  aboutMe: 'aboutMe'
};

const allFields = ['name', 'address', 'aboutMe'];

const propTypes = {
  updateAccounts: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired
};

class ParentSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      aboutMe: '',
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

  handleSubmit() {
    if (this.validateFields(allFields)) {
      const user = auth.currentUser;
      const date = new Date();
      db.collection('organizations')
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
        <CardHeader title="Organization Account Information" />
        <CardContent>
          <Styled.Subtitle>Account Information</Styled.Subtitle>
          <Styled.FormFieldsRow firstRow>
            <TextField
              error={getErrorStatus(errors.name)}
              id="name"
              type="text"
              label="Organization Name"
              variant="outlined"
              helperText={errors.name}
              value={this.state.name}
              onChange={this.handleChange}
            />
            <TextField
              error={getErrorStatus(errors.address)}
              id="address"
              type="text"
              label="Address"
              variant="outlined"
              helperText={errors.address}
              value={this.state.address}
              onChange={this.handleChange}
            />
          </Styled.FormFieldsRow>
          <Styled.FormFieldsRow firstRow>
            <TextField
              error={getErrorStatus(errors.aboutMe)}
              id="aboutMe"
              type="text"
              label="Describe your Organization"
              variant="outlined"
              multiline
              helperText={errors.aboutMe}
              value={this.state.aboutMe}
              onChange={this.handleChange}
            />
          </Styled.FormFieldsRow>
          <Styled.NavigationButtons style={{ boxSizing: 'border-box', padding: 5 }}>
            <Button onClick={this.props.prev} variant="contained">
              Back
            </Button>
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Submit Organization Application
            </Button>
          </Styled.NavigationButtons>
        </CardContent>
      </Card>
    );
  }
}

ParentSignUp.propTypes = propTypes;

export default ParentSignUp;
