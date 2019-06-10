import React from 'react';
import autoBind from '../autoBind';
import firebase from '../firebase';
import 'firebase/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.firebase = firebase();
    autoBind(this);
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
    return (
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
