import React from 'react';
import autoBind from '../autoBind';
import firebase from '../firebase';
import 'firebase/auth';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      email: '',
      password: '',
      confirmPassword: '',
      accountType: ''
    };
    this.firebase = firebase();
    autoBind(this);
  }

  handleChange(e) {
    if (e.target.id === 'firstName') {
      this.setState({
        fName: e.target.value
      });
    } else if (e.target.id === 'lastName') {
      this.setState({
        lName: e.target.value
      });
    } else if (e.target.id === 'Email') {
      this.setState({
        email: e.target.value
      });
    } else if (e.target.id === 'accountType') {
      this.setState({
        accountType: e.target.value
      });
    } else if (e.target.id === 'password') {
      this.setState({
        password: e.target.value
      });
    } else if (e.target.id === 'confirmPassword') {
      this.setState({
        confirmPassword: e.target.value
      });
    }
  }

  handleSubmit() {
    const { fName, lName, email, accountType, password, confirmPassword } = this.state;
    console.log(fName, lName, accountType);
    if (password === confirmPassword) {
      this.firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => console.log(err));
    } else {
      console.log("passwords don't match");
    }
  }

  render() {
    return (
      <div className="signup-form">
        <label htmlFor="firstname">
          First Name:
          <input id="firstName" type="text" value={this.state.fName} onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="lastname">
          Last Name:
          <input id="lastName" type="text" value={this.state.lName} onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="email">
          Email Address:
          <input id="Email" type="text" value={this.state.email} onChange={this.handleChange} />
        </label>
        <br />
        <p>Account Type:</p>
        <select id="accountType" value={this.state.accountType} onChange={this.handleChange}>
          <option value="" />
          <option value="Parent">Parent</option>
          <option value="Teacher">Teacher</option>
          <option value="Organization">Organization</option>
        </select>
        <br />
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="confirm-password">
          Confirm Password:
          <input
            id="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default SignUp;
