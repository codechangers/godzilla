import React from 'react';
import PropTypes from 'prop-types';

const DeclinedTeacher = ({ accounts }) => (
  <div className="page-content horiz-center">
    <h1>
      {`Hello ${
        accounts.parents ? `${accounts.parents.data().fName} ${accounts.parents.data().lName}` : ''
      }`}
    </h1>
    <h3 style={{ width: '60%', textAlign: 'left' }}>
      We are sorry to inform you that we have decided to decline your request to become a
      CodeChangers teacher. At CodeChangers we try to enable anyone to change the world by inspiring
      children with the opportunity to explore some of the great things STEM fields have to offer.
      However, in order to make sure every student has a positive experience with a codechangers
      class, we need to make sure that the instructors we allow to teach are not just a good, or
      great fit. But a perfect with both our teaching techniques, and standards. We wish you the
      best in your exploration of STEM education and encourage you to seek out other opportunities
      in the field.
    </h3>
    <h2 style={{ width: '50%', textAlign: 'left', marginTop: '10px' }}>Sincerely, CodeChangers</h2>
  </div>
);

DeclinedTeacher.propTypes = {
  accounts: PropTypes.object.isRequired
};

export default DeclinedTeacher;
