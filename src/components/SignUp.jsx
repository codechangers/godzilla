import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ParentSignUp from './SignUpForms/ParentSignUp';
import TeacherSignUp from './SignUpForms/TeacherSignUp';
import OrganizationSignUp from './SignUpForms/OrganizationSignUp';
import autoBind from '../autoBind';
import '../assets/css/Signup.css';

const accountTypeToCollection = {
  '': null,
  Parent: 'parents',
  Teacher: 'teachers',
  Organization: 'organizations'
};

const accountTypeToRoute = {
  '': '/signup',
  Parent: '/parent',
  Organization: '/pendingorganization',
  Teacher: '/trainingteacher'
};

const idToDataMember = {
  name: 'name',
  firstName: 'fName',
  lastName: 'lName',
  address: 'address',
  Email: 'email',
  phone: 'phone',
  canText: 'canText',
  gender: 'gender',
  birthDate: 'birthDate',
  aboutMe: 'aboutMe',
  accountType: 'accountType',
  password: 'password',
  confirmPassword: 'confirmPassword'
};

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fName: '',
      lName: '',
      address: '',
      email: '',
      phone: '',
      canText: false,
      gender: '',
      birthDate: '',
      aboutMe: '',
      password: '',
      confirmPassword: '',
      accountType: '',
      isLoggedIn: false
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  getForm() {
    switch (this.state.accountType) {
      case 'Parent':
        return (
          <ParentSignUp
            handleChange={this.handleChange}
            toggleCanText={this.toggleCanText}
            state={{ ...this.state }}
          />
        );
      case 'Teacher':
        return <TeacherSignUp handleChange={this.handleChange} state={{ ...this.state }} />;
      case 'Organization':
        return <OrganizationSignUp handleChange={this.handleChange} state={{ ...this.state }} />;
      default:
        return null;
    }
  }

  getUserData() {
    const {
      name,
      fName,
      lName,
      address,
      email,
      phone,
      canText,
      gender,
      birthDate,
      aboutMe
    } = this.state;
    switch (this.state.accountType) {
      case 'Parent':
        return { fName, lName, address, email, phone, canText };
      case 'Teacher':
        return {
          fName,
          lName,
          email,
          phone,
          gender,
          birthDate,
          aboutMe,
          isVerrified: false,
          isTraining: true
        };
      case 'Organization':
        return { name, email, address, aboutMe, isVerrified: false };
      default:
        return null;
    }
  }

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[idToDataMember[id]] = value;
    this.setState(newState);
  }

  toggleCanText() {
    let { canText } = this.state;
    canText = !canText;
    this.setState({ canText });
  }

  handleSubmit() {
    const { fName, lName, email, accountType, password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      this.firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            const userData = this.getUserData();
            if (userData !== null) {
              this.db
                .collection(accountTypeToCollection[accountType])
                .doc(res.user.uid)
                .set(userData)
                .then(() => {
                  console.log('Created:', `${fName} ${lName}`);
                  this.setState({
                    isLoggedIn: true
                  });
                });
            } else {
              console.log('Invalid Account Type');
            }
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log("passwords don't match");
    }
  }

  render() {
    return this.state.isLoggedIn ? (
      <Redirect to={accountTypeToRoute[this.state.accountType]} />
    ) : (
      <div className="signup-form">
        {this.getForm()}
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

SignUp.propTypes = propTypes;

export default SignUp;
