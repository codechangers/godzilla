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

const propTypes = {
  firebase: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
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
  '/parent/tutorials': TutorialsInterface
};

const ParentDashboard = ({ firebase, user, accounts, db, location, apiKey }) => {
  const [title, setTitle] = useState('CodeContest');
  const [content, setContent] = useState(null);
  const [clsname, setClsname] = useState('');

  const useCustomAppBar = (t, c, n) => {
    if (t !== title) setTitle(t);
    if (c !== content) setContent(c);
    if (n !== clsname) setClsname(n);
  };

  useEffect(() => useCustomAppBar('CodeContest', null, ''), [location]);

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
    const Interface = routeToInterface[id ? pathname.replace(`/${id}`, '') : pathname];
    return Interface === null ? null : (
      <Interface {...{ firebase, accounts, db, user, useCustomAppBar }} />
    );
  };

  const SP = apiKey ? StripeProvider : Fail;
  let approvedRoutes = accounts.teachers ? ['Teacher Dash'] : [];
  approvedRoutes = accounts.admins ? approvedRoutes.concat(['Admin Dash']) : approvedRoutes;

  return user.isSignedIn ? (
    <PageWrapper>
      <SideBar
        names={['Profile', 'My Classes', 'Class Search', 'Docs', 'Tutorials'].concat(
          approvedRoutes
        )}
        baseRoute="/parent"
        firebase={firebase}
        title={title}
        appBarClassName={clsname}
      >
        {content}
      </SideBar>
      <SP apiKey={apiKey}>
        <Elements>
          {getInterface() || <ClassViewInterface firebase={firebase} db={db} accounts={accounts} />}
        </Elements>
      </SP>
    </PageWrapper>
  ) : (
    <Redirect to={{ pathname: '/login', state: { signupID: getID() } }} />
  );
};
ParentDashboard.propTypes = propTypes;
ParentDashboard.defaultProps = defaultProps;

const Fail = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <h1 style={{ marginTop: 36 }}>Unable to connect to our payment servers...</h1>
    <h2 style={{ textAlign: 'center' }}>Please try again later</h2>
  </div>
);

export default withRouter(ParentDashboard);
