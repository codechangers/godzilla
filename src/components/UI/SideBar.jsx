import React from 'react';
import PropTypes from 'prop-types';
import {
  Dashboard,
  ImportContacts,
  AttachMoney,
  AccountCircle,
  Settings,
  Edit
} from '@material-ui/icons';
import { Link, withRouter } from 'react-router-dom';
import Logout from './Logout';
import { Logo } from '../Images';

const nameToIcon = {
  Dashboard,
  Curriculum: ImportContacts,
  'My Classes': ImportContacts,
  Payments: AttachMoney,
  Profile: AccountCircle,
  'Sign up': Edit,
  Settings
};

const SideBar = ({ names, baseRoute, location, firebase }) => {
  const nameToRoute = {
    Dashboard: baseRoute,
    'My Classes': baseRoute,
    Curriculum: `${baseRoute}/curriculum`,
    Payments: `${baseRoute}/payments`,
    Profile: `${baseRoute}/profile`,
    'Sign up': `${baseRoute}/signup`,
    Settings: `${baseRoute}/settings`
  };

  const isSelected = (n, l) => nameToRoute[n] === l.pathname;

  return (
    <div className="sidebar-wrapper">
      <Logo />
      {names.map(name => {
        const Icon = nameToIcon[name];
        return (
          <Link to={nameToRoute[name]} key={name}>
            <div className={isSelected(name, location) ? 'selected' : ''} key={name}>
              <Icon />
              {name}
            </div>
          </Link>
        );
      })}
      <Logout firebase={firebase} className="logout-btn" />
    </div>
  );
};

SideBar.propTypes = {
  location: PropTypes.object.isRequired,
  names: PropTypes.arrayOf(PropTypes.string),
  baseRoute: PropTypes.string,
  firebase: PropTypes.object.isRequired
};

SideBar.defaultProps = {
  names: [],
  baseRoute: '/'
};

export default withRouter(SideBar);
