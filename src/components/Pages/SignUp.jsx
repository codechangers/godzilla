import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import AccountType from '../SignUpForms/AccountType';
import GenericSignUp from '../SignUpForms/GenericSignUp';
import ParentSignUp from '../SignUpForms/ParentSignUp';
import TeacherSignUp from '../SignUpForms/TeacherSignUp';
import OrganizationSignUp from '../SignUpForms/OrganizationSignUp';
import ThankYou from '../SignUpForms/ThankYou';
import logoText from '../../assets/images/logoText.png';
import { auth } from '../../utils/firebase';

import * as Styled from './styles';

const propTypes = {
  updateAccounts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.string)
  }).isRequired,
  OAuthed: PropTypes.func.isRequired
};

const accountTypeToForms = {
  '': [AccountType],
  parent: [AccountType, GenericSignUp, ParentSignUp, ThankYou],
  teacher: [AccountType, GenericSignUp, TeacherSignUp, ThankYou],
  organization: [AccountType, GenericSignUp, OrganizationSignUp, ThankYou]
};

const SignUp = ({ location, user, OAuthed, updateAccounts }) => {
  const [formIndex, setFormIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState('parent');
  const [signUpId, setSignUpId] = useState('');
  const [redirectOnUpdate, setRedirOU] = useState(false);

  // Get SignUpId from location params.
  useEffect(() => {
    if (location.state) {
      const { signupID } = location.state;
      setSignUpId(signupID || '');
    }
  }, [location.state]);

  // Set isLoggedIn state.
  useEffect(() => {
    if (auth.currentUser === null && redirectOnUpdate) {
      setRedirOU(false);
      setIsLoggedIn(true);
    }
  }, [auth.currentUser, redirectOnUpdate]);

  // Redirect to login on last form.
  const updateFormIndex = i => {
    const forms = accountTypeToForms[accountType];
    const dfi = formIndex + i;
    if (dfi < forms.length && dfi >= 0) {
      setFormIndex(dfi);
    } else if (dfi >= forms.length) {
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    setRedirOU(true);
    auth.signOut();
  };

  const Form = useMemo(() => accountTypeToForms[accountType][formIndex], [accountType, formIndex]);

  return isLoggedIn ? (
    <Redirect to={{ pathname: '/login', state: { signupID: signUpId } }} />
  ) : (
    <Styled.SignupWrapper>
      <Styled.LogoButton onClick={user.newOAuth ? logout : () => setIsLoggedIn(true)}>
        <Styled.LogoText src={logoText} />
      </Styled.LogoButton>
      <Styled.Form full={formIndex === 0}>
        <Form
          accountType={accountType}
          next={() => updateFormIndex(1)}
          prev={() => updateFormIndex(-1)}
          setAccountType={a => setAccountType(a)}
          updateAccounts={updateAccounts}
          user={user}
          OAuthed={OAuthed}
        />
      </Styled.Form>
    </Styled.SignupWrapper>
  );
};
SignUp.propTypes = propTypes;

export default SignUp;
