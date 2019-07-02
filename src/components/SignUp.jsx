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
  confirmPassword: 'confirmPassword',
  whyTeach: 'whyTeach',
  prevExp: 'prevExp',
  region: 'region',
  location: 'location'
};

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
      whyTeach: '',
      prevExp: '',
      region: '',
      location: '',
      password: '',
      confirmPassword: '',
      isLoggedIn: false,
      isRegistered: false
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
            handleChange={this.handleChange}
            toggleCanText={this.toggleCanText}
            state={{ ...this.state }}
          />
        );
      case 'teacher':
        return (
          <TeacherSignUp
            handleChange={this.handleChange}
            state={{ ...this.state }}
            db={this.db}
            firebase={this.firebase}
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
          Signup
        </button>
      </div>
    );
  }

  getUserData(isGeneric) {
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
    if (isGeneric) {
      return { fName, lName, email, phone, canText };
    }
    switch (this.props.location.state.accountType) {
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
    const { email, password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      this.firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            const userData = this.getUserData(true);
            if (userData !== null) {
              this.db
                .collection(accountTypeToCollection.parent)
                .doc(res.user.uid)
                .set(userData)
                .then(() => {
                  this.setState({
                    isRegistered: true // Change this to show account type form
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
