import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Profile from '../Interfaces/Profile';
import SideBar from '../UI/SideBar';
import ClassSignUpInterface from '../Interfaces/ClassSignUp';
import ClassViewInterface from '../Interfaces/ClassView';
import SettingsInterface from '../Interfaces/Settings';
import autoBind from '../../autoBind';
import '../../assets/css/Parent-Dash.css';

const routeToInterface = {
  '/parent': null,
  '/parent/signup': ClassSignUpInterface,
  '/parent/profile': Profile,
  '/parent/settings': SettingsInterface
};

class ParentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.firebase = this.props.firebase;
    autoBind(this);
  }

  getID() {
    const path = this.props.location.pathname;
    if (path.includes('/parent/signup/') && path.length > 18) {
      return path.replace('/parent/signup/', '');
    }
    return '';
  }

  getInterface() {
    const { state, pathname } = this.props.location;
    const Interface =
      routeToInterface[
        state && state.signupID ? pathname.replace(`/${state.signupID}`, '') : pathname
      ];
    const { firebase, accounts, db, user } = this.props;
    return Interface === null ? null : <Interface {...{ firebase, accounts, db, user }} />;
  }

  render() {
    return this.props.user.isSignedIn ? (
      <div className="page-wrapper">
        <SideBar
          names={['My Classes', 'Sign up', 'Profile']}
          baseRoute="/parent"
          firebase={this.props.firebase}
        />
        <StripeProvider apiKey={this.props.apiKey}>
          <Elements>
            {this.getInterface() || (
              <div className="page-content">
                <ClassViewInterface
                  firebase={this.props.firebase}
                  db={this.props.db}
                  accounts={this.props.accounts}
                />
              </div>
            )}
          </Elements>
        </StripeProvider>
      </div>
    ) : (
      <Redirect to={{ pathname: '/login', state: { signupID: this.getID() } }} />
    );
  }
}

ParentDashboard.propTypes = {
  firebase: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  apiKey: PropTypes.string
};

ParentDashboard.defaultProps = {
  apiKey: null
};

export default withRouter(ParentDashboard);
