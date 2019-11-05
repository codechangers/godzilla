import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { API_URL } from '../../globals';
import autoBind from '../../autoBind';

class StripeHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gotAuthToken: false, isLoading: false };
    autoBind(this);
  }

  componentDidMount() {
    if (this.props.user.isSignedIn) {
      this.linkStripeAccount();
    }
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps() {
    if (this.props.user.isSignedIn && !this.state.gotAuthToken && !this.state.isLoading) {
      this.linkStripeAccount();
    }
  }

  linkStripeAccount() {
    this.setState({ isLoading: true });
    const search = {};
    const options = this.props.location.search.replace('?', '').split('&');
    options.forEach(option => {
      const [key, value] = option.split('=');
      search[key] = value;
    });
    // eslint-disable-next-line
    fetch(`${API_URL}/teacher_account`, {
      method: 'POST',
      body: JSON.stringify({
        auth_code: search.code,
        user_id: this.props.user.uid
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === 200) {
          this.props.db
            .collection('teachers')
            .doc(this.props.user.uid)
            .update({ isTraining: false })
            .then(() => {
              this.setState({ gotAuthToken: true, isLoading: false });
            });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    return !this.state.gotAuthToken ? (
      <div className="stripe-loading-screen">Linking Stripe to your CodeChangers Account...</div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

StripeHandler.propTypes = {
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

export default withRouter(StripeHandler);
