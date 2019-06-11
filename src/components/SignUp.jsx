import React from 'react';
import autoBind from '../autoBind';
import firebase from '../firebase';
import 'firebase/auth';
import 'firebase/firestore';

const accountTypeToCollection = {
  '': null,
  Parent: 'parents',
  Teacher: 'teachers',
  Organization: 'organizations'
};

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
    this.db = this.firebase
      .firestore()
      .collection('env')
      .doc('DEVELOPMENT');
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
    if (password === confirmPassword) {
      this.firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            const userData = { fName, lName, email, accountType };
            this.db
              .collection(accountTypeToCollection[accountType])
              .doc(res.user.uid)
              .set(userData)
              .then(() => {
                console.log('Created:', `${fName} ${lName}`);
              });
          }
        })
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
