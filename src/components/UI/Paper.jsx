import React from 'react';
import PropTypes from 'prop-types';
import MUIPaper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const defaultProps = {
  className: '',
  children: null
};

const Paper = ({ className, children }) => {
  const classes = useStyles();
  return <MUIPaper className={clsx(classes.paper, className)}>{children}</MUIPaper>;
};
Paper.propTypes = propTypes;
Paper.defaultProps = defaultProps;

const useStyles = makeStyles({
  paper: {
    boxSizing: 'border-box',
    padding: '20px',
    outline: 'none',
    width: '100%',
    maxWidth: '700px',
    minWidth: '300px',
    maxHeight: '100%',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

export default Paper;
