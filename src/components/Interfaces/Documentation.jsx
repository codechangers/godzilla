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
      <nav className={classes.nav}>
        <div className={classes.navHeader}>
          <Typography variant="h6">Docs Menu</Typography>
        </div>
        {Object.entries(docs).map(([key, value]) => (
          <button key={key} onClick={() => setPage(value)}>
            <Typography variant="body1">{key}</Typography>
          </button>
        ))}
      </nav>
      <div className={classes.content}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
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
    marginLeft: 260,
    boxSizing: 'border-box',
    padding: '0 0 20px 12px',
    '& code': {
      maxWidth: '100%',
      overflowX: 'scroll'
    }
  },
  nav: {
    zIndex: 9,
    width: '260px',
    height: 'calc(100vh - 40px)',
    overflowY: 'scroll',
    boxSizing: 'border-box',
    padding: '12px 0',
    position: 'fixed',
    left: 96,
    top: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRight: '1px solid #2e2e2e',
    borderLeft: '1px solid #2e2e2e',
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
    zIndex: 10,
    display: 'block',
    position: 'fixed',
    top: 0,
    left: 96,
    borderBottom: '1px solid #2e2e2e',
    width: 260,
    padding: '8px 0 8px 5px',
    boxSizing: 'border-box'
  }
});

export default DocumentationInterface;
