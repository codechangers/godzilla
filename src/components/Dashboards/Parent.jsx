import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Profile from '../Interfaces/Profile';
import SideBar from '../UI/SideBar';
import ClassSignUpInterface from '../Interfaces/ClassSignUp';
import ClassSearchInterface from '../Interfaces/ClassSearch';
import ClassViewInterface from '../Interfaces/ClassView';
import SettingsInterface from '../Interfaces/Settings';
import autoBind from '../../autoBind';
import '../../assets/css/Parent-Dash.css';

const routeToInterface = {
  '/parent': null,
  '/parent/signup': ClassSignUpInterface,
  '/parent/search': ClassSearchInterface,
  '/parent/profile': Profile,
  '/parent/settings': SettingsInterface
};

const Fail = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <h1 style={{ marginTop: 36 }}>Unable to connect to our payment servers...</h1>
    <h2 style={{ textAlign: 'center' }}>Please try again later</h2>
  </div>
);

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
    const id = (state && state.signupID) || (state && state.searchId);
    const Interface = routeToInterface[id ? pathname.replace(`/${id}`, '') : pathname];
    const { firebase, accounts, db, user } = this.props;
    return Interface === null ? null : <Interface {...{ firebase, accounts, db, user }} />;
  }

  render() {
    const SP = this.props.apiKey ? StripeProvider : Fail;
    let approvedRoutes = this.props.accounts.teachers ? ['Teacher Dash'] : [];
    approvedRoutes = this.props.accounts.admins
      ? approvedRoutes.concat(['Admin Dash'])
      : approvedRoutes;
    return this.props.user.isSignedIn ? (
      <div className="page-wrapper">
        <SideBar
          names={['Profile', 'My Classes', 'Class Search'].concat(approvedRoutes)}
          baseRoute="/parent"
          firebase={this.props.firebase}
        />
        <SP apiKey={this.props.apiKey}>
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
        </SP>
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
