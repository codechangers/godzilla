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
      Thank you for applying to be an official CodeChangers teacher. Your application is currently
      in the processing of being reviewed by CodeChangers. You should hear back from us within a
      week from the date you submitted your application.
    </h3>
  </div>
);

PendingTeacher.propTypes = {
  accounts: PropTypes.object.isRequired
};

export default PendingTeacher;
