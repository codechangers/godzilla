import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  IconButton,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Help, School, Menu } from '@material-ui/icons';
import { Redirect, Link, useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import MarkdownRenderer from './Renderer';
import WhoAmIButton from '../Interfaces/interfaceHelpers/WhoAmIButton';
import NavDrawer from '../UI/NavDrawer';
import NavButtons from '../UI/NavButtons';
import { getFilteredLiveCheckOffsData } from '../../hooks/checkoffs';
import { toData } from '../../utils/helpers';

const propTypes = {
  useCustomAppBar: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  pages: PropTypes.object.isRequired,
  useSelectedCls: PropTypes.func,
  homePage: PropTypes.string,
  whiteList: PropTypes.string,
  whoAmI: PropTypes.object,
  setWhoAmI: PropTypes.func
};

const defaultProps = {
  homePage: 'home',
  whiteList: 'none',
  whoAmI: null,
  setWhoAmI: () => {},
  useSelectedCls: () => [null]
};

const drawerWidth = 260;

const MarkdownPages = ({
  width,
  pages,
  homePage,
  whiteList,
  useCustomAppBar,
  useSelectedCls,
  whoAmI,
  setWhoAmI
}) => {
  const [selectedCls] = useSelectedCls();
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [page, setPage] = useState(homePage);
  const [child, setChild] = useState(whoAmI);
  const checkOffs =
    whoAmI !== null
      ? getFilteredLiveCheckOffsData(a =>
          a.where('childId', '==', whoAmI.id).where('classId', '==', selectedCls.id)
        )
      : [];
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    // TODO: Parse out all valid checked off pages.
    console.log('cos:', checkOffs);
    console.log('pages:', pages);
    /**
     * List of things that need to get done:
     * 1. Flatten pages.
     * 2. Split pages by titles containing a '✓'.
     * 3. Concat split sections based on checkoffs.
     */
  }, [checkOffs]);

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
        title: page.split('.').slice(-1)[0],
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
              <WhoAmIButton whoAmI={child} setWhoAmI={setWhoAmI} className={classes.profButton} />
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
            {child !== null && <WhoAmIButton whoAmI={child} setWhoAmI={setWhoAmI} listButton />}
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

  // Redirect to class select on whoAmI change.
  if (whoAmI !== null && selectedCls === null) return <Redirect to="/parent" />;

  return (
    <div className={classes.wrapper}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: showMenu
        })}
      >
        <MarkdownRenderer
          pages={pages}
          page={page}
          useLoading={[loading, setLoading]}
          whoAmI={whoAmI}
          cls={selectedCls}
        />
        {!loading && (
          <NavButtons
            onNav={setUrlPage}
            current={page}
            items={pages}
            locked={child !== null}
            whiteList={child !== null ? [...child[whiteList]] : []}
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
      lineHeight: '70px',
      color: 'var(--blue-color)',
      [theme.breakpoints.down('xs')]: { fontSize: '2.5rem', lineHeight: '50px' }
    },
    '& h2': {
      fontSize: '3rem',
      lineHeight: '60px',
      [theme.breakpoints.down('xs')]: { fontSize: '2.2rem', lineHeight: '40px' }
    },
    '& h3': {
      fontSize: '2.5rem',
      lineHeight: '50px',
      [theme.breakpoints.down('xs')]: { fontSize: '2rem', lineHeight: '36px' }
    },
    '& h4': {
      fontSize: '2rem',
      lineHeight: '36px',
      [theme.breakpoints.down('xs')]: { fontSize: '1.8rem', lineHeight: '34px' }
    },
    '& h5': {
      fontSize: '1.8rem',
      lineHeight: '34px',
      [theme.breakpoints.down('xs')]: { fontSize: '1.6rem', lineHeight: '30px' }
    },
    '& h6': { fontSize: '1.5rem', lineHeight: '30px' },
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
    marginLeft: 14,
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
