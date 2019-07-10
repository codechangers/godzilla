import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import autoBind from '../autoBind';
import '../assets/css/Login.css';

const accountTypeToRoute = {
  '': '/login',
  parents: '/parent',
  organizations: '/organization',
  pendingorganization: '/pendingorganization',
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
      emailError: '',
      passwordError: ''
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
    } else if (accounts.pendingorganization) {
      shouldRedirect = accountTypeToRoute.pendingorganization;
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
    const { email, password } = this.state;

    if (email === '') {
      this.setState({ emailError: 'This field may not be empty' });
      formValid = false;
    } else {
      /* eslint-disable */
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(email).toLowerCase()) !== true) {
        this.setState({ emailError: 'Invalid Email Address' });
        formValid = false;
      } else {
        this.setState({ emailError: '' });
      }
    }

    if (password === '') {
      this.setState({ passwordError: 'This field may not be empty' });
      formValid = false;
    } else {
      this.setState({ passwordError: '' });
    }

    if (formValid === true) {
      this.firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
          if (err.code === 'auth/user-not-found') {
            console.log(err, 'Invalid Email...');
          } else if (err.code === 'auth/wrong-password') {
            console.log(err, 'Invalid Password...');
          } else {
            console.log(err);
          }
        });
    }
  }

  render() {
    return this.state.shouldRedirect.length > 0 ? (
      <Redirect to={this.state.shouldRedirect} />
    ) : (
      <div className="login-form">
        <h1>Login to Godzilla:</h1>
        <span className="errormessage">{this.state.emailError}</span>
        <label htmlFor="email">
          Email Address:
          <input id="Email" type="text" value={this.state.email} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{this.state.passwordError}</span>
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
