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
  user: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      shouldRedirect: '',
      emailError: '',
      passwordError: '',
      formValid: false
    };
    this.firebase = props.firebase;
    this.db = props.db;
    autoBind(this);
  }

  componentDidMount() {
    this.getUserDashboard(this.props.user);
  }

  componentWillReceiveProps(props) {
    this.getUserDashboard(props.user);
  }

  getUserDashboard(user) {
    if (user.isSignedIn) {
      ['teachers', 'organizations', 'parents', 'admins'].forEach(collection => {
        this.db
          .collection(collection)
          .doc(user.uid)
          .get()
          .then(doc => {
            let c = collection;
            if (doc.exists) {
              if (collection === 'teachers' && !doc.data().isVerrified) {
                c = 'trainingteachers';
              } else if (collection === 'organizations' && !doc.data().isVerrified) {
                c = 'pendingorganization';
              }
              this.setState({
                shouldRedirect: accountTypeToRoute[c]
              });
            }
          });
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
    const { email, password, formValid } = this.state;

    if (email === '') {
      this.setState({ emailError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      /* eslint-disable */
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(email).toLowerCase()) !== true) {
        this.setState({ emailError: 'Invalid Email Address' });
        this.setState({ formValid: false });
      } else {
        this.setState({ emailError: '' });
        this.setState({ formValid: true });
      }
    }

    if (password === '') {
      this.setState({ passwordError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ passwordError: '' });
      this.setState({ formValid: true });
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
        <label htmlFor="email">
          Email Address:
          <input id="Email" type="text" value={this.state.email} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{this.state.emailError}</span>
        <label htmlFor="password">
          Password:
          <input
            id="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <span className="errormessage">{this.state.passwordError}</span>
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

Login.propTypes = propTypes;

export default Login;
