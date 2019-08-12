import React from 'react';
import PropTypes from 'prop-types';
import {
  Dashboard,
  ImportContacts,
  AttachMoney,
  AccountCircle,
  Settings
} from '@material-ui/icons';
import { Link, withRouter } from 'react-router-dom';
import { Logo } from './Images';

const nameToIcon = {
  Dashboard,
  Curriculum: ImportContacts,
  Payments: AttachMoney,
  Profile: AccountCircle,
  Settings
};

const nameToRoute = {
  Dashboard: '/teacher',
  Curriculum: '/teacher/curriculum',
  Payments: '/teacher/payments',
  Profile: '/teacher/profile',
  Settings: '/teacher/settings'
};

const isSelected = (name, location) => nameToRoute[name] === location.pathname;

const SideBar = ({ location }) => (
  <div className="sidebar-wrapper">
    <Logo />
    {Object.keys(nameToIcon).map(name => {
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
  </div>
);

SideBar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(SideBar);
