import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { Typography } from '@material-ui/core';
import { PageWrapper } from './styles';
import Profile from '../Interfaces/Profile';
import SideBar from '../UI/SideBar';
import ClassInfoInterface from '../Interfaces/ClassInfo';
import ClassSearchInterface from '../Interfaces/ClassSearch';
import ClassViewInterface from '../Interfaces/ClassView';
import SettingsInterface from '../Interfaces/Settings';
import DocumentationInterface from '../Interfaces/Documentation';
import TutorialsInterface from '../Interfaces/Tutorials';
import GamesInterface from '../Interfaces/Games';
import WhoAmInterface from '../Interfaces/WhoAmI';

const propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  apiKey: PropTypes.string
};

const defaultProps = {
  apiKey: null
};

const routeToInterface = {
  '/parent': null,
  '/parent/signup': ClassInfoInterface,
  '/parent/search': ClassSearchInterface,
  '/parent/profile': Profile,
  '/parent/settings': SettingsInterface,
  '/parent/docs': DocumentationInterface,
  '/parent/tutorials': TutorialsInterface,
  '/parent/games': GamesInterface
};

const whoAmIRoutes = ['/parent/docs', '/parent/tutorials', '/parent/games'];

const ParentDashboard = ({ user, accounts, location, apiKey }) => {
  const [whoAmI, setWhoAmI] = useState(null);

  // Custom Action Bar Init
  const [cab, setCAB] = useState({});
  const useCustomAppBar = newCab => setCAB({ ...cab, ...newCab });
  useEffect(() => setCAB({}), [location]);

  const getID = () => {
    const path = location.pathname;
    if (path.includes('/parent/signup/') && path.length > 18) {
      return path.replace('/parent/signup/', '');
    }
    return '';
  };

  const getInterface = () => {
    const { state, pathname } = location;
    const id = (state && state.signupID) || (state && state.searchId);
    const cleanPath = id ? pathname.replace(`/${id}`, '') : pathname;
    let Interface = routeToInterface[cleanPath];
    if (whoAmIRoutes.includes(cleanPath) && whoAmI === null) Interface = WhoAmInterface;
    return Interface === null ? null : (
      <Interface {...{ accounts, user, useCustomAppBar, whoAmI, setWhoAmI }} />
    );
  };

  const SP = apiKey ? StripeProvider : Fail;
  let approvedRoutes = accounts.teachers ? ['Teacher Dash'] : [];
  approvedRoutes = accounts.admins ? approvedRoutes.concat(['Admin Dash']) : approvedRoutes;

  return user.isSignedIn ? (
    <PageWrapper>
      <SideBar
        names={['Profile', 'My Classes', 'Class Search', 'Games', 'Docs', 'Tutorials'].concat(
          approvedRoutes
        )}
        baseRoute="/parent"
        appBarConfig={cab}
      />
      <SP apiKey={apiKey}>
        <Elements>{getInterface() || <ClassViewInterface accounts={accounts} />}</Elements>
      </SP>
    </PageWrapper>
  ) : (
    <Redirect to={{ pathname: '/login', state: { signupID: getID() } }} />
  );
};
ParentDashboard.propTypes = propTypes;
ParentDashboard.defaultProps = defaultProps;

const Fail = () => (
  <div style={{ display: 'flex', flexDirection: 'column', padding: 12 }}>
    <Typography variant="h4" style={{ marginTop: 36, marginBottom: 18 }}>
      Server Error!
    </Typography>
    <Typography variant="body1" style={{ marginBottom: 18 }}>
      Sorry, we are currently experiencing some technical difficulties.
    </Typography>
    <Typography variant="h5">Please try again later.</Typography>
  </div>
);

export default withRouter(ParentDashboard);
