import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const PendingTeacher = ({ accounts }) => (
  <div style={{ margin: 'auto', maxWidth: 600, padding: 12 }}>
    <Typography variant="h4">
      {`Hello ${
        accounts.parents ? `${accounts.parents.data().fName} ${accounts.parents.data().lName}` : ''
      }`}
    </Typography>
    <Typography variant="body1" style={{ marginTop: 18 }}>
      Welcome to the CodeChangers Go Platform! You will be able to oversee scheduling, payments, and
      administrative information from this website. We are currently reviewing your application, and
      once approved, you will have full access to all this platform has to offer!
    </Typography>
  </div>
);

PendingTeacher.propTypes = {
  accounts: PropTypes.object.isRequired
};

export default PendingTeacher;
