import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { PageWrapper } from './styles';
import Profile from '../Interfaces/Profile';
import SideBar from '../UI/SideBar';
import ClassInfoInterface from '../Interfaces/ClassInfo';
import ClassSearchInterface from '../Interfaces/ClassSearch';
import ClassViewInterface from '../Interfaces/ClassView';
import SettingsInterface from '../Interfaces/Settings';
import DocumentationInterface from '../Interfaces/Documentation';
import TutorialsInterface from '../Interfaces/Tutorials';
import PreFlightTutorialsInterface from '../Interfaces/PreFlightTutorials';
import GamesInterface from '../Interfaces/Games';
import WhoAmInterface from '../Interfaces/WhoAmI';
import { STRIPE_KEY } from '../../utils/globals';
import { useAccountData } from '../../hooks/accounts';

const propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const routeToInterface = {
  '/parent': null,
  '/parent/signup': ClassInfoInterface,
  '/parent/search': ClassSearchInterface,
  '/parent/profile': Profile,
  '/parent/settings': SettingsInterface,
  '/parent/docs': DocumentationInterface,
  '/parent/tutorials': TutorialsInterface,
  '/parent/preflight': PreFlightTutorialsInterface,
  '/parent/games': GamesInterface
};

const whoAmIRoutes = [
  '/parent',
  '/parent/docs',
  '/parent/tutorials',
  '/parent/preflight',
  '/parent/games'
];

const ParentDashboard = ({ user, accounts, location }) => {
  const [whoAmI, setWhoAmI] = useState(null);
  const [isAdmin] = useAccountData('admins');
  const [isTeacher] = useAccountData('teachers');

  // Custom App Bar Init
  const [cab, setCAB] = useState({});
  const useCustomAppBar = newCab => setCAB({ ...cab, ...newCab });
  useEffect(() => setCAB({}), [location]);

  // Selected Class Init
  const [selectedCls, setSelectedCls] = useState(null);
  const useSelectedCls = () => [selectedCls, setSelectedCls];
  useEffect(() => setSelectedCls(null), [whoAmI]);

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
      <Interface {...{ accounts, user, useCustomAppBar, useSelectedCls, whoAmI, setWhoAmI }} />
    );
  };

  let approvedRoutes = isTeacher ? ['Teacher Dash'] : [];
  approvedRoutes = isAdmin ? approvedRoutes.concat(['Admin Dash']) : approvedRoutes;

  return user.isSignedIn ? (
    <PageWrapper>
      <SideBar
        names={['Profile', 'Contests', 'Register', 'Pre Contest', 'Games'].concat(approvedRoutes)}
        baseRoute="/parent"
        appBarConfig={cab}
      />
      <StripeProvider apiKey={STRIPE_KEY}>
        <Elements>
          {getInterface() || (
            <ClassViewInterface
              {...{ whoAmI, setWhoAmI, useCustomAppBar, useSelectedCls, accounts }}
            />
          )}
        </Elements>
      </StripeProvider>
    </PageWrapper>
  ) : (
    <Redirect to={{ pathname: '/login', state: { signupID: getID() } }} />
  );
};
ParentDashboard.propTypes = propTypes;

export default withRouter(ParentDashboard);
