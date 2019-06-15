import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import autoBind from '../autoBind';
import '../assets/css/Login.css';

const accountTypeToRoute = {
  '': '/login',
  parents: '/parent',
  organizations: '/organization',
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
      shouldRedirect: ''
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
