import React from 'react';
import PropTypes from 'prop-types';
import { API_URL } from '../../globals';

const getStripeURL = clientId =>
  `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write`;

class StripeConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stripeURL: '', stripeIsLinked: false, isLoading: true };
  }

  componentDidMount() {
    // eslint-disable-next-line
    fetch(`${API_URL}/teacher_account/${this.props.user.uid}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        this.setState({ stripeIsLinked: res.stripe_is_linked, isLoading: false });
      });
    // eslint-disable-next-line
    fetch(`${API_URL}/client_id`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        this.setState({ stripeURL: getStripeURL(res.client_id) });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { stripeIsLinked, isLoading } = this.state;
    return stripeIsLinked || isLoading ? null : (
      <a className="stripe-connect" href={this.state.stripeURL}>
        Connect with Stripe
      </a>
    );
  }
}

StripeConnect.propTypes = {
  user: PropTypes.object.isRequired
};

export default StripeConnect;
