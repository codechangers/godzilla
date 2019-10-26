import React from 'react';
import StripeConnect from '../../UI/StripeConnect';

const TrainingTeacher = () => (
  <div className="page-content horiz-center">
    <h1>Welcome to the Teacher Dashboard</h1>
    <h3 style={{ width: '60%', textAlign: 'left' }}>
      This dashboard is meant to help you prepare for your first codechangers class. We hope that
      after recieving training you will feel comfortable and confident in your ability to change the
      lives of your students by teaching them invaluable skills related to different STEM fields.
    </h3>
    <div style={{ backgroundColor: '#8dc63f', borderRadius: '4px', margin: '30px' }}>
      <StripeConnect />
    </div>
  </div>
);

export default TrainingTeacher;
