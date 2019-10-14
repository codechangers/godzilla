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
import ParentIcon from '../../assets/images/parentIcon.svg';
import TeacherIcon from '../../assets/images/teacherIcon.svg';
import BlankIcon from '../../assets/images/blank.svg';

import * as Styled from '../Pages/PageStyles/StyledSignUp';

const propTypes = {
  accountType: PropTypes.string.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
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
const accountTypeToIcon = {
  '': null,
  parent: ParentIcon,
  teacher: TeacherIcon,
  organization: BlankIcon
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
      address: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    this.firebase = props.firebase;
    this.db = props.db;
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
    const { accountType } = this.props;
    if (this.validateFields([...allFields, accountType === 'parent' ? 'address' : '']) === true) {
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
                this.getUserData([
                  ...allFields.filter(e => e !== 'password' && e !== 'confirmPassword'),
                  accountType === 'parent' ? 'address' : ''
                ])
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
    const { fName, lName, email, phone, address, password, confirmPassword, errors } = this.state;
    const { accountType, prev } = this.props;
    return (
      <Card>
        <CardHeader
          title={`${accountType} Application`}
          action={<img src={accountTypeToIcon[accountType]} alt="Icon" style={{ width: 60 }} />}
          style={{ marginLeft: 5 }}
        />
        <CardContent>
          <Styled.Subtitle>
            {accountType === 'parent' ? 'Parent or Guardian Information' : 'Account Information'}
          </Styled.Subtitle>
          <Styled.FormFieldsContainer>
            <Styled.FormFieldsRow firstRow>
              <TextField
                error={getErrorStatus(errors.fName)}
                id="fName"
                type="text"
                label="First Name"
                variant="outlined"
                helperText={errors.fName}
                value={fName}
                onChange={this.handleChange}
              />
              <TextField
                error={getErrorStatus(errors.lName)}
                id="lName"
                type="text"
                label="Last Name"
                variant="outlined"
                helperText={errors.lName}
                value={lName}
                onChange={this.handleChange}
              />
            </Styled.FormFieldsRow>
            <Styled.FormFieldsRow>
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
            </Styled.FormFieldsRow>
            <Styled.CheckboxRow>
              <FormControlLabel control={this.getCheckBox()} label="Okay to receive texts" />
              <p
                style={{
                  margin: '-8px 0 0 32px',
                  paddingBottom: '8px',
                  fontSize: '0.75rem',
                  color: 'rgba(0, 0, 0, 0.5)'
                }}
              >
                Subscribe to stay updated with new programs and offers
              </p>
            </Styled.CheckboxRow>
            {accountType === 'parent' ? (
              <Styled.FormFieldsRow firstRow>
                <TextField
                  error={getErrorStatus(errors.address)}
                  id="address"
                  type="text"
                  label="Address"
                  variant="outlined"
                  helperText={errors.address}
                  value={address}
                  onChange={this.handleChange}
                />
              </Styled.FormFieldsRow>
            ) : null}
            <Styled.FormFieldsRow>
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
            </Styled.FormFieldsRow>
          </Styled.FormFieldsContainer>
          <Styled.FormFieldsOptions>
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
          </Styled.FormFieldsOptions>
        </CardContent>
      </Card>
    );
  }
}

GenericSignUp.propTypes = propTypes;

export default GenericSignUp;
