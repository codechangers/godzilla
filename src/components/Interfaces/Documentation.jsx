import React, { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import docs from '../../resources/docs';
import * as Styled from './styles';

const DocumentationInterface = () => {
  const [page, setPage] = useState(docs.welcome);
  const [content, setContent] = useState('# Hello World');

  useEffect(() => {
    fetch(page)
      .then(res => res.text())
      .then(text => setContent(text));
  }, [page]);

  const classes = useStyles();
  return (
    <Styled.PageContent className={classes.wrapper}>
      <div className={classes.content}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <nav className={classes.nav}>
        <Typography className={classes.navHeader} variant="h6">
          Docs Menu
        </Typography>
        <div className={classes.navItems}>
          {Object.entries(docs).map(([key, value]) => (
            <button key={key} onClick={() => setPage(value)}>
              <Typography variant="body1">{key}</Typography>
            </button>
          ))}
        </div>
      </nav>
    </Styled.PageContent>
  );
};

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  content: {
    width: 'calc(100% - 260px)',
    marginRight: 260,
    boxSizing: 'border-box',
    padding: '0 18px 20px 0',
    '& pre': {
      paddingBottom: 20,
      maxWidth: '100%',
      overflowX: 'scroll'
    }
  },
  nav: {
    width: '260px',
    position: 'fixed',
    top: 40,
    right: 40,
    backgroundColor: 'rgba(100, 100, 100, 0.1)',
    borderRadius: 3
  },
  navItems: {
    width: '100%',
    maxHeight: 'calc(100vh - 40px - 40px - 10px)',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    padding: '6px',
    '& button': {
      background: 'none',
      border: 'none',
      outline: 'none',
      margin: '3px 0',
      cursor: 'pointer',
      '& :hover': {
        textDecoration: 'underline'
      }
    }
  },
  navHeader: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px 3px',
    borderBottom: '1px solid #2e2e2e'
  }
});

export default DocumentationInterface;
