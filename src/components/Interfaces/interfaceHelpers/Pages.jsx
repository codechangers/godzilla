import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton, makeStyles } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import NavDrawer from '../../UI/NavDrawer';
import { toData } from '../../../helpers';

const propTypes = {
  useCustomAppBar: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  pages: PropTypes.object.isRequired,
  homePage: PropTypes.string,
  whoAmI: PropTypes.object
};

const defaultProps = {
  homePage: 'home',
  whoAmI: null
};

const drawerWidth = 260;

const PagesInterface = ({ width, pages, homePage, useCustomAppBar, whoAmI }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [page, setPage] = useState(homePage);
  const [content, setContent] = useState('# Hello World');
  const [child, setChild] = useState(whoAmI);
  const classes = useStyles();

  // Subscribe to child updates.
  useEffect(() => whoAmI?.ref.onSnapshot(childDoc => setChild(toData(childDoc))), [whoAmI]);

  // Fetch page content.
  useEffect(() => {
    let doc = pages;
    page.split('.').forEach(stop => {
      doc = doc[stop];
    });
    fetch(doc)
      .then(res => res.text())
      .then(text => setContent(text));
  }, [page]);

  // Customize AppBar.
  useEffect(
    () =>
      useCustomAppBar(
        child !== null ? page + ` => ${child.fName}` : page,
        <Tooltip title="Pages Menu" placement="left">
          <IconButton
            color="inherit"
            aria-label="showMenu drawer"
            edge="end"
            onClick={() => setShowMenu(!showMenu)}
            className={clsx(showMenu && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>,
        clsx(classes.appBar, {
          [classes.appBarShift]: showMenu
        })
      ),
    [page, showMenu, classes]
  );

  return (
    <div className={classes.wrapper}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: showMenu
        })}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </main>
      <NavDrawer
        open={showMenu}
        onClose={() => setShowMenu(false)}
        current={page}
        items={pages}
        onNav={
          isWidthDown('sm', width)
            ? p => {
                setPage(p);
                setShowMenu(false);
              }
            : setPage
        }
        width={drawerWidth}
      />
    </div>
  );
};

PagesInterface.propTypes = propTypes;
PagesInterface.defaultProps = defaultProps;

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
    })
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
    '& pre': {
      paddingBottom: 20,
      maxWidth: '100%',
      overflowX: 'scroll'
    }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  }
}));

export default withWidth()(PagesInterface);
