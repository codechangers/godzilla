import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';

import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import autoBind from '../../autoBind';
import { LogoText } from '../Images';
import { getUserData, validateFields, getErrorStatus } from '../../helpers';
import '../../assets/css/Login.css';

const errorCodeToMessage = {
  'auth/wrong-password': 'Incorrect Password',
  'auth/user-not-found': 'No Account found with this Email'
};

const accountTypeToRoute = {
  '': '/login',
  parents: '/parent',
  organizations: '/organization',
  teachers: '/teacher',
  admins: '/admin'
};

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      shouldRedirect: '',
      signupID: '',
      forgotPassword: false,
      showResetPrompt: false,
      errors: {}
    };
    this.firebase = props.firebase;
    this.db = props.db;
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    autoBind(this);
  }

  componentDidMount() {
    const { state } = this.props.location;
    if (state && state.signupID) {
      this.checkAccounts(state.signupID);
      this.setState({ signupID: state.signupID });
    } else {
      this.checkAccounts();
    }
  }

  componentWillReceiveProps() {
    this.checkAccounts();
  }

  checkAccounts(signupID) {
    const { accounts } = this.props;
    const order = ['admins', 'teachers', 'organizations', 'parents'];
    let shouldRedirect = '';
    for (let i = 0; i < order.length; i++) {
      const key = order[i];
      if (accounts[key]) {
        shouldRedirect = accountTypeToRoute[key];
        break;
      }
    }
    if (shouldRedirect === accountTypeToRoute.parents && this.state.signupID.length > 0) {
      shouldRedirect = `${shouldRedirect}/signup/${this.state.signupID}`;
    } else if (shouldRedirect === accountTypeToRoute.parents && signupID && signupID.length > 0) {
      shouldRedirect = `${shouldRedirect}/signup/${signupID}`;
    }
    this.setState({ shouldRedirect });
  }

  resetPassword() {
    if (this.validateFields(['email'])) {
      this.firebase
        .auth()
        .sendPasswordResetEmail(this.state.email)
        .then(() => {
          this.setState({ showResetPrompt: true });
        })
        .catch(err => {
          this.setState({ forgotPassword: false });
          console.log(err);
        });
    }
  }

  handleChange(e) {
    if (e.target.id === 'Email') {
      this.setState({
        email: e.target.value
      });
    } else if (e.target.id === 'Password') {
      this.setState({
        password: e.target.value
      });
    }
  }

  handleSubmit() {
    const { email, password, errors } = this.state;

    if (this.validateFields(['email', 'password']) === true) {
      this.firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
          errors.email = err.code === 'auth/user-not-found' ? errorCodeToMessage[err.code] : '';
          errors.password = err.code === 'auth/wrong-password' ? errorCodeToMessage[err.code] : '';
          this.setState({ errors });
        });
    } else {
      this.setState({ errors });
    }
  }

  render() {
    const { errors, signupID } = this.state;
    return this.state.shouldRedirect.length > 0 ? (
      <Redirect to={{ pathname: this.state.shouldRedirect, state: { signupID } }} />
    ) : (
      <div className="auth-page-wrapper">
        <Box className="left-content">
          <LogoText className="logo-text" />
          <div className="login-form">
            <h1 className="login-form-title">
              {this.state.forgotPassword ? 'Enter email to reset Password' : 'Sign In'}
            </h1>
            {this.state.forgotPassword ? (
              <div>
                <TextField
                  className="full-width"
                  error={getErrorStatus(errors.email)}
                  id="Email"
                  type="text"
                  label="Email Address"
                  variant="outlined"
                  helperText={errors.email}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Button
                  variant="contained"
                  className="full-width"
                  color="primary"
                  onClick={this.resetPassword}
                >
                  Reset Password
                </Button>
                <Dialog
                  open={this.state.showResetPrompt}
                  onClose={() => this.setState({ showResetPrompt: false, forgotPassword: false })}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Password Reset sent to your Email
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {`We have sent an email to ${this.state.email} containing a link that will allow you to reset your password. After clicking the link you will be taken to a page that will prompt you to enter a password. Once submitted the password entered will allow you to login to your account on CodeChangers!`}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() =>
                        this.setState({ showResetPrompt: false, forgotPassword: false })
                      }
                      color="primary"
                      autoFocus
                    >
                      Okay
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : (
              <form className="login-form">
                <TextField
                  className="full-width"
                  error={getErrorStatus(errors.email)}
                  id="Email"
                  type="text"
                  label="Email Address"
                  variant="outlined"
                  helperText={errors.email}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <TextField
                  className="full-width"
                  error={getErrorStatus(errors.password)}
                  id="Password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  helperText={errors.password}
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <button
                  type="button"
                  className="link-button"
                  onClick={() => this.setState({ forgotPassword: true })}
                >
                  Forgot Your Password?
                </button>
                <Button
                  onClick={this.handleSubmit}
                  className="full-width temp-primary-button"
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
              </form>
            )}
          </div>
          <a href="/signup" className="sign-up-link">
            Don&apos;t have an account? Sign up today
          </a>
        </Box>
        <div className="right-content" id="students-img" />
      </div>
    );
  }
}

Login.propTypes = propTypes;

export default withRouter(Login);
