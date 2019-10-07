import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { getUserData, validateFields, getErrorStatus } from '../../helpers';
import autoBind from '../../autoBind';

import * as Styled from '../Pages/PageStyles/StyledSignUp';

const propTypes = {
  accountType: PropTypes.string.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired
};

const allFields = ['fName', 'lName', 'email', 'phone', 'canText', 'password', 'confirmPassword'];
const errorCodeToMessage = {
  'auth/invalid-email': 'Invalid Email Address',
  'auth/email-already-in-use': 'Email Address is taken'
};
const accountTypeToCollection = {
  '': null,
  parent: 'parents',
  teacher: 'teachers',
  organization: 'organizations'
};

class GenericSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      email: '',
      phone: '',
      canText: false,
      password: '',
      confirmPassword: '',
      errors: {}
    };
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    autoBind(this);
  }

  getCheckBox() {
    return (
      <Checkbox
        id="canText"
        checked={this.state.canText}
        onChange={this.toggleCanText}
        color="primary"
      />
    );
  }

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[id] = value;
    this.setState(newState);
  }

  toggleCanText() {
    let { canText } = this.state;
    canText = !canText;
    this.setState({ canText });
  }

  handleSubmit() {
    const { email, password } = this.state;
    if (this.validateFields(allFields) === true) {
      this.firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            res.user
              .updateProfile({
                displayName: `${this.state.fName}`
              })
              .then(() => {
                res.user.sendEmailVerification();
              })
              .catch(err => {
                console.log(err);
              });
            this.db
              .collection(accountTypeToCollection.parent)
              .doc(res.user.uid)
              .set(
                this.getUserData(allFields.filter(e => e !== 'password' && e !== 'confirmPassword'))
              )
              .then(this.props.next);
          }
        })
        .catch(err => {
          const { errors } = this.state;
          errors.email =
            err.code === 'auth/invalid-email' || err.code === 'auth/email-already-in-use'
              ? errorCodeToMessage[err.code]
              : '';
          errors.password = err.code === 'auth/weak-password' ? err.message : '';
          this.setState({ errors });
          console.log(err);
        });
    }
  }

  render() {
    const { fName, lName, email, phone, password, confirmPassword, errors } = this.state;
    const { accountType, prev } = this.props;
    return (
      <Card>
        <CardHeader title={`${accountType} Application`} style={{ marginLeft: 5 }} />
        <CardContent>
          <Styled.FormFieldsContainer>
            <Styled.FormFeildsRow firstRow>
              <TextField
                error={getErrorStatus(errors.fName)}
                id="firstName"
                type="text"
                label="First Name"
                variant="outlined"
                helperText={errors.fName}
                value={fName}
                onChange={this.handleChange}
              />
              <TextField
                error={getErrorStatus(errors.lName)}
                id="lastName"
                type="text"
                label="Last Name"
                variant="outlined"
                helperText={errors.lName}
                value={lName}
                onChange={this.handleChange}
              />
            </Styled.FormFeildsRow>
            <Styled.FormFeildsRow>
              <TextField
                error={getErrorStatus(errors.phone)}
                id="phone"
                type="text"
                label="Phone"
                variant="outlined"
                helperText={errors.phone}
                value={phone}
                onChange={this.handleChange}
              />
              <TextField
                error={getErrorStatus(errors.email)}
                id="email"
                type="text"
                label="Email Address"
                variant="outlined"
                helperText={errors.email}
                value={email}
                onChange={this.handleChange}
              />
            </Styled.FormFeildsRow>
            <Styled.CheckboxRow>
              <FormControlLabel control={this.getCheckBox()} label="Phone can Text" />
            </Styled.CheckboxRow>
            <Styled.FormFeildsRow>
              <TextField
                error={getErrorStatus(errors.password)}
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                helperText={errors.password}
                value={password}
                onChange={this.handleChange}
              />
              <TextField
                error={getErrorStatus(errors.confirmPassword)}
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                variant="outlined"
                helperText={errors.confirmPassword}
                value={confirmPassword}
                onChange={this.handleChange}
              />
            </Styled.FormFeildsRow>
          </Styled.FormFieldsContainer>
          <Styled.FormFeildsOptions>
            <Button
              onClick={this.handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginBottom: 15 }}
            >
              Next
            </Button>
            <Styled.LinkButtonWrapper>
              <Styled.LinkButton onClick={prev}>Go Back</Styled.LinkButton>
            </Styled.LinkButtonWrapper>
          </Styled.FormFeildsOptions>
        </CardContent>
      </Card>
    );
  }
}

GenericSignUp.propTypes = propTypes;

export default GenericSignUp;
