import React from 'react';
import PropTypes from 'prop-types';
import {
  Dashboard,
  ImportContacts,
  AttachMoney,
  AccountCircle,
  Settings,
  Search,
  Edit,
  CardGiftcard
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
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
  'Class Search': Search,
  'Promo Codes': CardGiftcard,
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
    'Class Search': `${baseRoute}/search`,
    'Promo Codes': `${baseRoute}/promo`,
    Settings: `${baseRoute}/settings`
  };

  const isSelected = (n, l) => {
    const { state, pathname } = l;
    const id = (state && state.signupID) || (state && state.searchId);
    const path = id ? pathname.replace(`/${id}`, '') : pathname;
    return nameToRoute[n] === path;
  };

  const classes = useStyles();

  return (
    <div className={classes.sidebarWrapper}>
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
      <Logout firebase={firebase} className={classes.logoutButton} />
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

const useStyles = makeStyles({
  sidebarWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '96px',
    height: '100vh',
    boxSizing: 'border-box',
    paddingTop: '40px',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'var(--background-color)',
    '& > *': {
      marginBottom: '20px'
    },
    '& > img': {
      width: '40px'
    },
    '& > a': {
      textDecoration: 'none'
    },
    '& > a > div': {
      fontSize: '12px',
      maxWidth: '80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'rgba(0, 0, 0, 0.6)'
    },
    '& > a > div:hover': {
      color: 'rgba(0, 20, 60, 0.6)'
    },
    '& > a > div.selected': {
      color: 'rgba(0, 0, 0, 0.87)'
    }
  },
  logoutButton: {
    position: 'absolute',
    bottom: '6px',
    left: 5,
    right: 5
  }
});

export default withRouter(SideBar);
