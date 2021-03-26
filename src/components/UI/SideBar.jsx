import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dashboard,
  ImportContacts,
  AttachMoney,
  AccountCircle,
  Settings,
  Search,
  Edit,
  CardGiftcard,
  Menu,
  AccountTree,
  SupervisorAccount,
  School,
  Assignment,
  Description,
  MenuBook
} from '@material-ui/icons';
import { AppBar, Toolbar, Typography, makeStyles, IconButton } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';
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
  Settings,
  Docs: Description,
  Tutorials: MenuBook,
  'Parent Dash': AccountTree,
  'Teacher Dash': School,
  'Admin Dash': SupervisorAccount,
  'Student IDs': Assignment
};

const SideBar = ({ names, baseRoute, location, firebase, width }) => {
  const [showMenu, setShowMenu] = useState(false);

  const nameToRoute = {
    Dashboard: baseRoute,
    'My Classes': baseRoute,
    Curriculum: `${baseRoute}/curriculum`,
    Payments: `${baseRoute}/payments`,
    Profile: `${baseRoute}/profile`,
    'Sign up': `${baseRoute}/signup`,
    'Class Search': `${baseRoute}/search`,
    'Promo Codes': `${baseRoute}/promo`,
    Settings: `${baseRoute}/settings`,
    Docs: `${baseRoute}/docs`,
    Tutorials: `${baseRoute}/tutorials`,
    'Parent Dash': '/parent',
    'Teacher Dash': '/teacher',
    'Admin Dash': '/admin',
    'Student IDs': '/admin/ids'
  };

  const isSelected = (n, l) => {
    const { state, pathname } = l;
    const id = (state && state.signupID) || (state && state.searchId);
    const path = id ? pathname.replace(`/${id}`, '') : pathname;
    return nameToRoute[n] === path;
  };

  const small = isWidthDown('xs', width);
  const classes = useStyles();

  return (
    <>
      <AppBar
        color="secondary"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: showMenu
        })}
      >
        <Toolbar className={classes.toolBar}>
          {small ? (
            <IconButton
              style={{
                padding: 8,
                margin: '0 28px'
              }}
              onClick={() => setShowMenu(!showMenu)}
              aria-label="menu"
            >
              <Menu />
            </IconButton>
          ) : (
            <Logo />
          )}
          <Typography variant="h5" noWrap className={classes.title}>
            CodeContest
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        id="offclick"
        className={classes.sidebarClickoff}
        style={showMenu ? null : { width: 0 }}
        onClick={e => {
          if (e.target.id === 'offclick') {
            setShowMenu(false);
          }
        }}
      >
        <div
          className={
            showMenu ? `${classes.sidebarWrapper} ${classes.openSidebar}` : classes.sidebarWrapper
          }
        >
          {small && <Logo />}
          {names.map(name => {
            const Icon = nameToIcon[name];
            return (
              <Link to={nameToRoute[name]} key={name} onClick={() => setShowMenu(false)}>
                <div className={isSelected(name, location) ? 'selected' : ''} key={name}>
                  <Icon />
                  {name}
                </div>
              </Link>
            );
          })}
          <Logout firebase={firebase} className={classes.logoutButton} />
        </div>
      </div>
    </>
  );
};

SideBar.propTypes = {
  location: PropTypes.object.isRequired,
  names: PropTypes.arrayOf(PropTypes.string),
  baseRoute: PropTypes.string,
  firebase: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

SideBar.defaultProps = {
  names: [],
  baseRoute: '/'
};

const useStyles = makeStyles(theme => ({
  sidebarWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '96px',
    height: '100%',
    boxSizing: 'border-box',
    paddingTop: '68px',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'var(--background-color)',
    overflow: 'hidden',
    transition: 'width 300ms ease',
    zIndex: 10,
    [theme.breakpoints.down('xs')]: {
      width: 0
    },
    '& > *': {
      marginBottom: '20px'
    },
    '& img': {
      width: '40px',
      marginRight: '28px',
      marginLeft: '28px'
    },
    '& > a': {
      textDecoration: 'none'
    },
    '& > a > div': {
      fontSize: '12px',
      width: '80px',
      marginRight: '8px',
      marginLeft: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'rgba(0, 20, 60, 0.6)'
    },
    '& > a > div:hover': {
      color: 'rgba(0, 0, 0, 0.6)'
    },
    '& > a > div.selected': {
      color: 'rgba(0, 0, 0, 0.87)'
    }
  },
  appBar: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    boxShadow: 'none',
    '& img': {
      width: '40px',
      marginRight: '28px',
      marginLeft: '28px'
    }
  },
  toolBar: {
    height: 64,
    paddingLeft: 0
  },
  logoutButton: {
    width: '80px',
    position: 'absolute',
    bottom: '6px',
    right: '8px',
    left: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  openSidebar: {
    [theme.breakpoints.down('xs')]: {
      width: '96px'
    }
  },
  sidebarClickoff: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9,
      backgroundColor: 'rgba(0,0,0,0.7)'
    }
  }
}));

export default withWidth()(withRouter(SideBar));
