import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardHeader, CardContent } from '@material-ui/core';
import ParentIcon from '../../assets/images/parentIcon.svg';
import TeacherIcon from '../../assets/images/teacherIcon.svg';
import BlankIcon from '../../assets/images/blank.svg';

const accountTypeToIcon = {
  '': null,
  parent: ParentIcon,
  teacher: TeacherIcon,
  organization: BlankIcon
};

const accountTypeToMessage = {
  '': 'Thank you for creating an account!',
  parent:
    "Congratulations! Your account is now active. You can login by clicking the link below or by going to go.codechangers.com. Once you login, you'll be able to view all of the CodeChangers programs offered in your area. This account can also be used to register your children for events like Tech Nights, After-School Programs and Summer Camps!",
  teacher:
    'Thank you for signing up with CodeChangers! Your account will have limited features until it has been reviewed and approved by one of our admins. If approved, you will be able to create your own events and have access to all of the tools needed to run your own program! You can login to your account by clicking on the link below.',
  organization: 'Thank you for creating an account!'
};

const ThankYou = ({ next, accountType }) => (
  <Card>
    <CardHeader
      title="Thank You!"
      action={<img src={accountTypeToIcon[accountType]} alt="Icon" style={{ width: 60 }} />}
    />
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
