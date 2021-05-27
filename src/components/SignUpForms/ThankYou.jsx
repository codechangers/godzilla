import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardHeader, CardContent } from '@material-ui/core';
import { URL } from '../../utils/globals';

const accountTypeToMessage = {
  '': 'Thank you for creating an account!',
  parent: `Congratulations! Your family account is now active. You can login by clicking the link below or by going to ${
    URL.split('//')[1]
  }. Once you login, you'll be able to view, register, and participate in Code Contests!`,
  teacher:
    'Thank you for signing up with Code Contest! Your account will have limited features until it has been reviewed and approved by one of our admins. If approved, you will be able to create your own code contests and have access to all of the tools needed to run your own event! You can login to your account by clicking on the link below.',
  organization: 'Thank you for creating an account!'
};

const ThankYou = ({ next, accountType }) => (
  <Card>
    <CardHeader title="Thank You!" />
    <CardContent>
      <p style={{ fontSize: 18, lineHeight: '28px', margin: '20px 0 32px 0' }}>
        {accountTypeToMessage[accountType]}
      </p>
      <Button fullWidth variant="contained" color="primary" onClick={next}>
        GO to login page
      </Button>
    </CardContent>
  </Card>
);

ThankYou.propTypes = {
  next: PropTypes.func.isRequired,
  accountType: PropTypes.string.isRequired
};

export default ThankYou;
