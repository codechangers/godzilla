import React from 'react';
import StripeConnect from '../../UI/StripeConnect';

const TrainingTeacher = () => (
  <div className="page-content horiz-center">
    <h1>Welcome to the Teacher Dashboard</h1>
    <h3 style={{ width: '60%', textAlign: 'left' }}>
      Stripe is the exclusive payment processor for CodeChangers. Stripe automatically splits the
      funds at payment so you receive your money, and CodeChangers receives their licensing fee. If
      you ever need to refund students for dropping your course, Stripe pulls the money back out of
      both accounts. In order for you to set up your CodeChangers Go account and start creating
      classes, you will first need to create a Stripe account using your business information, or
      login with an account you already have. For every child that registers in your course,
      CodeChangers receives a $10 licensing fee.
    </h3>
    <div style={{ backgroundColor: '#8dc63f', borderRadius: '4px', margin: '30px' }}>
      <StripeConnect />
    </div>
  </div>
);

export default TrainingTeacher;
