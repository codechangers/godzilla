import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dashboard,
  ImportContacts,
  Event,
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
  Description,
  MenuBook,
  VideogameAsset,
  Assignment,
  DoneAll
} from '@material-ui/icons';
import { AppBar, Toolbar, Typography, makeStyles, IconButton, Collapse } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Link, withRouter } from 'react-router-dom';
import { useIntercom } from 'react-use-intercom';
import clsx from 'clsx';
import Logout from './Logout';
import Intercom from './Intercom';
import { Logo } from '../Images';
import { rgb, rgba } from '../../utils/helpers';

const propTypes = {
  location: PropTypes.object.isRequired,
  names: PropTypes.arrayOf(PropTypes.string),
  baseRoute: PropTypes.string,
  enableIntercom: PropTypes.bool,
  whoAmI: PropTypes.object,
  width: PropTypes.string.isRequired,
  appBarConfig: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.node,
    action: PropTypes.node,
    clsname: PropTypes.string,
    wrap: PropTypes.bool,
    wrappedContent: PropTypes.node
  })
};

const defaultProps = {
  names: [],
  baseRoute: '/',
  enableIntercom: false,
  whoAmI: null,
  appBarConfig: {
    title: 'Code Contest',
    content: null,
    action: null,
    clsname: '',
    wrap: false,
    wrappedContent: null
  }
};
const defaultABC = defaultProps.appBarConfig;

const nameToIcon = {
  Dashboard,
  Curriculum: ImportContacts,
  Contests: Event,
  Payments: AttachMoney,
  Profile: AccountCircle,
  'Sign up': Edit,
  Register: Search,
  'Promo Codes': CardGiftcard,
  Settings,
  Docs: Description,
  Tutorials: MenuBook,
  'Pre Contest': Assignment,
  Games: VideogameAsset,
  Submit: DoneAll,
  'Parent Dash': AccountTree,
  'Teacher Dash': School,
  'Admin Dash': SupervisorAccount
};

const SideBar = ({ names, baseRoute, enableIntercom, whoAmI, location, width, appBarConfig }) => {
  const { title, content, action, clsname, wrap, wrappedContent } = {
    ...defaultABC,
    ...appBarConfig
  };
  const [showMenu, setShowMenu] = useState(false);

  // Handle Intercom Unmount.
  const intercomAPI = useIntercom();
  useEffect(() => intercomAPI.shutdown, [intercomAPI]);

  const nameToRoute = {
    Dashboard: baseRoute,
    Contests: baseRoute,
    Curriculum: `${baseRoute}/curriculum`,
    Payments: `${baseRoute}/payments`,
    Profile: `${baseRoute}/profile`,
    'Sign up': `${baseRoute}/signup`,
    Register: `${baseRoute}/search`,
    'Promo Codes': `${baseRoute}/promo`,
    Settings: `${baseRoute}/settings`,
    Docs: `${baseRoute}/docs`,
    Tutorials: `${baseRoute}/tutorials`,
    'Pre Contest': `${baseRoute}/preflight`,
    Games: `${baseRoute}/games`,
    Submit: `${baseRoute}/submit`,
    'Parent Dash': '/parent',
    'Teacher Dash': '/teacher',
    'Admin Dash': '/admin'
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
      {enableIntercom && <Intercom show={!small || showMenu} whoAmI={whoAmI} api={intercomAPI} />}
      <AppBar color="secondary" position="fixed" className={clsx(classes.appBar, clsname)}>
        <div className={classes.toolBarWrapper}>
          {small ? (
            <IconButton
              style={{
                padding: 8,
                margin: '0 28px'
              }}
              onClick={() => setShowMenu(!showMenu)}
              aria-label="menu"
              id="menu-primary"
            >
              <Menu />
            </IconButton>
          ) : (
            <Logo />
          )}
          <Toolbar className={classes.toolBar}>
            <Typography variant="h5" noWrap className={classes.title}>
              {title}
            </Typography>
            {small && wrap ? (
              <Collapse
                in={showMenu}
                timeout="auto"
                unmountOnExit
                classes={{
                  wrapperInner: classes.secondaryInner,
                  container: classes.secondaryContainer
                }}
              >
                {wrappedContent || content}
              </Collapse>
            ) : (
              content
            )}
            {action}
          </Toolbar>
        </div>
        <div className={classes.appBarBorder} />
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
          <div className={classes.sidebarContent}>
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
            <div className={classes.sideBarBottom}>
              <Logout className={classes.logoutButton} />
            </div>
          </div>
          <div className={classes.sidebarBorder} />
        </div>
      </div>
    </>
  );
};
SideBar.propTypes = propTypes;
SideBar.defaultProps = defaultProps;

const useStyles = makeStyles(theme => ({
  sidebarWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,
    width: '96px',
    height: '100%',
    overflow: 'hidden',
    transition: 'width 300ms ease',
    backgroundColor: 'var(--background-color)',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      width: 0
    }
  },
  sidebarContent: {
    width: 'calc(100% - 1px)',
    height: '100%',
    boxSizing: 'border-box',
    paddingTop: '68px',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexShrink: 0,
    overflowY: 'auto',
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
      color: rgba(255, 255, 255, 0.8)
    },
    '& > a > div:hover': {
      color: rgba(200, 200, 200, 0.8)
    },
    '& > a > div.selected': {
      color: rgb(255, 255, 255)
    }
  },
  sidebarBorder: {
    display: 'block',
    alignSelf: 'flex-end',
    width: 1,
    height: 'calc(100% - 64px)',
    background: rgba(255, 255, 255, 0.12)
  },
  appBar: {
    backgroundColor: 'var(--background-color)',
    color: theme.palette.text.primary,
    boxShadow: 'none',
    '& img': {
      width: '40px',
      marginRight: '28px',
      marginLeft: '28px'
    }
  },
  rightOfAppBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  appBarBorder: {
    alignSelf: 'flex-end',
    width: 'calc(100% - 96px + 1px)',
    background: rgba(255, 255, 255, 0.12),
    height: 1,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  secondaryContainer: {
    width: 'calc(100% - 95px)',
    position: 'fixed',
    top: 64,
    left: 95
  },
  secondaryInner: {
    backgroundColor: 'var(--background-color)',
    border: `1px solid ${rgba(255, 255, 255, 0.12)}`,
    borderRight: 'none',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  toolBarWrapper: {
    width: '100%',
    height: 64,
    display: 'flex',
    alignItems: 'center'
  },
  toolBar: {
    height: '100%',
    paddingLeft: 0,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 'calc(100% - 96px)',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%'
    }
  },
  title: {
    flexGrow: 1
  },
  sideBarBottom: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  logoutButton: {
    color: rgb(255, 255, 255),
    width: '80px'
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
      backgroundColor: rgba(0, 0, 0, 0.7)
    }
  }
}));

export default withWidth()(withRouter(SideBar));
