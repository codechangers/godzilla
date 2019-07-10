import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../NavBar';

const ApprovedTeacher = ({ firebase, accounts }) => (
  <div>
    <NavBar accounts={accounts} firebase={firebase} />
    <h1>Welcome to the Approved Teacher Dashboard</h1>
  </div>
);

ApprovedTeacher.propTypes = {
  firebase: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default ApprovedTeacher;
