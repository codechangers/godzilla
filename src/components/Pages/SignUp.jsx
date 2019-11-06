import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import AccountType from '../SignUpForms/AccountType';
import GenericSignUp from '../SignUpForms/GenericSignUp';
import ParentSignUp from '../SignUpForms/ParentSignUp';
import TeacherSignUp from '../SignUpForms/TeacherSignUp';
import OrganizationSignUp from '../SignUpForms/OrganizationSignUp';
import ThankYou from '../SignUpForms/ThankYou';
import logoText from '../../assets/images/logoText.svg';
import autoBind from '../../autoBind';
import '../../assets/css/Signup.css';

import * as Styled from './PageStyles/StyledSignUp';

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  updateAccounts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.string)
  }).isRequired
};

const accountTypeToForms = {
  '': [AccountType],
  parent: [AccountType, GenericSignUp, ParentSignUp, ThankYou],
  teacher: [AccountType, GenericSignUp, TeacherSignUp, ThankYou],
  organization: [AccountType, GenericSignUp, OrganizationSignUp, ThankYou]
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formIndex: 0,
      isLoggedIn: false,
      accountType: 'parent',
      signupID: '',
      redirectOnUpdate: false
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  componentDidMount() {
    let { signupID } = this.state;
    const { state } = this.props.location;
    if (state) {
      signupID = state.signupID || '';
    }
    this.setState({ signupID });
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(props) {
    if (!props.user.isSignedIn && this.state.redirectOnUpdate) {
      this.setState({ isLoggedIn: true, redirectOnUpdate: false });
    }
  }

  setFormIndex(i) {
    const { formIndex, accountType } = this.state;
    const forms = accountTypeToForms[accountType];
    const dfi = formIndex + i;
    if (dfi < forms.length && dfi >= 0) {
      this.setState({ formIndex: dfi });
    } else if (dfi >= forms.length) {
      this.setState({ isLoggedIn: true });
    }
  }

  logout() {
    this.setState({ redirectOnUpdate: true });
    this.props.firebase.auth().signOut();
  }

  render() {
    const { formIndex, accountType } = this.state;
    const { updateAccounts, user } = this.props;
    const forms = accountTypeToForms[accountType];
    const Form = forms[formIndex];

    return this.state.isLoggedIn ? (
      <Redirect to={{ pathname: '/login', state: { signupID: this.state.signupID } }} />
    ) : (
      <Styled.SignupWrapper>
        <Styled.LogoButton
          onClick={user.newOAuth ? this.logout : () => this.setState({ isLoggedIn: true })}
        >
          <Styled.LogoText src={logoText} />
        </Styled.LogoButton>
        <Styled.Form full={formIndex === 0}>
          <Form
            db={this.db}
            firebase={this.firebase}
            accountType={accountType}
            next={() => this.setFormIndex(1)}
            prev={() => this.setFormIndex(-1)}
            setAccountType={a => this.setState({ accountType: a })}
            updateAccounts={updateAccounts}
            user={user}
          />
        </Styled.Form>
      </Styled.SignupWrapper>
    );
  }
}

SignUp.propTypes = propTypes;

export default SignUp;
