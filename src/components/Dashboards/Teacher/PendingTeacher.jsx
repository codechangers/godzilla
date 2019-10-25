import React from 'react';
import PropTypes from 'prop-types';

const PendingTeacher = ({ accounts }) => (
  <div className="page-content horiz-center">
    <h1>
      {`Hello ${
        accounts.parents ? `${accounts.parents.data().fName} ${accounts.parents.data().lName}` : ''
      }`}
    </h1>
    <h3 style={{ width: '60%', textAlign: 'left' }}>
      Welcome to the CodeChangers Go Platform! You will be able to oversee scheduling, payments, and
      administrative information from this website. We are currently reviewing your application, and
      once approved you will have full access to all this platform has to offer!
    </h3>
  </div>
);

PendingTeacher.propTypes = {
  accounts: PropTypes.object.isRequired
};

export default PendingTeacher;
