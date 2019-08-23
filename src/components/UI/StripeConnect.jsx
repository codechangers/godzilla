import React from 'react';
import { API_URL } from '../../globals';

const getStripeURL = clientId =>
  `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write`;

class StripeConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stripeURL: '' };
  }

  componentDidMount() {
    // eslint-disable-next-line
    fetch(`${API_URL}/client_id`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        this.setState({ stripeURL: getStripeURL(res.client_id) });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <a className="stripe-connect" href={this.state.stripeURL}>
        Connect with Stripe
      </a>
    );
  }
}

export default StripeConnect;
