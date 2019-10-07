import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import AccountType from '../SignUpForms/AccountType';
import GenericSignUp from '../SignUpForms/GenericSignUp';
import ParentSignUp from '../SignUpForms/ParentSignUp';
import TeacherSignUp from '../SignUpForms/TeacherSignUp';
import OrganizationSignUp from '../SignUpForms/OrganizationSignUp';
import ThankYou from '../SignUpForms/ThankYou';
import autoBind from '../../autoBind';
import '../../assets/css/Signup.css';

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  updateAccounts: PropTypes.func.isRequired,
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
      signupID: ''
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  componentWillReceiveProps(props) {
    if (props.accounts.teachers) {
      this.setState({ isLoggedIn: true });
    }
    if (props.accounts.organizations) {
      this.setState({ isLoggedIn: true });
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

  render() {
    const { formIndex, accountType } = this.state;
    const { updateAccounts } = this.props;
    const forms = accountTypeToForms[accountType];
    const Form = forms[formIndex];
    return this.state.isLoggedIn ? (
      <Redirect to={{ pathname: '/login', state: { signupID: this.state.signupID } }} />
    ) : (
      <Form
        db={this.db}
        firebase={this.firebase}
        accountType={accountType}
        next={() => this.setFormIndex(1)}
        prev={() => this.setFormIndex(-1)}
        setAccountType={a => this.setState({ accountType: a })}
        updateAccounts={updateAccounts}
      />
    );
  }
}

SignUp.propTypes = propTypes;

export default SignUp;
