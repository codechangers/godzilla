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
  db: PropTypes.object.isRequired,
  location: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.string)
  })
};

const defaultProps = {
  location: {
    state: {
      accountType: 'Parent'
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
      password: '',
      confirmPassword: '',
      isLoggedIn: false
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  componentDidMount() {
    const { accountType } = this.props.location.state;
    console.log(accountType);
  }

  getForm() {
    switch (this.props.location.state.accountType) {
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
    const { fName, lName, email, password, confirmPassword } = this.state;
    const { accountType } = this.props.location.state;
    const shouldCreateAccounts = false;
    if (password === confirmPassword && shouldCreateAccounts) {
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
    } else if (password === confirmPassword) {
      console.log(`Creating account for ${fName} ${lName}`);
    } else {
      console.log("passwords don't match");
    }
  }

  render() {
    const { accountType } = this.props.location.state;
    return this.state.isLoggedIn ? (
      <Redirect to={accountTypeToRoute[accountType]} />
    ) : (
      <div className="signup-form">
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
}

SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;

export default SignUp;
