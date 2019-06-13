import React from 'react';
import { Redirect } from 'react-router-dom';
import Logout from '../Logout';

const TrainingTeacher = ({ firebase, user }) =>
  user !== null ? (
    <div>
      <h1>Welcome to the Teacher in Training Dashboard</h1>
      <Logout firebase={firebase} />
    </div>
  ) : (
    <Redirect to="/" />
  );

export default TrainingTeacher;
