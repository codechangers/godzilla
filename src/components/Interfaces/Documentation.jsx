import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import NavDrawer from './interfaceHelpers/NavDrawer';
import docs from '../../resources/docs';

const drawerWidth = 260;

const DocumentationInterface = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [page, setPage] = useState('welcome');
  const [content, setContent] = useState('# Hello World');

  useEffect(() => {
    fetch(docs[page])
      .then(res => res.text())
      .then(text => setContent(text));
  }, [page]);

  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <AppBar
        position="relative"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: showMenu
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            {page}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="showMenu drawer"
            edge="end"
            onClick={() => setShowMenu(!showMenu)}
            className={clsx(showMenu && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
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
        items={Object.keys(docs)}
        onNav={setPage}
        width={drawerWidth}
      />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  appBar: {
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
  title: {
    flexGrow: 1
  },
  content: {
    width: '100%',
    maxWidth: 1000,
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

export default DocumentationInterface;
