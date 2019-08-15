import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../UI/NavBar';

const PendingTeacher = ({ firebase, accounts }) => (
  <div>
    <NavBar accounts={accounts} firebase={firebase} />
    <h1>Welcome to the Pending Teacher Dashboard</h1>
  </div>
);

PendingTeacher.propTypes = {
  firebase: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default PendingTeacher;
