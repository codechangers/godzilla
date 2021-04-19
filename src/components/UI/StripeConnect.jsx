import React from 'react';
import { Button } from '@material-ui/core';
import { STRIPE_CID } from '../../utils/globals';

const stripeURL = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${STRIPE_CID}&scope=read_write`;

const StripeConnect = props => (
  <a style={{ textDecoration: 'none' }} href={stripeURL}>
    <Button {...props}>Connect to Stripe</Button>
  </a>
);

export default StripeConnect;
