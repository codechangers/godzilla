import React from 'react';
import { Typography } from '@material-ui/core';
import StripeConnect from '../../UI/StripeConnect';

const TrainingTeacher = () => (
  <div style={{ margin: 'auto', maxWidth: 610, padding: 12 }}>
    <Typography variant="h4">Welcome to the Teacher Dashboard</Typography>
    <Typography variant="body1" style={{ marginTop: 18 }}>
      Stripe is the exclusive payment processor for CodeChangers. Stripe automatically splits the
      funds at payment so you receive your money, and CodeChangers receives their licensing fee. If
      you ever need to refund students for dropping your course, Stripe pulls the money back out of
      both accounts. In order for you to set up your CodeChangers Go account and start creating
      classes, you will first need to create a Stripe account using your business information, or
      login with an account you already have. For every child that registers in your course,
      CodeChangers receives a $10 licensing fee. Just like any other payment software (PayPal,
      Square, etc.), Stripe collects a fee of 2.9% + $0.30 per successful charge. This fee is taken
      at the time of the charge.
    </Typography>
    <div
      style={{
        backgroundColor: '#8dc63f',
        borderRadius: '4px',
        marginTop: 18,
        float: 'left'
      }}
    >
      <StripeConnect />
    </div>
  </div>
);

export default TrainingTeacher;
