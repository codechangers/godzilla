import React from 'react';
import PropTypes from 'prop-types';
import MUIModal from '@material-ui/core/Modal';
import { makeStyles, Paper } from '@material-ui/core';

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

const Modal = ({ open, onClose, children, className, title, description }) => {
  const classes = useStyles();
  return (
    <MUIModal
      open={open}
      onClose={onClose}
      disableAutoFocus
      className={classes.modal}
      aria-labelledby={title}
      aria-describedby={description}
    >
      <Paper className={`${classes.paper} ${className}`}>{children}</Paper>
    </MUIModal>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = {
  open: false,
  children: null,
  className: '',
  title: 'Modal',
  description: 'This is a UI Modal'
};

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '96px',
    transition: 'padding 300ms ease',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0'
    }
  },
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
}));

export default Modal;
