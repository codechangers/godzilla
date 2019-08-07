import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../NavBar';

const DeclinedTeacher = ({ firebase, accounts }) => (
  <div>
    <NavBar accounts={accounts} firebase={firebase} />
    <h1>Welcome to the Declined Teacher Dashboard</h1>
  </div>
);

DeclinedTeacher.propTypes = {
  firebase: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default DeclinedTeacher;
