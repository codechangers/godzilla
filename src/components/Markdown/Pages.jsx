import React, { useState, useEffect, useMemo } from 'react';
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
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import MarkdownRenderer from './Renderer';
import WhoAmIButton from '../Interfaces/interfaceHelpers/WhoAmIButton';
import HelpModal from '../Interfaces/interfaceHelpers/HelpModal';
import TeachersModal from '../Interfaces/interfaceHelpers/TeacherHelpModal';
import NavDrawer from '../UI/NavDrawer';
import NavButtons from '../UI/NavButtons';
import { getFilteredLiveCheckOffsData, getLiveTutorialSelection } from '../../hooks/pages';
import { toData, flattenPages, rgba } from '../../utils/helpers';
import {
  PICK_A_GAME,
  RUNNER_TUTORIAL,
  SOCCER_TUTORIAL,
  ZOMBIE_TUTORIAL,
  BLOCK_TUTORIALS
} from '../../resources/tutorials';

const propTypes = {
  useCustomAppBar: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  pages: PropTypes.object.isRequired,
  useSelectedCls: PropTypes.func,
  homePage: PropTypes.string,
  whiteList: PropTypes.string,
  whoAmI: PropTypes.object,
  setWhoAmI: PropTypes.func,
  firstPrev: PropTypes.func,
  lastNext: PropTypes.func,
  doNotLock: PropTypes.bool,
  noClass: PropTypes.bool,
  includes: PropTypes.object
};

const defaultProps = {
  homePage: 'home',
  whiteList: null,
  whoAmI: null,
  doNotLock: false,
  noClass: false,
  setWhoAmI: () => {},
  firstPrev: null,
  lastNext: null,
  useSelectedCls: () => [null],
  includes: {}
};

const tutorialTypeToText = {
  runner: RUNNER_TUTORIAL,
  soccer: SOCCER_TUTORIAL,
  zombie: ZOMBIE_TUTORIAL
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
  setWhoAmI,
  firstPrev,
  lastNext,
  doNotLock,
  noClass,
  includes
}) => {
  const [selectedCls] = useSelectedCls();
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTeachers, setShowTeachers] = useState(false);
  const [page, setPage] = useState(homePage);
  const [child, setChild] = useState(whoAmI);
  const checkOffs = getFilteredLiveCheckOffsData(a =>
    a.where('childId', '==', whoAmI?.id || '').where('classId', '==', selectedCls?.id || '')
  );
  const tutorialSelection = getLiveTutorialSelection(whoAmI?.id || '', selectedCls?.id || '');
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  function concatUnlocks() {
    let unlocks = [];
    const selectedTutorial = tutorialTypeToText[tutorialSelection?.type];
    const flatPages = flattenPages(pages);
    // Get a list of check points.
    const checkPoints = flatPages
      .filter(p => p.includes('✓'))
      .map(cp => ({ page: cp, index: flatPages.indexOf(cp) }));
    // Get a list of checked off pages.
    const coPages = Object.values(checkOffs)
      .filter(co => (selectedTutorial ? co.page.includes(selectedTutorial) : false))
      .filter(co => co.approved)
      .map(co => co.page);
    // Loop through check offs and concat unlocked pages.
    coPages.forEach(p => {
      const matchedCP = checkPoints.filter(cp => cp.page === p)[0] || null;
      const mcpIndex = checkPoints.indexOf(matchedCP);
      const nextCP = checkPoints[mcpIndex + 1] || null;
      if (matchedCP && nextCP) {
        unlocks = [...unlocks, ...flatPages.slice(matchedCP.index + 1, nextCP.index + 1)];
      }
    });
    // Add initial/global tutorials.
    const startingPages = flatPages.slice(0, flatPages.indexOf(PICK_A_GAME) + 1);
    let firstTutorialPages = [];
    // Concat the firt tutorial for the selected game.
    if (selectedTutorial) {
      const gameTutorials = Object.keys(pages[selectedTutorial]);
      const i = flatPages.indexOf(`${selectedTutorial}.${gameTutorials[0]}`);
      const j = flatPages.indexOf(
        `${selectedTutorial}.${gameTutorials.filter(t => t.includes('✓'))[0]}`
      );
      firstTutorialPages = flatPages.slice(i, j + 1);
    }
    // Show blocks after finishing game.
    let postTutorialPages = [];
    const gameTutsCount = checkPoints.filter(cp => cp.page.includes(selectedTutorial)).length;
    if (selectedTutorial && coPages.length + 1 >= gameTutsCount) {
      postTutorialPages = flatPages.filter(p => p.includes(BLOCK_TUTORIALS.concat('.')));
    }
    return [...startingPages, ...firstTutorialPages, ...unlocks, ...postTutorialPages];
  }

  const checkOffUnlockedPages = useMemo(doNotLock ? () => [] : concatUnlocks, [
    checkOffs,
    pages,
    tutorialSelection
  ]);

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
            <button onClick={() => setShowTeachers(true)} className={classes.navLink}>
              Teachers
            </button>
            <button onClick={() => setShowHelp(true)} className={classes.navLink}>
              Help!
            </button>
            {child !== null && (
              <WhoAmIButton whoAmI={child} setWhoAmI={setWhoAmI} className={classes.profButton} />
            )}
          </>
        ),
        wrappedContent: (
          <List className={classes.linksList}>
            <ListItem divider button onClick={() => setShowTeachers(true)}>
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText primary="Teachers" />
            </ListItem>
            <ListItem divider={child !== null} button onClick={() => setShowHelp(true)}>
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

  const whieListedPages = useMemo(
    () =>
      child !== null && child[whiteList]
        ? [...child[whiteList], ...checkOffUnlockedPages]
        : checkOffUnlockedPages,
    [child, whiteList, checkOffUnlockedPages]
  );

  // Redirect to class select on whoAmI change.
  if (!noClass && whoAmI !== null && selectedCls === null) return <Redirect to="/parent" />;

  return (
    <div className={classes.wrapper}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: showMenu
        })}
      >
        <MarkdownRenderer
          pages={{ ...includes, ...pages }}
          page={page}
          useLoading={[loading, setLoading]}
          whoAmI={whoAmI}
          cls={selectedCls}
        />
        <div className={classes.fillPage} />
        {!loading && (
          <NavButtons
            onNav={setUrlPage}
            current={page}
            pages={pages}
            locked={!doNotLock && child !== null}
            whiteList={whieListedPages}
            firstPrev={firstPrev}
            lastNext={lastNext}
          />
        )}
      </main>
      <NavDrawer
        open={showMenu}
        onClose={() => setShowMenu(false)}
        current={page}
        pages={pages}
        onNav={
          isWidthDown('sm', width)
            ? p => {
                setUrlPage(p);
                setShowMenu(false);
              }
            : setUrlPage
        }
        width={drawerWidth}
        locked={!doNotLock && child !== null}
        whiteList={whieListedPages}
      />
      <HelpModal open={showHelp} onClose={() => setShowHelp(false)} />
      <TeachersModal
        open={showTeachers}
        onClose={() => setShowTeachers(false)}
        gotoHelp={() => {
          setShowTeachers(false);
          setShowHelp(true);
        }}
      />
    </div>
  );
};
MarkdownPages.propTypes = propTypes;
MarkdownPages.defaultProps = defaultProps;

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    minHeight: 'calc(100vh - 64px)',
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
    fontSize: 16,
    margin: '0 14px',
    color: 'inherit',
    cursor: 'pointer',
    textDecoration: 'none',
    background: 'none',
    outline: 'none',
    border: 'none',
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
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
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
    '& iframe': {
      maxWidth: '100%',
      border: `1px solid ${rgba(255, 255, 255, 0.2)}`,
      borderRadius: 3
    }
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
  },
  fillPage: {
    width: '100%',
    display: 'block',
    flexGrow: 1,
    opacity: 0
  }
}));

export default withWidth()(MarkdownPages);
