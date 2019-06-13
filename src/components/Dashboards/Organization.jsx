import React from 'react';
import { Redirect } from 'react-router-dom';
import Logout from '../Logout';

const Organization = ({ firebase, user }) =>
  user !== null ? (
    <div>
      <h1>Welcome to the Organization Dashboard</h1>
      <Logout firebase={firebase} />
    </div>
  ) : (
    <Redirect to="/" />
  );

export default Organization;
