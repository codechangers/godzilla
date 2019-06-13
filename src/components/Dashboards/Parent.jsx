import React from 'react';
import { Redirect } from 'react-router-dom';
import Logout from '../Logout';

const Parent = ({ firebase, user }) =>
  user !== null ? (
    <div>
      <h1>Welcome to the Parent Dashboard</h1>
      <Logout firebase={firebase} />
    </div>
  ) : (
    <Redirect to="/" />
  );

export default Parent;
