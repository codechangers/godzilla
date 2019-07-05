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
  trainingteachers: '/trainingteacher',
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
      shouldRedirect: ''
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
    } else if (accounts.trainingteachers) {
      shouldRedirect = accountTypeToRoute.trainingteachers;
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
    const { email, password } = this.state;
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

  render() {
    return this.state.shouldRedirect.length > 0 ? (
      <Redirect to={this.state.shouldRedirect} />
    ) : (
      <div className="login-form">
        <label htmlFor="email">
          Email Address:
          <input id="Email" type="text" value={this.state.email} onChange={this.handleChange} />
        </label>
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
