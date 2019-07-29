import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GenericSignUp from './SignUpForms/GenericSignUp';
import ParentSignUp from './SignUpForms/ParentSignUp';
import TeacherSignUp from './SignUpForms/TeacherSignUp';
import OrganizationSignUp from './SignUpForms/OrganizationSignUp';
import autoBind from '../autoBind';
import { getUserData, validateFields, getErrorStatus } from '../helpers';
import '../assets/css/Signup.css';

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

const idToDataMember = {
  firstName: 'fName',
  lastName: 'lName',
  Email: 'email',
  phone: 'phone',
  canText: 'canText',
  password: 'password',
  confirmPassword: 'confirmPassword'
};

const genericFields = ['fName', 'lName', 'email', 'phone', 'canText'];
const allFields = [...genericFields, 'password', 'confirmPassword'];

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  updateAccounts: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.string)
  })
};

const defaultProps = {
  location: {
    state: {
      accountType: 'parent'
    }
  }
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      address: '',
      email: '',
      phone: '',
      canText: false,
      password: '',
      confirmPassword: '',
      isLoggedIn: false,
      isRegistered: false,
      errors: {}
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    autoBind(this);
  }

  componentWillReceiveProps(props) {
    if (props.accounts.teachers) {
      this.setState({ isLoggedIn: true });
    }
    if (props.accounts.organizations) {
      this.setState({ isLoggedIn: true });
    }
  }

  getForm() {
    switch (this.props.location.state.accountType) {
      case 'parent':
        return (
          <ParentSignUp
            db={this.db}
            firebase={this.firebase}
            login={() => {
              this.setState({ isLoggedIn: true });
            }}
          />
        );
      case 'teacher':
        return (
          <TeacherSignUp
            db={this.db}
            firebase={this.firebase}
            login={() => {
              this.props.updateAccounts(this.props.user);
            }}
          />
        );
      case 'organization':
        return (
          <OrganizationSignUp
            db={this.db}
            firebase={this.firebase}
            login={() => {
              this.props.updateAccounts(this.props.user);
            }}
          />
        );
      default:
        return null;
    }
  }

  getSignUp() {
    return this.state.isRegistered ? (
      this.getForm()
    ) : (
      <div className="signup-wrapper" id="signup-wrapper">
        <Card className="signup-form">
          <CardHeader title="Create an Account" />
          <CardContent className="column">
            <GenericSignUp
              handleChange={this.handleChange}
              toggleCanText={this.toggleCanText}
              state={{ ...this.state }}
            />
            <TextField
              error={getErrorStatus(this.state.errors.password)}
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              helperText={this.state.errors.password}
              value={this.state.password}
              onChange={this.handleChange}
            />
            <TextField
              error={getErrorStatus(this.state.errors.confirmPassword)}
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              variant="outlined"
              helperText={this.state.errors.confirmPassword}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Next
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[idToDataMember[id]] = value;
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
          this.setState({ emailError: '' });
          this.setState({ passwordError: '' });
          if (res.user) {
            this.db
              .collection(accountTypeToCollection.parent)
              .doc(res.user.uid)
              .set(this.getUserData(genericFields))
              .then(() => {
                this.setState({
                  isRegistered: true
                });
              });
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
        });
    }
  }

  render() {
    return this.state.isLoggedIn ? <Redirect to="/login" /> : this.getSignUp();
  }
}

SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;

export default SignUp;
