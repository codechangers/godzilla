import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import autoBind from '../autoBind';
import { emailValidation } from '../globals';
import '../assets/css/Login.css';

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
  accounts: PropTypes.object.isRequired
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      shouldRedirect: '',
      errors: {}
    };
    this.firebase = props.firebase;
    this.db = props.db;
    autoBind(this);
  }

  componentDidMount() {
    this.checkAccounts();
  }

  componentWillReceiveProps() {
    this.checkAccounts();
  }

  checkAccounts() {
    const { accounts } = this.props;
    let shouldRedirect = '';
    if (accounts.admins) {
      shouldRedirect = accountTypeToRoute.admins;
    } else if (accounts.teachers) {
      shouldRedirect = accountTypeToRoute.teachers;
    } else if (accounts.organizations) {
      shouldRedirect = accountTypeToRoute.organizations;
    } else if (accounts.parents) {
      shouldRedirect = accountTypeToRoute.parents;
    }
    this.setState({ shouldRedirect });
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
    let formValid = true;
    const { email, password, errors } = this.state;

    if (email === '') {
      errors.email = 'This field may not be empty';
      formValid = false;
    } else if (emailValidation.test(String(email).toLowerCase()) !== true) {
      errors.email = 'Invalid Email Address';
      formValid = false;
    } else {
      errors.email = '';
    }

    if (password === '') {
      errors.password = 'This field may not be empty';
      formValid = false;
    } else {
      errors.password = '';
    }

    if (formValid === true) {
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
    return this.state.shouldRedirect.length > 0 ? (
      <Redirect to={this.state.shouldRedirect} />
    ) : (
      <div className="login-form">
        <h1>Login to Godzilla:</h1>
        <span className="errormessage">{this.state.errors.email}</span>
        <label htmlFor="email">
          Email Address:
          <input id="Email" type="text" value={this.state.email} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{this.state.errors.password}</span>
        <label htmlFor="password">
          Password:
          <input
            id="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

Login.propTypes = propTypes;

export default Login;
