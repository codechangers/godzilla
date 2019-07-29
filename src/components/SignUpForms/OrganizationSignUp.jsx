import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Button, TextField } from '@material-ui/core';
import autoBind from '../../autoBind';
import { getUserData, validateFields, getErrorStatus } from '../../helpers';

const idToDataMember = {
  name: 'name',
  address: 'address',
  aboutMe: 'aboutMe'
};

const allFields = ['name', 'address', 'aboutMe'];

const propTypes = {
  db: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
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

  getOrgData() {
    // Filter out any fields for local state that shouldn't be saved to the organization document.
    return Object.keys(this.state)
      .filter(key => Object.keys(idToDataMember).includes(key))
      .reduce(
        (obj, key) => {
          const newObj = { ...obj };
          newObj[key] = this.state[key];
          return newObj;
        },
        { isVerrified: false }
      );
  }

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[idToDataMember[id]] = value;
    this.setState(newState);
  }

  handleSubmit() {
    if (this.validateFields(allFields)) {
      this.props.db
        .collection('organizations')
        .doc(this.props.firebase.auth().currentUser.uid)
        .set(this.getOrgData())
        .then(this.props.login);
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="signup-wrapper">
        <Card className="signup-form">
          <CardHeader title="Organization Account Information" />
          <CardContent className="column">
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
            <TextField
              error={getErrorStatus(errors.aboutMe)}
              id="aboutMe"
              type="text"
              label="Describe your Organization"
              variant="outlined"
              helperText={errors.aboutMe}
              value={this.state.aboutMe}
              onChange={this.handleChange}
            />
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Submit Organization Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

ParentSignUp.propTypes = propTypes;

export default ParentSignUp;
