import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import GenericSignUp from './SignUpForms/GenericSignUp';
import ParentSignUp from './SignUpForms/ParentSignUp';
import TeacherSignUp from './SignUpForms/TeacherSignUp';
import OrganizationSignUp from './SignUpForms/OrganizationSignUp';
import autoBind from '../autoBind';
import '../assets/css/Signup.css';

const accountTypeToCollection = {
  '': null,
  parent: 'parents',
  teacher: 'teachers',
  organization: 'organizations'
};

const accountTypeToRoute = {
  '': '/signup',
  parent: '/parent',
  teacher: '/trainingteacher',
  organization: '/pendingorganization'
};

const idToDataMember = {
  firstName: 'fName',
  lastName: 'lName',
  Email: 'email',
  phone: 'phone',
  canText: 'canText',
  password: 'password',
  confirmPassword: 'confirmPassword'
};

const genericFields = ['fName', 'lName', 'email', 'phone', 'canText'];

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  location: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.string)
  })
};

const defaultProps = {
  location: {
    state: {
      accountType: 'parent'
    }
  }
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      address: '',
      email: '',
      phone: '',
      canText: false,
      password: '',
      confirmPassword: '',
      isLoggedIn: false,
      isRegistered: false,
      fNameError: '',
      lNameError: '',
      phoneError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      formValid: true
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  getForm() {
    switch (this.props.location.state.accountType) {
      case 'parent':
        return (
          <ParentSignUp
            db={this.db}
            firebase={this.firebase}
            login={() => {
              this.setState({ isLoggedIn: true });
            }}
          />
        );
      case 'teacher':
        return (
          <TeacherSignUp
            db={this.db}
            firebase={this.firebase}
            login={() => {
              this.setState({ isLoggedIn: true });
            }}
          />
        );
      case 'organization':
        return <OrganizationSignUp handleChange={this.handleChange} state={{ ...this.state }} />;
      default:
        return null;
    }
  }

  getSignUp() {
    return this.state.isRegistered ? (
      this.getForm()
    ) : (
      <div className="signup-form">
        <h1>Create an Account:</h1>
        <GenericSignUp
          handleChange={this.handleChange}
          toggleCanText={this.toggleCanText}
          state={{ ...this.state }}
        />
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <span className="errormessage">{this.state.passwordError}</span>
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
        <span className="errormessage">{this.state.confirmPasswordError}</span>
        <br />
        <button type="submit" onClick={this.handleSubmit}>
          Next
        </button>
      </div>
    );
  }

  getUserData() {
    // Filter out any fields for local state that shouldn't be saved to the generic document.
    return Object.keys(this.state)
      .filter(key => genericFields.includes(key))
      .reduce((obj, key) => {
        const newObj = { ...obj };
        newObj[key] = this.state[key];
        return newObj;
      }, {});
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
    let { email, password, confirmPassword, fName, lName, phone, formValid } = this.state;

    if (fName === '') {
      this.setState({ fNameError: 'This field may not be empty' });
      formValid = false;
    } else {
      this.setState({ fNameError: '' });
      formValid = true;
    }

    if (lName === '') {
      this.setState({ lNameError: 'This field may not be empty' });
      formValid = false;
    } else {
      this.setState({ lNameError: '' });
      formValid = true;
    }

    if (email === '') {
      this.setState({ emailError: 'This field may not be empty' });
      formValid = false;
      } else {
        this.setState({ emailError: '' });
        formValid = true;
      }

    if (phone === '') {
      this.setState({ phoneError: 'This field may not be empty' });
      formValid = false;
    } else {
      var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (phoneRegex.test(phone) !== true) {
        this.setState({ phoneError: 'Invalid Phone Number' });
        formValid = false;
      } else {
        this.setState({ phoneError: '' });
        formValid = true;
      }
    }

    if (password === '') {
      this.setState({ passwordError: 'This field may not be empty' });
      formValid = false;
    } else {
      this.setState({ passwordError: '' });
      formValid = true;
    }

    if (confirmPassword === '') {
      this.setState({ confirmPasswordError: 'This field may not be empty' });
      formValid = false;
    } else if (confirmPassword !== password) {
      this.setState({ confirmPasswordError: 'Password and Confirm Password do not match' });
      formValid = false;
    } else {
      this.setState({ confirmPasswordError: '' });
      formValid = true;
    }

    if (formValid === true) {
      this.firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          this.setState({ emailError: ''});
          this.setState({ passwordError: ''});
          if (res.user) {
            this.db
              .collection(accountTypeToCollection.parent)
              .doc(res.user.uid)
              .set(this.getUserData())
              .then(() => {
                this.setState({
                  isRegistered: true
                });
              });
          }
        })
        .catch(err => {
          console.log('error: ', err);
          if (err.code === 'auth/invalid-email' || err.code === 'auth/email-already-in-use') {
            this.setState({ emailError: err.message });
          } else if (err.code === 'auth/weak-password') {
            this.setState({ emailError: ''});
            this.setState({ passwordError: err.message});
          }
        });
    }
  }

  render() {
    const { accountType } = this.props.location.state;
    return this.state.isLoggedIn ? (
      <Redirect to={accountTypeToRoute[accountType]} />
    ) : (
      this.getSignUp()
    );
  }
}

SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;

export default SignUp;
