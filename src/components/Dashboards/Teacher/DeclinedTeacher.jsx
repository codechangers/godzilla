import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const DeclinedTeacher = ({ accounts }) => (
  <div style={{ margin: 'auto', maxWidth: 600, padding: 12 }}>
    <Typography variant="h4">
      {`Hello ${
        accounts.parents ? `${accounts.parents.data().fName} ${accounts.parents.data().lName}` : ''
      }`}
    </Typography>
    <Typography variant="body1" style={{ marginTop: 18 }}>
      We are sorry to inform you that we have decided to decline your request to become a
      CodeChangers teacher. At CodeChangers we try to enable anyone to change the world by inspiring
      children with the opportunity to explore some of the great things STEM fields have to offer.
      However, in order to make sure every student has a positive experience with a codechangers
      class, we need to make sure that the instructors we allow to teach are not just a good, or
      great fit. But a perfect with both our teaching techniques, and standards. We wish you the
      best in your exploration of STEM education and encourage you to seek out other opportunities
      in the field.
    </Typography>
    <Typography variant="h6" style={{ marginTop: 12 }}>
      Sincerely, CodeChangers
    </Typography>
  </div>
);

DeclinedTeacher.propTypes = {
  accounts: PropTypes.object.isRequired
};

export default DeclinedTeacher;
