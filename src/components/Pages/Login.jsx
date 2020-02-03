import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter, Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  withStyles
} from '@material-ui/core';

import autoBind from '../../autoBind';
import { LogoText } from '../Images';
import { getUserData, validateFields, getErrorStatus } from '../../helpers';
import GoogleIcon from '../../assets/images/googleIcon.svg';

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
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
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
      backgroundImage: 0,
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
    const backgroundImage = Math.floor(Math.random() * 7);
    this.setState({ backgroundImage });
    if (state && state.signupID) {
      this.checkAccounts(state.signupID);
      this.setState({ signupID: state.signupID });
    } else {
      this.checkAccounts();
    }
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps() {
    this.checkAccounts();
  }

  checkAccounts(signupID) {
    const { accounts, user } = this.props;
    const order = ['admins', 'teachers', 'organizations', 'parents'];
    let shouldRedirect = '';
    for (let i = 0; i < order.length; i++) {
      const key = order[i];
      if (accounts[key]) {
        shouldRedirect = accountTypeToRoute[key];
        break;
      }
    }
    if (shouldRedirect !== '' && this.state.signupID.length > 0) {
      shouldRedirect = `/parent/signup/${this.state.signupID}`;
    } else if (shouldRedirect !== '' && signupID && signupID.length > 0) {
      shouldRedirect = `/parent/signup/${signupID}`;
    } else if (user.newOAuth) {
      shouldRedirect = '/signup';
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

  handleSubmit(e) {
    if (e) e.preventDefault();
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

  googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    this.firebase
      .auth()
      .signInWithPopup(provider)
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { errors, signupID } = this.state;
    const { classes } = this.props;

    return this.state.shouldRedirect.length > 0 ? (
      <Redirect to={{ pathname: this.state.shouldRedirect, state: { signupID } }} />
    ) : (
      <div className={classes.pageWrapper}>
        <Box className={classes.leftContent}>
          <LogoText className={classes.logoText} />
          <div className={classes.loginForm}>
            <Typography variant="h2" style={{ marginBottom: '40px' }}>
              {this.state.forgotPassword ? 'Enter email to reset Password' : 'Sign In'}
            </Typography>
            {this.state.forgotPassword ? (
              <form
                className={classes.loginForm}
                onSubmit={() => this.setState({ showResetPrompt: false, forgotPassword: false })}
              >
                <TextField
                  error={getErrorStatus(errors.email)}
                  id="Email"
                  type="text"
                  label="Email Address"
                  variant="outlined"
                  helperText={errors.email}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <button
                  type="button"
                  className={classes.linkButton}
                  onClick={() => this.setState({ forgotPassword: false })}
                >
                  Go Back
                </button>
                <Button variant="contained" color="primary" onClick={this.resetPassword}>
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
                    <Button type="submit" color="primary" autoFocus>
                      Okay
                    </Button>
                  </DialogActions>
                </Dialog>
              </form>
            ) : (
              <form className={classes.loginForm} onSubmit={this.handleSubmit}>
                <TextField
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
                  className={classes.linkButton}
                  onClick={() => this.setState({ forgotPassword: true })}
                >
                  Forgot Your Password?
                </button>
                <Button
                  style={{ marginBottom: 15 }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Sign In
                </Button>
                <Button
                  onClick={this.googleSignIn}
                  style={{ backgroundColor: '#fff', color: 'rgba(0, 0, 0, 0.6)' }}
                  variant="contained"
                >
                  <img src={GoogleIcon} alt="G" style={{ marginRight: '11px' }} />
                  Sign In With Google
                </Button>
              </form>
            )}
          </div>
          <Link
            to={{ pathname: '/signup', state: { signupID: this.state.signupID } }}
            className={classes.signupLink}
          >
            Don&apos;t have an account? Sign up today
          </Link>
        </Box>
        <div className={classes.bigPic} id={`students-img${this.state.backgroundImage}`} />
      </div>
    );
  }
}

Login.propTypes = propTypes;

const styles = theme => ({
  pageWrapper: {
    width: '100%',
    height: '100vh',
    backgroundColor: 'var(--secondary-color)',
    display: 'flex'
  },
  bigPic: {
    width: '55%',
    [theme.breakpoints.down('xs')]: {
      width: 0
    },
    height: '100%'
  },
  leftContent: {
    boxSizing: 'border-box',
    padding: '30px 64px',
    width: '45%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: '30px 10px'
    },
    minWidth: '340px',
    height: '100%',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'var(--background-color)'
  },
  logoText: {
    maxWidth: '240px',
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'center'
    }
  },
  loginForm: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': {
      marginBottom: '20px'
    },
    '& h2': {
      fontSize: 60,
      textAlign: 'left'
    },
    [theme.breakpoints.down('sm')]: {
      '& h2': {
        fontSize: 34,
        textAlign: 'center'
      }
    }
  },
  linkButton: {
    border: 'none',
    outline: 'none',
    background: 'none',
    marginBottom: '20px',
    fontSize: '14px',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    },
    textTransform: 'uppercase',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  signupLink: {
    color: '#000',
    textDecoration: 'none',
    textAlign: 'left',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    },
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

const StyledLogin = withStyles(styles)(Login);
export default withRouter(StyledLogin);
