import React from 'react';
import { Redirect } from 'react-router-dom';
import autoBind from '../autoBind';
import firebase from '../firebase';
import 'firebase/auth';

const accountTypeToRoute = {
  '': '/signup',
  parents: '/parent',
  organizations: '/organization',
  teachers: '/trainingteacher'
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      shouldRedirect: ''
    };
    this.firebase = props.firebase;
    this.db = this.firebase
      .firestore()
      .collection('env')
      .doc('DEVELOPMENT');
    autoBind(this);
  }

  componentDidMount() {
    this.getUserDashboard();
  }

  componentWillReceiveProps(props) {
    this.getUserDashboard();
  }

  getUserDashboard() {
    console.log(this.props.user);
    if (this.props.user != null) {
      ['teachers', 'organizations', 'parents'].forEach(collection => {
        this.db
          .collection(collection)
          .doc(this.props.user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              this.setState({
                shouldRedirect: accountTypeToRoute[collection]
              });
              console.log(accountTypeToRoute[collection]);
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
      .then(() => {
        this.setState({
          isLoggedIn: true
        });
      })
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

export default Login;
