import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  IconButton,
  makeStyles,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { AccountCircle, Help, School, Menu } from '@material-ui/icons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import MarkdownRenderer from './Renderer';
import WhoAmIModal from '../Interfaces/interfaceHelpers/WhoAmIModal';
import NavDrawer from '../UI/NavDrawer';
import NavButtons from '../UI/NavButtons';
import { toData } from '../../helpers';

const propTypes = {
  useCustomAppBar: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  pages: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  homePage: PropTypes.string,
  whiteList: PropTypes.string,
  whoAmI: PropTypes.object,
  setWhoAmI: PropTypes.func
};

const defaultProps = {
  homePage: 'home',
  whiteList: 'none',
  whoAmI: null,
  setWhoAmI: () => {}
};

const drawerWidth = 260;

const MarkdownPages = ({
  width,
  pages,
  homePage,
  whiteList,
  useCustomAppBar,
  whoAmI,
  setWhoAmI,
  accounts
}) => {
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [page, setPage] = useState(homePage);
  const [child, setChild] = useState(whoAmI);
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  // Set page from url params.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newPage = params.get('page');
    if (newPage) setPage(newPage);
  }, [location.search]);

  // Subscribe to child updates.
  useEffect(() => whoAmI?.ref.onSnapshot(childDoc => setChild(toData(childDoc))), [whoAmI]);

  // Customize AppBar.
  useEffect(
    () =>
      useCustomAppBar({
        title: page,
        wrap: true,
        content: (
          <>
            <Link to="/teachers" className={classes.navLink}>
              Teachers
            </Link>
            <Link to="/help" className={classes.navLink}>
              Help!
            </Link>
            {child !== null && (
              <Tooltip title="Change Profile" placement="bottom">
                <Button
                  variant="outlined"
                  onClick={() => setShowProfile(true)}
                  className={classes.profButton}
                  startIcon={<AccountCircle />}
                >
                  {child.fName}
                </Button>
              </Tooltip>
            )}
          </>
        ),
        wrappedContent: (
          <List className={classes.linksList}>
            <ListItem divider button onClick={() => history.push('/teachers')}>
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText primary="Teachers" />
            </ListItem>
            <ListItem divider={child !== null} button onClick={() => history.push('/help')}>
              <ListItemIcon>
                <Help />
              </ListItemIcon>
              <ListItemText primary="Help!" />
            </ListItem>
            {child !== null && (
              <ListItem button onClick={() => setShowProfile(true)}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={child.fName} />
              </ListItem>
            )}
          </List>
        ),
        action: (
          <Tooltip title="Pages Menu" placement="bottom">
            <IconButton
              color="inherit"
              aria-label="showMenu drawer"
              edge="end"
              onClick={() => setShowMenu(!showMenu)}
              className={clsx(showMenu && classes.hide)}
            >
              <Menu />
            </IconButton>
          </Tooltip>
        ),
        clsname: clsx(classes.appBar, {
          [classes.appBarShift]: showMenu,
          [classes.hidePrimary]: showMenu
        })
      }),
    [page, showMenu, classes, child]
  );

  const setUrlPage = p => history.push(`?page=${p}`);

  return (
    <div className={classes.wrapper}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: showMenu
        })}
      >
        <MarkdownRenderer pages={pages} page={page} useLoading={[loading, setLoading]} />
        {!loading && (
          <NavButtons
            onNav={setUrlPage}
            current={page}
            items={pages}
            locked={child !== null}
            whiteList={child !== null ? child[whiteList] : []}
          />
        )}
      </main>
      <NavDrawer
        open={showMenu}
        onClose={() => setShowMenu(false)}
        current={page}
        items={pages}
        onNav={
          isWidthDown('sm', width)
            ? p => {
                setUrlPage(p);
                setShowMenu(false);
              }
            : setUrlPage
        }
        width={drawerWidth}
        locked={child !== null}
        whiteList={child !== null ? child[whiteList] : []}
      />
      <WhoAmIModal
        open={showProfile}
        onClose={() => setShowProfile(false)}
        accounts={accounts}
        setWhoAmI={setWhoAmI}
      />
    </div>
  );
};
MarkdownPages.propTypes = propTypes;
MarkdownPages.defaultProps = defaultProps;

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start'
    }
  },
  appBar: {
    backgroundColor: 'var(--background-color)',
    boxShadow: 'none',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '& #menu-primary': {
      transition: theme.transitions.create(['margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  },
  navLink: {
    color: 'inherit',
    textDecoration: 'none',
    margin: '0 14px',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  linksList: {
    width: '100%',
    padding: 0
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  content: {
    width: '100%',
    maxWidth: 940,
    [theme.breakpoints.down('md')]: {
      maxWidth: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%'
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: 0,
    padding: '20px 12px',
    boxSizing: 'border-box',
    '& a': {
      color: 'var(--pink-color)'
    },
    '& code': {
      color: 'var(--yellow-color)',
      fontSize: '120%',
      fontWeight: 600
    },
    '& h1,h2,h3,h4,h5,h6': {
      margin: '12px 0'
    },
    '& h1': {
      fontSize: '4rem',
      color: 'var(--blue-color)',
      [theme.breakpoints.down('xs')]: { fontSize: '2.5rem', lineHeight: '50px' }
    },
    '& h2': {
      fontSize: '3rem',
      [theme.breakpoints.down('xs')]: { fontSize: '2.2rem', lineHeight: '40px' }
    },
    '& h3': {
      fontSize: '2.5rem',
      [theme.breakpoints.down('xs')]: { fontSize: '2rem', lineHeight: '36px' }
    },
    '& h4': {
      fontSize: '2rem',
      [theme.breakpoints.down('xs')]: { fontSize: '1.8rem', lineHeight: '34px' }
    },
    '& h5': {
      fontSize: '1.8rem',
      [theme.breakpoints.down('xs')]: { fontSize: '1.6rem', lineHeight: '30px' }
    },
    '& h6': { fontSize: '1.5rem' },
    '& img': {
      margin: 10,
      maxHeight: 500,
      maxWidth: '100%',
      display: 'block',
      alignSelf: 'center'
    },
    '& > span': { width: '100%', display: 'flex', justifyContent: 'center' },
    '& iframe': { maxWidth: '100%', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 3 }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  profButton: {
    flexShrink: 0,
    marginRight: 20,
    padding: '6px 16px'
  },
  hidePrimary: {
    '& #menu-primary': {
      [`@media only screen and (max-width: ${drawerWidth + 96 + 48}px)`]: {
        marginLeft: '-96px !important'
      }
    }
  }
}));

export default withWidth()(MarkdownPages);
